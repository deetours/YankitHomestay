'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/scroll-reveal';
import { MagneticButton } from '@/components/magnetic-button';
import { YANKIT_METADATA, SCROLL_SECTIONS } from '@/lib/constants';
import Link from 'next/link';

export function BookingSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    arrivalDate: '',
    duration: '3',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // WhatsApp message
    const text = `Hello! I'm interested in booking Yankit Homestay.\n\nName: ${formData.name}\nEmail: ${formData.email}\nArrival: ${formData.arrivalDate}\nDuration: ${formData.duration} nights\n\nMessage: ${formData.message}`;

    const whatsappURL = `https://wa.me/${YANKIT_METADATA.whatsapp.replace('+', '')}?text=${encodeURIComponent(text)}`;
    window.open(whatsappURL, '_blank');

    // Reset form
    setFormData({ name: '', email: '', arrivalDate: '', duration: '3', message: '' });
  };

  return (
    <section id={SCROLL_SECTIONS.BOOKING.id} className="py-24 px-6 bg-[#f5f1eb] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal className="mb-16">
          <p className="caption uppercase tracking-widest text-muted-foreground text-center">Begin Your Silence</p>
          <h2 className="heading-lg text-center text-primary mt-4">Ready to Visit?</h2>
          <p className="body-lg text-center text-muted-foreground max-w-2xl mx-auto mt-6">
            Tell us about yourself and your silence. We&apos;ll craft the perfect Yankit experience for you.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-16">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-background rounded-lg p-8 md:p-12 border border-border space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block font-medium text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-[#f5f1eb] text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                  placeholder="First & Last"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-[#f5f1eb] text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="arrivalDate" className="block font-medium text-foreground mb-2">
                  Preferred Arrival
                </label>
                <input
                  type="date"
                  id="arrivalDate"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-[#f5f1eb] text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                />
              </div>

              <div>
                <label htmlFor="duration" className="block font-medium text-foreground mb-2">
                  Duration (nights)
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-[#f5f1eb] text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                >
                  <option value="2">2 nights</option>
                  <option value="3">3 nights</option>
                  <option value="5">5 nights</option>
                  <option value="7">7 nights</option>
                  <option value="14">2 weeks</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block font-medium text-foreground mb-2">
                Tell Us About Your Silence
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-border bg-[#f5f1eb] text-foreground focus:outline-none focus:ring-2 focus:ring-gold transition-all resize-none"
                placeholder="What brings you here? What do you seek in silence?"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <MagneticButton className="w-full h-full">
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium shadow-md hover:shadow-lg transition-shadow"
                  >
                    Send via WhatsApp
                  </button>
                </MagneticButton>
              </div>
              <div className="flex-1">
                <MagneticButton className="w-full h-full">
                  <Link
                    href={`mailto:${YANKIT_METADATA.email}`}
                    className="block w-full px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-full font-medium hover:bg-primary/5 transition-colors text-center"
                  >
                    Email Instead
                  </Link>
                </MagneticButton>
              </div>
            </div>

            <p className="caption text-center text-muted-foreground">
              We&apos;ll respond within 24 hours. Usually much faster.
            </p>
          </motion.form>
        </ScrollReveal>

        {/* Contact info */}
        <ScrollReveal className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="caption uppercase text-muted-foreground mb-2">WhatsApp</p>
            <Link
              href={`https://wa.me/${YANKIT_METADATA.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-lg text-primary hover:text-primary/80 transition-colors"
            >
              {YANKIT_METADATA.whatsapp}
            </Link>
          </div>
          <div>
            <p className="caption uppercase text-muted-foreground mb-2">Email</p>
            <Link
              href={`mailto:${YANKIT_METADATA.email}`}
              className="font-serif text-lg text-primary hover:text-primary/80 transition-colors"
            >
              {YANKIT_METADATA.email}
            </Link>
          </div>
          <div>
            <p className="caption uppercase text-muted-foreground mb-2">Location</p>
            <p className="font-serif text-lg text-foreground">{YANKIT_METADATA.location}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
