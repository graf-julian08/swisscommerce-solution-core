/**
 * Header Customizer - Generates customization instructions for fashion headers
 * 
 * This module takes a selected header design and generates customization
 * parameters (~50% modifications) while preserving the design's DNA.
 * 
 * CRITICAL: This extracts EXACT icon SVGs and animation patterns from the
 * selected header to ensure the AI uses them 1:1, NOT generic icons!
 */

import fs from 'fs';
import path from 'path';
import headerMetadata from '@/data/header-designs-metadata.json';

export interface HeaderCustomization {
    baseDesignId: string;
    baseDesignName: string;
    modifications: {
        brandName: string;
        categories: string[];
        primaryFont: string;
        secondaryFont?: string;
        logoSize?: string;
        letterSpacing?: string;
        accentColor?: string;
        headerHeight?: string;
        animationDuration?: string;
        layoutTweaks: string[];
        animationAdjustments: string[];
    };
    sourceCode: string;
    customizationPrompt: string;
    extractedIcons: string;
    extractedAnimations: string;
}

interface HeaderDesign {
    id: string;
    name: string;
    fontFamily: string;
    fontStyle: string;
    vibe: string[];
    features: string[];
}

/**
 * Pool of luxury fonts that can be used for customization
 */
const LUXURY_FONT_POOL = {
    'sans-serif': [
        'Helvetica Neue',
        'Inter',
        'DM Sans',
        'Outfit',
        'Montserrat',
        'Lato',
        'Source Sans Pro'
    ],
    'serif': [
        'Georgia',
        'Playfair Display',
        'Didot',
        'Cormorant Garamond',
        'Libre Baskerville'
    ]
};

/**
 * Extract ALL SVG icons from header source code
 * Returns formatted icon definitions ready for AI to copy
 */
export function extractIconsSVG(sourceCode: string): string {
    // Match all SVG elements with their content
    const svgRegex = /<svg[^>]*>[\s\S]*?<\/svg>/g;
    const matches = sourceCode.match(svgRegex) || [];

    // Categorize icons by their likely purpose
    const icons: Record<string, string[]> = {
        search: [],
        cart: [],
        user: [],
        wishlist: [],
        menu: [],
        close: [],
        chevron: [],
        other: []
    };

    for (const svg of matches) {
        const svgLower = svg.toLowerCase();

        // BAG/SHOPPING ICON - Look for bag-specific patterns
        // Bag icons have: handle (V5 or V4 pattern), body (5.5H or 5H), specific viewBox sizes
        if (
            (svgLower.includes('v5') || svgLower.includes('v4')) &&
            (svgLower.includes('5h') || svgLower.includes('5.5h') || svgLower.includes('m3 5'))
        ) {
            icons.cart.push(svg);
        }
        // Also check for viewBox patterns typical for bag icons (18x20, 20x22)
        else if (svgLower.includes('viewbox="0 0 18 20"') || svgLower.includes('viewbox="0 0 20 22"')) {
            // Could be user or bag - check for circle (user) vs path (bag)
            if (!svgLower.includes('circle')) {
                icons.cart.push(svg);
            } else {
                icons.user.push(svg);
            }
        }
        // SEARCH ICON - Has circle for lens and diagonal line
        else if (svgLower.includes('circle') && (svgLower.includes('m14') || svgLower.includes('m13') || svgLower.includes('r="4"') || svgLower.includes('r="5"'))) {
            // Check if it's a search (has diagonal line) vs user (has body path)
            if (svgLower.includes('l') && svgLower.match(/l\d+\s*\d+/)) {
                icons.search.push(svg);
            } else if (svgLower.includes('cy="6"') || svgLower.includes('cy="5"')) {
                icons.user.push(svg);
            } else {
                icons.search.push(svg);
            }
        }
        // USER ICON - Circle for head + path for body, viewBox 20x22 pattern
        else if (svgLower.includes('circle') && (svgLower.includes('cy="6"') || svgLower.includes('cy="5"'))) {
            icons.user.push(svg);
        }
        // WISHLIST/HEART - Specific heart path patterns
        else if (svgLower.includes('m10 17') || svgLower.includes('m9.27') || svgLower.includes('8.55') || svgLower.includes('heart')) {
            icons.wishlist.push(svg);
        }
        // MENU/HAMBURGER - Horizontal lines, NOT containing V5/V4 (bag handle)
        else if (
            (svgLower.includes('h18') || svgLower.includes('h19') || svgLower.includes('h20') ||
                svgLower.includes('m1 7h') || svgLower.includes('m2 6') || svgLower.includes('m1 1h')) &&
            !svgLower.includes('v5') && !svgLower.includes('v4')
        ) {
            icons.menu.push(svg);
        }
        // CLOSE/X ICON - Diagonal cross lines
        else if (svgLower.includes('m1 1l') || svgLower.includes('m4 4l') || svgLower.includes('l13 13') || svgLower.includes('m16 4')) {
            icons.close.push(svg);
        }
        // CHEVRON - Arrow patterns
        else if (svgLower.includes('l7 7') || svgLower.includes('m1 1l7') || svgLower.includes('polyline')) {
            icons.chevron.push(svg);
        }
        else {
            icons.other.push(svg);
        }
    }

    // Format extracted icons
    let result = `
=== EXTRACTED ICONS FROM HEADER (USE THESE EXACTLY!) ===

⚠️ CRITICAL: DO NOT USE LUCIDE-REACT OR ANY ICON LIBRARY!
⚠️ COPY THESE SVG ICONS EXACTLY AS SHOWN BELOW!

`;

    // Add unique icons for each category
    if (icons.search.length > 0) {
        result += `### SEARCH ICON (Copy exactly):\n${icons.search[0]}\n\n`;
    }

    if (icons.cart.length > 0) {
        result += `### CART/BAG ICON (Copy exactly - THIS IS A BAG, NOT A BOX!):\n${icons.cart[0]}\n\n`;
    }

    if (icons.user.length > 0) {
        result += `### USER/ACCOUNT ICON (Copy exactly):\n${icons.user[0]}\n\n`;
    }

    if (icons.wishlist.length > 0) {
        result += `### WISHLIST/HEART ICON (Copy exactly):\n${icons.wishlist[0]}\n\n`;
    }

    if (icons.menu.length > 0) {
        result += `### HAMBURGER MENU ICON (Copy exactly):\n${icons.menu[0]}\n\n`;
    }

    if (icons.close.length > 0) {
        result += `### CLOSE/X ICON (Copy exactly):\n${icons.close[0]}\n\n`;
    }

    return result;
}

