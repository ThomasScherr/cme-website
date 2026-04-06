// CME Website – Services Section
// Design: Techno-Industrial Precision – fluid sizing from 375px to 3840px
// Diamond images use SVG clipPath – guaranteed full fill, no white corners
// Layout: Two-column on desktop (text + diamond), single column on mobile (no diamond)
// Diamond columns have overflow:hidden – diamonds NEVER overlap text

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import DiamondImage from '@/components/DiamondImage';

const IMAGES = {
  dev:       'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/thermal_simulation-FM5thvnf8JFwwqX8DK9CYp.webp',
  mfg:       'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/ems_production_line-F9qYf8S6uGr7YzEJkSPZgx.webp',
  lifecycle: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/hero_motor_control-bLizo3WgKjkGLGM7m7b8RD.webp',
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

/** Service block with two-column layout: text on one side, diamond on the other */
function ServiceBlock({
  id,
  bg,
  diamondSide,
  diamondSrc,
  diamondAlt,
  diamondSizeVar,
  diamondOffsetXVar,
  diamondOffsetYVar,
  diamondRotateVar,
  ptVar,
  pbVar,
  children,
}: {
  id: string;
  bg?: string;
  diamondSide: 'left' | 'right';
  diamondSrc: string;
  diamondAlt: string;
  diamondSizeVar: string;
  diamondOffsetXVar: string;
  diamondOffsetYVar: string;
  diamondRotateVar: string;
  ptVar: string;
  pbVar: string;
  children: React.ReactNode;
}) {
  const contentMax = 'min(1600px, 90vw)';
  const contentPad = 'clamp(1rem, 2vw + 0.5rem, 4rem)';
  const isLeft = diamondSide === 'left';

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      paddingTop: ptVar,
      paddingBottom: pbVar,
      background: bg,
    }}>
      <div style={{
        maxWidth: contentMax,
        margin: '0 auto',
        paddingLeft: contentPad,
        paddingRight: contentPad,
      }}>
        {/* Two-column grid on desktop: text 55% + diamond 45% */}
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={{ gap: 'clamp(2rem, 4vw, 4rem)' }}
        >
          {/* Text column – always first on mobile, order depends on diamondSide on desktop */}
          <div
            className="w-full md:w-[55%]"
            style={{ order: isLeft ? 2 : 1, position: 'relative', zIndex: 2 }}
          >
            {children}
          </div>

          {/* Diamond column – hidden on mobile, overflow clipped on desktop */}
          <div
            className="hidden md:flex md:w-[45%] items-center justify-center"
            style={{
              order: isLeft ? 1 : 2,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              maxWidth: '100%',
              overflow: 'hidden',
            }}>
              <DiamondImage
                src={diamondSrc}
                alt={diamondAlt}
                size={`var(${diamondSizeVar}, min(100%, clamp(240px, 26vw, 460px)))`}
                delay={0.1}
                extraRotate={`var(${diamondRotateVar}, 0deg)`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { t } = useLanguage();

  const contentMax = 'min(1600px, 90vw)';
  const contentPad = 'clamp(1rem, 2vw + 0.5rem, 4rem)';

  return (
    <section id="services" className="bg-background">
      {/* Header */}
      <div style={{ maxWidth: contentMax, margin: '0 auto', padding: `clamp(3rem, 5vw + 1rem, 9rem) ${contentPad} clamp(2rem, 3vw, 5rem)` }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: 'var(--cme-font-size-xs)', fontWeight: 500, color: 'var(--cme-color-primary)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.75rem' }}>
            Services
          </p>
          <h2 style={{ marginBottom: '1rem' }}>{t.services.headline}</h2>
          <p className="max-w-full md:max-w-[clamp(280px,40vw,700px)]" style={{ fontSize: 'var(--cme-font-size-lg)', color: 'var(--cme-color-gray)' }}>
            {t.services.sub}
          </p>
        </motion.div>
      </div>

      {/* ── Service 1: Development – diamond left ── */}
      <ServiceBlock
        id="service1"
        diamondSide="left"
        diamondSrc={IMAGES.dev}
        diamondAlt={t.services.dev_title}
        diamondSizeVar="--cme-diamond-service1-size"
        diamondOffsetXVar="--cme-diamond-service1-offset-x"
        diamondOffsetYVar="--cme-diamond-service1-offset-y"
        diamondRotateVar="--cme-diamond-service1-rotate"
        ptVar="var(--cme-section-service1-pt, 80px)"
        pbVar="var(--cme-section-service1-pb, 80px)"
      >
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

      {/* ── Service 2: Manufacturing – diamond right ── */}
      <ServiceBlock
        id="service2"
        bg="var(--cme-color-bg-alt, #f5f6f8)"
        diamondSide="right"
        diamondSrc={IMAGES.mfg}
        diamondAlt={t.services.mfg_title}
        diamondSizeVar="--cme-diamond-service2-size"
        diamondOffsetXVar="--cme-diamond-service2-offset-x"
        diamondOffsetYVar="--cme-diamond-service2-offset-y"
        diamondRotateVar="--cme-diamond-service2-rotate"
        ptVar="var(--cme-section-service2-pt, 80px)"
        pbVar="var(--cme-section-service2-pb, 80px)"
      >
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

      {/* ── Service 3: Lifecycle – dark background, diamond left ── */}
      <ServiceBlock
        id="service3"
        bg="var(--cme-color-dark)"
        diamondSide="left"
        diamondSrc={IMAGES.lifecycle}
        diamondAlt={t.services.lifecycle_title}
        diamondSizeVar="--cme-diamond-service3-size"
        diamondOffsetXVar="--cme-diamond-service3-offset-x"
        diamondOffsetYVar="--cme-diamond-service3-offset-y"
        diamondRotateVar="--cme-diamond-service3-rotate"
        ptVar="var(--cme-section-service3-pt, 80px)"
        pbVar="var(--cme-section-service3-pb, 80px)"
      >
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
