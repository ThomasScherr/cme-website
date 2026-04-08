import Layout from '@/components/Layout';
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
    { icon: Calendar, value: '2007', labelDE: 'Gegründet', labelEN: 'Founded' },
    { icon: Users, value: '120+', labelDE: 'Mitarbeiter', labelEN: 'Employees' },
    { icon: MapPin, value: 'Dortmund', labelDE: 'Standort', labelEN: 'Location' },
    { icon: Award, value: '500+', labelDE: 'Projekte', labelEN: 'Projects' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-white to-cme-blue-light/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-cme-blue text-sm font-semibold tracking-widest uppercase">
                {isDE ? 'Über CME' : 'About CME'}
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-cme-dark mt-4 leading-tight">
                {isDE ? 'The Electronic Company.' : 'The Electronic Company.'}
              </h1>
              <p className="text-lg text-gray-600 mt-6">
                {isDE
                  ? 'CME Control Motion Electronics ist ein inhabergeführter Entwicklungsdienstleister und EMS-Partner mit Sitz in Dortmund. Seit 2007 entwickeln und fertigen wir elektronische Baugruppen und Systeme für anspruchsvolle Branchen.'
                  : 'CME Control Motion Electronics is an owner-managed development service provider and EMS partner based in Dortmund. Since 2007, we have been developing and manufacturing electronic assemblies and systems for demanding industries.'}
              </p>
            </div>
            <div className="relative">
              <div className="diamond w-72 h-72 lg:w-96 lg:h-96 mx-auto">
                <img src={BUILDING_IMG} alt="CME Gebäude" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-cme-blue-light flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={24} className="text-cme-blue" />
                </div>
                <div className="text-3xl font-bold text-cme-dark">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-1">{isDE ? stat.labelDE : stat.labelEN}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-cme-dark">
                {isDE ? 'Unsere Geschichte' : 'Our Story'}
              </h2>
              <div className="space-y-4 mt-6 text-gray-600 leading-relaxed">
                <p>
                  {isDE
                    ? 'CME wurde 2007 in Dortmund gegründet – mit der Vision, Elektronikentwicklung und -fertigung unter einem Dach zu vereinen. Was als kleines Ingenieurbüro begann, ist heute ein Unternehmen mit über 120 Mitarbeitern und einer eigenen Fertigungsstätte.'
                    : 'CME was founded in 2007 in Dortmund – with the vision of uniting electronics development and manufacturing under one roof. What started as a small engineering office is today a company with over 120 employees and its own manufacturing facility.'}
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
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-cme-dark text-center">
            {isDE ? 'Was uns antreibt' : 'What drives us'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
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
                className="bg-white rounded-2xl p-8 border border-gray-100"
              >
                <div className="w-2 h-8 rounded-full bg-cme-blue mb-5" />
                <h3 className="text-xl font-bold text-cme-dark mb-3">
                  {isDE ? value.titleDE : value.titleEN}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {isDE ? value.descDE : value.descEN}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-cme-dark">
            {isDE ? 'Lernen Sie uns kennen' : 'Get to know us'}
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            {isDE
              ? 'Besuchen Sie uns in Dortmund oder vereinbaren Sie ein virtuelles Meeting mit unseren Ingenieuren.'
              : 'Visit us in Dortmund or schedule a virtual meeting with our engineers.'}
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Link
              href="/kontakt"
              className="bg-cme-blue text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors"
            >
              {isDE ? 'Kontakt aufnehmen' : 'Get in Touch'}
            </Link>
            <Link
              href="/karriere"
              className="border-2 border-cme-blue text-cme-blue px-8 py-3.5 rounded-lg font-semibold hover:bg-cme-blue/5 transition-colors"
            >
              {isDE ? 'Karriere bei CME' : 'Careers at CME'}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
