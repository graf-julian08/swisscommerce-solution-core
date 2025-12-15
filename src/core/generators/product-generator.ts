// src/core/generators/product-generator.ts
// Product Generation via LLM or User Input

import type { ProductContent, Vertical } from '../../dsl/schema/website.schema';

export interface ProductGenerationRequest {
    vertical: Vertical;
    brandName: string;
    brandPersonality: string;
    userProducts?: UserProductInput[];
    generateCount?: number;
    priceRange?: { min: number; max: number };
    currency?: 'EUR' | 'USD' | 'GBP' | 'CHF';
    categories?: string[];
    locale?: string;
}

export interface UserProductInput {
    name: string;
    price?: number;
    description?: string;
    category?: string;
    imageUrl?: string;
}

// ============================================================
// PRODUCT GENERATION PROMPT
// ============================================================
export function generateProductPrompt(request: ProductGenerationRequest): string {
    const {
        vertical,
        brandName,
        brandPersonality,
        generateCount = 12,
        priceRange = { min: 29, max: 299 },
        currency = 'EUR',
        categories = [],
        locale = 'en',
    } = request;

    return `You are a product catalog generator for a ${vertical} online shop.

BRAND: ${brandName}
PERSONALITY: ${brandPersonality}
LOCALE: ${locale}

Generate ${generateCount} realistic products as a JSON array.

Each product must have:
- id: Unique string ID (slug format)
- name: Product name (creative, brand-appropriate)
- slug: URL-friendly slug
- price: Number between ${priceRange.min} and ${priceRange.max}
- originalPrice: Optional, higher than price for sale items (30% chance)
- currency: "${currency}"
- images: Array with 1 placeholder URL "/images/products/{id}-1.jpg"
- category: One of ${categories.length > 0 ? JSON.stringify(categories) : '["main", "accessories", "new"]'}
- description: 2-3 sentences describing the product
- shortDescription: 1 short sentence
- badge: Optional, one of "new", "sale", "bestseller", "limited" (use sparingly)
- inStock: Boolean (90% true)
- features: Array of 3-4 feature strings

IMPORTANT:
- Names must feel authentic to a ${brandPersonality} ${vertical} brand
- Descriptions should match the brand voice
- Mix of price points within the range
- ~30% should have badges
- ~10% should be out of stock

Return ONLY valid JSON array, no markdown, no explanation.`;
}

// ============================================================
// PARSE LLM RESPONSE
// ============================================================
export function parseProductsFromLLM(response: string): ProductContent[] {
    try {
        // Clean the response - remove markdown code blocks if present
        let cleaned = response.trim();
        if (cleaned.startsWith('```json')) {
            cleaned = cleaned.slice(7);
        }
        if (cleaned.startsWith('```')) {
            cleaned = cleaned.slice(3);
        }
        if (cleaned.endsWith('```')) {
            cleaned = cleaned.slice(0, -3);
        }

        const products = JSON.parse(cleaned);

        if (!Array.isArray(products)) {
            throw new Error('Response is not an array');
        }

        // Validate and normalize each product
        return products.map(normalizeProduct);
    } catch (error) {
        console.error('Failed to parse products from LLM:', error);
        return [];
    }
}

function normalizeProduct(raw: Record<string, unknown>, index: number): ProductContent {
    return {
        id: String(raw.id || `product-${index + 1}`),
        name: String(raw.name || `Product ${index + 1}`),
        slug: String(raw.slug || raw.id || `product-${index + 1}`),
        price: Number(raw.price) || 99,
        originalPrice: raw.originalPrice ? Number(raw.originalPrice) : undefined,
        currency: (raw.currency as ProductContent['currency']) || 'EUR',
        images: Array.isArray(raw.images) ? raw.images.map(String) : [`/images/products/placeholder-${index + 1}.jpg`],
        category: String(raw.category || 'main'),
        description: String(raw.description || ''),
        shortDescription: String(raw.shortDescription || ''),
        badge: raw.badge as ProductContent['badge'],
        inStock: raw.inStock !== false,
        features: Array.isArray(raw.features) ? raw.features.map(String) : [],
    };
}

// ============================================================
// CONVERT USER INPUT TO PRODUCTS
// ============================================================
export function convertUserProducts(
    userProducts: UserProductInput[],
    vertical: Vertical,
    currency: 'EUR' | 'USD' | 'GBP' | 'CHF' = 'EUR'
): ProductContent[] {
    return userProducts.map((input, index) => ({
        id: slugify(input.name) || `product-${index + 1}`,
        name: input.name,
        slug: slugify(input.name) || `product-${index + 1}`,
        price: input.price || 99,
        currency,
        images: input.imageUrl ? [input.imageUrl] : [`/images/products/user-${index + 1}.jpg`],
        category: input.category || 'main',
        description: input.description || '',
        inStock: true,
    }));
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

// ============================================================
// VERTICAL-SPECIFIC PRODUCT TEMPLATES
// ============================================================
export const VERTICAL_PRODUCT_CATEGORIES: Record<Vertical, string[]> = {
    fashion: ['Women', 'Men', 'Accessories', 'Shoes', 'Bags'],
    luxury: ['Women', 'Men', 'Accessories', 'Jewelry', 'Bags'],
    streetwear: ['Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories'],
    toys: ['Action Figures', 'Board Games', 'Educational', 'Outdoor', 'Stuffed Animals'],
    kids: ['Toys', 'Clothing', 'Books', 'Games', 'Learning'],
    electronics: ['Phones', 'Laptops', 'Audio', 'Accessories', 'Smart Home'],
    tech: ['Gadgets', 'Accessories', 'Software', 'Hardware', 'Wearables'],
    beauty: ['Skincare', 'Makeup', 'Fragrance', 'Haircare', 'Tools'],
    cosmetics: ['Face', 'Eyes', 'Lips', 'Body', 'Sets'],
    food: ['Snacks', 'Beverages', 'Specialty', 'Organic', 'Gifts'],
    beverage: ['Coffee', 'Tea', 'Wine', 'Spirits', 'Non-Alcoholic'],
    home: ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Decor'],
    furniture: ['Seating', 'Tables', 'Storage', 'Lighting', 'Outdoor'],
    sports: ['Apparel', 'Equipment', 'Footwear', 'Accessories', 'Nutrition'],
    outdoor: ['Camping', 'Hiking', 'Cycling', 'Water Sports', 'Gear'],
    jewelry: ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches'],
    watches: ['Men', 'Women', 'Sport', 'Luxury', 'Smart Watches'],
    art: ['Paintings', 'Sculptures', 'Prints', 'Photography', 'Collectibles'],
    gallery: ['Original Art', 'Limited Editions', 'Photography', 'Sculptures', 'Prints'],
    saas: ['Starter', 'Professional', 'Enterprise', 'Add-ons', 'Support'],
    software: ['Basic', 'Pro', 'Enterprise', 'Plugins', 'Services'],
    portfolio: [],
    agency: [],
    generic: ['Category 1', 'Category 2', 'Category 3'],
};

export function getVerticalCategories(vertical: Vertical): string[] {
    return VERTICAL_PRODUCT_CATEGORIES[vertical] || VERTICAL_PRODUCT_CATEGORIES.generic;
}
