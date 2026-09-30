import { FadeIn } from "@/components/motion";
import { Card } from "@/components/ui/card";
import { getPortfolioContent, resolvePortfolioIcon } from "@/lib/portfolio-data";

export const metadata = {
  title: "Awards",
  description: "Awards and recognitions by Ngo Chi Nghia.",
};
export const dynamic = "force-dynamic";

export default async function AwardsPage() {
  const { awards } = await getPortfolioContent();
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn>
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
          Awards
        </p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Recognitions</h1>
      </FadeIn>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {awards.map((award) => {
          const Icon = resolvePortfolioIcon(award.icon);
          return (
            <FadeIn key={award.title}>
              <Card className="p-6">
                <Icon className="h-8 w-8 text-primary" />
                <h2 className="mt-5 text-2xl font-semibold">{award.title}</h2>
                <p className="mt-2 text-muted-foreground">{award.result}</p>
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </main>
  );
}
