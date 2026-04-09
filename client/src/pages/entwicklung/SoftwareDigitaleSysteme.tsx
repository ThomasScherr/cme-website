import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

const services = [
  {
    titleDE: 'Webbasierte Anwendungen',
    titleEN: 'Web-Based Applications',
    descDE: 'Wir entwickeln Frontends und Dashboards für Konfiguration, Monitoring und Steuerung technischer Systeme. Ob Geräte-Konfigurationstool, Produktions-Dashboard oder Remote-Diagnose-Interface – unsere Webanwendungen sind auf die spezifischen Anforderungen industrieller Umgebungen zugeschnitten.',
    descEN: 'We develop frontends and dashboards for configuration, monitoring and control of technical systems. Whether device configuration tool, production dashboard or remote diagnostics interface – our web applications are tailored to the specific requirements of industrial environments.',
    img: `${CDN}/web-apps_26e3e533.png`,
  },
  {
    titleDE: 'Native & Mobile Apps',
    titleEN: 'Native & Mobile Apps',
    descDE: 'Für Anwendungen, die Offline-Fähigkeit, Sensorintegration oder native Performance erfordern, entwickeln wir Apps für iOS, Android und Embedded-Geräte. Von der Service-App für den Außendienst bis zur Companion-App für ein Medizinprodukt.',
    descEN: 'For applications requiring offline capability, sensor integration or native performance, we develop apps for iOS, Android and embedded devices. From the service app for field technicians to the companion app for a medical device.',
    img: `${CDN}/mobile-apps_80b1c01c.png`,
  },
  {
    titleDE: 'Backend & Systemarchitektur',
    titleEN: 'Backend & System Architecture',
    descDE: 'Robuste API-Strukturen, Datenmodelle und Microservice-Architekturen bilden das Rückgrat jeder digitalen Lösung. Wir entwerfen Backend-Systeme, die skalierbar, wartbar und sicher sind – mit klaren Schnittstellen zu Embedded-Systemen, Cloud-Diensten und Drittsystemen.',
    descEN: 'Robust API structures, data models and microservice architectures form the backbone of every digital solution. We design backend systems that are scalable, maintainable and secure – with clear interfaces to embedded systems, cloud services and third-party systems.',
    img: `${CDN}/backend-architecture_2fd7f2c3.png`,
  },
  {
    titleDE: 'Cloud- & Schnittstellenintegration',
    titleEN: 'Cloud & Interface Integration',
    descDE: 'Die Verbindung zwischen Embedded-Welt und IT-Infrastruktur ist unsere Stärke. Wir integrieren IoT-Gateways, Cloud-Plattformen (AWS, Azure) und Industrieprotokolle (OPC UA, MQTT) zu durchgängigen Systemen – von der Sensorebene bis zum ERP.',
    descEN: 'The connection between the embedded world and IT infrastructure is our strength. We integrate IoT gateways, cloud platforms (AWS, Azure) and industrial protocols (OPC UA, MQTT) into end-to-end systems – from sensor level to ERP.',
    img: `${CDN}/cloud-integration_449d0fa3.png`,
  },
  {
    titleDE: 'Betrieb & Weiterentwicklung',
    titleEN: 'Operations & Continuous Development',
    descDE: 'Software lebt. Wir begleiten unsere Lösungen über den gesamten Lebenszyklus – mit Release-Management, Wartungskonzepten, Monitoring und kontinuierlicher Weiterentwicklung. So stellen wir sicher, dass Ihre digitale Infrastruktur mit Ihrem Produkt wächst.',
    descEN: 'Software lives. We support our solutions throughout the entire lifecycle – with release management, maintenance concepts, monitoring and continuous development. This ensures your digital infrastructure grows with your product.',
    img: `${CDN}/operations_48fe776c.png`,
  },
];

