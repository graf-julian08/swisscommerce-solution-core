'use client';

import React, { useState, useEffect } from 'react';

/**
 * Design 6: Editorial Split Header
 * 
 * UNIQUE APPROACH:
 * - Asymmetric split layout: Navigation left, Logo right
 * - Magazine/Editorial aesthetic (Vogue/Harper's Bazaar inspired)
 * - Floating menu button with animated hamburger → X
 * - Bold typography hierarchy
 * - All animations follow Design1 patterns (slide only, no fade)
 */

const navItems = ['New Season', 'Women', 'Men', 'Accessories', 'Beauty', 'Stories'];

export default function LuxuryHeaderDesign6() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Cashmere Coat', price: 3200, color: 'Camel' }
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

    const fontStyle = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };

    return (
        <>
            {/* Floating Menu Button - Always on top (like Design1) */}
            <button
                className="fixed top-0 left-0 h-[70px] pl-6 sm:pl-10 pr-4 flex items-center gap-2 text-black cursor-pointer z-[70] bg-transparent"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {/* Animated Icon: Hamburger → X */}
                <div className="relative w-[17px] h-[12px]">
                    {/* Top line - fades out */}
                    <span
                        className={`absolute top-0 left-0 w-full h-[1px] bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                    />
                    {/* Middle line 1 - rotates to form X */}
                    <span
                        className={`absolute top-1/2 -translate-y-1/2 left-0 w-full h-[1px] bg-black transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45' : ''}`}
                    />
                    {/* Middle line 2 - rotates opposite to form X */}
                    <span
                        className={`absolute top-1/2 -translate-y-1/2 left-0 w-full h-[1px] bg-black transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45' : ''}`}
                    />
                    {/* Bottom line - fades out */}
                    <span
                        className={`absolute bottom-0 left-0 w-full h-[1px] bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                    />
                </div>
                <span className="text-[11px] tracking-[0.12em] hidden sm:inline" style={fontStyle}>
                    Menu
                </span>
            </button>

            {/* Main Header */}
            <header className="fixed top-0 left-0 right-0 z-[50] bg-white border-b border-[#e5e5e5]">
                <div className="h-[70px] px-6 sm:px-10 flex items-center justify-between">

                    {/* Left: Spacer for floating menu button + Nav Preview */}
                    <div className="flex items-center gap-6">
                        {/* Spacer for floating menu button */}
                        <div className="w-[60px] hidden sm:block" />
                        <div className="w-[20px] sm:hidden" />

                        {/* Desktop Nav Preview - First 3 items */}
                        <nav className="hidden lg:flex items-center gap-6">
                            {navItems.slice(0, 3).map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="text-[11px] tracking-[0.08em] text-black hover:opacity-60 transition-opacity"
                                    style={fontStyle}
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Center: Logo - schwarzer Text */}
                    <a href="#" className="absolute left-1/2 -translate-x-1/2">
                        <span
                            className="text-[18px] uppercase sm:text-[22px] tracking-[0.2em] font-normal text-black"
                            style={fontStyle}
                        >
                            Atelier
                        </span>
                    </a>

                    {/* Right: Search + Icons */}
                    <div className="flex items-center gap-4 sm:gap-5">
                        {/* Search */}
                        <button
                            className="flex items-center gap-2 text-black hover:opacity-60 transition-opacity"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                            <span
                                className="text-[11px] tracking-[0.08em] hidden sm:inline"
                                style={fontStyle}
                            >
                                Search
                            </span>
                        </button>

                        {/* Wishlist */}
                        <button className="text-black hover:opacity-60 transition-opacity hidden sm:block">
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                <path d="M10 17L9.27 16.29C5.07 12.18 2.5 9.61 2.5 6.64C2.5 4.15 4.32 2.5 6.62 2.5C8.02 2.5 9.27 3.29 10 4.3C10.73 3.29 11.98 2.5 13.38 2.5C15.68 2.5 17.5 4.15 17.5 6.64C17.5 9.61 14.93 12.18 10.73 16.29L10 17Z" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                        </button>

                        {/* User */}
                        <button className="text-black hover:opacity-60 transition-opacity">
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="6" r="4" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M2 18C2 14.13 5.58 11 10 11C14.42 11 18 14.13 18 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                        </button>

                        {/* Cart - schwarzer Text */}
                        <button
                            className="text-black hover:opacity-60 transition-opacity relative flex items-center"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                <path d="M4 6H16L15 17H5L4 6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                                <path d="M7 6V5C7 3.34 8.34 2 10 2C11.66 2 13 3.34 13 5V6" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                            {cartItems.length > 0 && (
                                <span
                                    className="ml-1.5 text-[10px] font-medium text-black"
                                    style={fontStyle}
                                >
                                    {cartItems.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Backdrop - Fades in/out */}
            <div
                className={`fixed inset-0 bg-black/40 z-[55] transition-opacity duration-[400ms] ease-out ${isMenuOpen || isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => { setIsMenuOpen(false); setIsSearchOpen(false); }}
            />

            {/* Side Menu - Slides from left */}
            <div
                className={`fixed top-0 left-0 h-full w-full sm:w-[400px] bg-white z-[60] overflow-y-auto ${isMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full shadow-none'}`}
                style={{ transition: 'transform 300ms ease-out, box-shadow 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms' }}
            >
                {/* Menu Header - Empty space for floating button */}
                <div className="h-[70px]" />

                {/* Main Navigation */}
                <nav className="px-6 sm:px-10 py-4">
                    <ul className="space-y-5">
                        {navItems.map((item) => (
                            <li key={item}>
                                <a
                                    href="#"
                                    className="block text-[18px] tracking-[0.05em] text-black hover:opacity-60 transition-opacity"
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
                <div className="border-t border-[#e5e5e5] mx-6 sm:mx-10 mt-4" />

                {/* Secondary Links */}
                <div className="px-6 sm:px-10 py-8 space-y-4">
                    <a href="#" className="block text-[13px] tracking-[0.05em] text-black" style={fontStyle}>
                        My Account
                    </a>
                    <a href="#" className="block text-[13px] tracking-[0.05em] text-black" style={fontStyle}>
                        Wishlist
                    </a>
                    <a href="mailto:contact@atelier.com" className="block text-[13px] tracking-[0.05em] text-black" style={fontStyle}>
                        contact@atelier.com
                    </a>
                </div>

                {/* Divider */}
                <div className="border-t border-[#e5e5e5] mx-6 sm:mx-10" />

                {/* Legal Links */}
                <div className="px-6 sm:px-10 py-8 space-y-3">
                    {['Shipping & Returns', 'Terms of Service', 'Privacy Policy'].map((link) => (
                        <a
                            key={link}
                            href="#"
                            className="block text-[11px] tracking-[0.05em] text-black/50 hover:text-black transition-colors"
                            style={fontStyle}
                        >
                            {link}
                        </a>
                    ))}
                </div>
            </div>

            {/* Search Header - Slides from top */}
            <div
                className={`fixed top-0 left-0 right-0 h-[70px] bg-white z-[80] border-b border-[#e5e5e5] transition-transform duration-300 ease-out ${isSearchOpen ? 'translate-y-0' : '-translate-y-full'}`}
                style={{ transitionDelay: isSearchOpen ? '0ms' : '320ms' }}
            >
                <div className="h-full px-6 sm:px-10 flex items-center gap-4">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-black/40 flex-shrink-0">
                        <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        autoFocus={isSearchOpen}
                        className="flex-1 text-[15px] text-black bg-transparent outline-none placeholder-black/40"
                        style={fontStyle}
                    />
                    <button
                        className="flex items-center gap-2 text-black hover:opacity-60 transition-opacity"
                        onClick={() => setIsSearchOpen(false)}
                    >
                        <span className="text-[11px] tracking-[0.1em]" style={fontStyle}>Close</span>
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                            <path d="M4 4L16 16" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M16 4L4 16" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Search Content - Slides from top below header */}
            <div
                className={`fixed top-[70px] left-0 right-0 bg-white z-[79] transition-transform duration-[500ms] ease-out overflow-y-auto ${isSearchOpen ? 'translate-y-0' : '-translate-y-[calc(100%+70px)]'}`}
                style={{
                    height: 'calc(100vh - 120px)',
                    transitionDelay: isSearchOpen ? '175ms' : '0ms'
                }}
            >
                {/* Featured Products */}
                <div className="flex overflow-x-auto w-full" style={{ scrollbarWidth: 'none' }}>
                    {[
                        { name: 'Wool Blazer', price: '€ 1,890' },
                        { name: 'Silk Blouse', price: '€ 890' },
                        { name: 'Leather Bag', price: '€ 2,400' },
                        { name: 'Cashmere Scarf', price: '€ 450' },
                        { name: 'Gold Earrings', price: '€ 680' },
                        { name: 'Suede Boots', price: '€ 1,200' }
                    ].map((item) => (
                        <a key={item.name} href="#" className="group block flex-shrink-0 w-[calc(25%-12px)] min-w-[200px]">
                            <div className="aspect-[3/4] bg-[#f5f5f5]" />
                            <div className="p-4">
                                <p className="text-[12px] tracking-[0.02em] text-black" style={fontStyle}>
                                    {item.name}
                                </p>
                                <p className="text-[11px] tracking-[0.02em] text-black/50 mt-1" style={fontStyle}>
                                    {item.price}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Quick Links */}
                <div className="py-8 flex items-center justify-center gap-8 border-t border-[#f0f0f0]">
                    {['New Arrivals', 'Best Sellers', 'Gift Guide', 'Sale', 'Stores'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-[11px] tracking-[0.05em] text-black/60 hover:text-black transition-colors"
                            style={fontStyle}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>

            {/* Cart Backdrop - Fades in/out */}
            <div
                className={`fixed inset-0 bg-black/40 z-[85] transition-opacity duration-[400ms] ease-out ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Cart Panel - Slides from right */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[90] transition-transform duration-300 ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Cart Header - schwarzer Text */}
                <div className="h-[70px] px-8 flex items-center justify-between border-b border-[#e5e5e5]">
                    <span
                        className="text-[12px] tracking-[0.1em] text-black"
                        style={fontStyle}
                    >
                        Shopping Bag ({cartItems.length})
                    </span>
                    <button
                        className="flex items-center gap-2 text-black hover:opacity-60 transition-opacity"
                        onClick={() => setIsCartOpen(false)}
                    >
                        <span className="text-[11px] tracking-[0.1em]" style={fontStyle}>Close</span>
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                            <path d="M4 4L16 16" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M16 4L4 16" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                    </button>
                </div>

                {/* Cart Content */}
                <div className="flex flex-col h-[calc(100%-70px)]">
                    {cartItems.length > 0 ? (
                        <>
                            {/* Products */}
                            <div className="flex-1 overflow-y-auto p-8">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 pb-6 border-b border-[#f0f0f0] mb-6">
                                        <div className="w-[100px] aspect-[3/4] bg-[#f5f5f5] flex-shrink-0" />
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <p
                                                    className="text-[13px] tracking-[0.02em] text-black mb-1"
                                                    style={fontStyle}
                                                >
                                                    {item.name}
                                                </p>
                                                <p
                                                    className="text-[11px] tracking-[0.02em] text-black/50"
                                                    style={fontStyle}
                                                >
                                                    {item.color}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p
                                                    className="text-[13px] tracking-[0.02em] text-black"
                                                    style={fontStyle}
                                                >
                                                    € {item.price.toLocaleString()}
                                                </p>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-[11px] tracking-[0.02em] text-black/40 hover:text-black transition-colors"
                                                    style={fontStyle}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="p-8 border-t border-[#e5e5e5]">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[12px] tracking-[0.05em] text-black" style={fontStyle}>
                                        Total
                                    </span>
                                    <span className="text-[13px] tracking-[0.02em] text-black" style={fontStyle}>
                                        € {cartItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                                    </span>
                                </div>
                                <button
                                    className="w-full h-[50px] bg-black text-white text-[11px] tracking-[0.12em] hover:bg-black/90 transition-colors"
                                    style={fontStyle}
                                >
                                    Checkout
                                </button>
                                <button
                                    className="w-full h-[50px] mt-3 border border-black text-black text-[11px] tracking-[0.12em] hover:opacity-60 transition-opacity"
                                    style={fontStyle}
                                >
                                    View Bag
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <p className="text-[13px] tracking-[0.04em] text-black/40" style={fontStyle}>
                                Your bag is empty
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Spacer for fixed header */}
            <div className="h-[70px]" />
        </>
    );
}
