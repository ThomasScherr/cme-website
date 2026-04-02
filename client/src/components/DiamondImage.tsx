// CME Website – DiamondImage Component
// Reads global cornerRadius from CSS variable --cme-diamond-radius if not explicitly passed.
// Uses SVG clipPath with objectBoundingBox for pixel-perfect diamond clipping.

import { motion } from 'framer-motion';
import { useId, useState, useEffect } from 'react';

interface DiamondImageProps {
  src: string;
  alt: string;
  /** CSS length for the width (height = width, always square) */
  size?: string;
  /** Corner radius as fraction of 50 (half-side). If omitted, reads from --cme-diamond-radius */
  cornerRadius?: number;
  animate?: boolean;
  delay?: number;
  overlayColor?: string;
  style?: React.CSSProperties;
  /** Extra rotation added on top of the base 45deg diamond rotation */
  extraRotate?: string;
}

/** Read the global diamond radius from :root CSS variable */
function getGlobalRadius(): number {
  const val = getComputedStyle(document.documentElement).getPropertyValue('--cme-diamond-radius').trim();
  const num = parseFloat(val);
  return isNaN(num) ? 0.036 : num;
}

export default function DiamondImage({
  src,
  alt,
  size = 'clamp(260px, 32vw, 560px)',
  cornerRadius,
  animate = true,
  delay = 0,
  overlayColor,
  style,
  extraRotate,
}: DiamondImageProps) {
  const uid = useId().replace(/:/g, '');
  const clipId = `dc-${uid}`;

  // If no explicit cornerRadius, read from CSS variable and listen for changes
  const [globalRadius, setGlobalRadius] = useState(getGlobalRadius);

  useEffect(() => {
    if (cornerRadius !== undefined) return; // explicit prop, no need to watch

    // Poll for changes every 200ms (MutationObserver on style attributes is unreliable)
    const interval = setInterval(() => {
      const current = getGlobalRadius();
      setGlobalRadius(prev => prev !== current ? current : prev);
    }, 200);

    return () => clearInterval(interval);
  }, [cornerRadius]);

  const effectiveRadius = cornerRadius !== undefined ? cornerRadius : globalRadius;

  // Build path in a 100×100 coordinate system.
  const r = effectiveRadius * 50;

  const d = [
    `M ${50 - r},${r}`,
    `Q 50,0 ${50 + r},${r}`,
    `L ${100 - r},${50 - r}`,
    `Q 100,50 ${100 - r},${50 + r}`,
    `L ${50 + r},${100 - r}`,
    `Q 50,100 ${50 - r},${100 - r}`,
    `L ${r},${50 + r}`,
    `Q 0,50 ${r},${50 - r}`,
    'Z',
  ].join(' ');

  const inner = (
    <div
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        position: 'relative',
        ...(extraRotate ? { transform: `rotate(${extraRotate})` } : {}),
        ...style,
      }}
    >
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute', overflow: 'hidden' }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={d} transform="scale(0.01)" />
          </clipPath>
        </defs>
      </svg>

      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
        }}
      />

      {overlayColor && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: overlayColor,
            clipPath: `url(#${clipId})`,
            WebkitClipPath: `url(#${clipId})`,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );

  if (!animate) return inner;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {inner}
    </motion.div>
  );
}
