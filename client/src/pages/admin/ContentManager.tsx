/**
 * ContentManager – Admin CMS for managing all site content (texts, images, videos)
 * Organized by page → section → field with inline editing and auto-translation
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Globe,
  Image as ImageIcon,
  Video,
  Type,
  Upload,
  Save,
  Loader2,
  RefreshCw,
  Search,
  X,
  FileText,
  Trash2,
  Check,
} from "lucide-react";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Link } from "wouter";

// ── Page & Section Definitions ──────────────────────────────────────

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "richtext" | "image" | "video";
  defaultDe?: string;
  defaultEn?: string;
}

interface SectionDef {
  key: string;
  label: string;
  fields: FieldDef[];
}

interface PageDef {
  key: string;
  label: string;
  path: string;
  sections: SectionDef[];
}

// Define all pages and their editable content
const PAGES: PageDef[] = [
  {
    key: "home",
    label: "Startseite",
    path: "/",
    sections: [
      {
        key: "hero",
        label: "Hero-Bereich",
        fields: [
          { key: "videoWebm", label: "Video (WebM)", type: "video" },
          { key: "videoMp4", label: "Video (MP4)", type: "video" },
          { key: "videoPoster", label: "Video-Poster", type: "image" },
          { key: "tagline", label: "Tagline", type: "text", defaultDe: "THE ELECTRONIC COMPANY", defaultEn: "THE ELECTRONIC COMPANY" },
          { key: "headline", label: "Überschrift", type: "text", defaultDe: "Elektronik. Entwickelt. Gefertigt.", defaultEn: "Electronics. Developed. Manufactured." },
          { key: "description", label: "Beschreibung", type: "text", defaultDe: "Von der Idee bis zur Serie...", defaultEn: "From idea to series production..." },
          { key: "ctaLabel", label: "CTA Button", type: "text", defaultDe: "Machbarkeit prüfen lassen", defaultEn: "Request feasibility check" },
          { key: "ctaSecondaryLabel", label: "Sekundärer Button", type: "text", defaultDe: "Leistungen im Überblick", defaultEn: "Services overview" },
        ],
      },
      {
        key: "stats",
        label: "Statistiken",
        fields: [
          { key: "experience.value", label: "Erfahrung Wert", type: "text", defaultDe: "25+", defaultEn: "25+" },
          { key: "experience.label", label: "Erfahrung Label", type: "text", defaultDe: "Jahre Erfahrung", defaultEn: "Years Experience" },
          { key: "projects.value", label: "Projekte Wert", type: "text", defaultDe: "500+", defaultEn: "500+" },
          { key: "projects.label", label: "Projekte Label", type: "text", defaultDe: "Projekte realisiert", defaultEn: "Projects realized" },
          { key: "employees.value", label: "Mitarbeiter Wert", type: "text", defaultDe: "120+", defaultEn: "120+" },
          { key: "employees.label", label: "Mitarbeiter Label", type: "text", defaultDe: "Mitarbeiter", defaultEn: "Employees" },
          { key: "certifications.value", label: "Zertifizierungen Wert", type: "text", defaultDe: "ISO 9001", defaultEn: "ISO 9001" },
          { key: "certifications.label", label: "Zertifizierungen Label", type: "text", defaultDe: "Zertifiziert", defaultEn: "Certified" },
        ],
      },
      {
        key: "services",
        label: "Leistungen (3 Säulen)",
        fields: [
          { key: "0.title", label: "Säule 1 Titel", type: "text", defaultDe: "Entwicklung", defaultEn: "Development" },
          { key: "0.description", label: "Säule 1 Beschreibung", type: "text" },
          { key: "0.image", label: "Säule 1 Bild", type: "image" },
          { key: "1.title", label: "Säule 2 Titel", type: "text", defaultDe: "Fertigung", defaultEn: "Manufacturing" },
          { key: "1.description", label: "Säule 2 Beschreibung", type: "text" },
          { key: "1.image", label: "Säule 2 Bild", type: "image" },
          { key: "2.title", label: "Säule 3 Titel", type: "text", defaultDe: "Lifecycle", defaultEn: "Lifecycle" },
          { key: "2.description", label: "Säule 3 Beschreibung", type: "text" },
          { key: "2.image", label: "Säule 3 Bild", type: "image" },
        ],
      },
    ],
  },
  {
    key: "entwicklung",
    label: "Entwicklung",
    path: "/entwicklung",
    sections: [
      {
        key: "hero",
        label: "Hero-Bereich",
        fields: [
          { key: "image", label: "Hero-Bild", type: "image" },
          { key: "videoWebm", label: "Hero-Video (WebM)", type: "video" },
          { key: "videoMp4", label: "Hero-Video (MP4)", type: "video" },
          { key: "tagline", label: "Tagline", type: "text" },
          { key: "headline", label: "Überschrift", type: "text" },
          { key: "description", label: "Beschreibung", type: "text" },
        ],
      },
    ],
  },
  {
    key: "fertigung",
    label: "Fertigung",
    path: "/fertigung",
    sections: [
      {
        key: "hero",
        label: "Hero-Bereich",
        fields: [
          { key: "image", label: "Hero-Bild", type: "image" },
          { key: "videoWebm", label: "Hero-Video (WebM)", type: "video" },
          { key: "videoMp4", label: "Hero-Video (MP4)", type: "video" },
          { key: "tagline", label: "Tagline", type: "text" },
          { key: "headline", label: "Überschrift", type: "text" },
          { key: "description", label: "Beschreibung", type: "text" },
        ],
      },
    ],
  },
  {
    key: "fertigung.leiterplatten",
    label: "Leiterplatten bestücken",
    path: "/fertigung/leiterplatten",
    sections: [
      {
        key: "hero",
        label: "Hero-Bereich",
        fields: [
          { key: "image", label: "Hero-Bild", type: "image" },
          { key: "videoWebm", label: "Hero-Video (WebM)", type: "video" },
          { key: "videoMp4", label: "Hero-Video (MP4)", type: "video" },
        ],
      },
      {
        key: "content",
        label: "Seiteninhalt",
        fields: [
          { key: "title", label: "Titel", type: "text" },
          { key: "subtitle", label: "Untertitel", type: "text" },
          { key: "intro", label: "Einleitung", type: "richtext" },
        ],
      },
    ],
  },
  {
    key: "fertigung.baugruppen",
    label: "Baugruppen fertigen",
    path: "/fertigung/baugruppen",
    sections: [
      {
        key: "hero",
        label: "Hero-Bereich",
        fields: [
          { key: "image", label: "Hero-Bild", type: "image" },
          { key: "videoWebm", label: "Hero-Video (WebM)", type: "video" },
          { key: "videoMp4", label: "Hero-Video (MP4)", type: "video" },
        ],
      },
      {
        key: "content",
        label: "Seiteninhalt",
        fields: [
          { key: "title", label: "Titel", type: "text" },
          { key: "subtitle", label: "Untertitel", type: "text" },
          { key: "intro", label: "Einleitung", type: "richtext" },
        ],
      },
    ],
  },
  {
    key: "fertigung.qualitaet",
    label: "Qualitätsmanagement",
    path: "/fertigung/qualitaet",
    sections: [
      {
        key: "hero",
        label: "Hero-Bereich",
        fields: [
          { key: "image", label: "Hero-Bild", type: "image" },
        ],
      },
      {
        key: "content",
        label: "Seiteninhalt",
        fields: [
          { key: "title", label: "Titel", type: "text" },
          { key: "subtitle", label: "Untertitel", type: "text" },
          { key: "intro", label: "Einleitung", type: "richtext" },
        ],
      },
    ],
  },
  {
    key: "lifecycle",
    label: "Lifecycle",
    path: "/lifecycle",
    sections: [
      {
        key: "hero",
        label: "Hero-Bereich",
        fields: [
          { key: "image", label: "Hero-Bild", type: "image" },
          { key: "tagline", label: "Tagline", type: "text" },
          { key: "headline", label: "Überschrift", type: "text" },
          { key: "description", label: "Beschreibung", type: "text" },
        ],
      },
    ],
  },
  {
    key: "maerkte",
    label: "Märkte",
    path: "/maerkte",
    sections: [
      {
        key: "hero",
        label: "Hero-Bereich",
        fields: [
          { key: "image", label: "Hero-Bild", type: "image" },
          { key: "tagline", label: "Tagline", type: "text" },
          { key: "headline", label: "Überschrift", type: "text" },
          { key: "description", label: "Beschreibung", type: "text" },
        ],
      },
    ],
  },
  {
    key: "unternehmen",
    label: "Unternehmen",
    path: "/unternehmen",
    sections: [
      {
        key: "hero",
        label: "Hero-Bereich",
        fields: [
          { key: "image", label: "Hero-Bild", type: "image" },
          { key: "tagline", label: "Tagline", type: "text" },
          { key: "headline", label: "Überschrift", type: "text" },
          { key: "description", label: "Beschreibung", type: "text" },
        ],
      },
    ],
  },
  {
    key: "kontakt",
    label: "Kontakt",
    path: "/kontakt",
    sections: [
      {
        key: "hero",
        label: "Hero-Bereich",
        fields: [
          { key: "image", label: "Hero-Bild", type: "image" },
          { key: "tagline", label: "Tagline", type: "text" },
          { key: "headline", label: "Überschrift", type: "text" },
          { key: "description", label: "Beschreibung", type: "text" },
        ],
      },
    ],
  },
  {
    key: "karriere",
    label: "Karriere",
    path: "/karriere",
    sections: [
      {
        key: "hero",
        label: "Hero-Bereich",
        fields: [
          { key: "image", label: "Hero-Bild", type: "image" },
          { key: "tagline", label: "Tagline", type: "text" },
          { key: "headline", label: "Überschrift", type: "text" },
          { key: "description", label: "Beschreibung", type: "text" },
        ],
      },
    ],
  },
  // Entwicklung sub-pages
  ...["hardware-software", "simulation", "test-verifikation", "ux-interface-engineering", "software-digitale-systeme", "e-motor-design", "control-design", "validierung-emv", "ki-entwicklung"].map(slug => ({
    key: `entwicklung.${slug.replace(/-/g, "")}`,
    label: `Entwicklung: ${slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}`,
    path: `/entwicklung/${slug}`,
    sections: [
      {
        key: "hero",
        label: "Hero-Bereich",
        fields: [
          { key: "image", label: "Hero-Bild", type: "image" as const },
          { key: "videoWebm", label: "Hero-Video (WebM)", type: "video" as const },
          { key: "videoMp4", label: "Hero-Video (MP4)", type: "video" as const },
        ],
      },
      {
        key: "content",
        label: "Seiteninhalt",
        fields: [
          { key: "title", label: "Titel", type: "text" as const },
          { key: "subtitle", label: "Untertitel", type: "text" as const },
          { key: "intro", label: "Einleitung", type: "richtext" as const },
        ],
      },
    ],
  })),
];

// ── Types ───────────────────────────────────────────────────────────

interface ContentEntry {
  contentKey: string;
  contentType: string;
  valueDe: string | null;
  valueEn: string | null;
}

interface EditState {
  [fullKey: string]: {
    valueDe: string;
    valueEn: string;
    contentType: string;
    dirty: boolean;
  };
}

// ── Media Library Modal ─────────────────────────────────────────────

function MediaLibraryModal({
  open,
  onClose,
  onSelect,
  filterType,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  filterType?: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: mediaItems, isLoading } = trpc.media.list.useQuery(
    { limit: 100, typeFilter: filterType },
    { enabled: open }
  );
  const uploadMutation = trpc.media.upload.useMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = useMemo(() => {
    if (!mediaItems) return [];
    if (!searchQuery) return mediaItems;
    const q = searchQuery.toLowerCase();
    return mediaItems.filter(
      (item) =>
        item.filename.toLowerCase().includes(q) ||
        (item.tags && item.tags.toLowerCase().includes(q))
    );
  }, [mediaItems, searchQuery]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) {
      toast.error("Datei zu groß (max. 50 MB)");
      return;
    }
    try {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1]);
        };
        reader.readAsDataURL(file);
      });
      const result = await uploadMutation.mutateAsync({
        fileName: file.name,
        fileBase64: base64,
        mimeType: file.type,
      });
      toast.success("Datei hochgeladen");
      onSelect(result.url);
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Upload fehlgeschlagen");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Medienbibliothek</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Search & Upload */}
        <div className="flex items-center gap-2 p-4 border-b">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={filterType === "image/" ? "image/*" : filterType === "video/" ? "video/*" : "*"}
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadMutation.isPending}
            size="sm"
          >
            {uploadMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-1" />
            ) : (
              <Upload className="w-4 h-4 mr-1" />
            )}
            Hochladen
          </Button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p>Keine Medien gefunden</p>
              <p className="text-sm mt-1">Laden Sie eine neue Datei hoch</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelect(item.url);
                    onClose();
                  }}
                  className="group relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-cme-blue transition-colors bg-gray-100"
                >
                  {item.mimeType.startsWith("image/") ? (
                    <img
                      src={item.url}
                      alt={item.filename}
                      className="w-full h-full object-cover"
                    />
                  ) : item.mimeType.startsWith("video/") ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Video className="w-8 h-8 text-gray-500" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <FileText className="w-8 h-8 text-gray-500" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.filename}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* URL Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Oder URL direkt eingeben..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const val = (e.target as HTMLInputElement).value.trim();
                  if (val) {
                    onSelect(val);
                    onClose();
                  }
                }
              }}
            />
            <span className="text-xs text-muted-foreground whitespace-nowrap">Enter drücken</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Field Editor Component ──────────────────────────────────────────

