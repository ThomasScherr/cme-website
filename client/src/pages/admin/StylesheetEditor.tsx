import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { getLoginUrl } from '@/const';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { Loader2, Save, RotateCcw, Plus, Trash2, Download, Upload, Eye, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DEFAULT_STYLE_TOKENS, clampToPx, tokensToCSSVars } from '@shared/styleDefaults';
import type { StyleTokens, ClampValue, SectionColor } from '@shared/styleDefaults';
import Layout from '@/components/Layout';

// ── Clamp Slider Component ──────────────────────────────────────

interface ClampEditorProps {
  label: string;
  description?: string;
  value: ClampValue;
  onChange: (v: ClampValue) => void;
  unit?: string;
  /** Show preview at these viewport widths */
  previewWidths?: number[];
}

function ClampEditor({ label, description, value, onChange, unit = 'rem', previewWidths = [375, 768, 1920, 3840] }: ClampEditorProps) {
  const [expanded, setExpanded] = useState(false);

  const previewValues = useMemo(() =>
    previewWidths.map(vp => ({ vp, px: clampToPx(value, vp) })),
    [value, previewWidths]
  );

  return (
    <div className="border border-gray-200 rounded-lg p-3 mb-2 bg-white">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex-1">
          <div className="font-medium text-sm text-gray-900">{label}</div>
          {description && <div className="text-xs text-gray-500">{description}</div>}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 text-xs text-gray-400">
            {previewValues.map(({ vp, px }) => (
              <span key={vp} className="bg-gray-50 px-1.5 py-0.5 rounded" title={`${vp}px viewport`}>
                {Math.round(px)}px
              </span>
            ))}
          </div>
          {expanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
        </div>
      </div>

      {expanded && (
        <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Min ({unit})</label>
            <Input
              type="number"
              step="0.0625"
              value={value.min}
              onChange={e => onChange({ ...value, min: parseFloat(e.target.value) || 0 })}
              className="h-8 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">vw-Koeffizient</label>
            <Input
              type="number"
              step="0.05"
              value={value.vw}
              onChange={e => onChange({ ...value, vw: parseFloat(e.target.value) || 0 })}
              className="h-8 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Offset ({unit})</label>
            <Input
              type="number"
              step="0.05"
              value={value.offset}
              onChange={e => onChange({ ...value, offset: parseFloat(e.target.value) || 0 })}
              className="h-8 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Max ({unit})</label>
            <Input
              type="number"
              step="0.0625"
              value={value.max}
              onChange={e => onChange({ ...value, max: parseFloat(e.target.value) || 0 })}
              className="h-8 text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Color Editor Component ──────────────────────────────────────

interface ColorEditorProps {
  section: SectionColor;
  onChange: (s: SectionColor) => void;
}

function ColorEditor({ section, onChange }: ColorEditorProps) {
  return (
    <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 bg-white">
      <div className="flex-1">
        <div className="font-medium text-sm text-gray-900">{section.label}</div>
        <div className="text-xs text-gray-500">ID: {section.id}</div>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <label className="text-xs text-gray-500 block mb-0.5">Hintergrund</label>
          <div className="flex items-center gap-1">
            <input
              type="color"
              value={section.bg}
              onChange={e => onChange({ ...section, bg: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer border border-gray-200"
            />
            <Input
              value={section.bg}
              onChange={e => onChange({ ...section, bg: e.target.value })}
              className="h-8 text-xs w-24"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-0.5">Text</label>
          <div className="flex items-center gap-1">
            <input
              type="color"
              value={section.text}
              onChange={e => onChange({ ...section, text: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer border border-gray-200"
            />
            <Input
              value={section.text}
              onChange={e => onChange({ ...section, text: e.target.value })}
              className="h-8 text-xs w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Preview Bar ─────────────────────────────────────────────────

function PreviewBar({ tokens }: { tokens: StyleTokens }) {
  const [viewportWidth, setViewportWidth] = useState(1920);
  const viewports = [
    { label: 'Mobile', w: 375 },
    { label: 'Tablet', w: 768 },
    { label: 'Desktop', w: 1440 },
    { label: 'Full HD', w: 1920 },
    { label: 'QHD', w: 2560 },
    { label: '4K', w: 3840 },
  ];

  const previewData = useMemo(() => ({
    h1: clampToPx(tokens.fsH1, viewportWidth),
    h2: clampToPx(tokens.fsH2, viewportWidth),
    body: clampToPx(tokens.fsBody, viewportWidth),
    nav: clampToPx(tokens.fsNav, viewportWidth),
    logo: clampToPx(tokens.navLogo, viewportWidth),
    navH: clampToPx(tokens.navHeight, viewportWidth),
    small: clampToPx(tokens.fsSmall, viewportWidth),
  }), [tokens, viewportWidth]);

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Eye className="w-4 h-4" /> Live-Vorschau
        </CardTitle>
        <div className="flex flex-wrap gap-1 mt-2">
          {viewports.map(vp => (
            <button
              key={vp.w}
              onClick={() => setViewportWidth(vp.w)}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                viewportWidth === vp.w
                  ? 'bg-cme-blue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {vp.label} ({vp.w}px)
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Nav Preview */}
        <div
          className="bg-white border border-gray-200 rounded-lg flex items-center px-3 overflow-hidden"
          style={{ height: `${Math.min(previewData.navH, 60)}px` }}
        >
          <div
            className="bg-gray-200 rounded"
            style={{ height: `${Math.min(previewData.logo, 40)}px`, width: `${Math.min(previewData.logo * 3, 120)}px` }}
          />
          <div className="flex gap-2 ml-auto">
            {['Menü 1', 'Menü 2', 'Menü 3'].map(item => (
              <span key={item} style={{ fontSize: `${Math.min(previewData.nav, 16)}px` }} className="text-gray-600">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Typography Preview */}
        <div className="space-y-1 p-3 bg-gray-50 rounded-lg">
          <div style={{ fontSize: `${Math.min(previewData.h1, 40)}px`, lineHeight: 1.1 }} className="font-bold text-gray-900 truncate">
            Überschrift H1
          </div>
          <div style={{ fontSize: `${Math.min(previewData.h2, 28)}px`, lineHeight: 1.2 }} className="font-bold text-gray-700 truncate">
            Überschrift H2
          </div>
          <div style={{ fontSize: `${Math.min(previewData.body, 16)}px`, lineHeight: 1.6 }} className="text-gray-600">
            Body-Text: Entwicklung und Fertigung elektronischer Produkte.
          </div>
          <div style={{ fontSize: `${Math.min(previewData.small, 13)}px`, lineHeight: 1.5 }} className="text-gray-400">
            Small-Text: ISO 9001 zertifiziert
          </div>
        </div>

        {/* Computed Values Table */}
        <div className="text-xs">
          <div className="font-medium text-gray-700 mb-1">Berechnete Werte bei {viewportWidth}px:</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-gray-500">
            <span>H1: {Math.round(previewData.h1)}px</span>
            <span>H2: {Math.round(previewData.h2)}px</span>
            <span>Body: {Math.round(previewData.body)}px</span>
            <span>Nav: {Math.round(previewData.nav)}px</span>
            <span>Logo: {Math.round(previewData.logo)}px</span>
            <span>Nav-Höhe: {Math.round(previewData.navH)}px</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main Editor Component ───────────────────────────────────────

export default function StylesheetEditor() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const utils = trpc.useUtils();

  // Fetch current styles from DB
  const { data: savedStyles, isLoading: stylesLoading } = trpc.siteStyles.get.useQuery();
  const { data: presets } = trpc.stylePresets.list.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });

  // Mutations
  const updateStyles = trpc.siteStyles.update.useMutation({
    onSuccess: () => {
      utils.siteStyles.get.invalidate();
      toast.success('Styles gespeichert und live angewendet!');
    },
    onError: (err) => toast.error(`Fehler: ${err.message}`),
  });

  const createPreset = trpc.stylePresets.create.useMutation({
    onSuccess: () => {
      utils.stylePresets.list.invalidate();
      toast.success('Preset gespeichert!');
      setPresetName('');
    },
    onError: (err) => toast.error(`Fehler: ${err.message}`),
  });

  const deletePreset = trpc.stylePresets.delete.useMutation({
    onSuccess: () => {
      utils.stylePresets.list.invalidate();
      toast.success('Preset gelöscht');
    },
  });

  // Local state
  const [tokens, setTokens] = useState<StyleTokens>(DEFAULT_STYLE_TOKENS);
  const [presetName, setPresetName] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  // Load saved styles from DB
  useEffect(() => {
    if (savedStyles?.styles) {
      try {
        const parsed = JSON.parse(savedStyles.styles) as StyleTokens;
        setTokens(parsed);
      } catch {
        setTokens(DEFAULT_STYLE_TOKENS);
      }
    }
  }, [savedStyles]);

  // Track changes
  const updateToken = useCallback(<K extends keyof StyleTokens>(key: K, value: StyleTokens[K]) => {
    setTokens(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
    // Apply live to the page
    if (typeof value === 'object' && 'min' in (value as ClampValue)) {
      const cssVars = tokensToCSSVars({ ...tokens, [key]: value });
      Object.entries(cssVars).forEach(([prop, val]) => {
        document.documentElement.style.setProperty(prop, val);
      });
    }
  }, [tokens]);

  const updateSectionColor = useCallback((index: number, section: SectionColor) => {
    setTokens(prev => {
      const newColors = [...prev.sectionColors];
      newColors[index] = section;
      return { ...prev, sectionColors: newColors };
    });
    setHasChanges(true);
  }, []);

  // Save to DB
  const handleSave = () => {
    updateStyles.mutate({ styles: JSON.stringify(tokens) });
    setHasChanges(false);
  };

  // Reset to defaults
  const handleReset = () => {
    setTokens(DEFAULT_STYLE_TOKENS);
    setHasChanges(true);
    // Apply defaults live
    const cssVars = tokensToCSSVars(DEFAULT_STYLE_TOKENS);
    Object.entries(cssVars).forEach(([prop, val]) => {
      document.documentElement.style.setProperty(prop, val);
    });
    toast.info('Auf Standardwerte zurückgesetzt (noch nicht gespeichert)');
  };

  // Save as preset
  const handleSavePreset = () => {
    if (!presetName.trim()) {
      toast.error('Bitte einen Preset-Namen eingeben');
      return;
    }
    createPreset.mutate({
      name: presetName.trim(),
      styles: JSON.stringify(tokens),
    });
  };

  // Load preset
  const handleLoadPreset = (stylesJson: string) => {
    try {
      const parsed = JSON.parse(stylesJson) as StyleTokens;
      setTokens(parsed);
      setHasChanges(true);
      // Apply live
      const cssVars = tokensToCSSVars(parsed);
      Object.entries(cssVars).forEach(([prop, val]) => {
        document.documentElement.style.setProperty(prop, val);
      });
      toast.info('Preset geladen (noch nicht gespeichert)');
    } catch {
      toast.error('Preset konnte nicht geladen werden');
    }
  };

  // Export/Import
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(tokens, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cme-styles-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result as string) as StyleTokens;
          setTokens(parsed);
          setHasChanges(true);
          const cssVars = tokensToCSSVars(parsed);
          Object.entries(cssVars).forEach(([prop, val]) => {
            document.documentElement.style.setProperty(prop, val);
          });
          toast.success('Styles importiert (noch nicht gespeichert)');
        } catch {
          toast.error('Ungültige JSON-Datei');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  // Auth guard
  if (authLoading || stylesLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-cme-blue" />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (user?.role !== 'admin') {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Zugriff verweigert</h1>
            <p className="text-gray-500">Diese Seite ist nur für Administratoren zugänglich.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-[1800px] mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Stylesheet Editor</h1>
              <p className="text-xs text-gray-500">CSS-Variablen, Schriftgrößen, Farben und Abstände steuern</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleImport}>
                <Upload className="w-3.5 h-3.5 mr-1" /> Import
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-3.5 h-3.5 mr-1" /> Export
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Zurücksetzen
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!hasChanges || updateStyles.isPending}
                className="bg-cme-blue hover:bg-cme-blue/90"
              >
                {updateStyles.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5 mr-1" />
                )}
                Speichern
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1800px] mx-auto px-4 py-6">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-6">
            {/* Editor Panel */}
            <div>
              <Tabs defaultValue="typography">
                <TabsList className="mb-4 bg-white border border-gray-200">
                  <TabsTrigger value="typography">Typografie</TabsTrigger>
                  <TabsTrigger value="navigation">Navigation</TabsTrigger>
                  <TabsTrigger value="hero">Hero</TabsTrigger>
                  <TabsTrigger value="spacing">Abstände</TabsTrigger>
                  <TabsTrigger value="components">Komponenten</TabsTrigger>
                  <TabsTrigger value="colors">Farben</TabsTrigger>
                  <TabsTrigger value="presets">Presets</TabsTrigger>
                </TabsList>

                {/* ── Typography Tab ── */}
                <TabsContent value="typography">
                  <Card>
                    <CardHeader>
                      <CardTitle>Typografie</CardTitle>
                      <CardDescription>
                        Schriftgrößen für alle Textelemente. Jeder Wert ist ein <code>clamp(min, offset + vw, max)</code> – 
                        die Schrift skaliert fluid zwischen den Grenzen.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <ClampEditor label="H1 – Hauptüberschrift" description="Hero-Titel, Seitenüberschriften" value={tokens.fsH1} onChange={v => updateToken('fsH1', v)} />
                      <ClampEditor label="H2 – Sektionsüberschrift" description="Sektions-Titel auf der Startseite" value={tokens.fsH2} onChange={v => updateToken('fsH2', v)} />
                      <ClampEditor label="H3 – Unterüberschrift" description="Card-Titel, Service-Überschriften" value={tokens.fsH3} onChange={v => updateToken('fsH3', v)} />
                      <ClampEditor label="H4 – Kleine Überschrift" description="USP-Titel, Prozess-Schritte" value={tokens.fsH4} onChange={v => updateToken('fsH4', v)} />
                      <ClampEditor label="Body Large" description="Einleitungstexte, Hervorhebungen" value={tokens.fsBodyLg} onChange={v => updateToken('fsBodyLg', v)} />
                      <ClampEditor label="Body" description="Fließtext, Absätze" value={tokens.fsBody} onChange={v => updateToken('fsBody', v)} />
                      <ClampEditor label="Small" description="Bildunterschriften, Hinweise" value={tokens.fsSmall} onChange={v => updateToken('fsSmall', v)} />
                      <ClampEditor label="XS – Labels" description="Tags, Badges, Metadaten" value={tokens.fsXs} onChange={v => updateToken('fsXs', v)} />
                      <ClampEditor label="Navigation" description="Menüpunkte in der Hauptnavigation" value={tokens.fsNav} onChange={v => updateToken('fsNav', v)} />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* ── Navigation Tab ── */}
                <TabsContent value="navigation">
                  <Card>
                    <CardHeader>
                      <CardTitle>Navigation</CardTitle>
                      <CardDescription>
                        Logo-Größe und Navigationsleisten-Höhe. Das Logo skaliert proportional mit der Auflösung.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <ClampEditor label="Logo-Höhe" description="Höhe des Logos in der Navigation" value={tokens.navLogo} onChange={v => updateToken('navLogo', v)} />
                      <ClampEditor label="Navigationsleisten-Höhe" description="Gesamthöhe der Navigationsleiste" value={tokens.navHeight} onChange={v => updateToken('navHeight', v)} />
                      <ClampEditor label="Menü-Schriftgröße" description="Schriftgröße der Menüpunkte" value={tokens.fsNav} onChange={v => updateToken('fsNav', v)} />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* ── Hero Tab ── */}
                <TabsContent value="hero">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hero-Sektion</CardTitle>
                      <CardDescription>
                        Größe der Rauten-Elemente und des Bildbereichs im Hero.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <ClampEditor label="Diamond-Wrapper Breite" description="Gesamtbreite des Rauten-Containers" value={tokens.heroDiamondW} onChange={v => updateToken('heroDiamondW', v)} />
                      <ClampEditor label="Diamond-Wrapper Höhe" description="Gesamthöhe des Rauten-Containers" value={tokens.heroDiamondH} onChange={v => updateToken('heroDiamondH', v)} />
                      <ClampEditor label="Akzent-Raute" description="Größe der halbtransparenten Akzent-Raute" value={tokens.heroAccentDiamond} onChange={v => updateToken('heroAccentDiamond', v)} />
                      <ClampEditor label="Bild-Raute" description="Größe der Raute mit dem Hauptbild" value={tokens.heroImageDiamond} onChange={v => updateToken('heroImageDiamond', v)} />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* ── Spacing Tab ── */}
                <TabsContent value="spacing">
                  <Card>
                    <CardHeader>
                      <CardTitle>Abstände</CardTitle>
                      <CardDescription>
                        Vertikale Sektions-Abstände und Element-Gaps.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <ClampEditor label="Section Padding" description="Vertikaler Abstand oben/unten pro Sektion" value={tokens.spaceSection} onChange={v => updateToken('spaceSection', v)} />
                      <ClampEditor label="Section Padding (klein)" description="Kleinerer Sektions-Abstand (z.B. Stats)" value={tokens.spaceSectionSm} onChange={v => updateToken('spaceSectionSm', v)} />
                      <ClampEditor label="Section Header Margin" description="Abstand unter Sektions-Überschriften" value={tokens.spaceSectionHeader} onChange={v => updateToken('spaceSectionHeader', v)} />
                      <ClampEditor label="Gap Large" description="Großer Abstand zwischen Elementen" value={tokens.spaceGapLg} onChange={v => updateToken('spaceGapLg', v)} />
                      <ClampEditor label="Gap Medium" description="Mittlerer Abstand" value={tokens.spaceGapMd} onChange={v => updateToken('spaceGapMd', v)} />
                      <ClampEditor label="Gap Small" description="Kleiner Abstand" value={tokens.spaceGapSm} onChange={v => updateToken('spaceGapSm', v)} />
                      <ClampEditor label="Gap XS" description="Minimaler Abstand" value={tokens.spaceGapXs} onChange={v => updateToken('spaceGapXs', v)} />
                      <ClampEditor label="Container Padding" description="Seitlicher Innenabstand des Containers" value={tokens.containerPx} onChange={v => updateToken('containerPx', v)} />
                      <div className="border border-gray-200 rounded-lg p-3 bg-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm text-gray-900">Container Max-Width</div>
                            <div className="text-xs text-gray-500">Maximale Breite des Inhaltsbereichs</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              step="50"
                              value={tokens.containerMaxWidth}
                              onChange={e => {
                                const val = parseInt(e.target.value) || 1800;
                                setTokens(prev => ({ ...prev, containerMaxWidth: val }));
                                setHasChanges(true);
                              }}
                              className="h-8 text-sm w-28"
                            />
                            <span className="text-xs text-gray-400">px</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* ── Components Tab ── */}
                <TabsContent value="components">
                  <Card>
                    <CardHeader>
                      <CardTitle>Komponenten</CardTitle>
                      <CardDescription>
                        Button-Padding, Card-Padding und Icon-Größen.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <ClampEditor label="Button Padding X" description="Horizontales Button-Padding" value={tokens.btnPx} onChange={v => updateToken('btnPx', v)} />
                      <ClampEditor label="Button Padding Y" description="Vertikales Button-Padding" value={tokens.btnPy} onChange={v => updateToken('btnPy', v)} />
                      <ClampEditor label="Card Padding" description="Innenabstand von Karten" value={tokens.cardPad} onChange={v => updateToken('cardPad', v)} />
                      <ClampEditor label="Icon-Box Größe" description="Größe des Icon-Containers" value={tokens.iconBox} onChange={v => updateToken('iconBox', v)} />
                      <ClampEditor label="Icon Größe" description="Größe des Icons selbst" value={tokens.iconSize} onChange={v => updateToken('iconSize', v)} />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* ── Colors Tab ── */}
                <TabsContent value="colors">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sektionsfarben</CardTitle>
                      <CardDescription>
                        Hintergrund- und Textfarben für jede Sektion der Startseite.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {tokens.sectionColors.map((section, i) => (
                        <ColorEditor
                          key={section.id}
                          section={section}
                          onChange={s => updateSectionColor(i, s)}
                        />
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* ── Presets Tab ── */}
                <TabsContent value="presets">
                  <Card>
                    <CardHeader>
                      <CardTitle>Presets</CardTitle>
                      <CardDescription>
                        Speichern Sie die aktuelle Konfiguration als Preset, um sie später wiederherzustellen.
                        Presets werden nie automatisch überschrieben.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Save new preset */}
                      <div className="flex gap-2 mb-4">
                        <Input
                          placeholder="Preset-Name (z.B. 'Desktop-optimiert')"
                          value={presetName}
                          onChange={e => setPresetName(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={handleSavePreset} disabled={createPreset.isPending}>
                          <Plus className="w-4 h-4 mr-1" />
                          Speichern
                        </Button>
                      </div>

                      {/* Preset list */}
                      <div className="space-y-2">
                        {/* Default preset */}
                        <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3 bg-white">
                          <div>
                            <div className="font-medium text-sm">Standard (Werkseinstellung)</div>
                            <div className="text-xs text-gray-500">Die ursprünglichen Standardwerte</div>
                          </div>
                          <Button variant="outline" size="sm" onClick={handleReset}>
                            Laden
                          </Button>
                        </div>

                        {presets?.map(preset => (
                          <div key={preset.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-3 bg-white">
                            <div>
                              <div className="font-medium text-sm">{preset.name}</div>
                              <div className="text-xs text-gray-500">
                                Erstellt: {new Date(preset.createdAt).toLocaleDateString('de-DE')}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm" onClick={() => handleLoadPreset(preset.styles)}>
                                Laden
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => {
                                  if (confirm(`Preset "${preset.name}" wirklich löschen?`)) {
                                    deletePreset.mutate({ id: preset.id });
                                  }
                                }}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </div>
                        ))}

                        {(!presets || presets.length === 0) && (
                          <div className="text-center text-sm text-gray-400 py-4">
                            Noch keine Presets gespeichert
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Preview Panel */}
            <div className="hidden xl:block">
              <PreviewBar tokens={tokens} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
