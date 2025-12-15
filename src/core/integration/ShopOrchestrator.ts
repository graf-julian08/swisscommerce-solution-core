// src/core/integration/ShopOrchestrator.ts
// Main orchestrator for generating complete Medusa shops

import { spawn, ChildProcess } from 'child_process';
import { promises as fs } from 'fs';
import * as path from 'path';
import type { WebsiteDSL } from '../../dsl/schema/website.schema';
import { generateMedusaConfigs } from './ConfigGenerator';
import { DatabaseManager } from './DatabaseManager';

// ============================================================
// TYPES
// ============================================================

export interface ShopGenerationInput {
    dsl: WebsiteDSL;
    outputDir: string;
    shopName: string;
    options?: ShopGenerationOptions;
}

export interface ShopGenerationOptions {
    startServers?: boolean;
    seedProducts?: boolean;
    createAdmin?: boolean;
    adminEmail?: string;
    adminPassword?: string;
    storefrontPort?: number;
    backendPort?: number;
}

export interface ShopGenerationResult {
    success: boolean;
    shopName: string;
    outputDir: string;
    storefrontUrl: string;
    backendUrl: string;
    adminUrl: string;
    configFiles: string[];
    processes?: {
        backend: ChildProcess;
        storefront: ChildProcess;
    };
    error?: string;
}

export interface GenerationProgress {
    step: string;
    progress: number;
    message: string;
}

type ProgressCallback = (progress: GenerationProgress) => void;

// ============================================================
// CONSTANTS
// ============================================================

const DEFAULT_OPTIONS: Required<ShopGenerationOptions> = {
    startServers: true,
    seedProducts: true,
    createAdmin: true,
    adminEmail: 'admin@example.com',
    adminPassword: 'supersecret',
    storefrontPort: 3001,
    backendPort: 9000,
};

// ============================================================
// SHOP ORCHESTRATOR
// ============================================================

export class ShopOrchestrator {
    private templatePath: string;
    private dbManager: DatabaseManager;

    constructor(templatePath?: string) {
        // Default to Medusa_Shop in project root
        this.templatePath = templatePath || path.join(process.cwd(), 'Medusa_Shop');
        this.dbManager = new DatabaseManager();
    }

    /**
     * Generate a complete shop from DSL
     */
    async generateShop(
        input: ShopGenerationInput,
        onProgress?: ProgressCallback
    ): Promise<ShopGenerationResult> {
        const options = { ...DEFAULT_OPTIONS, ...input.options };
        const { dsl, outputDir, shopName } = input;

        const configFiles: string[] = [];

        try {
            // Step 1: Copy template
            this.report(onProgress, 'copy', 10, 'Copying Medusa template...');
            await this.copyTemplate(outputDir);

            // Step 2: Generate config files
            this.report(onProgress, 'config', 25, 'Generating configuration files...');
            const configs = generateMedusaConfigs(dsl);

            // Step 3: Write config files
            this.report(onProgress, 'write', 35, 'Writing config files...');
            const storefrontConfigPath = path.join(outputDir, 'storefront', 'config');

            await fs.writeFile(
                path.join(storefrontConfigPath, 'site.ts'),
                configs.siteConfig
            );
            configFiles.push('config/site.ts');

            await fs.writeFile(
                path.join(storefrontConfigPath, 'theme.ts'),
                configs.themeConfig
            );
            configFiles.push('config/theme.ts');

            await fs.writeFile(
                path.join(storefrontConfigPath, 'navigation.ts'),
                configs.navigationConfig
            );
            configFiles.push('config/navigation.ts');

            await fs.writeFile(
                path.join(storefrontConfigPath, 'content.ts'),
                configs.contentConfig
            );
            configFiles.push('config/content.ts');

            await fs.writeFile(
                path.join(storefrontConfigPath, 'features.ts'),
                configs.featuresConfig
            );
            configFiles.push('config/features.ts');

            // Step 4: Generate env files
            this.report(onProgress, 'env', 45, 'Generating environment files...');
            const backendPath = path.join(outputDir, 'backend');
            const storefrontPath = path.join(outputDir, 'storefront');

            await fs.writeFile(
                path.join(backendPath, '.env'),
                this.dbManager.generateEnvFile()
            );
            configFiles.push('backend/.env');

            await fs.writeFile(
                path.join(storefrontPath, '.env'),
                this.dbManager.generateStorefrontEnvFile()
            );
            configFiles.push('storefront/.env');

            // Step 5: Start database if needed
            if (options.startServers) {
                this.report(onProgress, 'database', 50, 'Starting PostgreSQL database...');
                const dbResult = await this.dbManager.startDatabase();
                if (!dbResult.success) {
                    throw new Error(dbResult.message);
                }

                // Step 6: Run migrations
                this.report(onProgress, 'migrations', 60, 'Running database migrations...');
                const migrationResult = await this.dbManager.runMigrations(backendPath);
                if (!migrationResult.success) {
                    console.warn('Migration warning:', migrationResult.message);
                }

                // Step 7: Seed products
                if (options.seedProducts) {
                    this.report(onProgress, 'seed', 70, 'Seeding demo products...');
                    const seedResult = await this.dbManager.seedProducts(backendPath);
                    if (!seedResult.success) {
                        console.warn('Seed warning:', seedResult.message);
                    }
                }

                // Step 8: Create admin user
                if (options.createAdmin) {
                    this.report(onProgress, 'admin', 75, 'Creating admin user...');
                    await this.dbManager.createAdminUser(
                        backendPath,
                        options.adminEmail,
                        options.adminPassword
                    );
                }

                // Step 9: Start servers
                this.report(onProgress, 'servers', 80, 'Starting development servers...');
                const processes = await this.startServers(
                    backendPath,
                    storefrontPath,
                    options.backendPort,
                    options.storefrontPort
                );

                this.report(onProgress, 'complete', 100, 'Shop generation complete!');

                return {
                    success: true,
                    shopName,
                    outputDir,
                    storefrontUrl: `http://localhost:${options.storefrontPort}`,
                    backendUrl: `http://localhost:${options.backendPort}`,
                    adminUrl: `http://localhost:${options.backendPort}/app`,
                    configFiles,
                    processes,
                };
            }

            // Without servers
            this.report(onProgress, 'complete', 100, 'Shop generation complete!');
            return {
                success: true,
                shopName,
                outputDir,
                storefrontUrl: `http://localhost:${options.storefrontPort}`,
                backendUrl: `http://localhost:${options.backendPort}`,
                adminUrl: `http://localhost:${options.backendPort}/app`,
                configFiles,
            };

        } catch (error) {
            return {
                success: false,
                shopName,
                outputDir,
                storefrontUrl: '',
                backendUrl: '',
                adminUrl: '',
                configFiles,
                error: error instanceof Error ? error.message : String(error),
            };
        }
    }

