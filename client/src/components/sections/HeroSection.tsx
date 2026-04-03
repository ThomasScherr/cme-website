// CME Website – Hero Section
// Design: Techno-Industrial Precision
// Diamond uses SVG clipPath – guaranteed full image fill, no white corners

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import DiamondImage from '@/components/DiamondImage';

export default function HeroSection() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
      style={{ paddingTop: 'var(--cme-section-hero-pt, 80px)', paddingBottom: 'var(--cme-section-hero-pb, 80px)' }}
    >
      {/* Subtle engineering grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(33,150,211,0.04) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(33,150,211,0.04) 1px, transparent 1px)`,
          backgroundSize: 'clamp(30px, 4vw, 60px) clamp(30px, 4vw, 60px)',
        }}
      />

      {/* ── Large rounded diamond – position/size controlled via CSS Custom Properties ── */}
      <div
        className="absolute"
        style={{
          right: 0,
          top: '50%',
          transform: `translateY(calc(-50% + var(--cme-diamond-hero-offset-y, 0px))) translateX(var(--cme-diamond-hero-offset-x, 18vw))`,
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <DiamondImage
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/hero_power_electronics-eKZ2diYBiMBnNwog2o4qTT.webp"
            alt="Power Electronics"
            size="var(--cme-diamond-hero-size, 58vw)"
            animate={false}
            overlayColor="var(--cme-color-primary-40, rgba(33,150,211,0.06))"
            extraRotate="var(--cme-diamond-hero-rotate, 0deg)"
          />
        </motion.div>

        {/* Accent diamond – light blue, behind main */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            position: 'absolute',
            width: 'clamp(80px, 12vw, 200px)',
            height: 'clamp(80px, 12vw, 200px)',
            borderRadius: '12%',
            transform: 'rotate(45deg)',
            background: 'var(--cme-color-primary-40, rgba(33,150,211,0.1))',
            bottom: 'clamp(-30px, -4vw, -60px)',
            left: 'clamp(-40px, -6vw, -80px)',
            zIndex: -1,
          }}
        />
      </div>

      {/* ── Text Content ── */}
      <div
        className="relative z-10 w-full"
        style={{
          maxWidth: 'min(1600px, 90vw)',
          margin: '0 auto',
          paddingLeft:  'clamp(1rem, 2vw + 0.5rem, 4rem)',
          paddingRight: 'clamp(1rem, 2vw + 0.5rem, 4rem)',
        }}
      >
        <div style={{ maxWidth: 'clamp(320px, 50vw, 900px)' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              fontSize: 'var(--cme-font-size-xs)',
              fontWeight: 500,
              color: 'var(--cme-color-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              marginBottom: 'clamp(0.75rem, 1.5vw, 1.5rem)',
            }}
          >
            {t.hero.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ marginBottom: 'clamp(1rem, 2vw, 2rem)' }}
          >
            {t.hero.headline1}
            <br />
            {t.hero.headline2}
            <br />
            <span style={{ color: 'var(--cme-color-primary)' }}>{t.hero.headline3}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            style={{
              fontSize: 'var(--cme-font-size-lg)',
              color: 'var(--cme-color-gray)',
              maxWidth: 'clamp(280px, 40vw, 680px)',
              marginBottom: 'clamp(1.5rem, 3vw, 3rem)',
            }}
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}
          >
            <Button
              size="lg"
              onClick={() => scrollTo('contact')}
              style={{ fontSize: 'var(--cme-font-size-sm)', padding: 'clamp(0.6rem, 1vw, 0.9rem) clamp(1.2rem, 2.5vw, 2rem)' }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
            >
              {t.hero.cta_primary}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo('services')}
              style={{ fontSize: 'var(--cme-font-size-sm)', padding: 'clamp(0.6rem, 1vw, 0.9rem) clamp(1.2rem, 2.5vw, 2rem)' }}
              className="border-2 border-foreground/20 hover:border-primary hover:text-primary transition-all"
            >
              {t.hero.cta_secondary}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator – animated chevron arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 cursor-pointer"
        onClick={() => scrollTo('stats')}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.4,
            ease: 'easeInOut',
            repeat: 1,
            repeatDelay: 0.3,
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--cme-color-accent, #00b4d8)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.85 }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
