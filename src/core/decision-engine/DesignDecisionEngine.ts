// src/core/decision-engine/DesignDecisionEngine.ts
// Design Decision Engine - LLM generates the final Website DSL

import type {
    WebsiteDSL,
    DesignConfig,
    ColorTokensConfig,
    TypographyTokensConfig,
    LayoutVariant,
    AnimationPackType,
    UniquenessFactors,
    GlobalComponents,
    PageConfig,
    ContentConfig,
    ColorPreset,
    FontFamily,
} from '../../dsl/schema/website.schema';
import type { InterpretedPrompt } from '../interpreter/PromptInterpreter';
import type { Classification } from '../classifier/WebsiteClassifier';
import { layoutPresets } from '../../presets/layouts';
import { colorPresets } from '../../design-system/tokens/colors';
import { fontFamilyValues } from '../../design-system/tokens/typography';
import { gsapPresets } from '../../design-system/tokens/gsap-animations';

// ============================================================
// TYPES
// ============================================================

export interface DecisionEngineInput {
    interpreted: InterpretedPrompt;
    classification: Classification;
    userProducts?: unknown[];
}

export interface DecisionEngineOutput {
    dsl: WebsiteDSL;
    tokensUsed: number;
    generationTime: number;
}

// ============================================================
// SYSTEM PROMPT FOR LLM
// ============================================================

export const DECISION_ENGINE_SYSTEM_PROMPT = `You are a Design Decision Engine for an AI website builder. 

Your job is to generate a complete Website DSL(JSON) based on:
1. Interpreted prompt information
2. Website classification
3. Available presets and tokens

IMPORTANT RULES:
- Return ONLY valid JSON
    - Use ONLY the provided options for each field
        - Every shop must be UNIQUE - mix layouts, colors, and typography creatively
            - Match the brand personality to the design choices

AVAILABLE OPTIONS:

LAYOUT VARIANTS:
${Object.keys(layoutPresets).join(', ')}

COLOR PRESETS:
${Object.keys(colorPresets).join(', ')}

FONT FAMILIES:
${Object.keys(fontFamilyValues).join(', ')}

ANIMATION PACKS:
${Object.keys(gsapPresets).join(', ')}, luxury - soft, playful - bouncy, tech - sharp, editorial - fade, minimal - micro, none

RADIUS OPTIONS:
none, sm, md, lg, xl, full

SHADOW OPTIONS:
none, subtle, medium, dramatic

SPACING OPTIONS:
compact, default, spacious, airy

You must generate a complete WebsiteDSL with all required fields.`;

// ============================================================
// DECISION PROMPT GENERATOR
// ============================================================

export function createDecisionPrompt(input: DecisionEngineInput): string {
    const { interpreted, classification } = input;

    return `Generate a complete WebsiteDSL for this website:

INTERPRETED PROMPT:
- Business Type: ${interpreted.businessType}
- Vertical: ${classification.vertical}
- Brand Name: ${interpreted.brandNameHint || 'Generate one'}
- Mood Keywords: ${interpreted.moodKeywords.join(', ') || 'none specified'}
- Style Descriptors: ${interpreted.styleDescriptors.join(', ') || 'none specified'}
- Target Audience: ${interpreted.targetAudience}
- Price Segment: ${interpreted.priceSegment}
- Locale: ${interpreted.locale}

CLASSIFICATION:
- Brand Personality: ${classification.brandPersonality}
- Complexity: ${classification.complexity}
- Conversion Goal: ${classification.conversionGoal}
- Suggested Layout: ${classification.suggestedLayout}
- Features: ${classification.features.join(', ')}

ORIGINAL PROMPT: "${interpreted.originalPrompt}"

Generate a UNIQUE design that:
1. Matches the brand personality and mood
2. Uses appropriate colors(can use preset OR custom hex values)
3. Selects fitting typography(heading + body fonts)
4. Chooses the right animation pack
5. Configures spacing and radius for the brand feel

Return the complete WebsiteDSL JSON:

{
    "version": "1.0",
        "meta": { ... },
    "classification": { ... },
    "design": {
        "layoutVariant": "...",
            "tokens": {
            "colors": { "preset": "...", "primary": "#...", ... },
            "typography": { "fontFamily": { "heading": "...", "body": "..." }, ... },
            "spacing": "...",
                "radius": "...",
                    "shadows": "..."
        },
        "animationPack": "...",
            "gsapConfig": { ... }
    },
    "pages": [...],
        "globalComponents": { ... },
    "content": { ... }
} `;
}

