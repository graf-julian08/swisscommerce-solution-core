// src/stores/wishlistStore.ts
// Global Wishlist Store with localStorage persistence

'use client';

import { useState, useEffect } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface WishlistItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    originalPrice?: number;
    imageUrl?: string;
    addedAt: string;
}

export interface WishlistState {
    items: WishlistItem[];
    isOpen: boolean;
}

// ============================================================
// STORE IMPLEMENTATION
// ============================================================

const WISHLIST_STORAGE_KEY = 'shop_wishlist';

const initialState: WishlistState = {
    items: [],
    isOpen: false,
};

type Subscriber = (state: WishlistState) => void;
const subscribers: Set<Subscriber> = new Set();

let state: WishlistState = initialState;

// Load from localStorage
if (typeof window !== 'undefined') {
    try {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            state = { ...initialState, items: parsed.items || [] };
        }
    } catch (e) {
        console.warn('Failed to load wishlist from localStorage:', e);
    }
}

function persist() {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify({ items: state.items }));
        } catch (e) {
            console.warn('Failed to save wishlist to localStorage:', e);
        }
    }
}

function notify() {
    subscribers.forEach(fn => fn(state));
}

// ============================================================
// PUBLIC API
// ============================================================

export const wishlistStore = {
    subscribe(fn: Subscriber): () => void {
        subscribers.add(fn);
        fn(state);
        return () => subscribers.delete(fn);
    },

    getState(): WishlistState {
        return state;
    },

    toggleWishlist() {
        state = { ...state, isOpen: !state.isOpen };
        notify();
    },

    openWishlist() {
        state = { ...state, isOpen: true };
        notify();
    },

    closeWishlist() {
        state = { ...state, isOpen: false };
        notify();
    },

    // Add item to wishlist
    addItem(item: Omit<WishlistItem, 'id' | 'addedAt'>) {
        // Don't add duplicates
        if (this.isInWishlist(item.productId)) {
            return;
        }

        const newItem: WishlistItem = {
            ...item,
            id: `wishlist-${item.productId}-${Date.now()}`,
            addedAt: new Date().toISOString(),
        };
        state = { ...state, items: [...state.items, newItem] };
        persist();
        notify();
    },

    // Remove item from wishlist
    removeItem(productId: string) {
        state = {
            ...state,
            items: state.items.filter(item => item.productId !== productId),
        };
        persist();
        notify();
    },

    // Toggle item in wishlist
    toggleItem(item: Omit<WishlistItem, 'id' | 'addedAt'>) {
        if (this.isInWishlist(item.productId)) {
            this.removeItem(item.productId);
        } else {
            this.addItem(item);
        }
    },

    // Clear entire wishlist
    clear() {
        state = { ...state, items: [] };
        persist();
        notify();
    },

    // Check if product is in wishlist
    isInWishlist(productId: string): boolean {
        return state.items.some(item => item.productId === productId);
    },

    // Get item count
    getItemCount(): number {
        return state.items.length;
    },
};

// ============================================================
// REACT HOOK
// ============================================================

export function useWishlist() {
    const [wishlistState, setWishlistState] = useState<WishlistState>(wishlistStore.getState());

    useEffect(() => {
        return wishlistStore.subscribe(setWishlistState);
    }, []);

    return {
        ...wishlistState,
        ...wishlistStore,
        itemCount: wishlistStore.getItemCount(),
    };
}
