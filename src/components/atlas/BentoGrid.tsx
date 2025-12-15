import React from 'react';
import { motion } from 'framer-motion';

// --- ATLAS COMPONENT: BENTO GRID ---
// Designed for: Apple, tech specs, product collections.
// Features: Asymmetrical grid, hover reveal, glassmorphism.

interface BentoItem {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    colSpan?: number; // 1, 2, or 3
    rowSpan?: number;
}

interface BentoGridProps {
    items: BentoItem[];
}

export default function BentoGrid({ items = [] }: BentoGridProps) {
    return (
        <div className="w-full bg-neutral-950 py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[400px]">
                {items.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={false}
                        className={`group relative overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 
              ${item.colSpan === 2 ? 'md:col-span-2' : item.colSpan === 3 ? 'md:col-span-3' : 'md:col-span-1'}
              ${item.rowSpan === 2 ? 'md:row-span-2' : 'md:row-span-1'}
            `}
                    >
                        {/* Background Image with Zoom Effect */}
                        <div className="absolute inset-0 overflow-hidden">
                            <motion.img
                                src={item.imageUrl}
                                alt={item.title}
                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                        </div>

                        {/* Content Content - always visible but slides up slightly on hover */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                            <motion.div
                                initial={{ y: 20, opacity: 0.8 }}
                                whileHover={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="font-mono text-xs text-blue-400 uppercase tracking-wider mb-2">{item.subtitle}</p>
                                <h3 className="font-serif text-2xl md:text-3xl text-white font-medium leading-tight">{item.title}</h3>

                                {/* Action Button Reveal */}
                                <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-300">
                                    <button className="mt-4 text-sm font-semibold text-white underline decoration-white/30 hover:decoration-white underline-offset-4">
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
