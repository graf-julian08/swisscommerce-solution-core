import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- ATLAS COMPONENT: MAGNETIC NAV ---
// Designed for: High-end fashion, minimal UI.
// Features: Hide on scroll down, show on scroll up, glassmorphism, magnetic hover.

export default function MagneticNav({ logo = "BRAND" }) {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    const navLinks = [
        { name: 'Shop', path: '/shop' },
        { name: 'Collections', path: '/shop' }, // Mock paths
        { name: 'About', path: '/' },
        { name: 'Journal', path: '/' },
    ];

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
                }`}
        >
            {/* Left: Menu Trigger (Mobile) or Collections */}
            <div className="flex items-center gap-4">
                <button className="p-2 text-white/80 hover:text-white transition-colors md:hidden">
                    <Menu className="w-6 h-6" />
                </button>
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-sm font-medium text-neutral-400 hover:text-white uppercase tracking-widest transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Link to="/" className="text-2xl font-serif font-bold tracking-tighter text-white">
                    {logo}
                </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-6">
                <button className="text-neutral-400 hover:text-white transition-colors">
                    <Search className="w-5 h-5" />
                </button>
                <Link to="/cart" className="relative text-neutral-400 hover:text-white transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-blue-500 text-[8px] font-bold text-black">
                        2
                    </span>
                </Link>
            </div>
        </motion.header>
    );
}
