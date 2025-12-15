// src/core/interpreter/PromptInterpreter.ts
// Prompt Interpreter - Extracts structured information from user prompt

import type { Vertical, BrandPersonality, WebsiteType, Complexity } from '../../dsl/schema/website.schema';

// ============================================================
// TYPES
// ============================================================

export interface InterpretedPrompt {
    // Business Info
    businessType: WebsiteType;
    vertical: Vertical;
    brandNameHint: string | null;

    // Mood & Style
    moodKeywords: string[];
    styleDescriptors: string[];

    // Target Audience
    targetAudience: string;
    priceSegment: 'budget' | 'mid-range' | 'premium' | 'luxury';

    // Products (if mentioned)
    productHints: string[];
    productCategories: string[];

    // Features
    requestedFeatures: string[];

    // Language
    locale: 'de' | 'en' | 'fr' | 'es';

    // Complexity
    complexity: Complexity;

    // Raw
    originalPrompt: string;
}

// ============================================================
// PROMPT TEMPLATE FOR LLM
// ============================================================

export const INTERPRETER_SYSTEM_PROMPT = `You are a prompt interpreter for an AI website builder. Your job is to extract structured information from user prompts.

IMPORTANT: Return ONLY valid JSON, no markdown, no explanation.

Analyze the user's prompt and extract:

1. businessType: "online_shop" | "portfolio" | "saas_landing" | "blog" | "corporate"
2. vertical: fashion | luxury | streetwear | toys | kids | electronics | tech | beauty | cosmetics | food | beverage | home | furniture | sports | outdoor | jewelry | watches | art | gallery | saas | software | portfolio | agency | generic
3. brandNameHint: The brand name if mentioned, or null
4. moodKeywords: Array of mood/feeling words (e.g., ["luxury", "playful", "minimal"])
5. styleDescriptors: Array of visual style words (e.g., ["dark", "colorful", "elegant"])
6. targetAudience: Description of target audience
7. priceSegment: "budget" | "mid-range" | "premium" | "luxury"
8. productHints: Array of product types mentioned
9. productCategories: Array of category names mentioned
10. requestedFeatures: Array of specific features mentioned
11. locale: "de" | "en" | "fr" | "es" (detect from language)
12. complexity: "minimal" | "standard" | "extended" | "enterprise"

EXAMPLES:

Prompt: "Ein luxuriöser Fashion Store für Designermode"
Response:
{
  "businessType": "online_shop",
  "vertical": "fashion",
  "brandNameHint": null,
  "moodKeywords": ["luxury", "exclusive", "sophisticated"],
  "styleDescriptors": ["elegant", "minimal", "dark"],
  "targetAudience": "affluent fashion-conscious adults",
  "priceSegment": "luxury",
  "productHints": ["designer clothing", "fashion"],
  "productCategories": ["women", "men", "accessories"],
  "requestedFeatures": [],
  "locale": "de",
  "complexity": "extended"
}

Prompt: "A colorful toy shop for kids called ToyWorld"
Response:
{
  "businessType": "online_shop",
  "vertical": "toys",
  "brandNameHint": "ToyWorld",
  "moodKeywords": ["playful", "fun", "colorful", "trustworthy"],
  "styleDescriptors": ["bright", "colorful", "rounded"],
  "targetAudience": "parents with young children",
  "priceSegment": "mid-range",
  "productHints": ["toys", "games"],
  "productCategories": ["toys", "games", "educational"],
  "requestedFeatures": [],
  "locale": "en",
  "complexity": "standard"
}`;

export function createInterpreterPrompt(userPrompt: string): string {
    return `Analyze this prompt and return structured JSON:

"${userPrompt}"

Return ONLY the JSON object, nothing else.`;
}

// ============================================================
// RESPONSE PARSER
// ============================================================

