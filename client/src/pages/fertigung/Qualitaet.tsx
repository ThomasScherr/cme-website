import SubPageTemplate from '@/components/SubPageTemplate';
import {
  ShieldCheck,
  Leaf,
  ScanEye,
  Printer,
  CircuitBoard,
  Database,
  PackageCheck,
  Award,
  Cable,
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
      heroImg={`${CDN}/microscope-inspection_a3967815.png`}
      introDE="Qualität ist bei CME kein nachgelagerter Prüfschritt, sondern integraler Bestandteil jedes Fertigungsprozesses. Unser Qualitätsmanagementsystem ist nach ISO 9001 und ISO 14001 zertifiziert. Jede Baugruppe durchläuft automatisierte optische Inspektion (AOI). Unsere datenbankgestützte Traceability mit vernetzten Fertigungsgeräten gewährleistet maximale Rückverfolgbarkeit – vom Wareneingang über jeden Fertigungsschritt bis zum Versand."
      introEN="Quality at CME is not a downstream inspection step, but an integral part of every manufacturing process. Our quality management system is ISO 9001 and ISO 14001 certified. Every assembly undergoes automated optical inspection (AOI). Our database-driven traceability with connected manufacturing equipment ensures maximum traceability – from incoming goods through every production step to shipping."
      ctaDE="Angebot anfragen"
      ctaEN="Request Quote"
      features={[
        { de: 'ISO 9001:2015 zertifiziert', en: 'ISO 9001:2015 Certified', icon: ShieldCheck },
        { de: 'ISO 14001:2015 zertifiziert', en: 'ISO 14001:2015 Certified', icon: Leaf },
        { de: 'UL-gelistet – Wiring Harness', en: 'UL Listed – Wiring Harness', icon: Cable },
        { de: 'Automatische Optische Inspektion (AOI)', en: 'Automated Optical Inspection (AOI)', icon: ScanEye },
        { de: 'Solder Paste Inspection (SPI)', en: 'Solder Paste Inspection (SPI)', icon: Printer },
        { de: 'In-Circuit-Test (ICT)', en: 'In-Circuit Test (ICT)', icon: CircuitBoard },
        { de: 'Datenbankgestützte Traceability mit vernetzten Geräten', en: 'Database-Driven Traceability with Connected Equipment', icon: Database },
        { de: 'Wareneingangskontrolle & IPC-Prüfung', en: 'Incoming Goods Inspection & IPC Testing', icon: PackageCheck },
        { de: 'Qualitätsprüfung nach IPC-Standards', en: 'Quality Inspection per IPC Standards', icon: Award },
      ]}
    />
  );
}
