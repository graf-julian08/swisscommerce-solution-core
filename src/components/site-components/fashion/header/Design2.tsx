'use client';

import React, { useState, useEffect } from 'react';

// Menu data structure
const menuData = {
    'Gifts': {
        type: 'featured',
        images: [
            '/products/gift1.jpg',
            '/products/gift2.jpg',
            '/products/gift3.jpg',
            '/products/gift4.jpg',
        ],
        links: [
            { title: 'Gifts', items: ['Gifts for Her', 'Gifts for Him', 'Accessories', 'Fragrances'] }
        ]
    },
    'Women': {
        type: 'links',
        columns: [
            { title: 'Collections', items: ['New Arrivals', 'Holiday Collection', 'Autumn/Winter 2025', 'Exclusives'] },
            { title: 'Clothing', items: ['Outerwear', 'Jackets & Coats', 'Shirts', 'T-Shirts', 'Denim', 'Knitwear', 'Dresses', 'Trousers'] },
            { title: 'Bags', items: ['Shoulder Bags', 'Tote Bags', 'Crossbody Bags', 'Clutches'] },
            { title: 'Leather Goods', items: ['Wallets', 'Card Holders', 'Pouches'] },
            { title: 'Shoes', items: ['Sneakers', 'Loafers', 'Sandals', 'Heels', 'Boots'] },
            { title: 'Accessories', items: ['Hats & Gloves', 'Sunglasses', 'Belts', 'Scarves', 'Jewelry'] }
        ]
    },
    'Men': {
        type: 'links',
        columns: [
            { title: 'Collections', items: ['New Arrivals', 'Holiday Collection', 'Autumn/Winter 2025', 'Exclusives'] },
            { title: 'Clothing', items: ['Outerwear', 'Jackets & Coats', 'Shirts', 'T-Shirts', 'Denim', 'Knitwear', 'Trousers'] },
            { title: 'Bags', items: ['Briefcases', 'Backpacks', 'Messenger Bags', 'Travel Bags'] },
            { title: 'Leather Goods', items: ['Wallets', 'Card Holders', 'Pouches'] },
            { title: 'Shoes', items: ['Sneakers', 'Loafers', 'Derby', 'Boots'] },
            { title: 'Accessories', items: ['Hats & Gloves', 'Sunglasses', 'Belts', 'Ties', 'Watches'] }
        ]
    },
    'Bags': {
        type: 'links',
        columns: [
            { title: 'Women', items: ['Shoulder Bags', 'Tote Bags', 'Crossbody Bags', 'Clutches', 'Mini Bags'] },
            { title: 'Men', items: ['Briefcases', 'Backpacks', 'Messenger Bags', 'Travel Bags'] },
            { title: 'Collections', items: ['New Arrivals', 'Icons', 'Nylon Collection'] }
        ]
    },
    'Linea Rossa': {
        type: 'featured',
        images: [
            '/products/linea1.jpg',
            '/products/linea2.jpg',
        ],
        links: [
            { title: 'Collections', items: ['New Arrivals', 'Sportswear'] },
            { title: 'Categories', items: ['Sneakers', 'Apparel', 'Accessories'] }
        ]
    },
    'Fine Jewelry': {
        type: 'featured',
        images: [
            '/products/jewelry1.jpg',
            '/products/jewelry2.jpg',
        ],
        links: [
            { title: 'Collections', items: ['Eternal Gold', 'Couleur Vivante'] },
            { title: 'Categories', items: ['Bracelets', 'Necklaces', 'Rings', 'Earrings'] }
        ]
    },
    'Home': {
        type: 'links',
        columns: [
            { title: 'Categories', items: ['Décor', 'Tableware', 'Textiles', 'Fragrances'] }
        ]
    },
    'Fragrances': {
        type: 'featured',
        images: [
            '/products/fragrance1.jpg',
            '/products/fragrance2.jpg',
        ],
        links: [
            { title: 'Categories', items: ['For Her', 'For Him', 'Gift Sets'] }
        ]
    }
};

const navItems = ['Gifts', 'Women', 'Men', 'Bags', 'Linea Rossa', 'Fine Jewelry', 'Home', 'Fragrances'];

