'use client';

import { useTranslations } from 'next-intl';

import { FEATURES } from '@/lib/constants/features';

export function Features() {
  const t = useTranslations('Features');

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-muted/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 opacity-0 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.key}
                className="group relative opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100 + 200}ms` }}
              >
                {/* Card with hover effect */}
                <div className="relative h-full p-8 rounded-2xl bg-card border border-border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-transparent">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                    {/* Icon with gradient background */}
                    <div className="relative">
                      <div className={`p-5 rounded-2xl bg-linear-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${feature.gradient} blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold">
                      {t(`${feature.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${feature.key}.description`)}
                    </p>
                  </div>

                  {/* Decorative gradient orb */}
                  <div className={`absolute -top-2 -right-2 w-16 h-16 bg-linear-to-br ${feature.gradient} opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition-opacity duration-300`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
