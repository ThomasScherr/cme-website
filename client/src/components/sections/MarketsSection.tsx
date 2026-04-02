// CME Website – Markets Section
// Design Philosophy: Techno-Industrial Precision
// Grid of markets with EMC chamber image in rounded diamond, bleeding right

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const EMC_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/emc_chamber-cLJKtFd6QKvgcotSpka2WN.webp';
const viewport = { once: true, margin: '-80px' };

export default function MarketsSection() {
  const { t } = useLanguage();

  return (
    <section id="markets" className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-3">Branchen</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4">{t.markets.headline}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">{t.markets.sub}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Markets Grid */}
          <div className="grid grid-cols-2 gap-4">
            {t.markets.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group p-5 border border-border hover:border-primary/40 hover:bg-muted/30 transition-all duration-300"
              >
                <div className="w-2 h-2 bg-primary rotate-45 mb-3" />
                <h3 className="text-sm font-bold mb-1 leading-snug">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* EMC Chamber – rounded diamond, bleeding right */}
          <div className="relative flex justify-end">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ marginRight: 'clamp(-40px, -5vw, -80px)', position: 'relative' }}
            >
              {/* Main diamond */}
              <div
                style={{
                  width: '380px',
                  height: '380px',
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
                    width: '540px',
                    height: '540px',
                    transform: 'translate(-50%, -50%) rotate(-45deg)',
                    objectFit: 'cover',
                  }}
                />
                {/* Dark overlay for text legibility */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(20,20,30,0.35)',
                  }}
                />
              </div>

              {/* Text label – positioned over diamond */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '80px',
                  left: '50px',
                  transform: 'rotate(0deg)',
                  color: 'white',
                  zIndex: 10,
                }}
              >
                <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.7, marginBottom: '4px' }}>
                  In-House
                </p>
                <p style={{ fontSize: '20px', fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 700, lineHeight: 1.1 }}>
                  EMV-Messkammer
                </p>
                <p style={{ fontSize: '12px', opacity: 0.65, marginTop: '4px' }}>
                  Leitungsgebunden & gestrahlt
                </p>
              </div>

              {/* Accent diamond */}
              <div
                style={{
                  position: 'absolute',
                  width: '120px',
                  height: '120px',
                  borderRadius: '12%',
                  transform: 'rotate(45deg)',
                  background: 'rgba(33, 150, 211, 0.12)',
                  bottom: '-40px',
                  left: '-30px',
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
