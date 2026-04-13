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
  ShieldCheck,
} from 'lucide-react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

export default function KiEntwicklung() {
  return (
    <SubPageTemplate
      pageKey="entwicklung.kientwicklung"
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
        {
          de: 'Prädiktive Regelung – Modellprädiktive Ansätze (MPC) für nichtlineare Antriebssysteme und Leistungswandler',
          en: 'Predictive Control – Model Predictive Control (MPC) for nonlinear drive systems and power converters',
          icon: BrainCircuit,
          bulletsDE: [
            'Klassische Regler stoßen bei nichtlinearen Antrieben an ihre Grenzen – MPC denkt mehrere Schritte voraus und reagiert präziser',
            'Bessere Regelgüte bei Drehzahl, Drehmoment und Wirkungsgrad – auch bei wechselnden Lastprofilen',
            'Weniger Überschwingen, kürzere Einschwingzeiten und niedrigere thermische Belastung',
            'Direkt auf Embedded-Hardware implementierbar – ohne externe Recheneinheit',
          ],
          bulletsEN: [
            'Classical controllers reach their limits with nonlinear drives – MPC thinks several steps ahead and reacts more precisely',
            'Better control quality for speed, torque and efficiency – even with changing load profiles',
            'Less overshoot, shorter settling times and lower thermal stress',
            'Directly implementable on embedded hardware – no external computing unit required',
          ],
        },
        {
          de: 'Anomalieerkennung & Predictive Maintenance',
          en: 'Anomaly Detection & Predictive Maintenance',
          icon: BarChart3,
          bulletsDE: [
            'Erkennt frühzeitig, wenn sich ein Antrieb, ein Netzteil oder ein Leistungsmodul abnormal verhält – bevor es ausfällt',
            'Analysiert laufende Betriebsdaten statt aufwändiger Einzelmessungen',
            'Reduziert ungeplante Ausfallzeiten und vermeidet teure Folgeschäden',
            'Nachrüstbar in bestehende Systeme ohne Hardware-Änderung',
          ],
          bulletsEN: [
            'Detects early when a drive, power supply or power module behaves abnormally – before it fails',
            'Analyzes ongoing operational data instead of costly individual measurements',
            'Reduces unplanned downtime and avoids expensive consequential damage',
            'Retrofittable into existing systems without hardware changes',
          ],
        },
        {
          de: 'Visuelle Qualitätskontrolle – KI-gestützte Bildverarbeitung',
          en: 'Visual Quality Control – AI-powered Image Processing',
          icon: Eye,
          bulletsDE: [
            'Erkennt Lötstellen-, Bestückungs- und Oberflächenfehler zuverlässiger und schneller als das menschliche Auge',
            'Trainierte Modelle lernen produktspezifische Fehlerbilder – keine starren Schwellwerte',
            'Reduziert Nacharbeit, Ausschuss und Reklamationen in der Serienfertigung',
            'Läuft direkt auf der Fertigungslinie – kein Cloud-Anschluss erforderlich',
          ],
          bulletsEN: [
            'Detects solder joint, placement and surface defects more reliably and faster than the human eye',
            'Trained models learn product-specific defect patterns – no rigid thresholds',
            'Reduces rework, scrap and complaints in series production',
            'Runs directly on the production line – no cloud connection required',
          ],
        },
        {
          de: 'Edge-Inferenz auf Embedded-Zielen',
          en: 'Edge Inference on Embedded Targets',
          icon: Cpu,
          bulletsDE: [
            'KI-Modelle laufen direkt auf dem Mikrocontroller im Gerät – ohne Server, ohne Cloud, ohne Latenz',
            'Funktioniert auch ohne Netzwerkverbindung und unter rauen Industriebedingungen',
            'Minimaler Speicher- und Energiebedarf – geeignet für batteriebetriebene oder kostensensitive Produkte',
            'CME übernimmt Auswahl, Training und Deployment passend zur Zielhardware',
          ],
          bulletsEN: [
            'AI models run directly on the microcontroller in the device – no server, no cloud, no latency',
            'Works without network connection and under harsh industrial conditions',
            'Minimal memory and energy requirements – suitable for battery-powered or cost-sensitive products',
            'CME handles selection, training and deployment tailored to the target hardware',
          ],
        },
        {
          de: 'Datenaufbereitung & Feature Engineering',
          en: 'Data Preparation & Feature Engineering',
          icon: Database,
          bulletsDE: [
            'Rohdaten aus Prüfständen und Feldtests sind selten direkt nutzbar – CME bereitet sie systematisch auf',
            'Bereinigung, Normierung und Anreicherung für reproduzierbare, belastbare KI-Trainings',
            'Verhindert den häufigsten Fehler: Modelle, die im Labor funktionieren, aber in der Serie versagen',
            'Dokumentierte Datenpipelines für Nachvollziehbarkeit und Wiederverwendung',
          ],
          bulletsEN: [
            'Raw data from test benches and field tests is rarely directly usable – CME prepares it systematically',
            'Cleaning, normalization and enrichment for reproducible, reliable AI training',
            'Prevents the most common mistake: models that work in the lab but fail in production',
            'Documented data pipelines for traceability and reuse',
          ],
        },
        {
          de: 'TinyML & Modellkomprimierung',
          en: 'TinyML & Model Compression',
          icon: Zap,
          bulletsDE: [
            'Große KI-Modelle werden auf Bruchteile ihrer Größe reduziert – ohne wesentlichen Qualitätsverlust',
            'Ermöglicht KI-Funktionen auf kleinen, günstigen Prozessoren (ARM Cortex-M und vergleichbar)',
            'Kein teures Hardware-Upgrade nötig: KI-Intelligenz auf vorhandener Embedded-Plattform',
            'Quantisierung, Pruning und Destillation je nach Ressourcen- und Genauigkeitsanforderung',
          ],
          bulletsEN: [
            'Large AI models reduced to fractions of their size – without significant quality loss',
            'Enables AI functions on small, affordable processors (ARM Cortex-M and comparable)',
            'No expensive hardware upgrade needed: AI intelligence on existing embedded platform',
            'Quantization, pruning and distillation depending on resource and accuracy requirements',
          ],
        },
        {
          de: 'Modell-Lifecycle & Versionierung',
          en: 'Model Lifecycle & Versioning',
          icon: GitBranch,
          bulletsDE: [
            'Jede Modellversion ist dokumentiert, getestet und rückverfolgbar – wichtig für regulierte Branchen',
            'Klare Freigabeprozesse: kein Modell geht ohne Validierung in die Serie',
            'Versionskontrolle ermöglicht Rollback bei Feldauffälligkeiten ohne Systemausfall',
            'Kompatibel mit Anforderungen aus Automotive (ISO 26262), Medizintechnik und Industrie',
          ],
          bulletsEN: [
            'Every model version is documented, tested and traceable – important for regulated industries',
            'Clear release processes: no model goes into production without validation',
            'Version control enables rollback for field anomalies without system failure',
            'Compatible with requirements from automotive (ISO 26262), medical technology and industry',
          ],
        },
        {
          de: 'Integration in bestehende Systeme',
          en: 'Integration into Existing Systems',
          icon: Gauge,
          bulletsDE: [
            'KI-Funktionen werden in vorhandene Firmware-, RTOS- oder SPS-Umgebungen eingebettet – kein Neustart von null',
            'Keine Unterbrechung laufender Produktionslinien oder bestehender Systemarchitekturen',
            'CME analysiert das bestehende System und definiert den minimalen Integrationspfad',
            'Getestete Übergabe: Schnittstellen, Timing und Ressourcennutzung werden vorab validiert',
          ],
          bulletsEN: [
            'AI functions are embedded into existing firmware, RTOS or PLC environments – no restart from zero',
            'No interruption of running production lines or existing system architectures',
            'CME analyzes the existing system and defines the minimal integration path',
            'Tested handover: interfaces, timing and resource usage are validated in advance',
          ],
        },
        {
          de: 'Regulatorik & Dokumentation für KI-Systeme',
          en: 'Regulation & Documentation for AI Systems',
          icon: ShieldCheck,
          bulletsDE: [
            'KI in sicherheitsrelevanten Produkten braucht Nachweise – CME liefert die nötige Dokumentation',
            'Technische Unterlagen für Zulassungsprozesse nach EU AI Act, ISO 26262 und IEC 62061',
            'Erklärbarkeit von Modellentscheidungen (Explainability) als Voraussetzung für Zertifizierungen',
            'Unterstützung bei der Risikoklassifizierung und beim Konformitätsnachweis gegenüber Behörden',
          ],
          bulletsEN: [
            'AI in safety-relevant products requires evidence – CME provides the necessary documentation',
            'Technical documents for approval processes according to EU AI Act, ISO 26262 and IEC 62061',
            'Explainability of model decisions as a prerequisite for certifications',
            'Support with risk classification and conformity assessment for authorities',
          ],
        },
      ]}
    />
  );
}
