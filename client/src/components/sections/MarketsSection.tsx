import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

const INDUSTRY_IMAGES = [
  { img: `${CDN}/automotive_5dbb4af9.png`, de: 'Automotive & SPICE', en: 'Automotive & SPICE' },
  { img: `${CDN}/ebike_1852d25f.png`, de: 'Antriebstechnik', en: 'Drive Technology' },
  { img: `${CDN}/drill_f35b523b.png`, de: 'Leistungselektronik', en: 'Power Electronics' },
  { img: `${CDN}/robot_32f2ffb4.png`, de: 'Industrieautomation', en: 'Industrial Automation' },
  { img: `${CDN}/dental_d96808d3.png`, de: 'Medizintechnik', en: 'Medical Technology' },
  { img: `${CDN}/pump_a049c023.png`, de: 'Pumpen & HVAC', en: 'Pumps & HVAC' },
  { img: `${CDN}/elevator_462326a9.png`, de: 'Gebäudetechnik', en: 'Building Technology' },
];

const vp = { once: true, margin: '-80px' as const };

export default function MarketsSection() {
  const { t, lang } = useLanguage();
  const isDE = lang === 'de';

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

        {/* Industry Product Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7" style={{ gap: 'var(--space-gap-sm)' }}>
            {INDUSTRY_IMAGES.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-full aspect-square rounded-xl bg-gray-50 border border-gray-100 p-3 flex items-center justify-center group-hover:border-cme-blue/30 group-hover:shadow-md transition-all">
                  <img
                    src={item.img}
                    alt={isDE ? item.de : item.en}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="fluid-xs text-gray-600 font-medium mt-2">{isDE ? item.de : item.en}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
