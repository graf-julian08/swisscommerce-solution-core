import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- ATLAS COMPONENT: LUXURY INPUT ---
// Designed for: Login, Checkout, Newsletter.
// Features: Transparent background, bottom border only, animated focus state.

interface LuxuryInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export default function LuxuryInput({ label, error, className = "", ...props }: LuxuryInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    return (
        <div className={`relative mb-8 ${className}`}>
            {/* Label - simple, uppercase, tracking-widest */}
            <label
                className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-[0.2em] font-mono text-[10px]
          ${isFocused || hasValue ? '-top-5 text-white' : 'top-3 text-neutral-500'}
        `}
            >
                {label}
            </label>

            <input
                {...props}
                onFocus={(e) => {
                    setIsFocused(true);
                    props.onFocus?.(e);
                }}
                onBlur={(e) => {
                    setIsFocused(false);
                    setHasValue(e.target.value.length > 0);
                    props.onBlur?.(e);
                }}
                onChange={(e) => {
                    setHasValue(e.target.value.length > 0);
                    props.onChange?.(e);
                }}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white font-sans text-sm focus:outline-none focus:border-white transition-colors duration-500 placeholder-transparent"
            />

            {/* Animated Bottom Line */}
            <div
                className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isFocused ? 'w-full' : 'w-0'}`}
            />

            {/* Error Message */}
            {error && (
                <span className="absolute -bottom-5 left-0 text-[10px] text-red-500 tracking-widest uppercase font-mono">
                    {error}
                </span>
            )}
        </div>
    );
}
