import Layout from '@/components/Layout';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, Loader2 } from 'lucide-react';
import { getLoginUrl } from '@/const';

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

  const utils = trpc.useUtils();
  const { data: articles, isLoading } = trpc.articles.listAll.useQuery();
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
  }

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = { slug, title, excerpt: excerpt || undefined, content, coverImage: coverImage || undefined, author, status, tags: tags || undefined, metaTitle: metaTitle || undefined, metaDescription: metaDescription || undefined };
    if (editingId) {
      updateMutation.mutate({ id: editingId, ...data });
    } else {
      createMutation.mutate(data);
    }
  }

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
            <p className="text-gray-600 mt-2">Sie benötigen Admin-Rechte, um diese Seite zu sehen.</p>
            {!isAuthenticated && (
              <a href={getLoginUrl()} className="inline-block mt-4 text-cme-blue hover:underline">
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
            <Button onClick={() => { resetForm(); setShowForm(true); }} className="bg-cme-blue hover:bg-cme-blue/90">
              <Plus size={16} className="mr-2" /> Neuer Artikel
            </Button>
          </div>

          {/* Article Form */}
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titel *</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => { setTitle(e.target.value); if (!editingId) setSlug(generateSlug(e.target.value)); }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zusammenfassung</label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Inhalt (Markdown) *</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent font-mono text-sm"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover-Bild URL</label>
                    <input
                      type="text"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
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
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (kommagetrennt)</label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Leistungselektronik, EMV, Thermisches Management"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta-Titel (SEO)</label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta-Beschreibung (SEO)</label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cme-blue focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="submit" className="bg-cme-blue hover:bg-cme-blue/90" disabled={createMutation.isPending || updateMutation.isPending}>
                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                    <Save size={16} className="mr-2" />
                    {editingId ? 'Aktualisieren' : 'Erstellen'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>Abbrechen</Button>
                </div>
              </form>
            </div>
          )}

          {/* Articles List */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
                </div>
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="space-y-3">
              {articles.map((article) => (
                <div key={article.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-cme-dark truncate">{article.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {article.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      /{article.slug} · {article.author} · {new Date(article.createdAt).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
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
              <Button onClick={() => { resetForm(); setShowForm(true); }} variant="outline" className="mt-4">
                <Plus size={16} className="mr-2" /> Ersten Artikel erstellen
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
