import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { RefreshCcw, ShieldAlert, Package, Wrench, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-white to-cme-blue-light/30">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-cme-blue text-sm font-semibold tracking-widest uppercase">
              Lifecycle Services
            </span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-cme-dark mt-4 leading-tight">
              {isDE ? 'Wir begleiten Ihr Produkt. Über den gesamten Lebenszyklus.' : 'We support your product. Throughout the entire lifecycle.'}
            </h1>
            <p className="text-lg text-gray-600 mt-6">
              {isDE
                ? 'Elektronik lebt länger als die Bauteile, aus denen sie besteht. CME sichert die Verfügbarkeit Ihrer Produkte durch proaktives Obsolescence Management, Redesign-Services und langfristige Ersatzteilversorgung.'
                : 'Electronics outlive the components they are made of. CME ensures the availability of your products through proactive obsolescence management, redesign services and long-term spare parts supply.'}
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-cme-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors mt-8"
            >
              {isDE ? 'Beratung anfragen' : 'Request Consultation'}
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-cme-blue-light flex items-center justify-center mb-5">
                  <service.icon size={24} className="text-cme-blue" />
                </div>
                <h3 className="text-xl font-bold text-cme-dark mb-3">
                  {isDE ? service.titleDE : service.titleEN}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {isDE ? service.descDE : service.descEN}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Lifecycle */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-cme-dark">
              {isDE ? 'Warum Lifecycle Services?' : 'Why Lifecycle Services?'}
            </h2>
            <p className="text-gray-600 mt-6 leading-relaxed">
              {isDE
                ? 'Die durchschnittliche Lebensdauer eines Elektronikprodukts im Industriebereich beträgt 15-20 Jahre. In dieser Zeit werden Bauteile abgekündigt, Normen aktualisiert und Fertigungstechnologien weiterentwickelt. Ohne aktives Lifecycle Management riskieren Sie Produktionsausfälle und teure Notfall-Redesigns. CME bietet Ihnen die Sicherheit einer langfristigen Partnerschaft.'
                : 'The average lifetime of an electronics product in the industrial sector is 15-20 years. During this time, components are discontinued, standards are updated and manufacturing technologies evolve. Without active lifecycle management, you risk production outages and expensive emergency redesigns. CME offers you the security of a long-term partnership.'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-cme-dark">
            {isDE ? 'Lifecycle-Analyse für Ihr Produkt' : 'Lifecycle Analysis for Your Product'}
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            {isDE
              ? 'Wir analysieren die Bauteilversorgung Ihrer bestehenden Produkte und erstellen einen Lifecycle-Report mit konkreten Handlungsempfehlungen.'
              : 'We analyze the component supply of your existing products and create a lifecycle report with concrete recommendations.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors mt-8"
          >
            {isDE ? 'Analyse anfragen' : 'Request Analysis'}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
