'use client';

// src/app/preview/page.tsx
// Live Preview of Generated Website

import { useEffect, useState } from 'react';

interface GeneratedSite {
    dsl: {
        content: {
            brand: { name: string; tagline: string };
            hero: { headline: string; subheadline: string; ctaText: string };
        };
        design: {
            tokens: {
                colors: { primary: string; background: string; foreground: string; accent: string };
                typography: { fontFamily: { heading: string; body: string } };
            };
        };
        pages: Array<{
            id: string;
            title: string;
            sections: Array<{ id: string; component: { type: string } }>;
        }>;
    };
    globalCSS: string;
    brandName: string;
    generatedAt: string;
}

export default function PreviewPage() {
    const [site, setSite] = useState<GeneratedSite | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('home');

    useEffect(() => {
        fetch('/api/generate')
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setSite(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#fff' }}>
                <p>⏳ Loading preview...</p>
            </div>
        );
    }

    if (!site) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#fff', gap: '1rem' }}>
                <h1>🚀 AI Website Builder</h1>
                <p style={{ color: '#888' }}>No site generated yet.</p>
                <a href="/builder" style={{ padding: '1rem 2rem', background: '#fff', color: '#000', borderRadius: '8px', textDecoration: 'none' }}>
                    → Go to Builder
                </a>
            </div>
        );
    }

    const { dsl, globalCSS, brandName } = site;
    const colors = dsl.design.tokens.colors;
    const fonts = dsl.design.tokens.typography.fontFamily;
    const pages = dsl.pages || [];
    const activePage = pages.find(p => p.id === currentPage) || pages[0];

    return (
        <>
            {/* Inject Global CSS */}
            <style dangerouslySetInnerHTML={{ __html: globalCSS }} />

            {/* Preview Frame */}
            <div style={{ minHeight: '100vh' }}>
                {/* Header */}
                <header style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                    background: colors.background,
                    borderBottom: '1px solid var(--color-border)',
                    padding: '1rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    {/* Left: Menu + Search */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: colors.foreground }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <span style={{ fontSize: '0.875rem', letterSpacing: '0.05em' }}>Menu</span>
                        </button>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.foreground }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                    </div>

                    {/* Center: Logo */}
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 500 }}>
                            {brandName}
                        </span>
                    </div>

                    {/* Right: Icons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, justifyContent: 'flex-end' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </div>
                </header>

                {/* Hero Section */}
                <section style={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), ${colors.primary}`,
                    color: '#fff',
                }}>
                    <div>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', fontWeight: 400, marginBottom: '1rem' }}>
                            {dsl.content.hero.headline || 'New Collection'}
                        </h1>
                        {dsl.content.hero.subheadline && (
                            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
                                {dsl.content.hero.subheadline}
                            </p>
                        )}
                        <a
                            href="/shop"
                            style={{
                                display: 'inline-block',
                                padding: '1rem 2.5rem',
                                background: '#fff',
                                color: '#000',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                letterSpacing: '0.1em',
                                textDecoration: 'none',
                            }}
                        >
                            {dsl.content.hero.ctaText || 'Shop Now'}
                        </a>
                    </div>
                </section>

                {/* Categories */}
                <section style={{ padding: '6rem 2rem' }}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                            {['Women', 'Men', 'Accessories'].map((cat, i) => (
                                <div
                                    key={i}
                                    style={{
                                        aspectRatio: '3/4',
                                        background: colors.primary,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: '#fff' }}>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>{cat}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Products */}
                <section style={{ padding: '4rem 2rem', background: colors.background }}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
                            New Arrivals
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div key={i} style={{ cursor: 'pointer' }}>
                                    <div style={{ aspectRatio: '3/4', background: colors.primary, marginBottom: '1rem' }} />
                                    <h4 style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Product {i}</h4>
                                    <p style={{ color: colors.accent, fontWeight: 500 }}>€{(99 + i * 20).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter */}
                <section style={{ padding: '6rem 2rem', background: colors.primary, color: '#fff', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                        Join Our Newsletter
                    </h2>
                    <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>Subscribe for exclusive offers and updates</p>
                    <form style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', maxWidth: '400px', margin: '0 auto' }}>
                        <input
                            type="email"
                            placeholder="Your email"
                            style={{
                                flex: 1,
                                padding: '0.75rem 1rem',
                                border: '1px solid rgba(255,255,255,0.3)',
                                background: 'transparent',
                                color: '#fff',
                            }}
                        />
                        <button style={{ padding: '0.75rem 1.5rem', background: '#fff', color: colors.primary, fontWeight: 500, border: 'none', cursor: 'pointer' }}>
                            Subscribe
                        </button>
                    </form>
                </section>

                {/* Footer */}
                <footer style={{ padding: '4rem 2rem', background: colors.primary, color: '#fff', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                        <div>
                            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '1rem' }}>{brandName}</h4>
                            <p style={{ opacity: 0.7, fontSize: '0.875rem' }}>{dsl.content.brand.tagline}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '3rem' }}>
                            <div>
                                <h5 style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Shop</h5>
                                <ul style={{ listStyle: 'none', fontSize: '0.875rem', opacity: 0.8, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <li>New Arrivals</li>
                                    <li>Best Sellers</li>
                                    <li>Sale</li>
                                </ul>
                            </div>
                            <div>
                                <h5 style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Help</h5>
                                <ul style={{ listStyle: 'none', fontSize: '0.875rem', opacity: 0.8, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <li>Contact</li>
                                    <li>Shipping</li>
                                    <li>Returns</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div style={{ maxWidth: '1400px', margin: '3rem auto 0', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '0.75rem', opacity: 0.6 }}>
                        © {new Date().getFullYear()} {brandName}. All rights reserved. | Privacy | Terms | Impressum
                    </div>
                </footer>
            </div>

            {/* Floating Back Button */}
            <a
                href="/builder"
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    padding: '1rem 1.5rem',
                    background: '#000',
                    color: '#fff',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    zIndex: 100,
                }}
            >
                ← Back to Builder
            </a>
        </>
    );
}
