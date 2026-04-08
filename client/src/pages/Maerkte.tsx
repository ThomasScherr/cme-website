import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Cog, Car, Factory, HeartPulse, Building2 } from 'lucide-react';

/* ──────────────────────────────────────────────────────────────
   6 Strategic Verticals – each with 3 layers:
   1. Vertical / Industry
   2. Typical system applications
   3. CME-relevant technical challenges
   ────────────────────────────────────────────────────────────── */

interface Vertical {
  icon: React.ElementType;
  slug: string;
  titleDE: string;
  titleEN: string;
  taglineDE: string;
  taglineEN: string;
  applicationsDE: string[];
  applicationsEN: string[];
  challengesDE: string[];
  challengesEN: string[];
}

const verticals: Vertical[] = [
  {
    icon: Zap,
    slug: 'energy',
    titleDE: 'Energy & Power Systems',
    titleEN: 'Energy & Power Systems',
    taglineDE: 'Elektronik für die Energiewende – vom Wechselrichter bis zur Wallbox.',
    taglineEN: 'Electronics for the energy transition – from inverters to wallboxes.',
    applicationsDE: [
      'PV-Wechselrichter & String-Inverter',
      'DC/DC- & AC/DC-Wandler',
      'Wallbox & Ladeinfrastruktur',
      'Batteriesysteme & BMS',
      'Smart Charging & V2G',
      'Energiespeicher & Netzintegration',
    ],
    applicationsEN: [
      'PV inverters & string inverters',
      'DC/DC & AC/DC converters',
      'Wallbox & charging infrastructure',
      'Battery systems & BMS',
      'Smart charging & V2G',
      'Energy storage & grid integration',
    ],
    challengesDE: [
      'Thermisches Management bei hoher Leistungsdichte',
      'EMV-Konformität in Hochstrom-Topologien',
      'SiC/GaN-basierte Schaltungsdesigns',
      'Serienfähigkeit & Kostenoptimierung',
      'Langzeit-Zuverlässigkeit unter Umweltbelastung',
    ],
    challengesEN: [
      'Thermal management at high power density',
      'EMC compliance in high-current topologies',
      'SiC/GaN-based circuit designs',
      'Series readiness & cost optimization',
      'Long-term reliability under environmental stress',
    ],
  },
  {
    icon: Cog,
    slug: 'motion',
    titleDE: 'Motion & Drive Systems',
    titleEN: 'Motion & Drive Systems',
    taglineDE: 'Antriebselektronik für alles, was sich bewegt – präzise, effizient, robust.',
    taglineEN: 'Drive electronics for everything that moves – precise, efficient, robust.',
    applicationsDE: [
      'BLDC- & PMSM-Motorsteuerungen',
      'FOC-Inverter & Umrichter',
      'E-Mobility (E-Bike, LEV, Scooter)',
      'Robotik & Cobots',
      'Power Tools & Handgeräte',
      'AGV/AMR & Fördertechnik',
    ],
    applicationsEN: [
      'BLDC & PMSM motor controllers',
      'FOC inverters & converters',
      'E-mobility (e-bike, LEV, scooter)',
      'Robotics & cobots',
      'Power tools & handheld devices',
      'AGV/AMR & conveyor systems',
    ],
    challengesDE: [
      'Hocheffiziente Regelungsalgorithmen (FOC, sensorlos)',
      'Geräusch- & Vibrationsoptimierung',
      'Kompakte Bauform bei hoher Leistung',
      'Robustheit unter Vibration & Temperaturwechsel',
      'Integration Motor + Elektronik + Regelung',
    ],
    challengesEN: [
      'High-efficiency control algorithms (FOC, sensorless)',
      'Noise & vibration optimization',
      'Compact form factor at high power',
      'Robustness under vibration & temperature cycling',
      'Integration motor + electronics + control',
    ],
  },
  {
    icon: Car,
    slug: 'automotive',
    titleDE: 'Automotive & Functional Safety',
    titleEN: 'Automotive & Functional Safety',
    taglineDE: 'Automotive-Elektronik nach höchsten Prozess- und Sicherheitsstandards.',
    taglineEN: 'Automotive electronics to the highest process and safety standards.',
    applicationsDE: [
      'Steuergeräte (ECU) & Subsysteme',
      'Sensorik & Aktorik',
      'On-Board-Charger & DC/DC',
      'Modellbasierte Entwicklung (V-Modell)',
      'Licht- & Signaltechnik',
      'Fahrerassistenzsysteme (ADAS)',
    ],
    applicationsEN: [
      'Electronic control units (ECU) & subsystems',
      'Sensors & actuators',
      'On-board charger & DC/DC',
      'Model-based development (V-model)',
      'Lighting & signaling technology',
      'Driver assistance systems (ADAS)',
    ],
    challengesDE: [
      'ISO 26262 – Funktionale Sicherheit',
      'Automotive SPICE (ASPICE) Prozesskonformität',
      'Qualifikation nach AEC-Q & AK-Standards',
      'EMV in Hochvolt-Umgebungen',
      'Langzeit-Verfügbarkeit & Obsolescence-Management',
    ],
    challengesEN: [
      'ISO 26262 – functional safety',
      'Automotive SPICE (ASPICE) process compliance',
      'Qualification per AEC-Q & AK standards',
      'EMC in high-voltage environments',
      'Long-term availability & obsolescence management',
    ],
  },
  {
    icon: Factory,
    slug: 'industrial',
    titleDE: 'Industrial Automation & Robotics',
    titleEN: 'Industrial Automation & Robotics',
    taglineDE: 'Steuerungselektronik für die Fabrik der Zukunft.',
    taglineEN: 'Control electronics for the factory of the future.',
    applicationsDE: [
      'Maschinensteuerungen & SPS-nahe Systeme',
      'HMI & Bedienpanels',
      'Robotik & Cobot-Steuerungen',
      'Intralogistik & AGV/AMR',
      'Safety-Systeme & SIL-Elektronik',
      'Industrielle Kommunikation (EtherCAT, CAN, IO-Link)',
    ],
    applicationsEN: [
      'Machine controllers & PLC-adjacent systems',
      'HMI & operator panels',
      'Robotics & cobot controllers',
      'Intralogistics & AGV/AMR',
      'Safety systems & SIL electronics',
      'Industrial communication (EtherCAT, CAN, IO-Link)',
    ],
    challengesDE: [
      'Robustheit für raue Industrieumgebungen',
      'Echtzeit-Anforderungen & deterministische Regelung',
      'Funktionale Sicherheit (IEC 61508, IEC 62443)',
      'Langlebigkeit & Verfügbarkeit über Produktlebenszyklen',
      'Integration heterogener Schnittstellen',
    ],
    challengesEN: [
      'Robustness for harsh industrial environments',
      'Real-time requirements & deterministic control',
      'Functional safety (IEC 61508, IEC 62443)',
      'Longevity & availability across product lifecycles',
      'Integration of heterogeneous interfaces',
    ],
  },
  {
    icon: HeartPulse,
    slug: 'medtech',
    titleDE: 'MedTech & Precision Devices',
    titleEN: 'MedTech & Precision Devices',
    taglineDE: 'Präzisionselektronik für Medizin und Life Sciences.',
    taglineEN: 'Precision electronics for medicine and life sciences.',
    applicationsDE: [
      'Medizinische Embedded-Systeme',
      'Präzisionssteuerungen & Dosierung',
      'Sensorik & Signalverarbeitung',
      'Bedieninterfaces & Displays',
      'Laborgeräte & Diagnostik',
      'Lifecycle-stabile Elektronik',
    ],
    applicationsEN: [
      'Medical embedded systems',
      'Precision controls & dosing',
      'Sensors & signal processing',
      'User interfaces & displays',
      'Laboratory devices & diagnostics',
      'Lifecycle-stable electronics',
    ],
    challengesDE: [
      'Regulatorische Anforderungen (MDR, IEC 60601)',
      'Höchste Zuverlässigkeit & Ausfallsicherheit',
      'Miniaturisierung bei voller Funktionalität',
      'Langzeit-Verfügbarkeit & Obsolescence-Planung',
      'Rückverfolgbarkeit & Dokumentation',
    ],
    challengesEN: [
      'Regulatory requirements (MDR, IEC 60601)',
      'Highest reliability & fault tolerance',
      'Miniaturization with full functionality',
      'Long-term availability & obsolescence planning',
      'Traceability & documentation',
    ],
  },
  {
    icon: Building2,
    slug: 'infrastructure',
    titleDE: 'Smart Infrastructure & Building Systems',
    titleEN: 'Smart Infrastructure & Building Systems',
    taglineDE: 'Intelligente Elektronik für Gebäude, Infrastruktur und Sicherheit.',
    taglineEN: 'Intelligent electronics for buildings, infrastructure and security.',
    applicationsDE: [
      'Aufzugsteuerungen & Antriebe',
      'HVAC & Klimasteuerung',
      'Gebäudeautomation & Smart Building',
      'Zutrittskontrolle & Smart Access',
      'Sicherheits- & Überwachungstechnik',
      'Energiemanagement & Smart Metering',
    ],
    applicationsEN: [
      'Elevator controls & drives',
      'HVAC & climate control',
      'Building automation & smart building',
      'Access control & smart access',
      'Security & surveillance technology',
      'Energy management & smart metering',
    ],
    challengesDE: [
      'Langlebigkeit über Gebäude-Lebenszyklen (20+ Jahre)',
      'Sicherheitskritische Steuerungen (Aufzug, Brandschutz)',
      'Integration in bestehende Gebäudeinfrastruktur',
      'Energieeffizienz & Standby-Optimierung',
      'Vernetzung heterogener Subsysteme',
    ],
    challengesEN: [
      'Longevity across building lifecycles (20+ years)',
      'Safety-critical controls (elevator, fire protection)',
      'Integration into existing building infrastructure',
      'Energy efficiency & standby optimization',
      'Networking of heterogeneous subsystems',
    ],
  },
];

