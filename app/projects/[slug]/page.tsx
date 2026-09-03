import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { ArchitectureFlow } from "@/components/architecture-flow";
import { FadeIn } from "@/components/motion";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { projects } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
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
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const Icon = project.icon;
  const visibleLinks = project.links.filter((link) => link.label !== "Demo");

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
            <div className="mt-5 overflow-hidden rounded-md border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium">Metric</th>
                    <th className="px-4 py-3 font-medium">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {project.metrics.map((metric) => (
                    <tr key={metric.name} className="border-t border-border">
                      <td className="px-4 py-3 text-muted-foreground">{metric.name}</td>
                      <td className="px-4 py-3 font-semibold">{metric.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </FadeIn>
      </section>

      <section className="border-y border-border bg-card/35">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl font-semibold">Gallery</h2>
          </FadeIn>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {project.gallery.map((item, index) => (
              <FadeIn key={item} delay={index * 0.04}>
                <div className="aspect-[4/3] rounded-lg border border-border bg-background p-4">
                  <div className="flex h-full items-center justify-center rounded-md bg-muted text-sm font-medium text-muted-foreground">
                    {item}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

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
