import SubPageTemplate from '@/components/SubPageTemplate';
import {
  Radio,
  Award,
  Snowflake,
  Activity,
  SquareFunction,
  CircuitBoard,
  Zap,
  Clock,
  Wrench,
} from 'lucide-react';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y';

export default function TestVerifikation() {
  return (
    <SubPageTemplate
      parentHref="/entwicklung"
      parentLabelDE="Elektronikentwicklung"
      parentLabelEN="Electronics Development"
      titleDE="Test & Verification"
      titleEN="Test & Verification"
      subtitleDE="EMV-Tests, Umwelttests und funktionale Verifikation – in unserer eigenen Testinfrastruktur am Standort Dortmund."
      subtitleEN="EMC tests, environmental tests and functional verification – in our own test infrastructure in Dortmund."
      heroImg="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2885__1920px_ecd3ed1e.jpg"
      introDE="Qualität beginnt bei der Verifikation. CME verfügt über eine eigene Testinfrastruktur am Standort Dortmund – von der EMV-Vorkammer über Klimaschränke bis zum automatisierten Funktionstest. Wir testen Ihre Elektronik nach den relevanten Normen und Standards, bevor sie in die Serie geht. So stellen wir sicher, dass Ihr Produkt nicht nur funktioniert, sondern auch die Zulassungsanforderungen erfüllt."
      introEN="Quality starts with verification. CME has its own test infrastructure at the Dortmund site – from EMC pre-compliance chambers through climate chambers to automated functional testing. We test your electronics according to relevant norms and standards before series production. This ensures your product not only works, but also meets certification requirements."
      features={[
        { de: 'EMV-Vorabprüfung (eigene Vorkammer)', en: 'EMC Pre-Compliance (own chamber)', icon: Radio },
        { de: 'EMV-Qualifikation nach Automotive & Industrienormen', en: 'EMC Qualification per Automotive & Industrial Standards', icon: Award },
        { de: 'Klimatests & Umwelttests', en: 'Climate & Environmental Tests', icon: Snowflake },
        { de: 'Vibrations- & Schocktests', en: 'Vibration & Shock Tests', icon: Activity },
        { de: 'Automatisierter Funktionstest (EOL)', en: 'Automated Functional Test (EOL)', icon: SquareFunction },
        { de: 'In-Circuit-Test (ICT)', en: 'In-Circuit Test (ICT)', icon: CircuitBoard },
        { de: 'Hochspannungsprüfung & Isolationstest', en: 'High Voltage & Insulation Test', icon: Zap },
        { de: 'Lebensdauertests & HALT/HASS', en: 'Lifetime Tests & HALT/HASS', icon: Clock },
        { de: 'Testkonzeptentwicklung & Prüfmittelbau', en: 'Test Concept Development & Fixture Design', icon: Wrench },
      ]}

      relatedPages={[
        { href: '/entwicklung/hardware-software', titleDE: 'Hard & Software Design', titleEN: 'Hard & Software Design', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2392__1920px_af02a6b7.jpg' },
        { href: '/entwicklung/simulation', titleDE: 'Simulation & Toolchain', titleEN: 'Simulation & Toolchain', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/thermosimulation-1500x1000-1_77e2afd4.jpg' },
      ]}
    />
  );
}
