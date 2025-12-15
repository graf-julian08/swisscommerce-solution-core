'use client';

import React, { useState, useEffect } from 'react';

/**
 * Design 9: Classic Americana (Ralph Lauren Inspired)
 * 
 * UNIQUE APPROACH:
 * - Logo left, Nav center, Icons right
 * - Mega-dropdown navigation (not side menu)
 * - Full-width search overlay
 * - No mini-cart - just link to cart page
 * - Classic navy accent color option
 * - Underlined active nav items
 * 
 * DIFFERENT ANIMATIONS:
 * - Mega menu slides down from nav
 * - Search slides down with staggered content
 * - All follow slide-only rule
 */

const navItems = [
    { name: 'Women', links: ['New Arrivals', 'Clothing', 'Shoes', 'Bags', 'Accessories', 'Sale'] },
    { name: 'Men', links: ['New Arrivals', 'Clothing', 'Shoes', 'Bags', 'Accessories', 'Sale'] },
    { name: 'Children', links: ['Girls', 'Boys', 'Baby', 'Nursery', 'Gifts'] },
    { name: 'Home', links: ['Bedding', 'Bath', 'Dining', 'Decor', 'Gifts'] },
    { name: 'Gifts', links: ['For Her', 'For Him', 'For Kids', 'For Home', 'Under €100'] },
];

