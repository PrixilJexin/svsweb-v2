"use client";
import { motion } from "framer-motion";
import { Star, Users, Mic2, BookOpen, ChevronRight, Award } from "lucide-react";
import { useState } from "react";

// Note: You'll need a library like Swiper or use a basic slider logic.
// For this code, we focus on the Fancy Layout & CSS.

export default function AnnualDayPage() {
  const [activeMagazine, setActiveMagazine] = useState(0);

  const magazines = [
    { year: "2019 - 2020", link: "https://online.anyflip.com/fgwae/uueg/index.html", thumb: "https://online.anyflip.com/fgwae/uueg/files/shot.jpg" },
    { year: "2023 - 2024", link: "https://online.anyflip.com/fgwae/uvuz/index.html", thumb: "https://online.anyflip.com/fgwae/uvuz/files/shot.jpg" },
    { year: "2024 - 2025", link: "https://online.anyflip.com/fgwae/sbho/index.html", thumb: "https://online.anyflip.com/fgwae/sbho/files/shot.jpg" },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      
      {/* --- HERO SECTION: CINEMATIC SLIDER --- */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] z-10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block px-6 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 text-sm font-black tracking-[0.3em] uppercase mb-6"
          >
            A Grand Spectacle
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase leading-none">
            <span className="text-yellow-500"> Annual </span><br /> Celebration
          </h1>
          <p className="mt-6 text-xl text-gray-400 font-medium tracking-wide">
            Talent, Tradition & Triumph spanning Two Unforgettable Days
          </p>
        </div>
        {/* Replace with your Slick Carousel or simple video bg */}
        <div className="w-full h-full bg-[#111] animate-pulse flex items-center justify-center text-gray-800">
           [CAROUSEL BACKGROUND GOES HERE]
        </div>
      </section>

      {/* --- THE RED CARPET: GUESTS OF HONOR --- */}
      <section className="max-w-7xl mx-auto py-24 px-6 relative">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full h-48 bg-yellow-500/10 blur-[120px]" />
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase flex items-center justify-center gap-4">
            <Mic2 className="text-yellow-500" /> Guests of Honour
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { day: "Day 1", chief: "Mr. Sri R. Balaji", role: "Asst. General Manager, RBI", guest: "Mr. M. Azhagesand, IRS" },
            { day: "Day 2", chief: "Dr. A. Louis Arokia Raj", role: "Principal, Loyola College", guest: "Mr. D. Varnatharaj, Inspector" }
          ].map((item, i) => (
            <motion.div 
              whileHover={{ y: -10 }}
              key={i} 
              className="p-10 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl border border-white/10 shadow-2xl group"
            >
              <span className="text-yellow-500 font-black text-6xl opacity-10 absolute right-8 top-8 group-hover:opacity-30 transition-opacity uppercase">{item.day}</span>
              <h3 className="text-2xl font-black mb-6 border-b border-yellow-500/30 pb-2">{item.day} Spotlight</h3>
              <div className="space-y-4 relative z-10">
                 <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Chief Guest</p>
                    <p className="text-xl font-bold text-white">{item.chief}</p>
                    <p className="text-sm text-yellow-500/80">{item.role}</p>
                 </div>
                 <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Guest of Honour</p>
                    <p className="text-lg font-bold text-gray-300">{item.guest}</p>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- EVENT HIGHLIGHTS: MASONRY CAROUSEL AREA --- */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="space-y-6">
                <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-tight">
                  Talent <br /><span className="text-yellow-500">Unleashed</span>
                </h2>
                <ul className="space-y-4">
                    {["Dramas & Plays", "Cultural Dances", "Musical Spectacles", "Eloquent Speeches"].map(feat => (
                        <li key={feat} className="flex items-center gap-3 font-bold text-gray-400">
                           <Star size={16} className="text-yellow-500" /> {feat}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="lg:col-span-2 h-[500px] bg-[#151515] rounded-[3rem] border border-white/5 overflow-hidden flex items-center justify-center text-gray-600">
                [MAIN EVENT SLIDER HERE]
            </div>
        </div>
      </section>

      {/* --- STAFF TRIBUTE: GLASS CARD --- */}
      <section className="max-w-6xl mx-auto py-24 px-6">
        <div className="p-12 rounded-[4rem] bg-gradient-to-r from-purple-900/40 via-yellow-500/10 to-transparent backdrop-blur-3xl border border-white/10 flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 h-80 bg-gray-900 rounded-[3rem] overflow-hidden border-4 border-white/10">
               [STAFF GROUP IMAGE]
            </div>
            <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-4xl font-black uppercase flex items-center gap-4">
                  <Users className="text-yellow-500" /> Our Strength
                </h2>
                <blockquote className="text-xl italic text-gray-300 border-l-4 border-yellow-500 pl-6 py-2">
                    “Every detail reflected the heart and soul of our teachers and non-teaching staff.”
                </blockquote>
                <p className="text-gray-500 font-medium">The 34th Annual Day was a celebration of the SVS family’s values and spirit.</p>
            </div>
        </div>
      </section>

      {/* --- MAGAZINE RACK: THE SHOWCASE --- */}
      <section className="py-24 bg-black relative">
        <div className="text-center mb-20">
           <h2 className="text-5xl font-black uppercase italic tracking-tighter">
            Digital <span className="text-yellow-500">Magazines</span>
           </h2>
           <p className="text-gray-500 mt-2 font-bold uppercase tracking-widest text-xs">Flip through our history</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {magazines.map((mag, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-[3/4] bg-[#111] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl"
            >
               <img src={mag.thumb} alt={mag.year} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
                  <h4 className="text-2xl font-black text-yellow-500">{mag.year}</h4>
                  <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">Buds and Blossoms</p>
                  <a 
                    href={mag.link} 
                    target="_blank"
                    className="bg-white text-black py-3 rounded-xl font-black uppercase text-[10px] tracking-widest text-center hover:bg-yellow-500 transition-colors"
                  >
                    Read Online
                  </a>
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FOOTER CLOSING --- */}
      <footer className="py-24 text-center border-t border-white/5">
         <Star className="mx-auto text-yellow-500 mb-6 animate-spin-slow" size={40} />
         <h3 className="text-3xl font-black italic uppercase tracking-tighter">Thank you for being part <br /> of our journey.</h3>
      </footer>

      {/* --- NEON STYLES --- */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}