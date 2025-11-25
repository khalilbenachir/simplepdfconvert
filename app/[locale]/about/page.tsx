import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
        <p className="text-lg text-muted-foreground mb-6">
          SimplePDFConvert is your go-to platform for handling PDFs online.
        </p>
        <p className="text-muted-foreground">
          We provide simple, fast, and secure tools for everyday PDF tasks.
        </p>
      </div>
    </div>
  );
}
