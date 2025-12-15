// src/scripts/test-pipeline.ts
// Test the complete AI Website Builder Pipeline

import { runPipeline, type PipelineInput } from '../core/pipeline/WebsitePipeline';
import { renderWebsite } from '../core/render-engine/RenderEngine';
import * as fs from 'fs';
import * as path from 'path';

// =============================================================================
// TEST PROMPTS
// =============================================================================

const TEST_PROMPTS = {
    luxuryFashion: 'Ein luxuriöser Fashion Store namens "Maison Élégance" für hochwertige Designermode. Elegante, minimalistische Ästhetik mit viel Weißraum.',

    toyStore: 'A colorful and playful toy store called "ToyWorld" for kids and parents. Fun, bright colors with rounded elements.',

    techStore: 'A modern electronics shop "TechNova" with a dark, futuristic design. Sharp edges, neon accents.',
};

// =============================================================================
// MAIN TEST
// =============================================================================

async function runTest() {
    console.log('='.repeat(60));
    console.log('🚀 AI Website Builder - Pipeline Test');
    console.log('='.repeat(60));

    // Select a test prompt
    const input: PipelineInput = {
        prompt: TEST_PROMPTS.luxuryFashion,
        options: {
            skipLLM: true, // Use deterministic mode for testing (no API calls)
            generateProducts: false,
        },
    };

    console.log('\n📝 INPUT PROMPT:');
    console.log(`"${input.prompt}"`);
    console.log('\n');

    try {
        // Step 1: Run the pipeline
        console.log('⏳ Running pipeline...\n');
        const result = await runPipeline(input);

        console.log('✅ Pipeline complete!');
        console.log('\n📊 STATS:');
        console.log(`   Time: ${result.stats.totalTimeMs}ms`);
        console.log(`   LLM Calls: ${result.stats.llmCalls}`);
        console.log(`   Tokens: ${result.stats.tokensUsed}`);
        console.log(`   Est. Cost: $${result.stats.estimatedCostUSD.toFixed(4)}`);

        console.log('\n🔍 INTERPRETED:');
        console.log(`   Vertical: ${result.interpreted.vertical}`);
        console.log(`   Brand Name: ${result.interpreted.brandNameHint || '(generated)'}`);
        console.log(`   Mood: ${result.interpreted.moodKeywords.join(', ') || 'none'}`);
        console.log(`   Price Segment: ${result.interpreted.priceSegment}`);
        console.log(`   Locale: ${result.interpreted.locale}`);

        console.log('\n🎨 CLASSIFICATION:');
        console.log(`   Personality: ${result.classification.brandPersonality}`);
        console.log(`   Layout: ${result.classification.suggestedLayout}`);
        console.log(`   Complexity: ${result.classification.complexity}`);
        console.log(`   Features: ${result.classification.features.slice(0, 5).join(', ')}...`);

        console.log('\n📄 DSL SUMMARY:');
        console.log(`   Brand: ${result.dsl.content.brand.name}`);
        console.log(`   Pages: ${result.dsl.pages.length}`);
        console.log(`   Color Preset: ${result.dsl.design.tokens.colors.preset}`);
        console.log(`   Heading Font: ${result.dsl.design.tokens.typography.fontFamily.heading}`);
        console.log(`   Animation: ${result.dsl.design.animationPack}`);

        // Step 2: Render to files
        console.log('\n⏳ Rendering to Next.js project...\n');
        const renderOutput = renderWebsite(result.dsl);

        console.log('✅ Render complete!');
        console.log(`   Generated ${renderOutput.files.length} files`);
        console.log(`   ${renderOutput.pageCount} pages`);
        console.log(`   ${renderOutput.componentCount} component instances`);

        // Step 3: Write files to output directory
        const outputDir = path.join(process.cwd(), 'generated-site');

        console.log(`\n📁 Writing files to: ${outputDir}\n`);

        // Create output directory
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Write each file
        for (const file of renderOutput.files) {
            const filePath = path.join(outputDir, file.path);
            const fileDir = path.dirname(filePath);

            if (!fs.existsSync(fileDir)) {
                fs.mkdirSync(fileDir, { recursive: true });
            }

            fs.writeFileSync(filePath, file.content);
            console.log(`   ✓ ${file.path}`);
        }

        console.log('\n' + '='.repeat(60));
        console.log('🎉 SUCCESS! Generated site is in: ./generated-site/');
        console.log('='.repeat(60));

        // Print DSL JSON for inspection
        console.log('\n📋 Full DSL (JSON):');
        console.log(JSON.stringify(result.dsl, null, 2).slice(0, 2000) + '\n...(truncated)');

    } catch (error) {
        console.error('\n❌ ERROR:', error);
        process.exit(1);
    }
}

// Run
runTest();
