// CME Website – Markets Section
// Design: Techno-Industrial Precision – fluid sizing from 375px to 3840px

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const EMC_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/emc_chamber-cLJKtFd6QKvgcotSpka2WN.webp';
const vp = { once: true, margin: '-80px' };

export default function MarketsSection() {
  const { t } = useLanguage();

  const sectionPad = 'clamp(3rem, 5vw + 1rem, 9rem)';
  const contentMax = 'min(1600px, 90vw)';
  const contentPad = 'clamp(1rem, 2vw + 0.5rem, 4rem)';

  return (
    <section id="markets" style={{ overflow: 'hidden', background: '#fff' }}>
      <div
        style={{
          maxWidth: contentMax,
          margin: '0 auto',
          padding: `${sectionPad} ${contentPad}`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 'clamp(2rem, 4vw, 5rem)' }}
        >
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'oklch(0.62 0.14 230)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.75rem' }}>
            Branchen
          </p>
          <h2 style={{ marginBottom: '1rem' }}>{t.markets.headline}</h2>
          <p style={{ fontSize: 'var(--text-lg)', color: 'oklch(0.45 0.01 240)', maxWidth: 'clamp(280px, 40vw, 700px)' }}>
            {t.markets.sub}
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(2rem, 4vw, 5rem)',
            alignItems: 'center',
          }}
        >
          {/* Markets Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
              gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            }}
          >
            {t.markets.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                style={{
                  padding: 'clamp(0.75rem, 1.5vw, 1.25rem)',
                  border: '1px solid oklch(0.88 0.005 240)',
                  transition: 'border-color 0.25s, background 0.25s',
                  cursor: 'default',
                }}
                whileHover={{ borderColor: 'oklch(0.62 0.14 230 / 50%)', backgroundColor: 'oklch(0.97 0.001 240)' }}
              >
                <div style={{ width: '7px', height: '7px', background: 'oklch(0.62 0.14 230)', transform: 'rotate(45deg)', marginBottom: '0.75rem' }} />
                <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: '0.35rem', lineHeight: 1.3 }}>{item.title}</h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'oklch(0.45 0.01 240)', lineHeight: 1.55 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* EMC Chamber – rounded diamond, bleeds right */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: 'relative',
                width:  'clamp(260px, 30vw, 520px)',
                height: 'clamp(260px, 30vw, 520px)',
                flexShrink: 0,
                marginRight: 'clamp(-40px, -5vw, -90px)',
              }}
            >
              {/* Main diamond */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '12%',
                  transform: 'rotate(45deg)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  src={EMC_IMAGE}
                  alt="EMC Anechoic Chamber"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '145%',
                    height: '145%',
                    transform: 'translate(-50%, -50%) rotate(-45deg) scale(1.06)',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,15,25,0.38)' }} />
              </div>

              {/* Label overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '18%',
                  left: '12%',
                  color: '#fff',
                  zIndex: 10,
                  pointerEvents: 'none',
                }}
              >
                <p style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.14em', opacity: 0.65, marginBottom: '0.3rem' }}>
                  In-House
                </p>
                <p style={{ fontSize: 'var(--text-xl)', fontFamily: "'Roboto', sans-serif", fontWeight: 700, lineHeight: 1.1 }}>
                  EMV-Messkammer
                </p>
                <p style={{ fontSize: 'var(--text-xs)', opacity: 0.60, marginTop: '0.25rem' }}>
                  Leitungsgebunden & gestrahlt
                </p>
              </div>

              {/* Accent diamond */}
              <div
                style={{
                  position: 'absolute',
                  width: 'clamp(60px, 8vw, 130px)',
                  height: 'clamp(60px, 8vw, 130px)',
                  borderRadius: '12%',
                  transform: 'rotate(45deg)',
                  background: 'rgba(33,150,211,0.12)',
                  bottom: 'clamp(-20px, -3vw, -45px)',
                  left:   'clamp(-15px, -2vw, -30px)',
                  zIndex: -1,
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
