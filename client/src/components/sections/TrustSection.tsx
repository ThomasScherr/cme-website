import { useLanguage } from '@/contexts/LanguageContext';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

/**
 * Logo data with original color PNGs (200px height source for retina).
 * CSS filter: grayscale(100%) + reduced contrast for consistent muted appearance.
 * On hover, filters are removed to show original colors.
 * Heights are visually balanced relative to each other.
 *
 * Logos with transparent backgrounds (Insight Instruments, W&H) skip the
 * grayscale filter because it grays out the transparent area, making them
 * unrecognizable. They are shown at reduced opacity instead.
 */
const logos: {
  name: string;
  src: string;
  height: number;
  skipGrayscale?: boolean;
}[] = [
  {
    name: 'Toshiba',
    src: `${CDN}/toshiba-color_76aafdeb.png`,
    height: 38,
  },
  {
    name: 'Busch Vacuum Solutions',
    src: `${CDN}/busch-color_19258d80.png`,
    height: 56,
  },
  {
    name: 'elmos Semiconductor',
    src: `${CDN}/elmos-color_c2cc8407.png`,
    height: 52,
  },
  {
    name: 'Kii Audio',
    src: `${CDN}/kii-audio-color_4e611d4e.png`,
    height: 60,
  },
  {
    name: 'Toshiba Railway Europe',
    src: `${CDN}/toshiba-railway-color_375231eb.png`,
    height: 52,
  },
  {
    name: 'GridServ',
    src: `${CDN}/gridserv-color_535bce46.png`,
    height: 48,
  },
  {
    name: 'Insight Instruments',
    src: `${CDN}/insight-instruments-color_07e8f248.png`,
    height: 60,
    skipGrayscale: true,
  },
  {
    name: 'W&H',
    src: `${CDN}/wh-color_1102e8e5.png`,
    height: 60,
    skipGrayscale: true,
  },
  {
    name: 'ROHM Semiconductor',
    src: `${CDN}/rohm-color_3738c32a.png`,
    height: 40,
  },
];

export default function TrustSection() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <section className="py-12 md:py-16 bg-white border-t border-gray-100">
      <div className="container">
        {/* Subtle label */}
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-400 mb-10 font-medium">
          {isDE ? 'Vertrauen führender Unternehmen' : 'Trusted by leading companies'}
        </p>

        {/* Logo grid – eager loading to ensure visibility */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16 lg:gap-x-20">
          {logos.map((logo) => {
            const defaultFilter = logo.skipGrayscale
              ? 'none'
              : 'grayscale(100%) contrast(0.4)';
            const defaultOpacity = logo.skipGrayscale ? '0.55' : '0.7';

            return (
              <div
                key={logo.name}
                className="flex items-center justify-center group cursor-default"
                title={logo.name}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  width={Math.round(logo.height * 2.5)}
                  height={logo.height}
                  style={{
                    height: `${logo.height}px`,
                    width: 'auto',
                    filter: defaultFilter,
                    opacity: parseFloat(defaultOpacity),
                    transition: 'filter 0.3s ease, opacity 0.3s ease',
                  }}
                  className="object-contain"
                  onMouseEnter={(e) => {
                    (e.target as HTMLImageElement).style.filter = 'none';
                    (e.target as HTMLImageElement).style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLImageElement).style.filter = defaultFilter;
                    (e.target as HTMLImageElement).style.opacity = defaultOpacity;
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
