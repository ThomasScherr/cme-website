// CME Website – DiamondImage Component
// Design: Techno-Industrial Precision
//
// TECHNIQUE: SVG clipPath on a normal (non-rotated) image.
// The diamond shape is defined as an SVG polygon in the clip-path definition.
// The image fills the bounding box 100% – no rotation tricks, no overflow hidden,
// no white corners ever.
//
// The diamond polygon points (for a square bounding box):
//   top-center (50%,0) → right (100%,50%) → bottom (50%,100%) → left (0,50%)
// For rounded corners we use a cubic-bezier approximation via SVG path.

import { motion } from 'framer-motion';
import { useId } from 'react';

interface DiamondImageProps {
  src: string;
  alt: string;
  /** Fluid CSS size string, e.g. "clamp(260px, 32vw, 560px)" */
  size?: string;
  /** Corner radius as fraction of half-side, 0 = sharp, 0.25 = CME style */
  cornerRadius?: number;
  className?: string;
  animate?: boolean;
  delay?: number;
  overlayColor?: string;
  style?: React.CSSProperties;
}

export default function DiamondImage({
  src,
  alt,
  size = 'clamp(260px, 32vw, 560px)',
  cornerRadius = 0.22,
  animate = true,
  delay = 0,
  overlayColor,
  style,
}: DiamondImageProps) {
  const id = useId().replace(/:/g, '');

  // Build SVG path for a rounded diamond in a 100x100 viewBox.
  // The four corners are at: top(50,0), right(100,50), bottom(50,100), left(0,50)
  // We pull each corner back by `r` units along each edge and draw a cubic bezier.
  const r = cornerRadius * 50; // e.g. 0.22 * 50 = 11
  const c = r * 0.55; // bezier control point distance ≈ r * (4/3 * tan(π/8)) ≈ r * 0.55

  // top corner → right corner → bottom corner → left corner → back to top
  const d = [
    `M ${50},${r}`,                                         // start just below top
    `C ${50 + c},${r} ${100 - r},${50 - c} ${100 - r},${50}`, // top→right
    `C ${100 - r},${50 + c} ${50 + c},${100 - r} ${50},${100 - r}`, // right→bottom
    `C ${50 - c},${100 - r} ${r},${50 + c} ${r},${50}`,     // bottom→left
    `C ${r},${50 - c} ${50 - c},${r} ${50},${r}`,           // left→top
    'Z',
  ].join(' ');

  const clipId = `diamond-clip-${id}`;

  const inner = (
    <div
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        position: 'relative',
        ...style,
      }}
    >
      {/* Hidden SVG that defines the clip path */}
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute', overflow: 'hidden' }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            {/* Scale the 100x100 path to 0..1 range for objectBoundingBox */}
            <path d={d} transform="scale(0.01)" />
          </clipPath>
        </defs>
      </svg>

      {/* The image – fills the container 100%, clip-path applied directly */}
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

      {/* Optional color overlay */}
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
