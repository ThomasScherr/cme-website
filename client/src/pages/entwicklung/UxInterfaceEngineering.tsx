import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

const services = [
  {
    titleDE: 'Nutzer- & Kontextanalyse',
    titleEN: 'User & Context Analysis',
    descDE: 'Wir analysieren, wer das System bedient, unter welchen Bedingungen und mit welchen Erwartungen. Durch Interviews, Beobachtungen und Kontextszenarien schaffen wir die Grundlage für ein Bedienkonzept, das zur realen Nutzung passt – nicht zur Annahme des Entwicklers.',
    descEN: 'We analyze who operates the system, under what conditions and with what expectations. Through interviews, observations and context scenarios, we create the foundation for an operating concept that matches real usage – not the developer\'s assumptions.',
    img: `${CDN}/user-context-analysis_948a7869.png`,
  },
  {
    titleDE: 'Userflows & Interaktionslogik',
    titleEN: 'User Flows & Interaction Logic',
    descDE: 'Komplexe Systeme brauchen klare Abläufe. Wir definieren Userflows, Zustandsdiagramme und Interaktionslogiken, die sicherstellen, dass jede Bedienaktion eindeutig, effizient und fehlertolerant ist – auch unter Zeitdruck oder in sicherheitskritischen Umgebungen.',
    descEN: 'Complex systems need clear workflows. We define user flows, state diagrams and interaction logic that ensure every operation is unambiguous, efficient and fault-tolerant – even under time pressure or in safety-critical environments.',
    img: `${CDN}/userflows_046e9b25.png`,
  },
  {
    titleDE: 'Bedienkonzepte',
    titleEN: 'Operating Concepts',
    descDE: 'Wir entwickeln Bedienkonzepte, die Komplexität verständlich machen. Ob Touchpanel, Drehgeber oder physische Tasten – wir gestalten die Mensch-Maschine-Schnittstelle so, dass Bediener schnell, sicher und intuitiv arbeiten können.',
    descEN: 'We develop operating concepts that make complexity understandable. Whether touchpanel, rotary encoder or physical buttons – we design the human-machine interface so operators can work quickly, safely and intuitively.',
    img: `${CDN}/operating-concepts_3d4b7f77.png`,
  },
  {
    titleDE: 'Interface-Design & Prototyping',
    titleEN: 'Interface Design & Prototyping',
    descDE: 'Vom Wireframe zum interaktiven Prototyp: Wir gestalten Interfaces, die nicht nur gut aussehen, sondern früh getestet werden können. Durch iteratives Prototyping validieren wir Bedienkonzepte, bevor sie in die Entwicklung gehen – das spart Kosten und vermeidet späte Änderungen.',
    descEN: 'From wireframe to interactive prototype: We design interfaces that not only look good but can be tested early. Through iterative prototyping, we validate operating concepts before they go into development – saving costs and avoiding late changes.',
    img: `${CDN}/interface-prototyping_a2418e21.png`,
  },
  {
    titleDE: 'Seriennahe Umsetzung',
    titleEN: 'Production-Ready Implementation',
    descDE: 'UX endet nicht beim Prototyp. Wir begleiten die Umsetzung bis in die Serie und stellen sicher, dass das Interface-Design auf der realen Systemarchitektur funktioniert – mit den tatsächlichen Displaygrößen, Prozessorleistungen und Speicherbeschränkungen.',
    descEN: 'UX doesn\'t end at the prototype. We accompany implementation through to series production and ensure the interface design works on the actual system architecture – with real display sizes, processor performance and memory constraints.',
    img: `${CDN}/production-ready_51e20a9a.png`,
  },
];

export default function UxInterfaceEngineering() {
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
              {isDE ? 'UX & Interface Engineering' : 'UX & Interface Engineering'}
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
                UX & Interface Engineering
              </h1>
              <p className="fluid-body-lg text-gray-600" style={{ marginTop: 'var(--space-gap-xs)' }}>
                {isDE
                  ? 'Bediensoftware und UI/UX für technische Systeme – von der Nutzeranalyse bis zur serienreifen Umsetzung.'
                  : 'Operating software and UI/UX for technical systems – from user analysis to production-ready implementation.'}
              </p>
            </div>
            <div className="relative">
              <img
                src={`${CDN}/operating-concepts_3d4b7f77.png`}
                alt="UX & Interface Engineering"
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
                ? 'Technische Systeme werden immer komplexer – aber die Menschen, die sie bedienen, werden nicht komplexer. Deshalb entwickeln wir bei CME Bediensoftware und Interfaces, die Komplexität beherrschbar machen. Unser UX-Engineering-Ansatz verbindet Nutzerforschung, Interaktionsdesign und technische Umsetzung zu einer durchgängigen Kette – von der ersten Analyse bis zur serienreifen Implementierung auf der Zielplattform.'
                : 'Technical systems are becoming increasingly complex – but the people who operate them are not. That\'s why at CME we develop operating software and interfaces that make complexity manageable. Our UX engineering approach combines user research, interaction design and technical implementation into a seamless chain – from initial analysis to production-ready implementation on the target platform.'}
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
                className={`grid lg:grid-cols-2 items-center ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}
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
                      className="w-full aspect-[4/3] object-contain drop-shadow-2xl"
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
              { href: '/entwicklung/software-digitale-systeme', titleDE: 'Software & Digitale Systeme', titleEN: 'Software & Digital Systems', img: `${CDN}/web-apps_26e3e533.png` },
              { href: '/entwicklung/hardware-software', titleDE: 'Hardware & Software', titleEN: 'Hardware & Software', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2392__1920px_af02a6b7.jpg' },
              { href: '/entwicklung/test-verifikation', titleDE: 'Test & Verifikation', titleEN: 'Test & Verification', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2885__1920px_ecd3ed1e.jpg' },
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
