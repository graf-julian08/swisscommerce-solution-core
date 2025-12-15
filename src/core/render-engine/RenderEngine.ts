// src/core/render-engine/RenderEngine.ts
// Main Render Engine - Converts WebsiteDSL to Next.js Project Structure

import type {
    WebsiteDSL,
    PageConfig,
    SectionConfig,
    GlobalComponents,
    ContentConfig,
} from '../../dsl/schema/website.schema';
import { resolveComponent, COMPONENT_REGISTRY } from './ComponentResolver';
import { resolveTokens, type ResolvedTokens } from './TokenResolver';
import { gsapPresets, generateGSAPInitCode, type GSAPAnimationType } from '../../design-system/tokens/gsap-animations';

// ============================================================
// TYPES
// ============================================================

export interface RenderOutput {
    // File structure
    files: GeneratedFile[];

    // CSS
    globalCSS: string;
    fontImports: string[];

    // Stats
    pageCount: number;
    componentCount: number;
}

export interface GeneratedFile {
    path: string;
    content: string;
    type: 'page' | 'component' | 'layout' | 'style' | 'config' | 'util';
}

// ============================================================
// MAIN RENDER FUNCTION
// ============================================================

export function renderWebsite(dsl: WebsiteDSL): RenderOutput {
    const files: GeneratedFile[] = [];

    // Resolve tokens
    const tokens = resolveTokens(dsl.design);

    // 1. Generate global styles
    files.push({
        path: 'app/globals.css',
        content: tokens.globalCSS,
        type: 'style',
    });

    // 2. Generate GSAP utilities if needed
    if (dsl.design.animationPack.startsWith('gsap-')) {
        const gsapType = dsl.design.animationPack as GSAPAnimationType;
        const gsapPreset = gsapPresets[gsapType];
        if (gsapPreset) {
            files.push({
                path: 'lib/animations.ts',
                content: generateGSAPInitCode(gsapPreset),
                type: 'util',
            });
        }
    }

    // 3. Generate layout
    files.push({
        path: 'app/layout.tsx',
        content: generateRootLayout(dsl, tokens),
        type: 'layout',
    });

    // 4. Generate global components (Header, Footer, etc.)
    files.push(...generateGlobalComponents(dsl.globalComponents, dsl.content));

    // 5. Generate pages
    for (const page of dsl.pages) {
        files.push(generatePage(page, dsl));
    }

    // 6. Generate content data files
    files.push({
        path: 'data/content.json',
        content: JSON.stringify(dsl.content, null, 2),
        type: 'config',
    });

    files.push({
        path: 'data/dsl.json',
        content: JSON.stringify(dsl, null, 2),
        type: 'config',
    });

    return {
        files,
        globalCSS: tokens.globalCSS,
        fontImports: tokens.fontImports,
        pageCount: dsl.pages.length,
        componentCount: countComponents(dsl),
    };
}

// ============================================================
// ROOT LAYOUT GENERATOR
// ============================================================

function generateRootLayout(dsl: WebsiteDSL, tokens: ResolvedTokens): string {
    const fontImportsHtml = tokens.fontImports
        .map(url => `<link rel="stylesheet" href="${url}" />`)
        .join('\n        ');

    return `import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: '${dsl.content.brand.name}',
  description: '${dsl.content.brand.tagline}',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="${dsl.meta.locale}">
      <head>
        ${fontImportsHtml}
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
`;
}

// ============================================================
// GLOBAL COMPONENTS GENERATOR
// ============================================================

function generateGlobalComponents(global: GlobalComponents, content: ContentConfig): GeneratedFile[] {
    const files: GeneratedFile[] = [];

    // Header
    files.push({
        path: 'components/Header.tsx',
        content: generateHeaderComponent(global.header, content.brand),
        type: 'component',
    });

    // Footer
    files.push({
        path: 'components/Footer.tsx',
        content: generateFooterComponent(global.footer, content.brand),
        type: 'component',
    });

    // Cart Drawer
    files.push({
        path: 'components/CartDrawer.tsx',
        content: generateCartDrawerComponent(global.cartDrawer),
        type: 'component',
    });

    // Mobile Menu
    files.push({
        path: 'components/MobileMenu.tsx',
        content: generateMobileMenuComponent(global.mobileMenu, global.header.elements.navigation),
        type: 'component',
    });

    return files;
}

