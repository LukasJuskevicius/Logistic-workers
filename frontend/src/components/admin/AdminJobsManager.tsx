import { useState, useEffect, useCallback } from 'react';
import { useAuthCheck } from '../../utils/authCheck';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Job {
  job_id: string;
  title: string;
  description: string;
  job_type: string;
  location: string;
  salary_min: number | null;
  salary_max: number | null;
  currency: string;
  required_experience_years: number | null;
  required_cdl_class: string | null;
  shift_type: string[] | null;
  travel_required: boolean;
  equipment_provided: boolean;
  application_deadline: string | null;
  start_date: string | null;
  status: string;
  created_at: string;
  application_count?: number;
}

const EMPTY_FORM: Partial<Job> = {
  title: '',
  description: '',
  job_type: 'full_time',
  location: '',
  salary_min: null,
  salary_max: null,
  currency: 'EUR',
  required_experience_years: null,
  required_cdl_class: '',
  travel_required: false,
  equipment_provided: true,
  application_deadline: '',
  start_date: '',
  status: 'active',
};

// ─── API helpers ──────────────────────────────────────────────────────────────

async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const colours: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    filled: 'bg-blue-100 text-blue-800',
    closed: 'bg-gray-100 text-gray-600',
    draft: 'bg-yellow-100 text-yellow-800',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colours[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg text-white text-sm font-medium transition-all ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
      <span>{type === 'success' ? '✓' : '✕'}</span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  );
}

// ─── Job Form Modal ───────────────────────────────────────────────────────────

interface JobFormProps {
  initial: Partial<Job>;
  onSave: (data: Partial<Job>) => Promise<void>;
  onClose: () => void;
  isSaving: boolean;
}

