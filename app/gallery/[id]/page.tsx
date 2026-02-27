"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function Gallery() {
  const params = useParams();
  const id = params.id as string;

  const [images, setImages] = useState<any[]>([]);
  const [displayTitle, setDisplayTitle] = useState(`Gallery ${id}`);
  const [error, setError] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [imagesResponse, settingsResponse] = await Promise.all([
        supabase.from("images").select("*").eq("gallery_id", parseInt(id)).order("id", { ascending: false }),
        supabase.from("settings").select("*").eq("id", `gallery_${id}_title`).single(),
      ]);
      if (imagesResponse.error) { setError(true); return; }
      setImages(imagesResponse.data || []);
      if (settingsResponse.data?.content) setDisplayTitle(settingsResponse.data.content);
    };
    fetchData();
  }, [id]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, prev, next]);

  if (error) return <div className="p-10 text-white">Error loading images.</div>;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white" style={{ paddingTop: "90px" }}>
      <div className="max-w-6xl mx-auto px-10 pb-10">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black mb-10 border-b border-gray-800 pb-6 tracking-tighter uppercase text-blue-500">
          {displayTitle}
        </h1>

        {images && images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {images.map((img, index) => (
              <div
                key={img.id}
                className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={img.url}
                  alt={displayTitle}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border-2 border-dashed border-gray-800 rounded-3xl">
            <p className="text-2xl font-bold text-gray-600 uppercase tracking-widest">Gallery Empty</p>
            <p className="mt-2 text-sm text-gray-700">Add photos via the Admin Control Panel.</p>
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-xs font-black uppercase tracking-widest">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Prev arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] mx-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={lightboxIndex}
              src={images[lightboxIndex].url}
              alt={displayTitle}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              style={{ animation: "fadeIn 0.2s ease" }}
            />
          </div>

          {/* Next arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  );
}