function FieldEditor({
  field,
  fullKey,
  editState,
  onUpdate,
  onOpenMedia,
}: {
  field: FieldDef;
  fullKey: string;
  editState: EditState;
  onUpdate: (fullKey: string, lang: "de" | "en", value: string) => void;
  onOpenMedia: (fullKey: string, filterType: string) => void;
}) {
  const state = editState[fullKey];
  const valueDe = state?.valueDe || "";
  const valueEn = state?.valueEn || "";
  const isDirty = state?.dirty || false;

  const typeIcon =
    field.type === "image" ? <ImageIcon className="w-4 h-4" /> :
    field.type === "video" ? <Video className="w-4 h-4" /> :
    field.type === "richtext" ? <FileText className="w-4 h-4" /> :
    <Type className="w-4 h-4" />;

  if (field.type === "image" || field.type === "video") {
    const filterType = field.type === "image" ? "image/" : "video/";
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {typeIcon}
          <span className="text-sm font-medium">{field.label}</span>
          {isDirty && <span className="text-xs text-orange-500 font-medium">• geändert</span>}
        </div>
        <div className="flex items-center gap-3">
          {field.type === "image" && valueDe ? (
            <div className="relative w-24 h-24 rounded-lg overflow-hidden border bg-gray-100 flex-shrink-0">
              <img src={valueDe} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => onUpdate(fullKey, "de", "")}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : field.type === "video" && valueDe ? (
            <div className="relative w-24 h-24 rounded-lg overflow-hidden border bg-gray-200 flex-shrink-0 flex items-center justify-center">
              <Video className="w-8 h-8 text-gray-500" />
              <button
                onClick={() => onUpdate(fullKey, "de", "")}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : null}
          <div className="flex-1 space-y-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenMedia(fullKey, filterType)}
              className="w-full"
            >
              <Upload className="w-3 h-3 mr-1" />
              {valueDe ? "Ersetzen" : "Auswählen / Hochladen"}
            </Button>
            {valueDe && (
              <p className="text-xs text-muted-foreground truncate max-w-xs" title={valueDe}>
                {valueDe}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Text / Richtext fields – show DE and EN side by side
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {typeIcon}
        <span className="text-sm font-medium">{field.label}</span>
        {isDirty && <span className="text-xs text-orange-500 font-medium">• geändert</span>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
            <span className="inline-flex items-center justify-center w-5 h-4 bg-gray-200 rounded text-[10px] font-bold">DE</span>
            Deutsch
          </label>
          {field.type === "richtext" ? (
            <Textarea
              value={valueDe}
              onChange={(e) => onUpdate(fullKey, "de", e.target.value)}
              rows={4}
              placeholder={field.defaultDe || "Deutsch..."}
              className="text-sm"
            />
          ) : (
            <Input
              value={valueDe}
              onChange={(e) => onUpdate(fullKey, "de", e.target.value)}
              placeholder={field.defaultDe || "Deutsch..."}
              className="text-sm"
            />
          )}
        </div>
        <div>
          <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
            <span className="inline-flex items-center justify-center w-5 h-4 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">EN</span>
            English
            <Globe className="w-3 h-3 ml-auto text-blue-500" />
          </label>
          {field.type === "richtext" ? (
            <Textarea
              value={valueEn}
              onChange={(e) => onUpdate(fullKey, "en", e.target.value)}
              rows={4}
              placeholder={field.defaultEn || "English..."}
              className="text-sm"
            />
          ) : (
            <Input
              value={valueEn}
              onChange={(e) => onUpdate(fullKey, "en", e.target.value)}
              placeholder={field.defaultEn || "English..."}
              className="text-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────

export default function ContentManager() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [selectedPageKey, setSelectedPageKey] = useState<string>(PAGES[0].key);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [editState, setEditState] = useState<EditState>({});
  const [mediaModal, setMediaModal] = useState<{ open: boolean; targetKey: string; filterType: string }>({
    open: false,
    targetKey: "",
    filterType: "",
  });
  const [saving, setSaving] = useState(false);

  // Load all content from DB
  const { data: allContent, isLoading: contentLoading, refetch } = trpc.cms.getAll.useQuery(
    undefined,
    { staleTime: 30_000 }
  );
  const updateMutation = trpc.cms.update.useMutation();
  const bulkUpdateMutation = trpc.cms.bulkUpdate.useMutation();

  // Build content map from DB
  const contentMap = useMemo(() => {
    const map = new Map<string, ContentEntry>();
    if (allContent) {
      for (const entry of allContent) {
        map.set(entry.contentKey, entry as ContentEntry);
      }
    }
    return map;
  }, [allContent]);

  // Initialize edit state when content loads or page changes
  useEffect(() => {
    const page = PAGES.find((p) => p.key === selectedPageKey);
    if (!page) return;

    const newState: EditState = {};
    for (const section of page.sections) {
      for (const field of section.fields) {
        const fullKey = `${page.key}.${section.key}.${field.key}`;
        const dbEntry = contentMap.get(fullKey);
        newState[fullKey] = {
          valueDe: dbEntry?.valueDe || field.defaultDe || "",
          valueEn: dbEntry?.valueEn || field.defaultEn || "",
          contentType: field.type,
          dirty: false,
        };
      }
    }
    setEditState(newState);
    // Expand all sections by default
    setExpandedSections(new Set(page.sections.map((s) => s.key)));
  }, [selectedPageKey, contentMap]);

  // Auth check
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cme-blue" />
      </div>
    );
  }
  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Zugriff verweigert – Admin-Rechte erforderlich</p>
      </div>
    );
  }

  const selectedPage = PAGES.find((p) => p.key === selectedPageKey)!;

  const handleFieldUpdate = (fullKey: string, lang: "de" | "en", value: string) => {
    setEditState((prev) => ({
      ...prev,
      [fullKey]: {
        ...prev[fullKey],
        [lang === "de" ? "valueDe" : "valueEn"]: value,
        dirty: true,
      },
    }));
  };

  const handleMediaSelect = (url: string) => {
    const { targetKey } = mediaModal;
    setEditState((prev) => ({
      ...prev,
      [targetKey]: {
        ...prev[targetKey],
        valueDe: url,
        valueEn: url,
        dirty: true,
      },
    }));
  };

  const dirtyCount = Object.values(editState).filter((s) => s.dirty).length;

  const handleSave = async () => {
    const dirtyEntries = Object.entries(editState).filter(([, s]) => s.dirty);
    if (dirtyEntries.length === 0) {
      toast.info("Keine Änderungen vorhanden");
      return;
    }

    setSaving(true);
    try {
      // Determine which language was primarily edited (heuristic: check if DE values changed)
      const entries = dirtyEntries.map(([key, state]) => ({
        contentKey: key,
        contentType: state.contentType as "text" | "richtext" | "image" | "video",
        valueDe: state.valueDe || null,
        valueEn: state.valueEn || null,
      }));

      // Check if text fields were edited to trigger auto-translation
      const hasTextChanges = entries.some(
        (e) => e.contentType === "text" || e.contentType === "richtext"
      );

      await bulkUpdateMutation.mutateAsync({
        entries,
        editedLang: hasTextChanges ? "de" : undefined,
      });

      toast.success(`${dirtyEntries.length} Änderung(en) gespeichert`);
      if (hasTextChanges) {
        toast.info("Englische Übersetzungen werden im Hintergrund generiert...", { duration: 5000 });
      }

      // Mark all as clean
      setEditState((prev) => {
        const next = { ...prev };
        for (const key of Object.keys(next)) {
          next[key] = { ...next[key], dirty: false };
        }
        return next;
      });

      // Refetch content after a delay to pick up translations
      setTimeout(() => refetch(), 8000);
    } catch (err: any) {
      toast.error(err.message || "Speichern fehlgeschlagen");
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionKey)) {
        next.delete(sectionKey);
      } else {
        next.add(sectionKey);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/styles">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold">Inhalte verwalten</h1>
              <p className="text-xs text-muted-foreground">
                Texte, Bilder und Videos aller Seiten bearbeiten
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {dirtyCount > 0 && (
              <span className="text-sm text-orange-600 font-medium">
                {dirtyCount} Änderung(en)
              </span>
            )}
            <Button onClick={() => refetch()} variant="outline" size="sm">
              <RefreshCw className="w-3 h-3 mr-1" />
              Aktualisieren
            </Button>
            <Button
              onClick={handleSave}
              disabled={dirtyCount === 0 || saving}
              size="sm"
              className="bg-cme-blue hover:bg-cme-blue/90"
            >
              {saving ? (
                <Loader2 className="w-3 h-3 animate-spin mr-1" />
              ) : (
                <Save className="w-3 h-3 mr-1" />
              )}
              Speichern
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar – Page List */}
        <div className="w-64 flex-shrink-0">
          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-sm">Seiten</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {PAGES.map((page) => {
                  const isSelected = page.key === selectedPageKey;
                  const indent = page.key.includes(".") ? "pl-8" : "pl-4";
                  return (
                    <button
                      key={page.key}
                      onClick={() => setSelectedPageKey(page.key)}
                      className={`w-full text-left py-2.5 pr-4 text-sm transition-colors ${indent} ${
                        isSelected
                          ? "bg-cme-blue/10 text-cme-blue font-medium border-r-2 border-cme-blue"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {page.label}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-4">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{selectedPage.label}</h2>
              <p className="text-sm text-muted-foreground">{selectedPage.path}</p>
            </div>
            <a
              href={selectedPage.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cme-blue hover:underline"
            >
              Seite ansehen →
            </a>
          </div>

          {contentLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            selectedPage.sections.map((section) => {
              const isExpanded = expandedSections.has(section.key);
              return (
                <Card key={section.key}>
                  <button
                    onClick={() => toggleSection(section.key)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
                      <h3 className="font-semibold text-sm">{section.label}</h3>
                      <span className="text-xs text-muted-foreground">
                        {section.fields.length} Felder
                      </span>
                    </div>
                    {section.fields.some((f) => {
                      const fk = `${selectedPage.key}.${section.key}.${f.key}`;
                      return editState[fk]?.dirty;
                    }) && (
                      <span className="text-xs text-orange-500 font-medium">geändert</span>
                    )}
                  </button>
                  {isExpanded && (
                    <CardContent className="pt-0 pb-4 space-y-4 border-t">
                      {section.fields.map((field) => {
                        const fullKey = `${selectedPage.key}.${section.key}.${field.key}`;
                        return (
                          <FieldEditor
                            key={fullKey}
                            field={field}
                            fullKey={fullKey}
                            editState={editState}
                            onUpdate={handleFieldUpdate}
                            onOpenMedia={(key, filterType) =>
                              setMediaModal({ open: true, targetKey: key, filterType })
                            }
                          />
                        );
                      })}
                    </CardContent>
                  )}
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* Media Library Modal */}
      <MediaLibraryModal
        open={mediaModal.open}
        onClose={() => setMediaModal({ open: false, targetKey: "", filterType: "" })}
        onSelect={handleMediaSelect}
        filterType={mediaModal.filterType}
      />
    </div>
  );
}
