'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, ArrowRight, Database, Server, Globe,
    CheckCircle, Loader2, ExternalLink, Terminal,
    ShoppingBag, Store, Palette
} from 'lucide-react';

interface GenerationStep {
    id: string;
    label: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    detail?: string;
}

interface GenerationResult {
    success: boolean;
    shopName: string;
    storefrontUrl: string;
    backendUrl: string;
    adminUrl: string;
    configFiles: string[];
    dslSummary?: {
        brandName: string;
        vertical: string;
        personality: string;
        complexity: string;
    };
    error?: string;
}

const STEPS: GenerationStep[] = [
    { id: 'analyze', label: 'Analyzing Prompt', status: 'pending' },
    { id: 'dsl', label: 'Generating Design Spec', status: 'pending' },
    { id: 'copy', label: 'Copying Medusa Template', status: 'pending' },
    { id: 'config', label: 'Generating Configs', status: 'pending' },
    { id: 'database', label: 'Starting Database', status: 'pending' },
    { id: 'ready', label: 'Shop Ready!', status: 'pending' },
];

export default function MedusaBuilder() {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [steps, setSteps] = useState<GenerationStep[]>(STEPS);
    const [result, setResult] = useState<GenerationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const updateStep = (id: string, status: GenerationStep['status'], detail?: string) => {
        setSteps(prev => prev.map(step =>
            step.id === id ? { ...step, status, detail } : step
        ));
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setIsGenerating(true);
        setResult(null);
        setError(null);
        setSteps(STEPS.map(s => ({ ...s, status: 'pending' })));

        try {
            // Step 1: Analyze
            updateStep('analyze', 'running');
            await new Promise(r => setTimeout(r, 500));
            updateStep('analyze', 'completed', 'Prompt understood');

            // Step 2: DSL Generation
            updateStep('dsl', 'running');

            // Call the generate-shop API
            const response = await fetch('/api/generate-shop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    options: {
                        startServers: false, // Don't start servers from API (requires Docker)
                        seedProducts: true,
                    }
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Generation failed');
            }

            updateStep('dsl', 'completed', data.dslSummary?.brandName || 'Design spec created');

            // Step 3: Copy Template
            updateStep('copy', 'completed', 'Template copied');

            // Step 4: Config Generation
            updateStep('config', 'completed', `${data.configFiles.length} configs generated`);

            // Step 5: Database (manual step - user needs Docker)
            updateStep('database', 'pending', 'Requires Docker');

            // Step 6: Ready
            updateStep('ready', 'completed');

            setResult(data);

        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(message);

            // Mark current running step as failed
            setSteps(prev => prev.map(step =>
                step.status === 'running' ? { ...step, status: 'failed' } : step
            ));
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-900/20 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400 mb-4">
                        <Store className="w-3 h-3" />
                        <span>FULL-STACK MEDUSA SHOP GENERATOR</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-emerald-200/50">
                        Real Shop Builder
                    </h1>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                        Generate a <span className="text-emerald-400">fully functional</span> e-commerce shop with working Cart, Login, Checkout, and more. Powered by Medusa.
                    </p>
                </motion.div>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {['Working Cart', 'Real Login', 'Checkout Flow', 'Product Filter', 'Wishlist', 'Admin Panel'].map((feature) => (
                        <span key={feature} className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-neutral-400">
                            ✓ {feature}
                        </span>
                    ))}
                </div>

                {/* Input */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl mx-auto mb-12"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur-lg" />
                        <div className="relative flex items-center bg-neutral-900 rounded-xl overflow-hidden shadow-2xl border border-white/10">
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Describe your shop (e.g., 'Luxuriöser Fashion Store NOIR')..."
                                className="w-full bg-transparent px-6 py-5 text-lg text-white placeholder:text-neutral-600 focus:outline-none"
                                onKeyDown={(e) => e.key === 'Enter' && !isGenerating && handleGenerate()}
                                disabled={isGenerating}
                            />
                            <button
                                onClick={handleGenerate}
                                disabled={!prompt.trim() || isGenerating}
                                className="mr-2 p-3 rounded-lg bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Progress Steps */}
                <AnimatePresence>
                    {(isGenerating || result || error) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-xl mx-auto mb-12"
                        >
                            <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                <h3 className="text-sm font-medium text-neutral-400 mb-4 flex items-center gap-2">
                                    <Terminal className="w-4 h-4" />
                                    Generation Progress
                                </h3>
                                <div className="space-y-3">
                                    {steps.map((step, idx) => (
                                        <div key={step.id} className="flex items-center gap-3">
                                            <div className="w-6 h-6 flex items-center justify-center">
                                                {step.status === 'completed' && (
                                                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                                                )}
                                                {step.status === 'running' && (
                                                    <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                                                )}
                                                {step.status === 'pending' && (
                                                    <div className="w-3 h-3 rounded-full bg-neutral-700" />
                                                )}
                                                {step.status === 'failed' && (
                                                    <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-xs">✕</div>
                                                )}
                                            </div>
                                            <span className={`text-sm ${step.status === 'completed' ? 'text-white' :
                                                    step.status === 'running' ? 'text-emerald-400' :
                                                        step.status === 'failed' ? 'text-red-400' :
                                                            'text-neutral-600'
                                                }`}>
                                                {step.label}
                                            </span>
                                            {step.detail && (
                                                <span className="text-xs text-neutral-500 ml-auto">{step.detail}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-xl mx-auto mb-8"
                    >
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400">
                            <p className="font-medium">Generation Failed</p>
                            <p className="text-sm mt-1 text-red-300/70">{error}</p>
                        </div>
                    </motion.div>
                )}

                {/* Result */}
                {result && result.success && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="bg-gradient-to-b from-emerald-900/20 to-neutral-900/50 border border-emerald-500/30 rounded-2xl p-8">

                            {/* Success Header */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full mb-4">
                                    <ShoppingBag className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    {result.dslSummary?.brandName || result.shopName}
                                </h2>
                                <p className="text-neutral-400">
                                    Your shop is ready! Follow the steps below to start it.
                                </p>
                            </div>

                            {/* Shop Details */}
                            {result.dslSummary && (
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="bg-black/30 rounded-lg p-4 text-center">
                                        <p className="text-xs text-neutral-500 mb-1">Vertical</p>
                                        <p className="text-white font-medium capitalize">{result.dslSummary.vertical}</p>
                                    </div>
                                    <div className="bg-black/30 rounded-lg p-4 text-center">
                                        <p className="text-xs text-neutral-500 mb-1">Style</p>
                                        <p className="text-white font-medium capitalize">{result.dslSummary.personality.replace('-', ' ')}</p>
                                    </div>
                                    <div className="bg-black/30 rounded-lg p-4 text-center">
                                        <p className="text-xs text-neutral-500 mb-1">Complexity</p>
                                        <p className="text-white font-medium capitalize">{result.dslSummary.complexity}</p>
                                    </div>
                                </div>
                            )}

                            {/* Start Instructions */}
                            <div className="bg-black/40 rounded-xl p-6 mb-6">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Terminal className="w-5 h-5 text-emerald-400" />
                                    Start Your Shop
                                </h3>
                                <div className="space-y-4 text-sm">
                                    <div className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                        <div>
                                            <p className="text-white font-medium">Start Docker Desktop</p>
                                            <p className="text-neutral-500">Required for PostgreSQL database</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                        <div>
                                            <p className="text-white font-medium">Start Database</p>
                                            <code className="block mt-1 px-3 py-2 bg-black rounded text-emerald-400 text-xs">
                                                docker-compose up -d postgres
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                        <div>
                                            <p className="text-white font-medium">Start Backend</p>
                                            <code className="block mt-1 px-3 py-2 bg-black rounded text-emerald-400 text-xs">
                                                cd {result.outputDir}/backend && npm install && npm run dev
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                                        <div>
                                            <p className="text-white font-medium">Start Storefront</p>
                                            <code className="block mt-1 px-3 py-2 bg-black rounded text-emerald-400 text-xs">
                                                cd {result.outputDir}/storefront && npm install && npm run dev
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* URLs */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <a
                                    href={result.storefrontUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition"
                                >
                                    <div>
                                        <p className="text-xs text-neutral-500">Storefront</p>
                                        <p className="text-white font-medium">{result.storefrontUrl}</p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-neutral-500" />
                                </a>
                                <a
                                    href={result.backendUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition"
                                >
                                    <div>
                                        <p className="text-xs text-neutral-500">Backend API</p>
                                        <p className="text-white font-medium">{result.backendUrl}</p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-neutral-500" />
                                </a>
                                <a
                                    href={result.adminUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition"
                                >
                                    <div>
                                        <p className="text-xs text-neutral-500">Admin Panel</p>
                                        <p className="text-white font-medium">{result.adminUrl}</p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-neutral-500" />
                                </a>
                            </div>

                            {/* Generated Configs */}
                            <div className="text-center">
                                <p className="text-xs text-neutral-500 mb-2">Generated Configs</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {result.configFiles.map((file) => (
                                        <span key={file} className="px-2 py-1 bg-black/40 rounded text-xs text-neutral-400">
                                            {file}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}

                {/* Requirements Note */}
                <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto">
                    <div className="bg-neutral-900/90 backdrop-blur border border-white/10 rounded-lg px-4 py-3 flex items-center gap-3">
                        <Database className="w-5 h-5 text-neutral-500" />
                        <p className="text-xs text-neutral-500">
                            Requires <span className="text-white">Docker Desktop</span> for PostgreSQL database
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}
