'use client';

// src/design-system/TokenProvider.tsx
// Central Token Provider - Injects CSS Variables based on DSL

import React, { createContext, useContext, useMemo } from 'react';
import {
    getColorTokens,
    colorsToCSSVariables,
    type ColorPreset
} from './tokens/colors';
import {
    getTypographyTokens,
    typographyToCSSVariables,
    getFontImportLinks,
    type FontFamily,
    type TypographyScale
} from './tokens/typography';
import {
    spacingToCSSVariables,
    type SpacingScale
} from './tokens/spacing';
import {
    getRadiusTokens,
    radiusToCSSVariables,
    type RadiusScale
} from './tokens/radius';
import {
    getShadowTokens,
    shadowsToCSSVariables,
    type ShadowScale
} from './tokens/shadows';
import {
    getAnimationPack,
    type AnimationPack,
    type AnimationConfig
} from './tokens/animations';

export interface TokenConfig {
    colors: {
        preset: ColorPreset;
        overrides?: Partial<Record<string, string>>;
    };
    typography: {
        heading: FontFamily;
        body: FontFamily;
        scale: TypographyScale;
    };
    spacing: SpacingScale;
    radius: RadiusScale;
    shadows: ShadowScale;
    animationPack: AnimationPack;
}

interface TokenContextValue {
    config: TokenConfig;
    animations: AnimationConfig;
    cssVariables: Record<string, string>;
}

const TokenContext = createContext<TokenContextValue | null>(null);

export function useTokens() {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useTokens must be used within a TokenProvider');
    }
    return context;
}

export function useAnimations() {
    const { animations } = useTokens();
    return animations;
}

interface TokenProviderProps {
    config: TokenConfig;
    children: React.ReactNode;
}

export function TokenProvider({ config, children }: TokenProviderProps) {
    const value = useMemo(() => {
        // Generate color CSS variables
        const colorTokens = getColorTokens(config.colors.preset, config.colors.overrides);
        const colorVars = colorsToCSSVariables(colorTokens);

        // Generate typography CSS variables
        const typographyTokens = getTypographyTokens(
            config.typography.heading,
            config.typography.body,
            config.typography.scale
        );
        const typographyVars = typographyToCSSVariables(typographyTokens);

        // Generate spacing CSS variables
        const spacingVars = spacingToCSSVariables(config.spacing);

        // Generate radius CSS variables
        const radiusTokens = getRadiusTokens(config.radius);
        const radiusVars = radiusToCSSVariables(radiusTokens);

        // Generate shadow CSS variables
        const shadowTokens = getShadowTokens(config.shadows);
        const shadowVars = shadowsToCSSVariables(shadowTokens);

        // Get animation config
        const animations = getAnimationPack(config.animationPack);

        // Combine all CSS variables
        const cssVariables = {
            ...colorVars,
            ...typographyVars,
            ...spacingVars,
            ...radiusVars,
            ...shadowVars,
        };

        return { config, animations, cssVariables };
    }, [config]);

    // Convert CSS variables to style object
    const styleObject = useMemo(() => {
        return value.cssVariables as React.CSSProperties;
    }, [value.cssVariables]);

    // Get font import links
    const fontLinks = useMemo(() => {
        return getFontImportLinks(config.typography.heading, config.typography.body);
    }, [config.typography.heading, config.typography.body]);

    return (
        <TokenContext.Provider value={value}>
            {/* Inject font imports */}
            {fontLinks.map((link, i) => (
                <link key={i} rel="stylesheet" href={link} />
            ))}

            {/* Apply CSS variables to root */}
            <div style={styleObject}>
                {children}
            </div>
        </TokenContext.Provider>
    );
}

// Default token config for development
export const defaultTokenConfig: TokenConfig = {
    colors: { preset: 'luxury-dark' },
    typography: {
        heading: 'cormorant',
        body: 'inter',
        scale: 'default',
    },
    spacing: 'default',
    radius: 'md',
    shadows: 'medium',
    animationPack: 'luxury-soft',
};
