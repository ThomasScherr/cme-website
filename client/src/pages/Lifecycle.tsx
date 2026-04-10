import Layout from '@/components/Layout';
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
    descDE: 'Proaktive Überwachung der Bauteilversorgung. Wir identifizieren Abkündigungen frühzeitig und qualifizieren Alternativbauteile – bevor Ihre Produktion stillsteht.',
    descEN: 'Proactive monitoring of component supply. We identify end-of-life notices early and qualify alternative components – before your production stops.',
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
    descDE: 'Professionelle Reparatur und Instandsetzung Ihrer elektronischen Baugruppen – mit Fehleranalyse, Dokumentation und Rückverfolgbarkeit.',
    descEN: 'Professional repair and refurbishment of your electronic assemblies – with failure analysis, documentation and traceability.',
  },
];

export default function Lifecycle() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <Layout>
      {/* Hero with diamond pattern matching homepage */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-white to-cme-blue-light/30">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(33,150,211,0.04),transparent_70%)]" />

        <div
          className="container relative z-10"
          style={{
            paddingTop: 'var(--nav-height)',
            paddingBottom: 'var(--space-section)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center" style={{ gap: 'var(--space-gap-lg)' }}>
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <span className="text-cme-blue fluid-small font-semibold tracking-widest uppercase">
                Lifecycle Services
              </span>
              <h1 className="fluid-h1 text-cme-dark leading-tight" style={{ marginTop: 'var(--space-gap-xs)' }}>
                {isDE ? 'Wir begleiten Ihr Produkt. Über den gesamten Lebenszyklus.' : 'We support your product. Throughout the entire lifecycle.'}
              </h1>
              <p className="fluid-body-lg text-gray-600 max-w-xl leading-relaxed" style={{ marginTop: 'var(--space-gap-sm)' }}>
                {isDE
                  ? 'Elektronik lebt länger als die Bauteile, aus denen sie besteht. CME sichert die Verfügbarkeit Ihrer Produkte durch proaktives Obsolescence Management, Redesign-Services und langfristige Ersatzteilversorgung.'
                  : 'Electronics outlive the components they are made of. CME ensures the availability of your products through proactive obsolescence management, redesign services and long-term spare parts supply.'}
              </p>
              <motion.div
                className="flex flex-wrap"
                style={{ gap: 'var(--space-gap-xs)', marginTop: 'var(--space-gap-md)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href="/kontakt"
                  className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-all hover:shadow-lg hover:shadow-cme-blue/20 fluid-btn"
                >
                  {isDE ? 'Beratung anfragen' : 'Request Consultation'}
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Two offset diamonds – only visible on lg+ screens */}
            <div className="hidden lg:flex relative items-center justify-end">
              <div
                className="relative"
                style={{
                  width: 'var(--hero-diamond-w)',
                  height: 'var(--hero-diamond-h)',
                  marginTop: '-13px',
                  marginRight: '5px',
                  marginLeft: '28px',
                }}
              >
                {/* Accent diamond (behind, offset top-left) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute top-0 left-0"
                  style={{ zIndex: 1 }}
                >
                  <div
                    className="diamond bg-cme-blue/[0.07]"
                    style={{ width: 'var(--hero-accent-diamond)' }}
                  />
                </motion.div>

                {/* Video diamond (main, offset bottom-right) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute bottom-0 right-0"
                  style={{ zIndex: 2 }}
                >
                  <div
                    className="diamond shadow-xl shadow-cme-blue/15"
                    style={{ width: 'var(--hero-image-diamond)' }}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={HERO_VIDEO_POSTER}
                    >
                      <source src={HERO_VIDEO_WEBM} type="video/webm" />
                      <source src={HERO_VIDEO_MP4} type="video/mp4" />
                    </video>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
