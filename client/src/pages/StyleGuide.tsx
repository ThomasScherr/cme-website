// CME Website – Interactive Style Guide with Responsive Live Preview
// Split layout: Left = controls (breakpoint-aware), Right = live iframe preview
// The breakpoint toggle at the top controls BOTH the preview size AND which token values are shown/edited

import { useState, useRef, useEffect, useCallback } from 'react';
import DiamondImage from '@/components/DiamondImage';
import {
  DiamondId, SectionId, DIAMOND_LABELS, SECTION_LABELS,
  DEFAULT_DIAMOND_CONFIGS, DEFAULT_SECTION_HEIGHTS,
  DesignPreset, usePresets,
  loadTokens, loadDiamondConfigs, loadSectionHeights,
  applyTokensToRoot, applyDiamondConfigsToRoot, applySectionHeightsToRoot,
} from '@/hooks/useDesignTokens';
import {
  Breakpoint, useResponsiveTokens, applyBreakpointToElement,
  getDefaultResponsiveConfig, FullResponsiveConfig, loadResponsiveConfig, saveResponsiveConfig,
} from '@/hooks/useResponsiveTokens';

const DEMO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663373169592/9wChLxyDrQGRm9T7Lg9U7Y/hero_power_electronics-eKZ2diYBiMBnNwog2o4qTT.webp';

// ── Shared UI ─────────────────────────────────────────────────────────────

function SectionHeader({ title, badge }: { title: string; badge?: string }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em',
      color: '#888', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.25rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <span>{title}</span>
      {badge && (
        <span style={{
          fontSize: 9, fontWeight: 600, color: '#2196D3', background: '#e0f2fe',
          padding: '1px 6px', borderRadius: 3, textTransform: 'uppercase',
        }}>{badge}</span>
      )}
    </div>
  );
}

function Section({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <SectionHeader title={title} badge={badge} />
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
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <button onClick={copy} style={{
      fontSize: 11, padding: '3px 10px', background: copied ? '#22c55e' : '#2196D3',
      color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', transition: 'background 0.2s'
    }}>{copied ? 'Kopiert!' : 'Kopieren'}</button>
  );
}

// ── Breakpoint Indicator ──────────────────────────────────────────────────

function BreakpointBadge({ bp }: { bp: Breakpoint }) {
  const labels: Record<Breakpoint, { label: string; color: string; bg: string }> = {
    desktop: { label: 'Desktop (≥1024px)', color: '#059669', bg: '#d1fae5' },
    tablet: { label: 'Tablet (768–1023px)', color: '#d97706', bg: '#fef3c7' },
    mobile: { label: 'Mobile (<768px)', color: '#dc2626', bg: '#fee2e2' },
  };
  const { label, color, bg } = labels[bp];
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, color, background: bg,
      padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.05em',
    }}>{label}</span>
  );
}

// ── Tab navigation ────────────────────────────────────────────────────────

type Tab = 'design' | 'diamonds' | 'sections' | 'presets' | 'export';

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'design', label: 'Design' },
    { id: 'diamonds', label: 'Rauten' },
    { id: 'sections', label: 'Sektionen' },
    { id: 'presets', label: 'Presets' },
    { id: 'export', label: 'Export' },
  ];
  return (
    <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '1rem' }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          padding: '0.5rem 0.65rem', fontSize: 11, fontWeight: active === t.id ? 700 : 400,
          color: active === t.id ? '#2196D3' : '#666',
          background: 'none', border: 'none', borderBottom: active === t.id ? '2px solid #2196D3' : '2px solid transparent',
          marginBottom: -2, cursor: 'pointer', transition: 'all 0.15s',
        }}>{t.label}</button>
      ))}
    </div>
  );
}

// ── Diamond Editor (breakpoint-aware) ─────────────────────────────────────

