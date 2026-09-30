import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "portfolio_admin";
const lifetimeSeconds = 60 * 60 * 24 * 7;

function signature(expires: string, secret: string) {
  return createHmac("sha256", secret).update(expires).digest("hex");
}

export function verifyPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(password), Buffer.from(expected));
}

export async function createAdminSession() {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD is not configured");
  const expires = String(Math.floor(Date.now() / 1000) + lifetimeSeconds);
  const jar = await cookies();
  jar.set(cookieName, `${expires}.${signature(expires, secret)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: lifetimeSeconds,
  });
}

export async function clearAdminSession() {
  (await cookies()).delete(cookieName);
}

export async function isAdminAuthenticated() {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return false;
  const [expires, supplied] = token.split(".");
  if (!expires || !supplied || Number(expires) < Date.now() / 1000) return false;
  const expected = signature(expires, secret);
  if (supplied.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}
