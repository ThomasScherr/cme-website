import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Zap, Cog, Car, Factory, HeartPulse, Building2 } from 'lucide-react';

const vp = { once: true, margin: '-80px' as const };

const verticals = [
  {
    icon: Zap,
    titleDE: 'Energy & Power Systems',
    titleEN: 'Energy & Power Systems',
    tagsDE: ['PV-Wechselrichter', 'Wallbox', 'BMS', 'DC/DC'],
    tagsEN: ['PV Inverters', 'Wallbox', 'BMS', 'DC/DC'],
    challengeDE: 'Thermik, EMV, SiC/GaN, Serienfähigkeit',
    challengeEN: 'Thermal, EMC, SiC/GaN, series readiness',
    accent: 'bg-amber-50 border-amber-200',
    tagStyle: 'bg-amber-100 text-amber-800',
    iconBg: 'bg-amber-100',
  },
  {
    icon: Cog,
    titleDE: 'Motion & Drive Systems',
    titleEN: 'Motion & Drive Systems',
    tagsDE: ['BLDC/PMSM', 'FOC-Inverter', 'E-Mobility', 'Robotik'],
    tagsEN: ['BLDC/PMSM', 'FOC Inverters', 'E-Mobility', 'Robotics'],
    challengeDE: 'Regelung, Geräusch, Kompaktheit, Robustheit',
    challengeEN: 'Control, noise, compactness, robustness',
    accent: 'bg-blue-50 border-blue-200',
    tagStyle: 'bg-blue-100 text-blue-800',
    iconBg: 'bg-blue-100',
  },
  {
    icon: Car,
    titleDE: 'Automotive & Functional Safety',
    titleEN: 'Automotive & Functional Safety',
    tagsDE: ['ECU', 'Sensorik', 'OBC', 'ADAS'],
    tagsEN: ['ECU', 'Sensors', 'OBC', 'ADAS'],
    challengeDE: 'ISO 26262, ASPICE, AEC-Q, Hochvolt-EMV',
    challengeEN: 'ISO 26262, ASPICE, AEC-Q, HV-EMC',
    accent: 'bg-slate-50 border-slate-200',
    tagStyle: 'bg-slate-100 text-slate-800',
    iconBg: 'bg-slate-100',
  },
  {
    icon: Factory,
    titleDE: 'Industrial Automation & Robotics',
    titleEN: 'Industrial Automation & Robotics',
    tagsDE: ['Maschinensteuerung', 'HMI', 'AGV/AMR', 'Safety'],
    tagsEN: ['Machine Control', 'HMI', 'AGV/AMR', 'Safety'],
    challengeDE: 'Echtzeit, Robustheit, Langlebigkeit, Safety',
    challengeEN: 'Real-time, robustness, longevity, safety',
    accent: 'bg-emerald-50 border-emerald-200',
    tagStyle: 'bg-emerald-100 text-emerald-800',
    iconBg: 'bg-emerald-100',
  },
  {
    icon: HeartPulse,
    titleDE: 'MedTech & Precision Devices',
    titleEN: 'MedTech & Precision Devices',
    tagsDE: ['Embedded-Systeme', 'Präzision', 'Sensorik', 'Diagnostik'],
    tagsEN: ['Embedded Systems', 'Precision', 'Sensors', 'Diagnostics'],
    challengeDE: 'MDR, Zuverlässigkeit, Miniaturisierung, Lifecycle',
    challengeEN: 'MDR, reliability, miniaturization, lifecycle',
    accent: 'bg-rose-50 border-rose-200',
    tagStyle: 'bg-rose-100 text-rose-800',
    iconBg: 'bg-rose-100',
  },
  {
    icon: Building2,
    titleDE: 'Smart Infrastructure & Building',
    titleEN: 'Smart Infrastructure & Building',
    tagsDE: ['Aufzug', 'HVAC', 'Smart Access', 'Gebäudeautomation'],
    tagsEN: ['Elevator', 'HVAC', 'Smart Access', 'Building Automation'],
    challengeDE: 'Langlebigkeit, Safety, Integration, Effizienz',
    challengeEN: 'Longevity, safety, integration, efficiency',
    accent: 'bg-violet-50 border-violet-200',
    tagStyle: 'bg-violet-100 text-violet-800',
    iconBg: 'bg-violet-100',
  },
];

export default function MarketsSection() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

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
            Vertical Solutions
          </p>
          <h2 className="fluid-h2 text-cme-dark" style={{ marginBottom: 'var(--space-gap-xs)' }}>
            {isDE ? 'Branchenspezifische Elektroniklösungen.' : 'Industry-specific electronics solutions.'}
          </h2>
          <p className="fluid-body-lg text-gray-500 max-w-xl">
            {isDE
              ? 'Wir denken in Ihren Systemherausforderungen – nicht in Technologien.'
              : 'We think in your system challenges – not in technologies.'}
          </p>
        </motion.div>

        {/* Vertical Cards Grid – 3x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-sm)' }}>
          {verticals.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`border rounded-xl ${v.accent} hover:shadow-lg transition-all cursor-default group overflow-hidden`}
            >
              <div className="p-5 sm:p-6 flex flex-col h-full">
                {/* Icon + Title */}
                <div className="flex items-center gap-3" style={{ marginBottom: 'clamp(0.5rem, 0.3rem + 0.4vw, 0.75rem)' }}>
                  <div className={`rounded-lg ${v.iconBg} flex items-center justify-center shrink-0`} style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}>
                    <v.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                  </div>
                  <h4 className="fluid-small font-bold text-cme-dark leading-tight">
                    {isDE ? v.titleDE : v.titleEN}
                  </h4>
                </div>

                {/* Application tags */}
                <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 'clamp(0.5rem, 0.3rem + 0.4vw, 0.75rem)' }}>
                  {(isDE ? v.tagsDE : v.tagsEN).map((tag, j) => (
                    <span key={j} className={`inline-block px-2 py-0.5 rounded-full text-[0.65rem] font-medium ${v.tagStyle}`}>
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
            </motion.div>
          ))}
        </div>

        {/* Link to full page */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          className="text-center"
          style={{ marginTop: 'var(--space-gap-md)' }}
        >
          <Link
            href="/maerkte"
            className="inline-flex items-center gap-2 text-cme-blue font-semibold fluid-small hover:gap-3 transition-all"
          >
            {isDE ? 'Alle Verticals entdecken' : 'Explore all verticals'}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
