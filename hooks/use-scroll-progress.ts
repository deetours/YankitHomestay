import { useEffect, useState } from 'react';

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = documentHeight > 0 ? scrolled / documentHeight : 0;
      setScrollProgress(Math.min(progress, 1));
    };

    // Throttle scroll events
    let ticking = false;
    const wrappedHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
      ticking = false;
    };

    window.addEventListener('scroll', wrappedHandler, { passive: true });
    return () => window.removeEventListener('scroll', wrappedHandler);
  }, []);

  return scrollProgress;
}
