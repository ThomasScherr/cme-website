import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import SubPageHero from '@/components/SubPageHero';
import ContactSlider from '@/components/ContactSlider';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Link } from 'wouter';
import {
  ArrowRight, Cpu, Cog, SlidersHorizontal, Waves, ShieldCheck, FlaskConical,
  Zap, Thermometer, BatteryCharging, Gauge, Radio, Microchip, RefreshCw,
  MonitorSmartphone, CircuitBoard, Wrench, Search, Users, CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

/* ══════════════════════════════════════════════════════════════════
   16 FAQs in 3 Clustern – bilingual (DE / EN)
   Cluster 1: Prozess & Leistung (FAQ 1–4)
   Cluster 2: Technologie & Kompetenz (FAQ 5–8)
   Cluster 3: Branchen & Anwendung (FAQ 9–16)
   ══════════════════════════════════════════════════════════════════ */

const faqCluster1 = [
  {
    questionDE: 'Wie läuft ein Elektronikentwicklungsprojekt bei CME ab – vom Konzept bis zur Serie?',
    questionEN: 'How does an electronics development project work at CME – from concept to series production?',
    answerDE: 'Jedes Projekt startet mit einer Machbarkeitsanalyse, in der wir Ihre Anforderungen, Normen und Zielkosten bewerten. Darauf folgen Schaltungsentwurf, Simulation und Layout – parallel dazu entwickeln wir die Embedded-Software und das Reglerdesign. Nach der Prototypenfertigung durchlaufen alle Baugruppen unsere Validierung inklusive EMV-Prüfung und Umwelttests. Anschließend begleiten wir den Serienanlauf – unabhängig davon, ob Sie die Fertigung bei CME, bei einem anderen EMS-Partner oder in Eigenregie durchführen. Sie entscheiden frei: nur Entwicklung, nur Fertigung oder beides aus einer Hand.',
    answerEN: 'Every project begins with a feasibility analysis where we evaluate your requirements, applicable standards, and target costs. This is followed by circuit design, simulation, and layout – while embedded software and controller design are developed in parallel. After prototype manufacturing, all assemblies undergo our validation process including EMC testing and environmental tests. We then accompany the series ramp-up – regardless of whether you choose CME, another EMS partner, or in-house manufacturing. You decide freely: development only, manufacturing only, or both from a single source.',
  },
  {
    questionDE: 'Welche Unterlagen benötigt CME für eine Entwicklungsanfrage?',
    questionEN: 'What documents does CME need for a development inquiry?',
    answerDE: 'Im Idealfall liegt ein Lastenheft oder eine technische Spezifikation vor – aber das ist keine Voraussetzung. Oft starten wir mit einer Funktionsbeschreibung, einer Skizze oder einem bestehenden Produkt, das weiterentwickelt werden soll. Unsere Ingenieure erarbeiten gemeinsam mit Ihnen die Anforderungen und erstellen bei Bedarf das Pflichtenheft. Wichtig sind vor allem: die gewünschte Funktion, die Einsatzumgebung (Temperatur, Vibration, Schutzart), relevante Normen (z. B. IEC 60601 für Medizintechnik oder ISO 26262 für Automotive) und die geplanten Stückzahlen.',
    answerEN: 'Ideally, you provide a requirements specification or technical document – but this is not a prerequisite. We often start with a functional description, a sketch, or an existing product that needs further development. Our engineers work with you to define the requirements and create a detailed specification if needed. The key information we need includes: the desired function, the operating environment (temperature, vibration, protection class), relevant standards (e.g., IEC 60601 for medical devices or ISO 26262 for automotive), and planned production volumes.',
  },
  {
    questionDE: 'Was kostet eine Elektronikentwicklung und wie lange dauert sie?',
    questionEN: 'How much does electronics development cost and how long does it take?',
    answerDE: 'Die Kosten hängen von der Komplexität ab: Ein einfaches Sensorboard kann im niedrigen fünfstelligen Bereich liegen, eine komplexe Leistungselektronik mit Funktionaler Sicherheit im sechsstelligen Bereich. Typische Entwicklungszeiten reichen von 3 Monaten für überschaubare Projekte bis zu 12–18 Monaten für normkonforme Systeme mit Zulassung. Wir arbeiten mit transparenten Meilensteinen und bieten nach der Machbarkeitsanalyse eine belastbare Kosten- und Zeitschätzung. So behalten Sie volle Kontrolle über Budget und Zeitplan.',
    answerEN: 'Costs depend on complexity: a simple sensor board may be in the low five-figure range, while complex power electronics with functional safety can reach six figures. Typical development timelines range from 3 months for straightforward projects to 12–18 months for standards-compliant systems requiring certification. We work with transparent milestones and provide a reliable cost and timeline estimate after the feasibility analysis. This gives you full control over budget and schedule.',
  },
  {
    questionDE: 'Kann CME auch bestehende Elektronik redesignen oder weiterentwickeln?',
    questionEN: 'Can CME redesign or further develop existing electronics?',
    answerDE: 'Ja, Redesign und Weiterentwicklung gehören zu unseren Kernleistungen. Typische Anlässe sind Bauteilabkündigungen (Obsoleszenz-Management), Kostenoptimierung, Leistungssteigerung oder die Anpassung an neue Normen. Wir analysieren Ihr bestehendes Design, identifizieren Optimierungspotenziale und führen das Redesign durch – inklusive Simulation und Validierung. Den Serienanlauf begleiten wir in jedem Fall, unabhängig davon, wer die Fertigung übernimmt. Sie haben die freie Wahl: CME kann sowohl die Entwicklung als auch die Fertigung übernehmen – oder Sie beauftragen uns gezielt nur mit einem der beiden Bereiche.',
    answerEN: 'Yes, redesign and further development are among our core services. Typical triggers include component obsolescence management, cost optimization, performance improvement, or adaptation to new standards. We analyze your existing design, identify optimization potential, and carry out the redesign – including simulation and validation. We accompany the series ramp-up in every case, regardless of who handles manufacturing. You have complete freedom of choice: CME can handle both development and manufacturing – or you can commission us specifically for just one of the two.',
  },
];

const faqCluster2 = [
  {
    questionDE: 'Was macht CME zum Spezialisten für Leistungselektronik und thermisch anspruchsvolle Projekte?',
    questionEN: 'What makes CME a specialist for power electronics and thermally demanding projects?',
    answerDE: 'Leistungselektronik erzeugt systembedingt hohe Verlustleistungen – das thermische Management entscheidet über Zuverlässigkeit und Lebensdauer. Bei CME ist die thermische Simulation fester Bestandteil jedes Leistungselektronik-Projekts: Wir analysieren Wärmeflüsse bereits im Schaltungsentwurf und optimieren Layout, Kühlung und Materialwahl parallel. Unsere Ingenieure verfügen über langjährige Erfahrung mit SiC- und GaN-Halbleitern, Hochstrom-Designs und anspruchsvollen Umgebungsbedingungen von –40 °C bis +125 °C. Das Ergebnis sind kompakte, effiziente Systeme, die auch unter Extrembedingungen zuverlässig arbeiten.',
    answerEN: 'Power electronics inherently generates high power losses – thermal management determines reliability and service life. At CME, thermal simulation is an integral part of every power electronics project: we analyze heat flows during circuit design and optimize layout, cooling, and material selection in parallel. Our engineers have extensive experience with SiC and GaN semiconductors, high-current designs, and demanding environmental conditions from –40 °C to +125 °C. The result is compact, efficient systems that operate reliably even under extreme conditions.',
  },
  {
    questionDE: 'Welche Antriebselektronik entwickelt CME – und für welche Motortypen?',
    questionEN: 'What motor drive electronics does CME develop – and for which motor types?',
    answerDE: 'Wir entwickeln kundenspezifische Antriebselektronik für bürstenlose DC-Motoren (BLDC), Permanentmagnet-Synchronmotoren (PMSM), Asynchronmotoren und Schrittmotoren. Unser Leistungsspektrum reicht von Kleinantrieben im Watt-Bereich bis zu Hochleistungsantrieben im zweistelligen Kilowatt-Bereich. Besonders stark sind wir im modellbasierten Reglerdesign (MIL, SIL, HIL) und im integrierten E-Motor-Design, bei dem wir Laminatkonstruktion, Wicklungsauslegung und Elektronik als Gesamtsystem optimieren. So erreichen wir maximale Effizienz bei minimalem Bauraum.',
    answerEN: 'We develop custom motor drive electronics for brushless DC motors (BLDC), permanent magnet synchronous motors (PMSM), asynchronous motors, and stepper motors. Our range covers small drives in the watt range up to high-performance drives in the double-digit kilowatt range. We are particularly strong in model-based controller design (MIL, SIL, HIL) and integrated e-motor design, where we optimize lamination construction, winding layout, and electronics as a complete system. This achieves maximum efficiency with minimum installation space.',
  },
  {
    questionDE: 'Bietet CME auch Embedded-Software-Entwicklung an?',
    questionEN: 'Does CME also offer embedded software development?',
    answerDE: 'Ja, Hardware und Software werden bei CME immer als Einheit gedacht. Unsere Embedded-Entwickler programmieren Mikrocontroller-Systeme (ARM Cortex, STM32, Infineon, NXP), entwickeln Echtzeit-Firmware und implementieren Kommunikationsschnittstellen wie CAN, EtherCAT, SPI und UART. Für sicherheitskritische Anwendungen setzen wir auf MISRA-C-konforme Entwicklung und modellbasierte Codegenerierung. Die enge Verzahnung von Hard- und Software-Team ermöglicht es uns, Probleme frühzeitig zu erkennen und die Time-to-Market deutlich zu verkürzen.',
    answerEN: 'Yes, hardware and software are always considered as a unit at CME. Our embedded developers program microcontroller systems (ARM Cortex, STM32, Infineon, NXP), develop real-time firmware, and implement communication interfaces such as CAN, EtherCAT, SPI, and UART. For safety-critical applications, we use MISRA-C-compliant development and model-based code generation. The close integration of our hardware and software teams allows us to identify issues early and significantly reduce time-to-market.',
  },
  {
    questionDE: 'Wie stellt CME die EMV-Konformität und Zulassungsfähigkeit sicher?',
    questionEN: 'How does CME ensure EMC compliance and certifiability?',
    answerDE: 'EMV-gerechtes Design beginnt bei uns nicht erst im Test, sondern bereits im Schaltungsentwurf. Wir berücksichtigen Filterauslegung, Masseführung, Schirmung und Leiterbahnführung von Anfang an. Nach der Prototypenfertigung führen wir Pre-Compliance-Messungen durch und optimieren bei Bedarf iterativ. Für die finale Zertifizierung begleiten wir Sie zum akkreditierten Prüflabor und unterstützen bei der Erstellung der technischen Dokumentation für CE, UL, FCC oder branchenspezifische Normen wie IEC 60601 (Medizin) oder ISO 26262 (Automotive).',
    answerEN: 'EMC-compliant design at CME does not start during testing – it begins in the circuit design phase. We consider filter design, grounding, shielding, and trace routing from the very beginning. After prototype manufacturing, we perform pre-compliance measurements and optimize iteratively if needed. For final certification, we accompany you to accredited test laboratories and support the creation of technical documentation for CE, UL, FCC, or industry-specific standards such as IEC 60601 (medical) or ISO 26262 (automotive).',
  },
  {
    questionDE: 'Hat CME Erfahrung mit Bare-Die-Design und Keramiksubstraten?',
    questionEN: 'Does CME have experience with bare-die design and ceramic substrates?',
    answerDE: 'Ja, Bare-Die-Design und Keramiksubstrate gehören zu unseren Kernkompetenzen in der Leistungselektronik. Wir entwickeln Schaltungen auf Al₂O₃-, AlN- und Si₃N₄-Keramikträgern für Anwendungen mit höchsten thermischen Anforderungen und Isolationsfestigkeit. Im Bare-Die-Bereich beherrschen wir Chip-on-Board (CoB), Flip-Chip und Wire-Bonding – von der Halbleiterauswahl über das Bonding-Diagramm bis zur Prozessabstimmung mit dem Fertiger. Die Kombination aus Bare-Die-Montage und Keramiksubstraten ermöglicht besonders kompakte, thermisch optimierte Hochleistungsmodule – etwa für SiC- und GaN-basierte Leistungsstufen, bei denen konventionelle FR4-Leiterplatten an ihre Grenzen stoßen.',
    answerEN: 'Yes, bare-die design and ceramic substrates are among our core competencies in power electronics. We develop circuits on Al₂O₃, AlN and Si₃N₄ ceramic carriers for applications with the highest thermal demands and insulation strength. In the bare-die domain, we master chip-on-board (CoB), flip-chip and wire bonding – from semiconductor selection through bonding diagrams to process coordination with the manufacturer. The combination of bare-die mounting and ceramic substrates enables particularly compact, thermally optimized high-performance modules – for example for SiC and GaN-based power stages where conventional FR4 PCBs reach their limits.',
  },
  {
    questionDE: 'Entwickelt CME auch Funkschnittstellen wie LoRaWAN oder Zigbee?',
    questionEN: 'Does CME also develop radio interfaces such as LoRaWAN or Zigbee?',
    answerDE: 'Ja, wir entwickeln Embedded-Systeme mit integrierten Funkschnittstellen für IoT- und Industrieanwendungen. Unser Leistungsspektrum umfasst LoRaWAN für energieeffiziente Langstrecken-Kommunikation (z. B. Sensornetze, Smart Metering, Asset Tracking), Zigbee für zuverlässige Mesh-Netzwerke in Gebäude- und Industrieautomation sowie Bluetooth LE und WLAN für Nahbereichs-Konnektivität. Wir übernehmen die Schaltungsentwicklung inklusive HF-Layout und Antennenabstimmung, die Firmware-Integration des Protokoll-Stacks und die Begleitung der Funkzulassung nach RED (EU) und FCC (USA). So erhalten Sie ein funktionsfertiges, zertifizierungsfähiges System aus einer Hand.',
    answerEN: 'Yes, we develop embedded systems with integrated radio interfaces for IoT and industrial applications. Our range includes LoRaWAN for energy-efficient long-range communication (e.g., sensor networks, smart metering, asset tracking), Zigbee for reliable mesh networks in building and industrial automation, and Bluetooth LE and WLAN for short-range connectivity. We handle circuit development including RF layout and antenna tuning, firmware integration of the protocol stack, and support for radio certification per RED (EU) and FCC (USA). This gives you a function-ready, certification-capable system from a single source.',
  },
];

const faqCluster3 = [
  {
    questionDE: 'Bietet CME Elektronikentwicklung für Automotive-Projekte an?',
    questionEN: 'Does CME offer electronics development for automotive projects?',
    answerDE: 'Ja, Automotive ist eine unserer Kernbranchen. Wir entwickeln Elektronik für Pumpen und Kompressoren (Abgasnachbehandlung, Kühlmittel), HVAC-Blower und Klimaaktuatoren, Ventilsteuerungen, On-Board-Charger und DC/DC-Wandler sowie Fuel-Cell-Steuerungen für Wasserstoff-Anwendungen. Dabei arbeiten wir nach ISO 26262 (Funktionale Sicherheit bis ASIL D), Automotive SPICE (ASPICE) und qualifizieren nach AEC-Q- und AK-Standards. Unsere Erfahrung mit Hochvolt-EMV und den strengen Automotive-Qualitätsprozessen stellt sicher, dass Ihre Elektronik die OEM-Anforderungen erfüllt.',
    answerEN: 'Yes, automotive is one of our core industries. We develop electronics for pumps and compressors (exhaust aftertreatment, coolant), HVAC blowers and climate actuators, valve controls, on-board chargers and DC/DC converters, as well as fuel cell controllers for hydrogen applications. We work according to ISO 26262 (functional safety up to ASIL D), Automotive SPICE (ASPICE), and qualify to AEC-Q and AK standards. Our experience with high-voltage EMC and stringent automotive quality processes ensures your electronics meet OEM requirements.',
  },
  {
    questionDE: 'Entwickelt CME Elektronik für die Medizintechnik?',
    questionEN: 'Does CME develop electronics for medical technology?',
    answerDE: 'Ja, wir entwickeln Präzisionselektronik für Medizin und Life Sciences. Unser Leistungsspektrum umfasst medizinische Embedded-Systeme, Präzisionssteuerungen und Dosierungselektronik, Sensorik und Signalverarbeitung, Bedieninterfaces und Displays sowie Laborgeräte und Diagnostik-Elektronik. Wir arbeiten nach den regulatorischen Anforderungen der MDR und IEC 60601 und legen besonderen Wert auf höchste Zuverlässigkeit, Miniaturisierung bei voller Funktionalität und Langzeit-Verfügbarkeit mit vorausschauender Obsolescence-Planung. So stellen wir sicher, dass Ihre Medizinelektronik über den gesamten Produktlebenszyklus verfügbar und normkonform bleibt.',
    answerEN: 'Yes, we develop precision electronics for medicine and life sciences. Our range includes medical embedded systems, precision controls and dosing electronics, sensors and signal processing, user interfaces and displays, as well as laboratory devices and diagnostics electronics. We work according to the regulatory requirements of the MDR and IEC 60601, with particular emphasis on highest reliability, miniaturization with full functionality, and long-term availability with proactive obsolescence planning. This ensures your medical electronics remain available and standards-compliant throughout the entire product lifecycle.',
  },
  {
    questionDE: 'Bietet CME Elektronikentwicklung für Industrieautomation und Robotik an?',
    questionEN: 'Does CME offer electronics development for industrial automation and robotics?',
    answerDE: 'Ja, wir entwickeln Steuerungselektronik für die Fabrik der Zukunft. Dazu gehören Maschinensteuerungen und SPS-nahe Systeme, HMI- und Bedienpanels, Robotik- und Cobot-Steuerungen, Intralogistik-Lösungen für AGV/AMR sowie Safety-Systeme und SIL-Elektronik. Wir implementieren industrielle Kommunikationsprotokolle wie EtherCAT, CAN und IO-Link und entwickeln robuste Systeme, die den harten Anforderungen industrieller Umgebungen standhalten – von Vibration und Temperaturwechsel bis hin zu elektromagnetischer Störfestigkeit.',
    answerEN: 'Yes, we develop control electronics for the factory of the future. This includes machine controllers and PLC-adjacent systems, HMI and operator panels, robotics and cobot controllers, intralogistics solutions for AGV/AMR, as well as safety systems and SIL electronics. We implement industrial communication protocols such as EtherCAT, CAN, and IO-Link and develop robust systems that withstand the demanding requirements of industrial environments – from vibration and temperature cycling to electromagnetic immunity.',
  },
  {
    questionDE: 'Entwickelt CME Antriebselektronik für Off-Highway, E-Mobility und mobile Maschinen?',
    questionEN: 'Does CME develop drive electronics for off-highway, e-mobility, and mobile machines?',
    answerDE: 'Ja, Antriebselektronik für mobile Anwendungen ist eine unserer Stärken. Wir entwickeln BLDC- und PMSM-Motorsteuerungen, FOC-Inverter und Umrichter für E-Mobility-Anwendungen (E-Bike, LEV, Scooter), Power Tools, AGV/AMR und Fördertechnik. Unsere Systeme sind auf Robustheit unter Vibration, Temperaturwechsel und rauen Einsatzbedingungen ausgelegt. Durch hocheffiziente Regelungsalgorithmen (FOC, sensorlos) und kompakte Bauformen bei hoher Leistung liefern wir Antriebselektronik, die auch in anspruchsvollen Off-Highway- und Outdoor-Umgebungen zuverlässig funktioniert.',
    answerEN: 'Yes, drive electronics for mobile applications is one of our strengths. We develop BLDC and PMSM motor controllers, FOC inverters and converters for e-mobility applications (e-bike, LEV, scooter), power tools, AGV/AMR, and conveyor systems. Our systems are designed for robustness under vibration, temperature cycling, and harsh operating conditions. Through highly efficient control algorithms (FOC, sensorless) and compact form factors at high power, we deliver drive electronics that operate reliably even in demanding off-highway and outdoor environments.',
  },
  {
    questionDE: 'Bietet CME Elektronikentwicklung für Energiesysteme und Ladeinfrastruktur an?',
    questionEN: 'Does CME offer electronics development for energy systems and charging infrastructure?',
    answerDE: 'Ja, wir entwickeln leistungselektronische Teilkomponenten für Energiesysteme und Ladeinfrastruktur. Unser Fokus liegt auf der Elektronikentwicklung einzelner Baugruppen: DC/DC- und AC/DC-Wandler, Wechselrichter-Leistungsstufen, Wallbox-Steuerungselektronik und Batteriemanagementsysteme (BMS). Wir beherrschen die besonderen Herausforderungen der Leistungselektronik in diesen Anwendungen: hohe Wirkungsgrade, thermisches Management bei hohen Strömen und die sichere Handhabung von Hochspannungen. Die Systemintegration und übergeordnete Ladesteuerung verantworten unsere Kunden – wir liefern die elektronischen Kernkomponenten dafür.',
    answerEN: 'Yes, we develop power electronic sub-components for energy systems and charging infrastructure. Our focus is on electronics development of individual assemblies: DC/DC and AC/DC converters, inverter power stages, wallbox control electronics, and battery management systems (BMS). We master the special challenges of power electronics in these applications: high efficiency, thermal management at high currents, and safe handling of high voltages. System integration and higher-level charging control remain with our customers – we deliver the core electronic components for it.',
  },
  {
    questionDE: 'Entwickelt CME Elektronik für Gebäudetechnik und Smart Infrastructure?',
    questionEN: 'Does CME develop electronics for building technology and smart infrastructure?',
    answerDE: 'Ja, wir entwickeln intelligente Elektronik für Gebäude, Infrastruktur und Sicherheit. Dazu gehören Aufzugsteuerungen und -antriebe, HVAC- und Klimasteuerungen, Gebäudeautomation und Smart-Building-Systeme, Zutrittskontrolle und Smart Access, Sicherheits- und Überwachungstechnik sowie Energiemanagement und Smart Metering. Unsere Lösungen verbinden Zuverlässigkeit mit Energieeffizienz und sind auf lange Produktlebenszyklen ausgelegt – ein entscheidender Faktor in der Gebäudetechnik, wo Systeme oft 15–20 Jahre im Einsatz sind.',
    answerEN: 'Yes, we develop intelligent electronics for buildings, infrastructure, and security. This includes elevator controls and drives, HVAC and climate controls, building automation and smart building systems, access control and smart access, security and surveillance technology, as well as energy management and smart metering. Our solutions combine reliability with energy efficiency and are designed for long product lifecycles – a decisive factor in building technology, where systems are often in use for 15–20 years.',
  },
  {
    questionDE: 'Für welche Branchen entwickelt CME Elektronik – und welche Normen werden abgedeckt?',
    questionEN: 'For which industries does CME develop electronics – and which standards are covered?',
    answerDE: 'CME entwickelt Elektronik für sechs Kernbranchen: Antriebstechnik und Motorsysteme, Automotive und Funktionale Sicherheit, Medizintechnik, Industrieautomation und Robotik, Gebäudetechnik sowie Energiesysteme. Je nach Branche arbeiten wir nach den relevanten Normen – darunter ISO 26262 (Automotive ASIL), IEC 60601 (Medizinprodukte), IEC 61508 (Funktionale Sicherheit), EN 61800 (Antriebssysteme) und die Maschinenrichtlinie. Unsere branchenübergreifende Erfahrung ermöglicht es uns, bewährte Lösungsansätze aus einem Sektor auf andere zu übertragen.',
    answerEN: 'CME develops electronics for six core industries: drive technology and motor systems, automotive and functional safety, medical technology, industrial automation and robotics, building technology, and energy systems. Depending on the industry, we work according to relevant standards – including ISO 26262 (automotive ASIL), IEC 60601 (medical devices), IEC 61508 (functional safety), EN 61800 (drive systems), and the Machinery Directive. Our cross-industry experience enables us to transfer proven approaches from one sector to another.',
  },
  {
    questionDE: 'Warum Elektronikentwicklung in Deutschland statt Offshore – was sind die Vorteile eines deutschen Entwicklungspartners?',
    questionEN: 'Why choose electronics development in Germany instead of offshore – what are the advantages of a German development partner?',
    answerDE: 'Ein deutscher Entwicklungspartner wie CME bietet entscheidende Vorteile: direkte Kommunikation ohne Sprachbarrieren und Zeitzonenprobleme, tiefes Verständnis europäischer Normen und Zulassungsanforderungen sowie den Schutz Ihres geistigen Eigentums nach deutschem und EU-Recht. CME ist dabei EMS-neutral: Sie entscheiden frei, ob wir nur entwickeln, nur fertigen oder beides übernehmen – den Serienanlauf begleiten wir in jedem Fall, unabhängig vom Fertigungsstandort. Für internationale Kunden bedeutet das: höchste Qualitätsstandards, IP-Schutz, maximale Flexibilität bei der Partnerwahl und ein reaktionsschneller Partner in der mitteleuropäischen Zeitzone.',
    answerEN: 'A German development partner like CME offers decisive advantages: direct communication without language barriers and time zone issues, deep understanding of European standards and certification requirements, and protection of your intellectual property under German and EU law. CME is EMS-neutral: you decide freely whether we develop only, manufacture only, or handle both – we accompany the series ramp-up in every case, regardless of the manufacturing location. For international clients, this means: highest quality standards, IP protection, maximum flexibility in partner selection, and a responsive partner in the Central European time zone.',
  },
];

/* All 16 FAQs combined for JSON-LD schema */
const allFaqItems = [...faqCluster1, ...faqCluster2, ...faqCluster3];

const CDN = 'https://ventspire-cdn.b-cdn.net/cme';
const HERO_IMG = `${CDN}/JK_2392__1920px_af02a6b7.jpg`;

/* ── 6 Competency Cards (ENT-1) ── */
const competencies = [
  {
    icon: Cpu,
    titleDE: 'Hard & Software Design',
    titleEN: 'Hard & Software Design',
    subtitleDE: 'Embedded Microcontroller Systeme',
    subtitleEN: 'Embedded Microcontroller Systems',
    descDE: 'Hardware-Entwicklung, Schaltungsdesign, Embedded Software und Echtzeitsysteme.',
    descEN: 'Hardware development, circuit design, embedded software and real-time systems.',
    href: '/entwicklung/hardware-software',
  },
  {
    icon: Cog,
    titleDE: 'E-Motor Design',
    titleEN: 'E-Motor Design',
    subtitleDE: 'PM-Motor-Design – Laminatkonstruktion und ‑layout',
    subtitleEN: 'PM Motor Design – Lamination Construction and Layout',
    descDE: 'Auslegung permanentmagneterregter Motoren, FEA-basiertes Motordesign mit Motor-CAD/ANSYS.',
    descEN: 'Design of permanent magnet motors, FEA-based motor design with Motor-CAD/ANSYS.',
    href: '/entwicklung/e-motor-design',
  },
  {
    icon: SlidersHorizontal,
    titleDE: 'Control Design',
    titleEN: 'Control Design',
    subtitleDE: 'Modellbasiertes Reglerdesign · MIL, SIL, HIL',
    subtitleEN: 'Model-Based Controller Design · MIL, SIL, HIL',
    descDE: 'Entwicklung und Verifikation von Regelalgorithmen entlang des V‑Modells.',
    descEN: 'Development and verification of control algorithms along the V‑model.',
    href: '/entwicklung/control-design',
  },
  {
    icon: Waves,
    titleDE: 'Simulation',
    titleEN: 'Simulation',
    subtitleDE: 'Elektrische, System- und thermische Simulation',
    subtitleEN: 'Electrical, System and Thermal Simulation',
    descDE: 'Risikominimierung vor dem Prototypenbau durch MATLAB, COMSOL und SPICE.',
    descEN: 'Risk minimization before prototype construction using MATLAB, COMSOL and SPICE.',
    href: '/entwicklung/simulation',
  },
  {
    icon: ShieldCheck,
    titleDE: 'Validierung & EMV',
    titleEN: 'Validation & EMC',
    subtitleDE: 'Absicherung unter realen Einsatzbedingungen',
    subtitleEN: 'Validation Under Real Operating Conditions',
    descDE: 'Leitungsgebundene EMV-Prüfung in eigener Schirmkabine, Umwelt- und Lebensdauertests.',
    descEN: 'Conducted EMC testing in our own shielded chamber, environmental and lifetime tests.',
    href: '/entwicklung/validierung-emv',
  },
  {
    icon: FlaskConical,
    titleDE: 'Test & Verification',
    titleEN: 'Test & Verification',
    subtitleDE: 'Funktions-, Umwelt- und Lebenszyklustests',
    subtitleEN: 'Functional, Environmental and Lifecycle Tests',
    descDE: 'Testautomatisierung und automatische Datenanalyse.',
    descEN: 'Test automation and automatic data analysis.',
    href: '/entwicklung/test-verifikation',
  },
];

/* ── Expanded Core Competencies with Lucide Icons ── */
const coreCompetencies = [
  { icon: Zap, de: 'Leistungselektronik (SiC, GaN, IGBT, MOSFET)', en: 'Power Electronics (SiC, GaN, IGBT, MOSFET)' },
  { icon: Cog, de: 'Antriebselektronik & Motor Control (FOC, BLDC/PMSM)', en: 'Drive Electronics & Motor Control (FOC, BLDC/PMSM)' },
  { icon: CircuitBoard, de: 'E-Motor-Design & -Auslegung (FEA, Motor-CAD)', en: 'E-Motor Design & Engineering (FEA, Motor-CAD)' },
  { icon: Gauge, de: 'Umrichter: Automotive, Ladetechnik, Photovoltaik', en: 'Inverters: Automotive, Charging, Photovoltaics' },
  { icon: BatteryCharging, de: 'Stromversorgungen: DC/DC, AC/DC, BMS', en: 'Power Supplies: DC/DC, AC/DC, BMS' },
  { icon: Thermometer, de: 'Thermisches Management & Verlustleistungssimulation', en: 'Thermal Management & Power Loss Simulation' },
  { icon: Waves, de: 'System-, Antriebs-, Schaltungs- & Thermosimulation', en: 'System, Drive, Circuit & Thermal Simulation' },
  { icon: Radio, de: 'EMV-Design, Filterauslegung & Qualifikation', en: 'EMC Design, Filter Layout & Qualification' },
  { icon: ShieldCheck, de: 'Funktionale Sicherheit (ISO 26262, FuSi)', en: 'Functional Safety (ISO 26262, FuSi)' },
  { icon: SlidersHorizontal, de: 'Automotive SPICE (ASPICE)', en: 'Automotive SPICE (ASPICE)' },
  { icon: Microchip, de: 'Embedded Systems: Firmware, RTOS (C/C++)', en: 'Embedded Systems: Firmware, RTOS (C/C++)' },
  { icon: Radio, de: 'Kommunikationsprotokolle: CAN, LIN, SPI, EtherCAT', en: 'Communication Protocols: CAN, LIN, SPI, EtherCAT' },
  { icon: Radio, de: 'Funkschnittstellen: LoRaWAN, Zigbee, Bluetooth, WLAN', en: 'Radio Interfaces: LoRaWAN, Zigbee, Bluetooth, WLAN' },
  { icon: Search, de: 'Sensorik & Signalverarbeitung', en: 'Sensor Technology & Signal Processing' },
  { icon: CircuitBoard, de: 'Bare-Die-Design & Keramiksubstrate (Al₂O₃, AlN)', en: 'Bare-Die Design & Ceramic Substrates (Al₂O₃, AlN)' },
  { icon: Thermometer, de: 'Robuste Elektronik für hohe Temperaturen & raue Umgebungen', en: 'Robust Electronics for High Temperatures & Harsh Environments' },
  { icon: RefreshCw, de: 'Redesign & Produktoptimierung', en: 'Redesign & Product Optimization' },
  { icon: MonitorSmartphone, de: 'UX & Interface Engineering', en: 'UX & Interface Engineering' },
];

/* ── FAQ Accordion Item (animated, same pattern as KiEntwicklung) ── */
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

/* ── FAQ Cluster Component ── */
function FaqCluster({ title, items, isDE, openFaq, onToggle, indexOffset }: {
  title: string;
  items: typeof faqCluster1;
  isDE: boolean;
  openFaq: number | null;
  onToggle: (index: number) => void;
  indexOffset: number;
}) {
  return (
    <div style={{ marginBottom: 'var(--space-gap-lg)' }}>
      <h3 className="fluid-h4 text-cme-dark font-bold" style={{ marginBottom: 'var(--space-gap-sm)' }}>
        {title}
      </h3>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{ padding: 'var(--space-gap-sm) var(--space-gap-md)' }}>
        {items.map((item, i) => (
          <FaqItem
            key={indexOffset + i}
            question={isDE ? item.questionDE : item.questionEN}
            answer={isDE ? item.answerDE : item.answerEN}
            isOpen={openFaq === indexOffset + i}
            onToggle={() => onToggle(indexOffset + i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Entwicklung() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  const { t: cms, img, vid } = useContent('entwicklung');

  // Hero video from CMS
  const heroVideoWebm = vid('hero.heroVideoWebm');
  const heroVideoMp4 = vid('hero.heroVideoMp4');
  const heroVideoPoster = img('hero.heroVideoPoster');
  const heroVideoPlayback = cms('hero.heroVideoPlayback') as 'loop' | 'once' | '';
  const heroVideo = (heroVideoWebm || heroVideoMp4)
    ? { webm: heroVideoWebm || undefined, mp4: heroVideoMp4 || undefined, poster: heroVideoPoster || undefined, playback: (heroVideoPlayback === 'once' ? 'once' : 'loop') as 'loop' | 'once' }
    : undefined;

  // ContactSlider state
  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderTopic, setSliderTopic] = useState('');
  const openSlider = (topic: string) => { setSliderTopic(topic); setSliderOpen(true); };

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  /* JSON-LD FAQ Schema – all 16 FAQs */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqItems.map((item) => ({
      '@type': 'Question',
      name: isDE ? item.questionDE : item.questionEN,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isDE ? item.answerDE : item.answerEN,
      },
    })),
  };

  return (
    <Layout>
      <SEO
        titleDE='Elektronikentwicklung Dortmund | CME'
        titleEN='Electronics Development Dortmund | CME'
        descriptionDE='Von der Idee zur serienreifen Elektronik: Hardware, Software, E-Motor-Design & Simulation aus einer Hand. CME Elektronikentwicklung Dortmund – Jetzt beraten lassen.'
        descriptionEN='From idea to series-ready electronics: hardware, software, e-motor design & simulation from a single source. CME electronics development Dortmund.'
        keywordsDE='Elektronikentwicklung, Hardware-Entwicklung, Software-Entwicklung, Leistungselektronik, Antriebselektronik, E-Motor-Design, Bare-Die-Design, Keramiksubstrate, LoRaWAN, Zigbee, EMV, Simulation, V-Modell'
        keywordsEN='electronics development, hardware design, software development, power electronics, drive electronics, motor design, EMC, simulation, V-model'
        path='/entwicklung'
        enPath='/en/development'
        breadcrumbs={[{name:'Home',url:'/'},{name:'Elektronikentwicklung',url:'/entwicklung'}]}
        additionalSchemas={[faqSchema]}
      />
      <SubPageHero
        tagline={cms('hero.tagline') || (isDE ? 'Elektronikentwicklung' : 'Electronics Development')}
        headline={cms('hero.headline') || (isDE ? 'Von der Idee zur serienreifen Elektronik.' : 'From idea to series-ready electronics.')}
        description={cms('hero.description') || (isDE
          ? 'Wir entwickeln Elektronik, die funktioniert – von der Systemarchitektur über Hardware, Software und Simulation bis zur Qualifikation. Mit Fokus auf Leistungselektronik, Antriebstechnik, E-Motor-Design und thermisch anspruchsvolle Projekte.'
          : 'We develop electronics that work – from system architecture through hardware, software and simulation to qualification. With focus on power electronics, drive technology, e-motor design and thermally demanding projects.')}
        cta={{ label: isDE ? 'Entwicklungsprojekt besprechen' : 'Discuss your development project', href: '/kontakt' }}
        heroImage={img('hero.heroImage', HERO_IMG)}
        heroImageAlt="Elektronikentwicklung"
        heroVideo={heroVideo}
      />

      {/* ── 2×3 Competency Grid (ENT-1) ── */}
      <section className="section-pad">
        <div className="container">
          <h2 className="fluid-h2 text-cme-dark text-center">
            {isDE ? 'Entwicklung Services – Elektronik im Überblick' : 'Development Services – Electronics Overview'}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-md)', marginTop: 'var(--space-section-header)' }}>
            {competencies.map((card, i) => (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={card.href} className="group block h-full">
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col fluid-card">
                    {/* Icon + Title */}
                    <div className="flex items-center" style={{ gap: 'var(--space-gap-xs)', marginBottom: 'var(--space-gap-xs)' }}>
                      <div
                        className="rounded-lg bg-cme-blue-light flex items-center justify-center shrink-0"
                        style={{ width: 'var(--icon-box)', height: 'var(--icon-box)' }}
                      >
                        <card.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                      </div>
                      <h3 className="fluid-h4 text-cme-dark font-bold">
                        {isDE ? card.titleDE : card.titleEN}
                      </h3>
                    </div>
                    {/* Subtitle */}
                    <p className="text-cme-blue font-medium fluid-small" style={{ marginBottom: 'var(--space-gap-xs)' }}>
                      {isDE ? card.subtitleDE : card.subtitleEN}
                    </p>
                    {/* Description */}
                    <p className="text-gray-600 fluid-small leading-relaxed flex-1">
                      {isDE ? card.descDE : card.descEN}
                    </p>
                    {/* Link arrow – keyword-rich anchor text */}
                    <div className="flex items-center text-cme-blue font-semibold fluid-small group-hover:gap-3 transition-all" style={{ gap: 'var(--space-gap-xs)', marginTop: 'var(--space-gap-sm)' }}>
                      {isDE ? `${card.titleDE} entdecken` : `Explore ${card.titleEN}`}
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Closing statement below grid */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 fluid-body-lg text-center max-w-3xl mx-auto"
            style={{ marginTop: 'var(--space-gap-lg)' }}
          >
            {isDE
              ? 'Technische Tiefe statt Koordination. Alle Leistungen erbringen wir im Rahmen von Entwicklungsprojekten und auch als Einzelleistung zur Absicherung Ihrer Projekte.'
              : 'Technical depth instead of coordination. We deliver all services as part of development projects and also as individual services to safeguard your projects.'}
          </motion.p>
        </div>
      </section>

      {/* Key Capabilities – with Lucide Icons instead of blue dots */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <h2 className="fluid-h2 text-cme-dark text-center">
            {isDE ? 'Kernkompetenzen' : 'Core Competencies'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-gap-sm)', marginTop: 'var(--space-section-header)' }}>
            {coreCompetencies.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-xl border border-gray-100 hover:border-cme-blue/20 hover:shadow-md transition-all fluid-card cursor-pointer"
                onClick={() => openSlider(isDE ? item.de : item.en)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSlider(isDE ? item.de : item.en); } }}
              >
                <div className="flex items-start" style={{ gap: 'var(--space-gap-xs)' }}>
                  <item.icon className="text-cme-blue shrink-0 mt-0.5" size={18} />
                  <p className="font-medium text-cme-dark fluid-small">{isDE ? item.de : item.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services: Redesign & Beratung */}
      <section className="section-pad">
        <div className="container">
          <div className="grid md:grid-cols-2" style={{ gap: 'var(--space-gap-lg)' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="fluid-h3 text-cme-dark" style={{ marginBottom: 'var(--space-gap-sm)' }}>
                {isDE ? 'Redesign & Produktoptimierung' : 'Redesign & Product Optimization'}
              </h2>
              <p className="fluid-body text-gray-600 leading-relaxed" style={{ marginBottom: 'var(--space-gap-sm)' }}>
                {isDE
                  ? 'Wir optimieren bestehende Produkte und passen sie an neue Anforderungen an. Nicht mehr erhältliche oder nicht mehr zeitgemäße Bauteile ersetzen wir durch neu entwickelte Versionen.'
                  : 'We optimize existing products and adapt them to new requirements. We replace discontinued or outdated components with newly developed versions.'}
              </p>
              <ul className="space-y-2">
                {(isDE
                  ? ['Verbesserung des Wirkungsgrades', 'Leistungserhöhung', 'Reduktion von Energieverbrauch', 'Anpassung an verringerten Bauraum', 'Erhöhung der Lebensdauer', 'Verbesserung von Fertigungsprozessen', 'Reduzierung von Stück- oder Produktionskosten']
                  : ['Efficiency improvement', 'Power increase', 'Energy consumption reduction', 'Adaptation to reduced installation space', 'Lifetime extension', 'Manufacturing process improvement', 'Reduction of unit or production costs']
                ).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 fluid-small text-gray-600">
                    <CheckCircle2 className="text-cme-blue shrink-0 mt-0.5" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="fluid-h3 text-cme-dark" style={{ marginBottom: 'var(--space-gap-sm)' }}>
                {isDE ? 'Beratung & Consulting' : 'Consulting & Advisory'}
              </h2>
              <p className="fluid-body text-gray-600 leading-relaxed" style={{ marginBottom: 'var(--space-gap-sm)' }}>
                {isDE
                  ? 'Wir beraten Sie als unabhängiger Partner – von der Ideenentwicklung über Troubleshooting bis zum Second-Source-Management.'
                  : 'We advise you as an independent partner – from idea development through troubleshooting to second-source management.'}
              </p>
              <ul className="space-y-2">
                {(isDE
                  ? ['Produktentwicklung & Ideenentwicklung', 'Troubleshooting: Findung & Behebung von Fehlerquellen', 'Second-Source-Management: alternative Bauelemente', 'Planung & Durchführung von Projekten', 'Unabhängige Beurteilung von Entwicklungen']
                  : ['Product development & ideation', 'Troubleshooting: finding & fixing root causes', 'Second-source management: alternative components', 'Project planning & execution', 'Independent assessment of developments']
                ).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 fluid-small text-gray-600">
                    <CheckCircle2 className="text-cme-blue shrink-0 mt-0.5" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-gray-50">
        <div className="container text-center">
          <h2 className="fluid-h2 text-cme-dark">
            {isDE ? 'Technische Machbarkeit klären – bevor es teuer wird.' : 'Clarify technical feasibility – before it gets expensive.'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Senden Sie uns Ihr Lastenheft oder Ihre Projektskizze. Wir bewerten Aufwand, Risiken und den schnellsten Weg zur Serie.'
              : 'Send us your specification or project outline. We assess effort, risks and the fastest path to series production.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? 'Lastenheft einreichen' : 'Submit specification'}
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         FAQ Section – 16 FAQs in 3 Clustern
         ══════════════════════════════════════════════════════════════ */}
      <section className="section-pad">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ maxWidth: 'min(80%, 72rem)' }}>
          <h2 className="fluid-h2 text-cme-dark text-center" style={{ marginBottom: 'var(--space-section-header)' }}>
            {isDE ? 'Häufige Fragen zur Elektronikentwicklung' : 'Frequently Asked Questions About Electronics Development'}
          </h2>

          {/* Cluster 1: Prozess & Leistung */}
          <FaqCluster
            title={isDE ? 'Prozess & Leistung' : 'Process & Services'}
            items={faqCluster1}
            isDE={isDE}
            openFaq={openFaq}
            onToggle={toggleFaq}
            indexOffset={0}
          />

          {/* Cluster 2: Technologie & Kompetenz */}
          <FaqCluster
            title={isDE ? 'Technologie & Kompetenz' : 'Technology & Expertise'}
            items={faqCluster2}
            isDE={isDE}
            openFaq={openFaq}
            onToggle={toggleFaq}
            indexOffset={faqCluster1.length}
          />

          {/* Cluster 3: Branchen & Anwendung */}
          <FaqCluster
            title={isDE ? 'Branchen & Anwendung' : 'Industries & Applications'}
            items={faqCluster3}
            isDE={isDE}
            openFaq={openFaq}
            onToggle={toggleFaq}
            indexOffset={faqCluster1.length + faqCluster2.length}
          />
        </div>
      </section>

      {/* Contact Slider */}
      <ContactSlider
        isOpen={sliderOpen}
        onClose={() => setSliderOpen(false)}
        topic={sliderTopic}
        pageSource={`entwicklung – ${sliderTopic}`}
      />
    </Layout>
  );
}