// ============================================================
// RESPONSE PARSER
// ============================================================

export function parseDecisionResponse(
    response: string,
    input: DecisionEngineInput
): WebsiteDSL {
    try {
        // Clean response
        let cleaned = response.trim();
        if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
        if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
        if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);

        const parsed = JSON.parse(cleaned);

        // Validate and fill missing fields with defaults
        return validateAndFillDSL(parsed, input);
    } catch (error) {
        console.error('Failed to parse decision engine response:', error);

        // Fallback: generate deterministic DSL
        return generateDeterministicDSL(input);
    }
}

// ============================================================
// VALIDATION AND GAP-FILLING
// ============================================================

function validateAndFillDSL(parsed: Partial<WebsiteDSL>, input: DecisionEngineInput): WebsiteDSL {
    const { interpreted, classification } = input;

    const brandName = interpreted.brandNameHint || generateBrandName(classification.vertical);

    return {
        version: '1.0',
        meta: {
            generatedAt: new Date().toISOString(),
            promptHash: hashString(interpreted.originalPrompt),
            locale: interpreted.locale,
            framework: 'nextjs',
            ...parsed.meta,
        },
        classification: {
            websiteType: interpreted.businessType,
            vertical: classification.vertical,
            complexity: classification.complexity,
            conversionGoal: classification.conversionGoal,
            brandPersonality: classification.brandPersonality,
            uniquenessFactors: parsed.classification?.uniquenessFactors || generateUniquenessFactors(interpreted),
        },
        design: fillDesignConfig(parsed.design, input),
        pages: parsed.pages || getDefaultPages(classification),
        globalComponents: parsed.globalComponents || getDefaultGlobalComponents(brandName, classification),
        content: fillContentConfig(parsed.content, brandName, interpreted),
    };
}

function fillDesignConfig(partial: Partial<DesignConfig> | undefined, input: DecisionEngineInput): DesignConfig {
    const { classification, interpreted } = input;

    // Default colors based on personality
    const defaultColorPreset = getDefaultColorPreset(classification.brandPersonality) as keyof typeof colorPresets;
    const presetKey = (partial?.tokens?.colors?.preset || defaultColorPreset) as keyof typeof colorPresets;
    const colors = colorPresets[presetKey];

    return {
        layoutVariant: partial?.layoutVariant || classification.suggestedLayout,
        tokens: {
            colors: {
                preset: partial?.tokens?.colors?.preset || defaultColorPreset as ColorPreset,
                primary: partial?.tokens?.colors?.primary || colors.primary,
                secondary: partial?.tokens?.colors?.secondary || colors.secondary,
                background: partial?.tokens?.colors?.background || colors.background,
                foreground: partial?.tokens?.colors?.foreground || colors.foreground,
                accent: partial?.tokens?.colors?.accent || colors.accent,
                muted: partial?.tokens?.colors?.muted || colors.muted,
            },
            typography: {
                fontFamily: {
                    heading: partial?.tokens?.typography?.fontFamily?.heading || getDefaultHeadingFont(classification.brandPersonality) as FontFamily,
                    body: partial?.tokens?.typography?.fontFamily?.body || 'inter',
                },
                scale: partial?.tokens?.typography?.scale || 'default',
                headingWeight: partial?.tokens?.typography?.headingWeight || 500,
                headingStyle: partial?.tokens?.typography?.headingStyle || 'normal',
                letterSpacing: partial?.tokens?.typography?.letterSpacing || 'normal',
            },
            spacing: partial?.tokens?.spacing || getDefaultSpacing(classification.brandPersonality),
            radius: partial?.tokens?.radius || getDefaultRadius(classification.brandPersonality),
            shadows: partial?.tokens?.shadows || 'subtle',
        },
        animationPack: partial?.animationPack || getDefaultAnimationPack(classification.brandPersonality),
        gsapConfig: partial?.gsapConfig || {
            scrollTrigger: true,
            staggerAnimations: true,
            parallaxEnabled: true,
            cursorFollower: false,
            magneticButtons: classification.brandPersonality.includes('luxury'),
            textReveal: 'fade',
            imageReveal: 'fade',
        },
    };
}

