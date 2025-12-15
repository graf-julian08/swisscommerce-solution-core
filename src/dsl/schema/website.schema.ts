// src/dsl/schema/website.schema.ts
// Website DSL TypeScript Schema - UPDATED with all required pages

// ============================================================
// ROOT SCHEMA
// ============================================================

export interface WebsiteDSL {
    version: '1.0';
    meta: WebsiteMeta;
    classification: Classification;
    design: DesignConfig;
    pages: PageConfig[];
    globalComponents: GlobalComponents;
    content: ContentConfig;
}

// ============================================================
// META
// ============================================================

export interface WebsiteMeta {
    generatedAt: string;
    promptHash: string;
    locale: 'de' | 'en' | 'fr' | 'es';
    framework: 'nextjs';
}

// ============================================================
// CLASSIFICATION
// ============================================================

export interface Classification {
    websiteType: WebsiteType;
    vertical: Vertical;
    complexity: Complexity;
    conversionGoal: ConversionGoal;
    brandPersonality: BrandPersonality;
    uniquenessFactors: UniquenessFactors;
}

export type WebsiteType =
    | 'online_shop'
    | 'portfolio'
    | 'saas_landing'
    | 'blog'
    | 'corporate';

export type Vertical =
    | 'fashion' | 'luxury' | 'streetwear'
    | 'toys' | 'kids'
    | 'electronics' | 'tech'
    | 'beauty' | 'cosmetics'
    | 'food' | 'beverage'
    | 'home' | 'furniture'
    | 'sports' | 'outdoor'
    | 'jewelry' | 'watches'
    | 'art' | 'gallery'
    | 'saas' | 'software'
    | 'portfolio' | 'agency'
    | 'generic';

export type Complexity = 'minimal' | 'standard' | 'extended' | 'enterprise';

export type ConversionGoal =
    | 'product_purchase'
    | 'lead_generation'
    | 'portfolio_showcase'
    | 'content_consumption';

export type BrandPersonality =
    | 'luxury-minimal'
    | 'luxury-bold'
    | 'luxury-editorial'
    | 'luxury-avant-garde'
    | 'playful-trustworthy'
    | 'playful-energetic'
    | 'playful-whimsical'
    | 'tech-modern'
    | 'tech-corporate'
    | 'tech-futuristic'
    | 'natural-organic'
    | 'natural-rustic'
    | 'editorial-artistic'
    | 'editorial-magazine'
    | 'brutalist-bold'
    | 'retro-vintage'
    | 'minimalist-clean'
    | 'maximalist-bold';

// For 100% uniqueness based on prompt
export interface UniquenessFactors {
    colorMood: string;           // e.g., "warm gold tones", "cold blue steel"
    layoutDNA: string;           // e.g., "asymmetric grid", "classical centered"
    typographyMood: string;      // e.g., "elegant serif", "bold sans"
    animationIntensity: 'subtle' | 'moderate' | 'expressive' | 'dramatic';
    visualDensity: 'airy' | 'balanced' | 'dense';
    imageStyle: 'editorial' | 'lifestyle' | 'product-focused' | 'artistic';
    interactionStyle: 'smooth' | 'snappy' | 'playful' | 'cinematic';
}

// ============================================================
// DESIGN CONFIG
// ============================================================

export interface DesignConfig {
    layoutVariant: LayoutVariant;
    tokens: DesignTokensConfig;
    animationPack: AnimationPackType;
    gsapConfig?: GSAPConfig;
}

// Extended layout variants for uniqueness
export type LayoutVariant =
    // Hero-focused
    | 'hero-carousel-grid'
    | 'hero-split-masonry'
    | 'hero-fullscreen-video'
    | 'hero-parallax-layers'
    | 'hero-text-only'
    // Grid-focused
    | 'grid-first'
    | 'grid-masonry'
    | 'grid-pinterest'
    | 'grid-magazine'
    // Minimal
    | 'minimal-centered'
    | 'minimal-asymmetric'
    | 'minimal-whitespace'
    // Editorial
    | 'editorial-asymmetric'
    | 'editorial-magazine'
    | 'editorial-story'
    // Modern
    | 'fullscreen-sections'
    | 'horizontal-scroll'
    | 'brutalist-blocks'
    | 'bento-grid';

