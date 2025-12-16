// src/middleware.ts
// Next.js Middleware for Subdomain Routing
// Routes shop.aproteatelier.com → /shop/[slug]

import { NextRequest, NextResponse } from 'next/server';

// Main domain - adjust for your production domain
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'aproteatelier.com';

// Subdomains that should NOT be treated as shops
const RESERVED_SUBDOMAINS = ['www', 'api', 'admin', 'app', 'dashboard'];

export const config = {
    matcher: [
        // Match all paths except static files and api routes
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
    ],
};

export default function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const hostname = request.headers.get('host') || '';

    // Get the subdomain
    const subdomain = getSubdomain(hostname);

    // Log for debugging (remove in production)
    console.log(`[Middleware] Host: ${hostname}, Subdomain: ${subdomain}, Path: ${url.pathname}`);

    // No subdomain or reserved subdomain → continue normally
    if (!subdomain || RESERVED_SUBDOMAINS.includes(subdomain)) {
        return NextResponse.next();
    }

    // Skip if already on a shop route (avoid infinite loops)
    if (url.pathname.startsWith('/shop/')) {
        return NextResponse.next();
    }

    // Skip API routes
    if (url.pathname.startsWith('/api/')) {
        return NextResponse.next();
    }

    // Rewrite to shop route: shopname.domain.com/path → /shop/shopname/path
    const shopPath = url.pathname === '/' ? '' : url.pathname;
    const rewriteUrl = new URL(`/shop/${subdomain}${shopPath}`, request.url);

    console.log(`[Middleware] Rewriting to: ${rewriteUrl.pathname}`);

    return NextResponse.rewrite(rewriteUrl);
}

/**
 * Extract subdomain from hostname
 * Examples:
 *   - "noir.aproteatelier.com" → "noir"
 *   - "aproteatelier.com" → null
 *   - "www.aproteatelier.com" → "www"
 *   - "localhost:3000" → null
 */
function getSubdomain(hostname: string): string | null {
    // Remove port if present
    const host = hostname.split(':')[0];

    // Handle localhost (no subdomain routing)
    if (host === 'localhost' || host === '127.0.0.1') {
        return null;
    }

    // Handle Vercel preview URLs (*.vercel.app)
    if (host.endsWith('.vercel.app')) {
        return null;
    }

    // Split hostname and check for subdomain
    const parts = host.split('.');

    // Need at least 3 parts for subdomain (sub.domain.tld)
    if (parts.length < 3) {
        return null;
    }

    // The subdomain is everything before the main domain
    // For "noir.aproteatelier.com", return "noir"
    const subdomain = parts[0];

    return subdomain;
}
