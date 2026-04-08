import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

const toolchain = [
  {
    toolDE: 'MATLAB & Simulink',
    toolEN: 'MATLAB & Simulink',
    areaDE: 'Modellbasierte Funktionsentwicklung',
    areaEN: 'Model-Based Function Development',
    descDE: 'Algorithmus- und Steuerungsdesign, System- und Elektrosimulation',
    descEN: 'Algorithm and control design, system and electrical simulation',
  },
  {
    toolDE: 'Simscape Electrical',
    toolEN: 'Simscape Electrical',
    areaDE: 'System- & Elektrosimulation',
    areaEN: 'System & Electrical Simulation',
    descDE: 'Detaillierte Modellierung elektrischer Antriebe und Leistungselektronik',
    descEN: 'Detailed modeling of electric drives and power electronics',
  },
  {
    toolDE: 'SPICE (LTspice, Micro-Cap)',
    toolEN: 'SPICE (LTspice, Micro-Cap)',
    areaDE: 'Elektronische Schaltungssimulation',
    areaEN: 'Electronic Circuit Simulation',
    descDE: 'Leistungsverlustsimulation, Bauteilstress-Analyse, Filterdimensionierung',
    descEN: 'Power loss simulation, component stress analysis, filter dimensioning',
  },
  {
    toolDE: 'COMSOL Multiphysics',
    toolEN: 'COMSOL Multiphysics',
    areaDE: 'FEA & Thermisches Design',
    areaEN: 'FEA & Thermal Design',
    descDE: 'Finite-Elemente-Analyse, Multiphysik-Kopplung (thermisch, elektrisch, mechanisch)',
    descEN: 'Finite element analysis, multiphysics coupling (thermal, electrical, mechanical)',
  },
  {
    toolDE: 'Motor-CAD (ANSYS)',
    toolEN: 'Motor-CAD (ANSYS)',
    areaDE: 'E-Motor Design',
    areaEN: 'E-Motor Design',
    descDE: 'Elektromagnetische FEA, Motordesign und -optimierung',
    descEN: 'Electromagnetic FEA, motor design and optimization',
  },
  {
    toolDE: 'PLECS',
    toolEN: 'PLECS',
    areaDE: 'Leistungselektronik-Simulation',
    areaEN: 'Power Electronics Simulation',
    descDE: 'Schnelle Simulation von Schaltwandlern und Antriebsumrichtern',
    descEN: 'Fast simulation of switching converters and drive inverters',
  },
];

const toolLogos = [
  { name: 'MathWorks', img: `${CDN}/mathworks_c08e88a4.png` },
  { name: 'PLECS', img: `${CDN}/plecs_16b1d600.png` },
  { name: 'COMSOL', img: `${CDN}/comsol_8324696c.png` },
  { name: 'Micro-Cap', img: `${CDN}/microcap_a5f61512.png` },
  { name: 'LTspice', img: `${CDN}/ltspice_310026fe.png` },
  { name: 'Motor-CAD / ANSYS', img: `${CDN}/motorcad_1b971003.png` },
];

