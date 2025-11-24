'use client';

import { useTranslations } from 'next-intl';
import { Upload } from 'lucide-react';

import { STEPS } from '@/lib/constants/steps';
import { BACKGROUND_PATTERN, ANIMATION_DELAYS } from '@/lib/constants/misc';
import { StepCard } from '@/components/ui/step-card';
import { Button } from '@/components/ui/button';

export function HowItWorks() {
  const t = useTranslations('HowItWorks');

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-linear-to-b from-background via-muted/20 to-background" aria-labelledby="how-it-works-title">
      {/* Subtle background texture */}
      <div className="absolute inset-0 -z-10 opacity-[0.015]" aria-hidden="true">
        <div className="absolute inset-0" style={{ backgroundImage: BACKGROUND_PATTERN }} />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 max-w-2xl mx-auto opacity-0 animate-fade-in-stagger">
          <h2 id="how-it-works-title" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight font-dm-sans">
            {t('title')}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-6 rounded-full" aria-hidden="true" />
        </div>

        {/* Steps Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 md:gap-8 relative">
            {/* Connector dots - Desktop only */}
            <div className="hidden md:block absolute top-20 left-0 right-0 z-0 px-[20%]" aria-hidden="true">
              <div className="flex items-center justify-between">
                <div className="w-2 h-2 rounded-full bg-border" />
                <div className="flex-1 h-px bg-linear-to-r from-border via-border to-transparent mx-4" />
                <div className="w-2 h-2 rounded-full bg-border" />
                <div className="flex-1 h-px bg-linear-to-r from-transparent via-border to-border mx-4" />
                <div className="w-2 h-2 rounded-full bg-border" />
              </div>
            </div>

            {STEPS.map((step, index) => (
              <StepCard
                key={step.key}
                stepKey={step.key}
                stepNumber={step.number}
                icon={step.icon}
                index={index}
                className="min-w-2xs"
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          className="text-center mt-16 md:mt-20 opacity-0 animate-fade-in-stagger"
          style={{ animationDelay: `${ANIMATION_DELAYS.CTA}ms` }}
        >
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto font-inter">
            {t('cta.description')}
          </p>
          <Button
            variant="outline"
            size="lg"
            className="group rounded-full gap-2.5 shadow-sm hover:shadow-md font-dm-sans"
            aria-label={t('cta.button')}
          >
            <Upload className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} aria-hidden="true" />
            <span>{t('cta.button')}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
