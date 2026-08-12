/**
 * SubPageHero – Unified hero section for all subpages.
 *
 * Provides a consistent layout with:
 * - Tagline (small uppercase label)
 * - H1 headline
 * - Description paragraph
 * - Optional CTA button
 * - Optional breadcrumb navigation
 * - Diamond or rectangular image/video on the right (desktop only)
 *
 * All sizing is controlled via CSS class `.subpage-hero` and
 * CSS variables defined in index.css, editable through the Stylesheet Editor.
 *
 * Usage variants:
 *   1. Diamond image:      pass `heroImage` (default imageVariant='diamond')
 *   2. Diamond video:      pass `heroVideo` (default imageVariant='diamond')
 *   3. Rectangular image:  pass `heroImage` + `imageVariant='rectangular'`
 *   4. Rectangular video:  pass `heroVideo` + `imageVariant='rectangular'`
 *   5. Floating image:     pass `heroImage` + `imageVariant='floating'` (transparent/cutout images, no frame/shadow)
 *   6. Without media:      omit both (text-only hero, e.g. Kontakt, Insights)
 *   7. With breadcrumb:    pass `breadcrumb` prop
 */
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useVideoSource } from '@/hooks/useVideoSource';

// ── Default fallback image ────────────────────────────────────
const DEFAULT_HERO_IMAGE = 'https://ventspire-cdn.b-cdn.net/cme/K5A0004_retouch_b2db17ab.jpg';

// ── Types ──────────────────────────────────────────────────────

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeroVideo {
  webm?: string;
  mp4?: string;
  poster?: string;
  /** Playback mode: 'loop' (default) = endlos, 'once' = einmal abspielen beim Laden */
  playback?: 'loop' | 'once';
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
  /** Image URL for the media on the right */
  heroImage?: string;
  /** Alt text for the hero image */
  heroImageAlt?: string;
  /** Video sources for the media on the right (overrides heroImage) */
  heroVideo?: HeroVideo;
  /** Image display variant: 'diamond' (rotated rhombus), 'rectangular' (rounded rect with shadow + accent diamond), or 'floating' (transparent/cutout image, no frame, accent diamond behind) */
  imageVariant?: 'diamond' | 'rectangular' | 'floating';
  /** Breadcrumb trail (renders above the headline) */
  breadcrumb?: BreadcrumbItem[];
  /** Back link (renders a "← Parent" link above the headline) */
  backLink?: {
    label: string;
    href: string;
  };
  /** Custom object-position for the hero image inside the diamond/rectangle (e.g. '30% 50%' to shift left) */
  heroImagePosition?: string;
  /** Custom scale for the hero image inside the diamond (e.g. '147%' for 10% smaller than default 163%) */
  heroImageScale?: string;
  /** Additional content below the description (e.g. custom elements) */
  children?: ReactNode;
}

// ── Diamond Media Component ────────────────────────────────────

function DiamondMedia({ image, imageAlt, video, imagePosition, imageScale }: {
  image?: string;
  imageAlt?: string;
  video?: HeroVideo;
  imagePosition?: string;
  imageScale?: string;
}) {
  const isLoop = !video?.playback || video.playback === 'loop';

  const videoSrc = useVideoSource(video?.webm, video?.mp4);

  if (video) {
    return (
      <div
        className="diamond shadow-xl shadow-cme-blue/15"
        style={{ width: 'var(--subpage-hero-diamond-size)' }}
      >
        <video
          autoPlay
          loop={isLoop}
          muted
          playsInline
          poster={video.poster}
          src={videoSrc}
          width={800}
          height={800}
        />
      </div>
    );
  }

  if (image) {
    // imagePosition shifts the image within the diamond via CSS custom properties.
    // Format: "X% Y%" where 50% 50% is centered (default).
    // Lower X% = shift image content to show more of the left side.
    const diamondStyle: React.CSSProperties & Record<string, string> = {
      width: 'var(--subpage-hero-diamond-size)',
    };
    if (imagePosition) {
      diamondStyle['--diamond-obj-pos'] = imagePosition;
    }
    if (imageScale) {
      diamondStyle['--diamond-img-scale'] = imageScale;
    }
    return (
      <div
        className="diamond shadow-xl shadow-cme-blue/15"
        style={diamondStyle}
      >
        <img
          src={image}
          alt={imageAlt || ''}
          width={800}
          height={800}
        />
      </div>
    );
  }

  return null;
}

// ── Rectangular Media Component (with accent diamond behind) ───