/**
 * Extract animation patterns from header source code
 * ENHANCED: Extracts complete animation code blocks for 1:1 copying
 */
export function extractAnimationPatterns(sourceCode: string): string {
    // Extract complete className patterns with transitions
    const classNameRegex = /className=\{`[^`]*transition[^`]*`\}/g;
    const classNameMatches = sourceCode.match(classNameRegex) || [];

    // Extract style objects with transition properties  
    const styleRegex = /style=\{\{[^}]*transition[^}]*\}\}/gi;
    const styleMatches = sourceCode.match(styleRegex) || [];

    // Extract complete panel div patterns (most important!)
    const menuPanelRegex = /<div\s+className=\{`fixed[^`]*translate-x[^`]*`\}[^>]*>/g;
    const menuPanels = sourceCode.match(menuPanelRegex) || [];

    const searchPanelRegex = /<div\s+className=\{`fixed[^`]*translate-y[^`]*`\}[^>]*>/g;
    const searchPanels = sourceCode.match(searchPanelRegex) || [];

    // Extract backdrop patterns
    const backdropRegex = /<div\s+className=\{`fixed inset-0[^`]*opacity[^`]*`\}/g;
    const backdrops = sourceCode.match(backdropRegex) || [];

    // Extract transition-specific patterns
    const transitionPropRegex = /transition-\[[^\]]+\]|transition-(?:transform|opacity|all|colors)[^\s'"]*/g;
    const transitionProps = [...new Set(sourceCode.match(transitionPropRegex) || [])];

    // Extract duration patterns  
    const durationRegex = /duration-\[\d+ms\]|duration-\d+/g;
    const durations = [...new Set(sourceCode.match(durationRegex) || [])];

    // Extract cubic-bezier and easing
    const easingRegex = /cubic-bezier\([^)]+\)|ease-(?:out|in|in-out)/g;
    const easings = [...new Set(sourceCode.match(easingRegex) || [])];

    let result = `
=============================================================
   📋 EXTRACTED ANIMATION CODE (COPY 1:1 - BE PROFESSIONAL!)
=============================================================

⚠️ THESE ARE THE EXACT ANIMATIONS FROM THE HEADER!
⚠️ COPY THEM CHARACTER-BY-CHARACTER!
⚠️ THEY MAKE THE HEADER BEAUTIFUL AND PROFESSIONAL!

=== MENU PANEL ANIMATION (Slides from LEFT) ===
${menuPanels.length > 0 ? menuPanels[0] : 'className={`fixed top-0 left-0 h-full w-full sm:w-[400px] bg-white z-[60] overflow-y-auto transition-[transform,box-shadow] duration-300 ease-out ${isMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full shadow-none"}`}'}

=== CART PANEL ANIMATION (Slides from RIGHT) ===
${menuPanels.length > 1 ? menuPanels[1] : 'className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[120] transition-transform duration-300 ease-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}'}

=== SEARCH PANEL ANIMATION (Slides from TOP) ===
${searchPanels.length > 0 ? searchPanels[0] : 'className={`fixed top-0 left-0 right-0 h-[70px] bg-white z-[80] border-b border-[#e5e5e5] transition-transform duration-300 ease-out ${isSearchOpen ? "translate-y-0" : "-translate-y-full"}`}\nstyle={{ transitionDelay: isSearchOpen ? "0ms" : "320ms" }}'}

=== BACKDROP ANIMATION (Opacity fade - ONLY EXCEPTION) ===
${backdrops.length > 0 ? backdrops[0] : 'className={`fixed inset-0 bg-black/40 z-[55] transition-opacity duration-[400ms] ease-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}'}

=== TRANSITION PROPERTIES USED ===
${transitionProps.slice(0, 8).join('\n')}

=== DURATION VALUES ===
${durations.slice(0, 5).join(', ')}

=== EASING FUNCTIONS ===
${easings.slice(0, 3).join(', ') || 'ease-out'}

=== STYLE OBJECTS WITH DELAYS ===
${styleMatches.slice(0, 2).join('\n') || 'style={{ transition: "transform 300ms ease-out, box-shadow 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms" }}'}

=============================================================
   ⛔ ANIMATION RULES - MANDATORY
=============================================================

1. MENU: Slides from LEFT → use -translate-x-full / translate-x-0
2. CART: Slides from RIGHT → use translate-x-full / translate-x-0
3. SEARCH: Slides from TOP → use -translate-y-full / translate-y-0
4. BACKDROP: Opacity fade (400ms) with pointer-events-none when hidden
5. SHADOW: Fade separately with longer duration (600-700ms)
6. DELAYS: Use transitionDelay for staggered effects

❌ NEVER USE: 
- opacity fade for panels
- scale animations
- framer-motion for basic panels
- instant show/hide
`;

    return result;
}


/**
 * Extract brand name from user prompt
 */
export function extractBrandName(userPrompt: string): string {
    const patterns = [
        /(?:called|named|brand)\s+["']?([A-Z][A-Za-z\s]+)["']?/i,
        /["']([A-Z][A-Za-z\s]+)["']\s+(?:brand|shop|store)/i,
        /(?:namens|heisst|marke|shop|store)\s+["']?([A-Z][A-Za-z\s]+)["']?/i,
        /["']([A-Z][A-Za-z\s]+)["']\s+(?:brand|shop|store|laden)/i,
        /^([A-Z][A-Za-z\s]+)\s+-/,
    ];

    for (const pattern of patterns) {
        const match = userPrompt.match(pattern);
        if (match && match[1]) {
            return match[1].trim().toUpperCase();
        }
    }

    const capitalizedMatch = userPrompt.match(/\b([A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)*)\b/);
    if (capitalizedMatch) {
        return capitalizedMatch[1].toUpperCase();
    }

    return 'MAISON';
}

/**
 * Extract categories from user prompt
 */
export function extractCategories(userPrompt: string): string[] {
    const promptLower = userPrompt.toLowerCase();
    const defaultCategories = ['New In', 'Women', 'Men', 'Accessories', 'Beauty'];

    const categoryMap: Record<string, string[]> = {
        womenswear: ['Women', 'Womenswear', 'Ladies', 'damen', 'frauen', 'weiblich'],
        menswear: ['Men', 'Menswear', 'herren', 'maenner', 'männer'],
        bags: ['Bags', 'Handbags', 'Totes', 'taschen', 'beutel'],
        shoes: ['Shoes', 'Footwear', 'schuhe', 'stiefel'],
        accessories: ['Accessories', 'Jewelry', 'Watches', 'accessoires', 'schmuck', 'uhren'],
        beauty: ['Beauty', 'Skincare', 'Fragrances', 'kosmetik', 'pflege', 'parfum', 'hautpflege'],
        home: ['Home', 'Living', 'wohnen', 'zuhause', 'einrichtung', 'moebel', 'möbel'],
        kids: ['Kids', 'Children', 'kinder', 'baby', 'spielzeug'],
        streetwear: ['Streetwear', 'Urban', 'strasse'] // 'strasse' is rare but consistent
    };

    const detectedCategories: string[] = [];

    for (const [key, values] of Object.entries(categoryMap)) {
        if (promptLower.includes(key)) {
            detectedCategories.push(values[0]);
        }
    }

    if (detectedCategories.length > 0) {
        return ['New In', ...detectedCategories.slice(0, 4)];
    }

    return defaultCategories;
}

/**
 * Select an alternative font for customization
 */
function selectAlternativeFont(originalFont: string, fontStyle: string): string {
    const pool = fontStyle === 'serif' ? LUXURY_FONT_POOL.serif : LUXURY_FONT_POOL['sans-serif'];
    const alternatives = pool.filter(f => f.toLowerCase() !== originalFont.toLowerCase());
    return alternatives[Math.floor(Math.random() * alternatives.length)];
}

/**
 * Generate layout tweaks for ~50% customization
 */
function generateLayoutTweaks(): string[] {
    const possibleTweaks = [
        'Adjust header height by ±4px',
        'Modify icon spacing slightly',
        'Tweak letter-spacing by 0.02em',
        'Adjust padding by 4-8px',
        'Modify border thickness',
        'Adjust logo size by 2px'
    ];
    const numTweaks = Math.floor(Math.random() * 2) + 2;
    const shuffled = possibleTweaks.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numTweaks);
}

/**
 * Generate animation adjustments
 */
function generateAnimationAdjustments(): string[] {
    const possibleAdjustments = [
        'Adjust slide duration by ±50ms',
        'Modify ease timing function',
        'Adjust shadow fade timing',
        'Tweak stagger delay'
    ];
    const numAdjustments = Math.floor(Math.random() * 2) + 1;
    const shuffled = possibleAdjustments.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numAdjustments);
}

/**
 * Generate the customization prompt for AI
 */
function generateCustomizationPrompt(
    design: HeaderDesign,
    brandName: string,
    categories: string[],
    newFont: string,
    extractedIcons: string,
    extractedAnimations: string
): string {
    return `
=============================================================
      🚨 FASHION HEADER CUSTOMIZATION INSTRUCTIONS 🚨
=============================================================

Base Design: ${design.name} (${design.id})
Brand Name: ${brandName}
Navigation Categories: ${categories.join(', ')}

=============================================================
         ⛔ GLOBAL TYPOGRAPHY PROTOCOL (ENTIRE SITE) ⛔
=============================================================

❌ DO NOT USE: ALL UPPERCASE anywhere on the site (Headlines, Buttons, Nav, Content).
❌ DO NOT USE: uppercase CSS classes (uppercase, uppercase-text).
❌ DO NOT USE: text-transform: uppercase.

✅ MUST USE: **Title Case** or **Sentence Case** for EVERYTHING.
✅ MUST USE: "Add to Cart" (not "ADD TO CART")
✅ MUST USE: "Shop Now" (not "SHOP NOW")
✅ MUST USE: "Discover Collection" (not "DISCOVER COLLECTION")

EXCEPTION: The Logo/Brand Name may be uppercase. EVERYTHING ELSE IS FORBIDDEN.

EXAMPLES:
- ❌ "MENU" → ✅ "Menu"
- ❌ "SEARCH" → ✅ "Search"
- ❌ "ADD TO BAG" → ✅ "Add to Bag"
- ❌ "NEW ARRIVALS" → ✅ "New Arrivals"
- ❌ "CHECKOUT" → ✅ "Checkout"

⚠️ IF THE SOURCE CODE HAS "MENU", YOU MUST CHANGE IT TO "Menu" IN YOUR OUTPUT!

=============================================================
         ⛔ CRITICAL ICON RULES - READ CAREFULLY ⛔
=============================================================

❌ DO NOT USE: lucide-react, react-icons, phosphor, heroicons
❌ DO NOT USE: Any icon library whatsoever
❌ DO NOT USE: Generic shopping cart icons (boxes, trolleys)
❌ DO NOT USE: <ShoppingCart>, <Package>, <Box> components

✅ MUST USE: The EXACT SVG icons extracted below from the header
✅ MUST USE: Custom inline SVG with thin strokes (1-1.5px)
✅ MUST USE: Shopping BAG icon (NOT a cart/trolley!)

${extractedIcons}

=============================================================
         ⛔ CRITICAL SEARCH OVERLAY PROTOCOL ⛔
=============================================================

The source code contains a high-quality Search Overlay (often with animations).
YOU MUST PRESERVE THIS EXACTLY.

❌ DO NOT replace it with a simple input field.
❌ DO NOT use a generic modal or browser default alert.
❌ DO NOT simplify the structure.

✅ MUST USE: The exact isSearchOpen logic from the source.
✅ MUST USE: The exact overlay JSX structure (often fixed position).
✅ MUST USE: The exact close button and transitions.

If the header has a "Search" button that opens a full-screen or slide-down overlay, YOU MUST BUILD THAT OVERLAY EXACTLY AS SHOWN IN THE SOURCE CODE.

=============================================================
         ⛔ CRITICAL ANIMATION RULES ⛔
=============================================================

❌ DO NOT USE: opacity-0 → opacity-100 for panels (NO FADE!)
❌ DO NOT USE: scale animations for overlays
❌ DO NOT USE: framer-motion for basic panel animations

✅ MUST USE: translateX/translateY SLIDE animations
✅ MUST USE: The exact transition classes from the header
✅ OK TO USE: Backdrop opacity fade (only exception)

${extractedAnimations}

=============================================================
         MODIFICATIONS TO APPLY (~50%)
=============================================================

1. Replace logo/brand text with "${brandName}"
2. Replace navigation categories with: ${categories.join(', ')}
3. Change primary font to "${newFont}"
4. ⚠️ GLOBAL RULE: NO UPPERCASE ALLOWED (except Logo). Use Title Case for everything!
5. KEEP ALL ICON SVGs EXACTLY AS EXTRACTED ABOVE
6. KEEP ALL ANIMATION PATTERNS EXACTLY
7. Maintain responsive breakpoints

=============================================================
         PRESERVE (Design DNA - DO NOT CHANGE)
=============================================================

- Overall layout structure
- Icon SVG code (use extracted icons 1:1)
- Animation types and directions (slide, not fade)
- Color scheme (black/white luxury)
- Cart/Menu/Search panel behavior
- Stroke widths (1-1.5px)
`;
}

/**
 * Customize a header design for a specific shop
 */
export async function customizeHeader(
    designId: string,
    userPrompt: string,
    sourceCode: string
): Promise<HeaderCustomization> {
    const design = (headerMetadata.designs as HeaderDesign[]).find(d => d.id === designId);

    if (!design) {
        throw new Error(`Design ${designId} not found`);
    }

    const brandName = extractBrandName(userPrompt);
    const categories = extractCategories(userPrompt);
    const newFont = selectAlternativeFont(design.fontFamily, design.fontStyle);
    const layoutTweaks = generateLayoutTweaks();
    const animationAdjustments = generateAnimationAdjustments();

    // Extract icons and animations from source code
    const extractedIcons = extractIconsSVG(sourceCode);
    const extractedAnimations = extractAnimationPatterns(sourceCode);

    return {
        baseDesignId: designId,
        baseDesignName: design.name,
        modifications: {
            brandName,
            categories,
            primaryFont: newFont,
            letterSpacing: `${(0.08 + Math.random() * 0.1).toFixed(2)}em`,
            layoutTweaks,
            animationAdjustments
        },
        sourceCode,
        customizationPrompt: generateCustomizationPrompt(design, brandName, categories, newFont, extractedIcons, extractedAnimations),
        extractedIcons,
        extractedAnimations
    };
}

/**
 * Load header design guidelines
 */
export async function loadHeaderGuidelines(): Promise<string> {
    const guidelinesPath = path.join(
        process.cwd(),
        'src/components/site-components/fashion/header/HEADER_DESIGN_GUIDELINES.md'
    );

    if (fs.existsSync(guidelinesPath)) {
        return fs.readFileSync(guidelinesPath, 'utf-8');
    }

    return '';
}

export default { customizeHeader, extractBrandName, extractCategories, loadHeaderGuidelines, extractIconsSVG, extractAnimationPatterns };
