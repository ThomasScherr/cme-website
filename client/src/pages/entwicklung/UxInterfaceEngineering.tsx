import SubPageTemplate from '@/components/SubPageTemplate';
import { Scan, GitBranch, MonitorSmartphone, Layers, Factory } from 'lucide-react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

export default function UxInterfaceEngineering() {
  return (
    <SubPageTemplate
      pageKey="entwicklung.uxinterfaceengineering"
      parentHref="/entwicklung"
      parentLabelDE="Elektronikentwicklung"
      parentLabelEN="Electronics Development"
      titleDE="UX & HMI-Design für technische Systeme"
      titleEN="UX & HMI Design for Technical Systems"
      subtitleDE="Bediensoftware und UI/UX für technische Systeme – von der Nutzeranalyse bis zur serienreifen Umsetzung."
      subtitleEN="Operating software and UI/UX for technical systems – from user analysis to production-ready implementation."
      metaDescriptionDE="UX & Interface Engineering in Dortmund: Bediensoftware, HMI-Design und Nutzeranalyse für technische Systeme – von der Konzeption bis zur Serienreife."
      metaDescriptionEN="UX & interface engineering in Dortmund: operating software, HMI design and user analysis for technical systems – from concept to series production."
      heroImg={`${CDN}/operating-concepts_3d4b7f77.png`}
      introDE="Technische Systeme werden immer komplexer – aber die Menschen, die sie bedienen, werden nicht komplexer. Deshalb entwickeln wir bei CME Bediensoftware und Interfaces, die Komplexität beherrschbar machen. Unser UX-Engineering-Ansatz verbindet Nutzerforschung, Interaktionsdesign und technische Umsetzung zu einer durchgängigen Kette – von der ersten Analyse bis zur serienreifen Implementierung auf der Zielplattform."
      introEN="Technical systems are becoming increasingly complex – but the people who operate them are not. That's why at CME we develop operating software and interfaces that make complexity manageable. Our UX engineering approach combines user research, interaction design and technical implementation into a seamless chain – from initial analysis to production-ready implementation on the target platform."
      features={[
        {
          de: 'Nutzer- & Kontextanalyse',
          en: 'User & Context Analysis',
          icon: Scan,
          bulletsDE: [
            'Interviews & Beobachtungen im realen Einsatzumfeld',
            'Kontextszenarien & Nutzerprofile',
            'Anforderungsableitung aus tatsächlicher Nutzung',
          ],
          bulletsEN: [
            'Interviews & observations in real operating environments',
            'Context scenarios & user profiles',
            'Requirements derived from actual usage',
          ],
        },
        {
          de: 'Userflows & Interaktionslogik',
          en: 'User Flows & Interaction Logic',
          icon: GitBranch,
          bulletsDE: [
            'Zustandsdiagramme & Ablauflogiken',
            'Fehlertolerante Bedienabläufe',
            'Optimierung für Zeitdruck & sicherheitskritische Umgebungen',
          ],
          bulletsEN: [
            'State diagrams & workflow logic',
            'Fault-tolerant operating sequences',
            'Optimization for time pressure & safety-critical environments',
          ],
        },
        {
          de: 'Bedienkonzepte',
          en: 'Operating Concepts',
          icon: MonitorSmartphone,
          bulletsDE: [
            'Touchpanel, Drehgeber, physische Tasten',
            'Mensch-Maschine-Schnittstelle (HMI)',
            'Intuitive Bedienung unter realen Bedingungen',
          ],
          bulletsEN: [
            'Touchpanel, rotary encoder, physical buttons',
            'Human-machine interface (HMI)',
            'Intuitive operation under real conditions',
          ],
        },
        {
          de: 'Interface-Design & Prototyping',
          en: 'Interface Design & Prototyping',
          icon: Layers,
          bulletsDE: [
            'Wireframes & interaktive Prototypen',
            'Iterative Validierung vor Entwicklungsstart',
            'Kosten- und Risikominimierung durch frühes Testen',
          ],
          bulletsEN: [
            'Wireframes & interactive prototypes',
            'Iterative validation before development starts',
            'Cost and risk reduction through early testing',
          ],
        },
        {
          de: 'Seriennahe Umsetzung',
          en: 'Production-Ready Implementation',
          icon: Factory,
          bulletsDE: [
            'Umsetzung auf realer Zielplattform',
            'Berücksichtigung von Display, Prozessor & Speicher',
            'Begleitung bis zur Serienreife',
          ],
          bulletsEN: [
            'Implementation on actual target platform',
            'Consideration of display, processor & memory constraints',
            'Support through to series production readiness',
          ],
        },
      ]}
      ctaDE="UX-Konzept besprechen"
      ctaEN="Discuss UX concept"
    />
  );
}
