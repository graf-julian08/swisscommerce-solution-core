'use client';

// src/design-system/primitives/Container/Container.tsx
// Primitive Container Component - Max-width wrapper

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface ContainerProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    paddingX?: boolean;
    centered?: boolean;
    as?: 'div' | 'section' | 'article' | 'main';
    children: React.ReactNode;
    className?: string;
}

const sizeValues: Record<string, string> = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    full: '100%',
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    (
        {
            size = 'xl',
            paddingX = true,
            centered = true,
            as = 'div',
            children,
            className = '',
            style,
            ...props
        },
        ref
    ) => {
        const MotionElement = motion[as];

        const baseStyles = {
            width: '100%',
            maxWidth: sizeValues[size],
            marginLeft: centered ? 'auto' : undefined,
            marginRight: centered ? 'auto' : undefined,
            paddingLeft: paddingX ? 'var(--section-padding-x)' : undefined,
            paddingRight: paddingX ? 'var(--section-padding-x)' : undefined,
            ...(style as React.CSSProperties),
        } as React.CSSProperties;

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

Container.displayName = 'Container';
