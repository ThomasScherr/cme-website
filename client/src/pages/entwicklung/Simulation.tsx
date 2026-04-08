import SubPageTemplate from '@/components/SubPageTemplate';

export default function Simulation() {
  return (
    <SubPageTemplate
      parentHref="/entwicklung"
      parentLabelDE="Elektronikentwicklung"
      parentLabelEN="Electronics Development"
      titleDE="Simulation"
      titleEN="Simulation"
      subtitleDE="Thermische, elektrische und mechatronische Simulation – wir validieren Ihr Design vor dem ersten Prototypen."
      subtitleEN="Thermal, electrical and mechatronic simulation – we validate your design before the first prototype."
      heroImg="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/thermosimulation-1500x1000-1_77e2afd4.jpg"
      introDE="Simulation ist bei CME kein nachgelagerter Prüfschritt, sondern integraler Bestandteil der Entwicklung. Wir simulieren thermische Belastungen, elektrische Felder und mechatronische Systeme bereits in der Konzeptphase. So identifizieren wir Schwachstellen frühzeitig und optimieren das Design iterativ – bevor der erste Prototyp gefertigt wird. Das spart Iterationsschleifen, senkt Kosten und beschleunigt die Time-to-Market."
      introEN="Simulation at CME is not a downstream verification step, but an integral part of development. We simulate thermal loads, electrical fields and mechatronic systems already in the concept phase. This allows us to identify weaknesses early and optimize the design iteratively – before the first prototype is manufactured. This saves iteration loops, reduces costs and accelerates time-to-market."
      features={[
        { de: 'Thermische Simulation (CFD, FEM)', en: 'Thermal Simulation (CFD, FEM)' },
        { de: 'Elektrische Feldsimulation', en: 'Electrical Field Simulation' },
        { de: 'Signalintegrität (SI) & Power Integrity (PI)', en: 'Signal Integrity (SI) & Power Integrity (PI)' },
        { de: 'EMV-Vorabsimulation', en: 'EMC Pre-Simulation' },
        { de: 'Mechatronische Systemsimulation', en: 'Mechatronic System Simulation' },
        { de: 'Thermisches Management & Entwärmungskonzepte', en: 'Thermal Management & Cooling Concepts' },
        { de: 'Strömungssimulation für Kühlkörper', en: 'Flow Simulation for Heat Sinks' },
        { de: 'Zuverlässigkeitssimulation', en: 'Reliability Simulation' },
        { de: 'Design-Optimierung durch Simulationsergebnisse', en: 'Design Optimization through Simulation Results' },
      ]}
      relatedPages={[
        { href: '/entwicklung/hardware-software', titleDE: 'Hardware & Software', titleEN: 'Hardware & Software', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2392__1920px_af02a6b7.jpg' },
        { href: '/entwicklung/test-verifikation', titleDE: 'Test & Verifikation', titleEN: 'Test & Verification', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2885__1920px_ecd3ed1e.jpg' },
      ]}
    />
  );
}
