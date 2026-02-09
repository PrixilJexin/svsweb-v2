"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Megaphone, ArrowRight } from "lucide-react"; 
import SchoolInfo from "./components/SchoolInfo"; 
import PatronMotto from "./components/PatronMotto";

export default function HomePage() {
  const [newsTicker, setNewsTicker] = useState("Official MySVS News Feed...");
  const [noticeBoard, setNoticeBoard] = useState("Welcome to the portal.");
  const [galleries, setGalleries] = useState([
    { id: 1, name: "Gallery 1", description: "View our latest event photos." },
    { id: 2, name: "Gallery 2", description: "View our latest event photos." },
    { id: 3, name: "Gallery 3", description: "View our latest event photos." },
    { id: 4, name: "Gallery 4", description: "View our latest event photos." },
  ]);

  const localImages = [
    "/home-crsl/1Z8A0034.JPG",
    "/home-crsl/1Z8A7345.JPG",
    "/home-crsl/1Z8A7392.jpg",
    "/home-crsl/238A5565.JPG",
    "/home-crsl/IMG_2427.jpg",
    "/home-crsl/republicday.jpeg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadContent = async () => {
      const { data } = await supabase.from("settings").select("*");
      if (data) {
        const news = data.find(i => i.id === 'news_ticker');
        const notice = data.find(i => i.id === 'notice_board');
        if (news) setNewsTicker(news.content);
        if (notice) setNoticeBoard(notice.content);

        setGalleries([
          { id: 1, name: data.find(i => i.id === 'gallery_1_title')?.content || "Gallery 1", description: "View our latest event photos." },
          { id: 2, name: data.find(i => i.id === 'gallery_2_title')?.content || "Gallery 2", description: "View our latest event photos." },
          { id: 3, name: data.find(i => i.id === 'gallery_3_title')?.content || "Gallery 3", description: "View our latest event photos." },
          { id: 4, name: data.find(i => i.id === 'gallery_4_title')?.content || "Gallery 4", description: "View our latest event photos." },
        ]);
      }
    };
    loadContent();
  }, []);

  useEffect(() => {
    if (localImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % localImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [localImages.length]);

  const newsItems = newsTicker.split("|").map(item => item.trim());

  return (
    <main className="min-h-screen bg-white text-[#0f172a] overflow-x-hidden">
      
      {/* 2. HERO SECTION CONTAINER */}
      <div 
        className="relative min-h-[700px] lg:min-h-[800px] flex flex-col items-center justify-center bg-no-repeat bg-center"
        style={{ 
          backgroundImage: "url('/homebackground.png')",
          backgroundSize: 'cover'
        }}
      >
        {/* Glassy Dark Filter Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[3px] backdrop-brightness-75" />

        {/* --- FLOATING NEWS TICKER STRIP --- */}
        <div className="absolute top-24 left-0 w-full bg-[#2b6cb0]/80 backdrop-blur-md py-2 overflow-hidden border-y border-[#ffd700]/30 shadow-2xl z-30">
          <div className="flex animate-marquee whitespace-nowrap gap-10">
            {newsItems.concat(newsItems).map((item, i) => (
              <span key={i} className="text-sm font-bold flex items-center text-white">
                <Megaphone size={14} className="mr-2 text-[#ffd700]" /> {item}
              </span>
            ))}
          </div>
        </div>

        {/* HERO GRID */}
        <div className="max-w-7xl w-full mx-auto px-6 pt-40 pb-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* QUICK LINKS - Fixed Yellow Border */}
            <div className="lg:col-span-3 bg-white/10 backdrop-blur-xl border border-white/20 border-l-[#ffd700] border-l-4 rounded-3xl p-6 shadow-2xl flex flex-col">
              <h3 className="text-white text-lg font-black mb-6 border-b border-white/10 pb-2 uppercase tracking-tighter text-center">Quick Links</h3>
              <ul className="space-y-3 flex-grow">
                {[
                  { n: "Subjects Offered", h: "/subjects" },
                  { n: "Clubs & Activities", h: "/clubs" },
                  { n: "Our Magazine", h: "/annual-day" },
                  { n: "Exam Schedules", h: "/timetable" },
                  { n: "Curriculum", h: "/curriculum" },
                  { n: "Time Table", h: "/timetable" },
                  { n: "Management", h: "/management" }
                ].map((link) => (
                  <li key={link.n}>
                    <Link href={link.h} className="block py-3 px-4 bg-white/10 hover:bg-[#ffd700] hover:text-[#001f3f] border border-white/10 text-white rounded-xl transition-all text-[11px] font-black uppercase tracking-widest text-center shadow-sm active:scale-95">
                      {link.n}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* LOCAL IMAGE CAROUSEL */}
            <div className="lg:col-span-6 relative h-[450px] lg:h-[500px] overflow-hidden rounded-[2.5rem] border-4 border-white/20 shadow-2xl group bg-black/20 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.img
                  key={localImages[currentIndex]}
                  src={localImages[currentIndex]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="School Highlight"
                />
              </AnimatePresence>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {localImages.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentIndex(i)} 
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      i === currentIndex ? "w-8 bg-[#ffd700]" : "w-2 bg-white/40 shadow-sm"
                    }`} 
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>

            {/* NOTICE BOARD */}
            <div className="lg:col-span-3 bg-[#ffd700]/10 backdrop-blur-xl border border-white/20 border-b-[#ffd700] border-b-4 text-white rounded-3xl p-8 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="relative z-10 w-full">
                <h3 className="text-[#ffd700] text-lg font-black mb-4 border-b border-[#ffd700]/30 pb-2 w-full uppercase italic tracking-tighter">Notice Board</h3>
                <p className="font-bold text-base leading-relaxed italic text-white/90">"{noticeBoard}"</p>
              </div>
            </div>
          </div>

          {/* SCROLL DOWN */}
          <div className="flex justify-center mt-8">
              <motion.button 
                whileHover={{ y: 5 }}
                onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                className="flex flex-col items-center gap-2 group"
              >
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70 group-hover:text-[#ffd700] transition-colors">Scroll Down</span>
                  <div className="p-1.5 rounded-full border border-white/20 bg-black/20 backdrop-blur-md group-hover:border-[#ffd700] transition-colors shadow-sm">
                      <ChevronDown size={18} className="text-white group-hover:text-[#ffd700] animate-bounce" />
                  </div>
              </motion.button>
          </div>
        </div>
      </div>

      {/* 3. RECENT EVENTS SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-24 bg-white">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl font-black tracking-tighter md:text-7xl uppercase text-[#001f3f]">
            Recent <span className="text-[#2b6cb0]">Events</span>
          </h1>
          <div className="h-1.5 w-24 bg-[#ffd700] mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {galleries.map((gallery) => (
            <Link 
              key={gallery.id} 
              href={`/gallery/${gallery.id}`}
              className="group p-10 border border-[#e2e8f0] rounded-[2.5rem] bg-slate-50/50 hover:bg-[#ebf4ff] hover:border-[#2b6cb0]/30 transition-all text-left relative overflow-hidden shadow-sm hover:shadow-2xl"
            >
              <div className="relative z-10">
                <h2 className="text-3xl font-black text-[#2c5282] group-hover:text-[#2b6cb0] transition-colors uppercase tracking-tighter mb-4">
                  {gallery.name}
                </h2>
                <p className="text-slate-500 mt-2 font-medium">{gallery.description}</p>
                <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#2b6cb0]">
                  Explore Gallery <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
              <div className="absolute -right-12 -bottom-12 text-[12rem] font-black text-slate-100 opacity-30 group-hover:text-blue-100 italic transition-colors select-none pointer-events-none">
                0{gallery.id}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <SchoolInfo />
      <div className="mt-20">
        <PatronMotto />
      </div>

      <footer className="h-48 bg-[#001f3f] flex flex-col items-center justify-center space-y-4">
        <div className="h-1 w-12 bg-[#ffd700] rounded-full" />
        <p className="text-slate-300 font-bold uppercase tracking-[0.3em] text-[10px]">© 2026 St. Vincent's Matriculation School</p>
      </footer>
    </main>
  );
}