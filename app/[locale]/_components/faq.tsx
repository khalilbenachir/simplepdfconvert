'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FAQ_KEYS } from '@/lib/constants/misc';

export function FAQ() {
  const t = useTranslations('FAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 bg-muted/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold">{t('title')}</h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {FAQ_KEYS.map((question, index) => (
          <div
            key={question}
            className="bg-background rounded-xl shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full text-left p-6 flex justify-between items-center hover:bg-muted/50 transition-colors"
            >
              <h3 className="text-lg font-bold pr-4">{t(`${question}.question`)}</h3>
              <svg
                className={`w-6 h-6 text-primary transition-transform shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 text-muted-foreground">
                {t(`${question}.answer`)}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
