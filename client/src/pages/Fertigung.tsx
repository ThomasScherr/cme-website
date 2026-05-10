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
  ChevronDown,
  Timer,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

/* ══════════════════════════════════════════════════════════════════
   16 FAQs in 3 Clustern – bilingual (DE / EN)
   Cluster 1: Prozess & Kapazität (FAQ 1–5)
   Cluster 2: Technologie & Qualität (FAQ 6–11)
   Cluster 3: Zusammenarbeit & Konditionen (FAQ 12–16)
   ══════════════════════════════════════════════════════════════════ */

const faqCluster1 = [
  {
    questionDE: 'Welche Losgrößen fertigt CME – vom Prototyp bis zur Serie?',
    questionEN: 'What batch sizes does CME manufacture – from prototype to series?',
    answerDE: 'CME fertigt flexibel vom Einzelprototyp über Kleinserien (10–500 Stück) bis hin zu Serienproduktionen mit mehreren tausend Einheiten pro Monat. Durch die Kombination von Entwicklung und Fertigung unter einem Dach ist ein nahtloser Übergang vom Prototyp zur Serie möglich – ohne Lieferantenwechsel und ohne Informationsverlust. Die gleichen Fertigungslinien, die Ihre Prototypen bestücken, übernehmen auch die Serienproduktion.',
    answerEN: 'CME manufactures flexibly from single prototypes through small series (10–500 units) to series production of several thousand units per month. By combining development and manufacturing under one roof, a seamless transition from prototype to series is possible – without changing suppliers and without information loss. The same production lines that assemble your prototypes also handle series production.',
  },
  {
    questionDE: 'Wie läuft eine EMS-Fertigungsanfrage bei CME ab?',
    questionEN: 'How does an EMS manufacturing inquiry work at CME?',
    answerDE: 'Sie senden uns Ihre Fertigungsunterlagen (Gerber-Daten, Stückliste/BOM, Bestückungsplan) und die gewünschte Stückzahl. Wir prüfen die Unterlagen auf Fertigbarkeit (DFM-Check), kalkulieren verbindlich und erstellen ein transparentes Angebot. Nach Auftragserteilung beschaffen wir die Bauteile, richten die Fertigung ein und liefern termingerecht. Bei Bedarf führen wir vorab ein DFM-Review durch und schlagen Optimierungen vor, die Kosten und Fertigungsrisiken reduzieren.',
    answerEN: 'You send us your manufacturing documents (Gerber data, bill of materials/BOM, assembly drawing) and the desired quantity. We check the documents for manufacturability (DFM check), provide a binding quote, and create a transparent offer. After order placement, we procure components, set up production, and deliver on schedule. If needed, we conduct a DFM review upfront and suggest optimizations that reduce costs and manufacturing risks.',
  },
  {
    questionDE: 'Kann CME auch Fremdentwicklungen fertigen – oder nur eigene Designs?',
    questionEN: 'Can CME also manufacture third-party designs – or only in-house designs?',
    answerDE: 'CME fertigt sowohl eigene Entwicklungen als auch Fremddesigns. Sie können CME ausschließlich als EMS-Fertigungspartner beauftragen, ohne dass eine Entwicklung bei uns stattgefunden hat. Umgekehrt können Sie auch nur die Entwicklung bei CME beauftragen und die Fertigung bei einem anderen EMS-Partner durchführen lassen. Sie haben die volle Wahlfreiheit: nur Entwicklung, nur Fertigung oder beides aus einer Hand.',
    answerEN: 'CME manufactures both in-house developments and third-party designs. You can commission CME exclusively as an EMS manufacturing partner without any development having taken place with us. Conversely, you can also commission only the development at CME and have manufacturing done by another EMS partner. You have complete freedom of choice: development only, manufacturing only, or both from a single source.',
  },
  {
    questionDE: 'Wie schnell kann CME Prototypen fertigen?',
    questionEN: 'How quickly can CME manufacture prototypes?',
    answerDE: 'Prototypen-Durchlaufzeiten hängen von der Bauteilbeschaffung ab. Sind alle Bauteile verfügbar, bestücken und löten wir Prototypen innerhalb weniger Arbeitstage. Bei Entwicklungsprojekten, die bei CME laufen, ist die Prototypenfertigung besonders schnell, weil Entwicklung und Fertigung am gleichen Standort sitzen und keine Übergabeverluste entstehen. Für eilige Projekte bieten wir Express-Fertigung nach Absprache.',
    answerEN: 'Prototype lead times depend on component procurement. When all components are available, we assemble and solder prototypes within a few working days. For development projects running at CME, prototype manufacturing is particularly fast because development and manufacturing are at the same location with no handover losses. For urgent projects, we offer express manufacturing by arrangement.',
  },
  {
    questionDE: 'Welche Fertigungsunterlagen benötigt CME für eine Kalkulation?',
    questionEN: 'What manufacturing documents does CME need for a quotation?',
    answerDE: 'Für eine belastbare Kalkulation benötigen wir: Gerber-Daten (oder ODB++), eine Stückliste (BOM) mit Herstellerteilenummern, den Bestückungsplan (Pick-and-Place-Daten) und die gewünschte Stückzahl. Zusätzlich hilfreich sind Angaben zu besonderen Anforderungen wie Verguss, Schutzlackierung, Funktionstest oder spezielle Verpackung. Falls einzelne Unterlagen noch fehlen, unterstützen wir Sie gerne bei der Aufbereitung.',
    answerEN: 'For a reliable quotation, we need: Gerber data (or ODB++), a bill of materials (BOM) with manufacturer part numbers, the assembly drawing (pick-and-place data), and the desired quantity. Additionally helpful are details about special requirements such as potting, conformal coating, functional testing, or special packaging. If individual documents are still missing, we are happy to assist with preparation.',
  },
];

