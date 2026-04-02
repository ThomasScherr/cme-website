// CME Website – Interactive Style Guide
// Live-editable design tokens + per-diamond positioning
// All changes are applied globally via CSS Custom Properties and persisted in LocalStorage

import { useState } from 'react';
import DiamondImage from '@/components/DiamondImage';
import {
  useDesignTokens,
  useDiamondConfigs,
  DiamondId,
  DIAMOND_LABELS,
  DEFAULT_DIAMOND_CONFIGS,
} from '@/hooks/useDesignTokens';

const DEMO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/hero_power_electronics-eKZ2diYBiMBnNwog2o4qTT.webp';

// ── Shared UI components ───────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em',
      color: '#888', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.25rem'
    }}>
      {title}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <SectionHeader title={title} />
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
        style={{ width: 130, accentColor: '#2196D3' }} />
      <span style={{ fontSize: 12, fontFamily: 'monospace', minWidth: 52, color: '#333' }}>
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

// ── Tab navigation ─────────────────────────────────────────────────────────

type Tab = 'design' | 'diamonds';

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'design', label: 'Design Tokens' },
    { id: 'diamonds', label: 'Rauten-Positionen' },
  ];
  return (
    <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '1.5rem' }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          padding: '0.6rem 1.1rem', fontSize: 12, fontWeight: active === t.id ? 700 : 400,
          color: active === t.id ? '#2196D3' : '#666',
          background: 'none', border: 'none', borderBottom: active === t.id ? '2px solid #2196D3' : '2px solid transparent',
          marginBottom: -2, cursor: 'pointer', transition: 'all 0.15s',
        }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ── Diamond Position Editor ────────────────────────────────────────────────

