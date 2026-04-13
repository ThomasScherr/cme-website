import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import SubPageHero from '@/components/SubPageHero';
import ContactSlider from '@/components/ContactSlider';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Link } from 'wouter';
import {
  ArrowRight, Cpu, Cog, SlidersHorizontal, Waves, ShieldCheck, FlaskConical,
  Zap, Thermometer, BatteryCharging, Gauge, Radio, Microchip, RefreshCw,
  MonitorSmartphone, CircuitBoard, Wrench, Search, Users, CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';
const HERO_IMG = `${CDN}/JK_2392__1920px_af02a6b7.jpg`;

/* ── 6 Competency Cards (ENT-1) ── */
const competencies = [
  {
    icon: Cpu,
    titleDE: 'Hard & Software Design',
    titleEN: 'Hard & Software Design',
    subtitleDE: 'Embedded Microcontroller Systeme',
    subtitleEN: 'Embedded Microcontroller Systems',
    descDE: 'Hardware-Entwicklung, Schaltungsdesign, Embedded Software und Echtzeitsysteme.',
    descEN: 'Hardware development, circuit design, embedded software and real-time systems.',
    href: '/entwicklung/hardware-software',
  },
  {
    icon: Cog,
    titleDE: 'E-Motor Design',
    titleEN: 'E-Motor Design',
    subtitleDE: 'PM-Motor-Design – Laminatkonstruktion und -layout',
    subtitleEN: 'PM Motor Design – Lamination Construction and Layout',
    descDE: 'Auslegung permanentmagneterregter Motoren, FEA-basiertes Motordesign mit Motor-CAD/ANSYS.',
    descEN: 'Design of permanent magnet motors, FEA-based motor design with Motor-CAD/ANSYS.',
    href: '/entwicklung/e-motor-design',
  },
  {
    icon: SlidersHorizontal,
    titleDE: 'Control Design',
    titleEN: 'Control Design',
    subtitleDE: 'Modellbasiertes Reglerdesign · MIL, SIL, HIL',
    subtitleEN: 'Model-Based Controller Design · MIL, SIL, HIL',
    descDE: 'Entwicklung und Verifikation von Regelalgorithmen entlang des V-Modells.',
    descEN: 'Development and verification of control algorithms along the V-model.',
    href: '/entwicklung/control-design',
  },
  {
    icon: Waves,
    titleDE: 'Simulation',
    titleEN: 'Simulation',
    subtitleDE: 'Elektrische, System- und thermische Simulation',
    subtitleEN: 'Electrical, System and Thermal Simulation',
    descDE: 'Risikominimierung vor dem Prototypenbau durch MATLAB, COMSOL und SPICE.',
    descEN: 'Risk minimization before prototype construction using MATLAB, COMSOL and SPICE.',
    href: '/entwicklung/simulation',
  },
  {
    icon: ShieldCheck,
    titleDE: 'Validierung & EMV',
    titleEN: 'Validation & EMC',
    subtitleDE: 'Absicherung unter realen Einsatzbedingungen',
    subtitleEN: 'Validation Under Real Operating Conditions',
    descDE: 'Leitungsgebundene EMV-Prüfung in eigener Schirmkabine, Umwelt- und Lebensdauertests.',
    descEN: 'Conducted EMC testing in our own shielded chamber, environmental and lifetime tests.',
    href: '/entwicklung/validierung-emv',
  },
  {
    icon: FlaskConical,
    titleDE: 'Test & Verification',
    titleEN: 'Test & Verification',
    subtitleDE: 'Funktions-, Umwelt- und Lebenszyklustests',
    subtitleEN: 'Functional, Environmental and Lifecycle Tests',
    descDE: 'Testautomatisierung und automatische Datenanalyse.',
    descEN: 'Test automation and automatic data analysis.',
    href: '/entwicklung/test-verifikation',
  },
];

/* ── Expanded Core Competencies with Lucide Icons ── */
const coreCompetencies = [
  { icon: Zap, de: 'Leistungselektronik (SiC, GaN, IGBT, MOSFET)', en: 'Power Electronics (SiC, GaN, IGBT, MOSFET)' },
  { icon: Cog, de: 'Antriebselektronik & Motor Control (FOC, BLDC/PMSM)', en: 'Drive Electronics & Motor Control (FOC, BLDC/PMSM)' },
  { icon: CircuitBoard, de: 'E-Motor-Design & -Auslegung (FEA, Motor-CAD)', en: 'E-Motor Design & Engineering (FEA, Motor-CAD)' },
  { icon: Gauge, de: 'Umrichter: Automotive, Ladetechnik, Photovoltaik', en: 'Inverters: Automotive, Charging, Photovoltaics' },
  { icon: BatteryCharging, de: 'Stromversorgungen: DC/DC, AC/DC, BMS', en: 'Power Supplies: DC/DC, AC/DC, BMS' },
  { icon: Thermometer, de: 'Thermisches Management & Verlustleistungssimulation', en: 'Thermal Management & Power Loss Simulation' },
  { icon: Waves, de: 'System-, Antriebs-, Schaltungs- & Thermosimulation', en: 'System, Drive, Circuit & Thermal Simulation' },
  { icon: Radio, de: 'EMV-Design, Filterauslegung & Qualifikation', en: 'EMC Design, Filter Layout & Qualification' },
  { icon: ShieldCheck, de: 'Funktionale Sicherheit (ISO 26262, FuSi)', en: 'Functional Safety (ISO 26262, FuSi)' },
  { icon: SlidersHorizontal, de: 'Automotive SPICE (ASPICE)', en: 'Automotive SPICE (ASPICE)' },
  { icon: Microchip, de: 'Embedded Systems: Firmware, RTOS (C/C++)', en: 'Embedded Systems: Firmware, RTOS (C/C++)' },
  { icon: Radio, de: 'Kommunikationsprotokolle: CAN, LIN, SPI, EtherCAT', en: 'Communication Protocols: CAN, LIN, SPI, EtherCAT' },
  { icon: Search, de: 'Sensorik & Signalverarbeitung', en: 'Sensor Technology & Signal Processing' },
  { icon: Thermometer, de: 'Robuste Elektronik für hohe Temperaturen & raue Umgebungen', en: 'Robust Electronics for High Temperatures & Harsh Environments' },
  { icon: RefreshCw, de: 'Redesign & Produktoptimierung', en: 'Redesign & Product Optimization' },
  { icon: MonitorSmartphone, de: 'UX & Interface Engineering', en: 'UX & Interface Engineering' },
];

export default function Entwicklung() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  const { t: cms, img, vid } = useContent('entwicklung');

  // Hero video from CMS
  const heroVideoWebm = vid('hero.heroVideoWebm');
  const heroVideoMp4 = vid('hero.heroVideoMp4');
  const heroVideoPoster = img('hero.heroVideoPoster');
  const heroVideoPlayback = cms('hero.heroVideoPlayback') as 'loop' | 'once' | '';
  const heroVideo = (heroVideoWebm || heroVideoMp4)
    ? { webm: heroVideoWebm || undefined, mp4: heroVideoMp4 || undefined, poster: heroVideoPoster || undefined, playback: (heroVideoPlayback === 'once' ? 'once' : 'loop') as 'loop' | 'once' }
    : undefined;

  // ContactSlider state
  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderTopic, setSliderTopic] = useState('');
  const openSlider = (topic: string) => { setSliderTopic(topic); setSliderOpen(true); };

  return (
    <Layout>
      <SEO
        titleDE='Elektronikentwicklung'
        titleEN='Electronics Development'
        descriptionDE='Ganzheitliche Elektronikentwicklung von der Idee bis zur Serie – Hardware, Software, Simulation, Test und Zulassung aus einer Hand.'
        descriptionEN='End-to-end electronics development from concept to series production – hardware, software, simulation, testing and certification from a single source.'
        path='/entwicklung'
        breadcrumbs={[{name:'Home',url:'/'},{name:'Elektronikentwicklung',url:'/entwicklung'}]}
      />
      <SubPageHero
        tagline={cms('hero.tagline') || (isDE ? 'Elektronikentwicklung' : 'Electronics Development')}
        headline={cms('hero.headline') || (isDE ? 'Von der Idee zur serienreifen Elektronik.' : 'From idea to series-ready electronics.')}
        description={cms('hero.description') || (isDE
          ? 'Wir entwickeln Elektronik, die funktioniert – von der Systemarchitektur über Hardware, Software und Simulation bis zur Qualifikation. Mit Fokus auf Leistungselektronik, Antriebstechnik, E-Motor-Design und thermisch anspruchsvolle Projekte.'
          : 'We develop electronics that work – from system architecture through hardware, software and simulation to qualification. With focus on power electronics, drive technology, e-motor design and thermally demanding projects.')}
        cta={{ label: isDE ? 'Projekt besprechen' : 'Discuss your project', href: '/kontakt' }}
        heroImage={img('hero.heroImage', HERO_IMG)}
        heroImageAlt="Elektronikentwicklung"
        heroVideo={heroVideo}
      />

      {/* ── 2×3 Competency Grid (ENT-1) ── */}
      <section className="section-pad">
        <div className="container">
          <h2 className="fluid-h2 text-cme-dark text-center">
            {isDE ? 'Entwicklung Services – Elektronik im Überblick' : 'Development Services – Electronics Overview'}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-md)', marginTop: 'var(--space-section-header)' }}>
            {competencies.map((card, i) => (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={card.href} className="group block h-full">
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col fluid-card">
                    {/* Icon + Title */}
                    <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)', marginBottom: 'var(--space-gap-xs)' }}>
                      <div
                        className="rounded-lg bg-cme-blue-light flex items-center justify-center shrink-0"
                        style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}
                      >
                        <card.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                      </div>
                      <h3 className="fluid-h4 text-cme-dark font-bold">
                        {isDE ? card.titleDE : card.titleEN}
                      </h3>
                    </div>
                    {/* Subtitle */}
                    <p className="text-cme-blue font-medium fluid-small" style={{ marginBottom: 'var(--space-gap-xs)' }}>
                      {isDE ? card.subtitleDE : card.subtitleEN}
                    </p>
                    {/* Description */}
                    <p className="text-gray-600 fluid-small leading-relaxed flex-1">
                      {isDE ? card.descDE : card.descEN}
                    </p>
                    {/* Link arrow */}
                    <div className="flex items-center text-cme-blue font-semibold fluid-small group-hover:gap-3 transition-all" style={{ gap: 'var(--space-gap-xs)', marginTop: 'var(--space-gap-sm)' }}>
                      {isDE ? 'Mehr erfahren' : 'Learn more'}
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Closing statement below grid */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 fluid-body-lg text-center max-w-3xl mx-auto"
            style={{ marginTop: 'var(--space-gap-lg)' }}
          >
            {isDE
              ? 'Technische Tiefe statt Koordination. Alle Leistungen erbringen wir im Rahmen von Entwicklungsprojekten und auch als Einzelleistung zur Absicherung Ihrer Projekte.'
              : 'Technical depth instead of coordination. We deliver all services as part of development projects and also as individual services to safeguard your projects.'}
          </motion.p>
        </div>
      </section>

      {/* Key Capabilities – with Lucide Icons instead of blue dots */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <h2 className="fluid-h2 text-cme-dark text-center">
            {isDE ? 'Kernkompetenzen' : 'Core Competencies'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-gap-sm)', marginTop: 'var(--space-section-header)' }}>
            {coreCompetencies.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-xl border border-gray-100 hover:border-cme-blue/20 hover:shadow-md transition-all fluid-card cursor-pointer"
                onClick={() => openSlider(isDE ? item.de : item.en)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSlider(isDE ? item.de : item.en); } }}
              >
                <div className="flex items-start" style={{ gap: 'var(--space-gap-xs)' }}>
                  <item.icon className="text-cme-blue shrink-0 mt-0.5" size={18} />
                  <p className="font-medium text-cme-dark fluid-small">{isDE ? item.de : item.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services: Redesign & Beratung */}
      <section className="section-pad">
        <div className="container">
          <div className="grid md:grid-cols-2" style={{ gap: 'var(--space-gap-lg)' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="fluid-h3 text-cme-dark" style={{ marginBottom: 'var(--space-gap-sm)' }}>
                {isDE ? 'Redesign & Produktoptimierung' : 'Redesign & Product Optimization'}
              </h2>
              <p className="fluid-body text-gray-600 leading-relaxed" style={{ marginBottom: 'var(--space-gap-sm)' }}>
                {isDE
                  ? 'Wir optimieren bestehende Produkte und passen sie an neue Anforderungen an. Nicht mehr erhältliche oder nicht mehr zeitgemäße Bauteile ersetzen wir durch neu entwickelte Versionen.'
                  : 'We optimize existing products and adapt them to new requirements. We replace discontinued or outdated components with newly developed versions.'}
              </p>
              <ul className="space-y-2">
                {(isDE
                  ? ['Verbesserung des Wirkungsgrades', 'Leistungserhöhung', 'Reduktion von Energieverbrauch', 'Anpassung an verringerten Bauraum', 'Erhöhung der Lebensdauer', 'Verbesserung von Fertigungsprozessen', 'Reduzierung von Stück- oder Produktionskosten']
                  : ['Efficiency improvement', 'Power increase', 'Energy consumption reduction', 'Adaptation to reduced installation space', 'Lifetime extension', 'Manufacturing process improvement', 'Reduction of unit or production costs']
                ).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 fluid-small text-gray-600">
                    <CheckCircle2 className="text-cme-blue shrink-0 mt-0.5" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="fluid-h3 text-cme-dark" style={{ marginBottom: 'var(--space-gap-sm)' }}>
                {isDE ? 'Beratung' : 'Consulting'}
              </h2>
              <p className="fluid-body text-gray-600 leading-relaxed" style={{ marginBottom: 'var(--space-gap-sm)' }}>
                {isDE
                  ? 'Wir beraten Sie als unabhängiger Partner – von der Ideenentwicklung über Troubleshooting bis zum Second-Source-Management.'
                  : 'We advise you as an independent partner – from idea development through troubleshooting to second-source management.'}
              </p>
              <ul className="space-y-2">
                {(isDE
                  ? ['Produktentwicklung & Ideenentwicklung', 'Troubleshooting: Findung & Behebung von Fehlerquellen', 'Second-Source-Management: alternative Bauelemente', 'Planung & Durchführung von Projekten', 'Unabhängige Beurteilung von Entwicklungen']
                  : ['Product development & ideation', 'Troubleshooting: finding & fixing root causes', 'Second-source management: alternative components', 'Project planning & execution', 'Independent assessment of developments']
                ).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 fluid-small text-gray-600">
                    <Users className="text-cme-blue shrink-0 mt-0.5" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-gray-50">
        <div className="container text-center">
          <h2 className="fluid-h2 text-cme-dark">
            {isDE ? 'Technische Machbarkeit klären – bevor es teuer wird.' : 'Clarify technical feasibility – before it gets expensive.'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Senden Sie uns Ihr Lastenheft oder Ihre Projektskizze. Wir bewerten Aufwand, Risiken und den schnellsten Weg zur Serie.'
              : 'Send us your specification or project outline. We assess effort, risks and the fastest path to series production.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? 'Lastenheft einreichen' : 'Submit specification'}
          </Link>
        </div>
      </section>

      {/* Contact Slider */}
      <ContactSlider
        isOpen={sliderOpen}
        onClose={() => setSliderOpen(false)}
        topic={sliderTopic}
        pageSource={`entwicklung – ${sliderTopic}`}
      />
    </Layout>
  );
}
