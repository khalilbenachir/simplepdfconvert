import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";

import { STEP_ICON_COLORS, ANIMATION_DELAYS } from "@/lib/constants/misc";
import { cn } from "@/lib/utils";

interface StepCardProps {
  stepKey: string;
  stepNumber: string;
  icon: LucideIcon;
  index: number;
  className: string;
}

export function StepCard({
  stepKey,
  stepNumber,
  icon: Icon,
  index,
  className,
}: StepCardProps) {
  const t = useTranslations("HowItWorks");

  const colors = STEP_ICON_COLORS[index] ?? STEP_ICON_COLORS[0];
  const animationDelay =
    index * ANIMATION_DELAYS.STEP + ANIMATION_DELAYS.INITIAL;

  return (
    <article
      className={cn("relative opacity-0 animate-fade-in-stagger", className)}
      style={{ animationDelay: `${animationDelay}ms` }}
      aria-labelledby={`step-${stepKey}-title`}
    >
      <div className="relative z-10 group h-full">
        <div className="relative p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 h-full">
          {/* Step Number */}
          <div className="absolute top-6 left-6 text-sm font-semibold text-muted-foreground/40 font-dm-sans" aria-hidden="true">
            {stepNumber}
          </div>

          <div className="space-y-5 pt-6">
            {/* Icon Circle */}
            <div className="flex justify-center" aria-hidden="true">
              <div
                className={`w-16 h-16 rounded-full ${colors.bg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
            </div>

            {/* Title */}
            <h3 id={`step-${stepKey}-title`} className="text-xl font-semibold text-center font-dm-sans">
              {t(`${stepKey}.title`)}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-center leading-relaxed text-[15px] font-inter">
              {t(`${stepKey}.description`)}
            </p>
          </div>

          {/* Hover effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-hover-lift" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}
