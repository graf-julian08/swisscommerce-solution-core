'use client';

import React, { useState, useEffect } from 'react';

export default function LuxuryHeaderDesign1() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Maison Silk Dress', price: 2450, size: 'M' }
    ]);

    const removeFromCart = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleCartClick = () => {
        if (cartItems.length > 0) {
            setIsCartOpen(!isCartOpen);
        }
    };

    // Clear search when overlay closes completely
    useEffect(() => {
        if (!isSearchOpen) {
            const timer = setTimeout(() => {
                setSearchValue('');
            }, 820); // Wait for animations to complete (320ms header delay + 500ms animation)
            return () => clearTimeout(timer);
        }
    }, [isSearchOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Background Cover - Transparent */}

            {/* Floating Menu Button - Always on top */}
            <button
                className="fixed top-0 left-0 h-[70px] pl-6 sm:pl-12 pr-4 flex items-center gap-2 text-black cursor-pointer z-[70] bg-transparent"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {/* Animated Icon: Hamburger / X */}
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
                <span className="text-[11px] tracking-[0.12em] hidden sm:inline" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                    Menu
                </span>
            </button>

            {/* Side Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 z-[55] transition-opacity duration-300 ${isMenuOpen || isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{ transitionDelay: (isMenuOpen || isSearchOpen) ? '0ms' : '300ms' }}
                onClick={() => { setIsMenuOpen(false); setIsSearchOpen(false); }}
            />

            {/* Side Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-1/4 min-w-[400px] bg-white z-[60] shadow-2xl transition-transform duration-300 ease-out overflow-y-auto ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#d1d5db transparent'
                }}
            >
                {/* Custom scrollbar styles */}
                <style>{`
                    .side-menu::-webkit-scrollbar { width: 4px; }
                    .side-menu::-webkit-scrollbar-track { background: transparent; }
                    .side-menu::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 2px; }
                    .side-menu::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
                `}</style>

                {/* Menu Header - empty space for the floating button */}
                <div className="h-[70px]" />

                {/* Menu Links */}
                <nav className="px-6 sm:px-12 py-4">
                    <ul className="space-y-5">
                        {['Gifts & Personalization', 'New Arrivals', 'Womenswear', 'Menswear', 'Jewelry & Watches', 'Fragrances', 'Art of Living', 'Services', 'The Maison'].map((item) => (
                            <li key={item}>
                                <a
                                    href="#"
                                    className="text-[18px] tracking-[0.08em] text-black hover:opacity-60 transition-opacity"
                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Account & Contact Section */}
                <div className="mt-8">
                    <div className="border-t border-[#e5e5e5]" />
                    <div className="px-6 sm:px-12 py-8 space-y-2">
                        <a
                            href="#"
                            className="block text-[13px] tracking-[0.08em] text-black"
                            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                        >
                            Access my account
                        </a>
                        <a
                            href="mailto:contact@shopname.com"
                            className="block text-[13px] tracking-[0.08em] text-black"
                            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                        >
                            contact@shopname.com
                        </a>
                    </div>
                    <div className="border-t border-[#e5e5e5]" />
                </div>

                {/* Legal Links */}
                <div className="px-6 sm:px-12 py-6 mt-auto">
                    <div className="space-y-3">
                        {['Impressum', 'Terms of Service', 'Privacy Policy', 'Shipping & Returns'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="block text-[12px] tracking-[0.06em] text-black"
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search Overlay - Two Part Slide */}

            {/* Search Header - Slides down over main header */}
            <div
                className={`fixed top-0 left-0 right-0 h-[70px] bg-white z-[80] border-b border-[#e5e5e5] transition-transform duration-300 ease-out ${isSearchOpen ? 'translate-y-0' : '-translate-y-full'}`}
                style={{ transitionDelay: isSearchOpen ? '0ms' : '320ms' }}
            >
                <div className="w-full px-6 sm:px-12 h-full flex items-center justify-between">
                    {/* Search Input - Same style as header */}
                    <div className="flex items-center gap-2">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black flex-shrink-0">
                            <circle cx="10.5" cy="10.5" r="7" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="text-[11px] tracking-[0.12em] text-black placeholder-gray-400 bg-transparent border-none outline-none w-[200px]"
                            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                        />
                    </div>

                    {/* Close Button - Right side */}
                    <button
                        className="flex items-center gap-2 text-black cursor-pointer flex-shrink-0"
                        onClick={() => setIsSearchOpen(false)}
                    >
                        <span className="text-[11px] tracking-[0.12em]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Close</span>
                        <div className="relative w-[14px] h-[14px]">
                            <span className="absolute top-1/2 left-0 w-full h-[1px] bg-black -translate-y-1/2 rotate-45" />
                            <span className="absolute top-1/2 left-0 w-full h-[1px] bg-black -translate-y-1/2 -rotate-45" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Search Content Panel - Large panel slides down below header */}
            <div
                className={`fixed top-[70px] left-0 right-0 bg-white z-[79] transition-transform duration-[500ms] ease-out overflow-y-auto ${isSearchOpen ? 'translate-y-0' : '-translate-y-[calc(100%+70px)]'}`}
                style={{
                    height: 'calc(100vh - 120px)',
                    transitionDelay: isSearchOpen ? '175ms' : '0ms'
                }}
            >
                {/* Featured Products Row 1 - Horizontal Scroll */}
                <div
                    className="flex overflow-x-auto w-full [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {[
                        { name: 'Maison Silk Dress', price: '€ 2,450' },
                        { name: 'Leather Tote', price: '€ 3,200' },
                        { name: 'Gold Pendant', price: '€ 1,850' },
                        { name: 'Eau de Maison', price: '€ 280' },
                        { name: 'Cashmere Wrap', price: '€ 890' },
                        { name: 'Gift Collection', price: '€ 450' }
                    ].map((item) => (
                        <a key={item.name} href="#" className="group block flex-shrink-0 w-[calc(25%-12px)] min-w-[200px]">
                            <div className="aspect-[3/4] bg-[#f5f5f5]" />
                            <div className="p-4">
                                <p className="text-[12px] tracking-[0.02em] text-black" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                    {item.name}
                                </p>
                                <p className="text-[11px] tracking-[0.02em] text-gray-500 mt-1" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                    {item.price}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Featured Products Row 2 - Horizontal Scroll */}
                <div
                    className="flex overflow-x-auto w-full [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {[
                        { name: 'Wool Coat', price: '€ 4,200' },
                        { name: 'Silk Blouse', price: '€ 1,150' },
                        { name: 'Diamond Ring', price: '€ 8,500' },
                        { name: 'Candle Set', price: '€ 180' },
                        { name: 'Leather Belt', price: '€ 590' },
                        { name: 'Sunglasses', price: '€ 420' }
                    ].map((item) => (
                        <a key={item.name} href="#" className="group block flex-shrink-0 w-[calc(25%-12px)] min-w-[200px]">
                            <div className="aspect-[3/4] bg-[#f5f5f5]" />
                            <div className="p-4">
                                <p className="text-[12px] tracking-[0.02em] text-black" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                    {item.name}
                                </p>
                                <p className="text-[11px] tracking-[0.02em] text-gray-500 mt-1" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                                    {item.price}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Footer links */}
                <div className="py-8 flex items-center justify-center gap-8 border-t border-[#f0f0f0]">
                    {['Need help?', 'Contact us', 'Store locator', 'Book appointment'].map((item, index) => (
                        <a
                            key={item}
                            href="#"
                            className="text-[11px] tracking-[0.04em] text-black hover:opacity-60 transition-opacity"
                            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div >

            <header
                className={`w-full fixed top-0 left-0 z-[50] transition-colors duration-300 ${isScrolled || isHovered ? 'bg-wh-500' : 'bg-transparent'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="w-full px-6 sm:px-12 h-[70px] flex justify-between items-center">

                    {/* Left: Menu + Search (Menu button is now floating, just show Search here) */}
                    <div className="flex items-center gap-5 flex-1">
                        {/* Spacer for menu button */}
                        <div className="w-[55px] hidden sm:block" />
                        <div className="w-[10px] sm:hidden" />
                        {/* Search */}
                        <button
                            className="flex items-center gap-2 text-black cursor-pointer"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10.5" cy="10.5" r="7" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            <span className="text-[11px] tracking-[0.12em] hidden sm:inline" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Search</span>
                        </button>
                    </div>

                    {/* Center: Brand */}
                    <div className="flex-shrink-0 absolute left-1/2 -translate-x-1/2">
                        <a href="#" className="block cursor-pointer">
                            <span
                                className="text-[15px] md:text-[19px] uppercase font-normal"
                                style={{
                                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                                    letterSpacing: '0.29em',
                                    color: '#19110b'
                                }}
                            >
                                ShopName
                            </span>
                        </a>
                    </div>

                    {/* Right: Contact + Icons */}
                    <div className="flex items-center justify-end gap-6 flex-1">
                        <a
                            href="#"
                            className="text-[11px] tracking-[0.12em] text-black cursor-pointer hidden md:inline"
                            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                        >
                            Contact Us
                        </a>

                        <div className="flex items-center gap-3 sm:gap-4">
                            {/* Heart/Wishlist */}
                            <button className="text-black cursor-pointer">
                                <svg width="17" height="16" viewBox="-0.5 -0.5 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 17L8.55 15.7C3.4 11.2 0.5 8.55 0.5 5.15C0.5 2.42 2.66 0.25 5.35 0.25C6.88 0.25 8.35 0.96 9.35 2.09L10 2.85L10.65 2.09C11.65 0.96 13.12 0.25 14.65 0.25C17.34 0.25 19.5 2.42 19.5 5.15C19.5 8.55 16.6 11.2 11.45 15.7L10 17Z" stroke="currentColor" strokeWidth="1.3" />
                                </svg>
                            </button>
                            {/* User */}
                            <button className="text-black cursor-pointer">
                                <svg width="15" height="17" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M1 21C1 16.5817 5.02944 13 10 13C14.9706 13 19 16.5817 19 21" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </button>
                            {/* Bag */}
                            <button
                                className={`text-black relative flex items-center ${cartItems.length > 0 ? 'cursor-pointer' : 'cursor-default'}`}
                                onClick={handleCartClick}
                            >
                                <svg width="15" height="17" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 5.5H15L16.5 17C16.6 17.8 16 18.5 15.2 18.5H2.8C2 18.5 1.4 17.8 1.5 17L3 5.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 5.5V4C6 2.34315 7.34315 1 9 1C10.6569 1 12 2.34315 12 4V5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                </svg>
                                {/* Badge - positioned to not overflow container */}
                                {cartItems.length > 0 && (
                                    <span
                                        className="ml-1 -mt-2 inline-flex items-center justify-center h-[13px] min-w-[12.5px] px-0.5 rounded-full bg-black text-white text-[9px] font-normal leading-none pb-[0.5px]"
                                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                    >
                                        {cartItems.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                </div>
            </header >

            {/* Cart Overlay */}
            < div
                className={`fixed inset-0 bg-black/40 z-[85] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
                }
                onClick={() => setIsCartOpen(false)}
            />

            {/* Cart Slide-out Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-[420px] bg-white z-[90] transition-transform duration-300 ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Cart Header */}
                <div className="h-[70px] px-8 flex items-center justify-between border-b border-[#e5e5e5]">
                    <span
                        className="text-[11px] tracking-[0.12em] text-black"
                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                    >
                        Shopping Bag ({cartItems.length})
                    </span>
                    <button
                        className="flex items-center gap-2 text-black cursor-pointer"
                        onClick={() => setIsCartOpen(false)}
                    >
                        <span className="text-[11px] tracking-[0.12em]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Close</span>
                        <div className="relative w-[14px] h-[14px]">
                            <span className="absolute top-1/2 left-0 w-full h-[1px] bg-black -translate-y-1/2 rotate-45" />
                            <span className="absolute top-1/2 left-0 w-full h-[1px] bg-black -translate-y-1/2 -rotate-45" />
                        </div>
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
                                        {/* Product Image */}
                                        <div className="w-[100px] aspect-[3/4] bg-[#f5f5f5] flex-shrink-0" />

                                        {/* Product Info */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <p
                                                    className="text-[12px] tracking-[0.02em] text-black mb-1"
                                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                                >
                                                    {item.name}
                                                </p>
                                                <p
                                                    className="text-[11px] tracking-[0.02em] text-gray-500"
                                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                                >
                                                    Size: {item.size}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p
                                                    className="text-[12px] tracking-[0.02em] text-black"
                                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                                >
                                                    € {item.price.toLocaleString()}
                                                </p>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-[11px] tracking-[0.02em] text-gray-400 hover:text-black transition-colors"
                                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer with Total and Button */}
                            <div className="p-6 border-t border-[#e5e5e5]">
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className="text-[12px] tracking-[0.04em] text-black ml-[2px]"
                                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                    >
                                        Total
                                    </span>
                                    <span
                                        className="text-[12px] tracking-[0.02em] text-black mr-[2px]"
                                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                    >
                                        € {cartItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                                    </span>
                                </div>
                                <button
                                    className="w-full h-[44px] bg-black text-white text-[11px] tracking-[0.1em] rounded-[4px] hover:bg-[#222] transition-colors"
                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                >
                                    Proceed to Shopping Bag
                                </button>
                            </div>
                        </>
                    ) : (
                        /* Empty State */
                        <div className="flex-1 flex items-center justify-center">
                            <p
                                className="text-[12px] tracking-[0.04em] text-gray-400"
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                            >
                                Your shopping bag is empty
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
