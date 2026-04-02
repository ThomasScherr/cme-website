// CME Website – Interactive Style Guide with Live Preview
// Split layout: Left = controls, Right = live iframe preview of the actual website
// Changes are applied instantly via postMessage to the iframe (no polling delay)

import { useState, useRef, useEffect, useCallback } from 'react';
import DiamondImage from '@/components/DiamondImage';
import {
  useDesignTokens,
  useDiamondConfigs,
  DiamondId,
  DIAMOND_LABELS,
  DEFAULT_DIAMOND_CONFIGS,
  applyTokensToRoot,
  applyDiamondConfigsToRoot,
  loadTokens,
  loadDiamondConfigs,
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
      <span style={{ fontSize: 12, color: '#666', minWidth: 140, flexShrink: 0 }}>{label}</span>
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
        style={{ width: 110, accentColor: '#2196D3' }} />
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

type Tab = 'design' | 'diamonds' | 'export';

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'design', label: 'Design Tokens' },
    { id: 'diamonds', label: 'Rauten' },
    { id: 'export', label: 'CSS Export' },
  ];
  return (
    <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '1.5rem' }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          padding: '0.5rem 0.75rem', fontSize: 11, fontWeight: active === t.id ? 700 : 400,
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem' }}>
        {ids.map(id => (
          <button key={id} onClick={() => setActiveId(id)} style={{
            textAlign: 'left', padding: '0.4rem 0.65rem', fontSize: 11,
            background: activeId === id ? '#e0f2fe' : '#f8fafc',
            border: `1px solid ${activeId === id ? '#7dd3fc' : '#e2e8f0'}`,
            borderRadius: 5, cursor: 'pointer', color: activeId === id ? '#0369a1' : '#555',
            fontWeight: activeId === id ? 600 : 400,
          }}>
            {DIAMOND_LABELS[id]}
          </button>
        ))}
      </div>

      {/* Controls for selected diamond */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '0.85rem', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#2196D3', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
          {DIAMOND_LABELS[activeId]}
        </div>

        <Row label="Größe (vw)">
          <NumberInput value={cfg.size} onChange={v => updateDiamond(activeId, 'size', v)} min={20} max={120} unit="vw" />
        </Row>
        <Row label="X-Position">
          <NumberInput value={cfg.offsetX} onChange={v => updateDiamond(activeId, 'offsetX', v)} min={-80} max={80} unit="vw" />
        </Row>
        <Row label="Y-Position">
          <NumberInput value={cfg.offsetY} onChange={v => updateDiamond(activeId, 'offsetY', v)} min={-50} max={50} unit="vh" />
        </Row>
        <Row label="Rotation">
          <NumberInput value={cfg.rotate} onChange={v => updateDiamond(activeId, 'rotate', v)} min={-45} max={45} unit="°" />
        </Row>

        <button onClick={() => {
          const def = DEFAULT_DIAMOND_CONFIGS[activeId];
          updateDiamond(activeId, 'size', def.size);
          updateDiamond(activeId, 'offsetX', def.offsetX);
          updateDiamond(activeId, 'offsetY', def.offsetY);
          updateDiamond(activeId, 'rotate', def.rotate);
        }} style={{
          marginTop: '0.5rem', fontSize: 10, padding: '3px 10px',
          background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 4,
          cursor: 'pointer', color: '#64748b',
        }}>
          Zurücksetzen
        </button>
      </div>

      {/* Mini preview */}
      <div style={{ background: '#1a1a2e', borderRadius: 8, padding: '1.25rem', display: 'flex', justifyContent: 'center', overflow: 'hidden', position: 'relative', minHeight: 160 }}>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', position: 'absolute', top: 6, left: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Vorschau
        </div>
        <div style={{
          position: 'relative',
          width: Math.min(cfg.size * 1.5, 160),
          height: Math.min(cfg.size * 1.5, 160),
          transform: `translate(${cfg.offsetX * 0.3}px, ${cfg.offsetY * 0.5}px)`,
          transition: 'all 0.2s',
        }}>
          <DiamondImage src={DEMO_IMAGE} alt="Vorschau" size="100%" animate={false} />
        </div>
      </div>

      {/* Reset all */}
      <button onClick={resetAll} style={{
        width: '100%', marginTop: '0.75rem', padding: '0.5rem',
        background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 6,
        cursor: 'pointer', fontSize: 11, color: '#64748b',
      }}>
        Alle Rauten zurücksetzen
      </button>
    </div>
  );
}

