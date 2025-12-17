'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare,
    Settings,
    Download,
    Send,
    Loader2,
    Check,
    ExternalLink,
    Palette,
    CreditCard,
    Globe,
    FileCode,
    Smartphone,
    Monitor,
    Tablet
} from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface ShopSettings {
    shopName: string;
    tagline: string;
    logo: string;
    favicon: string;
    stripePublicKey: string;
    stripeSecretKey: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    adminUrl?: string;
    adminEmail?: string;
    adminPassword?: string;
}

type TabType = 'chat' | 'settings' | 'export';
type ViewportType = 'desktop' | 'tablet' | 'mobile';

export default function BuilderPage() {
    const params = useParams();
    const shopId = params.shopId as string;

    const [activeTab, setActiveTab] = useState<TabType>('chat');
    const [viewport, setViewport] = useState<ViewportType>('desktop');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Your shop has been generated! 🎉\n\nTell me what you\'d like to change:\n• "Make the header black"\n• "Add 5 more products"\n• "Change the font to Playfair Display"',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [shopFiles, setShopFiles] = useState<Record<string, { code: string }>>({});
    const [settings, setSettings] = useState<ShopSettings>({
        shopName: '',
        tagline: '',
        logo: '',
        favicon: '',
        stripePublicKey: '',
        stripeSecretKey: '',
        primaryColor: '#000000',
        secondaryColor: '#ffffff',
        accentColor: '#8b5cf6'
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Load shop data on mount
    useEffect(() => {
        const loadShop = async () => {
            try {
                const res = await fetch(`/api/shop/${shopId}`);
                if (res.ok) {
                    const data = await res.json();
                    setShopFiles(data.files || {});
                    if (data.settings) {
                        setSettings(data.settings);
                    }
                }
            } catch (error) {
                console.error('Failed to load shop:', error);
            }
        };

        if (shopId) {
            loadShop();
        }
    }, [shopId]);

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isProcessing) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsProcessing(true);

        try {
            const res = await fetch('/api/adjust-shop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    shopId,
                    instruction: inputValue,
                    currentFiles: shopFiles
                })
            });

            if (!res.ok) throw new Error('Failed to adjust shop');

            const data = await res.json();

            // Update shop files
            if (data.updatedFiles) {
                setShopFiles(data.updatedFiles);
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.message || 'Done! I\'ve made the changes. Check the preview.',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);

            // Refresh iframe
            if (iframeRef.current) {
                iframeRef.current.src = iframeRef.current.src;
            }

        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I couldn\'t make that change. Please try again with a different instruction.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSaveSettings = async () => {
        setIsSaving(true);
        setSaveSuccess(false);

        try {
            const res = await fetch(`/api/shop/${shopId}/settings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ settings })
            });

            if (res.ok) {
                setSaveSuccess(true);

                // Reload shop files to get updated code
                const shopRes = await fetch(`/api/shop/${shopId}`);
                if (shopRes.ok) {
                    const data = await shopRes.json();
                    setShopFiles(data.files || {});
                }

                // Refresh the preview iframe
                if (iframeRef.current) {
                    // Force reload by changing src
                    const currentSrc = iframeRef.current.src;
                    iframeRef.current.src = '';
                    setTimeout(() => {
                        if (iframeRef.current) {
                            iframeRef.current.src = currentSrc;
                        }
                    }, 100);
                }

                setTimeout(() => setSaveSuccess(false), 3000);
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleExport = async (type: 'zip' | 'preview') => {
        if (type === 'preview') {
            window.open(`/preview/${shopId}`, '_blank');
        } else {
            // Download ZIP
            const res = await fetch(`/api/export-shop/${shopId}`);
            if (res.ok) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${settings.shopName || 'shop'}-export.zip`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }
    };

    const getViewportWidth = () => {
        switch (viewport) {
            case 'mobile': return 'max-w-[375px]';
            case 'tablet': return 'max-w-[768px]';
            default: return 'w-full';
        }
    };

    const tabs = [
        { id: 'chat' as TabType, label: 'Chat', icon: MessageSquare },
        { id: 'settings' as TabType, label: 'Settings', icon: Settings },
        { id: 'export' as TabType, label: 'Export', icon: Download }
    ];

    return (
        <div className="h-screen bg-neutral-950 flex overflow-hidden">

            {/* Preview Panel */}
            <div className="flex-1 flex flex-col border-r border-neutral-800">
                {/* Viewport Controls */}
                <div className="h-12 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>

                    <div className="flex items-center gap-1 bg-neutral-800 rounded-lg p-1">
                        <button
                            onClick={() => setViewport('desktop')}
                            className={`p-1.5 rounded ${viewport === 'desktop' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'}`}
                        >
                            <Monitor className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewport('tablet')}
                            className={`p-1.5 rounded ${viewport === 'tablet' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'}`}
                        >
                            <Tablet className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewport('mobile')}
                            className={`p-1.5 rounded ${viewport === 'mobile' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'}`}
                        >
                            <Smartphone className="w-4 h-4" />
                        </button>
                    </div>

                    <a
                        href={`/preview/${shopId}`}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Open in Browser
                    </a>
                </div>

                {/* Preview Iframe */}
                <div className="flex-1 bg-neutral-900 flex items-center justify-center p-4">
                    <div className={`${getViewportWidth()} h-full bg-white rounded-lg overflow-hidden shadow-2xl transition-all duration-300`}>
                        <iframe
                            ref={iframeRef}
                            src={`/preview/${shopId}`}
                            className="w-full h-full border-0"
                            title="Shop Preview"
                        />
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-[400px] flex flex-col bg-neutral-900">

                {/* Tabs */}
                <div className="h-12 border-b border-neutral-800 flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium transition ${activeTab === tab.id
                                ? 'text-white border-b-2 border-purple-500'
                                : 'text-neutral-400 hover:text-white'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-hidden">

                    {/* Chat Tab */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'chat' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="h-full flex flex-col"
                            >
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[85%] rounded-2xl px-4 py-2 ${message.role === 'user'
                                                    ? 'bg-purple-600 text-white'
                                                    : 'bg-neutral-800 text-neutral-200'
                                                    }`}
                                            >
                                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                            </div>
                                        </div>
                                    ))}

                                    {isProcessing && (
                                        <div className="flex justify-start">
                                            <div className="bg-neutral-800 rounded-2xl px-4 py-2">
                                                <Loader2 className="w-4 h-4 text-neutral-400 animate-spin" />
                                            </div>
                                        </div>
                                    )}

                                    <div ref={chatEndRef} />
                                </div>

                                {/* Input */}
                                <div className="p-4 border-t border-neutral-800">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                            placeholder="Describe what to change..."
                                            className="flex-1 bg-neutral-800 text-white rounded-xl px-4 py-3 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            disabled={isProcessing}
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            disabled={!inputValue.trim() || isProcessing}
                                            className="p-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition"
                                        >
                                            <Send className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Settings Tab */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'settings' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="h-full overflow-y-auto p-4 space-y-6"
                            >
                                {/* Branding */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                                        <Palette className="w-4 h-4" />
                                        Branding
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs text-neutral-400 mb-1">Shop Name</label>
                                            <input
                                                type="text"
                                                value={settings.shopName}
                                                onChange={(e) => setSettings(s => ({ ...s, shopName: e.target.value }))}
                                                className="w-full bg-neutral-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                placeholder="My Shop"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs text-neutral-400 mb-1">Tagline</label>
                                            <input
                                                type="text"
                                                value={settings.tagline}
                                                onChange={(e) => setSettings(s => ({ ...s, tagline: e.target.value }))}
                                                className="w-full bg-neutral-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                placeholder="Premium quality products"
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 gap-2">
                                            <div>
                                                <label className="block text-xs text-neutral-400 mb-1">Primary</label>
                                                <input
                                                    type="color"
                                                    value={settings.primaryColor}
                                                    onChange={(e) => setSettings(s => ({ ...s, primaryColor: e.target.value }))}
                                                    className="w-full h-10 rounded-lg cursor-pointer"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-neutral-400 mb-1">Secondary</label>
                                                <input
                                                    type="color"
                                                    value={settings.secondaryColor}
                                                    onChange={(e) => setSettings(s => ({ ...s, secondaryColor: e.target.value }))}
                                                    className="w-full h-10 rounded-lg cursor-pointer"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-neutral-400 mb-1">Accent</label>
                                                <input
                                                    type="color"
                                                    value={settings.accentColor}
                                                    onChange={(e) => setSettings(s => ({ ...s, accentColor: e.target.value }))}
                                                    className="w-full h-10 rounded-lg cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                {/* CMS / Admin Panel */}
                                {settings.adminUrl && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                                            <Settings className="w-4 h-4" />
                                            Admin Panel (CMS)
                                        </div>

                                        <div className="p-4 bg-neutral-800/50 rounded-xl border border-neutral-700 space-y-3">
                                            <a
                                                href={settings.adminUrl}
                                                target="_blank"
                                                className="w-full py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-white text-sm font-medium transition flex items-center justify-center gap-2 mb-3"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Open Medusa Admin
                                            </a>

                                            <div>
                                                <label className="block text-xs text-neutral-500 mb-1">Email</label>
                                                <div className="bg-neutral-900 rounded px-2 py-1.5 text-xs text-neutral-300 font-mono select-all">
                                                    {settings.adminEmail || 'admin@medusa-test.com'}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs text-neutral-500 mb-1">Password</label>
                                                <div className="bg-neutral-900 rounded px-2 py-1.5 text-xs text-neutral-300 font-mono select-all">
                                                    {settings.adminPassword || 'supersecret'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Payments */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                                        <CreditCard className="w-4 h-4" />
                                        Stripe Payments
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs text-neutral-400 mb-1">Publishable Key</label>
                                            <input
                                                type="text"
                                                value={settings.stripePublicKey}
                                                onChange={(e) => setSettings(s => ({ ...s, stripePublicKey: e.target.value }))}
                                                className="w-full bg-neutral-800 text-white rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                placeholder="pk_test_..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs text-neutral-400 mb-1">Secret Key</label>
                                            <input
                                                type="password"
                                                value={settings.stripeSecretKey}
                                                onChange={(e) => setSettings(s => ({ ...s, stripeSecretKey: e.target.value }))}
                                                className="w-full bg-neutral-800 text-white rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                placeholder="sk_test_..."
                                            />
                                        </div>
                                    </div>

                                    <p className="text-xs text-neutral-500">
                                        Get your keys from <a href="https://dashboard.stripe.com/apikeys" target="_blank" className="text-purple-400 hover:underline">Stripe Dashboard</a>
                                    </p>
                                </div>

                                {/* Domain */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                                        <Globe className="w-4 h-4" />
                                        Domain
                                    </div>

                                    <div>
                                        <label className="block text-xs text-neutral-400 mb-1">Custom Domain (optional)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-neutral-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            placeholder="shop.yourdomain.com"
                                        />
                                    </div>
                                </div>

                                {/* Save Button */}
                                <button
                                    onClick={handleSaveSettings}
                                    disabled={isSaving}
                                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-xl text-white font-medium transition flex items-center justify-center gap-2"
                                >
                                    {isSaving ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : saveSuccess ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Saved!
                                        </>
                                    ) : (
                                        'Save Settings'
                                    )}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Export Tab */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'export' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="h-full p-4 space-y-4"
                            >
                                <p className="text-sm text-neutral-400">
                                    Choose how you want to use your shop:
                                </p>

                                {/* Live Preview */}
                                <button
                                    onClick={() => handleExport('preview')}
                                    className="w-full p-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-left transition group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/10 rounded-lg">
                                            <ExternalLink className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold">Live Preview</h3>
                                            <p className="text-white/70 text-sm">
                                                Open fully working shop in browser
                                            </p>
                                        </div>
                                    </div>
                                </button>

                                {/* Code Export */}
                                <button
                                    onClick={() => handleExport('zip')}
                                    className="w-full p-4 bg-neutral-800 hover:bg-neutral-750 rounded-xl text-left transition border border-neutral-700"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-neutral-700 rounded-lg">
                                            <FileCode className="w-5 h-5 text-neutral-300" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold">Download Code</h3>
                                            <p className="text-neutral-400 text-sm">
                                                Export as ZIP with all files + SQL dump
                                            </p>
                                        </div>
                                    </div>
                                </button>

                                <div className="mt-6 p-4 bg-neutral-800/50 rounded-xl border border-neutral-700">
                                    <h4 className="text-sm font-medium text-neutral-300 mb-2">Export includes:</h4>
                                    <ul className="text-xs text-neutral-400 space-y-1">
                                        <li>✓ Complete React/Next.js frontend</li>
                                        <li>✓ Medusa backend configuration</li>
                                        <li>✓ Database SQL dump</li>
                                        <li>✓ Docker Compose for easy deployment</li>
                                        <li>✓ README with setup instructions</li>
                                        <li>✓ Environment variables template</li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div >
    );
}
