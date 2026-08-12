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

const CDN = 'https://ventspire-cdn.b-cdn.net/cme';

export default function ControlDesign() {
  return (
    <SubPageTemplate
      pageKey="entwicklung.controldesign"
      parentHref="/entwicklung"
      parentLabelDE="Elektronikentwicklung"
      parentLabelEN="Electronics Development"
      titleDE="Reglerdesign & Control Engineering"
      titleEN="Controller Design & Control Engineering"
      subtitleDE="Modellbasiertes Reglerdesign – Entwicklung und Verifikation von Regelalgorithmen entlang des V‑Modells."
      subtitleEN="Model-based controller design – development and verification of control algorithms along the V‑model."
      metaDescriptionDE="Modellbasiertes Reglerdesign in Dortmund: MIL/SIL/HIL-Simulation, FOC-Algorithmen und V‑Modell-Verifikation für Antriebssysteme und Leistungselektronik."
      metaDescriptionEN="Model-based controller design in Dortmund: MIL/SIL/HIL simulation, FOC algorithms and V-model verification for drive systems and power electronics."
      heroImg={`${CDN}/JK_2885__1920px_ecd3ed1e.jpg`}
      introDE="CME entwickelt Regelungskonzepte für anspruchsvolle Antriebssysteme und Leistungselektronik. Von der modellbasierten Funktionsentwicklung über MIL/SIL/HIL-Simulation bis zum Rapid-Control-Prototyping – wir verifizieren Regelalgorithmen systematisch entlang des V‑Modells, bevor sie in die Serienapplikation überführt werden. Unsere Erfahrung umfasst sensorlose Regelungsverfahren, FOC-Algorithmen und applikationsspezifische Regleranpassungen."
      introEN="CME develops control concepts for demanding drive systems and power electronics. From model-based function development through MIL/SIL/HIL simulation to rapid control prototyping – we systematically verify control algorithms along the V‑model before transferring them to series applications. Our experience includes sensorless control methods, FOC algorithms and application-specific controller adaptations."
      features={[
        {
          de: 'Modellbasierte Funktionsentwicklung nach V‑Modell',
          en: 'Model-Based Function Development According to V‑Model',
          icon: GitBranch,
          bulletsDE: [
            'Systematische Entwicklung vom Systemkonzept bis zur verifizierten Serienanwendung entlang des V‑Modells',
            'Anforderungen werden direkt in Matlab/Simulink-Modelle überführt – kein Medienbruch zwischen Spezifikation und Implementierung',
            'Automatische Code-Generierung aus validierten Modellen reduziert manuelle Fehler und beschleunigt die Serienüberführung',
            'Jede Entwicklungsstufe ist dokumentiert und nachvollziehbar – Voraussetzung für funktionale Sicherheit und Zulassungsprozesse',
          ],
          bulletsEN: [
            'Systematic development from system concept to verified series application along the V‑model',
            'Requirements are directly transferred into Matlab/Simulink models – no media break between specification and implementation',
            'Automatic code generation from validated models reduces manual errors and accelerates series transfer',
            'Every development stage is documented and traceable – prerequisite for functional safety and approval processes',
          ],
        },
        {
          de: 'MIL-, SIL- und HIL-Simulation',
          en: 'MIL, SIL and HIL Simulation',
          icon: Monitor,
          bulletsDE: [
            'Model-in-the-Loop (MIL): Regelungskonzepte werden im Modell getestet, bevor eine einzige Zeile Code geschrieben wird',
            'Software-in-the-Loop (SIL): Generierter Code wird gegen das Referenzmodell verifiziert – Abweichungen werden früh erkannt',
            'Hardware-in-the-Loop (HIL): Reale Steuergeräte werden gegen simulierte Lasten und Strecken getestet – unter reproduzierbaren Bedingungen',
            'Fehlerfälle und Grenzszenarien werden systematisch durchgespielt, ohne Gefahr für Mensch und Hardware',
          ],
          bulletsEN: [
            'Model-in-the-Loop (MIL): Control concepts are tested in the model before a single line of code is written',
            'Software-in-the-Loop (SIL): Generated code is verified against the reference model – deviations are detected early',
            'Hardware-in-the-Loop (HIL): Real control units are tested against simulated loads and plants – under reproducible conditions',
            'Fault cases and limit scenarios are systematically tested without risk to people or hardware',
          ],
        },
        {
          de: 'Rapid-Control-Prototyping',
          en: 'Rapid Control Prototyping',
          icon: Zap,
          bulletsDE: [
            'Regelungskonzepte laufen innerhalb von Stunden auf echter Hardware – ohne vollständige Serienentwicklung abwarten zu müssen',
            'Parametrierung und Strukturänderungen direkt im laufenden Betrieb möglich – schnelle Iterationen in der frühen Entwicklungsphase',
            'Brücke zwischen Simulation und realem System: Modellverhalten wird unter echten Lastbedingungen validiert',
            'Ergebnisse fließen direkt in die endgültige Firmware-Implementierung – kein Wissens- oder Datenverlust',
          ],
          bulletsEN: [
            'Control concepts run on real hardware within hours – without waiting for complete series development',
            'Parameterization and structural changes possible during live operation – fast iterations in the early development phase',
            'Bridge between simulation and real system: model behavior is validated under real load conditions',
            'Results flow directly into the final firmware implementation – no knowledge or data loss',
          ],
        },
        {
          de: 'Sensorlose Regelungsverfahren',
          en: 'Sensorless Control Methods',
          icon: SlidersHorizontal,
          bulletsDE: [
            'Drehzahl- und Lageerkennung ohne mechanischen Geber – reduziert Kosten, Bauraum und potenzielle Ausfallquellen',
            'BEMF-basierte Verfahren für mittlere und hohe Drehzahlen sowie HF-Injektionsverfahren für den Stillstand und Niedrigdrehzahlbereich',
            'Applikationsspezifische Abstimmung je nach Motortyp, Lastverhalten und Dynamikanforderung',
            'Besonders geeignet für Pumpen, Lüfter, Kompressoren und Servoantriebe mit begrenztem Einbauraum',
          ],
          bulletsEN: [
            'Speed and position detection without mechanical encoder – reduces cost, space and potential failure sources',
            'BEMF-based methods for medium and high speeds, plus HF injection methods for standstill and low-speed range',
            'Application-specific tuning depending on motor type, load behavior and dynamic requirements',
            'Particularly suitable for pumps, fans, compressors and servo drives with limited installation space',
          ],
        },
        {
          de: 'FOC-Algorithmen für BLDC/PMSM',
          en: 'FOC Algorithms for BLDC/PMSM',
          icon: RefreshCw,
          bulletsDE: [
            'Field Oriented Control (FOC) für bürstenlose Gleich- und Synchronmotoren – maximaler Wirkungsgrad über das gesamte Kennfeld',
            'MTPA-Strategie (Maximum Torque Per Ampere) für minimale Verluste bei gegebenem Drehmoment',
            'Feldschwächbetrieb für erweiterten Drehzahlbereich oberhalb der Nennspannung',
            'Implementierung auf Cortex-M- und DSP-Plattformen mit optimierter Rechenzeit für Regelzyklen unter 50 µs',
          ],
          bulletsEN: [
            'Field Oriented Control (FOC) for brushless DC and synchronous motors – maximum efficiency across the entire operating map',
            'MTPA strategy (Maximum Torque Per Ampere) for minimum losses at given torque',
            'Field weakening operation for extended speed range above nominal voltage',
            'Implementation on Cortex-M and DSP platforms with optimized computation time for control cycles under 50 µs',
          ],
        },
        {
          de: 'Transiente Zeitbereichsanalysen',
          en: 'Transient Time-Domain Analyses',
          icon: BarChart3,
          bulletsDE: [
            'Simulation des dynamischen Systemverhaltens bei Lastwechseln, Einschaltvorgängen und Fehlerzuständen',
            'Identifikation kritischer Überspannungen, Stromspitzen und thermischer Belastungen im transienten Betrieb',
            'Absicherung von Schutzfunktionen und Grenzwerten, bevor Hardware aufgebaut wird',
            'Grundlage für die Dimensionierung von Pufferkondensatoren, Snubbern und Schutzschaltungen',
          ],
          bulletsEN: [
            'Simulation of dynamic system behavior during load changes, switch-on processes and fault conditions',
            'Identification of critical overvoltages, current spikes and thermal loads in transient operation',
            'Validation of protection functions and limits before hardware is built',
            'Basis for dimensioning buffer capacitors, snubbers and protection circuits',
          ],
        },
        {
          de: 'Kundenspezifische Reglermodelle',
          en: 'Customer-Specific Controller Models',
          icon: Settings,
          bulletsDE: [
            'Entwicklung maßgeschneiderter Regelungsarchitekturen für nichtlineare, zeitvariante oder verkoppelte Systeme',
            'Kaskadenregler, Zustandsregler, prädiktive Regler (MPC) – je nach Anforderung an Dynamik, Robustheit und Rechenaufwand',
            'Modellidentifikation aus Messdaten, wenn analytische Modelle nicht verfügbar oder zu aufwändig sind',
            'Vollständige Parametrierung, Verifikation und Übergabe als dokumentiertes Simulink-Modell oder generierter C-Code',
          ],
          bulletsEN: [
            'Development of custom control architectures for nonlinear, time-variant or coupled systems',
            'Cascade controllers, state-space controllers, predictive controllers (MPC) – depending on requirements for dynamics, robustness and computational effort',
            'Model identification from measurement data when analytical models are unavailable or too complex',
            'Complete parameterization, verification and handover as documented Simulink model or generated C code',
          ],
        },
        {
          de: 'Worst-Case-Simulationen',
          en: 'Worst-Case Simulations',
          icon: Gauge,
          bulletsDE: [
            'Systematische Variation von Bauteilparametern, Temperaturen und Versorgungsspannungen zur Absicherung gegen Extremszenarien',
            'Monte-Carlo-Analysen für statistische Aussagen über Fertigungsstreuungen und Langzeitdrift',
            'Nachweis der Funktionsfähigkeit über den gesamten Betriebsbereich – Grundlage für Zulassungen und Kundenabnahmen',
            'Früherkennung von Designschwächen ohne aufwändige Messreihen an realer Hardware',
          ],
          bulletsEN: [
            'Systematic variation of component parameters, temperatures and supply voltages to safeguard against extreme scenarios',
            'Monte Carlo analyses for statistical statements on manufacturing tolerances and long-term drift',
            'Proof of functionality across the entire operating range – basis for approvals and customer acceptance',
            'Early detection of design weaknesses without costly measurement series on real hardware',
          ],
        },
        {
          de: 'Integration Motor/Elektronik/Regelung',
          en: 'Integration Motor/Electronics/Control',
          icon: Cpu,
          bulletsDE: [
            'Ganzheitliche Systembetrachtung: Motor, Leistungselektronik und Regelung werden als Einheit entwickelt und optimiert',
            'Co-Simulation von elektromagnetischem Motormodell, Leistungsstufe und Regelalgorithmus in einer Umgebung',
            'Abstimmung von Schaltfrequenz, Totzeit, Filterdimensionierung und Reglerparametern als Gesamtsystem',
            'Übergabe an die Serienfertigung mit vollständig validiertem Parametersatz und Inbetriebnahme-Dokumentation',
          ],
          bulletsEN: [
            'Holistic system view: motor, power electronics and control are developed and optimized as a unit',
            'Co-simulation of electromagnetic motor model, power stage and control algorithm in one environment',
            'Tuning of switching frequency, dead time, filter dimensioning and controller parameters as a complete system',
            'Handover to series production with fully validated parameter set and commissioning documentation',
          ],
        },
      ]}
          enPath="/en/development/control-design"
    />
  );
}
