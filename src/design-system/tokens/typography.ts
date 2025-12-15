// src/design-system/tokens/typography.ts
// Typography Token System

export type FontFamily =
    // Sans-serif modern
    | 'inter' | 'outfit' | 'poppins' | 'montserrat'
    // Serif elegant
    | 'playfair' | 'cormorant' | 'fraunces'
    // Sans-serif clean
    | 'space-grotesk' | 'dm-sans' | 'plus-jakarta'
    // Rounded/Playful
    | 'quicksand' | 'nunito' | 'comfortaa';

export type TypographyScale = 'compact' | 'default' | 'spacious';

export interface TypographyTokens {
    fontFamily: {
        heading: string;
        body: string;
    };
    fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
        '5xl': string;
        '6xl': string;
    };
    lineHeight: {
        tight: string;
        normal: string;
        relaxed: string;
    };
    letterSpacing: {
        tight: string;
        normal: string;
        wide: string;
        wider: string;
    };
    fontWeight: {
        light: number;
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
    };
}

// Google Fonts import URLs
export const fontImports: Record<FontFamily, string> = {
    'inter': 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'outfit': 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap',
    'poppins': 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'montserrat': 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap',
    'playfair': 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap',
    'cormorant': 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap',
    'fraunces': 'https://fonts.googleapis.com/css2?family=Fraunces:wght@300;400;500;600;700&display=swap',
    'space-grotesk': 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
    'dm-sans': 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap',
    'plus-jakarta': 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap',
    'quicksand': 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap',
    'nunito': 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap',
    'comfortaa': 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap',
};

// Font family CSS values
export const fontFamilyValues: Record<FontFamily, string> = {
    'inter': '"Inter", sans-serif',
    'outfit': '"Outfit", sans-serif',
    'poppins': '"Poppins", sans-serif',
    'montserrat': '"Montserrat", sans-serif',
    'playfair': '"Playfair Display", serif',
    'cormorant': '"Cormorant Garamond", serif',
    'fraunces': '"Fraunces", serif',
    'space-grotesk': '"Space Grotesk", sans-serif',
    'dm-sans': '"DM Sans", sans-serif',
    'plus-jakarta': '"Plus Jakarta Sans", sans-serif',
    'quicksand': '"Quicksand", sans-serif',
    'nunito': '"Nunito", sans-serif',
    'comfortaa': '"Comfortaa", sans-serif',
};

// Scale multipliers for typography
const scaleMultipliers: Record<TypographyScale, number> = {
    compact: 0.9,
    default: 1,
    spacious: 1.15,
};

export function getTypographyTokens(
    headingFont: FontFamily,
    bodyFont: FontFamily,
    scale: TypographyScale = 'default'
): TypographyTokens {
    const multiplier = scaleMultipliers[scale];

    return {
        fontFamily: {
            heading: fontFamilyValues[headingFont],
            body: fontFamilyValues[bodyFont],
        },
        fontSize: {
            xs: `${0.75 * multiplier}rem`,
            sm: `${0.875 * multiplier}rem`,
            base: `${1 * multiplier}rem`,
            lg: `${1.125 * multiplier}rem`,
            xl: `${1.25 * multiplier}rem`,
            '2xl': `${1.5 * multiplier}rem`,
            '3xl': `${1.875 * multiplier}rem`,
            '4xl': `${2.25 * multiplier}rem`,
            '5xl': `${3 * multiplier}rem`,
            '6xl': `${3.75 * multiplier}rem`,
        },
        lineHeight: {
            tight: '1.2',
            normal: '1.5',
            relaxed: '1.75',
        },
        letterSpacing: {
            tight: '-0.025em',
            normal: '0',
            wide: '0.05em',
            wider: '0.1em',
        },
        fontWeight: {
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
    };
}

export function typographyToCSSVariables(tokens: TypographyTokens): Record<string, string> {
    return {
        '--font-heading': tokens.fontFamily.heading,
        '--font-body': tokens.fontFamily.body,
        '--text-xs': tokens.fontSize.xs,
        '--text-sm': tokens.fontSize.sm,
        '--text-base': tokens.fontSize.base,
        '--text-lg': tokens.fontSize.lg,
        '--text-xl': tokens.fontSize.xl,
        '--text-2xl': tokens.fontSize['2xl'],
        '--text-3xl': tokens.fontSize['3xl'],
        '--text-4xl': tokens.fontSize['4xl'],
        '--text-5xl': tokens.fontSize['5xl'],
        '--text-6xl': tokens.fontSize['6xl'],
    };
}

export function getFontImportLinks(headingFont: FontFamily, bodyFont: FontFamily): string[] {
    const links = [fontImports[headingFont]];
    if (headingFont !== bodyFont) {
        links.push(fontImports[bodyFont]);
    }
    return links;
}
