'use client';

import { useState } from 'react';

/**
 * Design 3: Centered Logo with Split Navigation + Creative Mega Menus
 * 
 * Layout: [Nav Left] [LOGO] [Nav Right] + Icons far right
 * Style: Ultra-minimal, The Row inspired
 * Features:
 * - Centered logo with premium font (weight 400)
 * - Split navigation with VARIED hover mega menus
 * - Each category has unique layout (not repetitive)
 * - Rich search overlay with products
 */

const navItemsLeft = ['New', 'Women', 'Men', 'Accessories'];
const navItemsRight = ['Beauty', 'Home', 'Gifts', 'World'];

export default function LuxuryHeaderDesign3() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isPromoVisible, setIsPromoVisible] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [cartItems] = useState([
        { id: 1, name: 'Cashmere Coat', color: 'Camel', size: 'M', price: 2890 }
    ]);

    const premiumFont = { fontFamily: "'Inter', 'Helvetica Neue', -apple-system, sans-serif", fontWeight: 400 };
    const premiumFontMedium = { fontFamily: "'Inter', 'Helvetica Neue', -apple-system, sans-serif", fontWeight: 500 };

    const handleMenuEnter = (item: string) => setActiveMenu(item);
    const handleMenuLeave = () => setActiveMenu(null);

    // Render different mega menu layouts per category
    const renderMegaMenu = () => {
        if (!activeMenu) return null;

        switch (activeMenu) {
            case 'New':
                // LAYOUT: Large hero left + 2 stacked right + links
                return (
                    <div className="flex gap-8">
                        <div className="flex gap-4">
                            <a href="#" className="group">
                                <div className="w-[300px] aspect-[3/4] bg-gradient-to-br from-[#e8e4df] to-[#d5cfc7] group-hover:opacity-80 transition-opacity mb-3" />
                                <p className="text-[11px] tracking-[0.08em] uppercase text-black" style={premiumFont}>New Season</p>
                            </a>
                            <div className="flex flex-col gap-4">
                                <a href="#" className="group">
                                    <div className="w-[180px] aspect-square bg-gradient-to-br from-[#d4c4b0] to-[#bfae98] group-hover:opacity-80 transition-opacity mb-2" />
                                    <p className="text-[10px] tracking-[0.08em] uppercase text-black" style={premiumFont}>Highlights</p>
                                </a>
                                <a href="#" className="group">
                                    <div className="w-[180px] aspect-square bg-gradient-to-br from-[#c9d1d4] to-[#b0bcc1] group-hover:opacity-80 transition-opacity mb-2" />
                                    <p className="text-[10px] tracking-[0.08em] uppercase text-black" style={premiumFont}>Exclusives</p>
                                </a>
                            </div>
                        </div>
                        <div className="ml-8 flex gap-12">
                            <div>
                                <p className="text-[11px] tracking-[0.15em] uppercase text-black mb-4" style={premiumFontMedium}>For Her</p>
                                <div className="space-y-2.5">
                                    {['Ready to Wear', 'Bags', 'Shoes', 'Accessories'].map((link) => (
                                        <a key={link} href="#" className="block text-[13px] text-gray-600 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-[11px] tracking-[0.15em] uppercase text-black mb-4" style={premiumFontMedium}>For Him</p>
                                <div className="space-y-2.5">
                                    {['Suits', 'Outerwear', 'Knitwear', 'Shoes'].map((link) => (
                                        <a key={link} href="#" className="block text-[13px] text-gray-600 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'Women':
                // LAYOUT: 4 equal images in row + 2 columns links
                return (
                    <div className="flex gap-10">
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { name: 'Coats', gradient: 'from-[#d4c4b0] to-[#bfae98]' },
                                { name: 'Dresses', gradient: 'from-[#c9d1d4] to-[#b0bcc1]' },
                                { name: 'Knitwear', gradient: 'from-[#e8e4df] to-[#d5cfc7]' },
                                { name: 'Tailoring', gradient: 'from-[#ddd5cc] to-[#c7beb3]' }
                            ].map((item) => (
                                <a key={item.name} href="#" className="group">
                                    <div className={`w-[140px] aspect-[3/4] bg-gradient-to-br ${item.gradient} group-hover:opacity-80 transition-opacity mb-2`} />
                                    <p className="text-[10px] tracking-[0.08em] uppercase text-black" style={premiumFont}>{item.name}</p>
                                </a>
                            ))}
                        </div>
                        <div className="flex gap-10 ml-4">
                            <div>
                                <p className="text-[11px] tracking-[0.15em] uppercase text-black mb-4" style={premiumFontMedium}>Ready to Wear</p>
                                <div className="space-y-2.5">
                                    {['All Clothing', 'Tops', 'Skirts', 'Trousers', 'Jackets'].map((link) => (
                                        <a key={link} href="#" className="block text-[13px] text-gray-600 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-[11px] tracking-[0.15em] uppercase text-black mb-4" style={premiumFontMedium}>Accessories</p>
                                <div className="space-y-2.5">
                                    {['All Bags', 'Shoes', 'Belts', 'Jewelry'].map((link) => (
                                        <a key={link} href="#" className="block text-[13px] text-gray-600 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'Men':
                // LAYOUT: 2x2 grid images + 3 columns links
                return (
                    <div className="flex gap-10">
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { name: 'Suiting', gradient: 'from-[#d4d4d4] to-[#bfbfbf]' },
                                { name: 'Casual', gradient: 'from-[#e0dbd5] to-[#cfc8c0]' },
                                { name: 'Outerwear', gradient: 'from-[#c9c9c9] to-[#b5b5b5]' },
                                { name: 'Accessories', gradient: 'from-[#ddd8d3] to-[#ccc5bd]' }
                            ].map((item) => (
                                <a key={item.name} href="#" className="group">
                                    <div className={`w-[150px] aspect-square bg-gradient-to-br ${item.gradient} group-hover:opacity-80 transition-opacity mb-2`} />
                                    <p className="text-[10px] tracking-[0.08em] uppercase text-black" style={premiumFont}>{item.name}</p>
                                </a>
                            ))}
                        </div>
                        <div className="flex gap-8 ml-4">
                            <div>
                                <p className="text-[11px] tracking-[0.15em] uppercase text-black mb-4" style={premiumFontMedium}>Clothing</p>
                                <div className="space-y-2.5">
                                    {['Suits', 'Shirts', 'Knitwear', 'T-Shirts'].map((link) => (
                                        <a key={link} href="#" className="block text-[13px] text-gray-600 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-[11px] tracking-[0.15em] uppercase text-black mb-4" style={premiumFontMedium}>Outerwear</p>
                                <div className="space-y-2.5">
                                    {['Coats', 'Jackets', 'Blazers', 'Leather'].map((link) => (
                                        <a key={link} href="#" className="block text-[13px] text-gray-600 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-[11px] tracking-[0.15em] uppercase text-black mb-4" style={premiumFontMedium}>Accessories</p>
                                <div className="space-y-2.5">
                                    {['Bags', 'Shoes', 'Belts', 'Wallets'].map((link) => (
                                        <a key={link} href="#" className="block text-[13px] text-gray-600 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'Accessories':
                // LAYOUT: Wide hero image + vertical stack right
                return (
                    <div className="flex gap-6">
                        <a href="#" className="group">
                            <div className="w-[400px] aspect-[16/9] bg-gradient-to-br from-[#d4c4b0] to-[#bfae98] group-hover:opacity-80 transition-opacity mb-3" />
                            <p className="text-[11px] tracking-[0.08em] uppercase text-black" style={premiumFont}>The Bag Edit</p>
                        </a>
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-3">
                                <a href="#" className="group">
                                    <div className="w-[120px] aspect-square bg-gradient-to-br from-[#e8e4df] to-[#d5cfc7] group-hover:opacity-80 transition-opacity mb-2" />
                                    <p className="text-[10px] tracking-[0.08em] uppercase text-black" style={premiumFont}>Jewelry</p>
                                </a>
                                <a href="#" className="group">
                                    <div className="w-[120px] aspect-square bg-gradient-to-br from-[#ddd5cc] to-[#c7beb3] group-hover:opacity-80 transition-opacity mb-2" />
                                    <p className="text-[10px] tracking-[0.08em] uppercase text-black" style={premiumFont}>Scarves</p>
                                </a>
                            </div>
                            <div className="ml-6">
                                <p className="text-[11px] tracking-[0.15em] uppercase text-black mb-4" style={premiumFontMedium}>Shop By</p>
                                <div className="space-y-2.5">
                                    {['All Bags', 'Totes', 'Shoulder Bags', 'Crossbody', 'Belts', 'Sunglasses', 'Watches'].map((link) => (
                                        <a key={link} href="#" className="block text-[13px] text-gray-600 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'Beauty':
                // LAYOUT: 3 tall images + single column
                return (
                    <div className="flex gap-10">
                        <div className="flex gap-4">
                            {[
                                { name: 'Fragrances', gradient: 'from-[#f0ebe5] to-[#e5ddd3]' },
                                { name: 'Skincare', gradient: 'from-[#e8e4df] to-[#d5cfc7]' },
                                { name: 'Gift Sets', gradient: 'from-[#ddd5cc] to-[#c7beb3]' }
                            ].map((item) => (
                                <a key={item.name} href="#" className="group">
                                    <div className={`w-[160px] aspect-[2/3] bg-gradient-to-br ${item.gradient} group-hover:opacity-80 transition-opacity mb-2`} />
                                    <p className="text-[10px] tracking-[0.08em] uppercase text-black" style={premiumFont}>{item.name}</p>
                                </a>
                            ))}
                        </div>
                        <div>
                            <p className="text-[11px] tracking-[0.15em] uppercase text-black mb-4" style={premiumFontMedium}>Categories</p>
                            <div className="space-y-2.5">
                                {['All Fragrances', 'For Her', 'For Him', 'Body Care', 'Home Scents', 'Travel Size'].map((link) => (
                                    <a key={link} href="#" className="block text-[13px] text-gray-600 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'Home':
                // LAYOUT: Split hero + small grid + links
                return (
                    <div className="flex gap-8">
                        <div className="flex gap-3">
                            <a href="#" className="group">
                                <div className="w-[200px] aspect-[4/5] bg-gradient-to-br from-[#ddd5cc] to-[#c7beb3] group-hover:opacity-80 transition-opacity mb-2" />
                                <p className="text-[10px] tracking-[0.08em] uppercase text-black" style={premiumFont}>Living</p>
                            </a>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { name: 'Décor', gradient: 'from-[#e0dbd5] to-[#cfc8c0]' },
                                    { name: 'Dining', gradient: 'from-[#e8e4df] to-[#d5cfc7]' },
                                    { name: 'Bedroom', gradient: 'from-[#d4c4b0] to-[#bfae98]' },
                                    { name: 'Candles', gradient: 'from-[#f0ebe5] to-[#e5ddd3]' }
                                ].map((item) => (
                                    <a key={item.name} href="#" className="group">
                                        <div className={`w-[100px] aspect-square bg-gradient-to-br ${item.gradient} group-hover:opacity-80 transition-opacity mb-1`} />
                                        <p className="text-[9px] tracking-[0.08em] uppercase text-black" style={premiumFont}>{item.name}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-[11px] tracking-[0.15em] uppercase text-black mb-4" style={premiumFontMedium}>Shop</p>
                            <div className="space-y-2.5">
                                {['All Home', 'Tableware', 'Textiles', 'Objects', 'Fragrances', 'Gifts'].map((link) => (
                                    <a key={link} href="#" className="block text-[13px] text-gray-600 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'Gifts':
                // LAYOUT: Feature editorial + product strip
                return (
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-4">
                            <a href="#" className="group">
                                <div className="w-[280px] aspect-[16/10] bg-gradient-to-br from-[#e8ddd3] to-[#d9ccc0] group-hover:opacity-80 transition-opacity mb-2" />
                                <p className="text-[11px] tracking-[0.08em] uppercase text-black" style={premiumFont}>Gift Guide 2024</p>
                            </a>
                            <div className="flex gap-8">
                                <div>
                                    <p className="text-[11px] tracking-[0.15em] uppercase text-black mb-4" style={premiumFontMedium}>By Recipient</p>
                                    <div className="space-y-2.5">
                                        {['For Her', 'For Him', 'For Home', 'For Kids'].map((link) => (
                                            <a key={link} href="#" className="block text-[13px] text-gray-600 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[11px] tracking-[0.15em] uppercase text-black mb-4" style={premiumFontMedium}>By Price</p>
                                    <div className="space-y-2.5">
                                        {['Under CHF 200', 'Under CHF 500', 'Under CHF 1000', 'Luxury Gifts'].map((link) => (
                                            <a key={link} href="#" className="block text-[13px] text-gray-600 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Product strip */}
                        <div className="flex gap-3">
                            {['Gift Set', 'Scarf', 'Wallet', 'Candle', 'Fragrance'].map((item) => (
                                <a key={item} href="#" className="group">
                                    <div className="w-[90px] aspect-square bg-gradient-to-br from-[#f5f5f5] to-[#eaeaea] group-hover:opacity-80 transition-opacity mb-1" />
                                    <p className="text-[9px] tracking-[0.05em] text-gray-600" style={premiumFont}>{item}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                );

            case 'World':
                // LAYOUT: Full-width editorial + minimal links
                return (
                    <div className="flex gap-10">
                        <a href="#" className="group">
                            <div className="w-[500px] aspect-[21/9] bg-gradient-to-br from-[#c9d1d4] to-[#b0bcc1] group-hover:opacity-80 transition-opacity mb-3" />
                            <p className="text-[11px] tracking-[0.08em] uppercase text-black" style={premiumFont}>Discover The Maison</p>
                        </a>
                        <div className="flex gap-8">
                            <div>
                                <p className="text-[11px] tracking-[0.15em] uppercase text-black mb-4" style={premiumFontMedium}>The Maison</p>
                                <div className="space-y-2.5">
                                    {['Our Story', 'Craftsmanship', 'Sustainability', 'Foundation'].map((link) => (
                                        <a key={link} href="#" className="block text-[13px] text-gray-600 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-[11px] tracking-[0.15em] uppercase text-black mb-4" style={premiumFontMedium}>Locate</p>
                                <div className="space-y-2.5">
                                    {['Find a Store', 'Book Appointment', 'Contact Us'].map((link) => (
                                        <a key={link} href="#" className="block text-[13px] text-gray-600 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            {/* Main Header */}
            <header
                className="w-full bg-white relative z-[100]"
                onMouseLeave={handleMenuLeave}
            >
                {/* Promo Bar */}
                {isPromoVisible && (
                    <div className="hidden lg:flex w-full px-10 h-[36px] bg-black items-center justify-center relative">
                        <p className="text-[10px] tracking-[0.15em] text-white uppercase" style={premiumFont}>
                            Complimentary Shipping on All Orders
                        </p>
                        <button
                            className="absolute right-10 text-white hover:opacity-60 transition-opacity"
                            onClick={() => setIsPromoVisible(false)}
                        >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M1 1L9 9M1 9L9 1" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Main Navigation Bar */}
                <div className="w-full px-5 sm:px-6 lg:px-10 h-[60px] lg:h-[68px] flex items-center justify-between border-b border-[#e5e5e5]">
                    {/* Left Section */}
                    <div className="flex items-center gap-6 lg:flex-1">
                        <button className="lg:hidden text-black" onClick={() => setIsMobileMenuOpen(true)}>
                            <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                                <path d="M1 1H21M1 6H21M1 11H21" stroke="currentColor" strokeWidth="1.3" />
                            </svg>
                        </button>
                        <nav className="hidden lg:flex items-center gap-7">
                            {navItemsLeft.map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className={`text-[11px] tracking-[0.1em] uppercase transition-all pb-1 border-b ${activeMenu === item ? 'text-black border-black' : 'text-black border-transparent hover:border-black/30'}`}
                                    style={premiumFont}
                                    onMouseEnter={() => handleMenuEnter(item)}
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Logo */}
                    <a href="#" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:flex-shrink-0 lg:mx-10">
                        <span className="text-[16px] sm:text-[18px] lg:text-[20px] tracking-[0.18em] text-black uppercase" style={premiumFont}>
                            ATELIER
                        </span>
                    </a>

                    {/* Right Section */}
                    <div className="flex items-center gap-4 lg:gap-5 lg:flex-1 lg:justify-end">
                        <nav className="hidden lg:flex items-center gap-7 mr-8">
                            {navItemsRight.map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className={`text-[11px] tracking-[0.1em] uppercase transition-all pb-1 border-b ${activeMenu === item ? 'text-black border-black' : 'text-black border-transparent hover:border-black/30'}`}
                                    style={premiumFont}
                                    onMouseEnter={() => handleMenuEnter(item)}
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                        {/* Icons */}
                        <div className="flex items-center gap-4">
                            <button className="text-black hover:opacity-50 transition-opacity flex items-center justify-center" onClick={() => setIsSearchOpen(true)}>
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                    <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M13 13L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                            <button className="hidden sm:flex items-center justify-center text-black hover:opacity-50 transition-opacity">
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                    <circle cx="10" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M2 19c0-4 3.5-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                            <button className="text-black hover:opacity-50 transition-opacity relative flex items-center justify-center" onClick={() => setIsCartOpen(true)}>
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 5h12l1 12a2 2 0 01-2 2H5a2 2 0 01-2-2l1-12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                    <path d="M7 5V4a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1.5 text-[9px] text-black" style={premiumFontMedium}>{cartItems.length}</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mega Menu - Creative Layouts */}
                {activeMenu && (
                    <div
                        className="hidden lg:block absolute top-full left-0 right-0 bg-white border-b border-[#e5e5e5] z-[99]"
                        onMouseEnter={() => setActiveMenu(activeMenu)}
                        onMouseLeave={handleMenuLeave}
                    >
                        <div className="w-full px-10 py-10">
                            {renderMegaMenu()}
                        </div>
                    </div>
                )}
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-white z-[200] flex flex-col">
                    <div className="flex-shrink-0 h-[60px] px-6 flex items-center justify-between">
                        <span className="text-[18px] tracking-[0.15em] text-black uppercase" style={premiumFontMedium}>ATELIER</span>
                        <button className="text-black" onClick={() => setIsMobileMenuOpen(false)}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M2 2L16 16M2 16L16 2" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <div>
                            {[...navItemsLeft, ...navItemsRight].map((item) => (
                                <a key={item} href="#" className="flex items-center justify-between px-6 py-6 text-[14px] tracking-[0.08em] text-black uppercase border-b border-[#e5e5e5]" style={premiumFontMedium} onClick={() => setIsMobileMenuOpen(false)}>
                                    {item}
                                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="1.5" /></svg>
                                </a>
                            ))}
                        </div>
                        <div className="px-6 py-8 space-y-6">
                            <a href="#" className="flex items-center gap-4 text-[13px] text-black" style={premiumFont}>
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6" r="4" stroke="currentColor" strokeWidth="1.3" /><path d="M2 19c0-4 3.5-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.3" /></svg>
                                <span>Sign in <span className="text-gray-400">or</span> Create Account</span>
                            </a>
                            <a href="#" className="flex items-center gap-4 text-[13px] text-black" style={premiumFont}>
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 17l-1.2-1.1C4.5 12.4 2 10.1 2 7.2 2 4.7 4 3 6.5 3c1.4 0 2.7.65 3.5 1.7C10.8 3.65 12.1 3 13.5 3 16 3 18 4.7 18 7.2c0 2.9-2.5 5.2-6.8 8.7L10 17z" stroke="currentColor" strokeWidth="1.3" /></svg>
                                Wishlist
                            </a>
                        </div>
                        <div className="px-6 py-6 pb-10 border-t border-[#e5e5e5] space-y-4">
                            {['Impressum', 'Terms of Service', 'Privacy Policy', 'Shipping & Returns'].map((link) => (
                                <a key={link} href="#" className="block text-[12px] text-gray-500 hover:text-black" style={premiumFont}>{link}</a>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Search Overlay - Rich Content */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-white z-[200] overflow-y-auto">
                    <div className="sticky top-0 bg-white h-[60px] lg:h-[68px] px-6 lg:px-10 flex items-center justify-between border-b border-[#e5e5e5]">
                        <div className="flex items-center gap-3 flex-1">
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-gray-400">
                                <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M13 13L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                autoFocus
                                className="flex-1 text-[15px] text-black bg-transparent outline-none placeholder-gray-400"
                                style={premiumFont}
                            />
                        </div>
                        <button className="flex items-center gap-2 text-black hover:opacity-50 ml-6" onClick={() => { setIsSearchOpen(false); setSearchValue(''); }}>
                            <span className="text-[11px] tracking-[0.1em] uppercase hidden sm:inline" style={premiumFont}>Close</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M2 14L14 2" stroke="currentColor" strokeWidth="1.3" /></svg>
                        </button>
                    </div>

                    {/* Featured Categories - Edge to edge */}
                    <div className="grid grid-cols-2 sm:grid-cols-4">
                        {[
                            { name: 'Coats', color: 'from-[#d4c4b0] to-[#bfae98]' },
                            { name: 'Knitwear', color: 'from-[#e8e4df] to-[#d5cfc7]' },
                            { name: 'Dresses', color: 'from-[#c9d1d4] to-[#b0bcc1]' },
                            { name: 'Accessories', color: 'from-[#ddd5cc] to-[#c7beb3]' }
                        ].map((category) => (
                            <a key={category.name} href="#" className="group relative overflow-hidden">
                                <div className={`aspect-[4/5] bg-gradient-to-br ${category.color} group-hover:scale-105 transition-transform duration-500`} />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent">
                                    <p className="text-[11px] tracking-[0.12em] uppercase text-white" style={premiumFont}>{category.name}</p>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Popular Products Section */}
                    <div className="px-6 lg:px-10 py-10">
                        <p className="text-[11px] tracking-[0.15em] uppercase text-black mb-6" style={premiumFontMedium}>Popular Right Now</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {[
                                { name: 'Maison Silk Dress', price: 'CHF 2,450' },
                                { name: 'Leather Tote', price: 'CHF 3,200' },
                                { name: 'Gold Pendant', price: 'CHF 1,850' },
                                { name: 'Eau de Maison', price: 'CHF 280' },
                                { name: 'Cashmere Wrap', price: 'CHF 890' },
                                { name: 'Silk Scarf', price: 'CHF 480' }
                            ].map((product) => (
                                <a key={product.name} href="#" className="group">
                                    <div className="aspect-[3/4] bg-gradient-to-br from-[#f5f5f5] to-[#eaeaea] group-hover:opacity-80 transition-opacity mb-3" />
                                    <p className="text-[12px] text-black mb-1" style={premiumFont}>{product.name}</p>
                                    <p className="text-[11px] text-gray-500" style={premiumFont}>{product.price}</p>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="px-6 lg:px-10 pb-10 border-t border-[#e5e5e5] pt-8">
                        <div className="flex flex-wrap gap-x-8 gap-y-3">
                            {['New Arrivals', 'Best Sellers', 'Gift Guide', 'Sale', 'Stores'].map((link) => (
                                <a key={link} href="#" className="text-[13px] text-gray-600 hover:text-black transition-colors" style={premiumFont}>{link}</a>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Overlay */}
            <div className={`fixed inset-0 bg-black/30 z-[180] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsCartOpen(false)} />

            {/* Cart Panel */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[190] transition-transform duration-300 ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-[60px] lg:h-[68px] px-6 flex items-center justify-between border-b border-[#e5e5e5]">
                    <span className="text-[11px] tracking-[0.15em] uppercase text-black" style={premiumFont}>Shopping Bag ({cartItems.length})</span>
                    <button className="text-black" onClick={() => setIsCartOpen(false)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M2 14L14 2" stroke="currentColor" strokeWidth="1.3" /></svg>
                    </button>
                </div>
                <div className="flex flex-col h-[calc(100%-60px)] lg:h-[calc(100%-68px)]">
                    {cartItems.length > 0 ? (
                        <>
                            <div className="flex-1 overflow-y-auto p-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-5 pb-6 mb-6 border-b border-[#f0f0f0]">
                                        <div className="w-[100px] aspect-[3/4] bg-gradient-to-br from-[#f0ebe5] to-[#e5ddd3]" />
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <p className="text-[13px] tracking-[0.02em] text-black mb-1" style={premiumFont}>{item.name}</p>
                                                <p className="text-[11px] text-gray-500" style={premiumFont}>{item.color} · Size {item.size}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-[13px] text-black" style={premiumFontMedium}>CHF {item.price.toLocaleString()}</p>
                                                <button className="text-[10px] tracking-[0.1em] uppercase text-gray-500 hover:text-black transition-colors" style={premiumFont}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 bg-[#fafafa] border-t border-[#e5e5e5]">
                                <div className="flex justify-between mb-2">
                                    <span className="text-[12px] tracking-[0.08em] uppercase text-black" style={premiumFont}>Subtotal</span>
                                    <span className="text-[14px] text-black" style={premiumFontMedium}>CHF {cartItems.reduce((s, i) => s + i.price, 0).toLocaleString()}</span>
                                </div>
                                <p className="text-[11px] text-black/60 mb-6" style={premiumFont}>Shipping calculated at checkout</p>
                                <button className="w-full h-[50px] bg-black text-white text-[11px] tracking-[0.15em] uppercase hover:bg-gray-900 transition-colors mb-3" style={premiumFont}>Checkout</button>
                                <button className="w-full h-[50px] border border-black text-black text-[11px] tracking-[0.15em] uppercase hover:opacity-60 transition-opacity" style={premiumFont}>View Shopping Bag</button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <svg width="36" height="36" viewBox="0 0 20 20" fill="none" className="text-gray-300 mb-4">
                                <path d="M4 5h12l1 12a2 2 0 01-2 2H5a2 2 0 01-2-2l1-12z" stroke="currentColor" strokeWidth="1" />
                                <path d="M7 5V4a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1" />
                            </svg>
                            <p className="text-[12px] text-gray-400" style={premiumFont}>Your bag is empty</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
