'use client';

import { useState } from 'react';

/**
 * Design 5: Minimal Floating Header with Expandable Navigation
 * 
 * UNIQUE APPROACH:
 * - Ultra-minimal initial state: Just logo + 2 icons
 * - Navigation hidden behind hamburger on ALL screen sizes
 * - Full-screen overlay menu when activated
 * - Cartier/Van Cleef & Arpels inspired
 * - Sticky, transforms to frosted glass on scroll
 * - 100% Sans-Serif, unified icons, responsive
 */

const navCategories = [
    {
        title: 'Collections',
        links: ['High Jewellery', 'Icons', 'New Creations', 'Bridal', 'Archives']
    },
    {
        title: 'Creations',
        links: ['Necklaces', 'Bracelets', 'Rings', 'Earrings', 'Watches']
    },
    {
        title: 'Maison',
        links: ['Heritage', 'Savoir-Faire', 'Commitments', 'Art & Culture']
    },
    {
        title: 'Services',
        links: ['Book an Appointment', 'Find a Boutique', 'Care & Repair', 'Gifting']
    }
];

export default function LuxuryHeaderDesign5() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [cartItems] = useState([
        { id: 1, name: 'Diamond Pendant', price: 24500 }
    ]);

    const premiumFont = { fontFamily: "'Inter', 'Helvetica Neue', sans-serif", fontWeight: 400 };
    const premiumFontMedium = { fontFamily: "'Inter', 'Helvetica Neue', sans-serif", fontWeight: 500 };
    const premiumFontLight = { fontFamily: "'Inter', 'Helvetica Neue', sans-serif", fontWeight: 300 };

    return (
        <>
            {/* Header - Ultra Minimal */}
            <header className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-sm border-b border-black/5">
                <div className="h-[64px] lg:h-[72px] px-6 lg:px-12 flex items-center justify-between">

                    {/* Left: Menu Trigger */}
                    <button
                        className="flex items-center gap-3 text-black hover:opacity-60 transition-opacity"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M2 6H18" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M2 14H18" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                        <span className="hidden lg:inline text-[11px] tracking-[0.15em] uppercase" style={premiumFont}>Menu</span>
                    </button>

                    {/* Center: Logo */}
                    <a href="#" className="absolute left-1/2 -translate-x-1/2">
                        <span
                            className="text-[18px] lg:text-[20px] tracking-[0.25em] text-black uppercase"
                            style={premiumFontLight}
                        >
                            MAISON
                        </span>
                    </a>

                    {/* Right: Icons */}
                    <div className="flex items-center gap-5">
                        {/* Search */}
                        <button
                            className="text-black hover:opacity-60 transition-opacity"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M13.5 13.5L17.5 17.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                        </button>

                        {/* Cart with Count */}
                        <button
                            className="text-black hover:opacity-60 transition-opacity relative"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <rect x="3.5" y="6.5" width="13" height="11" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M7 6.5V4.5C7 2.84315 8.34315 1.5 10 1.5C11.6569 1.5 13 2.84315 13 4.5V6.5" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                            {cartItems.length > 0 && (
                                <span
                                    className="absolute -top-1.5 -right-3 text-[10px] text-black"
                                    style={premiumFontMedium}
                                >
                                    {cartItems.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Backdrop Overlay for Menu/Search - Fades in/out */}
            <div
                className={`fixed inset-0 bg-black/30 z-[150] transition-opacity duration-[400ms] ease-out ${isMenuOpen || isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => { setIsMenuOpen(false); setIsSearchOpen(false); }}
            />

            {/* Side Menu Panel - Slides from left */}
            <div
                className={`fixed top-0 left-0 h-full w-full sm:w-[420px] lg:w-[480px] bg-white z-[160] overflow-y-auto ${isMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full shadow-none'}`}
                style={{ transition: 'transform 300ms ease-out, box-shadow 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms' }}
            >
                {/* Menu Header */}
                <div className="h-[64px] lg:h-[72px] px-6 lg:px-10 flex items-center justify-between border-b border-black/5">
                    <button
                        className="flex items-center gap-3 text-black hover:opacity-60 transition-opacity"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M4 4L16 16" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M16 4L4 16" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                        <span className="text-[11px] tracking-[0.15em] uppercase" style={premiumFont}>Close</span>
                    </button>
                </div>

                {/* Menu Content */}
                <div className="px-6 lg:px-10 py-8">
                    {navCategories.map((category) => (
                        <div key={category.title} className="border-b border-black/5 py-6 first:pt-0">
                            <p
                                className="text-[11px] tracking-[0.2em] uppercase text-black/40 mb-5"
                                style={premiumFontMedium}
                            >
                                {category.title}
                            </p>
                            <div className="space-y-4">
                                {category.links.map((link) => (
                                    <a
                                        key={link}
                                        href="#"
                                        className="block text-[15px] text-black hover:opacity-60 transition-opacity"
                                        style={premiumFont}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Footer Links */}
                    <div className="pt-8 space-y-4">
                        <a href="#" className="flex items-center gap-3 text-[13px] text-black" style={premiumFont}>
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M3.5 17.5C3.5 14.1863 6.41015 11.5 10 11.5C13.5899 11.5 16.5 14.1863 16.5 17.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                            Account
                        </a>
                        <a href="#" className="flex items-center gap-3 text-[13px] text-black" style={premiumFont}>
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                <path d="M10 17L9.27409 16.2908C5.06822 12.1802 2.5 9.60534 2.5 6.64333C2.5 4.14811 4.31689 2.5 6.6193 2.5C8.01639 2.5 9.27409 3.29267 10 4.29528C10.7259 3.29267 11.9836 2.5 13.3807 2.5C15.6831 2.5 17.5 4.14811 17.5 6.64333C17.5 9.60534 14.9318 12.1802 10.7259 16.2908L10 17Z" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                            Wishlist
                        </a>
                    </div>

                    {/* Legal Links */}
                    <div className="pt-10 pb-10 space-y-3">
                        {['Contact Us', 'Find a Boutique', 'Shipping & Returns'].map((link) => (
                            <a key={link} href="#" className="block text-[12px] text-black/50" style={premiumFont}>
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search Overlay - Two Part Slide */}

            {/* Search Header - Slides down over main header */}
            <div
                className={`fixed top-0 left-0 right-0 h-[64px] lg:h-[72px] bg-white z-[170] border-b border-[#e5e5e5] transition-transform duration-300 ease-out ${isSearchOpen ? 'translate-y-0' : '-translate-y-full'}`}
                style={{ transitionDelay: isSearchOpen ? '0ms' : '320ms' }}
            >
                <div className="h-full px-6 lg:px-12 flex items-center gap-4">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-black/30 flex-shrink-0">
                        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M13.5 13.5L17.5 17.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search creations..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        autoFocus={isSearchOpen}
                        className="flex-1 text-[16px] text-black bg-transparent outline-none placeholder-black/30"
                        style={premiumFont}
                    />
                    <button
                        className="flex items-center gap-2 text-black/50 hover:text-black transition-colors"
                        onClick={() => { setIsSearchOpen(false); setSearchValue(''); }}
                    >
                        <span className="text-[11px] tracking-[0.1em] uppercase" style={premiumFontMedium}>Close</span>
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                            <path d="M4 4L16 16" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M16 4L4 16" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Search Content Panel - Slides down below header */}
            <div
                className={`fixed top-[64px] lg:top-[72px] left-0 right-0 bg-white z-[169] transition-transform duration-[500ms] ease-out overflow-y-auto ${isSearchOpen ? 'translate-y-0' : '-translate-y-[calc(100%+72px)]'}`}
                style={{
                    height: 'calc(100vh - 120px)',
                    transitionDelay: isSearchOpen ? '175ms' : '0ms'
                }}
            >
                <div className="px-6 lg:px-12 py-10">
                    <p className="text-[11px] tracking-[0.15em] uppercase text-black/40 mb-6" style={premiumFontMedium}>
                        Popular Searches
                    </p>
                    <div className="flex flex-wrap gap-3 mb-14">
                        {['Necklace', 'Ring', 'Bracelet', 'Wedding'].map((term) => (
                            <button
                                key={term}
                                className="px-5 py-2.5 border border-black/10 text-[13px] text-black hover:border-black/30 transition-colors rounded-full"
                                style={premiumFont}
                            >
                                {term}
                            </button>
                        ))}
                    </div>

                    <p className="text-[11px] tracking-[0.15em] uppercase text-black/40 mb-6" style={premiumFontMedium}>
                        Featured
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'Diamond Ring', price: '€12,400' },
                            { name: 'Pearl Necklace', price: '€8,900' },
                            { name: 'Gold Bracelet', price: '€6,200' },
                            { name: 'Sapphire Earrings', price: '€15,800' }
                        ].map((product) => (
                            <a key={product.name} href="#" className="group">
                                <div className="aspect-square bg-gradient-to-br from-[#f8f6f3] to-[#ebe6e0] group-hover:opacity-90 transition-opacity mb-4" />
                                <p className="text-[13px] text-black mb-1" style={premiumFont}>{product.name}</p>
                                <p className="text-[12px] text-black/50" style={premiumFont}>{product.price}</p>
                            </a>
                        ))}
                    </div>

                    {/* Footer links */}
                    <div className="pt-14 flex flex-wrap items-center justify-center gap-6 border-t border-black/5 mt-14">
                        {['Need help?', 'Contact us', 'Store locator', 'Book appointment'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-[11px] tracking-[0.1em] text-black/50 hover:text-black transition-colors"
                                style={premiumFont}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cart Panel */}
            <div
                className={`fixed inset-0 bg-black/20 z-[180] ${isCartOpen ? 'block' : 'hidden'}`}
                onClick={() => setIsCartOpen(false)}
            />
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[190] transition-transform duration-300 ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="h-[64px] lg:h-[72px] px-8 flex items-center justify-between border-b border-black/5">
                    <span className="text-[13px] tracking-[0.1em] uppercase text-black" style={premiumFontMedium}>
                        Shopping Bag ({cartItems.length})
                    </span>
                    <button className="text-black/50 hover:text-black transition-colors" onClick={() => setIsCartOpen(false)}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col h-[calc(100%-64px)] lg:h-[calc(100%-72px)]">
                    {cartItems.length > 0 ? (
                        <>
                            <div className="flex-1 overflow-y-auto p-8">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-5 pb-8 border-b border-black/5">
                                        <div className="w-[100px] aspect-square bg-gradient-to-br from-[#f8f6f3] to-[#ebe6e0]" />
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <p className="text-[14px] text-black mb-1" style={premiumFontMedium}>{item.name}</p>
                                                <p className="text-[12px] text-black/50" style={premiumFont}>Qty: 1</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-[14px] text-black" style={premiumFont}>€{item.price.toLocaleString()}</p>
                                                <button className="text-[11px] text-black/40 hover:text-black underline" style={premiumFont}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-8 bg-[#fafafa] border-t border-black/5">
                                <div className="flex justify-between mb-4">
                                    <span className="text-[13px] text-black/60" style={premiumFont}>Subtotal</span>
                                    <span className="text-[14px] text-black" style={premiumFontMedium}>€{cartItems.reduce((s, i) => s + i.price, 0).toLocaleString()}</span>
                                </div>
                                <p className="text-[11px] text-black/40 mb-6" style={premiumFont}>
                                    Complimentary shipping & returns
                                </p>

                                <button
                                    className="w-full h-[52px] bg-black text-white text-[12px] tracking-[0.15em] uppercase hover:bg-black/90 transition-colors"
                                    style={premiumFontMedium}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center px-8">
                            <p className="text-[14px] text-black/40 mb-2" style={premiumFont}>Your bag is empty</p>
                            <p className="text-[12px] text-black/30" style={premiumFont}>Explore our collections</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Spacer for fixed header */}
            <div className="h-[64px] lg:h-[72px]" />
        </>
    );
}
