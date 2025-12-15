'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LogEntry {
  id: string;
  step: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  message: string;
  timestamp: string;
}

interface TerminalProps {
  logs: LogEntry[];
  isVisible: boolean;
}

export default function Terminal({ logs, isVisible }: TerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 font-mono text-sm">
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
        <div className="flex items-center justify-between px-4 py-2 bg-neutral-950 border-b border-neutral-800">
          <div className="flex items-center gap-2 text-neutral-400">
            <TerminalIcon className="w-4 h-4" />
            <span className="font-semibold text-xs tracking-wider">SYSTEM_TERMINAL</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="h-64 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent"
        >
          <AnimatePresence>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3 text-neutral-300"
              >
                <div className="mt-1">
                  {log.status === 'running' && <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />}
                  {log.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />}
                  {log.status === 'failed' && <AlertCircle className="w-3.5 h-3.5 text-red-400" />}
                  {log.status === 'pending' && <div className="w-3.5 h-3.5 rounded-full border border-neutral-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "font-bold uppercase text-[10px] px-1.5 py-0.5 rounded",
                      log.status === 'running' && "bg-blue-900/30 text-blue-400",
                      log.status === 'completed' && "bg-green-900/30 text-green-400",
                      log.status === 'failed' && "bg-red-900/30 text-red-400",
                      log.status === 'pending' && "bg-neutral-800 text-neutral-500"
                    )}>
                      {log.step}
                    </span>
                    <span className="text-xs text-neutral-500">[{log.timestamp}]</span>
                  </div>
                  <p className={cn(
                    "mt-1 leading-relaxed",
                    log.status === 'failed' ? "text-red-300" : "text-neutral-300"
                  )}>
                    {log.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {logs.length === 0 && (
            <div className="text-neutral-600 italic text-center mt-20">System ready. Waiting for input...</div>
          )}
        </div>
      </div>
    </div>
  );
}
