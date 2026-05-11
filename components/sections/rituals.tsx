'use client';

import { useEffect, useRef } from 'react';
import { SCROLL_SECTIONS } from '@/lib/constants';
import { RITUALS } from '@/lib/data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function RitualsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    // Draw the vertical line as user scrolls down the section
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      animation: gsap.fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top' }),
      scrub: true,
    });

    // Reveal each item sequentially
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      gsap.fromTo(item,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id={SCROLL_SECTIONS.RITUALS.id} className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="mb-24">
          <p className="caption uppercase tracking-widest text-muted-foreground text-center">Daily Rhythm</p>
          <h2 className="heading-lg text-center text-primary mt-4">A Day at Yankit</h2>
          <p className="body-lg text-center text-muted-foreground max-w-2xl mx-auto mt-6">
            We follow the rhythm of nature. Here&apos;s how a typical day unfolds.
          </p>
        </div>

        <div className="relative pl-8 md:pl-0">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 overflow-hidden">
            <div ref={lineRef} className="w-full h-full bg-primary" />
          </div>

          <div className="space-y-16">
            {RITUALS.map((ritual, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  ref={el => { itemsRef.current[index] = el; }}
                  className={`flex flex-col md:flex-row relative items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                    <h3 className="font-serif text-2xl font-semibold text-primary mb-2">{ritual.time} — {ritual.name}</h3>
                    <p className="body-base text-muted-foreground">{ritual.description}</p>
                  </div>
                  {/* Node */}
                  <div className="absolute left-[-36px] md:left-1/2 top-1 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-1/2 z-10 md:top-auto" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-32 max-w-2xl mx-auto">
          <div className="bg-cream border border-border rounded-lg p-8 text-center">
            <p className="body-base text-foreground">
              <span className="font-medium font-serif">Note:</span> Rituals are optional. Want to skip meditation for a solo walk? Want to sleep in? We&apos;re flexible. This is your silence, your pace.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
