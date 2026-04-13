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
  ChevronDown,
  Cog,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FAQ JSON-LD is passed via additionalSchemas prop to SubPageTemplate

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

/* ── FAQ Data ─────────────────────────────────────────────────── */
const faqItems = [
  {
    questionDE: 'Welche konkreten Erfahrungen hat CME mit KI – und was sind Ihre eigenen Anwendungsfälle?',
    questionEN: 'What concrete experience does CME have with AI – and what are your own use cases?',
    answerDE: 'CME nutzt KI aktiv in der eigenen Entwicklungsarbeit: unter anderem für KI-gestützte Simulationssysteme zur Motorparametrisierung und Ansteuerungsoptimierung. Außerdem setzen wir KI-Werkzeuge in der Hardware- und Softwareentwicklung selbst ein – zur Beschleunigung von Entwurf, Verifikation und Dokumentation. Wir sind kein theoretisches Forschungsinstitut, sondern ein Entwicklungspartner der KI dort einsetzt, wo er selbst davon profitiert.',
    answerEN: 'CME actively uses AI in its own development work: including AI-powered simulation systems for motor parameterization and control optimization. We also use AI tools in hardware and software development itself – to accelerate design, verification and documentation. We are not a theoretical research institute, but a development partner that uses AI where it benefits from it.',
  },
  {
    questionDE: 'Ist das wirklich KI – oder ist das einfach Machine Learning wie seit 30 Jahren?',
    questionEN: 'Is this really AI – or is it just Machine Learning as it has been for 30 years?',
    answerDE: 'Beides, und das ist keine schlechte Nachricht. Was heute „KI in der Industrie" heißt, ist überwiegend Machine Learning – Methoden die seit Jahrzehnten bekannt sind, aber erst durch moderne Hardware praktisch umsetzbar wurden. Was sich geändert hat: Modelle die früher einen Großrechner brauchten laufen heute auf einem 2-Euro-Mikrocontroller. CME kombiniert diese Methoden mit tiefer Elektronik- und Antriebskompetenz – das ist der Unterschied zu generischen KI-Dienstleistern.',
    answerEN: 'Both, and that\'s not bad news. What is called "AI in industry" today is predominantly machine learning – methods that have been known for decades but only became practically feasible through modern hardware. What has changed: models that used to require a mainframe now run on a 2-euro microcontroller. CME combines these methods with deep electronics and drive expertise – that\'s the difference to generic AI service providers.',
  },
  {
    questionDE: 'Wann lohnt sich KI – und wann ist ein klassischer Algorithmus die bessere Wahl?',
    questionEN: 'When is AI worthwhile – and when is a classical algorithm the better choice?',
    answerDE: 'Ein klassischer Regler oder Algorithmus ist oft die bessere Wahl – und CME empfiehlt ihn, wenn das System gut verstanden und mathematisch beschreibbar ist. KI wird sinnvoll, wenn das Verhalten nichtlinear oder schwer modellierbar ist, wenn große Mengen an Messdaten vorliegen, oder wenn manuelle Parametrierung zu aufwändig ist. Wir beraten ehrlich – nicht jedes Problem braucht KI.',
    answerEN: 'A classical controller or algorithm is often the better choice – and CME recommends it when the system is well understood and mathematically describable. AI becomes useful when behavior is nonlinear or hard to model, when large amounts of measurement data are available, or when manual parameterization is too costly. We advise honestly – not every problem needs AI.',
  },
  {
    questionDE: 'Muss mein Produkt mit der Cloud verbunden sein?',
    questionEN: 'Does my product need to be connected to the cloud?',
    answerDE: 'Nein. CME entwickelt Modelle die direkt auf dem Mikrocontroller oder Prozessor im Gerät laufen – ohne Internetverbindung, ohne Server, ohne Latenz. Das ist besonders relevant für Antriebselektronik, Industriesteuerungen und alle Anwendungen mit Echtzeitanforderungen. Die KI läuft dort wo das Gerät ist – auch in der Fabrikhalle ohne Netzwerk, auch im Fahrzeug, auch im Feld.',
    answerEN: 'No. CME develops models that run directly on the microcontroller or processor in the device – without internet connection, without server, without latency. This is particularly relevant for drive electronics, industrial controls and all applications with real-time requirements. The AI runs where the device is – in the factory without a network, in the vehicle, in the field.',
  },
  {
    questionDE: 'Welche Hardware brauche ich – muss ich mein bestehendes System ersetzen?',
    questionEN: 'What hardware do I need – do I have to replace my existing system?',
    answerDE: 'In den meisten Fällen nicht. CME passt die Modelle an die vorhandene Hardware an – auch an kleine, kostengünstige Mikrocontroller. Das Ziel ist immer die Integration in das bestehende System, nicht der Austausch. Ob das technisch möglich ist, klären wir nach einer kurzen Analyse Ihrer Systemarchitektur.',
    answerEN: 'In most cases, no. CME adapts the models to existing hardware – including small, cost-effective microcontrollers. The goal is always integration into the existing system, not replacement. Whether this is technically feasible, we clarify after a brief analysis of your system architecture.',
  },
  {
    questionDE: 'Was ist, wenn wir noch keine Daten haben?',
    questionEN: 'What if we don\'t have any data yet?',
    answerDE: 'Das ist kein Ausschlusskriterium. CME unterstützt beim Aufbau einer Datenerfassungsstrategie: Welche Signale sind relevant? Wie lange muss gemessen werden? Wie werden Daten sinnvoll strukturiert? Erst wenn ausreichend qualitative Daten vorliegen beginnt das Modelltraining – das spart Zeit und vermeidet Modelle die auf schlechter Datenbasis schlechte Ergebnisse liefern.',
    answerEN: 'That\'s not an exclusion criterion. CME supports the development of a data acquisition strategy: Which signals are relevant? How long must measurements be taken? How should data be structured meaningfully? Model training only begins when sufficient quality data is available – this saves time and avoids models that deliver poor results based on poor data.',
  },
  {
    questionDE: 'Wie lange dauert ein erstes KI-Projekt?',
    questionEN: 'How long does a first AI project take?',
    answerDE: 'Ein erstes lauffähiges Modell für einen klar definierten Anwendungsfall ist oft in 4–8 Wochen möglich. Der Weg von dort zur serienreifen Integration hängt von der Systemumgebung und den Validierungsanforderungen ab. CME gibt nach einer Erstanalyse eine realistische Einschätzung – keine Pauschalversprechen.',
    answerEN: 'A first working model for a clearly defined use case is often possible in 4–8 weeks. The path from there to series-ready integration depends on the system environment and validation requirements. CME provides a realistic assessment after an initial analysis – no blanket promises.',
  },
  {
    questionDE: 'Ist KI in sicherheitsrelevanten Produkten zertifizierbar?',
    questionEN: 'Is AI certifiable in safety-relevant products?',
    answerDE: 'Unter bestimmten Voraussetzungen ja. CME dokumentiert Modelle, Trainingsdaten und Validierungsergebnisse nachvollziehbar – als Grundlage für regulierte Zulassungsprozesse. Die konkrete Strategie hängt vom Anwendungsfall und der Zielbranche ab. Wir begleiten diesen Prozess – von der Risikoklassifizierung bis zur Dokumentation für Behörden.',
    answerEN: 'Under certain conditions, yes. CME documents models, training data and validation results transparently – as a basis for regulated approval processes. The specific strategy depends on the use case and target industry. We accompany this process – from risk classification to documentation for authorities.',
  },
];

