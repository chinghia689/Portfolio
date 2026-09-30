import Link from "next/link";
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import Image from "next/image";
import { ArchitectureFlow } from "@/components/architecture-flow";
import { Counter, FadeIn, MotionDiv, MotionSection } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { Button, buttonVariants } from "@/components/ui/button";
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
  const { awards, experience, profile, projects, publications, skills, timeline } = content;
  const links = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { label: "LinkedIn", value: profile.linkedin.replace(/^https?:\/\//, ""), href: profile.linkedin, icon: Linkedin },
    { label: "GitHub", value: profile.github.replace(/^https?:\/\//, ""), href: profile.github, icon: Github },
    { label: "Location", value: profile.location, href: "#", icon: MapPin },
  ];
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="particle-field absolute inset-0 opacity-70" />
        <div className="grid-mask absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_30%,rgba(59,130,246,0.18),transparent_28%),linear-gradient(to_bottom,transparent,rgba(9,9,11,0.72))]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <FadeIn>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">
                AI Engineer Portfolio
              </p>
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
                <Link
                  href={profile.github}
                  target="_blank"
                  className={cn(buttonVariants({ variant: "secondary" }))}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
                <Link
                  href={profile.linkedin}
                  target="_blank"
                  className={cn(buttonVariants({ variant: "secondary" }))}
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Link>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "secondary" }))}
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg border border-border bg-card p-4 shadow-glow">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.28),transparent_34%)]" />
              <div className="relative flex h-full flex-col justify-between rounded-md border border-border/80 bg-background/72 p-6 backdrop-blur">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>LLM / RAG</span>
                  <span>2026</span>
                </div>
                <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-5xl font-semibold text-primary">
                  <Image
                    src={profile.avatar || "/avatar.jpg"}
                    alt="Ngo Chi Nghia"
                    width={180}
                    height={180}
                    className="mx-auto h-40 w-40 rounded-full border border-primary/40 object-cover"
                  />
                </div>
                <div>
                  <div className="h-2 w-24 rounded-full bg-primary" />
                  <p className="mt-4 text-2xl font-semibold">Production AI Systems</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    RAG pipelines, computer vision, APIs, containers and evaluation.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
          <ArrowDown className="absolute bottom-6 left-1/2 hidden h-5 w-5 -translate-x-1/2 text-muted-foreground md:block" />
        </div>
      </section>

      <MotionSection
        id="about"
        className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.75fr_1fr] lg:px-8"
      >
        <FadeIn>
          <div className="aspect-square overflow-hidden rounded-lg border border-border bg-card p-6">
            <div className="flex h-full items-center justify-center rounded-md bg-muted">
              <div className="text-center">
                <Image
                  src={profile.avatar || "/avatar.jpg"}
                  alt="Ngo Chi Nghia"
                  width={180}
                  height={180}
                  className="mx-auto h-40 w-40 rounded-full border border-primary/40 object-cover"
                />
              </div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
            About
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            From information technology to applied LLM systems.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            I focus on reliable AI products: retrieval pipelines, LLM evaluation,
            FastAPI services, containerized deployment and computer vision workflows.
            My work connects research experiments with interfaces and infrastructure
            that can be tested, shipped and improved.
          </p>
          <div className="mt-8 grid gap-4">
            {timeline.map((item, index) => (
              <div key={`${item.year}-${item.title}`} className="grid grid-cols-[72px_1fr] gap-4">
                <div className="text-sm font-semibold text-primary">{item.year}</div>
                <div className="relative border-l border-border pb-6 pl-5 last:pb-0">
                  <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary" />
                  <p className="font-medium">{item.title}</p>
                  {index < timeline.length - 1 ? (
                    <ArrowDown className="mt-3 h-4 w-4 text-muted-foreground" />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </MotionSection>

      <section className="border-y border-border bg-card/35">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
              Skills
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Focused stack for AI products.
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <FadeIn key={skill.name} delay={index * 0.04}>
                <Card className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                    <MotionDiv
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.1 }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
            Featured Projects
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Production-minded AI systems.
          </h2>
        </FadeIn>
        <div className="mt-10 grid gap-5">
            {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={{ ...project, icon: resolvePortfolioIcon(project.icon) }} index={index} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/35">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <FadeIn>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
              ERC-RAG Architecture
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Retrieval flow built for cleaner context.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              The core pipeline embeds the question, retrieves candidates, clusters
              them with KMeans, applies energy distance and sends selected context to
              the LLM for answer generation.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <ArchitectureFlow steps={projects[0].architecture} />
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {projects[0].dataset.map((item) => (
            <Card key={item.label} className="p-6">
              <p className="text-4xl font-semibold text-primary">
                <Counter value={Number(item.value.replace(",", ""))} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
            </Card>
          ))}
          <Card className="p-6">
            <p className="text-4xl font-semibold text-primary">
              <Counter value={projects.length} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Featured systems</p>
          </Card>
        </div>
      </section>

      <section className="border-y border-border bg-card/35">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
          <InfoColumn title="Publications" items={publications.map((p) => `${p.title} - ${p.venue}`)} />
          <InfoColumn title="Experience" items={experience.map((e) => `${e.year} - ${e.title}, ${e.company}`)} />
          <InfoColumn title="Awards" items={awards.map((a) => `${a.title} - ${a.result}`)} />
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
              <Button className="mt-5 w-full">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </Card>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

function InfoColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <FadeIn>
      <Card className="h-full p-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="mt-5 grid gap-3">
          {items.map((item) => (
            <p key={item} className="rounded-md bg-background px-4 py-3 text-sm text-muted-foreground">
              {item}
            </p>
          ))}
        </div>
      </Card>
    </FadeIn>
  );
}
