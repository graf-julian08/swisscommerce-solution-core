'use client';

// src/app/builder/page.tsx
// AI Website Builder UI - With Auto-Redirect to Preview

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BuilderPage() {
    const router = useRouter();
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    options: { skipLLM: true },
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Generation failed');
            }

            // Redirect to preview
            router.push('/preview');

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            setLoading(false);
        }
    };

    const examplePrompts = [
        {
            emoji: '👗',
            text: 'Ein luxuriöser Fashion Store namens "Maison Élégance" für hochwertige Designermode. Elegante, minimalistische Ästhetik.'
        },
        {
            emoji: '🧸',
            text: 'A colorful toy store called "ToyWorld" for kids and parents. Fun, bright colors with rounded elements.'
        },
        {
            emoji: '💻',
            text: 'Modern electronics shop "TechNova" with a dark, futuristic design. Sharp edges, neon accents.'
        },
        {
            emoji: '🌿',
            text: 'Nachhaltiger Bio-Kosmetik Shop "GreenGlow" mit natürlichen, erdigen Farben und organischem Design.'
        },
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #0a0a0a 0%, #111 100%)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Header */}
            <header style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid #222',
            }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🚀</span> AI Website Builder
                </h1>
            </header>

            {/* Main */}
            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                maxWidth: '800px',
                margin: '0 auto',
                width: '100%',
            }}>
                {/* Title */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                        Erstelle deinen Online-Shop
                    </h2>
                    <p style={{ color: '#888', fontSize: '1.125rem' }}>
                        Beschreibe deinen Shop in einem Satz und wir generieren ihn für dich.
                    </p>
                </div>

                {/* Prompt Input */}
                <div style={{ width: '100%', marginBottom: '1.5rem' }}>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="z.B. Ein moderner Schmuck-Shop mit minimalistischem Design und goldenen Akzenten..."
                        style={{
                            width: '100%',
                            padding: '1.25rem',
                            fontSize: '1.125rem',
                            background: '#1a1a1a',
                            border: '2px solid #333',
                            borderRadius: '12px',
                            color: '#fff',
                            minHeight: '140px',
                            resize: 'none',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#555'}
                        onBlur={(e) => e.target.style.borderColor = '#333'}
                    />
                </div>

                {/* Generate Button */}
                <button
                    onClick={handleGenerate}
                    disabled={loading || !prompt.trim()}
                    style={{
                        width: '100%',
                        padding: '1.25rem',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        background: loading ? '#333' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: loading || !prompt.trim() ? 'not-allowed' : 'pointer',
                        marginBottom: '2rem',
                        transition: 'transform 0.2s, opacity 0.2s',
                        opacity: !prompt.trim() ? 0.5 : 1,
                    }}
                >
                    {loading ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <span style={{
                                width: '20px',
                                height: '20px',
                                border: '2px solid rgba(255,255,255,0.3)',
                                borderTopColor: '#fff',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                            }} />
                            Generiere deinen Shop...
                        </span>
                    ) : (
                        '✨ Shop generieren'
                    )}
                </button>

                {/* Error */}
                {error && (
                    <div style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'rgba(255,0,0,0.1)',
                        border: '1px solid rgba(255,0,0,0.3)',
                        borderRadius: '8px',
                        marginBottom: '2rem',
                        color: '#ff6b6b',
                    }}>
                        ❌ {error}
                    </div>
                )}

                {/* Example Prompts */}
                <div style={{ width: '100%' }}>
                    <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.75rem' }}>Beispiele:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {examplePrompts.map((p, i) => (
                            <button
                                key={i}
                                onClick={() => setPrompt(p.text)}
                                style={{
                                    padding: '1rem 1.25rem',
                                    fontSize: '0.875rem',
                                    background: '#1a1a1a',
                                    border: '1px solid #333',
                                    borderRadius: '8px',
                                    color: '#aaa',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'background 0.2s, border-color 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#222';
                                    e.currentTarget.style.borderColor = '#444';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#1a1a1a';
                                    e.currentTarget.style.borderColor = '#333';
                                }}
                            >
                                <span style={{ fontSize: '1.5rem' }}>{p.emoji}</span>
                                <span>{p.text}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer style={{ padding: '1.5rem 2rem', borderTop: '1px solid #222', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: '#555' }}>
                    Prompt → Pipeline → DSL → Next.js | Powered by AI
                </p>
            </footer>

            {/* Spin Animation */}
            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
