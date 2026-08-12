import SubPageTemplate from '@/components/SubPageTemplate';
import {
  Cpu,
  Zap,
  ThermometerSun,
  Layers,
  Timer,
  SlidersHorizontal,
  ShieldCheck,
  Rocket,
  CircuitBoard,
} from 'lucide-react';

const CDN = 'https://ventspire-cdn.b-cdn.net/cme';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'SMD-Bestückung',
  name: 'SMD-Bestückung & Elektronikfertigung',
  description: 'Hochpräzise SMD-Bestückung vom Prototyp bis zur Großserie. Elektronik Bestücker in Deutschland mit Standort Dortmund, NRW.',
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
    name: 'SMD-Bestückung Leistungen',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SMD-Bestückung Prototypen (ab 1 Stück)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SMD-Bestückung Kleinserie' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SMD-Bestückung Großserie' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Leistungselektronik-Bestückung (SiC/GaN)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dampfphasenlöten' } },
    ],
  },
};

export default function SmdBestueckung() {
  return (
    <SubPageTemplate
      pageKey="fertigung.smd-bestueckung"
      parentHref="/fertigung"
      parentLabelDE="Elektronikfertigung"
      parentLabelEN="Electronics Manufacturing"
      titleDE="SMD-Bestückung Deutschland – Elektronik Bestücker aus NRW"
      titleEN="SMD Assembly Germany – Electronics Manufacturer from NRW"
      subtitleDE="Hochpräzise SMD-Bestückung vom Prototyp bis zur Großserie. Ihr Elektronik Bestücker in Dortmund – Made in Germany."
      subtitleEN="High-precision SMD assembly from prototype to high-volume series. Your electronics manufacturer in Dortmund – Made in Germany."
      metaDescriptionDE="SMD-Bestückung in Deutschland: Ihr Elektronik Bestücker aus NRW. Hochpräzise Leiterplattenbestückung vom Prototyp bis zur Großserie – CME Control Motion Electronics Dortmund."
      metaDescriptionEN="SMD assembly in Germany: Your electronics manufacturer from NRW. High-precision PCB assembly from prototype to high-volume series – CME Control Motion Electronics Dortmund."
      heroVideo={{
        webm: `${CDN}/leiterplatten-hero_9526f6fb.webm`,
        mp4: `${CDN}/leiterplatten-hero_f10b49bd.mp4`,
        poster: `${CDN}/leiterplatten-hero-poster_168ab542.jpg`,
      }}
      introDE="Als Elektronik Bestücker in Deutschland bietet CME Control Motion Electronics die komplette SMD-Bestückung auf modernsten Fertigungslinien. Von der Einzelprototypenfertigung über Kleinserien bis zur Großserie mit mehreren tausend Baugruppen pro Monat – unsere Bestückungsautomaten verarbeiten alle gängigen SMD-Bauformen von 01005 bis zu großen Leistungsmodulen. Der Standort Dortmund in Nordrhein-Westfalen verbindet kurze Wege mit höchster Fertigungsqualität nach ISO 9001 und IPC-A-610. Ob Sie einen zuverlässigen EMS-Partner für Ihre Serienfertigung suchen oder einen flexiblen Bestücker für schnelle Prototypen – CME liefert beides aus einer Hand."
      introEN="As an electronics manufacturer in Germany, CME Control Motion Electronics offers complete SMD assembly on state-of-the-art production lines. From single prototype manufacturing through small series to high-volume production with several thousand assemblies per month – our placement machines process all common SMD packages from 01005 to large power modules. Our Dortmund location in North Rhine-Westphalia combines short distances with the highest manufacturing quality according to ISO 9001 and IPC-A-610. Whether you are looking for a reliable EMS partner for your series production or a flexible assembler for fast prototypes – CME delivers both from a single source."
      ctaDE="SMD-Bestückung anfragen"
      ctaEN="Request SMD Assembly Quote"
      features={[
        {
          de: 'Hochpräzise SMD-Bestückung',
          en: 'High-Precision SMD Assembly',
          icon: Cpu,
          bulletsDE: [
            'Bestückung aller SMD-Bauformen: 01005, 0201, QFN, BGA, LGA, SOP, MELF – bis 0,4 mm Pitch',
            'Moderne Pick-and-Place-Automaten mit optischer Bauteilzentrierung und Koplanarprüfung',
            'Verarbeitung von Leiterplatten bis 460 × 460 mm – auch Multilayer und HDI-Boards',
            'Bestückleistung für Prototypen (ab 1 Stück) und Serien (mehrere tausend/Monat)',
          ],
          bulletsEN: [
            'Placement of all SMD packages: 01005, 0201, QFN, BGA, LGA, SOP, MELF – down to 0.4 mm pitch',
            'Modern pick-and-place machines with optical component centering and coplanarity check',
            'Processing of PCBs up to 460 × 460 mm – including multilayer and HDI boards',
            'Assembly capacity for prototypes (from 1 unit) and series (several thousand/month)',
          ],
        },
        {
          de: 'Leistungselektronik-Bestückung',
          en: 'Power Electronics Assembly',
          icon: Zap,
          bulletsDE: [
            'Spezialisiert auf thermisch anspruchsvolle Baugruppen mit SiC- und GaN-Halbleitern',
            'Dampfphasenlöten für gleichmäßige Wärmeübertragung bei Leistungsmodulen',
            'Verarbeitung von Hochstrom-Bauteilen, Kühlkörpern und thermischen Interfaces',
            'Erfahrung mit Automotive-Leistungselektronik (Wechselrichter, DC/DC-Wandler, Motorsteuerungen)',
          ],
          bulletsEN: [
            'Specialized in thermally demanding assemblies with SiC and GaN semiconductors',
            'Vapor phase soldering for uniform heat transfer on power modules',
            'Processing of high-current components, heat sinks and thermal interfaces',
            'Experience with automotive power electronics (inverters, DC/DC converters, motor controllers)',
          ],
        },
        {
          de: 'Reflow- & Dampfphasenlöten',
          en: 'Reflow & Vapor Phase Soldering',
          icon: ThermometerSun,
          bulletsDE: [
            'Mehrzonen-Reflow-Öfen für bleifreie (SAC305) und bleihaltige Lötprozesse',
            'Dampfphasenlöten für Leistungselektronik – physikalisch begrenzte Maximaltemperatur',
            'Individuelle Temperaturprofile für jede Baugruppe – dokumentiert und reproduzierbar',
            'Geeignet für High-Thermal-Mass-Boards und temperatursensible Bauteile',
          ],
          bulletsEN: [
            'Multi-zone reflow ovens for lead-free (SAC305) and leaded soldering processes',
            'Vapor phase soldering for power electronics – physically limited maximum temperature',
            'Individual temperature profiles for each assembly – documented and reproducible',
            'Suitable for high-thermal-mass boards and temperature-sensitive components',
          ],
        },
        {
          de: 'Pastendruck mit SPI-Kontrolle',
          en: 'Paste Printing with SPI Control',
          icon: Layers,
          bulletsDE: [
            'Automatischer Schablonendruck mit 100%-Inspektion durch Solder Paste Inspection (SPI)',
            'Schablonenoptimierung für Fine-Pitch-Layouts und hohe Komponentendichte',
            'Reproduzierbare Druckqualität durch geschlossene Regelkreise',
            'Dokumentation aller Druckparameter für lückenlose Rückverfolgbarkeit',
          ],
          bulletsEN: [
            'Automatic stencil printing with 100% inspection through Solder Paste Inspection (SPI)',
            'Stencil optimization for fine-pitch layouts and high component density',
            'Reproducible print quality through closed-loop control',
            'Documentation of all print parameters for complete traceability',
          ],
        },
        {
          de: 'Express-Prototypenfertigung',
          en: 'Express Prototype Manufacturing',
          icon: Timer,
          bulletsDE: [
            'Prototypenbestückung ab Einzelstück – Turnaround in wenigen Arbeitstagen bei Bauteilbereitschaft',
            'Serienidentischer Prozess für valide Entwicklungsergebnisse',
            'Direkter Draht zwischen Entwicklung und Fertigung – keine Übergabeverluste',
            'Unterstützung bei Bauteilbeschaffung und Alternativvorschlägen',
          ],
          bulletsEN: [
            'Prototype assembly from single units – turnaround in a few working days when components are available',
            'Series-identical process for valid development results',
            'Direct line between development and manufacturing – no handover losses',
            'Support with component procurement and alternative suggestions',
          ],
        },
        {
          de: 'Flexible Losgrößen – Prototyp bis Serie',
          en: 'Flexible Batch Sizes – Prototype to Series',
          icon: SlidersHorizontal,
          bulletsDE: [
            'Kein Mindestbestellwert – wirtschaftlich auch für Einzelstücke und Kleinserien',
            'Schnelle Rüstwechsel durch standardisierte Fertigungsvorbereitung',
            'Skalierbare Kapazitätsplanung für wachsende Serienvolumen',
            'Nahtloser Übergang vom Prototyp zur Serie auf denselben Fertigungslinien',
          ],
          bulletsEN: [
            'No minimum order value – economical even for single units and small series',
            'Quick changeovers through standardized production preparation',
            'Scalable capacity planning for growing series volumes',
            'Seamless transition from prototype to series on the same production lines',
          ],
        },
        {
          de: '100%-Qualitätskontrolle (AOI & MOI)',
          en: '100% Quality Control (AOI & MOI)',
          icon: ShieldCheck,
          bulletsDE: [
            'Automatische Optische Inspektion (AOI) nach jedem Lötprozess – 3D-fähig',
            'Manuelle Optische Inspektion (MOI) durch IPC-zertifizierte Prüfer',
            'Solder Paste Inspection (SPI) vor der Bestückung als Standard',
            'Lückenlose Fehlerdokumentation mit Rückverfolgbarkeit bis zur Seriennummer',
          ],
          bulletsEN: [
            'Automated Optical Inspection (AOI) after every soldering process – 3D-capable',
            'Manual Optical Inspection (MOI) by IPC-certified inspectors',
            'Solder Paste Inspection (SPI) before assembly as standard',
            'Complete defect documentation with traceability down to serial number',
          ],
        },
        {
          de: 'NPI & DFM-Service',
          en: 'NPI & DFM Service',
          icon: Rocket,
          bulletsDE: [
            'Design-for-Manufacturing-Review vor Serienstart – Fertigbarkeit sichergestellt',
            'Erstmuster-Prüfbericht (EMPB) zur dokumentierten Serienfreigabe',
            'Optimierungsvorschläge für Kosten, Testbarkeit und Fertigungsrobustheit',
            'Enge Abstimmung zwischen Entwicklung, Einkauf und Fertigungsplanung',
          ],
          bulletsEN: [
            'Design-for-Manufacturing review before series start – manufacturability ensured',
            'First article inspection report (EMPB) for documented series release',
            'Optimization suggestions for cost, testability and manufacturing robustness',
            'Close coordination between development, purchasing and production planning',
          ],
        },
        {
          de: 'Mixed-Technology (SMD + THT)',
          en: 'Mixed Technology (SMD + THT)',
          icon: CircuitBoard,
          bulletsDE: [
            'Kombinierte SMD/THT-Bestückung auf einer Leiterplatte ohne Kompromisse',
            'Selektivlöten schützt temperatursensible SMD-Bauteile bei THT-Verarbeitung',
            'Ideal für Leistungselektronik mit Mischbestückung und hoher Komponentendichte',
            'Verarbeitung von Steckverbindern, Transformatoren und Sondergehäusen',
          ],
          bulletsEN: [
            'Combined SMD/THT assembly on one PCB without compromise',
            'Selective soldering protects temperature-sensitive SMD components during THT processing',
            'Ideal for power electronics with mixed assembly and high component density',
            'Processing of connectors, transformers and special housings',
          ],
        },
      ]}
      additionalSchemas={[serviceSchema]}
      enPath="/en/manufacturing/smd-assembly"
    />
  );
}
