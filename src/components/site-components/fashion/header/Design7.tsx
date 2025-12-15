'use client';

import React, { useState, useEffect } from 'react';

/**
 * Design 7: Scandinavian Minimal (Acne Studios Inspired)
 * 
 * UNIQUE APPROACH:
 * - Ultra-minimalist, brutalist aesthetic
 * - Bold, blocky typography (all lowercase for modern feel)
 * - Text-based navigation (minimal icons)
 * - Stark white with high contrast black
 * - Clean horizontal layout
 * - All animations follow established patterns (slide only, no fade)
 */

const navItems = ['shop', 'woman', 'man', 'denim', 'accessories', 'journal'];

export default function LuxuryHeaderDesign7() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Relaxed Fit Jeans', price: 280, size: '32' }
    ]);

    const removeFromCart = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    // Clear search when overlay closes
    useEffect(() => {
        if (!isSearchOpen) {
            const timer = setTimeout(() => {
                setSearchValue('');
            }, 820);
            return () => clearTimeout(timer);
        }
    }, [isSearchOpen]);

    // Acne-style font - clean, modern sans-serif
    const fontStyle = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };

    return (
        <>
            {/* Floating Menu Button - Always on top */}
            <button
                className="fixed top-0 left-0 h-[60px] pl-5 sm:pl-8 pr-4 flex items-center gap-2.5 text-black cursor-pointer z-[70] bg-transparent"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {/* Animated Icon: Hamburger → X */}
                <div className="relative w-[18px] h-[10px]">
                    <span
                        className={`absolute top-0 left-0 w-full h-[1.5px] bg-black transition-all duration-[400ms] ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                    />
                    <span
                        className={`absolute top-1/2 -translate-y-1/2 left-0 w-full h-[1.5px] bg-black transition-all duration-[400ms] origin-center ${isMenuOpen ? 'rotate-45' : ''}`}
                    />
                    <span
                        className={`absolute top-1/2 -translate-y-1/2 left-0 w-full h-[1.5px] bg-black transition-all duration-[400ms] origin-center ${isMenuOpen ? '-rotate-45' : ''}`}
                    />
                    <span
                        className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-black transition-all duration-[400ms] ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                    />
                </div>
                <span className="text-[13px] lowercase hidden sm:inline" style={fontStyle}>
                    menu
                </span>
            </button>

            {/* Main Header */}
            <header className="fixed top-0 left-0 right-0 z-[50] bg-white">
                <div className="h-[60px] px-5 sm:px-8 flex items-center justify-between">

                    {/* Left: Spacer for floating menu */}
                    <div className="flex items-center">
                        <div className="w-[70px] sm:w-[90px]" />
                    </div>

                    {/* Center: Logo - bold, lowercase */}
                    <a href="#" className="absolute left-1/2 -translate-x-1/2">
                        <span
                            className="text-[16px] sm:text-[18px] font-medium tracking-[0.02em] lowercase text-black"
                            style={fontStyle}
                        >
                            studio
                        </span>
                    </a>

                    {/* Right: Text links (Acne style - text over icons) */}
                    <div className="flex items-center gap-5 sm:gap-6">
                        <button
                            className="text-[13px] lowercase text-black hover:opacity-50 transition-opacity"
                            style={fontStyle}
                            onClick={() => setIsSearchOpen(true)}
                        >
                            search
                        </button>
                        <a
                            href="#"
                            className="text-[13px] lowercase text-black hover:opacity-50 transition-opacity hidden sm:inline"
                            style={fontStyle}
                        >
                            account
                        </a>
                        <button
                            className="text-[13px] lowercase text-black hover:opacity-50 transition-opacity flex items-center gap-1"
                            style={fontStyle}
                            onClick={() => setIsCartOpen(true)}
                        >
                            bag
                            {cartItems.length > 0 && (
                                <span className="text-[13px] text-black">({cartItems.length})</span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Thin bottom border */}
                <div className="h-[1px] bg-black/10" />
            </header>

            {/* Backdrop - Fades in/out */}
            <div
                className={`fixed inset-0 bg-black/30 z-[55] transition-opacity duration-[400ms] ease-out ${isMenuOpen || isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => { setIsMenuOpen(false); setIsSearchOpen(false); }}
            />

            {/* Side Menu - Slides from left */}
            <div
                className={`fixed top-0 left-0 h-full w-full sm:w-[380px] bg-white z-[60] overflow-y-auto ${isMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full shadow-none'}`}
                style={{ transition: 'transform 350ms ease-out, box-shadow 700ms cubic-bezier(0.4, 0, 0.2, 1) 100ms' }}
            >
                {/* Menu Header - Space for floating button */}
                <div className="h-[60px]" />

                {/* Main Navigation - Large text, lowercase */}
                <nav className="px-5 sm:px-8 py-6">
                    <ul className="space-y-4">
                        {navItems.map((item) => (
                            <li key={item}>
                                <a
                                    href="#"
                                    className="block text-[24px] sm:text-[28px] lowercase text-black hover:opacity-50 transition-opacity"
                                    style={fontStyle}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Divider */}
                <div className="h-[1px] bg-black/10 mx-5 sm:mx-8" />

                {/* Secondary Links */}
                <div className="px-5 sm:px-8 py-6 space-y-3">
                    <a href="#" className="block text-[14px] lowercase text-black hover:opacity-50 transition-opacity" style={fontStyle}>
                        account
                    </a>
                    <a href="#" className="block text-[14px] lowercase text-black hover:opacity-50 transition-opacity" style={fontStyle}>
                        wishlist
                    </a>
                    <a href="#" className="block text-[14px] lowercase text-black hover:opacity-50 transition-opacity" style={fontStyle}>
                        stores
                    </a>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-black/10 mx-5 sm:mx-8" />

                {/* Footer Links */}
                <div className="px-5 sm:px-8 py-6 space-y-2">
                    {['shipping', 'returns', 'contact', 'careers'].map((link) => (
                        <a
                            key={link}
                            href="#"
                            className="block text-[12px] lowercase text-black/40 hover:text-black transition-colors"
                            style={fontStyle}
                        >
                            {link}
                        </a>
                    ))}
                </div>
            </div>

            {/* Search Header - Slides from top */}
            <div
                className={`fixed top-0 left-0 right-0 h-[60px] bg-white z-[80] transition-transform duration-[350ms] ease-out ${isSearchOpen ? 'translate-y-0' : '-translate-y-full'}`}
                style={{ transitionDelay: isSearchOpen ? '0ms' : '350ms' }}
            >
                <div className="h-full px-5 sm:px-8 flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        autoFocus={isSearchOpen}
                        className="flex-1 text-[16px] lowercase text-black bg-transparent outline-none placeholder-black/30"
                        style={fontStyle}
                    />
                    <button
                        className="text-[13px] lowercase text-black hover:opacity-50 transition-opacity"
                        style={fontStyle}
                        onClick={() => setIsSearchOpen(false)}
                    >
                        close
                    </button>
                </div>
                <div className="h-[1px] bg-black/10" />
            </div>

            {/* Search Content - Slides from top below header */}
            <div
                className={`fixed top-[61px] left-0 right-0 bg-white z-[79] transition-transform duration-[550ms] ease-out overflow-y-auto ${isSearchOpen ? 'translate-y-0' : '-translate-y-[calc(100%+61px)]'}`}
                style={{
                    height: 'calc(100vh - 120px)',
                    transitionDelay: isSearchOpen ? '200ms' : '0ms'
                }}
            >
                {/* Popular Searches - Text based */}
                <div className="px-5 sm:px-8 py-8">
                    <p className="text-[12px] lowercase text-black/40 mb-4" style={fontStyle}>
                        popular
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {['jeans', 't-shirts', 'jackets', 'knitwear', 'bags', 'shoes'].map((term) => (
                            <a
                                key={term}
                                href="#"
                                className="text-[15px] lowercase text-black hover:opacity-50 transition-opacity"
                                style={fontStyle}
                            >
                                {term}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="h-[1px] bg-black/10" />

                {/* Featured Products - Simple grid */}
                <div className="px-5 sm:px-8 py-8">
                    <p className="text-[12px] lowercase text-black/40 mb-6" style={fontStyle}>
                        featured
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { name: 'relaxed jeans', price: '€ 280' },
                            { name: 'logo t-shirt', price: '€ 120' },
                            { name: 'leather tote', price: '€ 450' },
                            { name: 'wool coat', price: '€ 890' }
                        ].map((item) => (
                            <a key={item.name} href="#" className="group block">
                                <div className="aspect-[3/4] bg-[#f2f2f2] mb-3" />
                                <p className="text-[13px] lowercase text-black" style={fontStyle}>
                                    {item.name}
                                </p>
                                <p className="text-[12px] lowercase text-black/50 mt-0.5" style={fontStyle}>
                                    {item.price}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cart Backdrop - Fades in/out */}
            <div
                className={`fixed inset-0 bg-black/30 z-[85] transition-opacity duration-[400ms] ease-out ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Cart Panel - Slides from right */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white z-[90] transition-transform duration-[350ms] ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Cart Header */}
                <div className="h-[60px] px-6 flex items-center justify-between">
                    <span className="text-[14px] lowercase text-black" style={fontStyle}>
                        bag ({cartItems.length})
                    </span>
                    <button
                        className="text-[13px] lowercase text-black hover:opacity-50 transition-opacity"
                        style={fontStyle}
                        onClick={() => setIsCartOpen(false)}
                    >
                        close
                    </button>
                </div>
                <div className="h-[1px] bg-black/10" />

                {/* Cart Content */}
                <div className="flex flex-col h-[calc(100%-61px)]">
                    {cartItems.length > 0 ? (
                        <>
                            {/* Products */}
                            <div className="flex-1 overflow-y-auto p-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 pb-6 border-b border-black/10 mb-6">
                                        <div className="w-[90px] aspect-[3/4] bg-[#f2f2f2] flex-shrink-0" />
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <p className="text-[14px] lowercase text-black mb-1" style={fontStyle}>
                                                    {item.name}
                                                </p>
                                                <p className="text-[12px] lowercase text-black/50" style={fontStyle}>
                                                    size {item.size}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-[14px] lowercase text-black" style={fontStyle}>
                                                    € {item.price}
                                                </p>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-[12px] lowercase text-black/40 hover:text-black transition-colors"
                                                    style={fontStyle}
                                                >
                                                    remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-black/10">
                                <div className="flex items-center justify-between mb-5">
                                    <span className="text-[13px] lowercase text-black" style={fontStyle}>
                                        total
                                    </span>
                                    <span className="text-[14px] lowercase text-black" style={fontStyle}>
                                        € {cartItems.reduce((sum, item) => sum + item.price, 0)}
                                    </span>
                                </div>
                                <button
                                    className="w-full h-[48px] bg-black text-white text-[13px] lowercase hover:bg-black/80 transition-colors"
                                    style={fontStyle}
                                >
                                    checkout
                                </button>
                                <button
                                    className="w-full h-[48px] mt-2 border border-black text-black text-[13px] lowercase hover:opacity-50 transition-opacity"
                                    style={fontStyle}
                                >
                                    view bag
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <p className="text-[14px] lowercase text-black/40" style={fontStyle}>
                                your bag is empty
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Spacer for fixed header */}
            <div className="h-[61px]" />
        </>
    );
}
