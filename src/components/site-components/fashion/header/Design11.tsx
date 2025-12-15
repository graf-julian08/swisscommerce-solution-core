'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * Design 11: The Ultimate Luxury Header
 * 
 * BEST OF ALL DESIGNS:
 * - Clean Louis Vuitton-style layout (Menu/Search left, Logo center, Icons right)
 * - Smooth slide animations (no fades on panels, only on backdrop)
 * - Full-screen backdrop that covers everything
 * - Responsive with centered logo on all screens
 * - Mini-cart with product details
 * - Animated hamburger menu
 * - Search overlay with trending terms
 * - Proper z-index layering
 * 
 * ALL GUIDELINES FOLLOWED:
 * ✓ Slide animations only for panels (350-450ms)
 * ✓ Backdrop fade 400ms with pointer-events-none
 * ✓ Shadow fade on header (700ms with cubic-bezier)
 * ✓ Black on white aesthetic
 * ✓ Proper letter-spacing
 * ✓ Mobile: Logo centered with absolute positioning
 */

const navCategories = [
    { name: 'New In', links: ['Just Arrived', 'Trending Now', 'Editor\'s Picks', 'Coming Soon'] },
    { name: 'Women', links: ['Ready-to-Wear', 'Bags', 'Shoes', 'Accessories', 'Jewelry'] },
    { name: 'Men', links: ['Ready-to-Wear', 'Bags', 'Shoes', 'Accessories', 'Watches'] },
    { name: 'Maison', links: ['Heritage', 'Craftsmanship', 'Sustainability', 'Stores'] },
];

