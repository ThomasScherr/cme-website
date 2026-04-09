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
    descDE: 'Durch Simulation, Pre-Tests und fertigungsgerechtes Design werden Fehler früh erkannt, bevor sie kostenkritisch werden.',
    descEN: 'Through simulation, pre-tests and design-for-manufacturing, errors are detected early – before they become cost-critical.',
  },
  {
    icon: RotateCcw,
    de: 'Weniger teure Iterationsschleifen',
    en: 'Fewer costly iteration loops',
    descDE: 'Abgestimmte Entwicklungs- und Fertigungsprozesse vermeiden unnötige Redesigns und verkürzen den Weg zur Serie.',
    descEN: 'Aligned development and manufacturing processes avoid unnecessary redesigns and shorten the path to series production.',
  },
  {
    icon: Thermometer,
    de: 'Frühzeitige Identifikation thermischer und elektrischer Schwachstellen',
    en: 'Early identification of thermal and electrical weak points',
    descDE: 'Thermische Simulationen und elektrische Analysen decken kritische Punkte auf, bevor der erste Prototyp entsteht.',
    descEN: 'Thermal simulations and electrical analyses reveal critical points before the first prototype is built.',
  },
  {
    icon: Factory,
    de: 'Design-for-Manufacturing von Anfang an',
    en: 'Design-for-manufacturing from day one',
    descDE: 'Jedes Schaltungsdesign wird von Beginn an auf Produzierbarkeit, Testbarkeit und Serienfähigkeit ausgelegt.',
    descEN: 'Every circuit design is optimised for producibility, testability and series capability from the start.',
  },
  {
    icon: Link2,
    de: 'Keine Schnittstellenverluste zwischen Entwicklung und Fertigung',
    en: 'No interface losses between development and manufacturing',
    descDE: 'Entwicklung und EMS unter einem Dach – ohne Informationsverluste, Abstimmungsschleifen oder Missverständnisse.',
    descEN: 'Development and EMS under one roof – without information loss, coordination loops or misunderstandings.',
  },
  {
    icon: CalendarCheck,
    de: 'Hohe Terminsicherheit',
    en: 'High schedule reliability',
    descDE: 'Kurze Wege, klare Verantwortlichkeiten und integrierte Prozesse sorgen für verlässliche Meilensteine.',
    descEN: 'Short paths, clear responsibilities and integrated processes ensure reliable milestones.',
  },
  {
    icon: TrendingUp,
    de: 'Produkte, die langfristig stabil und wirtschaftlich funktionieren',
    en: 'Products that work reliably and economically in the long term',
    descDE: 'Robuste Designs, validierte Fertigungsprozesse und durchdachtes Lifecycle-Management sichern die Langzeitstabilität.',
    descEN: 'Robust designs, validated manufacturing processes and thoughtful lifecycle management ensure long-term stability.',
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
          <p className="fluid-body-lg text-gray-500 max-w-3xl mx-auto">
            {isDE
              ? 'Durch frühe Simulation, Design-for-Manufacturing, Tests und kurze Wege zwischen Entwicklung und Fertigung reduzieren Sie Risiken, Iterationen und Time-to-Market.'
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

                {/* Benefit title */}
                <p className="fluid-small text-cme-dark leading-snug" style={{ fontWeight: 700, marginBottom: '0.5rem' }}>
                  {isDE ? benefit.de : benefit.en}
                </p>

                {/* Benefit description */}
                <p className="text-gray-500 leading-relaxed" style={{ fontSize: 'clamp(0.72rem, 0.6rem + 0.3vw, 0.85rem)' }}>
                  {isDE ? benefit.descDE : benefit.descEN}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
