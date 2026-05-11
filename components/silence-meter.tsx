'use client';

import { useAmbientShift } from '@/hooks/use-ambient-shift';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { motion } from 'framer-motion';

export function SilenceMeter() {
  const scrollProgress = useScrollProgress();
  const { colorShift, lightIntensity } = useAmbientShift(scrollProgress);

  // Interpolate colors from day to night
  const getDayColor = (shift: number) => {
    // Day: #faf8f5 → Night: #1a1815
    const dayR = 250,
      dayG = 248,
      dayB = 245;
    const nightR = 26,
      nightG = 24,
      nightB = 21;

    const r = Math.round(dayR + (nightR - dayR) * shift);
    const g = Math.round(dayG + (nightG - dayG) * shift);
    const b = Math.round(dayB + (nightB - dayB) * shift);

    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="fixed bottom-8 left-8 z-40 hidden md:block">
      <div className="flex flex-col gap-3">
        {/* Time indicator */}
        <div className="text-xs font-medium text-muted-foreground">
          {colorShift < 0.5 ? 'Morning' : colorShift < 0.8 ? 'Dusk' : 'Night'}
        </div>

        {/* Visual meter */}
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-[#d4a574] flex items-center justify-center"
          style={{
            backgroundColor: getDayColor(colorShift),
            opacity: lightIntensity,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="text-center">
            <div className="text-2xl font-serif font-semibold">
              {Math.round(lightIntensity * 100)}%
            </div>
            <div className="text-[10px] text-muted-foreground">Light</div>
          </div>
        </motion.div>

        {/* Label */}
        <div className="text-xs text-muted-foreground text-center">Ambient Shift</div>
      </div>
    </div>
  );
}
