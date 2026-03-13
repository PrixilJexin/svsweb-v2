"use client";

import { useState, useEffect, useCallback } from "react";

const IMAGE_FILENAMES: string[] = [
  "1Z8A7850.jpg",
  "1Z8A7854.jpg",
  "DSC06218.jpg",
  "IMG_0211.jpg",
  "IMG_0431.jpg",
  "IMG_0435.jpg",
  "IMG_0462.jpg",
  "IMG_0904.jpg",
  "IMG_1038.jpg",
  "IMG_1075.jpg",
  "IMG_1153.jpg",
  "IMG_1266.jpg",
  "IMG_1279.jpg",
  "IMG_1598.jpg",
  "IMG_1822.jpg",
  "IMG_2102.jpg",
  "IMG_2958.jpg",
  "IMG_3219.jpg",
  "IMG_5809.jpg",
  "IMG_6311.jpg",
  "IMG_8137.jpg",
  "IMG_8272.jpg",
  "IMG_8752.jpg",
  "IMG_9838.jpg",
  "WhatsApp Image 2025-02-19 at 5.53.32 PM (1).jpeg",
];

const GALLERY_TITLE = "2024 – 2025";

export default function Gallery202425() {
  const [images, setImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const urls = IMAGE_FILENAMES.map((name) => `/2024-2025/${name}`);
    setImages(urls);
  }, []);

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

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white" style={{ paddingTop: "90px" }}>
      <div className="max-w-6xl mx-auto px-10 pb-10">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black mb-10 border-b border-gray-800 pb-6 tracking-tighter uppercase text-blue-500">
          {GALLERY_TITLE}
        </h1>

        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {images.map((url, index) => (
              <div
                key={url}
                className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={url}
                  alt={`${GALLERY_TITLE} photo ${index + 1}`}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border-2 border-dashed border-gray-800 rounded-3xl">
            <p className="text-2xl font-bold text-gray-600 uppercase tracking-widest">Gallery Empty</p>
            <p className="mt-2 text-sm text-gray-700">No images found.</p>
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
              src={images[lightboxIndex]}
              alt={`${GALLERY_TITLE} photo ${lightboxIndex + 1}`}
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