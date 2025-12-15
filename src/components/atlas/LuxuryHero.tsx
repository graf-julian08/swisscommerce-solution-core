import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- ATLAS COMPONENT: LUXURY HERO ---
// Designed for: Apple, Gucci, Rolex style landing pages.
// Features: Parallax video/image, Staggered Text Reveal, Magnetic CTA.

interface LuxuryHeroProps {
    title: string;
    subtitle: string;
    ctaText?: string;
    mediaUrl?: string; // Video or Image
    isVideo?: boolean;
}

export default function LuxuryHero({
    title = "THE ESSENCE OF VOID",
    subtitle = "Redefining digital luxury for the automated age.",
    ctaText = "EXPLORE COLLECTION",
    mediaUrl = "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=2070&auto=format&fit=crop",
    isVideo = false
}: LuxuryHeroProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-neutral-950 text-white">
            {/* Background Media with Parallax */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/30 z-10" /> {/* Overlay */}
                {isVideo ? (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover"
                        src={mediaUrl}
                    />
                ) : (
                    <img
                        src={mediaUrl}
                        alt="Hero Background"
                        className="h-full w-full object-cover"
                    />
                )}
            </motion.div>

            {/* Content Layer */}
            <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12 lg:px-24">
                <div className="max-w-4xl space-y-8">
                    <div
                    >
                        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
                            {title}
                        </h1>
                    </div>

                    <div
                        className="h-px w-24 bg-white/50"
                    />

                    <p
                        className="max-w-md font-mono text-sm md:text-base tracking-wide uppercase text-neutral-300"
                    >
                        {subtitle}
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-8 py-4 bg-white text-black font-bold tracking-widest text-xs uppercase overflow-hidden"
                    >
                        <span className="relative z-10">{ctaText}</span>
                        <div className="absolute inset-0 bg-neutral-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
