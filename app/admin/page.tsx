"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

// --- CHANGE THESE ---
const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME!;
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD!;
// --------------------

const GALLERY_MAX = 20;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [shaking, setShaking] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const [galleryId, setGalleryId] = useState("1");
  const [activeFilter, setActiveFilter] = useState("1");
  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ done: number; total: number } | null>(null);
  const [uploadError, setUploadError] = useState("");

  const [newsTicker, setNewsTicker] = useState("");
  const [noticeBoard, setNoticeBoard] = useState("");
  const [galleryTitles, setGalleryTitles] = useState({ g1: "", g2: "", g3: "", g4: "" });
  const [savingContent, setSavingContent] = useState(false);
  const [galleryCounts, setGalleryCounts] = useState<Record<string, number>>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername === ADMIN_USERNAME && loginPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password.");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  const fetchData = async () => {
    const { data: imgData } = await supabase
      .from("images")
      .select("*")
      .eq("gallery_id", parseInt(activeFilter))
      .order("id", { ascending: false });
    setImages(imgData || []);

    const counts: Record<string, number> = {};
    for (const n of [1, 2, 3, 4]) {
      const { count } = await supabase
        .from("images")
        .select("*", { count: "exact", head: true })
        .eq("gallery_id", n);
      counts[n.toString()] = count || 0;
    }
    setGalleryCounts(counts);

    const { data: settingsData } = await supabase.from("settings").select("*");
    if (settingsData) {
      setNewsTicker(settingsData.find((i) => i.id === "news_ticker")?.content || "");
      setNoticeBoard(settingsData.find((i) => i.id === "notice_board")?.content || "");
      setGalleryTitles({
        g1: settingsData.find((i) => i.id === "gallery_1_title")?.content || "",
        g2: settingsData.find((i) => i.id === "gallery_2_title")?.content || "",
        g3: settingsData.find((i) => i.id === "gallery_3_title")?.content || "",
        g4: settingsData.find((i) => i.id === "gallery_4_title")?.content || "",
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [activeFilter, isAuthenticated]);

  useEffect(() => {
    setUploadError("");
  }, [files, galleryId]);

  const handleUpdateContent = async () => {
    setSavingContent(true);
    try {
      const { error } = await supabase.from("settings").upsert([
        { id: "news_ticker", content: newsTicker },
        { id: "notice_board", content: noticeBoard },
        { id: "gallery_1_title", content: galleryTitles.g1 },
        { id: "gallery_2_title", content: galleryTitles.g2 },
        { id: "gallery_3_title", content: galleryTitles.g3 },
        { id: "gallery_4_title", content: galleryTitles.g4 },
      ]);
      if (error) throw error;
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setSavingContent(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const currentCount = galleryCounts[galleryId] || 0;
    const slots = GALLERY_MAX - currentCount;

    if (selected.length > slots) {
      setUploadError(
        slots <= 0
          ? `Gallery ${galleryId} is full (${GALLERY_MAX}/${GALLERY_MAX}). Delete some images first.`
          : `Only ${slots} slot${slots === 1 ? "" : "s"} left in Gallery ${galleryId}. You selected ${selected.length} files — only the first ${slots} will be uploaded.`
      );
      setFiles(selected.slice(0, Math.max(0, slots)));
    } else {
      setFiles(selected);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    const currentCount = galleryCounts[galleryId] || 0;
    const slots = GALLERY_MAX - currentCount;
    if (slots <= 0) {
      setUploadError(`Gallery ${galleryId} is full. Maximum ${GALLERY_MAX} images allowed.`);
      return;
    }

    const filesToUpload = files.slice(0, slots);
    setUploading(true);
    setUploadProgress({ done: 0, total: filesToUpload.length });
    setUploadError("");

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      try {
        const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${file.name.split(".").pop()}`;
        const { error: uploadErr } = await supabase.storage.from("gallery-images").upload(fileName, file);
        if (uploadErr) throw uploadErr;
        const { data: { publicUrl } } = supabase.storage.from("gallery-images").getPublicUrl(fileName);
        await supabase.from("images").insert([{ url: publicUrl, gallery_id: parseInt(galleryId) }]);
      } catch (err: any) {
        console.error(`Failed to upload ${file.name}:`, err.message);
      }
      setUploadProgress({ done: i + 1, total: filesToUpload.length });
    }

    setFiles([]);
    setUploadProgress(null);
    setUploading(false);
    const input = document.getElementById("file-input") as HTMLInputElement;
    if (input) input.value = "";
    fetchData();
  };

  const deleteImage = async (id: number, url: string) => {
    const fileName = url.split("/").pop();
    if (fileName) await supabase.storage.from("gallery-images").remove([fileName]);
    await supabase.from("images").delete().eq("id", id);
    fetchData();
  };

  const currentCount = galleryCounts[activeFilter] || 0;
  const uploadGalleryCount = galleryCounts[galleryId] || 0;
  const slotsLeft = GALLERY_MAX - uploadGalleryCount;

  // ── LOGIN SCREEN ──────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="fixed inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#2b6cb0 1px, transparent 1px), linear-gradient(90deg, #2b6cb0 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative w-full max-w-sm" style={shaking ? { animation: "shake 0.4s ease" } : {}}>
          <div className="absolute -inset-1 bg-blue-600/20 rounded-3xl blur-xl" />
          <div className="relative bg-[#0d1117] border border-[#2b6cb0]/40 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#2b6cb0]/20 border border-[#2b6cb0]/40 mb-4">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase">Admin Panel</h1>
              <p className="text-gray-500 text-xs mt-1 tracking-widest uppercase">Restricted Access</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1.5">Username</label>
                <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} autoComplete="username"
                  className="w-full bg-black border border-gray-800 focus:border-blue-500 text-white p-3 rounded-xl outline-none transition-colors text-sm placeholder-gray-700" placeholder="Enter username" required />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} autoComplete="current-password"
                    className="w-full bg-black border border-gray-800 focus:border-blue-500 text-white p-3 pr-10 rounded-xl outline-none transition-colors text-sm placeholder-gray-700" placeholder="Enter password" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors" tabIndex={-1}>
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
              </div>
              {loginError && (
                <div className="flex items-center gap-2 bg-red-950/50 border border-red-800/50 text-red-400 text-xs px-3 py-2.5 rounded-lg">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  {loginError}
                </div>
              )}
              <button type="submit" className="w-full bg-[#2b6cb0] hover:bg-blue-500 text-white font-black uppercase text-xs tracking-widest py-3.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-900/30 mt-2">
                Sign In
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link href="/" className="text-gray-600 hover:text-gray-400 text-[10px] uppercase tracking-widest transition-colors">← Back to Site</Link>
            </div>
          </div>
        </div>
        <style>{`@keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-8px); } 40% { transform: translateX(8px); } 60% { transform: translateX(-5px); } 80% { transform: translateX(5px); } }`}</style>
      </div>
    );
  }

  // ── ADMIN PANEL ───────────────────────────────────────────────
  return (
    <div className="p-10 max-w-5xl mx-auto min-h-screen text-white bg-black font-sans">
      <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-5">
        <h1 className="text-3xl font-bold tracking-tighter uppercase text-blue-500">Admin Control</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsAuthenticated(false)} className="text-gray-500 hover:text-red-400 font-bold text-xs uppercase tracking-widest transition-colors">Logout</button>
          <Link href="/" className="text-gray-400 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors">← Exit Panel</Link>
        </div>
      </div>

      {/* SITE CONTENT BOX */}
      <div className="bg-[#1a202c] p-8 rounded-2xl mb-12 border border-[#2b6cb0]/30 shadow-2xl">
        <h2 className="text-xl font-bold mb-6 text-[#fefcbf] uppercase tracking-tight">📝 Global Content</h2>
        <div className="space-y-6">
          <input type="text" value={newsTicker} onChange={(e) => setNewsTicker(e.target.value)}
            className="w-full bg-black border border-gray-700 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="News Ticker..." />
          <textarea rows={2} value={noticeBoard} onChange={(e) => setNoticeBoard(e.target.value)}
            className="w-full bg-black border border-gray-700 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Notice Board..." />
          <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="space-y-1">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Gallery {n} Title</label>
                <input type="text" value={galleryTitles[`g${n}` as keyof typeof galleryTitles]}
                  onChange={(e) => setGalleryTitles({ ...galleryTitles, [`g${n}`]: e.target.value })}
                  className="w-full bg-black border border-gray-800 p-2 rounded-lg text-sm" />
              </div>
            ))}
          </div>
          <button onClick={handleUpdateContent} disabled={savingContent}
            className="bg-[#2b6cb0] px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-500 transition-all shadow-lg active:scale-95">
            {savingContent ? "Syncing..." : "Update Website"}
          </button>
        </div>
      </div>

      {/* UPLOAD SECTION */}
      <div className="bg-white p-6 rounded-2xl mb-12 text-black shadow-xl">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">
              File Upload <span className="normal-case font-normal text-gray-400">(select multiple)</span>
            </label>
            <input id="file-input" type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full text-sm font-medium" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Destination</label>
            <select value={galleryId} onChange={(e) => setGalleryId(e.target.value)} className="border-2 border-gray-100 p-2 rounded-xl font-bold">
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>Gallery {n} ({galleryCounts[n.toString()] || 0}/{GALLERY_MAX})</option>
              ))}
            </select>
          </div>
          <button onClick={handleUpload} disabled={uploading || files.length === 0 || slotsLeft <= 0}
            className="bg-black text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-gray-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            {uploading
              ? `Uploading ${uploadProgress?.done}/${uploadProgress?.total}...`
              : files.length > 0 ? `Upload ${files.length} file${files.length > 1 ? "s" : ""}` : "Upload"}
          </button>
        </div>

        {/* Capacity bar */}
        <div className="mt-4">
          <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 mb-1">
            <span>Gallery {galleryId} capacity</span>
            <span className={slotsLeft <= 5 ? "text-red-500" : "text-gray-400"}>
              {uploadGalleryCount}/{GALLERY_MAX} · {slotsLeft} slot{slotsLeft === 1 ? "" : "s"} left
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className={`h-1.5 rounded-full transition-all ${uploadGalleryCount >= GALLERY_MAX ? "bg-red-500" : uploadGalleryCount >= 15 ? "bg-yellow-400" : "bg-black"}`}
              style={{ width: `${(uploadGalleryCount / GALLERY_MAX) * 100}%` }} />
          </div>
        </div>

        {/* Upload progress */}
        {uploading && uploadProgress && (
          <div className="mt-4">
            <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 mb-1">
              <span>Uploading...</span>
              <span>{Math.round((uploadProgress.done / uploadProgress.total) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="h-2 rounded-full bg-blue-500 transition-all" style={{ width: `${(uploadProgress.done / uploadProgress.total) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Selected file pills */}
        {files.length > 0 && !uploading && (
          <div className="mt-4 flex flex-wrap gap-2">
            {files.map((f, i) => (
              <span key={i} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-lg font-medium truncate max-w-[140px]">{f.name}</span>
            ))}
          </div>
        )}

        {/* Error */}
        {uploadError && (
          <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2.5 rounded-lg">
            <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {uploadError}
          </div>
        )}
      </div>

      {/* GALLERY TABS */}
      <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-800 mb-6 w-fit mx-auto">
        {[1, 2, 3, 4].map((n) => (
          <button key={n} onClick={() => setActiveFilter(n.toString())}
            className={`px-6 py-2 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${activeFilter === n.toString() ? "bg-[#2b6cb0] text-white shadow-lg" : "text-gray-500 hover:text-gray-300"}`}>
            Gallery{n}
            <span className={`ml-1.5 text-[9px] ${activeFilter === n.toString() ? "text-blue-200" : "text-gray-600"}`}>
              {galleryCounts[n.toString()] || 0}/{GALLERY_MAX}
            </span>
          </button>
        ))}
      </div>

      {/* Active gallery capacity bar */}
      <div className="mb-6">
        <div className="flex justify-between text-[10px] font-black uppercase text-gray-500 mb-1.5">
          <span>Gallery {activeFilter}</span>
          <span className={currentCount >= GALLERY_MAX ? "text-red-500" : ""}>{currentCount}/{GALLERY_MAX} images</span>
        </div>
        <div className="w-full bg-gray-900 rounded-full h-1">
          <div className={`h-1 rounded-full transition-all ${currentCount >= GALLERY_MAX ? "bg-red-500" : currentCount >= 15 ? "bg-yellow-500" : "bg-blue-500"}`}
            style={{ width: `${(currentCount / GALLERY_MAX) * 100}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img.id} className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 group relative aspect-square">
            <img src={img.url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" alt="" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <button onClick={() => deleteImage(img.id, img.url)} className="bg-red-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest">Delete</button>
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <div className="col-span-4 text-center py-16 text-gray-700 text-sm font-medium">No images in this gallery yet.</div>
        )}
      </div>
    </div>
  );
}