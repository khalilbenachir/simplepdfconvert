'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { FileRejection } from 'react-dropzone';

import { TOOLS } from '@/lib/constants/tools';
import { Dropzone } from '@/components/ui/dropzone';

export function Hero() {
  const t = useTranslations('HomePage.hero');
  const tTools = useTranslations('Tools');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleFileDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    console.log('Accepted files:', acceptedFiles);
    console.log('Rejected files:', rejectedFiles);
    // TODO: Process files based on selectedTool
  };

  return (
    <section className="relative overflow-hidden" aria-label="Hero section" id="main-content">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Content */}
          <div className="space-y-8 opacity-0 animate-fade-in-up">
            {/* Accent Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              <span className="text-sm font-medium bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('accent')}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="block bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                {t('headline')}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              {t('subheadline')}
            </p>

            {/* Trust Indicators */}
            <dl className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex flex-col">
                <dt className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t('trustIndicators.filesProcessed.value')}
                </dt>
                <dd className="text-sm text-muted-foreground">{t('trustIndicators.filesProcessed.label')}</dd>
              </div>
              <div className="w-px h-12 bg-border" aria-hidden="true" />
              <div className="flex flex-col">
                <dt className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t('trustIndicators.freeSecure.value')}
                </dt>
                <dd className="text-sm text-muted-foreground">{t('trustIndicators.freeSecure.label')}</dd>
              </div>
              <div className="w-px h-12 bg-border" aria-hidden="true" />
              <div className="flex flex-col">
                <dt className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t('trustIndicators.averageProcess.value')}
                </dt>
                <dd className="text-sm text-muted-foreground">{t('trustIndicators.averageProcess.label')}</dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Interactive Tool Selector */}
          <div className="opacity-0 animate-fade-in-up delay-200">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                {/* Dropzone Component */}
                <Dropzone
                  onDrop={handleFileDrop}
                  showFileList={false}
                  className="mb-0"
                />

                {/* Quick Tool Selector */}
                <div className="border-t border-border/50 p-6 bg-muted/30">
                  <h3 className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider" id="tool-selector-heading">
                    {t('quickSelectTool')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3" role="group" aria-labelledby="tool-selector-heading">
                    {TOOLS.slice(0, 4).map((tool, idx) => {
                      const Icon = tool.icon;
                      return (
                        <button
                          key={tool.key}
                          onClick={() => setSelectedTool(tool.key)}
                          className={`
                            relative group/tool p-4 rounded-xl border transition-all duration-300
                            hover:scale-[1.02] hover:shadow-lg focus-visible:scale-[1.02] focus-visible:shadow-lg
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                            ${selectedTool === tool.key
                              ? 'border-primary bg-primary/10 shadow-md'
                              : 'border-border bg-card hover:border-primary/30 focus-visible:border-primary/30'
                            }
                          `}
                          style={{ animationDelay: `${idx * 100}ms` }}
                          aria-label={`Select ${tTools(`${tool.key}.title`)} tool`}
                          aria-pressed={selectedTool === tool.key}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-linear-to-br ${tool.gradient} opacity-90`} aria-hidden="true">
                              <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                            </div>
                            <span className="text-sm font-medium text-left">{tTools(`${tool.key}.title`)}</span>
                          </div>
                          {selectedTool === tool.key && (
                            <div className="absolute inset-0 rounded-xl bg-linear-to-br from-primary/5 to-transparent" aria-hidden="true" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse" aria-hidden="true" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-linear-to-br from-accent/10 to-primary/10 rounded-full blur-2xl animate-pulse animation-delay-1000" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
