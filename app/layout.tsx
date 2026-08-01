import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ngochinghia.dev"),
  title: {
    default: "Ngo Chi Nghia | AI Engineer",
    template: "%s | Ngo Chi Nghia",
  },
  description:
    "AI Engineer portfolio focused on LLM, RAG, computer vision, FastAPI, Docker and production-ready AI systems.",
  keywords: [
    "Ngo Chi Nghia",
    "AI Engineer",
    "LLM",
    "RAG",
    "Computer Vision",
    "FastAPI",
    "LangGraph",
    "Next.js",
  ],
  openGraph: {
    title: "Ngo Chi Nghia | AI Engineer",
    description:
      "Production-ready AI systems with Retrieval-Augmented Generation, FastAPI, Docker and LangGraph.",
    url: "https://ngochinghia.dev",
    siteName: "Ngo Chi Nghia Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen bg-background">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  );
}