function fillContentConfig(partial: Partial<ContentConfig> | undefined, brandName: string, interpreted: InterpretedPrompt): ContentConfig {
    return {
        brand: {
            name: partial?.brand?.name || brandName,
            tagline: partial?.brand?.tagline || generateTagline(interpreted.vertical, interpreted.moodKeywords),
            description: partial?.brand?.description || '',
        },
        hero: partial?.hero || {
            headline: generateHeadline(brandName, interpreted.moodKeywords),
            subheadline: '',
            ctaText: interpreted.locale === 'de' ? 'Jetzt entdecken' : 'Shop Now',
            ctaLink: '/shop',
            mediaType: 'image',
            mediaUrl: '/images/hero.jpg',
        },
        products: partial?.products || [],
        categories: partial?.categories || [],
        testimonials: partial?.testimonials || [],
        features: partial?.features || [],
        legalContent: partial?.legalContent || {
            impressum: '',
            privacy: '',
            terms: '',
            shipping: '',
            returns: '',
        },
    };
}

// ============================================================
// DETERMINISTIC FALLBACK DSL GENERATOR
// ============================================================

export function generateDeterministicDSL(input: DecisionEngineInput): WebsiteDSL {
    const { interpreted, classification } = input;
    const brandName = interpreted.brandNameHint || generateBrandName(classification.vertical);

    return validateAndFillDSL({}, input);
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getDefaultColorPreset(personality: string): string {
    if (personality.includes('luxury')) return 'luxury-dark';
    if (personality.includes('playful')) return 'playful-bright';
    if (personality.includes('tech')) return 'tech-mono';
    if (personality.includes('natural')) return 'natural-warm';
    if (personality.includes('editorial')) return 'editorial-bw';
    return 'fashion-noir';
}

function getDefaultHeadingFont(personality: string): string {
    if (personality.includes('luxury')) return 'cormorant';
    if (personality.includes('playful')) return 'quicksand';
    if (personality.includes('tech')) return 'space-grotesk';
    if (personality.includes('editorial')) return 'playfair';
    if (personality.includes('brutalist')) return 'bebas-neue';
    return 'outfit';
}

function getDefaultSpacing(personality: string): 'compact' | 'default' | 'spacious' | 'airy' {
    if (personality.includes('luxury') || personality.includes('minimal')) return 'airy';
    if (personality.includes('playful')) return 'spacious';
    if (personality.includes('tech')) return 'default';
    if (personality.includes('brutalist')) return 'compact';
    return 'default';
}

function getDefaultRadius(personality: string): 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full' {
    if (personality.includes('luxury') || personality.includes('editorial')) return 'none';
    if (personality.includes('playful')) return 'xl';
    if (personality.includes('tech')) return 'lg';
    if (personality.includes('brutalist')) return 'none';
    return 'md';
}

function getDefaultAnimationPack(personality: string): AnimationPackType {
    if (personality.includes('luxury')) return 'gsap-cinematic';
    if (personality.includes('playful')) return 'gsap-playful';
    if (personality.includes('tech')) return 'tech-sharp';
    if (personality.includes('editorial')) return 'editorial-fade';
    return 'gsap-smooth';
}

