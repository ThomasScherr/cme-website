import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Tag } from 'lucide-react';

export default function Insights() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  const { data: articles, isLoading } = trpc.articles.listPublished.useQuery();

  return (
    <Layout>
      {/* Hero */}
      <section className="subpage-hero bg-gradient-to-br from-white to-cme-blue-light/30">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-cme-blue fluid-small font-semibold tracking-widest uppercase">
              {isDE ? 'Engineering Insights' : 'Engineering Insights'}
            </span>
            <h1 className="fluid-h1 text-cme-dark leading-tight" style={{ marginTop: 'var(--space-gap-xs)' }}>
              {isDE ? 'Fachwissen aus der Elektronikentwicklung' : 'Expert Knowledge from Electronics Development'}
            </h1>
            <p className="fluid-body-lg text-gray-600" style={{ marginTop: 'var(--space-gap-xs)' }}>
              {isDE
                ? 'Einblicke in Leistungselektronik, EMV, thermisches Management und aktuelle Technologietrends.'
                : 'Insights into power electronics, EMC, thermal management and current technology trends.'}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-pad">
        <div className="container">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-md)' }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="fluid-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gap-xs)' }}>
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-6 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-gap-md)' }}>
              {articles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={`/insights/${article.slug}`}>
                    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                      {article.coverImage ? (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-cme-blue-light to-cme-blue/10 flex items-center justify-center">
                          <Tag size={32} className="text-cme-blue/40" />
                        </div>
                      )}
                      <div className="fluid-card">
                        {article.tags && (
                          <span className="text-cme-blue fluid-xs font-semibold tracking-wider uppercase">
                            {article.tags.split(',')[0]}
                          </span>
                        )}
                        <h3 className="fluid-body font-bold text-cme-dark group-hover:text-cme-blue transition-colors line-clamp-2" style={{ marginTop: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.5rem)' }}>
                          {article.title}
                        </h3>
                        {article.excerpt && (
                          <p className="text-gray-600 fluid-small line-clamp-3" style={{ marginTop: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.5rem)' }}>{article.excerpt}</p>
                        )}
                        <div className="flex items-center justify-between border-t border-gray-100" style={{ marginTop: 'var(--space-gap-xs)', paddingTop: 'var(--space-gap-xs)' }}>
                          <div className="flex items-center gap-1.5 text-gray-400 fluid-xs">
                            <Calendar size={12} />
                            {new Date(article.publishedAt || article.createdAt).toLocaleDateString(isDE ? 'de-DE' : 'en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                          <ArrowRight size={16} className="text-cme-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center" style={{ padding: 'var(--space-section-sm) 0' }}>
              <div
                className="rounded-full bg-cme-blue-light flex items-center justify-center mx-auto"
                style={{ width: 'clamp(3rem, 2.5rem + 1vw, 4rem)', height: 'clamp(3rem, 2.5rem + 1vw, 4rem)', marginBottom: 'var(--space-gap-xs)' }}
              >
                <Tag style={{ width: 'var(--icon-size)', height: 'var(--icon-size)' }} className="text-cme-blue" />
              </div>
              <h3 className="fluid-h4 text-cme-dark">
                {isDE ? 'Bald verfügbar' : 'Coming Soon'}
              </h3>
              <p className="text-gray-600 fluid-body" style={{ marginTop: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.5rem)' }}>
                {isDE
                  ? 'Unsere ersten Engineering Insights werden in Kürze veröffentlicht.'
                  : 'Our first Engineering Insights will be published shortly.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
