"use client";
import { motion } from "framer-motion";
import { Music, Palette, Users, Trophy, Sparkles, ChevronRight } from "lucide-react";

export default function CulturalsPage() {
  const categories = [
    { name: "Dance & Choreography", icon: <Sparkles className="text-purple-400" /> },
    { name: "Music & Vocals", icon: <Music className="text-blue-400" /> },
    { name: "Mime & Drama", icon: <Users className="text-emerald-400" /> },
    { name: "Arts & Crafts", icon: <Palette className="text-rose-400" /> },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      
      {/* --- HERO SECTION: ENERGETIC HEADER --- */}
      <section className="relative h-[70vh] w-full flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-[url('/images/culturals-bg-pattern.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-[#050505]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-5xl"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-400 text-xs font-black tracking-[0.3em] uppercase mb-8">
            Annual Intra-School Fest
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
            SV <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Exuberanza</span>
          </h1>
          <p className="mt-6 text-xl text-gray-400 font-medium tracking-wide max-w-2xl mx-auto">
            A vibrant celebration of talent, teamwork, and healthy competition among the four school houses.
          </p>
        </motion.div>
      </section>

      {/* --- CULTURAL CAROUSEL AREA --- */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="bg-[#111] rounded-[3rem] border border-white/10 p-4 shadow-2xl overflow-hidden">
           {/* Replace with your Swiper/Slick slider logic */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px] md:h-[550px]">
              <div className="bg-gray-900 rounded-3xl overflow-hidden border border-white/5">
                <img src="/images/Culturals/IMG_6891.JPG" alt="Dance" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
              </div>
              <div className="bg-gray-900 rounded-3xl overflow-hidden border border-white/5">
                <img src="/images/Culturals/IMG_6907.JPG" alt="Performance" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
              </div>
              <div className="bg-gray-900 rounded-3xl overflow-hidden border border-white/5">
                <img src="/images/Culturals/IMG_6964.JPG" alt="Arts" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
              </div>
           </div>
        </div>
      </section>

      {/* --- THE EVENT CORE: CONTENT SECTION --- */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic">
              Where Talent <br /> Meets <span className="text-blue-500">Passion</span>
            </h2>
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
               <p className="text-blue-400 font-bold italic mb-4">“Sing to the Lord a new song because He has done wonderful things!” – Psalms 98:1</p>
               <p className="text-gray-400 leading-relaxed text-lg">
                With over <span className="text-white font-bold">400 enthusiastic participants</span>, SV Exuberanza is a highlight of our school year, fostering creativity and community spirit through high-energy performances.
               </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full border border-blue-500/50 flex items-center justify-center">
                  <Trophy className="text-blue-500" size={20} />
               </div>
               <p className="text-sm font-black uppercase tracking-widest text-gray-500">Celebrating Excellence 2024-25</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat, i) => (
              <motion.div 
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                key={i} 
                className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center">
                  {cat.icon}
                </div>
                <h4 className="font-bold text-gray-200">{cat.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CLOSING SPIRIT SECTION --- */}
      <section className="py-24 bg-gradient-to-t from-blue-900/20 to-transparent border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center px-6 space-y-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="p-12 rounded-[3rem] bg-[#111] border border-blue-500/20 shadow-inner relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            <h3 className="text-2xl font-bold text-gray-200 mb-6 uppercase tracking-widest">A Word of Appreciation</h3>
            <p className="text-gray-400 text-lg italic leading-relaxed">
              Congratulations to all the winners and participants for making SV Exuberanza 2024-25 a grand success! Your energy and dedication truly define our school spirit.
            </p>
            <div className="mt-10 pt-10 border-t border-white/5 flex flex-col items-center">
               <div className="w-16 h-1 w-16 bg-blue-500 rounded-full mb-4" />
               <p className="text-blue-400 font-black uppercase tracking-[0.2em] text-xs">Jancy Rani A</p>
               <p className="text-gray-600 text-[10px] uppercase font-bold mt-1">Event Coordinator</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <footer className="py-20 text-center">
         <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-6">Experience the Vibe</p>
         <button className="px-10 py-4 rounded-full bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all active:scale-95 shadow-xl">
            View Full 2024-25 Gallery
         </button>
      </footer>
    </main>
  );
}