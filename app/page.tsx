'use client';

import { FloatingSilenceHero } from '@/components/hero/FloatingSilenceHero';
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
      <FloatingSilenceHero />
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
