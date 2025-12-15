// src/core/integration/ConfigGenerator.ts
// Transforms WebsiteDSL into Medusa storefront config files

import type {
    WebsiteDSL,
    DesignTokensConfig,
    ContentConfig,
    GlobalComponents,
    NavItem,
} from '../../dsl/schema/website.schema';

// ============================================================
// TYPES
// ============================================================

export interface MedusaConfigs {
    siteConfig: string;
    themeConfig: string;
    navigationConfig: string;
    contentConfig: string;
    featuresConfig: string;
}

export interface SiteConfigData {
    name: string;
    tagline: string;
    description: string;
    url: string;
    backendUrl: string;
    logo: string | null;
    email: string;
    phone: string;
    social: {
        instagram: string;
        facebook: string;
        twitter: string;
        pinterest: string;
    };
    seo: {
        title: string;
        description: string;
        keywords: string[];
    };
}

export interface ThemeConfigData {
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        foreground: string;
        muted: string;
        border: string;
        error: string;
        success: string;
    };
    fonts: {
        heading: string;
        body: string;
    };
    radius: Record<string, string>;
    spacing: Record<string, string>;
    zIndex: Record<string, number>;
    breakpoints: Record<string, string>;
}

export interface NavigationConfigData {
    main: { label: string; href: string }[];
    categories: { slug: string; label: string }[];
    footer: {
        shop: { label: string; href: string }[];
        help: { label: string; href: string }[];
        about: { label: string; href: string }[];
        legal: { label: string; href: string }[];
    };
    secondary: { label: string; href: string }[];
}

export interface ContentConfigData {
    hero: {
        backgroundImage: string | null;
        backgroundColor: string;
        eyebrow: string;
        headline: string;
        subheadline: string | null;
        ctas: { label: string; href: string }[];
    };
    home: {
        featuredSection: {
            eyebrow: string;
            title: string;
            productCount: number;
        };
    };
    about: {
        title: string;
        subtitle: string;
        paragraphs: string[];
        image: string | null;
    };
    contact: {
        title: string;
        email: string;
        phone: string;
        address: string;
    };
    footer: {
        newsletter: {
            title: string;
            description: string;
            placeholder: string;
        };
        copyright: string;
    };
}

export interface FeaturesConfigData {
    auth: {
        enabled: boolean;
        guestCheckout: boolean;
        emailVerification: boolean;
        socialLogin: boolean;
    };
    cart: {
        enabled: boolean;
        miniCart: boolean;
        persistCart: boolean;
    };
    wishlist: {
        enabled: boolean;
        persistWishlist: boolean;
    };
    search: {
        enabled: boolean;
        instantSearch: boolean;
        keyboard: boolean;
    };
    product: {
        quickAdd: boolean;
        reviews: boolean;
        relatedProducts: boolean;
    };
    checkout: {
        stripe: boolean;
        paypal: boolean;
        applePay: boolean;
    };
    content: {
        blog: boolean;
        stories: boolean;
    };
    admin: {
        enabled: boolean;
        editProducts: boolean;
    };
}

// ============================================================
// FONT MAPPING
// ============================================================

const FONT_MAP: Record<string, string> = {
    // Sans-serif
    'inter': "'Inter', sans-serif",
    'outfit': "'Outfit', sans-serif",
    'poppins': "'Poppins', sans-serif",
    'montserrat': "'Montserrat', sans-serif",
    'dm-sans': "'DM Sans', sans-serif",
    'plus-jakarta': "'Plus Jakarta Sans', sans-serif",
    'satoshi': "'Satoshi', sans-serif",
    'space-grotesk': "'Space Grotesk', sans-serif",
    // Serif
    'playfair': "'Playfair Display', serif",
    'cormorant': "'Cormorant Garamond', serif",
    'fraunces': "'Fraunces', serif",
    'dm-serif': "'DM Serif Display', serif",
    // Playful
    'quicksand': "'Quicksand', sans-serif",
    'nunito': "'Nunito', sans-serif",
    'comfortaa': "'Comfortaa', sans-serif",
    // Display
    'bebas-neue': "'Bebas Neue', sans-serif",
    'oswald': "'Oswald', sans-serif",
    'archivo-black': "'Archivo Black', sans-serif",
};

function getFontString(fontFamily: string): string {
    return FONT_MAP[fontFamily] || "'Inter', sans-serif";
}

// ============================================================
// VERTICAL-BASED KEYWORDS
// ============================================================

