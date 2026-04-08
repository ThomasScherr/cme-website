import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Car, Factory, Zap, Building2, Cpu, HeartPulse } from 'lucide-react';

const markets = [
  {
    icon: Car,
    titleDE: 'Automotive',
    titleEN: 'Automotive',
    descDE: 'Antriebselektronik, Ladeinfrastruktur, ADAS-Systeme und Bordnetzsteuerungen. Entwicklung nach Automotive SPICE (ASPICE) und ISO 26262.',
    descEN: 'Drive electronics, charging infrastructure, ADAS systems and power distribution. Development according to Automotive SPICE (ASPICE) and ISO 26262.',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2392__1920px_af02a6b7.jpg',
  },
  {
    icon: Factory,
    titleDE: 'Industrie & Automation',
    titleEN: 'Industry & Automation',
    descDE: 'Steuerungselektronik, Sensorik, Aktorik und industrielle Kommunikation. Robuste Designs für raue Umgebungen.',
    descEN: 'Control electronics, sensors, actuators and industrial communication. Robust designs for harsh environments.',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1736__1920px_e713f7ca.jpg',
  },
  {
    icon: Zap,
    titleDE: 'Energie & Leistungselektronik',
    titleEN: 'Energy & Power Electronics',
    descDE: 'Wechselrichter, DC/DC-Wandler, Batteriemanagement und Ladeelektronik. SiC- und GaN-basierte Topologien.',
    descEN: 'Inverters, DC/DC converters, battery management and charging electronics. SiC and GaN-based topologies.',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_0425__1920px_178fc1eb.jpg',
  },
  {
    icon: HeartPulse,
    titleDE: 'Medizintechnik',
    titleEN: 'Medical Technology',
    descDE: 'Elektronik für Diagnostik, Therapie und Laborgeräte. Entwicklung und Fertigung nach regulatorischen Anforderungen.',
    descEN: 'Electronics for diagnostics, therapy and laboratory devices. Development and manufacturing according to regulatory requirements.',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2055__1920px_00c91d17.jpg',
  },
  {
    icon: Building2,
    titleDE: 'Gebäudetechnik',
    titleEN: 'Building Technology',
    descDE: 'Smart-Home-Steuerungen, Gebäudeautomation und Energiemanagement. Vernetzte Systeme für intelligente Gebäude.',
    descEN: 'Smart home controls, building automation and energy management. Connected systems for intelligent buildings.',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2885__1920px_ecd3ed1e.jpg',
  },
  {
    icon: Cpu,
    titleDE: 'Smart Devices & IoT',
    titleEN: 'Smart Devices & IoT',
    descDE: 'Embedded-Systeme, IoT-Gateways und vernetzte Sensorik. Von der Hardware bis zur Cloud-Anbindung.',
    descEN: 'Embedded systems, IoT gateways and connected sensors. From hardware to cloud connectivity.',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_0425__1920px_178fc1eb.jpg',
  },
];

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
              {isDE ? 'Branchen & Märkte' : 'Industries & Markets'}
            </span>
            <h1 className="fluid-h1 text-cme-dark leading-tight" style={{ marginTop: 'var(--space-gap-xs)' }}>
              {isDE ? 'Elektronik für anspruchsvolle Branchen.' : 'Electronics for demanding industries.'}
            </h1>
            <p className="fluid-body-lg text-gray-600" style={{ marginTop: 'var(--space-gap-sm)' }}>
              {isDE
                ? 'Von Automotive über Medizintechnik bis zur Energiewende – CME entwickelt und fertigt Elektronik für Branchen, in denen Zuverlässigkeit keine Option, sondern Voraussetzung ist.'
                : 'From automotive through medical technology to the energy transition – CME develops and manufactures electronics for industries where reliability is not an option, but a prerequisite.'}
            </p>
          </div>
        </div>
      </section>

      {/* Markets Grid */}
      <section className="section-pad">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-gap-sm)' }}>
            {markets.map((market, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={market.img}
                    alt={isDE ? market.titleDE : market.titleEN}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div
                      className="rounded-lg bg-white/90 flex items-center justify-center"
                      style={{ width: 'clamp(2rem, 1.5rem + 1vw, 2.5rem)', height: 'clamp(2rem, 1.5rem + 1vw, 2.5rem)' }}
                    >
                      <market.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                    </div>
                  </div>
                </div>
                <div className="fluid-card">
                  <h3 className="font-bold text-cme-dark fluid-body" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.5rem)' }}>
                    {isDE ? market.titleDE : market.titleEN}
                  </h3>
                  <p className="text-gray-600 fluid-small leading-relaxed">
                    {isDE ? market.descDE : market.descEN}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-gray-50">
        <div className="container text-center">
          <h2 className="fluid-h2 text-cme-dark">
            {isDE ? 'Ihre Branche ist nicht dabei?' : 'Your industry is not listed?'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Kein Problem – unsere Kernkompetenzen in Leistungselektronik und thermischem Management sind branchenübergreifend einsetzbar. Sprechen Sie mit uns über Ihr Projekt.'
              : 'No problem – our core competencies in power electronics and thermal management are applicable across industries. Talk to us about your project.'}
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
