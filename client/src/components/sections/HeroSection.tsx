// CME Website – Hero Section
// Design Philosophy: Techno-Industrial Precision
// Full-height hero with rounded diamond image bleeding off right edge (like presentation)

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #2196D3 1px, transparent 1px), linear-gradient(to bottom, #2196D3 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Large rounded diamond – bleeds off right edge, like in presentation */}
      <div
        className="absolute"
        style={{
          right: '-220px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      >
        {/* Outer diamond – image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            style={{
              width: '580px',
              height: '580px',
              borderRadius: '12%',
              transform: 'rotate(45deg)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/hero_power_electronics-eKZ2diYBiMBnNwog2o4qTT.webp"
              alt="Power Electronics"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '820px',
                height: '820px',
                transform: 'translate(-50%, -50%) rotate(-45deg)',
                objectFit: 'cover',
              }}
            />
            {/* Light blue overlay like in presentation */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(33, 150, 211, 0.08)',
              }}
            />
          </div>
        </motion.div>

        {/* Secondary smaller diamond behind – light blue accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '12%',
            transform: 'rotate(45deg)',
            background: 'rgba(33, 150, 211, 0.12)',
            bottom: '-60px',
            left: '-80px',
            zIndex: -1,
          }}
        />
      </div>

      {/* Text Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs md:text-sm font-medium text-primary uppercase tracking-widest mb-5"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6"
          >
            {t.hero.headline1}
            <br />
            {t.hero.headline2}
            <br />
            <span className="text-primary">{t.hero.headline3}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-8"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-10"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-0.5 h-8 bg-primary/40"
        />
      </motion.div>
    </section>
  );
}