export default function SoftwareDigitaleSysteme() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <Layout>
      {/* Breadcrumb + Hero */}
      <section className="subpage-hero bg-gradient-to-br from-white to-cme-blue-light/20">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center fluid-xs text-gray-500" style={{ gap: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.5rem)', marginBottom: 'var(--space-gap-md)' }}>
            <Link href="/" className="hover:text-cme-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href="/entwicklung" className="hover:text-cme-blue transition-colors">
              {isDE ? 'Elektronikentwicklung' : 'Electronics Development'}
            </Link>
            <span>/</span>
            <span className="text-cme-dark font-medium">
              {isDE ? 'Software Engineering & Digitale Systeme' : 'Software Engineering & Digital Systems'}
            </span>
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
                {isDE ? 'Software Engineering & Digitale Systeme' : 'Software Engineering & Digital Systems'}
              </h1>
              <p className="fluid-body-lg text-gray-600" style={{ marginTop: 'var(--space-gap-xs)' }}>
                {isDE
                  ? 'Web-Apps, Mobile Apps, Cloud-Integration und Backend-Architektur – die digitale Ebene Ihrer Elektronikprodukte.'
                  : 'Web apps, mobile apps, cloud integration and backend architecture – the digital layer of your electronic products.'}
              </p>
            </div>
            <div className="relative">
              <img
                src={`${CDN}/web-apps_26e3e533.png`}
                alt={isDE ? 'Software Engineering & Digitale Systeme' : 'Software Engineering & Digital Systems'}
                className="w-full aspect-[4/3] object-contain"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
              />
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
                ? 'Elektronische Produkte brauchen heute mehr als Firmware. Sie brauchen Konfigurationstools, Diagnose-Dashboards, Cloud-Anbindung und mobile Companion-Apps. Bei CME entwickeln wir diese digitale Schicht als integralen Bestandteil des Produkts – nicht als nachträgliches Add-on. Unsere Software-Ingenieure arbeiten eng mit den Hardware- und Embedded-Teams zusammen, sodass die digitale Architektur von Anfang an zur Systemarchitektur passt.'
                : 'Electronic products today need more than firmware. They need configuration tools, diagnostic dashboards, cloud connectivity and mobile companion apps. At CME, we develop this digital layer as an integral part of the product – not as an afterthought. Our software engineers work closely with the hardware and embedded teams, ensuring the digital architecture fits the system architecture from the start.'}
            </p>
          </div>
        </div>
      </section>

      {/* Services - alternating layout */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <h2 className="fluid-h2 text-cme-dark text-center" style={{ marginBottom: 'var(--space-section-header)' }}>
            {isDE ? 'Unser Leistungsspektrum' : 'Our Service Spectrum'}
          </h2>

          <div className="flex flex-col" style={{ gap: 'var(--space-gap-xl)' }}>
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="grid lg:grid-cols-2 items-center"
                style={{ gap: 'var(--space-gap-lg)' }}
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)', marginBottom: 'var(--space-gap-sm)' }}>
                    <div className="w-1 h-8 bg-cme-blue rounded-full" />
                    <h3 className="fluid-h3 text-cme-dark">
                      {isDE ? service.titleDE : service.titleEN}
                    </h3>
                  </div>
                  <p className="fluid-body text-gray-600 leading-relaxed">
                    {isDE ? service.descDE : service.descEN}
                  </p>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="relative">
                    <img
                      src={service.img}
                      alt={isDE ? service.titleDE : service.titleEN}
                      className="w-full aspect-[4/3] object-contain"
                      style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="section-pad">
        <div className="container">
          <h2 className="fluid-h3 text-cme-dark" style={{ marginBottom: 'var(--space-gap-md)' }}>
            {isDE ? 'Weitere Leistungen' : 'Related Services'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-sm)' }}>
            {[
              { href: '/entwicklung/ux-interface-engineering', titleDE: 'UX & Interface Engineering', titleEN: 'UX & Interface Engineering', img: `${CDN}/operating-concepts_3d4b7f77.png` },
              { href: '/entwicklung/hardware-software', titleDE: 'Hard & Software Design', titleEN: 'Hard & Software Design', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2392__1920px_af02a6b7.jpg' },
              { href: '/entwicklung/simulation', titleDE: 'Simulation & Toolchain', titleEN: 'Simulation & Toolchain', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/thermosimulation-1500x1000-1_77e2afd4.jpg' },
            ].map((page) => (
              <Link key={page.href} href={page.href} className="group block">
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-[16/9] overflow-hidden bg-gray-50">
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
      <section className="section-pad bg-gray-50">
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
