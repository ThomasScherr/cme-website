import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import SubPageHero from '@/components/SubPageHero';

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
      <SubPageHero
        headline={isDE ? 'Software Engineering & Digitale Systeme' : 'Software Engineering & Digital Systems'}
        description={isDE
          ? 'Web-Apps, Mobile Apps, Cloud-Integration und Backend-Architektur \u2013 die digitale Ebene Ihrer Elektronikprodukte.'
          : 'Web apps, mobile apps, cloud integration and backend architecture \u2013 the digital layer of your electronic products.'}
        heroImage={`${CDN}/web-apps_26e3e533.png`}
        heroImageAlt={isDE ? 'Software Engineering & Digitale Systeme' : 'Software Engineering & Digital Systems'}
        imageVariant="floating"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: isDE ? 'Elektronikentwicklung' : 'Electronics Development', href: '/entwicklung' },
          { label: isDE ? 'Software Engineering & Digitale Systeme' : 'Software Engineering & Digital Systems' },
        ]}
        backLink={{
          label: isDE ? 'Elektronikentwicklung' : 'Electronics Development',
          href: '/entwicklung',
        }}
      />

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


      {/* CTA */}
      <section className="section-pad bg-gray-50">
        <div className="container text-center">
          <h2 className="fluid-h2 text-cme-dark">
            {isDE ? 'Software, die auf Ihrer Hardware läuft – nicht nur im Datenblatt.' : 'Software that runs on your hardware – not just on paper.'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Beschreiben Sie Ihr System und die Schnittstellen – wir definieren die Architektur und den Entwicklungsplan.'
              : 'Describe your system and interfaces – we\'ll define the architecture and development plan.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? 'Architektur besprechen' : 'Discuss architecture'}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
