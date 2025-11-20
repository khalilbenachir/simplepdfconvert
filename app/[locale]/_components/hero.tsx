'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Upload } from 'lucide-react';

import { TOOLS } from '@/lib/constants/tools';

export function Hero() {
  const t = useTranslations('HomePage.hero');
  const tTools = useTranslations('Tools');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // TODO: Handle file drop
  };

  return (
    <section className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
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
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
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
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex flex-col">
                <div className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t('trustIndicators.filesProcessed.value')}
                </div>
                <div className="text-sm text-muted-foreground">{t('trustIndicators.filesProcessed.label')}</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="flex flex-col">
                <div className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t('trustIndicators.freeSecure.value')}
                </div>
                <div className="text-sm text-muted-foreground">{t('trustIndicators.freeSecure.label')}</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="flex flex-col">
                <div className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t('trustIndicators.averageProcess.value')}
                </div>
                <div className="text-sm text-muted-foreground">{t('trustIndicators.averageProcess.label')}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tool Selector */}
          <div className="opacity-0 animate-fade-in-up delay-200">
            <div className="relative">
              {/* File Upload Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                  relative group rounded-2xl border-2 border-dashed transition-all duration-300
                  ${isDragging
                    ? 'border-primary bg-primary/5 scale-[1.02]'
                    : 'border-border hover:border-primary/50 bg-card/50 backdrop-blur-sm'
                  }
                `}
              >
                <div className="p-8 md:p-12 text-center space-y-6">
                  {/* Upload Icon */}
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-10 h-10 text-primary" />
                  </div>

                  {/* Upload Text */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">
                      {t('uploadZone.title')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('uploadZone.subtitle')}
                    </p>
                  </div>

                  {/* Fake file input trigger */}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    multiple
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={() => {/* TODO: Handle file selection */}}
                  />
                </div>

                {/* Quick Tool Selector */}
                <div className="border-t border-border/50 p-6 bg-muted/30">
                  <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    {t('quickSelectTool')}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {TOOLS.slice(0, 4).map((tool, idx) => {
                      const Icon = tool.icon;
                      return (
                        <button
                          key={tool.key}
                          onClick={() => setSelectedTool(tool.key)}
                          className={`
                            relative group/tool p-4 rounded-xl border transition-all duration-300
                            hover:scale-[1.02] hover:shadow-lg
                            ${selectedTool === tool.key
                              ? 'border-primary bg-primary/10 shadow-md'
                              : 'border-border bg-card hover:border-primary/30'
                            }
                          `}
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-linear-to-br ${tool.gradient} opacity-90`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-medium text-left">{tTools(`${tool.key}.title`)}</span>
                          </div>
                          {selectedTool === tool.key && (
                            <div className="absolute inset-0 rounded-xl bg-linear-to-br from-primary/5 to-transparent" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-linear-to-br from-accent/10 to-primary/10 rounded-full blur-2xl animate-pulse animation-delay-1000" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
