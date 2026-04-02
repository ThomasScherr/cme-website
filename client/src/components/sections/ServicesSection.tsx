// CME Website – Services Section
// Design: Techno-Industrial Precision – fluid sizing from 375px to 3840px
// Diamond images use SVG clipPath – guaranteed full fill, no white corners

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import DiamondImage from '@/components/DiamondImage';

const IMAGES = {
  dev:       'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/thermal_simulation-FM5thvnf8JFwwqX8DK9CYp.webp',
  mfg:       'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/ems_production_line-F9qYf8S6uGr7YzEJkSPZgx.webp',
  lifecycle: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/hero_motor_control-bLizo3WgKjkGLGM7m7b8RD.webp',
};

const vp = { once: true, margin: '-80px' };
// Diamond sizes/positions controlled via CSS Custom Properties (editable in /styleguide)

/** Fluid section label */
function ServiceLabel({ num, tag, dark = false }: { num: string; tag: string; dark?: boolean }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
      <span style={{ background: 'oklch(0.62 0.14 230)', color: '#fff', fontSize: 'var(--text-xs)', fontWeight: 700, padding: '0.3em 0.75em' }}>
        {num}
      </span>
      <span style={{ fontSize: 'var(--text-xs)', color: dark ? 'rgba(255,255,255,0.45)' : 'oklch(0.45 0.01 240)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        {tag}
      </span>
    </div>
  );
}

export default function ServicesSection() {
  const { t } = useLanguage();

  const sectionPad = 'clamp(3rem, 5vw + 1rem, 9rem)';
  const contentMax = 'min(1600px, 90vw)';
  const contentPad = 'clamp(1rem, 2vw + 0.5rem, 4rem)';

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
    gap: 'clamp(2rem, 4vw, 5rem)',
    alignItems: 'center',
  };

  return (
    <section id="services" className="bg-background">
      {/* Header */}
      <div style={{ maxWidth: contentMax, margin: '0 auto', padding: `${sectionPad} ${contentPad} clamp(2rem, 3vw, 5rem)` }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'oklch(0.62 0.14 230)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.75rem' }}>
            Services
          </p>
          <h2 style={{ marginBottom: '1rem' }}>{t.services.headline}</h2>
          <p style={{ fontSize: 'var(--text-lg)', color: 'oklch(0.45 0.01 240)', maxWidth: 'clamp(280px, 40vw, 700px)' }}>
            {t.services.sub}
          </p>
        </motion.div>
      </div>

      {/* ── Service 1: Development – diamond left, bleeds off left edge ── */}
      <div style={{ overflow: 'hidden', paddingTop: sectionPad, paddingBottom: sectionPad }}>
        <div style={{ maxWidth: contentMax, margin: '0 auto', paddingLeft: contentPad, paddingRight: contentPad, ...gridStyle }}>
          {/* Diamond – size/position via CSS Custom Properties */}
          <div style={{ marginLeft: 'calc(-1 * var(--cme-diamond-service1-offset-x, 18vw))', transform: 'translateY(var(--cme-diamond-service1-offset-y, 0px))' }}>
            <DiamondImage src={IMAGES.dev} alt={t.services.dev_title} size="var(--cme-diamond-service1-size, 46vw)" delay={0.1} extraRotate="var(--cme-diamond-service1-rotate, 0deg)" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.5, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}
          >
            <ServiceLabel num="01" tag="Entwicklung" />
            <h3>{t.services.dev_title}</h3>
            <p style={{ fontSize: 'var(--text-base)', color: 'oklch(0.45 0.01 240)' }}>{t.services.dev_desc}</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {t.services.dev_items.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--text-sm)' }}>
                  <span style={{ width: '6px', height: '6px', background: 'oklch(0.62 0.14 230)', transform: 'rotate(45deg)', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* ── Service 2: Manufacturing – text left, diamond right bleeds ── */}
      <div style={{ overflow: 'hidden', paddingTop: sectionPad, paddingBottom: sectionPad, background: 'oklch(0.97 0.001 240)' }}>
        <div style={{ maxWidth: contentMax, margin: '0 auto', paddingLeft: contentPad, paddingRight: contentPad, ...gridStyle }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.5vw, 1.25rem)', order: 1 }}
          >
            <ServiceLabel num="02" tag="EMS Fertigung" />
            <h3>{t.services.mfg_title}</h3>
            <p style={{ fontSize: 'var(--text-base)', color: 'oklch(0.45 0.01 240)' }}>{t.services.mfg_desc}</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {t.services.mfg_items.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--text-sm)' }}>
                  <span style={{ width: '6px', height: '6px', background: 'oklch(0.15 0 0)', transform: 'rotate(45deg)', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          {/* Diamond bleeds off right – CSS Custom Properties */}
          <div style={{ order: 2, display: 'flex', justifyContent: 'flex-end', marginRight: 'calc(-1 * var(--cme-diamond-service2-offset-x, 18vw))', transform: 'translateY(var(--cme-diamond-service2-offset-y, 0px))' }}>
            <DiamondImage src={IMAGES.mfg} alt={t.services.mfg_title} size="var(--cme-diamond-service2-size, 46vw)" delay={0.1} extraRotate="var(--cme-diamond-service2-rotate, 0deg)" />
          </div>
        </div>
      </div>

      {/* ── Service 3: Lifecycle – dark background, diamond left bleeds ── */}
      <div style={{ overflow: 'hidden', paddingTop: sectionPad, paddingBottom: sectionPad, background: 'oklch(0.15 0 0)' }}>
        <div style={{ maxWidth: contentMax, margin: '0 auto', paddingLeft: contentPad, paddingRight: contentPad, ...gridStyle }}>
          <div style={{ marginLeft: 'calc(-1 * var(--cme-diamond-service3-offset-x, 18vw))', transform: 'translateY(var(--cme-diamond-service3-offset-y, 0px))' }}>
            <DiamondImage src={IMAGES.lifecycle} alt={t.services.lifecycle_title} size="var(--cme-diamond-service3-size, 46vw)" delay={0.1} extraRotate="var(--cme-diamond-service3-rotate, 0deg)" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.5, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}
          >
            <ServiceLabel num="03" tag="Lifecycle" dark />
            <h3 style={{ color: '#fff' }}>{t.services.lifecycle_title}</h3>
            <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.60)' }}>{t.services.lifecycle_desc}</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {t.services.lifecycle_items.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.80)' }}>
                  <span style={{ width: '6px', height: '6px', background: 'oklch(0.62 0.14 230)', transform: 'rotate(45deg)', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
