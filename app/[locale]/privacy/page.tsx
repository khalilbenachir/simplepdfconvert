import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Your Privacy Matters</h2>
          <p className="text-muted-foreground mb-4">
            At SimplePDFConvert, we take your privacy seriously. This policy outlines how we handle your data.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Collection</h2>
          <p className="text-muted-foreground mb-4">
            We collect minimal data necessary to provide our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">File Security</h2>
          <p className="text-muted-foreground mb-4">
            All uploaded files are encrypted and automatically deleted after processing.
          </p>
        </div>
      </div>
    </div>
  );
}
