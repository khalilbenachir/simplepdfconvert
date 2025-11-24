'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/lib/navigation';
import type { NavLink } from '@/lib/constants/navigation';

interface DesktopNavProps {
  navLinks: NavLink[];
  t: (key: string) => string;
}

export function DesktopNav({ navLinks, t }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-2" aria-label={t('mainNavigation')}>
      {navLinks.map((link, index) => {
        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.key}
            href={link.href}
            className="relative px-5 py-2.5 text-[15px] font-medium text-foreground/85 hover:text-primary focus-visible:text-primary transition-all duration-300 rounded-xl hover:bg-primary/15 focus-visible:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 group overflow-hidden"
            style={{
              transitionDelay: `${index * 30}ms`,
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* Hover background shimmer */}
            <div
              className="absolute inset-0 bg-linear-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full group-focus-visible:translate-x-full transition-transform duration-700"
              aria-hidden="true"
            />

            <span className="relative z-10">{t(link.key)}</span>

            {/* Active indicator dot */}
            <span
              className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100 group-focus-visible:scale-100"
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </nav>
  );
}