function JobFormModal({ initial, onSave, onClose, isSaving }: JobFormProps) {
  const [form, setForm] = useState<Partial<Job>>(initial);

  function set(field: keyof Job, value: any) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave(form);
  }

  const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition';
  const labelClass = 'block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide';

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            {initial.job_id ? 'Edit Job Listing' : 'Post a New Job'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Title */}
          <div>
            <label className={labelClass}>Job Title *</label>
            <input
              required
              className={inputClass}
              placeholder="e.g. International CE Category Driver"
              value={form.title ?? ''}
              onChange={e => set('title', e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Job Description *</label>
            <textarea
              required
              rows={4}
              className={inputClass}
              placeholder="Describe the role, responsibilities, and requirements…"
              value={form.description ?? ''}
              onChange={e => set('description', e.target.value)}
            />
          </div>

          {/* Location + Job Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Location *</label>
              <input
                required
                className={inputClass}
                placeholder="e.g. Amsterdam, Netherlands"
                value={form.location ?? ''}
                onChange={e => set('location', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Job Type</label>
              <select className={inputClass} value={form.job_type ?? 'full_time'} onChange={e => set('job_type', e.target.value)}>
                <option value="full_time">Full-time</option>
                <option value="part_time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="temporary">Temporary</option>
              </select>
            </div>
          </div>

          {/* Salary */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Min Salary (€)</label>
              <input
                type="number"
                className={inputClass}
                placeholder="2000"
                value={form.salary_min ?? ''}
                onChange={e => set('salary_min', e.target.value ? Number(e.target.value) : null)}
              />
            </div>
            <div>
              <label className={labelClass}>Max Salary (€)</label>
              <input
                type="number"
                className={inputClass}
                placeholder="3500"
                value={form.salary_max ?? ''}
                onChange={e => set('salary_max', e.target.value ? Number(e.target.value) : null)}
              />
            </div>
            <div>
              <label className={labelClass}>Currency</label>
              <select className={inputClass} value={form.currency ?? 'EUR'} onChange={e => set('currency', e.target.value)}>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="PLN">PLN (zł)</option>
              </select>
            </div>
          </div>

          {/* Experience + CDL Class */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Min. Experience (years)</label>
              <input
                type="number"
                min={0}
                className={inputClass}
                placeholder="2"
                value={form.required_experience_years ?? ''}
                onChange={e => set('required_experience_years', e.target.value ? Number(e.target.value) : null)}
              />
            </div>
            <div>
              <label className={labelClass}>Required Licence Class</label>
              <select className={inputClass} value={form.required_cdl_class ?? ''} onChange={e => set('required_cdl_class', e.target.value)}>
                <option value="">Any</option>
                <option value="CE">CE (Articulated HGV)</option>
                <option value="C">C (Rigid HGV)</option>
                <option value="BE">BE (Car + Trailer)</option>
                <option value="B">B (Car)</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Application Deadline</label>
              <input
                type="date"
                className={inputClass}
                value={form.application_deadline ? form.application_deadline.split('T')[0] : ''}
                onChange={e => set('application_deadline', e.target.value || null)}
              />
            </div>
            <div>
              <label className={labelClass}>Start Date</label>
              <input
                type="date"
                className={inputClass}
                value={form.start_date ? form.start_date.split('T')[0] : ''}
                onChange={e => set('start_date', e.target.value || null)}
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex gap-8">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-600"
                checked={form.travel_required ?? false}
                onChange={e => set('travel_required', e.target.checked)}
              />
              <span className="text-sm text-gray-700">International travel required</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-600"
                checked={form.equipment_provided ?? true}
                onChange={e => set('equipment_provided', e.target.checked)}
              />
              <span className="text-sm text-gray-700">Equipment / vehicle provided</span>
            </label>
          </div>

          {/* Status (edit only) */}
          {initial.job_id && (
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass} value={form.status ?? 'active'} onChange={e => set('status', e.target.value)}>
                <option value="active">Active</option>
                <option value="filled">Filled</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {isSaving ? 'Saving…' : initial.job_id ? 'Save Changes' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

function DeleteModal({ job, onConfirm, onClose, isDeleting }: { job: Job; onConfirm: () => void; onClose: () => void; isDeleting: boolean }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-lg">⚠</div>
          <h2 className="text-lg font-bold text-gray-900">Delete Job Listing?</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          You are about to permanently delete <strong>"{job.title}"</strong>. This will also remove all associated applications. This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 transition"
          >
            {isDeleting ? 'Deleting…' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const AdminJobsManager = () => {
  const { user, isAuthorized } = useAuthCheck('admin');

  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const showToast = (message: string, type: 'success' | 'error') => setToast({ message, type });

  const fetchJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await apiFetch('/jobs');
      setJobs(Array.isArray(data) ? data : []);
    } catch (err: any) {
      showToast(`Failed to load jobs: ${err.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  if (!isAuthorized) return null;

  // ── Handlers ──

  async function handleSave(formData: Partial<Job>) {
    setIsSaving(true);
    try {
      if (editingJob) {
        await apiFetch(`/jobs/${editingJob.job_id}`, { method: 'PATCH', body: JSON.stringify(formData) });
        showToast('Job updated successfully.', 'success');
      } else {
        await apiFetch('/jobs', { method: 'POST', body: JSON.stringify(formData) });
        showToast('Job posted successfully.', 'success');
      }
      setFormOpen(false);
      setEditingJob(null);
      await fetchJobs();
    } catch (err: any) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await apiFetch(`/jobs/${deleteTarget.job_id}`, { method: 'DELETE' });
      showToast('Job deleted.', 'success');
      setDeleteTarget(null);
      await fetchJobs();
    } catch (err: any) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setIsDeleting(false);
    }
  }

  function openCreate() {
    setEditingJob(null);
    setFormOpen(true);
  }

  function openEdit(job: Job) {
    setEditingJob(job);
    setFormOpen(true);
  }

  // ── Derived state ──

  const filteredJobs = jobs.filter(j =>
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = jobs.filter(j => j.status === 'active').length;

  // ── Render ──

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Listings</h1>
            <p className="text-sm text-gray-500 mt-1">
              {activeCount} active {activeCount === 1 ? 'listing' : 'listings'} · {jobs.length} total
            </p>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 shadow-sm transition"
          >
            <span className="text-lg leading-none">+</span>
            Post New Job
          </button>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by title or location…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Jobs table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-gray-400">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3" />
              Loading jobs…
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📋</div>
              <p className="text-gray-500 font-medium">
                {searchTerm ? 'No jobs match your search.' : 'No job listings yet.'}
              </p>
              {!searchTerm && (
                <button onClick={openCreate} className="mt-4 text-blue-600 text-sm font-semibold hover:underline">
                  Post your first job →
                </button>
              )}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <th className="text-left px-5 py-3 font-semibold">Title</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Location</th>
                  <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Salary</th>
                  <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Deadline</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-right px-5 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredJobs.map(job => (
                  <tr key={job.job_id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{job.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{job.job_type?.replace('_', '-')}</p>
                    </td>
                    <td className="px-4 py-4 text-gray-600 hidden md:table-cell">{job.location}</td>
                    <td className="px-4 py-4 text-gray-600 hidden lg:table-cell">
                      {job.salary_min && job.salary_max
                        ? `€${Number(job.salary_min).toLocaleString()} – €${Number(job.salary_max).toLocaleString()}`
                        : job.salary_min
                          ? `From €${Number(job.salary_min).toLocaleString()}`
                          : '—'}
                    </td>
                    <td className="px-4 py-4 text-gray-500 hidden lg:table-cell">
                      {job.application_deadline
                        ? new Date(job.application_deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                        : '—'}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(job)}
                          className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(job)}
                          className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modals */}
      {formOpen && (
        <JobFormModal
          initial={editingJob ?? EMPTY_FORM}
          onSave={handleSave}
          onClose={() => { setFormOpen(false); setEditingJob(null); }}
          isSaving={isSaving}
        />
      )}
      {deleteTarget && (
        <DeleteModal
          job={deleteTarget}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
          isDeleting={isDeleting}
        />
      )}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
};

export default AdminJobsManager;
