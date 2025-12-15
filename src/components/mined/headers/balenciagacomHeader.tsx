javascript
import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Bookmark, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BalenciagaHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for potential transparency logic (though screenshot shows white/solid)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'SPRING 26', link: '#' },
    { label: 'GIFTS', link: '#' },
    { label: 'BAGS', link: '#' },
    { label: 'WOMEN', link: '#' },
    { label: 'MEN', link: '#' },
    { label: 'COUTURE', link: '#' },
    { label: 'EXPLORE', action: () => setIsMenuOpen(!isMenuOpen) },
  ];

  const sidebarItems = [
    'Special Projects',
    'Balenciaga Brand Ambassadors',
    'Balenciaga Music',
    'Heritage',
    'Collections',
    'Our Commitments',
  ];

  return (
    <div className="font-sans text-black relative z-50">
      {/* Main Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 h-[44px] flex items-center px-4 md:px-6 border-b border-transparent ${
          isScrolled ? 'border-gray-200' : ''
        }`}
      >
        {/* Left Navigation (Boxed Links) */}
        <nav className="hidden md:flex items-center gap-2 z-20 flex-1">
          {navItems.map((item, index) => (
            <button
              key={item.label}
              onClick={item.action}
              className="border border-black px-[6px] py-[1px] text-[10px] lg:text-[11px] font-bold uppercase tracking-tight hover:bg-black hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger (Visible only on small screens) */}
        <div className="md:hidden flex-1 flex items-center">
            <button onClick={() => setIsMenuOpen(true)}>
                <Menu strokeWidth={1.5} className="w-5 h-5" />
            </button>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <a href="#" className="text-xl lg:text-2xl font-bold tracking-tight uppercase">
            Balenciaga
          </a>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center justify-end gap-4 flex-1 z-20">
          <a href="#" className="hidden lg:block text-[10px] lg:text-[11px] font-bold uppercase tracking-tight hover:underline">
            Client Services
          </a>
          <a href="#" className="hidden lg:block text-[10px] lg:text-[11px] font-bold uppercase tracking-tight hover:underline">
            Login
          </a>
          
          <div className="flex items-center gap-3 lg:gap-4 pl-2">
            <button aria-label="Search">
              <Search strokeWidth={1.5} className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
            </button>
            <button aria-label="Bookmarks">
              <Bookmark strokeWidth={1.5} className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
            </button>
            <button aria-label="Shopping Bag">
              <ShoppingBag strokeWidth={1.5} className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Spacing for fixed header */}
      <div className="h-[44px]" />

      {/* Promo Bar */}
      <AnimatePresence>
        {showPromo && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="relative bg-white text-[10px] md:text-[11px] py-2 px-8 text-center border-b border-gray-200"
          >
            <p className="max-w-4xl mx-auto leading-tight text-gray-800">
              Purchases made between 11/20/2025 and 12/15/2025 may be returned or exchanged until 01/15/2026
            </p>
            <button 
              onClick={() => setShowPromo(false)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1"
            >
              <X strokeWidth={1} className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar / Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black z-30"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed top-[44px] left-0 bottom-0 w-[300px] bg-white z-40 overflow-y-auto border-r border-gray-100"
            >
              <div className="p-6 flex flex-col gap-6">
                <ul className="flex flex-col gap-4">
                  {sidebarItems.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-[13px] font-normal hover:underline block text-gray-900">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}