'use client';

import { ScrollReveal } from '@/components/scroll-reveal';
import { SCROLL_SECTIONS } from '@/lib/constants';

export function OriginSection() {
  return (
    <section
      id={SCROLL_SECTIONS.ORIGIN.id}
      className="py-24 px-6 bg-[#f5f1eb] relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="mb-12">
          <p className="caption uppercase tracking-widest text-muted-foreground text-center">Our Story</p>
          <h2 className="heading-lg text-center text-primary mt-4">The Yankit Story</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          <ScrollReveal delay={0.1}>
            <div className="bg-background rounded-lg p-8 border border-border">
              <p className="body-lg text-foreground mb-6">
                In 2019, we fell in love with Spiti Valley. Not the Instagram version—the real one. The silence
                between the monastery bells. The stars you could count. The humans who still remember how to slow down.
              </p>
              <p className="body-lg text-foreground">
                We built Yankit as a love letter to that place. Every corner reflects our belief: that luxury
                isn&apos;t about more—it&apos;s about better. Better silence. Better company. Better memories.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="md:col-start-2">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-primary mb-3">Why We're Different</h3>
                <ul className="space-y-4">
                  {[
                    'Limited to 12 guests per session—intimacy, not crowds',
                    'No Wi-Fi in rooms—intentional digital detox',
                    'All meals sourced locally—support for village economies',
                    'Guided experiences—not tourist traps',
                    'Your story matters—we listen.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-[#d4a574]">✓</span>
                      <span className="body-base text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
