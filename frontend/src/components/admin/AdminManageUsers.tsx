import { useState, useEffect, useCallback } from 'react';
import { adminApi, AdminUser } from '../../api/admin';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'driver', label: 'Drivers' },
  { key: 'client', label: 'Clients' },
  { key: 'admin', label: 'Admins' },
  { key: 'unverified', label: 'Unverified' },
];

const ROLE_CLASS: Record<string, string> = {
  driver: 'bg-blue-100 text-blue-700',
  client: 'bg-green-100 text-green-700',
  admin: 'bg-purple-100 text-purple-700',
};

function statusBadge(verified: boolean) {
  return verified
    ? 'bg-green-100 text-green-700'
    : 'bg-yellow-100 text-yellow-700';
}

export default function AdminManageUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number[]>([]);
  const [busy, setBusy] = useState<number | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    adminApi.getUsers()
      .then(u => { setUsers(u); setSelected([]); })
      .catch(() => setError('Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(reload, [reload]);

  const filtered = users.filter(u => {
    const matchSearch =
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      `${u.first_name ?? ''} ${u.last_name ?? ''}`.toLowerCase().includes(search.toLowerCase());
    const matchTab =
      tab === 'all' ? true :
      tab === 'unverified' ? !u.is_verified :
      u.role === tab;
    return matchSearch && matchTab;
  });

  function tabCount(key: string) {
    if (key === 'all') return users.length;
    if (key === 'unverified') return users.filter(u => !u.is_verified).length;
    return users.filter(u => u.role === key).length;
  }

  const allChecked = filtered.length > 0 && selected.length === filtered.length;
  function toggleAll() { setSelected(allChecked ? [] : filtered.map(u => u.user_id)); }
  function toggleOne(id: number) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  async function activate(id: number) {
    setBusy(id);
    try { await adminApi.updateUserStatus(id, 'active'); reload(); }
    catch { setError('Failed to update user'); setBusy(null); }
  }

  async function suspend(id: number) {
    setBusy(id);
    try { await adminApi.updateUserStatus(id, 'suspended'); reload(); }
    catch { setError('Failed to update user'); setBusy(null); }
  }

  async function remove(id: number) {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    setBusy(id);
    try { await adminApi.deleteUser(id); reload(); }
    catch { setError('Failed to delete user'); setBusy(null); }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage drivers, clients, and admins</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 flex justify-between">
          {error}
          <button onClick={() => setError(null)} className="font-bold">×</button>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  tab === t.key ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {t.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  tab === t.key ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {tabCount(t.key)}
                </span>
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {selected.length > 0 && (
          <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-2">
            <span className="text-sm text-indigo-700 font-medium">{selected.length} user(s) selected</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700">Activate</button>
              <button className="px-3 py-1 bg-amber-500 text-white text-xs rounded-lg hover:bg-amber-600">Suspend</button>
              <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-32 text-gray-400 text-sm">Loading users…</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3">
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} className="rounded" />
                </th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <div className="text-4xl mb-2">👥</div>
                    No users found
                  </td>
                </tr>
              ) : filtered.map(u => (
                <tr key={u.user_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selected.includes(u.user_id)}
                      onChange={() => toggleOne(u.user_id)} className="rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-sm font-bold shrink-0">
                        {(u.first_name?.[0] ?? u.email[0]).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {u.first_name && u.last_name ? `${u.first_name} ${u.last_name}` : u.email}
                        </p>
                        <p className="text-xs text-gray-400 truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${ROLE_CLASS[u.role] ?? 'bg-gray-100 text-gray-600'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(u.is_verified)}`}>
                      {u.is_verified ? 'Active' : 'Unverified'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      {u.is_verified ? (
                        <button onClick={() => suspend(u.user_id)} disabled={busy === u.user_id}
                          className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded hover:bg-amber-200 disabled:opacity-50">
                          Suspend
                        </button>
                      ) : (
                        <button onClick={() => activate(u.user_id)} disabled={busy === u.user_id}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200 disabled:opacity-50">
                          Activate
                        </button>
                      )}
                      <button onClick={() => remove(u.user_id)} disabled={busy === u.user_id}
                        className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200 disabled:opacity-50">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {filtered.length > 0 && (
          <div className="px-6 py-3 border-t border-gray-100 text-sm text-gray-500">
            Showing {filtered.length} of {users.length} users
          </div>
        )}
      </div>
    </div>
  );
}
