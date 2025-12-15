// src/core/pipeline/WebsitePipeline.ts
// Main Pipeline Orchestrator - Coordinates all steps

import type { WebsiteDSL } from '../../dsl/schema/website.schema';
import type { InterpretedPrompt } from '../interpreter/PromptInterpreter';
import type { Classification } from '../classifier/WebsiteClassifier';
import {
    INTERPRETER_SYSTEM_PROMPT,
    createInterpreterPrompt,
    parseInterpreterResponse,
    heuristicParse,
} from '../interpreter/PromptInterpreter';
import { classifyWebsite } from '../classifier/WebsiteClassifier';
import {
    createDecisionPrompt,
    parseDecisionResponse,
    generateDeterministicDSL,
    DECISION_ENGINE_SYSTEM_PROMPT,
} from '../decision-engine/DesignDecisionEngine';
import {
    generateProductPrompt,
    parseProductsFromLLM,
    convertUserProducts,
    getVerticalCategories,
    type UserProductInput,
} from '../generators/product-generator';
import {
    DEFAULT_LLM_CONFIG,
    getLLMApiKey,
    estimateWebsiteGenerationCost,
    type LLMConfig,
} from '../config/llm.config';

// ============================================================
// TYPES
// ============================================================

export interface PipelineInput {
    prompt: string;
    userProducts?: UserProductInput[];
    options?: PipelineOptions;
}

export interface PipelineOptions {
    skipLLM?: boolean;          // Use only heuristics (development mode)
    generateProducts?: boolean; // Generate products via LLM if not provided
    productCount?: number;      // Number of products to generate
    locale?: 'de' | 'en';       // Override locale detection
}

export interface PipelineOutput {
    dsl: WebsiteDSL;
    interpreted: InterpretedPrompt;
    classification: Classification;
    stats: PipelineStats;
}

export interface PipelineStats {
    totalTimeMs: number;
    interpreterTimeMs: number;
    classifierTimeMs: number;
    decisionEngineTimeMs: number;
    productGeneratorTimeMs: number;
    estimatedCostUSD: number;
    tokensUsed: number;
    llmCalls: number;
}

// ============================================================
// LLM CALL ABSTRACTION
// ============================================================

interface LLMCallResult {
    content: string;
    tokensUsed: number;
}

async function callLLM(
    config: LLMConfig,
    systemPrompt: string,
    userPrompt: string,
): Promise<LLMCallResult> {
    const apiKey = getLLMApiKey(config.provider);

    if (!apiKey && config.provider !== 'ollama') {
        throw new Error(`No API key found for provider: ${config.provider}`);
    }

    // Provider-specific implementations
    switch (config.provider) {
        case 'deepseek':
            return callDeepseek(config, systemPrompt, userPrompt, apiKey!);
        case 'gemini':
            return callGemini(config, systemPrompt, userPrompt, apiKey!);
        case 'ollama':
            return callOllama(config, systemPrompt, userPrompt);
        default:
            throw new Error(`Unsupported provider: ${config.provider}`);
    }
}

async function callDeepseek(
    config: LLMConfig,
    systemPrompt: string,
    userPrompt: string,
    apiKey: string,
): Promise<LLMCallResult> {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: config.model,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            max_tokens: config.maxTokens,
            temperature: config.temperature,
        }),
    });

    if (!response.ok) {
        throw new Error(`Deepseek API error: ${response.status}`);
    }

    const data = await response.json();
    return {
        content: data.choices?.[0]?.message?.content || '',
        tokensUsed: data.usage?.total_tokens || 0,
    };
}

async function callGemini(
    config: LLMConfig,
    systemPrompt: string,
    userPrompt: string,
    apiKey: string,
): Promise<LLMCallResult> {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
                }],
                generationConfig: {
                    maxOutputTokens: config.maxTokens,
                    temperature: config.temperature,
                },
            }),
        }
    );

    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return {
        content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
        tokensUsed: data.usageMetadata?.totalTokenCount || 0,
    };
}

async function callOllama(
    config: LLMConfig,
    systemPrompt: string,
    userPrompt: string,
): Promise<LLMCallResult> {
    const baseUrl = config.baseUrl || 'http://localhost:11434';

    const response = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: config.model,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            stream: false,
        }),
    });

    if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    return {
        content: data.message?.content || '',
        tokensUsed: data.prompt_eval_count + data.eval_count || 0,
    };
}

// ============================================================
// MAIN PIPELINE
// ============================================================