const faqCluster2 = [
  {
    questionDE: 'Welche Bestückungstechnologien bietet CME an?',
    questionEN: 'What assembly technologies does CME offer?',
    answerDE: 'CME bietet die volle Bandbreite moderner Bestückungstechnologien: SMD-Bestückung bis 01005 und 0,4 mm Pitch (BGA, QFN, LGA, Fine-Pitch), THT-Bestückung (manuell und automatisiert), Selektivlöten für Mischbestückungen, Dampfphasenlöten für besonders gleichmäßige Lötverbindungen und Handbestückung für Sonderbauteile. Jeder Lötprozess wird durch 100 %-AOI (Automatische Optische Inspektion) abgesichert.',
    answerEN: 'CME offers the full range of modern assembly technologies: SMD assembly down to 01005 and 0.4 mm pitch (BGA, QFN, LGA, fine-pitch), THT assembly (manual and automated), selective soldering for mixed assemblies, vapor phase soldering for particularly uniform solder joints, and manual assembly for special components. Every soldering process is secured by 100% AOI (Automated Optical Inspection).',
  },
  {
    questionDE: 'Wie stellt CME die Qualität in der Elektronikfertigung sicher?',
    questionEN: 'How does CME ensure quality in electronics manufacturing?',
    answerDE: 'Qualitätssicherung ist in jeden Fertigungsschritt integriert: 100 %-AOI (Automatische Optische Inspektion) nach jedem Lötprozess, Manuelle Optische Inspektion (MOI) durch IPC-zertifizierte Prüfer bei komplexen Baugruppen, End-of-Line-Funktionstest und lückenlose Rückverfolgbarkeit über unser MES-System. CME ist nach ISO 9001 und ISO 14001 zertifiziert und arbeitet nach IPC-A-610 und IPC J-STD-001 Standards. Jede Baugruppe ist vom Wareneingang bis zum Versand rückverfolgbar.',
    answerEN: 'Quality assurance is integrated into every manufacturing step: 100% AOI (Automated Optical Inspection) after every soldering process, Manual Optical Inspection (MOI) by IPC-certified inspectors for complex assemblies, end-of-line functional testing, and complete traceability via our MES system. CME is ISO 9001 and ISO 14001 certified and works to IPC-A-610 and IPC J-STD-001 standards. Every assembly is traceable from incoming goods to shipping.',
  },
  {
    questionDE: 'Bietet CME auch Verguss und Schutzlackierung (Conformal Coating) an?',
    questionEN: 'Does CME also offer potting and conformal coating?',
    answerDE: 'Ja, CME bietet sowohl Verguss als auch selektive Schutzlackierung als Teil der Baugruppenfertigung an. Beim Verguss arbeiten wir mit PU, Epoxid oder Silikon – die Materialwahl richtet sich nach den thermischen und mechanischen Anforderungen Ihrer Anwendung. Die Schutzlackierung erfolgt per Sprühen oder Fluten mit anschließender UV-Prüfung. Beide Verfahren schützen Ihre Elektronik vor Feuchtigkeit, Vibration, Chemikalien und kriechenden Strömen.',
    answerEN: 'Yes, CME offers both potting and selective conformal coating as part of module assembly. For potting, we work with PU, epoxy, or silicone – material selection is based on the thermal and mechanical requirements of your application. Conformal coating is applied by spraying or flooding with subsequent UV inspection. Both processes protect your electronics against moisture, vibration, chemicals, and creepage currents.',
  },
  {
    questionDE: 'Was bedeutet Traceability bei CME – und warum ist das wichtig?',
    questionEN: 'What does traceability mean at CME – and why is it important?',
    answerDE: 'Traceability bedeutet die vollständige Rückverfolgbarkeit jeder Baugruppe vom Wareneingang bis zum Versand. Bei CME sind alle Fertigungsgeräte in einer zentralen Fertigungsdatenbank (MES) vernetzt. Jede Charge, Seriennummer und jedes verbaute Bauteil wird dokumentiert und ist exportfähig – für Ihre eigene Qualitätsdokumentation oder für Zulassungsbehörden. Das ist besonders wichtig für sicherheitskritische Branchen wie Automotive, Medizintechnik und Industrieautomation.',
    answerEN: 'Traceability means complete tracking of every assembly from incoming goods to shipping. At CME, all production equipment is networked in a central manufacturing database (MES). Every batch, serial number, and installed component is documented and exportable – for your own quality documentation or for regulatory authorities. This is particularly important for safety-critical industries such as automotive, medical technology, and industrial automation.',
  },
  {
    questionDE: 'Führt CME auch Funktionstests und elektrische Prüfungen durch?',
    questionEN: 'Does CME also perform functional tests and electrical testing?',
    answerDE: 'Ja, CME bietet End-of-Line-Funktionstests für die 100 %-Prüfung aller Serieneinheiten vor Versand. Je nach Anforderung, Stückzahl und Layoutkomplexität setzen wir manuelle Prüfung oder Nadelbett-Adapter (ICT) ein. Alle Prüfprotokolle und Testergebnisse werden für die lückenlose Qualitätsdokumentation archiviert. Bei Entwicklungsprojekten, die bei CME laufen, entwickeln unsere Ingenieure die Testspezifikation und Prüfadapter gleich mit.',
    answerEN: 'Yes, CME offers end-of-line functional tests for 100% inspection of all series units before shipping. Depending on requirements, volume, and layout complexity, we use manual testing or bed-of-nails adapters (ICT). All test protocols and results are archived for complete quality documentation. For development projects running at CME, our engineers develop the test specification and test adapters alongside.',
  },
  {
    questionDE: 'Was ist ein DFM-Review und warum bietet CME das an?',
    questionEN: 'What is a DFM review and why does CME offer it?',
    answerDE: 'DFM steht für Design for Manufacturing – die fertigungsgerechte Gestaltung einer Elektronik. CME prüft Ihr Layout bereits in der Entwicklungsphase auf Fertigbarkeit: Sind die Pads korrekt dimensioniert? Gibt es kritische Abstände? Sind die Bauteile maschinell bestückbar? Durch die direkte Rückkopplung zwischen Entwicklung und Fertigung am gleichen Standort reduzieren wir Iterationsschleifen, Kosten und Time-to-Market. Ein DFM-Review ist bei CME Standard – nicht Aufpreis.',
    answerEN: 'DFM stands for Design for Manufacturing – designing electronics for manufacturability. CME checks your layout for manufacturability already in the development phase: Are pads correctly dimensioned? Are there critical clearances? Are components machine-placeable? Through direct feedback between development and manufacturing at the same location, we reduce iteration loops, costs, and time-to-market. A DFM review is standard at CME – not an extra charge.',
  },
];

