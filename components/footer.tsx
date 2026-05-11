'use client';

import Link from 'next/link';
import { YANKIT_METADATA } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-semibold text-primary mb-4">{YANKIT_METADATA.name}</h3>
            <p className="body-base text-background/70">{YANKIT_METADATA.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-background mb-4">Explore</h4>
            <ul className="space-y-2">
              {['Spaces', 'Rituals', 'FAQs'].map((link) => (
                <li key={link}>
                  <Link
                    href={`#${link.toLowerCase()}`}
                    className="body-base text-background/70 hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-medium text-background mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`https://instagram.com/${YANKIT_METADATA.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-base text-background/70 hover:text-primary transition-colors"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href={`https://wa.me/${YANKIT_METADATA.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-base text-background/70 hover:text-primary transition-colors"
                >
                  WhatsApp
                </Link>
              </li>
              <li>
                <Link href={`mailto:${YANKIT_METADATA.email}`} className="body-base text-background/70 hover:text-primary transition-colors">
                  Email
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-background/20 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="caption text-background/70">
            © {currentYear} Yankit Homestay. Silence curated with love.
          </p>
        </div>
      </div>
    </footer>
  );
}