export async function runPipeline(input: PipelineInput): Promise<PipelineOutput> {
    const startTime = Date.now();
    const stats: PipelineStats = {
        totalTimeMs: 0,
        interpreterTimeMs: 0,
        classifierTimeMs: 0,
        decisionEngineTimeMs: 0,
        productGeneratorTimeMs: 0,
        estimatedCostUSD: 0,
        tokensUsed: 0,
        llmCalls: 0,
    };

    const options = input.options || {};

    // ============================================================
    // STEP 1: PROMPT INTERPRETATION
    // ============================================================
    console.log('[Pipeline] Step 1: Interpreting prompt...');
    const interpreterStart = Date.now();

    let interpreted: InterpretedPrompt;

    if (options.skipLLM) {
        // Use heuristic parser only
        interpreted = heuristicParse(input.prompt);
    } else {
        try {
            const result = await callLLM(
                DEFAULT_LLM_CONFIG.interpreter,
                INTERPRETER_SYSTEM_PROMPT,
                createInterpreterPrompt(input.prompt),
            );
            interpreted = parseInterpreterResponse(result.content, input.prompt);
            stats.tokensUsed += result.tokensUsed;
            stats.llmCalls++;
        } catch (error) {
            console.warn('[Pipeline] LLM interpreter failed, using heuristics:', error);
            interpreted = heuristicParse(input.prompt);
        }
    }

    // Override locale if specified
    if (options.locale) {
        interpreted.locale = options.locale;
    }

    stats.interpreterTimeMs = Date.now() - interpreterStart;
    console.log('[Pipeline] Interpreted:', interpreted.vertical, interpreted.moodKeywords);

    // ============================================================
    // STEP 2: CLASSIFICATION (Deterministic)
    // ============================================================
    console.log('[Pipeline] Step 2: Classifying website...');
    const classifierStart = Date.now();

    const classification = classifyWebsite(interpreted);

    stats.classifierTimeMs = Date.now() - classifierStart;
    console.log('[Pipeline] Classified:', classification.brandPersonality, classification.suggestedLayout);

    // ============================================================
    // STEP 3: DESIGN DECISIONS
    // ============================================================
    console.log('[Pipeline] Step 3: Making design decisions...');
    const decisionStart = Date.now();

    let dsl: WebsiteDSL;

    if (options.skipLLM) {
        dsl = generateDeterministicDSL({ interpreted, classification });
    } else {
        try {
            const result = await callLLM(
                DEFAULT_LLM_CONFIG.decisionEngine,
                DECISION_ENGINE_SYSTEM_PROMPT,
                createDecisionPrompt({ interpreted, classification }),
            );
            dsl = parseDecisionResponse(result.content, { interpreted, classification });
            stats.tokensUsed += result.tokensUsed;
            stats.llmCalls++;
        } catch (error) {
            console.warn('[Pipeline] LLM decision engine failed, using deterministic:', error);
            dsl = generateDeterministicDSL({ interpreted, classification });
        }
    }

    stats.decisionEngineTimeMs = Date.now() - decisionStart;

    // ============================================================
    // STEP 4: PRODUCT GENERATION (Optional)
    // ============================================================
    if (input.userProducts && input.userProducts.length > 0) {
        // User provided products - convert them
        console.log('[Pipeline] Step 4: Converting user products...');
        dsl.content.products = convertUserProducts(
            input.userProducts,
            classification.vertical,
            'EUR',
        );
    } else if (options.generateProducts !== false) {
        // Generate products via LLM
        console.log('[Pipeline] Step 4: Generating products via LLM...');
        const productStart = Date.now();

        if (!options.skipLLM) {
            try {
                const productPrompt = generateProductPrompt({
                    vertical: classification.vertical,
                    brandName: dsl.content.brand.name,
                    brandPersonality: classification.brandPersonality,
                    generateCount: options.productCount || 12,
                    categories: getVerticalCategories(classification.vertical),
                    locale: interpreted.locale,
                });

                const result = await callLLM(
                    DEFAULT_LLM_CONFIG.productGenerator,
                    'You are a product catalog generator. Return ONLY valid JSON array.',
                    productPrompt,
                );

                dsl.content.products = parseProductsFromLLM(result.content);
                stats.tokensUsed += result.tokensUsed;
                stats.llmCalls++;
            } catch (error) {
                console.warn('[Pipeline] Product generation failed:', error);
            }
        }

        stats.productGeneratorTimeMs = Date.now() - productStart;
    }

    // ============================================================
    // FINALIZE
    // ============================================================
    stats.totalTimeMs = Date.now() - startTime;
    stats.estimatedCostUSD = estimateWebsiteGenerationCost().estimatedCostUSD;

    console.log('[Pipeline] Complete!', {
        time: `${stats.totalTimeMs}ms`,
        llmCalls: stats.llmCalls,
        tokens: stats.tokensUsed,
        cost: `$${stats.estimatedCostUSD.toFixed(4)}`,
    });

    return {
        dsl,
        interpreted,
        classification,
        stats,
    };
}

// ============================================================
// EXPORTS
// ============================================================

export { callLLM };
