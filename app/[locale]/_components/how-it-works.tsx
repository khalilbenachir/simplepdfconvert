'use client';

import { useTranslations } from 'next-intl';
import { Upload, ArrowRight } from 'lucide-react';
import { STEPS } from '@/lib/constants/steps';

export function HowItWorks() {
  const t = useTranslations('HowItWorks');

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-1000" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 opacity-0 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('badge')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.key}
                  className="relative opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 150 + 200}ms` }}
                >
                  {/* Connector Line - Desktop Only */}
                  {index < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-[60%] right-[-45%] z-0">
                      <div className="relative h-1 bg-linear-to-r from-border to-transparent">
                        {/* Animated arrow */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                          <ArrowRight className="w-5 h-5 text-muted-foreground/50" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step Card */}
                  <div className="relative z-10 group">
                    <div className="relative p-8 rounded-2xl bg-card border border-border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-primary/30">
                      {/* Step Number Badge */}
                      <div className="absolute -top-4 -right-4 z-20">
                        <div className={`w-12 h-12 rounded-full bg-linear-to-br ${step.gradient} shadow-lg flex items-center justify-center border-4 border-background`}>
                          <span className="text-white font-bold text-sm">{step.number}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-6">
                        {/* Icon */}
                        <div className="relative inline-block">
                          <div className={`p-5 rounded-2xl bg-linear-to-br ${step.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                          </div>
                          {/* Glow effect */}
                          <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${step.gradient} blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`} />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold">
                          {t(`${step.key}.title`)}
                        </h3>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed">
                          {t(`${step.key}.description`)}
                        </p>
                      </div>

                      {/* Decorative corner gradient */}
                      <div className={`absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr ${step.gradient} opacity-10 rounded-tl-full rounded-br-2xl`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 opacity-0 animate-fade-in-up delay-700">
          <p className="text-lg text-muted-foreground mb-6">
            {t('cta.description')}
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-primary to-secondary text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <Upload className="w-5 h-5" />
            <span>{t('cta.button')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