function RectangularMedia({ image, imageAlt, video }: {
  image?: string;
  imageAlt?: string;
  video?: HeroVideo;
}) {
  const isLoop = !video?.playback || video.playback === 'loop';
  const videoSrc = useVideoSource(video?.webm, video?.mp4);
  const mediaContent = video ? (
    <video
      autoPlay
      loop={isLoop}
      muted
      playsInline
      poster={video.poster}
      className="w-full aspect-[4/3] object-cover"
      src={videoSrc}
      width={800}
      height={600}
    />
  ) : image ? (
    <img
      src={image}
      alt={imageAlt || ''}
      className="w-full aspect-[4/3] object-cover"
      width={800}
      height={600}
    />
  ) : null;

  if (!mediaContent) return null;

  return (
    <div className="relative">
      {/* Accent diamond behind the rectangular image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute"
        style={{
          zIndex: 0,
          top: '50%',
          left: '50%',
          transform: 'translate(-42%, -50%)',
        }}
      >
        <div
          className="diamond bg-cme-blue/[0.06]"
          style={{ width: 'var(--subpage-hero-accent-size)' }}
        />
      </motion.div>

      {/* Rectangular image/video */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-xl shadow-cme-blue/10"
        style={{ zIndex: 1 }}
      >
        {mediaContent}
      </div>
    </div>
  );
}

// ── Floating Media Component (transparent image, no frame, accent diamond) ──

function FloatingMedia({ image, imageAlt, video }: {
  image?: string;
  imageAlt?: string;
  video?: HeroVideo;
}) {
  const isLoop = !video?.playback || video.playback === 'loop';
  const videoSrc = useVideoSource(video?.webm, video?.mp4);
  const mediaContent = video ? (
    <video
      autoPlay
      loop={isLoop}
      muted
      playsInline
      poster={video.poster}
      className="w-full aspect-[4/3] object-contain"
      src={videoSrc}
      width={800}
      height={600}
    />
  ) : image ? (
    <img
      src={image}
      alt={imageAlt || ''}
      className="w-full aspect-[4/3] object-contain"
      width={800}
      height={600}
    />
  ) : null;

  if (!mediaContent) return null;

  return (
    <div className="relative">
      {/* Accent diamond behind the floating image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute"
        style={{
          zIndex: 0,
          top: '50%',
          left: '50%',
          transform: 'translate(-42%, -50%)',
        }}
      >
        <div
          className="diamond bg-cme-blue/[0.06]"
          style={{ width: 'var(--subpage-hero-accent-size)' }}
        />
      </motion.div>

      {/* Floating image/video – no frame, no shadow */}
      <div
        className="relative"
        style={{ zIndex: 1 }}
      >
        {mediaContent}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────

export default function SubPageHero({
  tagline,
  headline,
  description,
  cta,
  ctaSecondary,
  heroImage,
  heroImageAlt,
  heroVideo,
  imageVariant = 'diamond',
  breadcrumb,
  backLink,
  heroImagePosition,
  heroImageScale,
  children,
}: SubPageHeroProps) {
  // Use fallback image when no heroImage and no heroVideo is provided
  const effectiveImage = heroImage || (!heroVideo ? DEFAULT_HERO_IMAGE : undefined);
  const hasMedia = !!(effectiveImage || heroVideo);
  const { lang } = useLanguage();

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
          className={`grid items-center ${hasMedia ? 'grid-cols-1 lg:grid-cols-[3fr_2fr]' : ''}`}
          style={{ gap: 'var(--space-gap-lg)' }}
        >
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={hasMedia ? 'overflow-hidden' : 'max-w-3xl'}
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
            <h1 className="subpage-hero-headline" lang={lang} style={{ marginTop: tagline ? 'var(--space-gap-xs)' : undefined }}>
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

          {/* Right: Media – all viewports */}
          {hasMedia && (
            <div className="flex relative items-center justify-center">
              {imageVariant === 'rectangular' ? (
                /* Rectangular variant: rounded rect image with accent diamond behind */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full"
                >
                  <RectangularMedia
                    image={effectiveImage}
                    imageAlt={heroImageAlt}
                    video={heroVideo}
                  />
                </motion.div>
              ) : imageVariant === 'floating' ? (
                /* Floating variant: transparent image, no frame/shadow, accent diamond behind */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full"
                >
                  <FloatingMedia
                    image={effectiveImage}
                    imageAlt={heroImageAlt}
                    video={heroVideo}
                  />
                </motion.div>
              ) : (
                /* Diamond variant: rotated rhombus with accent diamond behind */
                <>
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
                      image={effectiveImage}
                      imageAlt={heroImageAlt}
                      video={heroVideo}
                      imagePosition={heroImagePosition}
                      imageScale={heroImageScale}
                    />
                  </motion.div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
