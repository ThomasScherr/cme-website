import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Link, useRoute } from 'wouter';
import { Calendar, ArrowLeft, Tag, Eye, AlertTriangle, Globe } from 'lucide-react';
import { Streamdown } from 'streamdown';

/**
 * InsightPreview – Shows a full article preview for admins.
 * Supports language switching: shows EN translation when language is set to English.
 */
export default function InsightPreview() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [, params] = useRoute('/admin/insights/preview/:id');
  const articleId = params?.id ? parseInt(params.id, 10) : null;

  const { data: article, isLoading } = trpc.articles.getById.useQuery(
    { id: articleId! },
    { enabled: !!articleId && isAuthenticated && user?.role === 'admin' }
  );

  // Helper: pick the correct language field, falling back to German
  function localized<T>(de: T | null | undefined, en: T | null | undefined): T | undefined {
    if (!isDE && en) return en;
    return de ?? undefined;
  }

  if (authLoading) {
    return (
      <Layout>
        <section className="subpage-hero">
          <div className="container max-w-4xl mx-auto animate-pulse" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gap-xs)' }}>
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-64 bg-gray-200 rounded-2xl" style={{ marginTop: 'var(--space-gap-md)' }} />
          </div>
        </section>
      </Layout>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <Layout>
        <section className="subpage-hero text-center">
          <div className="container">
            <AlertTriangle size={48} className="text-amber-500 mx-auto mb-4" />
            <h1 className="fluid-h2 text-cme-dark">Zugriff verweigert</h1>
            <p className="text-gray-600 fluid-body mt-2">
              Diese Vorschau ist nur für Administratoren verfügbar.
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <section className="subpage-hero">
          <div className="container max-w-4xl mx-auto animate-pulse" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gap-xs)' }}>
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-64 bg-gray-200 rounded-2xl" style={{ marginTop: 'var(--space-gap-md)' }} />
          </div>
        </section>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <section className="subpage-hero text-center">
          <div className="container">
            <h1 className="fluid-h2 text-cme-dark">
              {isDE ? 'Artikel nicht gefunden' : 'Article not found'}
            </h1>
            <Link href="/admin/insights" className="text-cme-blue inline-block hover:underline fluid-body" style={{ marginTop: 'var(--space-gap-xs)' }}>
              {isDE ? 'Zurück zur Verwaltung' : 'Back to Admin'}
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  // Resolve language-specific fields
  const title = localized(article.title, article.titleEn) || article.title;
  const excerpt = localized(article.excerpt, article.excerptEn);
  const content = localized(article.content, article.contentEn) || article.content;
  const tags = localized(article.tags, article.tagsEn);
  const metaTitle = localized(article.metaTitle, article.metaTitleEn);
  const metaDescription = localized(article.metaDescription, article.metaDescriptionEn);
  const hasEnTranslation = !!(article.titleEn && article.contentEn);

  return (
    <Layout>
      {/* Preview Banner */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-white text-center py-2 px-4 fluid-small font-semibold shadow-lg">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Eye size={16} />
          <span>Vorschau-Modus</span>
          {article.status === 'draft' && (
            <span className="bg-amber-600 px-2 py-0.5 rounded text-xs ml-1">Entwurf</span>
          )}
          <span className="mx-1">|</span>
          <Globe size={14} />
          <span className="text-xs">
            {isDE ? 'DE' : 'EN'}
            {!isDE && !hasEnTranslation && ' (Übersetzung ausstehend)'}
          </span>
          <span className="mx-1">|</span>
          <Link href="/admin/insights" className="underline hover:no-underline">
            Zurück zum Editor
          </Link>
        </div>
      </div>

      <article className="subpage-hero" style={{ paddingBottom: 'var(--space-section)', marginTop: '2.5rem' }}>
        <div className="container max-w-4xl mx-auto">
          {/* Back link */}
          <Link href="/admin/insights" className="inline-flex items-center gap-2 text-cme-blue fluid-small hover:underline" style={{ marginBottom: 'var(--space-gap-md)' }}>
            <ArrowLeft size={16} />
            {isDE ? 'Zurück zur Verwaltung' : 'Back to Admin'}
          </Link>

          {/* Translation status notice */}
          {!isDE && !hasEnTranslation && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-amber-800 text-sm mb-4">
              <Globe size={14} className="inline mr-2" />
              Die englische Übersetzung wird gerade erstellt. Bitte laden Sie die Seite in wenigen Sekunden neu.
            </div>
          )}

          {/* Category */}
          {tags && (
            <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-gap-xs)' }}>
              <Tag size={14} className="text-cme-blue" />
              <span className="text-cme-blue fluid-xs font-semibold tracking-wider uppercase">
                {tags.split(',')[0]}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="fluid-h1 text-cme-dark leading-tight">
            {title}
          </h1>

          {/* Meta */}
          <div className="flex items-center text-gray-500 fluid-small" style={{ gap: 'var(--space-gap-xs)', marginTop: 'var(--space-gap-xs)' }}>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(article.publishedAt || article.createdAt).toLocaleDateString(isDE ? 'de-DE' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            {article.author && <span>{isDE ? 'von' : 'by'} {article.author}</span>}
          </div>

          {/* Cover Image */}
          {article.coverImage && (
            <div className="rounded-2xl overflow-hidden" style={{ marginTop: 'var(--space-gap-md)' }}>
              <img loading="lazy" src={article.coverImage} alt={title} className="w-full h-auto" />
            </div>
          )}

          {/* Excerpt */}
          {excerpt && (
            <div className="border-l-4 border-cme-blue bg-cme-blue/5 rounded-r-lg" style={{ padding: 'var(--space-gap-sm) var(--space-gap-md)', marginTop: 'var(--space-gap-lg)' }}>
              <p className="text-gray-700 fluid-body italic">{excerpt}</p>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-gray max-w-none fluid-body-lg" style={{ marginTop: 'var(--space-gap-lg)' }}>
            <Streamdown>{content}</Streamdown>
          </div>

          {/* SEO Preview */}
          {(metaTitle || metaDescription) && (
            <div className="border border-gray-200 rounded-xl bg-gray-50" style={{ marginTop: 'var(--space-section-sm)', padding: 'var(--space-gap-md)' }}>
              <h3 className="fluid-small font-semibold text-gray-500 mb-3 flex items-center gap-2">
                <Eye size={14} />
                {isDE ? 'SEO-Vorschau (Google-Suchergebnis)' : 'SEO Preview (Google Search Result)'}
              </h3>
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <p className="text-blue-700 fluid-body font-medium hover:underline cursor-pointer">
                  {metaTitle || title}
                </p>
                <p className="text-green-700 fluid-xs mt-1">
                  control-motion.de/insights/{article.slug}
                </p>
                {metaDescription && (
                  <p className="text-gray-600 fluid-small mt-1 line-clamp-2">
                    {metaDescription}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Back CTA */}
          <div className="border-t border-gray-200" style={{ marginTop: 'var(--space-section-sm)', paddingTop: 'var(--space-gap-md)' }}>
            <Link href="/admin/insights" className="inline-flex items-center gap-2 text-cme-blue font-semibold fluid-body hover:underline">
              <ArrowLeft size={16} />
              {isDE ? 'Zurück zur Verwaltung' : 'Back to Admin'}
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}
