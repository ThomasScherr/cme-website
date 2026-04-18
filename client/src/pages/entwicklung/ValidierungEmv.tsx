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
      titleDE="EMV-Prüfung & Validierung Dortmund"
      titleEN="EMC Testing & Validation Dortmund"
      subtitleDE="Absicherung unter realen Einsatzbedingungen – leitungsgebundene EMV-Prüfung in eigener Schirmkabine, Umwelt- und Lebensdauertests."
      subtitleEN="Validation under real operating conditions – conducted EMC testing in our own shielded chamber, environmental and lifetime tests."
      metaDescriptionDE="EMV-Prüfung und Validierung elektronischer Baugruppen in Dortmund. Eigene Schirmkabine, Klimatests, Lebensdauerprüfungen und Umweltsimulation bei CME."
      metaDescriptionEN="EMC testing and validation of electronic assemblies in Dortmund. Own shielded chamber, climate tests, lifetime tests and environmental simulation at CME."
      heroImg={`${CDN}/JK_2885__1920px_ecd3ed1e.jpg`}
      introDE="CME validiert Ihre Elektronik unter realen Einsatzbedingungen – in unserem eigenen EMV-Messbereich mit Schirmkabine für leitungsgebundene Prüfungen. Wir identifizieren EMV-Schwachstellen frühzeitig im Entwicklungsprozess und beheben sie, bevor sie in der Serienfertigung zum Problem werden. Ergänzt wird die EMV-Qualifikation durch Umweltsimulationen, Klimatests und Lebensdauerprüfungen auf individuell konzipierten Prüfständen."
      introEN="CME validates your electronics under real operating conditions – in our own EMC measurement facility with shielded chamber for conducted tests. We identify EMC weaknesses early in the development process and fix them before they become problems in series production. EMC qualification is complemented by environmental simulations, climate tests and lifetime tests on individually designed test benches."
      features={[
        {
          de: 'Leitungsgebundene EMV-Prüfung (eigene Schirmkabine)',
          en: 'Conducted EMC testing (own shielded chamber)',
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
          de: 'EMV-Pre-Compliance-Messungen',
          en: 'EMC pre-compliance measurements',
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
          de: 'EMV-gerechtes Design & Entstörung',
          en: 'EMC-compliant design & interference suppression',
          icon: Zap,
          bulletsDE: [
            'Entstörbeschaltung auf Schaltungsebene: Ferriteperlen, LC-Filter, TVS-Dioden, Varistoren',
            'EMV-gerechtes PCB-Layout: Rückstrompfade, Split-Ground-Konzepte, kontrollierte Impedanzen',
            'Schirmungskonzepte für Kabel und Gehäuse – Auswahl und Simulation im Entwicklungsprozess',
            'Iterative Entstörung im hauseigenen Labor – kurze Schleifen ohne externe Laborbuchung',
          ],
          bulletsEN: [
            'Interference suppression at circuit level: ferrite beads, LC filters, TVS diodes, varistors',
            'EMC-compliant PCB layout: return current paths, split-ground concepts, controlled impedances',
            'Shielding concepts for cables and enclosures – selection and simulation in the development process',
            'Iterative interference suppression in in-house lab – short loops without external lab booking',
          ],
        },
        {
          de: 'Klimaprüfungen & Umweltsimulation',
          en: 'Climate tests & environmental simulation',
          icon: Thermometer,
          bulletsDE: [
            'Temperaturwechseltests und Klimaschrankprüfung nach IEC 60068 und AEC-Q',
            'Feuchte- und Kondensationsprüfungen für Schutzklassen IP54–IP67',
            'Salznebelprüfung und Schimmelresistenztest für Außen- und Automotive-Applikationen',
            'Hauseigene Klimaprüfkammer in Dortmund – Vorbereitung auf externe Zulassungsprüfungen',
          ],
          bulletsEN: [
            'Thermal cycling tests and climate chamber testing per IEC 60068 and AEC-Q',
            'Humidity and condensation tests for protection classes IP54–IP67',
            'Salt spray and mold resistance testing for outdoor and automotive applications',
            'In-house climate test chamber in Dortmund – preparation for external certification tests',
          ],
        },
        {
          de: 'Vibrations- & Schockprüfungen',
          en: 'Vibration & shock tests',
          icon: Vibrate,
          bulletsDE: [
            'Prüfung nach IEC 60068-2-6 (Sinusvibration) und IEC 60068-2-27 (Schock)',
            'Automotive-Profile nach LV 124, GMW3172 und kundenspezifischen Lastenheften',
            'Identifikation mechanisch kritischer Baugruppen, Lötstellen und Steckverbinder',
            'Iterative Prüfung während der Entwicklungsphase zur frühzeitigen Risikominimierung',
          ],
          bulletsEN: [
            'Testing per IEC 60068-2-6 (sinusoidal vibration) and IEC 60068-2-27 (shock)',
            'Automotive profiles per LV 124, GMW3172 and customer-specific specifications',
            'Identification of mechanically critical assemblies, solder joints and connectors',
            'Iterative testing during the development phase for early risk mitigation',
          ],
        },
        {
          de: 'Lebensdauer- & Belastungstests',
          en: 'Lifetime & stress tests',
          icon: Settings,
          bulletsDE: [
            'HALT (Highly Accelerated Life Test) zur Schwachstellenermittlung in der Entwicklung',
            'HASS (Highly Accelerated Stress Screening) als 100%-Screen in der Serienproduktion',
            'Kombinierte Temperatur-Vibrations-Profile zur gezielten Beschleunigung von Ausfallmechanismen',
            'Auswertung und Rückmeldung in den Entwicklungsprozess zur systematischen Robustheitssteigerung',
          ],
          bulletsEN: [
            'HALT (Highly Accelerated Life Test) for weakness identification in development',
            'HASS (Highly Accelerated Stress Screening) as 100% screen in series production',
            'Combined temperature-vibration profiles for targeted acceleration of failure mechanisms',
            'Evaluation and feedback into the development process for systematic robustness improvement',
          ],
        },
        {
          de: 'Individuelle Prüfstände & Testkonzepte',
          en: 'Custom test benches & test concepts',
          icon: Target,
          bulletsDE: [
            'Hipot-Test (Hochspannungsprüfung) nach IEC 61010, EN 60950 und VDE-Normen',
            'Isolationswiderstandsmessung und Teilentladungsprüfung für Leistungselektronik',
            'Entwicklung kundenspezifischer Prüfadapter, Prüflinge und Testvorrichtungen',
            'End-of-Line-Testkonzepte für 100%-Prüfung in der Serienfertigung',
          ],
          bulletsEN: [
            'Hipot test (high-voltage testing) per IEC 61010, EN 60950 and VDE standards',
            'Insulation resistance measurement and partial discharge testing for power electronics',
            'Development of customer-specific test adapters, test specimens and test fixtures',
            'End-of-line test concepts for 100% inspection in series production',
          ],
        },
        {
          de: 'Automatische Datenerfassung & -analyse',
          en: 'Automatic data acquisition & analysis',
          icon: BarChart3,
          bulletsDE: [
            'Elektrische Prüfung bestückter Leiterplatten auf Bauteilwerte, Kurzschlüsse und Unterbrechungen',
            'Nadelbett-Adapter oder Flying-Probe-Systeme je nach Stückzahl und Layoutkomplexität',
            'Parametrische Messung von Spannung, Strom, Frequenz, Kommunikation und Schutzfunktionen',
            'Anbindung an Fertigungsdatenbanken für lückenlose Rückverfolgbarkeit (Traceability)',
          ],
          bulletsEN: [
            'Electrical testing of assembled PCBs for component values, shorts and opens',
            'Bed-of-nails adapter or flying probe systems depending on volume and layout complexity',
            'Parametric measurement of voltage, current, frequency, communication and protection functions',
            'Connection to manufacturing databases for complete traceability',
          ],
        },
        {
          de: 'Prüfberichte & Dokumentation',
          en: 'Test reports & documentation',
          icon: FileCheck,
          bulletsDE: [
            'Erstellung vollständiger Testspezifikationen und Prüfpläne ab der Entwicklungsphase',
            'Auswahl und Integration geeigneter Messinstrumente und Testplattformen (NI, Keysight, eigene)',
            'Design-for-Test-Beratung: testgerechtes PCB-Layout und Zugangskonzepte für die Produktion',
            'Dokumentierte Prüfprotokolle für Zulassung, Qualitätssicherung und Kundenabnahme',
          ],
          bulletsEN: [
            'Creation of complete test specifications and test plans from the development phase',
            'Selection and integration of suitable measurement instruments and test platforms (NI, Keysight, proprietary)',
            'Design-for-test consulting: test-friendly PCB layout and access concepts for production',
            'Documented test protocols for certification, quality assurance and customer acceptance',
          ],
        },
      ]}
          enPath="/en/development/emc-validation"
    />
  );
}
