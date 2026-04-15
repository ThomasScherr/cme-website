import { motion, type Variants } from 'framer-motion';
import { type ReactNode, useEffect, useState } from 'react';

/**
 * FadeIn – a drop-in wrapper that replaces raw framer-motion whileInView usage.
 *
 * On mobile (< 768px): uses very subtle animation (y: 6px, 0.25s) to prevent
 * the "flickering" effect when scrolling fast on small viewports.
 *
 * On desktop: uses the standard animation (y: 16px, 0.45s).
 *
 * Respects prefers-reduced-motion: disables animation entirely.
 */

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Delay in seconds */
  delay?: number;
  /** Direction of entry: 'up' | 'down' | 'left' | 'right' */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Custom duration in seconds */
  duration?: number;
  /** Viewport margin for trigger (CSS margin string) */
  margin?: string;
}

const directionMap = {
  up: { y: 16, x: 0 },
  down: { y: -16, x: 0 },
  left: { x: 20, y: 0 },
  right: { x: -20, y: 0 },
};

const mobileDirectionMap = {
  up: { y: 6, x: 0 },
  down: { y: -6, x: 0 },
  left: { x: 8, y: 0 },
  right: { x: -8, y: 0 },
};

export default function FadeIn({
  children,
  className,
  style,
  delay = 0,
  direction = 'up',
  duration,
  margin,
}: FadeInProps) {
  const isMobile = useIsMobile();

  // Check prefers-reduced-motion
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const offset = isMobile ? mobileDirectionMap[direction] : directionMap[direction];
  const dur = duration ?? (isMobile ? 0.25 : 0.45);
  const del = isMobile ? Math.min(delay, 0.05) : delay;
  const vpMargin = margin ?? (isMobile ? '80px' : '-40px');

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: vpMargin as any }}
      transition={{ delay: del, duration: dur, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
