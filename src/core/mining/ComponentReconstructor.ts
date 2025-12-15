
export class ComponentReconstructor {
    private apiKey: string;
    private apiUrl: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        // Mirroring route.ts endpoint exactly
        this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent?key=${apiKey}`;
    }

    async reconstructComponent(
        componentType: "Header" | "Footer" | "ProductGrid",
        brand: string,
        renderData: any,
        screenshotBase64?: string
    ): Promise<string> {
        const prompt = `
      You are an expert Frontend Engineer specialized in pixel-perfect React/Tailwind reconstruction.
      
      TASK: Reconstruct a ${componentType} component from ${brand}.
      
      INPUT CONTEXT:
      - Computed Styles (JSON): ${JSON.stringify(renderData.computed_styles?.[componentType.toLowerCase()] || {}, null, 2)}
      - DOM Data (JSON): ${JSON.stringify(renderData, null, 2).substring(0, 5000)} // Truncated to avoid token limits
      
      REQUIREMENTS:
      1.  **Framework**: React (Functional Component).
      2.  **Styling**: Tailwind CSS (Use arbitrary values if needed to match exact pixels, e.g., \`h-[60px]\`).
      3.  **Icons**: Use \`lucide-react\` imports (e.g., \`import { ShoppingBag, Menu, Search } from 'lucide-react';\`).
      4.  **Interactivity**: 
          - Add simple \`useState\` for menus/search toggles.
          - Use \`framer-motion\` for transitions (SLIDE only, no fade).
      5.  **Strict Fidelity**:
          - Font sizes, spacing, and layout must match the input data exactly.
          - If the brand uses specific uppercase/titlecase, logic, COPY IT.
      
      OUTPUT FORMAT:
      - Return ONLY the raw React component code.
      - No markdown fences, no explanations.
      - Start with imports.
      - Export default function ${brand.replace(/[^a-zA-Z]/g, '')}${componentType}().
    `;

        const parts: any[] = [{ text: prompt }];

        if (screenshotBase64) {
            parts.push({
                inlineData: {
                    mimeType: "image/png",
                    data: screenshotBase64
                }
            });
        }

        const payload = {
            contents: [{ role: 'user', parts }]
        };

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API Error ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            let code = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!code) throw new Error("No code generated");

            // Cleanup markdown formatting if present
            code = code.replace(/```tsx?/g, "").replace(/```/g, "").trim();
            return code;
        } catch (error) {
            console.error("LLM Reconstruction Failed:", error);
            throw new Error("Failed to reconstruct component");
        }
    }
}
