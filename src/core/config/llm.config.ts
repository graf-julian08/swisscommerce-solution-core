// src/core/config/llm.config.ts
// LLM Configuration - Models and Fallback Strategy

export type LLMProvider = 'deepseek' | 'gemini' | 'openai' | 'ollama';

export interface LLMConfig {
    provider: LLMProvider;
    model: string;
    apiKey?: string;
    baseUrl?: string;
    maxTokens: number;
    temperature: number;
    timeout: number;
}

export interface LLMRole {
    interpreter: LLMConfig;
    classifier: LLMConfig;
    decisionEngine: LLMConfig;
    productGenerator: LLMConfig;
}

// ============================================================
// DEEPSEEK CONFIGURATION (PRIMARY)
// ============================================================
const deepseekInterpreter: LLMConfig = {
    provider: 'deepseek',
    model: 'deepseek-chat',
    maxTokens: 500,
    temperature: 0.3,
    timeout: 10000,
};

const deepseekDecision: LLMConfig = {
    provider: 'deepseek',
    model: 'deepseek-chat',
    maxTokens: 2000,
    temperature: 0.4,
    timeout: 30000,
};

// ============================================================
// GEMINI CONFIGURATION (FALLBACK)
// ============================================================
const geminiInterpreter: LLMConfig = {
    provider: 'gemini',
    model: 'gemini-2.0-flash-exp',
    maxTokens: 500,
    temperature: 0.3,
    timeout: 10000,
};

const geminiDecision: LLMConfig = {
    provider: 'gemini',
    model: 'gemini-2.0-flash-exp',
    maxTokens: 2000,
    temperature: 0.4,
    timeout: 30000,
};

// ============================================================
// OLLAMA CONFIGURATION (LOCAL - DEVELOPMENT)
// ============================================================
const ollamaInterpreter: LLMConfig = {
    provider: 'ollama',
    model: 'gemma3:4b',
    baseUrl: 'http://localhost:11434',
    maxTokens: 500,
    temperature: 0.3,
    timeout: 15000,
};

// ============================================================
// DEFAULT CONFIGURATION
// ============================================================
export const DEFAULT_LLM_CONFIG: LLMRole = {
    // Small, fast model for prompt interpretation
    interpreter: deepseekInterpreter,

    // Mostly deterministic - minimal LLM usage
    classifier: deepseekInterpreter,

    // Main decision engine - needs good reasoning
    decisionEngine: deepseekDecision,

    // Product generation when user doesn't provide products
    productGenerator: deepseekDecision,
};

// ============================================================
// FALLBACK STRATEGY
// ============================================================
export interface FallbackConfig {
    maxRetries: number;
    retryDelay: number;
    fallbackChain: LLMProvider[];
}

export const FALLBACK_CONFIG: FallbackConfig = {
    maxRetries: 2,
    retryDelay: 1000,
    fallbackChain: ['deepseek', 'gemini', 'ollama'],
};

// Get fallback LLM for a role
export function getFallbackLLM(role: keyof LLMRole, currentProvider: LLMProvider): LLMConfig | null {
    const chain = FALLBACK_CONFIG.fallbackChain;
    const currentIndex = chain.indexOf(currentProvider);

    if (currentIndex === -1 || currentIndex >= chain.length - 1) {
        return null;
    }

    const nextProvider = chain[currentIndex + 1];

    switch (nextProvider) {
        case 'gemini':
            return role === 'decisionEngine' || role === 'productGenerator'
                ? geminiDecision
                : geminiInterpreter;
        case 'ollama':
            return ollamaInterpreter;
        default:
            return null;
    }
}

// ============================================================
// API KEY MANAGEMENT
// ============================================================
export function getLLMApiKey(provider: LLMProvider): string | undefined {
    switch (provider) {
        case 'deepseek':
            return process.env.DEEPSEEK_API_KEY;
        case 'gemini':
            return process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
        case 'openai':
            return process.env.OPENAI_API_KEY;
        case 'ollama':
            return undefined; // Local, no API key needed
        default:
            return undefined;
    }
}

// ============================================================
// COST ESTIMATION
// ============================================================
export interface CostEstimate {
    inputTokens: number;
    outputTokens: number;
    estimatedCostUSD: number;
}

const COST_PER_1K_TOKENS: Record<LLMProvider, { input: number; output: number }> = {
    deepseek: { input: 0.00014, output: 0.00028 },  // Very cheap
    gemini: { input: 0.000075, output: 0.0003 },    // flash 2.0
    openai: { input: 0.0005, output: 0.0015 },      // gpt-4o-mini
    ollama: { input: 0, output: 0 },                // Local, free
};

export function estimateCost(provider: LLMProvider, inputTokens: number, outputTokens: number): CostEstimate {
    const rates = COST_PER_1K_TOKENS[provider];
    const estimatedCostUSD =
        (inputTokens / 1000) * rates.input +
        (outputTokens / 1000) * rates.output;

    return { inputTokens, outputTokens, estimatedCostUSD };
}

// Estimate full website generation cost
export function estimateWebsiteGenerationCost(): CostEstimate {
    // Typical token usage per website:
    // - Interpreter: ~200 input, ~100 output
    // - Classifier: ~150 input, ~50 output
    // - Decision Engine: ~800 input, ~1200 output
    // - Product Generator (if needed): ~500 input, ~1500 output

    const totalInput = 200 + 150 + 800 + 500;
    const totalOutput = 100 + 50 + 1200 + 1500;

    return estimateCost('deepseek', totalInput, totalOutput);
}
