'use client';

// src/design-system/primitives/Image/Image.tsx
// Primitive Image Component with lazy loading and aspect ratios

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface ImageProps {
    src: string;
    alt: string;
    aspectRatio?: 'square' | '4/3' | '16/9' | '3/4' | '21/9' | 'auto';
    objectFit?: 'cover' | 'contain' | 'fill' | 'none';
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    loading?: 'lazy' | 'eager';
    placeholder?: 'blur' | 'shimmer' | 'none';
    className?: string;
    style?: React.CSSProperties;
    onLoad?: () => void;
    onError?: () => void;
}

const aspectRatioValues: Record<string, string> = {
    square: '1 / 1',
    '4/3': '4 / 3',
    '16/9': '16 / 9',
    '3/4': '3 / 4',
    '21/9': '21 / 9',
    auto: 'auto',
};

const roundedValues: Record<string, string> = {
    none: '0',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    full: 'var(--radius-full)',
};

export const Image: React.FC<ImageProps> = ({
    src,
    alt,
    aspectRatio = 'auto',
    objectFit = 'cover',
    rounded = 'none',
    loading = 'lazy',
    placeholder = 'shimmer',
    className = '',
    style,
    onLoad,
    onError,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const containerStyles: React.CSSProperties = {
        position: 'relative',
        aspectRatio: aspectRatioValues[aspectRatio],
        overflow: 'hidden',
        borderRadius: roundedValues[rounded],
        background: 'var(--color-muted)',
        ...style,
    };

    const imageStyles: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit,
        display: 'block',
    };

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    const handleError = () => {
        setHasError(true);
        onError?.();
    };

    return (
        <div style={containerStyles} className={className}>
            {/* Shimmer placeholder */}
            {placeholder === 'shimmer' && !isLoaded && !hasError && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, var(--color-muted) 0%, var(--color-border) 50%, var(--color-muted) 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite',
                    }}
                />
            )}

            {/* Error state */}
            {hasError && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--color-muted)',
                        color: 'var(--color-foreground)',
                        fontSize: 'var(--text-sm)',
                    }}
                >
                    Failed to load
                </div>
            )}

            {/* Actual image */}
            {!hasError && (
                <motion.img
                    src={src}
                    alt={alt}
                    loading={loading}
                    style={imageStyles}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    onLoad={handleLoad}
                    onError={handleError}
                />
            )}

            <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
        </div>
    );
};

Image.displayName = 'Image';