const VERTICAL_KEYWORDS: Record<string, string[]> = {
    'fashion': ['fashion', 'style', 'clothing', 'designer', 'luxury'],
    'luxury': ['luxury', 'premium', 'exclusive', 'sophisticated', 'elegant'],
    'streetwear': ['streetwear', 'urban', 'contemporary', 'casual'],
    'jewelry': ['jewelry', 'fine jewelry', 'diamonds', 'watches', 'accessories'],
    'beauty': ['beauty', 'cosmetics', 'skincare', 'makeup'],
    'home': ['home', 'furniture', 'interior', 'decor', 'living'],
    'tech': ['technology', 'electronics', 'gadgets', 'innovation'],
    'sports': ['sports', 'athletic', 'fitness', 'outdoor', 'performance'],
    'food': ['food', 'gourmet', 'culinary', 'organic'],
    'art': ['art', 'gallery', 'contemporary art', 'creative'],
};

function getKeywordsForVertical(vertical: string): string[] {
    return VERTICAL_KEYWORDS[vertical] || ['shop', 'online', 'store'];
}

// ============================================================
// MAIN GENERATOR FUNCTIONS
// ============================================================

export function generateMedusaConfigs(dsl: WebsiteDSL): MedusaConfigs {
    const siteData = generateSiteConfigData(dsl);
    const themeData = generateThemeConfigData(dsl.design.tokens);
    const navData = generateNavigationConfigData(dsl.globalComponents, dsl.content);
    const contentData = generateContentConfigData(dsl.content);
    const featuresData = generateFeaturesConfigData(dsl);

    return {
        siteConfig: generateSiteConfigFile(siteData),
        themeConfig: generateThemeConfigFile(themeData),
        navigationConfig: generateNavigationConfigFile(navData),
        contentConfig: generateContentConfigFile(contentData),
        featuresConfig: generateFeaturesConfigFile(featuresData),
    };
}

// ============================================================
// SITE CONFIG
// ============================================================

function generateSiteConfigData(dsl: WebsiteDSL): SiteConfigData {
    const { brand } = dsl.content;
    const { vertical } = dsl.classification;

    return {
        name: brand.name,
        tagline: brand.tagline,
        description: brand.description,
        url: 'process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"',
        backendUrl: 'process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"',
        logo: brand.logoUrl || null,
        email: 'contact@example.com',
        phone: '+1 234 567 890',
        social: {
            instagram: brand.socialLinks?.find(s => s.platform === 'instagram')?.url || 'https://instagram.com',
            facebook: brand.socialLinks?.find(s => s.platform === 'facebook')?.url || 'https://facebook.com',
            twitter: brand.socialLinks?.find(s => s.platform === 'twitter')?.url || 'https://twitter.com',
            pinterest: brand.socialLinks?.find(s => s.platform === 'pinterest')?.url || 'https://pinterest.com',
        },
        seo: {
            title: `${brand.name} - ${brand.tagline}`,
            description: brand.description,
            keywords: getKeywordsForVertical(vertical),
        },
    };
}

function generateSiteConfigFile(data: SiteConfigData): string {
    return `// Site Configuration
// Auto-generated by ConfigGenerator

export const siteConfig = {
    // Brand
    name: "${data.name}",
    tagline: "${data.tagline}",
    description: "${data.description}",

    // URLs
    url: ${data.url},
    backendUrl: ${data.backendUrl},

    // Logo (set to null to use text logo)
    logo: ${data.logo ? `"${data.logo}"` : 'null'} as string | null,

    // Contact
    email: "${data.email}",
    phone: "${data.phone}",

    // Social Media
    social: {
        instagram: "${data.social.instagram}",
        facebook: "${data.social.facebook}",
        twitter: "${data.social.twitter}",
        pinterest: "${data.social.pinterest}",
    },

    // SEO
    seo: {
        title: "${data.seo.title}",
        description: "${data.seo.description}",
        keywords: ${JSON.stringify(data.seo.keywords)},
    },
}

export type SiteConfig = typeof siteConfig
`;
}

// ============================================================
// THEME CONFIG
// ============================================================

