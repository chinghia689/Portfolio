import { AdminPanel } from "@/components/admin-panel";

export const metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminPanel />;
}
