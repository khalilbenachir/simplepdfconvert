# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SimplePDFConvert** is a fun & fast SaaS for handling PDFs online. The platform provides 5 core MVP tools:

1. Merge PDF
2. Compress PDF
3. Split PDF
4. PDF → Word
5. Word → PDF

**Brand Identity:**
- Style: Fun & Fast
- Tone: Friendly and approachable
- Primary Color: #FF4C4C
- Tagline: "Simple tools for everyday PDF tasks."

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript 5**
- **Tailwind CSS 4** with PostCSS
- **pnpm** (v10.0.0+) - Package manager
- **Next-Intl** - Internationalization (to be integrated)
- **shadcn/ui** - UI components (to be integrated)
- **Prisma** - ORM + PostgreSQL (to be integrated)
- **Inngest** - Background job processing (to be integrated)
- **Geist Font** - Google Fonts (Sans & Mono)
- Deployment: Vercel

## Common Commands

```bash
# Development
pnpm dev              # Start dev server at http://localhost:3000

# Build & Production
pnpm build            # Create production build
pnpm start            # Start production server

# Linting
pnpm lint             # Run ESLint with Next.js config

# Package Management
pnpm install          # Install dependencies
pnpm add <package>    # Add dependency
pnpm add -D <package> # Add dev dependency
```

## Architecture Notes

### App Router Structure

This project uses Next.js 16 App Router with the following conventions:

- `app/` - App directory with file-based routing
- `app/layout.tsx` - Root layout with font configuration
- `app/page.tsx` - Homepage
- `app/globals.css` - Global styles with Tailwind CSS 4 import

### Styling System

**Tailwind CSS 4** is configured with:
- PostCSS plugin: `@tailwindcss/postcss`
- CSS variables for theming (`--background`, `--foreground`)
- Inline `@theme` directive for custom theme tokens
- Dark mode support via `prefers-color-scheme`
- Custom font variables: `--font-geist-sans` and `--font-geist-mono`

**Important:** Tailwind CSS 4 uses `@import "tailwindcss"` instead of `@tailwind` directives.

### TypeScript Configuration

- Path alias: `@/*` maps to project root
- JSX runtime: `react-jsx` (automatic)
- Target: ES2017
- Strict mode enabled
- Next.js TypeScript plugin enabled

### Font Loading

Uses `next/font/google` with:
- Geist Sans (variable: `--font-geist-sans`)
- Geist Mono (variable: `--font-geist-mono`)
- Subset: latin
- Applied via className variables in root layout

## Planned Features Implementation

### next-intl Integration

When integrating internationalization:
- Wrap App Router with `next-intl` middleware
- Create `messages/` directory with locale JSON files (e.g., `en.json`, `fr.json`)
- Use `[locale]` dynamic route segment: `app/[locale]/`
- Server Components: Import translations directly
- Client Components: Use `useTranslations()` hook

### shadcn/ui Setup

Component library guidelines:
- Install via CLI and add components as needed
- Override theme colors to match brand (#FF4C4C primary)
- Maintain fun & fast animation aesthetic
- Common components needed: Button, Card, Dropzone, Dialog

### Prisma Schema Design

Recommended models:
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  files     File[]
  jobs      Job[]
  createdAt DateTime @default(now())
}

model File {
  id        String   @id @default(cuid())
  filename  String
  size      Int
  mimeType  String
  userId    String?
  user      User?    @relation(fields: [userId], references: [id])
  jobs      Job[]
  createdAt DateTime @default(now())
}

model Job {
  id        String   @id @default(cuid())
  type      String   // "merge" | "compress" | "split" | "pdf-to-word" | "word-to-pdf"
  status    String   // "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED"
  userId    String?
  user      User?    @relation(fields: [userId], references: [id])
  files     File[]
  resultUrl String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Inngest Background Jobs

Structure for async PDF processing:
- Create `inngest/` directory for job functions
- Each tool gets its own Inngest function
- Job workflow: PENDING → PROCESSING → COMPLETED/FAILED
- Example function signature:
  ```typescript
  export const mergePdf = inngest.createFunction(
    { id: "merge-pdf" },
    { event: "pdf/merge.requested" },
    async ({ event, step }) => {
      // Processing logic
    }
  );
  ```

### API Routes Structure

```
app/api/
  tools/
    merge/route.ts         # POST: Merge multiple PDFs
    compress/route.ts      # POST: Compress PDF
    split/route.ts         # POST: Split PDF into pages
    pdf-to-word/route.ts   # POST: Convert PDF to Word
    word-to-pdf/route.ts   # POST: Convert Word to PDF
```

Each endpoint should:
- Accept `multipart/form-data` for file uploads
- Validate file size and MIME type
- Enqueue Inngest job
- Return job ID for status polling

## Security Guidelines

- File size limits: Enforce maximum upload size (e.g., 25MB)
- MIME type validation: Only accept PDF, DOCX, DOC formats
- Automatic cleanup: Delete temporary files after processing
- Secure download URLs: Use signed URLs with expiration
- GDPR compliance: Allow users to delete their data

## Development Workflow

1. Use pnpm for all package management
2. Run `pnpm dev` for hot-reload development
3. ESLint is configured with Next.js recommended rules
4. TypeScript strict mode is enabled
5. Use path alias `@/` for cleaner imports
6. Dark mode is automatically handled via CSS media queries

## Coding Standards

- **No unnecessary comments:** Don't add comments that simply restate what the code does. Only add comments where the logic isn't self-evident or requires explanation of complex business logic.
- **Self-documenting code:** Prefer clear variable and function names over explanatory comments.
- **Avoid redundant documentation:** Don't add docstrings, type annotations, or comments to code you didn't change.

## Future Roadmap

- **Phase 1:** Launch MVP with 5 tools (current)
- **Phase 2:** Add cloud storage (S3/R2) and async job queue
- **Phase 3:** AI features (OCR, PDF summarization)
- **Phase 4:** User accounts + billing
- **Phase 5:** Desktop app or public API
