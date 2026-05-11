'use client';

import { ScrollReveal } from '@/components/scroll-reveal';
import { FAQAccordion } from '@/components/faq-accordion';
import { SCROLL_SECTIONS } from '@/lib/constants';
import { FAQS } from '@/lib/data';

export function ClaritySection() {
  return (
    <section id={SCROLL_SECTIONS.CLARITY.id} className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="mb-16">
          <p className="caption uppercase tracking-widest text-muted-foreground text-center">
            Common Questions
          </p>
          <h2 className="heading-lg text-center text-primary mt-4">Clarity</h2>
          <p className="body-lg text-center text-muted-foreground max-w-2xl mx-auto mt-6">
            Everything you need to know before your visit.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-16">
          <FAQAccordion items={FAQS} />
        </ScrollReveal>
      </div>
    </section>
  );
}
