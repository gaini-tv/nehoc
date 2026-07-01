import { useCallback } from 'react';
import { useLenis } from '../context/LenisContext';
import { useReducedMotion } from './useReducedMotion';

const NAVBAR_OFFSET = -120;

export function useScrollTo() {
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();

  const scrollToTop = useCallback(() => {
    if (lenis) {
      lenis.scrollTo(0, {
        immediate: reducedMotion,
        duration: reducedMotion ? 0 : 1.2,
        force: true,
      });
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }, [lenis, reducedMotion]);

  const scrollToElement = useCallback(
    (element: HTMLElement | null, offset = NAVBAR_OFFSET) => {
      if (!element) return;

      if (lenis) {
        lenis.scrollTo(element, {
          offset,
          immediate: reducedMotion,
          duration: reducedMotion ? 0 : 1.2,
          force: true,
        });
        return;
      }

      const top = element.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    },
    [lenis, reducedMotion],
  );

  return { scrollToTop, scrollToElement };
}
