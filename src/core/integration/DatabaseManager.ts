// src/core/integration/DatabaseManager.ts
// Manages PostgreSQL database for Medusa backend

import { spawn, exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// ============================================================
// TYPES
// ============================================================

export interface DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

export interface DatabaseStatus {
    running: boolean;
    healthy: boolean;
    connectionUrl: string;
}

// ============================================================
// DEFAULT CONFIG
// ============================================================

const DEFAULT_CONFIG: DatabaseConfig = {
    host: 'localhost',
    port: 5432,
    user: 'medusa',
    password: 'medusa',
    database: 'medusa',
};

// ============================================================
// DATABASE MANAGER
// ============================================================

export class DatabaseManager {
    private config: DatabaseConfig;
    private containerName: string = 'medusa-postgres';

    constructor(config: Partial<DatabaseConfig> = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
    }

    /**
     * Get the PostgreSQL connection URL
     */
    getConnectionUrl(): string {
        const { user, password, host, port, database } = this.config;
        return `postgresql://${user}:${password}@${host}:${port}/${database}`;
    }

    /**
     * Check if Docker is available
     */
    async isDockerAvailable(): Promise<boolean> {
        try {
            await execAsync('docker --version');
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Check if PostgreSQL container is running
     */
    async isContainerRunning(): Promise<boolean> {
        try {
            const { stdout } = await execAsync(
                `docker ps --filter "name=${this.containerName}" --format "{{.Names}}"`
            );
            return stdout.trim() === this.containerName;
        } catch {
            return false;
        }
    }

    /**
     * Check if database is healthy and accepting connections
     */
    async isDatabaseHealthy(): Promise<boolean> {
        try {
            const { user, database } = this.config;
            await execAsync(
                `docker exec ${this.containerName} pg_isready -U ${user} -d ${database}`
            );
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Get full database status
     */
    async getStatus(): Promise<DatabaseStatus> {
        const running = await this.isContainerRunning();
        const healthy = running ? await this.isDatabaseHealthy() : false;
        return {
            running,
            healthy,
            connectionUrl: this.getConnectionUrl(),
        };
    }

    /**
     * Start PostgreSQL container with Docker
     */
    async startDatabase(): Promise<{ success: boolean; message: string }> {
        // Check Docker availability
        const dockerAvailable = await this.isDockerAvailable();
        if (!dockerAvailable) {
            return {
                success: false,
                message: 'Docker is not installed or not running. Please install Docker Desktop.',
            };
        }

        // Check if already running
        const isRunning = await this.isContainerRunning();
        if (isRunning) {
            const isHealthy = await this.isDatabaseHealthy();
            if (isHealthy) {
                return {
                    success: true,
                    message: 'PostgreSQL is already running and healthy.',
                };
            }
        }

        // Remove existing stopped container if exists
        try {
            await execAsync(`docker rm -f ${this.containerName} 2>/dev/null || true`);
        } catch {
            // Ignore errors
        }

        // Start PostgreSQL container
        const { user, password, database, port } = this.config;
        const dockerCmd = [
            'docker run -d',
            `--name ${this.containerName}`,
            `-e POSTGRES_USER=${user}`,
            `-e POSTGRES_PASSWORD=${password}`,
            `-e POSTGRES_DB=${database}`,
            `-p ${port}:5432`,
            '--restart unless-stopped',
            'postgres:15-alpine',
        ].join(' ');

        try {
            await execAsync(dockerCmd);

            // Wait for database to be ready
            let attempts = 0;
            const maxAttempts = 30;
            while (attempts < maxAttempts) {
                await this.sleep(1000);
                const isHealthy = await this.isDatabaseHealthy();
                if (isHealthy) {
                    return {
                        success: true,
                        message: `PostgreSQL started successfully on port ${port}.`,
                    };
                }
                attempts++;
            }

            return {
                success: false,
                message: 'PostgreSQL container started but database is not responding.',
            };
        } catch (error) {
            return {
                success: false,
                message: `Failed to start PostgreSQL: ${error instanceof Error ? error.message : String(error)}`,
            };
        }
    }

    /**
     * Stop PostgreSQL container
     */
    async stopDatabase(): Promise<{ success: boolean; message: string }> {
        try {
            await execAsync(`docker stop ${this.containerName}`);
            return {
                success: true,
                message: 'PostgreSQL stopped successfully.',
            };
        } catch (error) {
            return {
                success: false,
                message: `Failed to stop PostgreSQL: ${error instanceof Error ? error.message : String(error)}`,
            };
        }
    }

    /**
     * Run Medusa migrations
     */
    async runMigrations(backendPath: string): Promise<{ success: boolean; message: string }> {
        return new Promise((resolve) => {
            const migrate = spawn('npx', ['medusa', 'db:migrate'], {
                cwd: backendPath,
                env: {
                    ...process.env,
                    DATABASE_URL: this.getConnectionUrl(),
                },
                shell: true,
            });

            let output = '';
            let errorOutput = '';

            migrate.stdout.on('data', (data) => {
                output += data.toString();
            });

            migrate.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            migrate.on('close', (code) => {
                if (code === 0) {
                    resolve({
                        success: true,
                        message: 'Migrations completed successfully.',
                    });
                } else {
                    resolve({
                        success: false,
                        message: `Migrations failed: ${errorOutput || output}`,
                    });
                }
            });

            migrate.on('error', (error) => {
                resolve({
                    success: false,
                    message: `Migration process error: ${error.message}`,
                });
            });
        });
    }

    /**
     * Seed demo products
     */
    async seedProducts(backendPath: string): Promise<{ success: boolean; message: string }> {
        return new Promise((resolve) => {
            const seed = spawn('npx', ['medusa', 'seed', '-f', 'src/scripts/seed.ts'], {
                cwd: backendPath,
                env: {
                    ...process.env,
                    DATABASE_URL: this.getConnectionUrl(),
                },
                shell: true,
            });

            let output = '';
            let errorOutput = '';

            seed.stdout.on('data', (data) => {
                output += data.toString();
            });

            seed.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            seed.on('close', (code) => {
                if (code === 0) {
                    resolve({
                        success: true,
                        message: 'Products seeded successfully.',
                    });
                } else {
                    resolve({
                        success: false,
                        message: `Seeding failed: ${errorOutput || output}`,
                    });
                }
            });

            seed.on('error', (error) => {
                resolve({
                    success: false,
                    message: `Seed process error: ${error.message}`,
                });
            });
        });
    }

    /**
     * Create admin user for Medusa
     */
    async createAdminUser(
        backendPath: string,
        email: string = 'admin@example.com',
        password: string = 'supersecret'
    ): Promise<{ success: boolean; message: string }> {
        return new Promise((resolve) => {
            const createUser = spawn(
                'npx',
                ['medusa', 'user', '-e', email, '-p', password],
                {
                    cwd: backendPath,
                    env: {
                        ...process.env,
                        DATABASE_URL: this.getConnectionUrl(),
                    },
                    shell: true,
                }
            );

            let output = '';
            let errorOutput = '';

            createUser.stdout.on('data', (data) => {
                output += data.toString();
            });

            createUser.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            createUser.on('close', (code) => {
                if (code === 0) {
                    resolve({
                        success: true,
                        message: `Admin user created: ${email}`,
                    });
                } else {
                    // User might already exist
                    if (errorOutput.includes('already exists') || output.includes('already exists')) {
                        resolve({
                            success: true,
                            message: `Admin user already exists: ${email}`,
                        });
                    } else {
                        resolve({
                            success: false,
                            message: `Failed to create admin user: ${errorOutput || output}`,
                        });
                    }
                }
            });

            createUser.on('error', (error) => {
                resolve({
                    success: false,
                    message: `Create user process error: ${error.message}`,
                });
            });
        });
    }

    /**
     * Generate .env file for backend
     */
    generateEnvFile(): string {
        const url = this.getConnectionUrl();
        return `# Medusa Backend Environment
# Auto-generated by DatabaseManager

DATABASE_URL="${url}"

# JWT Secret (change in production!)
JWT_SECRET="supersecret-jwt-token-change-me"
COOKIE_SECRET="supersecret-cookie-token-change-me"

# CORS Settings
STORE_CORS="http://localhost:3000,http://localhost:3001"
ADMIN_CORS="http://localhost:9000"
AUTH_CORS="http://localhost:3000,http://localhost:3001,http://localhost:9000"

# Stripe (optional)
# STRIPE_API_KEY=sk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...

# Redis (optional, for production)
# REDIS_URL=redis://localhost:6379
`;
    }

    /**
     * Generate .env file for storefront
     */
    generateStorefrontEnvFile(): string {
        return `# Medusa Storefront Environment
# Auto-generated by DatabaseManager

NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_SITE_URL=http://localhost:3001

# Medusa Publishable API Key (get from Medusa admin)
# NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...
`;
    }

    /**
     * Utility sleep function
     */
    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

// ============================================================
// EXPORTS
// ============================================================

export const defaultDatabaseManager = new DatabaseManager();
