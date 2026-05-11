import { useEffect, useState } from 'react';

interface AmbientShift {
  isDaylight: boolean;
  colorShift: number; // 0-1, represents transition from day to night
  lightIntensity: number; // 0-1
}

export function useAmbientShift(scrollProgress: number): AmbientShift {
  const [ambientShift, setAmbientShift] = useState<AmbientShift>({
    isDaylight: true,
    colorShift: 0,
    lightIntensity: 1,
  });

  useEffect(() => {
    // At scrollProgress 0.4, start transitioning to night
    // By scrollProgress 0.65, fully night
    const transitionStart = 0.4;
    const transitionEnd = 0.65;

    let colorShift = 0;
    let lightIntensity = 1;
    let isDaylight = true;

    if (scrollProgress >= transitionStart && scrollProgress <= transitionEnd) {
      colorShift = (scrollProgress - transitionStart) / (transitionEnd - transitionStart);
      lightIntensity = 1 - colorShift * 0.7;
      isDaylight = colorShift < 0.5;
    } else if (scrollProgress > transitionEnd) {
      colorShift = 1;
      lightIntensity = 0.3;
      isDaylight = false;
    }

    setAmbientShift({ isDaylight, colorShift, lightIntensity });
  }, [scrollProgress]);

  return ambientShift;
}
