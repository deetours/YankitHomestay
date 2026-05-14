'use client';

import { ScrollReveal } from '@/components/scroll-reveal';
import { SCROLL_SECTIONS } from '@/lib/constants';
import { motion } from 'framer-motion';

export function WarmthSection() {
  const details = [
    { label: 'Max Guests', value: '12' },
    { label: 'Altitude', value: '12,000 ft' },
    { label: 'Seasons', value: 'May–Oct' },
    { label: 'WiFi', value: 'None (by design)' },
  ];

  return (
    <section id={SCROLL_SECTIONS.WARMTH.id} className="py-24 px-6 bg-[#f5f1eb]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-16">
          <p className="caption uppercase tracking-widest text-muted-foreground text-center">The Details</p>
          <h2 className="heading-lg text-center text-primary mt-4">Warmth & Hospitality</h2>
        </ScrollReveal>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-16">
          {details.map((detail, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div className="bg-background rounded-lg p-6 border border-border text-center">
                <p className="heading-md text-primary">{detail.value}</p>
                <p className="caption text-muted-foreground mt-2">{detail.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Services */}
        <ScrollReveal className="mt-16">
          <div className="bg-background rounded-lg p-12 border border-border">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-8">What&apos;s Included</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                ['Accommodation', 'Private rooms and family-friendly shared spaces'],
                ['Meals', 'Farm-to-table, locally sourced'],
                ['Meditation & Yoga', 'Morning and evening sessions'],
                ['Guided Walks', 'Explore Spiti at your own pace'],
                ['Monastery Visits', 'With cultural sensitivity'],
                ['Stargazing', 'Evening sessions with guidance'],
                ['Reading Corner', 'Curated books on silence, mountains, and local life'],
                ['Community Dinners', 'Evening conversations & stories'],
              ].map((service, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 bg-[#d4a574] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">{service[0]}</p>
                    <p className="text-sm text-muted-foreground">{service[1]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
