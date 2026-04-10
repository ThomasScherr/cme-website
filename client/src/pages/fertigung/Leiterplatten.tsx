import SubPageTemplate from '@/components/SubPageTemplate';
import {
  Cpu,
  CircuitBoard,
  Flame,
  ThermometerSun,
  Zap,
  Layers,
  Timer,
  SlidersHorizontal,
  Rocket,
} from 'lucide-react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

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
      heroImg={`${CDN}/pick-and-place_4f13096b.png`}
      introDE="Die Leiterplattenbestückung ist das Herzstück unserer EMS-Fertigung. Mit modernsten SMD-Bestückungsautomaten und THT-Lötanlagen fertigen wir Ihre Elektronik in höchster Qualität. Ob einzelne Prototypen für die Entwicklungsvalidierung oder Serienproduktion mit mehreren tausend Stück pro Monat – unsere Fertigungslinien sind flexibel konfigurierbar und auf schnelle Rüstwechsel optimiert."
      introEN="PCB assembly is the heart of our EMS manufacturing. With state-of-the-art SMD placement machines and THT soldering systems, we manufacture your electronics in the highest quality. Whether individual prototypes for development validation or series production with several thousand units per month – our production lines are flexibly configurable and optimized for quick changeovers."
      ctaDE="Angebot anfragen"
      ctaEN="Request Quote"
      features={[
        { de: 'SMD-Bestückung', en: 'SMD Assembly', icon: Cpu },
        { de: 'THT-Bestückung & Wellenlöten', en: 'THT Assembly & Wave Soldering', icon: CircuitBoard },
        { de: 'Selektivlöten für Mixed-Technology', en: 'Selective Soldering for Mixed Technology', icon: Flame },
        { de: 'Reflow-Löten (bleihaltig & bleifrei)', en: 'Reflow Soldering (leaded & lead-free)', icon: ThermometerSun },
        { de: 'Dampfphasenlöten für Leistungselektronik', en: 'Vapor Phase Soldering for Power Electronics', icon: Zap },
        { de: 'Pastendruck mit SPI-Kontrolle', en: 'Paste Printing with SPI Control', icon: Layers },
        { de: 'Schnelle Prototypenfertigung', en: 'Fast Prototype Production', icon: Timer },
        { de: 'Flexible Losgrößen', en: 'Flexible Lot Sizes', icon: SlidersHorizontal },
        { de: 'NPI-Prozess (New Product Introduction)', en: 'NPI Process (New Product Introduction)', icon: Rocket },
      ]}
    />
  );
}
