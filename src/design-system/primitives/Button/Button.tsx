'use client';

// src/design-system/primitives/Button/Button.tsx
// Primitive Button Component

import React from 'react';
import { motion } from 'framer-motion';
import {
    type ButtonProps,
    type ButtonVariant,
    type ButtonSize,
    buttonVariants,
    buttonSizes
} from './Button.variants';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            fullWidth = false,
            loading = false,
            disabled = false,
            icon,
            iconPosition = 'left',
            children,
            onClick,
            href,
            type = 'button',
            className = '',
        },
        ref
    ) => {
        const v = buttonVariants[variant];
        const s = buttonSizes[size];

        const baseStyles: React.CSSProperties = {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            height: s.height,
            paddingLeft: s.paddingX,
            paddingRight: s.paddingX,
            fontSize: s.fontSize,
            fontWeight: 500,
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.025em',
            textTransform: 'none',
            textDecoration: 'none',
            borderRadius: 'var(--radius)',
            border: `1px solid ${v.border}`,
            background: v.background,
            color: v.color,
            cursor: disabled || loading ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            width: fullWidth ? '100%' : 'auto',
            transition: 'all 0.2s ease',
            outline: 'none',
        };

        const content = (
            <>
                {loading && (
                    <svg
                        className="animate-spin"
                        style={{ width: s.iconSize, height: s.iconSize }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            style={{ opacity: 0.25 }}
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            style={{ opacity: 0.75 }}
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {!loading && icon && iconPosition === 'left' && (
                    <span style={{ width: s.iconSize, height: s.iconSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {icon}
                    </span>
                )}
                <span>{children}</span>
                {!loading && icon && iconPosition === 'right' && (
                    <span style={{ width: s.iconSize, height: s.iconSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {icon}
                    </span>
                )}
            </>
        );

        // If href is provided, render as anchor
        if (href) {
            return (
                <motion.a
                    href={href}
                    style={baseStyles}
                    className={className}
                    whileHover={!disabled ? {
                        background: v.hoverBackground,
                        color: v.hoverColor,
                        borderColor: v.hoverBorder,
                    } : undefined}
                    whileTap={!disabled ? { scale: 0.98 } : undefined}
                >
                    {content}
                </motion.a>
            );
        }

        return (
            <motion.button
                ref={ref}
                type={type}
                onClick={onClick}
                disabled={disabled || loading}
                style={baseStyles}
                className={className}
                whileHover={!disabled && !loading ? {
                    background: v.hoverBackground,
                    color: v.hoverColor,
                    borderColor: v.hoverBorder,
                } : undefined}
                whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
            >
                {content}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';
