import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Phone, 
  Gift,
  X,
  Menu
} from 'lucide-react';

export default function BottegaVenetaHeader() {
  const [isPromoOpen, setIsPromoOpen] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for header background/border logic if needed
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    "New",
    "Women",
    "Men",
    "Bags",
    "Art of Living",
    "Gifts",
    "Craft in Motion"
  ];

  return (
    <div className="font-sans text-black relative w-full z-50">
      {/* Promo Bar */}
      <AnimatePresence>
        {isPromoOpen && (
          <motion.div
            initial={{ height: 0, opacity: 1 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }} // Slide effect
            className="bg-black text-white relative overflow-hidden"
          >
            <div className="flex justify-center items-center py-2.5 px-10 text-[11px] font-normal tracking-wide text-center leading-relaxed">
              <span>
                Orders placed by Dec. 19th before 1:00 PM CET will be delivered no later than Dec. 24th. 
                <span className="ml-2 underline cursor-pointer hover:no-underline">Gifts for her</span> 
                <span className="mx-1">|</span> 
                <span className="underline cursor-pointer hover:no-underline">Gifts for him</span>
              </span>
            </div>
            <button 
              onClick={() => setIsPromoOpen(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-1 hover:opacity-70 transition-opacity"
              aria-label="Close announcement"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header */}
      <header 
        className={`bg-white transition-colors duration-300 w-full`}
        style={{ fontFamily: 'bottegaveneta-regular-webfont, Arial, sans-serif' }}
      >
        <div className="mx-[35px] h-[80px] flex items-center justify-between">
          
          {/* Mobile Menu Icon (Hidden on Desktop) */}
          <div className="lg:hidden flex items-center">
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
               <Menu size={24} strokeWidth={1} />
             </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 lg:flex-1">
            <a href="/" className="inline-block">
              <h1 className="font-serif text-[26px] tracking-tight leading-none uppercase" style={{ letterSpacing: '-0.02em', fontWeight: 600 }}>
                Bottega Veneta
              </h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-x-8">
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
                className="text-[14px] leading-none tracking-wide hover:opacity-60 transition-opacity duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center justify-end gap-x-5 lg:flex-1">
            {/* Gift Icon - often used for specific campaigns */}
            <button className="hidden lg:block hover:opacity-60 transition-opacity">
              <Gift size={20} strokeWidth={1.2} />
            </button>
            
            <button className="hidden lg:block hover:opacity-60 transition-opacity">
              <Search size={20} strokeWidth={1.2} />
            </button>
            
            <button className="hidden lg:block hover:opacity-60 transition-opacity">
              <Phone size={20} strokeWidth={1.2} />
            </button>
            
            <button className="hidden lg:block hover:opacity-60 transition-opacity">
              <User size={20} strokeWidth={1.2} />
            </button>
            
            <button className="relative hover:opacity-60 transition-opacity">
              <ShoppingBag size={20} strokeWidth={1.2} />
              {/* Optional Badge placeholder if needed */}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 lg:hidden flex flex-col pt-24 px-[35px]"
          >
             <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 left-8"
            >
              <X size={24} strokeWidth={1} />
            </button>
            
            <nav className="flex flex-col gap-y-6 mt-4">
               {navLinks.map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="text-[20px] font-normal"
                >
                  {link}
                </a>
              ))}
            </nav>

            <div className="mt-auto mb-10 border-t pt-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                 <User size={20} strokeWidth={1.2} />
                 <span className="text-sm">Log in / Register</span>
              </div>
              <div className="flex items-center gap-3">
                 <Phone size={20} strokeWidth={1.2} />
                 <span className="text-sm">Contact Us</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}