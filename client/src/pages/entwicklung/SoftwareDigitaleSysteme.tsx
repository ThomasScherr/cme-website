import SubPageTemplate from '@/components/SubPageTemplate';
import { Globe, Smartphone, Server, Cloud, RefreshCw } from 'lucide-react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

export default function SoftwareDigitaleSysteme() {
  return (
    <SubPageTemplate
      pageKey="entwicklung.softwaredigitalesysteme"
      parentHref="/entwicklung"
      parentLabelDE="Elektronikentwicklung"
      parentLabelEN="Electronics Development"
      titleDE="Software Engineering & Digitale Systeme"
      titleEN="Software Engineering & Digital Systems"
      subtitleDE="Web-Apps, Mobile Apps, Cloud-Integration und Backend-Architektur – die digitale Ebene Ihrer Elektronikprodukte."
      subtitleEN="Web apps, mobile apps, cloud integration and backend architecture – the digital layer of your electronic products."
      heroImg={`${CDN}/web-apps_26e3e533.png`}
      introDE="Elektronische Produkte brauchen heute mehr als Firmware. Sie brauchen Konfigurationstools, Diagnose-Dashboards, Cloud-Anbindung und mobile Companion-Apps. Bei CME entwickeln wir diese digitale Schicht als integralen Bestandteil des Produkts – nicht als nachträgliches Add-on. Unsere Software-Ingenieure arbeiten eng mit den Hardware- und Embedded-Teams zusammen, sodass die digitale Architektur von Anfang an zur Systemarchitektur passt."
      introEN="Electronic products today need more than firmware. They need configuration tools, diagnostic dashboards, cloud connectivity and mobile companion apps. At CME, we develop this digital layer as an integral part of the product – not as an afterthought. Our software engineers work closely with the hardware and embedded teams, ensuring the digital architecture fits the system architecture from the start."
      features={[
        {
          de: 'Webbasierte Anwendungen',
          en: 'Web-Based Applications',
          icon: Globe,
          bulletsDE: [
            'Konfigurationstools & Diagnose-Dashboards',
            'Monitoring & Steuerung technischer Systeme',
            'Industrietaugliche Frontends',
          ],
          bulletsEN: [
            'Configuration tools & diagnostic dashboards',
            'Monitoring & control of technical systems',
            'Industrial-grade frontends',
          ],
        },
        {
          de: 'Native & Mobile Apps',
          en: 'Native & Mobile Apps',
          icon: Smartphone,
          bulletsDE: [
            'iOS, Android & Embedded-Geräte',
            'Offline-Fähigkeit & Sensorintegration',
            'Service-Apps & Companion-Apps',
          ],
          bulletsEN: [
            'iOS, Android & embedded devices',
            'Offline capability & sensor integration',
            'Service apps & companion apps',
          ],
        },
        {
          de: 'Backend & Systemarchitektur',
          en: 'Backend & System Architecture',
          icon: Server,
          bulletsDE: [
            'API-Strukturen & Datenmodelle',
            'Microservice-Architekturen',
            'Schnittstellen zu Embedded, Cloud & Drittsystemen',
          ],
          bulletsEN: [
            'API structures & data models',
            'Microservice architectures',
            'Interfaces to embedded, cloud & third-party systems',
          ],
        },
        {
          de: 'Cloud- & Schnittstellenintegration',
          en: 'Cloud & Interface Integration',
          icon: Cloud,
          bulletsDE: [
            'IoT-Gateways & Cloud-Plattformen (AWS, Azure)',
            'Industrieprotokolle (OPC UA, MQTT)',
            'Durchgängige Systeme von Sensor bis ERP',
          ],
          bulletsEN: [
            'IoT gateways & cloud platforms (AWS, Azure)',
            'Industrial protocols (OPC UA, MQTT)',
            'End-to-end systems from sensor to ERP',
          ],
        },
        {
          de: 'Betrieb & Weiterentwicklung',
          en: 'Operations & Continuous Development',
          icon: RefreshCw,
          bulletsDE: [
            'Release-Management & Wartungskonzepte',
            'Monitoring & kontinuierliche Weiterentwicklung',
            'Digitale Infrastruktur wächst mit dem Produkt',
          ],
          bulletsEN: [
            'Release management & maintenance concepts',
            'Monitoring & continuous development',
            'Digital infrastructure grows with the product',
          ],
        },
      ]}
      ctaDE="Architektur besprechen"
      ctaEN="Discuss architecture"
    />
  );
}
