// CME Website – Hero Section
// Design Philosophy: Techno-Industrial Precision
// Full-height hero with diamond-shaped image, scroll animations, responsive layout

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
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 pt-20"
    >
      {/* Decorative Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 lg:space-y-8"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs md:text-sm font-medium text-primary uppercase tracking-widest"
            >
              {t.hero.tagline}
            </motion.p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              {t.hero.headline1}
              <br />
              {t.hero.headline2}
              <br />
              <span className="text-primary">{t.hero.headline3}</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              {t.hero.sub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => scrollTo('contact')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
              >
                {t.hero.cta_primary}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('services')}
                className="border-2 hover:bg-muted/50"
              >
                {t.hero.cta_secondary}
              </Button>
            </div>
          </motion.div>

          {/* Right: Diamond Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Main Diamond Image */}
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                }}
              >
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/hero_power_electronics-eKZ2diYBiMBnNwog2o4qTT.webp"
                  alt="Power Electronics"
                  className="w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              </div>
              {/* Shadow Layer */}
              <div
                className="absolute inset-0 -z-10 translate-x-6 translate-y-6 bg-primary/10"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                }}
              />
              {/* Accent Corner */}
              <div className="absolute -bottom-8 -right-8 w-20 h-20 border-4 border-primary/20 rotate-45" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs uppercase tracking-wider">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-0.5 h-8 bg-primary/40"
        />
      </motion.div>
    </section>
  );
}
