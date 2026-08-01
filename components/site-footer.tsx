import Link from "next/link";
import { contactLinks } from "@/lib/portfolio-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="text-sm font-semibold">Ngo Chi Nghia</p>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Built with Next.js, Tailwind CSS, TypeScript and Vercel.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {contactLinks.slice(0, 3).map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
