// src/presets/verticals/fashion/fashion.preset.ts
// Fashion Vertical Preset - Luxury Fashion E-Commerce

import type {
    WebsiteDSL,
    PageConfig,
    GlobalComponents,
    DesignConfig,
    ContentConfig,
    Classification,
    UniquenessFactors,
} from '../../../dsl/schema/website.schema';

// ============================================================
// FASHION VERTICAL DEFAULT CLASSIFICATION
// ============================================================
export const fashionClassification: Classification = {
    websiteType: 'online_shop',
    vertical: 'fashion',
    complexity: 'extended',
    conversionGoal: 'product_purchase',
    brandPersonality: 'luxury-minimal',
    uniquenessFactors: {
        colorMood: 'sophisticated neutral tones',
        layoutDNA: 'editorial asymmetric',
        typographyMood: 'elegant serif with clean sans',
        animationIntensity: 'subtle',
        visualDensity: 'airy',
        imageStyle: 'editorial',
        interactionStyle: 'smooth',
    },
};

// ============================================================
// FASHION DESIGN CONFIG
// ============================================================
export const fashionDesignConfig: DesignConfig = {
    layoutVariant: 'editorial-asymmetric',
    tokens: {
        colors: {
            preset: 'fashion-noir' as const,
            primary: '#0F0F0F',
            secondary: '#1C1C1C',
            background: '#FAFAFA',
            foreground: '#0F0F0F',
            accent: '#8B7355',
            muted: '#757575',
        },
        typography: {
            fontFamily: {
                heading: 'cormorant',
                body: 'inter',
            },
            scale: 'spacious',
            headingWeight: 400,
            headingStyle: 'normal',
            letterSpacing: 'wide',
        },
        spacing: 'airy',
        radius: 'none',
        shadows: 'subtle',
    },
    animationPack: 'gsap-cinematic',
    gsapConfig: {
        scrollTrigger: true,
        staggerAnimations: true,
        parallaxEnabled: true,
        cursorFollower: false,
        magneticButtons: true,
        textReveal: 'split-chars',
        imageReveal: 'clip',
    },
};

