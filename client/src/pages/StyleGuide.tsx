// CME Website – Interactive Style Guide
// Live-editable design tokens: changes are applied globally and persisted in LocalStorage

import { useState } from 'react';
import DiamondImage from '@/components/DiamondImage';
import { useDesignTokens, DesignTokens } from '@/hooks/useDesignTokens';

const DEMO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/hero_power_electronics-eKZ2diYBiMBnNwog2o4qTT.webp';

// ── Sub-components ─────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div style={{
        fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em',
        color: '#888', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.25rem'
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
      <span style={{ fontSize: 12, color: '#666', minWidth: 160, flexShrink: 0 }}>{label}</span>
      {children}
    </div>
  );
}

function ColorInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <input type="color" value={value} onChange={e => onChange(e.target.value)}
        style={{ width: 36, height: 28, border: '1px solid #ddd', borderRadius: 4, cursor: 'pointer', padding: 2 }} />
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        style={{ width: 90, fontSize: 12, padding: '4px 8px', border: '1px solid #ddd', borderRadius: 4, fontFamily: 'monospace' }} />
    </div>
  );
}

function NumberInput({ value, onChange, min, max, step = 1, unit = '' }: {
  value: number; onChange: (v: number) => void; min: number; max: number; step?: number; unit?: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: 120, accentColor: '#2196D3' }} />
      <span style={{ fontSize: 12, fontFamily: 'monospace', minWidth: 48, color: '#333' }}>
        {value}{unit}
      </span>
    </div>
  );
}

