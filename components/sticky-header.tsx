'use client';

import { useStickyHeader } from '@/hooks/use-sticky-header';
import { YANKIT_METADATA, SCROLL_SECTIONS } from '@/lib/constants';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function StickyHeader() {
  const isSticky = useStickyHeader();

  const navLinks = [
    { label: 'Origin', href: `#${SCROLL_SECTIONS.ORIGIN.id}` },
    { label: 'Experience', href: `#${SCROLL_SECTIONS.EXPERIENCE.id}` },
    { label: 'Spaces', href: `#${SCROLL_SECTIONS.SPACES.id}` },
    { label: 'Inquire', href: `#${SCROLL_SECTIONS.BOOKING.id}` },
  ];

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: isSticky ? 1 : 0.7 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#hero" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-semibold text-primary">{YANKIT_METADATA.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={`https://wa.me/${YANKIT_METADATA.whatsapp.replace('+', '')}?text=Hello%20Yankit`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          WhatsApp
        </Link>
      </div>
    </motion.header>
  );
}
