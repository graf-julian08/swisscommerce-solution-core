'use client';

// src/design-system/primitives/Badge/Badge.tsx
// Primitive Badge Component

import React from 'react';
import { motion } from 'framer-motion';

export type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
    variant?: BadgeVariant;
    size?: BadgeSize;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const variantStyles: Record<BadgeVariant, {
    background: string;
    color: string;
    border: string;
}> = {
    default: {
        background: 'var(--color-primary)',
        color: 'var(--color-background)',
        border: 'transparent',
    },
    secondary: {
        background: 'var(--color-secondary)',
        color: 'var(--color-foreground)',
        border: 'transparent',
    },
    success: {
        background: 'var(--color-success)',
        color: '#FFFFFF',
        border: 'transparent',
    },
    warning: {
        background: '#F59E0B',
        color: '#000000',
        border: 'transparent',
    },
    destructive: {
        background: 'var(--color-destructive)',
        color: '#FFFFFF',
        border: 'transparent',
    },
    outline: {
        background: 'transparent',
        color: 'var(--color-foreground)',
        border: 'var(--color-border)',
    },
};

const sizeStyles: Record<BadgeSize, {
    height: string;
    paddingX: string;
    fontSize: string;
}> = {
    sm: {
        height: '1.25rem',
        paddingX: '0.375rem',
        fontSize: '0.625rem',
    },
    md: {
        height: '1.5rem',
        paddingX: '0.5rem',
        fontSize: '0.75rem',
    },
    lg: {
        height: '1.75rem',
        paddingX: '0.625rem',
        fontSize: '0.8125rem',
    },
};

export const Badge: React.FC<BadgeProps> = ({
    variant = 'default',
    size = 'md',
    children,
    className = '',
    style,
}) => {
    const v = variantStyles[variant];
    const s = sizeStyles[size];

    const baseStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: s.height,
        paddingLeft: s.paddingX,
        paddingRight: s.paddingX,
        fontSize: s.fontSize,
        fontWeight: 500,
        fontFamily: 'var(--font-body)',
        letterSpacing: '0.025em',
        textTransform: 'uppercase',
        borderRadius: 'var(--radius-full)',
        background: v.background,
        color: v.color,
        border: `1px solid ${v.border}`,
        whiteSpace: 'nowrap',
        ...style,
    };

    return (
        <motion.span
            style={baseStyles}
            className={className}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.15 }}
        >
            {children}
        </motion.span>
    );
};

Badge.displayName = 'Badge';
