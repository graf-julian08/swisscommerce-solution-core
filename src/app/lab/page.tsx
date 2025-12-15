'use client';

import React from 'react';
import LuxuryHeaderDesign1 from '@/components/site-components/fashion/header/Design1';

export default function ComponentLab() {
    return (
        <div className="min-h-screen bg-neutral-50 pb-20">

            {/* Lab Header */}
            <div className="bg-black text-white p-4 sticky top-0 z-[100] flex justify-between items-center shadow-lg">
                <h1 className="font-mono text-sm tracking-widest">🧪 COMPONENT LAB // FASHION</h1>
                <div className="text-xs text-neutral-400">src/components/site-components/fashion</div>
            </div>

            <div className="container mx-auto px-4 py-12 space-y-20">

                {/* HEADER SECTION */}
                <section>
                    <div className="mb-6 border-b border-black/10 pb-2 flex justify-between items-end">
                        <h2 className="text-xl font-bold font-serif">Headers</h2>
                        <span className="font-mono text-xs text-neutral-500">5 Variations Planned</span>
                    </div>

                    <div className="space-y-12">

                        {/* Design 1 */}
                        <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-sm relative">
                            <div className="absolute top-2 left-2 bg-black/10 px-2 py-0.5 rounded text-[10px] font-mono text-black z-10">
                                Design1.tsx
                            </div>
                            {/* Visualizer Container - Mimics viewport with Image Background */}
                            <div className="h-[400px] w-full relative overflow-hidden transform scale-100">
                                {/* Fake Hero Image */}
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                                <div className="absolute inset-0 bg-black/10" /> {/* Overlay for contrast */}

                                {/* The Component being tested */}
                                <LuxuryHeaderDesign1 />

                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-white/50">
                                    <p className="font-serif italic text-4xl drop-shadow-md">Hero Section Area</p>
                                </div>
                            </div>
                        </div>
                        {/* Designs 2-5 will go here */}
                        {/* <LuxuryHeaderDesign2 /> ... */}

                    </div>
                </section>

            </div>
        </div>
    );
}
