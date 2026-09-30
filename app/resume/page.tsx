import Link from "next/link";
import { Download } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPortfolioContent } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Resume",
  description: "Resume for Ngo Chi Nghia, AI Engineer.",
};
export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const { experience, profile, projects, skills } = await getPortfolioContent();
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
              Resume
            </p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-3 text-muted-foreground">{profile.role}</p>
          </div>
          <Link href={profile.resume} className={cn(buttonVariants())}>
            <Download className="h-4 w-4" />
            Download PDF
          </Link>
        </div>
      </FadeIn>
      <div className="mt-10 grid gap-5">
        <ResumeBlock title="Experience">
          {experience.map((item) => (
            <div key={item.title} className="rounded-md bg-muted p-4">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-muted-foreground">
                {item.company} - {item.year}
              </p>
            </div>
          ))}
        </ResumeBlock>
        <ResumeBlock title="Projects">
          {projects.map((project) => (
            <div key={project.slug} className="rounded-md bg-muted p-4">
              <p className="font-semibold">{project.title}</p>
              <p className="text-sm text-muted-foreground">{project.subtitle}</p>
            </div>
          ))}
        </ResumeBlock>
        <ResumeBlock title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className="rounded-md border border-border bg-background px-3 py-1 text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </ResumeBlock>
      </div>
    </main>
  );
}

function ResumeBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <FadeIn>
      <Card className="p-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="mt-5 grid gap-3">{children}</div>
      </Card>
    </FadeIn>
  );
}
