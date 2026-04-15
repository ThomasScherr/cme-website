import { useEffect, useState } from 'react';

/**
 * Hook that detects if the user is on a mobile device or prefers reduced motion.
 * Returns animation-safe defaults that prevent flickering on mobile.
 *
 * On mobile: animations use minimal movement (y: 6 instead of 20) and faster durations.
 * If prefers-reduced-motion is set: animations are completely disabled.
 */
export function useReducedMotion() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    // Check mobile via viewport width
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Check prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mq.removeEventListener('change', handler);
    };
  }, []);

  return { isMobile, prefersReduced };
}

/**
 * Returns framer-motion animation props that are optimized for the device.
 * On mobile: smaller y-offset, faster duration, larger viewport margin.
 * With prefers-reduced-motion: no animation at all.
 */
export function useFadeInProps(options?: {
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
}) {
  const { isMobile, prefersReduced } = useReducedMotion();

  const y = options?.y ?? 20;
  const x = options?.x ?? 0;
  const delay = options?.delay ?? 0;
  const duration = options?.duration ?? 0.5;

  if (prefersReduced) {
    return {
      initial: undefined,
      whileInView: undefined,
      viewport: undefined,
      transition: undefined,
    };
  }

  if (isMobile) {
    return {
      initial: { opacity: 0, y: Math.min(y, 8), x: x ? Math.sign(x) * 8 : 0 },
      whileInView: { opacity: 1, y: 0, x: 0 },
      viewport: { once: true, margin: '50px' as const },
      transition: { delay: Math.min(delay, 0.05), duration: Math.min(duration, 0.3) },
    };
  }

  return {
    initial: { opacity: 0, y, x },
    whileInView: { opacity: 1, y: 0, x: 0 },
    viewport: { once: true, margin: '-40px' as const },
    transition: { delay, duration },
  };
}
