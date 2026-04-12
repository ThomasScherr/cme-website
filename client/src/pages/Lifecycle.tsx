import Layout from '@/components/Layout';
import SubPageHero from '@/components/SubPageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { RefreshCcw, ShieldAlert, Package, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const HERO_VIDEO_WEBM = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/Loop-Sample_d94dc755.webm';
const HERO_VIDEO_MP4 = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/Loop-Sample-compressed_8b0d5332.mp4';
const HERO_VIDEO_POSTER = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/hero-video-poster_8c5a9e34.jpg';

const services = [
  {
    icon: RefreshCcw,
    titleDE: 'Obsolescence Management',
    titleEN: 'Obsolescence Management',
    descDE: 'Datenbankgestützte Überwachung Ihrer Bauteilversorgung mit automatisierten Prozessen zur frühzeitigen Problemerkennung. Wir entwickeln kundenspezifische Workflows und Strategien – inklusive Simulationen auf Basis von Bestands- und Marktdaten. Durch unseren hervorragenden Zugang zum Liefermarkt qualifizieren wir Alternativbauteile, bevor Ihre Produktion gefährdet ist.',
    descEN: 'Database-driven monitoring of your component supply with automated processes for early problem detection. We develop customer-specific workflows and strategies – including simulations based on inventory and market data. Through our excellent access to the supplier market, we qualify alternative components before your production is at risk.',
  },
  {
    icon: ShieldAlert,
    titleDE: 'Redesign & Re-Engineering',
    titleEN: 'Redesign & Re-Engineering',
    descDE: 'Wenn ein Redesign unvermeidbar ist: Wir überarbeiten Ihre Elektronik unter Berücksichtigung der bestehenden Zulassungen und minimieren den Requalifizierungsaufwand.',
    descEN: 'When redesign is unavoidable: We rework your electronics considering existing certifications and minimize requalification effort.',
  },
  {
    icon: Package,
    titleDE: 'Ersatzteilversorgung',
    titleEN: 'Spare Parts Supply',
    descDE: 'Langfristige Ersatzteilversorgung für Ihre Serienprodukte. Wir lagern Bauteile und Baugruppen und liefern auf Abruf.',
    descEN: 'Long-term spare parts supply for your series products. We store components and assemblies and deliver on demand.',
  },
  {
    icon: Wrench,
    titleDE: 'Reparatur & Service',
    titleEN: 'Repair & Service',
    descDE: 'Professionelle Reparatur und Instandsetzung geschäftskritischer elektronischer Baugruppen. Wenn der Ausfall oder Verlust Ihrer Elektronik zu erheblichen Folgekosten führt – in der Produktion, im Feld oder in sicherheitsrelevanten Anwendungen – bieten wir systematische Fehleranalyse, fachgerechte Instandsetzung und lückenlose Dokumentation mit Rückverfolgbarkeit.',
    descEN: 'Professional repair and refurbishment of business-critical electronic assemblies. When the failure or loss of your electronics leads to significant consequential costs – in production, in the field, or in safety-relevant applications – we provide systematic failure analysis, expert repair and complete documentation with traceability.',
  },
];

export default function Lifecycle() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <Layout>
      <SubPageHero
        tagline="Lifecycle Services"
        headline={isDE ? 'Wir begleiten Ihr Produkt. Über den gesamten Lebenszyklus.' : 'We support your product. Throughout the entire lifecycle.'}
        description={isDE
          ? 'Elektronik lebt länger als die Bauteile, aus denen sie besteht. CME sichert die Verfügbarkeit Ihrer Produkte durch proaktives Obsolescence Management, Redesign-Services und langfristige Ersatzteilversorgung.'
          : 'Electronics outlive the components they are made of. CME ensures the availability of your products through proactive obsolescence management, redesign services and long-term spare parts supply.'}
        cta={{ label: isDE ? 'Beratung anfragen' : 'Request Consultation', href: '/kontakt' }}
        heroVideo={{
          webm: HERO_VIDEO_WEBM,
          mp4: HERO_VIDEO_MP4,
          poster: HERO_VIDEO_POSTER,
        }}
      />

      {/* Services */}
      <section className="section-pad">
        <div className="container">
          <div className="grid md:grid-cols-2" style={{ gap: 'var(--space-gap-md)' }}>
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all fluid-card"
              >
                <div
                  className="rounded-xl bg-cme-blue-light flex items-center justify-center"
                  style={{ width: 'var(--icon-box)', height: 'var(--icon-box)', marginBottom: 'var(--space-gap-xs)' }}
                >
                  <service.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                </div>
                <h3 className="fluid-h4 text-cme-dark" style={{ marginBottom: 'var(--space-gap-xs)' }}>
                  {isDE ? service.titleDE : service.titleEN}
                </h3>
                <p className="text-gray-600 leading-relaxed fluid-body">
                  {isDE ? service.descDE : service.descEN}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Lifecycle */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="fluid-h2 text-cme-dark">
              {isDE ? 'Warum Lifecycle Services?' : 'Why Lifecycle Services?'}
            </h2>
            <p className="text-gray-600 leading-relaxed fluid-body-lg" style={{ marginTop: 'var(--space-gap-sm)' }}>
              {isDE
                ? 'Die durchschnittliche Lebensdauer eines Elektronikprodukts im Industriebereich beträgt 15-20 Jahre. In dieser Zeit werden Bauteile abgekündigt, Normen aktualisiert und Fertigungstechnologien weiterentwickelt. Ohne aktives Lifecycle Management riskieren Sie Produktionsausfälle und teure Notfall-Redesigns. CME bietet Ihnen die Sicherheit einer langfristigen Partnerschaft.'
                : 'The average lifetime of an electronics product in the industrial sector is 15-20 years. During this time, components are discontinued, standards are updated and manufacturing technologies evolve. Without active lifecycle management, you risk production outages and expensive emergency redesigns. CME offers you the security of a long-term partnership.'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container text-center">
          <h2 className="fluid-h2 text-cme-dark">
            {isDE ? 'Abkündigungen kommen. Die Frage ist, ob Sie vorbereitet sind.' : 'Obsolescence is coming. The question is whether you\'re prepared.'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Wir analysieren Ihre Stückliste auf Obsoleszenz-Risiken und zeigen konkrete Handlungsoptionen.'
              : 'We analyze your BOM for obsolescence risks and show concrete options.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? 'BOM-Analyse anfragen' : 'Request BOM analysis'}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
