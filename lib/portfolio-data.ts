import {
  Award,
  BrainCircuit,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Server,
  ShieldCheck,
} from "lucide-react";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

export const profile = {
  name: "Ngo Chi Nghia",
  role: "AI Engineer | GenAI, LLM & RAG",
  summary:
    "I build and evaluate RAG systems for Vietnamese domains, spanning retrieval methods, retrieval and answer evaluation, FastAPI services, and Docker-based deployment.",
  email: "chinghia689@gmail.com",
  location: "Can Tho, Vietnam",
  github: "https://github.com/chinghia689",
  linkedin: "https://www.linkedin.com/in/chinghia010804/",
  resume: "/resume.pdf",
  avatar: "/avatar.jpg",
};

export const navItems = [
  { href: "/#projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/awards", label: "Awards" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export const skills = [
  { category: "Programming", items: ["Python"] },
  { category: "LLM & RAG", items: ["OpenAI API", "Gemini API", "Groq API", "RAG", "Prompt engineering"] },
  { category: "Retrieval", items: ["multilingual-E5", "ChromaDB", "BM25", "Hybrid retrieval", "Reciprocal Rank Fusion (RRF)", "K-Means", "Energy distance"] },
  { category: "Evaluation", items: ["MRR", "NDCG@5", "ROUGE-2", "BLEU-2"] },
  { category: "Backend & Deployment", items: ["FastAPI", "LangChain", "LangGraph", "Docker", "Docker Compose", "Ubuntu Linux"] },
  { category: "Tools & Data", items: ["Git", "GitHub", "NumPy", "Pandas", "Claude Code", "OpenAI Codex CLI"] },
  { category: "Languages", items: ["Vietnamese (Native)", "English (VSTEP B1)"] },
];

export const projects = [
  {
    slug: "erc-rag",
    title: "ERC-RAG",
    subtitle: "Energy-Based Retrieval Clustering",
    period: "Mar–Jul 2026",
    icon: BrainCircuit,
    overview:
      "A research prototype for Vietnamese economic question answering. It retrieves 40 multilingual-E5 candidates, clusters them with K-Means using silhouette-based selection, ranks clusters by energy distance, then applies LLM relevance filtering.",
    motivation:
      "The project studies cluster-level retrieval and context selection for Vietnamese economic questions using the VEID corpus and VNEIQAD benchmark.",
    contribution:
      "Designed and implemented the retrieval pipeline, integrated the LLM relevance-filtering stage, and ran retrieval and answer-generation experiments as a co-author.",
    evaluation:
      "Evaluated 1,000 automatically generated VNEIQAD question-answer pairs over 120,165 VEID chunks. Retrieval: MRR 0.62 and NDCG@5 0.83. Answer generation with GPT-5.0 mini: ROUGE-2 F1 0.68 and BLEU-2 0.65.",
    limitations:
      "The VNEIQAD questions were automatically generated, so the reported scores should be treated as preliminary rather than as an independently curated benchmark. The answer-generation comparison with the earlier group system is also not controlled because it used GPT-4o-mini instead of GPT-5.0 mini.",
    stack: ["Python", "FastAPI", "ChromaDB", "LangChain", "Docker", "OpenAI"],
    metrics: [
      { category: "Retrieval", name: "MRR", score: "0.62" },
      { category: "Retrieval", name: "NDCG@5", score: "0.83" },
      { category: "Generation · GPT-5.0 mini", name: "ROUGE-2 F1", score: "0.68" },
      { category: "Generation · GPT-5.0 mini", name: "BLEU-2", score: "0.65" },
    ],
    dataset: [
      { label: "VNEIQAD questions", value: "1,000" },
      { label: "VEID chunks", value: "120,165" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/chinghia689/economy_rag_ebd_kmeans_llm_TIEN_PHONG_TT_VL_2026" },
      { label: "Paper", href: "/papers/erc-rag.pdf" },
    ],
    architecture: [
      "Question",
      "Embedding",
      "Retriever",
      "KMeans",
      "Energy Distance",
      "LLM",
      "Answer",
    ],
    gallery: [],
  },
  {
    slug: "legal-rag",
    title: "Legal RAG",
    subtitle: "Dockerized legal assistant",
    period: "Jan–Mar 2026",
    icon: ShieldCheck,
    overview:
      "A learning-oriented Vietnamese legal-document RAG application with ChromaDB and BM25 hybrid retrieval, LangGraph orchestration, FastAPI, and Docker Compose.",
    motivation:
      "The prototype explores document processing, hybrid retrieval, and context-grounded question answering over legal, IT, and cybersecurity documents.",
    contribution:
      "Built document processing and retrieval flows, connected the LangGraph question-answering workflow, and containerized the application for deployment.",
    evaluation:
      "Indexed 6 documents into 1,035 chunks. In a preliminary set of 30 questions generated from article titles, the expected source file and article appeared in the merged ChromaDB + BM25 top 20 for 27 questions (90%).",
    limitations:
      "This is a small preliminary retrieval evaluation. It measures source/article retrieval only; answer accuracy and faithfulness have not been evaluated.",
    stack: ["Docker", "Nginx", "LangGraph", "React", "FastAPI", "RAG"],
    metrics: [
      { category: "Retrieval", name: "Expected source + article in top 20", score: "27/30 (90%)" },
    ],
    dataset: [
      { label: "Source documents", value: "6" },
      { label: "Indexed chunks", value: "1,035" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/chinghia689/vietnamese-legal-rag" },
    ],
    architecture: ["Question", "Router", "Retriever", "LangGraph", "Citation", "Answer"],
    gallery: [],
  },
];

export const publications = [
  {
    title: "ERC-RAG: An Energy-based Retrieval Clustering for RAG in Vietnamese Economy Chatbots",
    venue: "Co-author · Submitted to ICEIR 2026 · Under review",
    href: "/papers/erc-rag.pdf",
    icon: FileText,
  },
];

export const experience = [
  {
    year: "Mar–Jul 2026",
    title: "AI Engineer Intern (Generative AI)",
    company: "ADHIGHTECH (Tien Phong Engineering Technology Co., Ltd.) · Can Tho, Vietnam",
    bullets: [
      "Implemented dense, BM25, hybrid, and cluster-based retrieval for Vietnamese economic question answering, including energy-distance ranking and LLM relevance filtering.",
      "Built a FastAPI REST service and containerized the pipeline with Docker Compose on Ubuntu Linux.",
    ],
    icon: Server,
  },
];

export const awards = [
  {
    title: "Olympic AI",
    result: "Finalist · FPTU Can Tho · May 2026",
    icon: Award,
  },
];

export const contactLinks = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "LinkedIn", value: "linkedin.com/in/chinghia010804", href: profile.linkedin, icon: Linkedin },
  { label: "GitHub", value: "github.com/chinghia689", href: profile.github, icon: Github },
  { label: "Location", value: profile.location, href: "#", icon: MapPin },
];

const iconByName = {
  BrainCircuit,
  ShieldCheck,
  FileText,
  Server,
  Award,
  Mail,
  Linkedin,
  Github,
  MapPin,
} as const;

export type PortfolioContent = {
  profile: typeof profile;
  skills: typeof skills;
  projects: Array<Omit<(typeof projects)[number], "icon" | "gallery"> & {
    icon: string;
    gallery: Array<string | { url: string; type?: string; caption?: string }>;
  }>;
  publications: Array<Omit<(typeof publications)[number], "icon"> & { icon: string }>;
  experience: Array<Omit<(typeof experience)[number], "icon"> & { icon: string }>;
  awards: Array<Omit<(typeof awards)[number], "icon"> & { icon: string }>;
};

const dataFile = path.join(process.cwd(), "data", "portfolio.json");
let schemaReady: Promise<void> | undefined;

function getDatabase() {
  const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  return connectionString ? neon(connectionString) : null;
}

async function ensurePortfolioTable(sql: NonNullable<ReturnType<typeof getDatabase>>) {
  schemaReady ??= sql`CREATE TABLE IF NOT EXISTS portfolio_content (
    id text PRIMARY KEY,
    content jsonb NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now()
  )`.then(() => undefined);
  await schemaReady;
}

function getDefaultPortfolioContent(): PortfolioContent {
  const iconName = (icon: unknown) =>
    Object.entries(iconByName).find(([, component]) => component === icon)?.[0] ?? "FileText";
  return {
    profile,
    skills,
    projects: projects.map(({ icon, ...project }) => ({ ...project, icon: iconName(icon) })),
    publications: publications.map(({ icon, ...item }) => ({ ...item, icon: iconName(icon) })),
    experience: experience.map(({ icon, ...item }) => ({ ...item, icon: iconName(icon) })),
    awards: awards.map(({ icon, ...item }) => ({ ...item, icon: iconName(icon) })),
  };
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const sql = getDatabase();
  if (sql) {
    await ensurePortfolioTable(sql);
    const rows = await sql`SELECT content FROM portfolio_content WHERE id = 'main'`;
    const stored = rows[0]?.content as PortfolioContent | undefined;
    if (!stored) return getDefaultPortfolioContent();

    // Older CMS records use percentage-based skills and placeholder galleries.
    // Fall back to the CV-aligned defaults until the admin saves the new schema.
    if (!Array.isArray(stored.skills) || !stored.skills.every((skill) =>
      Boolean(skill) && typeof skill.category === "string" && Array.isArray(skill.items))) {
      const defaults = getDefaultPortfolioContent();
      const storedAvatar = stored.profile?.avatar;
      const savedGalleryBySlug = new Map(
        (stored.projects ?? []).map((project) => [
          project.slug,
          (Array.isArray(project.gallery) ? project.gallery : []).filter((media) => typeof media !== "string" && Boolean(media.url)),
        ]),
      );
      return {
        ...defaults,
        profile: { ...defaults.profile, avatar: storedAvatar || defaults.profile.avatar },
        projects: defaults.projects.map((project) => ({
          ...project,
          gallery: savedGalleryBySlug.get(project.slug) ?? project.gallery,
        })),
      };
    }
    return stored;
  }

  let stored: string;
  try {
    stored = await readFile(dataFile, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    return getDefaultPortfolioContent();
  }
  return JSON.parse(stored) as PortfolioContent;
}

export async function savePortfolioContent(content: PortfolioContent) {
  const sql = getDatabase();
  if (sql) {
    await ensurePortfolioTable(sql);
    const json = JSON.stringify(content);
    await sql`INSERT INTO portfolio_content (id, content, updated_at)
      VALUES ('main', ${json}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, updated_at = now()`;
    return;
  }

  const directory = path.dirname(dataFile);
  await mkdir(directory, { recursive: true });
  const temporary = `${dataFile}.${randomUUID()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  await rename(temporary, dataFile);
}

export function resolvePortfolioIcon(name: string) {
  return iconByName[name as keyof typeof iconByName] ?? FileText;
}
