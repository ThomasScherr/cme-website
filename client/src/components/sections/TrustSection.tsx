import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

/**
 * Logo data with original color PNGs (200px height source for retina).
 * CSS filter: grayscale(100%) + reduced contrast for consistent muted appearance.
 * On hover, filters are removed to show original colors.
 * Heights are visually balanced relative to each other – enlarged for prominence.
 *
 * Logos with transparent backgrounds (Insight Instruments, W&H) skip the
 * grayscale filter because it grays out the transparent area, making them
 * unrecognizable. They are shown at reduced opacity instead.
 */
const logos: {
  name: string;
  src: string;
  /** Display height in px – enlarged for better visibility */
  height: number;
  skipGrayscale?: boolean;
}[] = [
  {
    name: 'Toshiba',
    src: `${CDN}/toshiba-color_76aafdeb.png`,
    height: 64,
  },
  {
    name: 'Busch Vacuum Solutions',
    src: `${CDN}/busch-color_19258d80.png`,
    height: 90,
  },
  {
    name: 'elmos Semiconductor',
    src: `${CDN}/elmos-color_c2cc8407.png`,
    height: 80,
  },
  {
    name: 'Kii Audio',
    src: `${CDN}/kii-audio-color_4e611d4e.png`,
    height: 90,
  },
  {
    name: 'Toshiba Railway Europe',
    src: `${CDN}/toshiba-railway-color_375231eb.png`,
    height: 80,
  },
  {
    name: 'GridServ',
    src: `${CDN}/gridserv-color_535bce46.png`,
    height: 76,
  },
  {
    name: 'Insight Instruments',
    src: `${CDN}/insight-instruments-color_07e8f248.png`,
    height: 90,
    skipGrayscale: true,
  },
  {
    name: 'W&H',
    src: `${CDN}/wh-color_1102e8e5.png`,
    height: 90,
    skipGrayscale: true,
  },
  {
    name: 'ROHM Semiconductor',
    src: `${CDN}/rohm-color_3738c32a.png`,
    height: 64,
  },
];

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export default function TrustSection() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <section className="section-pad bg-white border-t border-gray-100">
      <div className="container">
        {/* Subtle label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="text-center fluid-xs uppercase tracking-[0.2em] text-gray-400 font-medium"
          style={{ marginBottom: 'var(--space-section-header)' }}
        >
          {isDE ? 'Vertrauen führender Unternehmen' : 'Trusted by leading companies'}
        </motion.p>

        {/* Logo grid – max 4 per row, multiple rows for more logos.
            viewport amount: 0.15 means animation triggers when 15% of the grid
            is visible, so logos don't appear immediately at the top edge. */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-w-5xl mx-auto"
          style={{
            gap: 'clamp(2rem, 1rem + 3vw, 4rem)',
            rowGap: 'clamp(2.5rem, 1.5rem + 3vw, 4.5rem)',
          }}
        >
          {logos.map((logo) => {
            const defaultFilter = logo.skipGrayscale
              ? 'none'
              : 'grayscale(100%) contrast(0.4)';
            const defaultOpacity = logo.skipGrayscale ? '0.55' : '0.7';

            return (
              <motion.div
                key={logo.name}
                variants={logoVariants}
                className="flex items-center justify-center group cursor-default"
                style={{ minHeight: 'clamp(4rem, 3rem + 2vw, 7rem)' }}
                title={logo.name}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  width={Math.round(logo.height * 2.5)}
                  height={logo.height}
                  style={{
                    height: `clamp(${Math.round(logo.height * 0.65)}px, ${Math.round(logo.height * 0.5)}px + 1.5vw, ${logo.height}px)`,
                    width: 'auto',
                    maxWidth: '100%',
                    filter: defaultFilter,
                    opacity: parseFloat(defaultOpacity),
                    transition: 'filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease',
                  }}
                  className="object-contain"
                  onMouseEnter={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.filter = 'none';
                    el.style.opacity = '1';
                    el.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.filter = defaultFilter;
                    el.style.opacity = defaultOpacity;
                    el.style.transform = 'scale(1)';
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
