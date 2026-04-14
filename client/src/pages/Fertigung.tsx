import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import SubPageHero from '@/components/SubPageHero';
import ContactSlider from '@/components/ContactSlider';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Link } from 'wouter';
import {
  ArrowRight,
  CircuitBoard,
  Boxes,
  ShieldCheck,
  Cpu,
  Wrench,
  Eye,
  Paintbrush,
  Cable,
  FlaskConical,
  Database,
  PenTool,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';
const HERO_VIDEO = {
  webm: `${CDN}/leiterplatten-hero_9526f6fb.webm`,
  mp4: `${CDN}/leiterplatten-hero_f10b49bd.mp4`,
  poster: `${CDN}/leiterplatten-hero-poster_168ab542.jpg`,
};

const subpages = [
  {
    icon: CircuitBoard,
    titleDE: 'Leiterplatten bestücken',
    titleEN: 'PCB Assembly',
    descDE: 'SMD- und THT-Bestückung auf modernsten Fertigungslinien – vom Prototyp bis zur Großserie.',
    descEN: 'SMD and THT assembly on state-of-the-art production lines – from prototype to high-volume series.',
    href: '/fertigung/leiterplatten',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1148__1920px_1cc154ec.jpg',
  },
  {
    icon: Boxes,
    titleDE: 'Baugruppen fertigen',
    titleEN: 'Module Assembly',
    descDE: 'Komplette Baugruppenmontage inkl. Verguss, Schutzlackierung, Kabelkonfektionierung und Endmontage.',
    descEN: 'Complete module assembly including potting, conformal coating, cable assembly and final assembly.',
    href: '/fertigung/baugruppen',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1736__1920px_e713f7ca.jpg',
  },
  {
    icon: ShieldCheck,
    titleDE: 'Qualitätsmanagement',
    titleEN: 'Quality Management',
    descDE: 'ISO 9001 & 14001 zertifiziert. AOI, MOI, und lückenlose Rückverfolgbarkeit durch datenbankgestützte Prozesse.',
    descEN: 'ISO 9001 & 14001 certified. AOI, MOI, and complete traceability through database-driven processes.',
    href: '/fertigung/qualitaet',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2055__1920px_00c91d17.jpg',
  },
];

const capabilities = [
  {
    de: 'SMD-Bestückung', en: 'SMD Assembly', icon: Cpu,
    bulletsDE: [
      'Hochpräzise Bestückung bis 01005 und 0,4\u00a0mm Pitch – BGA, QFN, LGA und Fine-Pitch-Bauformen',
      'Flexible Linien für Prototypen, Kleinserien und mehrere tausend Stück pro Monat',
      '100\u00a0%-AOI nach der Bestückung als Standard – kein Bauteil verlässt die Linie ungeprüft',
    ],
    bulletsEN: [
      'High-precision placement down to 01005 and 0.4\u00a0mm pitch – BGA, QFN, LGA and fine-pitch packages',
      'Flexible lines for prototypes, small series and several thousand units per month',
      '100\u00a0% AOI after placement as standard – no component leaves the line unchecked',
    ],
  },
  {
    de: 'THT-Bestückung & Selektivlöten', en: 'THT Assembly & Selective Soldering', icon: Wrench,
    bulletsDE: [
      'Manuelle und automatisierte Bestückung bedrahteter Bauelemente aller Bauformen',
      'Selektivlöten schützt SMD-Bauteile vor Wellenlöt-Wärme bei Mischbestückung',
      'Reproduzierbare Lötergebnisse durch programmierte Einzelpunktlötung',
    ],
    bulletsEN: [
      'Manual and automated assembly of through-hole components in all package types',
      'Selective soldering protects SMD components from wave solder heat in mixed assemblies',
      'Reproducible solder results through programmed single-point soldering',
    ],
  },
  {
    de: 'AOI & MOI', en: 'AOI & MOI', icon: Eye,
    bulletsDE: [
      'Automatische Optische Inspektion (AOI) nach jedem Lötprozess – 3D-fähig für verdeckte Lötstellen',
      'Manuelle Optische Inspektion (MOI) durch zertifizierte IPC-Prüfer für komplexe Baugruppen',
      'Lückenlose Fehlerdokumentation mit Rückverfolgbarkeit bis zur Seriennummer',
    ],
    bulletsEN: [
      'Automated Optical Inspection (AOI) after every soldering process – 3D-capable for hidden solder joints',
      'Manual Optical Inspection (MOI) by certified IPC inspectors for complex assemblies',
      'Complete defect documentation with traceability down to serial number',
    ],
  },
  {
    de: 'Verguss & Schutzlackierung', en: 'Potting & Conformal Coating', icon: Paintbrush,
    bulletsDE: [
      'Verguss mit PU, Epoxid oder Silikon – Materialwahl nach thermischen und mechanischen Anforderungen',
      'Selektive Schutzlackierung (Conformal Coating) per Sprühen oder Fluten mit UV-Prüfung',
      'Schutz vor Feuchtigkeit, Vibration, Chemikalien und kriechenden Strömen',
    ],
    bulletsEN: [
      'Potting with PU, epoxy or silicone – material selection based on thermal and mechanical requirements',
      'Selective conformal coating by spraying or flooding with UV inspection',
      'Protection against moisture, vibration, chemicals and creepage currents',
    ],
  },
  {
    de: 'Kabelkonfektionierung', en: 'Cable Assembly', icon: Cable,
    bulletsDE: [
      'Kundenspezifische Kabel und Kabelbäume nach Schaltplan – Einzel- bis Serienproduktion',
      'Alle gängigen Steckersysteme: TE, Molex, JST, Deutsch und weitere',
      '100\u00a0%-elektrische Prüfung auf Durchgang, Isolation und korrekte Pinbelegung',
    ],
    bulletsEN: [
      'Custom cables and wire harnesses per schematic – single unit to series production',
      'All common connector systems: TE, Molex, JST, Deutsch and more',
      '100\u00a0% electrical testing for continuity, insulation and correct pin assignment',
    ],
  },
  {
    de: 'Funktionstest & ICT', en: 'Functional Test & ICT', icon: FlaskConical,
    bulletsDE: [
      'End-of-Line-Funktionstest für 100\u00a0%-Prüfung aller Serieneinheiten vor Versand',
      'In-Circuit-Test (ICT) per Nadelbett oder Flying-Probe ab Losgröße 1',
      'Prüfprotokolle und Testergebnisse für lückenlose Qualitätsdokumentation',
    ],
    bulletsEN: [
      'End-of-line functional test for 100\u00a0% inspection of all series units before shipping',
      'In-Circuit Test (ICT) via bed-of-nails or flying probe from lot size 1',
      'Test protocols and results for complete quality documentation',
    ],
  },
  {
    de: 'Traceability & MES', en: 'Traceability & MES', icon: Database,
    bulletsDE: [
      'Vollständige Rückverfolgbarkeit jeder Baugruppe vom Wareneingang bis zum Versand',
      'Vernetzung aller Fertigungsgeräte in einer zentralen Fertigungsdatenbank (MES)',
      'Chargen-, Serien- und Bauteil-Tracing – exportfähig für Kunden und Zulassungsbehörden',
    ],
    bulletsEN: [
      'Complete traceability of every assembly from incoming goods to shipping',
      'All production equipment networked in a central manufacturing database (MES)',
      'Batch, serial and component tracing – exportable for customers and regulatory authorities',
    ],
  },
  {
    de: 'Design for Manufacturing', en: 'Design for Manufacturing', icon: PenTool,
    bulletsDE: [
      'DFM-Review bereits in der Entwicklungsphase – Fertigbarkeit wird vor dem ersten Prototypen geprüft',
      'Direkte Rückkopplung zwischen Entwicklung und Fertigung am gleichen Standort',
      'Reduziert Iterationsschleifen, Kosten und Time-to-Market in der Serienüberführung',
    ],
    bulletsEN: [
      'DFM review already in the development phase – manufacturability is checked before the first prototype',
      'Direct feedback between development and manufacturing at the same location',
      'Reduces iteration loops, costs and time-to-market in series transfer',
    ],
  },
];

export default function Fertigung() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  const { t: cms, img, vid } = useContent('fertigung');

  // Hero video: CMS overrides hardcoded default
  const cmsVideoWebm = vid('hero.heroVideoWebm');
  const cmsVideoMp4 = vid('hero.heroVideoMp4');
  const cmsVideoPoster = img('hero.heroVideoPoster');
  const cmsVideoPlayback = cms('hero.heroVideoPlayback') as 'loop' | 'once' | '';
  const effectiveHeroVideo = (cmsVideoWebm || cmsVideoMp4)
    ? { webm: cmsVideoWebm || undefined, mp4: cmsVideoMp4 || undefined, poster: cmsVideoPoster || undefined, playback: (cmsVideoPlayback === 'once' ? 'once' : 'loop') as 'loop' | 'once' }
    : HERO_VIDEO;

  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderTopic, setSliderTopic] = useState('');
  const openSlider = (topic: string) => { setSliderTopic(topic); setSliderOpen(true); };

  return (
    <Layout>
      <SEO
        titleDE='Elektronikfertigung & EMS'
        titleEN='Electronics Manufacturing & EMS'
        descriptionDE='EMS-Dienstleister für Leiterplattenbestückung, Baugruppenfertigung und Qualitätssicherung – von Prototypen bis Serienproduktion.'
        descriptionEN='EMS provider for PCB assembly, module manufacturing and quality assurance – from prototypes to series production.'
        path='/fertigung'
        breadcrumbs={[{name:'Home',url:'/'},{name:'Elektronikfertigung',url:'/fertigung'}]}
      />
      <SubPageHero
        tagline={cms('hero.tagline') || (isDE ? 'Elektronikfertigung (EMS)' : 'Electronics Manufacturing (EMS)')}
        headline={cms('hero.headline') || (isDE ? 'Vom Prototyp zur Serie. Made in Dortmund.' : 'From prototype to series. Made in Dortmund.')}
        description={cms('hero.description') || (isDE
          ? 'ISO-zertifizierte Elektronikfertigung mit eigener SMD- und THT-Linie. Prototypen, Kleinserien und Serienproduktion – alles aus einer Hand.'
          : 'ISO-certified electronics manufacturing with own SMD and THT lines. Prototypes, small series and series production – all from a single source.')}
        cta={{ label: isDE ? 'Angebot anfragen' : 'Request Quote', href: '/kontakt' }}
        heroVideo={effectiveHeroVideo}
        heroImageAlt="Elektronikfertigung"
      />

      {/* Subpages Grid */}
      <section className="section-pad">
        <div className="container">
          <h2 className="fluid-h2 text-cme-dark text-center">
            {isDE ? 'Unsere Fertigungsleistungen' : 'Our Manufacturing Services'}
          </h2>
          <p className="text-gray-600 text-center fluid-body-lg max-w-2xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Von der Leiterplattenbestückung über die Baugruppenmontage bis zur Qualitätssicherung – alles unter einem Dach.'
              : 'From PCB assembly through module integration to quality assurance – all under one roof.'}
          </p>

          <div className="grid md:grid-cols-3" style={{ gap: 'var(--space-gap-md)', marginTop: 'var(--space-section-header)' }}>
            {subpages.map((page, i) => (
              <motion.div
                key={page.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={page.href} className="group block">
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={page.img}
                        alt={isDE ? page.titleDE : page.titleEN}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="fluid-card">
                      <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)', marginBottom: 'var(--space-gap-xs)' }}>
                        <div
                          className="rounded-lg bg-cme-blue-light flex items-center justify-center shrink-0"
                          style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}
                        >
                          <page.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                        </div>
                        <h3 className="fluid-h4 text-cme-dark">
                          {isDE ? page.titleDE : page.titleEN}
                        </h3>
                      </div>
                      <p className="text-gray-600 fluid-small leading-relaxed">
                        {isDE ? page.descDE : page.descEN}
                      </p>
                      <div className="flex items-center text-cme-blue font-semibold fluid-small group-hover:gap-3 transition-all" style={{ gap: 'var(--space-gap-xs)', marginTop: 'var(--space-gap-xs)' }}>
                        {isDE ? 'Mehr erfahren' : 'Learn more'}
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <h2 className="fluid-h2 text-cme-dark text-center">
            {isDE ? 'Fertigungskapazitäten' : 'Manufacturing Capabilities'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-gap-sm)', marginTop: 'var(--space-section-header)' }}>
            {capabilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-gray-100 hover:border-cme-blue/20 hover:shadow-md transition-all fluid-card cursor-pointer group"
                  onClick={() => openSlider(isDE ? item.de : item.en)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSlider(isDE ? item.de : item.en); } }}
                >
                  <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)', marginBottom: item.bulletsDE?.length ? '0.5rem' : undefined }}>
                    <div
                      className="rounded-lg bg-cme-blue-light flex items-center justify-center shrink-0 group-hover:bg-cme-blue/15 transition-colors"
                      style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}
                    >
                      <Icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                    </div>
                    <p className="font-medium text-cme-dark fluid-small">{isDE ? item.de : item.en}</p>
                  </div>
                  {(isDE ? item.bulletsDE : item.bulletsEN)?.length ? (
                    <ul className="space-y-1">
                      {(isDE ? item.bulletsDE : item.bulletsEN)!.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-600" style={{ fontSize: 'clamp(0.7rem, 0.6rem + 0.2vw, 0.8125rem)', lineHeight: '1.4' }}>
                          <span className="w-1 h-1 rounded-full bg-cme-blue/60 mt-[0.4em] flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container text-center">
          <h2 className="fluid-h2 text-cme-dark">
            {isDE ? 'Serienfertigung beginnt mit einer belastbaren Kalkulation.' : 'Series production starts with a reliable quote.'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Stückzahl, Technologie, Zeitplan – senden Sie uns die Eckdaten. Wir kalkulieren verbindlich.'
              : 'Volume, technology, timeline – send us the key data. We provide a binding quote.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? 'Fertigungsanfrage stellen' : 'Submit manufacturing inquiry'}
          </Link>
        </div>
      </section>

      <ContactSlider
        isOpen={sliderOpen}
        onClose={() => setSliderOpen(false)}
        topic={sliderTopic}
        pageSource={`fertigung – ${sliderTopic}`}
      />
    </Layout>
  );
}
