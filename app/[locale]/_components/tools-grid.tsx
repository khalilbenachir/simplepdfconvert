'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { TOOLS } from '@/lib/constants/tools';

export function ToolsGrid() {
  const t = useTranslations('Tools');

  return (
    <section className="py-20 md:py-32" aria-label="Available PDF Tools">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <span className="text-sm font-medium text-primary">
              {t('badge')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            {t('sectionTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('sectionDescription')}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="flex flex-wrap gap-6 max-w-6xl mx-auto justify-center">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.key} tool={tool} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ToolCardProps {
  tool: typeof TOOLS[0];
  t: (key: string) => string;
}

function ToolCard({ tool, t }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link
      href={tool.href}
      aria-label={`${t(`${tool.key}.title`)}: ${t(`${tool.key}.description`)}`}
      className="group block w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] focus-visible:outline-none"
    >
      <article className="h-full p-6 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all duration-300 motion-reduce:transition-none">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          <div className={`p-4 rounded-lg bg-linear-to-br ${tool.bgGradient} relative overflow-hidden`}>
            <div className={`absolute inset-0 bg-linear-to-br ${tool.gradient} opacity-80`} />
            <Icon
              className="w-7 h-7 text-white relative z-10"
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground">
            {t(`${tool.key}.title`)}
          </h3>

          {/* Description */}
          <p className="text-base text-muted-foreground leading-relaxed">
            {t(`${tool.key}.description`)}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-medium text-primary dark:text-primary/90">
            <span>{t('useTool')}</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>

        {/* Accessible label */}
        <span className="sr-only">
          {t(`${tool.key}.title`)} - {t(`${tool.key}.description`)}
        </span>
      </article>
    </Link>
  );
}