/* ──────────────────────────────────────────────────────────────
   Accent colors per vertical (subtle, not overwhelming)
   ────────────────────────────────────────────────────────────── */
const accentColors: Record<string, { bg: string; border: string; tag: string; iconBg: string }> = {
  energy:         { bg: 'bg-amber-50',   border: 'border-amber-200',   tag: 'bg-amber-100 text-amber-800',     iconBg: 'bg-amber-100' },
  motion:         { bg: 'bg-blue-50',    border: 'border-blue-200',    tag: 'bg-blue-100 text-blue-800',       iconBg: 'bg-blue-100' },
  automotive:     { bg: 'bg-slate-50',   border: 'border-slate-200',   tag: 'bg-slate-100 text-slate-800',     iconBg: 'bg-slate-100' },
  industrial:     { bg: 'bg-emerald-50', border: 'border-emerald-200', tag: 'bg-emerald-100 text-emerald-800', iconBg: 'bg-emerald-100' },
  medtech:        { bg: 'bg-rose-50',    border: 'border-rose-200',    tag: 'bg-rose-100 text-rose-800',       iconBg: 'bg-rose-100' },
  infrastructure: { bg: 'bg-violet-50',  border: 'border-violet-200',  tag: 'bg-violet-100 text-violet-800',   iconBg: 'bg-violet-100' },
};

