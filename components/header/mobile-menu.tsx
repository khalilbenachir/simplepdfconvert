import { Sparkles } from 'lucide-react';

import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MobileMenuModal } from '@/components/ui/modal';
import type { NavLink } from '@/lib/constants/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  t: (key: string) => string;
}

export function MobileMenu({ isOpen, onClose, navLinks, t }: MobileMenuProps) {
  return (
    <MobileMenuModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-2">
        {navLinks.map((link, index) => (
          <Link
            key={link.key}
            href={link.href}
            className={cn(
              'block px-6 py-4 text-base font-medium text-foreground/85 hover:text-primary focus-visible:text-primary hover:bg-primary/15 focus-visible:bg-primary/15 rounded-2xl transition-all duration-300 border border-transparent hover:border-border/30 focus-visible:border-border/30 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              'animate-slide-in-from-left opacity-0'
            )}
            onClick={onClose}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <span className="flex items-center gap-3">{t(link.key)}</span>
          </Link>
        ))}

        <div className="pt-6 space-y-3">
          <Button
            variant="primary"
            size="sm"
            className="w-full h-14 text-base relative overflow-hidden shadow-xl shadow-primary/40 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            onClick={onClose}
          >
            <div
              className="absolute inset-0 bg-linear-to-r from-primary via-primary-mid to-primary bg-size-[200%_100%] animate-gradient"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full group-focus-visible:translate-x-full transition-transform duration-700"
              aria-hidden="true"
            />
            <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
              {t('getStarted')}
              <Sparkles className="w-5 h-5" aria-hidden="true" />
            </span>
          </Button>
        </div>
      </div>
    </MobileMenuModal>
  );
}
