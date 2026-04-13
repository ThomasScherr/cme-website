import SubPageTemplate from '@/components/SubPageTemplate';
import {
  Cog,
  Target,
  Thermometer,
  Layers,
  BarChart3,
  Gauge,
  Zap,
  Settings,
  Cpu,
} from 'lucide-react';

export default function EMotorDesign() {
  return (
    <SubPageTemplate
      pageKey="entwicklung.emotordesign"
      parentHref="/entwicklung"
      parentLabelDE="Elektronikentwicklung"
      parentLabelEN="Electronics Development"
      titleDE="E-Motor Design"
      titleEN="E-Motor Design"
      subtitleDE="Auslegung, Berechnung und Optimierung von Elektromotoren – vom Konzept bis zur serienreifen Lösung."
      subtitleEN="Design, calculation and optimization of electric motors – from concept to series-ready solution."
      heroImg="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_1736__1920px_e713f7ca.jpg"
      introDE="CME wählt für Ihre Applikation den passenden Elektromotor aus und optimiert das Design entsprechend Ihren Vorgaben. Unsere Experten berechnen und simulieren Magnetkreise, Blechschnitte und thermische Belastungen – für Motoren mit besonders hohem Wirkungsgrad, auch unter rauen Umgebungsbedingungen und bei hohen Temperaturen. Durch die enge Verzahnung von E-Motor-Design, Leistungselektronik und Regelungstechnik entstehen optimal aufeinander abgestimmte Antriebssysteme."
      introEN="CME selects the right electric motor for your application and optimizes the design according to your specifications. Our experts calculate and simulate magnetic circuits, lamination cuts and thermal loads – for motors with particularly high efficiency, even under harsh environmental conditions and at high temperatures. Through the close integration of e-motor design, power electronics and control engineering, optimally coordinated drive systems are created."
      features={[
        {
          de: 'Auslegung & Design von EC-, DC- und Synchronmaschinen',
          en: 'Design of EC, DC and synchronous machines',
          icon: Cog,
          bulletsDE: [
            'Konzeptionierung und Auslegung bürstenloser EC-Motoren, DC-Motoren und PMSM',
            'Dimensionierung von Drehmoment, Drehzahl, Wirkungsgrad und Baugröße nach Lastprofil',
            'Anpassung an Betriebsbedingungen: Dauerbetrieb, Spitzenlast, Taktbetrieb',
            'Entwicklung kundenspezifischer Motorgeometrien für OEM-Applikationen',
          ],
          bulletsEN: [
            'Conceptualization and design of brushless EC motors, DC motors and PMSM',
            'Dimensioning of torque, speed, efficiency and frame size per load profile',
            'Adaptation to operating conditions: continuous, peak load, intermittent duty',
            'Development of custom motor geometries for OEM applications',
          ],
        },
        {
          de: 'Geometrie-Design des Magnetkreises (Rotor & Stator)',
          en: 'Magnetic circuit geometry design (rotor & stator)',
          icon: Target,
          bulletsDE: [
            'Auslegung von Rotor- und Statorgeometrie für optimalen magnetischen Fluss',
            'Nutengeometrie, Wicklungsschema und Polzahl-Optimierung',
            'Minimierung von Rastmoment (Cogging) und Drehmomentwelligkeit',
            'Einsatz von Permanentmagneten (Ferrit, NdFeB) nach thermischen und kostenspezifischen Anforderungen',
          ],
          bulletsEN: [
            'Design of rotor and stator geometry for optimal magnetic flux',
            'Slot geometry, winding scheme and pole count optimization',
            'Minimization of cogging torque and torque ripple',
            'Use of permanent magnets (ferrite, NdFeB) per thermal and cost requirements',
          ],
        },
        {
          de: 'Blechschnitt-Konstruktion',
          en: 'Lamination construction',
          icon: Layers,
          bulletsDE: [
            'Konstruktion von Stanzgeometrien für Rotor- und Statorbleche',
            'Werkstoffauswahl (z. B. NO20, M270-35A) nach Verlustvorgaben',
            'Optimierung der Blechpaketierung für Fertigungseffizienz und Toleranzrobustheit',
            'Berücksichtigung von Stanzprozess und Werkzeugauslegung in der Konstruktionsphase',
          ],
          bulletsEN: [
            'Design of stamping geometries for rotor and stator laminations',
            'Material selection (e.g. NO20, M270-35A) per loss specifications',
            'Optimization of lamination stacking for manufacturing efficiency and tolerance robustness',
            'Consideration of stamping process and tooling design in the construction phase',
          ],
        },
        {
          de: 'Auslegung für Hochtemperaturanwendungen',
          en: 'Design for high-temperature applications',
          icon: Thermometer,
          bulletsDE: [
            'Motordimensionierung für Dauerbetrieb bei erhöhten Umgebungstemperaturen (bis 180 °C+)',
            'Auswahl temperaturstabiler Werkstoffe: Isolationsklasse H/C, Hochtemperatur-Magnete',
            'Thermische Simulation und Validierung im Betriebsprofil',
            'Qualifizierung für automotive und industrielle Hochlastanwendungen',
          ],
          bulletsEN: [
            'Motor dimensioning for continuous operation at elevated ambient temperatures (up to 180 °C+)',
            'Selection of temperature-stable materials: insulation class H/C, high-temperature magnets',
            'Thermal simulation and validation in operating profile',
            'Qualification for automotive and industrial high-load applications',
          ],
        },
        {
          de: 'Elektromagnetische FEM-Simulation (Motor-CAD / ANSYS)',
          en: 'Electromagnetic FEM simulation (Motor-CAD / ANSYS)',
          icon: BarChart3,
          bulletsDE: [
            'Numerische Feldberechnung mit Motor-CAD und ANSYS Maxwell',
            'Analyse von Flussdichte, Wirbelstromverlusten und Sättigungsverhalten',
            'Thermisch-elektromagnetische Co-Simulation für realitätsnahe Betriebspunkte',
            'Iterative Optimierung von Geometrie und Wicklung auf Basis der Simulationsergebnisse',
          ],
          bulletsEN: [
            'Numerical field calculation with Motor-CAD and ANSYS Maxwell',
            'Analysis of flux density, eddy current losses and saturation behavior',
            'Thermal-electromagnetic co-simulation for realistic operating points',
            'Iterative optimization of geometry and winding based on simulation results',
          ],
        },
        {
          de: 'Analytische Berechnung & Optimierung',
          en: 'Analytical calculation & optimization',
          icon: Gauge,
          bulletsDE: [
            'Analytische Auslegung nach gängigen Maschinengleichungen (Kp, Ke, L, R)',
            'Wirkungsgradoptimierung über gesamtes Drehzahl-/Drehmomentkennfeld',
            'Verlustaufteilung: Kupferverluste, Eisenverluste, mechanische Verluste',
            'Abgleich analytischer Ergebnisse mit Simulationsdaten und Messung',
          ],
          bulletsEN: [
            'Analytical design per common machine equations (Kp, Ke, L, R)',
            'Efficiency optimization across entire speed/torque characteristic',
            'Loss breakdown: copper losses, iron losses, mechanical losses',
            'Comparison of analytical results with simulation data and measurements',
          ],
        },
        {
          de: 'Applikationsspezifische Motorauswahl',
          en: 'Application-specific motor selection',
          icon: Settings,
          bulletsDE: [
            'Anforderungsanalyse und Lastprofil-Auswertung für die optimale Motortopologie',
            'Vergleich und Bewertung von Standardmotoren vs. kundenspezifischer Entwicklung',
            'Total-Cost-of-Ownership-Betrachtung inkl. Energiekosten und Lebensdauer',
            'Herstellerunabhängige Beratung und Qualifizierung geeigneter Antriebslösungen',
          ],
          bulletsEN: [
            'Requirements analysis and load profile evaluation for optimal motor topology',
            'Comparison and assessment of standard motors vs. custom development',
            'Total cost of ownership analysis incl. energy costs and lifetime',
            'Manufacturer-independent consulting and qualification of suitable drive solutions',
          ],
        },
        {
          de: 'Integration mit Leistungselektronik & Regelung',
          en: 'Integration with power electronics & control',
          icon: Zap,
          bulletsDE: [
            'Systemabstimmung zwischen Motor, Inverter und Regelungsalgorithmus',
            'Auslegung von Zwischenkreis, Shunt-Messung und Gate-Driver-Topologie',
            'Abstimmung von PWM-Frequenz, Totzeit und EMV-Verhalten auf den Motor',
            'Validierung des Gesamtsystems im Hardware-in-the-Loop-Betrieb',
          ],
          bulletsEN: [
            'System coordination between motor, inverter and control algorithm',
            'Design of DC link, shunt measurement and gate driver topology',
            'Tuning of PWM frequency, dead time and EMC behavior to the motor',
            'Validation of the overall system in hardware-in-the-loop operation',
          ],
        },
        {
          de: 'Ansteuerstrategien für EC-Antriebe (Effizienz, Geräusch, Robustheit)',
          en: 'Drive strategies for EC motors (efficiency, noise, robustness)',
          icon: Cpu,
          bulletsDE: [
            'Implementierung von FOC, MTPA und Feldschwächung für erweiterten Drehzahlbereich',
            'Geräuschoptimierte Ansteuerung durch Oberschwingungsminimierung und Zufalls-PWM',
            'Sensorlose Drehzahl-/Lageerkennung (BEMF, HF-Injektion)',
            'Robustheitsstrategien: Kurzschlussschutz, Temperaturbegrenzung, Fehlertoleranz',
          ],
          bulletsEN: [
            'Implementation of FOC, MTPA and field weakening for extended speed range',
            'Noise-optimized control through harmonic minimization and random PWM',
            'Sensorless speed/position detection (BEMF, HF injection)',
            'Robustness strategies: short-circuit protection, temperature limiting, fault tolerance',
          ],
        },
      ]}
    />
  );
}
