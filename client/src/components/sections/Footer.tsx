import { useLanguage } from '@/contexts/LanguageContext';
import { useConsent } from '@/contexts/ConsentContext';
import { Link } from 'wouter';

const LOGO_WHITE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_rechts_Logo_CMYK_ws_bc8112c1.png';

export default function Footer() {
  const { t, lang } = useLanguage();
  const { openSettings } = useConsent();
  const isDE = lang === 'de';

  return (
    <footer
      className="bg-cme-dark text-white"
      style={{ paddingTop: 'var(--footer-pad-y)', paddingBottom: 'var(--footer-pad-y)' }}
    >
      <div className="mx-auto" style={{ maxWidth: 'var(--footer-max-w, 1200px)', paddingLeft: 'var(--container-px)', paddingRight: 'var(--container-px)' }}>
        {/* Main grid: responsive columns */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 'var(--footer-col-gap)', marginBottom: 'var(--footer-col-gap)' }}
        >
          {/* Logo & Tagline */}
          <div className="max-w-xs">
            <img
              src={LOGO_WHITE}
              alt="CME Control Motion Electronics"
              className="w-auto object-contain"
              style={{ height: 'var(--footer-logo)', marginBottom: 'var(--space-gap-xs)' }}
            />
            <p
              className="text-white/80 leading-relaxed"
              style={{ fontSize: 'var(--fs-footer)' }}
            >
              {isDE
                ? 'Entwicklung und Fertigung elektronischer Produkte – mit technischer Tiefe und Serienblick. Made in Dortmund.'
                : 'Development and manufacturing of electronic products – with technical depth and series-production focus. Made in Dortmund.'}
            </p>
            <div className="flex flex-wrap gap-2" style={{ marginTop: 'var(--space-gap-xs)' }}>
              {['ISO 9001', 'ISO 14001', 'UL Wiring Harness'].map((cert) => (
                <span
                  key={cert}
                  className="px-2.5 py-1 border border-white/30 text-white/70 rounded"
                  style={{ fontSize: 'var(--fs-footer-heading)' }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div className="md:ml-[clamp(2rem,1rem+4vw,5.625rem)]">
            <h4
              className="font-bold uppercase tracking-wider text-white/80"
              style={{ fontSize: 'var(--fs-footer-heading)', marginBottom: 'var(--space-gap-xs)' }}
            >
              {isDE ? 'Leistungen' : 'Services'}
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--footer-row-gap)' }}>
              {[
                { label: t.footer.dev, href: '/entwicklung' },
                { label: t.footer.mfg, href: '/fertigung' },
                { label: t.footer.lifecycle, href: '/lifecycle' },
                { label: isDE ? 'Märkte & Branchen' : 'Markets & Industries', href: '/maerkte' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-cme-blue transition-colors"
                    style={{ fontSize: 'var(--fs-footer)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-bold uppercase tracking-wider text-white/80"
              style={{ fontSize: 'var(--fs-footer-heading)', marginBottom: 'var(--space-gap-xs)' }}
            >
              {isDE ? 'Kontakt' : 'Contact'}
            </h4>
            <ul className="text-white/80" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--footer-row-gap)' }}>
              <li style={{ fontSize: 'var(--fs-footer)' }}>Alter Hellweg 48</li>
              <li style={{ fontSize: 'var(--fs-footer)' }}>44379 Dortmund, {isDE ? 'Deutschland' : 'Germany'}</li>
              <li>
                <a
                  href="tel:+4923128667696"
                  className="hover:text-cme-blue transition-colors whitespace-nowrap"
                  style={{ fontSize: 'var(--fs-footer)' }}
                >
                  +49 231 28 66 76 96-0
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@control-motion.de"
                  className="hover:text-cme-blue transition-colors whitespace-nowrap"
                  style={{ fontSize: 'var(--fs-footer)' }}
                >
                  info@control-motion.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t border-white/15 flex flex-col md:flex-row md:justify-between items-center"
          style={{ paddingTop: 'var(--footer-bottom-pad-y)', gap: 'var(--space-gap-xs)' }}
        >
          <p className="text-white/80" style={{ fontSize: 'var(--fs-footer-heading)' }}>
            {t.footer.copyright}
          </p>
          <div className="flex" style={{ gap: 'var(--space-gap-sm)', fontSize: 'var(--fs-footer-heading)' }}>
            <Link href="/impressum" className="text-white/80 hover:text-cme-blue transition-colors">
              {t.footer.imprint}
            </Link>
            <Link href="/datenschutz" className="text-white/80 hover:text-cme-blue transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/agb" className="text-white/80 hover:text-cme-blue transition-colors">
              {t.footer.agb}
            </Link>
            <button
              onClick={openSettings}
              className="text-white/80 hover:text-cme-blue transition-colors cursor-pointer"
            >
              {isDE ? 'Cookie-Einstellungen' : 'Cookie Settings'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