/* ── FAQ Accordion Item ───────────────────────────────────────── */
function FaqItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between py-5 px-1 text-left group hover:text-[#0080C8] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="fluid-body font-semibold text-cme-dark group-hover:text-[#0080C8] transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          className={`shrink-0 mt-1 text-[#0080C8] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="fluid-body text-gray-600 leading-relaxed pb-5 px-1">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────────── */
export default function KiEntwicklung() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  /* JSON-LD FAQ Schema */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: isDE ? item.questionDE : item.questionEN,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isDE ? item.answerDE : item.answerEN,
      },
    })),
  };

  return (
    <>
      <SubPageTemplate
        additionalSchemas={[faqSchema]}
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
            de: 'KI-gestützte Motorparametrisierung & Simulation',
            en: 'AI-Powered Motor Parameterization & Simulation',
            icon: Cog,
            bulletsDE: [
              'Automatisierte Bestimmung von Motorparametern durch KI-gestützte Simulation statt zeitaufwändiger manueller Messkampagnen',
              'Virtuelle Inbetriebnahme von Antriebssystemen: Regelverhalten und Wirkungsgrad werden simuliert bevor Hardware existiert',
              'Modellbasierte Optimierung von Ansteuerstrategien auf Basis realer Betriebspunkte und Lastprofile',
              'Direkter Brückenschlag zwischen Simulation und Embedded-Implementierung – keine Medienbrüche, kein Datenverlust',
            ],
            bulletsEN: [
              'Automated determination of motor parameters through AI-powered simulation instead of time-consuming manual measurement campaigns',
              'Virtual commissioning of drive systems: control behavior and efficiency are simulated before hardware exists',
              'Model-based optimization of control strategies based on real operating points and load profiles',
              'Direct bridge between simulation and embedded implementation – no media breaks, no data loss',
            ],
          },
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
        afterFeatures={
          /* ── FAQ Section ─────────────────────────────────────── */
          <section className="section-pad bg-gray-50">
            <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ maxWidth: 'min(80%, 72rem)' }}>
              <h2 className="fluid-h2 text-cme-dark text-center" style={{ marginBottom: 'var(--space-section-header)' }}>
                {isDE ? 'Häufige Fragen' : 'Frequently Asked Questions'}
              </h2>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{ padding: 'var(--space-gap-sm) var(--space-gap-md)' }}>
                {faqItems.map((item, index) => (
                  <FaqItem
                    key={index}
                    question={isDE ? item.questionDE : item.questionEN}
                    answer={isDE ? item.answerDE : item.answerEN}
                    isOpen={openFaq === index}
                    onToggle={() => toggleFaq(index)}
                  />
                ))}
              </div>
            </div>
          </section>
        }
      />
    </>
  );
}
