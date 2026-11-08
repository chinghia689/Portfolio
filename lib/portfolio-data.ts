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
  role: "AI Engineer | RAG, AI Agents, NLP & Computer Vision",
  summary:
    "I build AI systems across RAG, AI agents, NLP, and computer vision, from retrieval and model evaluation to FastAPI services and Docker-based deployment.",
  email: "chinghia689@gmail.com",
  location: "Can Tho, Vietnam · Open to relocation and on-site work",
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

export const resumeEducation = {
  institution: "Nam Can Tho University",
  location: "Can Tho, Vietnam",
  degree: "Bachelor of Engineering in Information Technology",
  detail: "GPA 3.44/4.00 · Graduated August 2026",
};

export const skills = [
  { category: "Programming", items: ["Python", "JavaScript", "C/C++"] },
  { category: "AI & Machine Learning", items: ["PyTorch", "TensorFlow", "YOLOv8", "Hugging Face Transformers", "RAG", "LangChain", "LangGraph", "scikit-learn", "Sentence Transformers", "Prompt engineering"] },
  { category: "LLM APIs", items: ["OpenAI", "Google Gemini", "Groq", "Ollama"] },
  { category: "Retrieval & Evaluation", items: ["multilingual-E5", "ChromaDB", "BM25", "Hybrid retrieval", "Reciprocal Rank Fusion (RRF)", "K-Means", "Energy distance", "MRR", "NDCG@5", "ROUGE-2", "BLEU-2"] },
  { category: "Backend & Deployment", items: ["FastAPI", "Pydantic", "REST API", "JWT", "OAuth 2.0", "Docker", "Docker Compose", "Ubuntu Linux"] },
  { category: "Data & Tools", items: ["SQLite", "PostgreSQL", "Git", "NumPy", "Pandas", "Claude Code CLI", "OpenAI Codex CLI"] },
  { category: "Languages", items: ["Vietnamese (Native)", "English (VSTEP B1)"] },
];

export const projects = [
  {
    slug: "agent-newsroom",
    title: "Agent Newsroom",
    subtitle: "Automated Football News to Vertical Video",
    period: "Jul–Oct 2026",
    icon: BrainCircuit,
    overview: "An end-to-end agent that turns football RSS feeds into vertical videos, from story discovery and cross-checking to publishing.",
    motivation: "Automate the editorial workflow while making source quality and uncertainty visible before a story is published.",
    contribution: "Built story clustering, cross-checking with Ollama and Qwen3, script generation, FFmpeg rendering, YouTube publishing, and a FastAPI + React review interface with per-stage latency telemetry.",
    evaluation: "The review interface reports mean, p50, and p95 latency for each pipeline stage. Conflicting sources cause stories to be downgraded to uncertain.",
    limitations: "Automated reporting still requires editorial review, especially when sources conflict or provide incomplete context.",
    stack: ["Python", "FastAPI", "React", "Ollama", "Qwen3", "FFmpeg"],
    metrics: [{ category: "Telemetry", name: "Per-stage latency", score: "Mean · p50 · p95" }],
    dataset: [{ label: "Input", value: "Football RSS feeds" }, { label: "Output", value: "Vertical video" }],
    links: [{ label: "GitHub", href: "https://github.com/chinghia689" }],
    architecture: ["RSS Feeds", "Story Clustering", "Source Checks", "LLM Script", "FFmpeg", "Review", "YouTube"],
    gallery: [],
  },
  {
    slug: "polyaqua-agent",
    title: "PolyAqua Agent",
    subtitle: "AI Assistant for Shrimp–Crab Polyculture",
    period: "Apr–May 2026",
    icon: BrainCircuit,
    overview: "An AI assistant combining shrimp disease image classification, document-grounded treatment guidance, and aquaculture calculators.",
    motivation: "Help farmers connect visual disease signals and pond conditions with practical, document-grounded recommendations.",
    contribution: "Built a FastAPI service with YOLOv8n-cls for four disease classes, a multilingual-E5 and BM25 hybrid RAG pipeline using RRF and ChromaDB, plus calculators for lime dosage, probiotics, and stocking density.",
    evaluation: "The image classifier achieved 84% validation accuracy and 78% test accuracy. The knowledge base contains 4,593 vectors from 13 technical documents.",
    limitations: "Classification and generated treatment guidance are decision-support tools and should be checked against local aquaculture expertise.",
    stack: ["Python", "FastAPI", "YOLOv8", "multilingual-E5", "BM25", "ChromaDB", "Docker Compose"],
    metrics: [{ category: "Image classification", name: "Validation accuracy", score: "84%" }, { category: "Image classification", name: "Test accuracy", score: "78%" }, { category: "Knowledge base", name: "Indexed vectors", score: "4,593 · 13 documents" }],
    dataset: [{ label: "Disease classes", value: "4" }, { label: "Technical documents", value: "13" }],
    links: [{ label: "GitHub", href: "https://github.com/chinghia689" }],
    architecture: ["Disease Image", "YOLOv8n-cls", "Diagnosis", "Hybrid RAG", "Pond Parameters", "Treatment Plan"],
    gallery: [],
  },
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
    venue: "Accepted at EAI AICON 2026 · Camera-ready in preparation",
    href: "/papers/erc-rag.pdf",
    icon: FileText,
  },
];

export const experience = [
  {
    year: "Mar 2026–Present",
    title: "AI Engineer (Generative AI)",
    company: "ADHIGHTECH (Tien Phong Engineering Technology Co., Ltd.) · Can Tho, Vietnam",
    bullets: [
      "Raised ROUGE-2 F1 from 0.49 to 0.68 on a 120K-chunk Vietnamese economic QA corpus by designing energy-distance cluster ranking with LLM relevance filtering; achieved MRR 0.62 and NDCG@5 0.83.",
      "Deployed the question-answering pipeline as a FastAPI REST service with Docker Compose on Ubuntu.",
      "Co-authored ERC-RAG, accepted at EAI AICON 2026; contributed to idea development, implementation, and experiments.",
    ],
    icon: Server,
  },
];

export const awards = [
  {
    title: "1st Place · Aspect-Based Sentiment Analysis",
    result: "FPTU Can Tho Olympic AI 2026 · Individual on-site final · 15 finalists from 100+ participants · May 2026",
    evidence: "/awards/top1.png",
    evidenceAlt: "Final private leaderboard showing Ngo Chi Nghia in first place for Aspect Sentiment Analysis",
    icon: Award,
  },
  {
    title: "4th Place · Rice Variety Image Classification",
    result: "FPTU Can Tho Olympic AI 2026 · Individual on-site final · 15 finalists from 100+ participants · May 2026",
    evidence: "/awards/top4.png",
    evidenceAlt: "Final private leaderboard showing Ngo Chi Nghia in fourth place for rice variety image classification",
    icon: Award,
  },
];

export const contactLinks = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "LinkedIn", value: "linkedin.com/in/chinghia010804", href: profile.linkedin, icon: Linkedin },
  { label: "GitHub", value: "github.com/chinghia689", href: profile.github, icon: Github },
  { label: "Location", value: profile.location, href: "#", icon: MapPin },
];

const PORTFOLIO_CONTENT_VERSION = 2;

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
  contentVersion: number;
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
    contentVersion: PORTFOLIO_CONTENT_VERSION,
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

    // Migrate older CMS content to the current CV-aligned defaults while
    // retaining media that was uploaded through the admin panel.
    if (stored.contentVersion !== PORTFOLIO_CONTENT_VERSION || !Array.isArray(stored.skills) || !stored.skills.every((skill) =>
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
