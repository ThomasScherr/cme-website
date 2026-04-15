import { useLanguage } from '@/contexts/LanguageContext';
import FadeIn from '@/components/FadeIn';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

/**
 * Logo data with original color PNGs.
 * All logos are displayed in full color at a uniform width of 96px (proportional height).
 * On hover, logos scale up slightly for a subtle interactive effect.
 */
const logos: {
  name: string;
  src: string;
}[] = [
  {
    name: 'Toshiba',
    src: `${CDN}/toshiba-color_76aafdeb.png`,
  },
  {
    name: 'Busch Vacuum Solutions',
    src: `${CDN}/busch-color_19258d80.png`,
  },
  {
    name: 'elmos Semiconductor',
    src: `${CDN}/elmos-color_c2cc8407.png`,
  },
  {
    name: 'Kii Audio',
    src: `${CDN}/kii-audio-color_4e611d4e.png`,
  },
  {
    name: 'Toshiba Railway Europe',
    src: `${CDN}/toshiba-railway-color_375231eb.png`,
  },
  {
    name: 'GridServ',
    src: `${CDN}/gridserv-color_535bce46.png`,
  },
  {
    name: 'Insight Instruments',
    src: `${CDN}/insight-instruments-color_07e8f248.png`,
  },
  {
    name: 'W&H',
    src: `${CDN}/wh-color_1102e8e5.png`,
  },
  {
    name: 'ROHM Semiconductor',
    src: `${CDN}/rohm-color_3738c32a.png`,
  },
];

export default function TrustSection() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <section className="section-pad bg-white border-t border-gray-100">
      <div className="container">
        {/* Subtle label */}
        <FadeIn
          className="text-center"
          style={{ marginBottom: 'var(--space-section-header)' }}
        >
          <p className="fluid-xs uppercase tracking-[0.2em] text-gray-400 font-medium">
            {isDE ? 'Vertrauen führender Unternehmen' : 'Trusted by leading companies'}
          </p>
        </FadeIn>

        {/* Logo grid – max 4 per row, multiple rows for more logos */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-w-5xl mx-auto"
          style={{
            gap: 'clamp(2rem, 1rem + 3vw, 4rem)',
            rowGap: 'clamp(2.5rem, 1.5rem + 3vw, 4.5rem)',
          }}
        >
          {logos.map((logo, i) => (
            <FadeIn
              key={logo.name}
              delay={i * 0.08}
              className="flex items-center justify-center group cursor-default"
              style={{ minHeight: 'clamp(4rem, 3rem + 2vw, 7rem)' }}
            >
              <img
                src={logo.src}
                alt={logo.name}
                title={logo.name}
                style={{
                  width: '96px',
                  height: 'auto',
                  maxWidth: '100%',
                  transition: 'transform 0.3s ease',
                }}
                className="object-contain group-hover:scale-105"
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
