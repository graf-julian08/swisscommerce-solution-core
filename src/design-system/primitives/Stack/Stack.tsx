'use client';

// src/design-system/primitives/Stack/Stack.tsx
// Primitive Stack Component - Vertical/Horizontal Flex Layout

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface StackProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
    direction?: 'horizontal' | 'vertical';
    gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    wrap?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    as?: 'div' | 'section' | 'article' | 'nav' | 'aside' | 'header' | 'footer' | 'main';
    children: React.ReactNode;
    className?: string;
}

const gapValues: Record<string, string> = {
    none: '0',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
};

const alignValues: Record<string, string> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
    baseline: 'baseline',
};

const justifyValues: Record<string, string> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
};

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
    (
        {
            direction = 'vertical',
            gap = 'md',
            align = 'stretch',
            justify = 'start',
            wrap = false,
            fullWidth = false,
            fullHeight = false,
            as = 'div',
            children,
            className = '',
            style,
            ...props
        },
        ref
    ) => {
        const baseStyles = {
            display: 'flex',
            flexDirection: direction === 'vertical' ? 'column' : 'row',
            gap: gapValues[gap],
            alignItems: alignValues[align],
            justifyContent: justifyValues[justify],
            flexWrap: wrap ? 'wrap' : 'nowrap',
            width: fullWidth ? '100%' : 'auto',
            height: fullHeight ? '100%' : 'auto',
            ...(style as React.CSSProperties),
        } as React.CSSProperties;

        const MotionElement = motion[as];

        return (
            <MotionElement
                ref={ref}
                style={baseStyles}
                className={className}
                {...props}
            >
                {children}
            </MotionElement>
        );
    }
);

Stack.displayName = 'Stack';
