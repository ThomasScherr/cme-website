import SubPageTemplate from '@/components/SubPageTemplate';
import {
  Timer,
  Rocket,
  Zap,
  MessageSquare,
  Package,
  Repeat,
  ShieldCheck,
  Wrench,
  ArrowRightLeft,
} from 'lucide-react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Elektronik-Prototypenfertigung',
  name: 'Express-Prototypenfertigung für Elektronik',
  description: 'Elektronik-Prototypen fertigen lassen: Express-Bestückung ab Einzelstück mit serienidentischem Prozess. Schnelle Prototypenfertigung in Dortmund.',
  provider: {
    '@type': 'Organization',
    name: 'CME Control Motion Electronics GmbH',
    url: 'https://control-motion.de',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Alter Hellweg 48',
      addressLocality: 'Dortmund',
      postalCode: '44379',
      addressRegion: 'NRW',
      addressCountry: 'DE',
    },
  },
  areaServed: {
    '@type': 'Country',
    name: 'Deutschland',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Prototypenfertigung Leistungen',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Express-Prototypenbestückung (ab 1 Stück)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vorserienfertigung' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'DFM-Review & Optimierung' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Leistungselektronik-Prototypen' } },
    ],
  },
};

export default function Prototypen() {
  return (
    <SubPageTemplate
      pageKey="fertigung.prototypen"
      parentHref="/fertigung"
      parentLabelDE="Elektronikfertigung"
      parentLabelEN="Electronics Manufacturing"
      titleDE="Elektronik-Prototypen fertigen lassen – Express aus Dortmund"
      titleEN="Electronics Prototype Manufacturing – Express from Dortmund"
      subtitleDE="Vom Einzelprototyp zur validierten Vorserie. Schnelle Prototypenfertigung mit serienidentischem Prozess – Made in Germany."
      subtitleEN="From single prototype to validated pre-series. Fast prototype manufacturing with series-identical process – Made in Germany."
      metaDescriptionDE="Elektronik-Prototypen fertigen lassen: Express-Bestückung ab Einzelstück in Dortmund. Serienidentischer Prozess, DFM-Feedback und nahtloser Übergang zur Serie – CME."
      metaDescriptionEN="Electronics prototype manufacturing: Express assembly from single units in Dortmund. Series-identical process, DFM feedback and seamless transition to series – CME."
      heroImg={`${CDN}/JK_1736__1920px_e713f7ca.jpg`}
      introDE="Sie möchten Ihre Elektronik-Prototypen fertigen lassen – schnell, zuverlässig und mit serienidentischem Prozess? CME Control Motion Electronics in Dortmund bietet Express-Prototypenfertigung ab Einzelstück. Der entscheidende Vorteil: Entwicklung und Fertigung sitzen unter einem Dach. Dadurch entfallen Übergabeverluste, Rückfragen werden in Minuten statt Tagen geklärt, und Ihre Prototypen durchlaufen exakt denselben Prozess wie die spätere Serie. So erhalten Sie valide Entwicklungsergebnisse – nicht nur bestückte Leiterplatten, sondern geprüfte, dokumentierte Baugruppen, die direkt in Ihre Validierung gehen können."
      introEN="Looking to have your electronics prototypes manufactured – fast, reliably and with a series-identical process? CME Control Motion Electronics in Dortmund offers express prototype manufacturing from single units. The decisive advantage: development and manufacturing under one roof. This eliminates handover losses, questions are resolved in minutes instead of days, and your prototypes go through exactly the same process as the later series. This gives you valid development results – not just assembled PCBs, but tested, documented assemblies that can go directly into your validation."
      ctaDE="Prototyp anfragen"
      ctaEN="Request Prototype Quote"
      features={[
        {
          de: 'Express-Fertigung ab Einzelstück',
          en: 'Express Manufacturing from Single Units',
          icon: Timer,
          bulletsDE: [
            'Prototypenbestückung ab 1 Stück – kein Mindestbestellwert, keine Einrichtungspauschale',
            'Turnaround in wenigen Arbeitstagen bei Bauteilbereitschaft',
            'Express-Service nach Absprache für besonders eilige Projekte',
            'Parallele Bauteilbeschaffung und Fertigungsvorbereitung für minimale Durchlaufzeit',
          ],
          bulletsEN: [
            'Prototype assembly from 1 unit – no minimum order value, no setup fee',
            'Turnaround in a few working days when components are available',
            'Express service by arrangement for particularly urgent projects',
            'Parallel component procurement and production preparation for minimal lead time',
          ],
        },
        {
          de: 'Serienidentischer Prozess',
          en: 'Series-Identical Process',
          icon: Repeat,
          bulletsDE: [
            'Prototypen durchlaufen exakt denselben Fertigungsprozess wie die spätere Serie',
            'Gleiche Bestückungsautomaten, Lötanlagen und Prüfmittel – keine Abweichungen',
            'Valide Entwicklungsergebnisse statt „Labormuster" – direkt für Validierung nutzbar',
            'Dokumentierte Prozessparameter als Basis für den späteren Serienanlauf',
          ],
          bulletsEN: [
            'Prototypes go through exactly the same manufacturing process as the later series',
            'Same placement machines, soldering systems and test equipment – no deviations',
            'Valid development results instead of "lab samples" – directly usable for validation',
            'Documented process parameters as basis for later series ramp-up',
          ],
        },
        {
          de: 'DFM-Feedback vor Fertigung',
          en: 'DFM Feedback Before Manufacturing',
          icon: MessageSquare,
          bulletsDE: [
            'Design-for-Manufacturing-Review Ihrer Fertigungsunterlagen vor Bestückung',
            'Konkrete Optimierungsvorschläge für Fertigbarkeit, Testbarkeit und Kosten',
            'Frühzeitige Erkennung von Problemen – bevor sie in der Serie teuer werden',
            'Enge Abstimmung zwischen CME-Entwicklern und Fertigungsingenieuren',
          ],
          bulletsEN: [
            'Design-for-Manufacturing review of your production documents before assembly',
            'Concrete optimization suggestions for manufacturability, testability and cost',
            'Early detection of problems – before they become expensive in series',
            'Close coordination between CME developers and manufacturing engineers',
          ],
        },
        {
          de: 'Leistungselektronik-Prototypen',
          en: 'Power Electronics Prototypes',
          icon: Zap,
          bulletsDE: [
            'Spezialisiert auf thermisch anspruchsvolle Prototypen (SiC, GaN, IGBT-Module)',
            'Dampfphasenlöten für Leistungsmodule – schonend und reproduzierbar',
            'Erfahrung mit Automotive-Prototypen nach ISO 26262 Anforderungen',
            'Thermische Validierung und Funktionstest direkt nach Bestückung möglich',
          ],
          bulletsEN: [
            'Specialized in thermally demanding prototypes (SiC, GaN, IGBT modules)',
            'Vapor phase soldering for power modules – gentle and reproducible',
            'Experience with automotive prototypes according to ISO 26262 requirements',
            'Thermal validation and functional testing directly after assembly possible',
          ],
        },
        {
          de: 'Bauteilbeschaffung & Beratung',
          en: 'Component Procurement & Consulting',
          icon: Package,
          bulletsDE: [
            'Unterstützung bei Bauteilbeschaffung – auch für schwer verfügbare Komponenten',
            'Alternativvorschläge bei Lieferengpässen oder Abkündigungen',
            'Beistellung durch Kunden oder Komplettbeschaffung durch CME – flexibel wählbar',
            'Wareneingangsprüfung aller Bauteile vor Verarbeitung',
          ],
          bulletsEN: [
            'Support with component procurement – even for hard-to-source components',
            'Alternative suggestions for supply shortages or end-of-life situations',
            'Customer-supplied or complete procurement by CME – flexibly selectable',
            'Incoming goods inspection of all components before processing',
          ],
        },
        {
          de: 'Nahtloser Übergang zur Serie',
          en: 'Seamless Transition to Series',
          icon: ArrowRightLeft,
          bulletsDE: [
            'Vom Prototyp zur Serie ohne Lieferantenwechsel – kein Informationsverlust',
            'Alle Fertigungsparameter aus der Prototypenphase fließen direkt in die Serienplanung',
            'Erstmuster-Prüfbericht (EMPB) als dokumentierte Serienfreigabe',
            'Skalierbare Kapazität: gleiche Linie fertigt 1 Stück oder 5.000 pro Monat',
          ],
          bulletsEN: [
            'From prototype to series without changing suppliers – no information loss',
            'All manufacturing parameters from the prototype phase flow directly into series planning',
            'First article inspection report (EMPB) as documented series release',
            'Scalable capacity: same line manufactures 1 unit or 5,000 per month',
          ],
        },
        {
          de: 'Entwicklung & Fertigung aus einer Hand',
          en: 'Development & Manufacturing from One Source',
          icon: Wrench,
          bulletsDE: [
            'CME entwickelt und fertigt – oder fertigt Fremddesigns als reiner EMS-Partner',
            'Bei CME-Entwicklungsprojekten: kürzeste Wege zwischen Schaltplan und Bestückung',
            'Iterative Prototypenrunden mit sofortigem Feedback aus der Fertigung',
            'Volle Wahlfreiheit: nur Entwicklung, nur Fertigung oder beides',
          ],
          bulletsEN: [
            'CME develops and manufactures – or manufactures third-party designs as pure EMS partner',
            'For CME development projects: shortest paths between schematic and assembly',
            'Iterative prototype rounds with immediate feedback from manufacturing',
            'Full freedom of choice: development only, manufacturing only, or both',
          ],
        },
        {
          de: 'NPI-Prozess & Dokumentation',
          en: 'NPI Process & Documentation',
          icon: Rocket,
          bulletsDE: [
            'Strukturierter New-Product-Introduction-Prozess von der Anfrage bis zur Serienfreigabe',
            'Vollständige Fertigungsdokumentation: Bestückplan, Lötprofil, Prüfanweisung',
            'Rückverfolgbarkeit ab dem ersten Prototyp – datenbankgestützt bis zur Seriennummer',
            'Lessons Learned aus der Prototypenphase fließen in die Serienoptimierung ein',
          ],
          bulletsEN: [
            'Structured New Product Introduction process from inquiry to series release',
            'Complete manufacturing documentation: assembly plan, soldering profile, test instruction',
            'Traceability from the first prototype – database-driven down to serial number',
            'Lessons learned from the prototype phase flow into series optimization',
          ],
        },
        {
          de: 'Qualitätsprüfung & Test',
          en: 'Quality Inspection & Test',
          icon: ShieldCheck,
          bulletsDE: [
            'AOI (Automatische Optische Inspektion) auch für Prototypen – kein Kompromiss bei Qualität',
            'Funktionstest nach Kundenspezifikation oder gemeinsam definierter Prüfanweisung',
            'Elektrische Prüfung (ICT/Flying Probe) bei Bedarf bereits ab Prototyp',
            'Dokumentierte Prüfergebnisse als Grundlage für Ihre Entwicklungsvalidierung',
          ],
          bulletsEN: [
            'AOI (Automated Optical Inspection) also for prototypes – no compromise on quality',
            'Functional testing according to customer specification or jointly defined test instruction',
            'Electrical testing (ICT/Flying Probe) if required already from prototype stage',
            'Documented test results as basis for your development validation',
          ],
        },
      ]}
      additionalSchemas={[serviceSchema]}
      enPath="/en/manufacturing/prototypes"
    />
  );
}
