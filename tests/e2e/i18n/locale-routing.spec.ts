import { test, expect } from '@playwright/test';
import { LOCALES, getLocalePath, navigateToLocale } from '../../fixtures/locale-helpers';

test.describe('Locale Routing', () => {
  test.describe('Valid Locale Routes', () => {
    for (const locale of LOCALES) {
      test(`should load ${locale} locale successfully`, async ({ page }) => {
        await navigateToLocale(page, locale);

        await expect(page).toHaveURL(new RegExp(getLocalePath(locale)));

        const response = await page.goto(getLocalePath(locale));
        expect(response?.status()).toBe(200);
      });

      test(`should have correct HTML lang attribute for ${locale}`, async ({ page }) => {
        await navigateToLocale(page, locale);

        const htmlLang = await page.locator('html').getAttribute('lang');
        expect(htmlLang).toBe(locale);
      });
    }
  });

  test.describe('Default Locale Behavior', () => {
    test('should serve English content at root path /', async ({ page }) => {
      await page.goto('/');

      await expect(page).toHaveURL('/');

      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('en');
    });

    test('should not redirect root path to /en', async ({ page }) => {
      const response = await page.goto('/');

      expect(response?.status()).toBe(200);
      await expect(page).toHaveURL('/');
    });
  });

  test.describe('Invalid Locale Routes', () => {
    test('should return 404 for invalid locale', async ({ page }) => {
      const response = await page.goto('/invalid-locale', { waitUntil: 'domcontentloaded' });

      expect(response?.status()).toBe(404);
    });

    test('should return 404 for unsupported locale like /zh', async ({ page }) => {
      const response = await page.goto('/zh', { waitUntil: 'domcontentloaded' });

      expect(response?.status()).toBe(404);
    });
  });

  test.describe('Locale Path Consistency', () => {
    test('should maintain locale in URL structure', async ({ page }) => {
      await page.goto('/fr');
      await expect(page).toHaveURL('/fr');

      await page.goto('/es');
      await expect(page).toHaveURL('/es');

      await page.goto('/de');
      await expect(page).toHaveURL('/de');
    });
  });
});
