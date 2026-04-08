import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const ELECTRONICS_GRID = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1281__1920px_d8b02519.jpg';

const vp = { once: true, margin: '-80px' as const };

export default function MarketsSection() {
  const { t } = useLanguage();

  return (
    <section id="markets" className="relative overflow-hidden bg-white section-pad">
      <div className="container max-w-6xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 'var(--space-section-header)' }}
        >
          <p className="fluid-xs font-semibold text-cme-blue uppercase tracking-[0.18em]" style={{ marginBottom: 'var(--space-gap-xs)' }}>
            Branchen
          </p>
          <h2 className="fluid-h2 text-cme-dark" style={{ marginBottom: 'var(--space-gap-xs)' }}>
            {t.markets.headline}
          </h2>
          <p className="fluid-body-lg text-gray-500 max-w-xl">
            {t.markets.sub}
          </p>
        </motion.div>

        {/* Market Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-gap-xs)', marginBottom: 'var(--space-section-header)' }}>
          {t.markets.items.map((item: { title: string; desc: string }, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="border border-gray-200 rounded-lg bg-white hover:border-cme-blue/40 hover:shadow-sm transition-all cursor-default fluid-card"
            >
              <div className="w-2 h-2 bg-cme-blue rotate-45" style={{ marginBottom: 'var(--space-gap-xs)' }} />
              <h4 className="fluid-small font-bold text-cme-dark leading-tight" style={{ marginBottom: 'clamp(0.125rem, 0.05rem + 0.15vw, 0.25rem)' }}>{item.title}</h4>
              <p className="fluid-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Product Image Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-x-4 -inset-y-4 bg-cme-blue/5 rounded-xl -z-10" />
          <img
            src={ELECTRONICS_GRID}
            alt="CME Elektronik-Produktportfolio"
            loading="lazy"
            className="w-full h-auto rounded-lg object-cover object-top"
            style={{ maxHeight: 'clamp(15rem, 10rem + 10vw, 25rem)' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
