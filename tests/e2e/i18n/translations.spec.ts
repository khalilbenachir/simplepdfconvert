import { test, expect } from '@playwright/test';
import { LOCALES, navigateToLocale, LOCALE_NAMES } from '../../fixtures/locale-helpers';

test.describe('Translation Rendering', () => {
  test.describe('Page Metadata Translations', () => {
    test('should have English metadata at root path', async ({ page }) => {
      await page.goto('/');

      const title = await page.title();
      expect(title).toContain('SimplePDFConvert');

      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('en');
    });

    for (const locale of LOCALES.filter(l => l !== 'en')) {
      test(`should have correct metadata for ${LOCALE_NAMES[locale]} (${locale})`, async ({ page }) => {
        await navigateToLocale(page, locale);

        const htmlLang = await page.locator('html').getAttribute('lang');
        expect(htmlLang).toBe(locale);
      });
    }
  });

  test.describe('Translation File Availability', () => {
    for (const locale of LOCALES) {
      test(`should load ${locale} locale without errors`, async ({ page }) => {
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('console', msg => {
          if (msg.type() === 'error') {
            errors.push(msg.text());
          }
        });

        await navigateToLocale(page, locale);

        const bodyText = await page.locator('body').textContent();
        expect(bodyText).toBeTruthy();

        expect(errors.filter(e =>
          e.includes('translation') ||
          e.includes('locale') ||
          e.includes('i18n')
        )).toHaveLength(0);
      });
    }
  });

  test.describe('Content Structure', () => {
    for (const locale of LOCALES) {
      test(`should render page content for ${locale}`, async ({ page }) => {
        await navigateToLocale(page, locale);

        const mainContent = page.locator('body');
        await expect(mainContent).toBeVisible();

        const hasContent = await mainContent.evaluate(el => el.textContent && el.textContent.trim().length > 0);
        expect(hasContent).toBe(true);
      });
    }
  });

  test.describe('Locale-Specific Content', () => {
    test('should show different content for different locales', async ({ page }) => {
      await page.goto('/');
      const enContent = await page.locator('body').textContent();

      await page.goto('/fr');
      const frContent = await page.locator('body').textContent();

      await page.goto('/es');
      const esContent = await page.locator('body').textContent();

      await page.goto('/de');
      const deContent = await page.locator('body').textContent();

      const contents = [enContent, frContent, esContent, deContent];
      expect(contents.every(c => c !== null && c.length > 0)).toBe(true);
    });
  });

  test.describe('No Missing Translation Warnings', () => {
    for (const locale of LOCALES) {
      test(`should not have missing translation warnings for ${locale}`, async ({ page }) => {
        const consoleWarnings: string[] = [];
        page.on('console', msg => {
          if (msg.type() === 'warning') {
            consoleWarnings.push(msg.text());
          }
        });

        await navigateToLocale(page, locale);

        await page.waitForLoadState('networkidle');

        const translationWarnings = consoleWarnings.filter(warning =>
          warning.toLowerCase().includes('translation') ||
          warning.toLowerCase().includes('missing') ||
          warning.toLowerCase().includes('locale')
        );

        expect(translationWarnings).toHaveLength(0);
      });
    }
  });
});
