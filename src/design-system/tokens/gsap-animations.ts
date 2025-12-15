// src/design-system/tokens/gsap-animations.ts
// GSAP Animation System - Main Animation Engine

export type GSAPAnimationType =
    | 'gsap-cinematic'
    | 'gsap-smooth'
    | 'gsap-playful';

export interface GSAPPreset {
    name: GSAPAnimationType;

    // Scroll-triggered animations
    scrollTrigger: {
        start: string;
        end: string;
        scrub: boolean | number;
    };

    // Text reveal animations
    textReveal: {
        type: 'fade' | 'slide' | 'split-chars' | 'split-words' | 'mask';
        duration: number;
        ease: string;
        stagger: number;
    };

    // Image reveal animations
    imageReveal: {
        type: 'fade' | 'scale' | 'clip' | 'parallax' | 'blur';
        duration: number;
        ease: string;
        clipDirection?: 'left' | 'right' | 'top' | 'bottom';
    };

    // Element animations
    elementEnter: {
        y: number;
        opacity: number;
        duration: number;
        ease: string;
        stagger: number;
    };

    // Hover effects
    hover: {
        scale: number;
        duration: number;
        ease: string;
    };

    // Magnetic button effect
    magnetic: {
        strength: number;
        ease: string;
    };

    // Parallax settings
    parallax: {
        speed: number;
        direction: 'vertical' | 'horizontal';
    };

    // Page transitions
    pageTransition: {
        type: 'fade' | 'slide' | 'scale' | 'clip';
        duration: number;
        ease: string;
    };
}

// ============================================================
// GSAP CINEMATIC - Slow, dramatic, luxury feel
// ============================================================
export const gsapCinematic: GSAPPreset = {
    name: 'gsap-cinematic',

    scrollTrigger: {
        start: 'top 85%',
        end: 'bottom 15%',
        scrub: 0.8,
    },

    textReveal: {
        type: 'split-chars',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.03,
    },

    imageReveal: {
        type: 'clip',
        duration: 1.4,
        ease: 'power4.inOut',
        clipDirection: 'bottom',
    },

    elementEnter: {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
    },

    hover: {
        scale: 1.02,
        duration: 0.5,
        ease: 'power2.out',
    },

    magnetic: {
        strength: 0.3,
        ease: 'power3.out',
    },

    parallax: {
        speed: 0.15,
        direction: 'vertical',
    },

    pageTransition: {
        type: 'clip',
        duration: 0.8,
        ease: 'power3.inOut',
    },
};

// ============================================================
// GSAP SMOOTH - Clean, professional, modern
// ============================================================
export const gsapSmooth: GSAPPreset = {
    name: 'gsap-smooth',

    scrollTrigger: {
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: false,
    },

    textReveal: {
        type: 'slide',
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.02,
    },

    imageReveal: {
        type: 'fade',
        duration: 0.9,
        ease: 'power2.out',
    },

    elementEnter: {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
    },

    hover: {
        scale: 1.03,
        duration: 0.3,
        ease: 'power2.out',
    },

    magnetic: {
        strength: 0.2,
        ease: 'power2.out',
    },

    parallax: {
        speed: 0.1,
        direction: 'vertical',
    },

    pageTransition: {
        type: 'fade',
        duration: 0.5,
        ease: 'power2.inOut',
    },
};

// ============================================================
// GSAP PLAYFUL - Bouncy, energetic, fun
// ============================================================
export const gsapPlayful: GSAPPreset = {
    name: 'gsap-playful',

    scrollTrigger: {
        start: 'top 75%',
        end: 'bottom 25%',
        scrub: false,
    },

    textReveal: {
        type: 'split-words',
        duration: 0.6,
        ease: 'back.out(2)',
        stagger: 0.05,
    },

    imageReveal: {
        type: 'scale',
        duration: 0.7,
        ease: 'back.out(1.5)',
    },

    elementEnter: {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: 'back.out(1.7)',
        stagger: 0.08,
    },

    hover: {
        scale: 1.08,
        duration: 0.25,
        ease: 'back.out(2)',
    },

    magnetic: {
        strength: 0.4,
        ease: 'elastic.out(1, 0.5)',
    },

    parallax: {
        speed: 0.2,
        direction: 'vertical',
    },

    pageTransition: {
        type: 'scale',
        duration: 0.4,
        ease: 'back.out(1.5)',
    },
};

