#!/usr/bin/env npx tsx
// src/scripts/start-shop.ts
// CLI script to generate and start a Medusa shop

import { parseArgs } from 'util';
import { ShopOrchestrator } from '../core/integration/ShopOrchestrator';
import { runPipeline } from '../core/pipeline/WebsitePipeline';
import type { WebsiteDSL } from '../dsl/schema/website.schema';

// ============================================================
// CLI ARGUMENTS
// ============================================================

const { values } = parseArgs({
    options: {
        prompt: {
            type: 'string',
            short: 'p',
        },
        output: {
            type: 'string',
            short: 'o',
        },
        name: {
            type: 'string',
            short: 'n',
        },
        'no-servers': {
            type: 'boolean',
            default: false,
        },
        'no-seed': {
            type: 'boolean',
            default: false,
        },
        help: {
            type: 'boolean',
            short: 'h',
        },
    },
});

// ============================================================
// HELP TEXT
// ============================================================

const HELP_TEXT = `
🛒 Medusa Shop Generator
========================

Generate a fully functional e-commerce shop from a natural language prompt.

USAGE:
  npx tsx src/scripts/start-shop.ts --prompt "Your shop description"

OPTIONS:
  -p, --prompt <text>    Description of your shop (required)
  -n, --name <name>      Shop name for output folder (default: from prompt)
  -o, --output <path>    Output directory (default: ./generated-shops/<name>)
  --no-servers           Don't start development servers
  --no-seed              Don't seed demo products
  -h, --help             Show this help message

EXAMPLES:
  # Generate a luxury fashion shop
  npx tsx src/scripts/start-shop.ts -p "Ein luxuriöser Fashion Store namens NOIR"

  # Generate without starting servers
  npx tsx src/scripts/start-shop.ts -p "Minimalist jewelry shop AURA" --no-servers

  # Specify output directory
  npx tsx src/scripts/start-shop.ts -p "Tech gadgets store" -o ./my-shops/tech

WHAT HAPPENS:
  1. Your prompt is analyzed and converted to a design specification
  2. Medusa template is copied to output directory
  3. Config files are generated based on your prompt
  4. PostgreSQL database is started (Docker required)
  5. Database migrations are run
  6. Demo products are seeded (optional)
  7. Backend and storefront dev servers are started
  8. Browser opens with your new shop!

REQUIRES:
  - Docker Desktop (for PostgreSQL database)
  - Node.js 18+
`;

// ============================================================
// MAIN
// ============================================================

async function main() {
    // Show help
    if (values.help) {
        console.log(HELP_TEXT);
        process.exit(0);
    }

    // Validate prompt
    if (!values.prompt) {
        console.error('❌ Error: --prompt is required');
        console.log('Use --help for usage information');
        process.exit(1);
    }

    const prompt = values.prompt;

    console.log('\n🚀 Starting Medusa Shop Generator...\n');
    console.log(`📝 Prompt: "${prompt}"\n`);

    try {
        // Step 1: Run pipeline to generate DSL
        console.log('🔍 Analyzing prompt and generating design specification...\n');

        const pipelineResult = await runPipeline({
            prompt,
            options: {
                generateProducts: true,
                productCount: 8,
            },
        });

        const dsl: WebsiteDSL = pipelineResult.dsl;
        const shopName = values.name || sanitizeShopName(dsl.content.brand.name);

        console.log(`\n✅ Design specification generated for: ${dsl.content.brand.name}`);
        console.log(`   Vertical: ${dsl.classification.vertical}`);
        console.log(`   Personality: ${dsl.classification.brandPersonality}`);
        console.log(`   Complexity: ${dsl.classification.complexity}\n`);

        // Step 2: Generate shop
        const orchestrator = new ShopOrchestrator();
        const outputDir = values.output || `./generated-shops/${shopName}`;

        const result = await orchestrator.generateShop(
            {
                dsl,
                outputDir,
                shopName,
                options: {
                    startServers: !values['no-servers'],
                    seedProducts: !values['no-seed'],
                },
            },
            (progress) => {
                // Progress is already logged by ShopOrchestrator
            }
        );

        if (result.success) {
            console.log('\n' + '='.repeat(60));
            console.log('🎉 SHOP GENERATION COMPLETE!');
            console.log('='.repeat(60));
            console.log(`\n📂 Output Directory: ${result.outputDir}`);
            console.log(`\n🌐 URLs:`);
            console.log(`   Storefront: ${result.storefrontUrl}`);
            console.log(`   Backend:    ${result.backendUrl}`);
            console.log(`   Admin:      ${result.adminUrl}`);
            console.log(`\n📄 Generated Config Files:`);
            result.configFiles.forEach(file => {
                console.log(`   - ${file}`);
            });

            if (!values['no-servers']) {
                console.log('\n⌨️  Press Ctrl+C to stop the servers');
                console.log('\n💡 Tip: Open the admin panel to add your own products!');
                console.log(`   Login: admin@example.com / supersecret\n`);

                // Keep process alive
                process.on('SIGINT', () => {
                    console.log('\n\n👋 Shutting down servers...');
                    if (result.processes) {
                        result.processes.backend.kill();
                        result.processes.storefront.kill();
                    }
                    process.exit(0);
                });

                // Wait forever
                await new Promise(() => { });
            }
        } else {
            console.error('\n❌ Shop generation failed:', result.error);
            process.exit(1);
        }

    } catch (error) {
        console.error('\n❌ Error:', error instanceof Error ? error.message : error);
        process.exit(1);
    }
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

// ============================================================
// RUN
// ============================================================

main();
