# Luxury Fashion Header Design Guidelines

> A comprehensive guide for creating pixel-perfect, premium e-commerce headers inspired by Louis Vuitton, Prada, and other luxury brands.

---

## 1. Core Design Principles

### 1.1 Minimalism & Whitespace
- **Less is more**: Luxury headers avoid clutter. Every element earns its place.
- **Generous whitespace**: Use ample padding (minimum 24px on mobile, 48px+ on desktop).
- **Breathing room**: Icons and links need space to "breathe" — never cramped.

### 1.2 Typography
- **Font choices**: 
  - Sans-serif: Helvetica Neue, Futura, Gotham, or custom brand fonts
  - Never use generic system fonts
- **Letter-spacing**: Uppercase text needs `0.08em` to `0.15em` tracking
- **Font sizes**:
  - Logo: 18-24px
  - Navigation: 11-13px
  - Always uppercase for main nav

### 1.3 Color Palette
- **Primary**: Black (#000) on White (#fff)
- **Subtle grays**: #e5e5e5 for borders, #f5f5f5 for backgrounds
- **Avoid**: Bright colors, gradients, shadows on the header itself
- **Accent**: Use sparingly (e.g., blue dot for wishlist indicator)

---

## 2. Desktop Header Structure

### 2.1 Layout Options

#### Option A: Logo Left + Nav Center + Icons Right (Prada Style)
```
[LOGO]     [Nav Items...]     [Search] [User] [Wishlist] [Bag]
```

#### Option B: Nav Left + Logo Center + Icons Right (Louis Vuitton Style)
```
[Menu] [Search]     [LOGO]     [Contact] [User] [Wishlist] [Bag]
```

### 2.2 Recommended Heights
- **Promo bar**: 40-44px
- **Main header**: 56-70px
- **Total**: Max 110-120px

### 2.3 Navigation
- **Visual feedback**: Underline on hover (not background change)
- **Underline style**: 1px solid, appears on hover via `border-b`
- **No bold on hover**: Just underline or opacity change
- **Spacing**: 24-32px between nav items

---

## 3. Mega Menu Dropdowns

### 3.1 What Works
- ✅ **Instant appearance** (no fade-in delay)
- ✅ **White background** with subtle shadow (`shadow-[0_8px_30px_rgba(0,0,0,0.08)]`)
- ✅ **Unique layouts per category** (not all identical grids)
- ✅ **Mix of images and links**
- ✅ **Close button** (X) in top-right corner
- ✅ **Border-bottom** to separate from content

### 3.2 What to Avoid
- ❌ Complex animations (fade, slide, scale)
- ❌ Too many columns (max 4-5)
- ❌ Overwhelming with products
- ❌ Dark backgrounds
- ❌ Nested dropdowns

### 3.3 Image Layouts (per Prada)
| Category | Layout Style |
|----------|--------------|
| Gifts | 2x2 colorful grid + links |
| Bags | 4x2 product grid + hero image + 2 link columns |
| Jewelry | Portrait image + links + product shot + links |
| Fragrances | Bottles in various formats + links |

---

## 4. Mobile Header

### 4.1 Layout
```
[Hamburger]  [LOGO]  [Search] [Wishlist] [Bag₁] 
```

- **Logo**: Centered or left-aligned after hamburger
- **Icons**: Reduced set (Search, Wishlist, Bag essential)
- **User icon**: Hide on mobile, show in menu

### 4.2 Icon Spacing
- Use `gap-3` to `gap-4` between icons
- Same padding left and right (`px-5` or `px-6`)
- Ensure symmetry between hamburger and bag icon

### 4.3 Hamburger Icon
- Simple 3-line design
- 20px width, 1.5px stroke
- Triggers slide-in menu

---

## 5. Mobile Menu

### 5.1 Structure (Prada-Style)
```
┌─────────────────────────────┐
│  [LOGO]              [X]    │ <- Header with shop name, not "Menu"
├─────────────────────────────┤
│  GIFTS                    > │
│  WOMEN                    > │
│  MEN                      > │
│  BAGS                     > │
│  ...                      > │
├─────────────────────────────┤
│  👤 Anmelden oder Konto...  │
│  ❤️ Wishlist                │
│  🛍️ Warenkorb               │
│  📞 Hilfe                   │
└─────────────────────────────┘
```

### 5.2 Best Practices
- ✅ **Instant appearance** (no slide animation, or max 200ms)
- ✅ **Full-height, 85% width** (max 320px)
- ✅ **Chevron arrows** (>) for categories with subcategories
- ✅ **Uppercase categories** with tracking
- ✅ **Icon links at bottom** (Account, Wishlist, Cart, Help)
- ✅ **Dark overlay** on background (40% black)

### 5.3 What to Avoid
- ❌ Slow animations (more than 300ms)
- ❌ "Menu" as header title (use shop name)
- ❌ Text-only footer links (use icons)
- ❌ Nested accordions (keep it flat)

---

## 6. Cart Panel

### 6.1 Slide-Out Panel
- **Desktop**: Fixed 420px width from right
- **Mobile**: Full screen width
- **Animation**: 300ms slide, ease-out

### 6.2 Content Structure
```
┌─────────────────────────────┐
│  Your Selection (1)    [X]  │
├─────────────────────────────┤
│  [Img] Product Name         │
│        Color · Size         │
│        CHF 1,090    [Remove]│
├─────────────────────────────┤
│  Subtotal        CHF 1,090  │
│  [View Shopping Bag]        │ <- No hover:bg-black, just opacity
│  [Checkout]                 │ <- Black button, white text
└─────────────────────────────┘
```

### 6.3 Button Styling
- **Primary button**: `bg-black text-white`
- **Secondary button**: `border border-black`, hover: `opacity-60` (NOT bg-black)

---

## 7. Search Overlay

### 7.1 Best Approach (Prada-Style)
- **Full-screen white overlay** (z-index 200+)
- **Instant appearance** (no animation)
- **Auto-focus** on input field
- **Close button**: "SCHLIESSEN" text or X icon

### 7.2 Content
```
┌─────────────────────────────────────────────┐
│  [Search input...]              SCHLIESSEN  │
├─────────────────────────────────────────────┤
│  KOLLEKTIONEN          HIGHLIGHTS           │
│  Geschenke             Neuheiten Für Ihn    │
│  Sport Collection      Neuheiten Für Sie    │
└─────────────────────────────────────────────┘
```

---

## 8. Promo Bar

### 8.1 Characteristics
- **Height**: 40-44px
- **Background**: Black or accent color
- **Text**: White, 11-12px, uppercase
- **Dismiss**: X button on right
- **Content**: Shipping info, promo codes, announcements

### 8.2 Dismissibility
- State: `isPromoClosed`
- Conditionally render: `{!isPromoClosed && ...}`
- Smooth removal (or instant)

---

## 9. Animations & Transitions

> [!CAUTION]
> ### ⛔ NIEMALS FADE-ANIMATIONEN VERWENDEN
> 
> **Fade-Animationen sind verboten.** Sie wirken billig und generisch. Stattdessen:
> - ✅ **Slide-Animationen** (translate-x, translate-y)
> - ✅ **Keine Animation** (instant appear/disappear)
> - ❌ ~~Opacity transitions~~
> - ❌ ~~Fade-in/out~~

### 9.1 Erlaubte Animationen (Slide-Only)

| Element | Animation | Richtung | Duration | Delay |
|---------|-----------|----------|----------|-------|
| **Menu Panel** | `translateX` | Von links | 300ms | - |
| **Search Header** | `translateY` | Von oben | 300ms | 320ms beim Schließen |
| **Search Content** | `translateY` | Von oben | 500ms | 175ms beim Öffnen |
| **Cart Panel** | `translateX` | Von rechts | 300ms | - |
| **Backdrop** | Instant | hidden/block | 0ms | - |

### 9.2 Exakte CSS-Klassen (1:1 kopieren)

```tsx
// ✅ MENU PANEL - Slide von links MIT smooth shadow fade
className={`... transition-[transform,box-shadow] duration-[200ms] ease-out ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full shadow-none'}`}

// ✅ SEARCH HEADER - Slide von oben mit Delay beim Schließen
className={`... transition-transform duration-[200ms] ease-out ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
style={{ transitionDelay: isSearchOpen ? '0ms' : '320ms' }}

// ✅ SEARCH CONTENT - Slide von oben mit Delay beim Öffnen
className={`... transition-transform duration-[500ms] ease-out ${isOpen ? 'translate-y-0' : '-translate-y-[calc(100%+72px)]'}`}
style={{ transitionDelay: isSearchOpen ? '175ms' : '0ms' }}

// ✅ CART PANEL - Slide von rechts
className={`... transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}

// ✅ BACKDROP - Instant (KEIN FADE!)
className={`... ${isOpen ? 'block' : 'hidden'}`}
```

### 9.3 Two-Part Slide Pattern (für Search)

Die Search-Overlay nutzt ein elegantes **Two-Part Slide** Pattern:

1. **Search Header** slided von oben runter (ersetzt den Main-Header)
2. **Search Content Panel** slided separat mit 175ms Verzögerung darunter

Dies erzeugt einen gestaffelten, luxuriösen Effekt.

```
┌────────────────────────────────────┐
│  [🔍 input...]         Close [X]   │ ← Header (slidet zuerst)
├────────────────────────────────────┤
│                                    │
│  Popular Searches                  │ ← Content (slidet 175ms später)
│  [Tag] [Tag] [Tag]                 │
│                                    │
│  Featured                          │
│  [Img] [Img] [Img] [Img]          │
│                                    │
└────────────────────────────────────┘
```

### 9.4 Was NIEMALS verwenden

```tsx
// ❌ FADE - VERBOTEN
className={`... transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}

// ❌ FADE MIT POINTER-EVENTS - VERBOTEN
className={`... ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}

// ❌ SCALE - VERBOTEN
className={`... transition-transform ${isOpen ? 'scale-100' : 'scale-95'}`}
```

### 9.5 Hover-States (Einzige erlaubte Opacity)

Für Hover-States ist `opacity` erlaubt, aber NUR auf einzelnen Elementen:

```tsx
// ✅ OK für Hover
className="hover:opacity-60 transition-opacity"

// ✅ OK für Links
className="text-black hover:opacity-60"
```

### 9.6 Wichtige Styling-Details

Für einen premialen Look müssen Overlays zusätzliche Details haben:

```tsx
// Menu Panel: Shadow fadet smooth EIN mit dem Slide
// Verwende transition-[transform,box-shadow] für beide Properties
className="... transition-[transform,box-shadow] ... ${isOpen ? 'shadow-2xl' : 'shadow-none'}"

// Search Header braucht sichtbaren Border
className="... border-b border-[#e5e5e5] ..."
```

> [!TIP]
> Der Shadow darf smooth einfaden – das ist KEIN Fade der Overlay selbst, sondern ein subtiles visuelles Enhancement.

---

## 10. Responsive Breakpoints

### 10.1 Tailwind Classes
```
px-5 sm:px-6 lg:px-8       // Padding
hidden lg:flex             // Desktop nav
lg:hidden                  // Mobile-only elements
w-full sm:w-[420px]        // Cart panel width
text-[18px] sm:text-[22px] // Logo size
```

### 10.2 Key Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)
- **Desktop**: > 1024px (lg)

---

## 11. Common Mistakes & Fixes

### 11.1 Icon Alignment Issues
**Problem**: Icons not symmetrically spaced from edges
**Fix**: Use equal padding on both sides (`px-5` instead of `px-4`)

### 11.2 Dropdown Not Closing
**Problem**: Dropdown stays open when mouse leaves
**Fix**: Add `onMouseLeave={handleMenuLeave}` to both header and dropdown

### 11.3 Cart Badge Positioning
**Problem**: Badge breaks icon alignment
**Fix**: Use `inline` badge with `ml-1` instead of absolute positioning

### 11.4 Menu Padding Mismatch
**Problem**: Menu items not aligned with X button
**Fix**: Use responsive padding `px-6 sm:px-12`

### 11.5 Generic Mobile Menu
**Problem**: "Menu" as title, text-only footer links
**Fix**: Use shop name as title, add icons to footer links

---

## 12. Correction Log

> This section documents mistakes made during generation and how they were fixed.

### Correction #1: Icon Spacing Asymmetry
- **Issue**: Right icons were too close to edge compared to hamburger
- **Solution**: Changed `px-4` to `px-5` for mobile header

### Correction #2: Menu Title Generic
- **Issue**: Mobile menu showed "Menu" instead of brand name
- **Solution**: Replaced with "MAISON" and better letter-spacing

### Correction #3: Wishlist Icon Hidden on Mobile
- **Issue**: Wishlist icon was hidden on mobile (Prada shows it)
- **Solution**: Removed `hidden sm:block`, added blue indicator dot

### Correction #4: View Shopping Bag Hover
- **Issue**: Button turned black on hover (too aggressive)
- **Solution**: Changed to `hover:opacity-60` instead of `hover:bg-black`

### Correction #5: Dropdown Images Too Uniform
- **Issue**: All dropdown images were identical squares
- **Solution**: Created unique layouts per category with varied formats

### Correction #6: Brand References
- **Issue**: "Prada" appeared in product names
- **Solution**: Replaced with generic names (Galleria, Bonnie, etc.)

### Correction #7: Serif Fonts Used (Design3)
- **Issue**: Logo used Georgia serif font - doesn't fit luxury fashion aesthetic
- **Solution**: Always use sans-serif fonts (Helvetica Neue, Arial). Serif fonts feel outdated.

### Correction #8: Logo Too Large (Design3)
- **Issue**: Logo was 20-28px, felt oversized
- **Solution**: Reduced to 18-24px range for better proportion

### Correction #9: Shopping Bag Icon Too Thick (Design3)
- **Issue**: Bag icon was too large (18x20) and thick strokes
- **Solution**: Use 15x18 size with 1.2px stroke. Vary icon styles between designs.

### Correction #10: Utility Bar No Background (Design3)
- **Issue**: Top utility bar had white background, felt invisible
- **Solution**: Added dark background (#1a1a1a) with white text for visual separation

### Correction #11: Generic Search Overlay (Design3)
- **Issue**: Search was too generic - just input with close button
- **Solution**: Created centered, full-height search with large input, trending tags with hover effects

### Correction #12: Mixed Languages (Design3)
- **Issue**: German and English mixed (Hilfe, Schliessen, etc.)
- **Solution**: Use consistent language throughout - standardize on English

### Correction #13: Low Contrast Cart Text (Design3)
- **Issue**: Subtotal text was gray on white - poor contrast
- **Solution**: Use black text for all important cart information

### Correction #14: Gray X Buttons (Design3)
- **Issue**: Close buttons (X) were gray instead of black
- **Solution**: Always use `text-black` for close buttons - ensure contrast

### Correction #15: Mobile Menu Footer Cutoff (Design3)
- **Issue**: Bottom links (Wishlist, Help) felt cramped at bottom
- **Solution**: Added `pb-20` extra padding for scroll room and symmetry

### Correction #16: Generic Font Choice (Design3 Round 2)
- **Issue**: Helvetica Neue still felt generic, logo too thick
- **Solution**: Use Inter font with weight 300 (thin). Premium fonts: Inter, Outfit, DM Sans. Avoid: Helvetica, Arial.

### Correction #17: Logo Still Too Large (Design3 Round 2)
- **Issue**: Logo at 18-24px still felt oversized
- **Solution**: Reduced to 16-20px with thinner weight. Same font as navigation for consistency.

### Correction #18: Utility Bar Height Issue (Design3 Round 2)
- **Issue**: Black utility bar made header too tall, felt clunky
- **Solution**: Convert to dismissible promo bar with centered text and X button. Height 36px max.

### Correction #19: Utility Bar Text Too Dim (Design3 Round 2)
- **Issue**: Text was white/70, only white on hover
- **Solution**: Always use full white text on dark backgrounds. Never opacity-reduced by default.

### Correction #20: Spacing Asymmetry (Design3 Round 2)
- **Issue**: "Help" was closer to edge than "New" below it
- **Solution**: Use same `px-10` padding for promo bar and main nav container.

### Correction #21: Icons Not Vertically Aligned (Design3 Round 2)
- **Issue**: Bag icon appeared lower than search/user icons
- **Solution**: Wrap all icons in flex container with `items-center`. Use consistent viewBox (20x20).

### Correction #22: Cheap Bag Icon Style (Design3 Round 2)
- **Issue**: Tall thin bag looked cheap, not luxury
- **Solution**: Use wider, rounder bag icon (LV-style). 18x18 size, 1.5px stroke, rounded corners via `strokeLinejoin="round"`.

### Correction #23: Search Overlay Still Generic (Design3 Round 2)
- **Issue**: Just input + trending tags - no visual richness
- **Solution**: Add "Featured" section with 4 category images (gradients). Grid layout. Hover effects on images.

### Correction #24: Font Weight Too Thin (Design3 Round 3)
- **Issue**: Weight 300 text looked too thin compared to icon strokes (1.5px)
- **Solution**: Use weight 400 for all body text. Weight 500 for emphasis. Match text thickness to icon stroke weight.

### Correction #25: Cart Header Height Mismatch (Design3 Round 3)
- **Issue**: Cart panel header (60px) didn't align with main header (68px) - borders not aligned
- **Solution**: Make all overlay headers match main header height (68px on desktop, 60px on mobile).

### Correction #26: Shipping Text Too Faded (Design3 Round 3)
- **Issue**: "Shipping calculated at checkout" was gray-500 - nearly invisible on light bg
- **Solution**: Use `text-black/60` or increase to 11px. Keep readable contrast.

### Correction #27: Unequal Button Heights (Design3 Round 3)
- **Issue**: Checkout button (52px) taller than View Bag button (48px) - looks unbalanced
- **Solution**: Use consistent height for all buttons in same context (both 50px).

> [!IMPORTANT]
> ### Correction #28: EDGE-TO-EDGE LAYOUTS (Design3 Round 3)
> - **Issue**: Always adding padding/margins to edges creates generic, safe-looking designs
> - **Solution**: Images, grids, and visual elements CAN and SHOULD go edge-to-edge. No gaps between grid items is often more premium. Only text needs padding for readability.
> 
> **Examples of edge-to-edge done right:**
> - Search overlay: 4 category images in grid with NO gaps, NO side margins
> - Product grids touching edges
> - Hero images full-bleed
> 
> **What NEEDS padding:**
> - Text content (px-6 or px-10)
> - Input fields
> - Buttons with text

### Correction #29: Mobile Menu Text Too Thin (Design3 Round 3)
- **Issue**: Mobile menu title and items were weight 300 - felt weak
- **Solution**: Use weight 400 for mobile menu items. Match desktop nav weight.

> [!CAUTION]
> ### Correction #30: GENERIC TRENDING BUTTONS (Final Polish)
> - **Issue**: Gray background buttons that turn black on hover = Bootstrap/generic look
> - **Solution**: NEVER use pill/tag buttons with background colors for search suggestions. Use:
>   - Plain text links (like KOLLEKTIONEN/HIGHLIGHTS reference)
>   - Category sections with bold headers
>   - No backgrounds, just typography hierarchy
> 
> **Generic (AVOID):**
> ```jsx
> <button className="px-4 py-2 bg-[#f5f5f5] hover:bg-black hover:text-white">Cashmere</button>
> ```
> **Premium (USE):**
> ```jsx
> <a className="text-gray-600 hover:text-black">Cashmere</a>
> ```

### Correction #31: Mobile Menu Missing Separators (Final Polish)
- **Issue**: Menu items without borders felt cheap, lacked structure
- **Solution**: Add `border-b border-[#e5e5e5]` to each menu item. Like MAISON reference.

### Correction #32: Chevrons Too Small (Final Polish)
- **Issue**: Chevrons (6x12) were thin and delicate - not commanding enough
- **Solution**: Increase to 8x14, strokeWidth 1.5. Chevrons should be prominent.

### Correction #33: Account Link Style (Final Polish)
- **Issue**: Simple "My Account" text felt anonymous
- **Solution**: Use "Sign in or Create Account" pattern like MAISON. Gray "or" for visual interest.

### Correction #34: Missing Legal Links in Mobile Menu (Final Polish)
- **Issue**: No legal/footer navigation in mobile menu
- **Solution**: Add Impressum, Terms, Privacy, Shipping links in gray at bottom.

### Correction #35: Search Overlay Organization (Final Polish)
- **Issue**: Trending buttons were visually heavy and generic
- **Solution**: Replace with text-based sections:
  - "Collections" header (bold) + text links
  - "Highlights" header (bold) + text links
  - Gray text that transitions to black on hover

### Correction #36: Desktop Mega Menu Missing (Final Polish)
- **Issue**: Desktop nav items had no hover dropdowns - felt incomplete
- **Solution**: Add mega menu with images + links on hover. Each category gets 2 featured images and category links.

### Correction #37: Mobile Menu Bottom Spacing (Final Polish)
- **Issue**: Wishlist icon too close to bottom edge - poor visual balance
- **Solution**: Use `flex flex-col` layout with `overflow-y-auto` middle section. Add `pb-10` to legal links for scroll room.

### Correction #38: Inconsistent Mobile Menu Padding (Final Polish)
- **Issue**: Legal links had different padding than upper sections (px-12 vs px-6)
- **Solution**: Use consistent `px-6` for all mobile menu sections. Responsive can use `sm:px-12`.

> [!IMPORTANT]
> ### Correction #39: REPETITIVE MEGA MENU LAYOUTS (Final Polish)
> - **Issue**: All mega menus had identical 2-image + categories layout - boring, predictable
> - **Solution**: EACH category gets UNIQUE layout:
>   - **New**: Large hero left + 2 stacked right + 2 link columns
>   - **Women**: 4 equal images in row + 2 link columns
>   - **Men**: 2x2 grid + 3 link columns
>   - **Accessories**: Wide 16:9 hero + vertical stack + links
>   - **Beauty**: 3 tall 2:3 images + single column
>   - **Home**: Split hero + 2x2 small grid + links
>   - **Gifts**: Editorial hero + product strip below
>   - **World**: Full-width 21:9 hero + 2 link columns

### Correction #40: Empty Search Overlay (Final Polish)
- **Issue**: Search had only category images and 2 text columns - felt empty
- **Solution**: Add:
  - "Popular Right Now" section with 6 product cards (image, name, price)
  - "Quick Links" horizontal row (New Arrivals, Best Sellers, Gift Guide, Sale, Stores)

> [!TIP]
> ### Correction #41: STATIC DROPDOWNS KILL IMMERSION (Refinement)
> - **Issue**: Dropdown content didn't change when clicking different nav items.
> - **Solution**: Even in mocks, interactivity must count. Use a simple map/object to swap images and links based on the active item.
> 
> ### Correction #42: GENERIC ICONS VS LUXURY CUSTOM (Refinement)
> - **Issue**: Standard icon packs (Feather/Heroicons) look "SaaS" not "Luxury Fashion".
> - **Solution**: Draw CUSTOM SVG paths.
>   - Ultra-thin strokes (1px)
>   - Unique shapes (e.g. specific tote bag handle, abstract user circle)
>   - Geometric precision.
> 
> ### Correction #43: BADGE OVERLAP (Refinement)
> - **Issue**: Notification badge overlapped the bag icon visually.
> - **Solution**: Badge must float CLEARLY separate (e.g., `-right-2` or `-right-3`) or be fully integrated. Never obscured.
> 
> ### Correction #44: MOBILE SCROLL BLINDNESS (Refinement)
> - **Issue**: Horizontal nav bars on mobile often don't look scrollable.
> - **Solution**: Add a visible "fade" cue on the right edge (`bg-gradient-to-l from-white`) to hint at off-screen content.

> [!TIP]
> ### Correction #45: INCONSISTENT ICONS (Refinement)
> - **Issue**: Mixing different icon styles (e.g., some rounded, some sharp, different stroke widths) looks cheap.
> - **Solution**: Enforce strict unity: All 20x20 viewBox, all 1.2px stroke, all centered.
> 
> ### Correction #46: MIXED FONTS (Refinement)
> - **Issue**: Using Serif for headers and Sans-Serif for body text can look messy in UI.
> - **Solution**: For modern luxury, go 100% Sans-Serif (Swiss Style). Clean, uniform, sophisticated.
> 
> ### Correction #47: BADGE POSITIONING (Refinement)
> - **Issue**: Badge overlapping content or looking "stuck on".
> - **Solution**: Position firmly to the side (e.g. `nudge-right`), minimize padding (tight circle), ensure number is centered.

> [!CAUTION]
> ### Correction #48: FADE-ANIMATIONEN VERBOTEN (Animation)
> - **Issue**: Fade-Animationen (`opacity-0` → `opacity-100`) für Overlays wirken billig und generisch.
> - **Solution**: **NUR Slide-Animationen verwenden!**
>   - Menu: `translateX` von links
>   - Search: `translateY` von oben (Two-Part: Header + Content)
>   - Cart: `translateX` von rechts
>   - Backdrop: `hidden`/`block` (instant, kein Fade)
> 
> ### Correction #49: SHADOW TRANSITION (Animation)
> - **Issue**: Shadow erschien zu schnell - wirkte billig.
> - **Solution**: Shadow muss **langsam und luxuriös** einfaden:
>   - **600ms** Duration (doppelt so lang wie Slide)
>   - **100ms Delay** (startet nach dem Slide beginnt)
>   - **cubic-bezier(0.4, 0, 0.2, 1)** für smooth easing
>   ```tsx
>   style={{ transition: 'transform 300ms ease-out, box-shadow 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms' }}
>   ```

> [!IMPORTANT]
> ### Correction #50: FLOATING MENU BUTTON (Pattern)
> - **Issue**: Menu Button war Teil des Headers, nicht über dem Menu Panel.
> - **Solution**: Menu Button muss **floating** sein (fixed, z-[70]) und ÜBER dem Menu Panel schweben.
>   - Button bleibt immer sichtbar
>   - Animiertes Hamburger → X Icon (rotate-45 / -rotate-45)
>   - Menu Panel hat leeren Header-Space für den Button
>   ```tsx
>   <button className="fixed top-0 left-0 h-[70px] ... z-[70]">
>       {/* Animated Hamburger → X */}
>   </button>
>   ```
>
> ### Correction #51: KONTRAST - SCHWARZER TEXT (Contrast)
> - **Issue**: Logo und Cart Count waren grau/hellgrau - schlechter Kontrast.
> - **Solution**: **Immer `text-black`** für:
>   - Logo
>   - Cart Badge/Count
>   - Wichtige UI-Elemente
>   - Nur Legal/Secondary Links dürfen grau sein
>
> ### Correction #52: TYPOGRAPHY CASING (Typography)
> - **Issue**: Alles uppercase wirkt generisch und billig.
> - **Solution**: Uppercase nur selektiv verwenden:
>   - ✅ Nav Items im Header (klein, 11px)
>   - ✅ Button Labels (Close, Menu, Search)
>   - ❌ Logo - Case wie gewollt (Atelier nicht ATELIER)
>   - ❌ Menu Items im Side Panel
>   - ❌ Cart Header (Shopping Bag nicht BAG)

> [!TIP]
> ### Correction #53: BACKDROP FADE ANIMATION (Animation)
> - **Issue**: Backdrop (dunkler Overlay hinter Panels) erschien instant - wirkte abrupt.
> - **Solution**: Backdrop darf mit Opacity faden (Ausnahme von "no fade" Regel für Panels):
>   ```tsx
>   className={`... transition-opacity duration-[400ms] ease-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
>   ```
>   - 400ms Duration
>   - `pointer-events-none` wenn geschlossen (verhindert Klicks auf unsichtbaren Overlay)

> [!TIP]
> ### Correction #54: SCROLLABLE PANELS (Layout)
> - **Issue**: Auf Mobile können lange Panels (Search, Menu) nicht gescrollt werden wenn der Content höher ist als der Screen.
> - **Solution**: Panels müssen immer scrollbar sein:
>   ```tsx
>   // Panel Container
>   className="fixed top-0 left-0 right-0 bottom-0 sm:bottom-auto overflow-hidden"
>   style={{ maxHeight: '100vh' }}
>   
>   // Content Area (scrollable)
>   className="overflow-y-auto"
>   style={{ maxHeight: 'calc(100vh - [header-height]px)' }}
>   ```
>   - `bottom-0` auf Mobile = füllt ganzen Screen
>   - `sm:bottom-auto` auf Desktop = nur so hoch wie Content
>   - Content mit `overflow-y-auto` scrollbar machen
>   - `maxHeight: calc(100vh - Xpx)` für verfügbare Höhe

---

## Design 8: Editorial Split

**Inspired by:** Aesop, COS, editorial fashion

**Unique Layout:**
- Two-row header: Top utilities bar (EN/CHF), Main row with logo+nav
- Centered large logo (24-32px)
- Menu + Cart in header, Search as separate overlay

**Unique Animations:**
| Element | Animation |
|---------|-----------|
| Menu | Slides **UP from bottom** (translateY-full → 0, 500ms) |
| Menu Items | Staggered delay (50ms per item) |
| Search | **Instant** show/hide (no animation) |
| Cart | Slides **UP from bottom** with rounded corners (450ms) |
| Hamburger | Three lines → X rotation |

**Special Features:**
- Cart panel has `rounded-t-2xl` (rounded top corners)
- Cart has drag handle bar (mobile sheet style)
- Full-screen menu with large nav items (48px font)
- Backdrop fade 400ms

---

## Design 9: Classic Americana (Ralph Lauren Style)

**Inspired by:** Ralph Lauren, Tommy Hilfiger, Brooks Brothers

**Unique Layout:**
- Logo left, Nav center (desktop), Icons right
- Promo bar with navy background (#1a2238)
- Serif logo font (Georgia)
- Four icons: Search, Account, Wishlist, Cart

**Unique Animations:**
| Element | Animation |
|---------|-----------|
| Mega Menu | max-height slide down (350ms) |
| Nav Underline | scale-x-0 → scale-x-100 (300ms) |
| Search | Opacity fade (400ms) |
| Mobile Menu | Slides from right (350ms) |
| Image Hover | scale-105 (500ms) |

**Special Features:**
- Mega-dropdown navigation (hover-triggered)
- Underlined active nav items with animation
- Full-width search with trending tags as pills
- **No mini-cart** - just link to `/cart`
- Serif logo for classic American aesthetic

---

## Design 10: Architectural Grid

**Inspired by:** The Row, Jil Sander, architectural minimalism

**Unique Layout:**
- CSS Grid on desktop: `grid-cols-[auto_1fr_auto_1fr_auto]`
- Vertical border separators between all sections
- Mobile: Flexbox with centered logo, hamburger left, icons right
- Desktop: Asymmetric nav distribution around logo

**Unique Animations:**
| Element | Animation |
|---------|-----------|
| Menu | Slides from left (400ms) |
| Cart | Slides from right (450ms) |
| Search | Opacity morph over header (300ms) |
| Cart Backdrop | Opacity fade (400ms) - covers left side only |
| Hamburger | Three lines → X rotation (350ms) |

**Special Features:**
- Split-screen cart (left side dims, right shows cart)
- Numbered menu items ("01, 02, 03...")
- Search morphs INTO header (replaces content)
- Footer links in 2-column grid
- Ultra-thin borders (10% opacity)

---

## Design 11: The Ultimate Luxury Header ⭐

**The best of all designs - production ready**

**Inspired by:** Louis Vuitton, Prada, Bottega Veneta

**Perfect Layout:**
- Desktop: Menu+Search left, Logo center (absolute), Icons right
- Mobile: Hamburger+Search left, Logo center (absolute), Cart right
- Logo truly centered using `absolute left-1/2 -translate-x-1/2`

**All Animations (Guidelines Compliant):**
| Element | Animation |
|---------|-----------|
| Menu Panel | Slides from left (400ms) |
| Search Panel | Slides from top (400ms) |
| Cart Panel | Slides from right (450ms) |
| Backdrop | Opacity fade (400ms) + pointer-events-none |
| Header Shadow | Fade on scroll (700ms with cubic-bezier) |
| Hamburger | Two lines → X rotation (350ms) |

**All Features:**
- ✅ Full-screen backdrop (`fixed inset-0`)
- ✅ Mini-cart with product details
- ✅ Search with trending tags + category grid
- ✅ Animated hamburger menu
- ✅ Scroll-triggered header shadow
- ✅ Responsive at all breakpoints
- ✅ Proper z-index layering (50/55/60)
- ✅ No uppercase abuse
- ✅ Consistent typography (Helvetica Neue)

---

## 13. Design Checklist

Before considering a header design complete, verify:

### Desktop
- [ ] Logo prominently displayed
- [ ] Navigation clearly visible with hover underlines
- [ ] All icons functional (Search, User, Wishlist, Bag)
- [ ] Cart badge shows count
- [ ] Promo bar dismissible
- [ ] Dropdowns appear instantly
- [ ] Close button on dropdowns

### Mobile
- [ ] Hamburger menu visible and functional
- [ ] Logo visible
- [ ] Essential icons (Search, Wishlist, Bag)
- [ ] Menu opens instantly
- [ ] Shop name in menu header (not "Menu")
- [ ] Categories with chevrons
- [ ] Footer links with icons
- [ ] Cart panel full-width
- [ ] Search overlay full-screen

### General
- [ ] No brand-specific text (Prada, LV, etc.)
- [ ] Consistent typography
- [ ] Proper letter-spacing on uppercase
- [ ] Symmetric spacing
- [ ] Z-index layering correct
- [ ] Responsive at all breakpoints

---

*Last updated: 2025-12-11*
