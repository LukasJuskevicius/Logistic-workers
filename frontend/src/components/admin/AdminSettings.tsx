import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthCheck } from '../../utils/authCheck';

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'lt', label: 'Lithuanian' },
  { value: 'pl', label: 'Polish' },
  { value: 'nl', label: 'Dutch' },
  { value: 'ro', label: 'Romanian' },
  { value: 'uk', label: 'Ukrainian' },
];

const TIMEZONES = ['Europe/Vilnius', 'Europe/Riga', 'Europe/Tallinn', 'Europe/Warsaw', 'UTC'];
const CURRENCIES = [{ value: 'EUR', label: 'EUR (€)' }, { value: 'USD', label: 'USD ($)' }, { value: 'GBP', label: 'GBP (£)' }];

const NAV_TABS = [
  { id: 'general',       label: 'General',           icon: '⚙️' },
  { id: 'users',         label: 'User Management',   icon: '👥' },
  { id: 'notifications', label: 'Notifications',     icon: '🔔' },
  { id: 'security',      label: 'Security',          icon: '🔒' },
  { id: 'integrations',  label: 'Integrations',      icon: '🔗' },
  { id: 'backup',        label: 'Backup & Recovery', icon: '💾' },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={e => onChange(e.target.checked)} />
      <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white" />
    </label>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Row({ label, description, children }: { label: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      {children}
    </div>
  );
}

const INPUT_CLS = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500';
const SELECT_CLS = `${INPUT_CLS} bg-white`;

const AdminSettings = () => {
  const { isAuthorized } = useAuthCheck('admin');
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'Logistics Workers Platform',
    siteDescription: 'Professional logistics and transportation services',
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    smsNotifications: false,
    autoApproval: false,
    maxFileSize: '10',
    sessionTimeout: '30',
    defaultLanguage: 'en',
    timezone: 'Europe/Vilnius',
    currency: 'EUR',
  });

  useEffect(() => {
    const saved = localStorage.getItem('adminSettings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        i18n.changeLanguage(parsed.defaultLanguage);
      } catch {}
    }
  }, []);

  if (!isAuthorized) return null;

  function set<K extends keyof typeof settings>(key: K, value: typeof settings[K]) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Configure platform settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Nav */}
        <nav className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 space-y-1 h-fit">
          {NAV_TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                activeTab === t.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
              }`}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 space-y-5">

            {activeTab === 'general' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Site Name">
                    <input className={INPUT_CLS} value={settings.siteName}
                      onChange={e => set('siteName', e.target.value)} />
                  </Field>
                  <Field label="Default Language">
                    <select className={SELECT_CLS} value={settings.defaultLanguage}
                      onChange={e => { set('defaultLanguage', e.target.value); i18n.changeLanguage(e.target.value); }}>
                      {LANGUAGES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Site Description">
                  <textarea className={INPUT_CLS} rows={3} value={settings.siteDescription}
                    onChange={e => set('siteDescription', e.target.value)} />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Timezone">
                    <select className={SELECT_CLS} value={settings.timezone}
                      onChange={e => set('timezone', e.target.value)}>
                      {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                    </select>
                  </Field>
                  <Field label="Currency">
                    <select className={SELECT_CLS} value={settings.currency}
                      onChange={e => set('currency', e.target.value)}>
                      {CURRENCIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </Field>
                </div>
              </>
            )}

            {activeTab === 'users' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900">User Management Settings</h2>
                <div className="space-y-3">
                  <Row label="User Registration" description="Allow new users to register on the platform">
                    <Toggle checked={settings.userRegistration} onChange={v => set('userRegistration', v)} />
                  </Row>
                  <Row label="Auto-approve Drivers" description="Automatically approve driver registrations without manual review">
                    <Toggle checked={settings.autoApproval} onChange={v => set('autoApproval', v)} />
                  </Row>
                </div>
                <Field label="Session Timeout (minutes)">
                  <input type="number" className={`${INPUT_CLS} w-40`} value={settings.sessionTimeout}
                    onChange={e => set('sessionTimeout', e.target.value)} />
                </Field>
              </>
            )}

            {activeTab === 'notifications' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
                <div className="space-y-3">
                  <Row label="Email Notifications" description="Send notifications via email">
                    <Toggle checked={settings.emailNotifications} onChange={v => set('emailNotifications', v)} />
                  </Row>
                  <Row label="SMS Notifications" description="Send notifications via SMS">
                    <Toggle checked={settings.smsNotifications} onChange={v => set('smsNotifications', v)} />
                  </Row>
                </div>
              </>
            )}

            {activeTab === 'security' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span>⚠️</span>
                    <h3 className="text-sm font-semibold text-amber-800">Maintenance Mode</h3>
                  </div>
                  <p className="text-sm text-amber-700 mb-3">Enable maintenance mode to temporarily disable public access to the platform.</p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={settings.maintenanceMode}
                      onChange={e => set('maintenanceMode', e.target.checked)}
                      className="w-4 h-4 rounded" />
                    <span className="text-sm font-medium text-amber-800">Enable Maintenance Mode</span>
                  </label>
                </div>
                <Field label="Maximum File Upload Size (MB)">
                  <input type="number" className={`${INPUT_CLS} w-40`} value={settings.maxFileSize}
                    onChange={e => set('maxFileSize', e.target.value)} />
                </Field>
              </>
            )}

            {activeTab === 'integrations' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900">Third-party Integrations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Google Maps API', status: 'Connected', icon: '🗺️', ok: true },
                    { name: 'Payment Gateway', status: 'Not Connected', icon: '💳', ok: false },
                    { name: 'Email Service', status: 'Connected', icon: '📧', ok: true },
                    { name: 'SMS Gateway', status: 'Not Connected', icon: '📱', ok: false },
                  ].map(i => (
                    <div key={i.name} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{i.icon}</span>
                        <p className="text-sm font-medium text-gray-900">{i.name}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${i.ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {i.status}
                        </span>
                        <button className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                          Configure
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'backup' && (
              <>
                <h2 className="text-lg font-semibold text-gray-900">Backup & Recovery</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-900 mb-1">💾 Automated Backups</h3>
                  <p className="text-sm text-blue-700 mb-3">Last backup: Today at 03:00 AM</p>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 font-medium">
                    Create Backup Now
                  </button>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Backups</h3>
                  <div className="space-y-2">
                    {[
                      { date: '2024-01-20 03:00', size: '2.3 GB' },
                      { date: '2024-01-19 03:00', size: '2.2 GB' },
                      { date: '2024-01-18 03:00', size: '2.1 GB' },
                    ].map(b => (
                      <div key={b.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{b.date}</p>
                          <p className="text-xs text-gray-500">Size: {b.size}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Success</span>
                          <button className="text-xs px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">Download</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-end gap-3">
            {saved && <span className="text-sm text-green-600 font-medium">✓ Saved</span>}
            <button onClick={handleSave}
              className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              💾 Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
