import SubPageTemplate from '@/components/SubPageTemplate';
import {
  Cog,
  Target,
  Thermometer,
  Layers,
  BarChart3,
  Gauge,
  Zap,
  Settings,
  Cpu,
} from 'lucide-react';

export default function EMotorDesign() {
  return (
    <SubPageTemplate
      parentHref="/entwicklung"
      parentLabelDE="Elektronikentwicklung"
      parentLabelEN="Electronics Development"
      titleDE="E-Motor Design"
      titleEN="E-Motor Design"
      subtitleDE="Auslegung, Berechnung und Optimierung von Elektromotoren – vom Konzept bis zur serienreifen Lösung."
      subtitleEN="Design, calculation and optimization of electric motors – from concept to series-ready solution."
      heroImg="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1736__1920px_e713f7ca.jpg"
      introDE="CME wählt für Ihre Applikation den passenden Elektromotor aus und optimiert das Design entsprechend Ihren Vorgaben. Unsere Experten berechnen und simulieren Magnetkreise, Blechschnitte und thermische Belastungen – für Motoren mit besonders hohem Wirkungsgrad, auch unter rauen Umgebungsbedingungen und bei hohen Temperaturen. Durch die enge Verzahnung von E-Motor-Design, Leistungselektronik und Regelungstechnik entstehen optimal aufeinander abgestimmte Antriebssysteme."
      introEN="CME selects the right electric motor for your application and optimizes the design according to your specifications. Our experts calculate and simulate magnetic circuits, lamination cuts and thermal loads – for motors with particularly high efficiency, even under harsh environmental conditions and at high temperatures. Through the close integration of e-motor design, power electronics and control engineering, optimally coordinated drive systems are created."
      features={[
        { de: 'Auslegung & Design von EC-, DC- und Synchronmaschinen', en: 'Design of EC, DC and synchronous machines', icon: Cog },
        { de: 'Geometrie-Design des Magnetkreises (Rotor & Stator)', en: 'Magnetic circuit geometry design (rotor & stator)', icon: Target },
        { de: 'Blechschnitt-Konstruktion', en: 'Lamination construction', icon: Layers },
        { de: 'Auslegung für Hochtemperaturanwendungen', en: 'Design for high-temperature applications', icon: Thermometer },
        { de: 'Elektromagnetische FEM-Simulation (Motor-CAD / ANSYS)', en: 'Electromagnetic FEM simulation (Motor-CAD / ANSYS)', icon: BarChart3 },
        { de: 'Analytische Berechnung & Optimierung', en: 'Analytical calculation & optimization', icon: Gauge },
        { de: 'Applikationsspezifische Motorauswahl', en: 'Application-specific motor selection', icon: Settings },
        { de: 'Integration mit Leistungselektronik & Regelung', en: 'Integration with power electronics & control', icon: Zap },
        { de: 'Ansteuerstrategien für EC-Antriebe (Effizienz, Geräusch, Robustheit)', en: 'Drive strategies for EC motors (efficiency, noise, robustness)', icon: Cpu },
      ]}
      relatedPages={[
        { href: '/entwicklung/simulation', titleDE: 'Simulation & Toolchain', titleEN: 'Simulation & Toolchain', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/thermosimulation-1500x1000-1_77e2afd4.jpg' },
        { href: '/entwicklung/hardware-software', titleDE: 'Hard & Software Design', titleEN: 'Hard & Software Design', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2392__1920px_af02a6b7.jpg' },
        { href: '/entwicklung/test-verifikation', titleDE: 'Test & Verification', titleEN: 'Test & Verification', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2885__1920px_ecd3ed1e.jpg' },
      ]}
    />
  );
}