export default function LuxuryHeaderDesign2() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isPromoClosed, setIsPromoClosed] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Slingback Pumps in Patent Leather', color: 'Blossom Pink', size: '36', price: 1090 }
    ]);

    const removeFromCart = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleCartClick = () => {
        if (cartItems.length > 0) {
            setIsCartOpen(!isCartOpen);
        }
    };

    const handleMenuEnter = (item: string) => {
        setActiveMenu(item);
    };

    const handleMenuLeave = () => {
        setActiveMenu(null);
    };

    return (
        <>
            {/* Promo Bar */}
            {!isPromoClosed && (
                <div className="w-full bg-black py-2.5 px-4 flex items-center justify-center relative">
                    <p
                        className="text-[11px] tracking-[0.04em] text-white text-center"
                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                    >
                        Complimentary shipping and returns extended until January 31, 2026.
                    </p>
                    <button
                        className="absolute right-4 text-white hover:opacity-60 transition-opacity"
                        onClick={() => setIsPromoClosed(true)}
                    >
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Main Header */}
            <header
                className="w-full bg-white border-b border-[#e5e5e5] relative z-[100]"
                onMouseLeave={handleMenuLeave}
            >
                <div className="w-full px-5 sm:px-6 lg:px-8 h-[56px] flex items-center justify-between">

                    {/* Left - Hamburger (mobile) + Logo */}
                    <div className="flex items-center gap-4">
                        {/* Hamburger - Mobile only */}
                        <button
                            className="lg:hidden text-black hover:opacity-60 transition-opacity"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1H19M1 7H19M1 13H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>

                        {/* Logo */}
                        <a href="#" className="flex-shrink-0">
                            <span
                                className="text-[18px] sm:text-[22px] font-medium tracking-[0.12em] text-black"
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                            >
                                MAISON
                            </span>
                        </a>
                    </div>

                    {/* Navigation - Desktop only */}
                    <nav className="hidden lg:flex flex-1 items-center justify-center gap-6 ml-8">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href="#"
                                className={`text-[11px] tracking-[0.08em] uppercase transition-all border-b mt-0.5 ${activeMenu === item ? 'text-black border-black' : 'text-black border-transparent hover:border-black'}`}
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", paddingBottom: '2px' }}
                                onMouseEnter={() => handleMenuEnter(item)}
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* Icons - Right */}
                    <div className="flex items-center gap-3 sm:gap-5">
                        {/* Search */}
                        <button
                            className="text-black hover:opacity-60 transition-opacity"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10.5" cy="10.5" r="7" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </button>
                        {/* User - Hidden on mobile */}
                        <button className="hidden sm:block text-black hover:opacity-60 transition-opacity">
                            <svg width="16" height="18" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M1 21C1 16.5817 5.02944 13 10 13C14.9706 13 19 16.5817 19 21" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </button>
                        {/* Wishlist - now visible on mobile too */}
                        <button className="text-black hover:opacity-60 transition-opacity relative">
                            <svg width="18" height="17" viewBox="-0.5 -0.5 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 17L8.55 15.7C3.4 11.2 0.5 8.55 0.5 5.15C0.5 2.42 2.66 0.25 5.35 0.25C6.88 0.25 8.35 0.96 9.35 2.09L10 2.85L10.65 2.09C11.65 0.96 13.12 0.25 14.65 0.25C17.34 0.25 19.5 2.42 19.5 5.15C19.5 8.55 16.6 11.2 11.45 15.7L10 17Z" stroke="currentColor" strokeWidth="1.3" />
                            </svg>
                            {/* Wishlist indicator dot */}
                            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        </button>
                        {/* Bag */}
                        <button
                            className={`text-black relative ${cartItems.length > 0 ? 'cursor-pointer hover:opacity-60' : 'cursor-default'} transition-opacity`}
                            onClick={handleCartClick}
                        >
                            <svg width="16" height="18" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5.5H15L16.5 17C16.6 17.8 16 18.5 15.2 18.5H2.8C2 18.5 1.4 17.8 1.5 17L3 5.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 5.5V4C6 2.34315 7.34315 1 9 1C10.6569 1 12 2.34315 12 4V5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                            </svg>
                            {cartItems.length > 0 && (
                                <span
                                    className="absolute -top-1.5 -right-2 text-[10px] text-black"
                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                >
                                    {cartItems.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mega Menu Dropdown - Desktop only */}
                {activeMenu && (
                    <div
                        className="hidden lg:block absolute top-full left-0 right-0 bg-white border-b border-[#e5e5e5] z-[99] shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                        onMouseEnter={() => setActiveMenu(activeMenu)}
                        onMouseLeave={handleMenuLeave}
                    >
                        <div className="w-full px-8 py-8">

                            {/* GIFTS - 2x2 Grid + Links */}
                            {activeMenu === 'Gifts' && (
                                <div className="flex gap-12">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="w-[200px] aspect-square bg-gradient-to-br from-pink-200 to-pink-300 cursor-pointer hover:opacity-90 transition-opacity" />
                                        <div className="w-[200px] aspect-[4/3] bg-gradient-to-br from-amber-100 to-amber-200 cursor-pointer hover:opacity-90 transition-opacity" />
                                        <div className="w-[200px] aspect-[4/3] bg-gradient-to-br from-blue-200 to-blue-300 cursor-pointer hover:opacity-90 transition-opacity" />
                                        <div className="w-[200px] aspect-square bg-gradient-to-br from-rose-100 to-rose-200 cursor-pointer hover:opacity-90 transition-opacity" />
                                    </div>
                                    <div className="ml-8">
                                        <p className="text-[11px] tracking-[0.04em] text-black font-medium mb-4 uppercase" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Geschenke</p>
                                        <div className="space-y-2.5">
                                            {['Geschenke für Sie', 'Geschenke für Ihn', 'Anhänger', 'Düfte'].map((item) => (
                                                <a key={item} href="#" className="block text-[12px] tracking-[0.02em] text-gray-700 hover:text-black transition-colors" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{item}</a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* BAGS - Product Grid + Hero + Links */}
                            {activeMenu === 'Bags' && (
                                <div className="flex gap-8">
                                    <div className="grid grid-cols-4 gap-2">
                                        <div className="w-[120px] aspect-square bg-[#f5f5f5] cursor-pointer hover:opacity-90 transition-opacity" />
                                        <div className="w-[120px] aspect-square bg-[#f8f8f8] cursor-pointer hover:opacity-90 transition-opacity" />
                                        <div className="w-[120px] aspect-square bg-[#f5f5f5] cursor-pointer hover:opacity-90 transition-opacity" />
                                        <div className="w-[120px] aspect-square bg-[#f8f8f8] cursor-pointer hover:opacity-90 transition-opacity" />
                                        <div className="w-[120px] aspect-square bg-[#f8f8f8] cursor-pointer hover:opacity-90 transition-opacity" />
                                        <div className="w-[120px] aspect-square bg-[#f5f5f5] cursor-pointer hover:opacity-90 transition-opacity" />
                                        <div className="w-[120px] aspect-square bg-[#f8f8f8] cursor-pointer hover:opacity-90 transition-opacity" />
                                        <div className="w-[120px] aspect-square bg-[#f5f5f5] cursor-pointer hover:opacity-90 transition-opacity" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-[11px] tracking-[0.04em] text-black font-medium mb-4 uppercase" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Kollektionen</p>
                                        <div className="space-y-2.5">
                                            {['Galleria', 'Explore', 'Petit Sac Noir', 'Bonnie', 'Re-Edition'].map((item) => (
                                                <a key={item} href="#" className="block text-[12px] tracking-[0.02em] text-gray-700 hover:text-black transition-colors" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{item}</a>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-[280px] aspect-[4/3] bg-gradient-to-br from-emerald-800 to-emerald-900 cursor-pointer hover:opacity-90 transition-opacity" />
                                    <div>
                                        <p className="text-[11px] tracking-[0.04em] text-black font-medium mb-4 uppercase" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Damentaschen</p>
                                        <div className="space-y-2.5">
                                            {['Umhängetaschen', 'Henkeltaschen', 'Tragetaschen', 'Minitaschen', 'Rucksäcke'].map((item) => (
                                                <a key={item} href="#" className="block text-[12px] tracking-[0.02em] text-gray-700 hover:text-black transition-colors" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{item}</a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* LINEA ROSSA - Large Hero Left + Stacked Images + Links */}
                            {activeMenu === 'Linea Rossa' && (
                                <div className="flex gap-8">
                                    <div className="w-[320px] aspect-[3/4] bg-gradient-to-br from-slate-200 to-slate-300 cursor-pointer hover:opacity-90 transition-opacity" />
                                    <div className="flex flex-col gap-3">
                                        <div className="w-[180px] aspect-[4/3] bg-gradient-to-br from-stone-100 to-stone-200 cursor-pointer hover:opacity-90 transition-opacity" />
                                        <div className="w-[180px] aspect-[4/3] bg-gradient-to-br from-zinc-700 to-zinc-800 cursor-pointer hover:opacity-90 transition-opacity" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-[11px] tracking-[0.04em] text-black font-medium mb-4 uppercase" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Linea Rossa</p>
                                        <div className="space-y-2.5">
                                            {['Herrenkollektion', 'Damenkollektion', 'AC-Personalisierung', 'Sonnenbrillen', 'Düfte'].map((item) => (
                                                <a key={item} href="#" className="block text-[12px] tracking-[0.02em] text-gray-700 hover:text-black transition-colors" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{item}</a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* FINE JEWELRY - Portrait + Links + Large Product */}
                            {activeMenu === 'Fine Jewelry' && (
                                <div className="flex gap-8 items-start">
                                    <div className="w-[260px] aspect-[3/4] bg-gradient-to-br from-rose-50 to-rose-100 cursor-pointer hover:opacity-90 transition-opacity" />
                                    <div>
                                        <p className="text-[11px] tracking-[0.04em] text-black font-medium mb-4 uppercase" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Kollektionen</p>
                                        <div className="space-y-2.5">
                                            {['Couleur Vivante', 'Eternal Gold'].map((item) => (
                                                <a key={item} href="#" className="block text-[12px] tracking-[0.02em] text-gray-700 hover:text-black transition-colors" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{item}</a>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-[320px] aspect-[16/9] bg-gradient-to-br from-amber-200 to-amber-300 cursor-pointer hover:opacity-90 transition-opacity" />
                                    <div>
                                        <p className="text-[11px] tracking-[0.04em] text-black font-medium mb-4 uppercase" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Kategorien</p>
                                        <div className="space-y-2.5">
                                            {['Armbänder', 'Halsketten', 'Ringe', 'Ohrringe und Broschen'].map((item) => (
                                                <a key={item} href="#" className="block text-[12px] tracking-[0.02em] text-gray-700 hover:text-black transition-colors" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{item}</a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* FRAGRANCES - Perfume bottles + Links */}
                            {activeMenu === 'Fragrances' && (
                                <div className="flex gap-8 items-start">
                                    <div className="w-[220px] aspect-[3/4] bg-gradient-to-br from-rose-100 via-rose-50 to-white cursor-pointer hover:opacity-90 transition-opacity" />
                                    <div className="w-[180px] aspect-square bg-gradient-to-br from-emerald-800 to-emerald-900 cursor-pointer hover:opacity-90 transition-opacity" />
                                    <div>
                                        <p className="text-[11px] tracking-[0.04em] text-black font-medium mb-4 uppercase" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Kategorien</p>
                                        <div className="space-y-2.5">
                                            {['Für Sie', 'Für Ihn', 'Geschenksets', 'Reisegrößen'].map((item) => (
                                                <a key={item} href="#" className="block text-[12px] tracking-[0.02em] text-gray-700 hover:text-black transition-colors" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{item}</a>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-[160px] aspect-[3/4] bg-gradient-to-br from-amber-100 to-amber-200 cursor-pointer hover:opacity-90 transition-opacity" />
                                </div>
                            )}

                            {/* WOMEN / MEN / HOME - Multi-column links */}
                            {['Women', 'Men', 'Home'].includes(activeMenu) && (() => {
                                const data = menuData[activeMenu as keyof typeof menuData];
                                if (data && 'columns' in data && data.columns) {
                                    return (
                                        <div className="flex gap-16">
                                            {data.columns.map((column: { title: string; items: string[] }, idx: number) => (
                                                <div key={idx} className="min-w-[140px]">
                                                    <p className="text-[11px] tracking-[0.04em] text-black font-medium mb-4 uppercase" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{column.title}</p>
                                                    <div className="space-y-2.5">
                                                        {column.items.map((item: string) => (
                                                            <a key={item} href="#" className="block text-[12px] tracking-[0.02em] text-gray-700 hover:text-black transition-colors" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>{item}</a>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }
                                return null;
                            })()}

                            {/* Close button - always visible */}
                            <button
                                className="absolute top-6 right-8 text-black hover:opacity-60 transition-opacity"
                                onClick={() => setActiveMenu(null)}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`lg:hidden fixed inset-0 bg-black/40 z-[150] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Slide */}
            <div
                className={`lg:hidden fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[160] ${isMobileMenuOpen ? 'block' : 'hidden'}`}
            >
                {/* Mobile Menu Header */}
                <div className="h-[56px] px-6 flex items-center justify-between border-b border-[#e5e5e5]">
                    <a href="#" className="flex-shrink-0">
                        <span
                            className="text-[18px] font-medium tracking-[0.12em] text-black uppercase"
                            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", letterSpacing: '0.15em' }}
                        >
                            MAISON
                        </span>
                    </a>
                    <button
                        className="text-black hover:opacity-60 transition-opacity"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Categories with chevrons */}
                    <div className="py-6">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="flex items-center justify-between px-6 py-5 text-[14px] tracking-[0.08em] text-black uppercase border-b border-[#f0f0f0]"
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item}
                                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        ))}
                    </div>

                    {/* Footer links with icons */}
                    <div className="px-6 py-8 space-y-5">
                        <a href="#" className="flex items-center gap-4 text-[13px] tracking-[0.02em] text-black" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                            <svg width="18" height="20" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
                                <path d="M1 21C1 16.5817 5.02944 13 10 13C14.9706 13 19 16.5817 19 21" stroke="currentColor" strokeWidth="1.3" />
                            </svg>
                            <span>Anmelden <span className="text-gray-500">oder</span> Konto erstellen</span>
                        </a>
                        <a href="#" className="flex items-center gap-4 text-[13px] tracking-[0.02em] text-black" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                            <svg width="18" height="17" viewBox="-0.5 -0.5 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 17L8.55 15.7C3.4 11.2 0.5 8.55 0.5 5.15C0.5 2.42 2.66 0.25 5.35 0.25C6.88 0.25 8.35 0.96 9.35 2.09L10 2.85L10.65 2.09C11.65 0.96 13.12 0.25 14.65 0.25C17.34 0.25 19.5 2.42 19.5 5.15C19.5 8.55 16.6 11.2 11.45 15.7L10 17Z" stroke="currentColor" strokeWidth="1.3" />
                            </svg>
                            Wishlist
                        </a>
                        <a href="#" className="flex items-center gap-4 text-[13px] tracking-[0.02em] text-black" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5.5H15L16.5 17C16.6 17.8 16 18.5 15.2 18.5H2.8C2 18.5 1.4 17.8 1.5 17L3 5.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 5.5V4C6 2.34315 7.34315 1 9 1C10.6569 1 12 2.34315 12 4V5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                            </svg>
                            Warenkorb
                        </a>
                        <a href="#" className="flex items-center gap-4 text-[13px] tracking-[0.02em] text-black" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.3604 7.08377C10.5227 7.57145 10.3023 8.1062 9.84149 8.33685L7.61227 9.44146C8.70059 12.1074 10.8926 14.2994 13.5585 15.3877L14.6632 13.1585C14.8938 12.6977 15.4286 12.4773 15.9162 12.6396L19.3162 13.7721C19.7246 13.9082 20 14.2903 20 14.7208V18C20 19.1046 19.1046 20 18 20H17C9.26801 20 3 13.732 3 6V5Z" stroke="currentColor" strokeWidth="1.3" />
                            </svg>
                            Hilfe
                        </a>
                    </div>
                </div>
            </div>

            {/* Search Overlay - Instant, no animation */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-white z-[200]">
                    {/* Search Header */}
                    <div className="w-full px-4 sm:px-8 py-4 sm:py-6 border-b border-[#e5e5e5]">
                        <div className="flex items-center justify-between gap-4">
                            <input
                                type="text"
                                placeholder="Auf maison.com suchen"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                autoFocus
                                className="flex-1 text-[14px] tracking-[0.02em] text-black placeholder-gray-400 bg-transparent border-none outline-none"
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                            />
                            <button
                                className="text-[11px] tracking-[0.08em] uppercase text-black hover:opacity-60 transition-opacity"
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                onClick={() => { setIsSearchOpen(false); setSearchValue(''); }}
                            >
                                Schliessen
                            </button>
                        </div>
                    </div>

                    {/* Quick Links - Responsive */}
                    <div className="w-full px-4 sm:px-8 py-6 sm:py-8 border-b border-[#e5e5e5]">
                        <div className="flex flex-col sm:flex-row gap-8 sm:gap-32">
                            <div>
                                <p
                                    className="text-[11px] tracking-[0.04em] text-black font-medium mb-4 uppercase"
                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                >
                                    Kollektionen
                                </p>
                                <div className="space-y-2.5">
                                    {['Geschenke', 'Sport Collection'].map((item) => (
                                        <a
                                            key={item}
                                            href="#"
                                            className="block text-[12px] tracking-[0.02em] text-gray-700 hover:text-black transition-colors"
                                            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p
                                    className="text-[11px] tracking-[0.04em] text-black font-medium mb-4 uppercase"
                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                >
                                    Highlights
                                </p>
                                <div className="space-y-2.5">
                                    {['Neuheiten Für Ihn', 'Neuheiten Für Sie'].map((item) => (
                                        <a
                                            key={item}
                                            href="#"
                                            className="block text-[12px] tracking-[0.02em] text-gray-700 hover:text-black transition-colors"
                                            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 z-[110] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Cart Slide-out Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[120] transition-transform duration-300 ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Cart Header */}
                <div className="h-[56px] px-6 flex items-center justify-between border-b border-[#e5e5e5]">
                    <span
                        className="text-[12px] tracking-[0.04em] text-black"
                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                    >
                        Your Selection ({cartItems.length})
                    </span>
                    <button
                        className="text-black hover:opacity-60 transition-opacity"
                        onClick={() => setIsCartOpen(false)}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    </button>
                </div>

                {/* Cart Content */}
                <div className="flex flex-col h-[calc(100%-56px)]">
                    {cartItems.length > 0 ? (
                        <>
                            {/* Products */}
                            <div className="flex-1 overflow-y-auto p-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-5 pb-6 mb-6 border-b border-[#f0f0f0]">
                                        {/* Product Image */}
                                        <div className="w-[100px] aspect-square bg-[#f5f5f5] flex-shrink-0" />

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <p
                                                className="text-[12px] tracking-[0.02em] text-black font-medium mb-2"
                                                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                            >
                                                {item.name}
                                            </p>
                                            <p
                                                className="text-[11px] tracking-[0.02em] text-gray-600 mb-1"
                                                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                            >
                                                Color: {item.color}
                                            </p>
                                            <p
                                                className="text-[11px] tracking-[0.02em] text-gray-600 mb-1"
                                                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                            >
                                                Size: {item.size}
                                            </p>
                                            <p
                                                className="text-[11px] tracking-[0.02em] text-gray-600 mb-1"
                                                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                            >
                                                Qty: 1
                                            </p>
                                            <p
                                                className="text-[12px] tracking-[0.02em] text-black mt-2"
                                                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                            >
                                                CHF {item.price.toLocaleString()}
                                            </p>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-[11px] tracking-[0.02em] text-black underline mt-3 hover:opacity-60 transition-opacity"
                                                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer with Total and Buttons */}
                            <div className="p-6 border-t border-[#e5e5e5]">
                                <div className="flex items-center justify-between mb-5">
                                    <span
                                        className="text-[12px] tracking-[0.04em] text-black"
                                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                    >
                                        Subtotal
                                    </span>
                                    <span
                                        className="text-[12px] tracking-[0.02em] text-black"
                                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                    >
                                        CHF {cartItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    <a
                                        href="#"
                                        className="flex items-center justify-center w-full h-[44px] border border-black text-black text-[11px] tracking-[0.08em] uppercase hover:opacity-60 transition-opacity"
                                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                    >
                                        View Shopping Bag
                                    </a>
                                    <button
                                        className="w-full h-[44px] bg-black text-white text-[11px] tracking-[0.08em] uppercase hover:bg-[#222] transition-colors"
                                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
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
