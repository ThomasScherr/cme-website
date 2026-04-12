import SubPageTemplate from '@/components/SubPageTemplate';
import {
  SlidersHorizontal,
  GitBranch,
  Monitor,
  Cpu,
  Gauge,
  BarChart3,
  Zap,
  RefreshCw,
  Settings,
} from 'lucide-react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

export default function ControlDesign() {
  return (
    <SubPageTemplate
      pageKey="entwicklung.controldesign"
      parentHref="/entwicklung"
      parentLabelDE="Elektronikentwicklung"
      parentLabelEN="Electronics Development"
      titleDE="Control Design"
      titleEN="Control Design"
      subtitleDE="Modellbasiertes Reglerdesign – Entwicklung und Verifikation von Regelalgorithmen entlang des V-Modells."
      subtitleEN="Model-based controller design – development and verification of control algorithms along the V-model."
      heroImg={`${CDN}/JK_2885__1920px_ecd3ed1e.jpg`}
      introDE="CME entwickelt Regelungskonzepte für anspruchsvolle Antriebssysteme und Leistungselektronik. Von der modellbasierten Funktionsentwicklung über MIL/SIL/HIL-Simulation bis zum Rapid-Control-Prototyping – wir verifizieren Regelalgorithmen systematisch entlang des V-Modells, bevor sie in die Serienapplikation überführt werden. Unsere Erfahrung umfasst sensorlose Regelungsverfahren, FOC-Algorithmen und applikationsspezifische Regleranpassungen."
      introEN="CME develops control concepts for demanding drive systems and power electronics. From model-based function development through MIL/SIL/HIL simulation to rapid control prototyping – we systematically verify control algorithms along the V-model before transferring them to series applications. Our experience includes sensorless control methods, FOC algorithms and application-specific controller adaptations."
      features={[
        { de: 'Modellbasierte Funktionsentwicklung nach V-Modell', en: 'Model-based function development according to V-model', icon: GitBranch },
        { de: 'MIL-, SIL- und HIL-Simulation', en: 'MIL, SIL and HIL simulation', icon: Monitor },
        { de: 'Rapid-Control-Prototyping', en: 'Rapid control prototyping', icon: Zap },
        { de: 'Sensorlose Regelungsverfahren', en: 'Sensorless control methods', icon: SlidersHorizontal },
        { de: 'FOC-Algorithmen für BLDC/PMSM', en: 'FOC algorithms for BLDC/PMSM', icon: RefreshCw },
        { de: 'Transiente Zeitbereichsanalysen', en: 'Transient time-domain analyses', icon: BarChart3 },
        { de: 'Kundenspezifische Reglermodelle', en: 'Customer-specific controller models', icon: Settings },
        { de: 'Worst-Case-Simulationen', en: 'Worst-case simulations', icon: Gauge },
        { de: 'Integration Motor/Elektronik/Regelung', en: 'Integration motor/electronics/control', icon: Cpu },
      ]}
    />
  );
}
