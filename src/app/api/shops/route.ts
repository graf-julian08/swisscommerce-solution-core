// src/app/api/shops/route.ts
// CRUD API for Shop management with database storage

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { runPipeline } from '@/core/pipeline/WebsitePipeline';

// ============================================================
// TYPES
// ============================================================

interface CreateShopRequest {
    prompt: string;
    shopName?: string;
}

interface CreateShopResponse {
    success: boolean;
    shop?: {
        id: string;
        slug: string;
        name: string;
        url: string;
    };
    error?: string;
}

// ============================================================
// POST - Create new shop from prompt
// ============================================================

export async function POST(request: NextRequest): Promise<NextResponse<CreateShopResponse>> {
    try {
        const body: CreateShopRequest = await request.json();

        // Validate
        if (!body.prompt || body.prompt.trim().length < 10) {
            return NextResponse.json(
                { success: false, error: 'Prompt must be at least 10 characters' },
                { status: 400 }
            );
        }

        const prompt = body.prompt.trim();
        console.log(`[shops/create] Starting generation for: "${prompt.substring(0, 50)}..."`);

        // Step 1: Run AI pipeline to generate DSL
        const pipelineResult = await runPipeline({
            prompt,
            options: {
                generateProducts: true,
                productCount: 8,
            },
        });

        const dsl = pipelineResult.dsl;
        const brandName = dsl.content.brand.name;

        // Generate slug from brand name
        const baseSlug = sanitizeSlug(body.shopName || brandName);
        const slug = await ensureUniqueSlug(baseSlug);

        console.log(`[shops/create] DSL generated. Brand: ${brandName}, Slug: ${slug}`);

        // Step 2: Save to database
        const shop = await prisma.shop.create({
            data: {
                slug,
                name: brandName,
                description: dsl.content.brand.description || null,
                dsl: dsl as object,
                prompt,
                status: 'ACTIVE',
                isPublic: true,
            },
        });

        console.log(`[shops/create] Shop saved to database: ${shop.id}`);

        // Generate shop URL
        const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'aproteatelier.com';
        const shopUrl = `https://${slug}.${rootDomain}`;

        return NextResponse.json({
            success: true,
            shop: {
                id: shop.id,
                slug: shop.slug,
                name: shop.name,
                url: shopUrl,
            },
        });

    } catch (error) {
        console.error('[shops/create] Error:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// ============================================================
// GET - List all shops
// ============================================================

export async function GET(): Promise<NextResponse> {
    try {
        const shops = await prisma.shop.findMany({
            where: { status: 'ACTIVE' },
            select: {
                id: true,
                slug: true,
                name: true,
                description: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });

        const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'aproteatelier.com';

        const shopsWithUrls = shops.map(shop => ({
            ...shop,
            url: `https://${shop.slug}.${rootDomain}`,
        }));

        return NextResponse.json({
            success: true,
            shops: shopsWithUrls,
            total: shops.length,
        });

    } catch (error) {
        console.error('[shops/list] Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch shops', shops: [] },
            { status: 500 }
        );
    }
}

// ============================================================
// UTILITIES
// ============================================================

function sanitizeSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 50);
}

async function ensureUniqueSlug(baseSlug: string): Promise<string> {
    let slug = baseSlug;
    let counter = 1;

    while (await prisma.shop.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
}
