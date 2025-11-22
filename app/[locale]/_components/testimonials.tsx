'use client';

import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/card';
import { TESTIMONIAL_KEYS } from '@/lib/constants/misc';

export function Testimonials() {
  const t = useTranslations('Testimonials');

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold">{t('title')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {TESTIMONIAL_KEYS.map((testimonial) => (
          <Card key={testimonial} hover={false} className="p-8 bg-muted/50">
            <div className="flex mb-4" role="img" aria-label="5 star rating">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-muted-foreground mb-6 italic">
              &ldquo;{t(`${testimonial}.quote`)}&rdquo;
            </p>
            <div>
              <p className="font-bold">{t(`${testimonial}.author`)}</p>
              <p className="text-sm text-muted-foreground">{t(`${testimonial}.role`)}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
