'use client';

import { useState } from 'react';

/**
 * Design 4: Stacked Logo Header with Full-Width Nav
 * 
 * Refined Luxury Edition v2:
 * - Sans-Serif Typography (Clean, Modern, Swiss-inspired)
 * - Unified Icon Set (20x20, 1.2px stroke, consistent visual weight)
 * - Refined Badge (Small, tight, offset to right)
 * - Dynamic dropdown content
 */

const navItems = ['Women', 'Men', 'Objects', 'Fragrances', 'Art de Vivre', 'Gifts', 'Stories'];

// Dynamic Content Data
const navContent: Record<string, { image: string; categories: string[]; highlights: string[]; featured: number[] }> = {
    'Women': {
        image: 'from-[#e8e4df] to-[#d5cfc7]',
        categories: ['Ready to Wear', 'Bags', 'Shoes', 'Accessories', 'Jewellery'],
        highlights: ['New Arrivals', 'The Edit', 'Runway', 'Essentials'],
        featured: [1, 2, 3]
    },
    'Men': {
        image: 'from-[#d4d4d4] to-[#bfbfbf]',
        categories: ['Ready to Wear', 'Shoes', 'Leather Goods', 'Accessories'],
        highlights: ['New Season', 'Tailoring', 'Casual', 'Exclusives'],
        featured: [4, 5, 6]
    },
    'Objects': {
        image: 'from-[#ddd5cc] to-[#c7beb3]',
        categories: ['Home', 'Decor', 'Textiles', 'Stationery'],
        highlights: ['New In', 'Gift Guide', 'Icons'],
        featured: [7, 8, 9]
    },
    // Fallback for others
    'default': {
        image: 'from-[#f5f2ef] to-[#ebe6e0]',
        categories: ['View All', 'Collections', 'Limited Edition'],
        highlights: ['Latest', 'Trending'],
        featured: [1, 2, 3]
    }
};

