import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Have questions? We'd love to hear from you.
        </p>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Email: support@simplepdfconvert.com
          </p>
        </div>
      </div>
    </div>
  );
}
