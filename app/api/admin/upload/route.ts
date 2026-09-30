import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import type { HandleUploadBody } from "@vercel/blob/client";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const maxDuration = 60;

const allowedTypes: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "application/pdf": ".pdf",
};

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ mode: process.env.BLOB_STORE_ID ? "blob" : "local" });
}

export async function POST(request: Request) {
  if (process.env.BLOB_STORE_ID) {
    try {
      const { handleUpload } = await import("@vercel/blob/client");
      const body = (await request.json()) as HandleUploadBody;
      const response = await handleUpload({
        body,
        request,
        onBeforeGenerateToken: async () => {
          if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");
          return {
            allowedContentTypes: Object.keys(allowedTypes),
            maximumSizeInBytes: 100 * 1024 * 1024,
            addRandomSuffix: true,
          };
        },
        onUploadCompleted: async () => {},
      });
      return NextResponse.json(response);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Upload failed." },
        { status: 400 },
      );
    }
  }

  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Select an image or video." }, { status: 400 });
  const extension = allowedTypes[file.type];
  if (!extension) return NextResponse.json({ error: "Use JPG, PNG, WebP, GIF, AVIF, MP4 or WebM." }, { status: 415 });
  if (file.size > 100 * 1024 * 1024) return NextResponse.json({ error: "Maximum upload size is 100 MB." }, { status: 413 });
  const directory = path.join(process.cwd(), "data", "uploads");
  await mkdir(directory, { recursive: true });
  const filename = `${randomUUID()}${extension}`;
  await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
  const type = file.type.startsWith("video/") ? "video" : file.type === "application/pdf" ? "document" : "image";
  return NextResponse.json({ url: `/api/media/${filename}`, type });
}
