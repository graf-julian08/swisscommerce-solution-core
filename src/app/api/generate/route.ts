// src/app/api/generate/route.ts
// API Route for AI Website Builder Pipeline

import { NextResponse } from 'next/server';
import { runPipeline, type PipelineInput } from '@/core/pipeline/WebsitePipeline';
import { renderWebsite } from '@/core/render-engine/RenderEngine';
import * as fs from 'fs';
import * as path from 'path';

// Store the last generated site in memory for preview
let lastGeneratedSite: {
    dsl: unknown;
    files: Array<{ path: string; content: string; type: string }>;
    globalCSS: string;
    brandName: string;
    generatedAt: string;
} | null = null;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { prompt, options = {} } = body;

        if (!prompt || typeof prompt !== 'string') {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        console.log('[API] Generating website for prompt:', prompt.slice(0, 100));

        // Run the pipeline
        const input: PipelineInput = {
            prompt,
            options: {
                skipLLM: options.skipLLM ?? true,
                generateProducts: options.generateProducts ?? false,
            },
        };

        const result = await runPipeline(input);

        // Render to files
        const renderOutput = renderWebsite(result.dsl);

        // Store in memory for preview
        lastGeneratedSite = {
            dsl: result.dsl,
            files: renderOutput.files,
            globalCSS: renderOutput.globalCSS,
            brandName: result.dsl.content.brand.name,
            generatedAt: new Date().toISOString(),
        };

        // Write files to generated-site folder
        const outputDir = path.join(process.cwd(), 'generated-site');

        for (const file of renderOutput.files) {
            const filePath = path.join(outputDir, file.path);
            const fileDir = path.dirname(filePath);

            if (!fs.existsSync(fileDir)) {
                fs.mkdirSync(fileDir, { recursive: true });
            }

            fs.writeFileSync(filePath, file.content);
        }

        return NextResponse.json({
            success: true,
            previewUrl: '/preview',
            stats: result.stats,
            interpreted: {
                vertical: result.interpreted.vertical,
                brandName: result.interpreted.brandNameHint,
                mood: result.interpreted.moodKeywords,
                locale: result.interpreted.locale,
            },
            classification: {
                personality: result.classification.brandPersonality,
                layout: result.classification.suggestedLayout,
                complexity: result.classification.complexity,
            },
            brandName: result.dsl.content.brand.name,
            pageCount: renderOutput.pageCount,
            fileCount: renderOutput.files.length,
        });

    } catch (error) {
        console.error('[API] Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

// GET endpoint to retrieve last generated site
export async function GET() {
    if (!lastGeneratedSite) {
        return NextResponse.json(
            { error: 'No site generated yet' },
            { status: 404 }
        );
    }

    return NextResponse.json(lastGeneratedSite);
}
