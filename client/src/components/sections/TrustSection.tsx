import { useLanguage } from '@/contexts/LanguageContext';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

/**
 * Logo data with proportional height values.
 * Heights are relative to keep logos visually balanced –
 * text-heavy logos (Toshiba, ROHM) are shorter, icon logos (Kii, W&H) taller.
 */
const logos = [
  {
    name: 'Toshiba',
    src: `${CDN}/TOSHIBA_Logo_7b7cfaa4.png`,
    height: 22,   // wide text logo – keep compact
  },
  {
    name: 'Busch Vacuum Solutions',
    src: `${CDN}/Lgo-Bush_400x400px_1fa2a3f0.webp`,
    height: 40,
  },
  {
    name: 'elmos Semiconductor',
    src: `${CDN}/elmos_400x400px-Kopie_8ea849d1.webp`,
    height: 38,
  },
  {
    name: 'Kii Audio',
    src: `${CDN}/Logo-Kii-Audio_400x400px_09ae557a.webp`,
    height: 44,
  },
  {
    name: 'Toshiba Railway Europe',
    src: `${CDN}/Toschiba_400x400px_7c897a3f.webp`,
    height: 36,
  },
  {
    name: 'GridServ',
    src: `${CDN}/Logo-GridServ-400x400px_3a0f0ad1.webp`,
    height: 36,
  },
  {
    name: 'Insight Instruments',
    src: `${CDN}/Insight-Instruments-Biofeedback_400x400px_0c59d829.webp`,
    height: 44,
  },
  {
    name: 'W&H',
    src: `${CDN}/Logo_WH-3D_400x400px-Kopie_1f623249.webp`,
    height: 44,
  },
  {
    name: 'ROHM Semiconductor',
    src: `${CDN}/rohm_owler_20160227_011420_original_b893df1b.webp`,
    height: 28,   // wide text logo – keep compact
  },
];

export default function TrustSection() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <section className="py-10 md:py-14 bg-white border-t border-gray-100">
      <div className="container">
        {/* Subtle label */}
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-400 mb-8 font-medium">
          {isDE ? 'Vertrauen führender Unternehmen' : 'Trusted by leading companies'}
        </p>

        {/* Logo grid */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14 lg:gap-x-16">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center"
              title={logo.name}
            >
              <img
                src={logo.src}
                alt={logo.name}
                style={{ height: `${logo.height}px` }}
                className="w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
