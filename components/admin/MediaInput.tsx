"use client";
import { Upload, X } from "lucide-react";
import { useState } from "react";

/** URL field with direct-to-Cloudinary signed upload. Images are served as f_auto,q_auto (AVIF/WebP). */
export function MediaInput({ name, initial, kind }: { name: string; initial: string; kind: "image" | "video" }) {
  const [url, setUrl] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function upload(file: File) {
    setErr(""); setBusy(true);
    try {
      const sig = await fetch("/api/admin/upload-signature", { method: "POST" }).then(async (r) => { const j = await r.json(); if (!r.ok) throw new Error(j.error); return j; });
      const fd = new FormData();
      fd.append("file", file); fd.append("api_key", sig.apiKey); fd.append("timestamp", String(sig.timestamp)); fd.append("signature", sig.signature); fd.append("folder", sig.folder);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/${kind}/upload`, { method: "POST", body: fd });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error?.message || "Upload failed");
      setUrl(kind === "image" ? j.secure_url.replace("/upload/", "/upload/f_auto,q_auto/") : j.secure_url);
    } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  }
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input name={name} value={url} onChange={(e) => setUrl(e.target.value)} placeholder={kind === "video" ? "https://youtube.com/… or upload" : "https://… or upload"} className="field" />
        <label className="btn-ghost shrink-0 cursor-pointer !px-4">
          <Upload className="h-4 w-4" /><span className="sr-only sm:not-sr-only">{busy ? "Uploading…" : "Upload"}</span>
          <input type="file" accept={kind === "image" ? "image/*" : "video/*"} className="sr-only" disabled={busy} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        </label>
      </div>
      {err && <p className="err">{err}</p>}
      {url && kind === "image" && (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="h-28 rounded-lg border border-plum/10 object-cover" />
          <button type="button" onClick={() => setUrl("")} className="absolute -right-2 -top-2 rounded-full bg-plum p-1 text-ivory" aria-label="Remove image"><X className="h-3 w-3" /></button>
        </div>
      )}
    </div>
  );
}
