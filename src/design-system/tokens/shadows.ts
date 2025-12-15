// src/design-system/tokens/shadows.ts
// Shadow Token System

export type ShadowScale = 'none' | 'subtle' | 'medium' | 'dramatic';

export interface ShadowTokens {
    none: string;
    sm: string;
    default: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
}

const shadowPresets: Record<ShadowScale, ShadowTokens> = {
    none: {
        none: 'none',
        sm: 'none',
        default: 'none',
        md: 'none',
        lg: 'none',
        xl: 'none',
        '2xl': 'none',
        inner: 'none',
    },
    subtle: {
        none: 'none',
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.03)',
        default: '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.1)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.03)',
    },
    medium: {
        none: 'none',
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    },
    dramatic: {
        none: 'none',
        sm: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        default: '0 2px 8px 0 rgb(0 0 0 / 0.15), 0 1px 3px -1px rgb(0 0 0 / 0.1)',
        md: '0 6px 16px -2px rgb(0 0 0 / 0.2), 0 3px 6px -3px rgb(0 0 0 / 0.15)',
        lg: '0 15px 30px -5px rgb(0 0 0 / 0.2), 0 6px 10px -6px rgb(0 0 0 / 0.15)',
        xl: '0 25px 40px -8px rgb(0 0 0 / 0.25), 0 10px 16px -8px rgb(0 0 0 / 0.15)',
        '2xl': '0 35px 60px -15px rgb(0 0 0 / 0.35)',
        inner: 'inset 0 3px 6px 0 rgb(0 0 0 / 0.1)',
    },
};

export function getShadowTokens(scale: ShadowScale = 'medium'): ShadowTokens {
    return shadowPresets[scale];
}

export function shadowsToCSSVariables(tokens: ShadowTokens): Record<string, string> {
    return {
        '--shadow-none': tokens.none,
        '--shadow-sm': tokens.sm,
        '--shadow': tokens.default,
        '--shadow-md': tokens.md,
        '--shadow-lg': tokens.lg,
        '--shadow-xl': tokens.xl,
        '--shadow-2xl': tokens['2xl'],
        '--shadow-inner': tokens.inner,
    };
}
