import SubPageTemplate from '@/components/SubPageTemplate';
import {
  Network,
  CircuitBoard,
  Zap,
  Cog,
  Layers,
  Code,
  Cpu,
  Wifi,
  ShieldCheck,
} from 'lucide-react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

export default function HardwareSoftware() {
  return (
    <SubPageTemplate
      parentHref="/entwicklung"
      parentLabelDE="Elektronikentwicklung"
      parentLabelEN="Electronics Development"
      titleDE="Hardware & Software"
      titleEN="Hardware & Software"
      subtitleDE="Von der Systemarchitektur über Schaltungsentwicklung und PCB-Layout bis zur Embedded-Firmware."
      subtitleEN="From system architecture through circuit design and PCB layout to embedded firmware."
      heroImg="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2392__1920px_af02a6b7.jpg"
      introDE="CME entwickelt Hardware und Software als integrierte Einheit. Unsere Ingenieure arbeiten von der Systemspezifikation über die Schaltungsentwicklung und das PCB-Layout bis zur Embedded-Firmware eng zusammen. Durch die enge Verzahnung mit unserer eigenen Fertigung fließen DfM-Anforderungen bereits in der Entwicklungsphase ein – das spart Zeit und Kosten in der Serienüberführung."
      introEN="CME develops hardware and software as an integrated unit. Our engineers work closely together from system specification through circuit design and PCB layout to embedded firmware. Through close integration with our own manufacturing, DfM requirements flow into the development phase early – saving time and costs in series transition."
      features={[
        { de: 'Systemarchitektur & Anforderungsmanagement', en: 'System Architecture & Requirements Management', icon: Network },
        { de: 'Analoge & digitale Schaltungsentwicklung', en: 'Analog & Digital Circuit Design', icon: CircuitBoard },
        { de: 'Leistungselektronik (SiC, GaN, IGBT)', en: 'Power Electronics (SiC, GaN, IGBT)', icon: Zap },
        { de: 'Antriebselektronik & Motor Control', en: 'Drive Electronics & Motor Control', icon: Cog },
        { de: 'Multi-Layer PCB-Layout (bis 24 Lagen)', en: 'Multi-Layer PCB Layout (up to 24 layers)', icon: Layers },
        { de: 'Embedded C/C++ Firmware', en: 'Embedded C/C++ Firmware', icon: Code },
        { de: 'FPGA-Entwicklung', en: 'FPGA Development', icon: Cpu },
        { de: 'Kommunikationsschnittstellen (CAN, LIN, SPI, Ethernet)', en: 'Communication Interfaces (CAN, LIN, SPI, Ethernet)', icon: Wifi },
        { de: 'Funktionale Sicherheit (ISO 26262)', en: 'Functional Safety (ISO 26262)', icon: ShieldCheck },
      ]}
      gallery={[
        { img: `${CDN}/e-motor-design_3c371049.png`, captionDE: 'E-Motor Design – FEM-Simulation', captionEN: 'E-Motor Design – FEM Simulation' },
        { img: `${CDN}/control-design_62833780.png`, captionDE: 'Control Design – Simulink-Modell', captionEN: 'Control Design – Simulink Model' },
        { img: `${CDN}/dental-assembly_05a6609d.png`, captionDE: 'Entwicklung & Fertigung aus einer Hand', captionEN: 'Development & Manufacturing from One Source' },
      ]}
      galleryTitleDE="Entwicklungsbeispiele"
      galleryTitleEN="Development Examples"
      relatedPages={[
        { href: '/entwicklung/simulation', titleDE: 'Simulation', titleEN: 'Simulation', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/thermosimulation-1500x1000-1_77e2afd4.jpg' },
        { href: '/entwicklung/test-verifikation', titleDE: 'Test & Verifikation', titleEN: 'Test & Verification', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2885__1920px_ecd3ed1e.jpg' },
      ]}
    />
  );
}
