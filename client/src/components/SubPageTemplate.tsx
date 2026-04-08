import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Feature {
  de: string;
  en: string;
}

interface SubPageProps {
  parentHref: string;
  parentLabelDE: string;
  parentLabelEN: string;
  titleDE: string;
  titleEN: string;
  subtitleDE: string;
  subtitleEN: string;
  heroImg: string;
  introDE: string;
  introEN: string;
  features: Feature[];
  ctaDE?: string;
  ctaEN?: string;
  relatedPages?: { href: string; titleDE: string; titleEN: string; img: string }[];
}

export default function SubPageTemplate({
  parentHref,
  parentLabelDE,
  parentLabelEN,
  titleDE,
  titleEN,
  subtitleDE,
  subtitleEN,
  heroImg,
  introDE,
  introEN,
  features,
  ctaDE = 'Projekt anfragen',
  ctaEN = 'Request Project',
  relatedPages = [],
}: SubPageProps) {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  return (
    <Layout>
      {/* Breadcrumb + Hero */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-br from-white to-cme-blue-light/20">
        <div className="container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-cme-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href={parentHref} className="hover:text-cme-blue transition-colors">
              {isDE ? parentLabelDE : parentLabelEN}
            </Link>
            <span>/</span>
            <span className="text-cme-dark font-medium">{isDE ? titleDE : titleEN}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link
                href={parentHref}
                className="inline-flex items-center gap-2 text-cme-blue text-sm font-medium mb-4 hover:gap-3 transition-all"
              >
                <ArrowLeft size={16} />
                {isDE ? parentLabelDE : parentLabelEN}
              </Link>
              <h1 className="text-3xl lg:text-5xl font-bold text-cme-dark leading-tight">
                {isDE ? titleDE : titleEN}
              </h1>
              <p className="text-lg text-gray-600 mt-4">
                {isDE ? subtitleDE : subtitleEN}
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={heroImg}
                  alt={isDE ? titleDE : titleEN}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              {isDE ? introDE : introEN}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:border-cme-blue/20 hover:shadow-md transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-cme-blue mb-3" />
                <p className="font-medium text-cme-dark">{isDE ? feature.de : feature.en}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      {relatedPages.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-2xl font-bold text-cme-dark mb-8">
              {isDE ? 'Weitere Leistungen' : 'Related Services'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPages.map((page) => (
                <Link key={page.href} href={page.href} className="group block">
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={page.img}
                        alt={isDE ? page.titleDE : page.titleEN}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex items-center justify-between">
                      <h3 className="font-semibold text-cme-dark">{isDE ? page.titleDE : page.titleEN}</h3>
                      <ArrowRight size={18} className="text-cme-blue group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-cme-dark">
            {isDE ? 'Bereit für Ihr Projekt?' : 'Ready for your project?'}
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            {isDE
              ? 'Sprechen Sie mit uns – wir geben ehrliches technisches Feedback und kalkulieren Ihr Projekt.'
              : 'Talk to our engineers – we provide honest technical feedback and calculate your project.'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-cme-blue text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors mt-8"
          >
            {isDE ? ctaDE : ctaEN}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
