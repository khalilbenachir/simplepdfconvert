"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter as useNextRouter } from "next/navigation";

import { usePathname, useRouter } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Locale = "en" | "fr" | "es" | "de";

const LOCALE_CONFIG = {
  en: { name: "English", code: "EN" },
  fr: { name: "Français", code: "FR" },
  es: { name: "Español", code: "ES" },
  de: { name: "Deutsch", code: "DE" },
} as const;

const LOCALES = Object.keys(LOCALE_CONFIG) as Locale[];

const FOCUS_RESTORE_DELAY = 100;
const ANNOUNCEMENT_CLEAR_DELAY = 1000;

export function LanguageSwitcher() {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const nextRouter = useNextRouter();
  const pathname = usePathname();

  const [announcement, setAnnouncement] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleLocaleChange = (newLocale: Locale) => {
    const localeName = LOCALE_CONFIG[newLocale].name;

    setAnnouncement(`Language changed to ${localeName}`);
    setIsOpen(false);

    // For English, navigate to root without /en prefix
    if (newLocale === "en") {
      nextRouter.push(pathname === "/" ? "/" : pathname);
    } else {
      // For other locales, use next-intl router
      router.replace(pathname, { locale: newLocale });
    }

    // Restore focus after navigation for keyboard users
    setTimeout(() => {
      triggerRef.current?.focus();
    }, FOCUS_RESTORE_DELAY);
  };

  // Clear screen reader announcement after it has been read
  useEffect(() => {
    if (!announcement) return;

    const timer = setTimeout(() => {
      setAnnouncement("");
    }, ANNOUNCEMENT_CLEAR_DELAY);

    return () => clearTimeout(timer);
  }, [announcement]);

  const currentLocaleName = LOCALE_CONFIG[currentLocale].name;

  return (
    <>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="primary"
            className={cn(
              "h-9! w-9! p-0! rounded-lg!",
              "relative cursor-pointer flex items-center justify-center",
              "group overflow-hidden",
              "hover:scale-110 hover:shadow-lg active:scale-95"
            )}
            aria-label={`Change language. Current: ${currentLocaleName}`}
            aria-expanded={isOpen}
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-lg" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/15 blur-xl transition-all duration-500 rounded-full" />

            <Globe
              className="h-[18px] w-[18px] relative z-10 transition-all duration-300 group-hover:rotate-12"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-40 p-2" align="end" sideOffset={8}>
          <div className="space-y-1" role="menu" aria-label="Language options">
            {LOCALES.map((locale) => {
              const isActive = currentLocale === locale;
              const { name, code } = LOCALE_CONFIG[locale];

              return (
                <button
                  key={locale}
                  role="menuitemradio"
                  aria-checked={isActive}
                  onClick={() => handleLocaleChange(locale)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-md px-3 py-2",
                    "text-sm transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "text-primary font-medium"
                      : "text-foreground/90 hover:text-foreground hover:bg-muted/50"
                  )}
                  aria-label={`Switch to ${name}`}
                >
                  <span
                    className="text-xs font-semibold text-foreground/60 w-6 text-center"
                    aria-hidden="true"
                  >
                    {code}
                  </span>
                  <span className="flex-1 text-left">{name}</span>
                  {isActive && (
                    <Check
                      className="h-3.5 w-3.5 text-primary"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
