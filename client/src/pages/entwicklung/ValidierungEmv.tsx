import SubPageTemplate from '@/components/SubPageTemplate';
import {
  ShieldCheck,
  Radio,
  Thermometer,
  Zap,
  BarChart3,
  Settings,
  FileCheck,
  Target,
  Vibrate,
} from 'lucide-react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

export default function ValidierungEmv() {
  return (
    <SubPageTemplate
      pageKey="entwicklung.validierungemv"
      parentHref="/entwicklung"
      parentLabelDE="Elektronikentwicklung"
      parentLabelEN="Electronics Development"
      titleDE="Validierung & EMV"
      titleEN="Validation & EMC"
      subtitleDE="Absicherung unter realen Einsatzbedingungen – leitungsgebundene EMV-Prüfung in eigener Schirmkabine, Umwelt- und Lebensdauertests."
      subtitleEN="Validation under real operating conditions – conducted EMC testing in our own shielded chamber, environmental and lifetime tests."
      heroImg={`${CDN}/JK_2885__1920px_ecd3ed1e.jpg`}
      introDE="CME validiert Ihre Elektronik unter realen Einsatzbedingungen – in unserem eigenen EMV-Messbereich mit Schirmkabine für leitungsgebundene Prüfungen. Wir identifizieren EMV-Schwachstellen frühzeitig im Entwicklungsprozess und beheben sie, bevor sie in der Serienfertigung zum Problem werden. Ergänzt wird die EMV-Qualifikation durch Umweltsimulationen, Klimatests und Lebensdauerprüfungen auf individuell konzipierten Prüfständen."
      introEN="CME validates your electronics under real operating conditions – in our own EMC measurement facility with shielded chamber for conducted tests. We identify EMC weaknesses early in the development process and fix them before they become problems in series production. EMC qualification is complemented by environmental simulations, climate tests and lifetime tests on individually designed test benches."
      features={[
        {
          de: 'EMV-Vorabprüfung (eigene Vorkammer)',
          en: 'EMC pre-compliance testing (own pre-chamber)',
          icon: Radio,
          bulletsDE: [
            'Frühzeitige EMV-Vorabmessung am Standort Dortmund – ohne externe Laborbuchung',
            'Störaussendung und Störfestigkeit im iterativen Entwicklungsprozess prüfbar',
            'Schnelle Design-Iterationen durch kurze Prüfzyklen direkt beim Entwicklerteam',
            'Reduzierung des Risikos kostspieliger Überarbeitungen beim finalen Zulassungstest',
          ],
          bulletsEN: [
            'Early EMC pre-measurement at Dortmund site – no external lab booking needed',
            'Emission and immunity testable in iterative development process',
            'Fast design iterations through short test cycles directly with the development team',
            'Reduction of risk of costly rework during final certification testing',
          ],
        },
        {
          de: 'EMV-Qualifikation nach Automotive & Industrienormen',
          en: 'EMC qualification per automotive & industrial standards',
          icon: ShieldCheck,
          bulletsDE: [
            'Vorbereitung und Begleitung der Zulassungsprüfung nach CISPR 25, ISO 11452, CISPR 32',
            'Industrienormen: EN 55032, EN 61000-Reihe, IEC 61326',
            'Dokumentation und Prüfplanung für akkreditierte Labore',
            'Beratung zur EMV-gerechten Schaltungs- und Layoutgestaltung',
          ],
          bulletsEN: [
            'Preparation and support of certification testing per CISPR 25, ISO 11452, CISPR 32',
            'Industrial standards: EN 55032, EN 61000 series, IEC 61326',
            'Documentation and test planning for accredited laboratories',
            'Consulting on EMC-compliant circuit and layout design',
          ],
        },
        {
          de: 'Klimatests & Umwelttests',
          en: 'Climate tests & environmental tests',
          icon: Thermometer,
          bulletsDE: [
            'Temperaturwechseltests und Klimaschranktests nach IEC 60068 und AEC-Q',
            'Feuchte- und Kondensationsprüfungen für Schutzklassen IP54–IP67',
            'Salznebelprüfung und Schimmelresistenztest für Außen- und Automotive-Applikationen',
            'Vorbereitung auf Zulassungstests durch hauseigene Klimaprüfung in Dortmund',
          ],
          bulletsEN: [
            'Thermal cycling and climate chamber tests per IEC 60068 and AEC-Q',
            'Humidity and condensation tests for protection classes IP54–IP67',
            'Salt spray and mold resistance testing for outdoor and automotive applications',
            'Preparation for certification tests through in-house climate testing in Dortmund',
          ],
        },
        {
          de: 'Vibrations- & Schocktests',
          en: 'Vibration & shock tests',
          icon: Vibrate,
          bulletsDE: [
            'Prüfung nach IEC 60068-2-6 (Vibration) und IEC 60068-2-27 (Schock)',
            'Automotive-Profile nach LV 124, GMW3172 und kundenspezifischen Lastenheften',
            'Identifikation mechanisch kritischer Baugruppen und Lötstellen',
            'Iterative Prüfung während der Entwicklung zur frühzeitigen Risikominimierung',
          ],
          bulletsEN: [
            'Testing per IEC 60068-2-6 (vibration) and IEC 60068-2-27 (shock)',
            'Automotive profiles per LV 124, GMW3172 and customer-specific specifications',
            'Identification of mechanically critical assemblies and solder joints',
            'Iterative testing during development for early risk mitigation',
          ],
        },
        {
          de: 'Automatisierter Funktionstest (EOL)',
          en: 'Automated functional test (EOL)',
          icon: BarChart3,
          bulletsDE: [
            'End-of-Line-Testkonzepte für 100%-Prüfung in der Serienfertigung',
            'Parametrische Messung von Spannung, Strom, Frequenz, Kommunikation und Schutzfunktionen',
            'Anbindung an Fertigungsdatenbanken für Rückverfolgbarkeit (Traceability)',
            'Entwicklung und Inbetriebnahme kundenspezifischer Prüfadapter und Prüfsoftware',
          ],
          bulletsEN: [
            'End-of-line test concepts for 100% inspection in series production',
            'Parametric measurement of voltage, current, frequency, communication and protection functions',
            'Connection to manufacturing databases for traceability',
            'Development and commissioning of customer-specific test adapters and test software',
          ],
        },
        {
          de: 'In-Circuit-Test (ICT)',
          en: 'In-circuit test (ICT)',
          icon: Zap,
          bulletsDE: [
            'Elektrische Prüfung bestückter Leiterplatten auf Bauteilwerte, Kurzschlüsse und Unterbrechungen',
            'Nadelbett-Adapter oder Flying-Probe-Systeme je nach Stückzahl und Layout',
            'Früherkennung von Bestückungsfehlern vor dem Funktionstest',
            'Testabdeckung >95 % durch abgestimmtes ICT-Design-for-Test (DfT) bereits im Layout',
          ],
          bulletsEN: [
            'Electrical testing of assembled PCBs for component values, shorts and opens',
            'Bed-of-nails adapter or flying probe systems depending on volume and layout',
            'Early detection of assembly defects before functional testing',
            'Test coverage >95% through coordinated ICT design-for-test (DfT) already in layout',
          ],
        },
        {
          de: 'Hochspannungsprüfung & Isolationstest',
          en: 'High-voltage testing & insulation test',
          icon: Target,
          bulletsDE: [
            'Hipot-Test (Hochspannungsprüfung) nach IEC 61010, EN 60950 und VDE-Normen',
            'Isolationswiderstandsmessung und Teilentladungsprüfung',
            'Durchschlagsprüfung für Leistungselektronik mit Spannungen bis mehrere kV',
            'Dokumentierte Prüfprotokolle für Zulassung und Qualitätssicherung',
          ],
          bulletsEN: [
            'Hipot test (high-voltage testing) per IEC 61010, EN 60950 and VDE standards',
            'Insulation resistance measurement and partial discharge testing',
            'Breakdown testing for power electronics with voltages up to several kV',
            'Documented test protocols for certification and quality assurance',
          ],
        },
        {
          de: 'Lebensdauertests & HALT/HASS',
          en: 'Lifetime tests & HALT/HASS',
          icon: Settings,
          bulletsDE: [
            'HALT (Highly Accelerated Life Test) zur Schwachstellenermittlung in der Entwicklung',
            'HASS (Highly Accelerated Stress Screening) als 100%-Screen in der Serienproduktion',
            'Kombinierte Druck-Temperatur-Vibrations-Profile zur Beschleunigung von Ausfallmechanismen',
            'Auswertung und Rückmeldung in den Entwicklungsprozess zur gezielten Robustheitssteigerung',
          ],
          bulletsEN: [
            'HALT (Highly Accelerated Life Test) for weakness identification in development',
            'HASS (Highly Accelerated Stress Screening) as 100% screen in series production',
            'Combined pressure-temperature-vibration profiles to accelerate failure mechanisms',
            'Evaluation and feedback into the development process for targeted robustness improvement',
          ],
        },
        {
          de: 'Testkonzeptentwicklung & Prüfmittelbau',
          en: 'Test concept development & test equipment construction',
          icon: FileCheck,
          bulletsDE: [
            'Erstellung vollständiger Testspezifikationen und Prüfpläne ab der Entwicklungsphase',
            'Konstruktion und Fertigung kundenspezifischer Prüfvorrichtungen, Adapter und Prüflinge',
            'Auswahl und Integration geeigneter Messinstrumente und Testplattformen (NI, Keysight, eigene)',
            'Design-for-Test-Beratung: testgerechtes PCB-Layout und Zugangskonzepte für die Produktion',
          ],
          bulletsEN: [
            'Creation of complete test specifications and test plans from the development phase',
            'Design and manufacturing of customer-specific test fixtures, adapters and test specimens',
            'Selection and integration of suitable measurement instruments and test platforms (NI, Keysight, proprietary)',
            'Design-for-test consulting: test-friendly PCB layout and access concepts for production',
          ],
        },
      ]}
    />
  );
}
