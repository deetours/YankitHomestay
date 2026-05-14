'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { YANKIT_METADATA, SCROLL_SECTIONS } from '@/lib/constants';

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isBookingInView, setIsBookingInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling past hero
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const bookingSection = document.getElementById(SCROLL_SECTIONS.BOOKING.id);
    if (!bookingSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBookingInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(bookingSection);
    return () => observer.disconnect();
  }, []);

  const whatsappMessage = encodeURIComponent('Hello, I would like to inquire about availability at Yankit Homestay.');
  const ctaHref = isBookingInView
    ? `https://wa.me/${YANKIT_METADATA.whatsapp.replace('+', '')}?text=${whatsappMessage}`
    : `#${SCROLL_SECTIONS.BOOKING.id}`;
  const ctaLabel = isBookingInView ? 'Confirm on WhatsApp' : 'Reserve your dates';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
        >
          <div className="bg-background/90 backdrop-blur-md border border-border p-3 rounded-2xl shadow-2xl flex items-center justify-between gap-4">
            <div className="pl-2 flex-shrink-1 min-w-0">
              <p className="font-serif text-sm font-semibold truncate">Reserve your stay</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground truncate">12,000 ft</p>
            </div>
            
            <a
              href={ctaHref}
              target={isBookingInView ? '_blank' : undefined}
              rel={isBookingInView ? 'noopener noreferrer' : undefined}
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap active:scale-95 transition-transform"
            >
              {ctaLabel}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
