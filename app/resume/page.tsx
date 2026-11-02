import Link from "next/link";
import { Download } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPortfolioContent, resumeEducation } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Resume",
  description: "Resume for Ngo Chi Nghia, AI Engineer.",
};
export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const { awards, experience, profile, projects, publications, skills } = await getPortfolioContent();
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
            <p className="mt-2 text-sm text-muted-foreground">{profile.location}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <a className="text-primary hover:underline" href={`mailto:${profile.email}`}>{profile.email}</a>
              <a className="text-primary hover:underline" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="text-primary hover:underline" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
          <Link href={profile.resume} className={cn(buttonVariants())}>
            <Download className="h-4 w-4" />
            Download PDF
          </Link>
        </div>
      </FadeIn>
      <div className="mt-10 grid gap-5">
        <ResumeBlock title="Education">
          <div className="rounded-md bg-muted p-4">
            <p className="font-semibold">{resumeEducation.institution}</p>
            <p className="text-sm text-muted-foreground">{resumeEducation.location}</p>
            <p className="mt-2">{resumeEducation.degree}</p>
            <p className="text-sm text-muted-foreground">{resumeEducation.detail}</p>
          </div>
        </ResumeBlock>
        <ResumeBlock title="Experience">
          {experience.map((item) => (
            <div key={item.title} className="rounded-md bg-muted p-4">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-muted-foreground">
                {item.company} - {item.year}
              </p>
              <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-muted-foreground">
                {item.bullets.map((bullet) => <li className="list-disc" key={bullet}>{bullet}</li>)}
              </ul>
            </div>
          ))}
        </ResumeBlock>
        <ResumeBlock title="Projects">
          {projects.map((project) => (
            <div key={project.slug} className="rounded-md bg-muted p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold">{project.title}: {project.subtitle}</p>
                <span className="text-sm text-muted-foreground">{project.period}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.contribution}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.evaluation}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                {project.links.filter((item) => item.label === "GitHub").map((item) => (
                  <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="text-primary hover:underline">GitHub project</a>
                ))}
              </div>
            </div>
          ))}
        </ResumeBlock>
        <ResumeBlock title="Publication & Award">
          {publications.map((item) => (
            <div key={item.title} className="rounded-md bg-muted p-4">
              <p className="font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.venue}</p>
            </div>
          ))}
          {awards.map((item) => (
            <div key={item.title} className="rounded-md bg-muted p-4">
              <p className="font-semibold">{item.result}, {item.title}</p>
            </div>
          ))}
        </ResumeBlock>
        <ResumeBlock title="Skills">
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((skill) => (
              <div key={skill.category} className="rounded-md border border-border bg-background p-4">
                <h3 className="font-medium">{skill.category}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{skill.items.join(" · ")}</p>
              </div>
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