function SelectInput({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ fontSize: 12, padding: '4px 8px', border: '1px solid #ddd', borderRadius: 4 }}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// ── Copy-to-clipboard helper ───────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={copy} style={{
      fontSize: 11, padding: '3px 10px', background: copied ? '#22c55e' : '#2196D3',
      color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', transition: 'background 0.2s'
    }}>
      {copied ? 'Kopiert!' : 'Kopieren'}
    </button>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function StyleGuide() {
  const { tokens, updateToken, reset } = useDesignTokens();

  const cssExport = `/* CME Design Tokens – generiert vom Style Guide */
:root {
  --cme-color-primary: ${tokens.colorPrimary};
  --cme-color-dark: ${tokens.colorDark};
  --cme-color-gray: ${tokens.colorGray};
  --cme-color-accent: ${tokens.colorAccent};
  --cme-color-bg: ${tokens.colorBg};
  --cme-font-family: '${tokens.fontFamily}', sans-serif;
  --cme-font-size-h1: ${tokens.fontSizeH1}px;
  --cme-font-size-h2: ${tokens.fontSizeH2}px;
  --cme-font-size-h3: ${tokens.fontSizeH3}px;
  --cme-font-size-h4: ${tokens.fontSizeH4}px;
  --cme-font-size-body: ${tokens.fontSizeBody}px;
  --cme-font-size-small: ${tokens.fontSizeSmall}px;
  --cme-font-weight-heading: ${tokens.fontWeightHeading};
  --cme-font-weight-body: ${tokens.fontWeightBody};
  --cme-line-height-heading: ${tokens.lineHeightHeading};
  --cme-line-height-body: ${tokens.lineHeightBody};
  --cme-letter-spacing-heading: ${tokens.letterSpacingHeading}px;
  --cme-diamond-radius: ${tokens.diamondRadius};
  --cme-border-radius: ${tokens.borderRadius}px;
  --cme-section-padding: ${tokens.sectionPadding}px;
  --cme-container-max-width: ${tokens.containerMaxWidth}px;
}`;

  const headingStyle = (size: number): React.CSSProperties => ({
    fontFamily: `'${tokens.fontFamily}', sans-serif`,
    fontSize: size,
    fontWeight: tokens.fontWeightHeading,
    lineHeight: tokens.lineHeightHeading,
    letterSpacing: tokens.letterSpacingHeading,
    color: tokens.colorDark,
    margin: '0 0 0.5rem',
  });

  const bodyStyle: React.CSSProperties = {
    fontFamily: `'${tokens.fontFamily}', sans-serif`,
    fontSize: tokens.fontSizeBody,
    fontWeight: tokens.fontWeightBody,
    lineHeight: tokens.lineHeightBody,
    color: tokens.colorGray,
    margin: '0 0 0.75rem',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div style={{ background: tokens.colorDark, color: '#fff', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.5 }}>CME</span>
          <span style={{ fontSize: 16, fontWeight: 700, marginLeft: '0.75rem' }}>Style Guide</span>
        </div>
        <a href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, textDecoration: 'none' }}>← Zurück zur Website</a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', minHeight: 'calc(100vh - 56px)' }}>

        {/* ── LEFT: Controls ── */}
        <div style={{
          background: '#fff', borderRight: '1px solid #e2e8f0',
          padding: '1.5rem', overflowY: 'auto', maxHeight: 'calc(100vh - 56px)',
          position: 'sticky', top: 56,
        }}>

          <Section title="Farben">
            <Row label="Primärfarbe (CME-Blau)">
              <ColorInput value={tokens.colorPrimary} onChange={v => updateToken('colorPrimary', v)} />
            </Row>
            <Row label="Dunkel (Headlines)">
              <ColorInput value={tokens.colorDark} onChange={v => updateToken('colorDark', v)} />
            </Row>
            <Row label="Grau (Fließtext)">
              <ColorInput value={tokens.colorGray} onChange={v => updateToken('colorGray', v)} />
            </Row>
            <Row label="Akzent">
              <ColorInput value={tokens.colorAccent} onChange={v => updateToken('colorAccent', v)} />
            </Row>
            <Row label="Hintergrund">
              <ColorInput value={tokens.colorBg} onChange={v => updateToken('colorBg', v)} />
            </Row>
          </Section>

          <Section title="Schriftfamilie">
            <Row label="Font">
              <SelectInput value={tokens.fontFamily} onChange={v => updateToken('fontFamily', v)}
                options={['Roboto', 'Inter', 'Open Sans', 'Source Sans Pro', 'Lato', 'Nunito', 'DM Sans', 'IBM Plex Sans']} />
            </Row>
            <Row label="Gewicht Headlines">
              <SelectInput value={String(tokens.fontWeightHeading)} onChange={v => updateToken('fontWeightHeading', Number(v))}
                options={['300', '400', '500', '600', '700', '800', '900']} />
            </Row>
            <Row label="Gewicht Body">
              <SelectInput value={String(tokens.fontWeightBody)} onChange={v => updateToken('fontWeightBody', Number(v))}
                options={['300', '400', '500']} />
            </Row>
          </Section>

          <Section title="Schriftgrößen">
            <Row label="H1">
              <NumberInput value={tokens.fontSizeH1} onChange={v => updateToken('fontSizeH1', v)} min={28} max={120} unit="px" />
            </Row>
            <Row label="H2">
              <NumberInput value={tokens.fontSizeH2} onChange={v => updateToken('fontSizeH2', v)} min={22} max={80} unit="px" />
            </Row>
            <Row label="H3">
              <NumberInput value={tokens.fontSizeH3} onChange={v => updateToken('fontSizeH3', v)} min={16} max={56} unit="px" />
            </Row>
            <Row label="H4">
              <NumberInput value={tokens.fontSizeH4} onChange={v => updateToken('fontSizeH4', v)} min={14} max={40} unit="px" />
            </Row>
            <Row label="Body">
              <NumberInput value={tokens.fontSizeBody} onChange={v => updateToken('fontSizeBody', v)} min={12} max={24} unit="px" />
            </Row>
            <Row label="Klein">
              <NumberInput value={tokens.fontSizeSmall} onChange={v => updateToken('fontSizeSmall', v)} min={10} max={18} unit="px" />
            </Row>
          </Section>

          <Section title="Zeilenabstand & Spacing">
            <Row label="Zeilenhöhe Headlines">
              <NumberInput value={tokens.lineHeightHeading} onChange={v => updateToken('lineHeightHeading', v)} min={0.9} max={1.8} step={0.05} />
            </Row>
            <Row label="Zeilenhöhe Body">
              <NumberInput value={tokens.lineHeightBody} onChange={v => updateToken('lineHeightBody', v)} min={1.2} max={2.2} step={0.05} />
            </Row>
            <Row label="Letter-Spacing H">
              <NumberInput value={tokens.letterSpacingHeading} onChange={v => updateToken('letterSpacingHeading', v)} min={-3} max={5} step={0.5} unit="px" />
            </Row>
          </Section>

          <Section title="Rauten-Element">
            <Row label="Eckenradius">
              <NumberInput value={tokens.diamondRadius} onChange={v => updateToken('diamondRadius', v)} min={0} max={0.25} step={0.005} />
            </Row>
          </Section>

          <Section title="Layout">
            <Row label="Button-Radius">
              <NumberInput value={tokens.borderRadius} onChange={v => updateToken('borderRadius', v)} min={0} max={32} unit="px" />
            </Row>
            <Row label="Section-Padding">
              <NumberInput value={tokens.sectionPadding} onChange={v => updateToken('sectionPadding', v)} min={20} max={200} unit="px" />
            </Row>
            <Row label="Container-Breite">
              <NumberInput value={tokens.containerMaxWidth} onChange={v => updateToken('containerMaxWidth', v)} min={800} max={2400} step={40} unit="px" />
            </Row>
          </Section>

          {/* Reset */}
          <button
            onClick={reset}
            style={{
              width: '100%', padding: '0.6rem', background: '#f1f5f9',
              border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer',
              fontSize: 12, color: '#64748b', marginTop: '0.5rem',
            }}
          >
            Auf Standardwerte zurücksetzen
          </button>

          {/* Info */}
          <div style={{
            marginTop: '1.5rem', padding: '0.75rem', background: '#e0f2fe',
            border: '1px solid #7dd3fc', borderRadius: 6, fontSize: 11, color: '#0369a1', lineHeight: 1.5
          }}>
            <strong>Änderungen werden sofort übernommen!</strong><br />
            Alle Anpassungen werden in Echtzeit auf der Website angewendet und im Browser gespeichert.
          </div>
        </div>

        {/* ── RIGHT: Preview ── */}
        <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 56px)', background: tokens.colorBg }}>

          {/* Typografie-Vorschau */}
          <div style={{ padding: `${tokens.sectionPadding}px clamp(2rem, 5vw, 6rem)`, maxWidth: tokens.containerMaxWidth, margin: '0 auto' }}>

            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#aaa', marginBottom: '2rem' }}>
              Typografie-Vorschau
            </div>

            <p style={{ ...bodyStyle, fontSize: tokens.fontSizeSmall, textTransform: 'uppercase', letterSpacing: '0.18em', color: tokens.colorPrimary, fontWeight: 500 }}>
              THE ELECTRONIC COMPANY
            </p>
            <h1 style={headingStyle(tokens.fontSizeH1)}>Elektronikentwicklung.</h1>
            <h1 style={{ ...headingStyle(tokens.fontSizeH1), color: tokens.colorPrimary }}>Aus einer Hand.</h1>
            <h2 style={headingStyle(tokens.fontSizeH2)}>Unsere Leistungen</h2>
            <h3 style={headingStyle(tokens.fontSizeH3)}>Elektronikentwicklung (EMS)</h3>
            <h4 style={headingStyle(tokens.fontSizeH4)}>Eigene EMV-Messkammer</h4>
            <p style={bodyStyle}>
              Von der Systemarchitektur über Hardware- und Softwareentwicklung bis zur Simulation und EMV-Qualifikation –
              wir entwickeln Elektronik, die funktioniert. Leistungselektronik, Antriebstechnik, thermisch anspruchsvolle Projekte.
            </p>
            <p style={{ ...bodyStyle, fontSize: tokens.fontSizeSmall }}>
              ISO 9001 · ISO 14001 · ISO 26262 · IATF 16949 · Made in Dortmund
            </p>

            {/* Farb-Chips */}
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#aaa', margin: '2.5rem 0 1rem' }}>
              Farbpalette
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {[
                { label: 'Primär', color: tokens.colorPrimary },
                { label: 'Dunkel', color: tokens.colorDark },
                { label: 'Grau', color: tokens.colorGray },
                { label: 'Akzent', color: tokens.colorAccent },
                { label: 'Hintergrund', color: tokens.colorBg, border: true },
              ].map(c => (
                <div key={c.label} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 64, height: 64,
                    background: c.color,
                    borderRadius: tokens.borderRadius,
                    border: c.border ? '1px solid #e2e8f0' : 'none',
                    marginBottom: '0.4rem',
                  }} />
                  <div style={{ fontSize: 11, color: '#666' }}>{c.label}</div>
                  <div style={{ fontSize: 10, color: '#aaa', fontFamily: 'monospace' }}>{c.color}</div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#aaa', marginBottom: '1rem' }}>
              Buttons & UI-Elemente
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem', alignItems: 'center' }}>
              <button style={{
                background: tokens.colorPrimary, color: '#fff', border: 'none',
                borderRadius: tokens.borderRadius, padding: '0.7rem 1.8rem',
                fontSize: tokens.fontSizeBody, fontWeight: 600, cursor: 'pointer',
                fontFamily: `'${tokens.fontFamily}', sans-serif`,
              }}>
                Projekt anfragen
              </button>
              <button style={{
                background: 'transparent', color: tokens.colorDark,
                border: `2px solid ${tokens.colorDark}`,
                borderRadius: tokens.borderRadius, padding: '0.65rem 1.8rem',
                fontSize: tokens.fontSizeBody, fontWeight: 600, cursor: 'pointer',
                fontFamily: `'${tokens.fontFamily}', sans-serif`,
              }}>
                Leistungen entdecken
              </button>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: tokens.colorPrimary, color: '#fff',
                fontSize: tokens.fontSizeSmall, fontWeight: 700,
                padding: '0.25em 0.75em',
                fontFamily: `'${tokens.fontFamily}', sans-serif`,
              }}>
                01 <span style={{ fontWeight: 400, opacity: 0.7 }}>ENTWICKLUNG</span>
              </div>
            </div>

            {/* Rauten-Vorschau */}
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#aaa', marginBottom: '1.5rem' }}>
              Rauten-Element
            </div>
            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2.5rem' }}>
              <DiamondImage
                src={DEMO_IMAGE}
                alt="Vorschau"
                size="280px"
                cornerRadius={tokens.diamondRadius}
                animate={false}
              />
              <div>
                <p style={{ ...bodyStyle, fontSize: tokens.fontSizeSmall }}>
                  <strong>Radius:</strong> {tokens.diamondRadius}<br />
                  <strong>Effektiver Eckradius:</strong> {(tokens.diamondRadius * 50).toFixed(1)} Einheiten
                </p>
              </div>
            </div>

            {/* CSS Export */}
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#aaa', marginBottom: '1rem' }}>
              CSS-Export
            </div>
            <div style={{ position: 'relative', background: '#1e293b', borderRadius: 8, padding: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                <CopyButton text={cssExport} />
              </div>
              <pre style={{ margin: 0, fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                {cssExport}
              </pre>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
