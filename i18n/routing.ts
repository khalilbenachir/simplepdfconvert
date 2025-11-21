import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "fr", "es"],

  // Used when no locale matches
  defaultLocale: "en",

  // Show locale prefix only for non-default locales
  localePrefix: "as-needed",

  // Disable automatic Accept-Language detection in middleware. When
  // `localePrefix: 'as-needed'` is used together with the default locale
  // omitted from the URL, enabling locale detection can lead to a redirect
  // from `/` -> `/en` based on the header and back from `/en` -> `/`,
  // producing a loop. Turn this off so `/` serves the default locale.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];