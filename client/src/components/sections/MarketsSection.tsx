// CME Website – Markets Section
// Design Philosophy: Techno-Industrial Precision
// Grid of markets with EMC chamber image

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const EMC_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/emc_chamber-cLJKtFd6QKvgcotSpka2WN.webp';
const viewport = { once: true, margin: '-80px' };

export default function MarketsSection() {
  const { t } = useLanguage();

  return (
    <section id="markets" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">Branchen</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">{t.markets.headline}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">{t.markets.sub}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Markets Grid */}
          <div className="grid grid-cols-2 gap-4">
            {t.markets.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group p-5 border border-border hover:border-primary/40 hover:bg-muted/30 transition-all duration-300"
              >
                <div className="w-2 h-2 bg-primary rotate-45 mb-3" />
                <h3 className="text-sm font-bold mb-1 leading-snug">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* EMC Chamber Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div
              className="w-full aspect-[4/3] overflow-hidden relative"
              style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 92% 100%, 0% 100%)' }}
            >
              <img
                src={EMC_IMAGE}
                alt="EMC Anechoic Chamber"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
            </div>
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-xs uppercase tracking-widest text-white/60 mb-1">In-House</p>
              <p className="text-xl font-bold" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>EMV-Messkammer</p>
              <p className="text-sm text-white/70 mt-1">Leitungsgebunden & gestrahlt</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
