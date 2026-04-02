// CME Website – Services Section
// Design Philosophy: Techno-Industrial Precision
// Three service pillars with rounded diamond images bleeding off edges

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const IMAGES = {
  dev: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/thermal_simulation-FM5thvnf8JFwwqX8DK9CYp.webp',
  mfg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/ems_production_line-F9qYf8S6uGr7YzEJkSPZgx.webp',
  lifecycle: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/hero_motor_control-bLizo3WgKjkGLGM7m7b8RD.webp',
};

const viewport = { once: true, margin: '-80px' };

// Rounded diamond helper
function RoundedDiamond({
  src,
  alt,
  size = 420,
  delay = 0,
}: {
  src: string;
  alt: string;
  size?: number;
  delay?: number;
}) {
  const innerSize = Math.round(size * 1.42);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewport}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ width: size, height: size, flexShrink: 0 }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '12%',
          transform: 'rotate(45deg)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `${innerSize}px`,
            height: `${innerSize}px`,
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            objectFit: 'cover',
          }}
        />
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="bg-background">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">Services</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">{t.services.headline}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">{t.services.sub}</p>
        </motion.div>
      </div>

      {/* Service 1: Development – Diamond bleeds off LEFT */}
      <div className="relative overflow-hidden py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Diamond – positioned to bleed off left on desktop */}
            <div className="relative flex justify-center lg:justify-start">
              <div
                className="relative"
                style={{ marginLeft: 'clamp(-60px, -8vw, -120px)' }}
              >
                <RoundedDiamond src={IMAGES.dev} alt={t.services.dev_title} size={400} delay={0.1} />
                {/* Accent diamond behind */}
                <div
                  style={{
                    position: 'absolute',
                    width: '140px',
                    height: '140px',
                    borderRadius: '12%',
                    transform: 'rotate(45deg)',
                    background: 'rgba(33, 150, 211, 0.10)',
                    bottom: '-30px',
                    right: '-20px',
                    zIndex: -1,
                  }}
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-5"
            >
              <div className="inline-flex items-center gap-3">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5">01</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Entwicklung</span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl">{t.services.dev_title}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{t.services.dev_desc}</p>
              <ul className="space-y-2.5">
                {t.services.dev_items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rotate-45 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Service 2: Manufacturing – Diamond bleeds off RIGHT */}
      <div className="relative overflow-hidden py-16 lg:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5 }}
              className="space-y-5 order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-3">
                <span className="bg-foreground text-background text-xs font-bold px-3 py-1.5">02</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">EMS Fertigung</span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl">{t.services.mfg_title}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{t.services.mfg_desc}</p>
              <ul className="space-y-2.5">
                {t.services.mfg_items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 bg-foreground rotate-45 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Diamond – bleeds off right */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
              <div
                className="relative"
                style={{ marginRight: 'clamp(-60px, -8vw, -120px)' }}
              >
                <RoundedDiamond src={IMAGES.mfg} alt={t.services.mfg_title} size={400} delay={0.1} />
                <div
                  style={{
                    position: 'absolute',
                    width: '120px',
                    height: '120px',
                    borderRadius: '12%',
                    transform: 'rotate(45deg)',
                    background: 'rgba(80, 80, 80, 0.08)',
                    top: '-25px',
                    left: '-15px',
                    zIndex: -1,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service 3: Lifecycle – Diamond centered, bleeds bottom */}
      <div className="relative overflow-hidden py-16 lg:py-24 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Diamond – centered, slight bottom bleed */}
            <div className="relative flex justify-center">
              <div className="relative" style={{ marginBottom: '-40px' }}>
                <RoundedDiamond src={IMAGES.lifecycle} alt={t.services.lifecycle_title} size={380} delay={0.1} />
                {/* Light blue accent diamond */}
                <div
                  style={{
                    position: 'absolute',
                    width: '130px',
                    height: '130px',
                    borderRadius: '12%',
                    transform: 'rotate(45deg)',
                    background: 'rgba(33, 150, 211, 0.18)',
                    top: '-20px',
                    right: '-30px',
                    zIndex: -1,
                  }}
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-5"
            >
              <div className="inline-flex items-center gap-3">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5">03</span>
                <span className="text-xs text-background/50 uppercase tracking-wider">Lifecycle</span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl text-background">{t.services.lifecycle_title}</h3>
              <p className="text-background/60 text-sm md:text-base leading-relaxed">{t.services.lifecycle_desc}</p>
              <ul className="space-y-2.5">
                {t.services.lifecycle_items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-background/80">
                    <span className="w-1.5 h-1.5 bg-primary rotate-45 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