function generateHeaderComponent(header: GlobalComponents['header'], brand: ContentConfig['brand']): string {
    const navItems = header.elements.navigation
        .map(item => `{ label: '${item.label}', href: '${item.href}' }`)
        .join(',\n    ');

    return `'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  ${navItems}
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header
      style={{
        position: ${header.sticky ? "'sticky'" : "'relative'"},
        top: 0,
        zIndex: 50,
        width: '100%',
        background: ${header.transparent ? "'transparent'" : "'var(--color-background)'"},
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      ${header.announcementBar?.enabled ? `
      {/* Announcement Bar */}
      <div
        style={{
          background: 'var(--color-primary)',
          color: 'var(--color-background)',
          textAlign: 'center',
          padding: '0.5rem',
          fontSize: 'var(--text-sm)',
        }}
      >
        ${header.announcementBar.text}
      </div>
      ` : ''}
      
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem var(--section-padding-x)',
          maxWidth: 'var(--container-max-width)',
          margin: '0 auto',
        }}
      >
        {/* Left: Menu Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
          <button
            onClick={() => setMobileMenuOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <span style={{ fontSize: 'var(--text-sm)', letterSpacing: '0.05em' }}>Menu</span>
          </button>
          
          ${header.elements.search ? `
          <button onClick={() => setSearchOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          ` : ''}
        </div>
        
        {/* Center: Logo */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', fontWeight: 500 }}>
            ${brand.name}
          </Link>
        </div>
        
        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, justifyContent: 'flex-end' }}>
          ${header.elements.wishlist ? `
          <Link href="/wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </Link>
          ` : ''}
          
          ${header.elements.account ? `
          <Link href="/account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </Link>
          ` : ''}
          
          ${header.elements.cart ? `
          <button>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </button>
          ` : ''}
        </div>
      </div>
    </header>
  );
}
`;
}

function generateFooterComponent(footer: GlobalComponents['footer'], brand: ContentConfig['brand']): string {
    const year = new Date().getFullYear();

    return `'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-primary)',
        color: 'var(--color-background)',
        padding: 'var(--section-padding-y) var(--section-padding-x)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max-width)',
          margin: '0 auto',
        }}
      >
        ${footer.showNewsletter ? `
        {/* Newsletter */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: '1rem' }}>
            Join Our Newsletter
          </h3>
          <form style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', maxWidth: '400px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: '1px solid var(--color-background)',
                background: 'transparent',
                color: 'var(--color-background)',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--color-background)',
                color: 'var(--color-primary)',
                fontWeight: 500,
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
        ` : ''}
        
        {/* Footer Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          ${footer.columns.map(col => `
          <div>
            <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              ${col.title}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              ${col.links.map(link => `
              <li>
                <Link href="${link.href}" style={{ fontSize: 'var(--text-sm)', opacity: 0.8 }}>
                  ${link.label}
                </Link>
              </li>
              `).join('')}
            </ul>
          </div>
          `).join('')}
        </div>
        
        {/* Copyright */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: 'var(--text-sm)', opacity: 0.8 }}>
            © ${year} ${brand.name}. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            ${footer.legalLinks.map(link => `
            <Link href="${link.href}" style={{ fontSize: 'var(--text-sm)', opacity: 0.8 }}>
              ${link.label}
            </Link>
            `).join('')}
          </div>
        </div>
      </div>
    </footer>
  );
}
`;
}

function generateCartDrawerComponent(cart: GlobalComponents['cartDrawer']): string {
    return `'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 100,
            }}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '420px',
              background: 'var(--color-background)',
              zIndex: 101,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)' }}>Shopping Bag</h2>
              <button onClick={onClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Cart Items */}
            <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>
              <p style={{ textAlign: 'center', color: 'var(--color-muted)' }}>Your bag is empty</p>
            </div>
            
            {/* Footer */}
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
              <button
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'var(--color-primary)',
                  color: 'var(--color-background)',
                  fontWeight: 500,
                  fontSize: 'var(--text-base)',
                }}
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
`;
}

function generateMobileMenuComponent(menu: GlobalComponents['mobileMenu'], navigation: GlobalComponents['header']['elements']['navigation']): string {
    return `'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = ${JSON.stringify(navigation, null, 2)};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--color-background)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1.5rem' }}>
            <button onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Navigation */}
          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
            {navigation.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-4xl)',
                    fontWeight: 300,
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
`;
}

// ============================================================
// PAGE GENERATOR
// ============================================================

