'use client';

import { ScrollReveal } from '@/components/scroll-reveal';
import { SCROLL_SECTIONS } from '@/lib/constants';
import { TESTIMONIALS } from '@/lib/data';
import { TestimonialCard } from '@/components/testimonial-card';

export function ProofSection() {
  return (
    <section id={SCROLL_SECTIONS.PROOF.id} className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-16">
          <p className="caption uppercase tracking-widest text-muted-foreground text-center">Real Voices</p>
          <h2 className="heading-lg text-center text-primary mt-4">Why People Return</h2>
          <p className="body-lg text-center text-muted-foreground max-w-2xl mx-auto mt-6">
            Don&apos;t take our word—listen to the stories from people who&apos;ve experienced the silence.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {TESTIMONIALS.map((testimonial) => (
            <ScrollReveal key={testimonial.id}>
              <TestimonialCard
                name={testimonial.name}
                role={testimonial.role}
                text={testimonial.text}
                image={testimonial.image}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
