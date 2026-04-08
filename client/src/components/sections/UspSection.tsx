// CME Website – USP Section
// Design: Based on CME Company Presentation style
// Clean card grid with optional thermal simulation image

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

// Thermal simulation image from control-motion.de
const SIMULATION_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/thermosimulation-1500x1000-1_77e2afd4.jpg';

const vp = { once: true, margin: '-80px' };

export default function UspSection() {
  const { t } = useLanguage();

  return (
    <section style={{ padding: 'clamp(3rem, 5vw, 6rem) 0', background: 'var(--cme-color-bg-alt, #f5f6f8)' }}>
      <div style={{ maxWidth: 'min(1400px, 90vw)', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 4rem)' }}>
        {/* Two-column header: text left, image right */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-12" style={{ marginBottom: 'clamp(2rem, 4vw, 4rem)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            className="lg:w-[55%]"
          >
            <p style={{ fontSize: 'var(--cme-font-size-xs)', fontWeight: 600, color: 'var(--cme-color-primary)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.75rem' }}>
              Alleinstellungsmerkmale
            </p>
            <h2 style={{ marginBottom: '1rem' }}>{t.usp.headline}</h2>
            <p style={{ fontSize: 'var(--cme-font-size-lg)', color: 'var(--cme-color-gray)', maxWidth: '560px' }}>{t.usp.sub}</p>
          </motion.div>

          {/* Small diagonal image accent */}
          <motion.div
            className="hidden lg:block lg:w-[45%]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div
                style={{
                  position: 'absolute',
                  inset: '-5%',
                  background: 'rgba(33, 150, 211, 0.06)',
                  clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 85%)',
                  WebkitClipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 85%)',
                  zIndex: 0,
                }}
              />
              <img
                src={SIMULATION_IMAGE}
                alt="Thermische Simulation"
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '220px',
                  objectFit: 'cover',
                  objectPosition: 'center 40%',
                  display: 'block',
                  position: 'relative',
                  zIndex: 1,
                  clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 90%)',
                  WebkitClipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 90%)',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* USP Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
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
                padding: 'clamp(1.25rem, 2.5vw, 2rem)',
                border: '1px solid var(--cme-color-border, #dde1e6)',
                overflow: 'hidden',
                transition: 'border-color 0.25s, box-shadow 0.25s',
              }}
              className="group hover:border-[rgba(33,150,211,0.4)] hover:shadow-sm"
            >
              {/* Number badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '40px',
                  height: '40px',
                  background: 'rgba(33,150,211,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 'var(--cme-font-size-xs)', fontWeight: 700, color: 'var(--cme-color-primary)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div style={{ paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h4 style={{ fontSize: 'var(--cme-font-size-lg)', fontWeight: 700 }}>{item.title}</h4>
                <p style={{ fontSize: 'var(--cme-font-size-sm)', color: 'var(--cme-color-gray)', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
              {/* Bottom accent line */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '0%', height: '2px', background: 'var(--cme-color-primary)', transition: 'width 0.4s' }} className="group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
