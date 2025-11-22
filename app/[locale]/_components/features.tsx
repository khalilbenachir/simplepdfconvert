'use client';

import { useTranslations } from 'next-intl';

import { FeatureCard } from '@/components/ui/feature-card';
import { FEATURES } from '@/lib/constants/features';

export function Features() {
  const t = useTranslations('Features');

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden bg-muted/30"
      aria-labelledby="features-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 opacity-0 animate-fade-in-up">
          <h2
            id="features-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.key}
              featureKey={feature.key}
              icon={feature.icon}
              gradient={feature.gradient}
              bgGradient={feature.bgGradient}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
