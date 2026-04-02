// CME Website – Markets Section
// Design: Techno-Industrial Precision – fluid sizing from 375px to 3840px
// Diamond uses SVG clipPath – guaranteed full fill, no white corners
// Diamond is position:absolute so it floats independently of section padding

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import DiamondImage from '@/components/DiamondImage';

const EMC_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/emc_chamber-cLJKtFd6QKvgcotSpka2WN.webp';
const vp = { once: true, margin: '-80px' };

export default function MarketsSection() {
  const { t } = useLanguage();

  const contentMax = 'min(1600px, 90vw)';
  const contentPad = 'clamp(1rem, 2vw + 0.5rem, 4rem)';

  return (
    <section id="markets" style={{ position: 'relative', overflow: 'visible', background: '#fff' }}>
      {/* Diamond – absolute positioned, floats independently of section padding */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: `translateY(calc(-50% + var(--cme-diamond-markets-offset-y, 0px))) translateX(var(--cme-diamond-markets-offset-x, 28vw))`,
        zIndex: 1,
        pointerEvents: 'none',
      }}>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <DiamondImage
            src={EMC_IMAGE}
            alt="EMC Anechoic Chamber"
            size="var(--cme-diamond-markets-size, 42vw)"
            overlayColor="rgba(10,15,25,0.35)"
            extraRotate="var(--cme-diamond-markets-rotate, 0deg)"
          />
        </motion.div>

        {/* Label overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '15%',
            color: '#fff',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <p style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.14em', opacity: 0.65, marginBottom: '0.3rem' }}>
            In-House
          </p>
          <p style={{ fontSize: 'var(--text-xl)', fontFamily: 'var(--cme-font-family)', fontWeight: 700, lineHeight: 1.1 }}>
            EMV-Messkammer
          </p>
          <p style={{ fontSize: 'var(--text-xs)', opacity: 0.60, marginTop: '0.25rem' }}>
            Leitungsgebunden & gestrahlt
          </p>
        </div>
      </div>

      {/* Content – text and cards, controlled by section padding */}
      <div style={{
        maxWidth: contentMax,
        margin: '0 auto',
        paddingTop: 'var(--cme-section-markets-pt, 80px)',
        paddingBottom: 'var(--cme-section-markets-pb, 80px)',
        paddingLeft: contentPad,
        paddingRight: contentPad,
      }}>
        {/* ── Headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 'clamp(2rem, 4vw, 5rem)' }}
        >
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--cme-color-primary)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.75rem' }}>
            Branchen
          </p>
          <h2 style={{ marginBottom: '1rem' }}>{t.markets.headline}</h2>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--cme-color-gray)', maxWidth: 'clamp(280px, 40vw, 700px)' }}>
            {t.markets.sub}
          </p>
        </motion.div>

        {/* Markets Grid – constrained to left ~60% so diamond doesn't overlap */}
        <div style={{ maxWidth: '60%' }}>
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
                  border: '1px solid var(--cme-color-border, #dde1e6)',
                  transition: 'border-color 0.25s, background 0.25s',
                  cursor: 'default',
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(4px)',
                }}
                whileHover={{ borderColor: 'var(--cme-color-primary-50, rgba(33,150,211,0.5))', backgroundColor: 'var(--cme-color-bg-alt, #f5f6f8)' }}
              >
                <div style={{ width: '7px', height: '7px', background: 'var(--cme-color-primary)', transform: 'rotate(45deg)', marginBottom: '0.75rem' }} />
                <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: '0.35rem', lineHeight: 1.3 }}>{item.title}</h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--cme-color-gray)', lineHeight: 1.55 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
