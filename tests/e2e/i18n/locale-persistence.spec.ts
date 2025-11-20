import { test, expect } from '@playwright/test';
import { LOCALES, getLocalePath, navigateToLocale } from '../../fixtures/locale-helpers';

test.describe('Locale Persistence', () => {
  test.describe('URL-based Locale Persistence', () => {
    for (const locale of LOCALES) {
      test(`should maintain ${locale} locale in URL after navigation`, async ({ page }) => {
        await navigateToLocale(page, locale);

        const currentUrl = page.url();
        expect(currentUrl).toContain(getLocalePath(locale));

        const htmlLang = await page.locator('html').getAttribute('lang');
        expect(htmlLang).toBe(locale);
      });
    }
  });

  test.describe('Locale in HTML Attribute', () => {
    test('should persist locale in HTML lang attribute', async ({ page }) => {
      await page.goto('/fr');
      let htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('fr');

      await page.goto('/es');
      htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('es');

      await page.goto('/de');
      htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('de');

      await page.goto('/');
      htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('en');
    });
  });

  test.describe('Locale Switching', () => {
    test('should switch between locales correctly', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveURL('/');
      let htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('en');

      await page.goto('/fr');
      await expect(page).toHaveURL('/fr');
      htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('fr');

      await page.goto('/es');
      await expect(page).toHaveURL('/es');
      htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('es');

      await page.goto('/');
      await expect(page).toHaveURL('/');
      htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('en');
    });

    test('should handle rapid locale switching', async ({ page }) => {
      const locales: typeof LOCALES[number][] = ['en', 'fr', 'es', 'de', 'en'];

      for (const locale of locales) {
        await navigateToLocale(page, locale);
        const htmlLang = await page.locator('html').getAttribute('lang');
        expect(htmlLang).toBe(locale);
      }
    });
  });

  test.describe('Page Reload Locale Persistence', () => {
    for (const locale of LOCALES) {
      test(`should maintain ${locale} locale after page reload`, async ({ page }) => {
        await navigateToLocale(page, locale);

        const urlBeforeReload = page.url();
        const langBeforeReload = await page.locator('html').getAttribute('lang');

        await page.reload();

        const urlAfterReload = page.url();
        const langAfterReload = await page.locator('html').getAttribute('lang');

        expect(urlAfterReload).toBe(urlBeforeReload);
        expect(langAfterReload).toBe(langBeforeReload);
        expect(langAfterReload).toBe(locale);
      });
    }
  });

  test.describe('Direct URL Access', () => {
    test('should respect locale when accessing URL directly', async ({ page }) => {
      await page.goto('/fr');
      await expect(page).toHaveURL('/fr');
      let htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('fr');

      await page.goto('/es');
      await expect(page).toHaveURL('/es');
      htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('es');
    });

    test('should handle root path as English locale', async ({ page }) => {
      await page.goto('/');

      await expect(page).toHaveURL('/');

      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('en');
    });
  });

  test.describe('Browser Navigation', () => {
    test('should maintain locale when using browser back/forward', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveURL('/');

      await page.goto('/fr');
      await expect(page).toHaveURL('/fr');
      let htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('fr');

      await page.goto('/es');
      await expect(page).toHaveURL('/es');
      htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('es');

      await page.goBack();
      await expect(page).toHaveURL('/fr');
      htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('fr');

      await page.goBack();
      await expect(page).toHaveURL('/');
      htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('en');

      await page.goForward();
      await expect(page).toHaveURL('/fr');
      htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('fr');
    });
  });
});
