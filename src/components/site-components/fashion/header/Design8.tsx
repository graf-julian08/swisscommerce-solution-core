'use client';

import React, { useState, useEffect } from 'react';

/**
 * Design 8: Editorial Split
 * 
 * COMPLETELY DIFFERENT APPROACH:
 * - Two-row header: Top utilities, bottom logo+nav
 * - Centered large logo with side navigation
 * - Full-screen overlay menu (slides from bottom!)
 * - Search expands inline in header
 * - Cart panel slides from bottom (different from right)
 * 
 * UNIQUE ANIMATIONS:
 * - Menu slides UP from bottom (translateY)
 * - Search input expands width with transition
 * - Cart slides up from bottom
 * - Staggered menu item animations
 */

const navItems = ['New', 'Women', 'Men', 'Objects', 'Stories'];

export default function LuxuryHeaderDesign8() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [cartCount] = useState(1);

    useEffect(() => {
        if (!isSearchExpanded) {
            const timer = setTimeout(() => setSearchValue(''), 400);
            return () => clearTimeout(timer);
        }
    }, [isSearchExpanded]);

    const fontStyle = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };

    return (
        <>
            {/* Top Bar - Utilities */}
            <div className="fixed top-0 left-0 right-0 z-[50] bg-white">
                <div className="h-[40px] px-6 sm:px-10 flex items-center justify-between border-b border-black/5">
                    {/* Left: Country/Language */}
                    <div className="flex items-center gap-4">
                        <span className="text-[11px] text-black/50" style={fontStyle}>EN</span>
                        <span className="text-[11px] text-black/30">|</span>
                        <span className="text-[11px] text-black/50" style={fontStyle}>CHF</span>
                    </div>

                    {/* Right: Account & Help */}
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-[11px] text-black/50 hover:text-black transition-colors" style={fontStyle}>
                            Account
                        </a>
                        <a href="#" className="text-[11px] text-black/50 hover:text-black transition-colors" style={fontStyle}>
                            Help
                        </a>
                    </div>
                </div>

                {/* Main Header Row */}
                <div className="h-[80px] px-6 sm:px-10 flex items-center justify-between">
                    {/* Left: Menu Button */}
                    <button
                        className="flex items-center gap-3 text-black"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {/* Animated Hamburger → X */}
                        <div className="relative w-[22px] h-[12px]">
                            <span className={`absolute top-0 left-0 w-full h-[1px] bg-black transition-all duration-[400ms] origin-center ${isMenuOpen ? 'rotate-45 top-1/2' : ''}`} />
                            <span className={`absolute top-1/2 -translate-y-1/2 left-0 w-full h-[1px] bg-black transition-all duration-[400ms] ${isMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-black transition-all duration-[400ms] origin-center ${isMenuOpen ? '-rotate-45 bottom-1/2' : ''}`} />
                        </div>
                        <span className="text-[12px] tracking-[0.05em] hidden sm:inline" style={fontStyle}>
                            Menu
                        </span>
                    </button>

                    {/* Center: Logo */}
                    <a href="#" className="absolute left-1/2 -translate-x-1/2">
                        <span className="text-[24px] sm:text-[32px] tracking-[0.2em] text-black" style={fontStyle}>
                            Atelier
                        </span>
                    </a>

                    {/* Right: Search + Cart */}
                    <div className="flex items-center gap-5">
                        {/* Search Icon */}
                        <button
                            className="text-black hover:opacity-50 transition-opacity"
                            onClick={() => setIsSearchExpanded(true)}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1" />
                                <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1" />
                            </svg>
                        </button>

                        {/* Cart */}
                        <button
                            className="flex items-center gap-1.5 text-black hover:opacity-50 transition-opacity"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M3.5 5.5H14.5L13.5 15.5H4.5L3.5 5.5Z" stroke="currentColor" strokeWidth="1" />
                                <path d="M6 5.5V4.5C6 2.84 7.34 1.5 9 1.5C10.66 1.5 12 2.84 12 4.5V5.5" stroke="currentColor" strokeWidth="1" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="text-[11px] text-black" style={fontStyle}>({cartCount})</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Search Overlay - Full width, instant show/hide */}
            <div
                className={`fixed top-[120px] left-0 right-0 bg-white z-[55] border-b border-black/10 ${isSearchExpanded ? 'block' : 'hidden'}`}
            >
                <div className="px-6 sm:px-10 py-6">
                    <div className="flex items-center gap-4 max-w-[600px] mx-auto">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-black/30 flex-shrink-0">
                            <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1" />
                            <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            autoFocus={isSearchExpanded}
                            className="flex-1 text-[16px] text-black bg-transparent outline-none placeholder-black/30"
                            style={fontStyle}
                        />
                        <button
                            className="text-[12px] text-black/50 hover:text-black transition-colors"
                            style={fontStyle}
                            onClick={() => setIsSearchExpanded(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>

            {/* Full-screen Menu - Slides UP from bottom */}
            <div
                className={`fixed inset-0 bg-white z-[45] transition-transform duration-[500ms] ease-out ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}
                style={{ top: '120px' }}
            >
                <div className="h-full overflow-y-auto">
                    <div className="max-w-[600px] mx-auto px-8 py-16">
                        {/* Main Navigation */}
                        <nav className="mb-16">
                            {navItems.map((item, index) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="block text-[36px] sm:text-[48px] text-black hover:opacity-40 transition-opacity py-4 border-b border-black/10"
                                    style={{
                                        ...fontStyle,
                                        fontWeight: 300,
                                        transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                                    }}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>

                        {/* Secondary Links */}
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <p className="text-[11px] text-black/30 tracking-[0.1em] mb-4" style={fontStyle}>
                                    Explore
                                </p>
                                {['Lookbook', 'Journal', 'About', 'Careers'].map((link) => (
                                    <a
                                        key={link}
                                        href="#"
                                        className="block text-[14px] text-black hover:opacity-50 transition-opacity"
                                        style={fontStyle}
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                            <div className="space-y-4">
                                <p className="text-[11px] text-black/30 tracking-[0.1em] mb-4" style={fontStyle}>
                                    Support
                                </p>
                                {['Shipping', 'Returns', 'Contact', 'FAQ'].map((link) => (
                                    <a
                                        key={link}
                                        href="#"
                                        className="block text-[14px] text-black hover:opacity-50 transition-opacity"
                                        style={fontStyle}
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cart Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 z-[80] transition-opacity duration-[400ms] ease-out ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Cart Panel - Slides UP from bottom (different!) */}
            <div
                className={`fixed bottom-0 left-0 right-0 bg-white z-[85] rounded-t-2xl transition-transform duration-[450ms] ease-out ${isCartOpen ? 'translate-y-0' : 'translate-y-full'}`}
                style={{ maxHeight: '85vh' }}
            >
                {/* Handle bar */}
                <div className="flex justify-center py-3">
                    <div className="w-[40px] h-[4px] bg-black/10 rounded-full" />
                </div>

                {/* Cart Header */}
                <div className="px-8 py-4 flex items-center justify-between border-b border-black/5">
                    <span className="text-[14px] text-black" style={fontStyle}>
                        Shopping Bag ({cartCount})
                    </span>
                    <button
                        className="text-[12px] text-black/50 hover:text-black transition-colors"
                        style={fontStyle}
                        onClick={() => setIsCartOpen(false)}
                    >
                        Close
                    </button>
                </div>

                {/* Cart Content */}
                <div className="px-8 py-6 max-h-[50vh] overflow-y-auto">
                    {/* Cart Item */}
                    <div className="flex gap-5 pb-6 border-b border-black/5">
                        <div className="w-[100px] aspect-[3/4] bg-[#f5f5f5] flex-shrink-0" />
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <p className="text-[14px] text-black mb-1" style={fontStyle}>
                                    Wool Blend Coat
                                </p>
                                <p className="text-[12px] text-black/40" style={fontStyle}>
                                    Black · Size M
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-[14px] text-black" style={fontStyle}>
                                    CHF 890
                                </p>
                                <button className="text-[11px] text-black/40 hover:text-black transition-colors" style={fontStyle}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cart Footer */}
                <div className="px-8 py-6 border-t border-black/5">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[13px] text-black/50" style={fontStyle}>Subtotal</span>
                        <span className="text-[15px] text-black" style={fontStyle}>CHF 890</span>
                    </div>
                    <button
                        className="w-full h-[52px] bg-black text-white text-[12px] tracking-[0.1em] hover:bg-black/85 transition-colors"
                        style={fontStyle}
                    >
                        Checkout
                    </button>
                    <button
                        className="w-full h-[48px] mt-2 text-black text-[12px] tracking-[0.05em] hover:opacity-50 transition-opacity"
                        style={fontStyle}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>

            {/* Spacer */}
            <div className="h-[120px]" />
        </>
    );
}
