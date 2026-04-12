/**
 * SubPageHero – Unified hero section for all subpages.
 *
 * Provides a consistent layout with:
 * - Tagline (small uppercase label)
 * - H1 headline
 * - Description paragraph
 * - Optional CTA button
 * - Optional breadcrumb navigation
 * - Diamond image/video on the right (desktop only)
 *
 * All sizing is controlled via CSS class `.subpage-hero` and
 * CSS variables defined in index.css, editable through the Stylesheet Editor.
 *
 * Usage variants:
 *   1. With image diamond:  pass `heroImage` prop
 *   2. With video diamond:  pass `heroVideo` prop
 *   3. Without diamond:     omit both (text-only hero, e.g. Kontakt, Insights)
 *   4. With breadcrumb:     pass `breadcrumb` prop
 */
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

// ── Types ──────────────────────────────────────────────────────

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeroVideo {
  webm?: string;
  mp4?: string;
  poster?: string;
}

interface SubPageHeroProps {
  /** Small uppercase tagline above the headline */
  tagline?: string;
  /** Main H1 headline */
  headline: string;
  /** Description paragraph below the headline */
  description?: string;
  /** Optional CTA button */
  cta?: {
    label: string;
    href: string;
  };
  /** Optional second CTA button (outline style) */
  ctaSecondary?: {
    label: string;
    href: string;
  };
  /** Image URL for the diamond on the right */
  heroImage?: string;
  /** Alt text for the hero image */
  heroImageAlt?: string;
  /** Video sources for the diamond on the right (overrides heroImage) */
  heroVideo?: HeroVideo;
  /** Breadcrumb trail (renders above the headline) */
  breadcrumb?: BreadcrumbItem[];
  /** Back link (renders a "← Parent" link above the headline) */
  backLink?: {
    label: string;
    href: string;
  };
  /** Additional content below the description (e.g. custom elements) */
  children?: ReactNode;
}

// ── Diamond Media Component ────────────────────────────────────

function DiamondMedia({ image, imageAlt, video }: {
  image?: string;
  imageAlt?: string;
  video?: HeroVideo;
}) {
  if (video) {
    return (
      <div
        className="diamond shadow-xl shadow-cme-blue/15"
        style={{ width: 'var(--subpage-hero-diamond-size)' }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={video.poster}
        >
          {video.webm && <source src={video.webm} type="video/webm" />}
          {video.mp4 && <source src={video.mp4} type="video/mp4" />}
        </video>
      </div>
    );
  }

  if (image) {
    return (
      <div
        className="diamond shadow-xl shadow-cme-blue/15"
        style={{ width: 'var(--subpage-hero-diamond-size)' }}
      >
        <img
          src={image}
          alt={imageAlt || ''}
          className="object-cover"
        />
      </div>
    );
  }

  return null;
}

// ── Main Component ─────────────────────────────────────────────

export default function SubPageHero({
  tagline,
  headline,
  description,
  cta,
  ctaSecondary,
  heroImage,
  heroImageAlt,
  heroVideo,
  breadcrumb,
  backLink,
  children,
}: SubPageHeroProps) {
  const hasDiamond = !!(heroImage || heroVideo);

  return (
    <section className="subpage-hero bg-gradient-to-br from-white to-cme-blue-light/30">
      <div className="container">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav
            className="flex items-center fluid-xs text-gray-500"
            style={{ gap: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.5rem)', marginBottom: 'var(--space-gap-md)' }}
          >
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center" style={{ gap: 'clamp(0.25rem, 0.15rem + 0.2vw, 0.5rem)' }}>
                {i > 0 && <span>/</span>}
                {item.href ? (
                  <Link href={item.href} className="hover:text-cme-blue transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-cme-dark font-medium">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div
          className={`grid items-center ${hasDiamond ? 'lg:grid-cols-2' : ''}`}
          style={{ gap: 'var(--space-gap-lg)' }}
        >
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={hasDiamond ? '' : 'max-w-3xl'}
          >
            {/* Back link */}
            {backLink && (
              <Link
                href={backLink.href}
                className="inline-flex items-center gap-2 text-cme-blue fluid-small font-medium hover:gap-3 transition-all"
                style={{ marginBottom: 'var(--space-gap-xs)' }}
              >
                <ArrowLeft size={16} />
                {backLink.label}
              </Link>
            )}

            {/* Tagline */}
            {tagline && (
              <span className="subpage-hero-tagline">
                {tagline}
              </span>
            )}

            {/* Headline */}
            <h1 className="subpage-hero-headline" style={{ marginTop: tagline ? 'var(--space-gap-xs)' : undefined }}>
              {headline}
            </h1>

            {/* Description */}
            {description && (
              <p
                className="subpage-hero-description"
                style={{ marginTop: 'var(--space-gap-sm)' }}
              >
                {description}
              </p>
            )}

            {/* CTA Buttons */}
            {(cta || ctaSecondary) && (
              <motion.div
                className="flex flex-wrap"
                style={{ gap: 'var(--space-gap-xs)', marginTop: 'var(--space-gap-md)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {cta && (
                  <Link
                    href={cta.href}
                    className="inline-block bg-cme-blue text-white rounded-lg font-semibold hover:bg-cme-blue/90 transition-all hover:shadow-lg hover:shadow-cme-blue/20 fluid-btn"
                  >
                    {cta.label}
                  </Link>
                )}
                {ctaSecondary && (
                  <Link
                    href={ctaSecondary.href}
                    className="inline-block border-2 border-cme-dark/15 text-cme-dark rounded-lg font-semibold hover:border-cme-blue hover:text-cme-blue transition-all fluid-btn"
                  >
                    {ctaSecondary.label}
                  </Link>
                )}
              </motion.div>
            )}

            {/* Custom children */}
            {children}
          </motion.div>

          {/* Right: Diamond – desktop only */}
          {hasDiamond && (
            <div className="hidden lg:flex relative items-center justify-center">
              {/* Accent diamond behind */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute"
                style={{
                  zIndex: 1,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) translate(8%, 8%)',
                }}
              >
                <div
                  className="diamond bg-cme-blue/[0.07]"
                  style={{ width: 'var(--subpage-hero-accent-size)' }}
                />
              </motion.div>

              {/* Main diamond */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ zIndex: 2, position: 'relative' }}
              >
                <DiamondMedia
                  image={heroImage}
                  imageAlt={heroImageAlt}
                  video={heroVideo}
                />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
