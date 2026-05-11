'use client';

import { useEffect, useRef } from 'react';
import { SCROLL_SECTIONS } from '@/lib/constants';
import { SPACES } from '@/lib/data';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SpacesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    rowsRef.current.forEach((row) => {
      if (!row) return;
      const imgContainer = row.querySelector('.img-container');
      const img = row.querySelector('img');
      const textContent = row.querySelector('.text-content');

      // Image reveal scale
      gsap.fromTo(img, 
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
          }
        }
      );

      // Text fade up
      gsap.fromTo(textContent,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
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
    <section ref={containerRef} id={SCROLL_SECTIONS.SPACES.id} className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-32">
          <p className="caption uppercase tracking-widest text-muted-foreground text-center">Where You&apos;ll Stay</p>
          <h2 className="heading-lg text-center text-primary mt-4">Sacred Spaces</h2>
          <p className="body-lg text-center text-muted-foreground max-w-2xl mx-auto mt-6">
            Each area is designed for connection—with yourself and with others.
          </p>
        </div>

        <div className="space-y-40">
          {SPACES.map((space, index) => (
            <div
              key={space.id}
              ref={el => { rowsRef.current[index] = el; }}
              className={`flex flex-col md:flex-row gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="img-container w-full md:w-1/2 relative h-[600px] overflow-hidden rounded-lg shadow-sm">
                <Image 
                  src={space.image} 
                  alt={space.name} 
                  fill 
                  className="object-cover" 
                />
              </div>

              <div className="text-content w-full md:w-1/2 md:px-8">
                <h3 className="font-serif text-4xl font-semibold text-primary mb-6">{space.name}</h3>
                <p className="body-lg text-foreground mb-10">{space.description}</p>

                <div>
                  <p className="caption uppercase tracking-widest text-muted-foreground mb-6">Features</p>
                  <ul className="space-y-4">
                    {space.features.map((feature, i) => (
                      <li key={i} className="flex gap-4 items-center">
                        <span className="w-px h-4 bg-muted-foreground" />
                        <span className="body-base text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
