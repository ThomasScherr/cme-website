// CME Website – Stats Section
// Design Philosophy: Techno-Industrial Precision
// Dark background section with key company numbers

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const viewport = { once: true, margin: '-80px' };

export default function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    { value: '15+', label: t.stats.years },
    { value: '500+', label: t.stats.projects },
    { value: t.stats.standards_val, label: t.stats.standards },
    { value: t.stats.location_val, label: t.stats.location },
  ];

  return (
    <section className="bg-foreground text-background py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2"
                style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-background/55 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
