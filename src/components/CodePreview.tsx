'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, FileCode, Terminal } from 'lucide-react';

interface CodeFile {
    path: string;
    content: string;
}

interface CodePreviewProps {
    files: CodeFile[];
}

export default function CodePreview({ files }: CodePreviewProps) {
    const [activeFile, setActiveFile] = React.useState(0);
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(files[activeFile].content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!files || files.length === 0) return null;

    return (
        <div className="w-full max-w-6xl mx-auto mt-8 bg-[#1e1e1e] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl font-mono text-sm">

            {/* Tab Header */}
            <div className="flex items-center bg-[#252526] border-b border-black text-neutral-400 overflow-x-auto">
                {files.map((file, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveFile(idx)}
                        className={`flex items-center gap-2 px-4 py-3 border-r border-black hover:bg-[#1e1e1e] hover:text-white transition-colors min-w-fit ${activeFile === idx ? 'bg-[#1e1e1e] text-blue-400 border-t-2 border-t-blue-500' : ''
                            }`}
                    >
                        <FileCode className="w-4 h-4" />
                        {file.path.split('/').pop()}
                    </button>
                ))}
            </div>

            {/* Code Editor Area */}
            <div className="relative group">
                <div className="absolute right-4 top-4 z-10">
                    <button
                        onClick={handleCopy}
                        className="p-2 rounded bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
                        title="Copy Code"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>

                <div className="p-6 overflow-x-auto h-[600px] scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                    <pre className="text-gray-300 font-mono leading-relaxed">
                        <code>{files[activeFile].content}</code>
                    </pre>
                </div>
            </div>

            {/* Footer Status Bar */}
            <div className="bg-blue-600 text-white px-4 py-1 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Terminal className="w-3 h-3" />
                    <span>GENERATION COMPLETE</span>
                </div>
                <span>UTF-8</span>
            </div>
        </div>
    );
}
