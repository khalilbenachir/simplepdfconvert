import { setRequestLocale } from "next-intl/server";

import { Hero } from "./_components/hero";
import { ToolsGrid } from "./_components/tools-grid";
import { Features } from "./_components/features";
import { HowItWorks } from "./_components/how-it-works";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">
      <Hero />
      <ToolsGrid />
      <Features />
      <HowItWorks />
    </div>
  );
}
