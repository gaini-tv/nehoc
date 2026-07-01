import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { LenisContext } from '../context/LenisContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = instance;
    setLenis(instance);

    function raf(time: number) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
