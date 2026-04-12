import SubPageTemplate from '@/components/SubPageTemplate';
import Layout from '@/components/Layout';
import SubPageHero from '@/components/SubPageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Network,
  CircuitBoard,
  Zap,
  Cog,
  Layers,
  Code,
  Wifi,
  ShieldCheck,
  Thermometer,
  Gauge,
  Activity,
  FileCode,
  Bug,
  TestTube,
  ClipboardCheck,
  Cpu,
  Target,
  type LucideIcon,
} from 'lucide-react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

const heroImg = `${CDN}/JK_2392__1920px_af02a6b7.jpg`;

const features = [
  { de: 'Systemarchitektur & Anforderungsmanagement', en: 'System Architecture & Requirements Management', icon: Network },
  { de: 'Analoge & digitale Schaltungsentwicklung', en: 'Analog & Digital Circuit Design', icon: CircuitBoard },
  { de: 'Leistungselektronik (SiC, GaN, IGBT)', en: 'Power Electronics (SiC, GaN, IGBT)', icon: Zap },
  { de: 'Antriebselektronik & Motor Control', en: 'Drive Electronics & Motor Control', icon: Cog },
  { de: 'Multi-Layer PCB-Layout', en: 'Multi-Layer PCB Layout', icon: Layers },
  { de: 'Embedded C/C++ Firmware', en: 'Embedded C/C++ Firmware', icon: Code },
  { de: 'Kommunikationsschnittstellen (CAN, LIN, SPI, Ethernet)', en: 'Communication Interfaces (CAN, LIN, SPI, Ethernet)', icon: Wifi },
  { de: 'Funktionale Sicherheit (ISO 26262)', en: 'Functional Safety (ISO 26262)', icon: ShieldCheck },
];

/* ── Embedded Software ── */
const embeddedLeistungen: { de: string; en: string; icon: LucideIcon }[] = [
  { de: 'ISO 15504 / SPICE-konforme Entwicklung', en: 'ISO 15504 / SPICE-compliant development', icon: ClipboardCheck },
  { de: 'Anforderungsanalyse & SW-Pflichtenheft', en: 'Requirements analysis & SW specification', icon: FileCode },
  { de: 'Codierung in C, C++ und Assembler', en: 'Coding in C, C++ and assembler', icon: Code },
  { de: 'MISRA-Compliance, statische Code-Analyse & Laufzeitbetrachtung', en: 'MISRA compliance, static code analysis & runtime analysis', icon: Bug },
  { de: 'SW-Modul-, Funktions- & Integrationstest', en: 'SW module, function & integration testing', icon: TestTube },
  { de: 'Sicherheitsrelevante SW-Entwicklung (IEC 61508 / ISO 26262)', en: 'Safety-relevant SW development (IEC 61508 / ISO 26262)', icon: ShieldCheck },
];

const embeddedSchwerpunkte: { de: string; en: string; icon: LucideIcon }[] = [
  { de: 'Ansteuer- & Regelverfahren für BLDC-, PSM-, SR- & DC-Motoren', en: 'Drive & control methods for BLDC, PSM, SR & DC motors', icon: Cog },
  { de: 'Antriebsregelungen (Drehmoment, Drehzahl, Position)', en: 'Drive controls (torque, speed, position)', icon: Gauge },
  { de: 'Sensorlose & sensorbehaftete Regelungskonzepte', en: 'Sensorless & sensor-based control concepts', icon: Target },
  { de: 'Kommunikationsmodule (CAN, LIN, PWM, SENT, SPI, I²C)', en: 'Communication modules (CAN, LIN, PWM, SENT, SPI, I²C)', icon: Wifi },
  { de: 'Hochgradige Ausnutzung der MCU-Ressourcen zur kostenoptimalen Systemlösung', en: 'Maximum utilization of MCU resources for cost-optimal system solutions', icon: Cpu },
  { de: 'Optimierung von Low-cost-Antriebssystemen', en: 'Optimization of low-cost drive systems', icon: Zap },
];