export interface GSAPConfig {
    scrollTrigger: boolean;
    staggerAnimations: boolean;
    parallaxEnabled: boolean;
    cursorFollower: boolean;
    magneticButtons: boolean;
    textReveal: 'none' | 'fade' | 'slide' | 'split-chars' | 'split-words';
    imageReveal: 'none' | 'fade' | 'scale' | 'clip' | 'parallax';
}

export interface DesignTokensConfig {
    colors: ColorTokensConfig;
    typography: TypographyTokensConfig;
    spacing: SpacingScale;
    radius: RadiusScale;
    shadows: ShadowScale;
}

export interface ColorTokensConfig {
    preset: ColorPreset;
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    accent: string;
    muted: string;
}

export type ColorPreset =
    | 'luxury-dark'
    | 'luxury-light'
    | 'luxury-gold'
    | 'playful-bright'
    | 'playful-pastel'
    | 'tech-mono'
    | 'tech-neon'
    | 'natural-warm'
    | 'natural-earth'
    | 'editorial-bw'
    | 'fashion-noir'
    | 'fashion-cream'
    | 'fashion-blush'
    | 'custom';

export interface TypographyTokensConfig {
    fontFamily: {
        heading: FontFamily;
        body: FontFamily;
    };
    scale: TypographyScale;
    headingWeight: 300 | 400 | 500 | 600 | 700 | 800 | 900;
    headingStyle: 'normal' | 'italic';
    letterSpacing: 'tight' | 'normal' | 'wide' | 'extra-wide';
}

export type FontFamily =
    | 'inter' | 'outfit' | 'poppins' | 'montserrat'
    | 'playfair' | 'cormorant' | 'fraunces' | 'dm-serif'
    | 'space-grotesk' | 'dm-sans' | 'plus-jakarta' | 'satoshi'
    | 'quicksand' | 'nunito' | 'comfortaa'
    | 'bebas-neue' | 'oswald' | 'archivo-black';

export type TypographyScale = 'compact' | 'default' | 'spacious' | 'editorial';
export type SpacingScale = 'compact' | 'default' | 'spacious' | 'airy';
export type RadiusScale = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ShadowScale = 'none' | 'subtle' | 'medium' | 'dramatic';

export type AnimationPackType =
    | 'luxury-soft'
    | 'playful-bouncy'
    | 'tech-sharp'
    | 'editorial-fade'
    | 'minimal-micro'
    | 'gsap-cinematic'
    | 'gsap-smooth'
    | 'gsap-playful'
    | 'none';

// ============================================================
// PAGE CONFIG - ALL 12+ MANDATORY PAGES
// ============================================================

export interface PageConfig {
    id: PageId;
    path: string;
    title: string;
    sections: SectionConfig[];
    seo?: SEOConfig;
}

// ALL MANDATORY PAGES
export type PageId =
    // Core Shop Pages
    | 'home'              // Index/Landing
    | 'shop'              // Product Catalog
    | 'product'           // Product Detail Page
    | 'cart'              // Shopping Cart
    | 'checkout'          // Checkout Process
    | 'order-confirmation'// Thank You Page
    // User Account
    | 'login'             // Login Page
    | 'register'          // Registration Page
    | 'account'           // User Account Dashboard
    | 'wishlist'          // Wishlist
    | 'orders'            // Order History
    // Legal Pages
    | 'impressum'         // Legal Notice (required in DE)
    | 'contact'           // Contact Page
    | 'terms'             // Terms and Services
    | 'privacy'           // Privacy Policy
    | 'shipping'          // Shipping Information
    | 'returns'           // Returns Policy
    // Additional
    | 'about'             // About Us
    | 'faq'               // FAQ
    | 'search'            // Search Results
    | 'category'          // Category Page
    | 'collections'       // Collections Overview
    | '404';              // Not Found

export interface SEOConfig {
    metaTitle: string;
    metaDescription: string;
    ogImage?: string;
}

export interface SectionConfig {
    id: string;
    component: ComponentReference;
    order: number;
    visibility: Visibility;
}

export type Visibility = 'always' | 'desktop-only' | 'mobile-only';

export interface ComponentReference {
    type: ComponentType;
    variant: string;
    props: Record<string, unknown>;
}

