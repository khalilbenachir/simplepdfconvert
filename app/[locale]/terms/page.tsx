import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Acceptance of Terms</h2>
          <p className="text-muted-foreground mb-4">
            By accessing and using SimplePDFConvert, you accept and agree to be bound by these terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Service</h2>
          <p className="text-muted-foreground mb-4">
            Our services are provided for personal and commercial use within reasonable limits.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Limitations</h2>
          <p className="text-muted-foreground mb-4">
            File size limits and usage restrictions apply to ensure fair use for all users.
          </p>
        </div>
      </div>
    </div>
  );
}
