import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { ArrowRight, CircuitBoard, Boxes, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const HERO_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_0425__1920px_178fc1eb.jpg';

const subpages = [
  {
    icon: CircuitBoard,
    titleDE: 'Leiterplatten bestücken',
    titleEN: 'PCB Assembly',
    descDE: 'SMD- und THT-Bestückung auf modernsten Fertigungslinien – vom Prototyp bis zur Großserie.',
    descEN: 'SMD and THT assembly on state-of-the-art production lines – from prototype to high-volume series.',
    href: '/fertigung/leiterplatten',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1148__1920px_1cc154ec.jpg',
  },
  {
    icon: Boxes,
    titleDE: 'Baugruppen fertigen',
    titleEN: 'Module Assembly',
    descDE: 'Komplette Baugruppenmontage inkl. Verguss, Schutzlackierung, Kabelkonfektionierung und Endmontage.',
    descEN: 'Complete module assembly including potting, conformal coating, cable assembly and final assembly.',
    href: '/fertigung/baugruppen',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1736__1920px_e713f7ca.jpg',
  },
  {
    icon: ShieldCheck,
    titleDE: 'Qualitätsmanagement',
    titleEN: 'Quality Management',
    descDE: 'ISO 9001 & 14001 zertifiziert. AOI, Röntgeninspektion und lückenlose Rückverfolgbarkeit.',
    descEN: 'ISO 9001 & 14001 certified. AOI, X-ray inspection and complete traceability.',
    href: '/fertigung/qualitaet',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2055__1920px_00c91d17.jpg',
  },
];

export default function Fertigung() {
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
                {isDE ? 'Elektronikfertigung (EMS)' : 'Electronics Manufacturing (EMS)'}
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-cme-dark mt-4 leading-tight">
                {isDE ? 'Vom Prototyp zur Serie. Made in Dortmund.' : 'From prototype to series. Made in Dortmund.'}
              </h1>
              <p className="text-lg text-gray-600 mt-6 max-w-lg">
                {isDE
                  ? 'ISO-zertifizierte Elektronikfertigung mit eigener SMD- und THT-Linie. Prototypen, Kleinserien und Serienproduktion – alles aus einer Hand.'
                  : 'ISO-certified electronics manufacturing with own SMD and THT lines. Prototypes, small series and series production – all from a single source.'}
              </p>
              <div className="flex gap-4 mt-8">
                <Link
                  href="/kontakt"
                  className="bg-cme-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors"
                >
                  {isDE ? 'Angebot anfragen' : 'Request Quote'}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="diamond w-72 h-72 lg:w-96 lg:h-96 mx-auto">
                <img src={HERO_IMG} alt="Elektronikfertigung" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subpages Grid */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold text-cme-dark text-center">
            {isDE ? 'Unsere Fertigungsleistungen' : 'Our Manufacturing Services'}
          </h2>
          <p className="text-gray-600 text-center mt-4 max-w-2xl mx-auto">
            {isDE
              ? 'Von der Leiterplattenbestückung über die Baugruppenmontage bis zur Qualitätssicherung – alles unter einem Dach.'
              : 'From PCB assembly through module integration to quality assurance – all under one roof.'}
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

      {/* Key Facts */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-cme-dark text-center">
            {isDE ? 'Fertigungskapazitäten' : 'Manufacturing Capabilities'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { de: 'SMD-Bestückung bis 01005', en: 'SMD Assembly down to 01005' },
              { de: 'THT-Bestückung & Selektivlöten', en: 'THT Assembly & Selective Soldering' },
              { de: 'AOI & Röntgeninspektion', en: 'AOI & X-Ray Inspection' },
              { de: 'Verguss & Schutzlackierung', en: 'Potting & Conformal Coating' },
              { de: 'Kabelkonfektionierung', en: 'Cable Assembly' },
              { de: 'Funktionstest & ICT', en: 'Functional Test & ICT' },
              { de: 'Traceability & MES', en: 'Traceability & MES' },
              { de: 'Design for Manufacturing', en: 'Design for Manufacturing' },
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
            {isDE ? 'Fertigung anfragen' : 'Request Manufacturing'}
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            {isDE
              ? 'Senden Sie uns Ihre Stückliste und Gerber-Daten – wir kalkulieren schnell und transparent.'
              : 'Send us your BOM and Gerber data – we calculate quickly and transparently.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors mt-8"
          >
            {isDE ? 'Angebot anfragen' : 'Request Quote'}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
