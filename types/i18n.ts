export interface LocaleInfo {
  acceptLanguage: string | null;
  cookieValue: string | undefined;
}

export interface RedirectAnalysis {
  isRedirect: boolean;
  location: string | null;
  shouldPreventLoop: boolean;
}