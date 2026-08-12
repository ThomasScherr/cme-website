import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import SubPageHero from '@/components/SubPageHero';
import ContactSlider from '@/components/ContactSlider';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Link } from 'wouter';
import { RefreshCcw, ShieldAlert, Package, Wrench, CheckCircle2, HeartHandshake, Gauge, Cpu, Server, MonitorCog, Zap, Bot, Monitor, Flame, BatteryCharging, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const HERO_VIDEO_WEBM = 'https://ventspire-cdn.b-cdn.net/cme/Loop-Sample_d94dc755.webm';
const HERO_VIDEO_MP4 = 'https://ventspire-cdn.b-cdn.net/cme/Loop-Sample-compressed_8b0d5332.mp4';
const HERO_VIDEO_POSTER = 'https://ventspire-cdn.b-cdn.net/cme/hero-video-poster_8c5a9e34.jpg';

const services = [
  {
    icon: RefreshCcw,
    titleDE: 'Obsolescence Management',
    titleEN: 'Obsolescence Management',
    descDE: 'Datenbankgestützte Überwachung Ihrer Bauteilversorgung mit automatisierten Prozessen zur frühzeitigen Problemerkennung. Wir entwickeln kundenspezifische Workflows und Strategien – inklusive Simulationen auf Basis von Bestands- und Marktdaten. Durch unseren hervorragenden Zugang zum Liefermarkt qualifizieren wir Alternativbauteile, bevor Ihre Produktion gefährdet ist.',
    descEN: 'Database-driven monitoring of your component supply with automated processes for early problem detection. We develop customer-specific workflows and strategies – including simulations based on inventory and market data. Through our excellent access to the supplier market, we qualify alternative components before your production is at risk.',
    bulletsDE: [
      'Frühwarnsystem für End-of-Life-Ankündigungen von Herstellern – CME informiert proaktiv, bevor Ihre Produktion gefährdet ist',
      'Alternativen werden qualifiziert, bevor der Engpass entsteht: elektrische Prüfung, Footprint-Analyse und Drop-in-Bewertung',
      'Bestandssimulation auf Basis Ihrer Stückliste und Verbrauchsdaten – wann wird welches Bauteil kritisch?',
      'Aufbau strategischer Pufferbestände für Langläufer-Produkte in Abstimmung mit Ihrem Einkauf',
      'Vollständige Dokumentation aller Alternativbauteile und Qualifizierungsnachweise für Ihre Produktakte',
    ],
    bulletsEN: [
      'Early warning system for manufacturer end-of-life announcements – CME informs proactively before your production is at risk',
      'Alternatives are qualified before the bottleneck occurs: electrical testing, footprint analysis and drop-in evaluation',
      'Inventory simulation based on your BOM and consumption data – when does which component become critical?',
      'Building strategic buffer stocks for long-running products in coordination with your procurement',
      'Complete documentation of all alternative components and qualification records for your product file',
    ],
  },
  {
    icon: ShieldAlert,
    titleDE: 'Redesign & Re-Engineering',
    titleEN: 'Redesign & Re-Engineering',
    descDE: 'Wenn ein Redesign unvermeidbar ist, machen wir aus der Pflicht eine Chance: Wir überarbeiten Ihre Elektronik unter Berücksichtigung der bestehenden Zulassungen und minimieren den Requalifizierungsaufwand. Gleichzeitig bietet sich diese Gelegenheit als Chance an, Ihr Produkt gezielt und nachhaltig zu verbessern.',
    descEN: 'When redesign is unavoidable, we turn necessity into opportunity: We rework your electronics considering existing certifications and minimize requalification effort. At the same time, we use the opportunity to specifically improve your product.',
    bulletsDE: [
      'Verbesserung des Wirkungsgrades',
      'Leistungserhöhung',
      'Reduktion von Energieverbrauch',
      'Anpassung an verringerten Bauraum',
      'Erhöhung der Lebensdauer',
      'Implementierung neuer Funktionen',
      'Verbesserung von Fertigungsprozessen',
      'Reduzierung von Stück- oder Produktionskosten',
    ],
    bulletsEN: [
      'Efficiency improvement',
      'Power increase',
      'Energy consumption reduction',
      'Adaptation to reduced installation space',
      'Lifetime extension',
      'Implementation of new functions',
      'Manufacturing process improvement',
      'Reduction of unit or production costs',
    ],
  },
  {
    icon: Package,
    titleDE: 'Ersatzteilversorgung',
    titleEN: 'Spare Parts Supply',
    descDE: 'Langfristige Ersatzteilversorgung für Ihre Serienprodukte. Wir lagern Bauteile und Baugruppen und liefern auf Abruf.',
    descEN: 'Long-term spare parts supply for your series products. We store components and assemblies and deliver on demand.',
    bulletsDE: [
      'Langfristige Bevorratung kritischer Bauteile und kompletter Baugruppen für Ihre Serienprodukte – auch über Jahrzehnte',
      'Abrufbestellung auf Rahmenvertragsbasis: Sie zahlen nur, was Sie wirklich entnehmen, ohne Kapitalbindung durch Eigenlager',
      'Rückverfolgbarer Warenbestand mit Chargendokumentation – jedes Ersatzteil ist einem Lieferdatum und Hersteller zugeordnet',
      'Lieferfähigkeit auch für Produkte, die seit Jahren nicht mehr in der Serienproduktion sind',
      'Auf Wunsch inklusive Eingangsprüfung und Echtheitszertifizierung gegen gefälschte Bauteile (Anti-Counterfeiting)',
    ],
    bulletsEN: [
      'Long-term stocking of critical components and complete assemblies for your series products – even over decades',
      'Call-off orders on framework contract basis: you only pay for what you actually use, without capital commitment from own storage',
      'Traceable inventory with batch documentation – every spare part is assigned to a delivery date and manufacturer',
      'Delivery capability even for products that have been out of series production for years',
      'On request including incoming inspection and authenticity certification against counterfeit components (anti-counterfeiting)',
    ],
  },
  {
    icon: Wrench,
    titleDE: 'Reparatur & Service',
    titleEN: 'Repair & Service',
    descDE: 'Professionelle Reparatur und Instandsetzung geschäftskritischer elektronischer Baugruppen. Wenn der Ausfall oder Verlust Ihrer Elektronik zu erheblichen Folgekosten führt – in der Produktion, im Feld oder in sicherheitsrelevanten Anwendungen – bieten wir systematische Fehleranalyse, fachgerechte Instandsetzung und lückenlose Dokumentation mit Rückverfolgbarkeit.',
    descEN: 'Professional repair and refurbishment of business-critical electronic assemblies. When the failure or loss of your electronics leads to significant consequential costs – in production, in the field, or in safety-relevant applications – we provide systematic failure analysis, expert repair and complete documentation with traceability.',
    bulletsDE: [
      'Systematische Fehleranalyse mit Mess- und Prüfprotokoll – nicht nur reparieren, sondern verstehen, warum es ausgefallen ist',
      'Instandsetzung auf Bauteilebene: kein pauschaler Baugruppentausch, wenn eine gezielte Reparatur wirtschaftlicher ist',
      'Schnelldurchlauf für geschäftskritische Ausfälle – Express-Service mit definierten Reaktionszeiten',
      'Reparaturdokumentation mit Fotodokumentation und Rückverfolgbarkeit für sicherheitsrelevante Anwendungen',
      'Optional: Dauerauftrag für wiederkehrende Instandhaltung mit garantierten Kapazitäten und Festpreisen',
    ],
    bulletsEN: [
      'Systematic failure analysis with measurement and test protocol – not just repair, but understanding why it failed',
      'Component-level repair: no blanket assembly replacement when targeted repair is more economical',
      'Fast track for business-critical failures – express service with defined response times',
      'Repair documentation with photo documentation and traceability for safety-relevant applications',
      'Optional: standing order for recurring maintenance with guaranteed capacities and fixed prices',
    ],
  },
  {
    icon: HeartHandshake,
    titleDE: 'Langzeit-Support & Produktpflege',
    titleEN: 'Long-term Support & Product Maintenance',
    descDE: 'Ihr Produkt bleibt marktfähig – CME begleitet den gesamten Produktlebenszyklus von der Entwicklung bis zur Abkündigung. Wir stellen sicher, dass Ihre Elektronik auch Jahre nach dem ursprünglichen Entwicklungsprojekt technisch betreut und weiterentwickelt wird.',
    descEN: 'Your product stays market-ready – CME accompanies the entire product lifecycle from development to end-of-life. We ensure that your electronics receive technical support and further development even years after the original development project.',
    bulletsDE: [
      'Technischer Support für laufende Serien auch Jahre nach dem ursprünglichen Entwicklungsprojekt',
      'Firmware- und Software-Updates für bestehende Produkte – ohne Neuentwicklung der Hardware',
      'Archivierung aller Entwicklungsunterlagen, Schaltpläne, Layouts und Fertigungsdaten mit definierter Aufbewahrungsfrist',
      'Änderungsmanagement bei regulatorischen Anforderungen: neue Normen oder Direktiven werden in bestehende Produkte eingearbeitet, ohne Zulassung zu gefährden',
      'Ihr Produkt bleibt marktfähig – CME begleitet den gesamten Produktlebenszyklus von der Entwicklung bis zur Abkündigung',
    ],
    bulletsEN: [
      'Technical support for running series even years after the original development project',
      'Firmware and software updates for existing products – without redeveloping the hardware',
      'Archiving of all development documents, schematics, layouts and manufacturing data with defined retention periods',
      'Change management for regulatory requirements: new standards or directives are incorporated into existing products without jeopardizing certification',
      'Your product stays market-ready – CME accompanies the entire product lifecycle from development to end-of-life',
    ],
  },
];

const repairItems = [
  {
    icon: Gauge,
    titleDE: 'Frequenzumrichter & Antriebsregler',
    titleEN: 'Frequency Inverters & Drive Controllers',
    bulletsDE: [
      'Marktf\u00fchrer wie Siemens SINAMICS, ABB ACS, Danfoss, Lenze und SEW mit Neuwert von 2.000 bis \u00fcber 50.000 \u20ac',
      'Lieferzeiten f\u00fcr Neuger\u00e4te aktuell 12\u201324 Monate \u2013 Produktionsstillstand oft nicht tolerierbar',
      'CME repariert auf Bauteilebene: IGBT-Treiber, Steuerplatinen, Netzteile und Regelkarten',
    ],
    bulletsEN: [
      'Market leaders like Siemens SINAMICS, ABB ACS, Danfoss, Lenze and SEW with replacement cost from \u20ac2,000 to over \u20ac50,000',
      'Lead times for new devices currently 12\u201324 months \u2013 production downtime often not tolerable',
      'CME repairs at component level: IGBT drivers, control boards, power supplies and control cards',
    ],
  },
  {
    icon: Cpu,
    titleDE: 'Servo-Umrichter & Servoverst\u00e4rker',
    titleEN: 'Servo Inverters & Servo Amplifiers',
    bulletsDE: [
      'Siemens SIMODRIVE/SINAMICS S, Bosch Rexroth, Fanuc, Mitsubishi \u2013 Neuwert oft 5.000 bis 30.000 \u20ac pro Achse',
      'Ausfall eines Servoverst\u00e4rkers legt oft die gesamte Fertigungslinie still',
      'Reparatur inkl. Funktionstest unter Last und vollständiger Dokumentation',
    ],
    bulletsEN: [
      'Siemens SIMODRIVE/SINAMICS S, Bosch Rexroth, Fanuc, Mitsubishi \u2013 replacement cost often \u20ac5,000 to \u20ac30,000 per axis',
      'Failure of a servo amplifier often shuts down the entire production line',
      'Repair including functional test under load and full documentation',
    ],
  },
  {
    icon: Server,
    titleDE: 'SPS & Industrie-PC Baugruppen',
    titleEN: 'PLC & Industrial PC Modules',
    bulletsDE: [
      'Siemens S5 und S7-300 offiziell abgek\u00fcndigt \u2013 trotzdem noch millionenfach im Einsatz',
      'Ersatz bedeutet h\u00e4ufig komplette Neuprogrammierung und Zulassungsaufwand',
      'CME repariert CPU-Karten, Digital-/Analogbaugruppen und Kommunikationsbaugruppen auf Komponentenebene',
    ],
    bulletsEN: [
      'Siemens S5 and S7-300 officially discontinued \u2013 yet still in use millions of times',
      'Replacement often means complete reprogramming and certification effort',
      'CME repairs CPU cards, digital/analog modules and communication modules at component level',
    ],
  },
  {
    icon: MonitorCog,
    titleDE: 'CNC-Steuerungen & Achskarten',
    titleEN: 'CNC Controllers & Axis Cards',
    bulletsDE: [
      'Siemens SINUMERIK, Fanuc, Heidenhain, Mitsubishi \u2013 Steuerungen mit Neuwert von 10.000 bis 80.000 \u20ac',
      'Ausfallbedingte Maschinenstillst\u00e4nde kosten in der Zerspanung schnell 5-stellige Betr\u00e4ge pro Tag',
      'Reparatur von Hauptrechnern, Achskarten, Messsystemplatinen und Bedieneinheiten',
    ],
    bulletsEN: [
      'Siemens SINUMERIK, Fanuc, Heidenhain, Mitsubishi \u2013 controllers with replacement cost from \u20ac10,000 to \u20ac80,000',
      'Downtime-related machine stoppages in machining quickly cost five-figure amounts per day',
      'Repair of main computers, axis cards, measurement system boards and operator panels',
    ],
  },
  {
    icon: Zap,
    titleDE: 'IGBT-Module & Leistungselektronik',
    titleEN: 'IGBT Modules & Power Electronics',
    bulletsDE: [
      'Hochleistungsmodule von Infineon, Semikron, Mitsubishi \u2013 Einzelpreise von 500 bis weit \u00fcber 5.000 \u20ac',
      'Fehlerhafte IGBT-Module sind h\u00e4ufigste Ausfallursache bei Frequenzumrichtern und Schwei\u00dfger\u00e4ten',
      'CME tauscht auf Modulebene und pr\u00fcft die gesamte Treiberschaltung und Schutzlogik mit',
    ],
    bulletsEN: [
      'High-performance modules from Infineon, Semikron, Mitsubishi \u2013 unit prices from \u20ac500 to well over \u20ac5,000',
      'Faulty IGBT modules are the most common cause of failure in frequency inverters and welding equipment',
      'CME replaces at module level and tests the entire driver circuit and protection logic',
    ],
  },
  {
    icon: Bot,
    titleDE: 'Robotersteuerungen',
    titleEN: 'Robot Controllers',
    bulletsDE: [
      'ABB IRC, KUKA KRC, Fanuc R-30 \u2013 Steuerungen mit Neuwert von 15.000 bis 60.000 \u20ac',
      'Roboterausfall in der Automobilproduktion oder Logistik bedeutet sofortigen Linien-Stopp',
      'Reparatur von Leistungsplatinen, Achsrechnern, Sicherheitsbaugruppen und I/O-Karten',
    ],
    bulletsEN: [
      'ABB IRC, KUKA KRC, Fanuc R-30 \u2013 controllers with replacement cost from \u20ac15,000 to \u20ac60,000',
      'Robot failure in automotive production or logistics means immediate line stop',
      'Repair of power boards, axis computers, safety modules and I/O cards',
    ],
  },
  {
    icon: Monitor,
    titleDE: 'HMI & Industrie-Bedienerpanels',
    titleEN: 'HMI & Industrial Operator Panels',
    bulletsDE: [
      'Siemens TP/MP-Serie, Weintek, Pro-face, B&R \u2013 viele Modelle abgek\u00fcndigt und nicht mehr lieferbar',
      'Displayausfall oder Touchscreen-Fehler macht die gesamte Maschine unbedienbar',
      'CME repariert Displays, Touchscreens, Netzteile und Steuerplatinen auf Komponentenebene',
    ],
    bulletsEN: [
      'Siemens TP/MP series, Weintek, Pro-face, B&R \u2013 many models discontinued and no longer available',
      'Display failure or touchscreen error makes the entire machine inoperable',
      'CME repairs displays, touchscreens, power supplies and control boards at component level',
    ],
  },
  {
    icon: Flame,
    titleDE: 'Schwei\u00dfsteuerungen & Prozesselektronik',
    titleEN: 'Welding Controllers & Process Electronics',
    bulletsDE: [
      'Schwei\u00dfsteuerungen von Fronius, Lincoln Electric, EWM, Kemppi \u2013 kritisch in Automotive und Metallverarbeitung',
      'Ausfall trifft oft mehrere Arbeitspl\u00e4tze gleichzeitig, wenn eine zentrale Steuerung ausf\u00e4llt',
      'Reparatur von Inverterplatinen, Steuerungselektronik und Kommunikationsmodulen',
    ],
    bulletsEN: [
      'Welding controllers from Fronius, Lincoln Electric, EWM, Kemppi \u2013 critical in automotive and metal processing',
      'Failure often affects multiple workstations simultaneously when a central controller fails',
      'Repair of inverter boards, control electronics and communication modules',
    ],
  },
  {
    icon: BatteryCharging,
    titleDE: 'Industrielle Netzteile & USV-Elektronik',
    titleEN: 'Industrial Power Supplies & UPS Electronics',
    bulletsDE: [
      'Prim\u00e4r- und Sekund\u00e4rnetzteile in Schaltschr\u00e4nken, Maschinen und sicherheitsrelevanten Anlagen',
      'Netzteilausfall legt oft die gesamte Steuerungsebene einer Anlage lahm \u2013 Folgesch\u00e4den inklusive',
      'CME analysiert Ausfallursache und repariert auf Bauteilebene statt pauschalem Komplettaustausch',
    ],
    bulletsEN: [
      'Primary and secondary power supplies in control cabinets, machines and safety-relevant systems',
      'Power supply failure often paralyzes the entire control level of a system \u2013 including consequential damage',
      'CME analyzes the cause of failure and repairs at component level instead of blanket complete replacement',
    ],
  },
];

/* ── FAQ Data ─────────────────────────────────────────────────── */
const faqItems = [
  {
    questionDE: 'Was kostet die Reparatur eines Frequenzumrichters oder einer Industriesteuerung?',
    questionEN: 'What does it cost to repair a frequency inverter or industrial controller?',
    answerDE: 'Einen Festpreis ohne Diagnose zu nennen wäre unseriös – der Aufwand hängt vom Fehlerbild, der Baugruppe und der Bauteilsituation ab. Die entscheidendere Frage lautet: Was kostet Sie der Ausfall? CME repariert ausschließlich hochwertige Industrieelektronik mit Neuwerten von mehreren Tausend bis über 50.000 Euro – Frequenzumrichter, Servo-Umrichter, CNC-Steuerungen, SPS-Baugruppen, Robotersteuerungen und Leistungsmodule. In diesem Segment ist professionelle Reparatur fast immer günstiger als Neuanschaffung – und vor allem schneller: Neugeräte haben heute Lieferzeiten von 12 bis 36 Monaten. Eine CME-Reparatur dauert Tage bis Wochen.',
    answerEN: 'Quoting a fixed price without diagnosis would be unprofessional – the effort depends on the fault pattern, the assembly and the component situation. The more decisive question is: What does the downtime cost you? CME exclusively repairs high-value industrial electronics with replacement costs from several thousand to over 50,000 euros – frequency inverters, servo inverters, CNC controllers, PLC modules, robot controllers and power modules. In this segment, professional repair is almost always cheaper than new procurement – and above all faster: new devices currently have lead times of 12 to 36 months. A CME repair takes days to weeks.',
  },
  {
    questionDE: 'Lohnt sich die Reparatur einer Industriesteuerung – oder ist ein Neukauf günstiger?',
    questionEN: 'Is it worth repairing an industrial controller – or is buying new cheaper?',
    answerDE: 'Bei günstiger Massenware lohnt Reparatur nicht – die reparieren wir auch nicht. CME spezialisiert sich auf Industrieelektronik deren Ausfall unmittelbar zu Produktionsstillstand führt: Frequenzumrichter, Servoverstärker, CNC-Steuerungen, Robotersteuerungen und IGBT-Leistungsmodule. Ein ungeplanter Produktionsausfall kostet je nach Branche zwischen 5.000 und 50.000 Euro pro Stunde. Vor diesem Hintergrund stellt sich nicht die Frage ob sich Reparatur lohnt – sondern wie schnell sie verfügbar ist.',
    answerEN: 'For cheap mass-produced goods, repair is not worthwhile – and we don\'t repair those either. CME specializes in industrial electronics whose failure immediately leads to production standstill: frequency inverters, servo amplifiers, CNC controllers, robot controllers and IGBT power modules. An unplanned production outage costs between 5,000 and 50,000 euros per hour depending on the industry. Against this background, the question is not whether repair is worthwhile – but how quickly it is available.',
  },
  {
    questionDE: 'Frequenzumrichter defekt – wie schnell kann CME helfen?',
    questionEN: 'Frequency inverter defective – how quickly can CME help?',
    answerDE: 'Bei akutem Produktionsstillstand greifen wir mit Express-Priorisierung ein. Fehleranalyse beginnt in der Regel innerhalb von 48 Stunden nach Eingang. Wie lange die Instandsetzung dauert hängt vom Fehlerbild und der Bauteilsituation ab – bei verfügbaren Komponenten oft 2 bis 5 Werktage. Wir informieren Sie transparent über jeden Schritt damit Sie Ihren Betrieb planen können. Kein Warten auf Herstellerhotlines, kein Ticketsystem – direkter Ansprechpartner von Anfang an.',
    answerEN: 'In case of acute production standstill, we intervene with express prioritization. Fault analysis typically begins within 48 hours of receipt. How long the repair takes depends on the fault pattern and component situation – with available components often 2 to 5 working days. We inform you transparently about every step so you can plan your operations. No waiting for manufacturer hotlines, no ticket system – direct contact person from the start.',
  },
  {
    questionDE: 'Repariert CME auch Siemens-, ABB-, Fanuc- oder KUKA-Geräte?',
    questionEN: 'Does CME also repair Siemens, ABB, Fanuc or KUKA devices?',
    answerDE: 'Ja – CME ist herstellerunabhängig und repariert Geräte aller gängigen Industriemarken: Siemens SINAMICS, SIMODRIVE und SINUMERIK, ABB ACS-Serie, Danfoss, Lenze, SEW-Eurodrive, Bosch Rexroth, Fanuc, Mitsubishi Electric, KUKA, ABB Robotics, Heidenhain und weitere. Wir arbeiten auf Bauteilebene – das bedeutet echte Reparatur, kein pauschaler Austausch ganzer Baugruppen auf Ihre Kosten.',
    answerEN: 'Yes – CME is manufacturer-independent and repairs devices from all common industrial brands: Siemens SINAMICS, SIMODRIVE and SINUMERIK, ABB ACS series, Danfoss, Lenze, SEW-Eurodrive, Bosch Rexroth, Fanuc, Mitsubishi Electric, KUKA, ABB Robotics, Heidenhain and more. We work at component level – that means real repair, not blanket replacement of entire assemblies at your expense.',
  },
  {
    questionDE: 'Siemens S5 / S7-300 abgekündigt – kann CME diese Steuerungen noch reparieren?',
    questionEN: 'Siemens S5 / S7-300 discontinued – can CME still repair these controllers?',
    answerDE: 'Ja, und genau das ist oft unser stärkstes Argument. Abgekündigte Systeme wie Siemens S5, ältere SINUMERIK- oder SIMODRIVE-Generationen sind nicht mehr neu lieferbar – aber noch millionenfach im Einsatz. Ein Komplettaustausch bedeutet Neuprogrammierung, Umbau und Zulassungsaufwand – oft zehnmal teurer als die Reparatur. CME hält diese Systeme am Laufen solange es technisch möglich ist, und beschafft Originalbauteile über spezialisierte Marktkanäle und Broker-Netzwerke.',
    answerEN: 'Yes, and that is often our strongest argument. Discontinued systems like Siemens S5, older SINUMERIK or SIMODRIVE generations are no longer available new – but still in use millions of times. A complete replacement means reprogramming, conversion and certification effort – often ten times more expensive than repair. CME keeps these systems running as long as technically possible, and procures original components through specialized market channels and broker networks.',
  },
  {
    questionDE: 'Keine Schaltpläne mehr vorhanden – geht die Reparatur trotzdem?',
    questionEN: 'No schematics available anymore – is repair still possible?',
    answerDE: 'In den meisten Fällen ja. CME arbeitet regelmäßig ohne Dokumentation – durch systematische Messung, Reverse Engineering und jahrelange Erfahrung mit Schaltungstopologien aus Antriebstechnik und Leistungselektronik. Wo es sinnvoll ist, erstellen wir eine Basisdokumentation als Grundlage für künftige Reparaturen – unabhängig davon ob der ursprüngliche Hersteller noch existiert oder Unterlagen liefert.',
    answerEN: 'In most cases, yes. CME regularly works without documentation – through systematic measurement, reverse engineering and years of experience with circuit topologies from drive technology and power electronics. Where it makes sense, we create basic documentation as a foundation for future repairs – regardless of whether the original manufacturer still exists or provides documents.',
  },
  {
    questionDE: 'Das defekte Bauteil ist nicht mehr erhältlich – was macht CME dann?',
    questionEN: 'The defective component is no longer available – what does CME do then?',
    answerDE: 'Genau das ist eine CME-Kernkompetenz. Über unser Netzwerk aus Distributoren, Broker-Kontakten und Restbeständen finden wir oft noch Originalkomponenten die am freien Markt nicht mehr verfügbar scheinen – IGBT-Module, spezialisierte Treiber-ICs, Steuer-ASICs und ähnliches. Wo das nicht möglich ist, qualifizieren wir geeignete Ersatzbauteile elektrisch, thermisch und mechanisch. Echtheitsprüfung zum Schutz vor gefälschten Industriebauteilen ist dabei Standard.',
    answerEN: 'That is precisely a CME core competency. Through our network of distributors, broker contacts and remaining stocks, we often still find original components that appear no longer available on the open market – IGBT modules, specialized driver ICs, control ASICs and similar. Where that is not possible, we qualify suitable replacement components electrically, thermally and mechanically. Authenticity testing to protect against counterfeit industrial components is standard.',
  },
  {
    questionDE: 'Welche Garantie gibt es auf eine Reparatur bei CME?',
    questionEN: 'What guarantee is there on a repair at CME?',
    answerDE: 'Jede Reparatur wird vor der Auslieferung elektrisch geprüft und mit Prüfprotokoll dokumentiert. Garantiebedingungen besprechen wir individuell – je nach Gerät, Fehlerbild und Einsatzbedingung. Bei sicherheitsrelevanten Anwendungen erhalten Sie auf Wunsch vollständige Rückverfolgbarkeit aller getauschten Bauteile inklusive Chargendokumentation.',
    answerEN: 'Every repair is electrically tested before delivery and documented with a test protocol. Warranty conditions are discussed individually – depending on the device, fault pattern and operating conditions. For safety-relevant applications, you receive full traceability of all replaced components including batch documentation on request.',
  },
  {
    questionDE: 'Für welche Branchen und Anlagen repariert CME Elektronik?',
    questionEN: 'For which industries and systems does CME repair electronics?',
    answerDE: 'Überall dort wo Elektronik teuer, kritisch oder schwer ersetzbar ist: Maschinenbau und Sondermaschinenbau, Automotive-Produktion, Druckindustrie, Lebensmittelproduktion, Chemie und Verfahrenstechnik, Energieversorgung, Windkraft und erneuerbare Energien, Bahntechnik sowie medizinische Gerätetechnik. Wenn der Ausfall Ihrer Elektronik eine Produktionslinie stoppt – ist CME der richtige Ansprechpartner.',
    answerEN: 'Wherever electronics are expensive, critical or hard to replace: mechanical engineering and special machine construction, automotive production, printing industry, food production, chemistry and process engineering, energy supply, wind power and renewable energies, railway technology and medical device technology. If the failure of your electronics stops a production line – CME is the right partner.',
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
      {/* Content always in DOM for SEO (visibility toggled) */}
      <div className={isOpen ? '' : 'sr-only'} aria-hidden={!isOpen}>
        <p className="fluid-body text-gray-600 leading-relaxed pb-5 px-1">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function Lifecycle() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  const { t: cms, img, vid } = useContent('lifecycle');

  // Hero video: CMS overrides hardcoded default
  const cmsVideoWebm = vid('hero.heroVideoWebm');
  const cmsVideoMp4 = vid('hero.heroVideoMp4');
  const cmsVideoPoster = img('hero.heroVideoPoster');
  const cmsVideoPlayback = cms('hero.heroVideoPlayback') as 'loop' | 'once' | '';
  const effectiveHeroVideo = (cmsVideoWebm || cmsVideoMp4)
    ? { webm: cmsVideoWebm || undefined, mp4: cmsVideoMp4 || undefined, poster: cmsVideoPoster || undefined, playback: (cmsVideoPlayback === 'once' ? 'once' : 'loop') as 'loop' | 'once' }
    : { webm: HERO_VIDEO_WEBM, mp4: HERO_VIDEO_MP4, poster: HERO_VIDEO_POSTER };

  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderTopic, setSliderTopic] = useState('');
  const openSlider = (topic: string) => { setSliderTopic(topic); setSliderOpen(true); };

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

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
    <Layout>
      <SEO
        titleDE='Lifecycle & Obsolescence Management | CME'
        titleEN='Lifecycle & Obsolescence Management | CME'
        descriptionDE='Obsolescence Management & Elektronik-Lifecycle: CME sichert Ihre Produktion auch wenn Bauteile abgekündigt werden. Langzeitverfügbarkeit für Industrie & Automotive.'
        descriptionEN='Obsolescence management & electronics lifecycle: CME secures your production even when components are discontinued. Long-term availability for industry & automotive.'
        path='/lifecycle'
        enPath='/en/lifecycle'
        breadcrumbs={[{name:'Home',url:'/'},{name:'Lifecycle Management',url:'/lifecycle'}]}
        additionalSchemas={[faqSchema]}
      />
      <SubPageHero
        tagline={cms('hero.tagline') || 'Lifecycle Services'}
        headline={cms('hero.headline') || (isDE ? 'Wir begleiten Ihr Produkt. Über den gesamten Lebenszyklus.' : 'We support your product. Throughout the entire lifecycle.')}
        description={cms('hero.description') || (isDE
          ? 'Elektronik lebt länger als die Bauteile, aus denen sie besteht. CME sichert die Verfügbarkeit Ihrer Produkte durch proaktives Obsolescence Management, Redesign-Services und langfristige Ersatzteilversorgung.'
          : 'Electronics outlive the components they are made of. CME ensures the availability of your products through proactive obsolescence management, redesign services and long-term spare parts supply.')}
        cta={{ label: isDE ? 'Beratung anfragen' : 'Request Consultation', href: '/kontakt' }}
        heroVideo={effectiveHeroVideo}
      />

      {/* Services */}
      <section className="section-pad">
        <div className="container">
          <div className="grid md:grid-cols-2" style={{ gap: 'var(--space-gap-md)' }}>
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-cme-blue/20 transition-all fluid-card cursor-pointer"
                onClick={() => openSlider(isDE ? service.titleDE : service.titleEN)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSlider(isDE ? service.titleDE : service.titleEN); } }}
              >
                <div
                  className="rounded-xl bg-cme-blue-light flex items-center justify-center"
                  style={{ width: 'var(--icon-box)', height: 'var(--icon-box)', marginBottom: 'var(--space-gap-xs)' }}
                >
                  <service.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                </div>
                <h3 className="fluid-h4 text-cme-dark" style={{ marginBottom: 'var(--space-gap-xs)' }}>
                  {isDE ? service.titleDE : service.titleEN}
                </h3>
                <p className="text-gray-600 leading-relaxed fluid-body">
                  {isDE ? service.descDE : service.descEN}
                </p>
                {service.bulletsDE && service.bulletsDE.length > 0 && (
                  <ul className="space-y-1.5" style={{ marginTop: 'var(--space-gap-xs)' }}>
                    {(isDE ? service.bulletsDE : service.bulletsEN).map((item, j) => (
                      <li key={j} className="flex items-start gap-2 fluid-small text-gray-600">
                        <CheckCircle2 className="text-cme-blue shrink-0 mt-0.5" size={14} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Section: Diese Elektronik lohnt sich zu reparieren */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center" style={{ marginBottom: 'var(--space-gap-lg)' }}>
            <h2 className="fluid-h2 text-cme-dark">
              {isDE ? 'Diese Elektronik lohnt sich zu reparieren' : 'This Electronics Is Worth Repairing'}
            </h2>
            <p className="text-gray-600 fluid-body-lg" style={{ marginTop: 'var(--space-gap-xs)' }}>
              {isDE
                ? 'Hohe Ersatzteilkosten, lange Lieferzeiten, kritische Funktion \u2013 hier rechnet sich professionelle Instandsetzung fast immer.'
                : 'High spare part costs, long delivery times, critical function \u2013 professional repair almost always pays off here.'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-md)' }}>
            {repairItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-cme-blue/20 transition-all fluid-card cursor-pointer"
                onClick={() => openSlider(isDE ? `Reparatur von ${item.titleDE}` : `Repair of ${item.titleEN}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSlider(isDE ? `Reparatur von ${item.titleDE}` : `Repair of ${item.titleEN}`); } }}
              >
                <div
                  className="rounded-xl bg-cme-blue-light flex items-center justify-center"
                  style={{ width: 'var(--icon-box)', height: 'var(--icon-box)', marginBottom: 'var(--space-gap-xs)' }}
                >
                  <item.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                </div>
                <h3 className="fluid-h4 text-cme-dark" style={{ marginBottom: 'var(--space-gap-xs)' }}>
                  {isDE ? item.titleDE : item.titleEN}
                </h3>
                <ul className="space-y-1.5">
                  {(isDE ? item.bulletsDE : item.bulletsEN).map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2 fluid-small text-gray-600">
                      <CheckCircle2 className="text-cme-blue shrink-0 mt-0.5" size={14} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-pad">
        <div className="container" style={{ maxWidth: 'min(80%, 72rem)' }}>
          <div className="text-center" style={{ marginBottom: 'var(--space-section-header)' }}>
            <h2 className="fluid-h2 text-cme-dark">
              {isDE ? 'H\u00e4ufige Fragen zur Reparatur von Industrieelektronik' : 'Frequently Asked Questions About Industrial Electronics Repair'}
            </h2>
            <p className="text-gray-600 fluid-body-lg" style={{ marginTop: 'var(--space-gap-xs)' }}>
              {isDE
                ? 'Antworten auf die wichtigsten Fragen rund um Reparatur, Kosten, Lieferzeit und Obsoleszenz'
                : 'Answers to the most important questions about repair, costs, delivery time and obsolescence'}
            </p>
          </div>
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

      {/* Why Lifecycle */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="fluid-h2 text-cme-dark">
              {isDE ? 'Warum Lifecycle Services?' : 'Why Lifecycle Services?'}
            </h2>
            <p className="text-gray-600 leading-relaxed fluid-body-lg" style={{ marginTop: 'var(--space-gap-sm)' }}>
              {isDE
                ? 'Die durchschnittliche Lebensdauer eines Elektronikprodukts im Industriebereich beträgt 15-20 Jahre. In dieser Zeit werden Bauteile abgekündigt, Normen aktualisiert und Fertigungstechnologien weiterentwickelt. Ohne aktives Lifecycle Management riskieren Sie Produktionsausfälle und teure Notfall-Redesigns. CME bietet Ihnen die Sicherheit einer langfristigen Partnerschaft.'
                : 'The average lifetime of an electronics product in the industrial sector is 15-20 years. During this time, components are discontinued, standards are updated and manufacturing technologies evolve. Without active lifecycle management, you risk production outages and expensive emergency redesigns. CME offers you the security of a long-term partnership.'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container text-center">
          <h2 className="fluid-h2 text-cme-dark">
            {isDE ? 'Abkündigungen kommen. Die Frage ist, ob Sie vorbereitet sind.' : 'Obsolescence is coming. The question is whether you\'re prepared.'}
          </h2>
          <p className="text-gray-600 fluid-body-lg max-w-xl mx-auto" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Wir analysieren Ihre Stückliste auf Obsoleszenz-Risiken und zeigen konkrete Handlungsoptionen.'
              : 'We analyze your BOM for obsolescence risks and show concrete options.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
            style={{ marginTop: 'var(--space-gap-md)' }}
          >
            {isDE ? 'BOM-Analyse anfragen' : 'Request BOM analysis'}
          </Link>
        </div>
      </section>

      <ContactSlider
        isOpen={sliderOpen}
        onClose={() => setSliderOpen(false)}
        topic={sliderTopic}
        pageSource={`lifecycle – ${sliderTopic}`}
      />
    </Layout>
  );
}