function generateBrandName(vertical: string): string {
    const prefixes: Record<string, string[]> = {
        fashion: ['Atelier', 'Maison', 'Studio', 'Luxe'],
        toys: ['Joy', 'Play', 'Happy', 'Fun'],
        electronics: ['Tech', 'Digital', 'Smart', 'Volt'],
        beauty: ['Glow', 'Pure', 'Bloom', 'Radiant'],
        default: ['Modern', 'Prime', 'Elite', 'Nova'],
    };

    const list = prefixes[vertical] || prefixes.default;
    const prefix = list[Math.floor(Math.random() * list.length)];
    const suffix = ['Co', 'Studio', 'House', 'Shop'][Math.floor(Math.random() * 4)];

    return `${prefix} ${suffix}`;
}

function generateTagline(vertical: string, moodKeywords: string[]): string {
    if (moodKeywords.includes('luxury')) return 'Where Elegance Meets Excellence';
    if (moodKeywords.includes('playful')) return 'Fun for Everyone';
    if (moodKeywords.includes('minimal')) return 'Less is More';
    if (moodKeywords.includes('modern')) return 'Designed for Tomorrow';
    return 'Quality You Can Trust';
}

function generateHeadline(brandName: string, moodKeywords: string[]): string {
    if (moodKeywords.includes('luxury')) return 'Discover Timeless Elegance';
    if (moodKeywords.includes('playful')) return 'Welcome to the Fun';
    if (moodKeywords.includes('new')) return 'New Collection';
    return 'New Arrivals';
}

function generateUniquenessFactors(interpreted: InterpretedPrompt): UniquenessFactors {
    return {
        colorMood: interpreted.moodKeywords.join(' ') || 'sophisticated neutral',
        layoutDNA: 'balanced',
        typographyMood: 'clean modern',
        animationIntensity: interpreted.priceSegment === 'luxury' ? 'subtle' : 'moderate',
        visualDensity: 'balanced',
        imageStyle: interpreted.priceSegment === 'luxury' ? 'editorial' : 'product-focused',
        interactionStyle: 'smooth',
    };
}

