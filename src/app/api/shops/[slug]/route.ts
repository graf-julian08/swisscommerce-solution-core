// src/app/api/shops/[slug]/route.ts
// API for individual shop operations

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

interface RouteParams {
    params: Promise<{ slug: string }>;
}

// ============================================================
// GET - Get single shop by slug
// ============================================================

export async function GET(
    request: NextRequest,
    { params }: RouteParams
): Promise<NextResponse> {
    try {
        const { slug } = await params;

        const shop = await prisma.shop.findUnique({
            where: { slug },
        });

        if (!shop) {
            return NextResponse.json(
                { success: false, error: 'Shop not found' },
                { status: 404 }
            );
        }

        const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'aproteatelier.com';

        return NextResponse.json({
            success: true,
            shop: {
                ...shop,
                url: `https://${shop.slug}.${rootDomain}`,
            },
        });

    } catch (error) {
        console.error('[shops/get] Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch shop' },
            { status: 500 }
        );
    }
}

// ============================================================
// DELETE - Delete/archive a shop
// ============================================================

export async function DELETE(
    request: NextRequest,
    { params }: RouteParams
): Promise<NextResponse> {
    try {
        const { slug } = await params;

        // Soft delete by changing status
        const shop = await prisma.shop.update({
            where: { slug },
            data: { status: 'ARCHIVED' },
        });

        return NextResponse.json({
            success: true,
            message: `Shop "${shop.name}" archived`,
        });

    } catch (error) {
        console.error('[shops/delete] Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete shop' },
            { status: 500 }
        );
    }
}

// ============================================================
// PATCH - Update shop status
// ============================================================

export async function PATCH(
    request: NextRequest,
    { params }: RouteParams
): Promise<NextResponse> {
    try {
        const { slug } = await params;
        const body = await request.json();

        const updateData: Record<string, unknown> = {};

        if (body.status) {
            updateData.status = body.status;
        }
        if (typeof body.isPublic === 'boolean') {
            updateData.isPublic = body.isPublic;
        }
        if (body.name) {
            updateData.name = body.name;
        }

        const shop = await prisma.shop.update({
            where: { slug },
            data: updateData,
        });

        return NextResponse.json({
            success: true,
            shop,
        });

    } catch (error) {
        console.error('[shops/patch] Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update shop' },
            { status: 500 }
        );
    }
}
