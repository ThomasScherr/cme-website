import SubPageTemplate from '@/components/SubPageTemplate';
import {
  BrainCircuit,
  BarChart3,
  Eye,
  Cpu,
  Gauge,
  Database,
  Zap,
  GitBranch,
  Settings,
} from 'lucide-react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

export default function KiEntwicklung() {
  return (
    <SubPageTemplate
      parentHref="/entwicklung"
      parentLabelDE="Elektronikentwicklung"
      parentLabelEN="Electronics Development"
      titleDE="KI-gestützte Entwicklung"
      titleEN="AI-Powered Development"
      subtitleDE="Datengetriebene Methoden für Leistungselektronik, Antriebssysteme und Embedded-Anwendungen – vom Algorithmus bis zur Inferenz auf dem Zielsystem."
      subtitleEN="Data-driven methods for power electronics, drive systems and embedded applications – from algorithm to inference on the target system."
      heroImg={`${CDN}/JK_2392__1920px_af02a6b7.jpg`}
      introDE="KI ist kein Selbstzweck – sie löst konkrete Probleme in der Elektronikentwicklung. CME setzt Machine-Learning-Methoden dort ein, wo klassische Regelungs- oder Analyseansätze an ihre Grenzen stoßen: bei der Erkennung von Mustern in Sensordaten, bei der Optimierung nichtlinearer Regelstrecken und bei der vorausschauenden Wartung komplexer Systeme. Entscheidend ist dabei nicht die Modellkomplexität, sondern die Fähigkeit, trainierte Modelle auf ressourcenbeschränkter Embedded-Hardware zuverlässig auszuführen – in Echtzeit, bei begrenztem Speicher und unter industriellen Umgebungsbedingungen."
      introEN="AI is not an end in itself – it solves concrete problems in electronics development. CME applies machine learning methods where classical control or analysis approaches reach their limits: detecting patterns in sensor data, optimizing nonlinear control systems, and enabling predictive maintenance of complex systems. What matters is not model complexity, but the ability to reliably run trained models on resource-constrained embedded hardware – in real time, with limited memory, and under industrial environmental conditions."
      ctaDE="KI-Anwendungsfall besprechen"
      ctaEN="Discuss AI use case"
      features={[
        { de: 'Sensorbasierte Zustandserkennung – ML-Modelle für Vibration, Strom, Temperatur und akustische Signale zur Erkennung von Verschleiß, Fehlern oder Betriebszuständen', en: 'Sensor-based condition detection – ML models for vibration, current, temperature and acoustic signals to detect wear, faults or operating states', icon: BrainCircuit },
        { de: 'Regelungsoptimierung mit KI – Selbstadaptierende Regler für nichtlineare Strecken, z.\u00A0B. bei Motorsteuerungen mit variablen Lasten oder thermischen Drifts', en: 'AI-based control optimization – Self-adapting controllers for nonlinear systems, e.g. motor controls with variable loads or thermal drift', icon: Gauge },
        { de: 'Predictive Maintenance – Frühzeitige Erkennung von Degradation in Antrieben, Netzteilen oder Leistungsmodulen auf Basis von Betriebsdaten', en: 'Predictive maintenance – Early detection of degradation in drives, power supplies or power modules based on operational data', icon: BarChart3 },
        { de: 'Visuelle Qualitätskontrolle – Bildverarbeitung und Objekterkennung für Lötstellen, Bestückung und Oberflächeninspektion in der Elektronikfertigung', en: 'Visual quality control – Image processing and object detection for solder joints, component placement and surface inspection in electronics manufacturing', icon: Eye },
        { de: 'Edge-Inferenz auf Embedded-Zielen – Deployment trainierter Modelle auf MCUs mit Fokus auf Latenz, Speicherbedarf und Energieverbrauch', en: 'Edge inference on embedded targets – Deployment of trained models on MCUs with focus on latency, memory footprint and power consumption', icon: Cpu },
        { de: 'Datenaufbereitung & Feature Engineering – Aufbereitung von Rohdaten aus Prüfständen, Feldtests und Serienfertigung für reproduzierbare Trainingspipelines', en: 'Data preparation & feature engineering – Processing raw data from test benches, field tests and series production for reproducible training pipelines', icon: Database },
        { de: 'TinyML & Modellkomprimierung – Quantisierung, Pruning und Destillation für den Einsatz auf Cortex-M-Klasse-Prozessoren und vergleichbaren Plattformen', en: 'TinyML & model compression – Quantization, pruning and distillation for deployment on Cortex-M class processors and comparable platforms', icon: Zap },
        { de: 'Modell-Lifecycle & Versionierung – Nachvollziehbare Modellversionen, Testabdeckung und Dokumentation für regulierte Branchen', en: 'Model lifecycle & versioning – Traceable model versions, test coverage and documentation for regulated industries', icon: GitBranch },
        { de: 'Integration in bestehende Systeme – Einbettung von KI-Funktionen in vorhandene Firmware-, RTOS- oder SPS-Architekturen ohne Systembruch', en: 'Integration into existing systems – Embedding AI functions into existing firmware, RTOS or PLC architectures without system disruption', icon: Settings },
      ]}
    />
  );
}
