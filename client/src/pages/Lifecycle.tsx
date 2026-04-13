import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import SubPageHero from '@/components/SubPageHero';
import ContactSlider from '@/components/ContactSlider';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Link } from 'wouter';
import { RefreshCcw, ShieldAlert, Package, Wrench, CheckCircle2, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
    bulletsDE: [
      'Frühwarnsystem für End-of-Life-Ankündigungen von Herstellern – CME informiert proaktiv, bevor Ihre Produktion gefährdet ist',
      'Alternativen werden qualifiziert, bevor der Engpass entsteht: elektrische Prüfung, Footprint-Analyse und Drop-in-Bewertung',
      'Bestandssimulation auf Basis Ihrer Stückliste und Verbrauchsdaten – wann wird welches Bauteil kritisch?',
      'Aufbau strategischer Pufferbestände für Langläufer-Produkte in Abstimmung mit Ihrem Einkauf',
      'Vollständige Dokumentation aller Alternativbauteile und Qualifizierungsnachweise für Ihre Produktakte',
    ],
    bulletsEN: [
      'Early warning system for manufacturer end-of-life announcements – CME informs proactively before your production is at risk',
      'Alternatives are qualified before the bottleneck occurs: electrical testing, footprint analysis and drop-in evaluation',
      'Inventory simulation based on your BOM and consumption data – when does which component become critical?',
      'Building strategic buffer stocks for long-running products in coordination with your procurement',
      'Complete documentation of all alternative components and qualification records for your product file',
    ],
  },
  {
    icon: ShieldAlert,
    titleDE: 'Redesign & Re-Engineering',
    titleEN: 'Redesign & Re-Engineering',
    descDE: 'Wenn ein Redesign unvermeidbar ist, machen wir aus der Pflicht eine Chance: Wir überarbeiten Ihre Elektronik unter Berücksichtigung der bestehenden Zulassungen und minimieren den Requalifizierungsaufwand. Gleichzeitig bietet sich diese Gelegenheit als Chance an, Ihr Produkt gezielt und nachhaltig zu verbessern.',
    descEN: 'When redesign is unavoidable, we turn necessity into opportunity: We rework your electronics considering existing certifications and minimize requalification effort. At the same time, we use the opportunity to specifically improve your product.',
    bulletsDE: [
      'Verbesserung des Wirkungsgrades',
      'Leistungserhöhung',
      'Reduktion von Energieverbrauch',
      'Anpassung an verringerten Bauraum',
      'Erhöhung der Lebensdauer',
      'Implementierung neuer Funktionen',
      'Verbesserung von Fertigungsprozessen',
      'Reduzierung von Stück- oder Produktionskosten',
    ],
    bulletsEN: [
      'Efficiency improvement',
      'Power increase',
      'Energy consumption reduction',
      'Adaptation to reduced installation space',
      'Lifetime extension',
      'Implementation of new functions',
      'Manufacturing process improvement',
      'Reduction of unit or production costs',
    ],
  },
  {
    icon: Package,
    titleDE: 'Ersatzteilversorgung',
    titleEN: 'Spare Parts Supply',
    descDE: 'Langfristige Ersatzteilversorgung für Ihre Serienprodukte. Wir lagern Bauteile und Baugruppen und liefern auf Abruf.',
    descEN: 'Long-term spare parts supply for your series products. We store components and assemblies and deliver on demand.',
    bulletsDE: [
      'Langfristige Bevorratung kritischer Bauteile und kompletter Baugruppen für Ihre Serienprodukte – auch über Jahrzehnte',
      'Abrufbestellung auf Rahmenvertragsbasis: Sie zahlen nur, was Sie wirklich entnehmen, ohne Kapitalbindung durch Eigenlager',
      'Rückverfolgbarer Warenbestand mit Chargendokumentation – jedes Ersatzteil ist einem Lieferdatum und Hersteller zugeordnet',
      'Lieferfähigkeit auch für Produkte, die seit Jahren nicht mehr in der Serienproduktion sind',
      'Auf Wunsch inklusive Eingangsprüfung und Echtheitszertifizierung gegen gefälschte Bauteile (Anti-Counterfeiting)',
    ],
    bulletsEN: [
      'Long-term stocking of critical components and complete assemblies for your series products – even over decades',
      'Call-off orders on framework contract basis: you only pay for what you actually use, without capital commitment from own storage',
      'Traceable inventory with batch documentation – every spare part is assigned to a delivery date and manufacturer',
      'Delivery capability even for products that have been out of series production for years',
      'On request including incoming inspection and authenticity certification against counterfeit components (anti-counterfeiting)',
    ],
  },
  {
    icon: Wrench,
    titleDE: 'Reparatur & Service',
    titleEN: 'Repair & Service',
    descDE: 'Professionelle Reparatur und Instandsetzung geschäftskritischer elektronischer Baugruppen. Wenn der Ausfall oder Verlust Ihrer Elektronik zu erheblichen Folgekosten führt – in der Produktion, im Feld oder in sicherheitsrelevanten Anwendungen – bieten wir systematische Fehleranalyse, fachgerechte Instandsetzung und lückenlose Dokumentation mit Rückverfolgbarkeit.',
    descEN: 'Professional repair and refurbishment of business-critical electronic assemblies. When the failure or loss of your electronics leads to significant consequential costs – in production, in the field, or in safety-relevant applications – we provide systematic failure analysis, expert repair and complete documentation with traceability.',
    bulletsDE: [
      'Systematische Fehleranalyse mit Mess- und Prüfprotokoll – nicht nur reparieren, sondern verstehen, warum es ausgefallen ist',
      'Instandsetzung auf Bauteilebene: kein pauschaler Baugruppentausch, wenn eine gezielte Reparatur wirtschaftlicher ist',
      'Schnelldurchlauf für geschäftskritische Ausfälle – Express-Service mit definierten Reaktionszeiten',
      'Reparaturdokumentation mit Fotodokumentation und Rückverfolgbarkeit für sicherheitsrelevante Anwendungen',
      'Optional: Dauerauftrag für wiederkehrende Instandhaltung mit garantierten Kapazitäten und Festpreisen',
    ],
    bulletsEN: [
      'Systematic failure analysis with measurement and test protocol – not just repair, but understanding why it failed',
      'Component-level repair: no blanket assembly replacement when targeted repair is more economical',
      'Fast track for business-critical failures – express service with defined response times',
      'Repair documentation with photo documentation and traceability for safety-relevant applications',
      'Optional: standing order for recurring maintenance with guaranteed capacities and fixed prices',
    ],
  },
  {
    icon: HeartHandshake,
    titleDE: 'Langzeit-Support & Produktpflege',
    titleEN: 'Long-term Support & Product Maintenance',
    descDE: 'Ihr Produkt bleibt marktfähig – CME begleitet den gesamten Produktlebenszyklus von der Entwicklung bis zur Abkündigung. Wir stellen sicher, dass Ihre Elektronik auch Jahre nach dem ursprünglichen Entwicklungsprojekt technisch betreut und weiterentwickelt wird.',
    descEN: 'Your product stays market-ready – CME accompanies the entire product lifecycle from development to end-of-life. We ensure that your electronics receive technical support and further development even years after the original development project.',
    bulletsDE: [
      'Technischer Support für laufende Serien auch Jahre nach dem ursprünglichen Entwicklungsprojekt',
      'Firmware- und Software-Updates für bestehende Produkte – ohne Neuentwicklung der Hardware',
      'Archivierung aller Entwicklungsunterlagen, Schaltpläne, Layouts und Fertigungsdaten mit definierter Aufbewahrungsfrist',
      'Änderungsmanagement bei regulatorischen Anforderungen: neue Normen oder Direktiven werden in bestehende Produkte eingearbeitet, ohne Zulassung zu gefährden',
      'Ihr Produkt bleibt marktfähig – CME begleitet den gesamten Produktlebenszyklus von der Entwicklung bis zur Abkündigung',
    ],
    bulletsEN: [
      'Technical support for running series even years after the original development project',
      'Firmware and software updates for existing products – without redeveloping the hardware',
      'Archiving of all development documents, schematics, layouts and manufacturing data with defined retention periods',
      'Change management for regulatory requirements: new standards or directives are incorporated into existing products without jeopardizing certification',
      'Your product stays market-ready – CME accompanies the entire product lifecycle from development to end-of-life',
    ],
  },
];

