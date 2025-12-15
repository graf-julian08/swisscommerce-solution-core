// src/core/render-engine/TokenResolver.ts
// Token Resolver - Converts DSL tokens to CSS variables

import type { DesignConfig, DesignTokensConfig } from '../../dsl/schema/website.schema';
import { colorPresets, colorsToCSSVariables } from '../../design-system/tokens/colors';
import {
  getTypographyTokens,
  typographyToCSSVariables,
  getFontImportLinks,
  type FontFamily,
  type TypographyScale,
} from '../../design-system/tokens/typography';
import { spacingToCSSVariables, type SpacingScale } from '../../design-system/tokens/spacing';
import { getRadiusTokens, radiusToCSSVariables, type RadiusScale } from '../../design-system/tokens/radius';
import { getShadowTokens, shadowsToCSSVariables, type ShadowScale } from '../../design-system/tokens/shadows';

// ============================================================
// TYPES
// ============================================================

export interface ResolvedTokens {
  cssVariables: Record<string, string>;
  fontImports: string[];
  globalCSS: string;
}

// ============================================================
// MAIN RESOLVER
// ============================================================

export function resolveTokens(design: DesignConfig): ResolvedTokens {
  const { tokens } = design;

  // Resolve colors
  const colorTokens = {
    ...colorPresets[tokens.colors.preset] || colorPresets['custom'],
    primary: tokens.colors.primary,
    secondary: tokens.colors.secondary,
    background: tokens.colors.background,
    foreground: tokens.colors.foreground,
    accent: tokens.colors.accent,
    muted: tokens.colors.muted,
  };
  const colorVars = colorsToCSSVariables(colorTokens);

  // Resolve typography
  const headingFont = tokens.typography.fontFamily.heading as FontFamily;
  const bodyFont = tokens.typography.fontFamily.body as FontFamily;
  const typographyTokens = getTypographyTokens(headingFont, bodyFont, tokens.typography.scale as TypographyScale);
  const typographyVars = typographyToCSSVariables(typographyTokens);

  // Resolve spacing
  const spacingVars = spacingToCSSVariables(tokens.spacing as SpacingScale);

  // Resolve radius
  const radiusTokens = getRadiusTokens(tokens.radius as RadiusScale);
  const radiusVars = radiusToCSSVariables(radiusTokens);

  // Resolve shadows
  const shadowTokens = getShadowTokens(tokens.shadows as ShadowScale);
  const shadowVars = shadowsToCSSVariables(shadowTokens);

  // Combine all CSS variables
  const cssVariables = {
    ...colorVars,
    ...typographyVars,
    ...spacingVars,
    ...radiusVars,
    ...shadowVars,
    // Additional custom properties
    '--heading-weight': String(tokens.typography.headingWeight),
    '--heading-style': tokens.typography.headingStyle || 'normal',
    '--letter-spacing-heading': getLetterSpacing(tokens.typography.letterSpacing || 'normal'),
  };

  // Get font imports
  const fontImports = getFontImportLinks(headingFont, bodyFont);

  // Generate global CSS
  const globalCSS = generateGlobalCSS(cssVariables, design);

  return { cssVariables, fontImports, globalCSS };
}

// ============================================================
// LETTER SPACING VALUES
// ============================================================

function getLetterSpacing(value: string): string {
  const map: Record<string, string> = {
    'tight': '-0.025em',
    'normal': '0',
    'wide': '0.05em',
    'extra-wide': '0.1em',
  };
  return map[value] || '0';
}

// ============================================================
// GLOBAL CSS GENERATION
// ============================================================

function generateGlobalCSS(variables: Record<string, string>, design: DesignConfig): string {
  const varsString = Object.entries(variables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return `
/* ============================================================
   GENERATED DESIGN TOKENS - DO NOT EDIT MANUALLY
   Layout: ${design.layoutVariant}
   Animation: ${design.animationPack}
   ============================================================ */

:root {
${varsString}
}

/* Base Resets */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--color-foreground);
  background-color: var(--color-background);
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: var(--heading-weight);
  font-style: var(--heading-style);
  letter-spacing: var(--letter-spacing-heading);
  line-height: 1.2;
}

h1 { font-size: var(--text-6xl); }
h2 { font-size: var(--text-5xl); }
h3 { font-size: var(--text-4xl); }
h4 { font-size: var(--text-3xl); }
h5 { font-size: var(--text-2xl); }
h6 { font-size: var(--text-xl); }

p {
  margin-bottom: 1em;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

img, video {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Container */
.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--section-padding-x);
  padding-right: var(--section-padding-x);
}

/* Section */
.section {
  padding-top: var(--section-padding-y);
  padding-bottom: var(--section-padding-y);
}

/* Cards */
.card {
  background: var(--color-card);
  color: var(--color-card-foreground);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  border-radius: var(--radius);
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-background);
}

.btn-secondary {
  background: var(--color-secondary);
  color: var(--color-foreground);
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-foreground);
}

/* Focus States */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Selection */
::selection {
  background: var(--color-accent);
  color: var(--color-background);
}

/* Scrollbar (Webkit) */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--color-muted);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-foreground);
}
`.trim();
}

// ============================================================
// EXPORTS
// ============================================================

export { generateGlobalCSS };
