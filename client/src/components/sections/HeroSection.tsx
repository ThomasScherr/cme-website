import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1148__1920px_1cc154ec.jpg';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(33,150,211,0.04),transparent_70%)]" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 pt-24 pb-16 lg:pt-0 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-cme-blue font-semibold tracking-[0.2em] uppercase text-xs mb-6">
              {t.hero.tagline}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-cme-dark leading-[1.1] mb-6 whitespace-nowrap">
              {t.hero.headline1}
              <br />
              {t.hero.headline2}
              <br />
              <span className="text-cme-blue">{t.hero.headline3}</span>
            </h1>
            <p className="text-lg text-cme-gray max-w-xl mb-8 leading-relaxed">
              {t.hero.sub}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-cme-blue text-white px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-cme-blue/90 transition-all hover:shadow-lg hover:shadow-cme-blue/20"
              >
                {t.hero.cta_primary}
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-cme-dark/15 text-cme-dark px-7 py-3.5 rounded-lg font-semibold text-sm hover:border-cme-blue hover:text-cme-blue transition-all"
              >
                {t.hero.cta_secondary}
              </button>
            </div>
          </motion.div>

          {/* Right: Two offset diamonds */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-[280px] h-[380px] sm:w-[340px] sm:h-[440px] lg:w-[400px] lg:h-[520px]">
              {/* Accent diamond (behind, offset top-left) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute top-0 left-0"
                style={{ zIndex: 1 }}
              >
                <div className="w-[200px] sm:w-[240px] lg:w-[280px] diamond bg-cme-blue/[0.07]" />
              </motion.div>

              {/* Image diamond (main, offset bottom-right) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-0 right-0"
                style={{ zIndex: 2 }}
              >
                <div
                  className="w-[220px] sm:w-[260px] lg:w-[300px] diamond shadow-xl shadow-cme-blue/15"
                >
                  <img
                    src={HERO_IMAGE}
                    alt="CME Elektronikentwicklung und Fertigung"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-cme-blue/50">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
