import Layout from '@/components/Layout';
import SubPageHero from '@/components/SubPageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { MapPin, Users, Calendar, Award } from 'lucide-react';

const TEAM_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_2392__1920px_af02a6b7.jpg';
const BUILDING_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/JK_0425__1920px_178fc1eb.jpg';

export default function Unternehmen() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  const stats = [
    { icon: Calendar, value: '2008', labelDE: 'Gegründet', labelEN: 'Founded' },
    { icon: MapPin, value: 'Dortmund', labelDE: 'Standort', labelEN: 'Location' },
    { icon: Award, value: 'ISO 9001', labelDE: 'Zertifiziert', labelEN: 'Certified' },
    { icon: Users, value: 'Inhabergeführt', labelDE: 'Unternehmen', labelEN: 'Company' },
  ];

  return (
    <Layout>
      <SubPageHero
        tagline={isDE ? 'Über CME' : 'About CME'}
        headline={isDE ? 'The Electronic Company.' : 'The Electronic Company.'}
        description={isDE
          ? 'CME Control Motion Electronics ist ein inhabergeführter Entwicklungsdienstleister und EMS-Partner mit Sitz in Dortmund. Seit 2008 entwickeln und fertigen wir elektronische Baugruppen und Systeme für anspruchsvolle Branchen.'
          : 'CME Control Motion Electronics is an owner-managed development service provider and EMS partner based in Dortmund. Since 2008, we have been developing and manufacturing electronic assemblies and systems for demanding industries.'}
        heroImage={BUILDING_IMG}
        heroImageAlt="CME Gebäude"
      />

      {/* Stats */}
      <section className="section-pad-sm bg-white">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 'var(--space-gap-sm)' }}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center fluid-card"
              >
                <div
                  className="rounded-xl bg-cme-blue-light flex items-center justify-center mx-auto"
                  style={{
                    width: 'var(--icon-box)',
                    height: 'var(--icon-box)',
                    marginBottom: 'var(--space-gap-xs)',
                  }}
                >
                  <stat.icon style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
                </div>
                <div className="fluid-h2 text-cme-dark">{stat.value}</div>
                <div className="text-gray-500 fluid-small" style={{ marginTop: 'clamp(0.125rem, 0.05rem + 0.15vw, 0.25rem)' }}>{isDE ? stat.labelDE : stat.labelEN}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad">
        <div className="container">
          <div className="grid lg:grid-cols-2 items-center" style={{ gap: 'var(--space-gap-lg)' }}>
            <div>
              <h2 className="fluid-h2 text-cme-dark">
                {isDE ? 'Unsere Geschichte' : 'Our Story'}
              </h2>
              <div className="text-gray-600 leading-relaxed fluid-body-lg" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gap-xs)', marginTop: 'var(--space-gap-sm)' }}>
                <p>
                  {isDE
                    ? 'CME wurde 2008 in Dortmund gegründet – mit der Vision, Elektronikentwicklung und -fertigung unter einem Dach zu vereinen. Was als Ingenieurbüro begann, ist heute ein etablierter Entwicklungsdienstleister und EMS-Partner mit eigener Fertigungsstätte.'
                    : 'CME was founded in 2008 in Dortmund – with the vision of uniting electronics development and manufacturing under one roof. What started as an engineering office is today an established development service provider and EMS partner with its own manufacturing facility.'}
                </p>
                <p>
                  {isDE
                    ? 'Unser Fokus auf Leistungselektronik, Antriebstechnik und thermisch anspruchsvolle Projekte hat uns zum bevorzugten Partner für Unternehmen gemacht, die mehr als Standard-EMS suchen. Wir verstehen nicht nur die Fertigung, sondern auch die Entwicklung – und genau das macht den Unterschied.'
                    : 'Our focus on power electronics, drive technology and thermally demanding projects has made us the preferred partner for companies looking for more than standard EMS. We understand not only manufacturing, but also development – and that makes all the difference.'}
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={TEAM_IMG}
                alt={isDE ? 'CME Team' : 'CME Team'}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-gray-50">
        <div className="container">
          <h2 className="fluid-h2 text-cme-dark text-center">
            {isDE ? 'Was uns antreibt' : 'What drives us'}
          </h2>
          <div className="grid md:grid-cols-3" style={{ gap: 'var(--space-gap-md)', marginTop: 'var(--space-section-header)' }}>
            {[
              {
                titleDE: 'Technische Exzellenz',
                titleEN: 'Technical Excellence',
                descDE: 'Wir lösen die schwierigen Probleme. Leistungselektronik, thermische Herausforderungen, EMV-kritische Designs – das ist unser Spielfeld.',
                descEN: 'We solve the difficult problems. Power electronics, thermal challenges, EMC-critical designs – that is our playing field.',
              },
              {
                titleDE: 'Partnerschaftlichkeit',
                titleEN: 'Partnership',
                descDE: 'Wir denken in langfristigen Partnerschaften, nicht in Einzelprojekten. Unser Erfolg misst sich am Erfolg unserer Kunden.',
                descEN: 'We think in long-term partnerships, not individual projects. Our success is measured by the success of our customers.',
              },
              {
                titleDE: 'Alles aus einer Hand',
                titleEN: 'All from one source',
                descDE: 'Entwicklung und Fertigung unter einem Dach. Kurze Wege, schnelle Entscheidungen, nahtlose Übergänge.',
                descEN: 'Development and manufacturing under one roof. Short paths, fast decisions, seamless transitions.',
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 fluid-card"
              >
                <div className="w-2 rounded-full bg-cme-blue" style={{ height: 'var(--space-gap-md)', marginBottom: 'var(--space-gap-sm)' }} />
                <h3 className="fluid-h4 text-cme-dark" style={{ marginBottom: 'var(--space-gap-xs)' }}>
                  {isDE ? value.titleDE : value.titleEN}
                </h3>
                <p className="text-gray-600 leading-relaxed fluid-body">
                  {isDE ? value.descDE : value.descEN}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container text-center">
          <h2 className="fluid-h2 text-cme-dark">
            {isDE ? 'Lernen Sie das Team kennen, das Ihr Projekt umsetzt.' : 'Meet the team that delivers your project.'}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto fluid-body-lg" style={{ marginTop: 'var(--space-gap-xs)' }}>
            {isDE
              ? 'Kurze Wege, schnelle Entscheidungen – Sie arbeiten direkt mit den Fachleuten, die Ihr Projekt umsetzen.'
              : 'Short paths, fast decisions – you work directly with the specialists who implement your project.'}
          </p>
          <div className="flex flex-wrap justify-center" style={{ gap: 'var(--space-gap-xs)', marginTop: 'var(--space-gap-md)' }}>
            <Link
              href="/kontakt"
              className="bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors fluid-btn"
            >
              {isDE ? 'Gespräch vereinbaren' : 'Schedule a call'}
            </Link>
            <Link
              href="/karriere"
              className="border-2 border-cme-blue text-cme-blue rounded-lg font-semibold hover:bg-cme-blue/5 transition-colors fluid-btn"
            >
              {isDE ? 'Karriere bei CME' : 'Careers at CME'}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