    /**
     * Copy the Medusa template to output directory
     */
    private async copyTemplate(outputDir: string): Promise<void> {
        // Check if template exists
        try {
            await fs.access(this.templatePath);
        } catch {
            throw new Error(`Medusa template not found at ${this.templatePath}`);
        }

        // Create output directory
        await fs.mkdir(outputDir, { recursive: true });

        // Copy backend (excluding node_modules)
        await this.copyDirectory(
            path.join(this.templatePath, 'backend'),
            path.join(outputDir, 'backend'),
            ['node_modules', '.next', '.medusa', '*.log']
        );

        // Copy storefront (excluding node_modules)
        await this.copyDirectory(
            path.join(this.templatePath, 'storefront'),
            path.join(outputDir, 'storefront'),
            ['node_modules', '.next', '.git', '*.log']
        );
    }

    /**
     * Recursively copy a directory
     */
    private async copyDirectory(
        src: string,
        dest: string,
        exclude: string[] = []
    ): Promise<void> {
        await fs.mkdir(dest, { recursive: true });
        const entries = await fs.readdir(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            // Check exclusions
            const shouldExclude = exclude.some(pattern => {
                if (pattern.includes('*')) {
                    const regex = new RegExp(pattern.replace('*', '.*'));
                    return regex.test(entry.name);
                }
                return entry.name === pattern;
            });

            if (shouldExclude) continue;

            if (entry.isDirectory()) {
                await this.copyDirectory(srcPath, destPath, exclude);
            } else {
                await fs.copyFile(srcPath, destPath);
            }
        }
    }

    /**
     * Start backend and storefront development servers
     */
    private async startServers(
        backendPath: string,
        storefrontPath: string,
        backendPort: number,
        storefrontPort: number
    ): Promise<{ backend: ChildProcess; storefront: ChildProcess }> {
        // Install dependencies first
        await this.installDependencies(backendPath);
        await this.installDependencies(storefrontPath);

        // Start backend
        const backend = spawn('npm', ['run', 'dev'], {
            cwd: backendPath,
            env: {
                ...process.env,
                PORT: String(backendPort),
            },
            stdio: 'pipe',
            shell: true,
            detached: true,
        });

        // Wait for backend to start
        await this.waitForServer(`http://localhost:${backendPort}/health`, 30000);

        // Start storefront
        const storefront = spawn('npm', ['run', 'dev'], {
            cwd: storefrontPath,
            env: {
                ...process.env,
                PORT: String(storefrontPort),
            },
            stdio: 'pipe',
            shell: true,
            detached: true,
        });

        // Wait for storefront to start
        await this.waitForServer(`http://localhost:${storefrontPort}`, 30000);

        return { backend, storefront };
    }

    /**
     * Install npm dependencies
     */
    private async installDependencies(dir: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const install = spawn('npm', ['install'], {
                cwd: dir,
                stdio: 'pipe',
                shell: true,
            });

            install.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`npm install failed with code ${code}`));
                }
            });

            install.on('error', reject);
        });
    }

    /**
     * Wait for a server to be ready
     */
    private async waitForServer(url: string, timeout: number): Promise<void> {
        const start = Date.now();

        while (Date.now() - start < timeout) {
            try {
                const response = await fetch(url);
                if (response.ok || response.status < 500) {
                    return;
                }
            } catch {
                // Server not ready yet
            }
            await this.sleep(1000);
        }

        // Don't throw - server might still be starting
        console.warn(`Server at ${url} not responding within timeout, continuing anyway...`);
    }

    /**
     * Report progress
     */
    private report(
        callback: ProgressCallback | undefined,
        step: string,
        progress: number,
        message: string
    ): void {
        if (callback) {
            callback({ step, progress, message });
        }
        console.log(`[${progress}%] ${message}`);
    }

    /**
     * Utility sleep function
     */
    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

// ============================================================
// QUICK GENERATION FUNCTION
// ============================================================

/**
 * Quick function to generate a shop from DSL
 */
export async function generateShop(
    dsl: WebsiteDSL,
    shopName: string,
    options?: ShopGenerationOptions
): Promise<ShopGenerationResult> {
    const orchestrator = new ShopOrchestrator();
    const outputDir = path.join(process.cwd(), 'generated-shops', shopName);

    return orchestrator.generateShop({
        dsl,
        outputDir,
        shopName,
        options,
    });
}

