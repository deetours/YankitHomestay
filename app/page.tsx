'use client';

import { StickyHeader } from '@/components/sticky-header';
import { HeroSection } from '@/components/sections/hero';
import { TrustStripSection } from '@/components/sections/trust-strip';
import { SpacesSection } from '@/components/sections/spaces';
import { RitualsSection } from '@/components/sections/rituals';
import { WarmthSection } from '@/components/sections/warmth';
import { ClaritySection } from '@/components/sections/clarity';
import { OriginSection } from '@/components/sections/origin';
import { ProofSection } from '@/components/sections/proof';
import { BookingSection } from '@/components/sections/booking';
import { Footer } from '@/components/footer';
import { StickyCTA } from '@/components/sticky-cta';

export default function Home() {
  return (
    <main className="w-full">
      <StickyHeader />
      
      <HeroSection />
      <TrustStripSection />
      <SpacesSection />
      <RitualsSection />
      <WarmthSection />
      <OriginSection />
      <ProofSection />
      <ClaritySection />
      <BookingSection />

      <Footer />
      <StickyCTA />
    </main>
  );
}