function generateThemeConfigData(tokens: DesignTokensConfig): ThemeConfigData {
    const { colors, typography, spacing, radius } = tokens;

    return {
        colors: {
            primary: colors.primary,
            secondary: colors.secondary,
            accent: colors.accent,
            background: colors.background,
            foreground: colors.foreground,
            muted: colors.muted,
            border: adjustBrightness(colors.foreground, 0.85),
            error: '#ef4444',
            success: '#22c55e',
        },
        fonts: {
            heading: getFontString(typography.fontFamily.heading),
            body: getFontString(typography.fontFamily.body),
        },
        radius: getRadiusScale(radius),
        spacing: getSpacingScale(spacing),
        zIndex: {
            base: 0,
            dropdown: 10,
            sticky: 20,
            fixed: 30,
            header: 50,
            overlay: 100,
            modal: 110,
            toast: 120,
        },
        breakpoints: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
    };
}

function getRadiusScale(scale: string): Record<string, string> {
    const scales: Record<string, Record<string, string>> = {
        'none': { sm: '0px', md: '0px', lg: '0px', full: '9999px' },
        'sm': { sm: '2px', md: '4px', lg: '8px', full: '9999px' },
        'md': { sm: '4px', md: '8px', lg: '16px', full: '9999px' },
        'lg': { sm: '8px', md: '12px', lg: '24px', full: '9999px' },
        'xl': { sm: '12px', md: '16px', lg: '32px', full: '9999px' },
        'full': { sm: '9999px', md: '9999px', lg: '9999px', full: '9999px' },
    };
    return scales[scale] || scales['md'];
}

