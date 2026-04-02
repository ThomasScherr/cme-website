// CME Website – DiamondImage Component
// Design: Techno-Industrial Precision
//
// TECHNIQUE:
// 1. The outer wrapper is ALWAYS a 1:1 square (aspect-ratio: 1).
//    This is critical – objectBoundingBox clipPath distorts on non-square elements.
// 2. The SVG clipPath uses a clean rounded-diamond path in a 100x100 viewBox,
//    scaled to 0..1 via objectBoundingBox.
// 3. The image fills the square 100% with object-fit: cover.
//
// The rounded diamond path:
//   4 corner points: top(50,0), right(100,50), bottom(50,100), left(0,50)
//   Each corner is rounded by pulling back `r` units and drawing a quadratic arc.
//   Using quadratic bezier (Q) keeps the shape symmetric and clean.

import { motion } from 'framer-motion';
import { useId } from 'react';

interface DiamondImageProps {
  src: string;
  alt: string;
  /** CSS length for the width (height = width, always square) */
  size?: string;
  /** Corner radius as fraction of 50 (half-side). 0=sharp, 0.18=CME style */
  cornerRadius?: number;
  animate?: boolean;
  delay?: number;
  overlayColor?: string;
  style?: React.CSSProperties;
  /** Extra rotation added on top of the base 45deg diamond rotation (CSS value, e.g. '5deg') */
  extraRotate?: string;
}

export default function DiamondImage({
  src,
  alt,
  size = 'clamp(260px, 32vw, 560px)',
  cornerRadius = 0.036,
  animate = true,
  delay = 0,
  overlayColor,
  style,
  extraRotate,
}: DiamondImageProps) {
  const uid = useId().replace(/:/g, '');
  const clipId = `dc-${uid}`;

  // Build path in a 100×100 coordinate system.
  // Corner points: T(50,0)  R(100,50)  B(50,100)  L(0,50)
  // Pull-back distance r along each edge.
  const r = cornerRadius * 50; // e.g. 0.18 * 50 = 9

  // Each corner: arrive at (corner - r), draw Q through corner, leave toward (corner + r)
  // Top corner (50,0):   arrive from left at (50-r, r), Q through (50,0), to (50+r, r)
  // Right corner (100,50): arrive at (100-r, 50-r), Q through (100,50), to (100-r, 50+r)
  // Bottom corner (50,100): arrive at (50+r, 100-r), Q through (50,100), to (50-r, 100-r)
  // Left corner (0,50): arrive at (r, 50+r), Q through (0,50), to (r, 50-r)

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
        height: size,          // always square!
        flexShrink: 0,
        position: 'relative',
        ...(extraRotate ? { transform: `rotate(${extraRotate})` } : {}),
        ...style,
      }}
    >
      {/* Hidden SVG defining the clip path */}
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute', overflow: 'hidden' }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            {/* Scale 100×100 path to 0..1 */}
            <path d={d} transform="scale(0.01)" />
          </clipPath>
        </defs>
      </svg>

      {/* Image – fills the square, clipped to diamond shape */}
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

      {/* Optional overlay */}
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
