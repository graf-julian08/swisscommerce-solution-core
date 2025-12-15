'use client';

// src/design-system/primitives/Divider/Divider.tsx
// Primitive Divider Component

import React from 'react';

export interface DividerProps {
    orientation?: 'horizontal' | 'vertical';
    variant?: 'solid' | 'dashed' | 'dotted';
    spacing?: 'none' | 'sm' | 'md' | 'lg';
    className?: string;
    style?: React.CSSProperties;
}

const spacingValues: Record<string, string> = {
    none: '0',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
};

export const Divider: React.FC<DividerProps> = ({
    orientation = 'horizontal',
    variant = 'solid',
    spacing = 'md',
    className = '',
    style,
}) => {
    const isHorizontal = orientation === 'horizontal';

    const baseStyles: React.CSSProperties = {
        border: 'none',
        backgroundColor: 'transparent',
        ...(isHorizontal
            ? {
                width: '100%',
                height: '1px',
                marginTop: spacingValues[spacing],
                marginBottom: spacingValues[spacing],
                borderTop: `1px ${variant} var(--color-border)`,
            }
            : {
                width: '1px',
                height: '100%',
                marginLeft: spacingValues[spacing],
                marginRight: spacingValues[spacing],
                borderLeft: `1px ${variant} var(--color-border)`,
            }),
        ...style,
    };

    return <hr style={baseStyles} className={className} />;
};

Divider.displayName = 'Divider';
