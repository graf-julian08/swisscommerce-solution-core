// src/app/shop/[slug]/page.tsx
// Dynamic Shop Viewer - Renders a shop from database DSL

import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import { ShopRenderer } from '@/components/shop/ShopRenderer';
import type { Metadata } from 'next';
import type { WebsiteDSL } from '@/dsl/schema/website.schema';

interface ShopPageProps {
    params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ShopPageProps): Promise<Metadata> {
    const { slug } = await params;

    const shop = await prisma.shop.findUnique({
        where: { slug },
        select: { name: true, description: true },
    });

    if (!shop) {
        return { title: 'Shop Not Found' };
    }

    return {
        title: shop.name,
        description: shop.description || `Welcome to ${shop.name}`,
    };
}

export default async function ShopPage({ params }: ShopPageProps) {
    const { slug } = await params;

    // Fetch shop from database
    const shop = await prisma.shop.findUnique({
        where: {
            slug,
            status: 'ACTIVE',
            isPublic: true,
        },
    });

    // 404 if shop not found
    if (!shop) {
        notFound();
    }

    // Parse DSL from JSON
    const dsl = shop.dsl as WebsiteDSL;

    return (
        <main className="min-h-screen">
            <ShopRenderer
                dsl={dsl}
                shopName={shop.name}
                shopSlug={shop.slug}
            />
        </main>
    );
}
