import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottegaVenetaFooter() {
  const [email, setEmail] = useState('');

  // Link data structure for easy mapping and maintenance
  const footerLinks = [
    {
      title: 'NEED HELP?',
      items: [
        { label: 'Customer care', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'My order', href: '#' },
        { label: 'Returns & exchanges', href: '#' },
      ],
    },
    {
      title: 'BOTTEGA FOR YOU',
      items: [
        { label: 'Bespoke services', href: '#' },
        { label: 'Make an appointment', href: '#' },
        { label: 'Certificate of Craft', href: '#' },
      ],
    },
    {
      title: 'INSIDE BOTTEGA',
      items: [
        { label: 'Sustainability', href: '#' },
        { label: 'Careers', href: '#' },
      ],
      extra: {
        title: 'CONNECT',
        items: [{ label: 'Youtube', href: '#' }],
      },
    },
    {
      title: 'LEGAL AND COOKIES',
      items: [
        { label: 'Terms', href: '#' },
        { label: 'Privacy', href: '#' },
        { label: 'Cookie policy', href: '#' },
        { label: 'Cookie settings', href: '#' },
      ],
    },
  ];

  return (
    <footer className="w-full bg-white text-black font-sans text-[12px] md:text-[14px] leading-normal antialiased">
      {/* Top Divider */}
      <div className="w-full h-[1px] bg-black" />

      {/* Top Section: Store Locator & Newsletter */}
      <div className="mx-[20px] md:mx-[35px] py-10 md:py-14 grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12">
        {/* Store Locator */}
        <div className="max-w-md">
          <h3 className="uppercase tracking-widest text-[11px] mb-4 font-bold">Store Locator</h3>
          <p className="mb-6 leading-relaxed text-[#1a1a1a]">
            Find your nearest Bottega Veneta store to discover our latest collections and exclusive items.
          </p>
          <a
            href="#"
            className="inline-block border-b border-black pb-[1px] hover:text-gray-600 hover:border-gray-600 transition-colors duration-300"
          >
            Find store
          </a>
        </div>

        {/* Newsletter */}
        <div className="max-w-md">
          <h3 className="uppercase tracking-widest text-[11px] mb-4 font-bold">Subscribe to our newsletter</h3>
          <p className="mb-8 leading-relaxed text-[#1a1a1a]">
            Subscribe to the Bottega Veneta newsletter for information on collections, shows and other exclusive updates.
          </p>
          <form className="relative w-full" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="E-mail*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-black bg-transparent py-2 pr-8 text-black placeholder:text-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-black hover:opacity-70 transition-opacity"
              aria-label="Subscribe"
            >
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </form>
        </div>
      </div>

      {/* Middle Divider */}
      <div className="w-full h-[1px] bg-black" />

      {/* Links Section */}
      <div className="mx-[20px] md:mx-[35px] py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-4">
          {footerLinks.map((column, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="uppercase tracking-widest text-[11px] mb-6 font-bold">{column.title}</h3>
              <ul className="space-y-3">
                {column.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a href={item.href} className="hover:opacity-70 transition-opacity block">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Extra sub-section for 'Inside Bottega' column */}
              {column.extra && (
                <div className="mt-8">
                  <h3 className="uppercase tracking-widest text-[11px] mb-6 font-bold">{column.extra.title}</h3>
                  <ul className="space-y-3">
                    {column.extra.items.map((item, extraIdx) => (
                      <li key={extraIdx}>
                        <a href={item.href} className="hover:opacity-70 transition-opacity block">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="w-full h-[1px] bg-black" />

      {/* Settings Section (Shipping/Language) */}
      <div className="mx-[20px] md:mx-[35px] py-8 flex flex-col md:flex-row justify-center items-center gap-4 text-[12px] md:text-[13px]">
        <div className="flex items-center gap-1">
          <span>Shipping to:</span>
          <button className="border-b border-black pb-[1px] hover:opacity-70 transition-opacity">
            Switzerland
          </button>
        </div>
        <div className="hidden md:block w-[1px] h-3 bg-black/30 mx-2"></div>
        <div className="flex items-center gap-1">
          <span>Language:</span>
          <button className="border-b border-black pb-[1px] hover:opacity-70 transition-opacity">
            English
          </button>
        </div>
      </div>

      {/* Footer Bottom Divider */}
      <div className="w-full h-[1px] bg-gray-200" />

      {/* Copyright */}
      <div className="mx-[20px] md:mx-[35px] py-6">
        <p className="text-[10px] text-gray-400">
          © 2025 Bottega Veneta
        </p>
      </div>
    </footer>
  );
}