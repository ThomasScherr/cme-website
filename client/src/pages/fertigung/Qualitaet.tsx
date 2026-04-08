import SubPageTemplate from '@/components/SubPageTemplate';

export default function Qualitaet() {
  return (
    <SubPageTemplate
      parentHref="/fertigung"
      parentLabelDE="Elektronikfertigung"
      parentLabelEN="Electronics Manufacturing"
      titleDE="Qualitätsmanagement"
      titleEN="Quality Management"
      subtitleDE="ISO 9001 & 14001 zertifiziert. AOI, Röntgeninspektion und lückenlose Rückverfolgbarkeit."
      subtitleEN="ISO 9001 & 14001 certified. AOI, X-ray inspection and complete traceability."
      heroImg="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2055__1920px_00c91d17.jpg"
      introDE="Qualität ist bei CME kein nachgelagerter Prüfschritt, sondern integraler Bestandteil jedes Fertigungsprozesses. Unser Qualitätsmanagementsystem ist nach ISO 9001 und ISO 14001 zertifiziert. Jede Baugruppe durchläuft automatisierte optische Inspektion (AOI), und für BGA- und QFN-Bauteile steht unsere Röntgeninspektion bereit. Lückenlose Traceability vom Wareneingang bis zum Versand ist Standard."
      introEN="Quality at CME is not a downstream inspection step, but an integral part of every manufacturing process. Our quality management system is ISO 9001 and ISO 14001 certified. Every assembly undergoes automated optical inspection (AOI), and our X-ray inspection is available for BGA and QFN components. Complete traceability from incoming goods to shipping is standard."
      ctaDE="Angebot anfragen"
      ctaEN="Request Quote"
      features={[
        { de: 'ISO 9001:2015 zertifiziert', en: 'ISO 9001:2015 Certified' },
        { de: 'ISO 14001:2015 zertifiziert', en: 'ISO 14001:2015 Certified' },
        { de: 'Automatische Optische Inspektion (AOI)', en: 'Automated Optical Inspection (AOI)' },
        { de: 'Röntgeninspektion (BGA, QFN)', en: 'X-Ray Inspection (BGA, QFN)' },
        { de: 'Solder Paste Inspection (SPI)', en: 'Solder Paste Inspection (SPI)' },
        { de: 'In-Circuit-Test (ICT)', en: 'In-Circuit Test (ICT)' },
        { de: 'Lückenlose Traceability & MES', en: 'Complete Traceability & MES' },
        { de: 'Wareneingangskontrolle & IPC-Prüfung', en: 'Incoming Goods Inspection & IPC Testing' },
        { de: 'IPC-A-610 Class 2 & 3', en: 'IPC-A-610 Class 2 & 3' },
      ]}
      relatedPages={[
        { href: '/fertigung/leiterplatten', titleDE: 'Leiterplatten bestücken', titleEN: 'PCB Assembly', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1148__1920px_1cc154ec.jpg' },
        { href: '/fertigung/baugruppen', titleDE: 'Baugruppen fertigen', titleEN: 'Module Assembly', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1736__1920px_e713f7ca.jpg' },
      ]}
    />
  );
}
