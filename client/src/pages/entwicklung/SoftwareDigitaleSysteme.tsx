import Layout from '@/components/Layout';
import SubPageHero from '@/components/SubPageHero';
import ContactSlider from '@/components/ContactSlider';
import SEO from '@/components/SEO';

import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Link } from 'wouter';
import {
  Globe,
  Smartphone,
  Palette,
  Server,
  Cloud,
  RefreshCw,
  ArrowRight,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

/* ── Feature data ── */
interface Feature {
  de: string;
  en: string;
  icon: LucideIcon;
  bulletsDE: string[];
  bulletsEN: string[];
  /** Optional extended description below bullets (only UX card) */
  descriptionDE?: string;
  descriptionEN?: string;
}

const features: Feature[] = [
  {
    de: 'Webbasierte Anwendungen',
    en: 'Web-Based Applications',
    icon: Globe,
    bulletsDE: [
      'Konfigurationstools und Diagnose-Dashboards für technische Endgeräte',
      'Monitoring und Fernsteuerung industrieller Systeme über Browser-Interface',
      'Industrietaugliche Frontends: reaktionsfähig, offline-fähig, mehrsprachig, rollensicher',
      'Technologien: React, TypeScript, Tailwind CSS, WebSockets für Echtzeit-Datenanbindung',
    ],
    bulletsEN: [
      'Configuration tools and diagnostic dashboards for technical end devices',
      'Monitoring and remote control of industrial systems via browser interface',
      'Industrial-grade frontends: responsive, offline-capable, multilingual, role-secure',
      'Technologies: React, TypeScript, Tailwind CSS, WebSockets for real-time data connectivity',
    ],
  },
  {
    de: 'Native & Mobile Apps',
    en: 'Native & Mobile Apps',
    icon: Smartphone,
    bulletsDE: [
      'iOS- und Android-Apps für Inbetriebnahme, Service und Endnutzer',
      'Direkte Gerätekommunikation über Bluetooth LE und WLAN – ohne Cloud-Umweg',
      'Offline-Fähigkeit und lokale Datenhaltung für Einsatz ohne Netzabdeckung',
      'Technologien: React Native, Swift, Kotlin, Flutter – je nach Plattformanforderung',
    ],
    bulletsEN: [
      'iOS and Android apps for commissioning, service and end users',
      'Direct device communication via Bluetooth LE and Wi-Fi – no cloud detour',
      'Offline capability and local data storage for use without network coverage',
      'Technologies: React Native, Swift, Kotlin, Flutter – depending on platform requirements',
    ],
  },
  {
    de: 'UX & Interface Design',
    en: 'UX & Interface Design',
    icon: Palette,
    bulletsDE: [
      'UX-Research mit echten Nutzern: Inbetriebnahme-Ingenieure, Servicetechniker, Anlagenführer – nicht mit Personas aus dem Lehrbuch',
      'Interaktionsdesign für komplexe technische Daten: Parametermasken, Fehlercodes, Zustandsdiagramme verständlich machen',
      'Prototyping und Nutzertests vor der ersten Zeile Code – teure Fehlentwicklungen werden im Entwurf erkannt',
      'Design-Systeme für industrielle Interfaces: konsistent, wartbar, skalierbar über Produktgenerationen',
    ],
    bulletsEN: [
      'UX research with real users: commissioning engineers, service technicians, plant operators – not textbook personas',
      'Interaction design for complex technical data: making parameter masks, error codes, state diagrams understandable',
      'Prototyping and user testing before the first line of code – costly misdevelopments are caught in the design phase',
      'Design systems for industrial interfaces: consistent, maintainable, scalable across product generations',
    ],
    descriptionDE:
      'Schlechte UX kostet in der Industrie nicht Conversions – sie kostet Inbetriebnahmezeit, Servicekosten und Kundenzufriedenheit. Ein Servicetechniker im Feld will nicht durch 300 Parameter scrollen. Er will sofort sehen, was falsch läuft und wie er es behebt. CME versteht beide Seiten: das Gerät und den Mensch davor. Ein reines UX-Studio kennt die Hardware nicht. Ein reines Elektronikhaus denkt nicht in Nutzerflüssen. Wir tun beides.',
    descriptionEN:
      'Poor UX in industry doesn\'t cost conversions – it costs commissioning time, service costs and customer satisfaction. A service technician in the field doesn\'t want to scroll through 300 parameters. He wants to see immediately what\'s wrong and how to fix it. CME understands both sides: the device and the person in front of it. A pure UX studio doesn\'t know the hardware. A pure electronics company doesn\'t think in user flows. We do both.',
  },
  {
    de: 'Backend & Systemarchitektur',
    en: 'Backend & System Architecture',
    icon: Server,
    bulletsDE: [
      'API-Design und Datenmodellierung für skalierbare, langfristig wartbare Backends',
      'Microservice-Architekturen mit definierten Schnittstellen zu Embedded, Cloud und Drittsystemen',
      'Datenbankauswahl je nach Anforderung: PostgreSQL (relational), InfluxDB (Zeitreihendaten), MongoDB (dokumentenbasiert)',
      'Technologien: Node.js, Python (FastAPI), .NET/C#, Docker, REST, GraphQL',
    ],
    bulletsEN: [
      'API design and data modeling for scalable, long-term maintainable backends',
      'Microservice architectures with defined interfaces to embedded, cloud and third-party systems',
      'Database selection by requirement: PostgreSQL (relational), InfluxDB (time series), MongoDB (document-based)',
      'Technologies: Node.js, Python (FastAPI), .NET/C#, Docker, REST, GraphQL',
    ],
  },
  {
    de: 'Cloud- & Schnittstellenintegration',
    en: 'Cloud & Interface Integration',
    icon: Cloud,
    bulletsDE: [
      'IoT-Gateway-Anbindung an Cloud-Plattformen: AWS IoT Core, Azure IoT Hub, eigene On-Premise-Infrastruktur',
      'Industrieprotokolle: OPC UA, MQTT, Modbus TCP – je nach Systemanforderung und Bestandsinfrastruktur',
      'Durchgängige Datenpipeline von Sensor und Steuerung bis ERP, Reporting und Condition Monitoring',
      'Integration in bestehende Systemlandschaften ohne Ablösung vorhandener Infrastruktur',
    ],
    bulletsEN: [
      'IoT gateway connectivity to cloud platforms: AWS IoT Core, Azure IoT Hub, own on-premise infrastructure',
      'Industrial protocols: OPC UA, MQTT, Modbus TCP – depending on system requirements and existing infrastructure',
      'End-to-end data pipeline from sensor and controller to ERP, reporting and condition monitoring',
      'Integration into existing system landscapes without replacing existing infrastructure',
    ],
  },
  {
    de: 'Betrieb & Weiterentwicklung',
    en: 'Operations & Continuous Development',
    icon: RefreshCw,
    bulletsDE: [
      'CI/CD-Pipelines, automatisiertes Testing und Deployment für Produktivsysteme',
      'Monitoring, Alerting und strukturierte Fehleranalyse für laufende Applikationen',
      'Wartungskonzepte mit definierten SLAs – auch für sicherheitsrelevante Umgebungen',
      'Modulare Architektur: digitale Infrastruktur wächst mit Produktanforderungen und Stückzahlen',
    ],
    bulletsEN: [
      'CI/CD pipelines, automated testing and deployment for production systems',
      'Monitoring, alerting and structured error analysis for running applications',
      'Maintenance concepts with defined SLAs – also for safety-critical environments',
      'Modular architecture: digital infrastructure grows with product requirements and volumes',
    ],
  },
];

/* ── Technology tags ── */
const techCategories = [
  { labelDE: 'Frontend', labelEN: 'Frontend', tags: ['React', 'TypeScript', 'Vue.js', 'Tailwind CSS'] },
  { labelDE: 'Mobile', labelEN: 'Mobile', tags: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
  { labelDE: 'Backend', labelEN: 'Backend', tags: ['Node.js', 'Python / FastAPI', '.NET / C#'] },
  { labelDE: 'Datenbanken', labelEN: 'Databases', tags: ['PostgreSQL', 'InfluxDB', 'MongoDB'] },
  { labelDE: 'Cloud & IoT', labelEN: 'Cloud & IoT', tags: ['AWS IoT', 'Azure IoT Hub', 'MQTT', 'OPC UA'] },
  { labelDE: 'Protokolle', labelEN: 'Protocols', tags: ['CAN', 'Modbus TCP', 'REST', 'GraphQL', 'WebSocket'] },
  { labelDE: 'DevOps', labelEN: 'DevOps', tags: ['Docker', 'GitHub Actions', 'CI/CD-Pipelines'] },
  { labelDE: 'Design & UX', labelEN: 'Design & UX', tags: ['Figma', 'Maze (Nutzertests)', 'Design-Systeme'] },
];

/* ── FAQ Accordion Item ───────────────────────────────────────── */
function FaqItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between py-5 px-1 text-left group hover:text-[#0080C8] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="fluid-body font-semibold text-cme-dark group-hover:text-[#0080C8] transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          className={`shrink-0 mt-1 text-[#0080C8] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="fluid-body text-gray-600 leading-relaxed pb-5 px-1">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── FAQ data ── */
const faqItems = [
  {
    questionDE: 'Entwickelt CME auch Software ohne eigene Hardware?',
    questionEN: 'Does CME also develop software without proprietary hardware?',
    answerDE: 'Ja. Wir entwickeln Web-Apps, Mobile Apps und Backend-Systeme auch für bestehende Hardware anderer Hersteller – vorausgesetzt, die Schnittstellen sind dokumentiert oder analysierbar.',
    answerEN: 'Yes. We develop web apps, mobile apps and backend systems also for existing hardware from other manufacturers – provided the interfaces are documented or analyzable.',
  },
  {
    questionDE: 'Welche Technologien setzt CME für Web-Applikationen ein?',
    questionEN: 'What technologies does CME use for web applications?',
    answerDE: 'Unsere Standard-Stacks umfassen React und TypeScript im Frontend, Node.js oder Python (FastAPI) im Backend, sowie PostgreSQL, InfluxDB oder MongoDB als Datenbanken. Die Auswahl richtet sich nach der Projektanforderung.',
    answerEN: 'Our standard stacks include React and TypeScript for the frontend, Node.js or Python (FastAPI) for the backend, and PostgreSQL, InfluxDB or MongoDB as databases. The selection depends on the project requirements.',
  },
  {
    questionDE: 'Kann CME bestehende Systeme in Cloud-Plattformen integrieren?',
    questionEN: 'Can CME integrate existing systems into cloud platforms?',
    answerDE: 'Ja. Wir integrieren bestehende Maschinen und Steuerungen über IoT-Gateways und Industrieprotokolle (OPC UA, MQTT, Modbus TCP) in Cloud-Plattformen wie AWS IoT Core oder Azure IoT Hub – ohne die vorhandene Infrastruktur abzulösen.',
    answerEN: 'Yes. We integrate existing machines and controllers via IoT gateways and industrial protocols (OPC UA, MQTT, Modbus TCP) into cloud platforms like AWS IoT Core or Azure IoT Hub – without replacing existing infrastructure.',
  },
  {
    questionDE: 'Wie unterscheidet sich CME von einer reinen Software-Agentur?',
    questionEN: 'How does CME differ from a pure software agency?',
    answerDE: 'Unsere Software-Ingenieure arbeiten im selben Haus wie die Hardware- und Embedded-Teams. Die Schnittstelle zwischen Gerät und Applikation wird nicht zwischen zwei Unternehmen ausgehandelt, sondern entsteht von Anfang an gemeinsam. Das spart Iterationen und verhindert die teuersten Fehler.',
    answerEN: 'Our software engineers work in the same building as the hardware and embedded teams. The interface between device and application is not negotiated between two companies, but is created together from the start. This saves iterations and prevents the most expensive errors.',
  },
  {
    questionDE: 'Bietet CME auch UX-Design für industrielle Interfaces an?',
    questionEN: 'Does CME also offer UX design for industrial interfaces?',
    answerDE: 'Ja. Wir führen UX-Research mit echten Nutzern durch – Inbetriebnahme-Ingenieuren, Servicetechnikern, Anlagenführern – und entwickeln Design-Systeme, die über Produktgenerationen hinweg konsistent und wartbar bleiben.',
    answerEN: 'Yes. We conduct UX research with real users – commissioning engineers, service technicians, plant operators – and develop design systems that remain consistent and maintainable across product generations.',
  },
  {
    questionDE: 'Übernimmt CME auch den Betrieb und die Wartung der Software?',
    questionEN: 'Does CME also handle operation and maintenance of the software?',
    answerDE: 'Ja. Wir bieten CI/CD-Pipelines, Monitoring, Alerting und strukturierte Wartungskonzepte mit definierten SLAs – auch für sicherheitsrelevante Umgebungen. Die modulare Architektur stellt sicher, dass die digitale Infrastruktur mit den Produktanforderungen wächst.',
    answerEN: 'Yes. We offer CI/CD pipelines, monitoring, alerting and structured maintenance concepts with defined SLAs – also for safety-critical environments. The modular architecture ensures that the digital infrastructure grows with product requirements.',
  },
];

export default function SoftwareDigitaleSysteme() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  const { t, img } = useContent('entwicklung.softwaredigitalesysteme');

  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderTopic, setSliderTopic] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

  const title = t('content.title') || (isDE ? 'Software Engineering & Digitale Systeme' : 'Software Engineering & Digital Systems');
  const subtitle = t('content.subtitle') || (isDE
    ? 'Web-Apps, Mobile Apps, Cloud-Integration und Backend-Architektur – die digitale Schicht Ihrer Elektroniklösung.'
    : 'Web apps, mobile apps, cloud integration and backend architecture – the digital layer of your electronics solution.');
  const heroImage = img('hero.heroImage', `${CDN}/web-apps_26e3e533.png`);
  const contentImage = img('content.contentImage', `${CDN}/web-apps_26e3e533.png`);

  const handleCardClick = (featureTitle: string) => {
    setSliderTopic(featureTitle);
    setSliderOpen(true);
  };

  const faqSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: isDE ? item.questionDE : item.questionEN,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isDE ? item.answerDE : item.answerEN,
      },
    })),
  }), [isDE]);

  return (
    <Layout>
      <SEO
        titleDE="Software Engineering & Digitale Systeme"
        titleEN="Software Engineering & Digital Systems"
        descriptionDE="Web-Apps, Mobile Apps, Cloud-Integration und Backend-Architektur – die digitale Schicht Ihrer Elektroniklösung."
        descriptionEN="Web apps, mobile apps, cloud integration and backend architecture – the digital layer of your electronics solution."
        path="/entwicklung/software-digitale-systeme"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isDE ? 'Elektronikentwicklung' : 'Electronics Development', url: '/entwicklung' },
          { name: isDE ? 'Software Engineering & Digitale Systeme' : 'Software Engineering & Digital Systems', url: '/entwicklung/software-digitale-systeme' },
        ]}
        additionalSchemas={[faqSchema]}
      />
      <SubPageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: isDE ? 'Elektronikentwicklung' : 'Electronics Development', href: '/entwicklung' },
          { label: title },
        ]}
        backLink={{
          label: isDE ? 'Elektronikentwicklung' : 'Electronics Development',
          href: '/entwicklung',
        }}
        headline={title}
        description={subtitle}
        heroImage={heroImage}
        heroImageAlt={title}
      />

      {/* Intro Section */}
      <section className="section-pad">
        <div className="container">
          <div className="grid lg:grid-cols-[auto_1fr] items-center" style={{ gap: 'var(--space-gap-lg)' }}>
            {/* Diamond image */}
            <div className="relative flex items-center justify-center" style={{ marginLeft: '35px', marginRight: '20px' }}>
              <div
                className="relative overflow-hidden shadow-lg"
                style={{
                  width: 'clamp(10rem, 7rem + 7vw, 16rem)',
                  height: 'clamp(10rem, 7rem + 7vw, 16rem)',
                  transform: 'rotate(45deg)',
                  borderRadius: 'clamp(0.5rem, 0.3rem + 0.4vw, 1rem)',
                }}
              >
                <img
                  src={contentImage}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ transform: 'rotate(-45deg) scale(1.42)' }}
                />
              </div>
              <div
                className="absolute -z-10 bg-cme-blue/8"
                style={{
                  width: 'clamp(12rem, 9rem + 8vw, 19rem)',
                  height: 'clamp(12rem, 9rem + 8vw, 19rem)',
                  transform: 'rotate(45deg) translate(6%, 6%)',
                  borderRadius: 'clamp(0.5rem, 0.3rem + 0.4vw, 1rem)',
                }}
              />
            </div>
            <div>
              <p className="fluid-body-lg text-gray-700 leading-relaxed">
                {isDE
                  ? 'Elektronische Produkte brauchen heute mehr als Firmware. Sie brauchen Konfigurationstools, Diagnose-Dashboards, Cloud-Anbindung und mobile Companion-Apps. Bei CME entsteht diese digitale Schicht nicht als nachträgliches Add-on, sondern als integraler Bestandteil der Systemarchitektur – entwickelt von Software-Ingenieuren, die täglich mit den Embedded- und Hardware-Teams zusammenarbeiten.'
                  : 'Electronic products today need more than firmware. They need configuration tools, diagnostic dashboards, cloud connectivity and mobile companion apps. At CME, this digital layer is not created as an afterthought, but as an integral part of the system architecture – developed by software engineers who work daily with the embedded and hardware teams.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Abgrenzungsblock: "Das verbindet beide Welten" */}
      <section className="section-pad bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container max-w-4xl">
          <h2 className="fluid-h2 text-cme-dark" style={{ marginBottom: 'var(--space-gap-md)' }}>
            {isDE ? 'Das verbindet beide Welten' : 'Connecting both worlds'}
          </h2>
          <div className="space-y-4 text-gray-700 fluid-body-lg leading-relaxed">
            <p>
              {isDE
                ? 'Ein Frequenzumrichter, der FOC-geregelt läuft und über CAN kommuniziert, braucht irgendwann auch ein Inbetriebnahme-Tool, ein Diagnose-Dashboard oder eine Felddaten-Anbindung. Genau da beginnt diese Seite.'
                : 'A frequency converter running FOC control and communicating via CAN eventually also needs a commissioning tool, a diagnostic dashboard or field data connectivity. That\'s exactly where this page begins.'}
            </p>
            <p>
              {isDE
                ? 'Die Firmware auf dem Controller entwickeln unsere Embedded-Ingenieure. Die Software, die darüber sitzt – das Konfigurations-Frontend, die Service-App, die Cloud-Schnittstelle – entwickeln wir hier, im selben Haus.'
                : 'The firmware on the controller is developed by our embedded engineers. The software that sits on top – the configuration frontend, the service app, the cloud interface – is developed here, in the same building.'}
            </p>
            <p>
              {isDE
                ? 'Was das bedeutet: Die Schnittstelle zwischen Gerät und Applikation wird nicht zwischen zwei Unternehmen ausgehandelt. Sie entsteht von Anfang an gemeinsam. Das spart Iterationen – und verhindert die teuersten Fehler.'
                : 'What this means: The interface between device and application is not negotiated between two companies. It is created together from the start. This saves iterations – and prevents the most expensive errors.'}
            </p>
          </div>
          <Link
            href="/entwicklung/hardware-software"
            className="inline-flex items-center gap-2 text-cme-blue font-semibold hover:underline fluid-body"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? 'Zur Embedded-Software-Entwicklung' : 'To embedded software development'}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Features Grid – 6 Kacheln */}
      <section className="section-pad">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-sm)' }}>
            {features.map((feature, i) => {
              const Icon = feature.icon;
              const featureTitle = isDE ? feature.de : feature.en;
              const isUxCard = i === 2; // UX & Interface Design is the 3rd card
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-white rounded-xl border hover:shadow-md transition-all fluid-card cursor-pointer group ${
                    isUxCard
                      ? 'border-cme-blue/30 ring-1 ring-cme-blue/10 sm:col-span-2 lg:col-span-3'
                      : 'border-gray-100 hover:border-cme-blue/20'
                  }`}
                  onClick={() => handleCardClick(featureTitle)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(featureTitle); } }}
                >
                  <div
                    className="w-14 h-14 rounded-xl bg-cme-blue/10 flex items-center justify-center group-hover:bg-cme-blue/15 transition-colors"
                    style={{ marginBottom: 'var(--space-gap-xs)' }}
                  >
                    <Icon size={28} className="text-cme-blue" strokeWidth={1.5} />
                  </div>
                  <p className="font-semibold text-cme-dark fluid-body" style={{ marginBottom: '0.5rem' }}>
                    {featureTitle}
                  </p>
                  {isUxCard ? (
                    <div className={`grid ${isUxCard ? 'lg:grid-cols-[1fr_1fr]' : ''}`} style={{ gap: 'var(--space-gap-md)' }}>
                      <ul className="space-y-1">
                        {(isDE ? feature.bulletsDE : feature.bulletsEN).map((bullet, j) => (
                          <li key={j} className="flex items-start gap-2 text-gray-600" style={{ fontSize: 'clamp(0.75rem, 0.65rem + 0.25vw, 0.875rem)', lineHeight: '1.4' }}>
                            <span className="w-1 h-1 rounded-full bg-cme-blue/60 mt-[0.45em] flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-gray-600 leading-relaxed" style={{ fontSize: 'clamp(0.8rem, 0.7rem + 0.25vw, 0.9rem)' }}>
                        {isDE ? feature.descriptionDE : feature.descriptionEN}
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-1">
                      {(isDE ? feature.bulletsDE : feature.bulletsEN).map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-600" style={{ fontSize: 'clamp(0.75rem, 0.65rem + 0.25vw, 0.875rem)', lineHeight: '1.4' }}>
                          <span className="w-1 h-1 rounded-full bg-cme-blue/60 mt-[0.45em] flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologie-Block */}
      <section className="section-pad bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container max-w-5xl">
          <h2 className="fluid-h2 text-cme-dark" style={{ marginBottom: 'var(--space-gap-xs)' }}>
            {isDE ? 'Technologien, mit denen wir arbeiten' : 'Technologies we work with'}
          </h2>
          <p className="text-gray-500 fluid-body" style={{ marginBottom: 'var(--space-gap-md)' }}>
            {isDE
              ? 'Kein abschließender Charakter – Technologieauswahl richtet sich nach Projektanforderung, nicht nach internem Standard-Stack.'
              : 'Not exhaustive – technology selection is based on project requirements, not an internal standard stack.'}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-gap-sm)' }}>
            {techCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-lg p-4 border border-gray-100"
              >
                <p className="font-semibold text-cme-dark text-sm" style={{ marginBottom: '0.5rem' }}>
                  {isDE ? cat.labelDE : cat.labelEN}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="inline-block bg-cme-blue/8 text-cme-blue/80 rounded-md px-2 py-0.5"
                      style={{ fontSize: 'clamp(0.65rem, 0.6rem + 0.15vw, 0.75rem)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-pad bg-gray-50">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ maxWidth: 'min(80%, 72rem)' }}>
          <h2 className="fluid-h2 text-cme-dark text-center" style={{ marginBottom: 'var(--space-section-header)' }}>
            {isDE ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{ padding: 'var(--space-gap-sm) var(--space-gap-md)' }}>
            {faqItems.map((item, index) => (
              <FaqItem
                key={index}
                question={isDE ? item.questionDE : item.questionEN}
                answer={isDE ? item.answerDE : item.answerEN}
                isOpen={openFaq === index}
                onToggle={() => toggleFaq(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container text-center">
          <h2 className="fluid-h2 text-cme-dark">
            {isDE ? 'Machbarkeit klären – bevor Kosten entstehen.' : 'Clarify feasibility – before costs arise.'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Schicken Sie uns Ihre Anforderungen. Wir prüfen Systemarchitektur, Machbarkeit und Zeitrahmen – und sagen offen, was geht, was nicht geht und wo die Risiken liegen.'
              : 'Send us your requirements. We evaluate system architecture, feasibility and timeline – and tell you openly what works, what doesn\'t and where the risks lie.'}
          </p>
          <button
            onClick={() => { setSliderTopic(isDE ? 'Anforderungen besprechen' : 'Discuss requirements'); setSliderOpen(true); }}
            className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn cursor-pointer"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? 'Anforderungen besprechen' : 'Discuss requirements'}
          </button>
        </div>
      </section>

      {/* Contact Slider */}
      <ContactSlider
        isOpen={sliderOpen}
        onClose={() => setSliderOpen(false)}
        topic={sliderTopic}
        pageSource={`entwicklung.softwaredigitalesysteme – ${sliderTopic}`}
      />
    </Layout>
  );
}
