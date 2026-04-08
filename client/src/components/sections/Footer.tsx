import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';

const LOGO_WHITE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_rechts_Logo_CMYK_ws_bc8112c1.png';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-cme-dark text-white section-pad">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: 'var(--space-gap-lg)', marginBottom: 'var(--space-gap-lg)' }}>
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <img
              src={LOGO_WHITE}
              alt="CME Control Motion Electronics"
              className="w-auto object-contain"
              style={{ height: 'var(--nav-logo)', marginBottom: 'var(--space-gap-xs)' }}
            />
            <p className="fluid-small text-white/80 max-w-md leading-relaxed">
              Entwicklung und Fertigung elektronischer Produkte – mit technischer Tiefe und Serienblick. Made in Dortmund.
            </p>
            <div className="flex flex-wrap gap-2" style={{ marginTop: 'var(--space-gap-xs)' }}>
              {['ISO 9001', 'ISO 14001'].map((cert) => (
                <span
                  key={cert}
                  className="fluid-xs px-2.5 py-1 border border-white/30 text-white/70 rounded"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="fluid-xs font-bold uppercase tracking-wider text-white/80" style={{ marginBottom: 'var(--space-gap-xs)' }}>
              Leistungen
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem, 0.2rem + 0.5vw, 0.625rem)' }}>
              {[
                { label: t.footer.dev, href: '/entwicklung' },
                { label: t.footer.mfg, href: '/fertigung' },
                { label: t.footer.lifecycle, href: '/lifecycle' },
                { label: 'Märkte & Branchen', href: '/maerkte' },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="fluid-small text-white/80 hover:text-cme-blue transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="fluid-xs font-bold uppercase tracking-wider text-white/80" style={{ marginBottom: 'var(--space-gap-xs)' }}>
              Kontakt
            </h4>
            <ul className="text-white/80" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem, 0.2rem + 0.5vw, 0.625rem)' }}>
              <li className="fluid-small">Alter Hellweg 48</li>
              <li className="fluid-small">44379 Dortmund</li>
              <li>
                <a href="tel:+4923128667696" className="fluid-small hover:text-cme-blue transition-colors">
                  +49 231 28 66 76 96-0
                </a>
              </li>
              <li>
                <a href="mailto:info@control-motion.de" className="fluid-small hover:text-cme-blue transition-colors">
                  info@control-motion.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/15 flex flex-col md:flex-row md:justify-between items-center" style={{ paddingTop: 'var(--space-gap-sm)', gap: 'var(--space-gap-xs)' }}>
          <p className="fluid-xs text-white/80">{t.footer.copyright}</p>
          <div className="flex fluid-xs" style={{ gap: 'var(--space-gap-sm)' }}>
            <Link href="/impressum" className="text-white/80 hover:text-cme-blue transition-colors">
              {t.footer.imprint}
            </Link>
            <Link href="/datenschutz" className="text-white/80 hover:text-cme-blue transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/agb" className="text-white/80 hover:text-cme-blue transition-colors">
              {t.footer.agb}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
