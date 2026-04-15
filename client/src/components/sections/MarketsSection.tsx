import { useLanguage } from '@/contexts/LanguageContext';
import FadeIn from '@/components/FadeIn';
import { Link } from 'wouter';
import { ArrowRight, Zap, Cog, Car, Factory, HeartPulse, Building2 } from 'lucide-react';

const markets = [
  {
    icon: Zap,
    titleDE: 'Energy & Power Systems',
    titleEN: 'Energy & Power Systems',
    tagsDE: ['PV-Wechselrichter', 'Wallbox & Ladesäulen', 'Onboard-Charger', 'BMS', 'DC/DC'],
    tagsEN: ['PV Inverters', 'Wallbox & Charging Stations', 'Onboard Charger', 'BMS', 'DC/DC'],
    challengeDE: 'Thermik, EMV, SiC/GaN, Serienfähigkeit',
    challengeEN: 'Thermal, EMC, SiC/GaN, series readiness',
  },
  {
    icon: Cog,
    titleDE: 'Motion & Drive Systems',
    titleEN: 'Motion & Drive Systems',
    tagsDE: ['BLDC/PMSM', 'FOC-Inverter', 'Aktuatoren', 'Servoantriebe', 'E-Mobility'],
    tagsEN: ['BLDC/PMSM', 'FOC Inverters', 'Actuators', 'Servo Drives', 'E-Mobility'],
    challengeDE: 'Regelung, Geräusch, Kompaktheit, Robustheit',
    challengeEN: 'Control, noise, compactness, robustness',
  },
  {
    icon: Car,
    titleDE: 'Automotive & Functional Safety',
    titleEN: 'Automotive & Functional Safety',
    tagsDE: ['Pumpen & Kompressoren', 'HVAC & Steller', 'Onboard-Charging', 'Fuel-Cell-Steuerung', 'Wischermotoren'],
    tagsEN: ['Pumps & Compressors', 'HVAC & Actuators', 'Onboard Charging', 'Fuel Cell Control', 'Wiper Motors'],
    challengeDE: 'ISO 26262, ASPICE, AEC-Q, Hochvolt-EMV',
    challengeEN: 'ISO 26262, ASPICE, AEC-Q, HV-EMC',
  },
  {
    icon: Factory,
    titleDE: 'Industrial Automation & Robotics',
    titleEN: 'Industrial Automation & Robotics',
    tagsDE: ['Maschinensteuerung', 'Bedienpanels', 'Fahrerlose Transportsysteme', 'Safety'],
    tagsEN: ['Machine Control', 'Operator Panels', 'Automated Guided Vehicles', 'Safety'],
    challengeDE: 'Echtzeit, Robustheit, Langlebigkeit, Safety',
    challengeEN: 'Real-time, robustness, longevity, safety',
  },
  {
    icon: HeartPulse,
    titleDE: 'MedTech & Precision Devices',
    titleEN: 'MedTech & Precision Devices',
    tagsDE: ['Embedded-Systeme', 'Präzision', 'Sensorik', 'Diagnostik'],
    tagsEN: ['Embedded Systems', 'Precision', 'Sensors', 'Diagnostics'],
    challengeDE: 'MDR, Zuverlässigkeit, Miniaturisierung, Lifecycle',
    challengeEN: 'MDR, reliability, miniaturization, lifecycle',
  },
  {
    icon: Building2,
    titleDE: 'Smart Infrastructure & Building',
    titleEN: 'Smart Infrastructure & Building',
    tagsDE: ['Zutrittskontrolle', 'Gebäudeautomation', 'Lichtsteuerung', 'Smart Metering'],
    tagsEN: ['Access Control', 'Building Automation', 'Lighting Control', 'Smart Metering'],
    challengeDE: 'Langlebigkeit, Safety, Integration, Effizienz',
    challengeEN: 'Longevity, safety, integration, efficiency',
  },
];

interface MarketsSectionProps {
  onCardClick?: (topic: string) => void;
}

export default function MarketsSection({ onCardClick }: MarketsSectionProps) {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <section id="markets" className="relative overflow-hidden bg-white section-pad">
      <div className="container max-w-7xl">
        {/* Headline */}
        <FadeIn
          style={{ marginBottom: 'var(--space-section-header)' }}
        >
          <p className="fluid-xs font-semibold text-cme-blue uppercase tracking-[0.18em]" style={{ marginBottom: 'var(--space-gap-xs)' }}>
            {isDE ? 'Branchen & Anwendungsfelder' : 'Industries & Applications'}
          </p>
          <h2 className="fluid-h2 text-cme-dark" style={{ marginBottom: 'var(--space-gap-xs)' }}>
            {isDE ? 'Branchenspezifische Elektroniklösungen.' : 'Industry-specific electronics solutions.'}
          </h2>
          <p className="fluid-body-lg text-gray-500">
            {isDE
              ? 'Wir denken in Ihren Systemherausforderungen – nicht in Technologien.'
              : 'We think in your system challenges – not in technologies.'}
          </p>
        </FadeIn>

        {/* Market Cards Grid – 3x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-sm)' }}>
          {markets.map((v, i) => {
            const title = isDE ? v.titleDE : v.titleEN;
            return (
              <FadeIn
                key={i}
                delay={i * 0.06}
                className={`bg-white border border-gray-100 rounded-xl hover:shadow-lg hover:-translate-y-1 hover:border-cme-blue/20 transition-all duration-300 group overflow-hidden ${onCardClick ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div
                  className="fluid-card flex flex-col h-full"
                  onClick={onCardClick ? () => onCardClick(title) : undefined}
                  role={onCardClick ? 'button' : undefined}
                  tabIndex={onCardClick ? 0 : undefined}
                  onKeyDown={onCardClick ? (e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onCardClick(title);
                    }
                  } : undefined}
                >
                  {/* Icon + Title */}
                  <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)', marginBottom: 'clamp(0.5rem, 0.3rem + 0.4vw, 0.75rem)' }}>
                    <div
                      className="rounded-lg bg-cme-blue-light flex items-center justify-center shrink-0"
                      style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}
                    >
                      <v.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                    </div>
                    <h4 className="fluid-small font-bold text-cme-dark leading-tight">
                      {title}
                    </h4>
                  </div>

                  {/* Application tags */}
                  <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 'clamp(0.5rem, 0.3rem + 0.4vw, 0.75rem)' }}>
                    {(isDE ? v.tagsDE : v.tagsEN).map((tag, j) => (
                      <span key={j} className="inline-block px-2 py-0.5 rounded-full text-[0.65rem] font-medium border" style={{ backgroundColor: '#ffffff', color: '#4f4f4f', borderWidth: '1px', borderColor: '#bdbdbd' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Challenge line */}
                  <p className="fluid-xs text-gray-500 leading-relaxed flex-1">
                    <span className="font-semibold text-cme-dark">{isDE ? 'Herausforderungen:' : 'Challenges:'}</span>{' '}
                    {isDE ? v.challengeDE : v.challengeEN}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Link to full page */}
        <FadeIn
          className="text-center"
          style={{ marginTop: 'var(--space-gap-md)' }}
        >
          <Link
            href="/maerkte"
            className="inline-flex items-center gap-2 text-cme-blue font-semibold fluid-small hover:gap-3 transition-all"
          >
            {isDE ? 'Branchen & Anwendungsfelder im Detail' : 'Industries & applications in detail'}
            <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
