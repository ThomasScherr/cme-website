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
} from 'lucide-react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

export default function ValidierungEmv() {
  return (
    <SubPageTemplate
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
        { de: 'Leitungsgebundene EMV-Prüfung (eigene Schirmkabine)', en: 'Conducted EMC testing (own shielded chamber)', icon: Radio },
        { de: 'EMV-Pre-Compliance-Messungen', en: 'EMC pre-compliance measurements', icon: ShieldCheck },
        { de: 'EMV-gerechtes Design & Entstörung', en: 'EMC-compliant design & filtering', icon: Zap },
        { de: 'Klimaprüfungen & Umweltsimulation', en: 'Climate tests & environmental simulation', icon: Thermometer },
        { de: 'Lebensdauer- & Belastungstests', en: 'Lifetime & stress tests', icon: Target },
        { de: 'Individuelle Prüfstände & Testkonzepte', en: 'Custom test benches & test concepts', icon: Settings },
        { de: 'Automatische Datenerfassung & -analyse', en: 'Automatic data acquisition & analysis', icon: BarChart3 },
        { de: 'Prüfberichte & Dokumentation', en: 'Test reports & documentation', icon: FileCheck },
      ]}
    />
  );
}
