
import fs from 'fs';
import path from 'path';

const MINED_BASE_PATH = path.join(process.cwd(), 'UI-Miner/library/fashion');

/**
 * Returns a mix of mined component code for the AI to synthesize.
 * @param type 'Header' | 'Footer' | 'ProductGrid'
 * @param count Number of references to return (default 3)
 */
export const getMinedComponentMix = (
    type: 'Header' | 'Footer' | 'ProductGrid',
    count: number = 3
): string[] => {
    // If directory doesn't exist yet (mining incomplete), return empty
    if (!fs.existsSync(MINED_BASE_PATH)) {
        console.warn(`[MinedComponents] Library path not found: ${MINED_BASE_PATH}`);
        return [];
    }

    // Get brands (subdirectories)
    const brands = fs.readdirSync(MINED_BASE_PATH).filter(f =>
        fs.statSync(path.join(MINED_BASE_PATH, f)).isDirectory()
    );

    const validComponents: string[] = [];

    for (const brand of brands) {
        const filePath = path.join(MINED_BASE_PATH, brand, `${type}.tsx`);
        if (fs.existsSync(filePath)) {
            // Read raw code
            const code = fs.readFileSync(filePath, 'utf-8');
            // Add a header comment for context
            validComponents.push(`// REFERENCE SOURCE: ${brand.toUpperCase()} ${type.toUpperCase()}\n${code}`);
        }
    }

    if (validComponents.length === 0) {
        console.warn(`[MinedComponents] No valid components found for type ${type}`);
        return [];
    }

    // Shuffle and pick
    const shuffled = validComponents.sort(() => 0.5 - Math.random());

    // If we don't have enough, we can duplicate logic or just return what we have
    // User wants "mix of 3", if we only have 2, return 2.
    return shuffled.slice(0, count);
};
