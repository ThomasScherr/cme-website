import { useLanguage } from '@/contexts/LanguageContext';

interface AuthorCardProps {
  /** Display variant: 'compact' for article meta line, 'full' for article footer */
  variant?: 'compact' | 'full';
}

/**
 * AuthorCard – displays the author profile for Matthias Markmann.
 * Includes Schema.org Person JSON-LD for E-E-A-T and GEO signals.
 */
export default function AuthorCard({ variant = 'full' }: AuthorCardProps) {
  const { lang } = useLanguage();
  const isDE = lang === 'de';

  const author = {
    name: 'Matthias Markmann',
    title: isDE
      ? 'Dipl.-Ing. (FH) – Gesellschafter & Geschäftsführer'
      : 'Dipl.-Ing. (FH) – Managing Director & Co-Owner',
    expertise: isDE
      ? ['Elektronikentwicklung', 'Thermal Management', 'Simulation', 'Obsoleszenzmanagement']
      : ['Electronics Development', 'Thermal Management', 'Simulation', 'Obsolescence Management'],
    bio: isDE
      ? 'Matthias Markmann leitet als Geschäftsführer die CME Control Motion Electronics GmbH in Dortmund. Mit über 15 Jahren Erfahrung in der Entwicklung und Fertigung von Leistungselektronik, Antriebstechnik und thermisch anspruchsvollen Systemen verantwortet er die technische Strategie und Projektleitung komplexer Elektronikprojekte.'
      : 'Matthias Markmann is Managing Director of CME Control Motion Electronics GmbH in Dortmund, Germany. With over 15 years of experience in the development and manufacturing of power electronics, drive technology, and thermally demanding systems, he leads the technical strategy and project management of complex electronics projects.',
    url: 'https://control-motion.de/unternehmen/',
    company: 'CME Control Motion Electronics GmbH',
    companyUrl: 'https://control-motion.de/',
    location: isDE ? 'Dortmund, Deutschland' : 'Dortmund, Germany',
  };

  // Schema.org Person JSON-LD
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: 'Geschäftsführer',
    honorificPrefix: 'Dipl.-Ing. (FH)',
    url: author.url,
    worksFor: {
      '@type': 'Organization',
      name: author.company,
      url: author.companyUrl,
    },
    knowsAbout: [
      'Elektronikentwicklung',
      'Leistungselektronik',
      'Thermal Management',
      'Simulation',
      'Obsoleszenzmanagement',
      'Antriebselektronik',
      'EMS-Fertigung',
      'Mechatronik',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dortmund',
      addressCountry: 'DE',
    },
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-cme-blue/10 flex items-center justify-center text-cme-blue font-bold text-sm">
          MM
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-cme-dark text-sm leading-tight">{author.name}</span>
          <span className="text-gray-500 text-xs leading-tight">{author.title.split(' – ')[0]}</span>
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
        {/* Avatar placeholder */}
        <div className="w-16 h-16 rounded-full bg-cme-blue/10 flex items-center justify-center text-cme-blue font-bold text-xl shrink-0">
          MM
        </div>

        <div className="flex flex-col gap-2">
          {/* Name & Title */}
          <div>
            <p className="font-bold text-cme-dark fluid-body">{author.name}</p>
            <p className="text-gray-600 text-sm">{author.title}</p>
          </div>

          {/* Bio */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {author.bio}
          </p>

          {/* Expertise Tags */}
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
        </div>
      </div>
    </aside>
  );
}
