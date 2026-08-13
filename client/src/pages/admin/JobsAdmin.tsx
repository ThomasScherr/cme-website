import { trpc } from '@/lib/trpc';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  Eye,
  EyeOff,
  ExternalLink,
  Briefcase,
} from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';

export default function JobsAdmin() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [titleDe, setTitleDe] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descriptionDe, setDescriptionDe] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [employmentType, setEmploymentType] = useState('Vollzeit');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('Dortmund');
  const [softgardenUrl, setSoftgardenUrl] = useState('');
  const [sortOrder, setSortOrder] = useState(0);

  const utils = trpc.useUtils();
  const { data: jobs, isLoading } = trpc.jobs.list.useQuery();

  const createMutation = trpc.jobs.create.useMutation({
    onSuccess: () => {
      utils.jobs.list.invalidate();
      resetForm();
      toast.success('Stelle erstellt');
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.jobs.update.useMutation({
    onSuccess: () => {
      utils.jobs.list.invalidate();
      resetForm();
      toast.success('Stelle aktualisiert');
    },
    onError: (err) => toast.error(err.message),
  });

  const togglePublishMutation = trpc.jobs.togglePublish.useMutation({
    onSuccess: (data) => {
      utils.jobs.list.invalidate();
      toast.success(data.status === 'published' ? 'Stelle veröffentlicht' : 'Stelle als Entwurf gespeichert');
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.jobs.delete.useMutation({
    onSuccess: () => {
      utils.jobs.list.invalidate();
      toast.success('Stelle gelöscht');
    },
    onError: (err) => toast.error(err.message),
  });

  function resetForm() {
    setEditingId(null);
    setShowForm(false);
    setTitleDe('');
    setTitleEn('');
    setDescriptionDe('');
    setDescriptionEn('');
    setEmploymentType('Vollzeit');
    setDepartment('');
    setLocation('Dortmund');
    setSoftgardenUrl('');
    setSortOrder(0);
  }

  function startEdit(job: any) {
    setEditingId(job.id);
    setShowForm(true);
    setTitleDe(job.titleDe || '');
    setTitleEn(job.titleEn || '');
    setDescriptionDe(job.descriptionDe || '');
    setDescriptionEn(job.descriptionEn || '');
    setEmploymentType(job.employmentType || 'Vollzeit');
    setDepartment(job.department || '');
    setLocation(job.location || 'Dortmund');
    setSoftgardenUrl(job.softgardenUrl || '');
    setSortOrder(job.sortOrder || 0);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      titleDe,
      titleEn: titleEn || undefined,
      descriptionDe,
      descriptionEn: descriptionEn || undefined,
      employmentType: employmentType || undefined,
      department: department || undefined,
      location: location || undefined,
      softgardenUrl: softgardenUrl || undefined,
      sortOrder,
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0080C8]" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    window.location.href = getLoginUrl();
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2A]">Stellenanzeigen</h1>
            <p className="text-sm text-[#6A6A7A] mt-1">
              Verwalten Sie offene Stellen. Veröffentlichte Stellen erscheinen auf der Karriere-Seite.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.href = '/admin/insights'}>
              ← Insights
            </Button>
            <Button onClick={() => { resetForm(); setShowForm(true); }}>
              <Plus className="w-4 h-4 mr-1" /> Neue Stelle
            </Button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? 'Stelle bearbeiten' : 'Neue Stelle erstellen'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titel (DE) *</label>
                  <input
                    type="text"
                    value={titleDe}
                    onChange={(e) => setTitleDe(e.target.value)}
                    required
                    placeholder="z.B. Elektronikentwickler (m/w/d)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0080C8] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titel (EN)</label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="z.B. Electronics Engineer (m/f/d)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0080C8] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kurzbeschreibung (DE) *</label>
                  <textarea
                    value={descriptionDe}
                    onChange={(e) => setDescriptionDe(e.target.value)}
                    required
                    rows={3}
                    placeholder="1-2 Sätze für die Kachel-Vorschau"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0080C8] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kurzbeschreibung (EN)</label>
                  <textarea
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    rows={3}
                    placeholder="1-2 sentences for card preview"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0080C8] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beschäftigungsart</label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0080C8] focus:border-transparent"
                  >
                    <option value="Vollzeit">Vollzeit</option>
                    <option value="Teilzeit">Teilzeit</option>
                    <option value="Werkstudent">Werkstudent</option>
                    <option value="Praktikum">Praktikum</option>
                    <option value="Ausbildung">Ausbildung</option>
                    <option value="Minijob">Minijob</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Abteilung</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="z.B. Entwicklung"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0080C8] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Standort</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Dortmund"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0080C8] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Softgarden-URL (Bewerbungslink)</label>
                  <input
                    type="url"
                    value={softgardenUrl}
                    onChange={(e) => setSoftgardenUrl(e.target.value)}
                    placeholder="https://cme.softgarden.io/job/..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0080C8] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sortierung (0 = oben)</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0080C8] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
                  <Save className="w-4 h-4 mr-1" />
                  {editingId ? 'Aktualisieren' : 'Erstellen'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="w-4 h-4 mr-1" /> Abbrechen
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Job Listings */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#0080C8]" />
          </div>
        ) : !jobs || jobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Briefcase className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Noch keine Stellenanzeigen vorhanden.</p>
            <Button className="mt-4" onClick={() => { resetForm(); setShowForm(true); }}>
              <Plus className="w-4 h-4 mr-1" /> Erste Stelle erstellen
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`bg-white rounded-xl border p-5 transition-shadow hover:shadow-md ${
                  job.status === 'published' ? 'border-green-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#1A1A2A] truncate">{job.titleDe}</h3>
                    {job.titleEn && (
                      <p className="text-xs text-gray-400 truncate">{job.titleEn}</p>
                    )}
                  </div>
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full font-medium ${
                    job.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {job.status === 'published' ? 'Live' : 'Entwurf'}
                  </span>
                </div>

                <p className="text-sm text-[#3A3A4A] line-clamp-2 mb-3">{job.descriptionDe}</p>

                <div className="flex flex-wrap gap-1.5 mb-3 text-xs text-[#6A6A7A]">
                  {job.employmentType && (
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{job.employmentType}</span>
                  )}
                  {job.department && (
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{job.department}</span>
                  )}
                  {job.location && (
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{job.location}</span>
                  )}
                </div>

                {job.softgardenUrl && (
                  <a
                    href={job.softgardenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#0080C8] hover:underline flex items-center gap-1 mb-3"
                  >
                    <ExternalLink className="w-3 h-3" /> Softgarden-Link
                  </a>
                )}

                <div className="flex gap-1.5 pt-2 border-t border-gray-100">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => togglePublishMutation.mutate({ id: job.id })}
                    disabled={togglePublishMutation.isPending}
                  >
                    {job.status === 'published' ? (
                      <><EyeOff className="w-3.5 h-3.5 mr-1" /> Verbergen</>
                    ) : (
                      <><Eye className="w-3.5 h-3.5 mr-1" /> Veröffentlichen</>
                    )}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => startEdit(job)}>
                    <Edit className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => {
                      if (confirm('Stelle wirklich löschen?')) {
                        deleteMutation.mutate({ id: job.id });
                      }
                    }}
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