const faqCluster3 = [
  {
    questionDE: 'Übernimmt CME auch die Bauteilbeschaffung?',
    questionEN: 'Does CME also handle component procurement?',
    answerDE: 'Ja, CME übernimmt die komplette Bauteilbeschaffung auf Wunsch. Wir arbeiten mit bewährten Distributoren und haben langjährige Lieferantenbeziehungen, die auch in angespannten Marktlagen kurze Beschaffungszeiten ermöglichen. Alternativ können Sie Bauteile auch beigestellt liefern. Bei Bauteilabkündigungen (Obsoleszenz) unterstützen wir proaktiv bei der Suche nach Alternativtypen und bewerten deren Auswirkungen auf die Fertigung.',
    answerEN: 'Yes, CME handles complete component procurement on request. We work with established distributors and have long-standing supplier relationships that enable short procurement times even in tight market conditions. Alternatively, you can also supply components yourself. In case of component obsolescence, we proactively support the search for alternative types and assess their impact on manufacturing.',
  },
  {
    questionDE: 'Bietet CME auch Kabelkonfektionierung und Endmontage an?',
    questionEN: 'Does CME also offer cable assembly and final assembly?',
    answerDE: 'Ja, CME bietet neben der Leiterplattenbestückung auch kundenspezifische Kabelkonfektionierung und komplette Endmontage an. Wir fertigen Kabelbäume nach Schaltplan mit allen gängigen Steckersystemen (TE, Molex, JST, Deutsch u. a.) und führen 100 %-elektrische Prüfung auf Durchgang, Isolation und korrekte Pinbelegung durch. Die Endmontage umfasst Gehäusemontage, Verschraubung, Beschriftung und Verpackung – alles aus einer Hand.',
    answerEN: 'Yes, in addition to PCB assembly, CME also offers custom cable assembly and complete final assembly. We manufacture wire harnesses per schematic with all common connector systems (TE, Molex, JST, Deutsch, etc.) and perform 100% electrical testing for continuity, insulation, and correct pin assignment. Final assembly includes housing assembly, fastening, labeling, and packaging – all from a single source.',
  },
  {
    questionDE: 'Kann CME auch thermisch anspruchsvolle Baugruppen fertigen?',
    questionEN: 'Can CME also manufacture thermally demanding assemblies?',
    answerDE: 'Ja, thermisch anspruchsvolle Baugruppen sind eine Spezialität von CME. Durch die enge Verzahnung von Entwicklung und Fertigung verstehen wir die thermischen Herausforderungen von Leistungselektronik, Motorsteuerungen und Hochstromanwendungen. Wir beherrschen Dampfphasenlöten für besonders gleichmäßige und voidarme Lötverbindungen, Verguss mit thermisch leitfähigen Materialien und die Verarbeitung von Bauteilen mit hohen Verlustleistungen (SiC, GaN, IGBT).',
    answerEN: 'Yes, thermally demanding assemblies are a specialty of CME. Through the close integration of development and manufacturing, we understand the thermal challenges of power electronics, motor controllers, and high-current applications. We master vapor phase soldering for particularly uniform and void-free solder joints, potting with thermally conductive materials, and processing of components with high power dissipation (SiC, GaN, IGBT).',
  },
  {
    questionDE: 'Wie geht CME mit Bauteilabkündigungen (Obsoleszenz) um?',
    questionEN: 'How does CME handle component obsolescence?',
    answerDE: 'CME überwacht die Verfügbarkeit der in Ihren Baugruppen verbauten Bauteile proaktiv. Bei Abkündigungen informieren wir Sie frühzeitig und schlagen Alternativtypen vor. Da Entwicklung und Fertigung unter einem Dach arbeiten, können unsere Ingenieure die Auswirkungen eines Bauteilwechsels auf Schaltung, Layout und Fertigung sofort bewerten – inklusive Simulation und Validierung. So vermeiden Sie kostspielige Produktionsunterbrechungen.',
    answerEN: 'CME proactively monitors the availability of components used in your assemblies. In case of obsolescence, we inform you early and suggest alternative types. Since development and manufacturing work under one roof, our engineers can immediately assess the impact of a component change on circuit, layout, and manufacturing – including simulation and validation. This helps you avoid costly production interruptions.',
  },
  {
    questionDE: 'Wo befindet sich die CME-Fertigung und welche Vorteile hat der Standort Deutschland?',
    questionEN: 'Where is CME manufacturing located and what are the advantages of the Germany location?',
    answerDE: 'Die gesamte Fertigung befindet sich am CME-Standort in Dortmund, Deutschland. Ein deutscher Fertigungsstandort bietet entscheidende Vorteile: kurze Kommunikationswege ohne Sprachbarrieren, Schutz Ihres geistigen Eigentums nach deutschem und EU-Recht, keine Zollproblematik innerhalb der EU, schnelle Reaktionszeiten bei Änderungen und die Möglichkeit, Entwicklung und Fertigung an einem Standort zu bündeln. Made in Germany ist für viele Branchen ein Qualitätsmerkmal.',
    answerEN: 'All manufacturing is located at the CME site in Dortmund, Germany. A German manufacturing location offers decisive advantages: short communication paths without language barriers, protection of your intellectual property under German and EU law, no customs issues within the EU, fast response times for changes, and the ability to combine development and manufacturing at one location. Made in Germany is a quality mark for many industries.',
  },
];

