import SubPageTemplate from '@/components/SubPageTemplate';
import {
  ShieldCheck,
  Leaf,
  ScanEye,
  CircuitBoard,
  Database,
  Award,
  Cable,
  ClipboardCheck,
} from 'lucide-react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

export default function Qualitaet() {
  return (
    <SubPageTemplate
      pageKey="fertigung.qualitaet"
      parentHref="/fertigung"
      parentLabelDE="Elektronikfertigung"
      parentLabelEN="Electronics Manufacturing"
      titleDE="Qualitätsmanagement"
      titleEN="Quality Management"
      subtitleDE="ISO 9001 & 14001 zertifiziert. AOI, lückenlose Rückverfolgbarkeit und datenbankgestützte Traceability."
      subtitleEN="ISO 9001 & 14001 certified. AOI, complete traceability and database-driven tracking systems."
      metaDescriptionDE="Qualitätsmanagement: ISO 9001 & 14001 zertifiziert. AOI, Röntgeninspektion, lückenlose Traceability und datenbankgestützte Rückverfolgbarkeit."
      metaDescriptionEN="Quality management: ISO 9001 & 14001 certified. AOI, X-ray inspection, complete traceability and database-driven tracking."
      heroImg={`${CDN}/microscope-inspection_a3967815.png`}
      introDE="Qualität ist bei CME kein nachgelagerter Prüfschritt, sondern integraler Bestandteil jedes Fertigungsprozesses. Unser Qualitätsmanagementsystem ist nach ISO 9001 und ISO 14001 zertifiziert. Jede Baugruppe durchläuft eine automatisierte optische Inspektion (AOI). Unsere datenbankgestützte Traceability mit vernetzten Fertigungsgeräten gewährleistet maximale Rückverfolgbarkeit – vom Wareneingang über jeden Fertigungsschritt bis zum Versand."
      introEN="Quality at CME is not a downstream inspection step, but an integral part of every manufacturing process. Our quality management system is ISO 9001 and ISO 14001 certified. Every assembly undergoes automated optical inspection (AOI). Our database-driven traceability with connected manufacturing equipment ensures maximum traceability – from incoming goods through every production step to shipping."
      ctaDE="Angebot anfragen"
      ctaEN="Request Quote"
      features={[
        {
          de: 'ISO 9001:2015 zertifiziert',
          en: 'ISO 9001:2015 Certified',
          icon: ShieldCheck,
          bulletsDE: [
            'Zertifiziertes Qualitätsmanagementsystem für alle Fertigungs- und Entwicklungsprozesse',
            'Regelmäßige interne Audits und externe Überwachungsaudits durch akkreditierte Stellen',
            'Kontinuierlicher Verbesserungsprozess (KVP) als fester Bestandteil der Unternehmenskultur',
            'Lückenlose Dokumentation aller qualitätsrelevanten Prozesse und Abweichungen',
          ],
          bulletsEN: [
            'Certified quality management system for all manufacturing and development processes',
            'Regular internal audits and external surveillance audits by accredited bodies',
            'Continuous improvement process (CIP) as integral part of company culture',
            'Complete documentation of all quality-relevant processes and deviations',
          ],
        },
        {
          de: 'ISO 14001:2015 zertifiziert',
          en: 'ISO 14001:2015 Certified',
          icon: Leaf,
          bulletsDE: [
            'Zertifiziertes Umweltmanagementsystem für nachhaltige Fertigungsprozesse',
            'Systematische Erfassung und Reduzierung von Umweltauswirkungen (Energie, Abfall, Emissionen)',
            'Einhaltung aller relevanten Umweltvorschriften und gesetzlichen Anforderungen',
            'Umweltbewusstsein als integraler Bestandteil von Beschaffung, Produktion und Logistik',
          ],
          bulletsEN: [
            'Certified environmental management system for sustainable manufacturing processes',
            'Systematic recording and reduction of environmental impacts (energy, waste, emissions)',
            'Compliance with all relevant environmental regulations and legal requirements',
            'Environmental awareness as integral part of procurement, production and logistics',
          ],
        },
        {
          de: 'UL-gelistet – Wiring Harness',
          en: 'UL Listed – Wiring Harness',
          icon: Cable,
          bulletsDE: [
            'UL-Listung für die Fertigung von Kabelbäumen und Verdrahtungssystemen',
            'Erfüllung nordamerikanischer Sicherheitsstandards für elektrische Verbindungstechnik',
            'Regelmäßige UL-Audits und Fertigungsüberwachung durch akkreditierte Prüfer',
            'Voraussetzung für den Export in den US- und kanadischen Markt',
          ],
          bulletsEN: [
            'UL listing for manufacturing of wiring harnesses and wiring systems',
            'Compliance with North American safety standards for electrical interconnect technology',
            'Regular UL audits and manufacturing surveillance by accredited inspectors',
            'Prerequisite for export to US and Canadian markets',
          ],
        },
        {
          de: 'Automatische Optische Inspektion (AOI)',
          en: 'Automated Optical Inspection (AOI)',
          icon: ScanEye,
          bulletsDE: [
            '100%-AOI-Prüfung jeder bestückten Baugruppe nach dem Lötprozess',
            'Erkennung von Bestückungsfehlern, Lötbrücken, fehlenden Bauteilen und Polaritätsfehlern',
            '3D-AOI für zuverlässige Prüfung auch bei verdeckten Lötstellen und engen Bauteiltoleranzen',
            'Automatische Fehlerdokumentation und Rückmeldung in den Fertigungsprozess',
          ],
          bulletsEN: [
            '100% AOI inspection of every assembled PCB after the soldering process',
            'Detection of placement errors, solder bridges, missing components and polarity faults',
            '3D AOI for reliable inspection even with hidden solder joints and tight component tolerances',
            'Automatic defect documentation and feedback into the manufacturing process',
          ],
        },
        {
          de: 'In-Circuit-Test (ICT)',
          en: 'In-Circuit Test (ICT)',
          icon: CircuitBoard,
          bulletsDE: [
            'Elektrische Prüfung bestückter Leiterplatten auf Kurzschlüsse, Unterbrechungen und Bauteilwerte',
            'Nadelbett-Adapter je nach Losgröße und PCB-Layout',
            'Testabdeckung >95 % durch Design-for-Test-konforme Layoutplanung',
            'Prüfprotokoll und Testergebnis für lückenlose Qualitätsdokumentation',
          ],
          bulletsEN: [
            'Electrical testing of assembled PCBs for shorts, opens and component values',
            'Bed-of-nails adapter depending on batch size and PCB layout',
            'Test coverage >95% through design-for-test compliant layout planning',
            'Test protocol and results for complete quality documentation',
          ],
        },
        {
          de: 'Datenbankgestützte Traceability mit vernetzten Geräten',
          en: 'Database-Driven Traceability with Connected Equipment',
          icon: Database,
          bulletsDE: [
            'Vollständige Rückverfolgbarkeit jeder Baugruppe vom Wareneingang bis zum Versand',
            'Vernetzung aller Fertigungsgeräte (SMD, Löten, AOI, ICT, EOL) in einer zentralen Datenbank',
            'Seriennummern-, Chargen- und Bauteil-Tracing für schnelle Reaktion bei Feldauffälligkeiten',
            'Exportfähige Prüf- und Fertigungsberichte für Kunden und Zulassungsbehörden',
          ],
          bulletsEN: [
            'Complete traceability of every assembly from incoming goods to shipping',
            'All manufacturing equipment (SMD, soldering, AOI, ICT, EOL) connected in a central database',
            'Serial number, batch and component tracing for rapid response to field issues',
            'Exportable inspection and manufacturing reports for customers and regulatory authorities',
          ],
        },
        {
          de: 'Qualitätsprüfung nach IPC-Standards',
          en: 'Quality Inspection per IPC Standards',
          icon: Award,
          bulletsDE: [
            'Visuelle und messtechnische Bewertung von Lötstellen nach IPC-A-610 (Class 2 & 3)',
            'Leiterplattenprüfung nach IPC-A-600 auf Laminate, Oberflächen und Bohrungen',
            'Anpassung der Akzeptanzkriterien an kundenspezifische Anforderungen und Zielklassen',
          ],
          bulletsEN: [
            'Visual and metrological assessment of solder joints per IPC-A-610 (Class 2 & 3)',
            'PCB inspection per IPC-A-600 for laminates, surfaces and drilling',
            'Adaptation of acceptance criteria to customer-specific requirements and target classes',
          ],
        },
        {
          de: 'Erstmusterprüfung & Serienfreigabe (EMPB)',
          en: 'First Article Inspection & Series Release (FAIR)',
          icon: ClipboardCheck,
          bulletsDE: [
            'Strukturierter Erstmusterprozess für neue Produkte vor Serienfreigabe',
            'Erstellung eines Erstmuster-Prüfberichts (EMPB) mit Maß-, Funktions- und Materialnachweis',
            'Koordination der Erstbemusterung zwischen Entwicklung, Fertigung und Qualitätssicherung',
            'Formale Serienfreigabe nach Kundenabnahme – dokumentiert und revisionssicher archiviert',
          ],
          bulletsEN: [
            'Structured first article process for new products before series release',
            'Creation of first article inspection report (FAIR) with dimensional, functional and material evidence',
            'Coordination of first article inspection between development, manufacturing and quality assurance',
            'Formal series release after customer acceptance – documented and revision-proof archived',
          ],
        },
      ]}
    />
  );
}
