'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SCROLL_SECTIONS } from '@/lib/constants';
import { EXPERIENCE_HIGHLIGHTS } from '@/lib/data';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { useAmbientShift } from '@/hooks/use-ambient-shift';

export function ExperienceSection() {
  const scrollProgress = useScrollProgress();
  const { colorShift } = useAmbientShift(scrollProgress);

  // Calculate color interpolation for background
  const getBackgroundColor = () => {
    if (colorShift < 0.3) return '#faf8f5'; // Day cream
    if (colorShift < 0.7) {
      const t = (colorShift - 0.3) / 0.4;
      const r = Math.round(250 + (255 - 250) * t);
      const g = Math.round(248 + (140 - 248) * t);
      const b = Math.round(245 + (30 - 245) * t);
      return `rgb(${r}, ${g}, ${b})`;
    }
    return '#2d3142'; // Night indigo
  };

  return (
    <section
      id={SCROLL_SECTIONS.EXPERIENCE.id}
      className="py-24 px-6 relative overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-16">
          <p className="caption uppercase tracking-widest text-muted-foreground text-center">
            What You&apos;ll Experience
          </p>
          <h2 className="heading-lg text-center text-primary mt-4">
            {colorShift < 0.5 ? 'Morning Awakening' : 'Night Transformation'}
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          {EXPERIENCE_HIGHLIGHTS.map((highlight, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <motion.div
                className="bg-card rounded-lg p-8 border border-border hover:border-[#d4a574] transition-colors"
                whileHover={{ y: -4 }}
              >
                <div className="text-5xl mb-6">{highlight.icon}</div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">{highlight.title}</h3>
                <p className="body-base text-muted-foreground">{highlight.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Color transition indicator */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="caption text-xs uppercase tracking-widest">
            Scroll to watch the day transition to night ↓
          </p>
        </motion.div>
      </div>
    </section>
  );
}
