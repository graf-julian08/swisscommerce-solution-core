// src/core/classifier/WebsiteClassifier.ts
// Website/Shop Classifier - Determines vertical, complexity, and features

import type {
    Vertical,
    Complexity,
    BrandPersonality,
    ConversionGoal,
    PageId,
    LayoutVariant,
} from '../../dsl/schema/website.schema';
import type { InterpretedPrompt } from '../interpreter/PromptInterpreter';
import { MANDATORY_PAGES, OPTIONAL_PAGES } from '../../dsl/schema/website.schema';
import { getLayoutsForVertical, selectRandomLayout } from '../../presets/layouts';

// ============================================================
// TYPES
// ============================================================

export interface Classification {
    // Core classification
    vertical: Vertical;
    complexity: Complexity;
    conversionGoal: ConversionGoal;
    brandPersonality: BrandPersonality;

    // Pages
    requiredPages: PageId[];
    optionalPages: PageId[];

    // Features
    features: ShopFeature[];

    // Layout suggestion
    suggestedLayout: LayoutVariant;

    // Confidence
    confidence: number;
}

export type ShopFeature =
    | 'product_grid'
    | 'filters'
    | 'search'
    | 'cart'
    | 'wishlist'
    | 'reviews'
    | 'newsletter'
    | 'blog'
    | 'instagram_feed'
    | 'size_guide'
    | 'color_swatches'
    | 'quick_view'
    | 'compare'
    | 'recently_viewed';

// ============================================================
// VERTICAL → PERSONALITY MAPPING
// ============================================================

const VERTICAL_PERSONALITY_MAP: Record<Vertical, BrandPersonality[]> = {
    fashion: ['luxury-minimal', 'luxury-editorial', 'editorial-artistic'],
    luxury: ['luxury-minimal', 'luxury-bold', 'luxury-avant-garde'],
    streetwear: ['playful-energetic', 'brutalist-bold', 'tech-modern'],
    toys: ['playful-trustworthy', 'playful-energetic', 'playful-whimsical'],
    kids: ['playful-whimsical', 'playful-trustworthy', 'natural-organic'],
    electronics: ['tech-modern', 'tech-corporate', 'minimalist-clean'],
    tech: ['tech-modern', 'tech-futuristic', 'minimalist-clean'],
    beauty: ['luxury-minimal', 'natural-organic', 'editorial-artistic'],
    cosmetics: ['luxury-minimal', 'playful-energetic', 'editorial-magazine'],
    food: ['natural-organic', 'natural-rustic', 'playful-trustworthy'],
    beverage: ['natural-organic', 'luxury-minimal', 'retro-vintage'],
    home: ['natural-organic', 'minimalist-clean', 'luxury-minimal'],
    furniture: ['minimalist-clean', 'luxury-minimal', 'natural-organic'],
    sports: ['tech-modern', 'playful-energetic', 'brutalist-bold'],
    outdoor: ['natural-organic', 'natural-rustic', 'tech-modern'],
    jewelry: ['luxury-minimal', 'luxury-bold', 'luxury-editorial'],
    watches: ['luxury-minimal', 'tech-modern', 'luxury-bold'],
    art: ['editorial-artistic', 'luxury-avant-garde', 'minimalist-clean'],
    gallery: ['editorial-artistic', 'minimalist-clean', 'luxury-editorial'],
    saas: ['tech-modern', 'tech-corporate', 'minimalist-clean'],
    software: ['tech-modern', 'tech-corporate', 'minimalist-clean'],
    portfolio: ['minimalist-clean', 'editorial-artistic', 'brutalist-bold'],
    agency: ['tech-modern', 'minimalist-clean', 'brutalist-bold'],
    generic: ['minimalist-clean', 'tech-modern', 'natural-organic'],
};

// ============================================================
// VERTICAL → FEATURES MAPPING
// ============================================================

const VERTICAL_FEATURES: Record<Vertical, ShopFeature[]> = {
    fashion: ['product_grid', 'filters', 'search', 'cart', 'wishlist', 'size_guide', 'color_swatches', 'quick_view'],
    luxury: ['product_grid', 'filters', 'search', 'cart', 'wishlist', 'recently_viewed'],
    streetwear: ['product_grid', 'filters', 'search', 'cart', 'wishlist', 'instagram_feed'],
    toys: ['product_grid', 'filters', 'search', 'cart', 'wishlist', 'reviews', 'compare'],
    kids: ['product_grid', 'filters', 'search', 'cart', 'wishlist', 'reviews'],
    electronics: ['product_grid', 'filters', 'search', 'cart', 'compare', 'reviews', 'recently_viewed'],
    tech: ['product_grid', 'filters', 'search', 'cart', 'compare', 'reviews'],
    beauty: ['product_grid', 'filters', 'search', 'cart', 'wishlist', 'reviews', 'color_swatches'],
    cosmetics: ['product_grid', 'filters', 'search', 'cart', 'wishlist', 'reviews', 'quick_view'],
    food: ['product_grid', 'filters', 'search', 'cart', 'newsletter'],
    beverage: ['product_grid', 'filters', 'search', 'cart', 'newsletter'],
    home: ['product_grid', 'filters', 'search', 'cart', 'wishlist', 'recently_viewed'],
    furniture: ['product_grid', 'filters', 'search', 'cart', 'wishlist', 'compare'],
    sports: ['product_grid', 'filters', 'search', 'cart', 'size_guide', 'reviews'],
    outdoor: ['product_grid', 'filters', 'search', 'cart', 'reviews', 'compare'],
    jewelry: ['product_grid', 'filters', 'search', 'cart', 'wishlist', 'recently_viewed'],
    watches: ['product_grid', 'filters', 'search', 'cart', 'wishlist', 'compare'],
    art: ['product_grid', 'filters', 'search', 'cart', 'wishlist'],
    gallery: ['product_grid', 'filters', 'search', 'cart', 'wishlist'],
    saas: ['newsletter'],
    software: ['newsletter', 'compare'],
    portfolio: [],
    agency: ['newsletter'],
    generic: ['product_grid', 'filters', 'search', 'cart'],
};

