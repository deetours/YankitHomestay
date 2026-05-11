'use client';

import { ScrollReveal } from '@/components/scroll-reveal';
import { motion } from 'framer-motion';

export function TrustStripSection() {
  const details = [
    { label: 'Altitude', value: '12,000 ft' },
    { label: 'Max Guests', value: '12' },
    { label: 'Seasons', value: 'May–Oct' },
    { label: 'Meals', value: 'Included' },
    { label: 'Location', value: 'Spiti Valley' },
  ];

  return (
    <section className="py-12 px-6 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {details.map((detail, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div className="text-center">
                <p className="font-serif text-2xl text-primary">{detail.value}</p>
                <p className="caption text-muted-foreground mt-1 uppercase tracking-widest text-xs">{detail.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
