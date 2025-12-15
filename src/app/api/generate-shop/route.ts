// src/app/api/generate-shop/route.ts
// API endpoint for generating complete Medusa shops

import { NextRequest, NextResponse } from 'next/server';
import { ShopOrchestrator } from '@/core/integration/ShopOrchestrator';
import { runPipeline } from '@/core/pipeline/WebsitePipeline';
import path from 'path';

// ============================================================
// TYPES
// ============================================================

interface GenerateShopRequest {
    prompt: string;
    shopName?: string;
    options?: {
        startServers?: boolean;
        seedProducts?: boolean;
    };
}

interface GenerateShopResponse {
    success: boolean;
    shopName: string;
    outputDir: string;
    storefrontUrl: string;
    backendUrl: string;
    adminUrl: string;
    configFiles: string[];
    dslSummary?: {
        brandName: string;
        vertical: string;
        personality: string;
        complexity: string;
    };
    error?: string;
}

// ============================================================
// POST HANDLER
// ============================================================

export async function POST(request: NextRequest): Promise<NextResponse<GenerateShopResponse>> {
    try {
        const body: GenerateShopRequest = await request.json();

        // Validate request
        if (!body.prompt || typeof body.prompt !== 'string') {
            return NextResponse.json(
                {
                    success: false,
                    shopName: '',
                    outputDir: '',
                    storefrontUrl: '',
                    backendUrl: '',
                    adminUrl: '',
                    configFiles: [],
                    error: 'Missing required field: prompt',
                },
                { status: 400 }
            );
        }

        const prompt = body.prompt.trim();
        if (prompt.length < 10) {
            return NextResponse.json(
                {
                    success: false,
                    shopName: '',
                    outputDir: '',
                    storefrontUrl: '',
                    backendUrl: '',
                    adminUrl: '',
                    configFiles: [],
                    error: 'Prompt must be at least 10 characters long',
                },
                { status: 400 }
            );
        }

        console.log(`[generate-shop] Starting generation for prompt: "${prompt.substring(0, 50)}..."`);

        // Step 1: Run pipeline to generate DSL
        const pipelineResult = await runPipeline({
            prompt,
            options: {
                generateProducts: true,
                productCount: 8,
            },
        });

        const dsl = pipelineResult.dsl;
        const shopName = body.shopName || sanitizeShopName(dsl.content.brand.name);

        console.log(`[generate-shop] DSL generated for: ${dsl.content.brand.name}`);

        // Step 2: Generate shop
        const orchestrator = new ShopOrchestrator();
        const outputDir = path.join(process.cwd(), 'generated-shops', shopName);

        const result = await orchestrator.generateShop({
            dsl,
            outputDir,
            shopName,
            options: {
                startServers: body.options?.startServers ?? false, // Default to false for API
                seedProducts: body.options?.seedProducts ?? true,
            },
        });

        if (result.success) {
            console.log(`[generate-shop] Shop generated successfully: ${shopName}`);

            return NextResponse.json({
                success: true,
                shopName: result.shopName,
                outputDir: result.outputDir,
                storefrontUrl: result.storefrontUrl,
                backendUrl: result.backendUrl,
                adminUrl: result.adminUrl,
                configFiles: result.configFiles,
                dslSummary: {
                    brandName: dsl.content.brand.name,
                    vertical: dsl.classification.vertical,
                    personality: dsl.classification.brandPersonality,
                    complexity: dsl.classification.complexity,
                },
            });
        } else {
            console.error(`[generate-shop] Generation failed: ${result.error}`);

            return NextResponse.json(
                {
                    success: false,
                    shopName,
                    outputDir,
                    storefrontUrl: '',
                    backendUrl: '',
                    adminUrl: '',
                    configFiles: result.configFiles,
                    error: result.error,
                },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('[generate-shop] Error:', error);

        return NextResponse.json(
            {
                success: false,
                shopName: '',
                outputDir: '',
                storefrontUrl: '',
                backendUrl: '',
                adminUrl: '',
                configFiles: [],
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            },
            { status: 500 }
        );
    }
}

// ============================================================
// GET HANDLER - API Info
// ============================================================

export async function GET(): Promise<NextResponse> {
    return NextResponse.json({
        name: 'Medusa Shop Generator API',
        version: '1.0.0',
        endpoints: {
            'POST /api/generate-shop': {
                description: 'Generate a complete Medusa shop from a natural language prompt',
                body: {
                    prompt: 'string (required) - Description of your shop',
                    shopName: 'string (optional) - Custom shop name',
                    options: {
                        startServers: 'boolean (default: false) - Start dev servers after generation',
                        seedProducts: 'boolean (default: true) - Seed demo products',
                    },
                },
                response: {
                    success: 'boolean',
                    shopName: 'string',
                    outputDir: 'string',
                    storefrontUrl: 'string',
                    backendUrl: 'string',
                    adminUrl: 'string',
                    configFiles: 'string[]',
                    dslSummary: 'object',
                },
            },
        },
        examples: [
            {
                description: 'Generate a luxury fashion shop',
                request: {
                    prompt: 'Ein luxuriöser Fashion Store namens NOIR für Designermode',
                },
            },
            {
                description: 'Generate a minimalist jewelry shop',
                request: {
                    prompt: 'Minimalistischer Schmuck Shop AURA mit goldenen Akzenten',
                    shopName: 'aura-jewelry',
                },
            },
        ],
    });
}

// ============================================================
// UTILITIES
// ============================================================

function sanitizeShopName(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 50);
}
