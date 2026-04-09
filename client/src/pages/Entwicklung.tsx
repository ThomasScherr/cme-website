import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { ArrowRight, Cpu, Cog, SlidersHorizontal, Waves, ShieldCheck, FlaskConical } from 'lucide-react';
import { motion } from 'framer-motion';

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

export default function Entwicklung() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <Layout>
      {/* Hero */}
      <section className="subpage-hero bg-gradient-to-br from-white to-cme-blue-light/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 items-center" style={{ gap: 'var(--space-gap-lg)' }}>
            <div>
              <span className="text-cme-blue fluid-small font-semibold tracking-widest uppercase">
                {isDE ? 'Elektronikentwicklung' : 'Electronics Development'}
              </span>
              <h1 className="fluid-h1 text-cme-dark leading-tight" style={{ marginTop: 'var(--space-gap-xs)' }}>
                {isDE ? 'Von der Idee zur serienreifen Elektronik.' : 'From idea to series-ready electronics.'}
              </h1>
              <p className="fluid-body-lg text-gray-600 max-w-lg" style={{ marginTop: 'var(--space-gap-sm)' }}>
                {isDE
                  ? 'Wir entwickeln Elektronik, die funktioniert – von der Systemarchitektur über Hardware, Software und Simulation bis zur Qualifikation. Mit Fokus auf Leistungselektronik, Antriebstechnik, E-Motor-Design und thermisch anspruchsvolle Projekte.'
                  : 'We develop electronics that work – from system architecture through hardware, software and simulation to qualification. With focus on power electronics, drive technology, e-motor design and thermally demanding projects.'}
              </p>
              <div style={{ marginTop: 'var(--space-gap-md)' }}>
                <Link
                  href="/kontakt"
                  className="bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
                >
                  {isDE ? 'Projekt besprechen' : 'Discuss your project'}
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex relative items-center justify-center">
              <div
                className="diamond mx-auto"
                style={{ width: 'clamp(16rem, 6rem + 20vw, 34rem)', height: 'clamp(16rem, 6rem + 20vw, 34rem)' }}
              >
                <img src={HERO_IMG} alt="Elektronikentwicklung" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Key Capabilities */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <h2 className="fluid-h2 text-cme-dark text-center">
            {isDE ? 'Kernkompetenzen' : 'Core Competencies'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-gap-sm)', marginTop: 'var(--space-section-header)' }}>
            {[
              { de: 'Leistungselektronik (SiC, GaN)', en: 'Power Electronics (SiC, GaN)' },
              { de: 'Antriebselektronik & Motor Control', en: 'Drive Electronics & Motor Control' },
              { de: 'E-Motor-Design & -Auslegung', en: 'E-Motor Design & Engineering' },
              { de: 'Umrichter mit hohem Wirkungsgrad', en: 'High-Efficiency Inverters' },
              { de: 'Robuste Elektronik für raue Umgebungen', en: 'Robust Electronics for Harsh Environments' },
              { de: 'Thermisches Management', en: 'Thermal Management' },
              { de: 'Funktionale Sicherheit (ISO 26262)', en: 'Functional Safety (ISO 26262)' },
              { de: 'Automotive SPICE (ASPICE)', en: 'Automotive SPICE (ASPICE)' },
              { de: 'EMV-Design & Qualifikation', en: 'EMC Design & Qualification' },
              { de: 'Embedded Software (C/C++)', en: 'Embedded Software (C/C++)' },
              { de: 'Redesign & Produktoptimierung', en: 'Redesign & Product Optimization' },
              { de: 'UX & Interface Engineering', en: 'UX & Interface Engineering' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 hover:border-cme-blue/20 hover:shadow-md transition-all fluid-card"
              >
                <div className="w-2 h-2 rounded-full bg-cme-blue" style={{ marginBottom: 'var(--space-gap-xs)' }} />
                <p className="font-medium text-cme-dark fluid-small">{isDE ? item.de : item.en}</p>
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
                  ? ['Verbesserung des Wirkungsgrades', 'Leistungserhöhung', 'Reduktion von Energieverbrauch', 'Anpassung an verringerten Bauraum', 'Erhöhung der Lebensdauer', 'Reduzierung von Stück- oder Produktionskosten']
                  : ['Efficiency improvement', 'Power increase', 'Energy consumption reduction', 'Adaptation to reduced installation space', 'Lifetime extension', 'Reduction of unit or production costs']
                ).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 fluid-small text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-cme-blue mt-2 flex-shrink-0" />
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
                    <span className="w-1.5 h-1.5 rounded-full bg-cme-blue mt-2 flex-shrink-0" />
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
    </Layout>
  );
}
