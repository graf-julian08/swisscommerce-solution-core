import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { userPrompt } = await req.json();

        if (!userPrompt) {
            return NextResponse.json({ error: 'User prompt is required' }, { status: 400 });
        }

        const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
        const model = process.env.OLLAMA_MODEL || 'gemma3:4b';

        // --- STEP 1: SEMANTIC CLASSIFICATION (AI GUARDRAIL) ---
        // We use the LLM to understand the intent, regardless of language or phrasing.
        try {
            // Define the allowed Universe of Categories
            const definedCategories = [
                "FASHION",     // Clothing, Shoes, Bags, Jewelry, High-Fashion
                "BEAUTY",      // Cosmetics, Make-up, Perfume, Skincare
                "TOYS",        // Games, Lego, Dolls, Kids, Hobbies
                "HOME",        // Furniture, Decor, Kitchen, Living, Garden
                "ELECTRONICS", // Tech, Gadgets, Gaming Hardware, Phones
                "AUTOMOTIVE",  // Cars, Bikes, Parts
                "FOOD",        // Groceries, Supplements, Drinks
                "SPORTS",      // Fitness, Gym, Equipment, Outdoor
                "ART",         // Design, Prints, Posters
                "OTHER"        // B2B, Services, Miscellaneous
            ];

            const classificationPrompt = `
             You are a sophisticated Semantics Understanding Engine.
             Your job is to analyze the User's Request (on how to build a website) and categorize it into exactly ONE of the following categories.
             
             CATEGORIES: [${definedCategories.join(", ")}]

             USER REQUEST: "${userPrompt}"

             RULES:
             1. Analyze the intent. "Spielsachen" = TOYS. "Velvet Dress" = FASHION. "Organic Cream" = BEAUTY.
             2. Be robust to language (German, English, French, etc.).
             3. Return ONLY the category name. No other text.

             OUTPUT FORMAT:
             JUST ONE WORD (e.g. FASHION)
             `;

            const classResponse = await fetch(`${ollamaUrl}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: model,
                    prompt: classificationPrompt,
                    stream: false
                }),
            });

            if (classResponse.ok) {
                const classData = await classResponse.json();
                let detectedCategory = classData.response.trim().toUpperCase();

                // Cleanup potential extra chars if LLM fails strict instruction
                detectedCategory = detectedCategory.replace(/[^A-Z]/g, '');

                // Fallback if not in list
                if (!definedCategories.includes(detectedCategory)) {
                    // Try to match partial
                    const partialMatch = definedCategories.find(c => detectedCategory.includes(c));
                    detectedCategory = partialMatch || "OTHER";
                }

                console.log(`[Semantic Guardrail] Analyzed: "${userPrompt}" -> Detected: ${detectedCategory}`);

                // --- STRICT FILTERING ---
                if (detectedCategory !== 'FASHION') {
                    // Get list of all OTHER categories to show user
                    const otherCats = definedCategories.filter(c => c !== 'FASHION').join(", ");

                    return NextResponse.json({
                        error: `🛑 BLOCKED: You are trying to generate a '${detectedCategory}' shop.`,
                        details: `Currently, I am strictly limited to valid FASHION prompts.\n\nI successfully detected your intent ('${detectedCategory}'), but I can only proceed if the intent is FASHION.\n\nDefined Categories: ${definedCategories.join(", ")}`
                    }, { status: 400 });
                }
            }

        } catch (e) {
            console.warn("Semantic Guardrail Failed (Network Issue?). Proceeding with caution.", e);
        }

        // --- STEP 2: MASTER PROMPT GENERATION (If Fashion) ---

        const systemPrompt = `
You are a World-Class Creative Director for Luxury Brands (e.g., LVMH, Kering).
Your task is to translate a user's idea into a "MASTER_PROMPT" for a digital flagship store.

USER CONCEPT: "${userPrompt}"

OBJECTIVE:
Create a specification for a website that screams "EXPENSIVE", "EXCLUSIVE", and "AVANT-GARDE".
Avoid generic descriptions. Use the language of high-end design magazines (Wallpaper*, Vogue).

GENERATE A MASTER_PROMPT COVERING:
1.  **Brand DNA**: Name (short, abstract), Tagline (enigmatic), Personality (e.g., "The brutalist elegance of Rick Owens meets the purity of Apple").
2.  **Visual Language (CRITICAL)**:
    -   *Typography*: Specify "Massive Serif Headlines" vs "Tech Mono body" or similar contrasts.
    -   *Layout*: "Asymmetrical grids", "Overlapping elements", "Edge-to-edge imagery".
    -   *Whitespace*: "Excessive negative space to create breathing room".
    -   *Colors*: Strict palette. "Monochrome with a single electric blue accent" or "Earthy clay tones".
3.  **Core Journey**:
    -   Home: "Immersive video hero, no text, just feeling."
    -   Shop: "Gallery view, clean lines, no clutter."
    -   Product: "Split screen, sticky details, cinematic sticky scrolling."
4.  **Interaction**: "Butter-smooth parallax", "Magnetic cursor", "Staggered reveal animations".

OUTPUT FORMAT:
Return ONLY the specific "MASTER_PROMPT" text.
`;

        try {
            const response = await fetch(`${ollamaUrl}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: model,
                    prompt: systemPrompt,
                    stream: false
                }),
            });

            if (!response.ok) {
                console.error('Ollama API Error:', response.status, response.statusText);
                return NextResponse.json({ error: `Ollama API Error: ${response.statusText}` }, { status: 500 });
            }

            const data = await response.json();
            return NextResponse.json({ masterPrompt: data.response });

        } catch (fetchError) {
            console.error('Failed to connect to Ollama:', fetchError);
            return NextResponse.json({
                error: 'Failed to connect to local Ollama instance. Is it running? (ollama serve)',
                details: fetchError instanceof Error ? fetchError.message : String(fetchError)
            }, { status: 503 });
        }

    } catch (error) {
        console.error('Error generating Master Prompt:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