function getDefaultPages(classification: Classification): PageConfig[] {
    // Full 15+ page e-commerce system
    const allPages: PageConfig[] = [
        // ============== HOME ==============
        {
            id: 'home',
            path: '/',
            title: 'Home',
            sections: [
                {
                    id: 'hero',
                    component: { type: 'hero', variant: 'fullscreen', props: { height: '100vh', overlay: true } },
                    order: 1,
                    visibility: 'always',
                },
                {
                    id: 'announcement',
                    component: { type: 'announcement-bar', variant: 'sliding', props: { messages: ['Free Shipping over €100', 'New Collection Available'] } },
                    order: 2,
                    visibility: 'always',
                },
                {
                    id: 'categories',
                    component: { type: 'category-grid', variant: 'hover-zoom', props: { columns: 4 } },
                    order: 3,
                    visibility: 'always',
                },
                {
                    id: 'featured-products',
                    component: { type: 'product-grid', variant: 'featured', props: { columns: 4, limit: 8, title: 'New Arrivals' } },
                    order: 4,
                    visibility: 'always',
                },
                {
                    id: 'promo-banner',
                    component: { type: 'promo-banner', variant: 'split', props: {} },
                    order: 5,
                    visibility: 'always',
                },
                {
                    id: 'bestsellers',
                    component: { type: 'product-carousel', variant: 'default', props: { title: 'Bestsellers' } },
                    order: 6,
                    visibility: 'always',
                },
                {
                    id: 'testimonials',
                    component: { type: 'testimonials', variant: 'carousel', props: { limit: 5 } },
                    order: 7,
                    visibility: 'always',
                },
                {
                    id: 'newsletter',
                    component: { type: 'newsletter', variant: 'fullwidth', props: {} },
                    order: 8,
                    visibility: 'always',
                },
            ],
        },
        // ============== SHOP ==============
        {
            id: 'shop',
            path: '/shop',
            title: 'Shop',
            sections: [
                {
                    id: 'breadcrumb',
                    component: { type: 'breadcrumb', variant: 'default', props: {} },
                    order: 1,
                    visibility: 'always',
                },
                {
                    id: 'filters',
                    component: { type: 'filter-bar', variant: 'horizontal-dropdown', props: { filters: ['category', 'price', 'size', 'color'] } },
                    order: 2,
                    visibility: 'always',
                },
                {
                    id: 'active-filters',
                    component: { type: 'active-filters', variant: 'pills', props: {} },
                    order: 3,
                    visibility: 'always',
                },
                {
                    id: 'products',
                    component: { type: 'product-grid', variant: 'default', props: { columns: 4 } },
                    order: 4,
                    visibility: 'always',
                },
                {
                    id: 'pagination',
                    component: { type: 'pagination', variant: 'numbered', props: {} },
                    order: 5,
                    visibility: 'always',
                },
            ],
        },
        // ============== PRODUCT DETAIL ==============
        {
            id: 'product',
            path: '/product/[id]',
            title: 'Product',
            sections: [
                {
                    id: 'breadcrumb',
                    component: { type: 'breadcrumb', variant: 'default', props: {} },
                    order: 1,
                    visibility: 'always',
                },
                {
                    id: 'product-gallery',
                    component: { type: 'product-gallery', variant: 'thumbnails', props: { zoom: true, lightbox: true } },
                    order: 2,
                    visibility: 'always',
                },
                {
                    id: 'product-info',
                    component: { type: 'product-info', variant: 'default', props: {} },
                    order: 3,
                    visibility: 'always',
                },
                {
                    id: 'variant-selector',
                    component: { type: 'variant-selector', variant: 'buttons', props: {} },
                    order: 4,
                    visibility: 'always',
                },
                {
                    id: 'add-to-cart',
                    component: { type: 'add-to-cart', variant: 'sticky', props: {} },
                    order: 5,
                    visibility: 'always',
                },
                {
                    id: 'product-tabs',
                    component: { type: 'product-tabs', variant: 'default', props: { tabs: ['Description', 'Details', 'Shipping', 'Reviews'] } },
                    order: 6,
                    visibility: 'always',
                },
                {
                    id: 'recommendations',
                    component: { type: 'product-carousel', variant: 'default', props: { title: 'You May Also Like' } },
                    order: 7,
                    visibility: 'always',
                },
            ],
        },
        // ============== CART ==============
        {
            id: 'cart',
            path: '/cart',
            title: 'Cart',
            sections: [
                {
                    id: 'cart-header',
                    component: { type: 'page-header', variant: 'simple', props: { title: 'Shopping Cart' } },
                    order: 1,
                    visibility: 'always',
                },
                {
                    id: 'cart-items',
                    component: { type: 'cart-items', variant: 'full', props: { editable: true } },
                    order: 2,
                    visibility: 'always',
                },
                {
                    id: 'cart-summary',
                    component: { type: 'cart-summary', variant: 'sidebar', props: {} },
                    order: 3,
                    visibility: 'always',
                },
                {
                    id: 'cart-recommendations',
                    component: { type: 'product-carousel', variant: 'compact', props: { title: 'Complete Your Look' } },
                    order: 4,
                    visibility: 'always',
                },
            ],
        },
        // ============== CHECKOUT ==============
        {
            id: 'checkout',
            path: '/checkout',
            title: 'Checkout',
            sections: [
                {
                    id: 'checkout-header',
                    component: { type: 'checkout-header', variant: 'minimal', props: {} },
                    order: 1,
                    visibility: 'always',
                },
                {
                    id: 'checkout-steps',
                    component: { type: 'checkout-steps', variant: 'horizontal', props: { steps: ['Shipping', 'Payment', 'Review'] } },
                    order: 2,
                    visibility: 'always',
                },
                {
                    id: 'shipping-form',
                    component: { type: 'shipping-form', variant: 'default', props: {} },
                    order: 3,
                    visibility: 'always',
                },
                {
                    id: 'payment-form',
                    component: { type: 'payment-form', variant: 'default', props: { methods: ['card', 'paypal', 'klarna'] } },
                    order: 4,
                    visibility: 'always',
                },
                {
                    id: 'order-summary',
                    component: { type: 'order-summary', variant: 'sidebar', props: {} },
                    order: 5,
                    visibility: 'always',
                },
            ],
        },
        // ============== ORDER CONFIRMATION ==============
        {
            id: 'order-confirmation',
            path: '/order/[id]',
            title: 'Order Confirmation',
            sections: [
                {
                    id: 'confirmation-header',
                    component: { type: 'confirmation-header', variant: 'success', props: {} },
                    order: 1,
                    visibility: 'always',
                },
                {
                    id: 'order-details',
                    component: { type: 'order-details', variant: 'default', props: {} },
                    order: 2,
                    visibility: 'always',
                },
                {
                    id: 'order-items',
                    component: { type: 'order-items', variant: 'compact', props: {} },
                    order: 3,
                    visibility: 'always',
                },
                {
                    id: 'continue-shopping',
                    component: { type: 'cta-button', variant: 'centered', props: { text: 'Continue Shopping', href: '/shop' } },
                    order: 4,
                    visibility: 'always',
                },
            ],
        },
        // ============== LOGIN ==============
        {
            id: 'login',
            path: '/login',
            title: 'Login',
            sections: [
                {
                    id: 'login-form',
                    component: { type: 'login-form', variant: 'centered-minimal', props: { showSocialLogin: true } },
                    order: 1,
                    visibility: 'always',
                },
            ],
        },
        // ============== REGISTER ==============
        {
            id: 'register',
            path: '/register',
            title: 'Register',
            sections: [
                {
                    id: 'register-form',
                    component: { type: 'register-form', variant: 'centered-minimal', props: { showTerms: true } },
                    order: 1,
                    visibility: 'always',
                },
            ],
        },
        // ============== ACCOUNT ==============
        {
            id: 'account',
            path: '/account',
            title: 'My Account',
            sections: [
                {
                    id: 'account-header',
                    component: { type: 'account-header', variant: 'default', props: {} },
                    order: 1,
                    visibility: 'always',
                },
                {
                    id: 'account-tabs',
                    component: { type: 'account-tabs', variant: 'vertical', props: { tabs: ['Profile', 'Orders', 'Addresses', 'Wishlist', 'Settings'] } },
                    order: 2,
                    visibility: 'always',
                },
            ],
        },
        // ============== WISHLIST ==============
        {
            id: 'wishlist',
            path: '/wishlist',
            title: 'Wishlist',
            sections: [
                {
                    id: 'wishlist-header',
                    component: { type: 'page-header', variant: 'simple', props: { title: 'My Wishlist' } },
                    order: 1,
                    visibility: 'always',
                },
                {
                    id: 'wishlist-items',
                    component: { type: 'wishlist-grid', variant: 'default', props: { columns: 4 } },
                    order: 2,
                    visibility: 'always',
                },
                {
                    id: 'share-wishlist',
                    component: { type: 'share-buttons', variant: 'minimal', props: {} },
                    order: 3,
                    visibility: 'always',
                },
            ],
        },
        // ============== CONTACT ==============
        {
            id: 'contact',
            path: '/contact',
            title: 'Contact',
            sections: [
                {
                    id: 'contact-header',
                    component: { type: 'page-header', variant: 'centered', props: { title: 'Get in Touch' } },
                    order: 1,
                    visibility: 'always',
                },
                {
                    id: 'contact-info',
                    component: { type: 'contact-info', variant: 'cards', props: {} },
                    order: 2,
                    visibility: 'always',
                },
                {
                    id: 'contact-form',
                    component: { type: 'contact-form', variant: 'default', props: {} },
                    order: 3,
                    visibility: 'always',
                },
                {
                    id: 'store-locations',
                    component: { type: 'store-map', variant: 'interactive', props: {} },
                    order: 4,
                    visibility: 'always',
                },
            ],
        },
        // ============== ABOUT ==============
        {
            id: 'about',
            path: '/about',
            title: 'About',
            sections: [
                {
                    id: 'about-hero',
                    component: { type: 'content-hero', variant: 'parallax', props: { title: 'Our Story' } },
                    order: 1,
                    visibility: 'always',
                },
                {
                    id: 'brand-story',
                    component: { type: 'rich-text', variant: 'centered', props: {} },
                    order: 2,
                    visibility: 'always',
                },
                {
                    id: 'values',
                    component: { type: 'values-grid', variant: 'icons', props: { columns: 3 } },
                    order: 3,
                    visibility: 'always',
                },
                {
                    id: 'team',
                    component: { type: 'team-grid', variant: 'cards', props: { columns: 4 } },
                    order: 4,
                    visibility: 'always',
                },
            ],
        },
        // ============== IMPRESSUM ==============
        {
            id: 'impressum',
            path: '/impressum',
            title: 'Impressum',
            sections: [
                {
                    id: 'legal-header',
                    component: { type: 'page-header', variant: 'simple', props: { title: 'Impressum' } },
                    order: 1,
                    visibility: 'always',
                },
                {
                    id: 'legal',
                    component: { type: 'legal-content', variant: 'simple', props: { contentKey: 'impressum' } },
                    order: 2,
                    visibility: 'always',
                },
            ],
        },
        // ============== PRIVACY ==============
        {
            id: 'privacy',
            path: '/privacy',
            title: 'Privacy Policy',
            sections: [
                {
                    id: 'legal-header',
                    component: { type: 'page-header', variant: 'simple', props: { title: 'Privacy Policy' } },
                    order: 1,
                    visibility: 'always',
                },
                {
                    id: 'legal',
                    component: { type: 'legal-content', variant: 'simple', props: { contentKey: 'privacy' } },
                    order: 2,
                    visibility: 'always',
                },
            ],
        },
        // ============== TERMS ==============
        {
            id: 'terms',
            path: '/terms',
            title: 'Terms & Conditions',
            sections: [
                {
                    id: 'legal-header',
                    component: { type: 'page-header', variant: 'simple', props: { title: 'Terms & Conditions' } },
                    order: 1,
                    visibility: 'always',
                },
                {
                    id: 'legal',
                    component: { type: 'legal-content', variant: 'simple', props: { contentKey: 'terms' } },
                    order: 2,
                    visibility: 'always',
                },
            ],
        },
        // ============== SHIPPING ==============
        {
            id: 'shipping',
            path: '/shipping',
            title: 'Shipping & Returns',
            sections: [
                {
                    id: 'shipping-header',
                    component: { type: 'page-header', variant: 'simple', props: { title: 'Shipping & Returns' } },
                    order: 1,
                    visibility: 'always',
                },
                {
                    id: 'shipping-info',
                    component: { type: 'shipping-info', variant: 'tabs', props: { tabs: ['Shipping', 'Returns', 'FAQ'] } },
                    order: 2,
                    visibility: 'always',
                },
            ],
        },
    ];

    return allPages;
}