// ── Preview Controls ──────────────────────────────────────────────────────

function PreviewToolbar({ scale, onScaleChange, onRefresh, previewMode, onModeChange }: {
  scale: number;
  onScaleChange: (s: number) => void;
  onRefresh: () => void;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  onModeChange: (m: 'desktop' | 'tablet' | 'mobile') => void;
}) {
  const modes = [
    { id: 'desktop' as const, label: 'Desktop', icon: '🖥', width: '100%' },
    { id: 'tablet' as const, label: 'Tablet', icon: '📱', width: '768px' },
    { id: 'mobile' as const, label: 'Mobile', icon: '📲', width: '375px' },
  ];

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.5rem 1rem', background: '#1e293b', borderBottom: '1px solid #334155',
      flexWrap: 'wrap', gap: '0.5rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {modes.map(m => (
          <button key={m.id} onClick={() => onModeChange(m.id)} style={{
            padding: '0.3rem 0.6rem', fontSize: 11, border: 'none', borderRadius: 4,
            background: previewMode === m.id ? '#2196D3' : '#334155',
            color: previewMode === m.id ? '#fff' : '#94a3b8',
            cursor: 'pointer', transition: 'all 0.15s',
          }}>
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: 10, color: '#64748b' }}>Zoom</span>
          <input type="range" min={25} max={100} value={scale}
            onChange={e => onScaleChange(Number(e.target.value))}
            style={{ width: 80, accentColor: '#2196D3' }} />
          <span style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace', minWidth: 32 }}>{scale}%</span>
        </div>
        <button onClick={onRefresh} style={{
          padding: '0.3rem 0.6rem', fontSize: 11, border: 'none', borderRadius: 4,
          background: '#334155', color: '#94a3b8', cursor: 'pointer',
        }}>
          ↻ Neu laden
        </button>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function StyleGuide() {
  const { tokens, updateToken, reset } = useDesignTokens();
  const { configs } = useDiamondConfigs();
  const [activeTab, setActiveTab] = useState<Tab>('design');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewScale, setPreviewScale] = useState(65);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeKey, setIframeKey] = useState(0);

  // Push CSS variable updates directly into the iframe's document
  const pushToIframe = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument?.documentElement) return;

    const currentTokens = loadTokens();
    const currentDiamonds = loadDiamondConfigs();

    // Apply tokens to iframe's :root
    const el = iframe.contentDocument.documentElement;
    
    // We replicate applyTokensToRoot logic for the iframe document
    el.style.setProperty('--cme-color-primary', currentTokens.colorPrimary);
    el.style.setProperty('--cme-color-dark', currentTokens.colorDark);
    el.style.setProperty('--cme-color-gray', currentTokens.colorGray);
    el.style.setProperty('--cme-color-accent', currentTokens.colorAccent);
    el.style.setProperty('--cme-color-bg', currentTokens.colorBg);
    
    // Derived colors
    const h = currentTokens.colorPrimary.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16) || 0;
    const g = parseInt(h.substring(2, 4), 16) || 0;
    const b = parseInt(h.substring(4, 6), 16) || 0;
    el.style.setProperty('--cme-color-primary-40', `rgba(${r}, ${g}, ${b}, 0.4)`);
    el.style.setProperty('--cme-color-primary-50', `rgba(${r}, ${g}, ${b}, 0.5)`);
    
    // Lighten helper
    const lighten = (hex: string, amount: number) => {
      const hh = hex.replace('#', '');
      const rr = Math.min(255, Math.round((parseInt(hh.substring(0, 2), 16) || 0) + (255 - (parseInt(hh.substring(0, 2), 16) || 0)) * amount));
      const gg = Math.min(255, Math.round((parseInt(hh.substring(2, 4), 16) || 0) + (255 - (parseInt(hh.substring(2, 4), 16) || 0)) * amount));
      const bb = Math.min(255, Math.round((parseInt(hh.substring(4, 6), 16) || 0) + (255 - (parseInt(hh.substring(4, 6), 16) || 0)) * amount));
      return `#${rr.toString(16).padStart(2, '0')}${gg.toString(16).padStart(2, '0')}${bb.toString(16).padStart(2, '0')}`;
    };
    el.style.setProperty('--cme-color-bg-alt', lighten(currentTokens.colorGray, 0.92));
    el.style.setProperty('--cme-color-border', lighten(currentTokens.colorGray, 0.82));
    
    el.style.setProperty('--cme-font-family', `'${currentTokens.fontFamily}', sans-serif`);
    el.style.setProperty('--cme-font-size-h1', `${currentTokens.fontSizeH1}px`);
    el.style.setProperty('--cme-font-size-h2', `${currentTokens.fontSizeH2}px`);
    el.style.setProperty('--cme-font-size-h3', `${currentTokens.fontSizeH3}px`);
    el.style.setProperty('--cme-font-size-h4', `${currentTokens.fontSizeH4}px`);
    el.style.setProperty('--cme-font-size-body', `${currentTokens.fontSizeBody}px`);
    el.style.setProperty('--cme-font-size-small', `${currentTokens.fontSizeSmall}px`);
    el.style.setProperty('--cme-font-weight-heading', String(currentTokens.fontWeightHeading));
    el.style.setProperty('--cme-font-weight-body', String(currentTokens.fontWeightBody));
    el.style.setProperty('--cme-line-height-heading', String(currentTokens.lineHeightHeading));
    el.style.setProperty('--cme-line-height-body', String(currentTokens.lineHeightBody));
    el.style.setProperty('--cme-letter-spacing-heading', `${currentTokens.letterSpacingHeading}px`);
    el.style.setProperty('--cme-diamond-radius', String(currentTokens.diamondRadius));
    el.style.setProperty('--cme-border-radius', `${currentTokens.borderRadius}px`);
    el.style.setProperty('--radius', `${currentTokens.borderRadius / 16}rem`);
    el.style.setProperty('--cme-section-padding', `${currentTokens.sectionPadding}px`);
    el.style.setProperty('--cme-container-max-width', `${currentTokens.containerMaxWidth}px`);
    el.style.setProperty('--cme-logo-height', `clamp(${currentTokens.logoHeightMin}px, ${currentTokens.logoHeightIdeal}vw, ${currentTokens.logoHeightMax}px)`);

    // Diamond configs
    const diamondIds = ['hero', 'service1', 'service2', 'service3', 'markets'] as const;
    diamondIds.forEach(id => {
      const c = currentDiamonds[id];
      if (!c) return;
      el.style.setProperty(`--cme-diamond-${id}-size`, `${c.size}vw`);
      el.style.setProperty(`--cme-diamond-${id}-offset-x`, `${c.offsetX}vw`);
      el.style.setProperty(`--cme-diamond-${id}-offset-y`, `${c.offsetY}vh`);
      el.style.setProperty(`--cme-diamond-${id}-rotate`, `${c.rotate}deg`);
    });
  }, []);

  // Push updates whenever tokens or diamond configs change
  useEffect(() => {
    pushToIframe();
  }, [tokens, configs, pushToIframe]);

  // Also push after iframe loads
  const handleIframeLoad = useCallback(() => {
    // Small delay to ensure iframe's React has mounted and applied initial styles
    setTimeout(() => pushToIframe(), 200);
    setTimeout(() => pushToIframe(), 600);
  }, [pushToIframe]);

  // Fixed internal widths so the iframe always sees the "real" viewport width
  const previewInternalWidths: Record<string, number> = {
    desktop: 1440,
    tablet: 768,
    mobile: 375,
  };

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
  --cme-logo-height: clamp(${tokens.logoHeightMin}px, ${tokens.logoHeightIdeal}vw, ${tokens.logoHeightMax}px);
}`;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Roboto, sans-serif', overflow: 'hidden' }}>
      {/* ── Header ── */}
      <div style={{
        background: '#0f172a', color: '#fff', padding: '0.6rem 1.25rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: '#2196D3',
            boxShadow: '0 0 8px rgba(33,150,211,0.5)',
          }} />
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em' }}>CME Style Guide</span>
          <span style={{ fontSize: 10, color: '#64748b', marginLeft: '0.25rem' }}>Live Preview</span>
        </div>
        <a href="/" style={{ color: '#64748b', fontSize: 11, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <span style={{ fontSize: 14 }}>←</span> Zurück zur Website
        </a>
      </div>

      {/* ── Main Layout ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── LEFT: Controls Panel ── */}
        <div style={{
          width: 340, minWidth: 340, flexShrink: 0,
          background: '#fff', borderRight: '1px solid #e2e8f0',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <div style={{ padding: '1rem 1.25rem 0', flexShrink: 0 }}>
            <TabBar active={activeTab} onChange={setActiveTab} />
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem 1.25rem' }}>

            {/* ── TAB: Design Tokens ── */}
            {activeTab === 'design' && (
              <>
                <Section title="Farben">
                  <Row label="Primärfarbe">
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

                <Section title="Typografie">
                  <Row label="Font">
                    <SelectInput value={tokens.fontFamily} onChange={v => updateToken('fontFamily', v)}
                      options={['Roboto', 'Inter', 'Open Sans', 'Source Sans Pro', 'Lato', 'Nunito', 'DM Sans', 'IBM Plex Sans']} />
                  </Row>
                  <Row label="Gewicht H">
                    <SelectInput value={String(tokens.fontWeightHeading)} onChange={v => updateToken('fontWeightHeading', Number(v))}
                      options={['300', '400', '500', '600', '700', '800', '900']} />
                  </Row>
                  <Row label="Gewicht Body">
                    <SelectInput value={String(tokens.fontWeightBody)} onChange={v => updateToken('fontWeightBody', Number(v))}
                      options={['300', '400', '500']} />
                  </Row>
                  <Row label="H1"><NumberInput value={tokens.fontSizeH1} onChange={v => updateToken('fontSizeH1', v)} min={28} max={120} unit="px" /></Row>
                  <Row label="H2"><NumberInput value={tokens.fontSizeH2} onChange={v => updateToken('fontSizeH2', v)} min={22} max={80} unit="px" /></Row>
                  <Row label="H3"><NumberInput value={tokens.fontSizeH3} onChange={v => updateToken('fontSizeH3', v)} min={16} max={56} unit="px" /></Row>
                  <Row label="H4"><NumberInput value={tokens.fontSizeH4} onChange={v => updateToken('fontSizeH4', v)} min={14} max={40} unit="px" /></Row>
                  <Row label="Body"><NumberInput value={tokens.fontSizeBody} onChange={v => updateToken('fontSizeBody', v)} min={12} max={24} unit="px" /></Row>
                  <Row label="Klein"><NumberInput value={tokens.fontSizeSmall} onChange={v => updateToken('fontSizeSmall', v)} min={10} max={18} unit="px" /></Row>
                  <Row label="Zeilenhöhe H"><NumberInput value={tokens.lineHeightHeading} onChange={v => updateToken('lineHeightHeading', v)} min={0.9} max={1.8} step={0.05} /></Row>
                  <Row label="Zeilenhöhe Body"><NumberInput value={tokens.lineHeightBody} onChange={v => updateToken('lineHeightBody', v)} min={1.2} max={2.2} step={0.05} /></Row>
                  <Row label="Letter-Spacing H"><NumberInput value={tokens.letterSpacingHeading} onChange={v => updateToken('letterSpacingHeading', v)} min={-3} max={5} step={0.5} unit="px" /></Row>
                </Section>

                <Section title="Logo">
                  <Row label="Min (Mobile)">
                    <NumberInput value={tokens.logoHeightMin} onChange={v => updateToken('logoHeightMin', v)} min={16} max={60} unit="px" />
                  </Row>
                  <Row label="Ideal (vw)">
                    <NumberInput value={tokens.logoHeightIdeal} onChange={v => updateToken('logoHeightIdeal', v)} min={1} max={10} step={0.5} unit="vw" />
                  </Row>
                  <Row label="Max (Desktop)">
                    <NumberInput value={tokens.logoHeightMax} onChange={v => updateToken('logoHeightMax', v)} min={40} max={200} unit="px" />
                  </Row>
                  <div style={{ fontSize: 10, color: '#64748b', fontFamily: 'monospace', marginTop: '0.25rem' }}>
                    clamp({tokens.logoHeightMin}px, {tokens.logoHeightIdeal}vw, {tokens.logoHeightMax}px)
                  </div>
                </Section>

                <Section title="Rauten (global)">
                  <Row label="Eckenradius">
                    <NumberInput value={tokens.diamondRadius} onChange={v => updateToken('diamondRadius', v)} min={0} max={0.25} step={0.005} />
                  </Row>
                </Section>

                <Section title="Layout">
                  <Row label="Button-Radius"><NumberInput value={tokens.borderRadius} onChange={v => updateToken('borderRadius', v)} min={0} max={32} unit="px" /></Row>
                  <Row label="Section-Padding"><NumberInput value={tokens.sectionPadding} onChange={v => updateToken('sectionPadding', v)} min={20} max={200} unit="px" /></Row>
                  <Row label="Container-Breite"><NumberInput value={tokens.containerMaxWidth} onChange={v => updateToken('containerMaxWidth', v)} min={800} max={2400} step={40} unit="px" /></Row>
                </Section>

                <button onClick={reset} style={{
                  width: '100%', padding: '0.5rem', background: '#f1f5f9',
                  border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer',
                  fontSize: 11, color: '#64748b',
                }}>
                  Auf Standardwerte zurücksetzen
                </button>
              </>
            )}

            {/* ── TAB: Rauten-Positionen ── */}
            {activeTab === 'diamonds' && <DiamondEditor />}

            {/* ── TAB: CSS Export ── */}
            {activeTab === 'export' && (
              <div>
                <div style={{ position: 'relative', background: '#1e293b', borderRadius: 8, padding: '1.25rem', marginBottom: '1rem' }}>
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                    <CopyButton text={cssExport} />
                  </div>
                  <pre style={{ margin: 0, fontSize: 10, color: '#94a3b8', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                    {cssExport}
                  </pre>
                </div>
                <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.6 }}>
                  Kopiere diesen CSS-Block in deine <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>index.css</code>, um die aktuellen Einstellungen dauerhaft zu übernehmen.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Live Preview ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0f172a', overflow: 'hidden' }}>
          <PreviewToolbar
            scale={previewScale}
            onScaleChange={setPreviewScale}
            onRefresh={() => setIframeKey(k => k + 1)}
            previewMode={previewMode}
            onModeChange={setPreviewMode}
          />

          <div style={{
            flex: 1, overflow: 'auto', padding: '1rem',
            display: 'flex', justifyContent: 'center',
            background: 'repeating-conic-gradient(#1e293b 0% 25%, #0f172a 0% 50%) 0 0 / 20px 20px',
          }}>
            <div style={{
              width: previewInternalWidths[previewMode] * (previewScale / 100),
              height: `calc(100% - 2rem)`,
              flexShrink: 0,
              borderRadius: 8,
              overflow: 'hidden',
              boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
              background: '#fff',
              position: 'relative',
            }}>
              <iframe
                key={iframeKey}
                ref={iframeRef}
                src="/"
                onLoad={handleIframeLoad}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: previewInternalWidths[previewMode],
                  height: `${100 / (previewScale / 100)}%`,
                  border: 'none',
                  display: 'block',
                  transform: `scale(${previewScale / 100})`,
                  transformOrigin: 'top left',
                }}
                title="CME Website Preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
