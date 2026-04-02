// CME Website – DiamondImage Component
// Design Philosophy: Techno-Industrial Precision
// Rounded diamond (rhombus) shape matching CME presentation style
// Supports bleed/crop effect where diamond extends beyond viewport edge

import { motion } from 'framer-motion';

interface DiamondImageProps {
  src: string;
  alt: string;
  size?: number;           // base size in px (the rotated square)
  borderRadius?: string;   // border-radius of the rotated square (controls corner roundness)
  className?: string;
  animate?: boolean;
  delay?: number;
  bleedRight?: boolean;    // extend beyond right edge
  bleedLeft?: boolean;     // extend beyond left edge
  bleedBottom?: boolean;   // extend beyond bottom edge
  overlayColor?: string;   // optional color overlay
}

export default function DiamondImage({
  src,
  alt,
  size = 420,
  borderRadius = '12%',
  className = '',
  animate = true,
  delay = 0,
  bleedRight = false,
  bleedLeft = false,
  bleedBottom = false,
  overlayColor,
}: DiamondImageProps) {
  // The inner square needs to be sqrt(2) * size to fill the diamond
  const innerSize = Math.round(size * 1.415);

  const bleedStyle: React.CSSProperties = {};
  if (bleedRight) bleedStyle.right = `-${size * 0.3}px`;
  if (bleedLeft) bleedStyle.left = `-${size * 0.3}px`;
  if (bleedBottom) bleedStyle.bottom = `-${size * 0.3}px`;

  const content = (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...bleedStyle,
      }}
    >
      {/* The rotated square with rounded corners = rounded diamond */}
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
        {/* Counter-rotate image to keep it upright */}
        <img
          src={src}
          alt={alt}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `${innerSize}px`,
            height: `${innerSize}px`,
            transform: `translate(-50%, -50%) rotate(-45deg)`,
            objectFit: 'cover',
          }}
        />
        {/* Optional color overlay */}
        {overlayColor && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: overlayColor,
            }}
          />
        )}
      </div>
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ position: 'relative' }}
    >
      {content}
    </motion.div>
  );
}
