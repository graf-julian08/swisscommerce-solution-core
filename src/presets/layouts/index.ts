// src/presets/layouts/index.ts
// Layout Presets - For 100% Unique Shops

import type { LayoutVariant, DesignConfig } from '../../dsl/schema/website.schema';

export interface LayoutPreset {
    id: LayoutVariant;
    name: string;
    description: string;
    suitableFor: string[];
    heroHeight: string;
    gridColumns: number;
    asymmetric: boolean;
    whitespaceLevel: 'dense' | 'balanced' | 'airy' | 'ultra-airy';
}

export const layoutPresets: Record<LayoutVariant, LayoutPreset> = {
    // ============================================================
    // HERO-FOCUSED LAYOUTS
    // ============================================================
    'hero-carousel-grid': {
        id: 'hero-carousel-grid',
        name: 'Hero Carousel + Grid',
        description: 'Full-width hero carousel followed by product grid',
        suitableFor: ['fashion', 'electronics', 'home'],
        heroHeight: '100vh',
        gridColumns: 4,
        asymmetric: false,
        whitespaceLevel: 'balanced',
    },
    'hero-split-masonry': {
        id: 'hero-split-masonry',
        name: 'Split Hero + Masonry',
        description: '50/50 split hero with masonry product layout',
        suitableFor: ['fashion', 'art', 'photography'],
        heroHeight: '100vh',
        gridColumns: 3,
        asymmetric: true,
        whitespaceLevel: 'airy',
    },
    'hero-fullscreen-video': {
        id: 'hero-fullscreen-video',
        name: 'Fullscreen Video Hero',
        description: 'Immersive video hero with scroll-triggered content',
        suitableFor: ['luxury', 'fashion', 'automotive'],
        heroHeight: '100vh',
        gridColumns: 4,
        asymmetric: false,
        whitespaceLevel: 'ultra-airy',
    },
    'hero-parallax-layers': {
        id: 'hero-parallax-layers',
        name: 'Parallax Layers',
        description: 'Multi-layer parallax hero with depth effect',
        suitableFor: ['tech', 'gaming', 'sports'],
        heroHeight: '120vh',
        gridColumns: 3,
        asymmetric: true,
        whitespaceLevel: 'balanced',
    },
    'hero-text-only': {
        id: 'hero-text-only',
        name: 'Typography Hero',
        description: 'Bold typography-focused hero, minimal imagery',
        suitableFor: ['agency', 'portfolio', 'saas'],
        heroHeight: '80vh',
        gridColumns: 3,
        asymmetric: false,
        whitespaceLevel: 'ultra-airy',
    },

    // ============================================================
    // GRID-FOCUSED LAYOUTS
    // ============================================================
    'grid-first': {
        id: 'grid-first',
        name: 'Grid First',
        description: 'Product grid as the primary focus, minimal hero',
        suitableFor: ['electronics', 'toys', 'accessories'],
        heroHeight: '40vh',
        gridColumns: 4,
        asymmetric: false,
        whitespaceLevel: 'balanced',
    },
    'grid-masonry': {
        id: 'grid-masonry',
        name: 'Masonry Grid',
        description: 'Pinterest-style masonry layout for visual products',
        suitableFor: ['fashion', 'art', 'home'],
        heroHeight: '60vh',
        gridColumns: 4,
        asymmetric: true,
        whitespaceLevel: 'balanced',
    },
    'grid-pinterest': {
        id: 'grid-pinterest',
        name: 'Pinterest Style',
        description: 'Variable height cards, dense visual layout',
        suitableFor: ['fashion', 'beauty', 'home'],
        heroHeight: '50vh',
        gridColumns: 5,
        asymmetric: true,
        whitespaceLevel: 'dense',
    },
    'grid-magazine': {
        id: 'grid-magazine',
        name: 'Magazine Grid',
        description: 'Editorial grid with mixed sizes and featured items',
        suitableFor: ['fashion', 'luxury', 'lifestyle'],
        heroHeight: '70vh',
        gridColumns: 3,
        asymmetric: true,
        whitespaceLevel: 'airy',
    },

    // ============================================================
    // MINIMAL LAYOUTS
    // ============================================================
    'minimal-centered': {
        id: 'minimal-centered',
        name: 'Minimal Centered',
        description: 'Ultra-clean, centered content with lots of whitespace',
        suitableFor: ['luxury', 'jewelry', 'watches'],
        heroHeight: '100vh',
        gridColumns: 3,
        asymmetric: false,
        whitespaceLevel: 'ultra-airy',
    },
    'minimal-asymmetric': {
        id: 'minimal-asymmetric',
        name: 'Minimal Asymmetric',
        description: 'Clean design with intentional asymmetry',
        suitableFor: ['fashion', 'art', 'portfolio'],
        heroHeight: '90vh',
        gridColumns: 2,
        asymmetric: true,
        whitespaceLevel: 'ultra-airy',
    },
    'minimal-whitespace': {
        id: 'minimal-whitespace',
        name: 'Maximum Whitespace',
        description: 'Extreme minimalism, products breathe',
        suitableFor: ['luxury', 'jewelry', 'art'],
        heroHeight: '100vh',
        gridColumns: 2,
        asymmetric: false,
        whitespaceLevel: 'ultra-airy',
    },

    // ============================================================
    // EDITORIAL LAYOUTS
    // ============================================================
    'editorial-asymmetric': {
        id: 'editorial-asymmetric',
        name: 'Editorial Asymmetric',
        description: 'Magazine-style with asymmetric image/text blocks',
        suitableFor: ['fashion', 'luxury', 'lifestyle'],
        heroHeight: '100vh',
        gridColumns: 2,
        asymmetric: true,
        whitespaceLevel: 'airy',
    },
    'editorial-magazine': {
        id: 'editorial-magazine',
        name: 'Magazine Editorial',
        description: 'Full editorial experience with story-driven layout',
        suitableFor: ['fashion', 'beauty', 'lifestyle'],
        heroHeight: '100vh',
        gridColumns: 2,
        asymmetric: true,
        whitespaceLevel: 'airy',
    },
    'editorial-story': {
        id: 'editorial-story',
        name: 'Story Editorial',
        description: 'Narrative-driven layout that tells a brand story',
        suitableFor: ['luxury', 'artisan', 'craft'],
        heroHeight: '100vh',
        gridColumns: 1,
        asymmetric: true,
        whitespaceLevel: 'ultra-airy',
    },

    // ============================================================
    // MODERN LAYOUTS
    // ============================================================
    'fullscreen-sections': {
        id: 'fullscreen-sections',
        name: 'Fullscreen Sections',
        description: 'Each section takes full viewport, scroll-snapping',
        suitableFor: ['tech', 'saas', 'luxury'],
        heroHeight: '100vh',
        gridColumns: 3,
        asymmetric: false,
        whitespaceLevel: 'airy',
    },
    'horizontal-scroll': {
        id: 'horizontal-scroll',
        name: 'Horizontal Scroll',
        description: 'Unique horizontal scrolling experience',
        suitableFor: ['fashion', 'art', 'portfolio'],
        heroHeight: '100vh',
        gridColumns: 4,
        asymmetric: true,
        whitespaceLevel: 'balanced',
    },
    'brutalist-blocks': {
        id: 'brutalist-blocks',
        name: 'Brutalist Blocks',
        description: 'Bold, raw blocks with strong typography',
        suitableFor: ['streetwear', 'tech', 'agency'],
        heroHeight: '100vh',
        gridColumns: 2,
        asymmetric: true,
        whitespaceLevel: 'dense',
    },
    'bento-grid': {
        id: 'bento-grid',
        name: 'Bento Grid',
        description: 'Japanese-inspired grid with varied cell sizes',
        suitableFor: ['tech', 'saas', 'portfolio'],
        heroHeight: '80vh',
        gridColumns: 4,
        asymmetric: true,
        whitespaceLevel: 'balanced',
    },
};

// Get layout preset by ID
export function getLayoutPreset(id: LayoutVariant): LayoutPreset {
    return layoutPresets[id];
}

// Get layouts suitable for a vertical
export function getLayoutsForVertical(vertical: string): LayoutPreset[] {
    return Object.values(layoutPresets).filter(preset =>
        preset.suitableFor.includes(vertical)
    );
}

// Select a random layout for a vertical (for uniqueness)
export function selectRandomLayout(vertical: string, seed?: string): LayoutVariant {
    const suitable = getLayoutsForVertical(vertical);
    if (suitable.length === 0) {
        return 'hero-carousel-grid'; // Fallback
    }

    // Use seed for deterministic randomness if provided
    const random = seed
        ? hashToNumber(seed) % suitable.length
        : Math.floor(Math.random() * suitable.length);

    return suitable[random].id;
}

function hashToNumber(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}
