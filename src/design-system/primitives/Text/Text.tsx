'use client';

// src/design-system/primitives/Text/Text.tsx
// Primitive Text Component

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export type TextVariant =
    | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    | 'body-xl' | 'body-lg' | 'body' | 'body-sm' | 'body-xs'
    | 'label' | 'caption' | 'overline';

export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

export interface TextProps extends Omit<HTMLMotionProps<'p'>, 'ref'> {
    variant?: TextVariant;
    weight?: TextWeight;
    color?: 'default' | 'muted' | 'accent' | 'inherit';
    align?: 'left' | 'center' | 'right';
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
}

const variantStyles: Record<TextVariant, {
    fontSize: string;
    lineHeight: string;
    letterSpacing: string;
    fontFamily: string;
    defaultWeight: number;
}> = {
    h1: {
        fontSize: 'var(--text-6xl)',
        lineHeight: '1.1',
        letterSpacing: '-0.025em',
        fontFamily: 'var(--font-heading)',
        defaultWeight: 700,
    },
    h2: {
        fontSize: 'var(--text-5xl)',
        lineHeight: '1.15',
        letterSpacing: '-0.02em',
        fontFamily: 'var(--font-heading)',
        defaultWeight: 700,
    },
    h3: {
        fontSize: 'var(--text-4xl)',
        lineHeight: '1.2',
        letterSpacing: '-0.015em',
        fontFamily: 'var(--font-heading)',
        defaultWeight: 600,
    },
    h4: {
        fontSize: 'var(--text-3xl)',
        lineHeight: '1.25',
        letterSpacing: '-0.01em',
        fontFamily: 'var(--font-heading)',
        defaultWeight: 600,
    },
    h5: {
        fontSize: 'var(--text-2xl)',
        lineHeight: '1.3',
        letterSpacing: '0',
        fontFamily: 'var(--font-heading)',
        defaultWeight: 600,
    },
    h6: {
        fontSize: 'var(--text-xl)',
        lineHeight: '1.35',
        letterSpacing: '0',
        fontFamily: 'var(--font-heading)',
        defaultWeight: 600,
    },
    'body-xl': {
        fontSize: 'var(--text-xl)',
        lineHeight: '1.6',
        letterSpacing: '0',
        fontFamily: 'var(--font-body)',
        defaultWeight: 400,
    },
    'body-lg': {
        fontSize: 'var(--text-lg)',
        lineHeight: '1.6',
        letterSpacing: '0',
        fontFamily: 'var(--font-body)',
        defaultWeight: 400,
    },
    body: {
        fontSize: 'var(--text-base)',
        lineHeight: '1.6',
        letterSpacing: '0',
        fontFamily: 'var(--font-body)',
        defaultWeight: 400,
    },
    'body-sm': {
        fontSize: 'var(--text-sm)',
        lineHeight: '1.5',
        letterSpacing: '0',
        fontFamily: 'var(--font-body)',
        defaultWeight: 400,
    },
    'body-xs': {
        fontSize: 'var(--text-xs)',
        lineHeight: '1.5',
        letterSpacing: '0.01em',
        fontFamily: 'var(--font-body)',
        defaultWeight: 400,
    },
    label: {
        fontSize: 'var(--text-sm)',
        lineHeight: '1.4',
        letterSpacing: '0.02em',
        fontFamily: 'var(--font-body)',
        defaultWeight: 500,
    },
    caption: {
        fontSize: 'var(--text-xs)',
        lineHeight: '1.4',
        letterSpacing: '0.02em',
        fontFamily: 'var(--font-body)',
        defaultWeight: 400,
    },
    overline: {
        fontSize: 'var(--text-xs)',
        lineHeight: '1.4',
        letterSpacing: '0.1em',
        fontFamily: 'var(--font-body)',
        defaultWeight: 600,
    },
};

const weightValues: Record<TextWeight, number> = {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
};

const colorValues: Record<string, string> = {
    default: 'var(--color-foreground)',
    muted: 'var(--color-muted)',
    accent: 'var(--color-accent)',
    inherit: 'inherit',
};

const defaultElement: Record<TextVariant, React.ElementType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    'body-xl': 'p',
    'body-lg': 'p',
    body: 'p',
    'body-sm': 'p',
    'body-xs': 'p',
    label: 'span',
    caption: 'span',
    overline: 'span',
};

export const Text = React.forwardRef<HTMLElement, TextProps>(
    (
        {
            variant = 'body',
            weight,
            color = 'default',
            align = 'left',
            as,
            children,
            className = '',
            style,
            ...props
        },
        ref
    ) => {
        const styles = variantStyles[variant];
        const Element = as || defaultElement[variant];
        const MotionElement = motion[Element as keyof typeof motion] || motion.p;

        const computedStyles = {
            fontSize: styles.fontSize,
            lineHeight: styles.lineHeight,
            letterSpacing: styles.letterSpacing,
            fontFamily: styles.fontFamily,
            fontWeight: weight ? weightValues[weight] : styles.defaultWeight,
            color: colorValues[color],
            textAlign: align,
            margin: 0,
            ...(style as React.CSSProperties),
        } as React.CSSProperties;

        return (
            <motion.div
                ref={ref as React.Ref<HTMLDivElement>}
                style={{
                    ...computedStyles,
                    display: Element === 'span' ? 'inline' : 'block',
                }}
                className={className}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

Text.displayName = 'Text';
