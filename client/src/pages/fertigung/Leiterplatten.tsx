import SubPageTemplate from '@/components/SubPageTemplate';

export default function Leiterplatten() {
  return (
    <SubPageTemplate
      parentHref="/fertigung"
      parentLabelDE="Elektronikfertigung"
      parentLabelEN="Electronics Manufacturing"
      titleDE="Leiterplatten bestücken"
      titleEN="PCB Assembly"
      subtitleDE="SMD- und THT-Bestückung auf modernsten Fertigungslinien – vom Prototyp bis zur Großserie."
      subtitleEN="SMD and THT assembly on state-of-the-art production lines – from prototype to high-volume series."
      heroImg="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1148__1920px_1cc154ec.jpg"
      introDE="Die Leiterplattenbestückung ist das Herzstück unserer EMS-Fertigung. Mit modernsten SMD-Bestückungsautomaten und THT-Lötanlagen fertigen wir Ihre Elektronik in höchster Qualität. Ob einzelne Prototypen für die Entwicklungsvalidierung oder Serienproduktion mit mehreren tausend Stück pro Monat – unsere Fertigungslinien sind flexibel konfigurierbar und auf schnelle Rüstwechsel optimiert."
      introEN="PCB assembly is the heart of our EMS manufacturing. With state-of-the-art SMD placement machines and THT soldering systems, we manufacture your electronics in the highest quality. Whether individual prototypes for development validation or series production with several thousand units per month – our production lines are flexibly configurable and optimized for quick changeovers."
      ctaDE="Angebot anfragen"
      ctaEN="Request Quote"
      features={[
        { de: 'SMD-Bestückung bis Baugröße 01005', en: 'SMD Assembly down to 01005 package size' },
        { de: 'THT-Bestückung & Wellenlöten', en: 'THT Assembly & Wave Soldering' },
        { de: 'Selektivlöten für Mixed-Technology', en: 'Selective Soldering for Mixed Technology' },
        { de: 'Reflow-Löten (bleihaltig & bleifrei)', en: 'Reflow Soldering (leaded & lead-free)' },
        { de: 'Dampfphasenlöten für Leistungselektronik', en: 'Vapor Phase Soldering for Power Electronics' },
        { de: 'Pastendruck mit SPI-Kontrolle', en: 'Paste Printing with SPI Control' },
        { de: 'Prototypen in 24-48h', en: 'Prototypes in 24-48h' },
        { de: 'Flexible Losgrößen (1 bis 10.000+)', en: 'Flexible Lot Sizes (1 to 10,000+)' },
        { de: 'NPI-Prozess (New Product Introduction)', en: 'NPI Process (New Product Introduction)' },
      ]}
      relatedPages={[
        { href: '/fertigung/baugruppen', titleDE: 'Baugruppen fertigen', titleEN: 'Module Assembly', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1736__1920px_e713f7ca.jpg' },
        { href: '/fertigung/qualitaet', titleDE: 'Qualitätsmanagement', titleEN: 'Quality Management', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2055__1920px_00c91d17.jpg' },
      ]}
    />
  );
}
