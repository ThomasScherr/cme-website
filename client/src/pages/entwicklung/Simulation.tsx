import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { Thermometer, Zap, Cog, Wind, BarChart3, Target, Cpu, Activity, Gauge, Waves, Box, CircuitBoard } from 'lucide-react';
import { motion } from 'framer-motion';
import SubPageHero from '@/components/SubPageHero';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

/* ── Six core simulation domains ── */
const simDomains = [
  {
    icon: Cog,
    titleDE: 'Systemsimulation',
    titleEN: 'System Simulation',
    descDE: 'Gesamtsystem-Simulationen, modellbasierte Funktionsentwicklung gemäß V-Modell, transiente Zeitbereichsanalysen und kundenspezifische Modellentwicklung. Wir simulieren das Verhalten komplexer, stark vernetzter Systeme und lösen regelungstechnische Aufgaben.',
    descEN: 'Full system simulations, model-based function development according to V-model, transient time-domain analyses and custom model development. We simulate the behavior of complex, highly interconnected systems and solve control engineering tasks.',
    items: {
      de: ['Gesamtsystem-Simulationen & -studien', 'Modellbasierte Funktionsentwicklung (V-Modell)', 'Transiente Zeitbereichsanalysen', 'Kundenspezifische Modelle & Erweiterungen', 'Regelungstechnische Aufgabenstellungen'],
      en: ['Full system simulations & studies', 'Model-based function development (V-model)', 'Transient time-domain analyses', 'Custom models & extensions', 'Control engineering tasks'],
    },
  },
  {
    icon: Gauge,
    titleDE: 'Antriebssimulation',
    titleEN: 'Drive Simulation',
    descDE: 'Konzeptvergleich und Optimierung von Antriebssystemen – vom Zusammenspiel zwischen Motor, Elektronik und Regelungsstrategie bis zur applikationsspezifischen Feinabstimmung. Simulation von EC-Antrieben mit Fokus auf Verlustleistung, Effizienz und Geräuschoptimierung.',
    descEN: 'Concept comparison and optimization of drive systems – from the interplay between motor, electronics and control strategy to application-specific fine-tuning. Simulation of EC drives with focus on power loss, efficiency and noise optimization.',
    items: {
      de: ['Konzeptvergleich & Optimierung von Antriebssystemen', 'Zusammenspiel Motor, Elektronik & Regelungsstrategie', 'EC-Antriebe: Verlustleistung, Effizienz, Geräusch', 'Simulation in verschiedenen Modelltiefen', 'Grenzwert- & Worst-case-Simulationen'],
      en: ['Concept comparison & optimization of drive systems', 'Interplay of motor, electronics & control strategy', 'EC drives: power loss, efficiency, noise', 'Simulation at various model depths', 'Limit value & worst-case simulations'],
    },
  },
  {
    icon: Activity,
    titleDE: 'Reglerentwicklung & -Design',
    titleEN: 'Controller Development & Design',
    descDE: 'Entwurf digitaler Regelungskonzepte mit MIL-, SIL- und HIL-Simulation. Entwicklung robuster Ansteuer-Algorithmen, sensorloser Regelungsverfahren und Rapid-Control-Prototyping mit Echtzeit-Entwicklungssystemen.',
    descEN: 'Design of digital control concepts with MIL, SIL and HIL simulation. Development of robust drive algorithms, sensorless control methods and rapid control prototyping with real-time development systems.',
    items: {
      de: ['MIL-, SIL- & HIL-Simulation', 'Robuste Ansteuer-Algorithmen für EC-Antriebe', 'Sensorlose Ansteuer- & Regelungsverfahren', 'Rapid-Control-Prototyping (Echtzeit)', 'Regler-Parametrierung durch Offline- & Online-Simulation'],
      en: ['MIL, SIL & HIL simulation', 'Robust drive algorithms for EC drives', 'Sensorless drive & control methods', 'Rapid control prototyping (real-time)', 'Controller parameterization via offline & online simulation'],
    },
  },
  {
    icon: CircuitBoard,
    titleDE: 'Schaltungs- & Verlustsimulation',
    titleEN: 'Circuit & Loss Simulation',
    descDE: 'Analoge und digitale Schaltungssimulationen, Leistungsberechnung von Endstufen und Umrichtersystemen. Detaillierte Verlustleistungssimulation in Leistungshalbleitern (MOSFETs, IGBTs) mit herstellerspezifischen SPICE-Modellen.',
    descEN: 'Analog and digital circuit simulations, power calculation of output stages and inverter systems. Detailed power loss simulation in power semiconductors (MOSFETs, IGBTs) with manufacturer-specific SPICE models.',
    items: {
      de: ['Analoge & digitale Schaltungssimulationen', 'Leistungsberechnung Endstufen & Umrichter', 'Verlustleistung in MOSFETs & IGBTs', 'Eingangsfilter, Entstör- & Schutzbeschaltungen', 'Bauteil-Dimensionierung mit SPICE-Modellen'],
      en: ['Analog & digital circuit simulations', 'Power calculation for output stages & inverters', 'Power loss in MOSFETs & IGBTs', 'Input filters, EMI suppression & protection circuits', 'Component dimensioning with SPICE models'],
    },
  },
  {
    icon: Thermometer,
    titleDE: 'Thermosimulation',
    titleEN: 'Thermal Simulation',
    descDE: 'Thermische 3D-FEM-Berechnungen für statische und dynamische Szenarien. Simulation von Entwärmungskonzepten, Ermittlung thermischer Widerstände (Rth/Zth) und Erstellung thermischer Ersatzmodelle zur Kopplung mit der Systemsimulation.',
    descEN: 'Thermal 3D FEM calculations for static and dynamic scenarios. Simulation of cooling concepts, determination of thermal resistances (Rth/Zth) and creation of thermal equivalent models for coupling with system simulation.',
    items: {
      de: ['Thermische 3D-FEM-Berechnungen', 'Statische & dynamische Simulationen', 'Entwärmungskonzepte für Baugruppen & Bauteile', 'Rth- / Zth-Widerstand im Gesamtsystem', 'Thermische Ersatzmodelle für Systemsimulation'],
      en: ['Thermal 3D FEM calculations', 'Static & dynamic simulations', 'Cooling concepts for assemblies & components', 'Rth / Zth resistance in overall system', 'Thermal equivalent models for system simulation'],
    },
  },
  {
    icon: Waves,
    titleDE: 'E-Motor-Simulation',
    titleEN: 'E-Motor Simulation',
    descDE: 'Elektromagnetische FEA für Elektromotoren (EC, DC, Synchronmaschinen). Geometrie-Design des Magnetkreises, Blechschnitt-Konstruktion und Auslegung für Hochtemperaturanwendungen.',
    descEN: 'Electromagnetic FEA for electric motors (EC, DC, synchronous machines). Geometry design of the magnetic circuit, lamination construction and design for high-temperature applications.',
    items: {
      de: ['Elektromagnetische FEA (Motor-CAD / ANSYS)', 'Geometrie-Design Magnetkreis (Rotor & Stator)', 'Blechschnitt-Konstruktion', 'Auslegung für Hochtemperaturen', 'Analytische Berechnung & FEM-Optimierung'],
      en: ['Electromagnetic FEA (Motor-CAD / ANSYS)', 'Magnetic circuit geometry design (rotor & stator)', 'Lamination construction', 'Design for high temperatures', 'Analytical calculation & FEM optimization'],
    },
  },
];