function getDefaultGlobalComponents(brandName: string, classification: Classification): GlobalComponents {
    return {
        header: {
            variant: 'centered-logo',
            sticky: true,
            transparent: false,
            elements: {
                logo: true,
                search: true,
                cart: true,
                wishlist: true,
                account: true,
                languageSelector: false,
                currencySelector: false,
                navigation: [
                    { label: 'Shop', href: '/shop' },
                    { label: 'New', href: '/shop?filter=new' },
                    { label: 'Sale', href: '/shop?filter=sale' },
                ],
            },
        },
        footer: {
            variant: 'multi-column',
            columns: [],
            showNewsletter: true,
            showSocials: true,
            showPaymentIcons: true,
            copyright: `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`,
            legalLinks: [
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
                { label: 'Impressum', href: '/impressum' },
            ],
        },
        cartDrawer: {
            variant: 'slide-right',
            showRecommendations: true,
            showShippingProgress: true,
        },
        mobileMenu: {
            variant: 'fullscreen',
            showSearch: true,
            showAccount: true,
            animation: 'slide',
        },
        searchOverlay: {
            variant: 'fullscreen',
            showRecentSearches: true,
            showSuggestions: true,
            showProducts: true,
        },
        cookieBanner: {
            variant: 'bottom-bar',
            position: 'bottom',
        },
    };
}

function hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString(16);
}

// ============================================================
// EXPORTS
// ============================================================

export { generateBrandName, generateTagline };
