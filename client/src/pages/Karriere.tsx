import Layout from '@/components/Layout';
import SubPageHero from '@/components/SubPageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Briefcase, Loader2, MessageCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import { trpc } from '@/lib/trpc';

export default function Karriere() {
  const { lang } = useLanguage();
  const isDE = lang === 'de';
  const { t: cms, img, vid } = useContent('karriere');

  // Hero video from CMS
  const heroVideoWebm = vid('hero.heroVideoWebm');
  const heroVideoMp4 = vid('hero.heroVideoMp4');
  const heroVideoPoster = img('hero.heroVideoPoster');
  const heroVideoPlayback = cms('hero.heroVideoPlayback') as 'loop' | 'once' | '';
  const heroVideo = (heroVideoWebm || heroVideoMp4)
    ? { webm: heroVideoWebm || undefined, mp4: heroVideoMp4 || undefined, poster: heroVideoPoster || undefined, playback: (heroVideoPlayback === 'once' ? 'once' : 'loop') as 'loop' | 'once' }
    : undefined;

  return (
    <Layout>
      <SEO
        titleDE='Karriere in der Elektronikbranche Dortmund'
        titleEN='Careers in Electronics Industry Dortmund'
        descriptionDE='Karriere bei CME in Dortmund: Offene Stellen in Elektronikentwicklung, Leistungselektronik, EMS-Fertigung und Qualitätsmanagement. Jetzt bewerben.'
        descriptionEN='Careers at CME in Dortmund: open positions in electronics development, power electronics, EMS manufacturing and quality management. Apply now.'
        path='/karriere'
        enPath='/en/careers'
        breadcrumbs={[{name:'Home',url:'/'},{name:'Karriere',url:'/karriere'}]}
      />
      <SubPageHero
        tagline={cms('hero.tagline') || (isDE ? 'Karriere' : 'Careers')}
        headline={cms('hero.headline') || (isDE ? 'Gestalten Sie mit uns Produkte und Lösungen.' : 'Shape products and solutions with us.')}
        description={cms('hero.description') || (isDE
          ? 'Für unser Team suchen wir regelmäßig Unterstützung – für Gegenwart und Zukunft.'
          : 'We regularly look for new team members – for today and tomorrow.')}
        heroImage={img('hero.heroImage')}
        heroVideo={heroVideo}
      />

      {/* Offene Stellen */}
      <JobPostingsSection isDE={isDE} />
    </Layout>
  );
}

function JobPostingsSection({ isDE }: { isDE: boolean }) {
  const { data: jobs, isLoading } = trpc.jobs.published.useQuery();

  return (
    <section className="section-pad">
      <div className="container">
        <h2 className="fluid-h2 text-cme-dark text-center" style={{ marginBottom: 'var(--space-section-header)' }}>
          {isDE ? 'Offene Stellen' : 'Open Positions'}
        </h2>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-cme-blue" />
          </div>
        ) : !jobs || jobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 fluid-body">
              {isDE
                ? 'Aktuell sind keine offenen Stellen ausgeschrieben.'
                : 'There are currently no open positions listed.'}
            </p>
          </div>
        ) : (
          <div className={`grid ${jobs.length === 1 ? 'max-w-2xl mx-auto' : jobs.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'}`} style={{ gap: 'var(--space-gap-sm)' }}>
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-cme-blue/20 transition-all fluid-card flex flex-col"
              >
                <h3 className="font-bold text-cme-dark fluid-body" style={{ marginBottom: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.5rem)' }}>
                  {isDE ? job.titleDe : (job.titleEn || job.titleDe)}
                </h3>
                <p className="text-gray-600 fluid-small leading-relaxed flex-1" style={{ marginBottom: 'var(--space-gap-xs)' }}>
                  {isDE ? job.descriptionDe : (job.descriptionEn || job.descriptionDe)}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4 text-xs text-gray-500">
                  {job.employmentType && (
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{job.employmentType}</span>
                  )}
                  {job.department && (
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{job.department}</span>
                  )}
                  {job.location && (
                    <span className="bg-gray-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                  )}
                </div>
                {job.softgardenUrl && (
                  <a
                    href={job.softgardenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-colors text-sm px-4 py-2 self-start"
                  >
                    {isDE ? 'Jetzt bewerben' : 'Apply Now'} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Chat-Hinweis */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[#F3F7FB] border border-[#DDE6F0] rounded-xl px-6 py-4">
            <MessageCircle className="w-5 h-5 text-cme-blue flex-shrink-0" />
            <p className="text-[#3A3A4A] fluid-small">
              {isDE
                ? 'Fragen zu einer der ausgeschriebenen Stellen? Beantworten wir gerne per Chat oder Video-Call.'
                : 'Questions about a listed position? We\u2019re happy to answer via chat or video call.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
