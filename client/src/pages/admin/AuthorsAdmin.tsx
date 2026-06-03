import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  Upload,
  ImageIcon,
  User,
} from 'lucide-react';
import { getLoginUrl } from '@/const';

export default function AuthorsAdmin() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [titleDe, setTitleDe] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [bioDe, setBioDe] = useState('');
  const [bioEn, setBioEn] = useState('');
  const [expertiseDe, setExpertiseDe] = useState('');
  const [expertiseEn, setExpertiseEn] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [url, setUrl] = useState('');
  const [company, setCompany] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [location, setLocation] = useState('');
  const [knowsAbout, setKnowsAbout] = useState('');

  // Image upload state
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();
  const { data: authors, isLoading } = trpc.authors.list.useQuery();

  const uploadCoverMutation = trpc.articles.uploadCover.useMutation({
    onSuccess: (data) => {
      setImageUrl(data.url);
      setIsUploading(false);
      toast.success('Profilbild hochgeladen');
    },
    onError: (err) => {
      setIsUploading(false);
      toast.error(`Upload fehlgeschlagen: ${err.message}`);
    },
  });

  const handleFileUpload = useCallback((file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Nur Bilder (JPEG, PNG, WebP, GIF) erlaubt.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Datei zu groß (max. 5 MB).');
      return;
    }
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      uploadCoverMutation.mutate({
        fileName: file.name,
        mimeType: file.type,
        fileBase64: base64,
      });
    };
    reader.readAsDataURL(file);
  }, [uploadCoverMutation]);

  const createMutation = trpc.authors.create.useMutation({
    onSuccess: () => {
      utils.authors.list.invalidate();
      resetForm();
      toast.success('Autor erstellt');
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.authors.update.useMutation({
    onSuccess: () => {
      utils.authors.list.invalidate();
      resetForm();
      toast.success('Autor aktualisiert');
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.authors.delete.useMutation({
    onSuccess: () => {
      utils.authors.list.invalidate();
      toast.success('Autor gelöscht');
    },
    onError: (err) => toast.error(err.message),
  });

  function resetForm() {
    setEditingId(null);
    setShowForm(false);
    setName('');
    setTitleDe('');
    setTitleEn('');
    setBioDe('');
    setBioEn('');
    setExpertiseDe('');
    setExpertiseEn('');
    setImageUrl('');
    setUrl('');
    setCompany('');
    setCompanyUrl('');
    setLocation('');
    setKnowsAbout('');
  }

  function startEdit(author: NonNullable<typeof authors>[number]) {
    setEditingId(author.id);
    setShowForm(true);
    setName(author.name);
    setTitleDe(author.titleDe || '');
    setTitleEn(author.titleEn || '');
    setBioDe(author.bioDe || '');
    setBioEn(author.bioEn || '');
    setExpertiseDe(author.expertiseDe || '');
    setExpertiseEn(author.expertiseEn || '');
    setImageUrl(author.imageUrl || '');
    setUrl(author.url || '');
    setCompany(author.company || '');
    setCompanyUrl(author.companyUrl || '');
    setLocation(author.location || '');
    setKnowsAbout(author.knowsAbout || '');
  }

  function handleSave() {
    if (!name.trim()) {
      toast.error('Name ist erforderlich');
      return;
    }

    const data = {
      name: name.trim(),
      titleDe: titleDe.trim() || undefined,
      titleEn: titleEn.trim() || undefined,
      bioDe: bioDe.trim() || undefined,
      bioEn: bioEn.trim() || undefined,
      expertiseDe: expertiseDe.trim() || undefined,
      expertiseEn: expertiseEn.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      url: url.trim() || undefined,
      company: company.trim() || undefined,
      companyUrl: companyUrl.trim() || undefined,
      location: location.trim() || undefined,
      knowsAbout: knowsAbout.trim() || undefined,
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, ...data });
    } else {
      createMutation.mutate(data);
    }
  }

  // Auth guard
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin w-8 h-8 text-cme-blue" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    window.location.href = getLoginUrl();
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Autoren verwalten</h1>
            <p className="text-muted-foreground mt-1">
              Autorenprofile für Insights-Artikel anlegen und bearbeiten
            </p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Neuer Autor
            </Button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? 'Autor bearbeiten' : 'Neuen Autor anlegen'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20"
                  placeholder="Matthias Markmann"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium mb-1">Unternehmen</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20"
                  placeholder="CME Control Motion Electronics GmbH"
                />
              </div>

              {/* Title DE */}
              <div>
                <label className="block text-sm font-medium mb-1">Titel / Rolle (DE)</label>
                <input
                  type="text"
                  value={titleDe}
                  onChange={(e) => setTitleDe(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20"
                  placeholder="Geschäftsführer & Gründer"
                />
              </div>

              {/* Title EN */}
              <div>
                <label className="block text-sm font-medium mb-1">Titel / Rolle (EN)</label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20"
                  placeholder="CEO & Founder"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-1">Standort</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20"
                  placeholder="Dortmund, Deutschland"
                />
              </div>

              {/* URL */}
              <div>
                <label className="block text-sm font-medium mb-1">Profil-URL (z.B. LinkedIn)</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              {/* Company URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Unternehmens-URL</label>
                <input
                  type="url"
                  value={companyUrl}
                  onChange={(e) => setCompanyUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20"
                  placeholder="https://control-motion.de"
                />
              </div>

              {/* Bio DE */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Kurzbiografie (DE)</label>
                <textarea
                  value={bioDe}
                  onChange={(e) => setBioDe(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20"
                  placeholder="Matthias Markmann ist Geschäftsführer und Gründer der CME..."
                />
              </div>

              {/* Bio EN */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Kurzbiografie (EN)</label>
                <textarea
                  value={bioEn}
                  onChange={(e) => setBioEn(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20"
                  placeholder="Matthias Markmann is the CEO and founder of CME..."
                />
              </div>

              {/* Expertise DE */}
              <div>
                <label className="block text-sm font-medium mb-1">Expertise (DE, kommagetrennt)</label>
                <input
                  type="text"
                  value={expertiseDe}
                  onChange={(e) => setExpertiseDe(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20"
                  placeholder="Leistungselektronik, Antriebstechnik, EMV"
                />
              </div>

              {/* Expertise EN */}
              <div>
                <label className="block text-sm font-medium mb-1">Expertise (EN, kommagetrennt)</label>
                <input
                  type="text"
                  value={expertiseEn}
                  onChange={(e) => setExpertiseEn(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20"
                  placeholder="Power Electronics, Motor Drives, EMC"
                />
              </div>

              {/* knowsAbout */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Schema.org knowsAbout (kommagetrennt)</label>
                <input
                  type="text"
                  value={knowsAbout}
                  onChange={(e) => setKnowsAbout(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20"
                  placeholder="Power Electronics, Embedded Systems, EMS Manufacturing"
                />
              </div>

              {/* Profile Image */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Profilbild</label>
                <div className="flex items-center gap-4">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Profilbild"
                      className="w-16 h-16 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:border-cme-blue focus:ring-2 focus:ring-cme-blue/20 text-sm"
                      placeholder="https://... oder Bild hochladen →"
                    />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-border">
              <Button
                onClick={handleSave}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="gap-2"
              >
                {(createMutation.isPending || updateMutation.isPending) ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {editingId ? 'Aktualisieren' : 'Erstellen'}
              </Button>
              <Button variant="outline" onClick={resetForm} className="gap-2">
                <X className="w-4 h-4" />
                Abbrechen
              </Button>
            </div>
          </div>
        )}

        {/* Authors List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin w-8 h-8 text-cme-blue" />
          </div>
        ) : !authors?.length ? (
          <div className="text-center py-12 text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Noch keine Autoren angelegt.</p>
            <p className="text-sm mt-1">Erstelle den ersten Autor über den Button oben.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {authors.map((author) => (
              <div
                key={author.id}
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-cme-blue/30 transition-colors"
              >
                {/* Avatar */}
                {author.imageUrl ? (
                  <img
                    src={author.imageUrl}
                    alt={author.name}
                    className="w-12 h-12 rounded-full object-cover border border-border"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{author.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {author.titleDe || author.titleEn || '–'}
                    {author.company && ` · ${author.company}`}
                  </p>
                  {author.expertiseDe && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {author.expertiseDe.split(',').slice(0, 4).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs bg-cme-blue/10 text-cme-blue rounded-full"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEdit(author)}
                    className="gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Bearbeiten
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm(`"${author.name}" wirklich löschen?`)) {
                        deleteMutation.mutate({ id: author.id });
                      }
                    }}
                    className="gap-1 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