function generatePage(page: PageConfig, dsl: WebsiteDSL): GeneratedFile {
    const pagePath = page.id === 'home'
        ? 'app/page.tsx'
        : `app/${page.path.replace(/^\//, '').replace(/\[(\w+)\]/g, '[$1]')}/page.tsx`;

    const sections = page.sections
        .sort((a, b) => a.order - b.order)
        .map(section => generateSectionJSX(section, dsl))
        .join('\n      ');

    const content = `'use client';

import { motion } from 'framer-motion';

export default function ${capitalizeFirst(page.id)}Page() {
  return (
    <div>
      ${sections || '<p>Page content coming soon...</p>'}
    </div>
  );
}
`;

    return {
        path: pagePath,
        content,
        type: 'page',
    };
}

function generateSectionJSX(section: SectionConfig, dsl: WebsiteDSL): string {
    const { component, variant, props } = resolveComponent(section.component);

    // Generate section wrapper with animation
    const animationVariant = dsl.design.animationPack === 'none' ? '' : `
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}`;

    // Generate component-specific JSX based on type
    const sectionContent = generateComponentJSX(section.component.type, variant, props, dsl);

    return `
      {/* ${section.id} */}
      <motion.section
        id="${section.id}"${animationVariant}
        style={{ paddingTop: 'var(--section-padding-y)', paddingBottom: 'var(--section-padding-y)' }}
      >
        ${sectionContent}
      </motion.section>`;
}

function generateComponentJSX(type: string, variant: string, props: Record<string, unknown>, dsl: WebsiteDSL): string {
    // Based on component type, generate appropriate JSX
    switch (type) {
        case 'hero':
        case 'hero-video':
            return generateHeroJSX(variant, props, dsl.content.hero);

        case 'product-grid':
            return generateProductGridJSX(variant, props);

        case 'category-grid':
            return generateCategoryGridJSX(variant, props);

        case 'testimonials':
            return generateTestimonialsJSX(variant, props);

        case 'newsletter':
            return generateNewsletterJSX(variant, props);

        case 'banner':
            return generateBannerJSX(variant, props);

        case 'text-block':
            return generateTextBlockJSX(variant, props);

        case 'legal-content':
            return generateLegalContentJSX(variant, props);

        case 'contact-form':
            return generateContactFormJSX(variant, props);

        case 'login-form':
        case 'register-form':
            return generateAuthFormJSX(type, variant, props);

        default:
            return `<div className="container"><p>Component: ${type} (${variant})</p></div>`;
    }
}

function generateHeroJSX(variant: string, props: Record<string, unknown>, hero: ContentConfig['hero']): string {
    const height = (props.height as string) || '100vh';

    return `
        <div
          style={{
            position: 'relative',
            height: '${height}',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--color-secondary)',
            }}
          >
            ${hero.mediaType === 'video' ? `
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <source src="${hero.mediaUrl}" type="video/mp4" />
            </video>
            ` : `
            <img
              src="${hero.mediaUrl}"
              alt="Hero"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            `}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,${hero.overlayOpacity || 0.3})' }} />
          </div>
          
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, color: 'white', padding: '2rem' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-6xl)', marginBottom: '1rem' }}>
              ${hero.headline}
            </h1>
            ${hero.subheadline ? `<p style={{ fontSize: 'var(--text-xl)', marginBottom: '2rem', opacity: 0.9 }}>${hero.subheadline}</p>` : ''}
            <a
              href="${hero.ctaLink}"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: 'white',
                color: 'black',
                fontWeight: 500,
                letterSpacing: '0.05em',
              }}
            >
              ${hero.ctaText}
            </a>
          </div>
        </div>`;
}

function generateProductGridJSX(variant: string, props: Record<string, unknown>): string {
    const columns = (props.columns as number) || 4;

    return `
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(${columns}, 1fr)', gap: '2rem' }}>
            {/* Products will be loaded dynamically */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} style={{ aspectRatio: '3/4', background: 'var(--color-secondary)', borderRadius: 'var(--radius)' }} />
            ))}
          </div>
        </div>`;
}

function generateCategoryGridJSX(variant: string, props: Record<string, unknown>): string {
    return `
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {/* Categories will be loaded from content */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  aspectRatio: '3/4',
                  background: 'var(--color-secondary)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: 'white' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)' }}>Category {i}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>`;
}

