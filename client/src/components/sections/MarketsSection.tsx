import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

/* Map each market card (by index from i18n) to the correct product image */
const CARD_IMAGES: Record<number, string> = {
  0: `${CDN}/drill_f35b523b.png`,       // Leistungselektronik → Akkuschrauber
  1: `${CDN}/ebike_1852d25f.png`,        // Antriebstechnik → E-Bike
  2: `${CDN}/automotive_5dbb4af9.png`,   // Automotive & SPICE → Auto
  3: `${CDN}/robot_32f2ffb4.png`,        // Industrieautomation → Roboter
  4: `${CDN}/dental_d96808d3.png`,       // Medizintechnik → Dental
  5: `${CDN}/pump_a049c023.png`,         // Bahntechnik & Off-Highway → Pumpe (closest match)
  6: `${CDN}/elevator_462326a9.png`,     // Gebäudetechnik → Aufzug
};

const vp = { once: true, margin: '-80px' as const };

export default function MarketsSection() {
  const { t, lang } = useLanguage();

  return (
    <section id="markets" className="relative overflow-hidden bg-white section-pad">
      <div className="container max-w-7xl">
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

        {/* Market Cards Grid – images integrated into cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-gap-sm)' }}>
          {t.markets.items.map((item: { title: string; desc: string }, i: number) => {
            const img = CARD_IMAGES[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border border-gray-200 rounded-xl bg-white hover:border-cme-blue/40 hover:shadow-lg transition-all cursor-default group overflow-hidden"
              >
                {/* Product image area */}
                {img && (
                  <div className="w-full bg-gray-50 flex items-center justify-center p-4" style={{ height: 'clamp(6rem, 4rem + 5vw, 9rem)' }}>
                    <img
                      src={img}
                      alt={item.title}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                {/* Text content */}
                <div className="p-4 sm:p-5">
                  <h4 className="fluid-small font-bold text-cme-dark leading-tight" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.5rem)' }}>
                    {item.title}
                  </h4>
                  <p className="fluid-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