export function parseInterpreterResponse(response: string, originalPrompt: string): InterpretedPrompt {
    try {
        // Clean response
        let cleaned = response.trim();
        if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
        if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
        if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);

        const parsed = JSON.parse(cleaned);

        return {
            businessType: parsed.businessType || 'online_shop',
            vertical: parsed.vertical || 'generic',
            brandNameHint: parsed.brandNameHint || null,
            moodKeywords: Array.isArray(parsed.moodKeywords) ? parsed.moodKeywords : [],
            styleDescriptors: Array.isArray(parsed.styleDescriptors) ? parsed.styleDescriptors : [],
            targetAudience: parsed.targetAudience || 'general audience',
            priceSegment: parsed.priceSegment || 'mid-range',
            productHints: Array.isArray(parsed.productHints) ? parsed.productHints : [],
            productCategories: Array.isArray(parsed.productCategories) ? parsed.productCategories : [],
            requestedFeatures: Array.isArray(parsed.requestedFeatures) ? parsed.requestedFeatures : [],
            locale: parsed.locale || 'en',
            complexity: parsed.complexity || 'standard',
            originalPrompt,
        };
    } catch (error) {
        console.error('Failed to parse interpreter response:', error);

        // Fallback: basic heuristic parsing
        return fallbackParse(originalPrompt);
    }
}

// ============================================================
// FALLBACK HEURISTIC PARSER
// ============================================================

function fallbackParse(prompt: string): InterpretedPrompt {
    const lower = prompt.toLowerCase();

    // Detect vertical
    let vertical: Vertical = 'generic';
    if (lower.includes('fashion') || lower.includes('clothing') || lower.includes('mode')) vertical = 'fashion';
    else if (lower.includes('luxury') || lower.includes('luxus')) vertical = 'luxury';
    else if (lower.includes('toy') || lower.includes('spielzeug')) vertical = 'toys';
    else if (lower.includes('electronic') || lower.includes('tech')) vertical = 'electronics';
    else if (lower.includes('beauty') || lower.includes('cosmetic')) vertical = 'beauty';
    else if (lower.includes('food') || lower.includes('essen')) vertical = 'food';
    else if (lower.includes('jewelry') || lower.includes('schmuck')) vertical = 'jewelry';
    else if (lower.includes('furniture') || lower.includes('möbel')) vertical = 'furniture';

    // Detect locale
    const locale = /[äöüß]/.test(lower) ? 'de' : 'en';

    // Detect price segment
    let priceSegment: InterpretedPrompt['priceSegment'] = 'mid-range';
    if (lower.includes('luxury') || lower.includes('luxus') || lower.includes('premium')) priceSegment = 'luxury';
    else if (lower.includes('budget') || lower.includes('günstig')) priceSegment = 'budget';

    // Extract brand name (words in quotes or after "called"/"namens")
    const brandMatch = prompt.match(/(?:called|named|namens|heißt)\s+["']?(\w+)["']?/i);
    const brandNameHint = brandMatch?.[1] || null;

    // Extract mood keywords
    const moodKeywords: string[] = [];
    if (lower.includes('playful') || lower.includes('verspielt')) moodKeywords.push('playful');
    if (lower.includes('elegant') || lower.includes('eleganz')) moodKeywords.push('elegant');
    if (lower.includes('minimal') || lower.includes('minimalistisch')) moodKeywords.push('minimal');
    if (lower.includes('colorful') || lower.includes('bunt')) moodKeywords.push('colorful');
    if (lower.includes('modern')) moodKeywords.push('modern');
    if (lower.includes('classic') || lower.includes('klassisch')) moodKeywords.push('classic');

    return {
        businessType: 'online_shop',
        vertical,
        brandNameHint,
        moodKeywords,
        styleDescriptors: [],
        targetAudience: 'general audience',
        priceSegment,
        productHints: [],
        productCategories: [],
        requestedFeatures: [],
        locale,
        complexity: 'standard',
        originalPrompt: prompt,
    };
}

// ============================================================
// EXPORTS
// ============================================================

export { fallbackParse as heuristicParse };
