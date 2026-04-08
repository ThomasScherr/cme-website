import SubPageTemplate from '@/components/SubPageTemplate';

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
      heroImg="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1736__1920px_e713f7ca.jpg"
      introDE="Elektronik ist mehr als eine bestückte Leiterplatte. CME bietet die komplette Baugruppenfertigung aus einer Hand – von der bestückten PCB über Verguss und Schutzlackierung bis zur Endmontage im Gehäuse. Unsere Mitarbeiter sind in der Verarbeitung anspruchsvoller Materialien und Prozesse geschult, insbesondere für Leistungselektronik und thermisch belastete Baugruppen."
      introEN="Electronics is more than a populated PCB. CME offers complete module assembly from a single source – from populated PCB through potting and conformal coating to final assembly in the housing. Our staff is trained in processing demanding materials and processes, especially for power electronics and thermally stressed assemblies."
      ctaDE="Angebot anfragen"
      ctaEN="Request Quote"
      features={[
        { de: 'Verguss (PU, Epoxid, Silikon)', en: 'Potting (PU, Epoxy, Silicone)' },
        { de: 'Schutzlackierung (Conformal Coating)', en: 'Conformal Coating' },
        { de: 'Kabelkonfektionierung & Kabelbäume', en: 'Cable Assembly & Wire Harnesses' },
        { de: 'Gehäusemontage & Endmontage', en: 'Housing Assembly & Final Assembly' },
        { de: 'Pressfit-Technologie', en: 'Press-Fit Technology' },
        { de: 'Wärmeleitpaste & Thermal Interface Materials', en: 'Thermal Paste & Thermal Interface Materials' },
        { de: 'Laserbeschriftung & Kennzeichnung', en: 'Laser Marking & Labeling' },
        { de: 'Verpackung & Versandlogistik', en: 'Packaging & Shipping Logistics' },
        { de: 'Arbeitsplatzspezifische Montageanleitungen', en: 'Workstation-Specific Assembly Instructions' },
      ]}
      relatedPages={[
        { href: '/fertigung/leiterplatten', titleDE: 'Leiterplatten bestücken', titleEN: 'PCB Assembly', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1148__1920px_1cc154ec.jpg' },
        { href: '/fertigung/qualitaet', titleDE: 'Qualitätsmanagement', titleEN: 'Quality Management', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2055__1920px_00c91d17.jpg' },
      ]}
    />
  );
}
