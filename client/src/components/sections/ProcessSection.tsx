// CME Website – Process Section
// Design: Techno-Industrial Precision – fluid sizing from 375px to 3840px

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const vp = { once: true, margin: '-80px' };

export default function ProcessSection() {
  const { t } = useLanguage();

  const sectionPad = 'clamp(3rem, 5vw + 1rem, 9rem)';
  const contentMax = 'min(1600px, 90vw)';
  const contentPad = 'clamp(1rem, 2vw + 0.5rem, 4rem)';

  return (
    <section
      id="process"
      style={{
        paddingTop: 'var(--cme-section-process-pt, 80px)',
        paddingBottom: 'var(--cme-section-process-pb, 80px)',
        background: 'var(--cme-color-dark)',
        color: '#fff',
      }}
    >
      <div style={{ maxWidth: contentMax, margin: '0 auto', paddingLeft: contentPad, paddingRight: contentPad }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 'clamp(2rem, 4vw, 5rem)' }}
        >
          <p style={{ fontSize: 'var(--cme-font-size-xs)', fontWeight: 500, color: 'var(--cme-color-primary)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.75rem' }}>
            Prozess
          </p>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>{t.process.headline}</h2>
          <p style={{ fontSize: 'var(--cme-font-size-lg)', color: 'rgba(255,255,255,0.55)', maxWidth: 'clamp(280px, 40vw, 700px)' }}>{t.process.sub}</p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
          }}
        >
          {t.process.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
                <div
                  style={{
                    flexShrink: 0,
                    width: 'clamp(36px, 4vw, 56px)',
                    height: 'clamp(36px, 4vw, 56px)',
                    background: 'var(--cme-color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 'var(--cme-font-size-sm)',
                    fontWeight: 700,
                    fontFamily: 'var(--cme-font-family)',
                  }}
                >
                  {step.num}
                </div>
                <div style={{ paddingTop: '0.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <h4 style={{ fontSize: 'var(--cme-font-size-lg)', fontWeight: 700, color: '#fff' }}>{step.title}</h4>
                  <p style={{ fontSize: 'var(--cme-font-size-sm)', color: 'rgba(255,255,255,0.50)', lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
