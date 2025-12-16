// src/components/shop/ShopRenderer.tsx
// Renders a complete shop from DSL configuration

'use client';

import React from 'react';
import type { WebsiteDSL } from '@/dsl/schema/website.schema';

interface ShopRendererProps {
    dsl: WebsiteDSL;
    shopName: string;
    shopSlug: string;
}

export function ShopRenderer({ dsl, shopName, shopSlug }: ShopRendererProps) {
    const { design, content, globalComponents } = dsl;
    const tokens = design?.tokens;

    // Extract colors from design tokens
    const colors = tokens?.colors || {
        primary: '#000000',
        secondary: '#333333',
        accent: '#666666',
        background: '#ffffff',
        foreground: '#000000',
        muted: '#f5f5f5',
    };

    // Extract typography
    const typography = tokens?.typography || {
        fontFamily: {
            heading: 'Inter',
            body: 'Inter',
        },
    };

    // Hero content
    const hero = content?.hero || {
        headline: shopName,
        subheadline: 'Welcome to our shop',
        ctaText: 'Shop Now',
        ctaLink: '/shop',
    };

    // Brand info
    const brand = content?.brand || {
        name: shopName,
        tagline: '',
        description: '',
    };

    // Header navigation
    const headerNav = globalComponents?.header?.elements?.navigation || [
        { label: 'Shop', href: '/shop' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ];

    return (
        <div
            className="min-h-screen"
            style={{
                fontFamily: `${typography.fontFamily.body}, sans-serif`,
                backgroundColor: colors.background,
                color: colors.foreground,
            }}
        >
            {/* Header */}
            <header
                className="fixed top-0 left-0 right-0 z-50 border-b"
                style={{
                    backgroundColor: colors.background,
                    borderColor: colors.muted,
                }}
            >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <a
                        href="/"
                        className="text-xl font-medium tracking-tight"
                        style={{ fontFamily: `${typography.fontFamily.heading}, sans-serif` }}
                    >
                        {brand.name}
                    </a>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {headerNav.map((item: { label: string; href: string }, i: number) => (
                            <a
                                key={i}
                                href={item.href}
                                className="text-sm hover:opacity-70 transition-opacity"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button className="text-sm hover:opacity-70 transition-opacity">
                            Search
                        </button>
                        <button className="text-sm hover:opacity-70 transition-opacity">
                            Cart (0)
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section
                className="min-h-screen flex items-center justify-center pt-16"
                style={{
                    backgroundColor: colors.primary,
                    color: colors.background,
                }}
            >
                <div className="text-center max-w-4xl mx-auto px-6">
                    {/* Eyebrow */}
                    <p className="text-sm tracking-widest uppercase mb-6 opacity-70">
                        {brand.tagline || 'Discover'}
                    </p>

                    {/* Headline */}
                    <h1
                        className="text-5xl md:text-7xl font-light mb-6 leading-tight"
                        style={{ fontFamily: `${typography.fontFamily.heading}, sans-serif` }}
                    >
                        {hero.headline}
                    </h1>

                    {/* Subheadline */}
                    {hero.subheadline && (
                        <p className="text-lg md:text-xl opacity-80 mb-10 max-w-2xl mx-auto">
                            {hero.subheadline}
                        </p>
                    )}

                    {/* CTA */}
                    <a
                        href={hero.ctaLink}
                        className="inline-block px-8 py-4 border-2 text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-colors"
                        style={{ borderColor: colors.background }}
                    >
                        {hero.ctaText}
                    </a>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2
                        className="text-3xl md:text-4xl font-light text-center mb-16"
                        style={{ fontFamily: `${typography.fontFamily.heading}, sans-serif` }}
                    >
                        Featured Products
                    </h2>

                    {/* Product Grid - Placeholder */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="group cursor-pointer">
                                <div
                                    className="aspect-[3/4] mb-4"
                                    style={{ backgroundColor: colors.muted }}
                                >
                                    <div className="w-full h-full flex items-center justify-center text-sm opacity-50">
                                        Product {i}
                                    </div>
                                </div>
                                <h3 className="text-sm font-medium mb-1">Product Name</h3>
                                <p className="text-sm opacity-70">CHF 199.00</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section
                className="py-24 px-6"
                style={{ backgroundColor: colors.muted }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2
                        className="text-3xl md:text-4xl font-light mb-8"
                        style={{ fontFamily: `${typography.fontFamily.heading}, sans-serif` }}
                    >
                        About {brand.name}
                    </h2>
                    <p className="text-lg leading-relaxed opacity-80">
                        {brand.description || `${brand.name} is dedicated to providing exceptional products with uncompromising quality and timeless design.`}
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="py-16 px-6 border-t"
                style={{ borderColor: colors.muted }}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        {/* Brand */}
                        <div>
                            <h4
                                className="text-lg font-medium mb-4"
                                style={{ fontFamily: `${typography.fontFamily.heading}, sans-serif` }}
                            >
                                {brand.name}
                            </h4>
                            <p className="text-sm opacity-70">
                                {brand.tagline}
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <h5 className="text-sm font-medium mb-4 uppercase tracking-wider">Shop</h5>
                            <ul className="space-y-2 text-sm opacity-70">
                                <li><a href="/shop">All Products</a></li>
                                <li><a href="/new">New Arrivals</a></li>
                                <li><a href="/sale">Sale</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-sm font-medium mb-4 uppercase tracking-wider">Help</h5>
                            <ul className="space-y-2 text-sm opacity-70">
                                <li><a href="/contact">Contact</a></li>
                                <li><a href="/shipping">Shipping</a></li>
                                <li><a href="/returns">Returns</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-sm font-medium mb-4 uppercase tracking-wider">Legal</h5>
                            <ul className="space-y-2 text-sm opacity-70">
                                <li><a href="/privacy">Privacy</a></li>
                                <li><a href="/terms">Terms</a></li>
                                <li><a href="/impressum">Impressum</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-sm opacity-50 pt-8 border-t" style={{ borderColor: colors.muted }}>
                        © {new Date().getFullYear()} {brand.name}. All rights reserved.
                        <br />
                        <span className="text-xs">Powered by SwissCommerce Solution</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