export default function Lifecycle() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  const { t: cms, img, vid } = useContent('lifecycle');

  // Hero video: CMS overrides hardcoded default
  const cmsVideoWebm = vid('hero.heroVideoWebm');
  const cmsVideoMp4 = vid('hero.heroVideoMp4');
  const cmsVideoPoster = img('hero.heroVideoPoster');
  const cmsVideoPlayback = cms('hero.heroVideoPlayback') as 'loop' | 'once' | '';
  const effectiveHeroVideo = (cmsVideoWebm || cmsVideoMp4)
    ? { webm: cmsVideoWebm || undefined, mp4: cmsVideoMp4 || undefined, poster: cmsVideoPoster || undefined, playback: (cmsVideoPlayback === 'once' ? 'once' : 'loop') as 'loop' | 'once' }
    : { webm: HERO_VIDEO_WEBM, mp4: HERO_VIDEO_MP4, poster: HERO_VIDEO_POSTER };

  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderTopic, setSliderTopic] = useState('');
  const openSlider = (topic: string) => { setSliderTopic(topic); setSliderOpen(true); };

  return (
    <Layout>
      <SEO
        titleDE='Lifecycle Management'
        titleEN='Lifecycle Management'
        descriptionDE='Produktlebenszyklusmanagement für elektronische Systeme – von der Entwicklung über Fertigung bis Obsoleszenz-Management.'
        descriptionEN='Product lifecycle management for electronic systems – from development through manufacturing to obsolescence management.'
        path='/lifecycle'
        breadcrumbs={[{name:'Home',url:'/'},{name:'Lifecycle Management',url:'/lifecycle'}]}
      />
      <SubPageHero
        tagline={cms('hero.tagline') || 'Lifecycle Services'}
        headline={cms('hero.headline') || (isDE ? 'Wir begleiten Ihr Produkt. Über den gesamten Lebenszyklus.' : 'We support your product. Throughout the entire lifecycle.')}
        description={cms('hero.description') || (isDE
          ? 'Elektronik lebt länger als die Bauteile, aus denen sie besteht. CME sichert die Verfügbarkeit Ihrer Produkte durch proaktives Obsolescence Management, Redesign-Services und langfristige Ersatzteilversorgung.'
          : 'Electronics outlive the components they are made of. CME ensures the availability of your products through proactive obsolescence management, redesign services and long-term spare parts supply.')}
        cta={{ label: isDE ? 'Beratung anfragen' : 'Request Consultation', href: '/kontakt' }}
        heroVideo={effectiveHeroVideo}
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
                className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-cme-blue/20 transition-all fluid-card cursor-pointer"
                onClick={() => openSlider(isDE ? service.titleDE : service.titleEN)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSlider(isDE ? service.titleDE : service.titleEN); } }}
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
                {service.bulletsDE && service.bulletsDE.length > 0 && (
                  <ul className="space-y-1.5" style={{ marginTop: 'var(--space-gap-xs)' }}>
                    {(isDE ? service.bulletsDE : service.bulletsEN).map((item, j) => (
                      <li key={j} className="flex items-start gap-2 fluid-small text-gray-600">
                        <CheckCircle2 className="text-cme-blue shrink-0 mt-0.5" size={14} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
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

      <ContactSlider
        isOpen={sliderOpen}
        onClose={() => setSliderOpen(false)}
        topic={sliderTopic}
        pageSource={`lifecycle – ${sliderTopic}`}
      />
    </Layout>
  );
}
