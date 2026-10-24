import {
  Award,
  Bot,
  BrainCircuit,
  Database,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Server,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

export const profile = {
  name: "Ngo Chi Nghia",
  role: "AI Engineer | GenAI, RAG & Retrieval Evaluation",
  summary:
    "Building and evaluating AI applications with retrieval-augmented generation, Python APIs, and modern web tools.",
  email: "chinghia689@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
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

export const timeline = [
  { year: "2022", title: "Started Information Technology" },
  { year: "2025", title: "Research in LLM & RAG" },
  { year: "2026", title: "AI Engineer Intern" },
  { year: "2026", title: "ERC-RAG Paper" },
  { year: "2026", title: "Olympic AI Finalist" },
];

export const skills = [
  { name: "Python", level: 100 },
  { name: "FastAPI", level: 100 },
  { name: "LangChain", level: 90 },
  { name: "Docker", level: 80 },
  { name: "YOLOv8", level: 80 },
  { name: "React", level: 70 },
];

export const projects = [
  {
    slug: "erc-rag",
    title: "ERC-RAG",
    subtitle: "Energy-Based Retrieval Clustering",
    icon: BrainCircuit,
    overview:
      "Research prototype testing whether energy-distance-based cluster selection can improve retrieved context over a multilingual-E5 cosine baseline. Comparative results are still being validated.",
    motivation:
      "The project studies whether grouping candidate passages before context selection can reduce noisy or redundant evidence in Vietnamese economic question answering.",
    stack: ["Python", "FastAPI", "ChromaDB", "LangChain", "Docker", "OpenAI"],
    metrics: [
      { name: "Cosine baseline MRR", score: "0.7352" },
      { name: "Cosine baseline Hit@5", score: "0.8040" },
      { name: "Cosine baseline NDCG@5", score: "0.9805" },
      { name: "ERC comparison", score: "In progress" },
    ],
    dataset: [
      { label: "VEID documents", value: "27,682" },
      { label: "Chunks", value: "120,165" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/chinghia689/economy_rag_ebd_kmeans_llm_TIEN_PHONG_TT_VL_2026" },
      { label: "Demo", href: "https://vietecochat.site/" },
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
    gallery: ["Screenshot", "Architecture", "Chart", "GIF"],
  },
  {
    slug: "polyaqua",
    title: "PolyAqua",
    subtitle: "Aquaculture AI platform",
    icon: Bot,
    overview:
      "A production-oriented aquaculture assistant combining YOLO detection, RAG search and operational dashboards.",
    motivation:
      "Farm operators need fast visual screening and reliable answers from internal aquaculture documents without switching tools.",
    stack: ["YOLO", "RAG", "Disease Detection", "BM25", "ChromaDB", "RRF"],
    metrics: [
      { name: "Detection", score: "YOLO" },
      { name: "Retrieval", score: "RRF" },
      { name: "Search", score: "BM25" },
      { name: "Vector DB", score: "Chroma" },
    ],
    dataset: [
      { label: "Vision task", value: "Disease Detection" },
      { label: "Knowledge base", value: "Aquaculture RAG" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/chinghia689/AI_polyculture" },
      { label: "Demo", href: "https://polyaqua.site/app" },
    ],
    architecture: ["Image", "YOLO", "Diagnosis", "Query", "Hybrid Search", "Answer"],
    gallery: ["Detection", "Knowledge Base", "Dashboard", "Report"],
  },
  {
    slug: "legal-rag",
    title: "Legal RAG",
    subtitle: "Dockerized legal assistant",
    icon: ShieldCheck,
    overview:
      "A Vietnamese legal-document RAG prototype with hybrid ChromaDB/BM25 retrieval and a FastAPI, LangGraph, and React application.",
    motivation:
      "Legal search needs traceable source retrieval and careful evaluation of both retrieved provisions and generated answers.",
    stack: ["Docker", "Nginx", "LangGraph", "React", "FastAPI", "RAG"],
    metrics: [
      { name: "Retrieval pilot", score: "27/30" },
      { name: "Retrieval scope", score: "Top-20" },
      { name: "Answer accuracy", score: "Not evaluated" },
      { name: "Workflow", score: "LangGraph" },
    ],
    dataset: [
      { label: "Source documents", value: "6" },
      { label: "Indexed chunks", value: "1,035" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/chinghia689/vietnamese-legal-rag" },
      { label: "Demo", href: "https://lawchat.me/" },
    ],
    architecture: ["Question", "Router", "Retriever", "LangGraph", "Citation", "Answer"],
    gallery: ["Chat", "Sources", "Containers", "Deploy"],
  },
  {
    slug: "cifake",
    title: "CIFAKE",
    subtitle: "AI-generated image classifier",
    icon: Database,
    overview:
      "Computer vision experiment for distinguishing synthetic and real images with clean evaluation reporting.",
    motivation:
      "AI image detection is useful for media verification workflows and gives a compact benchmark for model evaluation.",
    stack: ["Python", "PyTorch", "Computer Vision", "Evaluation"],
    metrics: [
      { name: "Task", score: "Binary" },
      { name: "Domain", score: "Vision" },
      { name: "Output", score: "Report" },
      { name: "Focus", score: "Robustness" },
    ],
    dataset: [
      { label: "Problem", value: "Real vs AI" },
      { label: "Pipeline", value: "Train/Eval" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/chinghia689/AI_Engineer/tree/main/Fake_Real" }],
    architecture: ["Image", "Preprocess", "Model", "Classifier", "Score"],
    gallery: ["Samples", "Training", "Metrics", "Confusion Matrix"],
  },
];

export const publications = [
  {
    title: "ERC-RAG",
    venue: "Submitted to CSoNet 2026",
    href: "/papers/erc-rag.pdf",
    icon: FileText,
  },
];

export const experience = [
  {
    year: "2026",
    title: "AI Engineer Intern",
    company: "Tien Phong Engineering",
    icon: Server,
  },
];

export const awards = [
  {
    title: "Olympic AI",
    result: "Finalist",
    icon: Trophy,
  },
  {
    title: "Research Portfolio",
    result: "LLM & RAG Focus",
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
  Bot,
  ShieldCheck,
  Database,
  FileText,
  Server,
  Trophy,
  Award,
  Mail,
  Linkedin,
  Github,
  MapPin,
} as const;

export type PortfolioContent = {
  profile: typeof profile;
  timeline: typeof timeline;
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
    timeline,
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
    return (rows[0]?.content as PortfolioContent | undefined) ?? getDefaultPortfolioContent();
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
