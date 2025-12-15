import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Bookmark, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BalenciagaHeader() {
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  // Scroll logic to hide/show header (optional interaction polish common in luxury sites)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: 'SPRING 26', link: '#' },
    { label: 'GIFTS', link: '#' },
    { label: 'BAGS', link: '#' },
    { label: 'WOMEN', link: '#' },
    { label: 'MEN', link: '#' },
    { label: 'COUTURE', link: '#' },
    { label: 'EXPLORE', action: () => setIsExploreOpen(true) },
  ];

  const exploreMenu = [
    'Special Projects',
    'Balenciaga Brand Ambassadors',
    'Balenciaga Music',
    'Heritage',
    'Collections',
    'Our Commitments',
  ];

  return (
    <div className="font-sans text-black relative z-50">
      {/* Sidebar / Explore Menu */}
      <AnimatePresence>
        {isExploreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExploreOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="fixed top-0 left-0 bottom-0 w-[350px] bg-white z-50 p-6 overflow-y-auto border-r border-gray-200"
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setIsExploreOpen(false)}>
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              <ul className="space-y-6">
                {exploreMenu.map((item) => (
                  <li key={item} className="text-[14px] cursor-pointer hover:text-gray-600 transition-colors">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Header Container */}
      <div className={`fixed top-0 left-0 w-full bg-white transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
        
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between px-6 py-4 md:py-5 border-b-0 relative bg-white">
          
          {/* Left: Navigation Categories */}
          <nav className="flex items-center gap-3 hidden lg:flex">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action || undefined}
                className="border border-black px-[7px] py-[3px] text-[11px] font-bold tracking-wide hover:bg-black hover:text-white transition-colors uppercase"
              >
                {item.label}
              </button>
            ))}
            {/* Mobile Menu Trigger (Visible only on small screens) */}
            <button className="lg:hidden" onClick={() => setIsExploreOpen(true)}>
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </nav>

          {/* Center: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
            <h1 className="text-2xl md:text-[26px] font-bold tracking-tight uppercase cursor-pointer">
              Balenciaga
            </h1>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-4 text-[10px] md:text-[11px] font-bold tracking-wide uppercase">
              <a href="#" className="hover:text-gray-600">Client Services</a>
              <a href="#" className="hover:text-gray-600">Login</a>
            </div>
            <div className="flex items-center gap-4">
              <Search size={18} strokeWidth={1.5} className="cursor-pointer" />
              <Bookmark size={18} strokeWidth={1.5} className="cursor-pointer hidden sm:block" />
              <ShoppingBag size={18} strokeWidth={1.5} className="cursor-pointer" />
            </div>
          </div>
        </header>

        {/* Notification / Utilities Bar */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white border-b border-gray-100 relative"
            >
              <div className="max-w-screen-xl mx-auto px-10 py-2 text-center relative">
                <p className="text-[10px] md:text-[11px] text-gray-800 tracking-wide">
                  Purchases made between 11/20/2025 and 12/15/2025 may be returned or exchanged until 01/15/2026
                </p>
                <button 
                  onClick={() => setShowNotification(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
                >
                  <X size={14} strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Spacer to prevent content overlap since header is fixed */}
      <div className={`${showNotification ? 'h-[90px]' : 'h-[60px]'} transition-all duration-300`}></div>
    </div>
  );
}