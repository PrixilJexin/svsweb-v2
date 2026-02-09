"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [galleryId, setGalleryId] = useState("1");
  const [activeFilter, setActiveFilter] = useState("1");
  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const [newsTicker, setNewsTicker] = useState("");
  const [noticeBoard, setNoticeBoard] = useState("");
  const [galleryTitles, setGalleryTitles] = useState({
    g1: "", g2: "", g3: "", g4: ""
  });
  const [savingContent, setSavingContent] = useState(false);

  const fetchData = async () => {
    // Fetch Images for current tab
    const { data: imgData } = await supabase
      .from("images")
      .select("*")
      .eq("gallery_id", parseInt(activeFilter))
      .order("id", { ascending: false });
    setImages(imgData || []);

    // Fetch Site Settings
    const { data: settingsData } = await supabase.from("settings").select("*");
    if (settingsData) {
      setNewsTicker(settingsData.find(i => i.id === "news_ticker")?.content || "");
      setNoticeBoard(settingsData.find(i => i.id === "notice_board")?.content || "");
      setGalleryTitles({
        g1: settingsData.find(i => i.id === "gallery_1_title")?.content || "",
        g2: settingsData.find(i => i.id === "gallery_2_title")?.content || "",
        g3: settingsData.find(i => i.id === "gallery_3_title")?.content || "",
        g4: settingsData.find(i => i.id === "gallery_4_title")?.content || "",
      });
    }
  };

  useEffect(() => { fetchData(); }, [activeFilter]);

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

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const fileName = `${Math.random()}.${file.name.split(".").pop()}`;
      const { error: uploadError } = await supabase.storage.from("gallery-images").upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from("gallery-images").getPublicUrl(fileName);
      await supabase.from("images").insert([{ url: publicUrl, gallery_id: parseInt(galleryId) }]);
      setFile(null);
      fetchData();
    } catch (error: any) { console.error(error.message); } finally { setUploading(false); }
  };

  const deleteImage = async (id: number, url: string) => {
    const fileName = url.split("/").pop();
    if (fileName) await supabase.storage.from("gallery-images").remove([fileName]);
    await supabase.from("images").delete().eq("id", id);
    fetchData();
  };

  return (
    <div className="p-10 max-w-5xl mx-auto min-h-screen text-white bg-black font-sans">
      <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-5">
        <h1 className="text-3xl font-bold tracking-tighter uppercase text-blue-500">Admin Control</h1>
        <Link href="/" className="text-gray-400 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors">← Exit Panel</Link>
      </div>

      {/* SITE CONTENT BOX */}
      <div className="bg-[#1a202c] p-8 rounded-2xl mb-12 border border-[#2b6cb0]/30 shadow-2xl">
        <h2 className="text-xl font-bold mb-6 text-[#fefcbf] uppercase tracking-tight">📝 Global Content</h2>
        <div className="space-y-6">
          <input 
            type="text" value={newsTicker} onChange={(e) => setNewsTicker(e.target.value)}
            className="w-full bg-black border border-gray-700 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="News Ticker..."
          />
          <textarea 
            rows={2} value={noticeBoard} onChange={(e) => setNoticeBoard(e.target.value)}
            className="w-full bg-black border border-gray-700 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Notice Board..."
          />
          
          <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="space-y-1">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Gallery {n} Title</label>
                <input 
                  type="text" 
                  value={galleryTitles[`g${n}` as keyof typeof galleryTitles]}
                  onChange={(e) => setGalleryTitles({...galleryTitles, [`g${n}`]: e.target.value})}
                  className="w-full bg-black border border-gray-800 p-2 rounded-lg text-sm"
                />
              </div>
            ))}
          </div>

          <button onClick={handleUpdateContent} disabled={savingContent} className="bg-[#2b6cb0] px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-500 transition-all shadow-lg active:scale-95">
            {savingContent ? "Syncing..." : "Update Website"}
          </button>
        </div>
      </div>

      {/* UPLOAD SECTION */}
      <div className="bg-white p-6 rounded-2xl mb-12 flex flex-wrap items-end gap-4 text-black shadow-xl">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">File Upload</label>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-sm font-medium" />
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Destination</label>
          <select value={galleryId} onChange={(e) => setGalleryId(e.target.value)} className="border-2 border-gray-100 p-2 rounded-xl font-bold">
            {[1, 2, 3, 4].map(n => <option key={n} value={n}>Gallery {n}</option>)}
          </select>
        </div>
        <button onClick={handleUpload} disabled={uploading || !file} className="bg-black text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-gray-800 transition-all">
          {uploading ? "Wait..." : "Upload"}
        </button>
      </div>

      {/* GALLERY MANAGEMENT */}
      <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-800 mb-8 w-fit mx-auto">
        {[1, 2, 3, 4].map((n) => (
          <button
            key={n}
            onClick={() => setActiveFilter(n.toString())}
            className={`px-8 py-2 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${
              activeFilter === n.toString() ? "bg-[#2b6cb0] text-white shadow-lg" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Gallery{n}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img.id} className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 group relative aspect-square">
            <img src={img.url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" alt="" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <button onClick={() => deleteImage(img.id, img.url)} className="bg-red-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}