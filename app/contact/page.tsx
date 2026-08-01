import Link from "next/link";
import { Send } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { contactLinks } from "@/lib/portfolio-data";

export const metadata = {
  title: "Contact",
  description: "Contact Ngo Chi Nghia for AI Engineering roles and collaboration.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
      <FadeIn>
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
          Contact
        </p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
          Let&apos;s build useful AI systems.
        </h1>
        <p className="mt-5 leading-7 text-muted-foreground">
          Reach out for AI Engineer roles, RAG projects, computer vision workflows
          or research collaboration.
        </p>
      </FadeIn>
      <FadeIn delay={0.08}>
        <Card className="p-6">
          <div className="grid gap-4">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 rounded-md border border-border bg-background p-4 hover:border-primary/50"
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{link.label}</p>
                    <p className="text-sm text-muted-foreground">{link.value}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <Button className="mt-6 w-full">
            <Send className="h-4 w-4" />
            Send Message
          </Button>
        </Card>
      </FadeIn>
    </main>
  );
}
