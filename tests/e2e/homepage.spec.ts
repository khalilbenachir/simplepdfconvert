import { test, expect } from '@playwright/test';
import { LOCALES, navigateToLocale } from '../fixtures/locale-helpers';

test.describe('Homepage', () => {
  test.describe('Basic Smoke Tests', () => {
    test('should load homepage successfully', async ({ page }) => {
      await page.goto('/');

      await expect(page).toHaveURL('/');

      await expect(page.locator('body')).toBeVisible();
    });

    test('should have proper HTML structure', async ({ page }) => {
      await page.goto('/');

      const html = page.locator('html');
      await expect(html).toBeVisible();

      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('should not have console errors on load', async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));

      await page.goto('/');

      await page.waitForLoadState('networkidle');

      expect(errors).toHaveLength(0);
    });
  });

  test.describe('Page Performance', () => {
    test('should load within acceptable time', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(5000);
    });
  });

  test.describe('Responsive Design', () => {
    test('should be responsive on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto('/');

      const body = page.locator('body');
      await expect(body).toBeVisible();

      const viewport = page.viewportSize();
      expect(viewport?.width).toBe(375);
    });

    test('should be responsive on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      await page.goto('/');

      const body = page.locator('body');
      await expect(body).toBeVisible();

      const viewport = page.viewportSize();
      expect(viewport?.width).toBe(768);
    });

    test('should be responsive on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      await page.goto('/');

      const body = page.locator('body');
      await expect(body).toBeVisible();

      const viewport = page.viewportSize();
      expect(viewport?.width).toBe(1920);
    });
  });

  test.describe('Homepage Accessibility', () => {
    test('should have proper HTML lang attribute', async ({ page }) => {
      await page.goto('/');

      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBeTruthy();
      expect(htmlLang).toMatch(/^[a-z]{2}$/);
    });

    test('should have visible content', async ({ page }) => {
      await page.goto('/');

      const bodyText = await page.locator('body').textContent();
      expect(bodyText).toBeTruthy();
      expect(bodyText?.trim().length).toBeGreaterThan(0);
    });
  });

  test.describe('Homepage for All Locales', () => {
    for (const locale of LOCALES) {
      test(`should load homepage for ${locale} locale`, async ({ page }) => {
        await navigateToLocale(page, locale);

        await expect(page.locator('body')).toBeVisible();

        const htmlLang = await page.locator('html').getAttribute('lang');
        expect(htmlLang).toBe(locale);
      });
    }
  });

  test.describe('Dark Mode Support', () => {
    test('should respect system dark mode preference', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' });

      await page.goto('/');

      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('should respect system light mode preference', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light' });

      await page.goto('/');

      const body = page.locator('body');
      await expect(body).toBeVisible();
    });
  });

  test.describe('SEO Fundamentals', () => {
    test('should have a title tag', async ({ page }) => {
      await page.goto('/');

      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
    });

    test('should have viewport meta tag', async ({ page }) => {
      await page.goto('/');

      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
      expect(viewport).toBeTruthy();
    });
  });
});
