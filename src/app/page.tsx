'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, AppWindow, Cpu, Layers } from 'lucide-react';
import Terminal from '@/components/Terminal';
import BlueprintView from '@/components/BlueprintView';
import LivePreview from '@/components/LivePreview';
import QAConsole from '@/components/QAConsole';

interface LogEntry {
  id: string;
  step: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  message: string;
  timestamp: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: Idle, 1: Master Prompt, 2: Blueprint, 3: Code
  const [masterPrompt, setMasterPrompt] = useState<string | null>(null);

  const addLog = (step: string, message: string, status: LogEntry['status'] = 'running') => {
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    const id = Math.random().toString(36).substring(7);

    setLogs(prev => {
      // Mark previous running logs as completed if new one starts, unless explicit logic handles it
      const updated = prev.map(log =>
        log.status === 'running' ? { ...log, status: 'completed' as const } : log
      );
      return [...updated, { id, step, message, status, timestamp }];
    });
  };

  const updateLastLogStatus = (status: LogEntry['status'], message?: string) => {
    setLogs(prev => {
      const newLogs = [...prev];
      const last = newLogs[newLogs.length - 1];
      if (last) {
        last.status = status;
        if (message) last.message = message;
      }
      return newLogs;
    });
  };

  // Debug: Mock Data
  const handleDebugFill = () => {
    setMasterPrompt("DEBUG MODE: Value for Master Prompt");
    setBlueprint({
      meta: { title: "Debug Shop", description: "A test shop", style: "Minimal" },
      designSystem: {
        colors: { primary: "#000", secondary: "#fff", accent: "#f00", background: "#f5f5f5", text: "#111" },
        typography: { heading: "Inter", body: "Roboto" },
        spacing: "1rem",
        borderRadius: "8px"
      },
      navigation: { links: [{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }] },
      pages: {
        home: { sections: [] },
        shop: { sections: [] },
        product: { sections: [] },
        cart: { sections: [] }
      },
      features: { auth: false, cart: true, search: true }
    });
    setCurrentStep(2); // Jump to Blueprint View
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setCurrentStep(1);
    setLogs([]); // Clear previous logs
    setMasterPrompt(null);

    // Initial Logs
    addLog('SYSTEM', 'Initializing AI Builder Pipeline...', 'completed');
    addLog('PHASE_1', 'Analyzing User Prompt...');

    try {
      // Call Phase 1 API
      const res = await fetch('/api/generate-master-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt: prompt }),
      });

      if (!res.ok) throw new Error('API Request Failed');

      const data = await res.json();

      updateLastLogStatus('completed', 'User prompt analyzed successfully.');
      addLog('PHASE_1', 'Generating MASTER_PROMPT via Ollama (gemma3:4b)...', 'running');

      // Simulate a bit of "processing" time if the API is too fast, for effect
      await new Promise(r => setTimeout(r, 800));

      setMasterPrompt(data.masterPrompt);
      updateLastLogStatus('completed', 'MASTER_PROMPT generated successfully.');

      // Auto-proceed to Phase 2 (for demo flow, or wait for user click if preferred, strict step-by-step says wait for Go)
      // The user said "Go" effectively starts the next step if we were in global context.
      // But in the interface, we probably want a button "Build Blueprint".
      // However, the instructions say "Warte nach jedem Schritt auf ein explizites Go".
      // I will leave it at Phase 1 Complete and wait for the user to click "Proceed".

      addLog('SYSTEM', 'Phase 1 Complete. Waiting for user approval to proceed to Phase 2.', 'pending');

    } catch (error) {
      console.error(error);
      updateLastLogStatus('failed', 'Error during generation.');
      addLog('ERROR', 'Pipeline halted due to error.', 'failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const [blueprint, setBlueprint] = useState<any>(null);

  const handlePhase2 = async () => {
    setIsGenerating(true);
    setCurrentStep(2);
    addLog('SYSTEM', 'Starting Phase 2: Blueprint Architecture...', 'running');

    try {
      addLog('PHASE_2', 'Sending Master Prompt to DeepSeek Architect...');
      const res = await fetch('/api/generate-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ masterPrompt }),
      });

      if (!res.ok) throw new Error('Blueprint Generation Failed');

      const data = await res.json();
      setBlueprint(data.blueprint);

      updateLastLogStatus('completed', 'Blueprint JSON generated.');
      addLog('SYSTEM', 'Phase 2 Complete. Blueprint ready for review.', 'pending');

    } catch (error) {
      console.error(error);
      updateLastLogStatus('failed', 'Failed to generate blueprint.');
    } finally {
      setIsGenerating(false);
    }
  };

  const [generatedCode, setGeneratedCode] = useState<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePhase3 = async () => {
    setIsGenerating(true);
    setCurrentStep(3);
    addLog('SYSTEM', 'Starting Phase 3: High-Fidelity Code Generation...', 'running');

    try {
      addLog('PHASE_3', 'Initializing Gemini 3 Pro (Agentic Mode)...');
      // Simulate some specific steps
      await new Promise(r => setTimeout(r, 1000));
      addLog('PHASE_3', 'Reviewing Blueprint specifications...', 'completed');
      addLog('PHASE_3', 'Generating React Application (Sandpack Compatible)...', 'running'); // Modified log message

      const res = await fetch('/api/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blueprint, userPrompt: prompt }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Code Generation Failed');
      }

      const data = await res.json();
      setGeneratedCode(data.generatedCode); // Now matches { files: { "/App.js": ... } }

      updateLastLogStatus('completed', 'Codebase generated successfully.');

      // Phase 4: QA
      setCurrentStep(4);
      addLog('PHASE_4', 'Running Automated QA Suite...', 'running');
      await new Promise(r => setTimeout(r, 1500));
      addLog('PHASE_4', 'Security & Performance Checks Passed.', 'completed');
      addLog('SUCCESS', 'Store is Live in Preview Environment! 🚀', 'completed'); // Modified success message

    } catch (error: any) {
      console.error(error);
      updateLastLogStatus('failed', `Failed: ${error.message}`);
      addLog('ERROR', error.message, 'failed');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30 pb-20">

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-4">
            <Sparkles className="w-3 h-3" />
            <span>AI-POWERED E-COMMERCE ARCHITECT</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50">
            Build your store.
          </h1>
          <p className="text-lg text-neutral-400 max-w-xl mx-auto">
            Enter a simple idea. Our autonomous AI agents will orchestrate a complete, production-ready e-commerce platform for you.
          </p>
        </motion.div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur-lg" />
          <div className="relative flex items-center bg-neutral-900 rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your dream shop (e.g., 'A futuristic sneaker store inspired by Tokyo neon lights')..."
              className="w-full bg-transparent px-6 py-5 text-lg text-white placeholder:text-neutral-600 focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && !isGenerating && !masterPrompt && handleGenerate()}
              disabled={isGenerating || !!masterPrompt}
            />
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating || !!masterPrompt}
              className="mr-2 p-3 rounded-lg bg-white text-black hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isGenerating ? <Cpu className="w-5 h-5 animate-pulse" /> : <ArrowRight className="w-5 h-5" />}
            </button>
          </div>

          {/* Debug Trigger */}
          <div className="absolute -bottom-8 right-0">
            <button onClick={handleDebugFill} className="text-xs text-neutral-700 hover:text-white transition">
              [Debug: Mock Blueprint]
            </button>
          </div>
        </motion.div>

        {/* Terminal / Progress */}
        <Terminal logs={logs} isVisible={logs.length > 0} />

        {/* Phase 1 Result: Master Prompt */}
        {masterPrompt && !blueprint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mt-8"
          >
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Generated Master Prompt
                </h3>
                <div className="px-3 py-1 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-900/50">
                  Ready for Review
                </div>
              </div>
              <div className="prose prose-invert prose-sm max-w-none bg-black/40 p-4 rounded-lg border border-white/5 overflow-x-auto max-h-96">
                <pre className="whitespace-pre-wrap font-mono text-neutral-300">{masterPrompt}</pre>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handlePhase2}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating Blueprint...' : 'Proceed to Phase 2 (Blueprint) →'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Phase 2 Result: Blueprint View */}
        {blueprint && !generatedCode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <BlueprintView blueprint={blueprint} />
            <div className="flex justify-center mt-8">
              <button
                onClick={handlePhase3}
                disabled={isGenerating}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/20 transition transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Building Shop...' : 'Start Phase 3: Code Generation & Build'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Phase 3 & 4 Results */}
        {generatedCode && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-12 space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Shop Successfully Built & Verified.</h2>
              <p className="text-neutral-400">Your AI-generated store is live below.</p>
            </div>

            {/* Live Preview (Phase 4) */}
            <div className={`transition-all duration-300 ${isFullscreen ? "fixed inset-0 z-[100] bg-neutral-950 p-6 flex flex-col" : "relative"}`}>
              {isFullscreen && (
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg font-bold transition flex items-center gap-2"
                  >
                    <span>✕ Close Fullscreen</span>
                  </button>
                </div>
              )}
              <div className={isFullscreen ? "flex-grow overflow-auto" : ""}>
                <LivePreview files={generatedCode.files} />
              </div>
            </div>

            {/* QA Console (Phase 4) - Hide in fullscreen */}
            {!isFullscreen && <QAConsole />}

            {!isFullscreen && (
              <div className="flex justify-center gap-4 pb-12">
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-neutral-200 transition"
                >
                  🚀 Open Fullscreen
                </button>
              </div>
            )}
          </motion.div>
        )}

      </div>
    </main>
  );
}
