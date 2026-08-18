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
        descriptionDE="Impressum der CME Control Motion Electronics GmbH in Dortmund. Angaben gemäß § 5 TMG, Handelsregister und Kontaktdaten."
        descriptionEN="Legal notice of CME Control Motion Electronics GmbH in Dortmund. Information per § 5 TMG, trade register and contact details."
        path="/impressum"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: isDE ? 'Impressum' : 'Legal Notice', url: '/impressum' },
        ]}
      />
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-gray">
            <h1 className="text-3xl font-bold text-cme-dark">
              {isDE ? 'Impressum' : 'Legal Notice'}
            </h1>

            <p className="text-gray-600 leading-relaxed mt-8">
              CME Control Motion Electronics GmbH<br />
              Alter Hellweg 48<br />
              44379 Dortmund
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">
              {isDE ? 'Vertreten durch' : 'Represented by'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Steffen Katzer, Matthias Markmann
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">
              {isDE ? 'Registereintrag' : 'Register Entry'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isDE ? 'Eintragung im Handelsregister' : 'Entry in the commercial register'}<br />
              {isDE ? 'Registergericht: Amtsgericht Dortmund' : 'Register court: Dortmund Local Court (Amtsgericht Dortmund)'}<br />
              {isDE ? 'Registernummer' : 'Register number'}: HRB 26236
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">
              {isDE ? 'Kontakt' : 'Contact'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isDE ? 'Telefon' : 'Phone'}: +49 231 28 66 76 96-0<br />
              E-Mail: info@control-motion.de
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">
              {isDE ? 'Umsatzsteuer-ID' : 'VAT ID'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isDE
                ? 'Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz'
                : 'VAT identification number according to § 27a of the Sales Tax Law'}:<br />
              DE293293479
            </p>

            <h2 className="text-xl font-bold text-cme-dark mt-8">
              {isDE
                ? 'Verbraucherstreitbeilegung / Universalschlichtungsstelle'
                : 'Consumer Dispute Resolution / Universal Arbitration Board'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isDE
                ? 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
                : 'We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.'}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