const expertiseItems = [
  {
    icon: Thermometer,
    value: '>150 °C',
    de: 'Umgebungstemperatur',
    descDE: 'Entwurf von Elektronikmodulen für extreme Umgebungstemperaturen – z. B. motornahe Leistungselektronik oder Industrieöfen.',
    en: 'Ambient Temperature',
    descEN: 'Design of electronics modules for extreme ambient temperatures – e.g. motor-mounted power electronics or industrial furnaces.',
  },
  {
    icon: Zap,
    value: '>300 A',
    de: 'Schaltungsauslegung',
    descDE: 'Hochstrom-Designs für Antriebsumrichter, Ladetechnik und Schweißstromquellen – mit optimierter Aufbau- und Verbindungstechnik.',
    en: 'Circuit Design',
    descEN: 'High-current designs for drive inverters, charging technology and welding power sources – with optimized assembly and interconnection technology.',
  },
  {
    icon: Activity,
    value: '>20 g',
    de: 'Vibrationsbelastung',
    descDE: 'Robuste Elektronik für extreme mechanische Belastungen – Automotive, Bahntechnik, Industrieroboter und mobile Arbeitsmaschinen.',
    en: 'Vibration Load',
    descEN: 'Robust electronics for extreme mechanical loads – automotive, rail, industrial robots and mobile machinery.',
  },
];

