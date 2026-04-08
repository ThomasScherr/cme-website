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
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-white to-cme-blue-light/30">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-cme-blue text-sm font-semibold tracking-widest uppercase">
              {isDE ? 'Engineering Insights' : 'Engineering Insights'}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-cme-dark mt-4 leading-tight">
              {isDE ? 'Fachwissen aus der Elektronikentwicklung' : 'Expert Knowledge from Electronics Development'}
            </h1>
            <p className="text-lg text-gray-600 mt-4">
              {isDE
                ? 'Einblicke in Leistungselektronik, EMV, thermisches Management und aktuelle Technologietrends.'
                : 'Insights into power electronics, EMC, thermal management and current technology trends.'}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 lg:py-24">
        <div className="container">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-6 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <div className="p-6">
                        {article.tags && (
                          <span className="text-cme-blue text-xs font-semibold tracking-wider uppercase">
                            {article.tags.split(',')[0]}
                          </span>
                        )}
                        <h3 className="text-lg font-bold text-cme-dark mt-2 group-hover:text-cme-blue transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        {article.excerpt && (
                          <p className="text-gray-600 text-sm mt-2 line-clamp-3">{article.excerpt}</p>
                        )}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
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
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-cme-blue-light flex items-center justify-center mx-auto mb-4">
                <Tag size={24} className="text-cme-blue" />
              </div>
              <h3 className="text-xl font-bold text-cme-dark">
                {isDE ? 'Bald verfügbar' : 'Coming Soon'}
              </h3>
              <p className="text-gray-600 mt-2">
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
