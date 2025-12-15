// src/stores/cartStore.ts
// Global Cart Store with localStorage persistence
// Provides full cart functionality like Apple, Louis Vuitton, Prada

'use client';

// ============================================================
// TYPES
// ============================================================

export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    size?: string;
    color?: string;
    imageUrl?: string;
    variant?: string;
}

export interface CartState {
    items: CartItem[];
    isOpen: boolean;
    currency: 'EUR' | 'USD' | 'GBP' | 'CHF';
}

// ============================================================
// STORE IMPLEMENTATION
// ============================================================

const CART_STORAGE_KEY = 'shop_cart';

// Initial state
const initialState: CartState = {
    items: [],
    isOpen: false,
    currency: 'EUR',
};

// Subscribers for reactive updates
type Subscriber = (state: CartState) => void;
const subscribers: Set<Subscriber> = new Set();

// Current state
let state: CartState = initialState;

// Load from localStorage on init
if (typeof window !== 'undefined') {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            state = { ...initialState, items: parsed.items || [] };
        }
    } catch (e) {
        console.warn('Failed to load cart from localStorage:', e);
    }
}

// Persist to localStorage
function persist() {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: state.items }));
        } catch (e) {
            console.warn('Failed to save cart to localStorage:', e);
        }
    }
}

// Notify all subscribers
function notify() {
    subscribers.forEach(fn => fn(state));
}

// ============================================================
// PUBLIC API
// ============================================================

export const cartStore = {
    // Subscribe to state changes
    subscribe(fn: Subscriber): () => void {
        subscribers.add(fn);
        fn(state); // Call immediately with current state
        return () => subscribers.delete(fn);
    },

    // Get current state
    getState(): CartState {
        return state;
    },

    // Toggle cart drawer
    toggleCart() {
        state = { ...state, isOpen: !state.isOpen };
        notify();
    },

    openCart() {
        state = { ...state, isOpen: true };
        notify();
    },

    closeCart() {
        state = { ...state, isOpen: false };
        notify();
    },

    // Add item to cart
    addItem(item: Omit<CartItem, 'id' | 'quantity'>, quantity = 1) {
        const existingIndex = state.items.findIndex(
            i => i.productId === item.productId &&
                i.size === item.size &&
                i.color === item.color
        );

        if (existingIndex >= 0) {
            // Update quantity
            const newItems = [...state.items];
            newItems[existingIndex] = {
                ...newItems[existingIndex],
                quantity: newItems[existingIndex].quantity + quantity,
            };
            state = { ...state, items: newItems };
        } else {
            // Add new item
            const newItem: CartItem = {
                ...item,
                id: `${item.productId}-${item.size || ''}-${item.color || ''}-${Date.now()}`,
                quantity,
            };
            state = { ...state, items: [...state.items, newItem] };
        }

        persist();
        notify();

        // Auto-open cart drawer
        state = { ...state, isOpen: true };
        notify();
    },

    // Remove item from cart
    removeItem(id: string) {
        state = {
            ...state,
            items: state.items.filter(item => item.id !== id),
        };
        persist();
        notify();
    },

    // Update item quantity
    updateQuantity(id: string, quantity: number) {
        if (quantity <= 0) {
            this.removeItem(id);
            return;
        }

        state = {
            ...state,
            items: state.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            ),
        };
        persist();
        notify();
    },

    // Increment quantity
    incrementQuantity(id: string) {
        const item = state.items.find(i => i.id === id);
        if (item) {
            this.updateQuantity(id, item.quantity + 1);
        }
    },

    // Decrement quantity
    decrementQuantity(id: string) {
        const item = state.items.find(i => i.id === id);
        if (item && item.quantity > 1) {
            this.updateQuantity(id, item.quantity - 1);
        }
    },

    // Clear entire cart
    clear() {
        state = { ...state, items: [] };
        persist();
        notify();
    },

    // Calculate totals
    getSubtotal(): number {
        return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    getItemCount(): number {
        return state.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    getSavings(): number {
        return state.items.reduce((sum, item) => {
            if (item.originalPrice && item.originalPrice > item.price) {
                return sum + (item.originalPrice - item.price) * item.quantity;
            }
            return sum;
        }, 0);
    },

    // Format price
    formatPrice(amount: number): string {
        const formatter = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: state.currency,
        });
        return formatter.format(amount);
    },

    // Check if product is in cart
    isInCart(productId: string, size?: string, color?: string): boolean {
        return state.items.some(
            item => item.productId === productId &&
                (size === undefined || item.size === size) &&
                (color === undefined || item.color === color)
        );
    },

    // Get item by product ID
    getItemByProduct(productId: string, size?: string, color?: string): CartItem | undefined {
        return state.items.find(
            item => item.productId === productId &&
                (size === undefined || item.size === size) &&
                (color === undefined || item.color === color)
        );
    },
};

// ============================================================
// REACT HOOK
// ============================================================

import { useState, useEffect } from 'react';

export function useCart() {
    const [cartState, setCartState] = useState<CartState>(cartStore.getState());

    useEffect(() => {
        return cartStore.subscribe(setCartState);
    }, []);

    return {
        ...cartState,
        ...cartStore,
        subtotal: cartStore.getSubtotal(),
        itemCount: cartStore.getItemCount(),
        savings: cartStore.getSavings(),
    };
}