export default function LuxuryHeaderDesign4() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [activeNav, setActiveNav] = useState<string | null>(null);
    const [cartItems] = useState([
        { id: 1, name: 'Sculptural Ring', price: 1850 }
    ]);

    // Unified Sans-Serif Font Style (Swiss/Modern)
    const premiumFont = { fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif", fontWeight: 400 };
    const premiumFontMedium = { fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif", fontWeight: 500 };
    const premiumFontLight = { fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif", fontWeight: 300 };

    const currentContent = navContent[activeNav || ''] || navContent['default'];

    return (
        <>
            {/* Main Header */}
            <header className="w-full bg-white sticky top-0 z-[100]">

                {/* Top Bar */}
                <div className="w-full px-6 lg:px-12 h-[60px] flex items-center justify-between">

                    {/* Logo - Sans-Serif, tracking, uppercase or lowercase based on preference, keeping lowercase for modern vibe */}
                    <a href="#" className="flex items-center">
                        <span
                            className="text-[22px] lg:text-[24px] tracking-[0.02em] text-black lowercase leading-none"
                            style={premiumFontMedium}
                        >
                            maison
                        </span>
                    </a>

                    {/* Utilities - Unified Icon Set (20x20, 1.2px stroke) */}
                    <div className="flex items-center gap-6">
                        <a href="#" className="hidden lg:block text-[11px] tracking-[0.05em] text-black hover:opacity-50 transition-opacity uppercase" style={premiumFont}>
                            Contact
                        </a>

                        {/* Search Icon */}
                        <button
                            className="text-black hover:opacity-50 transition-opacity"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            {/* Unified Size: 20x20, Stroke: 1.2 */}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M13.5 13.5L17.5 17.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                        </button>

                        {/* User Icon */}
                        <button className="hidden sm:block text-black hover:opacity-50 transition-opacity">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M3.5 17.5C3.5 14.1863 6.41015 11.5 10 11.5C13.5899 11.5 16.5 14.1863 16.5 17.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                        </button>

                        {/* Wishlist Icon */}
                        <button className="hidden md:block text-black hover:opacity-50 transition-opacity">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 17L9.27409 16.2908C5.06822 12.1802 2.5 9.60534 2.5 6.64333C2.5 4.14811 4.31689 2.5 6.6193 2.5C8.01639 2.5 9.27409 3.29267 10 4.29528C10.7259 3.29267 11.9836 2.5 13.3807 2.5C15.6831 2.5 17.5 4.14811 17.5 6.64333C17.5 9.60534 14.9318 12.1802 10.7259 16.2908L10 17Z" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                        </button>

                        {/* Bag Icon & Badge */}
                        <button
                            className="text-black hover:opacity-50 transition-opacity relative group"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <rect x="3.5" y="6.5" width="13" height="11" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
                                <path d="M7 6.5V4.5C7 2.84315 8.34315 1.5 10 1.5C11.6569 1.5 13 2.84315 13 4.5V6.5" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                            {/* Adjusted Badge: Smaller, positioned to side */}
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-3 min-w-[14px] h-[14px] flex items-center justify-center text-[10px] text-black font-medium leading-none" style={premiumFont}>
                                    {cartItems.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Navigation Bar */}
                <nav className="w-full border-t border-b border-[#f0f0f0] relative">
                    <div className="px-6 lg:px-12 overflow-x-auto scrollbar-hide relative z-[10] pr-12">
                        <div className="flex items-center gap-8 lg:gap-14 h-[50px] min-w-max">
                            {navItems.map((item) => (
                                <button
                                    key={item}
                                    className={`text-[13px] tracking-[0.05em] transition-all whitespace-nowrap uppercase ${activeNav === item
                                            ? 'text-black opacity-100 font-medium'
                                            : 'text-black/60 hover:text-black hover:opacity-100'
                                        }`}
                                    style={premiumFont}
                                    onClick={() => setActiveNav(activeNav === item ? null : item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Fade Cue */}
                    <div className="lg:hidden absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-[20]" />
                </nav>

                {/* Dropdown Panel - Sans Serif update */}
                {activeNav && (
                    <div className="absolute top-full left-0 right-0 bg-white border-b border-[#f0f0f0] z-[99]">
                        <div className="px-6 lg:px-12 py-12 flex flex-col lg:flex-row gap-10 lg:gap-20">

                            <button
                                className="lg:hidden text-[11px] uppercase tracking-[0.05em] flex items-center gap-2 text-black/60 mb-4"
                                onClick={() => setActiveNav(null)}
                                style={premiumFont}
                            >
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M9 1L1 9M1 1L9 9" stroke="currentColor" /></svg> Close
                            </button>

                            <a href="#" className="group flex-shrink-0 hidden lg:block">
                                <div className={`w-[320px] aspect-[4/5] bg-gradient-to-br ${currentContent.image} group-hover:opacity-90 transition-opacity mb-4`} />
                                <p className="text-[12px] tracking-[0.05em] text-black/60" style={premiumFont}>
                                    Discover {activeNav}
                                </p>
                            </a>

                            <div className="flex gap-20">
                                <div>
                                    <p className="text-[11px] tracking-[0.15em] uppercase text-black/40 mb-6" style={premiumFontMedium}>Categories</p>
                                    <div className="space-y-3">
                                        {currentContent.categories.map((link) => (
                                            <a key={link} href="#" className="block text-[14px] text-black/80 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[11px] tracking-[0.15em] uppercase text-black/40 mb-6" style={premiumFontMedium}>Highlights</p>
                                    <div className="space-y-3">
                                        {currentContent.highlights.map((link) => (
                                            <a key={link} href="#" className="block text-[14px] text-black/80 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="ml-auto hidden lg:block">
                                <p className="text-[11px] tracking-[0.15em] uppercase text-black/40 mb-6" style={premiumFontMedium}>Featured</p>
                                <div className="grid grid-cols-3 gap-4">
                                    {currentContent.featured.map((i) => (
                                        <a key={i} href="#" className="group">
                                            <div className="w-[100px] aspect-square bg-gradient-to-br from-[#f8f6f3] to-[#f0ece6] group-hover:opacity-90 transition-opacity" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            className="hidden lg:block absolute top-6 right-6 text-black/40 hover:text-black transition-colors"
                            onClick={() => setActiveNav(null)}
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1" />
                            </svg>
                        </button>
                    </div>
                )}
            </header>

            {/* Overlay */}
            {activeNav && <div className="fixed inset-0 bg-black/5 z-[50]" onClick={() => setActiveNav(null)} />}

            {/* Search Overlay - Sans Serif */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-white z-[200] overflow-y-auto">
                    <div className="sticky top-0 bg-white h-[60px] px-6 lg:px-12 flex items-center gap-4 border-b border-[#f0f0f0]">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-black/40">
                            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M13.5 13.5L17.5 17.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Type to search..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            autoFocus
                            className="flex-1 text-[16px] text-black bg-transparent outline-none placeholder-black/30"
                            style={premiumFont}
                        />
                        <button
                            className="text-[11px] tracking-[0.1em] uppercase text-black/60 hover:text-black transition-colors"
                            style={premiumFontMedium}
                            onClick={() => { setIsSearchOpen(false); setSearchValue(''); }}
                        >
                            Close
                        </button>
                    </div>

                    <div className="px-6 lg:px-12 py-10 pb-20">
                        <div className="mb-14">
                            <p className="text-[11px] tracking-[0.1em] uppercase text-black/40 mb-4" style={premiumFontMedium}>Recent Searches</p>
                            <div className="flex flex-wrap gap-2">
                                {['Tote Bag', 'Cashmere Coat', 'Signet Ring'].map((term) => (
                                    <button key={term} className="px-4 py-2 bg-[#f8f8f8] text-[13px] text-black hover:bg-[#efefef] transition-colors rounded-sm" style={premiumFont}>{term}</button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-[11px] tracking-[0.1em] uppercase text-black/40 mb-6" style={premiumFontMedium}>Discover</p>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                                {[
                                    { name: 'New Season', subtitle: 'Spring 2025' },
                                    { name: 'Leather Goods', subtitle: 'The Craft' },
                                    { name: 'Fine Jewellery', subtitle: 'Timeless' },
                                    { name: 'Stories', subtitle: 'Journal' },
                                    { name: 'Gifts', subtitle: 'For Her' },
                                    { name: 'Fragrances', subtitle: 'New' }
                                ].map((item, i) => (
                                    <a key={i} href="#" className="group">
                                        <div className="aspect-[3/4] bg-gradient-to-br from-[#f5f2ef] to-[#ebe6e0] group-hover:opacity-90 transition-opacity mb-4" />
                                        <p className="text-[14px] text-black mb-1" style={premiumFont}>{item.name}</p>
                                        <p className="text-[12px] text-black/50" style={premiumFont}>{item.subtitle}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Panel - Sans Serif */}
            <div
                className={`fixed inset-0 bg-black/20 z-[180] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsCartOpen(false)}
            />
            <div
                className={`fixed top-0 right-0 h-full w-[100%] sm:w-[420px] bg-white z-[190] transition-transform duration-300 ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="h-[60px] px-8 flex items-center justify-between border-b border-[#f0f0f0]">
                    <span className="text-[14px] text-black tracking-[0.02em]" style={premiumFontMedium}>Shopping Bag ({cartItems.length})</span>
                    <button className="text-black/50 hover:text-black" onClick={() => setIsCartOpen(false)}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col h-[calc(100%-60px)]">
                    {cartItems.length > 0 ? (
                        <>
                            <div className="flex-1 overflow-y-auto p-8">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-5 pb-8 border-b border-[#f0f0f0]">
                                        <div className="w-[100px] aspect-[3/4] bg-gradient-to-br from-[#f5f2ef] to-[#ebe6e0]" />
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

                            <div className="p-8 bg-[#fbfbfb] border-t border-[#f0f0f0]">
                                <div className="flex justify-between mb-4">
                                    <span className="text-[13px] text-black/60" style={premiumFont}>Subtotal</span>
                                    <span className="text-[14px] text-black" style={premiumFontMedium}>€{cartItems.reduce((s, i) => s + i.price, 0).toLocaleString()}</span>
                                </div>
                                <p className="text-[11px] text-black/40 mb-6" style={premiumFont}>Shipping and taxes calculated at checkout</p>

                                <button className="w-full h-[50px] bg-black text-white text-[12px] tracking-[0.1em] uppercase hover:bg-black/90 transition-colors mb-3" style={premiumFontMedium}>
                                    Checkout
                                </button>
                                <button className="w-full h-[50px] border border-black/10 text-[12px] tracking-[0.1em] uppercase text-black hover:border-black transition-colors" style={premiumFontMedium}>
                                    View Bag
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <p className="text-[14px] text-black/40" style={premiumFont}>Your bag is empty</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
