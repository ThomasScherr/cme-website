import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';

export default function Impressum() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <Layout>
      <SEO
        titleDE="Impressum"
        titleEN="Legal Notice"
        descriptionDE="Impressum der CME Control Motion Electronics GmbH, Dortmund."
        descriptionEN="Legal notice of CME Control Motion Electronics GmbH, Dortmund."
        path="/impressum"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isDE ? 'Impressum' : 'Legal Notice', url: '/impressum' },
        ]}
      />
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-gray">
            <h1 className="text-3xl font-bold text-cme-dark">{isDE ? 'Impressum' : 'Legal Notice'}</h1>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? 'Angaben gemäß § 5 TMG' : 'Information according to § 5 TMG'}</h2>
            <p className="text-gray-600 leading-relaxed">
              CME Control Motion Electronics GmbH<br />
              Hauert 10<br />
              44227 Dortmund<br />
              {isDE ? 'Deutschland' : 'Germany'}
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? 'Vertreten durch' : 'Represented by'}</h2>
            <p className="text-gray-600 leading-relaxed">
              {isDE ? 'Geschäftsführer' : 'Managing Director'}: Dipl.-Ing. Thorsten Sienk
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? 'Kontakt' : 'Contact'}</h2>
            <p className="text-gray-600 leading-relaxed">
              {isDE ? 'Telefon' : 'Phone'}: +49 231 979 970-0<br />
              E-Mail: info@control-motion.de
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? 'Registereintrag' : 'Register Entry'}</h2>
            <p className="text-gray-600 leading-relaxed">
              {isDE ? 'Eintragung im Handelsregister' : 'Entry in the commercial register'}.<br />
              {isDE ? 'Registergericht' : 'Register court'}: Amtsgericht Dortmund<br />
              {isDE ? 'Registernummer' : 'Register number'}: HRB 22570
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? 'Umsatzsteuer-ID' : 'VAT ID'}</h2>
            <p className="text-gray-600 leading-relaxed">
              {isDE ? 'Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz' : 'VAT identification number according to § 27a of the Sales Tax Law'}:<br />
              DE 260 488 427
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV' : 'Responsible for content according to § 55 Abs. 2 RStV'}</h2>
            <p className="text-gray-600 leading-relaxed">
              Dipl.-Ing. Thorsten Sienk<br />
              Hauert 10<br />
              44227 Dortmund
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">{isDE ? 'Haftungsausschluss' : 'Disclaimer'}</h2>
            <h3 className="text-lg font-semibold text-cme-dark mt-4">{isDE ? 'Haftung für Inhalte' : 'Liability for Content'}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {isDE
                ? 'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.'
                : 'The contents of our pages were created with the greatest care. However, we cannot guarantee the accuracy, completeness and timeliness of the content.'}
            </p>

            <h3 className="text-lg font-semibold text-cme-dark mt-4">{isDE ? 'Haftung für Links' : 'Liability for Links'}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {isDE
                ? 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.'
                : 'Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents.'}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
