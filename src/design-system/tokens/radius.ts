// src/design-system/tokens/radius.ts
// Border Radius Token System

export type RadiusScale = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface RadiusTokens {
    none: string;
    sm: string;
    default: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
}

const radiusPresets: Record<RadiusScale, RadiusTokens> = {
    none: {
        none: '0',
        sm: '0',
        default: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '0',
    },
    sm: {
        none: '0',
        sm: '0.125rem',
        default: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
    },
    md: {
        none: '0',
        sm: '0.25rem',
        default: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px',
    },
    lg: {
        none: '0',
        sm: '0.375rem',
        default: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2.5rem',
        '3xl': '3rem',
        full: '9999px',
    },
    xl: {
        none: '0',
        sm: '0.5rem',
        default: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
        '3xl': '4rem',
        full: '9999px',
    },
    full: {
        none: '0',
        sm: '9999px',
        default: '9999px',
        md: '9999px',
        lg: '9999px',
        xl: '9999px',
        '2xl': '9999px',
        '3xl': '9999px',
        full: '9999px',
    },
};

export function getRadiusTokens(scale: RadiusScale = 'md'): RadiusTokens {
    return radiusPresets[scale];
}

export function radiusToCSSVariables(tokens: RadiusTokens): Record<string, string> {
    return {
        '--radius-none': tokens.none,
        '--radius-sm': tokens.sm,
        '--radius': tokens.default,
        '--radius-md': tokens.md,
        '--radius-lg': tokens.lg,
        '--radius-xl': tokens.xl,
        '--radius-2xl': tokens['2xl'],
        '--radius-3xl': tokens['3xl'],
        '--radius-full': tokens.full,
    };
}
