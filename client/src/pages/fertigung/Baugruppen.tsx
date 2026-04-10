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
      parentHref="/fertigung"
      parentLabelDE="Elektronikfertigung"
      parentLabelEN="Electronics Manufacturing"
      titleDE="Baugruppen fertigen"
      titleEN="Module Assembly"
      subtitleDE="Komplette Baugruppenmontage inkl. Verguss, Schutzlackierung, Kabelkonfektionierung und Endmontage."
      subtitleEN="Complete module assembly including potting, conformal coating, cable assembly and final assembly."
      heroImg={`${CDN}/dental-system-complete_8d86b9f8.png`}
      introDE="Elektronik ist mehr als eine bestückte Leiterplatte. CME bietet die komplette Baugruppenfertigung aus einer Hand – von der bestückten PCB über Verguss und Schutzlackierung bis zur Endmontage im Gehäuse. Unsere Mitarbeiter sind in der Verarbeitung anspruchsvoller Materialien und Prozesse geschult, insbesondere für Leistungselektronik und thermisch belastete Baugruppen."
      introEN="Electronics is more than a populated PCB. CME offers complete module assembly from a single source – from populated PCB through potting and conformal coating to final assembly in the housing. Our staff is trained in processing demanding materials and processes, especially for power electronics and thermally stressed assemblies."
      ctaDE="Angebot anfragen"
      ctaEN="Request Quote"
      features={[
        { de: 'Verguss (PU, Epoxid, Silikon)', en: 'Potting (PU, Epoxy, Silicone)', icon: Droplets },
        { de: 'Schutzlackierung (Conformal Coating)', en: 'Conformal Coating', icon: Shield },
        { de: 'Kabelkonfektionierung & Kabelbäume', en: 'Cable Assembly & Wire Harnesses', icon: Cable },
        { de: 'Gehäusemontage & Endmontage', en: 'Housing Assembly & Final Assembly', icon: Box },
        { de: 'Pressfit-Technologie', en: 'Press-Fit Technology', icon: ArrowDownToLine },
        { de: 'Wärmeleitpaste & Thermal Interface Materials', en: 'Thermal Paste & Thermal Interface Materials', icon: ThermometerSun },
        { de: 'Laserbeschriftung & Kennzeichnung', en: 'Laser Marking & Labeling', icon: ScanBarcode },
        { de: 'Verpackung & Versandlogistik', en: 'Packaging & Shipping Logistics', icon: Package },
        { de: 'Arbeitsplatzspezifische Montageanleitungen', en: 'Workstation-Specific Assembly Instructions', icon: FileText },
      ]}
    />
  );
}
