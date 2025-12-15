'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

interface QAItem {
    id: string;
    category: 'Security' | 'Accessibility' | 'Performance' | 'Functionality';
    test: string;
    status: 'passed' | 'failed' | 'warning' | 'pending';
}

const TESTS: QAItem[] = [
    { id: '1', category: 'Functionality', test: 'Navigation Links working', status: 'passed' },
    { id: '2', category: 'Functionality', test: 'Product Grid rendering', status: 'passed' },
    { id: '3', category: 'Performance', test: 'First Contentful Paint < 1.0s', status: 'passed' },
    { id: '4', category: 'Accessibility', test: 'Alt tags present on images', status: 'warning' },
    { id: '5', category: 'Security', test: 'Input sanitization verified', status: 'passed' },
];

export default function QAConsole() {
    return (
        <div className="w-full max-w-6xl mx-auto mt-8 bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    Automated QA Report
                </h2>
                <span className="px-3 py-1 bg-green-900/20 text-green-400 border border-green-900/50 rounded-full text-xs font-medium">
                    Pass Rate: 98%
                </span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TESTS.map((test, idx) => (
                    <motion.div
                        key={test.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 flex items-start gap-3"
                    >
                        <div className="mt-0.5">
                            {test.status === 'passed' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                            {test.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                            {test.status === 'failed' && <XCircle className="w-5 h-5 text-red-500" />}
                        </div>
                        <div>
                            <p className="text-xs text-neutral-500 font-semibold uppercase mb-1">{test.category}</p>
                            <p className="text-sm text-neutral-300">{test.test}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="px-6 py-4 bg-neutral-900/50 border-t border-neutral-800 text-center text-xs text-neutral-500">
                QA Engine v4.2.0 • All tests executed in sandboxed environment.
            </div>
        </div>
    );
}
