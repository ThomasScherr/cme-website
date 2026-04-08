import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { useRoute, Link } from 'wouter';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import { Streamdown } from 'streamdown';

export default function InsightArticle() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  const [, params] = useRoute('/insights/:slug');
  const slug = params?.slug || '';
  const { data: article, isLoading } = trpc.articles.getBySlug.useQuery({ slug }, { enabled: !!slug });

  if (isLoading) {
    return (
      <Layout>
        <section className="pt-32 pb-20 lg:pt-40">
          <div className="container max-w-3xl mx-auto animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-64 bg-gray-200 rounded-2xl mt-8" />
          </div>
        </section>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <section className="pt-32 pb-20 lg:pt-40 text-center">
          <div className="container">
            <h1 className="text-3xl font-bold text-cme-dark">
              {isDE ? 'Artikel nicht gefunden' : 'Article not found'}
            </h1>
            <Link href="/insights" className="text-cme-blue mt-4 inline-block hover:underline">
              {isDE ? 'Zurück zu Insights' : 'Back to Insights'}
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container max-w-3xl mx-auto">
          {/* Back link */}
          <Link href="/insights" className="inline-flex items-center gap-2 text-cme-blue text-sm hover:underline mb-8">
            <ArrowLeft size={16} />
            {isDE ? 'Alle Insights' : 'All Insights'}
          </Link>

          {/* Category */}
          {article.tags && (
            <div className="flex items-center gap-2 mb-4">
              <Tag size={14} className="text-cme-blue" />
              <span className="text-cme-blue text-sm font-semibold tracking-wider uppercase">
                {article.tags.split(',')[0]}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-cme-dark leading-tight">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 mt-4 text-gray-500 text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(article.publishedAt || article.createdAt).toLocaleDateString(isDE ? 'de-DE' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            {article.author && <span>von {article.author}</span>}
          </div>

          {/* Cover Image */}
          {article.coverImage && (
            <div className="mt-8 rounded-2xl overflow-hidden">
              <img src={article.coverImage} alt={article.title} className="w-full h-auto" />
            </div>
          )}

          {/* Content */}
          <div className="mt-10 prose prose-gray prose-lg max-w-none">
            <Streamdown>{article.content}</Streamdown>
          </div>

          {/* Back CTA */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link href="/insights" className="inline-flex items-center gap-2 text-cme-blue font-semibold hover:underline">
              <ArrowLeft size={16} />
              {isDE ? 'Weitere Insights lesen' : 'Read more Insights'}
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}
