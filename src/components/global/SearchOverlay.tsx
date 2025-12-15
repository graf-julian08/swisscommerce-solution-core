// src/components/global/SearchOverlay.tsx
// Fullscreen Search Overlay - Luxury Style

'use client';

import React, { useState, useEffect, useRef } from 'react';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    products?: Array<{
        id: string;
        name: string;
        price: number;
        imageUrl?: string;
    }>;
}

export function SearchOverlay({ isOpen, onClose, products = [] }: SearchOverlayProps) {
    const [searchValue, setSearchValue] = useState('');
    const [recentSearches] = useState(['Silk Dress', 'Leather Bag', 'Gold Ring']);
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Clear search on close
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => setSearchValue(''), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Filter products based on search
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Mock featured products if no products provided
    const displayProducts = searchValue && filteredProducts.length > 0
        ? filteredProducts
        : [
            { id: '1', name: 'Maison Silk Dress', price: 2450, imageUrl: '' },
            { id: '2', name: 'Leather Tote', price: 3200, imageUrl: '' },
            { id: '3', name: 'Gold Pendant', price: 1850, imageUrl: '' },
            { id: '4', name: 'Cashmere Wrap', price: 890, imageUrl: '' },
            { id: '5', name: 'Silk Blouse', price: 1150, imageUrl: '' },
            { id: '6', name: 'Leather Belt', price: 590, imageUrl: '' },
        ];

    return (
        <>
            {/* Search Header - Slides down over main header */}
            <div
                className={`fixed top-0 left-0 right-0 h-[70px] bg-white z-[300] border-b border-[#e5e5e5] transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : '-translate-y-full'
                    }`}
                style={{ transitionDelay: isOpen ? '0ms' : '320ms' }}
            >
                <div className="w-full px-6 sm:px-12 h-full flex items-center justify-between">
                    {/* Search Input */}
                    <div className="flex items-center gap-3 flex-1">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="text-black flex-shrink-0">
                            <circle cx="10.5" cy="10.5" r="7" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search products, collections..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="flex-1 text-[14px] tracking-[0.02em] text-black placeholder-gray-400 bg-transparent border-none outline-none"
                            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                        />
                    </div>

                    {/* Close Button */}
                    <button
                        className="flex items-center gap-2 text-black cursor-pointer hover:opacity-60 transition-opacity"
                        onClick={onClose}
                    >
                        <span
                            className="text-[11px] tracking-[0.12em]"
                            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                        >
                            Close
                        </span>
                        <div className="relative w-[14px] h-[14px]">
                            <span className="absolute top-1/2 left-0 w-full h-[1px] bg-black -translate-y-1/2 rotate-45" />
                            <span className="absolute top-1/2 left-0 w-full h-[1px] bg-black -translate-y-1/2 -rotate-45" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Search Content Panel */}
            <div
                className={`fixed top-[70px] left-0 right-0 bg-white z-[299] transition-transform duration-500 ease-out overflow-hidden ${isOpen ? 'translate-y-0' : '-translate-y-[calc(100%+70px)]'
                    }`}
                style={{
                    height: 'calc(100vh - 70px)',
                    transitionDelay: isOpen ? '175ms' : '0ms',
                }}
            >
                <div className="h-full overflow-y-auto">
                    {/* Recent Searches */}
                    {!searchValue && (
                        <div className="px-6 sm:px-12 py-8 border-b border-[#f0f0f0]">
                            <p
                                className="text-[11px] tracking-[0.12em] uppercase text-gray-400 mb-4"
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                            >
                                Recent Searches
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {recentSearches.map((term) => (
                                    <button
                                        key={term}
                                        onClick={() => setSearchValue(term)}
                                        className="px-4 py-2 bg-[#f8f8f8] text-[12px] text-black hover:bg-[#efefef] transition-colors"
                                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="px-6 sm:px-12 py-8">
                        <p
                            className="text-[11px] tracking-[0.12em] uppercase text-gray-400 mb-6"
                            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                        >
                            {searchValue ? `Results for "${searchValue}"` : 'Featured Products'}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                            {displayProducts.slice(0, 8).map((product) => (
                                <a key={product.id} href={`/product/${product.id}`} className="group block">
                                    <div
                                        className="aspect-[3/4] bg-[#f5f5f5] mb-4 bg-cover bg-center group-hover:opacity-90 transition-opacity"
                                        style={product.imageUrl ? { backgroundImage: `url(${product.imageUrl})` } : {}}
                                    />
                                    <p
                                        className="text-[12px] tracking-[0.02em] text-black mb-1"
                                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                    >
                                        {product.name}
                                    </p>
                                    <p
                                        className="text-[11px] tracking-[0.02em] text-gray-500"
                                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                    >
                                        € {product.price.toLocaleString()}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="py-8 flex items-center justify-center gap-8 border-t border-[#f0f0f0]">
                        {['Need help?', 'Contact us', 'Store locator'].map((item) => (
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
                </div>
            </div>

            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 z-[298] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />
        </>
    );
}

export default SearchOverlay;
