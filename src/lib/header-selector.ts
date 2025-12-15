/**
 * Header Selector - Intelligent header selection for fashion shops
 * 
 * This module analyzes the user prompt and selects the best-matching
 * header design from the 11 available options.
 */

import headerMetadata from '@/data/header-designs-metadata.json';
import fs from 'fs';
import path from 'path';

export interface HeaderMatch {
    designId: string;
    designName: string;
    score: number;
    reasons: string[];
    componentPath: string;
}

interface HeaderDesign {
    id: string;
    name: string;
    componentPath: string;
    vibe: string[];
    layout: string;
    logoStyle: string;
    fontStyle: string;
    fontFamily: string;
    animationStyle: string;
    features: string[];
    description: string;
}

/**
 * Extract vibe keywords from user prompt
 */
function extractVibeKeywords(prompt: string): string[] {
    const promptLower = prompt.toLowerCase();
    const vibes: string[] = [];

    // Check for explicit vibe mentions
    const vibeMap: Record<string, string[]> = {
        luxury: ['luxury', 'luxurious', 'high-end', 'premium', 'exclusive', 'upscale', 'designer', 'luxus', 'edel', 'hochwertig', 'teuer', 'exklusiv'],
        minimal: ['minimal', 'minimalist', 'clean', 'simple', 'understated', 'quiet', 'refined', 'schlicht', 'einfach', 'puristisch', 'reduziert'],
        editorial: ['editorial', 'magazine', 'vogue', 'harpers', 'fashion-forward', 'avant-garde', 'magazin', 'redaktionell', 'modezeitschrift'],
        brutalist: ['brutalist', 'bold', 'stark', 'modern', 'acne', 'scandinavian', 'robau', 'beton', 'kantig', 'hart'],
        classic: ['classic', 'timeless', 'heritage', 'traditional', 'americana', 'ralph lauren', 'preppy', 'klassisch', 'zeitlos', 'traditionell'],
        architectural: ['architectural', 'structural', 'geometric', 'grid', 'jil sander', 'the row', 'architektonisch', 'geometrisch', 'struktur'],
        jewellery: ['jewellery', 'jewelry', 'cartier', 'van cleef', 'diamond', 'gold', 'precious', 'schmuck', 'juwelier', 'diamant', 'edelstein'],
        streetwear: ['streetwear', 'street', 'urban', 'youth', 'hypebeast', 'strasse', 'jugend']
    };

    for (const [vibe, keywords] of Object.entries(vibeMap)) {
        if (keywords.some(kw => promptLower.includes(kw))) {
            vibes.push(vibe);
        }
    }

    return vibes;
}

/**
 * Extract brand hints from user prompt
 */
function extractBrandHints(prompt: string): string[] {
    const promptLower = prompt.toLowerCase();
    const brands: string[] = [];

    const brandMap: Record<string, string[]> = {
        'lv-style': ['louis vuitton', 'lv', 'maison'],
        'prada-style': ['prada'],
        'cartier': ['cartier', 'van cleef', 'jewellery'],
        'acne': ['acne', 'acne studios'],
        'the-row': ['the row', 'olsen'],
        'ralph-lauren': ['ralph lauren', 'polo', 'tommy hilfiger'],
        'aesop': ['aesop', 'cos'],
        'bottega': ['bottega veneta', 'bottega']
    };

    for (const [brand, keywords] of Object.entries(brandMap)) {
        if (keywords.some(kw => promptLower.includes(kw))) {
            brands.push(brand);
        }
    }

    return brands;
}

/**
 * Calculate match score between prompt and header design
 */
function calculateMatchScore(design: HeaderDesign, vibes: string[], brands: string[]): { score: number; reasons: string[] } {
    let score = 0;
    const reasons: string[] = [];

    // Match vibes (strongest signal)
    for (const vibe of vibes) {
        if (design.vibe.includes(vibe)) {
            score += 20;
            reasons.push(`Matches "${vibe}" aesthetic`);
        }
    }

    // Match brand hints (very strong signal)
    for (const brand of brands) {
        if (design.vibe.includes(brand)) {
            score += 30;
            reasons.push(`Inspired by ${brand.replace('-', ' ')}`);
        }
    }

    // Bonus for production-ready design
    if (design.vibe.includes('production-ready') || design.vibe.includes('ultimate')) {
        score += 5;
        reasons.push('Production-ready quality');
    }

    // Feature bonuses
    if (design.features.includes('mini-cart')) {
        score += 3;
    }
    if (design.features.includes('search-overlay')) {
        score += 2;
    }

    return { score, reasons };
}

/**
 * Select the best matching header design for a fashion shop
 * IMPORTANT: Adds randomization to ensure variety - picks from top matches
 */
export function selectBestHeader(userPrompt: string, blueprint?: Record<string, unknown>): HeaderMatch {
    const designs = headerMetadata.designs as HeaderDesign[];

    // Extract signals from prompt
    const vibes = extractVibeKeywords(userPrompt);
    const brands = extractBrandHints(userPrompt);

    // Calculate scores for all designs
    const scored = designs.map(design => {
        const { score, reasons } = calculateMatchScore(design, vibes, brands);
        // Add random variation to ensure different headers get selected
        const randomBonus = Math.floor(Math.random() * 15);
        return {
            designId: design.id,
            designName: design.name,
            componentPath: design.componentPath,
            score: score + randomBonus,
            reasons
        };
    });

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    // If no strong match (score < 10 before random), pick randomly from all designs
    if (scored[0].score < 10) {
        // Pick randomly from all designs for maximum variety
        const randomIndex = Math.floor(Math.random() * designs.length);
        const randomDesign = designs[randomIndex];
        return {
            designId: randomDesign.id,
            designName: randomDesign.name,
            componentPath: randomDesign.componentPath,
            score: 0,
            reasons: [`Randomly selected "${randomDesign.name}" for variety`]
        };
    }

    // Pick randomly from top 3 matches for variety
    const topMatches = scored.slice(0, Math.min(3, scored.length));
    const selectedIndex = Math.floor(Math.random() * topMatches.length);
    const selected = topMatches[selectedIndex];

    console.log(`[Header Selector] Top 3 candidates: ${topMatches.map(m => m.designName).join(', ')}`);
    console.log(`[Header Selector] Randomly picked: ${selected.designName}`);

    return selected;
}

/**
 * Load the source code of a header design
 */
export async function loadHeaderSourceCode(designId: string): Promise<string> {
    const design = (headerMetadata.designs as HeaderDesign[]).find(d => d.id === designId);
    if (!design) {
        throw new Error(`Header design ${designId} not found`);
    }

    // Convert component path to file path
    const designNumber = designId.replace('design', '');
    const filePath = path.join(
        process.cwd(),
        'src/components/site-components/fashion/header',
        `Design${designNumber}.tsx`
    );

    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8');
    }

    throw new Error(`Header design file not found: ${filePath}`);
}

/**
 * Get header design metadata
 */
export function getHeaderMetadata(designId: string): HeaderDesign | undefined {
    return (headerMetadata.designs as HeaderDesign[]).find(d => d.id === designId);
}

export default { selectBestHeader, loadHeaderSourceCode, getHeaderMetadata };
