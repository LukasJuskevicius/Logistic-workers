import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import en from '../../languages/en.json';
import lt from '../../languages/lt.json';
import nl from '../../languages/nl.json';
import pl from '../../languages/pl.json';
import ro from '../../languages/ro.json';
import uk from '../../languages/uk.json';

const LANGUAGES: Record<string, { label: string; flag: string; base: Record<string, unknown> }> = {
  en: { label: 'English',    flag: '🇺🇸', base: en as Record<string, unknown> },
  lt: { label: 'Lithuanian', flag: '🇱🇹', base: lt as Record<string, unknown> },
  nl: { label: 'Dutch',      flag: '🇳🇱', base: nl as Record<string, unknown> },
  pl: { label: 'Polish',     flag: '🇵🇱', base: pl as Record<string, unknown> },
  ro: { label: 'Romanian',   flag: '🇷🇴', base: ro as Record<string, unknown> },
  uk: { label: 'Ukrainian',  flag: '🇺🇦', base: uk as Record<string, unknown> },
};

const STORAGE_KEY = 'adminLanguageOverrides';

function flatten(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  return Object.keys(obj).reduce((acc, key) => {
    if (key.startsWith('_')) return acc; // skip comment keys
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(acc, flatten(val as Record<string, unknown>, fullKey));
    } else {
      acc[fullKey] = Array.isArray(val) ? val.join(', ') : String(val ?? '');
    }
    return acc;
  }, {} as Record<string, string>);
}

type Overrides = Record<string, Record<string, string>>;

function loadOverrides(): Overrides {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}'); }
  catch { return {}; }
}

export default function AdminLanguageEditor() {
  const { i18n } = useTranslation();
  const [activeLang, setActiveLang] = useState('en');
  const [search, setSearch] = useState('');
  const [overrides, setOverrides] = useState<Overrides>(loadOverrides);
  const [saved, setSaved] = useState(false);

  const basePairs = useMemo(
    () => flatten(LANGUAGES[activeLang].base),
    [activeLang]
  );

  const currentOverrides = overrides[activeLang] ?? {};

  const pairs = useMemo(() => {
    const q = search.toLowerCase();
    return Object.entries(basePairs).filter(
      ([k, v]) => !q || k.toLowerCase().includes(q) || v.toLowerCase().includes(q) ||
        (currentOverrides[k] ?? '').toLowerCase().includes(q)
    );
  }, [basePairs, search, currentOverrides]);

  function setValue(key: string, value: string) {
    setOverrides(prev => ({
      ...prev,
      [activeLang]: { ...(prev[activeLang] ?? {}), [key]: value },
    }));
  }

  function resetKey(key: string) {
    setOverrides(prev => {
      const lang = { ...(prev[activeLang] ?? {}) };
      delete lang[key];
      return { ...prev, [activeLang]: lang };
    });
  }

  function saveAll() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    // Push all overrides into the running i18n instance
    for (const [lang, entries] of Object.entries(overrides)) {
      if (Object.keys(entries).length === 0) continue;
      // Rebuild a nested object from flat keys and add it as a resource bundle
      const nested: Record<string, unknown> = {};
      for (const [flatKey, val] of Object.entries(entries)) {
        const parts = flatKey.split('.');
        let cur = nested;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!cur[parts[i]]) cur[parts[i]] = {};
          cur = cur[parts[i]] as Record<string, unknown>;
        }
        cur[parts[parts.length - 1]] = val;
      }
      i18n.addResourceBundle(lang, 'translation', nested, true, true);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const modifiedCount = Object.keys(currentOverrides).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Language Editor</h1>
          <p className="text-sm text-gray-500 mt-1">Edit UI text for all supported languages</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-green-600 font-medium">✓ Saved</span>}
          {modifiedCount > 0 && (
            <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
              {modifiedCount} unsaved change{modifiedCount !== 1 ? 's' : ''}
            </span>
          )}
          <button onClick={saveAll}
            className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">
            Save Changes
          </button>
        </div>
      </div>

      {/* Language tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(LANGUAGES).map(([code, lang]) => {
          const modified = Object.keys(overrides[code] ?? {}).length;
          return (
            <button key={code} onClick={() => { setActiveLang(code); setSearch(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeLang === code
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}>
              <span>{lang.flag}</span>
              {lang.label}
              {modified > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                  activeLang === code ? 'bg-indigo-500 text-white' : 'bg-amber-100 text-amber-700'
                }`}>
                  {modified}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search + table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            {pairs.length} keys {search ? `matching "${search}"` : 'total'}
          </p>
          <input
            type="text"
            placeholder="Search keys or values…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="overflow-y-auto max-h-[520px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="px-5 py-3 w-2/5">Key</th>
                <th className="px-5 py-3 w-[30%]">Default (EN)</th>
                <th className="px-5 py-3">Translation</th>
                <th className="px-5 py-3 w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pairs.map(([key, defaultVal]) => {
                const override = currentOverrides[key];
                const isModified = override !== undefined && override !== basePairs[key];
                const displayVal = activeLang === 'en' ? defaultVal : (basePairs[key] ?? defaultVal);
                return (
                  <tr key={key} className={isModified ? 'bg-amber-50' : 'hover:bg-gray-50'}>
                    <td className="px-5 py-2.5">
                      <code className="text-xs text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-mono break-all">
                        {key}
                      </code>
                    </td>
                    <td className="px-5 py-2.5 text-gray-400 text-xs max-w-[200px] truncate" title={en[key as keyof typeof en] as string ?? defaultVal}>
                      {(en as Record<string, unknown>)[key.split('.')[0]] !== undefined
                        ? flatten(en as Record<string, unknown>)[key] ?? defaultVal
                        : defaultVal}
                    </td>
                    <td className="px-5 py-2.5">
                      <input
                        type="text"
                        value={override ?? displayVal}
                        onChange={e => setValue(key, e.target.value)}
                        className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          isModified ? 'border-amber-300 bg-amber-50' : 'border-gray-200'
                        }`}
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      {isModified && (
                        <button onClick={() => resetKey(key)}
                          title="Reset to default"
                          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors text-lg">
                          ↩
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
