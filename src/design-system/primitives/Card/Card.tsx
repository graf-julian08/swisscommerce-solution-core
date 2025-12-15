'use client';

// src/design-system/primitives/Card/Card.tsx
// Primitive Card Component with Sub-components

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'ghost';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
    variant?: CardVariant;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
    children: React.ReactNode;
    className?: string;
}

const variantStyles: Record<CardVariant, {
    background: string;
    border: string;
    shadow: string;
}> = {
    elevated: {
        background: 'var(--color-card)',
        border: 'none',
        shadow: 'var(--shadow-md)',
    },
    outlined: {
        background: 'transparent',
        border: '1px solid var(--color-border)',
        shadow: 'none',
    },
    filled: {
        background: 'var(--color-card)',
        border: 'none',
        shadow: 'none',
    },
    ghost: {
        background: 'transparent',
        border: 'none',
        shadow: 'none',
    },
};

const paddingValues: Record<string, string> = {
    none: '0',
    sm: '0.75rem',
    md: '1.25rem',
    lg: '2rem',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            variant = 'elevated',
            padding = 'md',
            hover = false,
            children,
            className = '',
            style,
            ...props
        },
        ref
    ) => {
        const styles = variantStyles[variant];

        const baseStyles = {
            background: styles.background,
            border: styles.border,
            boxShadow: styles.shadow,
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            ...(style as React.CSSProperties),
        } as React.CSSProperties;

        const hoverVariants = hover ? {
            whileHover: {
                y: -4,
                boxShadow: 'var(--shadow-xl)',
                transition: { duration: 0.2 }
            },
        } : {};

        return (
            <motion.div
                ref={ref}
                style={baseStyles}
                className={className}
                {...hoverVariants}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

Card.displayName = 'Card';

// Card Header
export interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '', style }) => (
    <div
        style={{
            padding: '1.25rem 1.25rem 0.75rem',
            ...style
        }}
        className={className}
    >
        {children}
    </div>
);

// Card Content
export interface CardContentProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '', style }) => (
    <div
        style={{
            padding: '0.75rem 1.25rem',
            flex: 1,
            ...style
        }}
        className={className}
    >
        {children}
    </div>
);

// Card Footer
export interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '', style }) => (
    <div
        style={{
            padding: '0.75rem 1.25rem 1.25rem',
            marginTop: 'auto',
            ...style
        }}
        className={className}
    >
        {children}
    </div>
);

// Card Image
export interface CardImageProps {
    src: string;
    alt: string;
    aspectRatio?: 'square' | '4/3' | '16/9' | '3/4' | 'auto';
    className?: string;
    style?: React.CSSProperties;
}

const aspectRatioValues: Record<string, string> = {
    square: '1 / 1',
    '4/3': '4 / 3',
    '16/9': '16 / 9',
    '3/4': '3 / 4',
    auto: 'auto',
};

export const CardImage: React.FC<CardImageProps> = ({
    src,
    alt,
    aspectRatio = 'auto',
    className = '',
    style
}) => (
    <div
        style={{
            aspectRatio: aspectRatioValues[aspectRatio],
            overflow: 'hidden',
            ...style
        }}
        className={className}
    >
        <img
            src={src}
            alt={alt}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            }}
        />
    </div>
);
