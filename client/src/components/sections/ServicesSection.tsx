// CME Website – Services Section
// Design Philosophy: Techno-Industrial Precision
// Three service pillars with parallelogram images and diamond accents

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const IMAGES = {
  dev: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/thermal_simulation-FM5thvnf8JFwwqX8DK9CYp.webp',
  mfg: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/ems_production_line-F9qYf8S6uGr7YzEJkSPZgx.webp',
  lifecycle: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/hero_motor_control-bLizo3WgKjkGLGM7m7b8RD.webp',
};

const viewport = { once: true, margin: '-80px' };

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">Services</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">{t.services.headline}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">{t.services.sub}</p>
        </motion.div>

        {/* Service 1: Development */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div
              className="relative w-full aspect-[4/3] overflow-hidden"
              style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}
            >
              <img src={IMAGES.dev} alt={t.services.dev_title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-4 border-primary/20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-3">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1">01</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Entwicklung</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl">{t.services.dev_title}</h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{t.services.dev_desc}</p>
            <ul className="space-y-2">
              {t.services.dev_items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-1.5 h-1.5 bg-primary rotate-45 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Service 2: Manufacturing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5 }}
            className="space-y-5 lg:order-1"
          >
            <div className="inline-flex items-center gap-3">
              <span className="bg-foreground text-background text-xs font-bold px-3 py-1">02</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">EMS Fertigung</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl">{t.services.mfg_title}</h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{t.services.mfg_desc}</p>
            <ul className="space-y-2">
              {t.services.mfg_items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-1.5 h-1.5 bg-foreground rotate-45 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative lg:order-2"
          >
            <div
              className="relative w-full aspect-[4/3] overflow-hidden"
              style={{ clipPath: 'polygon(0% 0%, 92% 0%, 100% 100%, 8% 100%)' }}
            >
              <img src={IMAGES.mfg} alt={t.services.mfg_title} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-4 -left-4 w-20 h-20 border-4 border-foreground/15" />
          </motion.div>
        </motion.div>

        {/* Service 3: Lifecycle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
          className="relative bg-muted/30 p-8 md:p-12 overflow-hidden"
        >
          {/* Background diamond decoration */}
          <div
            className="absolute top-0 right-0 w-64 h-64 opacity-5 translate-x-16 -translate-y-16"
            style={{
              background: 'oklch(0.62 0.14 230)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            }}
          />
          <div className="grid lg:grid-cols-2 gap-12 items-center relative">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3">
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1">03</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Lifecycle</span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl">{t.services.lifecycle_title}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{t.services.lifecycle_desc}</p>
              <ul className="space-y-2">
                {t.services.lifecycle_items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rotate-45 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative w-64 h-64">
                <div
                  className="w-full h-full overflow-hidden"
                  style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                >
                  <img src={IMAGES.lifecycle} alt={t.services.lifecycle_title} className="w-full h-full object-cover scale-125" />
                </div>
                <div
                  className="absolute inset-0 -z-10 translate-x-3 translate-y-3 bg-primary/15"
                  style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