export type ComponentType =
    // Hero Sections
    | 'hero'
    | 'hero-video'
    | 'hero-carousel'
    | 'hero-split'
    | 'content-hero'
    // Navigation & Layout
    | 'breadcrumb'
    | 'page-header'
    | 'announcement-bar'
    // Product Sections
    | 'product-grid'
    | 'product-card'
    | 'product-detail'
    | 'product-gallery'
    | 'product-info'
    | 'product-reviews'
    | 'product-recommendations'
    | 'product-carousel'
    | 'product-tabs'
    | 'variant-selector'
    | 'add-to-cart'
    // Shop Sections
    | 'filter-sidebar'
    | 'filter-bar'
    | 'active-filters'
    | 'category-grid'
    | 'category-banner'
    | 'collection-showcase'
    | 'pagination'
    // Promotional
    | 'promo-banner'
    // Cart & Checkout
    | 'cart-items'
    | 'cart-summary'
    | 'cart-drawer'
    | 'checkout-form'
    | 'checkout-header'
    | 'checkout-steps'
    | 'order-summary'
    | 'payment-methods'
    | 'payment-form'
    | 'shipping-form'
    | 'shipping-info'
    // Order
    | 'confirmation-header'
    | 'order-details'
    | 'order-items'
    // User Account
    | 'login-form'
    | 'register-form'
    | 'account-dashboard'
    | 'account-header'
    | 'account-tabs'
    | 'account-orders'
    | 'account-addresses'
    | 'account-settings'
    // Wishlist
    | 'wishlist-grid'
    | 'share-buttons'
    // Content Sections
    | 'about-section'
    | 'testimonials'
    | 'features'
    | 'cta'
    | 'cta-button'
    | 'newsletter'
    | 'banner'
    | 'text-block'
    | 'rich-text'
    | 'image-text'
    | 'gallery'
    | 'video-section'
    | 'values-grid'
    | 'team-grid'
    // Legal Sections
    | 'legal-content'
    | 'contact-form'
    | 'contact-info'
    | 'faq-accordion'
    | 'location-map'
    | 'store-map'
    // Primitives
    | 'text'
    | 'image'
    | 'button'
    | 'card'
    | 'grid'
    | 'stack';

// ============================================================
// GLOBAL COMPONENTS
// ============================================================

export interface GlobalComponents {
    header: HeaderConfig;
    footer: FooterConfig;
    cartDrawer: CartDrawerConfig;
    mobileMenu: MobileMenuConfig;
    searchOverlay: SearchOverlayConfig;
    cookieBanner: CookieBannerConfig;
}

export interface HeaderConfig {
    variant: HeaderVariant;
    sticky: boolean;
    transparent: boolean;
    announcementBar?: {
        enabled: boolean;
        text: string;
        link?: string;
    };
    elements: HeaderElements;
}

export type HeaderVariant =
    | 'minimal'
    | 'centered-logo'
    | 'split-nav'
    | 'mega-menu'
    | 'hamburger-only'
    | 'luxury-editorial'
    | 'fashion-minimal';

export interface HeaderElements {
    logo: boolean;
    search: boolean;
    cart: boolean;
    wishlist: boolean;
    account: boolean;
    languageSelector: boolean;
    currencySelector: boolean;
    navigation: NavItem[];
}

export interface NavItem {
    label: string;
    href: string;
    featured?: boolean;
    children?: NavItem[];
    megaMenu?: MegaMenuConfig;
}

export interface MegaMenuConfig {
    columns: MegaMenuColumn[];
    featuredImage?: string;
    featuredLink?: string;
}

export interface MegaMenuColumn {
    title: string;
    links: { label: string; href: string }[];
}

export interface FooterConfig {
    variant: FooterVariant;
    columns: FooterColumn[];
    showNewsletter: boolean;
    showSocials: boolean;
    showPaymentIcons: boolean;
    copyright: string;
    legalLinks: { label: string; href: string }[];
}

export type FooterVariant =
    | 'minimal'
    | 'multi-column'
    | 'centered'
    | 'mega-footer'
    | 'luxury-minimal';

export interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export interface FooterLink {
    label: string;
    href: string;
}

export interface CartDrawerConfig {
    variant: CartDrawerVariant;
    showRecommendations: boolean;
    showShippingProgress: boolean;
}

