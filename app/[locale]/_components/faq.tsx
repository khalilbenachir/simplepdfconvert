'use client';

import { useTranslations } from 'next-intl';
import { Accordion, Item, Trigger, Content } from '@/components/ui/accordion';
import { FAQ_KEYS } from '@/lib/constants/misc';
import { Plus, ArrowRight } from 'lucide-react';
import { ANIMATION_DELAYS } from '@/lib/constants/misc';
import { memo, useMemo } from 'react';

interface FAQItemProps {
  question: string;
  index: number;
  isLast: boolean;
}

const FAQItem = memo(({ question, index, isLast }: FAQItemProps) => {
  const t = useTranslations('FAQ');

  const animationDelay = useMemo(
    () => index * 100 + ANIMATION_DELAYS.INITIAL,
    [index]
  );

  return (
    <Item
      key={question}
      value={question}
      className="opacity-0 animate-fade-in-stagger"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="relative group/item px-8 md:px-10 py-1 transition-colors duration-300 hover:bg-muted/30">
        <Trigger className="w-full py-7 cursor-pointer flex items-center justify-between gap-6 group/trigger">
          <div className="flex items-center gap-5 flex-1">
            {/* Refined number indicator */}
            <div className="relative shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-border/60 bg-background text-sm font-semibold text-muted-foreground transition-all duration-300 group-hover/trigger:border-primary group-hover/trigger:text-primary group-data-[state=open]/item:border-primary group-data-[state=open]/item:text-primary group-data-[state=open]/item:bg-primary/5">
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Question text */}
            <h3 className="text-left text-lg md:text-xl font-semibold text-foreground transition-colors duration-300 group-hover/trigger:text-foreground/80">
              {t(`${question}.question`)}
            </h3>
          </div>

          {/* Plus/Minus icon */}
          <div className="shrink-0 w-10 h-10 rounded-full border border-border/60 bg-background flex items-center justify-center transition-all duration-300 group-hover/trigger:border-primary/40 group-hover/trigger:bg-muted/50 group-data-[state=open]/item:border-primary/40 group-data-[state=open]/item:bg-primary/5">
            <Plus
              className="w-5 h-5 text-muted-foreground transition-all duration-300 group-hover/trigger:text-foreground group-data-[state=open]/item:rotate-45 group-data-[state=open]/item:text-primary"
              aria-label={t('aria.expandIcon')}
            />
          </div>
        </Trigger>

        <Content>
          <div className="pb-8 pl-13">
            {/* Answer text with refined spacing */}
            <div className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {t(`${question}.answer`)}
            </div>
          </div>
        </Content>

        {/* Subtle bottom border for last item */}
        {isLast && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/10 to-transparent" />
        )}
      </div>
    </Item>
  );
});

FAQItem.displayName = 'FAQItem';

export function FAQ() {
  const t = useTranslations('FAQ');

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background gradient - minimal */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-muted/20 to-background -z-10" />

      <div className="container mx-auto px-4">
        {/* Section header - clean typography */}
        <div className="text-center mb-20 max-w-3xl mx-auto opacity-0 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 text-muted-foreground text-sm font-medium mb-8 bg-card/50 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
            {t('heading.line1')}
            <br />
            <span className="text-muted-foreground">{t('heading.line2')}</span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* FAQ Accordion - single card container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
            {/* Subtle top accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

            <Accordion type="single" className="divide-y divide-border/40">
              {FAQ_KEYS.map((question, index) => (
                <FAQItem
                  key={question}
                  question={question}
                  index={index}
                  isLast={index === FAQ_KEYS.length - 1}
                />
              ))}
            </Accordion>
          </div>
        </div>

        {/* Still have questions CTA - refined */}
        <div className="mt-20 text-center opacity-0 animate-fade-in-up animation-delay-500">
          <div className="inline-flex flex-col items-center gap-6 p-10 md:p-12 rounded-3xl border border-border/60 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md group/cta">
            <div className="space-y-3 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {t('cta.heading')}
              </h3>
              <p className="text-muted-foreground text-lg max-w-md">
                {t('cta.description')}
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('cta.button')}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