// ============================================================
// COMPLEXITY DETERMINATION
// ============================================================

function determineComplexity(interpreted: InterpretedPrompt): Complexity {
    const { priceSegment, requestedFeatures, vertical } = interpreted;

    // Luxury always gets extended
    if (priceSegment === 'luxury') return 'extended';

    // Enterprise verticals
    if (['saas', 'software', 'agency'].includes(vertical)) return 'extended';

    // Many features requested
    if (requestedFeatures.length > 5) return 'enterprise';
    if (requestedFeatures.length > 2) return 'extended';

    // Default based on price
    if (priceSegment === 'premium') return 'extended';
    if (priceSegment === 'budget') return 'minimal';

    return 'standard';
}

// ============================================================
// CONVERSION GOAL DETERMINATION
// ============================================================

function determineConversionGoal(interpreted: InterpretedPrompt): ConversionGoal {
    const { businessType, vertical } = interpreted;

    if (businessType === 'portfolio') return 'portfolio_showcase';
    if (businessType === 'blog') return 'content_consumption';
    if (['saas', 'software', 'agency'].includes(vertical)) return 'lead_generation';

    return 'product_purchase';
}

// ============================================================
// MAIN CLASSIFIER
// ============================================================

export function classifyWebsite(interpreted: InterpretedPrompt): Classification {
    const { vertical, moodKeywords, priceSegment } = interpreted;

    // Get personality options for this vertical
    const personalityOptions = VERTICAL_PERSONALITY_MAP[vertical] || VERTICAL_PERSONALITY_MAP.generic;

    // Select personality based on mood keywords
    let brandPersonality = personalityOptions[0];

    // Mood-based adjustments
    if (moodKeywords.includes('playful') || moodKeywords.includes('fun')) {
        brandPersonality = personalityOptions.find(p => p.includes('playful')) || brandPersonality;
    }
    if (moodKeywords.includes('minimal') || moodKeywords.includes('clean')) {
        brandPersonality = personalityOptions.find(p => p.includes('minimal')) || brandPersonality;
    }
    if (moodKeywords.includes('bold') || moodKeywords.includes('dramatic')) {
        brandPersonality = personalityOptions.find(p => p.includes('bold')) || brandPersonality;
    }

    // Determine complexity
    const complexity = determineComplexity(interpreted);

    // Determine conversion goal
    const conversionGoal = determineConversionGoal(interpreted);

    // Get features for vertical
    const features = VERTICAL_FEATURES[vertical] || VERTICAL_FEATURES.generic;

    // Determine pages
    const requiredPages = [...MANDATORY_PAGES];
    const optionalPages: PageId[] = [];

    // Add optional pages based on features
    if (features.includes('wishlist')) optionalPages.push('wishlist');
    if (features.includes('blog') || features.includes('newsletter')) optionalPages.push('faq');
    if (complexity === 'extended' || complexity === 'enterprise') {
        optionalPages.push('about', 'faq', 'shipping', 'returns');
    }

    // Select layout
    const suggestedLayout = selectRandomLayout(vertical, interpreted.originalPrompt);

    // Calculate confidence
    const confidence = calculateConfidence(interpreted);

    return {
        vertical,
        complexity,
        conversionGoal,
        brandPersonality,
        requiredPages,
        optionalPages,
        features,
        suggestedLayout,
        confidence,
    };
}

function calculateConfidence(interpreted: InterpretedPrompt): number {
    let score = 0.5; // Base

    // More mood keywords = better understanding
    if (interpreted.moodKeywords.length > 0) score += 0.1;
    if (interpreted.moodKeywords.length > 2) score += 0.1;

    // Brand name mentioned = clear intent
    if (interpreted.brandNameHint) score += 0.1;

    // Product hints = clear intent
    if (interpreted.productHints.length > 0) score += 0.1;

    // Specific vertical detected (not generic)
    if (interpreted.vertical !== 'generic') score += 0.1;

    return Math.min(score, 1.0);
}

// ============================================================
// EXPORTS
// ============================================================

export { VERTICAL_PERSONALITY_MAP, VERTICAL_FEATURES };
