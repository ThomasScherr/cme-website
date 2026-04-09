import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Cpu, Blocks, Factory, ShieldCheck } from 'lucide-react';

interface TrustItem {
  icon: typeof Cpu;
  headlineDE: string;
  headlineEN: string;
  subDE: string;
  subEN: string;
  featured?: boolean;
}

const trustItems: TrustItem[] = [
  {
    icon: Cpu,
    headlineDE: 'Entwicklung & EMS',
    headlineEN: 'Development & EMS',
    subDE: 'Von der Schaltung bis Serienfertigung',
    subEN: 'From circuit design to series production',
  },
  {
    icon: Blocks,
    headlineDE: 'Modular beauftragbar',
    headlineEN: 'Modular commissioning',
    subDE: 'Entwicklung, Validierung, Simulation, Tests, Electronic Manufacturing Services',
    subEN: 'Development, validation, simulation, testing, electronic manufacturing services',
    featured: true,
  },
  {
    icon: Factory,
    headlineDE: 'Design for Manufacturing',
    headlineEN: 'Design for Manufacturing',
    subDE: 'Produzierbare Designs \u2013 mit \u00dcbergabe an den Serienfertiger oder Produktion durch uns',
    subEN: 'Producible designs \u2013 handover to your manufacturer or production by us',
  },
  {
    icon: ShieldCheck,
    headlineDE: 'ISO 9001 & 14001, UL, SPICE, ...',
    headlineEN: 'ISO 9001 & 14001, UL, SPICE, ...',
    subDE: 'Qualitätsgesicherte Prozesse',
    subEN: 'Quality-assured processes',
  },
];

export default function StatsSection() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <section className="bg-[#f6f7f9]" style={{ paddingTop: 'var(--space-section-sm)', paddingBottom: 'var(--space-section-sm)' }}>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, i) => {
            const Icon = item.icon;
            const isLast = i === trustItems.length - 1;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`
                  relative flex flex-col items-center text-center
                  ${!isLast ? 'lg:border-r lg:border-gray-200' : ''}
                  ${i < 2 ? 'sm:border-b lg:border-b-0 sm:border-gray-200' : ''}
                  ${i === 0 ? 'sm:border-r sm:border-gray-200' : ''}
                  ${i === 2 ? 'sm:border-r sm:border-gray-200 lg:border-r lg:border-gray-200' : ''}
                `}
                style={{
                  paddingTop: 'clamp(1.25rem, 0.8rem + 1vw, 2rem)',
                  paddingBottom: 'clamp(1.25rem, 0.8rem + 1vw, 2rem)',
                  paddingLeft: 'clamp(0.75rem, 0.4rem + 0.8vw, 1.5rem)',
                  paddingRight: 'clamp(0.75rem, 0.4rem + 0.8vw, 1.5rem)',
                }}
              >
                {/* Featured subtle background accent */}
                {item.featured && (
                  <div
                    className="absolute inset-x-2 inset-y-1 rounded-xl"
                    style={{ zIndex: 0, backgroundColor: '#f6f7f9' }}
                  />
                )}

                <div className="relative z-10 flex flex-col items-center">
                  {/* Icon */}
                  <div
                    className={`
                      inline-flex items-center justify-center rounded-xl
                      ${item.featured ? 'bg-cme-blue/15 text-cme-blue' : 'bg-cme-blue/8 text-cme-blue'}
                    `}
                    style={{
                      width: item.featured ? 'clamp(3rem, 2.2rem + 1.8vw, 4rem)' : 'clamp(2.75rem, 2rem + 1.6vw, 3.5rem)',
                      height: item.featured ? 'clamp(3rem, 2.2rem + 1.8vw, 4rem)' : 'clamp(2.75rem, 2rem + 1.6vw, 3.5rem)',
                      marginBottom: 'clamp(0.5rem, 0.3rem + 0.4vw, 0.875rem)',
                    }}
                  >
                    <Icon
                      strokeWidth={1.5}
                      style={{
                        width: item.featured ? 'clamp(1.375rem, 1rem + 0.8vw, 1.75rem)' : 'clamp(1.25rem, 0.9rem + 0.7vw, 1.5rem)',
                        height: item.featured ? 'clamp(1.375rem, 1rem + 0.8vw, 1.75rem)' : 'clamp(1.25rem, 0.9rem + 0.7vw, 1.5rem)',
                      }}
                    />
                  </div>

                  {/* Headline */}
                  <h3
                    className={`
                      font-bold text-cme-dark leading-tight
                      ${item.featured ? 'text-cme-blue' : ''}
                    `}
                    style={{
                      fontSize: item.featured
                        ? 'clamp(1.05rem, 0.8rem + 0.6vw, 1.35rem)'
                        : 'clamp(0.95rem, 0.75rem + 0.5vw, 1.2rem)',
                      marginBottom: 'clamp(0.2rem, 0.1rem + 0.2vw, 0.375rem)',
                    }}
                  >
                    {isDE ? item.headlineDE : item.headlineEN}
                  </h3>

                  {/* Subline */}
                  <p
                    className="text-gray-500 leading-snug"
                    style={{
                      fontSize: 'clamp(0.75rem, 0.6rem + 0.35vw, 0.9rem)',
                      maxWidth: '18rem',
                    }}
                  >
                    {isDE ? item.subDE : item.subEN}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
