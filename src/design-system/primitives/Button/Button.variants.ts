// src/design-system/primitives/Button/Button.variants.ts
// Button Variant System - Controlled Combinations

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

// Size configurations
export const buttonSizes: Record<ButtonSize, {
    height: string;
    paddingX: string;
    fontSize: string;
    iconSize: string;
}> = {
    xs: {
        height: '1.75rem',
        paddingX: '0.625rem',
        fontSize: 'var(--text-xs)',
        iconSize: '0.875rem',
    },
    sm: {
        height: '2.25rem',
        paddingX: '0.875rem',
        fontSize: 'var(--text-sm)',
        iconSize: '1rem',
    },
    md: {
        height: '2.75rem',
        paddingX: '1.25rem',
        fontSize: 'var(--text-base)',
        iconSize: '1.125rem',
    },
    lg: {
        height: '3.25rem',
        paddingX: '1.75rem',
        fontSize: 'var(--text-lg)',
        iconSize: '1.25rem',
    },
    xl: {
        height: '3.75rem',
        paddingX: '2.25rem',
        fontSize: 'var(--text-xl)',
        iconSize: '1.5rem',
    },
};

// Variant configurations
export const buttonVariants: Record<ButtonVariant, {
    background: string;
    color: string;
    border: string;
    hoverBackground: string;
    hoverColor: string;
    hoverBorder: string;
}> = {
    primary: {
        background: 'var(--color-primary)',
        color: 'var(--color-background)',
        border: 'transparent',
        hoverBackground: 'var(--color-secondary)',
        hoverColor: 'var(--color-background)',
        hoverBorder: 'transparent',
    },
    secondary: {
        background: 'var(--color-secondary)',
        color: 'var(--color-foreground)',
        border: 'transparent',
        hoverBackground: 'var(--color-muted)',
        hoverColor: 'var(--color-foreground)',
        hoverBorder: 'transparent',
    },
    outline: {
        background: 'transparent',
        color: 'var(--color-foreground)',
        border: 'var(--color-border)',
        hoverBackground: 'var(--color-secondary)',
        hoverColor: 'var(--color-foreground)',
        hoverBorder: 'var(--color-foreground)',
    },
    ghost: {
        background: 'transparent',
        color: 'var(--color-foreground)',
        border: 'transparent',
        hoverBackground: 'var(--color-secondary)',
        hoverColor: 'var(--color-foreground)',
        hoverBorder: 'transparent',
    },
    link: {
        background: 'transparent',
        color: 'var(--color-primary)',
        border: 'transparent',
        hoverBackground: 'transparent',
        hoverColor: 'var(--color-accent)',
        hoverBorder: 'transparent',
    },
    destructive: {
        background: 'var(--color-destructive)',
        color: '#FFFFFF',
        border: 'transparent',
        hoverBackground: '#7F1D1D',
        hoverColor: '#FFFFFF',
        hoverBorder: 'transparent',
    },
};

// Generate CSS for a button variant+size combination
export function getButtonStyles(variant: ButtonVariant, size: ButtonSize) {
    const v = buttonVariants[variant];
    const s = buttonSizes[size];

    return {
        height: s.height,
        paddingLeft: s.paddingX,
        paddingRight: s.paddingX,
        fontSize: s.fontSize,
        background: v.background,
        color: v.color,
        borderColor: v.border,
        '--hover-bg': v.hoverBackground,
        '--hover-color': v.hoverColor,
        '--hover-border': v.hoverBorder,
    };
}
