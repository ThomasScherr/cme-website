// CME Website – DiagonalImage Component
// Replaces DiamondImage with the diagonal clip-path treatment from the CME presentation.
// A rectangular image is clipped with a diagonal edge, with a light-blue accent shape behind it.

import { motion } from 'framer-motion';

interface DiagonalImageProps {
  src: string;
  alt: string;
  /** Which side the diagonal cuts from: 'left' means image is on the left with diagonal going to upper-right */
  side?: 'left' | 'right';
  /** Optional max height constraint */
  maxHeight?: string;
  /** Animation delay */
  delay?: number;
  /** Whether to animate */
  animate?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Diagonal clip-path image component matching the CME presentation style.
 * 
 * The image is clipped with a diagonal edge. A light-blue accent shape
 * sits behind the image, slightly offset, creating the layered look
 * from the CME corporate presentation.
 */
export default function DiagonalImage({
  src,
  alt,
  side = 'left',
  maxHeight = '500px',
  delay = 0,
  animate = true,
  className = '',
}: DiagonalImageProps) {
  // Clip paths for the diagonal cut
  // 'left' side: image fills left, diagonal cuts to upper-right
  // 'right' side: image fills right, diagonal cuts to upper-left
  const imageClip = side === 'left'
    ? 'polygon(0 15%, 75% 0, 100% 100%, 0 100%)'
    : 'polygon(25% 0, 100% 15%, 100% 100%, 0 100%)';

  // Accent shape is slightly larger and offset
  const accentClip = side === 'left'
    ? 'polygon(0 10%, 80% 0, 100% 85%, 0 95%)'
    : 'polygon(20% 0, 100% 10%, 100% 95%, 0 85%)';

  const content = (
    <div
      className={`relative ${className}`}
      style={{ maxHeight, width: '100%' }}
    >
      {/* Light blue accent shape behind the image */}
      <div
        style={{
          position: 'absolute',
          inset: '-5%',
          background: 'rgba(33, 150, 211, 0.08)',
          clipPath: accentClip,
          WebkitClipPath: accentClip,
          zIndex: 0,
        }}
      />

      {/* Main image with diagonal clip */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: '100%',
          height: 'auto',
          maxHeight,
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          position: 'relative',
          zIndex: 1,
          clipPath: imageClip,
          WebkitClipPath: imageClip,
        }}
      />
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {content}
    </motion.div>
  );
}
