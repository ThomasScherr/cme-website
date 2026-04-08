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
      subtitleDE="Machine Learning und KI-Methoden für intelligentere Produkte – von der Datenanalyse bis zur Edge-Inferenz auf Embedded-Systemen."
      subtitleEN="Machine learning and AI methods for smarter products – from data analysis to edge inference on embedded systems."
      heroImg={`${CDN}/JK_2392__1920px_af02a6b7.jpg`}
      introDE="CME integriert KI-Methoden in die Elektronikentwicklung, um Produkte intelligenter und effizienter zu machen. Wir setzen Machine Learning ein, um Muster in Sensordaten zu erkennen, Regelungsstrategien zu optimieren und prädiktive Wartung zu ermöglichen. Von der Datenaufbereitung über das Modelltraining bis zur Inferenz auf ressourcenbeschränkten Embedded-Systemen – wir begleiten den gesamten Weg vom Algorithmus zum Serienprodukt."
      introEN="CME integrates AI methods into electronics development to make products smarter and more efficient. We use machine learning to detect patterns in sensor data, optimize control strategies and enable predictive maintenance. From data preparation through model training to inference on resource-constrained embedded systems – we accompany the entire path from algorithm to series product."
      features={[
        { de: 'Machine Learning für Sensordatenanalyse', en: 'Machine learning for sensor data analysis', icon: BrainCircuit },
        { de: 'KI-basierte Regelungsoptimierung', en: 'AI-based control optimization', icon: Gauge },
        { de: 'Predictive Maintenance & Anomalieerkennung', en: 'Predictive maintenance & anomaly detection', icon: BarChart3 },
        { de: 'Computer Vision für Qualitätskontrolle', en: 'Computer vision for quality control', icon: Eye },
        { de: 'Edge-Inferenz auf Embedded-Systemen', en: 'Edge inference on embedded systems', icon: Cpu },
        { de: 'Modelltraining & Datenaufbereitung', en: 'Model training & data preparation', icon: Database },
        { de: 'TinyML & Modellkomprimierung', en: 'TinyML & model compression', icon: Zap },
        { de: 'MLOps & Modell-Deployment', en: 'MLOps & model deployment', icon: GitBranch },
        { de: 'Integration in bestehende Systemarchitekturen', en: 'Integration into existing system architectures', icon: Settings },
      ]}
      relatedPages={[
        { href: '/entwicklung/hardware-software', titleDE: 'Hard & Software Design', titleEN: 'Hard & Software Design', img: `${CDN}/JK_2392__1920px_af02a6b7.jpg` },
        { href: '/entwicklung/software-digitale-systeme', titleDE: 'Software & Digitale Systeme', titleEN: 'Software & Digital Systems', img: `${CDN}/web-apps_26e3e533.png` },
        { href: '/entwicklung/simulation', titleDE: 'Simulation', titleEN: 'Simulation', img: `${CDN}/thermosimulation-1500x1000-1_77e2afd4.jpg` },
      ]}
    />
  );
}
