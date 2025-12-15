
import { ComponentReconstructor } from './ComponentReconstructor';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load Env from Parent
dotenv.config({ path: path.join(process.cwd(), '../.env.local') });

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyALlHqk1BW05xVlvPqjvadARqBOwxURUOc';

if (!API_KEY) {
    console.error("❌ GEMINI_API_KEY missing");
    process.exit(1);
}

const reconstructor = new ComponentReconstructor(API_KEY);

const TARGETS = [
    { domain: 'balenciaga.com', types: ['Header', 'Footer'] },
    { domain: 'bottegaveneta.com', types: ['Header', 'Footer'] },
];

const CRAWLER_PATH = path.join(process.cwd(), '../Web-Crawler/crawled_sites_200/domains');
const OUTPUT_BASE = path.join(process.cwd(), 'library/fashion');

async function mineComponent(domain: string, type: "Header" | "Footer" | "ProductGrid") {
    console.log(`⛏️ Mining ${type} from ${domain}...`);

    const brandName = domain.split('.')[0];
    const domainPath = path.join(CRAWLER_PATH, domain, 'render_home');
    const jsonPath = path.join(domainPath, 'render_data.json');
    const imgPath = path.join(domainPath, 'screenshot.png');

    if (!fs.existsSync(jsonPath)) {
        console.warn(`⚠️ No data found for ${domain}`);
        return;
    }

    // Read Data
    const renderData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    let screenshotBase64 = undefined;

    if (fs.existsSync(imgPath)) {
        screenshotBase64 = fs.readFileSync(imgPath).toString('base64');
    }

    // Reconstruct
    try {
        const code = await reconstructor.reconstructComponent(type, domain, renderData, screenshotBase64);

        // Save Structure: library/fashion/{brand}/{type}.tsx
        const brandDir = path.join(OUTPUT_BASE, brandName);
        if (!fs.existsSync(brandDir)) fs.mkdirSync(brandDir, { recursive: true });

        const fileName = `${type}.tsx`;
        const savePath = path.join(brandDir, fileName);

        fs.writeFileSync(savePath, code);
        console.log(`✅ Saved: ${savePath}`);
    } catch (e) {
        console.error(`❌ Mining failed for ${domain}:`, e);
    }
}

async function run() {
    console.log("🚀 Starting Standalone UI Mining...");
    console.log(`📂 Reading from: ${CRAWLER_PATH}`);
    console.log(`💾 Saving to: ${OUTPUT_BASE}`);

    for (const target of TARGETS) {
        for (const type of target.types) {
            await mineComponent(target.domain, type as any);
        }
    }

    console.log("🏁 Mining Complete!");
}

run();
