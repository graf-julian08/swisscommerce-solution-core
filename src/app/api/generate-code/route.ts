import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { selectBestHeader, loadHeaderSourceCode, getHeaderMetadata } from '@/lib/header-selector';
import { customizeHeader, loadHeaderGuidelines } from '@/lib/header-customizer';
import { getMinedComponentMix } from '@/lib/mined-components';

const getRandomInspiration = (userPrompt: string = "", categoryOverride: string | null = null) => {
    try {
        const crawlerDir = path.join(process.cwd(), 'Web-Crawler/crawled_sites_200/domains');
        if (!fs.existsSync(crawlerDir)) return null;

        // Load Taxonomy
        let taxonomy: Record<string, string[]> = {};
        try {
            const taxPath = path.join(process.cwd(), 'src/data/domain_taxonomy.json');
            if (fs.existsSync(taxPath)) {
                taxonomy = JSON.parse(fs.readFileSync(taxPath, 'utf-8'));
            }
        } catch (e) {
            console.warn("Could not allow taxonomy", e);
        }

        let selectedCategory: string[] | null = null;
        let categoryName = "Random High-End";

        // Logic Override for Phase 3:
        if (categoryOverride && taxonomy[categoryOverride]) {
            selectedCategory = taxonomy[categoryOverride];
            categoryName = categoryOverride.replace("_", " ").toUpperCase();
        } else {
            // Determine Category from Prompt (Legacy/Fallback)
            const promptLower = userPrompt.toLowerCase();

            if (promptLower.includes("fashion") || promptLower.includes("mode") || promptLower.includes("clothing") || promptLower.includes("wear")) {
                selectedCategory = taxonomy.fashion_luxury;
                categoryName = "Fashion / Luxury";
            } else if (promptLower.includes("beauty") || promptLower.includes("skin") || promptLower.includes("makeup") || promptLower.includes("cosmetic") || promptLower.includes("perfume")) {
                selectedCategory = taxonomy.beauty_cosmetics;
                categoryName = "Beauty / Cosmetics";
            } else if (promptLower.includes("home") || promptLower.includes("furniture") || promptLower.includes("interior") || promptLower.includes("lamp") || promptLower.includes("living")) {
                selectedCategory = taxonomy.home_living;
                categoryName = "Home / Living";
            } else if (promptLower.includes("sport") || promptLower.includes("gym") || promptLower.includes("fitness") || promptLower.includes("run") || promptLower.includes("outdoor")) {
                selectedCategory = taxonomy.sports_outdoor;
                categoryName = "Sports / Outdoor";
            } else if (promptLower.includes("game") || promptLower.includes("gaming") || promptLower.includes("pc") || promptLower.includes("tech") || promptLower.includes("mouse") || promptLower.includes("keyboard")) {
                selectedCategory = taxonomy.electronics_gaming;
                categoryName = "Electronics / Gaming";
            } else if (promptLower.includes("car") || promptLower.includes("auto") || promptLower.includes("vehicle") || promptLower.includes("motor") || promptLower.includes("part")) {
                selectedCategory = taxonomy.automotive_parts;
                categoryName = "Automotive / Parts";
            } else if (promptLower.includes("design") || promptLower.includes("swiss") || promptLower.includes("arch") || promptLower.includes("minimal")) {
                selectedCategory = taxonomy.swiss_brutalist;
                categoryName = "Swiss / Brutalist";
            } else if (promptLower.includes("japan") || promptLower.includes("zen") || promptLower.includes("asia")) {
                selectedCategory = taxonomy.japanese_zen;
                categoryName = "Japanese / Zen";
            } else if (promptLower.includes("software") || promptLower.includes("app") || promptLower.includes("saas")) {
                selectedCategory = taxonomy.tech_minimal;
                categoryName = "Tech / SaaS";
            }
        }

        // Get available domains on disk
        const availableDomains = fs.readdirSync(crawlerDir).filter(f => fs.statSync(path.join(crawlerDir, f)).isDirectory());
        if (availableDomains.length === 0) return null;

        // Flatten Taxonomy to create a "Shop Whitelist"
        const validShops = new Set(Object.values(taxonomy).flat());

        let candidateDomains: string[] = [];

        // Filter by category if matched
        if (selectedCategory) {
            // Strict: Must be in category AND on disk
            const categoryMatches = availableDomains.filter(d => selectedCategory?.includes(d));
            if (categoryMatches.length > 0) {
                candidateDomains = categoryMatches;
                console.log(`[Smart Selection] Matched Category: ${categoryName} (${categoryMatches.length} available)`);
            }
        }

        // Fallback: Pick ANY valid shop from the whitelist that exists on disk
        if (candidateDomains.length < 2) {
            console.log(`[Smart Selection] Category Empty or Random Fallback. Sampling from Valid Shops.`);
            candidateDomains = availableDomains.filter(d => validShops.has(d));
        }

        // Double Fallback: If whitelist fails (e.g. no taxonomy loaded), use generic disk but warn
        if (candidateDomains.length === 0) {
            console.warn("[Smart Selection] Whitelist empty. Using raw disk scan (Risk of non-shop).");
            candidateDomains = availableDomains;
        }

        // --- HYBRID DNA SELECTION LOGIC ---

        // 1. Context Source: Pick from the matched semantic category (or valid shops fallback)
        let contextCandidates = candidateDomains;
        if (validShops && candidateDomains === availableDomains) {
            // If we fell back to "availableDomains", try to filter for valid shops first
            const validContext = availableDomains.filter(d => validShops.has(d));
            if (validContext.length > 0) contextCandidates = validContext;
        }

        // 2. Vibe Source: Pick from Awwwards Experimental
        const awwwardsCandidates = availableDomains.filter(d => taxonomy.awwwards_experimental?.includes(d));

        // Selection
        const selected: string[] = [];

        // Determine Goal Count (3 to 5)
        const targetCount = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5

        // Slot 1: Context (The "Body") - Mandatory
        if (contextCandidates.length > 0) {
            const randomContext = contextCandidates[Math.floor(Math.random() * contextCandidates.length)];
            selected.push(randomContext);
        }

        // Slot 2: Vibe (The "Soul") - Mandatory if available
        if (awwwardsCandidates.length > 0) {
            const distinctAwwwards = awwwardsCandidates.filter(d => !selected.includes(d));
            if (distinctAwwwards.length > 0) {
                const randomAwwwards = distinctAwwwards[Math.floor(Math.random() * distinctAwwwards.length)];
                selected.push(randomAwwwards);
            }
        }

        // Fill remaining slots with mixed bag (Priority: Awwwards -> Context -> Random)
        while (selected.length < targetCount) {
            const remainingReview = [...awwwardsCandidates, ...contextCandidates, ...availableDomains].filter(d => !selected.includes(d));

            // Deduplicate remaining list
            const uniqueRemaining = [...new Set(remainingReview)];

            if (uniqueRemaining.length === 0) break;

            const randomFill = uniqueRemaining[Math.floor(Math.random() * uniqueRemaining.length)];
            selected.push(randomFill);
        }

        console.log(`[Hybrid Selection] Selected ${selected.length} sources: ${selected.join(", ")}`);


        const inspirationData = selected.map(domain => {
            const homeDir = path.join(crawlerDir, domain, 'render_home');
            const dataPath = path.join(homeDir, 'render_data.json');
            const imagePath = path.join(homeDir, 'screenshot.png');

            let metadata = null;
            let imageBase64 = null;

            if (fs.existsSync(dataPath)) {
                metadata = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
            }
            if (fs.existsSync(imagePath)) {
                imageBase64 = fs.readFileSync(imagePath).toString('base64');
            }

            return { domain, metadata, imageBase64, category: categoryName };
        });

        return inspirationData;
    } catch (e) {
        console.error("Crawler Inspiration Error:", e);
        return null;
    }
};

