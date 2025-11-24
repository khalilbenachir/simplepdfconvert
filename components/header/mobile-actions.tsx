import { Menu } from 'lucide-react';

import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

interface MobileActionsProps {
  mobileMenuOpen: boolean;
  onToggle: () => void;
  t: (key: string) => string;
}

export function MobileActions({ mobileMenuOpen, onToggle, t }: MobileActionsProps) {
  return (
    <div className="flex lg:hidden items-center gap-2">
      <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-accent/30 border border-border/50">
        <LanguageSwitcher />
        <div className="w-px h-5 bg-border/60" />
        <ThemeSwitcher />
      </div>

      <button
        onClick={onToggle}
        className="p-2.5 text-foreground/85 hover:text-foreground focus-visible:text-foreground hover:bg-accent/60 focus-visible:bg-accent/60 rounded-xl transition-all duration-300 border border-transparent hover:border-border/50 focus-visible:border-border/50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label={t('toggleMenu')}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <Menu className="w-6 h-6" aria-hidden="true" />
      </button>
    </div>
  );
}