function DiamondEditor() {
  const { configs, updateDiamond, resetAll } = useDiamondConfigs();
  const [activeId, setActiveId] = useState<DiamondId>('hero');
  const ids = Object.keys(DIAMOND_LABELS) as DiamondId[];
  const cfg = configs[activeId];

  return (
    <div>
      {/* Diamond selector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
        {ids.map(id => (
          <button key={id} onClick={() => setActiveId(id)} style={{
            textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: 12,
            background: activeId === id ? '#e0f2fe' : '#f8fafc',
            border: `1px solid ${activeId === id ? '#7dd3fc' : '#e2e8f0'}`,
            borderRadius: 6, cursor: 'pointer', color: activeId === id ? '#0369a1' : '#555',
            fontWeight: activeId === id ? 600 : 400,
          }}>
            {DIAMOND_LABELS[id]}
          </button>
        ))}
      </div>

      {/* Controls for selected diamond */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#2196D3', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
          {DIAMOND_LABELS[activeId]}
        </div>

        <Row label="Größe (vw)">
          <NumberInput value={cfg.size} onChange={v => updateDiamond(activeId, 'size', v)} min={20} max={120} unit="vw" />
        </Row>
        <Row label="Position X (Anschnitt)">
          <NumberInput value={cfg.offsetX} onChange={v => updateDiamond(activeId, 'offsetX', v)} min={-80} max={80} unit="vw" />
        </Row>
        <Row label="Position Y">
          <NumberInput value={cfg.offsetY} onChange={v => updateDiamond(activeId, 'offsetY', v)} min={-50} max={50} unit="vh" />
        </Row>
        <Row label="Rotation (extra)">
          <NumberInput value={cfg.rotate} onChange={v => updateDiamond(activeId, 'rotate', v)} min={-45} max={45} unit="°" />
        </Row>

        {/* Quick reset for this diamond */}
        <button onClick={() => {
          const def = DEFAULT_DIAMOND_CONFIGS[activeId];
          updateDiamond(activeId, 'size', def.size);
          updateDiamond(activeId, 'offsetX', def.offsetX);
          updateDiamond(activeId, 'offsetY', def.offsetY);
          updateDiamond(activeId, 'rotate', def.rotate);
        }} style={{
          marginTop: '0.75rem', fontSize: 11, padding: '4px 12px',
          background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 4,
          cursor: 'pointer', color: '#64748b',
        }}>
          Diese Raute zurücksetzen
        </button>
      </div>

      {/* Mini preview */}
      <div style={{ background: '#1a1a2e', borderRadius: 8, padding: '1.5rem', display: 'flex', justifyContent: 'center', overflow: 'hidden', position: 'relative', minHeight: 200 }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', position: 'absolute', top: 8, left: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Vorschau
        </div>
        <div style={{
          position: 'relative',
          width: Math.min(cfg.size * 1.5, 180),
          height: Math.min(cfg.size * 1.5, 180),
          transform: `translate(${cfg.offsetX * 0.3}px, ${cfg.offsetY * 0.5}px)`,
          transition: 'all 0.2s',
        }}>
          <DiamondImage src={DEMO_IMAGE} alt="Vorschau" size="100%" animate={false} />
        </div>
      </div>

      {/* Reset all */}
      <button onClick={resetAll} style={{
        width: '100%', marginTop: '1rem', padding: '0.6rem',
        background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 6,
        cursor: 'pointer', fontSize: 12, color: '#64748b',
      }}>
        Alle Rauten zurücksetzen
      </button>

      <div style={{
        marginTop: '1rem', padding: '0.75rem', background: '#e0f2fe',
        border: '1px solid #7dd3fc', borderRadius: 6, fontSize: 11, color: '#0369a1', lineHeight: 1.5
      }}>
        <strong>Tipp:</strong> Öffne die Website in einem zweiten Tab – Änderungen sind dort sofort sichtbar!
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function StyleGuide() {
  const { tokens, updateToken, reset } = useDesignTokens();
  const [activeTab, setActiveTab] = useState<Tab>('design');

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
  --cme-logo-height: ${tokens.logoHeight}px;
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
      <div style={{
        background: tokens.colorDark, color: '#fff', padding: '1rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div>
          <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.5 }}>CME</span>
          <span style={{ fontSize: 16, fontWeight: 700, marginLeft: '0.75rem' }}>Style Guide</span>
        </div>
        <a href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, textDecoration: 'none' }}>← Zurück zur Website</a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', minHeight: 'calc(100vh - 56px)' }}>

        {/* ── LEFT: Controls ── */}
        <div style={{
          background: '#fff', borderRight: '1px solid #e2e8f0',
          padding: '1.5rem', overflowY: 'auto', maxHeight: 'calc(100vh - 56px)',
          position: 'sticky', top: 56,
        }}>
          <TabBar active={activeTab} onChange={setActiveTab} />

          {/* ── TAB: Design Tokens ── */}
          {activeTab === 'design' && (
            <>
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
                <Row label="H1"><NumberInput value={tokens.fontSizeH1} onChange={v => updateToken('fontSizeH1', v)} min={28} max={120} unit="px" /></Row>
                <Row label="H2"><NumberInput value={tokens.fontSizeH2} onChange={v => updateToken('fontSizeH2', v)} min={22} max={80} unit="px" /></Row>
                <Row label="H3"><NumberInput value={tokens.fontSizeH3} onChange={v => updateToken('fontSizeH3', v)} min={16} max={56} unit="px" /></Row>
                <Row label="H4"><NumberInput value={tokens.fontSizeH4} onChange={v => updateToken('fontSizeH4', v)} min={14} max={40} unit="px" /></Row>
                <Row label="Body"><NumberInput value={tokens.fontSizeBody} onChange={v => updateToken('fontSizeBody', v)} min={12} max={24} unit="px" /></Row>
                <Row label="Klein"><NumberInput value={tokens.fontSizeSmall} onChange={v => updateToken('fontSizeSmall', v)} min={10} max={18} unit="px" /></Row>
              </Section>

              <Section title="Zeilenabstand & Spacing">
                <Row label="Zeilenhöhe Headlines"><NumberInput value={tokens.lineHeightHeading} onChange={v => updateToken('lineHeightHeading', v)} min={0.9} max={1.8} step={0.05} /></Row>
                <Row label="Zeilenhöhe Body"><NumberInput value={tokens.lineHeightBody} onChange={v => updateToken('lineHeightBody', v)} min={1.2} max={2.2} step={0.05} /></Row>
                <Row label="Letter-Spacing H"><NumberInput value={tokens.letterSpacingHeading} onChange={v => updateToken('letterSpacingHeading', v)} min={-3} max={5} step={0.5} unit="px" /></Row>
              </Section>

              <Section title="Rauten (global)">
                <Row label="Eckenradius (alle)">
                  <NumberInput value={tokens.diamondRadius} onChange={v => updateToken('diamondRadius', v)} min={0} max={0.25} step={0.005} />
                </Row>
              </Section>

              <Section title="Logo">
                <Row label="Logo-Höhe (Header &amp; Footer)">
                  <NumberInput value={tokens.logoHeight} onChange={v => updateToken('logoHeight', v)} min={20} max={120} unit="px" />
                </Row>
                <div style={{ marginTop: '0.5rem' }}>
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/CME_rechts_Logo_RGB_433c645f.png"
                    alt="Logo Vorschau"
                    style={{ height: tokens.logoHeight, width: 'auto', maxWidth: '100%', border: '1px solid #e2e8f0', padding: '4px', borderRadius: 4 }}
                  />
                </div>
              </Section>

              <Section title="Layout">
                <Row label="Button-Radius"><NumberInput value={tokens.borderRadius} onChange={v => updateToken('borderRadius', v)} min={0} max={32} unit="px" /></Row>
                <Row label="Section-Padding"><NumberInput value={tokens.sectionPadding} onChange={v => updateToken('sectionPadding', v)} min={20} max={200} unit="px" /></Row>
                <Row label="Container-Breite"><NumberInput value={tokens.containerMaxWidth} onChange={v => updateToken('containerMaxWidth', v)} min={800} max={2400} step={40} unit="px" /></Row>
              </Section>

              <button onClick={reset} style={{
                width: '100%', padding: '0.6rem', background: '#f1f5f9',
                border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer',
                fontSize: 12, color: '#64748b', marginTop: '0.5rem',
              }}>
                Auf Standardwerte zurücksetzen
              </button>

              <div style={{
                marginTop: '1.5rem', padding: '0.75rem', background: '#e0f2fe',
                border: '1px solid #7dd3fc', borderRadius: 6, fontSize: 11, color: '#0369a1', lineHeight: 1.5
              }}>
                <strong>Änderungen werden sofort übernommen!</strong><br />
                Alle Anpassungen werden in Echtzeit auf der Website angewendet und im Browser gespeichert.
              </div>
            </>
          )}

          {/* ── TAB: Rauten-Positionen ── */}
          {activeTab === 'diamonds' && <DiamondEditor />}
        </div>

        {/* ── RIGHT: Preview ── */}
        <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 56px)', background: tokens.colorBg }}>
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
                    width: 64, height: 64, background: c.color,
                    borderRadius: tokens.borderRadius,
                    border: c.border ? '1px solid #e2e8f0' : 'none', marginBottom: '0.4rem',
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
              }}>Projekt anfragen</button>
              <button style={{
                background: 'transparent', color: tokens.colorDark,
                border: `2px solid ${tokens.colorDark}`,
                borderRadius: tokens.borderRadius, padding: '0.65rem 1.8rem',
                fontSize: tokens.fontSizeBody, fontWeight: 600, cursor: 'pointer',
                fontFamily: `'${tokens.fontFamily}', sans-serif`,
              }}>Leistungen entdecken</button>
            </div>

            {/* Rauten-Vorschau */}
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#aaa', marginBottom: '1.5rem' }}>
              Rauten-Element (globaler Radius)
            </div>
            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2.5rem' }}>
              <DiamondImage src={DEMO_IMAGE} alt="Vorschau" size="220px" cornerRadius={tokens.diamondRadius} animate={false} />
              <DiamondImage src={DEMO_IMAGE} alt="Vorschau groß" size="300px" cornerRadius={tokens.diamondRadius} animate={false} />
              <div>
                <p style={{ ...bodyStyle, fontSize: tokens.fontSizeSmall }}>
                  <strong>Radius:</strong> {tokens.diamondRadius}<br />
                  <strong>Effektiv:</strong> {(tokens.diamondRadius * 50).toFixed(1)} Einheiten
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
