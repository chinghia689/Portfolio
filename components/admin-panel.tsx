"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { upload as uploadBlob } from "@vercel/blob/client";
import { Check, CloudUpload, LogOut, LockKeyhole, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Content = {
  profile: Record<string, string>;
  projects: Array<{ slug: string; title: string; gallery: Array<string | { url: string; type?: string; caption?: string }> }>;
  [key: string]: unknown;
};

export function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<Content | null>(null);
  const [text, setText] = useState("");
  const [projectSlug, setProjectSlug] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [jsonError, setJsonError] = useState("");

  const loadContent = useCallback(async () => {
    const response = await fetch("/api/admin/content", { cache: "no-store" });
    if (response.status === 401) return false;
    const data = (await response.json()) as Content;
    setContent(data);
    setText(JSON.stringify(data, null, 2));
    setProjectSlug(data.projects[0]?.slug ?? "");
    setEditSlug(data.projects[0]?.slug ?? "");
    setAuthenticated(true);
    return true;
  }, []);

  useEffect(() => { void loadContent(); }, [loadContent]);

  const parsed = useMemo(() => {
    try {
      return JSON.parse(text) as Content;
    } catch {
      return null;
    }
  }, [text]);
  const editingProject = parsed?.projects.find((item) => item.slug === editSlug);

  function updateContent(update: (data: Content) => void) {
    if (!parsed) return;
    const next = structuredClone(parsed);
    update(next);
    setText(JSON.stringify(next, null, 2));
  }

  function addProject() {
    if (!parsed) return;
    const slug = `project-${Date.now()}`;
    updateContent((data) => {
      data.projects.push({
        slug,
        title: "New project",
        subtitle: "Project subtitle",
        icon: "BrainCircuit",
        overview: "",
        motivation: "",
        stack: [],
        metrics: [],
        dataset: [],
        links: [],
        architecture: [],
        gallery: [],
      } as Content["projects"][number]);
    });
    setEditSlug(slug);
    setProjectSlug(slug);
  }

  useEffect(() => {
    if (!text) return setJsonError("");
    try {
      JSON.parse(text);
      setJsonError("");
    } catch (error) {
      setJsonError(error instanceof Error ? error.message : "Invalid JSON");
    }
  }, [text]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const response = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (response.ok) {
      setMessage("");
      await loadContent();
    } else {
      const result = await response.json();
      setMessage(result.error ?? "Unable to sign in.");
    }
    setBusy(false);
  }

  async function save() {
    if (!parsed) return;
    setBusy(true);
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    });
    setMessage(response.ok ? "Đã lưu. Nội dung public sẽ cập nhật ngay." : (await response.json()).error ?? "Lưu thất bại.");
    setBusy(false);
  }

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !parsed) return;
    if (projectSlug === "__avatar__" && !file.type.startsWith("image/")) {
      setMessage("Ảnh đại diện cần là một tệp ảnh.");
      return;
    }
    if (projectSlug === "__resume__" && file.type !== "application/pdf") {
      setMessage("CV cần là tệp PDF.");
      return;
    }
    if (!projectSlug.startsWith("__") && file.type === "application/pdf") {
      setMessage("PDF không thể thêm vào gallery ảnh/video dự án.");
      return;
    }
    setBusy(true);
    try {
      const modeResponse = await fetch("/api/admin/upload", { cache: "no-store" });
      const { mode } = await modeResponse.json();
      let url: string;
      if (mode === "blob") {
        const blob = await uploadBlob(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/admin/upload",
          multipart: true,
        });
        url = blob.url;
      } else {
        const form = new FormData();
        form.set("file", file);
        const response = await fetch("/api/admin/upload", { method: "POST", body: form });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? "Upload thất bại.");
        url = result.url;
      }

      const next = structuredClone(parsed);
      if (projectSlug === "__avatar__") {
        next.profile.avatar = url;
      } else if (projectSlug === "__resume__") {
        next.profile.resume = url;
      } else {
        const project = next.projects.find((item) => item.slug === projectSlug);
        if (project) project.gallery.push({ url, type: file.type.startsWith("video/") ? "video" : "image", caption: file.name });
      }
      setText(JSON.stringify(next, null, 2));
      setMessage(`Đã tải ${file.name}; bấm Lưu thay đổi để xuất hiện trên portfolio.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload thất bại.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setAuthenticated(false);
    setContent(null);
    setText("");
  }

  if (!authenticated) {
    return (
      <main className="mx-auto flex min-h-[75vh] max-w-md items-center px-4 py-16">
        <form onSubmit={login} className="w-full border border-border bg-card p-7">
          <LockKeyhole className="h-6 w-6 text-primary" />
          <h1 className="mt-5 text-2xl font-semibold">Portfolio admin</h1>
          <label className="mt-6 block text-sm font-medium" htmlFor="admin-password">Mật khẩu quản trị</label>
          <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2" required />
          {message ? <p role="alert" className="mt-3 text-sm text-red-500">{message}</p> : null}
          <Button type="submit" disabled={busy} className="mt-5 w-full">{busy ? "Đang đăng nhập..." : "Đăng nhập"}</Button>
          <p className="mt-4 text-xs text-muted-foreground">Cần cấu hình ADMIN_PASSWORD trên máy chủ.</p>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div><p className="text-sm text-primary">PORTFOLIO CMS</p><h1 className="mt-1 text-3xl font-semibold">Quản lý nội dung</h1></div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={logout}><LogOut className="h-4 w-4" />Đăng xuất</Button>
          <Button onClick={save} disabled={busy || !parsed}><Save className="h-4 w-4" />Lưu thay đổi</Button>
        </div>
      </header>
      <section className="grid gap-8 py-7 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <section className="border-b border-border pb-7">
            <h2 className="text-lg font-semibold">Hồ sơ</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {(["name", "role", "email", "location", "github", "linkedin", "resume", "avatar"] as const).map((field) => (
                <label key={field} className="text-sm capitalize">{field === "avatar" ? "Ảnh đại diện URL" : field === "resume" ? "CV URL" : field}
                  <input value={parsed?.profile[field] ?? ""} onChange={(event) => updateContent((data) => { data.profile[field] = event.target.value; })} className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2" />
                </label>
              ))}
              <label className="text-sm sm:col-span-2">Giới thiệu
                <textarea value={parsed?.profile.summary ?? ""} onChange={(event) => updateContent((data) => { data.profile.summary = event.target.value; })} className="mt-1 min-h-20 w-full rounded-md border border-input bg-card px-3 py-2" />
              </label>
            </div>
          </section>
          <section className="py-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Dự án</h2>
              <div className="flex gap-2">
                <select aria-label="Chọn dự án để sửa" value={editSlug} onChange={(event) => setEditSlug(event.target.value)} className="rounded-md border border-input bg-card px-3 py-2 text-sm">
                  {(parsed?.projects ?? []).map((project) => <option key={project.slug} value={project.slug}>{project.title}</option>)}
                </select>
                <Button variant="secondary" onClick={addProject}><Plus className="h-4 w-4" />Thêm dự án</Button>
                {editingProject ? <Button variant="secondary" aria-label="Xóa dự án" title="Xóa dự án" disabled={(parsed?.projects.length ?? 0) < 2} onClick={() => {
                  const remaining = parsed?.projects.filter((item) => item.slug !== editSlug) ?? [];
                  updateContent((data) => { data.projects = remaining; });
                  setEditSlug(remaining[0]?.slug ?? "");
                  setProjectSlug(remaining[0]?.slug ?? "");
                }}><Trash2 className="h-4 w-4" /></Button> : null}
              </div>
            </div>
            {editingProject ? <div className="mt-4 grid gap-4">
              {(["title", "subtitle", "overview", "motivation"] as const).map((field) => <label key={field} className="text-sm capitalize">{field}
                {field === "overview" || field === "motivation" ? <textarea value={(editingProject as unknown as Record<string, string>)[field] ?? ""} onChange={(event) => updateContent((data) => { const item = data.projects.find((entry) => entry.slug === editSlug); if (item) (item as unknown as Record<string, string>)[field] = event.target.value; })} className="mt-1 min-h-20 w-full rounded-md border border-input bg-card px-3 py-2" /> : <input value={(editingProject as unknown as Record<string, string>)[field] ?? ""} onChange={(event) => updateContent((data) => { const item = data.projects.find((entry) => entry.slug === editSlug); if (item) (item as unknown as Record<string, string>)[field] = event.target.value; })} className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2" />}
              </label>)}
              <label className="text-sm">Công nghệ (mỗi dòng một mục)
                <textarea value={((editingProject as unknown as { stack?: string[] }).stack ?? []).join("\n")} onChange={(event) => updateContent((data) => { const item = data.projects.find((entry) => entry.slug === editSlug); if (item) (item as unknown as { stack: string[] }).stack = event.target.value.split("\n").map((value) => value.trim()).filter(Boolean); })} className="mt-1 min-h-24 w-full rounded-md border border-input bg-card px-3 py-2" />
              </label>
              <div>
                <h3 className="text-sm font-medium">Gallery media</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {editingProject.gallery.map((entry, index) => {
                    const media = typeof entry === "string" ? null : entry;
                    return <div key={media?.url ?? `${entry}-${index}`} className="flex items-center justify-between gap-3 border border-border p-3 text-sm">
                      <span className="truncate">
                        {media?.caption ?? media?.url ?? (typeof entry === "string" ? entry : entry.url)}
                      </span>
                      <Button variant="secondary" size="icon" aria-label="Xóa media" title="Xóa media" onClick={() => updateContent((data) => { const item = data.projects.find((project) => project.slug === editSlug); if (item) item.gallery.splice(index, 1); })}><Trash2 className="h-4 w-4" /></Button>
                    </div>;
                  })}
                  {!editingProject.gallery.length ? <p className="text-sm text-muted-foreground">Chưa có media.</p> : null}
                </div>
              </div>
            </div> : <p className="mt-4 text-sm text-muted-foreground">Chưa có dự án. Thêm dự án để bắt đầu.</p>}
          </section>
          <details className="border-t border-border py-5">
            <summary className="cursor-pointer text-sm font-medium">Dữ liệu nâng cao (JSON)</summary>
            <textarea id="portfolio-json" spellCheck={false} value={text} onChange={(event) => setText(event.target.value)} className="mt-3 min-h-[50vh] w-full resize-y rounded-md border border-input bg-card p-4 font-mono text-xs leading-5" />
          </details>
          {jsonError ? <p role="alert" className="mt-2 text-sm text-red-500">JSON lỗi: {jsonError}</p> : null}
          {message ? <p role="status" className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 text-emerald-500" />{message}</p> : null}
        </div>
        <aside className="h-fit border border-border bg-card p-5">
          <h2 className="font-semibold">Media dự án</h2>
          <label htmlFor="media-project" className="mt-5 block text-sm">Vị trí media</label>
          <select id="media-project" value={projectSlug} onChange={(event) => setProjectSlug(event.target.value)} className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="__avatar__">Ảnh đại diện</option>
            <option value="__resume__">CV (PDF)</option>
            {(parsed?.projects ?? content?.projects ?? []).map((project) => <option key={project.slug} value={project.slug}>{project.title}</option>)}
          </select>
          <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-border px-4 py-5 text-sm hover:border-primary">
            <CloudUpload className="h-4 w-4" />Chọn ảnh hoặc video
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4,video/webm,application/pdf" className="sr-only" onChange={upload} disabled={busy} />
          </label>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">Ảnh, video hoặc PDF tối đa 100 MB. Chọn vị trí trước khi tải lên.</p>
          <a href="/" target="_blank" className="mt-6 inline-block text-sm text-primary underline">Mở portfolio</a>
        </aside>
      </section>
    </main>
  );
}
