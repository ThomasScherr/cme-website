import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';

export default function AGB() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <Layout>
      <SEO
        titleDE="Allgemeine Geschäftsbedingungen"
        titleEN="Terms and Conditions"
        descriptionDE="Allgemeine Geschäftsbedingungen der CME Control Motion Electronics GmbH."
        descriptionEN="Terms and conditions of CME Control Motion Electronics GmbH."
        path="/agb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'AGB', url: '/agb' },
        ]}
      />
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-gray">
            <h1 className="text-3xl font-bold text-cme-dark">
              {isDE ? 'Allgemeine Geschäftsbedingungen' : 'Terms and Conditions'}
            </h1>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? '§ 1 Geltungsbereich' : '§ 1 Scope'}</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {isDE
                ? 'Diese Allgemeinen Geschäftsbedingungen gelten für alle Geschäftsbeziehungen der CME Control Motion Electronics GmbH (nachfolgend "CME") mit ihren Kunden. Es gilt die jeweils zum Zeitpunkt des Vertragsschlusses gültige Fassung.'
                : 'These General Terms and Conditions apply to all business relationships of CME Control Motion Electronics GmbH (hereinafter "CME") with its customers. The version valid at the time of conclusion of the contract applies.'}
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? '§ 2 Angebote und Vertragsschluss' : '§ 2 Offers and Contract Conclusion'}</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {isDE
                ? 'Unsere Angebote sind freibleibend und unverbindlich. Ein Vertrag kommt erst durch unsere schriftliche Auftragsbestätigung oder durch Ausführung der Lieferung zustande.'
                : 'Our offers are non-binding. A contract is only concluded through our written order confirmation or through execution of the delivery.'}
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? '§ 3 Preise und Zahlungsbedingungen' : '§ 3 Prices and Payment Terms'}</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {isDE
                ? 'Es gelten die zum Zeitpunkt der Bestellung gültigen Preise. Alle Preise verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer. Zahlungen sind innerhalb von 30 Tagen nach Rechnungsstellung ohne Abzug fällig.'
                : 'The prices valid at the time of the order apply. All prices are exclusive of statutory VAT. Payments are due within 30 days of invoicing without deduction.'}
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? '§ 4 Lieferung' : '§ 4 Delivery'}</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {isDE
                ? 'Liefertermine sind nur verbindlich, wenn sie von uns ausdrücklich schriftlich bestätigt wurden. Teillieferungen sind zulässig, soweit sie dem Kunden zumutbar sind.'
                : 'Delivery dates are only binding if they have been expressly confirmed by us in writing. Partial deliveries are permissible insofar as they are reasonable for the customer.'}
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? '§ 5 Geheimhaltung' : '§ 5 Confidentiality'}</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {isDE
                ? 'Beide Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erhaltenen vertraulichen Informationen geheim zu halten und nur für den vereinbarten Zweck zu verwenden.'
                : 'Both parties undertake to keep confidential all confidential information received in the course of cooperation and to use it only for the agreed purpose.'}
            </p>

            <div className="mt-12 p-6 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-xs">
                {isDE
                  ? 'Stand: April 2026. Diese AGB sind ein Platzhalter und müssen durch die rechtlich geprüften AGB der CME Control Motion Electronics GmbH ersetzt werden.'
                  : 'As of: April 2026. These T&C are a placeholder and must be replaced with the legally reviewed T&C of CME Control Motion Electronics GmbH.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
