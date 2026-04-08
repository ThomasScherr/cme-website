import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { ArrowRight, Cpu, Waves, FlaskConical } from 'lucide-react';
import { motion } from 'framer-motion';

const HERO_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2392__1920px_af02a6b7.jpg';

const subpages = [
  {
    icon: Cpu,
    titleDE: 'Hardware & Software',
    titleEN: 'Hardware & Software',
    descDE: 'Von der Systemarchitektur über Schaltungsentwicklung bis zur Embedded-Firmware – wir entwickeln die komplette Elektronik.',
    descEN: 'From system architecture through circuit design to embedded firmware – we develop the complete electronics.',
    href: '/entwicklung/hardware-software',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2392__1920px_af02a6b7.jpg',
  },
  {
    icon: Waves,
    titleDE: 'Simulation',
    titleEN: 'Simulation',
    descDE: 'Thermische, elektrische und mechatronische Simulation – wir validieren Ihr Design vor dem ersten Prototypen.',
    descEN: 'Thermal, electrical and mechatronic simulation – we validate your design before the first prototype.',
    href: '/entwicklung/simulation',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/thermosimulation-1500x1000-1_77e2afd4.jpg',
  },
  {
    icon: FlaskConical,
    titleDE: 'Test & Verifikation',
    titleEN: 'Test & Verification',
    descDE: 'EMV-Tests, Umwelttests und funktionale Verifikation – in unserer eigenen Testinfrastruktur am Standort Dortmund.',
    descEN: 'EMC tests, environmental tests and functional verification – in our own test infrastructure in Dortmund.',
    href: '/entwicklung/test-verifikation',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2885__1920px_ecd3ed1e.jpg',
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
                  ? 'Wir entwickeln Elektronik, die funktioniert – von der Systemarchitektur über Hardware und Software bis zur Qualifikation. Mit Fokus auf Leistungselektronik, Antriebstechnik und thermisch anspruchsvolle Projekte.'
                  : 'We develop electronics that work – from system architecture through hardware and software to qualification. With focus on power electronics, drive technology and thermally demanding projects.'}
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
              ? 'Drei Säulen für Ihre Elektronikentwicklung – von der ersten Simulation bis zum bestandenen EMV-Test.'
              : 'Three pillars for your electronics development – from first simulation to passed EMC test.'}
          </p>

          <div className="grid md:grid-cols-3" style={{ gap: 'var(--space-gap-md)', marginTop: 'var(--space-section-header)' }}>
            {subpages.map((page, i) => (
              <motion.div
                key={page.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={page.href} className="group block">
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={page.img}
                        alt={isDE ? page.titleDE : page.titleEN}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="fluid-card">
                      <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)', marginBottom: 'var(--space-gap-xs)' }}>
                        <div
                          className="rounded-lg bg-cme-blue-light flex items-center justify-center"
                          style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}
                        >
                          <page.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                        </div>
                        <h3 className="fluid-h4 text-cme-dark">
                          {isDE ? page.titleDE : page.titleEN}
                        </h3>
                      </div>
                      <p className="text-gray-600 fluid-small leading-relaxed">
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
              { de: 'Funktionale Sicherheit (ISO 26262)', en: 'Functional Safety (ISO 26262)' },
              { de: 'Automotive SPICE Level 2', en: 'Automotive SPICE Level 2' },
              { de: 'EMV-Design & Qualifikation', en: 'EMC Design & Qualification' },
              { de: 'Thermisches Management', en: 'Thermal Management' },
              { de: 'Embedded Software (C/C++)', en: 'Embedded Software (C/C++)' },
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

      {/* CTA */}
      <section className="section-pad">
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
