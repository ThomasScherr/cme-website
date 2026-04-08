// CME Website – Hero Section
// Design: Text left, diamond image right – absolutely positioned in the section
// The two diamonds (accent + image) are offset from each other, not centered
// Diamonds live outside the text container so they are never clipped

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

  // Diamond size: responsive, large enough to be impactful
  // On desktop the diamonds sit in the right half of the section
  // On mobile they stack above the text at reduced size

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center"
      style={{ paddingTop: '80px', paddingBottom: '80px', overflow: 'visible' }}
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

      {/* ── Diamonds: absolutely positioned in the section ── */}
      {/* They sit in the right portion of the viewport, outside the text container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Accent diamond (light blue, behind, offset up-left from image diamond) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute hidden lg:block"
          style={{
            width: 'min(340px, 27vw)',
            aspectRatio: '1 / 1',
            top: '12%',
            right: '18%',
            background: 'rgba(33, 150, 211, 0.07)',
            transform: 'rotate(45deg)',
            borderRadius: 'calc(var(--cme-diamond-radius, 0.1) * 100%)',
            zIndex: 1,
          }}
        />

        {/* Image diamond (main, offset down-right from accent) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute hidden lg:block"
          style={{
            width: 'min(380px, 30vw)',
            aspectRatio: '1 / 1',
            top: '25%',
            right: '5%',
            transform: 'rotate(45deg)',
            borderRadius: 'calc(var(--cme-diamond-radius, 0.1) * 100%)',
            overflow: 'hidden',
            zIndex: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
          }}
        >
          <img
            src={HERO_IMAGE}
            alt="CME Elektronikentwicklung und Fertigung"
            style={{
              transform: 'rotate(-45deg) scale(1.42)',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </motion.div>

        {/* Mobile: single diamond, centered, smaller */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:hidden absolute"
          style={{
            width: 'min(220px, 55vw)',
            aspectRatio: '1 / 1',
            top: '8%',
            right: '5%',
            transform: 'rotate(45deg)',
            borderRadius: 'calc(var(--cme-diamond-radius, 0.1) * 100%)',
            overflow: 'hidden',
            zIndex: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        >
          <img
            src={HERO_IMAGE}
            alt="CME Elektronikentwicklung und Fertigung"
            style={{
              transform: 'rotate(-45deg) scale(1.42)',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </motion.div>
      </div>

      {/* ── Text Content (inside container, left side) ── */}
      <div className="relative z-10 w-full" style={{ maxWidth: 'min(1400px, 90vw)', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 4rem)' }}>
        <div className="w-full lg:w-[50%]">
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
