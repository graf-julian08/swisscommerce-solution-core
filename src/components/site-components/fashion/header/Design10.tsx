'use client';

import React, { useState, useEffect } from 'react';

/**
 * Design 10: Architectural Grid
 * 
 * SUPER UNIQUE APPROACH:
 * - CSS Grid-based asymmetric layout
 * - Split-screen cart (left content dimmed, right cart)
 * - Vertical line separators
 * - Centered logo with asymmetric nav
 * - Search replaces header content (morph animation)
 * - Ultra-thin borders throughout
 * 
 * GUIDELINES FOLLOWED:
 * - Slide animations only for panels
 * - Backdrop fade 400ms
 * - No uppercase for most text
 * - Black text for contrast
 */

const navItems = ['Collection', 'Women', 'Men', 'World'];

export default function LuxuryHeaderDesign10() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [cartItems] = useState([
        { id: 1, name: 'Cashmere Wrap Coat', price: 2450, size: 'M', color: 'Noir' },
        { id: 2, name: 'Silk Blend Shirt', price: 890, size: 'S', color: 'Ivory' }
    ]);

    useEffect(() => {
        if (!isSearchMode) {
            const timer = setTimeout(() => setSearchValue(''), 500);
            return () => clearTimeout(timer);
        }
    }, [isSearchMode]);

    const fontStyle = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <>
            {/* Main Header - Grid Layout */}
            <header className="fixed top-0 left-0 right-0 z-[50] bg-white">
                {/* Mobile Layout */}
                <div className="h-[72px] lg:hidden flex items-center justify-between border-b border-black/10 relative">
                    {/* Left: Menu */}
                    <button
                        className="h-full px-5 flex items-center gap-3 border-r border-black/10"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div className="relative w-[18px] h-[12px]">
                            <span className={`absolute top-0 left-0 w-full h-[1px] bg-black transition-all duration-[350ms] ${isMenuOpen ? 'rotate-45 top-1/2' : ''}`} />
                            <span className={`absolute top-1/2 -translate-y-1/2 left-0 w-full h-[1px] bg-black transition-all duration-[350ms] ${isMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-black transition-all duration-[350ms] ${isMenuOpen ? '-rotate-45 bottom-1/2' : ''}`} />
                        </div>
                        <span className="text-[11px] tracking-[0.08em] text-black" style={fontStyle}>
                            Menu
                        </span>
                    </button>

                    {/* Center: Logo - Absolutely centered */}
                    <a href="#" className="absolute left-1/2 -translate-x-1/2">
                        <span className="text-[18px] tracking-[0.15em] text-black" style={fontStyle}>
                            Atelier
                        </span>
                    </a>

                    {/* Right: Icons */}
                    <div className="h-full flex items-center border-l border-black/10">
                        <button className="h-full px-4 flex items-center" onClick={() => setIsSearchMode(true)}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <circle cx="7.5" cy="7.5" r="5.5" stroke="black" strokeWidth="1" />
                                <path d="M12 12L16 16" stroke="black" strokeWidth="1" />
                            </svg>
                        </button>
                        <button className="h-full px-4 flex items-center gap-1.5 border-l border-black/10" onClick={() => setIsCartOpen(true)}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M3 5H15L14 16H4L3 5Z" stroke="black" strokeWidth="1" />
                                <path d="M6 5V4C6 2.34 7.34 1 9 1C10.66 1 12 2.34 12 4V5" stroke="black" strokeWidth="1" />
                            </svg>
                            {cartItems.length > 0 && (
                                <span className="text-[10px] text-black" style={fontStyle}>{cartItems.length}</span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Desktop Grid Layout */}
                <div className="h-[72px] hidden lg:grid grid-cols-[auto_1fr_auto_1fr_auto] items-center border-b border-black/10">

                    {/* Left: Menu */}
                    <button
                        className="h-full px-8 flex items-center gap-3 border-r border-black/10 hover:bg-black/[0.02] transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div className="relative w-[18px] h-[12px]">
                            <span className={`absolute top-0 left-0 w-full h-[1px] bg-black transition-all duration-[350ms] ${isMenuOpen ? 'rotate-45 top-1/2' : ''}`} />
                            <span className={`absolute top-1/2 -translate-y-1/2 left-0 w-full h-[1px] bg-black transition-all duration-[350ms] ${isMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-black transition-all duration-[350ms] ${isMenuOpen ? '-rotate-45 bottom-1/2' : ''}`} />
                        </div>
                        <span className="text-[11px] tracking-[0.08em] text-black" style={fontStyle}>
                            Menu
                        </span>
                    </button>

                    {/* Left Nav */}
                    <div className="flex items-center justify-end px-8 gap-8">
                        {navItems.slice(0, 2).map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-[11px] tracking-[0.08em] text-black/70 hover:text-black transition-colors"
                                style={fontStyle}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Center: Logo */}
                    <a href="#" className="h-full px-8 flex items-center justify-center border-x border-black/10">
                        <span className="text-[22px] tracking-[0.15em] text-black" style={fontStyle}>
                            Atelier
                        </span>
                    </a>

                    {/* Right Nav */}
                    <div className="flex items-center px-8 gap-8">
                        {navItems.slice(2).map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-[11px] tracking-[0.08em] text-black/70 hover:text-black transition-colors"
                                style={fontStyle}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Right: Icons */}
                    <div className="h-full flex items-center border-l border-black/10">
                        <button
                            className="h-full px-6 flex items-center hover:bg-black/[0.02] transition-colors"
                            onClick={() => setIsSearchMode(true)}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <circle cx="7.5" cy="7.5" r="5.5" stroke="black" strokeWidth="1" />
                                <path d="M12 12L16 16" stroke="black" strokeWidth="1" />
                            </svg>
                        </button>
                        <button
                            className="h-full px-6 flex items-center gap-2 border-l border-black/10 hover:bg-black/[0.02] transition-colors"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M3 5H15L14 16H4L3 5Z" stroke="black" strokeWidth="1" />
                                <path d="M6 5V4C6 2.34 7.34 1 9 1C10.66 1 12 2.34 12 4V5" stroke="black" strokeWidth="1" />
                            </svg>
                            {cartItems.length > 0 && (
                                <span className="text-[10px] text-black" style={fontStyle}>
                                    {cartItems.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Search Mode - Replaces header content */}
                <div
                    className={`absolute inset-0 h-[72px] bg-white z-[60] flex items-center px-6 sm:px-8 transition-all duration-[300ms] ${isSearchMode ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-black/30 flex-shrink-0">
                        <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1" />
                        <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for products, collections..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        autoFocus={isSearchMode}
                        className="flex-1 ml-4 text-[14px] text-black bg-transparent outline-none placeholder-black/30"
                        style={fontStyle}
                    />
                    <button
                        className="text-[11px] tracking-[0.08em] text-black/50 hover:text-black transition-colors"
                        style={fontStyle}
                        onClick={() => setIsSearchMode(false)}
                    >
                        Close
                    </button>
                </div>
            </header>

            {/* Menu Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 z-[55] transition-opacity duration-[400ms] ease-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel - Slides from left */}
            <div
                className={`fixed top-0 left-0 h-full w-full sm:w-[420px] bg-white z-[60] transition-transform duration-[400ms] ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Menu Header */}
                <div className="h-[72px] px-8 flex items-center justify-between border-b border-black/10">
                    <span className="text-[11px] tracking-[0.1em] text-black/50" style={fontStyle}>
                        Navigation
                    </span>
                    <button
                        className="text-[11px] tracking-[0.08em] text-black/50 hover:text-black transition-colors"
                        style={fontStyle}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Close
                    </button>
                </div>

                {/* Menu Content */}
                <div className="p-8 overflow-y-auto" style={{ height: 'calc(100% - 72px)' }}>
                    <nav className="space-y-1 mb-12">
                        {['New Arrivals', 'Collection', 'Women', 'Men', 'Accessories', 'World'].map((item, index) => (
                            <a
                                key={item}
                                href="#"
                                className="flex items-center justify-between py-4 text-[18px] text-black hover:opacity-50 transition-opacity border-b border-black/5"
                                style={{ ...fontStyle, fontWeight: 300 }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                                <span className="text-[10px] text-black/30" style={fontStyle}>0{index + 1}</span>
                            </a>
                        ))}
                    </nav>

                    {/* Footer Links Grid */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <p className="text-[10px] text-black/30 tracking-[0.1em]" style={fontStyle}>Account</p>
                            {['Sign In', 'Register', 'Orders', 'Wishlist'].map((link) => (
                                <a key={link} href="#" className="block text-[12px] text-black hover:opacity-50 transition-opacity" style={fontStyle}>
                                    {link}
                                </a>
                            ))}
                        </div>
                        <div className="space-y-3">
                            <p className="text-[10px] text-black/30 tracking-[0.1em]" style={fontStyle}>Help</p>
                            {['Contact', 'Shipping', 'Returns', 'FAQ'].map((link) => (
                                <a key={link} href="#" className="block text-[12px] text-black hover:opacity-50 transition-opacity" style={fontStyle}>
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Split-Screen Cart - RIGHT SIDE ONLY */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[50%] lg:w-[40%] bg-white z-[70] transition-transform duration-[450ms] ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Cart Header */}
                <div className="h-[72px] px-8 flex items-center justify-between border-b border-black/10">
                    <span className="text-[14px] text-black" style={fontStyle}>
                        Shopping Bag
                    </span>
                    <div className="flex items-center gap-4">
                        <span className="text-[11px] text-black/40" style={fontStyle}>
                            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                        </span>
                        <button
                            className="text-[11px] tracking-[0.08em] text-black/50 hover:text-black transition-colors"
                            style={fontStyle}
                            onClick={() => setIsCartOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="p-8 overflow-y-auto" style={{ height: 'calc(100% - 200px)' }}>
                    {cartItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex gap-5 py-6 ${index < cartItems.length - 1 ? 'border-b border-black/5' : ''}`}
                        >
                            {/* Product Image */}
                            <div className="w-[100px] aspect-[3/4] bg-[#f5f5f5] flex-shrink-0" />

                            {/* Product Details */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <p className="text-[13px] text-black mb-1" style={fontStyle}>{item.name}</p>
                                    <p className="text-[11px] text-black/40" style={fontStyle}>
                                        {item.color} · Size {item.size}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-[13px] text-black" style={fontStyle}>
                                        € {item.price.toLocaleString()}
                                    </p>
                                    <button className="text-[10px] text-black/30 hover:text-black transition-colors" style={fontStyle}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cart Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-black/10 bg-white">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[12px] text-black/50" style={fontStyle}>Total</span>
                        <span className="text-[15px] text-black" style={fontStyle}>€ {total.toLocaleString()}</span>
                    </div>
                    <button
                        className="w-full h-[50px] bg-black text-white text-[11px] tracking-[0.1em] hover:bg-black/85 transition-colors"
                        style={fontStyle}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>

            {/* Cart Backdrop - Full screen */}
            <div
                className={`fixed inset-0 bg-black/30 z-[65] transition-opacity duration-[400ms] ease-out ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Spacer */}
            <div className="h-[72px]" />
        </>
    );
}
