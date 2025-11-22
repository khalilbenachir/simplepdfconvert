import { useTranslations } from 'next-intl';
import type { LucideIcon } from 'lucide-react';

import { ANIMATION_DELAYS } from '@/lib/constants/misc';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  featureKey: string;
  icon: LucideIcon;
  gradient: string;
  bgGradient: string;
  index: number;
  className?: string;
}

export function FeatureCard({
  featureKey,
  icon: Icon,
  gradient,
  bgGradient,
  index,
  className,
}: FeatureCardProps) {
  const t = useTranslations('Features');

  const animationDelay = index * 150 + ANIMATION_DELAYS.INITIAL;

  return (
    <div
      className={cn(
        'relative opacity-0 animate-fade-in-stagger group',
        className
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Main card container */}
      <div className="relative h-full">
        {/* Background card with border */}
        <div className="relative h-full p-8 rounded-2xl bg-card border border-border/50 shadow-sm transition-all duration-500 hover:border-transparent overflow-hidden">
          {/* Animated gradient background - appears on hover */}
          <div
            className={`absolute inset-0 bg-linear-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            aria-hidden="true"
          />

          {/* Diagonal accent line - subtle depth element */}
          <div
            className={`absolute -top-1 -right-1 w-24 h-24 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500 group-hover:scale-150`}
            aria-hidden="true"
          />

          {/* Content container */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-6 h-full">
            {/* Icon treatment with layered depth */}
            <div className="relative" aria-hidden="true">
              {/* Outer glow ring - creates depth */}
              <div
                className={`absolute inset-0 rounded-2xl bg-linear-to-br ${gradient} blur-xl opacity-40 group-hover:opacity-60 transition-all duration-500 scale-110 group-hover:scale-125`}
              />

              {/* Middle ring - adds visual rhythm */}
              <div
                className={`absolute inset-0 rounded-2xl bg-linear-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-all duration-500 scale-105`}
              />

              {/* Icon container with gradient */}
              <div
                className={`relative p-5 rounded-2xl bg-linear-to-br ${gradient} shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
              >
                <Icon
                  className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-foreground">
              {t(`${featureKey}.title`)}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/80 text-[15px]">
              {t(`${featureKey}.description`)}
            </p>
          </div>

          {/* Hover lift effect - shadow enhancement */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-hover-lift"
            aria-hidden="true"
          />
        </div>

        {/* Floating orb decoration - asymmetric visual interest */}
        <div
          className={`absolute -bottom-3 -left-3 w-20 h-20 bg-linear-to-br ${gradient} rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-700 group-hover:scale-150`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