/* All 16 FAQs combined for JSON-LD schema */
const allFaqItems = [...faqCluster1, ...faqCluster2, ...faqCluster3];

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';
const HERO_VIDEO = {
  webm: `${CDN}/leiterplatten-hero_9526f6fb.webm`,
  mp4: `${CDN}/leiterplatten-hero_f10b49bd.mp4`,
  poster: `${CDN}/leiterplatten-hero-poster_168ab542.jpg`,
};

const subpages = [
  {
    icon: Cpu,
    titleDE: 'SMD-Bestückung',
    titleEN: 'SMD Assembly',
    descDE: 'Hochpräzise SMD-Bestückung aller Baugrößen – vom 01005 bis zum BGA. Ihr Elektronik Bestücker in Deutschland.',
    descEN: 'High-precision SMD assembly of all package sizes – from 01005 to BGA. Your electronics manufacturer in Germany.',
    href: '/fertigung/smd-bestueckung',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1148__1920px_1cc154ec.jpg',
  },
  {
    icon: Timer,
    titleDE: 'Prototypenfertigung',
    titleEN: 'Prototype Manufacturing',
    descDE: 'Express-Prototypen ab Einzelstück mit serienidentischem Prozess. Schnelle Turnarounds, valide Ergebnisse.',
    descEN: 'Express prototypes from single units with series-identical process. Fast turnarounds, valid results.',
    href: '/fertigung/prototypen',
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1736__1920px_e713f7ca.jpg',
  },
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
      'Manuelle Prüfung oder Nadelbett-Adapter je nach Anforderung, Stückzahl und Layoutkomplexität',
      'Prüfprotokolle und Testergebnisse für lückenlose Qualitätsdokumentation',
    ],
    bulletsEN: [
      'End-of-line functional test for 100\u00a0% inspection of all series units before shipping',
      'Manual testing or bed-of-nails adapter depending on requirements, volume and layout complexity',
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

/* ── FAQ Accordion Item (animated) ── */
function FaqItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between py-5 px-1 text-left group hover:text-[#0080C8] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="fluid-body font-semibold text-cme-dark group-hover:text-[#0080C8] transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          className={`shrink-0 mt-1 text-[#0080C8] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="fluid-body text-gray-600 leading-relaxed pb-5 px-1">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── FAQ Cluster Component ── */
function FaqCluster({ title, items, isDE, openFaq, onToggle, indexOffset }: {
  title: string;
  items: typeof faqCluster1;
  isDE: boolean;
  openFaq: number | null;
  onToggle: (index: number) => void;
  indexOffset: number;
}) {
  return (
    <div style={{ marginBottom: 'var(--space-gap-lg)' }}>
      <h3 className="fluid-h4 text-cme-dark font-bold" style={{ marginBottom: 'var(--space-gap-sm)' }}>
        {title}
      </h3>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{ padding: 'var(--space-gap-sm) var(--space-gap-md)' }}>
        {items.map((item, i) => (
          <FaqItem
            key={indexOffset + i}
            question={isDE ? item.questionDE : item.questionEN}
            answer={isDE ? item.answerDE : item.answerEN}
            isOpen={openFaq === indexOffset + i}
            onToggle={() => onToggle(indexOffset + i)}
          />
        ))}
      </div>
    </div>
  );
}

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

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  /* JSON-LD FAQ Schema – all 16 FAQs */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqItems.map((item) => ({
      '@type': 'Question',
      name: isDE ? item.questionDE : item.questionEN,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isDE ? item.answerDE : item.answerEN,
      },
    })),
  };

  return (
    <Layout>
      <SEO
        titleDE='Elektronikfertigung & SMD-Bestückung Deutschland | EMS-Dienstleister CME'
        titleEN='Electronics Manufacturing & SMD Assembly Germany | EMS Provider CME'
        descriptionDE='Ihr Elektronik Bestücker in Deutschland: Professionelle EMS-Fertigung in Dortmund – SMD-Bestückung, Baugruppenfertigung und Qualitätsmanagement nach IPC. Vom Prototyp bis zur Großserie.'
        descriptionEN='Your electronics manufacturer in Germany: Professional EMS manufacturing in Dortmund – SMD assembly, module production and quality management to IPC standards. From prototype to high-volume series.'
        keywordsDE='Elektronik Bestücker Deutschland, EMS-Dienstleister, Elektronikfertigung, SMD-Bestückung NRW, Leiterplattenbestückung, Baugruppenfertigung, Prototypen, Serienfertigung, AOI, IPC'
        keywordsEN='EMS manufacturing, electronics manufacturing, SMD assembly, THT assembly, PCB assembly, module manufacturing, prototyping, series production, AOI, IPC'
        path='/fertigung'
        enPath='/en/manufacturing'
        breadcrumbs={[{name:'Home',url:'/'},{name:'Elektronikfertigung',url:'/fertigung'}]}
        additionalSchemas={[faqSchema]}
      />
      <SubPageHero
        tagline={cms('hero.tagline') || (isDE ? 'Elektronikfertigung (EMS)' : 'Electronics Manufacturing (EMS)')}
        headline={cms('hero.headline') || (isDE ? 'Vom Prototyp zur Serie. Made in Dortmund.' : 'From prototype to series. Made in Dortmund.')}
        description={cms('hero.description') || (isDE
          ? 'ISO-zertifizierte Elektronikfertigung mit eigener SMD- und THT-Linie. Prototypen, Kleinserien und Serienproduktion – alles aus einer Hand.'
          : 'ISO-certified electronics manufacturing with own SMD and THT lines. Prototypes, small series and series production – all from a single source.')}
        cta={{ label: isDE ? 'EMS-Angebot anfragen' : 'Request EMS Quote', href: '/kontakt' }}
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
                        <h3 className="fluid-h4 text-cme-dark" lang={isDE ? 'de' : 'en'}>
                          {isDE ? page.titleDE : page.titleEN}
                        </h3>
                      </div>
                      <p className="text-gray-600 fluid-small leading-relaxed">
                        {isDE ? page.descDE : page.descEN}
                      </p>
                      <div className="flex items-center text-cme-blue font-semibold fluid-small group-hover:gap-3 transition-all" style={{ gap: 'var(--space-gap-xs)', marginTop: 'var(--space-gap-xs)' }}>
                        {isDE ? `${page.titleDE} entdecken` : `Explore ${page.titleEN}`}
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

      {/* ══════════════════════════════════════════════════════════════
         FAQ Section – 16 FAQs in 3 Clustern
         ══════════════════════════════════════════════════════════════ */}
      <section className="section-pad">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ maxWidth: 'min(80%, 72rem)' }}>
          <h2 className="fluid-h2 text-cme-dark text-center" style={{ marginBottom: 'var(--space-section-header)' }}>
            {isDE ? 'Häufige Fragen zur Elektronikfertigung' : 'Frequently Asked Questions About Electronics Manufacturing'}
          </h2>

          {/* Cluster 1: Prozess & Kapazität */}
          <FaqCluster
            title={isDE ? 'Prozess & Kapazität' : 'Process & Capacity'}
            items={faqCluster1}
            isDE={isDE}
            openFaq={openFaq}
            onToggle={toggleFaq}
            indexOffset={0}
          />

          {/* Cluster 2: Technologie & Qualität */}
          <FaqCluster
            title={isDE ? 'Technologie & Qualität' : 'Technology & Quality'}
            items={faqCluster2}
            isDE={isDE}
            openFaq={openFaq}
            onToggle={toggleFaq}
            indexOffset={faqCluster1.length}
          />

          {/* Cluster 3: Zusammenarbeit & Konditionen */}
          <FaqCluster
            title={isDE ? 'Zusammenarbeit & Konditionen' : 'Collaboration & Terms'}
            items={faqCluster3}
            isDE={isDE}
            openFaq={openFaq}
            onToggle={toggleFaq}
            indexOffset={faqCluster1.length + faqCluster2.length}
          />
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
