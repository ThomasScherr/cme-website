// CME Website – Interactive Style Guide
// Live-editable design tokens: colors, typography, diamond radius, spacing

import { useState, useCallback } from 'react';
import DiamondImage from '@/components/DiamondImage';

// ── Types ──────────────────────────────────────────────────────────────────
interface Tokens {
  colorPrimary: string;
  colorDark: string;
  colorGray: string;
  colorAccent: string;
  colorBg: string;
  fontFamily: string;
  fontSizeH1: number;
  fontSizeH2: number;
  fontSizeH3: number;
  fontSizeH4: number;
  fontSizeBody: number;
  fontSizeSmall: number;
  fontWeightHeading: number;
  fontWeightBody: number;
  lineHeightHeading: number;
  lineHeightBody: number;
  letterSpacingHeading: number;
  diamondRadius: number;
  diamondSize: number;
  borderRadius: number;
  sectionPadding: number;
  containerMaxWidth: number;
}

const DEFAULTS: Tokens = {
  colorPrimary: '#2196D3',
  colorDark: '#1a1a2e',
  colorGray: '#4a5568',
  colorAccent: '#00b4d8',
  colorBg: '#ffffff',
  fontFamily: 'Roboto',
  fontSizeH1: 56,
  fontSizeH2: 40,
  fontSizeH3: 28,
  fontSizeH4: 20,
  fontSizeBody: 16,
  fontSizeSmall: 13,
  fontWeightHeading: 700,
  fontWeightBody: 400,
  lineHeightHeading: 1.15,
  lineHeightBody: 1.65,
  letterSpacingHeading: -0.5,
  diamondRadius: 0.036,
  diamondSize: 280,
  borderRadius: 4,
  sectionPadding: 80,
  containerMaxWidth: 1280,
};

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
  const [t, setT] = useState<Tokens>(DEFAULTS);
  const set = useCallback(<K extends keyof Tokens>(key: K, value: Tokens[K]) => {
    setT(prev => ({ ...prev, [key]: value }));
  }, []);

  const cssExport = `/* CME Design Tokens – generiert vom Style Guide */
:root {
  --color-primary: ${t.colorPrimary};
  --color-dark: ${t.colorDark};
  --color-gray: ${t.colorGray};
  --color-accent: ${t.colorAccent};
  --color-bg: ${t.colorBg};
  --font-family: '${t.fontFamily}', sans-serif;
  --font-size-h1: ${t.fontSizeH1}px;
  --font-size-h2: ${t.fontSizeH2}px;
  --font-size-h3: ${t.fontSizeH3}px;
  --font-size-h4: ${t.fontSizeH4}px;
  --font-size-body: ${t.fontSizeBody}px;
  --font-size-small: ${t.fontSizeSmall}px;
  --font-weight-heading: ${t.fontWeightHeading};
  --font-weight-body: ${t.fontWeightBody};
  --line-height-heading: ${t.lineHeightHeading};
  --line-height-body: ${t.lineHeightBody};
  --letter-spacing-heading: ${t.letterSpacingHeading}px;
  --diamond-radius: ${t.diamondRadius};
  --border-radius: ${t.borderRadius}px;
  --section-padding: ${t.sectionPadding}px;
  --container-max-width: ${t.containerMaxWidth}px;
}`;

  const headingStyle = (size: number): React.CSSProperties => ({
    fontFamily: `'${t.fontFamily}', sans-serif`,
    fontSize: size,
    fontWeight: t.fontWeightHeading,
    lineHeight: t.lineHeightHeading,
    letterSpacing: t.letterSpacingHeading,
    color: t.colorDark,
    margin: '0 0 0.5rem',
  });

  const bodyStyle: React.CSSProperties = {
    fontFamily: `'${t.fontFamily}', sans-serif`,
    fontSize: t.fontSizeBody,
    fontWeight: t.fontWeightBody,
    lineHeight: t.lineHeightBody,
    color: t.colorGray,
    margin: '0 0 0.75rem',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div style={{ background: t.colorDark, color: '#fff', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
              <ColorInput value={t.colorPrimary} onChange={v => set('colorPrimary', v)} />
            </Row>
            <Row label="Dunkel (Headlines)">
              <ColorInput value={t.colorDark} onChange={v => set('colorDark', v)} />
            </Row>
            <Row label="Grau (Fließtext)">
              <ColorInput value={t.colorGray} onChange={v => set('colorGray', v)} />
            </Row>
            <Row label="Akzent">
              <ColorInput value={t.colorAccent} onChange={v => set('colorAccent', v)} />
            </Row>
            <Row label="Hintergrund">
              <ColorInput value={t.colorBg} onChange={v => set('colorBg', v)} />
            </Row>
          </Section>

          <Section title="Schriftfamilie">
            <Row label="Font">
              <SelectInput value={t.fontFamily} onChange={v => set('fontFamily', v)}
                options={['Roboto', 'Inter', 'Open Sans', 'Source Sans Pro', 'Lato', 'Nunito', 'DM Sans', 'IBM Plex Sans']} />
            </Row>
            <Row label="Gewicht Headlines">
              <SelectInput value={String(t.fontWeightHeading)} onChange={v => set('fontWeightHeading', Number(v))}
                options={['300', '400', '500', '600', '700', '800', '900']} />
            </Row>
            <Row label="Gewicht Body">
              <SelectInput value={String(t.fontWeightBody)} onChange={v => set('fontWeightBody', Number(v))}
                options={['300', '400', '500']} />
            </Row>
          </Section>

          <Section title="Schriftgrößen">
            <Row label="H1">
              <NumberInput value={t.fontSizeH1} onChange={v => set('fontSizeH1', v)} min={28} max={120} unit="px" />
            </Row>
            <Row label="H2">
              <NumberInput value={t.fontSizeH2} onChange={v => set('fontSizeH2', v)} min={22} max={80} unit="px" />
            </Row>
            <Row label="H3">
              <NumberInput value={t.fontSizeH3} onChange={v => set('fontSizeH3', v)} min={16} max={56} unit="px" />
            </Row>
            <Row label="H4">
              <NumberInput value={t.fontSizeH4} onChange={v => set('fontSizeH4', v)} min={14} max={40} unit="px" />
            </Row>
            <Row label="Body">
              <NumberInput value={t.fontSizeBody} onChange={v => set('fontSizeBody', v)} min={12} max={24} unit="px" />
            </Row>
            <Row label="Klein">
              <NumberInput value={t.fontSizeSmall} onChange={v => set('fontSizeSmall', v)} min={10} max={18} unit="px" />
            </Row>
          </Section>

          <Section title="Zeilenabstand & Spacing">
            <Row label="Zeilenhöhe Headlines">
              <NumberInput value={t.lineHeightHeading} onChange={v => set('lineHeightHeading', v)} min={0.9} max={1.8} step={0.05} />
            </Row>
            <Row label="Zeilenhöhe Body">
              <NumberInput value={t.lineHeightBody} onChange={v => set('lineHeightBody', v)} min={1.2} max={2.2} step={0.05} />
            </Row>
            <Row label="Letter-Spacing H">
              <NumberInput value={t.letterSpacingHeading} onChange={v => set('letterSpacingHeading', v)} min={-3} max={5} step={0.5} unit="px" />
            </Row>
          </Section>

          <Section title="Rauten-Element">
            <Row label="Eckenradius">
              <NumberInput value={t.diamondRadius} onChange={v => set('diamondRadius', v)} min={0} max={0.25} step={0.005} />
            </Row>
            <Row label="Größe">
              <NumberInput value={t.diamondSize} onChange={v => set('diamondSize', v)} min={100} max={600} step={10} unit="px" />
            </Row>
          </Section>

          <Section title="Layout">
            <Row label="Button-Radius">
              <NumberInput value={t.borderRadius} onChange={v => set('borderRadius', v)} min={0} max={32} unit="px" />
            </Row>
            <Row label="Section-Padding">
              <NumberInput value={t.sectionPadding} onChange={v => set('sectionPadding', v)} min={20} max={200} unit="px" />
            </Row>
            <Row label="Container-Breite">
              <NumberInput value={t.containerMaxWidth} onChange={v => set('containerMaxWidth', v)} min={800} max={2400} step={40} unit="px" />
            </Row>
          </Section>

          {/* Reset */}
          <button
            onClick={() => setT(DEFAULTS)}
            style={{
              width: '100%', padding: '0.6rem', background: '#f1f5f9',
              border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer',
              fontSize: 12, color: '#64748b', marginTop: '0.5rem',
            }}
          >
            Auf Standardwerte zurücksetzen
          </button>
        </div>

        {/* ── RIGHT: Preview ── */}
        <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 56px)', background: t.colorBg }}>

          {/* Typografie-Vorschau */}
          <div style={{ padding: `${t.sectionPadding}px clamp(2rem, 5vw, 6rem)`, maxWidth: t.containerMaxWidth, margin: '0 auto' }}>

            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#aaa', marginBottom: '2rem' }}>
              Typografie-Vorschau
            </div>

            <p style={{ ...bodyStyle, fontSize: t.fontSizeSmall, textTransform: 'uppercase', letterSpacing: '0.18em', color: t.colorPrimary, fontWeight: 500 }}>
              THE ELECTRONIC COMPANY
            </p>
            <h1 style={headingStyle(t.fontSizeH1)}>Elektronikentwicklung.</h1>
            <h1 style={{ ...headingStyle(t.fontSizeH1), color: t.colorPrimary }}>Aus einer Hand.</h1>
            <h2 style={headingStyle(t.fontSizeH2)}>Unsere Leistungen</h2>
            <h3 style={headingStyle(t.fontSizeH3)}>Elektronikentwicklung (EMS)</h3>
            <h4 style={headingStyle(t.fontSizeH4)}>Eigene EMV-Messkammer</h4>
            <p style={bodyStyle}>
              Von der Systemarchitektur über Hardware- und Softwareentwicklung bis zur Simulation und EMV-Qualifikation –
              wir entwickeln Elektronik, die funktioniert. Leistungselektronik, Antriebstechnik, thermisch anspruchsvolle Projekte.
            </p>
            <p style={{ ...bodyStyle, fontSize: t.fontSizeSmall }}>
              ISO 9001 · ISO 14001 · ISO 26262 · IATF 16949 · Made in Dortmund
            </p>

            {/* Farb-Chips */}
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#aaa', margin: '2.5rem 0 1rem' }}>
              Farbpalette
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {[
                { label: 'Primär', color: t.colorPrimary },
                { label: 'Dunkel', color: t.colorDark },
                { label: 'Grau', color: t.colorGray },
                { label: 'Akzent', color: t.colorAccent },
                { label: 'Hintergrund', color: t.colorBg, border: true },
              ].map(c => (
                <div key={c.label} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 64, height: 64,
                    background: c.color,
                    borderRadius: t.borderRadius,
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
                background: t.colorPrimary, color: '#fff', border: 'none',
                borderRadius: t.borderRadius, padding: '0.7rem 1.8rem',
                fontSize: t.fontSizeBody, fontWeight: 600, cursor: 'pointer',
                fontFamily: `'${t.fontFamily}', sans-serif`,
              }}>
                Projekt anfragen
              </button>
              <button style={{
                background: 'transparent', color: t.colorDark,
                border: `2px solid ${t.colorDark}`,
                borderRadius: t.borderRadius, padding: '0.65rem 1.8rem',
                fontSize: t.fontSizeBody, fontWeight: 600, cursor: 'pointer',
                fontFamily: `'${t.fontFamily}', sans-serif`,
              }}>
                Leistungen entdecken
              </button>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: t.colorPrimary, color: '#fff',
                fontSize: t.fontSizeSmall, fontWeight: 700,
                padding: '0.25em 0.75em',
                fontFamily: `'${t.fontFamily}', sans-serif`,
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
                size={`${t.diamondSize}px`}
                cornerRadius={t.diamondRadius}
                animate={false}
              />
              <div>
                <p style={{ ...bodyStyle, fontSize: t.fontSizeSmall }}>
                  <strong>Radius:</strong> {t.diamondRadius}<br />
                  <strong>Größe:</strong> {t.diamondSize}px<br />
                  <strong>Effektiver Eckradius:</strong> {(t.diamondRadius * 50).toFixed(1)} Einheiten
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
