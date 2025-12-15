// src/core/render-engine/HeaderFactory.ts
// Factory to select and configure header designs from the polished component library

import type { HeaderConfig, BrandPersonality } from '../../dsl/schema/website.schema';

// ============================================================
// HEADER DESIGN METADATA
// ============================================================

export interface HeaderDesignMetadata {
    id: string;
    name: string;
    description: string;
    componentPath: string;
    personalities: BrandPersonality[];
    features: HeaderFeature[];
    layout: HeaderLayoutType;
    complexity: 'simple' | 'standard' | 'complex';
}

export type HeaderFeature =
    | 'mega-menu'
    | 'side-drawer'
    | 'fullscreen-search'
    | 'dropdown-search'
    | 'cart-drawer'
    | 'cart-hover'
    | 'wishlist'
    | 'account'
    | 'announcement-bar'
    | 'language-selector'
    | 'stacked-nav'
    | 'split-layout'
    | 'centered-logo'
    | 'transparent-mode'
    | 'sticky';

export type HeaderLayoutType =
    | 'centered-logo'
    | 'split-nav'
    | 'stacked'
    | 'hamburger-first'
    | 'minimal'
    | 'mega-menu';

// ============================================================
// 11 POLISHED HEADER DESIGNS
// ============================================================

export const HEADER_DESIGNS: HeaderDesignMetadata[] = [
    {
        id: 'design-1',
        name: 'Luxury Editorial',
        description: 'Side drawer menu, two-part search overlay, floating menu button, cart slide-out panel. Clean Helvetica typography.',
        componentPath: 'fashion/header/Design1',
        personalities: ['luxury-minimal', 'luxury-editorial', 'editorial-magazine', 'minimalist-clean'],
        features: ['side-drawer', 'fullscreen-search', 'cart-drawer', 'wishlist', 'account', 'sticky', 'transparent-mode'],
        layout: 'centered-logo',
        complexity: 'complex',
    },
    {
        id: 'design-2',
        name: 'Fashion Mega Menu',
        description: 'Full mega menu dropdowns, rich category navigation, promotional imagery in menu. Modern sans-serif.',
        componentPath: 'fashion/header/Design2',
        personalities: ['luxury-bold', 'editorial-magazine', 'maximalist-bold'],
        features: ['mega-menu', 'fullscreen-search', 'cart-drawer', 'wishlist', 'account', 'sticky'],
        layout: 'mega-menu',
        complexity: 'complex',
    },
    {
        id: 'design-3',
        name: 'Elegant Split Navigation',
        description: 'Navigation split around centered logo, elegant dropdowns, refined hover states.',
        componentPath: 'fashion/header/Design3',
        personalities: ['luxury-minimal', 'luxury-editorial', 'natural-organic'],
        features: ['mega-menu', 'dropdown-search', 'cart-hover', 'wishlist', 'account', 'sticky'],
        layout: 'split-nav',
        complexity: 'complex',
    },
    {
        id: 'design-4',
        name: 'Stacked Logo Modern',
        description: 'Logo above navigation bar, full-width nav with dynamic dropdown content. Swiss-inspired typography.',
        componentPath: 'fashion/header/Design4',
        personalities: ['tech-modern', 'minimalist-clean', 'luxury-avant-garde'],
        features: ['stacked-nav', 'fullscreen-search', 'cart-drawer', 'wishlist', 'account', 'sticky'],
        layout: 'stacked',
        complexity: 'standard',
    },
    {
        id: 'design-5',
        name: 'Hamburger Luxury',
        description: 'Left hamburger menu as primary navigation, clean icon-based utilities. Elegant side panel.',
        componentPath: 'fashion/header/Design5',
        personalities: ['luxury-minimal', 'editorial-artistic', 'minimalist-clean'],
        features: ['side-drawer', 'fullscreen-search', 'cart-drawer', 'wishlist', 'account', 'sticky', 'transparent-mode'],
        layout: 'hamburger-first',
        complexity: 'standard',
    },
    {
        id: 'design-6',
        name: 'Editorial Magazine',
        description: 'Bold magazine-style header with oversized typography, statement navigation.',
        componentPath: 'fashion/header/Design6',
        personalities: ['editorial-magazine', 'editorial-artistic', 'brutalist-bold'],
        features: ['mega-menu', 'fullscreen-search', 'cart-drawer', 'wishlist', 'account', 'sticky'],
        layout: 'centered-logo',
        complexity: 'complex',
    },
    {
        id: 'design-7',
        name: 'Clean Minimal',
        description: 'Minimal header with essential elements only. Perfect for content-first brands.',
        componentPath: 'fashion/header/Design7',
        personalities: ['minimalist-clean', 'natural-organic', 'natural-rustic'],
        features: ['side-drawer', 'dropdown-search', 'cart-drawer', 'sticky'],
        layout: 'minimal',
        complexity: 'simple',
    },
    {
        id: 'design-8',
        name: 'Tech Forward',
        description: 'Modern tech-inspired header with crisp lines and subtle animations.',
        componentPath: 'fashion/header/Design8',
        personalities: ['tech-modern', 'tech-corporate', 'tech-futuristic'],
        features: ['mega-menu', 'dropdown-search', 'cart-hover', 'account', 'sticky'],
        layout: 'split-nav',
        complexity: 'simple',
    },
    {
        id: 'design-9',
        name: 'Playful Brand',
        description: 'Friendly, approachable header with soft curves and warm interactions.',
        componentPath: 'fashion/header/Design9',
        personalities: ['playful-trustworthy', 'playful-energetic', 'playful-whimsical'],
        features: ['side-drawer', 'fullscreen-search', 'cart-drawer', 'wishlist', 'sticky'],
        layout: 'centered-logo',
        complexity: 'standard',
    },
    {
        id: 'design-10',
        name: 'Avant-Garde',
        description: 'Bold asymmetric layout with grid separators, experimental typography.',
        componentPath: 'fashion/header/Design10',
        personalities: ['luxury-avant-garde', 'brutalist-bold', 'editorial-artistic'],
        features: ['side-drawer', 'fullscreen-search', 'cart-drawer', 'account', 'sticky'],
        layout: 'hamburger-first',
        complexity: 'complex',
    },
    {
        id: 'design-11',
        name: 'Premium Multi-Column Search',
        description: 'Refined header with expansive multi-column search panel showing trending, products, and categories.',
        componentPath: 'fashion/header/Design11',
        personalities: ['luxury-minimal', 'luxury-bold', 'editorial-magazine'],
        features: ['side-drawer', 'fullscreen-search', 'cart-drawer', 'wishlist', 'account', 'sticky'],
        layout: 'centered-logo',
        complexity: 'complex',
    },
];

