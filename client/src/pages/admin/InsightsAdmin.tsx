import Layout from '@/components/Layout';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { useState, useRef, useCallback, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  Sparkles,
  RotateCcw,
  Check,
  AlertCircle,
  Upload,
  ImageIcon,
  Trash,
  Eye,
} from 'lucide-react';
import { getLoginUrl } from '@/const';

// Lazy-load the rich text editor to avoid large initial bundle
const RichTextEditor = lazy(() => import('@/components/RichTextEditor'));

export default function InsightsAdmin() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [author, setAuthor] = useState('CME Redaktion');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [tags, setTags] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // SEO generation state
  const [seoGenerated, setSeoGenerated] = useState(false);

  // Cover image upload state
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();
  const { data: articles, isLoading } = trpc.articles.listAll.useQuery();

  const uploadCoverMutation = trpc.articles.uploadCover.useMutation({
    onSuccess: (data) => {
      setCoverImage(data.url);
      setIsUploading(false);
      toast.success('Cover-Bild hochgeladen');
    },
    onError: (err) => {
      setIsUploading(false);
      toast.error(`Upload fehlgeschlagen: ${err.message}`);
    },
  });

  const handleFileUpload = useCallback((file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Nur Bilder (JPEG, PNG, WebP, GIF, SVG) erlaubt.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Datei zu gro\u00df (max. 10 MB).');
      return;
    }
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      uploadCoverMutation.mutate({
        fileName: file.name,
        fileBase64: base64,
        mimeType: file.type,
      });
    };
    reader.onerror = () => {
      setIsUploading(false);
      toast.error('Datei konnte nicht gelesen werden.');
    };
    reader.readAsDataURL(file);
  }, [uploadCoverMutation]);

  const createMutation = trpc.articles.create.useMutation({
    onSuccess: () => {
      utils.articles.listAll.invalidate();
      resetForm();
      toast.success('Artikel erstellt');
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.articles.update.useMutation({
    onSuccess: () => {
      utils.articles.listAll.invalidate();
      resetForm();
      toast.success('Artikel aktualisiert');
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.articles.delete.useMutation({
    onSuccess: () => {
      utils.articles.listAll.invalidate();
      toast.success('Artikel gelöscht');
    },
    onError: (err) => toast.error(err.message),
  });

  const seoMutation = trpc.articles.generateSeo.useMutation({
    onSuccess: (data) => {
      setExcerpt(data.excerpt);
      setTags(data.tags);
      setMetaTitle(data.metaTitle);
      setMetaDescription(data.metaDescription);
      setSeoGenerated(true);
      toast.success('SEO-Metadaten erfolgreich generiert');
    },
    onError: (err) => {
      toast.error(`SEO-Generierung fehlgeschlagen: ${err.message}`);
    },
  });

  function resetForm() {
    setEditingId(null);
    setShowForm(false);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setCoverImage('');
    setAuthor('CME Redaktion');
    setStatus('draft');
    setTags('');
    setMetaTitle('');
    setMetaDescription('');
    setSeoGenerated(false);
  }

  function startEdit(article: any) {
    setEditingId(article.id);
    setShowForm(true);
    setTitle(article.title);
    setSlug(article.slug);
    setExcerpt(article.excerpt || '');
    setContent(article.content);
    setCoverImage(article.coverImage || '');
    setAuthor(article.author);
    setStatus(article.status);
    setTags(article.tags || '');
    setMetaTitle(article.metaTitle || '');
    setMetaDescription(article.metaDescription || '');
    setSeoGenerated(false);
  }

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function handleGenerateSeo() {
    if (!title.trim()) {
      toast.error('Bitte geben Sie zuerst einen Titel ein.');
      return;
    }
    if (!content.trim()) {
      toast.error('Bitte geben Sie zuerst den Artikelinhalt ein.');
      return;
    }
    // Strip HTML tags for the LLM (send plain text)
    const plainContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    seoMutation.mutate({ title: title.trim(), content: plainContent });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Tiptap may produce empty HTML like '<p></p>' – treat as empty
    const strippedContent = content.replace(/<[^>]*>/g, '').trim();
    if (!title.trim()) {
      toast.error('Bitte geben Sie einen Titel ein.');
      return;
    }
    if (!strippedContent) {
      toast.error('Bitte geben Sie Artikelinhalt ein.');
      return;
    }
    const data = {
      slug,
      title,
      excerpt: excerpt || undefined,
      content: strippedContent ? content : '',
      coverImage: coverImage || undefined,
      author,
      status,
      tags: tags || undefined,
      metaTitle: metaTitle || undefined,
      metaDescription: metaDescription || undefined,
    };
    if (editingId) {
      updateMutation.mutate({ id: editingId, ...data });
    } else {
      createMutation.mutate(data);
    }
  }

  // ── Auth guards ──
  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-cme-blue" />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <Layout>
        <section className="pt-32 pb-20 text-center">
          <div className="container">
            <h1 className="text-2xl font-bold text-cme-dark">Zugriff verweigert</h1>
            <p className="text-gray-600 mt-2">
              Sie benötigen Admin-Rechte, um diese Seite zu sehen.
            </p>
            {!isAuthenticated && (
              <a
                href={getLoginUrl()}
                className="inline-block mt-4 text-cme-blue hover:underline"
              >
                Anmelden
              </a>
            )}
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-20 lg:pt-40">
        <div className="container max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-cme-dark">Insights verwalten</h1>
            <Button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-cme-blue hover:bg-cme-blue/90"
            >
              <Plus size={16} className="mr-2" /> Neuer Artikel
            </Button>
          </div>

          {/* ── Article Form ── */}
          {showForm && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-cme-dark">
                  {editingId ? 'Artikel bearbeiten' : 'Neuer Artikel'}
                </h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title & Slug */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titel *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        if (!editingId) setSlug(generateSlug(e.target.value));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL-Slug *
                    </label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Rich Text Editor for Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inhalt *
                  </label>
                  <Suspense
                    fallback={
                      <div className="border border-gray-300 rounded-lg p-8 flex items-center justify-center text-gray-400">
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Editor wird geladen…
                      </div>
                    }
                  >
                    <RichTextEditor
                      content={content}
                      onChange={setContent}
                      placeholder="Artikel-Inhalt eingeben… Nutzen Sie die Toolbar für Formatierungen."
                    />
                  </Suspense>
                </div>

                {/* Cover Image Upload */}
                <div className="mb-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover-Bild
                  </label>
                  {coverImage ? (
                    <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                      <img
                        src={coverImage}
                        alt="Cover-Vorschau"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="p-1.5 bg-white/90 hover:bg-white rounded-lg shadow-sm text-gray-600 hover:text-cme-blue transition-colors"
                          title="Bild ersetzen"
                        >
                          <Upload size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setCoverImage('')}
                          className="p-1.5 bg-white/90 hover:bg-white rounded-lg shadow-sm text-gray-600 hover:text-red-500 transition-colors"
                          title="Bild entfernen"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                      <div className="px-3 py-2 bg-white border-t border-gray-200">
                        <p className="text-xs text-gray-400 truncate">{coverImage}</p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                        isDragging
                          ? 'border-cme-blue bg-cme-blue/5'
                          : 'border-gray-300 hover:border-cme-blue/50 hover:bg-gray-50'
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                    >
                      {isUploading || uploadCoverMutation.isPending ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="w-8 h-8 animate-spin text-cme-blue" />
                          <p className="text-sm text-gray-500">Bild wird hochgeladen…</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                            <ImageIcon size={24} className="text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Bild hochladen oder hierher ziehen
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              JPEG, PNG, WebP, GIF oder SVG · max. 10 MB
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                      e.target.value = '';
                    }}
                  />
                </div>

                {/* Author, Status */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Autor
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent"
                    >
                      <option value="draft">Entwurf</option>
                      <option value="published">Veröffentlicht</option>
                    </select>
                  </div>
                </div>

                {/* ═══════════════════════════════════════════════════════
                    SEO Section with AI Generation Button
                    ═══════════════════════════════════════════════════════ */}
                <div className="border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-gray-50 to-blue-50/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles size={18} className="text-cme-blue" />
                      <h3 className="text-base font-semibold text-cme-dark">
                        SEO &amp; KI-Suchoptimierung
                      </h3>
                    </div>
                    <Button
                      type="button"
                      onClick={handleGenerateSeo}
                      disabled={seoMutation.isPending}
                      className="bg-gradient-to-r from-cme-blue to-blue-600 hover:from-cme-blue/90 hover:to-blue-600/90 text-white shadow-md hover:shadow-lg transition-all"
                      size="sm"
                    >
                      {seoMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Generiere…
                        </>
                      ) : seoGenerated ? (
                        <>
                          <RotateCcw size={14} className="mr-2" />
                          Neu generieren
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} className="mr-2" />
                          Mit KI generieren
                        </>
                      )}
                    </Button>
                  </div>

                  {seoGenerated && (
                    <div className="flex items-center gap-2 mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                      <Check size={14} />
                      <span>
                        SEO-Metadaten wurden generiert. Sie können die Felder vor dem Speichern
                        noch anpassen.
                      </span>
                    </div>
                  )}

                  {!seoGenerated && !seoMutation.isPending && (
                    <div className="flex items-start gap-2 mb-4 text-sm text-gray-500 bg-white/60 border border-gray-100 rounded-lg px-3 py-2">
                      <AlertCircle size={14} className="mt-0.5 shrink-0" />
                      <span>
                        Geben Sie zuerst Titel und Inhalt ein, dann klicken Sie auf{' '}
                        <strong>„Mit KI generieren"</strong>, um Zusammenfassung, Tags,
                        Meta-Titel und Meta-Beschreibung automatisch zu erstellen – optimiert
                        für Google, Bing und KI-Suchsysteme wie ChatGPT und Perplexity.
                      </span>
                    </div>
                  )}

                  {/* Excerpt / Summary */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zusammenfassung
                      <span className="text-gray-400 font-normal ml-1">
                        ({excerpt.length}/300 Zeichen)
                      </span>
                    </label>
                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={2}
                      maxLength={300}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent ${
                        seoGenerated ? 'border-green-300 bg-green-50/30' : 'border-gray-300'
                      }`}
                      placeholder="Kurze Zusammenfassung für Vorschauen und Social Media"
                    />
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (kommagetrennt)
                    </label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Leistungselektronik, EMV, Thermisches Management, Power Electronics"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent ${
                        seoGenerated ? 'border-green-300 bg-green-50/30' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  {/* Meta Title */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Meta-Titel (SEO)
                        <span className="text-gray-400 font-normal ml-1">
                          ({metaTitle.length}/60 Zeichen)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        maxLength={70}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent ${
                          seoGenerated ? 'border-green-300 bg-green-50/30' : 'border-gray-300'
                        }`}
                        placeholder="SEO-optimierter Seitentitel"
                      />
                      {metaTitle && (
                        <p className="mt-1 text-xs text-gray-400">
                          {metaTitle.length < 50
                            ? '⚠ Zu kurz – ideal sind 50–60 Zeichen'
                            : metaTitle.length <= 60
                              ? '✓ Optimale Länge'
                              : '⚠ Zu lang – wird in Suchergebnissen abgeschnitten'}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Meta-Beschreibung (SEO)
                        <span className="text-gray-400 font-normal ml-1">
                          ({metaDescription.length}/155 Zeichen)
                        </span>
                      </label>
                      <textarea
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        rows={2}
                        maxLength={160}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent ${
                          seoGenerated ? 'border-green-300 bg-green-50/30' : 'border-gray-300'
                        }`}
                        placeholder="SEO-optimierte Beschreibung für Suchergebnisse"
                      />
                      {metaDescription && (
                        <p className="mt-1 text-xs text-gray-400">
                          {metaDescription.length < 140
                            ? '⚠ Zu kurz – ideal sind 140–155 Zeichen'
                            : metaDescription.length <= 155
                              ? '✓ Optimale Länge'
                              : '⚠ Zu lang – wird in Suchergebnissen abgeschnitten'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Google Preview */}
                  {(metaTitle || title) && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-medium">
                        Vorschau in Suchergebnissen
                      </p>
                      <div className="text-blue-700 text-lg font-medium leading-snug truncate">
                        {metaTitle || title}
                      </div>
                      <div className="text-green-700 text-sm mt-0.5">
                        control-motion.de/insights/{slug || '…'}
                      </div>
                      <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {metaDescription || excerpt || 'Keine Beschreibung vorhanden.'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    className="bg-cme-blue hover:bg-cme-blue/90"
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {(createMutation.isPending || updateMutation.isPending) && (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    )}
                    <Save size={16} className="mr-2" />
                    {editingId ? 'Aktualisieren' : 'Erstellen'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Abbrechen
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* ── Articles List ── */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse"
                >
                  <div className="h-5 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
                </div>
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="space-y-3">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-cme-dark truncate">{article.title}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          article.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {article.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      /{article.slug} · {article.author} ·{' '}
                      {new Date(article.createdAt).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => window.open(`/admin/insights/preview/${article.id}`, '_blank')}
                      className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Vorschau"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => startEdit(article)}
                      className="p-2 text-gray-400 hover:text-cme-blue rounded-lg hover:bg-gray-50 transition-colors"
                      title="Bearbeiten"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Artikel wirklich löschen?')) {
                          deleteMutation.mutate({ id: article.id });
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-50 transition-colors"
                      title="Löschen"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">Noch keine Artikel vorhanden.</p>
              <Button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                variant="outline"
                className="mt-4"
              >
                <Plus size={16} className="mr-2" /> Ersten Artikel erstellen
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
