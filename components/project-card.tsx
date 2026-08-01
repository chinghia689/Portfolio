import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { FadeIn, MotionDiv } from "@/components/motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { projects } from "@/lib/portfolio-data";

type Project = (typeof projects)[number];

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;

  return (
    <FadeIn delay={index * 0.08}>
      <MotionDiv whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
        <Card className="group overflow-hidden p-6 transition-colors hover:border-primary/50 hover:shadow-glow">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-primary/12 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-sm uppercase tracking-[0.18em] text-primary">
                Featured Project
              </p>
              <h3 className="mt-3 text-2xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-lg text-muted-foreground">{project.subtitle}</p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
                {project.overview}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.slice(0, 6).map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid min-w-56 gap-3">
              {project.metrics.slice(0, 3).map((metric) => (
                <div
                  key={metric.name}
                  className="flex items-center justify-between rounded-md bg-muted px-4 py-3 text-sm"
                >
                  <span className="text-muted-foreground">{metric.name}</span>
                  <span className="font-semibold">{metric.score}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className={cn(buttonVariants(), "group/link")}
            >
              Detail
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </Link>
            <Link
              href={project.links[0]?.href ?? "#"}
              target="_blank"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          </div>
        </Card>
      </MotionDiv>
    </FadeIn>
  );
}
