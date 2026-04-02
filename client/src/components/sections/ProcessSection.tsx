// CME Website – Process Section
// Design Philosophy: Techno-Industrial Precision
// Dark background with numbered process steps

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const viewport = { once: true, margin: '-80px' };

export default function ProcessSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">Prozess</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">{t.process.headline}</h2>
          <p className="text-base md:text-lg text-background/60 max-w-2xl">{t.process.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.process.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold"
                  style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
                >
                  {step.num}
                </div>
                <div className="space-y-2 pt-1">
                  <h3 className="text-lg font-bold text-background">{step.title}</h3>
                  <p className="text-sm text-background/55 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
