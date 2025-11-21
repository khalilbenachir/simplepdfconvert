'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Menu, Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { MobileMenuModal } from '@/components/ui/modal';
import { NAV_LINKS } from '@/lib/constants/navigation';

export function Header() {
  const t = useTranslations('Navigation');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Premium accent line */}
      <div className="h-0.5 bg-linear-to-r from-transparent via-primary to-transparent" aria-hidden="true" role="presentation" />

      <header className="sticky top-0 z-50 border-b border-border/50">
        {/* Glassmorphism background with noise texture */}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-2xl" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(from_var(--primary)_l_c_h/0.1),transparent_50%)] pointer-events-none" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />

        <nav className="relative container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Premium Logo */}
            <Link href="/" className="flex items-center gap-3 group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl">
              {/* Glow effect on hover */}
              <div className="absolute -inset-2 bg-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 blur-xl transition-all duration-500" aria-hidden="true" />

              <div className="relative">
                <div className="w-11 h-11 bg-linear-to-br from-primary via-primary-mid to-primary/90 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:-rotate-2 group-focus-visible:scale-105 group-focus-visible:-rotate-2 shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/40 group-focus-visible:shadow-xl group-focus-visible:shadow-primary/40">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 transition-transform duration-500 group-hover:scale-110"
                    role="img"
                    aria-label="SimplePDFConvert logo"
                  >
                    <title>SimplePDFConvert</title>
                    <rect x="3" y="2" width="14" height="16" rx="2" stroke="white" strokeWidth="1.5" />
                    <line x1="6" y1="6" x2="14" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="6" y1="10" x2="14" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="6" y1="14" x2="11" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>

                  {/* Inner shine effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-transparent rounded-2xl opacity-60" aria-hidden="true" />
                  <div className="absolute inset-0 bg-linear-to-tl from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                </div>

                {/* Decorative corner accent */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" aria-hidden="true" />
              </div>

              <div className="relative">
                <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/80">
                  SimplePDF<span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-primary-mid">Convert</span>
                </span>
                {/* Subtle underline decoration */}
                <div className="absolute -bottom-1 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="relative px-5 py-2.5 text-[15px] font-medium text-foreground/85 hover:text-primary focus-visible:text-primary transition-all duration-300 rounded-xl hover:bg-primary/15 focus-visible:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 group overflow-hidden"
                  style={{
                    transitionDelay: `${index * 30}ms`,
                  }}
                >
                  {/* Hover background shimmer */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full group-focus-visible:translate-x-full transition-transform duration-700" aria-hidden="true" />

                  <span className="relative z-10">{t(link.key)}</span>

                  {/* Active indicator dot */}
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100 group-focus-visible:scale-100" aria-hidden="true" />
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-2 px-2 py-1 rounded-xl bg-accent/30 border border-border/50">
                <LanguageSwitcher />
                <div className="w-px h-5 bg-border/60" />
                <ThemeSwitcher />
              </div>

              <Button
                variant="primary"
                size="sm"
                className="relative px-6 h-10 font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 focus-visible:shadow-xl focus-visible:shadow-primary/40 transition-all duration-300 overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-linear-to-r from-primary via-primary-mid to-primary bg-size-[200%_100%] animate-gradient" aria-hidden="true" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full group-focus-visible:translate-x-full transition-transform duration-700" aria-hidden="true" />

                <span className="relative z-10 flex items-center gap-2">
                  {t('getStarted')}
                  <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                </span>
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-accent/30 border border-border/50">
                <LanguageSwitcher />
                <div className="w-px h-5 bg-border/60" />
                <ThemeSwitcher />
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-foreground/85 hover:text-foreground focus-visible:text-foreground hover:bg-accent/60 focus-visible:bg-accent/60 rounded-xl transition-all duration-300 border border-transparent hover:border-border/50 focus-visible:border-border/50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Modal */}
      <MobileMenuModal isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <div className="space-y-2">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.key}
              href={link.href}
              className={cn(
                'block px-6 py-4 text-base font-medium text-foreground/85 hover:text-primary focus-visible:text-primary hover:bg-primary/15 focus-visible:bg-primary/15 rounded-2xl transition-all duration-300 border border-transparent hover:border-border/30 focus-visible:border-border/30 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                'animate-slide-in-from-left opacity-0'
              )}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <span className="flex items-center gap-3">
                {t(link.key)}
              </span>
            </Link>
          ))}

          <div className="pt-6 space-y-3">
            <Button
              variant="primary"
              size="sm"
              className="w-full h-14 text-base relative overflow-hidden shadow-xl shadow-primary/40 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary via-primary-mid to-primary bg-size-[200%_100%] animate-gradient" aria-hidden="true" />
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full group-focus-visible:translate-x-full transition-transform duration-700" aria-hidden="true" />
              <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                {t('getStarted')}
                <Sparkles className="w-5 h-5" aria-hidden="true" />
              </span>
            </Button>
          </div>
        </div>
      </MobileMenuModal>
    </>
  );
}
