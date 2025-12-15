'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Database, FileText } from 'lucide-react';
import { ShopBlueprint } from '@/types/blueprint';

interface BlueprintViewProps {
    blueprint: ShopBlueprint;
}

export default function BlueprintView({ blueprint }: BlueprintViewProps) {
    const [activeTab, setActiveTab] = useState<'architecture' | 'design' | 'pages'>('architecture');

    if (!blueprint) return null;

    const meta = blueprint.meta || {};
    const features = blueprint.features || {};
    const designSystem = blueprint.designSystem || { colors: {}, typography: {} };
    const pages = blueprint.pages || [];

    return (
        <div className="w-full max-w-6xl mx-auto mt-8 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-neutral-950 px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 flex items-center gap-2">
                    <Database className="w-6 h-6 text-blue-500" />
                    System Blueprint
                </h2>
                <div className="flex bg-neutral-900 rounded-lg p-1 border border-neutral-800">
                    <TabButton
                        active={activeTab === 'architecture'}
                        onClick={() => setActiveTab('architecture')}
                        icon={<Code2 className="w-4 h-4" />}
                        label="Architecture"
                    />
                    <TabButton
                        active={activeTab === 'design'}
                        onClick={() => setActiveTab('design')}
                        icon={<Palette className="w-4 h-4" />}
                        label="Design System"
                    />
                    <TabButton
                        active={activeTab === 'pages'}
                        onClick={() => setActiveTab('pages')}
                        icon={<FileText className="w-4 h-4" />}
                        label="Page Structure"
                    />
                </div>
            </div>

            <div className="p-6 h-[500px] overflow-y-auto bg-neutral-900/50">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'architecture' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card title="Shop Metadata">
                                <KeyVal label="Name" value={meta.shopName || 'Untitled'} />
                                <KeyVal label="Vibe" value={meta.vibe || 'N/A'} />
                                <KeyVal label="Audience" value={meta.targetAudience || 'General'} />
                            </Card>
                            <Card title="Core Features">
                                {Object.entries(features).map(([key, val]) => (
                                    <div key={key} className="flex items-center justify-between py-1 border-b border-neutral-800/50 last:border-0">
                                        <span className="text-neutral-400 capitalize">{key.replace('has', '')}</span>
                                        <span className={val ? "text-green-400" : "text-neutral-600"}>{val ? 'Enabled' : 'Disabled'}</span>
                                    </div>
                                ))}
                                {Object.keys(features).length === 0 && <span className="text-neutral-500 text-sm">No specific features listed.</span>}
                            </Card>
                            <Card title="Tech Stack" className="col-span-full">
                                <div className="flex gap-2">
                                    <Badge>Next.js 15</Badge>
                                    <Badge>Tailwind CSS</Badge>
                                    <Badge>React Server Components</Badge>
                                    <Badge>Framer Motion</Badge>
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'design' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {Object.entries(designSystem.colors || {}).map(([name, hex]) => (
                                    <div key={name} className="space-y-2">
                                        <div className="h-16 rounded-lg border border-white/10 shadow-lg" style={{ backgroundColor: hex as string }} />
                                        <div className="text-center">
                                            <p className="text-xs text-neutral-400 uppercase font-mono">{name}</p>
                                            <p className="text-sm font-semibold text-white">{hex as string}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card title="Typography">
                                    <KeyVal label="Heading Font" value={designSystem.typography?.fontFamilyHeading || 'Sans'} />
                                    <KeyVal label="Body Font" value={designSystem.typography?.fontFamilyBody || 'Sans'} />
                                </Card>
                                <Card title="Layout">
                                    <KeyVal label="Spacing" value={designSystem.spacing || '1rem'} />
                                    <KeyVal label="Border Radius" value={designSystem.borderRadius || '0px'} />
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeTab === 'pages' && (
                        <div className="space-y-4">
                            {pages.map((page: any) => (
                                <div key={page.path || Math.random()} className="bg-neutral-950 border border-neutral-800 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-medium text-white">{page.name || 'Unnamed Page'} <span className="text-neutral-500 text-sm ml-2">({page.path})</span></h3>
                                        <span className="text-xs px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                                            {page.components?.length || 0} Components
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {(page.components || []).map((comp: any) => (
                                            <div key={comp.id || Math.random()} className="px-3 py-1.5 rounded bg-blue-900/10 border border-blue-900/30 text-blue-300 text-xs font-mono">
                                                &lt;{comp.type} /&gt;
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {pages.length === 0 && <span className="text-neutral-500">No pages defined.</span>}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

const TabButton = ({ active, onClick, icon, label }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${active ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'
            }`}
    >
        {icon}
        {label}
    </button>
);

const Card = ({ title, children, className = '' }: any) => (
    <div className={`bg-neutral-950 border border-neutral-800 rounded-xl p-5 ${className}`}>
        <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">{title}</h3>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

const KeyVal = ({ label, value }: any) => (
    <div className="flex items-center justify-between">
        <span className="text-neutral-500">{label}</span>
        <span className="text-neutral-200 font-medium">{value}</span>
    </div>
);

const Badge = ({ children }: any) => (
    <span className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono">
        {children}
    </span>
);
