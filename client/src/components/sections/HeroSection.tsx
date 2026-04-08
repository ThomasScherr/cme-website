// CME Website – Hero Section
// Design: Text left, diamond (rotated square) image right
// The diamond has rounded corners controlled by --cme-diamond-radius from the Styleguide
// The image fills the diamond completely with no clipping artifacts

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Hero image: Production line overview from CME facility
const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_0658__1920px_20e40d19.jpg';

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
      style={{ paddingTop: '80px', paddingBottom: '80px' }}
    >
      {/* Subtle engineering grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(33,150,211,0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(33,150,211,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 w-full" style={{ maxWidth: 'min(1400px, 90vw)', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 4rem)' }}>
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          
          {/* ── Text Column ── */}
          <div className="w-full lg:w-[50%] relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                fontSize: 'var(--cme-font-size-xs)',
                fontWeight: 600,
                color: 'var(--cme-color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                marginBottom: '1.25rem',
              }}
            >
              {t.hero.tagline}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ marginBottom: '1.5rem' }}
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
                marginBottom: '2rem',
                maxWidth: '560px',
              }}
            >
              {t.hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}
            >
              <Button
                size="lg"
                onClick={() => scrollTo('contact')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
              >
                {t.hero.cta_primary}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('services')}
                className="border-2 border-foreground/20 hover:border-primary hover:text-primary transition-all"
              >
                {t.hero.cta_secondary}
              </Button>
            </motion.div>
          </div>

          {/* ── Diamond Image Column ── */}
          <div className="w-full lg:w-[50%] relative flex items-center justify-center overflow-hidden" style={{ minHeight: '300px' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
              style={{
                width: 'min(340px, 48vw)',
                maxWidth: '100%',
                aspectRatio: '1 / 1',
              }}
            >
              {/* Light blue accent diamond behind (slightly larger, offset) */}
              <div
                style={{
                  position: 'absolute',
                  top: '-4%',
                  left: '-4%',
                  width: '108%',
                  height: '108%',
                  background: 'rgba(33, 150, 211, 0.08)',
                  transform: 'rotate(45deg)',
                  borderRadius: 'calc(var(--cme-diamond-radius, 0.1) * 100%)',
                  zIndex: 0,
                }}
              />

              {/* Main diamond with image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transform: 'rotate(45deg)',
                  borderRadius: 'calc(var(--cme-diamond-radius, 0.1) * 100%)',
                  overflow: 'hidden',
                  zIndex: 1,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                }}
              >
                <img
                  src={HERO_IMAGE}
                  alt="CME Elektronikentwicklung und Fertigung"
                  style={{
                    /* Counter-rotate the image so it appears upright */
                    transform: 'rotate(-45deg) scale(1.42)',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 cursor-pointer"
        onClick={() => scrollTo('stats')}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.4, ease: 'easeInOut', repeat: 1, repeatDelay: 0.3 }}
        >
          <svg
            width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="var(--cme-color-primary)" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ opacity: 0.7 }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
