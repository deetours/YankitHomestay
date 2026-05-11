'use client';

import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { motion } from 'framer-motion';

export function AltitudeLine() {
  const progress = useScrollProgress();

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4">
      {/* Altitude indicator */}
      <div className="text-xs font-medium text-muted-foreground text-center w-20">
        {Math.round(12000 - progress * 4000)} ft
      </div>

      {/* Progress line */}
      <div className="w-1 h-64 bg-border rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-[#d4a574] rounded-full"
          style={{ height: `${Math.max(progress * 100, 5)}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Labels */}
      <div className="text-xs text-muted-foreground text-center">
        <div>Peak</div>
        <div className="text-[10px] mt-1">Silence</div>
      </div>
    </div>
  );
}