export default function LuxuryHeaderDesign11() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [hasScrolled, setHasScrolled] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [cartItems] = useState([
        { id: 1, name: 'Wool Silk Blend Coat', price: 3200, size: 'IT 42', color: 'Noir', image: '' },
        { id: 2, name: 'Leather Shoulder Bag', price: 2100, size: 'One Size', color: 'Camel', image: '' },
    ]);

    useEffect(() => {
        const handleScroll = () => setHasScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
        if (!isSearchOpen) {
            const timer = setTimeout(() => setSearchValue(''), 400);
            return () => clearTimeout(timer);
        }
    }, [isSearchOpen]);

    const fontStyle = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    const closeAll = () => {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
        setIsCartOpen(false);
    };

    return (
        <>
            {/* Main Header */}
            <header
                className={`fixed top-0 left-0 right-0 z-[50] bg-white transition-shadow duration-[700ms] ${hasScrolled ? 'shadow-[0_1px_0_rgba(0,0,0,0.08)]' : ''}`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
                {/* Desktop Layout */}
                <div className="hidden md:flex h-[64px] items-center justify-between px-8 lg:px-12">
                    {/* Left: Menu + Search */}
                    <div className="flex items-center gap-6 w-[200px]">
                        <button
                            className="flex items-center gap-2.5 text-black hover:opacity-50 transition-opacity"
                            onClick={() => { setIsMenuOpen(!isMenuOpen); setIsSearchOpen(false); setIsCartOpen(false); }}
                        >
                            <div className="relative w-[18px] h-[10px]">
                                <span className={`absolute top-0 left-0 w-full h-[1px] bg-black transition-all duration-[350ms] ${isMenuOpen ? 'rotate-45 top-[4.5px]' : ''}`} />
                                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-black transition-all duration-[350ms] ${isMenuOpen ? '-rotate-45 bottom-[4.5px]' : ''}`} />
                            </div>
                            <span className="text-[11px] tracking-[0.06em]" style={fontStyle}>Menu</span>
                        </button>

                        <button
                            className="flex items-center gap-2 text-black hover:opacity-50 transition-opacity"
                            onClick={() => { setIsSearchOpen(!isSearchOpen); setIsMenuOpen(false); setIsCartOpen(false); }}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1" />
                                <path d="M10.5 10.5L14.5 14.5" stroke="currentColor" strokeWidth="1" />
                            </svg>
                            <span className="text-[11px] tracking-[0.06em]" style={fontStyle}>Search</span>
                        </button>
                    </div>

                    {/* Center: Logo */}
                    <a href="#" className="absolute left-1/2 -translate-x-1/2">
                        <span className="text-[20px] tracking-[0.2em] text-black" style={fontStyle}>
                            MAISON
                        </span>
                    </a>

                    {/* Right: Icons */}
                    <div className="flex items-center gap-5 w-[200px] justify-end">
                        <a href="#" className="text-black hover:opacity-50 transition-opacity">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <circle cx="9" cy="5" r="3.5" stroke="currentColor" strokeWidth="1" />
                                <path d="M2 16.5C2 13 5 10.5 9 10.5C13 10.5 16 13 16 16.5" stroke="currentColor" strokeWidth="1" />
                            </svg>
                        </a>
                        <a href="#" className="text-black hover:opacity-50 transition-opacity">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M9 15.5L8.4 14.95C4.9 11.65 2.5 9.35 2.5 6.55C2.5 4.35 4.2 2.65 6.4 2.65C7.7 2.65 8.9 3.3 9 4.15C9.1 3.3 10.3 2.65 11.6 2.65C13.8 2.65 15.5 4.35 15.5 6.55C15.5 9.35 13.1 11.65 9.6 14.95L9 15.5Z" stroke="currentColor" strokeWidth="1" />
                            </svg>
                        </a>
                        <button
                            className="flex items-center gap-1.5 text-black hover:opacity-50 transition-opacity"
                            onClick={() => { setIsCartOpen(!isCartOpen); setIsMenuOpen(false); setIsSearchOpen(false); }}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M3 5H15L14 16H4L3 5Z" stroke="currentColor" strokeWidth="1" />
                                <path d="M6 5V4C6 2.34 7.34 1 9 1C10.66 1 12 2.34 12 4V5" stroke="currentColor" strokeWidth="1" />
                            </svg>
                            {cartItems.length > 0 && (
                                <span className="text-[10px]" style={fontStyle}>{cartItems.length}</span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="flex md:hidden h-[56px] items-center justify-between px-5 relative">
                    {/* Left: Menu + Search */}
                    <div className="flex items-center gap-4">
                        <button
                            className="flex items-center gap-2 text-black"
                            onClick={() => { setIsMenuOpen(!isMenuOpen); setIsSearchOpen(false); setIsCartOpen(false); }}
                        >
                            <div className="relative w-[18px] h-[10px]">
                                <span className={`absolute top-0 left-0 w-full h-[1px] bg-black transition-all duration-[350ms] ${isMenuOpen ? 'rotate-45 top-[4.5px]' : ''}`} />
                                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-black transition-all duration-[350ms] ${isMenuOpen ? '-rotate-45 bottom-[4.5px]' : ''}`} />
                            </div>
                        </button>
                        <button
                            className="text-black"
                            onClick={() => { setIsSearchOpen(!isSearchOpen); setIsMenuOpen(false); setIsCartOpen(false); }}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1" />
                                <path d="M10.5 10.5L14.5 14.5" stroke="currentColor" strokeWidth="1" />
                            </svg>
                        </button>
                    </div>

                    {/* Center: Logo - Absolutely centered */}
                    <a href="#" className="absolute left-1/2 -translate-x-1/2">
                        <span className="text-[16px] tracking-[0.2em] text-black" style={fontStyle}>
                            MAISON
                        </span>
                    </a>

                    {/* Right: Icons */}
                    <div className="flex items-center gap-4">
                        <button
                            className="flex items-center gap-1 text-black"
                            onClick={() => { setIsCartOpen(!isCartOpen); setIsMenuOpen(false); setIsSearchOpen(false); }}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M3 5H15L14 16H4L3 5Z" stroke="currentColor" strokeWidth="1" />
                                <path d="M6 5V4C6 2.34 7.34 1 9 1C10.66 1 12 2.34 12 4V5" stroke="currentColor" strokeWidth="1" />
                            </svg>
                            {cartItems.length > 0 && (
                                <span className="text-[10px]" style={fontStyle}>{cartItems.length}</span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Full-Screen Backdrop */}
            <div
                className={`fixed inset-0 bg-black/30 z-[55] transition-opacity duration-[400ms] ease-out ${isMenuOpen || isSearchOpen || isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeAll}
            />

            {/* Menu Panel - Slides from left */}
            <div
                className={`fixed top-0 left-0 h-full w-full sm:w-[380px] bg-white z-[60] transition-transform duration-[400ms] ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Menu Header */}
                <div className="h-[64px] md:h-[64px] px-6 flex items-center justify-between border-b border-black/5">
                    <span className="text-[11px] tracking-[0.1em] text-black/40" style={fontStyle}>Navigation</span>
                    <button
                        className="text-[11px] tracking-[0.06em] text-black/50 hover:text-black transition-colors"
                        style={fontStyle}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Close
                    </button>
                </div>

                {/* Menu Content */}
                <div className="p-6 overflow-y-auto" style={{ height: 'calc(100% - 64px)' }}>
                    <nav className="mb-10">
                        {navCategories.map((category) => (
                            <a
                                key={category.name}
                                href="#"
                                className="flex items-center justify-between py-4 text-[15px] text-black hover:opacity-50 transition-opacity border-b border-black/5"
                                style={fontStyle}
                            >
                                {category.name}
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-black/30">
                                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1" />
                                </svg>
                            </a>
                        ))}
                    </nav>

                    {/* Footer Links */}
                    <div className="space-y-4 pt-4">
                        <p className="text-[10px] tracking-[0.1em] text-black/30 mb-4" style={fontStyle}>Account & Help</p>
                        {['Sign In', 'Create Account', 'Contact Us', 'Store Locator', 'Shipping Info'].map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="block text-[12px] text-black hover:opacity-50 transition-opacity"
                                style={fontStyle}
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search Panel - Slides from top - Full width, unique layout */}
            <div
                className={`fixed top-0 left-0 right-0 bottom-0 sm:bottom-auto bg-white z-[60] transition-transform duration-[400ms] ease-out overflow-hidden ${isSearchOpen ? 'translate-y-0' : '-translate-y-full'}`}
                style={{ maxHeight: '100vh' }}
            >
                {/* Search Header - Fixed */}
                <div className="border-b border-black/5 flex-shrink-0">
                    <div className="px-6 lg:px-12 py-6">
                        <div className="flex items-center gap-4">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-black/30 flex-shrink-0">
                                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
                                <path d="M13 13L18 18" stroke="currentColor" strokeWidth="1" />
                            </svg>
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search for products, collections, stories..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="flex-1 text-[14px] lg:text-[20px] text-black bg-transparent outline-none placeholder-black/20"
                                style={{ ...fontStyle, fontWeight: 300 }}
                            />
                            <button
                                className="text-[11px] tracking-[0.06em] text-black/50 hover:text-black transition-colors"
                                style={fontStyle}
                                onClick={() => setIsSearchOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Content - Scrollable */}
                <div className="px-6 lg:px-12 py-10 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 90px)' }}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                        {/* Column 1: Trending Searches */}
                        <div>
                            <p className="text-[10px] tracking-[0.15em] text-black/40 mb-5" style={fontStyle}>
                                TRENDING SEARCHES
                            </p>
                            <div className="space-y-3">
                                {['New Collection', 'Winter Coats', 'Cashmere Knitwear', 'Leather Bags', 'Gift Guide', 'Sale'].map((term) => (
                                    <a
                                        key={term}
                                        href="#"
                                        className="block text-[14px] text-black hover:opacity-50 transition-opacity"
                                        style={fontStyle}
                                    >
                                        {term}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Popular Products */}
                        <div>
                            <p className="text-[10px] tracking-[0.15em] text-black/40 mb-5" style={fontStyle}>
                                POPULAR RIGHT NOW
                            </p>
                            <div className="space-y-4">
                                {[
                                    { name: 'Wool Blend Coat', price: '€ 2,450' },
                                    { name: 'Cashmere Sweater', price: '€ 890' },
                                    { name: 'Leather Tote Bag', price: '€ 1,650' },
                                ].map((product) => (
                                    <a
                                        key={product.name}
                                        href="#"
                                        className="flex items-center gap-4 group"
                                    >
                                        <div className="w-[60px] aspect-square bg-[#f5f5f5] flex-shrink-0 group-hover:bg-[#eee] transition-colors" />
                                        <div>
                                            <p className="text-[13px] text-black group-hover:opacity-50 transition-opacity" style={fontStyle}>{product.name}</p>
                                            <p className="text-[11px] text-black/40" style={fontStyle}>{product.price}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Column 3: Categories */}
                        <div>
                            <p className="text-[10px] tracking-[0.15em] text-black/40 mb-5" style={fontStyle}>
                                EXPLORE
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {['Women', 'Men', 'New In', 'Accessories', 'Sale', 'Gifts'].map((cat) => (
                                    <a
                                        key={cat}
                                        href="#"
                                        className="aspect-[4/3] bg-[#f5f5f5] flex items-center justify-center text-[12px] text-black hover:bg-[#eee] transition-colors"
                                        style={fontStyle}
                                    >
                                        {cat}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cart Panel - Slides from right */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[60] transition-transform duration-[450ms] ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Cart Header */}
                <div className="h-[64px] px-6 flex items-center justify-between border-b border-black/5">
                    <span className="text-[13px] text-black" style={fontStyle}>
                        Shopping Bag ({cartItems.length})
                    </span>
                    <button
                        className="text-[11px] tracking-[0.06em] text-black/50 hover:text-black transition-colors"
                        style={fontStyle}
                        onClick={() => setIsCartOpen(false)}
                    >
                        Close
                    </button>
                </div>

                {/* Cart Items */}
                <div className="p-6 overflow-y-auto" style={{ height: 'calc(100% - 200px)' }}>
                    {cartItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex gap-4 py-5 ${index < cartItems.length - 1 ? 'border-b border-black/5' : ''}`}
                        >
                            <div className="w-[90px] aspect-[3/4] bg-[#f5f5f5] flex-shrink-0" />
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <p className="text-[13px] text-black mb-1" style={fontStyle}>{item.name}</p>
                                    <p className="text-[11px] text-black/40" style={fontStyle}>
                                        {item.color} · {item.size}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-[13px] text-black" style={fontStyle}>
                                        € {item.price.toLocaleString()}
                                    </p>
                                    <button
                                        className="text-[10px] text-black/40 hover:text-black transition-colors underline"
                                        style={fontStyle}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cart Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-black/5 bg-white">
                    <div className="flex items-center justify-between mb-5">
                        <span className="text-[12px] text-black/50" style={fontStyle}>Subtotal</span>
                        <span className="text-[14px] text-black" style={fontStyle}>€ {total.toLocaleString()}</span>
                    </div>
                    <button
                        className="w-full h-[50px] bg-black text-white text-[11px] tracking-[0.1em] hover:bg-black/85 transition-colors"
                        style={fontStyle}
                    >
                        Checkout
                    </button>
                    <button
                        className="w-full h-[44px] mt-2 text-black text-[11px] tracking-[0.05em] hover:opacity-50 transition-opacity"
                        style={fontStyle}
                    >
                        View Shopping Bag
                    </button>
                </div>
            </div>

            {/* Spacer */}
            <div className="h-[64px] md:h-[64px]" />
        </>
    );
}
