'use client';

// src/design-system/primitives/Input/Input.tsx
// Primitive Input Component

import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'filled' | 'ghost';
    error?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
}

const sizeStyles: Record<string, { height: string; paddingX: string; fontSize: string }> = {
    sm: { height: '2.25rem', paddingX: '0.75rem', fontSize: 'var(--text-sm)' },
    md: { height: '2.75rem', paddingX: '1rem', fontSize: 'var(--text-base)' },
    lg: { height: '3.25rem', paddingX: '1.25rem', fontSize: 'var(--text-lg)' },
};

const variantStyles: Record<string, { background: string; border: string }> = {
    default: { background: 'transparent', border: 'var(--color-border)' },
    filled: { background: 'var(--color-secondary)', border: 'transparent' },
    ghost: { background: 'transparent', border: 'transparent' },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            size = 'md',
            variant = 'default',
            error = false,
            icon,
            iconPosition = 'left',
            fullWidth = false,
            className = '',
            style,
            ...props
        },
        ref
    ) => {
        const s = sizeStyles[size];
        const v = variantStyles[variant];

        const containerStyles: React.CSSProperties = {
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            width: fullWidth ? '100%' : 'auto',
        };

        const inputStyles: React.CSSProperties = {
            width: '100%',
            height: s.height,
            paddingLeft: icon && iconPosition === 'left' ? '2.5rem' : s.paddingX,
            paddingRight: icon && iconPosition === 'right' ? '2.5rem' : s.paddingX,
            fontSize: s.fontSize,
            fontFamily: 'var(--font-body)',
            color: 'var(--color-foreground)',
            background: v.background,
            border: `1px solid ${error ? 'var(--color-destructive)' : v.border}`,
            borderRadius: 'var(--radius)',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            ...style,
        };

        const iconStyles: React.CSSProperties = {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: iconPosition === 'left' ? '0.75rem' : undefined,
            right: iconPosition === 'right' ? '0.75rem' : undefined,
            color: 'var(--color-muted)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        };

        return (
            <div style={containerStyles}>
                {icon && <span style={iconStyles}>{icon}</span>}
                <input
                    ref={ref}
                    style={inputStyles}
                    className={className}
                    {...props}
                />
            </div>
        );
    }
);

Input.displayName = 'Input';
