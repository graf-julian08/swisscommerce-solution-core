import fs from 'fs';
import path from 'path';
import { ComponentReconstructor } from './ComponentReconstructor';

export class UIMiner {
    private crawlerPath: string;
    private outputPath: string;
    private reconstructor: ComponentReconstructor;

    constructor(apiKey: string) {
        this.crawlerPath = path.join(process.cwd(), 'Web-Crawler/crawled_sites_200/domains');
        this.outputPath = path.join(process.cwd(), 'src/components/mined');
        this.reconstructor = new ComponentReconstructor(apiKey);

        // Ensure output directories exist
        ['headers', 'footers', 'grids'].forEach(dir => {
            const fullPath = path.join(this.outputPath, dir);
            if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
        });
    }

    async mineComponent(domain: string, type: "Header" | "Footer" | "ProductGrid"): Promise<string | null> {
        console.log(`⛏️ Mining ${type} from ${domain}...`);

        const domainPath = path.join(this.crawlerPath, domain, 'render_home');
        const jsonPath = path.join(domainPath, 'render_data.json');
        const imgPath = path.join(domainPath, 'screenshot.png');

        if (!fs.existsSync(jsonPath)) {
            console.warn(`⚠️ No data found for ${domain}`);
            return null;
        }

        // Read Data
        const renderData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        let screenshotBase64 = undefined;

        if (fs.existsSync(imgPath)) {
            screenshotBase64 = fs.readFileSync(imgPath).toString('base64');
        }

        // Reconstruct
        try {
            const code = await this.reconstructor.reconstructComponent(type, domain, renderData, screenshotBase64);

            // Save File
            const className = `${domain.replace(/[^a-zA-Z]/g, '')}${type}`;
            const fileName = `${className}.tsx`;
            const savePath = path.join(this.outputPath, `${type.toLowerCase()}s`, fileName);

            fs.writeFileSync(savePath, code);
            console.log(`✅ Saved: ${savePath}`);
            return savePath;
        } catch (e) {
            console.error(`❌ Mining failed for ${domain}:`, e);
            return null;
        }
    }
}
