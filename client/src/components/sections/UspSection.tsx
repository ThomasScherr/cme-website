// CME Website – USP Section
// Design Philosophy: Techno-Industrial Precision
// Grid of unique selling propositions with hover effects

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const viewport = { once: true, margin: '-80px' };

export default function UspSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">Alleinstellungsmerkmale</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">{t.usp.headline}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">{t.usp.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.usp.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative bg-card p-8 border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Number badge */}
              <div className="absolute top-0 left-0 w-10 h-10 bg-primary/8 flex items-center justify-center">
                <span className="text-xs font-bold text-primary" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="pt-6 space-y-3">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
