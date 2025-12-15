// src/design-system/tokens/colors.ts
// Color Token Presets - EXTENDED with more options

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

export interface ColorTokens {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    accent: string;
    muted: string;
    border: string;
    card: string;
    cardForeground: string;
    destructive: string;
    success: string;
}

export const colorPresets: Record<ColorPreset, ColorTokens> = {
    // ============================================================
    // LUXURY PRESETS
    // ============================================================
    'luxury-dark': {
        primary: '#0A0A0A',
        secondary: '#1A1A1A',
        background: '#FFFFFF',
        foreground: '#0A0A0A',
        accent: '#C9A962',
        muted: '#6B6B6B',
        border: '#E5E5E5',
        card: '#FAFAFA',
        cardForeground: '#0A0A0A',
        destructive: '#991B1B',
        success: '#166534',
    },
    'luxury-light': {
        primary: '#FFFFFF',
        secondary: '#F5F5F5',
        background: '#0A0A0A',
        foreground: '#FFFFFF',
        accent: '#D4AF37',
        muted: '#A3A3A3',
        border: '#262626',
        card: '#171717',
        cardForeground: '#FFFFFF',
        destructive: '#EF4444',
        success: '#22C55E',
    },
    'luxury-gold': {
        primary: '#1A1A1A',
        secondary: '#2D2D2D',
        background: '#FAF9F6',
        foreground: '#1A1A1A',
        accent: '#B8860B',
        muted: '#8B8B8B',
        border: '#E8E4DE',
        card: '#FFFFFF',
        cardForeground: '#1A1A1A',
        destructive: '#DC2626',
        success: '#059669',
    },

    // ============================================================
    // PLAYFUL PRESETS
    // ============================================================
    'playful-bright': {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        background: '#FFFFFF',
        foreground: '#2D3436',
        accent: '#FFE66D',
        muted: '#95A5A6',
        border: '#DFE6E9',
        card: '#FFFFFF',
        cardForeground: '#2D3436',
        destructive: '#E74C3C',
        success: '#00B894',
    },
    'playful-pastel': {
        primary: '#A8DADC',
        secondary: '#F4A5AE',
        background: '#FFF9F5',
        foreground: '#264653',
        accent: '#E9C46A',
        muted: '#8D99AE',
        border: '#EEE8E2',
        card: '#FFFFFF',
        cardForeground: '#264653',
        destructive: '#E76F51',
        success: '#2A9D8F',
    },

    // ============================================================
    // TECH PRESETS
    // ============================================================
    'tech-mono': {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        background: '#0F0F1A',
        foreground: '#FFFFFF',
        accent: '#22D3EE',
        muted: '#4B5563',
        border: '#1F2937',
        card: '#1A1A2E',
        cardForeground: '#FFFFFF',
        destructive: '#F87171',
        success: '#34D399',
    },
    'tech-neon': {
        primary: '#00FF88',
        secondary: '#FF00FF',
        background: '#0D0D0D',
        foreground: '#FFFFFF',
        accent: '#00FFFF',
        muted: '#444444',
        border: '#222222',
        card: '#1A1A1A',
        cardForeground: '#FFFFFF',
        destructive: '#FF4444',
        success: '#00FF88',
    },

    // ============================================================
    // NATURAL PRESETS
    // ============================================================
    'natural-warm': {
        primary: '#8B7355',
        secondary: '#A0826D',
        background: '#FAF8F5',
        foreground: '#3D3D3D',
        accent: '#C4A77D',
        muted: '#9CA3AF',
        border: '#E8E4DE',
        card: '#FFFFFF',
        cardForeground: '#3D3D3D',
        destructive: '#DC2626',
        success: '#059669',
    },
    'natural-earth': {
        primary: '#5D4E37',
        secondary: '#8B7355',
        background: '#F5F0E8',
        foreground: '#2C2416',
        accent: '#A67C52',
        muted: '#9E9891',
        border: '#DED6C8',
        card: '#FFFDF9',
        cardForeground: '#2C2416',
        destructive: '#B91C1C',
        success: '#15803D',
    },

    // ============================================================
    // EDITORIAL PRESET
    // ============================================================
    'editorial-bw': {
        primary: '#000000',
        secondary: '#1A1A1A',
        background: '#FFFFFF',
        foreground: '#000000',
        accent: '#000000',
        muted: '#666666',
        border: '#E0E0E0',
        card: '#F5F5F5',
        cardForeground: '#000000',
        destructive: '#B91C1C',
        success: '#166534',
    },

    // ============================================================
    // FASHION PRESETS (NEW)
    // ============================================================
    'fashion-noir': {
        primary: '#0F0F0F',
        secondary: '#1C1C1C',
        background: '#FAFAFA',
        foreground: '#0F0F0F',
        accent: '#8B7355',
        muted: '#757575',
        border: '#E8E8E8',
        card: '#FFFFFF',
        cardForeground: '#0F0F0F',
        destructive: '#991B1B',
        success: '#166534',
    },
    'fashion-cream': {
        primary: '#2C2C2C',
        secondary: '#4A4A4A',
        background: '#F8F5F0',
        foreground: '#2C2C2C',
        accent: '#C9A962',
        muted: '#8E8E8E',
        border: '#E5E0D8',
        card: '#FFFDF8',
        cardForeground: '#2C2C2C',
        destructive: '#B91C1C',
        success: '#15803D',
    },
    'fashion-blush': {
        primary: '#1A1A1A',
        secondary: '#333333',
        background: '#FDF5F3',
        foreground: '#1A1A1A',
        accent: '#C49A9A',
        muted: '#9E9494',
        border: '#EDE5E3',
        card: '#FFFFFF',
        cardForeground: '#1A1A1A',
        destructive: '#DC2626',
        success: '#059669',
    },

    // ============================================================
    // CUSTOM (Base for overrides)
    // ============================================================
    'custom': {
        primary: '#000000',
        secondary: '#333333',
        background: '#FFFFFF',
        foreground: '#000000',
        accent: '#0066FF',
        muted: '#666666',
        border: '#EEEEEE',
        card: '#FFFFFF',
        cardForeground: '#000000',
        destructive: '#FF0000',
        success: '#00FF00',
    },
};

export function getColorTokens(preset: ColorPreset, overrides?: Partial<ColorTokens>): ColorTokens {
    return { ...colorPresets[preset], ...overrides };
}

export function colorsToCSSVariables(tokens: ColorTokens): Record<string, string> {
    return {
        '--color-primary': tokens.primary,
        '--color-secondary': tokens.secondary,
        '--color-background': tokens.background,
        '--color-foreground': tokens.foreground,
        '--color-accent': tokens.accent,
        '--color-muted': tokens.muted,
        '--color-border': tokens.border,
        '--color-card': tokens.card,
        '--color-card-foreground': tokens.cardForeground,
        '--color-destructive': tokens.destructive,
        '--color-success': tokens.success,
    };
}

// Generate a unique color palette from keywords
export function generateUniqueColors(mood: string): Partial<ColorTokens> {
    // This will be called by the LLM decision engine
    // The LLM will analyze the mood and return appropriate color overrides
    // For now, return empty - the LLM will fill this in
    return {};
}
