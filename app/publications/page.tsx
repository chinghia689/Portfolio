import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { Card } from "@/components/ui/card";
import { publications } from "@/lib/portfolio-data";

export const metadata = {
  title: "Publications",
  description: "Research publications by Ngo Chi Nghia.",
};

export default function PublicationsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn>
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
          Publications
        </p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Research work</h1>
      </FadeIn>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {publications.map((publication) => {
          const Icon = publication.icon;
          return (
            <FadeIn key={publication.title}>
              <Card className="p-6">
                <Icon className="h-8 w-8 text-primary" />
                <h2 className="mt-5 text-2xl font-semibold">{publication.title}</h2>
                <p className="mt-2 text-muted-foreground">{publication.venue}</p>
                <Link
                  href={publication.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
                >
                  Read Paper
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </main>
  );
}
