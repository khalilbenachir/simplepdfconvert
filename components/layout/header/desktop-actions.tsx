import { Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

interface DesktopActionsProps {
  t: (key: string) => string;
}

export function DesktopActions({ t }: DesktopActionsProps) {
  return (
    <div className="hidden lg:flex items-center gap-3">
      <div className="flex items-center gap-2 px-2 py-1 rounded-xl bg-accent/30 border border-border/50">
        <LanguageSwitcher />
        <div className="w-px h-5 bg-border/60" />
        <ThemeSwitcher />
      </div>

      <Button
        variant="primary"
        size="sm"
        className="relative cursor-pointer px-6 h-10 font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 focus-visible:shadow-xl focus-visible:shadow-primary/40 transition-all duration-300 overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 bg-linear-to-r from-primary via-primary-mid to-primary bg-size-[200%_100%] animate-gradient"
          aria-hidden="true"
        />

        {/* Shimmer effect */}
        <div
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full group-focus-visible:translate-x-full transition-transform duration-700"
          aria-hidden="true"
        />

        <span className="relative z-10 flex items-center gap-2">
          {t('getStarted')}
          <Sparkles
            className="w-4 h-4 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
        </span>
      </Button>
    </div>
  );
}