function getSpacingScale(scale: string): Record<string, string> {
    const scales: Record<string, Record<string, string>> = {
        'compact': { xs: '2px', sm: '4px', md: '8px', lg: '16px', xl: '24px', xxl: '32px' },
        'default': { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', xxl: '48px' },
        'spacious': { xs: '8px', sm: '12px', md: '24px', lg: '36px', xl: '48px', xxl: '64px' },
        'airy': { xs: '12px', sm: '16px', md: '32px', lg: '48px', xl: '64px', xxl: '96px' },
    };
    return scales[scale] || scales['default'];
}

function adjustBrightness(hex: string, factor: number): string {
    // Simple brightness adjustment - darken for light colors, lighten for dark
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const avg = (r + g + b) / 3;
    const target = avg < 128 ? 230 : 40;

    const newR = Math.round(r + (target - r) * factor);
    const newG = Math.round(g + (target - g) * factor);
    const newB = Math.round(b + (target - b) * factor);

    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

function generateThemeConfigFile(data: ThemeConfigData): string {
    return `// Theme Configuration
// Auto-generated by ConfigGenerator

export const theme = {
    // Colors
    colors: {
        primary: "${data.colors.primary}",
        secondary: "${data.colors.secondary}",
        accent: "${data.colors.accent}",
        background: "${data.colors.background}",
        foreground: "${data.colors.foreground}",
        muted: "${data.colors.muted}",
        border: "${data.colors.border}",
        error: "${data.colors.error}",
        success: "${data.colors.success}",
    },

    // Typography
    fonts: {
        heading: "${data.fonts.heading}",
        body: "${data.fonts.body}",
    },

    // Border Radius
    radius: {
        sm: "${data.radius.sm}",
        md: "${data.radius.md}",
        lg: "${data.radius.lg}",
        full: "${data.radius.full}",
    },

    // Spacing Scale
    spacing: {
        xs: "${data.spacing.xs}",
        sm: "${data.spacing.sm}",
        md: "${data.spacing.md}",
        lg: "${data.spacing.lg}",
        xl: "${data.spacing.xl}",
        xxl: "${data.spacing.xxl}",
    },

    // Z-Index Scale
    zIndex: {
        base: ${data.zIndex.base},
        dropdown: ${data.zIndex.dropdown},
        sticky: ${data.zIndex.sticky},
        fixed: ${data.zIndex.fixed},
        header: ${data.zIndex.header},
        overlay: ${data.zIndex.overlay},
        modal: ${data.zIndex.modal},
        toast: ${data.zIndex.toast},
    },

    // Breakpoints
    breakpoints: {
        sm: "${data.breakpoints.sm}",
        md: "${data.breakpoints.md}",
        lg: "${data.breakpoints.lg}",
        xl: "${data.breakpoints.xl}",
    },
}

export type Theme = typeof theme
`;
}

// ============================================================
// NAVIGATION CONFIG
// ============================================================

function generateNavigationConfigData(
    globalComponents: GlobalComponents,
    content: ContentConfig
): NavigationConfigData {
    const headerNav = globalComponents.header.elements.navigation;
    const footerColumns = globalComponents.footer.columns;

    // Main navigation from header
    const main = headerNav.map((item: NavItem) => ({
        label: item.label,
        href: item.href,
    }));

    // Categories from content
    const categories = content.categories.map(cat => ({
        slug: cat.slug,
        label: cat.name,
    }));
    if (categories.length > 0 && !categories.find(c => c.slug === 'all')) {
        categories.unshift({ slug: 'all', label: 'All' });
    }

    // Footer links from footer columns
    const footerLinks: NavigationConfigData['footer'] = {
        shop: [],
        help: [],
        about: [],
        legal: [],
    };

    footerColumns.forEach(col => {
        const title = col.title.toLowerCase();
        const links = col.links.map(l => ({ label: l.label, href: l.href }));

        if (title.includes('shop') || title.includes('products')) {
            footerLinks.shop = links;
        } else if (title.includes('help') || title.includes('support') || title.includes('service')) {
            footerLinks.help = links;
        } else if (title.includes('about') || title.includes('company') || title.includes('info')) {
            footerLinks.about = links;
        } else if (title.includes('legal') || title.includes('policy')) {
            footerLinks.legal = links;
        }
    });

    // Add legal links from footer config
    if (footerLinks.legal.length === 0) {
        footerLinks.legal = globalComponents.footer.legalLinks.map(l => ({
            label: l.label,
            href: l.href,
        }));
    }

    return {
        main,
        categories,
        footer: footerLinks,
        secondary: [
            { label: 'My Account', href: '/account' },
            { label: 'Contact Us', href: '/contact' },
            { label: 'Store Locator', href: '/stores' },
        ],
    };
}

function generateNavigationConfigFile(data: NavigationConfigData): string {
    return `// Navigation Configuration
// Auto-generated by ConfigGenerator

export const navigation = {
    // Main Menu (Mobile Menu + Header dropdown)
    main: ${JSON.stringify(data.main, null, 8).replace(/\n/g, '\n    ')},

    // Shop Categories (shown on shop page)
    categories: ${JSON.stringify(data.categories, null, 8).replace(/\n/g, '\n    ')},

    // Footer Links
    footer: {
        shop: ${JSON.stringify(data.footer.shop, null, 12).replace(/\n/g, '\n        ')},
        help: ${JSON.stringify(data.footer.help, null, 12).replace(/\n/g, '\n        ')},
        about: ${JSON.stringify(data.footer.about, null, 12).replace(/\n/g, '\n        ')},
        legal: ${JSON.stringify(data.footer.legal, null, 12).replace(/\n/g, '\n        ')},
    },

    // Secondary links (footer bottom, account menu)
    secondary: ${JSON.stringify(data.secondary, null, 8).replace(/\n/g, '\n    ')},
}

export type Navigation = typeof navigation
`;
}

// ============================================================
// CONTENT CONFIG
// ============================================================

function generateContentConfigData(content: ContentConfig): ContentConfigData {
    const { hero, brand } = content;

    return {
        hero: {
            backgroundImage: hero.mediaType === 'image' ? hero.mediaUrl : null,
            backgroundColor: '#1a1a1a',
            eyebrow: 'DISCOVER',
            headline: hero.headline,
            subheadline: hero.subheadline || null,
            ctas: [
                { label: hero.ctaText, href: hero.ctaLink },
                ...(hero.secondaryCta ? [{ label: hero.secondaryCta.text, href: hero.secondaryCta.link }] : []),
            ],
        },
        home: {
            featuredSection: {
                eyebrow: 'Highlights',
                title: 'Curated Selection',
                productCount: 4,
            },
        },
        about: {
            title: 'Our Story',
            subtitle: brand.tagline,
            paragraphs: brand.story
                ? [brand.story]
                : [brand.description],
            image: null,
        },
        contact: {
            title: 'Contact Us',
            email: 'hello@example.com',
            phone: '+1 234 567 890',
            address: '123 Fashion Street, New York, NY 10001',
        },
        footer: {
            newsletter: {
                title: 'Newsletter',
                description: 'Subscribe for exclusive updates',
                placeholder: 'Enter your email',
            },
            copyright: `© ${new Date().getFullYear()} ${brand.name}. All rights reserved.`,
        },
    };
}

function generateContentConfigFile(data: ContentConfigData): string {
    return `// Content Configuration
// Auto-generated by ConfigGenerator

export const content = {
    // Homepage Hero
    hero: {
        backgroundImage: ${data.hero.backgroundImage ? `"${data.hero.backgroundImage}"` : 'null'} as string | null,
        backgroundColor: "${data.hero.backgroundColor}",
        eyebrow: "${data.hero.eyebrow}",
        headline: "${data.hero.headline}",
        subheadline: ${data.hero.subheadline ? `"${data.hero.subheadline}"` : 'null'} as string | null,
        ctas: ${JSON.stringify(data.hero.ctas, null, 12).replace(/\n/g, '\n        ')},
    },

    // Homepage sections
    home: {
        featuredSection: {
            eyebrow: "${data.home.featuredSection.eyebrow}",
            title: "${data.home.featuredSection.title}",
            productCount: ${data.home.featuredSection.productCount},
        },
    },

    // About page
    about: {
        title: "${data.about.title}",
        subtitle: "${data.about.subtitle}",
        paragraphs: ${JSON.stringify(data.about.paragraphs, null, 12).replace(/\n/g, '\n        ')},
        image: ${data.about.image ? `"${data.about.image}"` : 'null'} as string | null,
    },

    // Contact page
    contact: {
        title: "${data.contact.title}",
        email: "${data.contact.email}",
        phone: "${data.contact.phone}",
        address: "${data.contact.address}",
    },

    // Footer
    footer: {
        newsletter: {
            title: "${data.footer.newsletter.title}",
            description: "${data.footer.newsletter.description}",
            placeholder: "${data.footer.newsletter.placeholder}",
        },
        copyright: "${data.footer.copyright}",
    },
}

export type Content = typeof content
`;
}

// ============================================================
// FEATURES CONFIG
// ============================================================

function generateFeaturesConfigData(dsl: WebsiteDSL): FeaturesConfigData {
    const { complexity } = dsl.classification;
    const { cartDrawer, searchOverlay } = dsl.globalComponents;

    // Determine features based on complexity
    const isMinimal = complexity === 'minimal';
    const isEnterprise = complexity === 'enterprise';

    return {
        auth: {
            enabled: true,
            guestCheckout: true,
            emailVerification: !isMinimal,
            socialLogin: isEnterprise,
        },
        cart: {
            enabled: true,
            miniCart: cartDrawer.variant !== 'fullscreen',
            persistCart: true,
        },
        wishlist: {
            enabled: !isMinimal,
            persistWishlist: true,
        },
        search: {
            enabled: true,
            instantSearch: searchOverlay.showSuggestions,
            keyboard: true,
        },
        product: {
            quickAdd: !isMinimal,
            reviews: isEnterprise,
            relatedProducts: !isMinimal,
        },
        checkout: {
            stripe: false, // Requires API key
            paypal: false,
            applePay: false,
        },
        content: {
            blog: isEnterprise,
            stories: !isMinimal,
        },
        admin: {
            enabled: true,
            editProducts: true,
        },
    };
}

function generateFeaturesConfigFile(data: FeaturesConfigData): string {
    return `// Feature Flags Configuration
// Auto-generated by ConfigGenerator

export const features = {
    // Authentication
    auth: {
        enabled: ${data.auth.enabled},
        guestCheckout: ${data.auth.guestCheckout},
        emailVerification: ${data.auth.emailVerification},
        socialLogin: ${data.auth.socialLogin},
    },

    // Shopping
    cart: {
        enabled: ${data.cart.enabled},
        miniCart: ${data.cart.miniCart},
        persistCart: ${data.cart.persistCart},
    },

    wishlist: {
        enabled: ${data.wishlist.enabled},
        persistWishlist: ${data.wishlist.persistWishlist},
    },

    // Search
    search: {
        enabled: ${data.search.enabled},
        instantSearch: ${data.search.instantSearch},
        keyboard: ${data.search.keyboard},
    },

    // Product
    product: {
        quickAdd: ${data.product.quickAdd},
        reviews: ${data.product.reviews},
        relatedProducts: ${data.product.relatedProducts},
    },

    // Checkout
    checkout: {
        stripe: ${data.checkout.stripe},
        paypal: ${data.checkout.paypal},
        applePay: ${data.checkout.applePay},
    },

    // Content
    content: {
        blog: ${data.content.blog},
        stories: ${data.content.stories},
    },

    // Admin
    admin: {
        enabled: ${data.admin.enabled},
        editProducts: ${data.admin.editProducts},
    },
}

export type Features = typeof features
`;
}

// ============================================================
// EXPORTS
// ============================================================

export {
    generateSiteConfigData,
    generateThemeConfigData,
    generateNavigationConfigData,
    generateContentConfigData,
    generateFeaturesConfigData,
};
