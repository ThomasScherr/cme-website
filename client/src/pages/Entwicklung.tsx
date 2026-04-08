import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { ArrowRight, Cpu, MemoryStick, Waves, FlaskConical, MonitorSmartphone, Code2, Cog } from 'lucide-react';
import { motion } from 'framer-motion';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';
const HERO_IMG = `${CDN}/JK_2392__1920px_af02a6b7.jpg`;

const subpages = [
  {
    icon: Cpu,
    titleDE: 'Hardwareentwicklung',
    titleEN: 'Hardware Development',
    descDE: 'Systemarchitektur, analoge und digitale Schaltungsentwicklung, PCB-Layout und Leistungselektronik – maximale Effizienz und hohe Energiedichte auf minimalem Bauraum.',
    descEN: 'System architecture, analog and digital circuit design, PCB layout and power electronics – maximum efficiency and high energy density in minimal space.',
    href: '/entwicklung/hardware-software',
    img: `${CDN}/JK_2392__1920px_af02a6b7.jpg`,
  },
  {
    icon: MemoryStick,
    titleDE: 'Embedded Software',
    titleEN: 'Embedded Software',
    descDE: 'Vom Demo-Code bis zur komplexen Serienapplikation: Firmware für Mess-, Steuer- und Regelungssysteme, Antriebs- und Motorsteuerungen sowie Lichttechnik.',
    descEN: 'From demo code to complex series applications: firmware for measurement, control and regulation systems, drive and motor controllers, and lighting technology.',
    href: '/entwicklung/hardware-software',
    img: `${CDN}/JK_2392__1920px_af02a6b7.jpg`,
  },
  {
    icon: Waves,
    titleDE: 'Simulation',
    titleEN: 'Simulation',
    descDE: 'Systemsimulation, Antriebssimulation, Reglerentwicklung, Schaltungs- und Verlustsimulation, Thermosimulation und E-Motor-Auslegung – wir validieren Ihr Design vor dem ersten Prototypen.',
    descEN: 'System simulation, drive simulation, controller development, circuit and loss simulation, thermal simulation and e-motor design – we validate your design before the first prototype.',
    href: '/entwicklung/simulation',
    img: `${CDN}/thermosimulation-1500x1000-1_77e2afd4.jpg`,
  },
  {
    icon: FlaskConical,
    titleDE: 'Test & Verifikation',
    titleEN: 'Test & Verification',
    descDE: 'EMV-Tests in unserem eigenen EMV-Messbereich, Umweltsimulationen und individuelle Prüfstände – ein hoher Absicherungsgrad für eine reibungslose Serienproduktion.',
    descEN: 'EMC tests in our own EMC measurement facility, environmental simulations and custom test benches – a high level of validation for smooth series production.',
    href: '/entwicklung/test-verifikation',
    img: `${CDN}/JK_2885__1920px_ecd3ed1e.jpg`,
  },
  {
    icon: Cog,
    titleDE: 'E-Motor-Design',
    titleEN: 'E-Motor Design',
    descDE: 'Auslegung und Optimierung von Elektromotoren (EC, DC, Synchronmaschinen) – Magnetkreis-Design, Blechschnitt-Konstruktion und Hochtemperatur-Auslegung.',
    descEN: 'Design and optimization of electric motors (EC, DC, synchronous machines) – magnetic circuit design, lamination construction and high-temperature design.',
    href: '/entwicklung/e-motor-design',
    img: `${CDN}/JK_1736__1920px_e713f7ca.jpg`,
  },
  {
    icon: MonitorSmartphone,
    titleDE: 'UX & Interface Engineering',
    titleEN: 'UX & Interface Engineering',
    descDE: 'Bedienkonzepte, Userflows und Interface-Design für technische Systeme – von der Analyse bis zur seriennahen Umsetzung.',
    descEN: 'Operating concepts, user flows and interface design for technical systems – from analysis to production-ready implementation.',
    href: '/entwicklung/ux-interface-engineering',
    img: `${CDN}/interface-prototyping_a2418e21.png`,
  },
  {
    icon: Code2,
    titleDE: 'Software & Digitale Systeme',
    titleEN: 'Software & Digital Systems',
    descDE: 'Web-Apps, Mobile Apps, Backend-Architektur und Cloud-Integration – digitale Lösungen für Ihre Produkte.',
    descEN: 'Web apps, mobile apps, backend architecture and cloud integration – digital solutions for your products.',
    href: '/entwicklung/software-digitale-systeme',
    img: `${CDN}/web-apps_26e3e533.png`,
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
                  {isDE ? 'Projekt anfragen' : 'Request Project'}
                </Link>
              </div>
            </div>
            <div className="relative">
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

      {/* Subpages Grid */}
      <section className="section-pad">
        <div className="container">
          <h2 className="fluid-h2 text-cme-dark text-center">
            {isDE ? 'Unsere Entwicklungsleistungen' : 'Our Development Services'}
          </h2>
          <p className="text-gray-600 text-center fluid-body-lg max-w-2xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Sieben Kompetenzfelder für Ihre Elektronikentwicklung – von der Hardwareentwicklung über E-Motor-Design bis zum fertigen digitalen Produkt.'
              : 'Seven competence areas for your electronics development – from hardware development through e-motor design to the finished digital product.'}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-md)', marginTop: 'var(--space-section-header)' }}>
            {subpages.map((page, i) => (
              <motion.div
                key={page.href + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={page.href} className="group block h-full">
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={page.img}
                        alt={isDE ? page.titleDE : page.titleEN}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="fluid-card flex flex-col flex-1">
                      <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)', marginBottom: 'var(--space-gap-xs)' }}>
                        <div
                          className="rounded-lg bg-cme-blue-light flex items-center justify-center shrink-0"
                          style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}
                        >
                          <page.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                        </div>
                        <h3 className="fluid-h4 text-cme-dark">
                          {isDE ? page.titleDE : page.titleEN}
                        </h3>
                      </div>
                      <p className="text-gray-600 fluid-small leading-relaxed flex-1">
                        {isDE ? page.descDE : page.descEN}
                      </p>
                      <div className="flex items-center text-cme-blue font-semibold fluid-small group-hover:gap-3 transition-all" style={{ gap: 'var(--space-gap-xs)', marginTop: 'var(--space-gap-xs)' }}>
                        {isDE ? 'Mehr erfahren' : 'Learn more'}
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
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
            {isDE ? 'Bereit für Ihr Projekt?' : 'Ready for your project?'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Sprechen Sie mit unseren Entwicklern – wir geben ehrliches technisches Feedback und kalkulieren Ihr Projekt.'
              : 'Talk to our engineers – we provide honest technical feedback and calculate your project.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? 'Projekt anfragen' : 'Request Project'}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