function DiamondEditor({ bp, config, onUpdate }: {
  bp: Breakpoint;
  config: FullResponsiveConfig;
  onUpdate: (bp: Breakpoint, id: DiamondId, key: string, value: number) => void;
}) {
  const [activeId, setActiveId] = useState<DiamondId>('hero');
  const ids = Object.keys(DIAMOND_LABELS) as DiamondId[];
  const cfg = config[bp].diamonds[activeId];
  const defaults = getDefaultResponsiveConfig()[bp].diamonds;

  return (
    <div>
      <div style={{ marginBottom: '0.75rem' }}><BreakpointBadge bp={bp} /></div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem' }}>
        {ids.map(id => (
          <button key={id} onClick={() => setActiveId(id)} style={{
            textAlign: 'left', padding: '0.4rem 0.65rem', fontSize: 11,
            background: activeId === id ? '#e0f2fe' : '#f8fafc',
            border: `1px solid ${activeId === id ? '#7dd3fc' : '#e2e8f0'}`,
            borderRadius: 5, cursor: 'pointer', color: activeId === id ? '#0369a1' : '#555',
            fontWeight: activeId === id ? 600 : 400,
          }}>{DIAMOND_LABELS[id]}</button>
        ))}
      </div>

      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '0.85rem', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#2196D3', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
          {DIAMOND_LABELS[activeId]}
        </div>
        <Row label="Größe (vw)">
          <NumberInput value={cfg.size} onChange={v => onUpdate(bp, activeId, 'size', v)} min={10} max={120} unit="vw" />
        </Row>
        <Row label="X-Position">
          <NumberInput value={cfg.offsetX} onChange={v => onUpdate(bp, activeId, 'offsetX', v)} min={-80} max={80} unit="vw" />
        </Row>
        <Row label="Y-Position">
          <NumberInput value={cfg.offsetY} onChange={v => onUpdate(bp, activeId, 'offsetY', v)} min={-50} max={50} unit="vh" />
        </Row>
        <Row label="Rotation">
          <NumberInput value={cfg.rotate} onChange={v => onUpdate(bp, activeId, 'rotate', v)} min={-45} max={45} unit="°" />
        </Row>
        <button onClick={() => {
          const def = defaults[activeId];
          onUpdate(bp, activeId, 'size', def.size);
          onUpdate(bp, activeId, 'offsetX', def.offsetX);
          onUpdate(bp, activeId, 'offsetY', def.offsetY);
          onUpdate(bp, activeId, 'rotate', def.rotate);
        }} style={{
          marginTop: '0.5rem', fontSize: 10, padding: '3px 10px',
          background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 4,
          cursor: 'pointer', color: '#64748b',
        }}>Zurücksetzen</button>
      </div>

      <div style={{ background: '#1a1a2e', borderRadius: 8, padding: '1.25rem', display: 'flex', justifyContent: 'center', overflow: 'hidden', position: 'relative', minHeight: 160 }}>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', position: 'absolute', top: 6, left: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vorschau</div>
        <div style={{
          position: 'relative', width: Math.min(cfg.size * 1.5, 160), height: Math.min(cfg.size * 1.5, 160),
          transform: `translate(${cfg.offsetX * 0.3}px, ${cfg.offsetY * 0.5}px)`, transition: 'all 0.2s',
        }}>
          <DiamondImage src={DEMO_IMAGE} alt="Vorschau" size="100%" animate={false} />
        </div>
      </div>
    </div>
  );
}

// ── Section Height Editor (breakpoint-aware) ──────────────────────────────

