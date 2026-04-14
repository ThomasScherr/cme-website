import SubPageTemplate from '@/components/SubPageTemplate';
import {
  Droplets,
  Shield,
  Cable,
  Box,
  ArrowDownToLine,
  ThermometerSun,
  ScanBarcode,
  Package,
  FileText,
} from 'lucide-react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

export default function Baugruppen() {
  return (
    <SubPageTemplate
      pageKey="fertigung.baugruppen"
      parentHref="/fertigung"
      parentLabelDE="Elektronikfertigung"
      parentLabelEN="Electronics Manufacturing"
      titleDE="Baugruppen fertigen"
      titleEN="Module Assembly"
      subtitleDE="Komplette Baugruppenmontage inkl. Verguss, Schutzlackierung, Kabelkonfektionierung und Endmontage."
      subtitleEN="Complete module assembly including potting, conformal coating, cable assembly and final assembly."
      heroImg={`${CDN}/baugruppen-hero_b99b1505.webp`}
      introDE="Elektronik ist mehr als eine bestückte Leiterplatte. CME bietet die komplette Baugruppenfertigung aus einer Hand – von der bestückten PCB über Verguss und Schutzlackierung bis zur Endmontage im Gehäuse. Unsere Mitarbeiter sind in der Verarbeitung anspruchsvoller Materialien und Prozesse geschult, insbesondere für Leistungselektronik und thermisch belastete Baugruppen."
      introEN="Electronics is more than a populated PCB. CME offers complete module assembly from a single source – from populated PCB through potting and conformal coating to final assembly in the housing. Our staff is trained in processing demanding materials and processes, especially for power electronics and thermally stressed assemblies."
      ctaDE="Angebot anfragen"
      ctaEN="Request Quote"
      features={[
        {
          de: 'Verguss (PU, Epoxid, Silikon)', en: 'Potting (PU, Epoxy, Silicone)', icon: Droplets,
          bulletsDE: [
            'Schutz sensibler Baugruppen vor Feuchtigkeit, Vibration, chemischen Einflüssen und mechanischer Belastung',
            'Auswahl des Vergussmaterials nach thermischen, dielektrischen und applikationsspezifischen Anforderungen',
            'PU für flexible Anwendungen, Epoxid für maximale Härte und Chemikalienresistenz, Silikon für Hochtemperaturbereiche',
            'Prozesssichere Verarbeitung mit definierten Aushärteparametern und Sichtprüfung nach IPC-Standards',
          ],
          bulletsEN: [
            'Protection of sensitive assemblies against moisture, vibration, chemical influences and mechanical stress',
            'Potting material selection based on thermal, dielectric and application-specific requirements',
            'PU for flexible applications, epoxy for maximum hardness and chemical resistance, silicone for high-temperature ranges',
            'Process-safe processing with defined curing parameters and visual inspection per IPC standards',
          ],
        },
        {
          de: 'Schutzlackierung (Conformal Coating)', en: 'Conformal Coating', icon: Shield,
          bulletsDE: [
            'Selektive oder vollflächige Beschichtung zum Schutz vor Korrosion, Feuchtigkeit, Staub und kriechenden Strömen',
            'Materialauswahl nach Anforderung: Acryl, Polyurethan, Epoxid, Silikon oder UV-härtende Lacke',
            'Applikation per Sprühen, Fluten, Tauchen oder selektivem Auftrag – je nach Baugruppe und Schutzklasse',
            'UV-Fluoreszenzprüfung zur 100\u00a0%-Kontrolle der Beschichtung auf Vollständigkeit und Gleichmäßigkeit',
          ],
          bulletsEN: [
            'Selective or full-area coating for protection against corrosion, moisture, dust and creepage currents',
            'Material selection by requirement: acrylic, polyurethane, epoxy, silicone or UV-curing coatings',
            'Application by spraying, flooding, dipping or selective dispensing – depending on assembly and protection class',
            'UV fluorescence inspection for 100\u00a0% coating coverage and uniformity verification',
          ],
        },
        {
          de: 'Kabelkonfektionierung & Kabelbäume', en: 'Cable Assembly & Wire Harnesses', icon: Cable,
          bulletsDE: [
            'Fertigung kundenspezifischer Kabel und Kabelbäume nach Schaltplan oder Muster – Einzel- bis Serienproduktion',
            'Crimpen, Löten, Pressen und Konfektionierung aller gängigen Steckersysteme (TE, Molex, JST, Deutsch u.\u00a0v.\u00a0m.)',
            'Elektrische Prüfung jedes Kabelbaums auf Durchgang, Isolation und korrekte Pinbelegung',
            'Kennzeichnung nach Kundenvorgabe – Aderendhülsen, Schrumpfschlauch, Kabelbinder und Zugentlastung',
          ],
          bulletsEN: [
            'Custom cable and wire harness manufacturing per schematic or sample – single unit to series production',
            'Crimping, soldering, pressing and assembly of all common connector systems (TE, Molex, JST, Deutsch and more)',
            'Electrical testing of every wire harness for continuity, insulation and correct pin assignment',
            'Labeling per customer specification – ferrules, heat shrink, cable ties and strain relief',
          ],
        },
        {
          de: 'Gehäusemontage & Endmontage', en: 'Housing Assembly & Final Assembly', icon: Box,
          bulletsDE: [
            'Komplettmontage von Elektronikbaugruppen in Kundengehäuse – von der Leiterplatte bis zum versandfertigen Gerät',
            'Mechanische Bearbeitung, Verschrauben, Kleben, Vergießen und Abdichten innerhalb einer Fertigungslinie',
            'Montageanweisungen nach kundenspezifischen Vorgaben – reproduzierbar und dokumentiert',
            'Funktionstest der fertigen Einheit vor Versand – optional mit Kundenabnahmeprotokoll',
          ],
          bulletsEN: [
            'Complete assembly of electronic modules into customer housings – from PCB to ready-to-ship device',
            'Mechanical processing, screwing, bonding, potting and sealing within a single production line',
            'Assembly instructions per customer specifications – reproducible and documented',
            'Functional test of the finished unit before shipping – optionally with customer acceptance protocol',
          ],
        },
        {
          de: 'Pressfit-Technologie', en: 'Press-Fit Technology', icon: ArrowDownToLine,
          bulletsDE: [
            'Lötfreie, gasdichte Einpresskontakte für höchste Zuverlässigkeit in Vibrationsumgebungen und bei Temperaturschwankungen',
            'Geeignet für Steckverbinder, Leistungsklemmen und Busverbindungen mit hohen Stromtragfähigkeiten',
            'Kontrollierter Einpressprozess mit definierter Einpresskraft und 100\u00a0%-Überprüfung auf korrekte Einpresstiefe',
            'Besonders geeignet für Automotive- und Industrieanwendungen mit Anforderungen an langzeitstabile elektrische Verbindungen',
          ],
          bulletsEN: [
            'Solder-free, gas-tight press-fit contacts for highest reliability in vibration environments and temperature fluctuations',
            'Suitable for connectors, power terminals and bus connections with high current-carrying capacities',
            'Controlled press-in process with defined press-in force and 100\u00a0% verification of correct press-in depth',
            'Particularly suitable for automotive and industrial applications requiring long-term stable electrical connections',
          ],
        },
        {
          de: 'Wärmeleitpaste & Thermal Interface Materials', en: 'Thermal Paste & Thermal Interface Materials', icon: ThermometerSun,
          bulletsDE: [
            'Professioneller Auftrag von Wärmeleitpasten, Pads und Phasenübergangsmaterialien auf Leistungsbauteile und Kühlkörper',
            'Materialauswahl nach Wärmeleitfähigkeit, Druckverhalten, Langzeitstabilität und Verarbeitbarkeit',
            'Definierte Schichtdicke für reproduzierbaren Wärmewiderstand – kritisch für Lebensdauer und thermische Performance',
            'Dokumentierter Prozess als Grundlage für thermische Simulation und Zulassungsunterlagen',
          ],
          bulletsEN: [
            'Professional application of thermal pastes, pads and phase-change materials on power components and heat sinks',
            'Material selection based on thermal conductivity, compression behavior, long-term stability and processability',
            'Defined layer thickness for reproducible thermal resistance – critical for lifetime and thermal performance',
            'Documented process as basis for thermal simulation and certification documentation',
          ],
        },
        {
          de: 'Laserbeschriftung & Kennzeichnung', en: 'Laser Marking & Labeling', icon: ScanBarcode,
          bulletsDE: [
            'Permanente, fälschungssichere Beschriftung von Baugruppen, Gehäusen und Einzelteilen per Lasermarkierung',
            'Seriennummern, QR-Codes, Datamatrix, Logos und Klartext – lesbar für Mensch und Maschine',
            'Rückverfolgbarkeit vom Einzelteil bis zur Charge – direkte Anbindung an Fertigungsdatenbank möglich',
            'Keine Tinte, kein Verschleiß, keine Lösungsmittel – beständig gegen Reinigungsmittel, Öle und UV-Strahlung',
          ],
          bulletsEN: [
            'Permanent, tamper-proof marking of assemblies, housings and individual parts via laser marking',
            'Serial numbers, QR codes, data matrix, logos and plain text – readable by humans and machines',
            'Traceability from individual part to batch – direct connection to manufacturing database possible',
            'No ink, no wear, no solvents – resistant to cleaning agents, oils and UV radiation',
          ],
        },
        {
          de: 'Verpackung & Versandlogistik', en: 'Packaging & Shipping Logistics', icon: Package,
          bulletsDE: [
            'ESD-gerechte Verpackung sensibler Elektronikbaugruppen nach ANSI/ESD S20.20 und kundenspezifischen Vorgaben',
            'Individuelle Verpackungskonzepte: Blister, Schaumstoffinlay, Karton, Gitterboxen – je nach Stückzahl und Empfindlichkeit',
            'Etikettierung, Lieferscheindokumentation und Versandvorbereitung als integrierter Fertigungsabschluss',
            'Direktlieferung an Endkunden oder Lageranbindung – nahtlos in Ihre Logistikkette integrierbar',
          ],
          bulletsEN: [
            'ESD-compliant packaging of sensitive electronic assemblies per ANSI/ESD S20.20 and customer specifications',
            'Individual packaging concepts: blister, foam inlay, cardboard, mesh boxes – depending on quantity and sensitivity',
            'Labeling, delivery note documentation and shipping preparation as integrated production completion',
            'Direct delivery to end customers or warehouse integration – seamlessly integrated into your logistics chain',
          ],
        },
        {
          de: 'Arbeitsplatzspezifische Montageanleitungen', en: 'Workstation-Specific Assembly Instructions', icon: FileText,
          bulletsDE: [
            'Erstellung visueller, Schritt-für-Schritt-Montageanleitungen für jeden Fertigungsarbeitsplatz – klar, eindeutig, bildgestützt',
            'Digitale oder gedruckte Bereitstellung direkt am Arbeitsplatz – mehrsprachig auf Anfrage',
            'Versionierte Dokumente mit Änderungshistorie – jede Produktrevision ist nachvollziehbar dokumentiert',
            'Grundlage für Einarbeitung neuer Mitarbeiter und Auditierbarkeit im Rahmen von ISO 9001 und Kundenaudits',
          ],
          bulletsEN: [
            'Creation of visual, step-by-step assembly instructions for each production workstation – clear, unambiguous, image-supported',
            'Digital or printed provision directly at the workstation – multilingual on request',
            'Versioned documents with change history – every product revision is traceably documented',
            'Basis for onboarding new employees and auditability within ISO 9001 and customer audits',
          ],
        },
      ]}
    />
  );
}
