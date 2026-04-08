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
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-white to-cme-blue-light/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-cme-blue text-sm font-semibold tracking-widest uppercase">
                {isDE ? 'Elektronikentwicklung' : 'Electronics Development'}
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-cme-dark mt-4 leading-tight">
                {isDE ? 'Von der Idee zur serienreifen Elektronik.' : 'From idea to series-ready electronics.'}
              </h1>
              <p className="text-lg text-gray-600 mt-6 max-w-lg">
                {isDE
                  ? 'Wir entwickeln Elektronik, die funktioniert – von der Systemarchitektur über Hardware und Software bis zur Qualifikation. Mit Fokus auf Leistungselektronik, Antriebstechnik und thermisch anspruchsvolle Projekte.'
                  : 'We develop electronics that work – from system architecture through hardware and software to qualification. With focus on power electronics, drive technology and thermally demanding projects.'}
              </p>
              <div className="flex gap-4 mt-8">
                <Link
                  href="/kontakt"
                  className="bg-cme-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors"
                >
                  {isDE ? 'Projekt anfragen' : 'Request Project'}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="diamond w-72 h-72 lg:w-96 lg:h-96 mx-auto">
                <img src={HERO_IMG} alt="Elektronikentwicklung" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subpages Grid */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold text-cme-dark text-center">
            {isDE ? 'Unsere Entwicklungsleistungen' : 'Our Development Services'}
          </h2>
          <p className="text-gray-600 text-center mt-4 max-w-2xl mx-auto">
            {isDE
              ? 'Drei Säulen für Ihre Elektronikentwicklung – von der ersten Simulation bis zum bestandenen EMV-Test.'
              : 'Three pillars for your electronics development – from first simulation to passed EMC test.'}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
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
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-cme-blue-light flex items-center justify-center">
                          <page.icon size={20} className="text-cme-blue" />
                        </div>
                        <h3 className="text-xl font-bold text-cme-dark">
                          {isDE ? page.titleDE : page.titleEN}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {isDE ? page.descDE : page.descEN}
                      </p>
                      <div className="flex items-center gap-2 mt-4 text-cme-blue font-semibold text-sm group-hover:gap-3 transition-all">
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
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-cme-dark text-center">
            {isDE ? 'Kernkompetenzen' : 'Core Competencies'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
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
                className="bg-white rounded-xl p-5 border border-gray-100 hover:border-cme-blue/20 hover:shadow-md transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-cme-blue mb-3" />
                <p className="font-medium text-cme-dark text-sm">{isDE ? item.de : item.en}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-cme-dark">
            {isDE ? 'Bereit für Ihr Projekt?' : 'Ready for your project?'}
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            {isDE
              ? 'Sprechen Sie mit unseren Entwicklern – wir geben ehrliches technisches Feedback und kalkulieren Ihr Projekt.'
              : 'Talk to our engineers – we provide honest technical feedback and calculate your project.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors mt-8"
          >
            {isDE ? 'Projekt anfragen' : 'Request Project'}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
