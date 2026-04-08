// CME Website – Services Section
// Design: Based on CME Company Presentation
// Images from the actual CME presentation with diagonal clip-path treatment
// Layout: Two-column on desktop (text + image), single column on mobile

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

// Real CME facility photos from control-motion.de
const IMAGES = {
  dev: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2885__1920px_ecd3ed1e.jpg', // EMC lab with monitors
  mfg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_0425__1920px_178fc1eb.jpg', // SMD pick-and-place machine
  lifecycle: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2412__1920px_2dc0dd4c.jpg', // Testing equipment
};

const vp = { once: true, margin: '-80px' };

/** Fluid section label */
function ServiceLabel({ num, tag, dark = false }: { num: string; tag: string; dark?: boolean }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
      <span style={{ background: 'var(--cme-color-primary)', color: '#fff', fontSize: 'var(--cme-font-size-xs)', fontWeight: 700, padding: '0.3em 0.75em' }}>
        {num}
      </span>
      <span style={{ fontSize: 'var(--cme-font-size-xs)', color: dark ? 'rgba(255,255,255,0.45)' : 'var(--cme-color-gray)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        {tag}
      </span>
    </div>
  );
}

/** Diagonal-clipped image block matching CME presentation style */
function DiagonalImageBlock({ src, alt, side }: { src: string; alt: string; side: 'left' | 'right' }) {
  // Clip paths matching the CME presentation diagonal treatment
  const imageClip = side === 'left'
    ? 'polygon(0 20%, 80% 0, 100% 100%, 0 100%)'
    : 'polygon(20% 0, 100% 20%, 100% 100%, 0 100%)';

  const accentClip = side === 'left'
    ? 'polygon(5% 15%, 85% 0, 95% 90%, 0 95%)'
    : 'polygon(15% 0, 95% 15%, 100% 95%, 5% 90%)';

  return (
    <div className="relative w-full">
      {/* Light blue accent shape */}
      <div
        style={{
          position: 'absolute',
          inset: '-4%',
          background: 'rgba(33, 150, 211, 0.07)',
          clipPath: accentClip,
          WebkitClipPath: accentClip,
          zIndex: 0,
        }}
      />
      {/* Image with diagonal clip */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '480px',
          objectFit: 'cover',
          objectPosition: 'center 30%',
          display: 'block',
          position: 'relative',
          zIndex: 1,
          clipPath: imageClip,
          WebkitClipPath: imageClip,
        }}
      />
    </div>
  );
}

/** Service block with two-column layout */
function ServiceBlock({
  bg,
  imageSide,
  imageSrc,
  imageAlt,
  children,
}: {
  bg?: string;
  imageSide: 'left' | 'right';
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
}) {
  const isLeft = imageSide === 'left';

  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(3rem, 5vw, 6rem) 0', background: bg }}>
      <div style={{ maxWidth: 'min(1400px, 90vw)', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 4rem)' }}>
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          {/* Text column */}
          <div className="w-full lg:w-[55%]" style={{ order: isLeft ? 2 : 1, position: 'relative', zIndex: 2 }}>
            {children}
          </div>

          {/* Image column – visible on all devices */}
          <motion.div
            className="w-full lg:w-[45%]"
            style={{ order: isLeft ? 1 : 2 }}
            initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <DiagonalImageBlock src={imageSrc} alt={imageAlt} side={imageSide} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="bg-background">
      {/* Header */}
      <div style={{ maxWidth: 'min(1400px, 90vw)', margin: '0 auto', padding: 'clamp(3rem, 5vw, 6rem) clamp(1rem, 3vw, 4rem) clamp(1rem, 2vw, 3rem)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: 'var(--cme-font-size-xs)', fontWeight: 600, color: 'var(--cme-color-primary)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.75rem' }}>
            Services
          </p>
          <h2 style={{ marginBottom: '1rem' }}>{t.services.headline}</h2>
          <p className="max-w-full md:max-w-[600px]" style={{ fontSize: 'var(--cme-font-size-lg)', color: 'var(--cme-color-gray)' }}>
            {t.services.sub}
          </p>
        </motion.div>
      </div>

      {/* ── Service 1: Development – image left (like presentation page 4) ── */}
      <ServiceBlock imageSide="left" imageSrc={IMAGES.dev} imageAlt={t.services.dev_title}>
        <motion.div
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.5, delay: 0.15 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}
        >
          <ServiceLabel num="01" tag="Entwicklung" />
          <h3>{t.services.dev_title}</h3>
          <p style={{ fontSize: 'var(--cme-font-size-base)', color: 'var(--cme-color-gray)' }}>{t.services.dev_desc}</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {t.services.dev_items.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--cme-font-size-sm)' }}>
                <span style={{ width: '6px', height: '6px', background: 'var(--cme-color-primary)', transform: 'rotate(45deg)', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </ServiceBlock>

      {/* ── Service 2: Manufacturing – image right ── */}
      <ServiceBlock bg="var(--cme-color-bg-alt, #f5f6f8)" imageSide="right" imageSrc={IMAGES.mfg} imageAlt={t.services.mfg_title}>
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}
        >
          <ServiceLabel num="02" tag="EMS Fertigung" />
          <h3>{t.services.mfg_title}</h3>
          <p style={{ fontSize: 'var(--cme-font-size-base)', color: 'var(--cme-color-gray)' }}>{t.services.mfg_desc}</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {t.services.mfg_items.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--cme-font-size-sm)' }}>
                <span style={{ width: '6px', height: '6px', background: 'var(--cme-color-dark)', transform: 'rotate(45deg)', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </ServiceBlock>

      {/* ── Service 3: Lifecycle – dark background, image left ── */}
      <ServiceBlock bg="var(--cme-color-dark)" imageSide="left" imageSrc={IMAGES.lifecycle} imageAlt={t.services.lifecycle_title}>
        <motion.div
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.5, delay: 0.15 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}
        >
          <ServiceLabel num="03" tag="Lifecycle" dark />
          <h3 style={{ color: '#fff' }}>{t.services.lifecycle_title}</h3>
          <p style={{ fontSize: 'var(--cme-font-size-base)', color: 'rgba(255,255,255,0.60)' }}>{t.services.lifecycle_desc}</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {t.services.lifecycle_items.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--cme-font-size-sm)', color: 'rgba(255,255,255,0.80)' }}>
                <span style={{ width: '6px', height: '6px', background: 'var(--cme-color-primary)', transform: 'rotate(45deg)', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </ServiceBlock>
    </section>
  );
}
