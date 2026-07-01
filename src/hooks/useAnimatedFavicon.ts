import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

type FaviconFrame = {
  file: string;
  delay: number;
};

type FaviconManifest = {
  frames: FaviconFrame[];
};

function getFaviconLink() {
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  return link;
}

/**
 * Chrome n'anime pas les GIF favicon nativement.
 * On fait défiler des PNG générés depuis logo.gif (voir public/favicon-frames/).
 */
export function useAnimatedFavicon() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;

    let cancelled = false;
    let timeoutId = 0;
    let frameIndex = 0;
    let frames: FaviconFrame[] = [];

    const link = getFaviconLink();
    const fallbackHref = link.href;

    const tick = () => {
      if (cancelled || frames.length === 0) return;
      const frame = frames[frameIndex % frames.length];
      link.type = 'image/png';
      link.href = frame.file;
      frameIndex += 1;
      timeoutId = window.setTimeout(tick, frame.delay);
    };

    fetch('/favicon-frames/manifest.json')
      .then((response) => response.json())
      .then((manifest: FaviconManifest) => {
        if (cancelled || !manifest.frames?.length) return;
        frames = manifest.frames;
        tick();
      })
      .catch(() => {
        /* garde le favicon statique */
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      link.href = fallbackHref;
    };
  }, [reducedMotion]);
}
