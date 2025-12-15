# 21st.dev Design Patterns Reference (LAYOUT-FOCUSED)

This file contains design and layout patterns inspired by 21st.dev and real luxury brands.
These are for VISUAL STRUCTURE, not animations.

## ⚠️ CRITICAL: NO ANIMATIONS FROM THIS FILE

All animation patterns have been REMOVED. Luxury fashion brands use MINIMAL motion.
See the ANTI-AI DETECTION PROTOCOL in the system prompt for motion rules.

---

## 1. EDGE-TO-EDGE IMAGE GRID (Hero/Category)

Images that span the full viewport width.

```jsx
// Category preview row - EDGE TO EDGE
<div className="w-full grid grid-cols-3 gap-0">
  {categories.map((cat) => (
    <Link key={cat.slug} href={`/shop/${cat.slug}`} className="relative aspect-[3/4] overflow-hidden">
      <img 
        src={cat.image} 
        alt={cat.name}
        className="w-full h-full object-cover"
      />
      <span className="absolute bottom-6 left-6 text-white text-sm font-light">
        {cat.name}
      </span>
    </Link>
  ))}
</div>
```

---

## 2. MINIMAL PRODUCT CARD (No Effects)

Clean product cards with optional second image on hover. NO zoom, NO scale.

```jsx
const ProductCard = ({ product }) => {
  const [showSecondImage, setShowSecondImage] = useState(false);
  
  return (
    <Link 
      href={`/product/${product.id}`}
      className="block group"
      onMouseEnter={() => setShowSecondImage(true)}
      onMouseLeave={() => setShowSecondImage(false)}
    >
      {/* Image - NO ZOOM EVER */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img 
          src={showSecondImage && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Text - centered, minimal */}
      <div className="mt-3 text-center">
        <p className="text-sm font-normal">{product.name}</p>
        <p className="text-sm text-gray-600">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
};
```

---

## 3. LUXURY HEADER LAYOUT

Simple header with Title Case text, no uppercase.

```jsx
const Header = () => {
  return (
    <header className="fixed top-0 w-full h-16 bg-white z-50 border-b border-gray-100">
      <div className="h-full flex items-center justify-between px-6">
        {/* Left - Menu & Search */}
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-sm">
            <MenuIcon className="w-5 h-5 stroke-1" />
            <span>Menu</span> {/* Title Case! */}
          </button>
          <button className="flex items-center gap-2 text-sm">
            <SearchIcon className="w-5 h-5 stroke-1" />
            <span>Search</span> {/* Title Case! */}
          </button>
        </div>
        
        {/* Center - Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="text-xl tracking-widest uppercase">{brandName}</span>
        </Link>
        
        {/* Right - Actions */}
        <div className="flex items-center gap-5">
          <Link href="/wishlist" className="text-sm">Wishlist</Link>
          <Link href="/login" className="text-sm">Account</Link>
          <button className="relative">
            <BagIcon className="w-5 h-5 stroke-1" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px]">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
```

---

## 4. MINIMAL FILTER BAR

Simple text-based filters, NO pill-shaped buttons.

```jsx
const FilterBar = ({ categories, onFilter }) => {
  return (
    <div className="flex justify-between items-center py-4 px-6 border-b border-gray-100">
      {/* Category dropdown */}
      <select className="text-sm bg-transparent border-none outline-none cursor-pointer">
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat.slug} value={cat.slug}>{cat.name}</option>
        ))}
      </select>
      
      {/* Filter link */}
      <button className="text-sm hover:underline">
        Filter
      </button>
    </div>
  );
};
```

---

## 5. CLEAN PRODUCT DETAIL LAYOUT

Large images on left, info on right. NO zoom effects.

```jsx
const ProductDetail = ({ product }) => {
  return (
    <div className="min-h-screen pt-16">
      {/* Breadcrumb */}
      <nav className="px-6 py-4 text-xs text-gray-500">
        <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / {product.category} / {product.name}
      </nav>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
        {/* Images - 60% */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-1">
          {product.images.map((img, i) => (
            <img key={i} src={img} alt="" className="w-full aspect-[3/4] object-cover" />
          ))}
        </div>
        
        {/* Info - 40% */}
        <div className="lg:col-span-2 px-6 py-8 lg:py-16 lg:sticky lg:top-16 lg:h-fit">
          <h1 className="text-lg font-normal mb-2">{product.name}</h1>
          <p className="text-lg mb-6">{formatPrice(product.price)}</p>
          
          {/* Size selector */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 mb-3">Size</p>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <button key={size} className="w-10 h-10 border border-gray-200 text-sm hover:border-black">
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Add to bag - solid black, no animation */}
          <button className="w-full py-4 bg-black text-white text-sm">
            Add to Bag
          </button>
          
          {/* Secondary actions */}
          <div className="flex gap-4 mt-4 text-xs text-gray-500">
            <button className="hover:underline">Add to Wishlist</button>
            <button className="hover:underline">Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## 6. SIDE MENU (Slide Animation Only)

Menu slides from left. NO fade animations.

```jsx
const SideMenu = ({ isOpen, onClose, links }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Menu - SLIDE from left */}
      <nav 
        className={`fixed left-0 top-0 h-full w-[360px] bg-white z-50 
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button onClick={onClose} className="absolute top-5 right-6 text-sm">
          Close
        </button>
        
        <ul className="mt-20 px-6 space-y-4">
          {links.map(link => (
            <li key={link.href}>
              <Link href={link.href} className="text-lg hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
```

---

## 7. MINI CART (Slide from Right)

Cart drawer slides from right. NO fade, NO bounce.

```jsx
const MiniCart = ({ isOpen, onClose, items }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Cart - SLIDE from right */}
      <div 
        className={`fixed right-0 top-0 h-full w-[400px] bg-white z-50
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center px-6 h-16 border-b">
          <span className="text-sm">Shopping Bag ({items.length})</span>
          <button onClick={onClose} className="text-sm">Close</button>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-180px)]">
          {items.map(item => (
            <div key={item.id} className="flex gap-4">
              <img src={item.image} alt="" className="w-20 h-28 object-cover" />
              <div className="flex-1">
                <p className="text-sm">{item.name}</p>
                <p className="text-sm text-gray-500">{item.size}</p>
                <p className="text-sm mt-2">{formatPrice(item.price)}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Link href="/checkout" className="block w-full py-4 bg-black text-white text-center text-sm">
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
};
```

---

## TYPOGRAPHY RULES

Real luxury brands use:

- **Font Size**: 12-14px for body, 16-24px for headings
- **Font Weight**: 300 (light) or 400 (regular)
- **Letter Spacing**: Normal or slightly wide for logos
- **Text Transform**: Title Case for navigation, only uppercase for logos

---

## COLOR RULES

Luxury palette:

- **Primary**: Black (#000000 or #0A0A0A)
- **Background**: White (#FFFFFF)
- **Text**: Black or very dark gray (#111)
- **Muted**: Gray (#666 or #888)
- **Accent**: NONE or one subtle color (olive, navy)
- **Borders**: Very light gray (#E5E5E5 or #F0F0F0)

---

## SPACING RULES

- **Generous whitespace** - Let content breathe
- **Consistent gaps** - Use 4px, 8px, 16px, 24px, 32px, 48px, 64px
- **Edge-to-edge for images** - No side padding on full-width images
- **Minimal padding on cards** - Just enough for text
