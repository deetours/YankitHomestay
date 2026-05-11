'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SCROLL_SECTIONS } from '@/lib/constants';

export function AtmosphereSection() {
  const features = [
    {
      emoji: '🔇',
      title: 'The Silence Philosophy',
      description: 'In a world obsessed with noise, we believe silence is a luxury. Our homestay is designed for meaningful quiet.',
    },
    {
      emoji: '🏔️',
      title: 'Pristine Altitude',
      description: 'At 12,000 feet, the air is thin, the sky is infinite, and the world below feels beautifully distant.',
    },
    {
      emoji: '🌙',
      title: 'Night Skies',
      description: 'Free from light pollution, our nights reveal the Milky Way in breathtaking detail. A cosmic celebration.',
    },
  ];

  return (
    <section
      id={SCROLL_SECTIONS.ATMOSPHERE.id}
      className="py-24 px-6 bg-background relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-16">
          <h2 className="heading-lg text-center text-primary mb-4">The Atmosphere</h2>
          <p className="body-lg text-center text-muted-foreground max-w-3xl mx-auto">
            Yankit isn&apos;t just a place to stay. It&apos;s a sensory reset. Every element—from the monastery bells at dawn
            to the starlit pavilion at night—is curated to guide you inward.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-12 mt-20">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.2}>
              <motion.div className="text-center">
                <div className="text-6xl mb-6">{feature.emoji}</div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="body-base text-muted-foreground">{feature.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-gold to-transparent my-20 origin-center"
        />
      </div>
    </section>
  );
}