// ============================================================
// FASHION GLOBAL COMPONENTS
// ============================================================
export const fashionGlobalComponents: GlobalComponents = {
    header: {
        variant: 'luxury-editorial',
        sticky: true,
        transparent: true,
        announcementBar: {
            enabled: true,
            text: 'Free Shipping on orders over €150',
        },
        elements: {
            logo: true,
            search: true,
            cart: true,
            wishlist: true,
            account: true,
            languageSelector: false,
            currencySelector: false,
            navigation: [
                { label: 'New In', href: '/shop?filter=new', featured: true },
                { label: 'Women', href: '/shop/women' },
                { label: 'Men', href: '/shop/men' },
                { label: 'Accessories', href: '/shop/accessories' },
                { label: 'Sale', href: '/shop?filter=sale', featured: true },
            ],
        },
    },
    footer: {
        variant: 'luxury-minimal',
        columns: [
            {
                title: 'Shop',
                links: [
                    { label: 'New Arrivals', href: '/shop?filter=new' },
                    { label: 'Best Sellers', href: '/shop?filter=bestseller' },
                    { label: 'Sale', href: '/shop?filter=sale' },
                ],
            },
            {
                title: 'Help',
                links: [
                    { label: 'Contact Us', href: '/contact' },
                    { label: 'Shipping', href: '/shipping' },
                    { label: 'Returns', href: '/returns' },
                    { label: 'FAQ', href: '/faq' },
                ],
            },
            {
                title: 'About',
                links: [
                    { label: 'Our Story', href: '/about' },
                    { label: 'Sustainability', href: '/about#sustainability' },
                    { label: 'Careers', href: '/about#careers' },
                ],
            },
        ],
        showNewsletter: true,
        showSocials: true,
        showPaymentIcons: true,
        copyright: '© {year} {brand}. All rights reserved.',
        legalLinks: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms & Conditions', href: '/terms' },
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

// ============================================================
// FASHION PAGE TEMPLATES
// ============================================================
export const fashionPages: PageConfig[] = [
    // HOME PAGE
    {
        id: 'home',
        path: '/',
        title: 'Home',
        sections: [
            {
                id: 'hero-main',
                component: {
                    type: 'hero-video',
                    variant: 'fullscreen-cinematic',
                    props: {
                        height: '100vh',
                        overlayOpacity: 0.2,
                        textPosition: 'center-bottom',
                    },
                },
                order: 1,
                visibility: 'always',
            },
            {
                id: 'categories-featured',
                component: {
                    type: 'category-grid',
                    variant: 'asymmetric-hover',
                    props: { columns: 3, aspectRatio: '3/4' },
                },
                order: 2,
                visibility: 'always',
            },
            {
                id: 'products-new',
                component: {
                    type: 'product-grid',
                    variant: 'editorial-minimal',
                    props: { columns: 4, limit: 8, filter: 'new' },
                },
                order: 3,
                visibility: 'always',
            },
            {
                id: 'banner-editorial',
                component: {
                    type: 'banner',
                    variant: 'split-image-text',
                    props: { imagePosition: 'left', ratio: '60/40' },
                },
                order: 4,
                visibility: 'always',
            },
            {
                id: 'testimonials',
                component: {
                    type: 'testimonials',
                    variant: 'carousel-minimal',
                    props: { autoplay: true },
                },
                order: 5,
                visibility: 'always',
            },
            {
                id: 'newsletter',
                component: {
                    type: 'newsletter',
                    variant: 'fullwidth-minimal',
                    props: {},
                },
                order: 6,
                visibility: 'always',
            },
        ],
        seo: {
            metaTitle: '{brand} | Luxury Fashion',
            metaDescription: 'Discover the latest collections at {brand}. Shop new arrivals, bestsellers, and exclusive pieces.',
        },
    },

    // SHOP PAGE
    {
        id: 'shop',
        path: '/shop',
        title: 'Shop All',
        sections: [
            {
                id: 'filter-header',
                component: {
                    type: 'filter-sidebar',
                    variant: 'horizontal-dropdown',
                    props: { sticky: true },
                },
                order: 1,
                visibility: 'always',
            },
            {
                id: 'product-grid',
                component: {
                    type: 'product-grid',
                    variant: 'masonry-hover',
                    props: { columns: 4, infinite: true },
                },
                order: 2,
                visibility: 'always',
            },
        ],
        seo: {
            metaTitle: 'Shop All | {brand}',
            metaDescription: 'Browse our complete collection of luxury fashion.',
        },
    },

    // PRODUCT DETAIL PAGE
    {
        id: 'product',
        path: '/product/[slug]',
        title: 'Product',
        sections: [
            {
                id: 'product-gallery',
                component: {
                    type: 'product-gallery',
                    variant: 'split-sticky',
                    props: { zoomEnabled: true },
                },
                order: 1,
                visibility: 'always',
            },
            {
                id: 'product-info',
                component: {
                    type: 'product-info',
                    variant: 'minimal-elegant',
                    props: {},
                },
                order: 2,
                visibility: 'always',
            },
            {
                id: 'product-details',
                component: {
                    type: 'text-block',
                    variant: 'accordion',
                    props: { sections: ['Description', 'Materials', 'Size Guide', 'Shipping'] },
                },
                order: 3,
                visibility: 'always',
            },
            {
                id: 'product-recommendations',
                component: {
                    type: 'product-recommendations',
                    variant: 'carousel',
                    props: { limit: 8, title: 'You May Also Like' },
                },
                order: 4,
                visibility: 'always',
            },
        ],
    },

    // CART PAGE
    {
        id: 'cart',
        path: '/cart',
        title: 'Shopping Bag',
        sections: [
            {
                id: 'cart-items',
                component: {
                    type: 'cart-items',
                    variant: 'detailed-images',
                    props: {},
                },
                order: 1,
                visibility: 'always',
            },
            {
                id: 'cart-summary',
                component: {
                    type: 'cart-summary',
                    variant: 'sticky-sidebar',
                    props: { showShippingEstimate: true },
                },
                order: 2,
                visibility: 'always',
            },
            {
                id: 'cart-recommendations',
                component: {
                    type: 'product-recommendations',
                    variant: 'inline-grid',
                    props: { limit: 4, title: 'Complete Your Look' },
                },
                order: 3,
                visibility: 'always',
            },
        ],
    },

    // CHECKOUT PAGE
    {
        id: 'checkout',
        path: '/checkout',
        title: 'Checkout',
        sections: [
            {
                id: 'checkout-steps',
                component: {
                    type: 'checkout-steps',
                    variant: 'single-page',
                    props: { steps: ['Information', 'Shipping', 'Payment'] },
                },
                order: 1,
                visibility: 'always',
            },
            {
                id: 'checkout-form',
                component: {
                    type: 'checkout-form',
                    variant: 'split-summary',
                    props: {},
                },
                order: 2,
                visibility: 'always',
            },
        ],
    },

    // ORDER CONFIRMATION
    {
        id: 'order-confirmation',
        path: '/order/confirmation',
        title: 'Order Confirmed',
        sections: [
            {
                id: 'order-success',
                component: {
                    type: 'order-summary',
                    variant: 'confirmation-detailed',
                    props: { showTracking: true },
                },
                order: 1,
                visibility: 'always',
            },
            {
                id: 'recommendations',
                component: {
                    type: 'product-recommendations',
                    variant: 'carousel',
                    props: { limit: 4, title: 'Shop More' },
                },
                order: 2,
                visibility: 'always',
            },
        ],
    },

    // LOGIN PAGE
    {
        id: 'login',
        path: '/login',
        title: 'Login',
        sections: [
            {
                id: 'login-form',
                component: {
                    type: 'login-form',
                    variant: 'centered-minimal',
                    props: { showSocial: true },
                },
                order: 1,
                visibility: 'always',
            },
        ],
    },

    // REGISTER PAGE
    {
        id: 'register',
        path: '/register',
        title: 'Create Account',
        sections: [
            {
                id: 'register-form',
                component: {
                    type: 'register-form',
                    variant: 'centered-minimal',
                    props: { showSocial: true },
                },
                order: 1,
                visibility: 'always',
            },
        ],
    },

    // ACCOUNT PAGE
    {
        id: 'account',
        path: '/account',
        title: 'My Account',
        sections: [
            {
                id: 'account-dashboard',
                component: {
                    type: 'account-dashboard',
                    variant: 'sidebar-nav',
                    props: {},
                },
                order: 1,
                visibility: 'always',
            },
        ],
    },

    // LEGAL PAGES
    {
        id: 'impressum',
        path: '/impressum',
        title: 'Impressum',
        sections: [
            {
                id: 'legal-content',
                component: {
                    type: 'legal-content',
                    variant: 'simple',
                    props: { contentKey: 'impressum' },
                },
                order: 1,
                visibility: 'always',
            },
        ],
    },
    {
        id: 'privacy',
        path: '/privacy',
        title: 'Privacy Policy',
        sections: [
            {
                id: 'legal-content',
                component: {
                    type: 'legal-content',
                    variant: 'simple',
                    props: { contentKey: 'privacy' },
                },
                order: 1,
                visibility: 'always',
            },
        ],
    },
    {
        id: 'terms',
        path: '/terms',
        title: 'Terms & Conditions',
        sections: [
            {
                id: 'legal-content',
                component: {
                    type: 'legal-content',
                    variant: 'simple',
                    props: { contentKey: 'terms' },
                },
                order: 1,
                visibility: 'always',
            },
        ],
    },

    // CONTACT PAGE
    {
        id: 'contact',
        path: '/contact',
        title: 'Contact Us',
        sections: [
            {
                id: 'contact-hero',
                component: {
                    type: 'text-block',
                    variant: 'centered-headline',
                    props: {},
                },
                order: 1,
                visibility: 'always',
            },
            {
                id: 'contact-form',
                component: {
                    type: 'contact-form',
                    variant: 'split-info',
                    props: { showMap: false },
                },
                order: 2,
                visibility: 'always',
            },
        ],
    },
];

// ============================================================
// FASHION CONTENT TEMPLATE
// ============================================================
export const fashionContentTemplate: Partial<ContentConfig> = {
    brand: {
        name: '{BRAND_NAME}',
        tagline: 'Timeless Elegance',
        description: 'Curated luxury fashion for the modern individual.',
        values: ['Quality', 'Sustainability', 'Craftsmanship'],
    },
    hero: {
        headline: 'New Collection',
        subheadline: 'Discover timeless pieces crafted for the modern wardrobe',
        ctaText: 'Shop Now',
        ctaLink: '/shop',
        mediaType: 'video',
        mediaUrl: '/videos/hero.mp4',
        overlayOpacity: 0.2,
    },
    categories: [
        { id: 'women', name: 'Women', slug: 'women', imageUrl: '/images/cat-women.jpg', productCount: 0 },
        { id: 'men', name: 'Men', slug: 'men', imageUrl: '/images/cat-men.jpg', productCount: 0 },
        { id: 'accessories', name: 'Accessories', slug: 'accessories', imageUrl: '/images/cat-accessories.jpg', productCount: 0 },
    ],
    features: [
        { icon: 'truck', title: 'Free Shipping', description: 'On orders over €150' },
        { icon: 'refresh', title: 'Easy Returns', description: '30-day return policy' },
        { icon: 'shield', title: 'Secure Payment', description: 'SSL encrypted checkout' },
    ],
    legalContent: {
        impressum: '',
        privacy: '',
        terms: '',
        shipping: '',
        returns: '',
    },
    products: [],
    testimonials: [],
};

// ============================================================
// GENERATE FULL FASHION DSL
// ============================================================
export function generateFashionDSL(brandName: string, customizations?: Partial<WebsiteDSL>): WebsiteDSL {
    const base: WebsiteDSL = {
        version: '1.0',
        meta: {
            generatedAt: new Date().toISOString(),
            promptHash: '',
            locale: 'en',
            framework: 'nextjs',
        },
        classification: fashionClassification,
        design: fashionDesignConfig,
        pages: fashionPages,
        globalComponents: fashionGlobalComponents,
        content: {
            ...fashionContentTemplate,
            brand: {
                ...fashionContentTemplate.brand!,
                name: brandName,
            },
        } as ContentConfig,
    };

    // Deep merge customizations
    if (customizations) {
        return deepMerge(base, customizations);
    }

    return base;
}

// Helper for deep merge
function deepMerge<T extends object>(target: T, source: Partial<T>): T {
    const result = { ...target };
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(result[key] as object, source[key] as object) as T[typeof key];
        } else if (source[key] !== undefined) {
            result[key] = source[key] as T[typeof key];
        }
    }
    return result;
}
