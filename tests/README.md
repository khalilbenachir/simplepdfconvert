# SimplePDFConvert E2E Testing

This directory contains end-to-end (E2E) tests for SimplePDFConvert using Playwright with comprehensive internationalization (i18n) coverage.

## 📁 Test Structure

```
tests/
├── e2e/
│   ├── i18n/
│   │   ├── locale-routing.spec.ts      # Tests for locale URL routing
│   │   ├── translations.spec.ts        # Tests for translation rendering
│   │   └── locale-persistence.spec.ts  # Tests for locale persistence
│   └── homepage.spec.ts                # Homepage smoke tests
├── fixtures/
│   └── locale-helpers.ts               # Shared i18n test utilities
└── README.md                           # This file
```

## 🧪 Test Coverage

### Internationalization Tests

#### 1. **Locale Routing** (`i18n/locale-routing.spec.ts`)
- ✅ Valid locale routes (/, /fr, /es, /de)
- ✅ HTML lang attribute verification
- ✅ Default locale behavior (English at root)
- ✅ Invalid locale 404 handling
- ✅ Locale path consistency

#### 2. **Translation Rendering** (`i18n/translations.spec.ts`)
- ✅ Page metadata translations
- ✅ Translation file availability
- ✅ Content structure per locale
- ✅ Locale-specific content verification
- ✅ No missing translation warnings

#### 3. **Locale Persistence** (`i18n/locale-persistence.spec.ts`)
- ✅ URL-based locale persistence
- ✅ HTML lang attribute persistence
- ✅ Locale switching between languages
- ✅ Page reload locale persistence
- ✅ Direct URL access
- ✅ Browser navigation (back/forward)

### General Tests

#### 4. **Homepage Tests** (`homepage.spec.ts`)
- ✅ Basic smoke tests
- ✅ HTML structure validation
- ✅ Console error detection
- ✅ Page performance
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Accessibility fundamentals
- ✅ Dark mode support
- ✅ SEO fundamentals

## 🚀 Running Tests

### Prerequisites

1. **Node.js**: Version >= 20.9.0 required
2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Install Playwright browsers**:
   ```bash
   pnpm exec playwright install
   ```

### Test Commands

```bash
# Run all tests
pnpm test:e2e

# Run tests in interactive UI mode
pnpm test:e2e:ui

# Run tests with visible browser
pnpm test:e2e:headed

# Run tests in debug mode
pnpm test:e2e:debug

# Show last test report
pnpm test:e2e:report
```

### Run Specific Tests

```bash
# Run only i18n tests
pnpm test:e2e tests/e2e/i18n

# Run only locale routing tests
pnpm test:e2e tests/e2e/i18n/locale-routing.spec.ts

# Run only homepage tests
pnpm test:e2e tests/e2e/homepage.spec.ts

# Run specific test by name
pnpm test:e2e -g "should load homepage successfully"
```

### Run Tests for Specific Browser

```bash
# Run in Chrome
pnpm test:e2e --project=chromium

# Run in Firefox
pnpm test:e2e --project=firefox

# Run in Safari
pnpm test:e2e --project=webkit

# Run in mobile browsers
pnpm test:e2e --project="Mobile Chrome"
pnpm test:e2e --project="Mobile Safari"
```

## 🌍 Supported Locales

The tests cover all 4 supported locales:

- 🇬🇧 **English (en)** - Default locale at `/`
- 🇫🇷 **French (fr)** - Available at `/fr`
- 🇪🇸 **Spanish (es)** - Available at `/es`
- 🇩🇪 **German (de)** - Available at `/de`

## 🛠️ Configuration

Playwright configuration is defined in [`playwright.config.ts`](../playwright.config.ts):

- **Base URL**: `http://localhost:3000`
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Test timeout**: Default Playwright timeout
- **Retries**: 2 retries in CI, 0 locally
- **Screenshots**: Captured on failure
- **Traces**: Enabled on first retry
- **Web Server**: Automatically starts dev server before tests

## 📝 Writing New Tests

### Using Locale Helpers

```typescript
import { LOCALES, navigateToLocale, getExpectedTranslation } from '../fixtures/locale-helpers';

test('my i18n test', async ({ page }) => {
  // Navigate to French locale
  await navigateToLocale(page, 'fr');

  // Get expected translation
  const expectedTitle = getExpectedTranslation('fr', 'HomePage.title');

  // Assert translation
  await expect(page.getByText(expectedTitle)).toBeVisible();
});
```

### Testing All Locales

```typescript
import { LOCALES } from '../fixtures/locale-helpers';

for (const locale of LOCALES) {
  test(`should work for ${locale}`, async ({ page }) => {
    await navigateToLocale(page, locale);
    // Your assertions...
  });
}
```

## 🔍 Debugging Tests

### Visual Debugging

```bash
# Open Playwright Inspector
pnpm test:e2e:debug

# Open Playwright UI
pnpm test:e2e:ui
```

### Traces

When tests fail, traces are automatically captured. View them with:

```bash
pnpm exec playwright show-trace test-results/path-to-trace.zip
```

### Screenshots

Screenshots are automatically captured on failure in `test-results/` directory.

## 🎯 Best Practices

1. **Test Independence**: Each test should be independent and not rely on other tests
2. **Locale Coverage**: Always test new features across all locales
3. **Avoid Flakiness**: Use Playwright's built-in waiting mechanisms
4. **Descriptive Names**: Use clear, descriptive test names
5. **Group Related Tests**: Use `test.describe()` to group related tests

## 📊 CI/CD Integration

The test configuration is CI-ready:

- Automatically starts dev server before tests
- Runs with 2 retries in CI environment
- Uses single worker for stability in CI
- Generates HTML report for CI artifacts

### Example GitHub Actions

```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm exec playwright install --with-deps
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 🐛 Troubleshooting

### Tests Not Starting

**Issue**: `Error: Process from config.webServer was not able to start`

**Solution**: Ensure Node.js >= 20.9.0 and dev server starts successfully:
```bash
pnpm dev
```

### Browser Not Found

**Issue**: `browserType.launch: Executable doesn't exist`

**Solution**: Install browsers:
```bash
pnpm exec playwright install
```

### Port Already in Use

**Issue**: Port 3000 is already in use

**Solution**: Either:
- Stop the process using port 3000
- Or set `reuseExistingServer: true` in config (already enabled)

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [next-intl Documentation](https://next-intl-docs.vercel.app)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
