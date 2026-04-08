// CME Website – Markets Section
// Design: Based on CME Company Presentation
// Uses product illustration strip from presentation page 12
// Layout: Headline + cards grid, with a product image strip below

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

// Real CME facility photos from control-motion.de
const MARKETS_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1148__1920px_1cc154ec.jpg'; // PCB assembly close-up

// Production overview showing assembled electronics
const ELECTRONICS_GRID = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1281__1920px_d8b02519.jpg'; // PCB assembly line

const vp = { once: true, margin: '-80px' };

export default function MarketsSection() {
  const { t } = useLanguage();

  return (
    <section id="markets" style={{ position: 'relative', overflow: 'hidden', background: '#fff' }}>
      <div style={{
        maxWidth: 'min(1400px, 90vw)',
        margin: '0 auto',
        paddingTop: 'clamp(3rem, 5vw, 6rem)',
        paddingBottom: 'clamp(2rem, 4vw, 4rem)',
        paddingLeft: 'clamp(1rem, 3vw, 4rem)',
        paddingRight: 'clamp(1rem, 3vw, 4rem)',
      }}>
        {/* ── Headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 'clamp(2rem, 4vw, 4rem)' }}
        >
          <p style={{ fontSize: 'var(--cme-font-size-xs)', fontWeight: 600, color: 'var(--cme-color-primary)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.75rem' }}>
            Branchen
          </p>
          <h2 style={{ marginBottom: '1rem' }}>{t.markets.headline}</h2>
          <p className="max-w-full md:max-w-[600px]" style={{ fontSize: 'var(--cme-font-size-lg)', color: 'var(--cme-color-gray)' }}>
            {t.markets.sub}
          </p>
        </motion.div>

        {/* ── Market Cards Grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
            gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            marginBottom: 'clamp(2rem, 4vw, 4rem)',
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
                padding: 'clamp(1rem, 2vw, 1.5rem)',
                border: '1px solid var(--cme-color-border, #dde1e6)',
                transition: 'border-color 0.25s, box-shadow 0.25s',
                cursor: 'default',
                background: '#fff',
              }}
              className="hover:border-[rgba(33,150,211,0.4)] hover:shadow-sm"
            >
              <div style={{ width: '7px', height: '7px', background: 'var(--cme-color-primary)', transform: 'rotate(45deg)', marginBottom: '0.75rem' }} />
              <h4 style={{ fontSize: 'var(--cme-font-size-sm)', fontWeight: 700, marginBottom: '0.35rem', lineHeight: 1.3 }}>{item.title}</h4>
              <p style={{ fontSize: 'var(--cme-font-size-xs)', color: 'var(--cme-color-gray)', lineHeight: 1.55 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Product Image Strip from Presentation ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Light blue accent behind */}
          <div
            style={{
              position: 'absolute',
              top: '-8%',
              left: '-2%',
              right: '-2%',
              bottom: '-8%',
              background: 'rgba(33, 150, 211, 0.05)',
              borderRadius: '4px',
              zIndex: 0,
            }}
          />
          <img
            src={ELECTRONICS_GRID}
            alt="CME Elektronik-Produktportfolio"
            loading="lazy"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '400px',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              position: 'relative',
              zIndex: 1,
              borderRadius: '2px',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
