import Layout from '@/components/Layout';
import SEO, { BASE_URL as SEO_BASE_URL } from '@/components/SEO';
import AuthorCard from '@/components/AuthorCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { useRoute, Link } from 'wouter';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';

export default function InsightArticle() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  // Beide Sprachfassungen abfragen: /insights/<slug> und /en/insights/<slug>.
  // Vorher stand hier nur der deutsche Pfad – auf der englischen Route blieb
  // der Slug leer und die Seite zeigte dauerhaft den Ladezustand.
  const [, deParams] = useRoute('/insights/:slug');
  const [, enParams] = useRoute('/en/insights/:slug');
  const slug = deParams?.slug || enParams?.slug || '';
  // Validate slug: must not be empty, must not look like a URL parameter, must be a valid slug format
  const isValidSlug = !!slug && !slug.startsWith(':') && /^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(slug);
  const { data: article, isLoading } = trpc.articles.getBySlug.useQuery({ slug }, { enabled: isValidSlug });
  // Dieselbe Abfrage wie in AuthorCard – React Query liefert sie aus dem
  // Zwischenspeicher, es geht also kein zweiter Aufruf raus. Gebraucht wird
  // sie hier fuer den Autor im Article-Schema.
  const { data: dbAuthor } = trpc.authors.getById.useQuery(
    { id: article?.authorId ?? 0 },
    { enabled: !!article?.authorId }
  );

  // Helper: pick the correct language field, falling back to German
  function localized<T>(de: T | null | undefined, en: T | null | undefined): T | undefined {
    if (!isDE && en) return en;
    return de ?? undefined;
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
            <Link href="/insights" className="text-cme-blue inline-block hover:underline fluid-body" style={{ marginTop: 'var(--space-gap-xs)' }}>
              {isDE ? 'Zurück zu Insights' : 'Back to Insights'}
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

  const published = article.publishedAt || article.createdAt;
  const beschreibung = excerpt || `${title} – Engineering Insight von CME Control Motion Electronics.`;

  /**
   * Article-Schema. Bisher trugen die Fachartikel nur eine BreadcrumbList –
   * also weder Autor noch Datum noch Bild in maschinenlesbarer Form. Genau
   * diese Felder entscheiden darueber, ob eine Quelle zitiert wird.
   *
   * headline haelt Google bei ueber 110 Zeichen fuer zu lang, deshalb gekuerzt.
   */
  const articleSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title.length > 110 ? `${title.slice(0, 107)}...` : title,
    description: beschreibung,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SEO_BASE_URL}${isDE ? '' : '/en'}/insights/${slug}/`,
    },
    author: {
      '@type': 'Person',
      name: dbAuthor?.name || article.author,
      ...(dbAuthor?.url ? { url: dbAuthor.url } : {}),
      ...(dbAuthor?.imageUrl ? { image: dbAuthor.imageUrl } : {}),
      ...(dbAuthor?.titleDe || dbAuthor?.titleEn
        ? { jobTitle: (isDE ? dbAuthor.titleDe : dbAuthor.titleEn || dbAuthor.titleDe) ?? undefined }
        : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: 'CME Control Motion Electronics GmbH',
      url: SEO_BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: 'https://ventspire-cdn.b-cdn.net/cme/CME_rechts_Logo_RGB_433c645f.png',
      },
    },
    inLanguage: isDE ? 'de-DE' : 'en-US',
    ...(published ? { datePublished: new Date(published).toISOString() } : {}),
    ...(article.updatedAt ? { dateModified: new Date(article.updatedAt).toISOString() } : {}),
    ...(article.coverImage ? { image: [article.coverImage] } : {}),
    ...(tags ? { keywords: tags } : {}),
  };

  return (
    <Layout>
      <SEO
        titleDE={title}
        titleEN={title}
        descriptionDE={beschreibung}
        descriptionEN={excerpt || `${title} – Engineering Insight by CME Control Motion Electronics.`}
        path={`/insights/${slug}`}
        additionalSchemas={[articleSchema]}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Engineering Insights', url: '/insights' },
          { name: title, url: `/insights/${slug}` },
        ]}
      />
      <article className="subpage-hero" style={{ paddingBottom: 'var(--space-section)' }}>
        <div className="container max-w-4xl mx-auto">
          {/* Back link */}
          <Link href="/insights" className="inline-flex items-center gap-2 text-cme-blue fluid-small hover:underline" style={{ marginBottom: 'var(--space-gap-md)' }}>
            <ArrowLeft size={16} />
            {isDE ? 'Alle Insights' : 'All Insights'}
          </Link>

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
            <span className="text-gray-300">|</span>
            <AuthorCard variant="compact" authorId={article.authorId} authorName={article.author} />
          </div>

          {/* Cover Image */}
          {article.coverImage && (
            <div className="rounded-2xl overflow-hidden" style={{ marginTop: 'var(--space-gap-md)' }}>
              <img loading="lazy" src={article.coverImage} alt={title} className="w-full h-auto" width={1200} height={630} style={{ aspectRatio: '1200/630' }} />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-gray max-w-none fluid-body-lg"
            style={{ marginTop: 'var(--space-gap-lg)' }}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Author Profile */}
          <AuthorCard variant="full" authorId={article.authorId} authorName={article.author} />

          {/* Back CTA */}
          <div className="border-t border-gray-200" style={{ marginTop: 'var(--space-section-sm)', paddingTop: 'var(--space-gap-md)' }}>
            <Link href="/insights" className="inline-flex items-center gap-2 text-cme-blue font-semibold fluid-body hover:underline">
              <ArrowLeft size={16} />
              {isDE ? 'Weitere Engineering Insights lesen' : 'Read more Engineering Insights'}
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}
