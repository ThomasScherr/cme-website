import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import SubPageHero from '@/components/SubPageHero';

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
      <SubPageHero
        headline="UX & Interface Engineering"
        description={isDE
          ? 'Bediensoftware und UI/UX für technische Systeme \u2013 von der Nutzeranalyse bis zur serienreifen Umsetzung.'
          : 'Operating software and UI/UX for technical systems \u2013 from user analysis to production-ready implementation.'}
        heroImage={`${CDN}/operating-concepts_3d4b7f77.png`}
        heroImageAlt="UX & Interface Engineering"
        imageVariant="floating"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: isDE ? 'Elektronikentwicklung' : 'Electronics Development', href: '/entwicklung' },
          { label: 'UX & Interface Engineering' },
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


      {/* CTA */}
      <section className="section-pad bg-gray-50">
        <div className="container text-center">
          <h2 className="fluid-h2 text-cme-dark">
            {isDE ? 'Gute Bedienkonzepte entstehen nicht am Schreibtisch.' : 'Good interface concepts don\'t emerge at a desk.'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Zeigen Sie uns Ihr System – wir entwickeln eine Bedienoberfläche, die Ihre Anwender tatsächlich nutzen.'
              : 'Show us your system – we\'ll develop an interface your users actually want to use.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? 'UX-Konzept besprechen' : 'Discuss UX concept'}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
