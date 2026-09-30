import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const mimeTypes: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
  mp4: "video/mp4",
  webm: "video/webm",
  pdf: "application/pdf",
};

export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  const match = /^([0-9a-f-]{36})\.(jpg|png|webp|gif|avif|mp4|webm|pdf)$/i.exec(filename);
  if (!match) return new NextResponse("Not found", { status: 404 });
  try {
    const file = await readFile(path.join(process.cwd(), "data", "uploads", filename));
    return new NextResponse(file, {
      headers: {
        "Content-Type": mimeTypes[match[2].toLowerCase()],
        "Content-Length": String(file.byteLength),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
