'use client';

// src/design-system/primitives/Icon/Icon.tsx
// Primitive Icon Component - SVG Icons

import React from 'react';

export type IconName =
    | 'search' | 'cart' | 'bag' | 'heart' | 'user' | 'menu' | 'close' | 'chevron-down'
    | 'chevron-up' | 'chevron-left' | 'chevron-right' | 'arrow-right' | 'arrow-left'
    | 'plus' | 'minus' | 'check' | 'x' | 'star' | 'star-filled' | 'filter' | 'grid' | 'list';

export interface IconProps {
    name: IconName;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?: string;
    strokeWidth?: number;
    className?: string;
    style?: React.CSSProperties;
}

const sizeValues: Record<string, string> = {
    xs: '12px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px',
};

// SVG paths for each icon
const iconPaths: Record<IconName, { path: string; fill?: boolean }> = {
    search: { path: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' },
    cart: { path: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z' },
    bag: { path: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
    heart: { path: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
    user: { path: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
    menu: { path: 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' },
    close: { path: 'M6 18L18 6M6 6l12 12' },
    'chevron-down': { path: 'M19.5 8.25l-7.5 7.5-7.5-7.5' },
    'chevron-up': { path: 'M4.5 15.75l7.5-7.5 7.5 7.5' },
    'chevron-left': { path: 'M15.75 19.5L8.25 12l7.5-7.5' },
    'chevron-right': { path: 'M8.25 4.5l7.5 7.5-7.5 7.5' },
    'arrow-right': { path: 'M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' },
    'arrow-left': { path: 'M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' },
    plus: { path: 'M12 4.5v15m7.5-7.5h-15' },
    minus: { path: 'M19.5 12h-15' },
    check: { path: 'M4.5 12.75l6 6 9-13.5' },
    x: { path: 'M6 18L18 6M6 6l12 12' },
    star: { path: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' },
    'star-filled': { path: 'M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z', fill: true },
    filter: { path: 'M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z' },
    grid: { path: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z' },
    list: { path: 'M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
};

export const Icon: React.FC<IconProps> = ({
    name,
    size = 'md',
    color = 'currentColor',
    strokeWidth = 1.5,
    className = '',
    style,
}) => {
    const iconData = iconPaths[name];
    const sizeValue = sizeValues[size];

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={iconData.fill ? color : 'none'}
            stroke={iconData.fill ? 'none' : color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
                width: sizeValue,
                height: sizeValue,
                flexShrink: 0,
                ...style
            }}
            className={className}
        >
            <path d={iconData.path} />
        </svg>
    );
};

Icon.displayName = 'Icon';
