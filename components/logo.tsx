"use client";

import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

interface LogoProps {
  variant?: "header" | "footer";
  showDecorations?: boolean;
}

export function Logo({
  variant = "header",
  showDecorations = true,
}: LogoProps) {
  const t = useTranslations("Navigation");
  const isFooter = variant === "footer";

  return (
    <Link
      href="/"
      className={`flex items-center gap-3 w-fit justify-self-center group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl ${
        isFooter ? "justify-center" : ""
      }`}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute -inset-2 bg-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 blur-xl transition-all duration-500"
        aria-hidden="true"
      />

      <div className="relative">
        <div
          className={`${
            isFooter ? "w-14 h-14" : "w-11 h-11"
          } bg-linear-to-br from-primary via-primary-mid to-primary/90 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:-rotate-2 group-focus-visible:scale-105 group-focus-visible:-rotate-2 shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/40 group-focus-visible:shadow-xl group-focus-visible:shadow-primary/40`}
        >
          <svg
            width={isFooter ? "28" : "22"}
            height={isFooter ? "28" : "22"}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 transition-transform duration-500 group-hover:scale-110"
            role="img"
            aria-label={t("logoAria")}
          >
            <title>{t("logoTitle")}</title>
            <rect
              x="3"
              y="2"
              width="14"
              height="16"
              rx="2"
              stroke="white"
              strokeWidth="1.5"
            />
            <line
              x1="6"
              y1="6"
              x2="14"
              y2="6"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="6"
              y1="10"
              x2="14"
              y2="10"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="6"
              y1="14"
              x2="11"
              y2="14"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Inner shine effect */}
          <div
            className="absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-transparent rounded-2xl opacity-60"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-linear-to-tl from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            aria-hidden="true"
          />
        </div>

        {/* Decorative corner accent */}
        {showDecorations && (
          <div
            className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="relative">
        <span
          className={`font-bold ${
            isFooter ? "text-3xl" : "text-xl"
          } tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/80`}
        >
          SimplePDF
          <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-primary-mid">
            Convert
          </span>
        </span>
      </div>
    </Link>
  );
}
