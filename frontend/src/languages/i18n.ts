import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Dynamic loader: load any JSON files under ./languages/{lang}/*.json
// Vite's import.meta.glob eagerly loads JSON modules
const modules = import.meta.glob('./*/**/*.json', { eager: true }) as Record<string, any>;

// Legacy flat files (keep compatibility if present)
// These imports are optional; bundler will include only if files exist
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import enLegacy from './en.json';
// @ts-ignore
import nlLegacy from './nl.json';
// @ts-ignore
import plLegacy from './pl.json';
// @ts-ignore
import roLegacy from './ro.json';
// @ts-ignore
import ukLegacy from './uk.json';
// @ts-ignore
import ltLegacy from './lt.json';

const resources: Record<string, Record<string, any>> = {};
const namespaces = new Set<string>();

// Build resources from folder structure: ./en/common.json → resources.en.common
Object.entries(modules).forEach(([path, mod]) => {
  // path examples: './en/common.json', './lt/home.json'
  const parts = path.replace(/^\.\//, '').split('/');
  if (parts.length >= 2) {
    const lang = parts[0];
    const file = parts.slice(1).join('/');
    const ns = file.replace(/\.json$/, '');
    resources[lang] = resources[lang] || {};
    resources[lang][ns] = mod.default ?? mod;
    namespaces.add(ns);
  }
});

// Merge in legacy root files under default 'translation' namespace if present
const legacy: Record<string, any> = {
  en: enLegacy,
  nl: nlLegacy,
  pl: plLegacy,
  ro: roLegacy,
  uk: ukLegacy,
  lt: ltLegacy,
};
Object.entries(legacy).forEach(([lang, data]) => {
  if (data) {
    resources[lang] = resources[lang] || {};
    resources[lang]['translation'] = data;
    namespaces.add('translation');
  }
});

// Determine initial language: user preference → browser → fallback
const supportedLangs = Object.keys(resources).length
  ? Object.keys(resources)
  : ['en', 'nl', 'pl', 'ro', 'uk', 'lt'];

function detectInitialLanguage(): string {
  const saved = typeof window !== 'undefined' ? localStorage.getItem('lng') : null;
  if (saved && supportedLangs.includes(saved)) return saved;
  const navLang = typeof navigator !== 'undefined' ? (navigator.language || navigator['userLanguage'] || 'en') : 'en';
  const base = navLang.slice(0, 2).toLowerCase();
  return supportedLangs.includes(base) ? base : 'en';
}

const initialLng = detectInitialLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLng,
    fallbackLng: 'en',
    ns: Array.from(namespaces),
    defaultNS: resources[initialLng]?.common ? 'common' : 'translation',
    interpolation: { escapeValue: false },
  });

// Persist language changes
i18n.on('languageChanged', (lng) => {
  try { localStorage.setItem('lng', lng); } catch {}
});

export default i18n;