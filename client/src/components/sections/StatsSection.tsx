// CME Website – Stats Section
// Design: Techno-Industrial Precision – fluid sizing from 375px to 3840px

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const vp = { once: true, margin: '-80px' };

export default function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    { value: '15+', label: t.stats.years },
    { value: '500+', label: t.stats.projects },
    { value: t.stats.standards_val, label: t.stats.standards },
    { value: t.stats.location_val, label: t.stats.location },
  ];

  return (
    <section
      style={{
        background: 'oklch(0.15 0 0)',
        color: '#fff',
        paddingTop: 'clamp(2.5rem, 4vw, 5rem)',
        paddingBottom: 'clamp(2.5rem, 4vw, 5rem)',
      }}
    >
      <div
        style={{
          maxWidth: 'min(1600px, 90vw)',
          margin: '0 auto',
          paddingLeft: 'clamp(1rem, 2vw + 0.5rem, 4rem)',
          paddingRight: 'clamp(1rem, 2vw + 0.5rem, 4rem)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 4rem)',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ textAlign: 'center' }}
            >
              <div
                style={{
                  fontSize: 'var(--text-4xl)',
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 900,
                  color: 'oklch(0.62 0.14 230)',
                  marginBottom: 'clamp(0.35rem, 0.8vw, 0.75rem)',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'rgba(255,255,255,0.50)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
