// src/components/global/CartDrawer.tsx
// Slide-out Cart Drawer Component - Luxury Style

'use client';

import React from 'react';
import { useCart } from '../../stores/cartStore';

export function CartDrawer() {
    const {
        items,
        isOpen,
        closeCart,
        removeItem,
        updateQuantity,
        subtotal,
        itemCount,
        formatPrice,
    } = useCart();

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 z-[195] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeCart}
            />

            {/* Drawer Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[200] transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="h-[70px] px-8 flex items-center justify-between border-b border-[#e5e5e5]">
                    <span
                        className="text-[11px] tracking-[0.12em] text-black uppercase"
                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                    >
                        Shopping Bag ({itemCount})
                    </span>
                    <button
                        className="flex items-center gap-2 text-black cursor-pointer hover:opacity-60 transition-opacity"
                        onClick={closeCart}
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

                {/* Content */}
                <div className="flex flex-col h-[calc(100%-70px)]">
                    {items.length > 0 ? (
                        <>
                            {/* Items List */}
                            <div className="flex-1 overflow-y-auto p-8">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 pb-6 border-b border-[#f0f0f0] mb-6">
                                        {/* Product Image */}
                                        <div
                                            className="w-[100px] aspect-[3/4] bg-[#f5f5f5] flex-shrink-0 bg-cover bg-center"
                                            style={item.imageUrl ? { backgroundImage: `url(${item.imageUrl})` } : {}}
                                        />

                                        {/* Product Info */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <p
                                                    className="text-[12px] tracking-[0.02em] text-black mb-1"
                                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                                >
                                                    {item.name}
                                                </p>
                                                {item.size && (
                                                    <p
                                                        className="text-[11px] tracking-[0.02em] text-gray-500"
                                                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                                    >
                                                        Size: {item.size}
                                                    </p>
                                                )}
                                                {item.color && (
                                                    <p
                                                        className="text-[11px] tracking-[0.02em] text-gray-500"
                                                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                                    >
                                                        Color: {item.color}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3 mt-3">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-6 h-6 flex items-center justify-center border border-[#e0e0e0] text-sm hover:border-black transition-colors"
                                                >
                                                    −
                                                </button>
                                                <span className="text-[12px] w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-6 h-6 flex items-center justify-center border border-[#e0e0e0] text-sm hover:border-black transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between mt-3">
                                                <p
                                                    className="text-[12px] tracking-[0.02em] text-black"
                                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                                >
                                                    {formatPrice(item.price * item.quantity)}
                                                </p>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-[11px] tracking-[0.02em] text-gray-400 hover:text-black transition-colors underline"
                                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-[#e5e5e5] bg-white">
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className="text-[12px] tracking-[0.04em] text-black"
                                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                    >
                                        Subtotal
                                    </span>
                                    <span
                                        className="text-[12px] tracking-[0.02em] text-black font-medium"
                                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                    >
                                        {formatPrice(subtotal)}
                                    </span>
                                </div>
                                <p
                                    className="text-[11px] text-gray-400 mb-4"
                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                >
                                    Shipping and taxes calculated at checkout
                                </p>
                                <a
                                    href="/checkout"
                                    className="block w-full h-[48px] bg-black text-white text-[11px] tracking-[0.1em] uppercase flex items-center justify-center hover:bg-[#222] transition-colors mb-3"
                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                >
                                    Proceed to Checkout
                                </a>
                                <a
                                    href="/cart"
                                    className="block w-full h-[48px] border border-black text-black text-[11px] tracking-[0.1em] uppercase flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                                >
                                    View Shopping Bag
                                </a>
                            </div>
                        </>
                    ) : (
                        /* Empty State */
                        <div className="flex-1 flex flex-col items-center justify-center px-8">
                            <svg width="48\" height="48\" viewBox="0 0 24 24\" fill="none\" className="text-gray-300 mb-4">
                                <path d="M6 8H18L19.5 20C19.6 20.8 19 21.5 18.2 21.5H5.8C5 21.5 4.4 20.8 4.5 20L6 8Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M9 8V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V8" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            <p
                                className="text-[12px] tracking-[0.04em] text-gray-400 mb-6"
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                            >
                                Your shopping bag is empty
                            </p>
                            <a
                                href="/shop"
                                className="text-[11px] tracking-[0.1em] uppercase text-black underline hover:no-underline"
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                            >
                                Continue Shopping
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default CartDrawer;
