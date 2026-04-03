// CME Website – Footer
// Design: Techno-Industrial Precision – fluid sizing from 375px to 3840px

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const contentMax = 'min(1600px, 90vw)';
  const contentPad = 'clamp(1rem, 2vw + 0.5rem, 4rem)';

  return (
    <footer
      style={{
        background: 'var(--cme-color-dark)',
        color: '#fff',
        paddingTop: 'clamp(3rem, 5vw, 6rem)',
        paddingBottom: 'clamp(2rem, 4vw, 4rem)',
      }}
    >
      <div style={{ maxWidth: contentMax, margin: '0 auto', paddingLeft: contentPad, paddingRight: contentPad }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: 'clamp(2rem, 4vw, 5rem)',
            marginBottom: 'clamp(2rem, 4vw, 4rem)',
          }}
        >
          {/* Logo & Tagline */}
          <div style={{ gridColumn: 'span 2' }}>
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_rechts_Logo_CMYK_white_18093efb.svg"
              alt="CME Control Motion Electronics"
              className="cme-logo-img"
              style={{ width: 'auto', marginBottom: 'clamp(0.75rem, 1.5vw, 1.5rem)' }}
            />
            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.50)', maxWidth: 'clamp(260px, 30vw, 420px)', lineHeight: 1.65 }}>
              Entwicklung und Fertigung elektronischer Produkte – mit technischer Tiefe und Serienblick. Made in Dortmund.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
              {['ISO 9001', 'ISO 14001'].map((cert) => (
                <span
                  key={cert}
                  style={{
                    fontSize: 'var(--text-xs)',
                    padding: '0.3em 0.6em',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.30)', marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
              Leistungen
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: t.footer.dev, target: 'services' },
                { label: t.footer.mfg, target: 'services' },
                { label: t.footer.lifecycle, target: 'services' },
                { label: 'Märkte & Branchen', target: 'markets' },
              ].map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo(link.target)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: 'var(--text-sm)',
                      color: 'rgba(255,255,255,0.55)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--cme-color-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.30)', marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
              Kontakt
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.55)' }}>
              <li>Alter Hellweg 48</li>
              <li>44379 Dortmund</li>
              <li>
                <a
                  href="tel:+4923128667696"
                  style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--cme-color-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  +49 231 28 66 76 96-0
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@control-motion.de"
                  style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--cme-color-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  info@control-motion.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: 'clamp(1rem, 2vw, 2rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
          }}
          className="md:flex-row md:justify-between"
        >
          <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.30)' }}>{t.footer.copyright}</p>
          <div style={{ display: 'flex', gap: 'clamp(1rem, 2vw, 2rem)', fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.30)' }}>
            <a
              href="#"
              style={{ color: 'rgba(255,255,255,0.30)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--cme-color-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.30)')}
            >
              {t.footer.imprint}
            </a>
            <a
              href="#"
              style={{ color: 'rgba(255,255,255,0.30)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--cme-color-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.30)')}
            >
              {t.footer.privacy}
            </a>
            <a
              href="#"
              style={{ color: 'rgba(255,255,255,0.30)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--cme-color-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.30)')}
            >
              {t.footer.agb}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
