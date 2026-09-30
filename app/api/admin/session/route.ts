import { NextResponse } from "next/server";
import { clearAdminSession, createAdminSession, verifyPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "ADMIN_PASSWORD is not configured on the server." }, { status: 503 });
  }
  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  if (!body?.password || !verifyPassword(body.password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  await createAdminSession();
  return NextResponse.json({ authenticated: true });
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ authenticated: false });
}
