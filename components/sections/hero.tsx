'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { YANKIT_METADATA, SCROLL_SECTIONS } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !headlineRef.current) return;

    // We wrap SplitType in a try-catch just in case it fails in this environment
    let text: SplitType | null = null;
    try {
      text = new SplitType(headlineRef.current, { types: 'lines,words' });
    } catch (e) {
      console.error("SplitType failed", e);
    }
    
    // Initial Load Animation
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    // Animate background image scale and opacity
    if (bgRef.current) {
      gsap.fromTo(bgRef.current, 
        { scale: 1.06, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power3.out' }
      );
    }

    // Reveal text word by word if SplitType worked
    if (text && text.words) {
      tl.fromTo(text.words,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.05, delay: 0.5 }
      );
    } else if (headlineRef.current) {
      // Fallback if SplitType failed
      tl.fromTo(headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.5 }
      );
    }

    tl.fromTo(contentRef.current?.children || [],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
      "-=0.6"
    );

    // Parallax on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      animation: gsap.to(bgRef.current,
        { y: "20%", scale: 1.1, ease: 'none' }
      )
    });

    return () => {
      if (text) text.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const whatsappMessage = encodeURIComponent('Hello, I would like to inquire about availability at Yankit Homestay.');

  return (
    <section
      ref={containerRef}
      id={SCROLL_SECTIONS.HERO.id}
      className="min-h-[100svh] flex flex-col items-center justify-center relative overflow-hidden bg-yankit-ink"
    >
      {/* Background Image Layer */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 w-full h-full z-0"
      >
        <Image
          src="/images/dining.webp"
          alt="Yankit Homestay Dining"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Content Layer */}
      <div className="max-w-4xl mx-auto text-center z-20 px-6 pt-20">
        <p className="caption uppercase tracking-widest text-white/80 mb-6">
          {YANKIT_METADATA.name}
        </p>

        <h1 
          ref={headlineRef}
          className="heading-xl mb-6 text-white drop-shadow-sm"
        >
          A quiet homestay at 12,000 feet in Spiti
        </h1>

        <div ref={contentRef}>
          <p className="body-lg text-white/90 max-w-2xl mx-auto mb-12 drop-shadow-sm">
            Stay with a small circle of guests, wake to monastery bells, eat locally, and spend your nights under one of India&apos;s clearest skies.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.985 }}
              href={`https://wa.me/${YANKIT_METADATA.whatsapp.replace('+', '')}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-foreground rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              Check availability on WhatsApp
            </motion.a>
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.985 }}>
              <Link
                href={`#${SCROLL_SECTIONS.SPACES.id}`}
                className="px-8 py-4 bg-transparent border border-white/50 text-white rounded-full font-medium hover:bg-white/10 transition-colors block"
              >
                See rooms and rhythm
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
