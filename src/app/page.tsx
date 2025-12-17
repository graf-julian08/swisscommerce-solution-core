'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight, CheckCircle, Loader2,
  ExternalLink, Store, Copy, Check
} from 'lucide-react';

interface GenerationResult {
  success: boolean;
  shop?: {
    id: string;
    slug: string;
    name: string;
    url: string;
  };
  error?: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || prompt.length < 10) return;

    setIsGenerating(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/shops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Generation failed');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400 mb-4">
            <Store className="w-3 h-3" />
            <span>AI SHOP CREATOR</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-emerald-200/50">
            Create Your Shop
          </h1>
          <p className="text-lg text-neutral-400 max-w-xl mx-auto">
            Describe your dream shop. Get a <span className="text-emerald-400">live subdomain</span> in seconds.
          </p>
        </motion.div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['Instant Subdomain', 'Custom Design', 'Full E-Commerce', 'No Code'].map((feature) => (
            <span key={feature} className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-neutral-400">
              ✓ {feature}
            </span>
          ))}
        </div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl mb-12"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur-lg" />
            <div className="relative flex items-center bg-neutral-900 rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="z.B. 'Luxuriöser Fashion Store NOIR mit schwarzem Design'..."
                className="w-full bg-transparent px-6 py-5 text-lg text-white placeholder:text-neutral-600 focus:outline-none"
                onKeyDown={(e) => e.key === 'Enter' && !isGenerating && handleGenerate()}
                disabled={isGenerating}
              />
              <button
                onClick={handleGenerate}
                disabled={prompt.length < 10 || isGenerating}
                className="mr-2 p-3 rounded-lg bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <p className="text-center text-neutral-600 text-sm mt-3">
            Mindestens 10 Zeichen
          </p>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-3 text-emerald-400"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Erstelle deinen Shop...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mb-8"
          >
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400">
              <p className="font-medium">Fehler</p>
              <p className="text-sm mt-1 text-red-300/70">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Success Result */}
        {result?.success && result.shop && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl"
          >
            <div className="bg-gradient-to-b from-emerald-900/20 to-neutral-900/50 border border-emerald-500/30 rounded-2xl p-8 text-center">

              {/* Success Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                {result.shop.name}
              </h2>
              <p className="text-neutral-400 mb-6">
                Dein Shop ist live!
              </p>

              {/* Shop URL */}
              <div className="bg-black/40 rounded-xl p-4 mb-6">
                <p className="text-xs text-neutral-500 mb-2">Shop URL</p>
                <div className="flex items-center justify-center gap-2">
                  <code className="text-emerald-400 text-lg">{result.shop.url}</code>
                  <button
                    onClick={() => copyToClipboard(result.shop!.url)}
                    className="p-2 hover:bg-white/10 rounded-lg transition"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-neutral-500" />}
                  </button>
                </div>
              </div>

              {/* Open Button */}
              <a
                href={result.shop.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-semibold rounded-lg hover:bg-emerald-400 transition"
              >
                Shop öffnen
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Create Another */}
              <button
                onClick={() => {
                  setResult(null);
                  setPrompt('');
                }}
                className="block w-full mt-4 text-neutral-500 hover:text-white text-sm transition"
              >
                Weiteren Shop erstellen
              </button>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="absolute bottom-6 text-center text-neutral-600 text-sm">
          Powered by SwissCommerce Solution
        </div>
      </div>
    </main>
  );
}
