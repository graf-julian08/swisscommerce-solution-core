// src/design-system/tokens/animations.ts
// Animation Pack System - Framer Motion Variants

import type { Variants, Transition } from 'framer-motion';

export type AnimationPack =
    | 'luxury-soft'
    | 'playful-bouncy'
    | 'tech-sharp'
    | 'editorial-fade'
    | 'minimal-micro'
    | 'none';

export interface AnimationConfig {
    // Entrance animations
    fadeIn: Variants;
    slideUp: Variants;
    slideDown: Variants;
    slideLeft: Variants;
    slideRight: Variants;
    scale: Variants;

    // Stagger configs
    stagger: {
        fast: number;
        default: number;
        slow: number;
    };

    // Hover states
    hover: {
        scale: number;
        y: number;
        transition: Transition;
    };

    // Tap/Press states
    tap: {
        scale: number;
    };

    // Page transitions
    pageTransition: {
        initial: object;
        animate: object;
        exit: object;
        transition: Transition;
    };
}

// ============================================================
// LUXURY SOFT - Elegant, subtle movements
// ============================================================
const luxurySoft: AnimationConfig = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
        },
    },
    slideUp: {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
        },
    },
    slideDown: {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
        },
    },
    slideLeft: {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
        },
    },
    slideRight: {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
        },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
        },
    },
    stagger: {
        fast: 0.08,
        default: 0.12,
        slow: 0.2,
    },
    hover: {
        scale: 1.02,
        y: -3,
        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
    tap: {
        scale: 0.98,
    },
    pageTransition: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5, ease: 'easeInOut' },
    },
};

// ============================================================
// PLAYFUL BOUNCY - Fun, spring-based movements
// ============================================================
const playfulBouncy: AnimationConfig = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { type: 'spring', stiffness: 300, damping: 25 }
        },
    },
    slideUp: {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 400, damping: 25 }
        },
    },
    slideDown: {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 400, damping: 25 }
        },
    },
    slideLeft: {
        hidden: { opacity: 0, x: 60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: 'spring', stiffness: 400, damping: 25 }
        },
    },
    slideRight: {
        hidden: { opacity: 0, x: -60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: 'spring', stiffness: 400, damping: 25 }
        },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 500, damping: 30 }
        },
    },
    stagger: {
        fast: 0.05,
        default: 0.08,
        slow: 0.12,
    },
    hover: {
        scale: 1.05,
        y: -8,
        transition: { type: 'spring', stiffness: 400, damping: 20 },
    },
    tap: {
        scale: 0.95,
    },
    pageTransition: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.02 },
        transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
};

// ============================================================
// TECH SHARP - Fast, precise movements
// ============================================================
const techSharp: AnimationConfig = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.2, ease: 'easeOut' }
        },
    },
    slideUp: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
        },
    },
    slideDown: {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
        },
    },
    slideLeft: {
        hidden: { opacity: 0, x: 25 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
        },
    },
    slideRight: {
        hidden: { opacity: 0, x: -25 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
        },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
        },
    },
    stagger: {
        fast: 0.03,
        default: 0.05,
        slow: 0.08,
    },
    hover: {
        scale: 1.03,
        y: -2,
        transition: { duration: 0.15, ease: 'easeOut' },
    },
    tap: {
        scale: 0.97,
    },
    pageTransition: {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.2, ease: 'easeInOut' },
    },
};

// ============================================================
// EDITORIAL FADE - Slow, cinematic fades
// ============================================================
const editorialFade: AnimationConfig = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
        },
    },
    slideUp: {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
        },
    },
    slideDown: {
        hidden: { opacity: 0, y: -40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
        },
    },
    slideLeft: {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
        },
    },
    slideRight: {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
        },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.98 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }
        },
    },
    stagger: {
        fast: 0.15,
        default: 0.25,
        slow: 0.4,
    },
    hover: {
        scale: 1.01,
        y: -2,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
    tap: {
        scale: 0.99,
    },
    pageTransition: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.8, ease: 'easeInOut' },
    },
};

// ============================================================
// MINIMAL MICRO - Subtle micro-interactions
// ============================================================
const minimalMicro: AnimationConfig = {
    fadeIn: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.15 }
        },
    },
    slideUp: {
        hidden: { opacity: 0, y: 8 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2 }
        },
    },
    slideDown: {
        hidden: { opacity: 0, y: -8 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2 }
        },
    },
    slideLeft: {
        hidden: { opacity: 0, x: 10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.2 }
        },
    },
    slideRight: {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.2 }
        },
    },
    scale: {
        hidden: { opacity: 0.5, scale: 0.98 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.15 }
        },
    },
    stagger: {
        fast: 0.02,
        default: 0.04,
        slow: 0.06,
    },
    hover: {
        scale: 1.01,
        y: -1,
        transition: { duration: 0.1 },
    },
    tap: {
        scale: 0.99,
    },
    pageTransition: {
        initial: { opacity: 0.8 },
        animate: { opacity: 1 },
        exit: { opacity: 0.8 },
        transition: { duration: 0.15 },
    },
};

// ============================================================
// NO ANIMATIONS
// ============================================================
const noAnimations: AnimationConfig = {
    fadeIn: {
        hidden: {},
        visible: {},
    },
    slideUp: {
        hidden: {},
        visible: {},
    },
    slideDown: {
        hidden: {},
        visible: {},
    },
    slideLeft: {
        hidden: {},
        visible: {},
    },
    slideRight: {
        hidden: {},
        visible: {},
    },
    scale: {
        hidden: {},
        visible: {},
    },
    stagger: {
        fast: 0,
        default: 0,
        slow: 0,
    },
    hover: {
        scale: 1,
        y: 0,
        transition: { duration: 0 },
    },
    tap: {
        scale: 1,
    },
    pageTransition: {
        initial: {},
        animate: {},
        exit: {},
        transition: { duration: 0 },
    },
};

// ============================================================
// EXPORTS
// ============================================================

export const animationPacks: Record<AnimationPack, AnimationConfig> = {
    'luxury-soft': luxurySoft,
    'playful-bouncy': playfulBouncy,
    'tech-sharp': techSharp,
    'editorial-fade': editorialFade,
    'minimal-micro': minimalMicro,
    'none': noAnimations,
};

export function getAnimationPack(pack: AnimationPack): AnimationConfig {
    return animationPacks[pack];
}

// Utility for staggered children
export function getStaggerContainer(pack: AnimationPack, speed: 'fast' | 'default' | 'slow' = 'default') {
    const config = animationPacks[pack];
    return {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: config.stagger[speed],
                delayChildren: 0.1,
            },
        },
    };
}
