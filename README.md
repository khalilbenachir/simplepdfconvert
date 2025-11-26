# SimplePDFConvert

**Simple tools for everyday PDF tasks.**

SimplePDFConvert is a fun & fast SaaS platform for handling PDFs online. Built with modern web technologies to provide a seamless and delightful user experience.

## Features

The platform provides 5 core MVP tools:

1. **Merge PDF** - Combine multiple PDF files into one
2. **Compress PDF** - Reduce PDF file size without losing quality
3. **Split PDF** - Split a PDF into separate pages or sections
4. **PDF → Word** - Convert PDF documents to Word format
5. **Word → PDF** - Convert Word documents to PDF format

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript 5**
- **Tailwind CSS 4** with PostCSS
- **pnpm** (v10.0.0+) - Package manager
- **Geist Font** - Typography (Sans & Mono)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm 10.0.0 or later

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### Build

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

### Linting

```bash
# Run ESLint
pnpm lint
```

## Project Structure

```
simplepdfconvert/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout with fonts
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles (Tailwind CSS 4)
├── public/              # Static assets
├── CLAUDE.md            # Development guidelines
└── package.json         # Dependencies
```

## Brand Identity

- **Style:** Fun & Fast
- **Tone:** Friendly and approachable
- **Primary Color:** #FF4C4C
- **Tagline:** "Simple tools for everyday PDF tasks."

## Development Guidelines

- Use pnpm for all package management
- TypeScript strict mode is enabled
- Path alias `@/` is configured for cleaner imports
- Dark mode is automatically handled via CSS media queries
- No unnecessary comments - prefer self-documenting code

## Roadmap

- **Phase 1:** Launch MVP with 5 tools ✅
- **Phase 2:** Add cloud storage (S3/R2) and async job queue
- **Phase 3:** AI features (OCR, PDF summarization)
- **Phase 4:** User accounts + billing
- **Phase 5:** Desktop app or public API

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Deployment

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT
