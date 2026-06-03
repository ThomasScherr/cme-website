import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';

interface AuthorCardProps {
  /** Display variant: 'compact' for article meta line, 'full' for article footer */
  variant?: 'compact' | 'full';
  /** Author ID from the database. If not provided, falls back to legacy display name. */
  authorId?: number | null;
  /** Legacy fallback: display name (used when authorId is not set) */
  authorName?: string;
}

/**
 * AuthorCard – dynamically loads author profile from DB.
 * Includes Schema.org Person JSON-LD for E-E-A-T and GEO signals.
 */
export default function AuthorCard({ variant = 'full', authorId, authorName }: AuthorCardProps) {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  const { data: dbAuthor } = trpc.authors.getById.useQuery(
    { id: authorId! },
    { enabled: !!authorId }
  );

  // If no authorId or author not loaded yet, show minimal fallback
  if (!authorId || !dbAuthor) {
    const displayName = authorName || 'CME Redaktion';
    const initials = displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    if (variant === 'compact') {
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-cme-blue/10 flex items-center justify-center text-cme-blue font-bold text-sm">
            {initials}
          </div>
          <span className="font-semibold text-cme-dark text-sm">{displayName}</span>
        </div>
      );
    }
    return null; // Don't render full card without author data
  }

  // Build author object from DB data
  const author = {
    name: dbAuthor.name,
    title: isDE ? (dbAuthor.titleDe || '') : (dbAuthor.titleEn || dbAuthor.titleDe || ''),
    expertise: (isDE ? dbAuthor.expertiseDe : (dbAuthor.expertiseEn || dbAuthor.expertiseDe))
      ?.split(',').map(s => s.trim()).filter(Boolean) || [],
    bio: isDE ? (dbAuthor.bioDe || '') : (dbAuthor.bioEn || dbAuthor.bioDe || ''),
    url: dbAuthor.url || '',
    company: dbAuthor.company || '',
    companyUrl: dbAuthor.companyUrl || '',
    location: dbAuthor.location || '',
    imageUrl: dbAuthor.imageUrl || '',
    knowsAbout: dbAuthor.knowsAbout?.split(',').map(s => s.trim()).filter(Boolean) || [],
  };

  const initials = author.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  // Schema.org Person JSON-LD
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    ...(author.title && { jobTitle: author.title }),
    ...(author.url && { url: author.url }),
    ...(author.company && {
      worksFor: {
        '@type': 'Organization',
        name: author.company,
        ...(author.companyUrl && { url: author.companyUrl }),
      },
    }),
    ...(author.knowsAbout.length > 0 && { knowsAbout: author.knowsAbout }),
    ...(author.imageUrl && { image: author.imageUrl }),
    ...(author.location && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: author.location.split(',')[0]?.trim(),
        addressCountry: 'DE',
      },
    }),
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        {author.imageUrl ? (
          <img
            src={author.imageUrl}
            alt={author.name}
            className="w-8 h-8 rounded-full object-cover"
            width={32}
            height={32}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-cme-blue/10 flex items-center justify-center text-cme-blue font-bold text-sm">
            {initials}
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-semibold text-cme-dark text-sm leading-tight">{author.name}</span>
          {author.title && (
            <span className="text-gray-500 text-xs leading-tight">
              {author.title.split(' – ')[0]}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <aside className="border border-gray-200 rounded-2xl p-6 bg-gray-50/50" style={{ marginTop: 'var(--space-gap-lg)' }}>
      {/* JSON-LD for bots */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="flex items-start gap-4">
        {/* Avatar */}
        {author.imageUrl ? (
          <img
            src={author.imageUrl}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover shrink-0"
            width={64}
            height={64}
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-cme-blue/10 flex items-center justify-center text-cme-blue font-bold text-xl shrink-0">
            {initials}
          </div>
        )}

        <div className="flex flex-col gap-2">
          {/* Name & Title */}
          <div>
            <p className="font-bold text-cme-dark fluid-body">{author.name}</p>
            {author.title && <p className="text-gray-600 text-sm">{author.title}</p>}
          </div>

          {/* Bio */}
          {author.bio && (
            <p className="text-gray-600 text-sm leading-relaxed">
              {author.bio}
            </p>
          )}

          {/* Expertise Tags */}
          {author.expertise.length > 0 && (
            <div className="flex flex-wrap gap-2" style={{ marginTop: '0.25rem' }}>
              {author.expertise.map((skill) => (
                <span
                  key={skill}
                  className="inline-block text-xs font-medium text-cme-blue bg-cme-blue/8 px-2.5 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
