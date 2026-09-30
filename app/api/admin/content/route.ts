import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getPortfolioContent, savePortfolioContent, type PortfolioContent } from "@/lib/portfolio-data";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getPortfolioContent());
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const content = await request.json().catch(() => null);
  if (!content || typeof content !== "object" || !content.profile || !Array.isArray(content.projects) || content.projects.length === 0) {
    return NextResponse.json({ error: "Invalid portfolio content." }, { status: 400 });
  }
  await savePortfolioContent(content as PortfolioContent);
  return NextResponse.json({ saved: true });
}