export default function HardwareSoftware() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <Layout>
      <SubPageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: isDE ? 'Elektronikentwicklung' : 'Electronics Development', href: '/entwicklung' },
          { label: 'Hard & Software Design' },
        ]}
        backLink={{
          label: isDE ? 'Elektronikentwicklung' : 'Electronics Development',
          href: '/entwicklung',
        }}
        headline="Hard & Software Design"
        description={isDE
          ? 'Von der Systemarchitektur über Schaltungsentwicklung und PCB-Layout bis zur Embedded-Firmware.'
          : 'From system architecture through circuit design and PCB layout to embedded firmware.'}
        heroImage={heroImg}
        heroImageAlt="Hard & Software Design"
      />

      {/* Content */}
      <section className="section-pad">
        <div className="container">
          {/* Intro: Diamond image left + Text right */}
          <div className="grid lg:grid-cols-[auto_1fr] items-center" style={{ gap: 'var(--space-gap-lg)' }}>
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
                  src={heroImg}
                  alt="Hard & Software Design"
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
                  ? 'CME entwickelt Hardware und Software als integrierte Einheit. Unsere Ingenieure arbeiten von der Systemspezifikation über die Schaltungsentwicklung und das PCB-Layout bis zur Embedded-Firmware eng zusammen. Durch die enge Verzahnung mit unserer eigenen Fertigung fließen DfM-Anforderungen bereits in der Entwicklungsphase ein – das spart Zeit und Kosten in der Serienüberführung.'
                  : 'CME develops hardware and software as an integrated unit. Our engineers work closely together from system specification through circuit design and PCB layout to embedded firmware. Through close integration with our own manufacturing, DfM requirements flow into the development phase early – saving time and costs in series transition.'}
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-sm)', marginTop: 'var(--space-section-header)' }}>
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-gray-100 hover:border-cme-blue/20 hover:shadow-md transition-all fluid-card"
                >
                  <div
                    className="w-14 h-14 rounded-xl bg-cme-blue/10 flex items-center justify-center"
                    style={{ marginBottom: 'var(--space-gap-xs)' }}
                  >
                    <Icon size={28} className="text-cme-blue" strokeWidth={1.5} />
                  </div>
                  <p className="font-medium text-cme-dark fluid-body">{isDE ? feature.de : feature.en}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertenwissen */}
      <section className="section-pad bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
            style={{ marginBottom: 'var(--space-section-header)' }}
          >
            <p className="text-cme-blue font-semibold fluid-small tracking-wider uppercase" style={{ marginBottom: 'var(--space-gap-xs)' }}>
              {isDE ? 'Expertenwissen' : 'Expert Knowledge'}
            </p>
            <h2 className="fluid-h2 text-cme-dark">
              {isDE ? 'Wo andere aufhören, fangen wir an.' : 'Where others stop, we start.'}
            </h2>
            <p className="fluid-body-lg text-gray-600 max-w-2xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
              {isDE
                ? 'Unsere Ingenieure haben langjährige Erfahrung mit Elektronik unter extremen Einsatzbedingungen – hohe Temperaturen, hohe Ströme, starke Vibrationen.'
                : 'Our engineers have years of experience with electronics under extreme operating conditions – high temperatures, high currents, strong vibrations.'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3" style={{ gap: 'var(--space-gap-md)' }}>
            {expertiseItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group"
                  style={{ padding: 'clamp(1.5rem, 1rem + 1.5vw, 2.5rem)' }}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cme-blue to-cme-blue/60" />

                  <div className="flex items-center gap-4" style={{ marginBottom: 'var(--space-gap-sm)' }}>
                    <div className="w-14 h-14 rounded-xl bg-cme-blue/10 flex items-center justify-center shrink-0 group-hover:bg-cme-blue/15 transition-colors">
                      <Icon size={28} className="text-cme-blue" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="block text-cme-blue font-bold" style={{ fontSize: 'clamp(1.75rem, 1.2rem + 1.5vw, 2.5rem)', lineHeight: 1.1 }}>
                        {item.value}
                      </span>
                      <span className="block text-gray-500 font-medium fluid-small">
                        {isDE ? item.de : item.en}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 fluid-small leading-relaxed">
                    {isDE ? item.descDE : item.descEN}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Embedded Software */}
      <section className="section-pad">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
            style={{ marginBottom: 'var(--space-section-header)' }}
          >
            <p className="text-cme-blue font-semibold fluid-small tracking-wider uppercase" style={{ marginBottom: 'var(--space-gap-xs)' }}>
              {isDE ? 'Embedded Software' : 'Embedded Software'}
            </p>
            <h2 className="fluid-h2 text-cme-dark">
              {isDE ? 'Software, die auf dem Zielsystem performt.' : 'Software that performs on the target system.'}
            </h2>
            <p className="fluid-body-lg text-gray-600 max-w-3xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
              {isDE
                ? 'Wir entwickeln Embedded-Software, die optimal auf die Hardware und die Kundenanforderungen zugeschnitten ist – von einfachen Steuerungen bis hin zu hochkomplexen, sicherheitsrelevanten Applikationen mit anspruchsvollsten Dokumentations- und Qualitätskriterien.'
                : 'We develop embedded software optimally tailored to the hardware and customer requirements – from simple controls to highly complex, safety-relevant applications with the most demanding documentation and quality criteria.'}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2" style={{ gap: 'var(--space-gap-lg)' }}>
            {/* Leistungen */}
            <div>
              <h3 className="fluid-h3 text-cme-dark" style={{ marginBottom: 'var(--space-gap-sm)' }}>
                {isDE ? 'Leistungen' : 'Services'}
              </h3>
              <div className="flex flex-col" style={{ gap: 'var(--space-gap-xs)' }}>
                {embeddedLeistungen.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 bg-white rounded-lg border border-gray-100 hover:border-cme-blue/20 transition-all"
                      style={{ padding: 'clamp(0.75rem, 0.5rem + 0.5vw, 1.25rem)' }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-cme-blue/10 flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-cme-blue" strokeWidth={1.5} />
                      </div>
                      <p className="font-medium text-cme-dark fluid-small" style={{ paddingTop: '0.4rem' }}>
                        {isDE ? item.de : item.en}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Entwicklungsschwerpunkte */}
            <div>
              <h3 className="fluid-h3 text-cme-dark" style={{ marginBottom: 'var(--space-gap-sm)' }}>
                {isDE ? 'Entwicklungsschwerpunkte' : 'Development Focus Areas'}
              </h3>
              <div className="flex flex-col" style={{ gap: 'var(--space-gap-xs)' }}>
                {embeddedSchwerpunkte.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 bg-white rounded-lg border border-gray-100 hover:border-cme-blue/20 transition-all"
                      style={{ padding: 'clamp(0.75rem, 0.5rem + 0.5vw, 1.25rem)' }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-cme-blue/10 flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-cme-blue" strokeWidth={1.5} />
                      </div>
                      <p className="font-medium text-cme-dark fluid-small" style={{ paddingTop: '0.4rem' }}>
                        {isDE ? item.de : item.en}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
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
              ? 'Senden Sie uns Ihre Anforderungen. Wir prüfen Machbarkeit, Risiken und Zeitrahmen – und sagen ehrlich, was geht.'
              : 'Send us your requirements. We evaluate feasibility, risks and timeline – and tell you honestly what works.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? 'Anforderungen senden' : 'Send requirements'}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