function generateTestimonialsJSX(variant: string, props: Record<string, unknown>): string {
    return `
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', marginBottom: '2rem' }}>What Our Customers Say</h2>
          <blockquote style={{ fontSize: 'var(--text-xl)', fontStyle: 'italic', marginBottom: '1rem' }}>
            "Absolutely love the quality and attention to detail. Will definitely be ordering again!"
          </blockquote>
          <cite style={{ color: 'var(--color-muted)' }}>— Happy Customer</cite>
        </div>`;
}

function generateNewsletterJSX(variant: string, props: Record<string, unknown>): string {
    return `
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: '0.5rem' }}>Stay Updated</h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>Subscribe to our newsletter for exclusive offers</p>
          <form style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--color-primary)',
                color: 'var(--color-background)',
                borderRadius: 'var(--radius)',
                fontWeight: 500,
              }}
            >
              Subscribe
            </button>
          </form>
        </div>`;
}

function generateBannerJSX(variant: string, props: Record<string, unknown>): string {
    return `
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '60vh' }}>
          <div style={{ background: 'var(--color-secondary)' }} />
          <div style={{ display: 'flex', alignItems: 'center', padding: '4rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-4xl)', marginBottom: '1rem' }}>Featured Collection</h2>
              <p style={{ marginBottom: '2rem', color: 'var(--color-muted)' }}>Discover our latest arrivals</p>
              <a href="/shop" style={{ color: 'var(--color-foreground)', textDecoration: 'underline' }}>Shop Now</a>
            </div>
          </div>
        </div>`;
}

function generateTextBlockJSX(variant: string, props: Record<string, unknown>): string {
    return `
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ lineHeight: 1.8 }}>
            <p>Content will be loaded dynamically...</p>
          </div>
        </div>`;
}

function generateLegalContentJSX(variant: string, props: Record<string, unknown>): string {
    const contentKey = props.contentKey as string || 'default';

    return `
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-4xl)', marginBottom: '2rem' }}>
            ${capitalizeFirst(contentKey)}
          </h1>
          <div style={{ lineHeight: 1.8 }}>
            <p>Legal content for ${contentKey} will be loaded from content data...</p>
          </div>
        </div>`;
}

function generateContactFormJSX(variant: string, props: Record<string, unknown>): string {
    return `
        <div className="container" style={{ maxWidth: '600px' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Your Name"
              style={{
                padding: '0.75rem 1rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              style={{
                padding: '0.75rem 1rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
              }}
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              style={{
                padding: '0.75rem 1rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                resize: 'vertical',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '1rem',
                background: 'var(--color-primary)',
                color: 'var(--color-background)',
                borderRadius: 'var(--radius)',
                fontWeight: 500,
              }}
            >
              Send Message
            </button>
          </form>
        </div>`;
}

function generateAuthFormJSX(type: string, variant: string, props: Record<string, unknown>): string {
    const isLogin = type === 'login-form';

    return `
        <div className="container" style={{ maxWidth: '400px', paddingTop: '4rem', paddingBottom: '4rem' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', textAlign: 'center', marginBottom: '2rem' }}>
            ${isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            ${!isLogin ? `
            <input
              type="text"
              placeholder="Full Name"
              style={{
                padding: '0.75rem 1rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
              }}
            />
            ` : ''}
            <input
              type="email"
              placeholder="Email"
              style={{
                padding: '0.75rem 1rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
              }}
            />
            <input
              type="password"
              placeholder="Password"
              style={{
                padding: '0.75rem 1rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '1rem',
                background: 'var(--color-primary)',
                color: 'var(--color-background)',
                borderRadius: 'var(--radius)',
                fontWeight: 500,
              }}
            >
              ${isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: 'var(--text-sm)', color: 'var(--color-muted)' }}>
            ${isLogin ? "Don't have an account?" : 'Already have an account?'}
            <a href="${isLogin ? '/register' : '/login'}" style={{ color: 'var(--color-foreground)', marginLeft: '0.5rem' }}>
              ${isLogin ? 'Create one' : 'Sign in'}
            </a>
          </p>
        </div>`;
}

// ============================================================
// UTILITIES
// ============================================================

function countComponents(dsl: WebsiteDSL): number {
    let count = 0;
    for (const page of dsl.pages) {
        count += page.sections.length;
    }
    return count;
}

function capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================================
// EXPORTS
// ============================================================

export { generateRootLayout, generatePage, generateSectionJSX };
