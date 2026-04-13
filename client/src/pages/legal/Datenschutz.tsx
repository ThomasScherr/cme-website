import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';

export default function Datenschutz() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <Layout>
      <SEO
        titleDE="Datenschutzerklärung"
        titleEN="Privacy Policy"
        descriptionDE="Datenschutzerklärung der CME Control Motion Electronics GmbH."
        descriptionEN="Privacy policy of CME Control Motion Electronics GmbH."
        path="/datenschutz"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isDE ? 'Datenschutz' : 'Privacy Policy', url: '/datenschutz' },
        ]}
      />
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-gray">
            <h1 className="text-3xl font-bold text-cme-dark">{isDE ? 'Datenschutzerklärung' : 'Privacy Policy'}</h1>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? '1. Datenschutz auf einen Blick' : '1. Privacy at a Glance'}</h2>
            <h3 className="text-lg font-semibold text-cme-dark mt-4">{isDE ? 'Allgemeine Hinweise' : 'General Information'}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {isDE
                ? 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.'
                : 'The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to personally identify you.'}
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? '2. Verantwortliche Stelle' : '2. Responsible Party'}</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              CME Control Motion Electronics GmbH<br />
              Hauert 10<br />
              44227 Dortmund<br />
              {isDE ? 'Telefon' : 'Phone'}: +49 231 979 970-0<br />
              E-Mail: info@control-motion.de
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? '3. Datenerfassung auf dieser Website' : '3. Data Collection on This Website'}</h2>
            <h3 className="text-lg font-semibold text-cme-dark mt-4">{isDE ? 'Kontaktformular' : 'Contact Form'}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {isDE
                ? 'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.'
                : 'When you send us inquiries via the contact form, your details from the inquiry form, including the contact data you provided there, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions. We do not share this data without your consent.'}
            </p>

            <h3 className="text-lg font-semibold text-cme-dark mt-4">{isDE ? 'Server-Log-Dateien' : 'Server Log Files'}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {isDE
                ? 'Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt.'
                : 'The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us.'}
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? '4. Ihre Rechte' : '4. Your Rights'}</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {isDE
                ? 'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.'
                : 'You have the right to receive information about the origin, recipient and purpose of your stored personal data free of charge at any time. You also have the right to request the correction or deletion of this data.'}
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? '5. Cookies' : '5. Cookies'}</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {isDE
                ? 'Diese Website verwendet technisch notwendige Cookies, die für den Betrieb der Seite erforderlich sind. Es werden keine Tracking-Cookies oder Cookies zu Werbezwecken eingesetzt.'
                : 'This website uses technically necessary cookies that are required for the operation of the site. No tracking cookies or cookies for advertising purposes are used.'}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
