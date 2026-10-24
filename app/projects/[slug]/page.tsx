import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { ArchitectureFlow } from "@/components/architecture-flow";
import { FadeIn } from "@/components/motion";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPortfolioContent, resolvePortfolioIcon } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { projects } = await getPortfolioContent();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.overview,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { projects } = await getPortfolioContent();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const Icon = resolvePortfolioIcon(project.icon);
  const visibleLinks = project.links;

  return (
    <main>
      <section className="border-b border-border bg-card/35">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.5fr] lg:items-end">
            <FadeIn>
              <div className="flex h-14 w-14 items-center justify-center rounded-md bg-primary/12 text-primary">
                <Icon className="h-7 w-7" />
              </div>
              <p className="mt-6 text-sm font-medium uppercase tracking-[0.22em] text-primary">
                Project Detail
              </p>
              <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">
                {project.title}
              </h1>
              <p className="mt-4 text-xl text-muted-foreground">{project.subtitle}</p>
              {project.period ? <p className="mt-3 text-sm text-muted-foreground">{project.period}</p> : null}
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                {visibleLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    className={cn(
                      buttonVariants({
                        variant: link.label === "GitHub" ? "default" : "secondary",
                      }),
                    )}
                  >
                    {link.label === "GitHub" ? <Github className="h-4 w-4" /> : null}
                    {link.label}
                    {link.label !== "GitHub" ? <ArrowUpRight className="h-4 w-4" /> : null}
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <FadeIn>
          <Card className="h-full p-6">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{project.overview}</p>
          </Card>
        </FadeIn>
        <FadeIn delay={0.08}>
          <Card className="h-full p-6">
            <h2 className="text-2xl font-semibold">Motivation</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{project.motivation}</p>
          </Card>
        </FadeIn>
      </section>

      <section className="border-y border-border bg-card/35">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <FadeIn>
            <h2 className="text-3xl font-semibold">Architecture</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              The project flow is documented as a clear system path from input to
              answer, so each stage can be evaluated and improved independently.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <ArchitectureFlow steps={project.architecture} />
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
        <FadeIn>
          <Card className="p-6">
            <h2 className="text-2xl font-semibold">Dataset</h2>
            <div className="mt-5 grid gap-3">
              {project.dataset.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-md bg-muted px-4 py-3"
                >
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>
        <FadeIn delay={0.08}>
          <Card className="p-6">
            <h2 className="text-2xl font-semibold">Results</h2>
            {[...new Set(project.metrics.map((metric) => metric.category))].map((category) => (
              <div key={category} className="mt-5">
                <h3 className="text-sm font-semibold text-primary">{category}</h3>
                <div className="mt-2 overflow-hidden rounded-md border border-border">
                  {project.metrics.filter((metric) => metric.category === category).map((metric) => (
                    <div key={metric.name} className="flex items-center justify-between gap-4 border-t border-border px-4 py-3 first:border-t-0">
                      <span className="text-sm text-muted-foreground">{metric.name}</span>
                      <span className="text-sm font-semibold">{metric.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Card>
        </FadeIn>
      </section>

      {project.contribution || project.evaluation || project.limitations ? <section className="border-y border-border bg-card/35">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          {project.contribution ? <Card className="p-6"><h2 className="text-xl font-semibold">My contribution</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{project.contribution}</p></Card> : null}
          {project.evaluation ? <Card className="p-6"><h2 className="text-xl font-semibold">Evaluation</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{project.evaluation}</p></Card> : null}
          {project.limitations ? <Card className="p-6"><h2 className="text-xl font-semibold">Limitations</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{project.limitations}</p></Card> : null}
        </div>
      </section> : null}

      {project.gallery.length ? <section className="border-y border-border bg-card/35">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl font-semibold">Gallery</h2>
          </FadeIn>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {project.gallery.map((entry, index) => {
              const media = typeof entry === "string" ? null : entry;
              return (
                <FadeIn key={media?.url ?? `${entry}-${index}`} delay={index * 0.04}>
                  <div className="overflow-hidden rounded-md border border-border bg-background">
                    {media?.type === "video" || media?.url?.match(/\.(mp4|webm)$/i) ? (
                      <video src={media.url} controls className="aspect-[4/3] w-full object-cover" />
                    ) : media ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={media.url} alt={media.caption ?? project.title} className="aspect-[4/3] w-full object-cover" />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-muted px-4 text-sm text-muted-foreground">
                        {typeof entry === "string" ? entry : entry.caption ?? entry.url}
                      </div>
                    )}
                    {media?.caption ? <p className="p-3 text-sm text-muted-foreground">{media.caption}</p> : null}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section> : null}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl font-semibold">Tech Stack</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-md border border-border bg-card px-4 py-2 text-sm text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
