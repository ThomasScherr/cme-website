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
      pageKey="fertigung.leiterplatten"
      parentHref="/fertigung"
      parentLabelDE="Elektronikfertigung"
      parentLabelEN="Electronics Manufacturing"
      titleDE="Leiterplattenbestückung SMD & THT"
      titleEN="PCB Assembly SMD & THT Dortmund"
      subtitleDE="SMD- und THT-Bestückung auf modernsten Fertigungslinien – vom Prototyp bis zur Großserie."
      subtitleEN="SMD and THT assembly on state-of-the-art production lines – from prototype to high-volume series."
      metaDescriptionDE="Leiterplattenbestückung in Dortmund: SMD- und THT-Bestückung vom Prototyp bis zur Großserie. Modernste Fertigungslinien, AOI und Röntgeninspektion bei CME."
      metaDescriptionEN="PCB assembly in Dortmund: SMD and THT assembly from prototype to high-volume series. State-of-the-art production lines, AOI and X-ray inspection at CME."
      heroVideo={{
        webm: `${CDN}/leiterplatten-hero_9526f6fb.webm`,
        mp4: `${CDN}/leiterplatten-hero_f10b49bd.mp4`,
        poster: `${CDN}/leiterplatten-hero-poster_168ab542.jpg`,
      }}
      introDE="Die Leiterplattenbestückung ist das Herzstück unserer EMS-Fertigung. Mit modernsten SMD-Bestückungsautomaten und THT-Lötanlagen fertigen wir Ihre Elektronik in höchster Qualität. Ob einzelne Prototypen für die Entwicklungsvalidierung oder Serienproduktion mit mehreren tausend Stück pro Monat – unsere Fertigungslinien sind flexibel konfigurierbar und auf schnelle Rüstwechsel optimiert."
      introEN="PCB assembly is the heart of our EMS manufacturing. With state-of-the-art SMD placement machines and THT soldering systems, we manufacture your electronics in the highest quality. Whether individual prototypes for development validation or series production with several thousand units per month – our production lines are flexibly configurable and optimized for quick changeovers."
      ctaDE="Bestückungsangebot anfragen"
      ctaEN="Request PCB Assembly Quote"
      features={[
        {
          de: 'SMD-Bestückung',
          en: 'SMD Assembly',
          icon: Cpu,
          bulletsDE: [
            'Hochpräzise Bestückung mit modernen Pick-and-Place-Automaten (bis 01005 / 0.4 mm Pitch)',
            'Verarbeitung aller gängigen SMD-Bauformen: Chip, QFN, BGA, LGA, SOP, MELF',
            'Optische Vollinspektion (AOI) nach jedem Bestückungsschritt',
            'Geeignet für Einzel-, Klein- und Großserien – flexibel rüstbar',
          ],
          bulletsEN: [
            'High-precision placement with modern pick-and-place machines (down to 01005 / 0.4 mm pitch)',
            'Processing of all common SMD packages: Chip, QFN, BGA, LGA, SOP, MELF',
            'Full optical inspection (AOI) after each placement step',
            'Suitable for single units, small and large series – flexibly configurable',
          ],
        },
        {
          de: 'THT-Bestückung & Wellenlöten',
          en: 'THT Assembly & Wave Soldering',
          icon: CircuitBoard,
          bulletsDE: [
            'Manuelle und teilautomatisierte Bestückung bedrahteter Bauelemente',
            'Wellenlöten für konventionelle Durchsteckmontage in hoher Stückzahl',
            'Selektive Flussmittelauftragung für reproduzierbare Lötergebnisse',
            'Verarbeitung von Steckverbindern, Transformatoren, Kühlkörpern und Sondergehäusen',
          ],
          bulletsEN: [
            'Manual and semi-automated assembly of through-hole components',
            'Wave soldering for conventional through-hole mounting in high volumes',
            'Selective flux application for reproducible soldering results',
            'Processing of connectors, transformers, heat sinks and special housings',
          ],
        },
        {
          de: 'Selektivlöten für Mixed-Technology',
          en: 'Selective Soldering for Mixed Technology',
          icon: Flame,
          bulletsDE: [
            'Kombinierte SMD/THT-Bestückung auf einer Leiterplatte ohne Kompromisse',
            'Selektivlöten schützt temperatursensible SMD-Bauteile vor Wellenlöt-Wärme',
            'Programmierbare Lötstellen für reproduzierbare Einzelpunktlötung',
            'Ideal für Leistungselektronik mit hoher Komponentendichte und Mischbestückung',
          ],
          bulletsEN: [
            'Combined SMD/THT assembly on one PCB without compromise',
            'Selective soldering protects temperature-sensitive SMD components from wave heat',
            'Programmable solder joints for reproducible single-point soldering',
            'Ideal for power electronics with high component density and mixed assembly',
          ],
        },
        {
          de: 'Reflow-Löten (bleihaltig & bleifrei)',
          en: 'Reflow Soldering (leaded & lead-free)',
          icon: ThermometerSun,
          bulletsDE: [
            'Präzise Temperaturprofilierung für bleifreie (SAC305) und bleihaltige Lote',
            'Mehrzonen-Reflow-Öfen für gleichmäßige Wärmeverteilung auf großen Baugruppen',
            'Profiloptimierung für wärmeempfindliche Bauteile und High-Thermal-Mass-Boards',
            'Dokumentierte Lötprofile für Reproduzierbarkeit in der Serie',
          ],
          bulletsEN: [
            'Precise temperature profiling for lead-free (SAC305) and leaded solders',
            'Multi-zone reflow ovens for uniform heat distribution on large assemblies',
            'Profile optimization for heat-sensitive components and high-thermal-mass boards',
            'Documented soldering profiles for reproducibility in series production',
          ],
        },
        {
          de: 'Dampfphasenlöten für Leistungselektronik',
          en: 'Vapor Phase Soldering for Power Electronics',
          icon: Zap,
          bulletsDE: [
            'Schonende und gleichmäßige Wärmeübertragung durch Kondensationswärme',
            'Ideal für Leistungsmodule, SiC/GaN-Bauteile und hohe thermische Massen',
            'Verhindert Überhitzung – maximale Temperatur physikalisch begrenzt durch das Fluid',
            'Geringer Verzug und zuverlässige Lötergebnisse auch bei komplexen Baugruppen',
          ],
          bulletsEN: [
            'Gentle and uniform heat transfer through condensation heat',
            'Ideal for power modules, SiC/GaN components and high thermal masses',
            'Prevents overheating – maximum temperature physically limited by the fluid',
            'Low warpage and reliable soldering results even with complex assemblies',
          ],
        },
        {
          de: 'Pastendruck mit SPI-Kontrolle',
          en: 'Paste Printing with SPI Control',
          icon: Layers,
          bulletsDE: [
            'Präziser Lotpastendruck mit automatischer Schablonendruckmaschine',
            '100%-Inspektion des Pastenauftrags durch Solder Paste Inspection (SPI) nach dem Druck',
            'Schablonenoptimierung für Fine-Pitch und High-Density-Layouts',
            'Lückenlose Dokumentation der Druckparameter für Qualitätsnachverfolgung',
          ],
          bulletsEN: [
            'Precise solder paste printing with automatic stencil printer',
            '100% inspection of paste application through Solder Paste Inspection (SPI) after printing',
            'Stencil optimization for fine-pitch and high-density layouts',
            'Complete documentation of print parameters for quality traceability',
          ],
        },
        {
          de: 'Schnelle Prototypenfertigung',
          en: 'Fast Prototype Production',
          icon: Timer,
          bulletsDE: [
            'Express-Bestückung ab Einzelstück – Turnaround in 24–72 Stunden möglich',
            'Direkter Draht zwischen Entwicklung und Fertigung für schnelle Rückfragen',
            'Prototypen mit serienidentischem Prozess für valide Entwicklungsergebnisse',
            'Unterstützung bei Materialbereitstellung und Bauteilbeschaffung für Einzelmuster',
          ],
          bulletsEN: [
            'Express assembly from single units – turnaround in 24–72 hours possible',
            'Direct line between development and production for quick feedback',
            'Prototypes with series-identical process for valid development results',
            'Support with material provision and component procurement for individual samples',
          ],
        },
        {
          de: 'Flexible Losgrößen',
          en: 'Flexible Lot Sizes',
          icon: SlidersHorizontal,
          bulletsDE: [
            'Fertigung von Einzelstück bis mehrere tausend Stück pro Monat auf denselben Linien',
            'Schnelle Rüstwechsel durch standardisierte Fertigungsvorbereitung',
            'Kein Mindestbestellwert – wirtschaftlich auch für kleine Serien und Nachläufer',
            'Skalierbare Kapazitätsplanung für wachsende Serienvolumen',
          ],
          bulletsEN: [
            'Production from single units to several thousand per month on the same lines',
            'Quick changeovers through standardized production preparation',
            'No minimum order value – economical even for small series and follow-ups',
            'Scalable capacity planning for growing series volumes',
          ],
        },
        {
          de: 'NPI-Prozess (New Product Introduction)',
          en: 'NPI Process (New Product Introduction)',
          icon: Rocket,
          bulletsDE: [
            'Strukturierter Einführungsprozess für neue Produkte von Prototyp bis Serie',
            'Erstmuster-Prüfbericht (EMPB/PPAP-ähnlich) zur Serienfreigabe',
            'DFM/DFT-Review vor Serienstart – Fertigbarkeit und Testbarkeit sichergestellt',
            'Enge Abstimmung zwischen Entwicklung, Einkauf und Fertigungsplanung',
          ],
          bulletsEN: [
            'Structured introduction process for new products from prototype to series',
            'First article inspection report (EMPB/PPAP-like) for series release',
            'DFM/DFT review before series start – manufacturability and testability ensured',
            'Close coordination between development, purchasing and production planning',
          ],
        },
      ]}
    />
  );
}
