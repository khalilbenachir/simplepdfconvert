import { Page } from '@playwright/test';

export const LOCALES = ['en', 'fr', 'es', 'de'] as const;
export type Locale = typeof LOCALES[number];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
};

export function getLocalePath(locale: Locale, path: string = '/'): string {
  if (locale === 'en') {
    return path === '/' ? '/' : path;
  }
  const localePath = `/${locale}${path === '/' ? '' : path}`;
  return localePath;
}

export async function navigateToLocale(page: Page, locale: Locale, path: string = '/') {
  const fullPath = getLocalePath(locale, path);
  await page.goto(fullPath);
}

export function getExpectedTranslation(locale: Locale, key: string): string {
  const translations: Record<Locale, Record<string, string>> = {
    en: {
      'HomePage.title': 'Simple tools for everyday PDF tasks.',
      'HomePage.subtitle': 'Fast, Free & Fun',
      'HomePage.description': 'Convert, merge, split, and compress your PDFs in seconds. No signup required.',
      'Tools.merge': 'Merge PDF',
      'Tools.compress': 'Compress PDF',
      'Tools.split': 'Split PDF',
      'Tools.pdfToWord': 'PDF to Word',
      'Tools.wordToPdf': 'Word to PDF',
    },
    fr: {
      'HomePage.title': 'Outils simples pour vos tâches PDF quotidiennes.',
      'HomePage.subtitle': 'Rapide, Gratuit & Amusant',
      'HomePage.description': 'Convertissez, fusionnez, divisez et compressez vos PDF en quelques secondes. Aucune inscription requise.',
      'Tools.merge': 'Fusionner PDF',
      'Tools.compress': 'Compresser PDF',
      'Tools.split': 'Diviser PDF',
      'Tools.pdfToWord': 'PDF vers Word',
      'Tools.wordToPdf': 'Word vers PDF',
    },
    es: {
      'HomePage.title': 'Herramientas simples para tareas PDF cotidianas.',
      'HomePage.subtitle': 'Rápido, Gratis y Divertido',
      'HomePage.description': 'Convierte, fusiona, divide y comprime tus PDFs en segundos. No requiere registro.',
      'Tools.merge': 'Fusionar PDF',
      'Tools.compress': 'Comprimir PDF',
      'Tools.split': 'Dividir PDF',
      'Tools.pdfToWord': 'PDF a Word',
      'Tools.wordToPdf': 'Word a PDF',
    },
    de: {
      'HomePage.title': 'Einfache Werkzeuge für alltägliche PDF-Aufgaben.',
      'HomePage.subtitle': 'Schnell, Kostenlos & Spaßig',
      'HomePage.description': 'Konvertieren, zusammenführen, teilen und komprimieren Sie Ihre PDFs in Sekunden. Keine Anmeldung erforderlich.',
      'Tools.merge': 'PDF zusammenführen',
      'Tools.compress': 'PDF komprimieren',
      'Tools.split': 'PDF teilen',
      'Tools.pdfToWord': 'PDF zu Word',
      'Tools.wordToPdf': 'Word zu PDF',
    },
  };

  return translations[locale][key] || key;
}
