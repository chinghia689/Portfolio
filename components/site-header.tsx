import Link from "next/link";
import { Github } from "lucide-react";
import { getPortfolioContent } from "@/lib/portfolio-data";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function SiteHeader() {
  const { profile } = await getPortfolioContent();
  const navItems = [
    { href: "/#projects", label: "Projects" },
    { href: "/publications", label: "Publications" },
    { href: "/awards", label: "Awards" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/82 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm text-primary-foreground">
            NN
          </span>
          <span className="hidden sm:inline">Ngo Chi Nghia</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={profile.github}
            target="_blank"
            className={cn(buttonVariants({ variant: "secondary", size: "icon" }))}
            aria-label="GitHub"
            title="GitHub"
          >
            <Github className="h-4 w-4" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
