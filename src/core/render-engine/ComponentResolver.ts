// src/core/render-engine/ComponentResolver.ts
// Component Resolver - Maps DSL component types to React components

import type { ComponentType, ComponentReference } from '../../dsl/schema/website.schema';

// ============================================================
// COMPONENT REGISTRY
// ============================================================

export interface ComponentDefinition {
    type: ComponentType;
    variants: string[];
    defaultVariant: string;
    requiredProps: string[];
    optionalProps: string[];
}

// Registry of all available components and their variants
export const COMPONENT_REGISTRY: Record<ComponentType, ComponentDefinition> = {
    // ============================================================
    // HERO COMPONENTS
    // ============================================================
    'hero': {
        type: 'hero',
        variants: ['fullscreen', 'split', 'minimal', 'centered', 'video-background'],
        defaultVariant: 'fullscreen',
        requiredProps: [],
        optionalProps: ['height', 'overlayOpacity', 'textPosition', 'autoplay'],
    },
    'hero-video': {
        type: 'hero-video',
        variants: ['fullscreen-cinematic', 'split-video', 'background-loop'],
        defaultVariant: 'fullscreen-cinematic',
        requiredProps: [],
        optionalProps: ['height', 'overlayOpacity', 'textPosition', 'autoplay', 'muted'],
    },
    'hero-carousel': {
        type: 'hero-carousel',
        variants: ['fullscreen', 'contained', 'fade', 'slide'],
        defaultVariant: 'fullscreen',
        requiredProps: [],
        optionalProps: ['autoplay', 'interval', 'showDots', 'showArrows'],
    },
    'hero-split': {
        type: 'hero-split',
        variants: ['image-left', 'image-right', 'equal', 'asymmetric'],
        defaultVariant: 'image-left',
        requiredProps: [],
        optionalProps: ['imagePosition', 'ratio'],
    },
    'content-hero': {
        type: 'content-hero',
        variants: ['centered', 'left-aligned', 'minimal'],
        defaultVariant: 'centered',
        requiredProps: [],
        optionalProps: ['height', 'background'],
    },

    // ============================================================
    // NAVIGATION & LAYOUT COMPONENTS
    // ============================================================
    'breadcrumb': {
        type: 'breadcrumb',
        variants: ['default', 'chevron', 'slash'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: [],
    },
    'page-header': {
        type: 'page-header',
        variants: ['centered', 'left', 'with-breadcrumb'],
        defaultVariant: 'centered',
        requiredProps: [],
        optionalProps: ['showBreadcrumb'],
    },
    'announcement-bar': {
        type: 'announcement-bar',
        variants: ['static', 'scrolling', 'dismissible'],
        defaultVariant: 'static',
        requiredProps: [],
        optionalProps: ['closable'],
    },

    // ============================================================
    // PRODUCT COMPONENTS
    // ============================================================
    'product-grid': {
        type: 'product-grid',
        variants: ['default', 'masonry', 'editorial-minimal', 'rounded-cards', 'hover-zoom'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: ['columns', 'gap', 'limit', 'filter', 'infinite'],
    },
    'product-card': {
        type: 'product-card',
        variants: ['minimal', 'detailed', 'hover-info', 'quick-add'],
        defaultVariant: 'minimal',
        requiredProps: ['product'],
        optionalProps: ['showBadge', 'showQuickView', 'imageRatio'],
    },
    'product-detail': {
        type: 'product-detail',
        variants: ['split', 'gallery-first', 'sticky-info', 'tabbed'],
        defaultVariant: 'split',
        requiredProps: ['product'],
        optionalProps: [],
    },
    'product-gallery': {
        type: 'product-gallery',
        variants: ['split-sticky', 'grid', 'carousel', 'thumbnails'],
        defaultVariant: 'split-sticky',
        requiredProps: ['images'],
        optionalProps: ['zoomEnabled', 'showThumbnails'],
    },
    'product-info': {
        type: 'product-info',
        variants: ['minimal-elegant', 'detailed', 'compact'],
        defaultVariant: 'minimal-elegant',
        requiredProps: ['product'],
        optionalProps: [],
    },
    'product-reviews': {
        type: 'product-reviews',
        variants: ['list', 'grid', 'carousel'],
        defaultVariant: 'list',
        requiredProps: [],
        optionalProps: ['limit', 'showRating'],
    },
    'product-recommendations': {
        type: 'product-recommendations',
        variants: ['carousel', 'grid', 'inline-grid'],
        defaultVariant: 'carousel',
        requiredProps: [],
        optionalProps: ['limit', 'title'],
    },
    'product-carousel': {
        type: 'product-carousel',
        variants: ['default', 'fullwidth', 'compact'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: ['limit', 'autoplay'],
    },
    'product-tabs': {
        type: 'product-tabs',
        variants: ['default', 'accordion', 'inline'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: ['tabs'],
    },
    'variant-selector': {
        type: 'variant-selector',
        variants: ['buttons', 'dropdown', 'swatches'],
        defaultVariant: 'buttons',
        requiredProps: ['variants'],
        optionalProps: [],
    },
    'add-to-cart': {
        type: 'add-to-cart',
        variants: ['default', 'with-quantity', 'sticky'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: ['showQuantity'],
    },

    // ============================================================
    // SHOP COMPONENTS
    // ============================================================
    'filter-sidebar': {
        type: 'filter-sidebar',
        variants: ['sidebar', 'horizontal-dropdown', 'modal', 'drawer'],
        defaultVariant: 'sidebar',
        requiredProps: [],
        optionalProps: ['sticky', 'showCount', 'collapsible'],
    },
    'category-grid': {
        type: 'category-grid',
        variants: ['default', 'asymmetric-hover', 'overlay-text', 'minimal'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: ['columns', 'aspectRatio', 'showCount'],
    },
    'category-banner': {
        type: 'category-banner',
        variants: ['fullwidth', 'contained', 'split'],
        defaultVariant: 'fullwidth',
        requiredProps: ['category'],
        optionalProps: ['height'],
    },
    'collection-showcase': {
        type: 'collection-showcase',
        variants: ['carousel', 'grid', 'featured'],
        defaultVariant: 'carousel',
        requiredProps: [],
        optionalProps: ['limit'],
    },
    'filter-bar': {
        type: 'filter-bar',
        variants: ['horizontal', 'dropdown', 'pills'],
        defaultVariant: 'horizontal',
        requiredProps: [],
        optionalProps: [],
    },
    'active-filters': {
        type: 'active-filters',
        variants: ['pills', 'list', 'inline'],
        defaultVariant: 'pills',
        requiredProps: [],
        optionalProps: [],
    },
    'pagination': {
        type: 'pagination',
        variants: ['default', 'minimal', 'load-more'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: ['showTotal'],
    },
    'promo-banner': {
        type: 'promo-banner',
        variants: ['fullwidth', 'contained', 'strip'],
        defaultVariant: 'fullwidth',
        requiredProps: [],
        optionalProps: ['closable'],
    },

    // ============================================================
    // CART & CHECKOUT COMPONENTS
    // ============================================================
    'cart-items': {
        type: 'cart-items',
        variants: ['default', 'detailed-images', 'compact'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: ['showQuantityButtons', 'showRemove'],
    },
    'cart-summary': {
        type: 'cart-summary',
        variants: ['default', 'sticky-sidebar', 'inline'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: ['showShippingEstimate', 'showPromoCode'],
    },
    'cart-drawer': {
        type: 'cart-drawer',
        variants: ['slide-right', 'slide-left', 'modal'],
        defaultVariant: 'slide-right',
        requiredProps: [],
        optionalProps: ['showRecommendations'],
    },
    'checkout-form': {
        type: 'checkout-form',
        variants: ['single-page', 'multi-step', 'split-summary'],
        defaultVariant: 'single-page',
        requiredProps: [],
        optionalProps: ['showExpress', 'showGuest'],
    },
    'checkout-steps': {
        type: 'checkout-steps',
        variants: ['horizontal', 'vertical', 'numbered'],
        defaultVariant: 'horizontal',
        requiredProps: ['steps'],
        optionalProps: ['currentStep'],
    },
    'order-summary': {
        type: 'order-summary',
        variants: ['default', 'confirmation-detailed', 'compact'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: ['showTracking', 'showItems'],
    },
    'payment-methods': {
        type: 'payment-methods',
        variants: ['cards', 'radio', 'tabs'],
        defaultVariant: 'cards',
        requiredProps: [],
        optionalProps: [],
    },
    'checkout-header': {
        type: 'checkout-header',
        variants: ['minimal', 'with-progress', 'branded'],
        defaultVariant: 'minimal',
        requiredProps: [],
        optionalProps: [],
    },
    'payment-form': {
        type: 'payment-form',
        variants: ['default', 'split', 'minimal'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: [],
    },
    'shipping-form': {
        type: 'shipping-form',
        variants: ['default', 'compact', 'address-book'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: [],
    },
    'shipping-info': {
        type: 'shipping-info',
        variants: ['default', 'cards', 'table'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: [],
    },
    'confirmation-header': {
        type: 'confirmation-header',
        variants: ['centered', 'left', 'with-animation'],
        defaultVariant: 'centered',
        requiredProps: [],
        optionalProps: [],
    },
    'order-details': {
        type: 'order-details',
        variants: ['default', 'compact', 'split'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: [],
    },
    'order-items': {
        type: 'order-items',
        variants: ['default', 'compact', 'detailed'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: [],
    },

    // ============================================================
    // USER ACCOUNT COMPONENTS
    // ============================================================
    'login-form': {
        type: 'login-form',
        variants: ['centered-minimal', 'split-image', 'card'],
        defaultVariant: 'centered-minimal',
        requiredProps: [],
        optionalProps: ['showSocial', 'showRemember'],
    },
    'register-form': {
        type: 'register-form',
        variants: ['centered-minimal', 'split-image', 'card'],
        defaultVariant: 'centered-minimal',
        requiredProps: [],
        optionalProps: ['showSocial', 'showNewsletter'],
    },
    'account-dashboard': {
        type: 'account-dashboard',
        variants: ['sidebar-nav', 'tabs', 'cards'],
        defaultVariant: 'sidebar-nav',
        requiredProps: [],
        optionalProps: [],
    },
    'account-orders': {
        type: 'account-orders',
        variants: ['list', 'cards', 'table'],
        defaultVariant: 'list',
        requiredProps: [],
        optionalProps: ['limit', 'showStatus'],
    },
    'account-addresses': {
        type: 'account-addresses',
        variants: ['cards', 'list'],
        defaultVariant: 'cards',
        requiredProps: [],
        optionalProps: ['allowEdit', 'allowDelete'],
    },
    'account-settings': {
        type: 'account-settings',
        variants: ['form', 'sections'],
        defaultVariant: 'form',
        requiredProps: [],
        optionalProps: [],
    },
    'account-header': {
        type: 'account-header',
        variants: ['centered', 'left', 'with-avatar'],
        defaultVariant: 'centered',
        requiredProps: [],
        optionalProps: [],
    },
    'account-tabs': {
        type: 'account-tabs',
        variants: ['horizontal', 'sidebar', 'pills'],
        defaultVariant: 'horizontal',
        requiredProps: [],
        optionalProps: [],
    },

    // ============================================================
    // WISHLIST COMPONENTS
    // ============================================================
    'wishlist-grid': {
        type: 'wishlist-grid',
        variants: ['grid', 'list', 'compact'],
        defaultVariant: 'grid',
        requiredProps: [],
        optionalProps: ['columns'],
    },
    'share-buttons': {
        type: 'share-buttons',
        variants: ['icons', 'text', 'minimal'],
        defaultVariant: 'icons',
        requiredProps: [],
        optionalProps: [],
    },

    // ============================================================
    // CONTENT COMPONENTS
    // ============================================================
    'about-section': {
        type: 'about-section',
        variants: ['split-image', 'full-width', 'timeline', 'values-grid'],
        defaultVariant: 'split-image',
        requiredProps: [],
        optionalProps: ['imagePosition'],
    },
    'testimonials': {
        type: 'testimonials',
        variants: ['carousel', 'grid', 'carousel-minimal', 'masonry'],
        defaultVariant: 'carousel',
        requiredProps: [],
        optionalProps: ['autoplay', 'showRating'],
    },
    'features': {
        type: 'features',
        variants: ['grid', 'list', 'icons-centered', 'alternating'],
        defaultVariant: 'grid',
        requiredProps: [],
        optionalProps: ['columns'],
    },
    'cta': {
        type: 'cta',
        variants: ['centered', 'split', 'banner', 'floating'],
        defaultVariant: 'centered',
        requiredProps: [],
        optionalProps: ['background'],
    },
    'newsletter': {
        type: 'newsletter',
        variants: ['inline', 'fullwidth-minimal', 'popup', 'footer'],
        defaultVariant: 'inline',
        requiredProps: [],
        optionalProps: ['showName', 'showPrivacy'],
    },
    'banner': {
        type: 'banner',
        variants: ['fullwidth', 'split-image-text', 'overlay', 'minimal'],
        defaultVariant: 'fullwidth',
        requiredProps: [],
        optionalProps: ['imagePosition', 'ratio', 'link'],
    },
    'text-block': {
        type: 'text-block',
        variants: ['default', 'centered-headline', 'two-column', 'accordion'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: ['maxWidth', 'sections'],
    },
    'image-text': {
        type: 'image-text',
        variants: ['left', 'right', 'alternating'],
        defaultVariant: 'left',
        requiredProps: [],
        optionalProps: ['ratio'],
    },
    'gallery': {
        type: 'gallery',
        variants: ['grid', 'masonry', 'carousel', 'lightbox'],
        defaultVariant: 'grid',
        requiredProps: ['images'],
        optionalProps: ['columns'],
    },
    'video-section': {
        type: 'video-section',
        variants: ['fullwidth', 'contained', 'background'],
        defaultVariant: 'fullwidth',
        requiredProps: ['videoUrl'],
        optionalProps: ['autoplay', 'muted'],
    },
    'cta-button': {
        type: 'cta-button',
        variants: ['primary', 'secondary', 'outline', 'link'],
        defaultVariant: 'primary',
        requiredProps: [],
        optionalProps: ['size', 'href'],
    },
    'rich-text': {
        type: 'rich-text',
        variants: ['default', 'prose', 'compact'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: [],
    },
    'values-grid': {
        type: 'values-grid',
        variants: ['icons', 'numbers', 'cards'],
        defaultVariant: 'icons',
        requiredProps: [],
        optionalProps: ['columns'],
    },
    'team-grid': {
        type: 'team-grid',
        variants: ['cards', 'minimal', 'detailed'],
        defaultVariant: 'cards',
        requiredProps: [],
        optionalProps: ['columns'],
    },

    // ============================================================
    // LEGAL COMPONENTS
    // ============================================================
    'legal-content': {
        type: 'legal-content',
        variants: ['simple', 'sidebar-toc', 'accordion'],
        defaultVariant: 'simple',
        requiredProps: ['contentKey'],
        optionalProps: [],
    },
    'contact-form': {
        type: 'contact-form',
        variants: ['default', 'split-info', 'minimal'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: ['showMap', 'showPhone', 'showEmail'],
    },
    'faq-accordion': {
        type: 'faq-accordion',
        variants: ['default', 'cards', 'minimal'],
        defaultVariant: 'default',
        requiredProps: ['items'],
        optionalProps: ['searchable'],
    },
    'location-map': {
        type: 'location-map',
        variants: ['fullwidth', 'contained', 'split-info'],
        defaultVariant: 'contained',
        requiredProps: ['coordinates'],
        optionalProps: ['zoom', 'showMarker'],
    },
    'contact-info': {
        type: 'contact-info',
        variants: ['card', 'inline', 'split'],
        defaultVariant: 'card',
        requiredProps: [],
        optionalProps: ['showIcon'],
    },
    'store-map': {
        type: 'store-map',
        variants: ['fullwidth', 'contained', 'with-list'],
        defaultVariant: 'contained',
        requiredProps: [],
        optionalProps: ['zoom', 'showMarker'],
    },

    // ============================================================
    // PRIMITIVES (rarely used directly in sections)
    // ============================================================
    'text': {
        type: 'text',
        variants: ['default'],
        defaultVariant: 'default',
        requiredProps: ['content'],
        optionalProps: ['variant', 'align'],
    },
    'image': {
        type: 'image',
        variants: ['default'],
        defaultVariant: 'default',
        requiredProps: ['src', 'alt'],
        optionalProps: ['aspectRatio', 'rounded'],
    },
    'button': {
        type: 'button',
        variants: ['primary', 'secondary', 'outline', 'ghost'],
        defaultVariant: 'primary',
        requiredProps: ['children'],
        optionalProps: ['size', 'href', 'onClick'],
    },
    'card': {
        type: 'card',
        variants: ['elevated', 'outlined', 'filled', 'ghost'],
        defaultVariant: 'elevated',
        requiredProps: [],
        optionalProps: ['padding', 'hover'],
    },
    'grid': {
        type: 'grid',
        variants: ['default'],
        defaultVariant: 'default',
        requiredProps: [],
        optionalProps: ['columns', 'gap'],
    },
    'stack': {
        type: 'stack',
        variants: ['vertical', 'horizontal'],
        defaultVariant: 'vertical',
        requiredProps: [],
        optionalProps: ['gap', 'align', 'justify'],
    },
};

// ============================================================
// RESOLVER FUNCTIONS
// ============================================================

export function resolveComponent(ref: ComponentReference): {
    component: ComponentDefinition;
    variant: string;
    props: Record<string, unknown>;
} {
    const component = COMPONENT_REGISTRY[ref.type];

    if (!component) {
        console.warn(`Unknown component type: ${ref.type}, falling back to text`);
        return {
            component: COMPONENT_REGISTRY['text'],
            variant: 'default',
            props: { content: `Unknown component: ${ref.type}` },
        };
    }

    // Validate variant
    const variant = component.variants.includes(ref.variant)
        ? ref.variant
        : component.defaultVariant;

    // Validate props
    const props = { ...ref.props };

    // Add any missing required props with defaults
    for (const prop of component.requiredProps) {
        if (!(prop in props)) {
            props[prop] = getDefaultPropValue(prop);
        }
    }

    return { component, variant, props };
}

function getDefaultPropValue(prop: string): unknown {
    const defaults: Record<string, unknown> = {
        content: '',
        src: '/images/placeholder.jpg',
        alt: 'Image',
        product: null,
        images: [],
        items: [],
        steps: ['Step 1', 'Step 2', 'Step 3'],
        contentKey: 'default',
        coordinates: { lat: 0, lng: 0 },
        videoUrl: '',
        category: null,
        children: 'Button',
    };

    return defaults[prop] ?? null;
}

export function getComponentVariants(type: ComponentType): string[] {
    return COMPONENT_REGISTRY[type]?.variants || [];
}

export function isValidComponent(type: string): type is ComponentType {
    return type in COMPONENT_REGISTRY;
}
