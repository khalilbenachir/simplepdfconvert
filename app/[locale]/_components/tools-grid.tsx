'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { TOOLS } from '@/lib/constants/tools';

export function ToolsGrid() {
  const t = useTranslations('Tools');

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
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
              {t('sectionTitle')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('sectionDescription')}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TOOLS.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.key}
                className="group relative opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100 + 200}ms` }}
              >
                {/* Card */}
                <div className="relative h-full p-8 rounded-2xl border border-border bg-card backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-primary/30">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${tool.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                    {/* Icon */}
                    <div className={`relative p-6 rounded-2xl bg-linear-to-br ${tool.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />

                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${tool.gradient} blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-primary">
                      {t(`${tool.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${tool.key}.description`)}
                    </p>

                    {/* CTA Button */}
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                    >
                      {t('useTool')}
                    </Button>
                  </div>

                  {/* Decorative corner accent */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-br ${tool.gradient} opacity-10 rounded-bl-full rounded-tr-2xl`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
