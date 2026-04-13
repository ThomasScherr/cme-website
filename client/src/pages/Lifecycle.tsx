import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import SubPageHero from '@/components/SubPageHero';
import ContactSlider from '@/components/ContactSlider';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Link } from 'wouter';
import { RefreshCcw, ShieldAlert, Package, Wrench, CheckCircle2, HeartHandshake, Gauge, Cpu, Server, MonitorCog, Zap, Bot, Monitor, Flame, BatteryCharging } from 'lucide-react';
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

const repairItems = [
  {
    icon: Gauge,
    titleDE: 'Frequenzumrichter & Antriebsregler',
    titleEN: 'Frequency Inverters & Drive Controllers',
    bulletsDE: [
      'Marktf\u00fchrer wie Siemens SINAMICS, ABB ACS, Danfoss, Lenze und SEW mit Neuwert von 2.000 bis \u00fcber 50.000 \u20ac',
      'Lieferzeiten f\u00fcr Neuger\u00e4te aktuell 12\u201324 Monate \u2013 Produktionsstillstand oft nicht tolerierbar',
      'CME repariert auf Bauteilebene: IGBT-Treiber, Steuerplatinen, Netzteile und Regelkarten',
    ],
    bulletsEN: [
      'Market leaders like Siemens SINAMICS, ABB ACS, Danfoss, Lenze and SEW with replacement cost from \u20ac2,000 to over \u20ac50,000',
      'Lead times for new devices currently 12\u201324 months \u2013 production downtime often not tolerable',
      'CME repairs at component level: IGBT drivers, control boards, power supplies and control cards',
    ],
  },
  {
    icon: Cpu,
    titleDE: 'Servo-Umrichter & Servoverst\u00e4rker',
    titleEN: 'Servo Inverters & Servo Amplifiers',
    bulletsDE: [
      'Siemens SIMODRIVE/SINAMICS S, Bosch Rexroth, Fanuc, Mitsubishi \u2013 Neuwert oft 5.000 bis 30.000 \u20ac pro Achse',
      'Ausfall eines Servoverst\u00e4rkers legt oft die gesamte Fertigungslinie still',
      'Reparatur inkl. Parametersicherung und Funktionstest unter Last',
    ],
    bulletsEN: [
      'Siemens SIMODRIVE/SINAMICS S, Bosch Rexroth, Fanuc, Mitsubishi \u2013 replacement cost often \u20ac5,000 to \u20ac30,000 per axis',
      'Failure of a servo amplifier often shuts down the entire production line',
      'Repair including parameter backup and functional test under load',
    ],
  },
  {
    icon: Server,
    titleDE: 'SPS & Industrie-PC Baugruppen',
    titleEN: 'PLC & Industrial PC Modules',
    bulletsDE: [
      'Siemens S5 und S7-300 offiziell abgek\u00fcndigt \u2013 trotzdem noch millionenfach im Einsatz',
      'Ersatz bedeutet h\u00e4ufig komplette Neuprogrammierung und Zulassungsaufwand',
      'CME repariert CPU-Karten, Digital-/Analogbaugruppen und Kommunikationsbaugruppen auf Komponentenebene',
    ],
    bulletsEN: [
      'Siemens S5 and S7-300 officially discontinued \u2013 yet still in use millions of times',
      'Replacement often means complete reprogramming and certification effort',
      'CME repairs CPU cards, digital/analog modules and communication modules at component level',
    ],
  },
  {
    icon: MonitorCog,
    titleDE: 'CNC-Steuerungen & Achskarten',
    titleEN: 'CNC Controllers & Axis Cards',
    bulletsDE: [
      'Siemens SINUMERIK, Fanuc, Heidenhain, Mitsubishi \u2013 Steuerungen mit Neuwert von 10.000 bis 80.000 \u20ac',
      'Ausfallbedingte Maschinenstillst\u00e4nde kosten in der Zerspanung schnell 5-stellige Betr\u00e4ge pro Tag',
      'Reparatur von Hauptrechnern, Achskarten, Messsystemplatinen und Bedieneinheiten',
    ],
    bulletsEN: [
      'Siemens SINUMERIK, Fanuc, Heidenhain, Mitsubishi \u2013 controllers with replacement cost from \u20ac10,000 to \u20ac80,000',
      'Downtime-related machine stoppages in machining quickly cost five-figure amounts per day',
      'Repair of main computers, axis cards, measurement system boards and operator panels',
    ],
  },
  {
    icon: Zap,
    titleDE: 'IGBT-Module & Leistungselektronik',
    titleEN: 'IGBT Modules & Power Electronics',
    bulletsDE: [
      'Hochleistungsmodule von Infineon, Semikron, Mitsubishi \u2013 Einzelpreise von 500 bis \u00fcber 5.000 \u20ac',
      'Fehlerhafte IGBT-Module sind h\u00e4ufigste Ausfallursache bei Frequenzumrichtern und Schwei\u00dfger\u00e4ten',
      'CME tauscht auf Modulebene und pr\u00fcft die gesamte Treiberschaltung und Schutzlogik mit',
    ],
    bulletsEN: [
      'High-performance modules from Infineon, Semikron, Mitsubishi \u2013 unit prices from \u20ac500 to over \u20ac5,000',
      'Faulty IGBT modules are the most common cause of failure in frequency inverters and welding equipment',
      'CME replaces at module level and tests the entire driver circuit and protection logic',
    ],
  },
  {
    icon: Bot,
    titleDE: 'Robotersteuerungen',
    titleEN: 'Robot Controllers',
    bulletsDE: [
      'ABB IRC, KUKA KRC, Fanuc R-30 \u2013 Steuerungen mit Neuwert von 15.000 bis 60.000 \u20ac',
      'Roboterausfall in der Automobilproduktion oder Logistik bedeutet sofortigen Linien-Stopp',
      'Reparatur von Leistungsplatinen, Achsrechnern, Sicherheitsbaugruppen und I/O-Karten',
    ],
    bulletsEN: [
      'ABB IRC, KUKA KRC, Fanuc R-30 \u2013 controllers with replacement cost from \u20ac15,000 to \u20ac60,000',
      'Robot failure in automotive production or logistics means immediate line stop',
      'Repair of power boards, axis computers, safety modules and I/O cards',
    ],
  },
  {
    icon: Monitor,
    titleDE: 'HMI & Industrie-Bedienerpanels',
    titleEN: 'HMI & Industrial Operator Panels',
    bulletsDE: [
      'Siemens TP/MP-Serie, Weintek, Pro-face, B&R \u2013 viele Modelle abgek\u00fcndigt und nicht mehr lieferbar',
      'Displayausfall oder Touchscreen-Fehler macht die gesamte Maschine unbedienbar',
      'CME repariert Displays, Touchscreens, Netzteile und Steuerplatinen \u2013 inklusive Datensicherung',
    ],
    bulletsEN: [
      'Siemens TP/MP series, Weintek, Pro-face, B&R \u2013 many models discontinued and no longer available',
      'Display failure or touchscreen error makes the entire machine inoperable',
      'CME repairs displays, touchscreens, power supplies and control boards \u2013 including data backup',
    ],
  },
  {
    icon: Flame,
    titleDE: 'Schwei\u00dfsteuerungen & Prozesselektronik',
    titleEN: 'Welding Controllers & Process Electronics',
    bulletsDE: [
      'Schwei\u00dfsteuerungen von Fronius, Lincoln Electric, EWM, Kemppi \u2013 kritisch in Automotive und Metallverarbeitung',
      'Ausfall trifft oft mehrere Arbeitspl\u00e4tze gleichzeitig, wenn eine zentrale Steuerung ausf\u00e4llt',
      'Reparatur von Inverterplatinen, Steuerungselektronik und Kommunikationsmodulen',
    ],
    bulletsEN: [
      'Welding controllers from Fronius, Lincoln Electric, EWM, Kemppi \u2013 critical in automotive and metal processing',
      'Failure often affects multiple workstations simultaneously when a central controller fails',
      'Repair of inverter boards, control electronics and communication modules',
    ],
  },
  {
    icon: BatteryCharging,
    titleDE: 'Industrielle Netzteile & USV-Elektronik',
    titleEN: 'Industrial Power Supplies & UPS Electronics',
    bulletsDE: [
      'Prim\u00e4r- und Sekund\u00e4rnetzteile in Schaltschr\u00e4nken, Maschinen und sicherheitsrelevanten Anlagen',
      'Netzteilausfall legt oft die gesamte Steuerungsebene einer Anlage lahm \u2013 Folgesch\u00e4den inklusive',
      'CME analysiert Ausfallursache und repariert auf Bauteilebene statt pauschalem Komplettaustausch',
    ],
    bulletsEN: [
      'Primary and secondary power supplies in control cabinets, machines and safety-relevant systems',
      'Power supply failure often paralyzes the entire control level of a system \u2013 including consequential damage',
      'CME analyzes the cause of failure and repairs at component level instead of blanket complete replacement',
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

      {/* Repair Section: Diese Elektronik lohnt sich zu reparieren */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center" style={{ marginBottom: 'var(--space-gap-lg)' }}>
            <h2 className="fluid-h2 text-cme-dark">
              {isDE ? 'Diese Elektronik lohnt sich zu reparieren' : 'This Electronics Is Worth Repairing'}
            </h2>
            <p className="text-gray-600 fluid-body-lg" style={{ marginTop: 'var(--space-gap-xs)' }}>
              {isDE
                ? 'Hohe Ersatzteilkosten, lange Lieferzeiten, kritische Funktion \u2013 hier rechnet sich professionelle Instandsetzung fast immer.'
                : 'High spare part costs, long delivery times, critical function \u2013 professional repair almost always pays off here.'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-md)' }}>
            {repairItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-cme-blue/20 transition-all fluid-card cursor-pointer"
                onClick={() => openSlider(isDE ? item.titleDE : item.titleEN)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSlider(isDE ? item.titleDE : item.titleEN); } }}
              >
                <div
                  className="rounded-xl bg-cme-blue-light flex items-center justify-center"
                  style={{ width: 'var(--icon-box)', height: 'var(--icon-box)', marginBottom: 'var(--space-gap-xs)' }}
                >
                  <item.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                </div>
                <h3 className="fluid-h4 text-cme-dark" style={{ marginBottom: 'var(--space-gap-xs)' }}>
                  {isDE ? item.titleDE : item.titleEN}
                </h3>
                <ul className="space-y-1.5">
                  {(isDE ? item.bulletsDE : item.bulletsEN).map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2 fluid-small text-gray-600">
                      <CheckCircle2 className="text-cme-blue shrink-0 mt-0.5" size={14} />
                      {bullet}
                    </li>
                  ))}
                </ul>
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
