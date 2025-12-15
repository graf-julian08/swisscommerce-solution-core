// src/design-system/tokens/spacing.ts
// Spacing Token System

export type SpacingScale = 'compact' | 'default' | 'spacious' | 'airy';

export interface SpacingTokens {
    px: string;
    0: string;
    0.5: string;
    1: string;
    1.5: string;
    2: string;
    2.5: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
    14: string;
    16: string;
    20: string;
    24: string;
    28: string;
    32: string;
    36: string;
    40: string;
    44: string;
    48: string;
    52: string;
    56: string;
    60: string;
    64: string;
    72: string;
    80: string;
    96: string;
}

const baseSpacing = {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
};

const scaleMultipliers: Record<SpacingScale, number> = {
    compact: 0.85,
    default: 1,
    spacious: 1.25,
    airy: 1.5,
};

export function getSpacingTokens(scale: SpacingScale = 'default'): SpacingTokens {
    const multiplier = scaleMultipliers[scale];

    const scaledSpacing: Partial<SpacingTokens> = {};

    for (const [key, value] of Object.entries(baseSpacing)) {
        if (value === '1px' || value === '0') {
            scaledSpacing[key as keyof SpacingTokens] = value;
        } else {
            const numericValue = parseFloat(value);
            scaledSpacing[key as keyof SpacingTokens] = `${numericValue * multiplier}rem`;
        }
    }

    return scaledSpacing as SpacingTokens;
}

// Section padding presets
export interface SectionSpacing {
    paddingY: string;
    paddingX: string;
    gap: string;
    containerMaxWidth: string;
}

export const sectionSpacingPresets: Record<SpacingScale, SectionSpacing> = {
    compact: {
        paddingY: '3rem',
        paddingX: '1rem',
        gap: '1.5rem',
        containerMaxWidth: '1200px',
    },
    default: {
        paddingY: '5rem',
        paddingX: '1.5rem',
        gap: '2rem',
        containerMaxWidth: '1280px',
    },
    spacious: {
        paddingY: '7rem',
        paddingX: '2rem',
        gap: '3rem',
        containerMaxWidth: '1400px',
    },
    airy: {
        paddingY: '10rem',
        paddingX: '3rem',
        gap: '4rem',
        containerMaxWidth: '1600px',
    },
};

export function spacingToCSSVariables(scale: SpacingScale): Record<string, string> {
    const section = sectionSpacingPresets[scale];
    return {
        '--section-padding-y': section.paddingY,
        '--section-padding-x': section.paddingX,
        '--section-gap': section.gap,
        '--container-max-width': section.containerMaxWidth,
    };
}
