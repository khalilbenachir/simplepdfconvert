import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { FileText, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/40 bg-background">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/2 to-primary/5 pointer-events-none" />

      <div className="relative container mx-auto px-4 lg:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-4 group">
              <div className="w-10 h-10 bg-linear-to-br from-primary via-primary to-primary/80 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-md shadow-primary/20">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                SimplePDF<span className="text-primary">Convert</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border/60 bg-background hover:bg-accent hover:border-primary/40 flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border/60 bg-background hover:bg-accent hover:border-primary/40 flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@simplepdfconvert.com"
                className="w-9 h-9 rounded-lg border border-border/60 bg-background hover:bg-accent hover:border-primary/40 flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">
              {t('product')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="relative">
                    {t('home')}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="relative">
                    {t('tools')}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="relative">
                    {t('pricing')}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">
              {t('company')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="relative">
                    {t('about')}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="relative">
                    {t('contact')}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">
              {t('legal')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="relative">
                    {t('privacy')}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                >
                  <span className="relative">
                    {t('terms')}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/40 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {t('copyright', { year: currentYear })}
            </p>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                Made with <span className="text-primary animate-pulse">♥</span> for the web
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