function SectionHeightEditor({ bp, config, onUpdate }: {
  bp: Breakpoint;
  config: FullResponsiveConfig;
  onUpdate: (bp: Breakpoint, id: SectionId, key: string, value: number) => void;
}) {
  const ids = Object.keys(SECTION_LABELS) as SectionId[];
  const defaults = getDefaultResponsiveConfig()[bp].sectionHeights;

  return (
    <div>
      <div style={{ marginBottom: '0.75rem' }}><BreakpointBadge bp={bp} /></div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Passe die Höhe jeder Sektion für <strong>{bp === 'desktop' ? 'Desktop' : bp === 'tablet' ? 'Tablet' : 'Mobile'}</strong> an. Negative Werte lassen Sektionen überlappen.
      </div>

      {ids.map(id => {
        const cfg = config[bp].sectionHeights[id];
        const def = defaults[id];
        const isModified = cfg.paddingTop !== def.paddingTop || cfg.paddingBottom !== def.paddingBottom;
        return (
          <div key={id} style={{
            background: isModified ? '#fffbeb' : '#f8fafc',
            border: `1px solid ${isModified ? '#fcd34d' : '#e2e8f0'}`,
            borderRadius: 8, padding: '0.75rem', marginBottom: '0.65rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#334155' }}>{SECTION_LABELS[id]}</span>
              {isModified && (
                <button onClick={() => {
                  onUpdate(bp, id, 'paddingTop', def.paddingTop);
                  onUpdate(bp, id, 'paddingBottom', def.paddingBottom);
                }} style={{
                  fontSize: 9, padding: '2px 6px', background: '#fef3c7',
                  border: '1px solid #fcd34d', borderRadius: 3, cursor: 'pointer', color: '#92400e',
                }}>Reset</button>
              )}
            </div>
            <Row label="Oben (pt)">
              <NumberInput value={cfg.paddingTop} onChange={v => onUpdate(bp, id, 'paddingTop', v)} min={-100} max={300} unit="px" />
            </Row>
            <Row label="Unten (pb)">
              <NumberInput value={cfg.paddingBottom} onChange={v => onUpdate(bp, id, 'paddingBottom', v)} min={-100} max={300} unit="px" />
            </Row>
          </div>
        );
      })}
    </div>
  );
}

// ── Preset Manager ────────────────────────────────────────────────────────

function PresetManager({ onApply }: { onApply: () => void }) {
  const { presets, defaultId, create, update, remove, apply, setAsDefault } = usePresets();
  const [showSave, setShowSave] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotif = (msg: string) => { setNotification(msg); setTimeout(() => setNotification(null), 2500); };

  const handleSave = () => {
    if (!presetName.trim()) return;
    create(presetName.trim());
    setPresetName('');
    setShowSave(false);
    showNotif(`Preset "${presetName.trim()}" gespeichert`);
  };

  const handleApply = (preset: DesignPreset) => { apply(preset); onApply(); showNotif(`Preset "${preset.name}" geladen`); };
  const handleUpdate = (preset: DesignPreset) => { update(preset.id); showNotif(`Preset "${preset.name}" aktualisiert`); };
  const handleSetDefault = (id: string) => {
    const isAlready = defaultId === id;
    setAsDefault(isAlready ? null : id);
    const p = presets.find(pp => pp.id === id);
    showNotif(isAlready ? 'Standard entfernt' : `"${p?.name}" als Standard gesetzt`);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
      ' ' + d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      {notification && (
        <div style={{
          background: '#059669', color: '#fff', padding: '0.5rem 0.75rem', borderRadius: 6,
          fontSize: 11, fontWeight: 600, marginBottom: '1rem', textAlign: 'center',
        }}>{notification}</div>
      )}

      <div style={{ fontSize: 11, color: '#64748b', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        Speichere den aktuellen Zustand (alle Breakpoints) als Preset. Setze ein Preset als Standard, damit es beim Seitenaufruf automatisch geladen wird.
      </div>

      {!showSave ? (
        <button onClick={() => setShowSave(true)} style={{
          width: '100%', padding: '0.6rem', background: '#2196D3', color: '#fff',
          border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600, marginBottom: '1.25rem',
        }}>+ Aktuellen Zustand speichern</button>
      ) : (
        <div style={{ background: '#f0f9ff', border: '1px solid #7dd3fc', borderRadius: 8, padding: '0.85rem', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#0369a1', marginBottom: '0.5rem' }}>Neues Preset speichern</div>
          <input type="text" value={presetName} onChange={e => setPresetName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()} placeholder="Name eingeben"
            autoFocus style={{ width: '100%', padding: '0.45rem 0.6rem', fontSize: 12, border: '1px solid #bae6fd', borderRadius: 4, marginBottom: '0.5rem', boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handleSave} disabled={!presetName.trim()} style={{
              flex: 1, padding: '0.4rem', background: presetName.trim() ? '#2196D3' : '#94a3b8',
              color: '#fff', border: 'none', borderRadius: 4, cursor: presetName.trim() ? 'pointer' : 'not-allowed', fontSize: 11, fontWeight: 600,
            }}>Speichern</button>
            <button onClick={() => { setShowSave(false); setPresetName(''); }} style={{
              padding: '0.4rem 0.75rem', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 4, cursor: 'pointer', fontSize: 11, color: '#64748b',
            }}>Abbrechen</button>
          </div>
        </div>
      )}

      {presets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#94a3b8', fontSize: 12, background: '#f8fafc', borderRadius: 8, border: '1px dashed #e2e8f0' }}>
          Noch keine Presets gespeichert.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {presets.map(preset => {
            const isDefault = defaultId === preset.id;
            const isDeleting = confirmDelete === preset.id;
            return (
              <div key={preset.id} style={{
                background: isDefault ? '#f0fdf4' : '#f8fafc',
                border: `1px solid ${isDefault ? '#86efac' : '#e2e8f0'}`,
                borderRadius: 8, padding: '0.75rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{preset.name}</span>
                    {isDefault && (
                      <span style={{ fontSize: 9, fontWeight: 700, color: '#059669', background: '#d1fae5', padding: '1px 6px', borderRadius: 3, textTransform: 'uppercase' }}>Standard</span>
                    )}
                  </div>
                  <span style={{ fontSize: 9, color: '#94a3b8', fontFamily: 'monospace' }}>{formatDate(preset.createdAt)}</span>
                </div>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '0.5rem' }}>
                  {[preset.tokens.colorPrimary, preset.tokens.colorDark, preset.tokens.colorGray, preset.tokens.colorAccent, preset.tokens.colorBg].map((c, i) => (
                    <div key={i} style={{ width: 18, height: 12, borderRadius: 2, background: c, border: '1px solid rgba(0,0,0,0.1)' }} />
                  ))}
                </div>
                {isDeleting ? (
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: '#dc2626', fontWeight: 600 }}>Wirklich löschen?</span>
                    <button onClick={() => { remove(preset.id); setConfirmDelete(null); showNotif(`"${preset.name}" gelöscht`); }} style={{
                      padding: '2px 8px', fontSize: 10, background: '#dc2626', color: '#fff', border: 'none', borderRadius: 3, cursor: 'pointer',
                    }}>Ja</button>
                    <button onClick={() => setConfirmDelete(null)} style={{
                      padding: '2px 8px', fontSize: 10, background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 3, cursor: 'pointer', color: '#64748b',
                    }}>Nein</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    <button onClick={() => handleApply(preset)} style={{ padding: '3px 10px', fontSize: 10, background: '#2196D3', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600 }}>Laden</button>
                    <button onClick={() => handleUpdate(preset)} style={{ padding: '3px 10px', fontSize: 10, background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 4, cursor: 'pointer', color: '#64748b' }}>Überschreiben</button>
                    <button onClick={() => handleSetDefault(preset.id)} style={{
                      padding: '3px 10px', fontSize: 10, background: isDefault ? '#d1fae5' : '#f1f5f9',
                      border: `1px solid ${isDefault ? '#86efac' : '#e2e8f0'}`, borderRadius: 4, cursor: 'pointer',
                      color: isDefault ? '#059669' : '#64748b', fontWeight: isDefault ? 600 : 400,
                    }}>{isDefault ? 'Standard ✓' : 'Als Standard'}</button>
                    <button onClick={() => setConfirmDelete(preset.id)} style={{
                      padding: '3px 10px', fontSize: 10, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 4, cursor: 'pointer', color: '#dc2626',
                    }}>Löschen</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {presets.length > 0 && (
        <div style={{ marginTop: '1rem', fontSize: 10, color: '#94a3b8', lineHeight: 1.6, background: '#f8fafc', padding: '0.65rem', borderRadius: 6, border: '1px solid #e2e8f0' }}>
          <strong>Tipp:</strong> Setze ein Preset als "Standard", damit es beim nächsten Seitenaufruf automatisch geladen wird.
        </div>
      )}
    </div>
  );
}

// ── Preview Controls ──────────────────────────────────────────────────────

function PreviewToolbar({ scale, onScaleChange, onRefresh, previewMode, onModeChange }: {
  scale: number; onScaleChange: (s: number) => void; onRefresh: () => void;
  previewMode: Breakpoint; onModeChange: (m: Breakpoint) => void;
}) {
  const modes: { id: Breakpoint; label: string; icon: string }[] = [
    { id: 'desktop', label: 'Desktop', icon: '🖥' },
    { id: 'tablet', label: 'Tablet', icon: '📱' },
    { id: 'mobile', label: 'Mobile', icon: '📲' },
  ];

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.5rem 1rem', background: '#1e293b', borderBottom: '1px solid #334155',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {modes.map(m => (
          <button key={m.id} onClick={() => onModeChange(m.id)} style={{
            padding: '0.3rem 0.6rem', fontSize: 11, border: 'none', borderRadius: 4,
            background: previewMode === m.id ? '#2196D3' : '#334155',
            color: previewMode === m.id ? '#fff' : '#94a3b8',
            cursor: 'pointer', transition: 'all 0.15s',
          }}>{m.icon} {m.label}</button>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: 10, color: '#64748b' }}>Zoom</span>
          <input type="range" min={25} max={100} value={scale} onChange={e => onScaleChange(Number(e.target.value))}
            style={{ width: 80, accentColor: '#2196D3' }} />
          <span style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace', minWidth: 32 }}>{scale}%</span>
        </div>
        <button onClick={onRefresh} style={{
          padding: '0.3rem 0.6rem', fontSize: 11, border: 'none', borderRadius: 4,
          background: '#334155', color: '#94a3b8', cursor: 'pointer',
        }}>↻ Neu laden</button>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────

export default function StyleGuide() {
  const {
    config, activeBreakpoint, setActiveBreakpoint,
    updateTokenForBreakpoint, updateDiamondForBreakpoint,
    updateSectionHeightForBreakpoint, resetBreakpoint, resetAll,
  } = useResponsiveTokens();

  const [activeTab, setActiveTab] = useState<Tab>('design');
  const [previewMode, setPreviewMode] = useState<Breakpoint>('desktop');
  const [previewScale, setPreviewScale] = useState(65);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeKey, setIframeKey] = useState(0);

  // Sync breakpoint toggle: when preview mode changes, also switch the active breakpoint for controls
  const handleModeChange = useCallback((mode: Breakpoint) => {
    setPreviewMode(mode);
    setActiveBreakpoint(mode);
  }, [setActiveBreakpoint]);

  const handlePresetApply = useCallback(() => { setIframeKey(k => k + 1); }, []);

  // Current breakpoint's tokens for the controls
  const bp = activeBreakpoint;
  const bpTokens = config[bp].tokens;

  // Push CSS variables to the iframe for the active breakpoint
  const pushToIframe = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument?.documentElement) return;
    const el = iframe.contentDocument.documentElement;
    applyBreakpointToElement(el, config, previewMode);
  }, [config, previewMode]);

  useEffect(() => { pushToIframe(); }, [config, previewMode, pushToIframe]);

  const handleIframeLoad = useCallback(() => {
    setTimeout(() => pushToIframe(), 200);
    setTimeout(() => pushToIframe(), 600);
  }, [pushToIframe]);

  // Diamond update handler
  const handleDiamondUpdate = useCallback((bpArg: Breakpoint, id: DiamondId, key: string, value: number) => {
    updateDiamondForBreakpoint(bpArg, id, key as any, value);
  }, [updateDiamondForBreakpoint]);

  // Section height update handler
  const handleSectionUpdate = useCallback((bpArg: Breakpoint, id: SectionId, key: string, value: number) => {
    updateSectionHeightForBreakpoint(bpArg, id, key as any, value);
  }, [updateSectionHeightForBreakpoint]);

  // Preview widths
  const previewInternalWidths: Record<Breakpoint, number> = { desktop: 1440, tablet: 768, mobile: 375 };

  // CSS Export (all breakpoints)
  const cssExport = `/* CME Design Tokens – generiert vom Style Guide */
/* Desktop (≥1024px) */
:root {
  --cme-color-primary: ${config.desktop.tokens.colorPrimary};
  --cme-color-dark: ${config.desktop.tokens.colorDark};
  --cme-color-gray: ${config.desktop.tokens.colorGray};
  --cme-color-accent: ${config.desktop.tokens.colorAccent};
  --cme-color-bg: ${config.desktop.tokens.colorBg};
  --cme-font-family: '${config.desktop.tokens.fontFamily}', sans-serif;
  --cme-font-size-h1: ${config.desktop.tokens.fontSizeH1}px;
  --cme-font-size-h2: ${config.desktop.tokens.fontSizeH2}px;
  --cme-font-size-h3: ${config.desktop.tokens.fontSizeH3}px;
  --cme-font-size-h4: ${config.desktop.tokens.fontSizeH4}px;
  --cme-font-size-body: ${config.desktop.tokens.fontSizeBody}px;
  --cme-font-size-small: ${config.desktop.tokens.fontSizeSmall}px;
}

/* Tablet (768–1023px) */
@media (max-width: 1023px) {
  :root {
    --cme-font-size-h1: ${config.tablet.tokens.fontSizeH1}px;
    --cme-font-size-h2: ${config.tablet.tokens.fontSizeH2}px;
    --cme-font-size-h3: ${config.tablet.tokens.fontSizeH3}px;
    --cme-font-size-h4: ${config.tablet.tokens.fontSizeH4}px;
    --cme-font-size-body: ${config.tablet.tokens.fontSizeBody}px;
  }
}

/* Mobile (<768px) */
@media (max-width: 767px) {
  :root {
    --cme-font-size-h1: ${config.mobile.tokens.fontSizeH1}px;
    --cme-font-size-h2: ${config.mobile.tokens.fontSizeH2}px;
    --cme-font-size-h3: ${config.mobile.tokens.fontSizeH3}px;
    --cme-font-size-h4: ${config.mobile.tokens.fontSizeH4}px;
    --cme-font-size-body: ${config.mobile.tokens.fontSizeBody}px;
  }
}`;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Roboto, sans-serif', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        background: '#0f172a', color: '#fff', padding: '0.6rem 1.25rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2196D3', boxShadow: '0 0 8px rgba(33,150,211,0.5)' }} />
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em' }}>CME Style Guide</span>
          <span style={{ fontSize: 10, color: '#64748b', marginLeft: '0.25rem' }}>Responsive</span>
        </div>
        <a href="/" style={{ color: '#64748b', fontSize: 11, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <span style={{ fontSize: 14 }}>←</span> Zurück zur Website
        </a>
      </div>

      {/* Main Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* LEFT: Controls */}
        <div style={{
          width: 360, minWidth: 360, flexShrink: 0,
          background: '#fff', borderRight: '1px solid #e2e8f0',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <div style={{ padding: '0.75rem 1.25rem 0', flexShrink: 0 }}>
            <TabBar active={activeTab} onChange={setActiveTab} />
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem 1.25rem' }}>

            {/* TAB: Design Tokens */}
            {activeTab === 'design' && (
              <>
                <div style={{ marginBottom: '1rem' }}><BreakpointBadge bp={bp} /></div>

                <Section title="Farben">
                  <Row label="Primärfarbe"><ColorInput value={bpTokens.colorPrimary} onChange={v => updateTokenForBreakpoint(bp, 'colorPrimary', v)} /></Row>
                  <Row label="Dunkel (Headlines)"><ColorInput value={bpTokens.colorDark} onChange={v => updateTokenForBreakpoint(bp, 'colorDark', v)} /></Row>
                  <Row label="Grau (Fließtext)"><ColorInput value={bpTokens.colorGray} onChange={v => updateTokenForBreakpoint(bp, 'colorGray', v)} /></Row>
                  <Row label="Akzent"><ColorInput value={bpTokens.colorAccent} onChange={v => updateTokenForBreakpoint(bp, 'colorAccent', v)} /></Row>
                  <Row label="Hintergrund"><ColorInput value={bpTokens.colorBg} onChange={v => updateTokenForBreakpoint(bp, 'colorBg', v)} /></Row>
                </Section>

                <Section title="Typografie" badge={bp.toUpperCase()}>
                  <Row label="Font">
                    <SelectInput value={bpTokens.fontFamily} onChange={v => updateTokenForBreakpoint(bp, 'fontFamily', v)}
                      options={['Roboto', 'Inter', 'Open Sans', 'Source Sans Pro', 'Lato', 'Nunito', 'DM Sans', 'IBM Plex Sans']} />
                  </Row>
                  <Row label="Gewicht H">
                    <SelectInput value={String(bpTokens.fontWeightHeading)} onChange={v => updateTokenForBreakpoint(bp, 'fontWeightHeading', Number(v))}
                      options={['300', '400', '500', '600', '700', '800', '900']} />
                  </Row>
                  <Row label="Gewicht Body">
                    <SelectInput value={String(bpTokens.fontWeightBody)} onChange={v => updateTokenForBreakpoint(bp, 'fontWeightBody', Number(v))}
                      options={['300', '400', '500']} />
                  </Row>
                  <Row label="H1"><NumberInput value={bpTokens.fontSizeH1} onChange={v => updateTokenForBreakpoint(bp, 'fontSizeH1', v)} min={16} max={120} unit="px" /></Row>
                  <Row label="H2"><NumberInput value={bpTokens.fontSizeH2} onChange={v => updateTokenForBreakpoint(bp, 'fontSizeH2', v)} min={14} max={80} unit="px" /></Row>
                  <Row label="H3"><NumberInput value={bpTokens.fontSizeH3} onChange={v => updateTokenForBreakpoint(bp, 'fontSizeH3', v)} min={12} max={56} unit="px" /></Row>
                  <Row label="H4"><NumberInput value={bpTokens.fontSizeH4} onChange={v => updateTokenForBreakpoint(bp, 'fontSizeH4', v)} min={10} max={40} unit="px" /></Row>
                  <Row label="Body"><NumberInput value={bpTokens.fontSizeBody} onChange={v => updateTokenForBreakpoint(bp, 'fontSizeBody', v)} min={10} max={24} unit="px" /></Row>
                  <Row label="Klein"><NumberInput value={bpTokens.fontSizeSmall} onChange={v => updateTokenForBreakpoint(bp, 'fontSizeSmall', v)} min={8} max={18} unit="px" /></Row>
                  <Row label="Zeilenhöhe H"><NumberInput value={bpTokens.lineHeightHeading} onChange={v => updateTokenForBreakpoint(bp, 'lineHeightHeading', v)} min={0.9} max={1.8} step={0.05} /></Row>
                  <Row label="Zeilenhöhe Body"><NumberInput value={bpTokens.lineHeightBody} onChange={v => updateTokenForBreakpoint(bp, 'lineHeightBody', v)} min={1.2} max={2.2} step={0.05} /></Row>
                  <Row label="Letter-Spacing H"><NumberInput value={bpTokens.letterSpacingHeading} onChange={v => updateTokenForBreakpoint(bp, 'letterSpacingHeading', v)} min={-3} max={5} step={0.5} unit="px" /></Row>
                </Section>

                <Section title="Logo-Höhe" badge={bp.toUpperCase()}>
                  {bp === 'desktop' && (
                    <Row label="Desktop">
                      <NumberInput value={bpTokens.logoHeightDesktop} onChange={v => updateTokenForBreakpoint(bp, 'logoHeightDesktop', v)} min={16} max={200} unit="px" />
                    </Row>
                  )}
                  {bp === 'tablet' && (
                    <Row label="Tablet">
                      <NumberInput value={bpTokens.logoHeightTablet} onChange={v => updateTokenForBreakpoint(bp, 'logoHeightTablet', v)} min={16} max={200} unit="px" />
                    </Row>
                  )}
                  {bp === 'mobile' && (
                    <Row label="Mobile">
                      <NumberInput value={bpTokens.logoHeightMobile} onChange={v => updateTokenForBreakpoint(bp, 'logoHeightMobile', v)} min={16} max={200} unit="px" />
                    </Row>
                  )}
                </Section>

                <Section title="Rauten (global)" badge={bp.toUpperCase()}>
                  <Row label="Eckenradius">
                    <NumberInput value={bpTokens.diamondRadius} onChange={v => updateTokenForBreakpoint(bp, 'diamondRadius', v)} min={0} max={0.25} step={0.005} />
                  </Row>
                </Section>

                <Section title="Layout" badge={bp.toUpperCase()}>
                  <Row label="Button-Radius"><NumberInput value={bpTokens.borderRadius} onChange={v => updateTokenForBreakpoint(bp, 'borderRadius', v)} min={0} max={32} unit="px" /></Row>
                  <Row label="Section-Padding"><NumberInput value={bpTokens.sectionPadding} onChange={v => updateTokenForBreakpoint(bp, 'sectionPadding', v)} min={20} max={200} unit="px" /></Row>
                  <Row label="Container-Breite"><NumberInput value={bpTokens.containerMaxWidth} onChange={v => updateTokenForBreakpoint(bp, 'containerMaxWidth', v)} min={320} max={2400} step={40} unit="px" /></Row>
                </Section>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => resetBreakpoint(bp)} style={{
                    flex: 1, padding: '0.5rem', background: '#fef3c7', border: '1px solid #fcd34d',
                    borderRadius: 6, cursor: 'pointer', fontSize: 11, color: '#92400e',
                  }}>
                    {bp === 'desktop' ? 'Desktop' : bp === 'tablet' ? 'Tablet' : 'Mobile'} zurücksetzen
                  </button>
                  <button onClick={resetAll} style={{
                    flex: 1, padding: '0.5rem', background: '#f1f5f9', border: '1px solid #e2e8f0',
                    borderRadius: 6, cursor: 'pointer', fontSize: 11, color: '#64748b',
                  }}>Alles zurücksetzen</button>
                </div>
              </>
            )}

            {/* TAB: Rauten */}
            {activeTab === 'diamonds' && (
              <DiamondEditor bp={bp} config={config} onUpdate={handleDiamondUpdate} />
            )}

            {/* TAB: Sektionshöhen */}
            {activeTab === 'sections' && (
              <SectionHeightEditor bp={bp} config={config} onUpdate={handleSectionUpdate} />
            )}

            {/* TAB: Presets */}
            {activeTab === 'presets' && <PresetManager onApply={handlePresetApply} />}

            {/* TAB: CSS Export */}
            {activeTab === 'export' && (
              <div>
                <div style={{ position: 'relative', background: '#1e293b', borderRadius: 8, padding: '1.25rem', marginBottom: '1rem' }}>
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}><CopyButton text={cssExport} /></div>
                  <pre style={{ margin: 0, fontSize: 10, color: '#94a3b8', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{cssExport}</pre>
                </div>
                <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.6 }}>
                  Dieser Export enthält die Werte für alle drei Breakpoints (Desktop, Tablet, Mobile).
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Live Preview */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0f172a', overflow: 'hidden' }}>
          <PreviewToolbar
            scale={previewScale} onScaleChange={setPreviewScale}
            onRefresh={() => setIframeKey(k => k + 1)}
            previewMode={previewMode} onModeChange={handleModeChange}
          />
          <div style={{
            flex: 1, overflow: 'auto', padding: '1rem', display: 'flex', justifyContent: 'center',
            background: 'repeating-conic-gradient(#1e293b 0% 25%, #0f172a 0% 50%) 0 0 / 20px 20px',
          }}>
            <div style={{
              width: previewInternalWidths[previewMode] * (previewScale / 100),
              height: `calc(100% - 2rem)`, flexShrink: 0, borderRadius: 8, overflow: 'hidden',
              boxShadow: '0 4px 40px rgba(0,0,0,0.4)', background: '#fff', position: 'relative',
            }}>
              <iframe key={iframeKey} ref={iframeRef} src="/" onLoad={handleIframeLoad}
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: previewInternalWidths[previewMode],
                  height: `${100 / (previewScale / 100)}%`,
                  border: 'none', display: 'block',
                  transform: `scale(${previewScale / 100})`, transformOrigin: 'top left',
                }}
                title="CME Website Preview" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
