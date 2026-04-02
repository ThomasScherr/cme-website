// CME Website – DiamondImage Component
// Design Philosophy: Techno-Industrial Precision
//
// Rounded diamond (rhombus) shape matching CME presentation style.
// The image ALWAYS fills the entire diamond – no white gaps at corners.
//
// Technique:
//   1. Outer wrapper: square div, rotated 45°, border-radius 12%, overflow hidden
//   2. Inner img: counter-rotated -45°, sized at 142% (= sqrt(2)) to fill all corners
//      Plus extra scale(1.05) safety margin to guarantee no white edges
//
// Bleed: position the wrapper with negative margin/absolute offset so it
//        extends beyond the viewport edge (like in the CME presentation).

import { motion } from 'framer-motion';

interface DiamondImageProps {
  src: string;
  alt: string;
  /** Side length of the diamond in px (at 1x). Scales via CSS clamp on parent. */
  size?: number;
  /** border-radius of the rotated square – controls corner roundness */
  borderRadius?: string;
  className?: string;
  animate?: boolean;
  delay?: number;
  /** Optional RGBA overlay, e.g. "rgba(33,150,211,0.08)" */
  overlayColor?: string;
  style?: React.CSSProperties;
}

export default function DiamondImage({
  src,
  alt,
  size = 440,
  borderRadius = '12%',
  className = '',
  animate = true,
  delay = 0,
  overlayColor,
  style,
}: DiamondImageProps) {
  const inner = (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        position: 'relative',
        ...style,
      }}
    >
      {/* Rotated square → becomes a diamond */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius,
          transform: 'rotate(45deg)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/*
          Counter-rotate the image so it appears upright.
          Size at 145% + scale(1.06) ensures every corner pixel is covered,
          even at extreme border-radius values.
        */}
        <img
          src={src}
          alt={alt}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '145%',
            height: '145%',
            transform: 'translate(-50%, -50%) rotate(-45deg) scale(1.06)',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        {overlayColor && (
          <div style={{ position: 'absolute', inset: 0, background: overlayColor }} />
        )}
      </div>
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