export default function Simulation() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <Layout>
      {/* Breadcrumb + Hero */}
      <section className="subpage-hero bg-gradient-to-br from-white to-cme-blue-light/20">
        <div className="container">
          <div className="flex items-center fluid-xs text-gray-500" style={{ gap: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.5rem)', marginBottom: 'var(--space-gap-md)' }}>
            <Link href="/" className="hover:text-cme-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href="/entwicklung" className="hover:text-cme-blue transition-colors">
              {isDE ? 'Elektronikentwicklung' : 'Electronics Development'}
            </Link>
            <span>/</span>
            <span className="text-cme-dark font-medium">{isDE ? 'Simulation' : 'Simulation'}</span>
          </div>

          <div className="grid lg:grid-cols-2 items-center" style={{ gap: 'var(--space-gap-lg)' }}>
            <div>
              <Link
                href="/entwicklung"
                className="inline-flex items-center gap-2 text-cme-blue fluid-small font-medium hover:gap-3 transition-all"
                style={{ marginBottom: 'var(--space-gap-xs)' }}
              >
                <ArrowLeft size={16} />
                {isDE ? 'Elektronikentwicklung' : 'Electronics Development'}
              </Link>
              <h1 className="fluid-h1 text-cme-dark leading-tight">
                Simulation
              </h1>
              <p className="fluid-body-lg text-gray-600" style={{ marginTop: 'var(--space-gap-xs)' }}>
                {isDE
                  ? 'Thermische, elektrische und mechatronische Simulation – wir validieren Ihr Design vor dem ersten Prototypen.'
                  : 'Thermal, electrical and mechatronic simulation – we validate your design before the first prototype.'}
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/thermosimulation-1500x1000-1_77e2afd4.jpg"
                  alt="Simulation"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-pad">
        <div className="container">
          <div className="max-w-3xl">
            <p className="fluid-body-lg text-gray-700 leading-relaxed">
              {isDE
                ? 'Simulation ist bei CME kein nachgelagerter Prüfschritt, sondern integraler Bestandteil der Entwicklung. Wir simulieren thermische Belastungen, elektrische Felder und mechatronische Systeme bereits in der Konzeptphase. So identifizieren wir Schwachstellen frühzeitig und optimieren das Design iterativ – bevor der erste Prototyp gefertigt wird. Das spart Iterationsschleifen, senkt Kosten und beschleunigt die Time-to-Market.'
                : 'Simulation at CME is not a downstream verification step, but an integral part of development. We simulate thermal loads, electrical fields and mechatronic systems already in the concept phase. This allows us to identify weaknesses early and optimize the design iteratively – before the first prototype is manufactured. This saves iteration loops, reduces costs and accelerates time-to-market.'}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-sm)', marginTop: 'var(--space-section-header)' }}>
            {[
              { de: 'Thermische Simulation (CFD, FEM)', en: 'Thermal Simulation (CFD, FEM)' },
              { de: 'Elektrische Feldsimulation', en: 'Electrical Field Simulation' },
              { de: 'Signalintegrität (SI) & Power Integrity (PI)', en: 'Signal Integrity (SI) & Power Integrity (PI)' },
              { de: 'EMV-Vorabsimulation', en: 'EMC Pre-Simulation' },
              { de: 'Mechatronische Systemsimulation', en: 'Mechatronic System Simulation' },
              { de: 'Thermisches Management & Entwärmungskonzepte', en: 'Thermal Management & Cooling Concepts' },
              { de: 'Strömungssimulation für Kühlkörper', en: 'Flow Simulation for Heat Sinks' },
              { de: 'Zuverlässigkeitssimulation', en: 'Reliability Simulation' },
              { de: 'Design-Optimierung durch Simulationsergebnisse', en: 'Design Optimization through Simulation Results' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 hover:border-cme-blue/20 hover:shadow-md transition-all fluid-card"
              >
                <div className="w-2 h-2 rounded-full bg-cme-blue" style={{ marginBottom: 'var(--space-gap-xs)' }} />
                <p className="font-medium text-cme-dark fluid-body">{isDE ? feature.de : feature.en}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Toolchain Section */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <h2 className="fluid-h2 text-cme-dark text-center">
            {isDE ? 'Unsere Simulations-Toolchain' : 'Our Simulation Toolchain'}
          </h2>
          <p className="text-gray-600 text-center fluid-body-lg max-w-2xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Wir setzen auf bewährte Industrietools – und beherrschen sie in der Tiefe.'
              : 'We rely on proven industry tools – and master them in depth.'}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-sm)', marginTop: 'var(--space-section-header)' }}>
            {toolchain.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl border border-gray-100 hover:border-cme-blue/20 hover:shadow-lg transition-all fluid-card"
              >
                <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)', marginBottom: 'var(--space-gap-xs)' }}>
                  <div className="w-1.5 h-6 bg-cme-blue rounded-full flex-shrink-0" />
                  <h3 className="font-semibold text-cme-dark fluid-body">
                    {isDE ? tool.toolDE : tool.toolEN}
                  </h3>
                </div>
                <p className="text-cme-blue font-medium fluid-small" style={{ marginBottom: 'var(--space-gap-xs)' }}>
                  {isDE ? tool.areaDE : tool.areaEN}
                </p>
                <p className="text-gray-600 fluid-xs leading-relaxed">
                  {isDE ? tool.descDE : tool.descEN}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Logos */}
      <section className="section-pad">
        <div className="container">
          <h3 className="fluid-h4 text-cme-dark text-center" style={{ marginBottom: 'var(--space-gap-md)' }}>
            {isDE ? 'Tools & Plattformen' : 'Tools & Platforms'}
          </h3>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: 'var(--space-gap-md)' }}>
            {toolLogos.map((logo) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-center hover:shadow-md transition-all"
                style={{ width: 'clamp(8rem, 5rem + 6vw, 12rem)', height: 'clamp(4rem, 3rem + 3vw, 6rem)' }}
              >
                <img
                  src={logo.img}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <h2 className="fluid-h3 text-cme-dark" style={{ marginBottom: 'var(--space-gap-md)' }}>
            {isDE ? 'Weitere Leistungen' : 'Related Services'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-sm)' }}>
            {[
              { href: '/entwicklung/hardware-software', titleDE: 'Hardware & Software', titleEN: 'Hardware & Software', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2392__1920px_af02a6b7.jpg' },
              { href: '/entwicklung/test-verifikation', titleDE: 'Test & Verifikation', titleEN: 'Test & Verification', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2885__1920px_ecd3ed1e.jpg' },
            ].map((page) => (
              <Link key={page.href} href={page.href} className="group block">
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={page.img}
                      alt={isDE ? page.titleDE : page.titleEN}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center justify-between fluid-card">
                    <h3 className="font-semibold text-cme-dark fluid-body">{isDE ? page.titleDE : page.titleEN}</h3>
                    <ArrowRight size={18} className="text-cme-blue group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
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
              ? 'Sprechen Sie mit uns – wir geben ehrliches technisches Feedback und kalkulieren Ihr Projekt.'
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
