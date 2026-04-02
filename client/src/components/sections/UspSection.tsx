// CME Website – USP Section
// Design: Techno-Industrial Precision – fluid sizing from 375px to 3840px

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const vp = { once: true, margin: '-80px' };

export default function UspSection() {
  const { t } = useLanguage();

  const sectionPad = 'clamp(3rem, 5vw + 1rem, 9rem)';
  const contentMax = 'min(1600px, 90vw)';
  const contentPad = 'clamp(1rem, 2vw + 0.5rem, 4rem)';

  return (
    <section style={{ paddingTop: sectionPad, paddingBottom: sectionPad, background: 'var(--cme-color-bg-alt, #f5f6f8)' }}>
      <div style={{ maxWidth: contentMax, margin: '0 auto', paddingLeft: contentPad, paddingRight: contentPad }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 'clamp(2rem, 4vw, 5rem)' }}
        >
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--cme-color-primary)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.75rem' }}>
            Alleinstellungsmerkmale
          </p>
          <h2 style={{ marginBottom: '1rem' }}>{t.usp.headline}</h2>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--cme-color-gray)', maxWidth: 'clamp(280px, 40vw, 700px)' }}>{t.usp.sub}</p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(0.75rem, 1.5vw, 1.5rem)',
          }}
        >
          {t.usp.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{
                position: 'relative',
                background: '#fff',
                padding: 'clamp(1.25rem, 2.5vw, 2.25rem)',
                border: '1px solid var(--cme-color-border, #dde1e6)',
                overflow: 'hidden',
                transition: 'border-color 0.25s, box-shadow 0.25s',
              }}
              whileHover={{ borderColor: 'var(--cme-color-primary-40, rgba(33,150,211,0.4))', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
            >
              {/* Number badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 'clamp(32px, 4vw, 48px)',
                  height: 'clamp(32px, 4vw, 48px)',
                  background: 'rgba(33,150,211,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--cme-color-primary)', fontFamily: 'var(--cme-font-family)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div style={{ paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>{item.title}</h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--cme-color-gray)', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
              {/* Bottom accent line on hover */}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
                style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', background: 'var(--cme-color-primary)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