export default function LuxuryHeaderDesign9() {
    const [activeNav, setActiveNav] = useState<string | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (!isSearchOpen) {
            const timer = setTimeout(() => setSearchValue(''), 600);
            return () => clearTimeout(timer);
        }
    }, [isSearchOpen]);

    const fontStyle = { fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };
    const serifStyle = { fontFamily: "Georgia, 'Times New Roman', serif" };

    const closeAll = () => {
        setActiveNav(null);
        setIsSearchOpen(false);
    };

    return (
        <>
            {/* Promo Bar */}
            <div className="bg-[#1a2238] text-white h-[36px] flex items-center justify-center px-4">
                <p className="text-[11px] tracking-[0.05em]" style={fontStyle}>
                    Complimentary Shipping on All Orders · <a href="#" className="underline">Details</a>
                </p>
            </div>

            {/* Main Header */}
            <header className="fixed top-[36px] left-0 right-0 z-[50] bg-white border-b border-[#e8e8e8]">
                <div className="h-[70px] px-6 sm:px-10 flex items-center">

                    {/* Left: Logo */}
                    <a href="#" className="flex-shrink-0">
                        <span
                            className="text-[18px] sm:text-[22px] tracking-[0.25em] text-[#1a2238]"
                            style={serifStyle}
                        >
                            MAISON
                        </span>
                    </a>

                    {/* Center: Navigation */}
                    <nav className="hidden lg:flex items-center justify-center flex-1 gap-8">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                className={`relative text-[12px] tracking-[0.1em] text-[#1a2238] py-2 transition-opacity hover:opacity-60 ${activeNav === item.name ? 'opacity-60' : ''}`}
                                style={fontStyle}
                                onMouseEnter={() => setActiveNav(item.name)}
                            >
                                {item.name}
                                {/* Underline indicator */}
                                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#1a2238] transition-transform duration-300 origin-left ${activeNav === item.name ? 'scale-x-100' : 'scale-x-0'}`} />
                            </button>
                        ))}
                    </nav>

                    {/* Right: Icons */}
                    <div className="flex items-center gap-5 ml-auto">
                        {/* Search */}
                        <button
                            className="text-[#1a2238] hover:opacity-60 transition-opacity"
                            onClick={() => { setIsSearchOpen(true); setActiveNav(null); }}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                        </button>

                        {/* Account */}
                        <a href="#" className="text-[#1a2238] hover:opacity-60 transition-opacity hidden sm:block">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="6" r="4" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M2 18C2 14.13 5.58 11 10 11C14.42 11 18 14.13 18 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                        </a>

                        {/* Wishlist */}
                        <a href="#" className="text-[#1a2238] hover:opacity-60 transition-opacity hidden sm:block">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 17L9.27 16.29C5.07 12.18 2.5 9.61 2.5 6.64C2.5 4.15 4.32 2.5 6.62 2.5C8.02 2.5 9.27 3.29 10 4.3C10.73 3.29 11.98 2.5 13.38 2.5C15.68 2.5 17.5 4.15 17.5 6.64C17.5 9.61 14.93 12.18 10.73 16.29L10 17Z" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                        </a>

                        {/* Cart - Link only, no mini-cart */}
                        <a href="/cart" className="text-[#1a2238] hover:opacity-60 transition-opacity flex items-center gap-1.5">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 6H16L15 17H5L4 6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                                <path d="M7 6V5C7 3.34 8.34 2 10 2C11.66 2 13 3.34 13 5V6" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                            <span className="text-[11px] text-[#1a2238]" style={fontStyle}>(2)</span>
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden text-[#1a2238]"
                            onClick={() => setActiveNav(activeNav ? null : 'mobile')}
                        >
                            <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
                                <path d="M1 1H21" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M1 7H21" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M1 13H21" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 z-[45] transition-opacity duration-[400ms] ease-out ${activeNav || isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{ top: '106px' }}
                onClick={closeAll}
                onMouseEnter={closeAll}
            />

            {/* Mega Menu - Slides down */}
            <div
                className={`fixed top-[106px] left-0 right-0 bg-white z-[48] border-b border-[#e8e8e8] transition-all duration-[350ms] ease-out overflow-hidden ${activeNav && activeNav !== 'mobile' ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
                onMouseLeave={() => setActiveNav(null)}
            >
                <div className="max-w-[1400px] mx-auto px-10 py-10">
                    <div className="flex gap-16">
                        {/* Left: Category Links */}
                        <div className="w-[180px] flex-shrink-0">
                            <p className="text-[11px] tracking-[0.1em] text-black/40 mb-5" style={fontStyle}>
                                Categories
                            </p>
                            <ul className="space-y-3">
                                {navItems.find(n => n.name === activeNav)?.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-[13px] text-[#1a2238] hover:opacity-60 transition-opacity"
                                            style={fontStyle}
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Featured Images */}
                        <div className="flex-1 grid grid-cols-4 gap-5">
                            {[1, 2, 3, 4].map((i) => (
                                <a key={i} href="#" className="group">
                                    <div className="aspect-[3/4] bg-[#f5f5f5] mb-3 overflow-hidden">
                                        <div className="w-full h-full bg-[#e8e8e8] group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <p className="text-[12px] text-[#1a2238]" style={fontStyle}>
                                        Collection {i}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Overlay - Slides down */}
            <div
                className={`fixed top-[106px] left-0 right-0 bottom-0 sm:bottom-auto bg-white z-[49] border-b border-[#e8e8e8] transition-all duration-[400ms] ease-out ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                <div className="max-w-[900px] mx-auto px-6 py-10 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
                    {/* Search Input */}
                    <div className="flex items-center gap-4 border-b border-[#1a2238] pb-3 mb-8">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#1a2238]/40">
                            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            autoFocus={isSearchOpen}
                            className="flex-1 text-[18px] text-[#1a2238] bg-transparent outline-none placeholder-[#1a2238]/30"
                            style={fontStyle}
                        />
                        <button
                            className="text-[12px] text-[#1a2238]/50 hover:text-[#1a2238] transition-colors"
                            style={fontStyle}
                            onClick={() => setIsSearchOpen(false)}
                        >
                            Close
                        </button>
                    </div>

                    {/* Trending */}
                    <div className="mb-10">
                        <p className="text-[11px] tracking-[0.1em] text-black/40 mb-4" style={fontStyle}>
                            Trending Searches
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {['Cashmere', 'Polo Shirts', 'Coats', 'Gifts', 'Knitwear'].map((term) => (
                                <a
                                    key={term}
                                    href="#"
                                    className="px-4 py-2 border border-[#e8e8e8] text-[12px] text-[#1a2238] hover:border-[#1a2238] transition-colors"
                                    style={fontStyle}
                                >
                                    {term}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Popular Categories */}
                    <div>
                        <p className="text-[11px] tracking-[0.1em] text-black/40 mb-5" style={fontStyle}>
                            Popular Categories
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {['Women', 'Men', 'Children', 'Home'].map((cat) => (
                                <a key={cat} href="#" className="group relative aspect-[4/5] bg-[#f5f5f5] overflow-hidden">
                                    <div className="absolute inset-0 bg-[#e8e8e8] group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                                    <div className="absolute bottom-4 left-4">
                                        <p className="text-[14px] text-white font-medium" style={fontStyle}>{cat}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Slides from right */}
            <div
                className={`fixed top-[106px] right-0 bottom-0 w-full sm:w-[350px] bg-white z-[48] transition-transform duration-[350ms] ease-out lg:hidden ${activeNav === 'mobile' ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-6 overflow-y-auto h-full">
                    {/* Close */}
                    <div className="flex justify-end mb-6">
                        <button
                            className="text-[12px] text-[#1a2238]/50 hover:text-[#1a2238] transition-colors"
                            style={fontStyle}
                            onClick={() => setActiveNav(null)}
                        >
                            Close
                        </button>
                    </div>

                    {/* Nav Items */}
                    <nav className="space-y-5">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href="#"
                                className="block text-[16px] text-[#1a2238] hover:opacity-60 transition-opacity"
                                style={fontStyle}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    <div className="h-[1px] bg-[#e8e8e8] my-8" />

                    {/* Secondary Links */}
                    <div className="space-y-4">
                        <a href="#" className="block text-[13px] text-[#1a2238]" style={fontStyle}>Account</a>
                        <a href="#" className="block text-[13px] text-[#1a2238]" style={fontStyle}>Wishlist</a>
                        <a href="#" className="block text-[13px] text-[#1a2238]" style={fontStyle}>Store Locator</a>
                    </div>
                </div>
            </div>

            {/* Spacer */}
            <div className="h-[106px]" />
        </>
    );
}
