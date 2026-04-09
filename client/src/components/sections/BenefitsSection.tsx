import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  RotateCcw,
  Thermometer,
  Factory,
  Link2,
  CalendarCheck,
  TrendingUp,
} from 'lucide-react';

const vp = { once: true, margin: '-60px' as const };

const benefits = [
  {
    icon: ShieldCheck,
    de: 'Geringeres Entwicklungsrisiko',
    en: 'Lower development risk',
  },
  {
    icon: RotateCcw,
    de: 'Weniger teure Iterationsschleifen',
    en: 'Fewer costly iteration loops',
  },
  {
    icon: Thermometer,
    de: 'Frühzeitige Identifikation thermischer und elektrischer Schwachstellen',
    en: 'Early identification of thermal and electrical weak points',
  },
  {
    icon: Factory,
    de: 'Design-for-Manufacturing von Anfang an',
    en: 'Design-for-manufacturing from day one',
  },
  {
    icon: Link2,
    de: 'Keine Schnittstellenverluste zwischen Entwicklung und Fertigung',
    en: 'No interface losses between development and manufacturing',
  },
  {
    icon: CalendarCheck,
    de: 'Hohe Terminsicherheit',
    en: 'High schedule reliability',
  },
  {
    icon: TrendingUp,
    de: 'Produkte, die langfristig stabil und wirtschaftlich funktionieren',
    en: 'Products that work reliably and economically in the long term',
  },
];

export default function BenefitsSection() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <section className="section-pad bg-white">
      <div className="container max-w-7xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="text-center"
          style={{ marginBottom: 'var(--space-section-header)' }}
        >
          <p className="fluid-xs font-semibold text-cme-blue uppercase tracking-[0.18em]" style={{ marginBottom: 'var(--space-gap-xs)' }}>
            {isDE ? 'Ihr Vorteil durch integrierte Entwicklung & EMS' : 'Your Advantage Through Integrated Development & EMS'}
          </p>
          <h2 className="fluid-h2 text-cme-dark" style={{ marginBottom: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Vom ersten Designschritt bis zur Serie entstehen belastbare, produzierbare Produkte.'
              : 'From the first design step to series production \u2013 robust, manufacturable products.'}
          </h2>
          <p className="fluid-body-lg text-gray-500 max-w-2xl mx-auto">
            {isDE
              ? 'Durch fr\u00fche Simulation, Design-for-Manufacturing, Tests und kurze Wege zwischen Entwicklung und Fertigung reduzieren Sie Risiken, Iterationen und Time-to-Market.'
              : 'Through early simulation, design-for-manufacturing, testing and short paths between development and production, you reduce risks, iterations and time-to-market.'}
          </p>
        </motion.div>

        {/* Benefits Grid: 4+3 layout on large screens, 2 columns on medium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-gap-sm)' }}>
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white border border-gray-100 rounded-xl hover:shadow-lg hover:-translate-y-1 hover:border-cme-blue/20 transition-all duration-300 fluid-card flex flex-col items-center text-center"
              >
                {/* Icon box */}
                <div
                  className="rounded-lg bg-cme-blue-light flex items-center justify-center shrink-0"
                  style={{
                    width: 'var(--icon-box)',
                    height: 'var(--icon-box)',
                    marginBottom: 'var(--space-gap-xs)',
                  }}
                >
                  <Icon
                    style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }}
                    className="text-cme-blue"
                  />
                </div>

                {/* Benefit text */}
                <p className="fluid-small font-medium text-cme-dark leading-snug">
                  {isDE ? benefit.de : benefit.en}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
