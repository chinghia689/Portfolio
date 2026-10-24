import Link from "next/link";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import Image from "next/image";
import { FadeIn } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getPortfolioContent,
  resolvePortfolioIcon,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function Home() {
  const contentPromise = getPortfolioContent();
  return <HomeContent contentPromise={contentPromise} />;
}

async function HomeContent({ contentPromise }: { contentPromise: ReturnType<typeof getPortfolioContent> }) {
  const content = await contentPromise;
  const { awards, experience, profile, projects, publications, skills } = content;
  const featuredProjects = projects.filter((project) => ["erc-rag", "legal-rag"].includes(project.slug));
  const links = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { label: "LinkedIn", value: profile.linkedin.replace(/^https?:\/\//, ""), href: profile.linkedin, icon: Linkedin },
    { label: "GitHub", value: profile.github.replace(/^https?:\/\//, ""), href: profile.github, icon: Github },
  ];
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="particle-field absolute inset-0 opacity-70" />
        <div className="grid-mask absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_30%,rgba(59,130,246,0.18),transparent_28%),linear-gradient(to_bottom,transparent,rgba(9,9,11,0.72))]" />
        <div className="relative mx-auto grid min-h-[calc(82vh-4rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <FadeIn>
            <div>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight text-balance sm:text-6xl lg:text-7xl">
                {profile.name}
              </h1>
              <p className="mt-5 max-w-2xl text-xl text-muted-foreground">
                {profile.role}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {profile.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={profile.resume} className={cn(buttonVariants())}>
                  <Download className="h-4 w-4" />
                  Resume
                </Link>
                <Link href={profile.github} target="_blank" className={cn(buttonVariants({ variant: "secondary" }))}>
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              </div>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <Link href={profile.linkedin} target="_blank" className="hover:text-foreground">LinkedIn</Link>
                <Link href={`mailto:${profile.email}`} className="hover:text-foreground">{profile.email}</Link>
                <span>{profile.location} · Open to relocation and on-site work</span>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative mx-auto w-full max-w-sm rounded-xl border border-border bg-card p-3 shadow-glow">
              <Image
                src={profile.avatar || "/avatar.jpg"}
                alt="Ngo Chi Nghia"
                width={520}
                height={520}
                priority
                className="aspect-square w-full rounded-lg object-cover"
              />
              <p className="px-3 pb-2 pt-4 text-sm text-muted-foreground">GenAI · Retrieval · Backend engineering</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
            Selected Projects
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Vietnamese RAG systems and evaluation.
          </h2>
        </FadeIn>
        <div className="mt-10 grid gap-5">
            {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={{ ...project, icon: resolvePortfolioIcon(project.icon) }} index={index} />
          ))}
        </div>
      </section>

      <section id="experience" className="border-y border-border bg-card/35">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">Experience</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Applied GenAI engineering</h2>
          </FadeIn>
          {experience.map((item) => (
            <FadeIn key={item.title}>
              <Card className="mt-8 p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-1 text-muted-foreground">{item.company}</p>
                  </div>
                  <span className="text-sm font-medium text-primary">{item.year}</span>
                </div>
                <ul className="mt-6 grid gap-3 text-sm leading-6 text-muted-foreground">
                  {item.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span className="text-primary">•</span><span>{bullet}</span></li>)}
                </ul>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">Skills</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Tools and methods</h2>
        </FadeIn>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <Card key={skill.category} className="p-5">
              <h3 className="font-semibold">{skill.category}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{skill.items.join(" · ")}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/35">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
          <Card className="p-6">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Education</p>
            <h3 className="mt-4 text-xl font-semibold">Nam Can Tho University</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">B.Eng. in Information Technology · GPA 3.44/4.00</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Publication</p>
            <h3 className="mt-4 text-lg font-semibold">{publications[0]?.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{publications[0]?.venue}</p>
            <Link href="/publications" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">Research details <ArrowUpRight className="h-4 w-4" /></Link>
          </Card>
          <Card className="p-6">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Recognition</p>
            <h3 className="mt-4 text-xl font-semibold">{awards[0]?.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{awards[0]?.result}</p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <FadeIn>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Open to AI Engineer roles and research collaboration.
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Card className="p-6">
              <div className="grid gap-4">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-3 rounded-md border border-border bg-background p-3 text-sm hover:border-primary/50"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{link.value}</span>
                    </Link>
                  );
                })}
              </div>
              <Link href={`mailto:${profile.email}`} className={cn(buttonVariants(), "mt-5 w-full")}>
                <Send className="h-4 w-4" />
                Email me
              </Link>
            </Card>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