export async function POST(req: Request) {
    try {
        const { systemPrompt: userProvidedSystemPrompt, userPrompt, blueprint, attachedImage } = await req.json();

        // LOCKED MODEL - DO NOT CHANGE
        const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyALlHqk1BW05xVlvPqjvadARqBOwxURUOc';
        if (!apiKey) {
            return NextResponse.json({ error: 'GEMINI_API_KEY is not set in environment variables.' }, { status: 500 });
        }
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent?key=${apiKey}`;


        // --- CONTEXT-AWARE INDUSTRY SELECTION ---
        let selectedIndustryRules = "No specific industry rules ruleset loaded.";
        let detectedIndustry = "unknown";
        let detectedVibe = "default";
        let crawlerCategoryOverride = null;

        try {
            // Load Taxonomy
            const taxonomyPath = path.join(process.cwd(), 'src/data/industry_taxonomy.json');
            let industryTaxonomy: any = { industries: [] };
            if (fs.existsSync(taxonomyPath)) {
                industryTaxonomy = JSON.parse(fs.readFileSync(taxonomyPath, 'utf-8'));
            }

            // Detect Industry
            const p = (userPrompt || "").toLowerCase();
            const matchedIndustries = industryTaxonomy.industries.filter((ind: any) =>
                ind.keywords.some((k: string) => p.includes(k.toLowerCase()))
            );

            if (matchedIndustries.length > 0) {
                // Pick best match (first one for now)
                const match = matchedIndustries[0];
                detectedIndustry = match.id;
                crawlerCategoryOverride = match.crawler_category;

                // Deep Vibe Detection (Optional)
                if (match.vibe_keywords) {
                    const vibeMatch = match.vibe_keywords.find((v: string) => p.includes(v));
                    if (vibeMatch) detectedVibe = vibeMatch;
                }

                console.log(`[Context Engine] Detected Industry: ${detectedIndustry} | Vibe: ${detectedVibe}`);

                // --- TEMPORARY GUARDRAIL: FASHION ONLY ---
                if (detectedIndustry !== 'fashion') {
                    console.warn(`[Context Engine] BLOCKED: Industry '${detectedIndustry}' is not yet supported.`);
                    return NextResponse.json({
                        error: "🚧 WORK IN PROGRESS: Currently, only 'Fashion' shops are supported. Please try a fashion-related prompt (e.g. 'Luxury Clothing Brand')."
                    }, { status: 400 });
                }

                // Load Specific Ruleset
                const rulesPath = path.join(process.cwd(), match.blueprint_path);
                if (fs.existsSync(rulesPath)) {
                    selectedIndustryRules = fs.readFileSync(rulesPath, 'utf-8');
                    console.log(`[Context Engine] Loaded Ruleset: ${match.blueprint_path}`);
                }
            } else {
                // Fallback to default luxury
                console.log(`[Context Engine] No specific industry detected. Using Default Luxury.`);
                const rulesPath = path.join(process.cwd(), 'public/references/luxury_ruleset.json');
                if (fs.existsSync(rulesPath)) {
                    selectedIndustryRules = fs.readFileSync(rulesPath, 'utf-8');
                }
            }

        } catch (e) {
            console.error("Context Engine Error:", e);
        }

        // --- FASHION HEADER SELECTION (FASHION ONLY) ---
        let fashionHeaderContext = "";
        let selectedHeaderId = "";
        let headerCustomization = null;
        let headerGuidelines = "";

        if (detectedIndustry === 'fashion') {
            try {
                // Select best matching header
                const headerMatch = selectBestHeader(userPrompt || "");
                selectedHeaderId = headerMatch.designId;
                console.log(`[Fashion Header] Selected: ${headerMatch.designName} (Score: ${headerMatch.score})`);
                console.log(`[Fashion Header] Reasons: ${headerMatch.reasons.join(', ')}`);

                // Load header source code
                const headerSourceCode = await loadHeaderSourceCode(selectedHeaderId);

                // Generate customization
                headerCustomization = await customizeHeader(selectedHeaderId, userPrompt || "", headerSourceCode);
                console.log(`[Fashion Header] Brand: ${headerCustomization.modifications.brandName}`);
                console.log(`[Fashion Header] Categories: ${headerCustomization.modifications.categories.join(', ')}`);

                // Load header guidelines
                headerGuidelines = await loadHeaderGuidelines();

                // Build context for AI
                fashionHeaderContext = `
*** FASHION HEADER PROTOCOL (FASHION SHOPS ONLY) ***

I have selected a pre-built header design for you to use and customize.

**SELECTED HEADER**: ${headerMatch.designName} (${selectedHeaderId})
**MATCH SCORE**: ${headerMatch.score}/100
**REASONS**: ${headerMatch.reasons.join(', ')}

=============================================================
      ⛔⛔⛔ CRITICAL ICON RULES - HIGHEST PRIORITY ⛔⛔⛔
=============================================================

YOU MUST FOLLOW THESE RULES OR THE GENERATION WILL FAIL:

❌ ABSOLUTELY FORBIDDEN:
- lucide-react icons
- react-icons
- phosphor icons  
- heroicons
- @tabler/icons
- ANY icon library import
- <ShoppingCart>, <Cart>, <Package>, <Box> components
- Generic cart/trolley icons

✅ MANDATORY:
- Use the EXACT inline SVG icons shown below
- Copy the SVGs character-by-character
- Use Shopping BAG icons (NOT cart/trolley!)
- Thin stroke widths: 1px to 1.5px max
- Custom SVG paths only

${headerCustomization.extractedIcons}

=============================================================
      ⛔⛔⛔ CRITICAL ANIMATION RULES ⛔⛔⛔
=============================================================

❌ FORBIDDEN FOR PANELS:
- opacity-0 → opacity-100 fade transitions
- scale animations
- framer-motion for basic panels

✅ MANDATORY:
- SLIDE animations only (translateX, translateY)
- Menu: slide from LEFT
- Cart: slide from RIGHT
- Search: slide from TOP
- Backdrop: opacity fade OK (only exception)

${headerCustomization.extractedAnimations}

=============================================================

**HEADER CUSTOMIZATION INSTRUCTIONS**:
${headerCustomization.customizationPrompt}

**HEADER SOURCE CODE REFERENCE** (Use this as your header, apply customizations):
\`\`\`tsx
${headerSourceCode.substring(0, 15000)}
\`\`\`

**HEADER DESIGN GUIDELINES** (Follow strictly for any header work):
${headerGuidelines.substring(0, 8000)}

**YOUR TASK**:
1. USE this header as the shop's Navbar/Header component
2. APPLY the customizations (brand name: "${headerCustomization.modifications.brandName}", categories: ${headerCustomization.modifications.categories.join(', ')})
3. CHANGE the font to "${headerCustomization.modifications.primaryFont}"
4. ⚠️ COPY THE ICON SVGs EXACTLY - NO ICON LIBRARIES!
5. ⚠️ USE SLIDE ANIMATIONS ONLY - NO FADE ON PANELS!
6. BUILD the rest of the shop (Footer, Pages, etc.) in the SAME VISUAL STYLE
7. MAINTAIN responsive design at all breakpoints
8. The entire shop must feel cohesive

**STYLE DNA TO INHERIT FROM HEADER**:
- Font family and weights
- Letter-spacing and typography scale
- THE EXACT SVG ICONS (copy them 1:1!)
- THE EXACT ANIMATION PATTERNS  
- Color scheme (black/white luxury aesthetic)
- Spacing rhythm
`;

            } catch (e) {
                console.error("Fashion Header Selection Error:", e);
                fashionHeaderContext = "// Header selection failed - use default luxury header pattern";
            }
        }

        // --- REAL-WORLD CRAWLER INSPIRATION ---
        const inspirationNodes = getRandomInspiration(userPrompt || "", crawlerCategoryOverride);
        let inspirationContext = "";
        const inspirationImages: any[] = [];

        if (inspirationNodes && inspirationNodes.length > 0) {
            const domains = inspirationNodes.map(n => n.domain).join(" & ");
            console.log(`Injecting Inspiration from: ${domains}`);

            inspirationContext = `
            *** VISUAL REFERENCE (THE STYLE SOURCE) ***
            I have attached screenshots of Award-Winning Designs: [ ${domains} ].
            
            YOUR VISUAL TASK:
            1.  **EXTRACT THE DNA**: Analyze the *principles* of ALL these designs. 
                - Do they share a minimal or chaotic vibe? 
                - What is the common thread in typography? 
            2.  **REMIX IT (MANDATORY)**: You are NOT copying one site. You are a DJ mixing 5 tracks.
                -   Take the **Layout** from Reference 1.
                -   Take the **Typography** from Reference 2.
                -   Take the **Color Vibe** from Reference 3.
                -   **SYNTHESIZE** them into a coherent, new entity.
            3.  **BE LEGAL**: DO NOT copy any site 1:1. That is plagiarism. Your job is to capture the *essence* and *quality*, not the exact pixels.
            
            BUT...
            
            *** CRITICAL: CONTENT SEPARATION PROTOCOL ***
            -   **VISUALS** = Come from the SCREENSHOTS (Abstracted Principles).
            -   **CONTENT** = Comes from the USER PROMPT.
            
            EXAMPLE:
            -   User Prompt: "Sell E-Bikes named VELO_X".
            -   Screenshots: Show a Perfume Shop, a Brutalist Portfolio, and a Swiss Watch site.
            -   **RESULT**: You build a Bike Shop that feels like a Brutalist Swiss Watch store. You use the whitespace of the Portfolio, the font of the Watch site, but you sell BIKES.
            -   **DO NOT** sell Perfume. **DO NOT** use the brand name from the screenshot.
            `;

            inspirationNodes.forEach((node, idx) => {
                if (node.metadata) {
                    inspirationContext += `\n[Reference ${idx + 1}: ${node.domain}]\n${JSON.stringify(node.metadata.computed_styles, null, 2)}\n`;
                }
                if (node.imageBase64) {
                    inspirationImages.push({
                        inlineData: {
                            mimeType: "image/png",
                            data: node.imageBase64
                        }
                    });
                }
            });
        }

        // --- PREMIUM MANIFESTO LOADING ---
        let manifestoContext = "";
        try {
            const manifestoPath = path.join(process.cwd(), 'public/references/premium_manifesto.md');
            if (fs.existsSync(manifestoPath)) {
                manifestoContext = fs.readFileSync(manifestoPath, 'utf-8');
            }
        } catch (e) {
            console.error("Failed to load Manifesto", e);
        }

        // --- 21ST.DEV ANIMATION PATTERNS ---
        let animationPatternsContext = "";
        try {
            const patternsPath = path.join(process.cwd(), 'public/references/21st_dev_patterns.md');
            if (fs.existsSync(patternsPath)) {
                animationPatternsContext = fs.readFileSync(patternsPath, 'utf-8');
                console.log("[21st.dev] Loaded animation patterns");
            }
        } catch (e) {
            console.error("Failed to load 21st.dev patterns", e);
        }

        // FRANKENSTEIN MODE: Load Mined UI Components
        let headerMix: string[] = [];
        let footerMix: string[] = [];
        try {
            headerMix = getMinedComponentMix('Header', 3);
            footerMix = getMinedComponentMix('Footer', 3);
            console.log(`[Frankenstein] Loaded ${headerMix.length} headers and ${footerMix.length} footers for synthesis.`);
        } catch (e) {
            console.warn("Failed to load mined components", e);
        }

        const systemPrompt = `
      You are the **Guardian of the Manifesto**.
      You are a dual-entity AI: 
      1.  **Concept Artist** (Unbound Creativity).
      2.  **Senior Frontend Dev** (Pixel Perfection).

      Your task is to generate a **100% UNIQUE** E-COMMERCE APPLICATION.

      *** THE MANIFESTO (YOUR CONSTITUTION) ***
      ${manifestoContext}

      *** FRANKENSTEIN PROTOCOL (COMPONENT SYNTHESIS) ***
      You are NOT generating from scratch. You are SYNTHESIZING from real luxury DNA.
      I have provided REAL WORLD CODE references from top brands (Balenciaga, Bottega, etc.).
      
      YOUR TASK:
      Create a NEW component that SYNTHESIZES the best traits of these references.
      - DO NOT copy 1:1.
      - DO NOT be generic.
      - COMBINE: Layout of A + Typography of B + Logic of C.

      <HEADER_REFERENCES_FOR_SYNTHESIS>
      ${headerMix.join('\n\n')}
      </HEADER_REFERENCES_FOR_SYNTHESIS>

      <FOOTER_REFERENCES_FOR_SYNTHESIS>
      ${footerMix.join('\n\n')}
      </FOOTER_REFERENCES_FOR_SYNTHESIS>
      
      *** THE "CHAMELEON" PROTOCOL ***
      1.  **NO DEFAULTS**. There is no "default" font. There is no "default" navbar.
      2.  **LOOK AT THE REFERENCE**. That is your bible for visuals.
      3.  **READ THE PROMPT**. That is your bible for content.

      *** STRICT COMPLIANCE RULES ***
      ${selectedIndustryRules}

      ${fashionHeaderContext}

      ${inspirationContext}
      
      *** INSTRUCTIONS - READ CAREFULLY ***

      0.  **CRITICAL PRIORITY: THE "FULL SHOP" PROTOCOL (NON-NEGOTIABLE)**:
          -   **STRICT BAN**: NEVER generate a "Hello World" app. NEVER generate a "Coming Soon" page.
          -   **REQUIREMENT**: You MUST generate a COMPLETE, MULTI-PAGE E-COMMERCE APPLICATION.
          -   **MANDATORY PAGES** (You must create a file for EACH of these):
              1.  \`/\` (**Home** - Brand Experience)
              2.  \`/shop\` (**Catalog** - Filter, Grid, Load More)
              3.  \`/product/:id\` (**PDP** - Gallery, Details, Add to Cart)
              4.  \`/cart\` (**Cart** - Review Items)
              5.  \`/checkout\` (**Checkout** - Shipping & Payment Form)
              6.  \`/login\` (**Auth** - Minimal Login)
              7.  \`/register\` (**Auth** - Minimal Register)
              8.  \`/account\` (**Dashboard** - Order History)
              9.  \`/wishlist\` (**Wishlist** - Saved Items)
              10. \`/legal/impressum\` (**Legal** - Impressum)
              11. \`/legal/terms\` (**Legal** - Terms)
              12. \`/legal/privacy\` (**Legal** - Privacy)
              13. \`/contact\` (**Contact** - Minimal Form)

          **IF YOU MISS A SINGLE PAGE, THE GENERATION IS CONSIDERED FAILED.**

      0.  **SELF-AUDIT PRE-FLIGHT CHECK**:
          -   Before writing code, ask yourself: *"Does this look like a template?"* If yes, DESTROY IT.
          -   *"Is the copy generic?"* If yes, REWRITE IT.
          -   *"Are the icons standard?"* If yes, SWAP THEM for Phosphor Luxury icons.
          -   **Your Goal**: A design so unique it wins Awwwards.

      1.  **ZERO-ERROR SAFETY PROTOCOL (NON-NEGOTIABLE)**:
          -   **NO UNDEFINED COMPONENTS**: If you write \`<Footer />\` in Layout, you MUST import it or define it in the same file.
          -   **NO MISSING IMPORTS**: Check every single component usage. Is it imported?
          -   **React Safety**: Always export your components. Always use \`export default\`.
          -   **Visual Freedom != Code Anarchy**: You can be creative with design, but your CODE must be strict, valid React.

      2.  **ZERO-TOLERANCE ICON POLICY**:
          -   **LIBRARY**: Use \`lucide-react\` (e.g., \`import { ShoppingBag, Search, Menu, Heart } from 'lucide-react'\`).
          -   **STYLE**: STROKE WIDTH MUST BE 1px or 1.5px. (e.g. \`<ShoppingBag strokeWidth={1} />\`).
          -   **BANNED ICONS**:
              -   🚫 NEVER use the \`Package\` or \`Box\` icon for the Cart. It looks like a delivery tracking app.
              -   🚫 NEVER use the filled/heavy versions of icons.
          -   **REQUIRED ICONS**:
              -   ✅ Cart = \`ShoppingBag\` (The tote bag style).
              -   ✅ Menu = \`AlignLeft\` or \`Menu\` (But strictly thin).

      3.  **MASTER DESIGN BLUEPRINT (THE "LV" STANDARD) - STRICT DEFAULT**:
          *Unless the user EXPLICITLY requests a specific diverse style (e.g. "Cyberpunk", "Brutalist"), you MUST follow this blueprint 1:1.*

          **A. THE GLOBAL HEADER (Structure & Behavior)**
          -   **Layout**: \`flex justify-between items-center h-16 px-6\` (or similar).
          -   **TEXT CASE**: ALL navigation text in Title Case ("Menu", "Women", "Men") - NEVER uppercase.
          -   **LEFT (Navigation)**:
              -   **Hamburger Menu**: Icon + Text Label "Menu" (Title Case!).
              -   **Search**: Icon + Text Label "Search" (Title Case!).
              -   **Interaction**:
                  -   *Menu Click*: Opens Side-Menu via SLIDE (300ms, ease-out). NO fade.
                  -   *Search Click*: Overlay SLIDES from top. NO fade.
          -   **CENTER (Branding)**:
              -   **Logo**: Centered. Can be uppercase (exception).
          -   **RIGHT (Actions)**:
              -   **Sequence**: [ "Contact" (Small Text Link) ] -> [ Heart ] -> [ User ] -> [ Bag ].
              -   **Hover on Bag**: Mini-Cart SLIDES from right. NO fade.

          **B. THE HOMEPAGE HERO (The "Silent" Hero)**
          -   **VISUAL**: Full-screen/Large Image or Video.
          -   **CONSTRAINT**: **NO TEXT OR BUTTONS ON THE IMAGE**. The image must be pure.
          -   **BELOW THE HERO**:
              -   **Headline**: Centered, Medium Size, Thin Sans-Serif (e.g. \`text-3xl font-light\`).
              -   **Subline**: Centered, Smaller (~12px), Dark Gray, Thin.
              -   **Category Row**: Directly below the text. A horizontal row of 3 Vertical Images (Equal height, equal gap). Klickable to categories.

          **C. THE COLLECTION PAGE (Shop)**
          -   **Header**: Standard Global Header.
          -   **FILTER SECTION**:
              -   **Layout**: \`flex justify-between items-center py-4\`.
              -   **Style**: MINIMAL. Simple text links, NOT pill-shaped buttons.
              -   **Left**: Category dropdown (plain text, 12px).
              -   **Right**: "Filter" text link, small dropdown. NO colorful chips.
          -   **PRODUCT GRID**:
              -   **Layout**: Multi-column (2, 3, or 4). Edge-to-edge, minimal gaps.
              -   **Card Style**: Image + Centered Name + Centered Price. NO border.
              -   **Hover**: Show SECOND product image OR slight opacity (0.9). NO ZOOM.
              -   NO "Quick Add" buttons. Ever.
              -   **Footer**: "Load More" or Pagination (minimal text).

          **D. THE PRODUCT DETAIL PAGE (PDP)**
          -   **Top**: Breadcrumb (Category > Sub > Product). Minimal, gray text.
          -   **Layout**: Large Images (Left ~60%) vs. Info (Right ~40%).
          -   **Images**: Main Image + Gallery. Click to enlarge. NO zoom on hover.
          -   **Info Column (Right)**:
              -   Name, Price, Short Description.
              -   Selectors (Size, Color) - simple dropdowns or text buttons.
              -   **CTA**: "Add to Bag" - solid black button, white text. NO hover animation.
              -   **Secondary**: Wishlist / Share as small text links.
          -   **Below**: Accordion for Details (Material, Care, etc.). Minimal style.

          **E. AUTH & ACCOUNT PAGES**
          -   **Style**: Minimalist.
          -   **Form**: Centered, Clean inputs.
          -   **Links**: "Forgot Password?" / "Register" below form (dezent).

          **F. CONTENT / MAGAZINE PAGES**
          -   **Style**: Editorial. Large Images. Short, airy text blocks.
          -   **Typography**: Generous whitespace. Centered or Left-aligned titles.
          
          **G. MUTATION PROTOCOL (The "Remix" Exception)**:
          -   **ONLY** if the user asks for a specific style that contradicts the above (e.g. "Make it Brutalist with huge text on the image"), **THEN** you may deviate. Otherwise, the Blueprint (A-F) is LAW.

      5.  **CONTENT INTEGRITY (The Anti-Hallucination Layer)**:
          -   **BRAND NAME**: strictly use the name in the User Prompt (e.g. "VELO_X").
          -   **PRODUCT**: strictly use the product in the User Prompt (e.g. "E-Bikes").
          -   **DO NOT** be confused by the screenshots. If the screenshot shows a Sofa, and the user wants Bikes... YOU PUT BIKES ON THE SOFA LAYOUT.
      
      ⚠️⚠️⚠️ ANTI-AI DETECTION PROTOCOL (CRITICAL - READ FIRST) ⚠️⚠️⚠️

      These rules are based on analysis of REAL luxury brands (Balenciaga, Bottega Veneta, Prada, Louis Vuitton).
      If you violate ANY of these, the output will look like "AI-generated garbage".

      🚫 **BANNED PATTERNS (INSTANT AI-DETECTION)**:
      
      1. **UPPERCASE TEXT IN NAVIGATION**
         - ❌ "MENU", "SEARCH", "WOMEN", "MEN", "SHOP NOW"
         - ✅ "Menu", "Search", "Women", "Men", "Shop Now"
         - EXCEPTION: Logo/Brand name CAN be uppercase
         - Real luxury brands: Balenciaga uses "Women", Bottega uses "Women", LV uses "Women"

      2. **ZOOM EFFECTS ON IMAGES**
         - ❌ \`transform: scale(1.05)\` on hover
         - ❌ \`whileHover={{ scale: 1.02 }}\`
         - ❌ Any \`scale\` animation on product images
         - ✅ NO effect OR show second image on hover
         - Real luxury brands have ZERO zoom effects. It's cheap.

      3. **MAGNETIC/CURSOR-FOLLOWING BUTTONS**
         - ❌ Buttons that slightly move toward cursor
         - ❌ \`useMotionValue\` for button tracking
         - ❌ Any "magnetic" effect
         - ✅ Simple solid background change OR underline
         - This is a STARTUP/TECH gimmick, not luxury.

      4. **PAGE LOAD ANIMATIONS**
         - ❌ Fade-in from bottom
         - ❌ Staggered reveal animations
         - ❌ Text reveal word-by-word
         - ❌ Clip-path wipe effects
         - ✅ Content is visible IMMEDIATELY on load
         - Real luxury: Balenciaga = instant content. Bottega = instant content.

      5. **TILT/3D CARD EFFECTS**
         - ❌ Cards that rotate 3D on hover
         - ❌ \`rotateX\`, \`rotateY\` on product cards
         - ❌ Perspective transforms on cards
         - ✅ Simple hover: slightly darker image OR show "Quick View" text

      6. **IMAGES NOT EDGE-TO-EDGE**
         - ❌ Padding around hero images
         - ❌ Max-width containers for full-width sections
         - ❌ Margins on category previews
         - ✅ Images go from \`left: 0\` to \`right: 0\`
         - ✅ Use \`w-full\` or \`100vw\` for full-bleed sections
         - Real brands: Hero fills entire viewport width.

      7. **GENERIC HOVER STATES**
         - ❌ Glowing borders
         - ❌ Drop shadows that grow on hover
         - ❌ Color transitions on entire cards
         - ✅ Subtle underline on text
         - ✅ Very slight opacity change (0.9)
         - ✅ Show second product image

      8. **QUICK VIEW / QUICK ADD BUTTONS**
         - ❌ "Quick Add" buttons that fly in
         - ❌ Overlay buttons on product images
         - ✅ Clean product cards. Click goes to PDP.
         - Real luxury: NEVER has "Quick Add". It's for fast-fashion.

      9. **FILTER/SORT STYLING**
         - ❌ Pill-shaped filter buttons
         - ❌ Colorful filter chips
         - ❌ Complex filter sidebars
         - ✅ Simple text links: "Category", "Size", "Color"
         - ✅ Minimal dropdown selects
         - Real luxury: Filters are nearly invisible.

      10. **CHECKOUT/CART DESIGN**
         - ❌ Colorful progress steps
         - ❌ Chunky buttons
         - ❌ Heavy borders
         - ✅ Clean table layout
         - ✅ Thin borders (1px)
         - ✅ Black text on white. Maximum 2 colors.

      *** MOTION RULES (EXTREMELY MINIMAL) ***
      
      - Use \`framer-motion\` ONLY for:
        1. Menu open/close (SLIDE from left, not fade)
        2. Cart drawer (SLIDE from right, not fade)
        3. Search overlay (SLIDE from top, not fade)
        4. Smooth scroll behavior
      
      - **DURATION**: All transitions = 200-300ms MAX. Luxury is FAST.
      - **EASING**: Only \`ease-out\` or \`[0.4, 0, 0.2, 1]\`
      - **NO** spring animations on UI elements
      - **NO** bouncy effects
      - **NO** stagger animations

      *** VISUAL REFERENCE: WHAT REAL LUXURY LOOKS LIKE ***

      BALENCIAGA:
      - Font: Custom sans-serif, 14px, regular weight
      - Colors: Black text, white background, NO accent colors
      - Animations: ZERO on page load
      - Header: "Women", "Men" (Title Case, not UPPERCASE)
      - Images: Full-width, no padding
      - Hover: Nothing or second image

      BOTTEGA VENETA:
      - Font: Custom sans-serif, 14px, regular weight
      - Colors: Black, white, subtle olive accents
      - Animations: ZERO on page load
      - Layout: Extreme white space
      - Product cards: No effects whatsoever

      COPY THEIR RESTRAINT. COPY THEIR SIMPLICITY.

      - The \`/App.js\` file MUST default export a component that returns a \`<BrowserRouter>\` (from 'react-router-dom') wrapping your Routes.
      - ALL internal links must work.
      
      Example:
        \`\`\`javascript
        import { BrowserRouter, Routes, Route } from 'react-router-dom';
        // Import all pages...
        
        export default function App() {
          return (
            <BrowserRouter>
              <div className="bg-white min-h-screen text-black font-sans selection:bg-black selection:text-white">
                <Navbar />
                <Routes>
                  {/* ... Define All 13 Routes ... */}
                  <Route path="/checkout/success" element={<Success />} />
                </Routes>
                <Footer />
              </div>
            </BrowserRouter>
          );
        }
        \`\`\`

      BLUEPRINT:
      ${JSON.stringify(blueprint)}

      OUTPUT FORMAT:
      Return ONLY a JSON object.
      {
        "files": {
          "/App.js": { "code": "..." },
          "/index.js": { "code": "..." },
          "/styles.css": { "code": "..." },
          "/components/Navbar.js": { "code": "..." },
          "/components/Footer.js": { "code": "..." },
          "/pages/Home.js": { "code": "..." },
          "/pages/Login.js": { "code": "..." },
          "/pages/Register.js": { "code": "..." },
          "/pages/Account.js": { "code": "..." },
          "/pages/Shop.js": { "code": "..." },
          "/pages/Product.js": { "code": "..." },
          "/pages/Cart.js": { "code": "..." },
          "/pages/Checkout.js": { "code": "..." },
          "/pages/checkout/Success.js": { "code": "..." },
          "/pages/Contact.js": { "code": "..." },
          "/pages/legal/Impressum.js": { "code": "..." },
          "/pages/legal/Terms.js": { "code": "..." },
          "/pages/legal/Privacy.js": { "code": "..." },
           ... other components
        }
      }
    `;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: systemPrompt }] }]
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API Error Detail:', errorText);
            return NextResponse.json({ error: `Gemini API Error: ${response.status} - ${errorText}` }, { status: response.status });
        }

        const data = await response.json();
        let text = data.candidates[0].content.parts[0].text;
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        let generatedCode;
        try {
            generatedCode = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse options", text);
            return NextResponse.json({ error: 'Failed to parse Gemini output as JSON' }, { status: 500 });
        }

        return NextResponse.json({ generatedCode });

    } catch (error) {
        console.error('Error generating Code:', error);
        return NextResponse.json({ error: 'Failed to generate Code' }, { status: 500 });
    }
}