export type CartDrawerVariant =
    | 'slide-right'
    | 'slide-left'
    | 'modal'
    | 'dropdown'
    | 'fullscreen';

export interface MobileMenuConfig {
    variant: 'slide-left' | 'slide-right' | 'fullscreen' | 'overlay';
    showSearch: boolean;
    showAccount: boolean;
    animation: 'slide' | 'fade' | 'scale';
}

export interface SearchOverlayConfig {
    variant: 'fullscreen' | 'dropdown' | 'modal';
    showRecentSearches: boolean;
    showSuggestions: boolean;
    showProducts: boolean;
}

export interface CookieBannerConfig {
    variant: 'bottom-bar' | 'modal' | 'corner';
    position: 'bottom' | 'top';
}

// ============================================================
// CONTENT CONFIG
// ============================================================

export interface ContentConfig {
    brand: BrandContent;
    hero: HeroContent;
    products: ProductContent[];
    categories: CategoryContent[];
    testimonials: TestimonialContent[];
    features: FeatureContent[];
    legalContent: LegalContent;
}

export interface BrandContent {
    name: string;
    tagline: string;
    description: string;
    logoUrl?: string;
    story?: string;
    values?: string[];
    socialLinks?: SocialLink[];
}

export interface SocialLink {
    platform: 'instagram' | 'facebook' | 'twitter' | 'tiktok' | 'pinterest' | 'youtube';
    url: string;
}

export interface HeroContent {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
    secondaryCta?: { text: string; link: string };
    mediaType: 'image' | 'video';
    mediaUrl: string;
    overlayOpacity?: number;
}

export interface ProductContent {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    currency: 'EUR' | 'USD' | 'GBP' | 'CHF';
    images: string[];
    category: string;
    subcategory?: string;
    description: string;
    shortDescription?: string;
    badge?: 'new' | 'sale' | 'bestseller' | 'limited' | 'exclusive';
    inStock: boolean;
    variants?: ProductVariant[];
    features?: string[];
    materials?: string[];
    careInstructions?: string;
    sku?: string;
}

export interface ProductVariant {
    id: string;
    name: string;
    type: 'size' | 'color' | 'material';
    options: { value: string; inStock: boolean; priceModifier?: number }[];
}

export interface CategoryContent {
    id: string;
    name: string;
    slug: string;
    description?: string;
    imageUrl: string;
    productCount: number;
    subcategories?: CategoryContent[];
}

export interface TestimonialContent {
    quote: string;
    author: string;
    role?: string;
    avatarUrl?: string;
    rating?: 1 | 2 | 3 | 4 | 5;
    productName?: string;
}

export interface FeatureContent {
    icon: string;
    title: string;
    description: string;
}

export interface LegalContent {
    impressum: string;
    privacy: string;
    terms: string;
    shipping: string;
    returns: string;
}

// ============================================================
// MANDATORY PAGES TEMPLATE
// ============================================================

export const MANDATORY_PAGES: PageId[] = [
    'home',
    'shop',
    'product',
    'cart',
    'checkout',
    'order-confirmation',
    'login',
    'register',
    'account',
    'impressum',
    'contact',
    'terms',
    'privacy',
];

export const OPTIONAL_PAGES: PageId[] = [
    'wishlist',
    'orders',
    'shipping',
    'returns',
    'about',
    'faq',
    'search',
    'category',
    'collections',
    '404',
];

// ============================================================
// UTILITY TYPES
// ============================================================

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function isValidWebsiteDSL(obj: unknown): obj is WebsiteDSL {
    if (!obj || typeof obj !== 'object') return false;
    const dsl = obj as WebsiteDSL;
    return (
        dsl.version === '1.0' &&
        !!dsl.meta &&
        !!dsl.classification &&
        !!dsl.design &&
        Array.isArray(dsl.pages) &&
        !!dsl.globalComponents &&
        !!dsl.content
    );
}

// Validate that all mandatory pages are present
export function validateMandatoryPages(pages: PageConfig[]): { valid: boolean; missing: PageId[] } {
    const pageIds = new Set(pages.map(p => p.id));
    const missing = MANDATORY_PAGES.filter(id => !pageIds.has(id));
    return { valid: missing.length === 0, missing };
}