// ============================================================
// GSAP PRESET MAP
// ============================================================
export const gsapPresets: Record<GSAPAnimationType, GSAPPreset> = {
    'gsap-cinematic': gsapCinematic,
    'gsap-smooth': gsapSmooth,
    'gsap-playful': gsapPlayful,
};

export function getGSAPPreset(type: GSAPAnimationType): GSAPPreset {
    return gsapPresets[type];
}

// ============================================================
// GSAP INITIALIZATION CODE (for render engine)
// ============================================================
export function generateGSAPInitCode(preset: GSAPPreset): string {
    return `
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Configure ScrollTrigger defaults
ScrollTrigger.defaults({
  start: '${preset.scrollTrigger.start}',
  end: '${preset.scrollTrigger.end}',
  toggleActions: 'play none none reverse',
});

// Text Reveal Animation
export function animateTextReveal(element: HTMLElement) {
  ${preset.textReveal.type === 'split-chars' ? `
  const split = new SplitText(element, { type: 'chars' });
  gsap.from(split.chars, {
    y: 100,
    opacity: 0,
    duration: ${preset.textReveal.duration},
    ease: '${preset.textReveal.ease}',
    stagger: ${preset.textReveal.stagger},
    scrollTrigger: { trigger: element },
  });` : `
  gsap.from(element, {
    y: 40,
    opacity: 0,
    duration: ${preset.textReveal.duration},
    ease: '${preset.textReveal.ease}',
    scrollTrigger: { trigger: element },
  });`}
}

// Image Reveal Animation
export function animateImageReveal(element: HTMLElement) {
  ${preset.imageReveal.type === 'clip' ? `
  gsap.from(element, {
    clipPath: 'inset(100% 0% 0% 0%)',
    duration: ${preset.imageReveal.duration},
    ease: '${preset.imageReveal.ease}',
    scrollTrigger: { trigger: element },
  });` : `
  gsap.from(element, {
    opacity: 0,
    scale: 1.1,
    duration: ${preset.imageReveal.duration},
    ease: '${preset.imageReveal.ease}',
    scrollTrigger: { trigger: element },
  });`}
}

// Element Enter Animation
export function animateElementEnter(elements: HTMLElement[]) {
  gsap.from(elements, {
    y: ${preset.elementEnter.y},
    opacity: ${preset.elementEnter.opacity},
    duration: ${preset.elementEnter.duration},
    ease: '${preset.elementEnter.ease}',
    stagger: ${preset.elementEnter.stagger},
    scrollTrigger: { trigger: elements[0]?.parentElement },
  });
}

// Magnetic Button Effect
export function createMagneticEffect(button: HTMLElement) {
  const strength = ${preset.magnetic.strength};
  
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(button, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: '${preset.magnetic.ease}',
    });
  });
  
  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: '${preset.magnetic.ease}',
    });
  });
}

// Hover Scale Effect
export function createHoverEffect(element: HTMLElement) {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: ${preset.hover.scale},
      duration: ${preset.hover.duration},
      ease: '${preset.hover.ease}',
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      duration: ${preset.hover.duration},
      ease: '${preset.hover.ease}',
    });
  });
}

// Parallax Effect
export function createParallaxEffect(element: HTMLElement, speed = ${preset.parallax.speed}) {
  gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}
`.trim();
}

// ============================================================
// GSAP DEPENDENCIES (for package.json)
// ============================================================
export const GSAP_DEPENDENCIES = {
    'gsap': '^3.12.5',
    '@gsap/react': '^2.1.0',
};

// Note: SplitText and ScrollTrigger are included in GSAP
// For premium plugins (SplitText), gsap-trial can be used for development