/**
 * Toolchain: each tool now includes its logo image for inline display.
 * The separate "Tool Logos" section at the bottom has been removed –
 * logos are shown directly within each toolchain card.
 */
const toolchain = [
  {
    toolDE: 'MATLAB & Simulink',
    toolEN: 'MATLAB & Simulink',
    logo: `${CDN}/mathworks_c08e88a4.png`,
    areaDE: 'System- & Antriebssimulation',
    areaEN: 'System & Drive Simulation',
    descDE: 'Modellbasierte Funktionsentwicklung, Regelungsdesign, MIL/SIL/HIL',
    descEN: 'Model-based function development, control design, MIL/SIL/HIL',
  },
  {
    toolDE: 'Simscape Electrical',
    toolEN: 'Simscape Electrical',
    logo: `${CDN}/mathworks_c08e88a4.png`,
    areaDE: 'Elektro- & Antriebssimulation',
    areaEN: 'Electrical & Drive Simulation',
    descDE: 'Detaillierte Modellierung elektrischer Antriebe und Leistungselektronik',
    descEN: 'Detailed modeling of electric drives and power electronics',
  },
  {
    toolDE: 'SPICE (LTspice, Micro-Cap)',
    toolEN: 'SPICE (LTspice, Micro-Cap)',
    logo: `${CDN}/ltspice_310026fe.png`,
    areaDE: 'Schaltungs- & Verlustsimulation',
    areaEN: 'Circuit & Loss Simulation',
    descDE: 'Verlustleistungssimulation, Bauteilstress, Filterdimensionierung, SPICE-Modelle',
    descEN: 'Power loss simulation, component stress, filter dimensioning, SPICE models',
  },
  {
    toolDE: 'COMSOL Multiphysics',
    toolEN: 'COMSOL Multiphysics',
    logo: `${CDN}/comsol_8324696c.png`,
    areaDE: 'Thermosimulation & FEA',
    areaEN: 'Thermal Simulation & FEA',
    descDE: '3D-FEM, Multiphysik-Kopplung (thermisch, elektrisch, mechanisch)',
    descEN: '3D FEM, multiphysics coupling (thermal, electrical, mechanical)',
  },
  {
    toolDE: 'Motor-CAD (ANSYS)',
    toolEN: 'Motor-CAD (ANSYS)',
    logo: `${CDN}/motorcad_1b971003.png`,
    areaDE: 'E-Motor-Auslegung & FEA',
    areaEN: 'E-Motor Design & FEA',
    descDE: 'Elektromagnetische FEA, Motordesign, Magnetkreis-Optimierung',
    descEN: 'Electromagnetic FEA, motor design, magnetic circuit optimization',
  },
  {
    toolDE: 'PLECS',
    toolEN: 'PLECS',
    logo: `${CDN}/plecs_16b1d600.png`,
    areaDE: 'Leistungselektronik-Simulation',
    areaEN: 'Power Electronics Simulation',
    descDE: 'Schnelle Simulation von Schaltwandlern und Antriebsumrichtern',
    descEN: 'Fast simulation of switching converters and drive inverters',
  },
];

