
import { UIMiner } from '../core/mining/UIMiner';
import * as dotenv from 'dotenv';
import path from 'path';

// Load Env
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyALlHqk1BW05xVlvPqjvadARqBOwxURUOc';

if (!API_KEY) {
    console.error("❌ GEMINI_API_KEY missing");
    process.exit(1);
}

const miner = new UIMiner(API_KEY);

const TARGETS = [
    { domain: 'balenciaga.com', types: ['Header', 'Footer'] },
    { domain: 'bottegaveneta.com', types: ['Header', 'Footer'] },
    // Add Prada if crawled, otherwise stick to these for now
];

async function run() {
    console.log("🚀 Starting UI Mining Operation...");

    for (const target of TARGETS) {
        for (const type of target.types) {
            await miner.mineComponent(target.domain, type as any);
        }
    }

    console.log("🏁 Mining Complete!");
}

run();