// ============================================================
// SELECTION LOGIC
// ============================================================

/**
 * Select the best header design based on brand personality and config
 */
export function selectHeaderDesign(
    personality: BrandPersonality,
    config?: Partial<HeaderConfig>
): HeaderDesignMetadata {
    // Find designs matching the personality
    const matchingDesigns = HEADER_DESIGNS.filter(
        design => design.personalities.includes(personality)
    );

    if (matchingDesigns.length === 0) {
        // Fallback to Design 1 (most versatile)
        return HEADER_DESIGNS[0];
    }

    // If config specifies features, prefer designs with those features
    if (config?.elements) {
        const preferMegaMenu = config.elements.navigation?.some(n => n.megaMenu);
        if (preferMegaMenu) {
            const megaMenuDesigns = matchingDesigns.filter(d => d.features.includes('mega-menu'));
            if (megaMenuDesigns.length > 0) {
                return megaMenuDesigns[Math.floor(Math.random() * megaMenuDesigns.length)];
            }
        }
    }

    // Prefer variety - use random selection from matching designs
    const randomIndex = Math.floor(Math.random() * matchingDesigns.length);
    return matchingDesigns[randomIndex];
}

/**
 * Get all header designs available for a personality
 */
export function getAvailableHeaderDesigns(personality: BrandPersonality): HeaderDesignMetadata[] {
    return HEADER_DESIGNS.filter(design => design.personalities.includes(personality));
}

/**
 * Get header design by ID
 */
export function getHeaderDesignById(id: string): HeaderDesignMetadata | undefined {
    return HEADER_DESIGNS.find(design => design.id === id);
}

// ============================================================
// CONFIGURATION GENERATION
// ============================================================

/**
 * Generate header config with brand-specific data
 */
export function generateHeaderConfig(
    design: HeaderDesignMetadata,
    brandName: string,
    navigation: { label: string; href: string }[]
): HeaderConfig {
    return {
        variant: mapLayoutToVariant(design.layout),
        sticky: design.features.includes('sticky'),
        transparent: design.features.includes('transparent-mode'),
        elements: {
            logo: true,
            search: design.features.includes('fullscreen-search') || design.features.includes('dropdown-search'),
            cart: design.features.includes('cart-drawer') || design.features.includes('cart-hover'),
            wishlist: design.features.includes('wishlist'),
            account: design.features.includes('account'),
            languageSelector: design.features.includes('language-selector'),
            currencySelector: false,
            navigation: navigation,
        },
    };
}

function mapLayoutToVariant(layout: HeaderLayoutType): HeaderConfig['variant'] {
    const mapping: Record<HeaderLayoutType, HeaderConfig['variant']> = {
        'centered-logo': 'centered-logo',
        'split-nav': 'split-nav',
        'stacked': 'luxury-editorial',
        'hamburger-first': 'hamburger-only',
        'minimal': 'minimal',
        'mega-menu': 'mega-menu',
    };
    return mapping[layout];
}

// ============================================================
// EXPORTS
// ============================================================

export {
    HEADER_DESIGNS as default,
};