export default function Simulation() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <Layout>
      <SubPageHero
        headline="Simulation & Toolchain"
        description={isDE
          ? 'Bevor Konzepte technisch umgesetzt werden, durchlaufen sie bei uns eine umfassende Simulation. So kürzen wir Entwicklungsprozesse ab, reduzieren Kosten und erreichen maximale Effizienz.'
          : 'Before concepts are technically implemented, they undergo comprehensive simulation at CME. This shortens development processes, reduces costs and achieves maximum efficiency.'}
        heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/thermosimulation-1500x1000-1_77e2afd4.jpg"
        heroImageAlt="Thermosimulation"
        imageVariant="rectangular"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: isDE ? 'Elektronikentwicklung' : 'Electronics Development', href: '/entwicklung' },
          { label: 'Simulation & Toolchain' },
        ]}
        backLink={{
          label: isDE ? 'Elektronikentwicklung' : 'Electronics Development',
          href: '/entwicklung',
        }}
      />

      {/* Intro */}
      <section className="section-pad">
        <div className="container">
          <div className="grid lg:grid-cols-2 items-center" style={{ gap: 'var(--space-gap-lg)' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="fluid-body-lg text-gray-700 leading-relaxed">
                {isDE
                  ? 'Simulation ist bei CME kein nachgelagerter Prüfschritt, sondern integraler Bestandteil des Entwicklungsprozesses. Bereits in der Konzeptphase setzen wir auf modellbasierte Simulation, um Designentscheidungen abzusichern, Risiken frühzeitig zu erkennen und die Anzahl physischer Prototypen zu minimieren.'
                  : 'At CME, simulation is not a downstream verification step but an integral part of the development process. Already in the concept phase, we rely on model-based simulation to validate design decisions, identify risks early and minimize the number of physical prototypes.'}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative">
                {/* Accent diamond behind */}
                <div
                  className="absolute diamond bg-cme-blue/[0.06]"
                  style={{
                    zIndex: 0,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-42%, -50%)',
                    width: '340px',
                  }}
                />
                {/* Main diamond with image */}
                <div
                  className="diamond overflow-hidden relative"
                  style={{ width: '280px', zIndex: 1 }}
                >
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/thermosimulation-1500x1000-1_77e2afd4.jpg"
                    alt={isDE ? 'Simulation & Toolchain' : 'Simulation & Toolchain'}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Six Simulation Domains */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 'var(--space-section-header)' }}
          >
            <p className="fluid-xs font-semibold text-cme-blue uppercase tracking-[0.18em]" style={{ marginBottom: 'var(--space-gap-xs)' }}>
              {isDE ? 'Simulationsbereiche' : 'Simulation Domains'}
            </p>
            <h2 className="fluid-h2 text-cme-dark">
              {isDE ? 'Sechs Simulationsdisziplinen' : 'Six Simulation Disciplines'}
            </h2>
            <p className="fluid-body-lg text-gray-500 max-w-2xl" style={{ marginTop: 'var(--space-gap-xs)' }}>
              {isDE
                ? 'Von der Systemsimulation bis zur E-Motor-Auslegung – wir beherrschen alle relevanten Simulationsdisziplinen für die Elektronik- und Antriebsentwicklung.'
                : 'From system simulation to e-motor design – we master all relevant simulation disciplines for electronics and drive development.'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-sm)' }}>
            {simDomains.map((domain, i) => {
              const Icon = domain.icon;
              const items = isDE ? domain.items.de : domain.items.en;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="bg-white rounded-xl border border-gray-100 hover:border-cme-blue/20 hover:shadow-lg transition-all fluid-card"
                >
                  <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)', marginBottom: 'var(--space-gap-xs)' }}>
                    <div className="w-12 h-12 rounded-xl bg-cme-blue-light/30 flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-cme-blue" />
                    </div>
                    <h3 className="font-bold text-cme-dark fluid-body">
                      {isDE ? domain.titleDE : domain.titleEN}
                    </h3>
                  </div>
                  <p className="text-gray-600 fluid-small leading-relaxed" style={{ marginBottom: 'var(--space-gap-sm)' }}>
                    {isDE ? domain.descDE : domain.descEN}
                  </p>
                  <ul className="space-y-1.5">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 fluid-xs text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-cme-blue mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Toolchain Section – logos integrated directly into each card */}
      <section className="section-pad">
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
                {/* Tool logo + name */}
                <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)', marginBottom: 'var(--space-gap-xs)' }}>
                  <div className="w-20 h-20 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 p-2.5">
                    <img
                      src={tool.logo}
                      alt={isDE ? tool.toolDE : tool.toolEN}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
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

      {/* CTA */}
      <section className="section-pad bg-gray-50">
        <div className="container text-center">
          <h2 className="fluid-h2 text-cme-dark">
            {isDE ? 'Risiken erkennen, bevor der erste Prototyp gebaut wird.' : 'Identify risks before the first prototype is built.'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Senden Sie uns Ihre Systemdaten – wir zeigen, welche Simulationen Ihr Projekt absichern.'
              : 'Send us your system data – we\'ll show which simulations secure your project.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? 'Simulationsanfrage stellen' : 'Submit simulation inquiry'}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
