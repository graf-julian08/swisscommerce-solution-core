'use client';

// src/design-system/primitives/Grid/Grid.tsx
// Primitive Grid Component - CSS Grid Layout

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface GridProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
    columns?: 1 | 2 | 3 | 4 | 5 | 6 | 'auto-fill' | 'auto-fit';
    gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    rowGap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    columnGap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    minChildWidth?: string;
    alignItems?: 'start' | 'center' | 'end' | 'stretch';
    justifyItems?: 'start' | 'center' | 'end' | 'stretch';
    fullWidth?: boolean;
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

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
    (
        {
            columns = 3,
            gap = 'md',
            rowGap,
            columnGap,
            minChildWidth = '280px',
            alignItems = 'stretch',
            justifyItems = 'stretch',
            fullWidth = true,
            children,
            className = '',
            style,
            ...props
        },
        ref
    ) => {
        // Generate grid-template-columns based on columns prop
        let gridTemplateColumns: string;

        if (typeof columns === 'number') {
            gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
        } else if (columns === 'auto-fill') {
            gridTemplateColumns = `repeat(auto-fill, minmax(${minChildWidth}, 1fr))`;
        } else {
            gridTemplateColumns = `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`;
        }

        const baseStyles = {
            display: 'grid',
            gridTemplateColumns,
            gap: gapValues[gap],
            rowGap: rowGap ? gapValues[rowGap] : undefined,
            columnGap: columnGap ? gapValues[columnGap] : undefined,
            alignItems,
            justifyItems,
            width: fullWidth ? '100%' : 'auto',
            ...(style as React.CSSProperties),
        } as React.CSSProperties;

        return (
            <motion.div
                ref={ref}
                style={baseStyles}
                className={className}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

Grid.displayName = 'Grid';

// Grid Item for span control
export interface GridItemProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
    colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 'full';
    rowSpan?: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
    className?: string;
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
    (
        {
            colSpan = 1,
            rowSpan = 1,
            children,
            className = '',
            style,
            ...props
        },
        ref
    ) => {
        const baseStyles = {
            gridColumn: colSpan === 'full' ? '1 / -1' : `span ${colSpan}`,
            gridRow: `span ${rowSpan}`,
            ...(style as React.CSSProperties),
        } as React.CSSProperties;

        return (
            <motion.div
                ref={ref}
                style={baseStyles}
                className={className}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

GridItem.displayName = 'GridItem';
