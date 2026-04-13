import Layout from '@/components/Layout';
import SubPageHero from '@/components/SubPageHero';
import SEO from '@/components/SEO';
import ContactSlider from '@/components/ContactSlider';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  ArrowRight,
  Zap,
  Cog,
  Car,
  Factory,
  HeartPulse,
  Building2,
  Cpu,
  Flame,
  Radio,
  Code2,
  LineChart,
  ShieldCheck,
  CircuitBoard,
} from 'lucide-react';

const HERO_VIDEO_WEBM = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/Loop-Sample_d94dc755.webm';
const HERO_VIDEO_MP4 = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/Loop-Sample-compressed_8b0d5332.mp4';
const HERO_VIDEO_POSTER = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/hero-video-poster_8c5a9e34.jpg';

/* ──────────────────────────────────────────────────────────────
   6 Branchen & Anwendungsfelder – each with 3 layers:
   1. Branche / Industry
   2. Typical system applications
   3. CME-relevant technical challenges
   ────────────────────────────────────────────────────────────── */

interface MarketSegment {
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

const marketSegments: MarketSegment[] = [
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
      'Robotik & Cobots Antriebe',
      'Power Tools & Handgeräte',
      'AGV/AMR & Fördertechnik',
    ],
    applicationsEN: [
      'BLDC & PMSM motor controllers',
      'FOC inverters & converters',
      'E-mobility (e-bike, LEV, scooter)',
      'Robotics & cobot drives',
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
      'Pumpen & Kompressoren (Abgasnachbehandlung, Kühlmittel)',
      'HVAC Blower & Klimaaktuatoren',
      'Steller & Ventilsteuerungen (Klappen, Lüftung)',
      'Wischermotoren & Windabweiser',
      'Fuel-Cell-Steuerung & Wasserstoff-Anwendungen',
      'On-Board-Charger & DC/DC-Wandler',
    ],
    applicationsEN: [
      'Pumps & compressors (exhaust aftertreatment, coolant)',
      'HVAC blowers & climate actuators',
      'Actuators & valve controls (flaps, ventilation)',
      'Wiper motors & wind deflectors',
      'Fuel cell control & hydrogen applications',
      'On-board charger & DC/DC converters',
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
];

/* Underlying Capabilities */
const capabilities = [
  { de: 'Leistungselektronik (SiC, GaN)', en: 'Power Electronics (SiC, GaN)', icon: Cpu },
  { de: 'Antriebselektronik & Motor Control', en: 'Drive Electronics & Motor Control', icon: Cog },
  { de: 'Thermisches Management', en: 'Thermal Management', icon: Flame },
  { de: 'EMV-Design & Qualifikation', en: 'EMC Design & Qualification', icon: Radio },
  { de: 'Embedded Software (C/C++)', en: 'Embedded Software (C/C++)', icon: Code2 },
  { de: 'Simulation & Modellierung', en: 'Simulation & Modeling', icon: LineChart },
  { de: 'Funktionale Sicherheit', en: 'Functional Safety', icon: ShieldCheck },
  { de: 'Elektronikfertigung (EMS)', en: 'Electronics Manufacturing (EMS)', icon: CircuitBoard },
];

/* ──────────────────────────────────────────────────────────────
   Market Card – consistent with site-wide card style
   ────────────────────────────────────────────────────────────── */

const slugToAnchor: Record<string, string> = {
  energy: 'energy-power',
  motion: 'motion-drive',
  automotive: 'automotive',
  industrial: 'industrial',
  medtech: 'medtech',
  infrastructure: 'smart-infra',
};

function MarketCard({ vertical, index, isDE, onCardClick }: { vertical: MarketSegment; index: number; isDE: boolean; onCardClick?: (topic: string) => void }) {
  const title = isDE ? vertical.titleDE : vertical.titleEN;
  return (
    <motion.div
      id={slugToAnchor[vertical.slug]}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 scroll-mt-24 cursor-pointer"
      onClick={() => onCardClick?.(title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCardClick?.(title); } }}
    >
      {/* Header with icon */}
      <div className="fluid-card border-b border-gray-50">
        <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)' }}>
          <div
            className="rounded-lg bg-cme-blue-light flex items-center justify-center shrink-0"
            style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}
          >
            <vertical.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
          </div>
          <h3 className="fluid-h4 text-cme-dark font-bold">
            {isDE ? vertical.titleDE : vertical.titleEN}
          </h3>
        </div>
        <p className="fluid-body text-gray-600 leading-relaxed" style={{ marginTop: 'var(--space-gap-xs)' }}>
          {isDE ? vertical.taglineDE : vertical.taglineEN}
        </p>
      </div>

      {/* Content: Applications + Challenges side by side */}
      <div className="fluid-card">
        <div className="grid md:grid-cols-2" style={{ gap: 'var(--space-gap-md)' }}>
          {/* Applications */}
          <div>
            <h4 className="fluid-small font-semibold text-cme-dark uppercase tracking-wider" style={{ marginBottom: 'var(--space-gap-xs)' }}>
              {isDE ? 'Typische Systemanwendungen' : 'Typical System Applications'}
            </h4>
            <ul className="space-y-1.5">
              {(isDE ? vertical.applicationsDE : vertical.applicationsEN).map((app, i) => (
                <li key={i} className="flex items-start gap-2 fluid-small text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-cme-blue mt-2 flex-shrink-0" />
                  {app}
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div>
            <h4 className="fluid-small font-semibold text-cme-dark uppercase tracking-wider" style={{ marginBottom: 'var(--space-gap-xs)' }}>
              {isDE ? 'Technische Herausforderungen' : 'Technical Challenges'}
            </h4>
            <ul className="space-y-1.5">
              {(isDE ? vertical.challengesDE : vertical.challengesEN).map((challenge, i) => (
                <li key={i} className="flex items-start gap-2 fluid-small text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
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

/* ──────────────────────────────────────────────────────────────
   Page Component
   ────────────────────────────────────────────────────────────── */

export default function Maerkte() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  const { t: cms, img, vid } = useContent('maerkte');

  // Hero video: CMS overrides hardcoded default
  const cmsVideoWebm = vid('hero.heroVideoWebm');
  const cmsVideoMp4 = vid('hero.heroVideoMp4');
  const cmsVideoPoster = img('hero.heroVideoPoster');
  const cmsVideoPlayback = cms('hero.heroVideoPlayback') as 'loop' | 'once' | '';
  const effectiveHeroVideo = (cmsVideoWebm || cmsVideoMp4)
    ? { webm: cmsVideoWebm || undefined, mp4: cmsVideoMp4 || undefined, poster: cmsVideoPoster || undefined, playback: (cmsVideoPlayback === 'once' ? 'once' : 'loop') as 'loop' | 'once' }
    : { webm: HERO_VIDEO_WEBM, mp4: HERO_VIDEO_MP4, poster: HERO_VIDEO_POSTER };

  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderTopic, setSliderTopic] = useState('');
  const openSlider = (topic: string) => { setSliderTopic(topic); setSliderOpen(true); };

  return (
    <Layout>
      <SEO
        titleDE="Branchen & Märkte"
        titleEN="Industries & Markets"
        descriptionDE="Branchenexpertise in Automotive, Industrieautomation, Medizintechnik, Energietechnik und Antriebstechnik."
        descriptionEN="Industry expertise in automotive, industrial automation, medical technology, energy technology and drive technology."
        path="/maerkte"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isDE ? 'Branchen & Märkte' : 'Industries & Markets', url: '/maerkte' },
        ]}
      />
      <SubPageHero
        tagline={cms('hero.tagline') || (isDE ? 'Branchen & Anwendungsfelder' : 'Industries & Applications')}
        headline={cms('hero.headline') || (isDE ? 'Branchenspezifische Elektroniklösungen.' : 'Industry-specific electronics solutions.')}
        description={cms('hero.description') || (isDE
          ? 'Wir denken nicht in Technologien – wir denken in Ihren Systemherausforderungen. CME entwickelt und fertigt Elektronik für sechs Branchen, in denen Leistungsdichte, Zuverlässigkeit und Serienfähigkeit entscheidend sind.'
          : 'We don\'t think in technologies \u2013 we think in your system challenges. CME develops and manufactures electronics for six industries where power density, reliability and series readiness are decisive.')}
        cta={{ label: isDE ? 'Branche & Anforderung schildern' : 'Describe your industry & requirements', href: '/kontakt' }}
        heroVideo={effectiveHeroVideo}
      />

      {/* Market Cards – 2-column grid like Fertigung subpages */}
      <section className="section-pad">
        <div className="container">
          <h2 className="fluid-h2 text-cme-dark text-center">
            {isDE ? 'Unsere Branchen' : 'Our Industries'}
          </h2>
          <p className="text-gray-600 text-center fluid-body-lg max-w-2xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Sechs Branchen – jede mit spezifischen Systemanwendungen und technischen Herausforderungen.'
              : 'Six industries – each with specific system applications and technical challenges.'}
          </p>

          <div className="grid lg:grid-cols-2" style={{ gap: 'var(--space-gap-md)', marginTop: 'var(--space-section-header)' }}>
            {marketSegments.map((vertical, i) => (
              <MarketCard key={vertical.slug} vertical={vertical} index={i} isDE={isDE} onCardClick={openSlider} />
            ))}
          </div>
        </div>
      </section>

      {/* Technologie-Fundament – same style as Fertigung capabilities */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <h2 className="fluid-h2 text-cme-dark text-center">
            {isDE ? 'Technologie-Fundament' : 'Technology Foundation'}
          </h2>
          <p className="fluid-body-lg text-gray-600 max-w-2xl mx-auto text-center" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Unsere Branchenlösungen basieren auf einem gemeinsamen Technologie-Fundament – tief verankert in Leistungselektronik, Antriebstechnik und thermischem Management.'
              : 'Our industry solutions are built on a shared technology foundation – deeply rooted in power electronics, drive technology and thermal management.'}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-gap-sm)', marginTop: 'var(--space-section-header)' }}>
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-gray-100 hover:border-cme-blue/20 hover:shadow-md transition-all fluid-card cursor-pointer"
                  onClick={() => openSlider(isDE ? cap.de : cap.en)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSlider(isDE ? cap.de : cap.en); } }}
                >
                  <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)' }}>
                    <div
                      className="rounded-lg bg-cme-blue-light flex items-center justify-center shrink-0"
                      style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}
                    >
                      <Icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                    </div>
                    <p className="font-medium text-cme-dark fluid-small">{isDE ? cap.de : cap.en}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA – same style as Fertigung/Lifecycle */}
      <section className="section-pad">
        <div className="container text-center">
          <h2 className="fluid-h2 text-cme-dark">
            {isDE ? 'Ihre Branche kennen wir. Ihre Herausforderung noch nicht.' : 'We know your industry. Not yet your challenge.'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Schildern Sie uns Ihre Anwendung und die Rahmenbedingungen – wir sagen Ihnen, ob und wie wir helfen können.'
              : 'Describe your application and constraints – we\'ll tell you if and how we can help.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? 'Anwendung schildern' : 'Describe your application'}
          </Link>
        </div>
      </section>

      <ContactSlider
        isOpen={sliderOpen}
        onClose={() => setSliderOpen(false)}
        topic={sliderTopic}
        pageSource={`maerkte – ${sliderTopic}`}
      />
    </Layout>
  );
}
