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
  metadataBase: new URL("https://portfolio-chinghia.vercel.app"),
  title: {
    default: "Ngo Chi Nghia | AI Engineer",
    template: "%s | Ngo Chi Nghia",
  },
  description:
    "Entry-level AI Engineer portfolio focused on Generative AI, LLM applications, Vietnamese RAG, retrieval evaluation, FastAPI and Docker.",
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
      "GenAI and Vietnamese RAG projects, retrieval evaluation, FastAPI services and Docker deployment.",
    url: "https://portfolio-chinghia.vercel.app",
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
