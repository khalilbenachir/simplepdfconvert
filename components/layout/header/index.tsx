'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { NAV_LINKS } from '@/lib/constants/navigation';
import { SkipLink } from './skip-link';
import { AccentLine } from './accent-line';
import { Logo } from './logo';
import { DesktopNav } from './desktop-nav';
import { DesktopActions } from './desktop-actions';
import { MobileActions } from './mobile-actions';
import { MobileMenu } from './mobile-menu';

export function Header() {
  const t = useTranslations('Navigation');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <SkipLink t={t} />
      <AccentLine />

      <header className="sticky top-0 z-50 border-b border-border/50">
        {/* Glassmorphism background with noise texture */}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-2xl" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(from_var(--primary)_l_c_h/0.1),transparent_50%)] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />

        <nav className="relative container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo t={t} />
            <DesktopNav navLinks={NAV_LINKS} t={t} />
            <DesktopActions t={t} />
            <MobileActions
              mobileMenuOpen={mobileMenuOpen}
              onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
              t={t}
            />
          </div>
        </nav>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
        t={t}
      />
    </>
  );
}