/* ──────────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────────── */

function VerticalCard({ vertical, index, isDE }: { vertical: Vertical; index: number; isDE: boolean }) {
  const accent = accentColors[vertical.slug];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`rounded-2xl border ${accent.border} overflow-hidden`}
    >
      <div className={`grid lg:grid-cols-5 ${isEven ? '' : 'lg:direction-rtl'}`}>
        {/* Visual placeholder – left on even, right on odd */}
        <div className={`lg:col-span-2 ${accent.bg} flex items-center justify-center p-8 lg:p-12 ${isEven ? '' : 'lg:order-2'}`}>
          <div className="w-full aspect-[4/3] bg-gray-200 rounded-xl flex items-center justify-center">
            <vertical.icon className="text-gray-400" style={{ width: 'clamp(3rem, 2rem + 3vw, 5rem)', height: 'clamp(3rem, 2rem + 3vw, 5rem)' }} />
          </div>
        </div>

        {/* Content – 3 layers */}
        <div className={`lg:col-span-3 p-6 lg:p-10 flex flex-col justify-center ${isEven ? '' : 'lg:order-1'}`}>
          {/* Layer 1: Vertical / Industry */}
          <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-gap-xs)' }}>
            <div className={`rounded-lg ${accent.iconBg} flex items-center justify-center`} style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}>
              <vertical.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
            </div>
            <h2 className="fluid-h3 text-cme-dark font-bold">
              {isDE ? vertical.titleDE : vertical.titleEN}
            </h2>
          </div>
          <p className="fluid-body text-gray-600 leading-relaxed" style={{ marginBottom: 'var(--space-gap-md)' }}>
            {isDE ? vertical.taglineDE : vertical.taglineEN}
          </p>

          {/* Layer 2: Typical system applications */}
          <div style={{ marginBottom: 'var(--space-gap-md)' }}>
            <h3 className="fluid-small font-semibold text-cme-dark uppercase tracking-wider" style={{ marginBottom: 'var(--space-gap-xs)' }}>
              {isDE ? 'Typische Systemanwendungen' : 'Typical System Applications'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(isDE ? vertical.applicationsDE : vertical.applicationsEN).map((app, i) => (
                <span key={i} className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium ${accent.tag}`}>
                  {app}
                </span>
              ))}
            </div>
          </div>

          {/* Layer 3: CME-relevant technical challenges */}
          <div>
            <h3 className="fluid-small font-semibold text-cme-dark uppercase tracking-wider" style={{ marginBottom: 'var(--space-gap-xs)' }}>
              {isDE ? 'Technische Herausforderungen' : 'Technical Challenges'}
            </h3>
            <ul className="space-y-1.5">
              {(isDE ? vertical.challengesDE : vertical.challengesEN).map((challenge, i) => (
                <li key={i} className="flex items-start gap-2 fluid-small text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-cme-blue mt-2 flex-shrink-0" />
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Maerkte() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <Layout>
      {/* Hero */}
      <section className="subpage-hero bg-gradient-to-br from-white to-cme-blue-light/30">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-cme-blue fluid-small font-semibold tracking-widest uppercase">
              {isDE ? 'Vertical Solutions' : 'Vertical Solutions'}
            </span>
            <h1 className="fluid-h1 text-cme-dark leading-tight" style={{ marginTop: 'var(--space-gap-xs)' }}>
              {isDE
                ? 'Branchenspezifische Elektroniklösungen.'
                : 'Industry-specific electronics solutions.'}
            </h1>
            <p className="fluid-body-lg text-gray-600" style={{ marginTop: 'var(--space-gap-sm)' }}>
              {isDE
                ? 'Wir denken nicht in Technologien – wir denken in Ihren Systemherausforderungen. CME entwickelt und fertigt Elektronik für sechs strategische Verticals, in denen Leistungsdichte, Zuverlässigkeit und Serienfähigkeit entscheidend sind.'
                : 'We don\'t think in technologies – we think in your system challenges. CME develops and manufactures electronics for six strategic verticals where power density, reliability and series readiness are decisive.'}
            </p>
          </div>
        </div>
      </section>

      {/* Vertical Navigation */}
      <section className="py-4 border-b border-gray-100 bg-white sticky top-[var(--nav-height)] z-30">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {verticals.map((v) => {
              const accent = accentColors[v.slug];
              return (
                <a
                  key={v.slug}
                  href={`#${v.slug}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border ${accent.border} ${accent.bg} hover:shadow-sm transition-all whitespace-nowrap fluid-small font-medium text-cme-dark`}
                >
                  <v.icon size={16} className="text-cme-blue" />
                  {isDE ? v.titleDE : v.titleEN}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vertical Cards */}
      <section className="section-pad">
        <div className="container flex flex-col" style={{ gap: 'var(--space-gap-lg)' }}>
          {verticals.map((vertical, i) => (
            <div key={vertical.slug} id={vertical.slug}>
              <VerticalCard vertical={vertical} index={i} isDE={isDE} />
            </div>
          ))}
        </div>
      </section>

      {/* Underlying Capabilities */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-section-header)' }}>
            <h2 className="fluid-h2 text-cme-dark">
              {isDE ? 'Underlying Capabilities' : 'Underlying Capabilities'}
            </h2>
            <p className="fluid-body-lg text-gray-600 max-w-2xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
              {isDE
                ? 'Unsere Branchenlösungen basieren auf einem gemeinsamen Technologie-Fundament – tief verankert in Leistungselektronik, Antriebstechnik und thermischem Management.'
                : 'Our industry solutions are built on a shared technology foundation – deeply rooted in power electronics, drive technology and thermal management.'}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-gap-sm)' }}>
            {[
              { de: 'Leistungselektronik (SiC, GaN)', en: 'Power Electronics (SiC, GaN)' },
              { de: 'Antriebselektronik & Motor Control', en: 'Drive Electronics & Motor Control' },
              { de: 'Thermisches Management', en: 'Thermal Management' },
              { de: 'EMV-Design & Qualifikation', en: 'EMC Design & Qualification' },
              { de: 'Embedded Software (C/C++)', en: 'Embedded Software (C/C++)' },
              { de: 'Simulation & Modellierung', en: 'Simulation & Modeling' },
              { de: 'Funktionale Sicherheit', en: 'Functional Safety' },
              { de: 'Elektronikfertigung (EMS)', en: 'Electronics Manufacturing (EMS)' },
            ].map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-xl border border-gray-100 hover:border-cme-blue/20 hover:shadow-md transition-all fluid-card"
              >
                <div className="w-2 h-2 rounded-full bg-cme-blue" style={{ marginBottom: 'var(--space-gap-xs)' }} />
                <p className="font-medium text-cme-dark fluid-small">{isDE ? cap.de : cap.en}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container text-center">
          <h2 className="fluid-h2 text-cme-dark">
            {isDE ? 'Ihre Branche. Unsere Elektronik.' : 'Your industry. Our electronics.'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Sprechen Sie mit unseren Branchenexperten – wir verstehen Ihre Systemherausforderungen und entwickeln die passende Lösung.'
              : 'Talk to our industry experts – we understand your system challenges and develop the right solution.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? 'Projekt anfragen' : 'Request Project'}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
