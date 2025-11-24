'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function ThemeSwitcher() {
  const { setTheme, theme, systemTheme } = useTheme();
  const [announcement, setAnnouncement] = useState('');

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    setAnnouncement(`Theme changed to ${newTheme} mode`);
  };

  useEffect(() => {
    if (!announcement) return;
    const timer = setTimeout(() => setAnnouncement(''), 1000);
    return () => clearTimeout(timer);
  }, [announcement]);

  return (
    <>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
      <button
        onClick={toggleTheme}
        type="button"
        suppressHydrationWarning
        className="relative cursor-pointer h-9 w-9 rounded-lg border border-border bg-background transition-all duration-300 flex items-center justify-center group overflow-hidden hover:scale-110 hover:border-primary/40 focus-visible:border-primary/40 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 transition-all duration-300 rounded-lg" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-primary/20 blur-xl transition-all duration-500 rounded-full" />

      {/* Sun icon for light mode */}
      <div className="relative">
        <Sun
          className={`h-[18px] w-[18px] transition-all duration-300 ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100 text-foreground group-hover:text-primary group-hover:rotate-15'
          }`}
          strokeWidth={2.5}
        />
      </div>

      {/* Moon icon for dark mode */}
      <div className="absolute">
        <Moon
          className={`h-[18px] w-[18px] transition-all duration-300 ${
            isDark
              ? 'rotate-0 scale-100 opacity-100 text-foreground group-hover:text-primary group-hover:-rotate-12'
              : '-rotate-90 scale-0 opacity-0'
          }`}
          strokeWidth={2.5}
        />
      </div>

      <span className="sr-only">Toggle theme</span>
      </button>
    </>
  );
}
