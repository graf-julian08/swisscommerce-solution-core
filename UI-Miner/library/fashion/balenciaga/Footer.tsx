import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function BalenciagaFooter() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    // Only toggle on mobile (simulated by width check or just click handler logic)
    if (window.innerWidth < 1024) {
      setOpenSection(openSection === title ? null : title);
    }
  };

  const footerSections = [
    {
      title: 'NEWSLETTER',
      type: 'newsletter',
      content: [{ label: 'Subscribe to our newsletter', url: '#', underline: true }],
    },
    {
      title: 'CLIENT SERVICES',
      type: 'links',
      content: [
        { label: 'FAQ', url: '#' },
        { label: 'Track Order', url: '#' },
        { label: 'Exchanges and returns', url: '#' },
        { label: 'Delivery', url: '#' },
        { label: 'Payment', url: '#' },
      ],
    },
    {
      title: 'THE COMPANY',
      type: 'links',
      content: [
        { label: 'Careers', url: '#' },
        { label: 'Careers - Design', url: '#' },
        { label: 'Legal', url: '#' },
        { label: 'Privacy Policy', url: '#' },
        { label: 'Cookie Policy', url: '#' },
        { label: 'Cookies Settings', url: '#' },
        { label: 'World Food Progamme', url: '#' },
      ],
    },
    {
      title: 'FOLLOW US',
      type: 'links',
      content: [
        { label: 'Facebook', url: '#' },
        { label: 'Instagram', url: '#' },
        { label: 'Tiktok', url: '#' },
        { label: 'Pinterest', url: '#' },
        { label: 'Linkedin', url: '#' },
      ],
    },
    {
      title: 'BOUTIQUES',
      type: 'links',
      content: [
        { label: 'Find a store nearby', url: '#' },
        { label: 'Country / Region: Switzerland', url: '#' },
        { label: 'Language: English', url: '#' },
      ],
    },
    {
      title: 'CONTACT US',
      type: 'links',
      content: [{ label: 'EMAIL US', url: '#', underline: true }],
    },
  ];

  return (
    <footer className="w-full bg-[rgb(170,170,172)] text-black font-[BB-Regular,Helvetica,Arial,sans-serif] text-[11px] antialiased border-t border-black">
      {/* Desktop/Tablet Grid Layout */}
      <div className="flex flex-col lg:flex-row w-full border-b border-black lg:h-auto">
        {footerSections.map((section, index) => (
          <div
            key={section.title}
            className={`
              flex-1 flex flex-col
              border-b lg:border-b-0 border-black lg:border-r last:lg:border-r-0
              ${index === 0 ? 'lg:border-l-0' : ''}
            `}
          >
            {/* Header / Trigger */}
            <div
              onClick={() => toggleSection(section.title)}
              className="p-4 lg:p-6 lg:pb-4 cursor-pointer lg:cursor-default flex justify-between items-center group select-none"
            >
              <h3 className="uppercase tracking-widest font-normal text-[11px] lg:mb-4">
                {section.title}
              </h3>
              <span className="lg:hidden transition-transform duration-300">
                <ChevronDown
                  size={14}
                  className={`transform ${openSection === section.title ? 'rotate-180' : 'rotate-0'}`}
                />
              </span>
            </div>

            {/* Content - Mobile Accordion / Desktop Static */}
            <div className="hidden lg:block px-6 pb-12 h-full">
              <ul className="flex flex-col gap-y-[6px]">
                {section.content.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.url}
                      className={`
                        block leading-4 hover:opacity-60 transition-opacity
                        ${item.underline ? 'underline underline-offset-4 decoration-1' : ''}
                      `}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Animated Content */}
            <AnimatePresence initial={false}>
              {openSection === section.title && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  className="lg:hidden overflow-hidden bg-[rgb(170,170,172)]"
                >
                  <ul className="flex flex-col px-4 pb-6 gap-y-3">
                    {section.content.map((item, i) => (
                      <li key={i}>
                        <a
                          href={item.url}
                          className={`
                            block leading-4
                            ${item.underline ? 'underline underline-offset-4 decoration-1' : ''}
                          `}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Bottom Copyright */}
      <div className="w-full py-6 text-center">
        <span className="text-[10px] uppercase tracking-wide">
          © 2025 Balenciaga
        </span>
      </div>
    </footer>
  );
}