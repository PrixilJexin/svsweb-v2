"use client";
import { motion } from "framer-motion";
import { Dribbble, Trophy, Activity, FastForward, Medal, Users } from "lucide-react";

export default function SportsPage() {
  const sportsPrograms = [
    {
      title: "Basketball",
      desc: "Encouraging teamwork, agility, and strategic thinking. Our coaches focus on dribbling, shooting, and defensive skills while fostering discipline.",
      icon: <Dribbble className="text-orange-500" />,
      color: "border-orange-100 bg-orange-50/30"
    },
    {
      title: "Throwball",
      desc: "Enhancing hand-eye coordination and reflexes. Teams practice passing and catching in a fun, inclusive environment for all skill levels.",
      icon: <Activity className="text-blue-500" />,
      color: "border-blue-100 bg-blue-50/30"
    },
    {
      title: "Handball",
      desc: "Combining speed, precision, and endurance. Students train in fast breaks and defensive tactics to build mental toughness.",
      icon: <FastForward className="text-red-500" />,
      color: "border-red-100 bg-red-50/30"
    },
    {
      title: "Athletics",
      desc: "Nurturing talent in track and field. From sprinting to long jump, students develop raw strength and speed for inter-school competitions.",
      icon: <Trophy className="text-yellow-600" />,
      color: "border-yellow-100 bg-yellow-50/30"
    }
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      
      {/* 1. IMPACT HERO SECTION */}
      <section className="relative h-[60vh] bg-[#001f3f] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/sports-bg-pattern.png')] bg-repeat" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001f3f] via-transparent to-transparent" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center px-6"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-[#ffd700] text-xs font-black tracking-[0.3em] uppercase mb-6">
            Elite Athletics
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-none">
            Sports & <span className="text-[#ffd700]">Fitness</span>
          </h1>
          <p className="mt-4 text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Where athletic excellence meets character, discipline, and school spirit.
          </p>
        </motion.div>
      </section>

      {/* 2. THE PHILOSOPHY: ALTERNATING BLOCKS */}
      <section className="max-w-7xl mx-auto py-24 px-6 space-y-24">
        
        {/* Block 1 */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl font-black text-[#001f3f] uppercase tracking-tighter">Fitness as a <span className="text-blue-600">Foundation</span></h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Physical fitness is key to cognitive clarity, confidence, and character. Our programs include warm-ups, strength training, endurance drills, and regular assessments to build lifelong healthy habits.
            </p>
            <div className="flex gap-4">
               <div className="p-3 bg-blue-50 rounded-xl"><Activity className="text-blue-600" /></div>
               <div className="p-3 bg-blue-50 rounded-xl"><Users className="text-blue-600" /></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-80 bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
             <img src="/images/sports/fitness-drill.jpg" alt="Fitness" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Block 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl font-black text-[#001f3f] uppercase tracking-tighter">Growth Beyond <span className="text-yellow-600">The Game</span></h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              More than winning, we focus on values: leadership, discipline, mental focus, and strong character. SVS athletes are prepared not only to compete—but to lead and inspire.
            </p>
            <ul className="space-y-3 font-bold text-[#001f3f] text-sm uppercase tracking-wide">
               <li className="flex items-center gap-2"><Medal size={18} className="text-yellow-500" /> Annual Sports Meet</li>
               <li className="flex items-center gap-2"><Medal size={18} className="text-yellow-500" /> Torch Lighting Ceremony</li>
               <li className="flex items-center gap-2"><Medal size={18} className="text-yellow-500" /> Inter-House Competitions</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 h-80 bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
             <img src="/images/sports/annual-meet.jpg" alt="Sports Meet" className="w-full h-full object-cover" />
          </div>
        </div>

      </section>

      {/* 3. SPORTS PROGRAMS: GRID SECTION */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-[#001f3f] uppercase tracking-tighter italic">Our Programs</h2>
            <div className="h-1.5 w-24 bg-yellow-400 mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sportsPrograms.map((program, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-3xl border-2 ${program.color} shadow-sm flex flex-col items-center text-center group transition-all hover:bg-white hover:shadow-xl`}
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-6 group-hover:rotate-12 transition-transform">
                  {program.icon}
                </div>
                <h3 className="text-2xl font-black text-[#001f3f] mb-4 uppercase tracking-tighter">{program.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {program.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION FOOTER */}
      <footer className="py-20 text-center">
         <h3 className="text-2xl font-black text-[#001f3f] mb-2 uppercase italic tracking-widest">Train Like A Champion</h3>
         <p className="text-slate-400 text-sm mb-8">Official SVS Sports Department • Samacheer Kalvi Standards</p>
         <button className="px-10 py-4 bg-[#001f3f] text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-black transition-all active:scale-95 shadow-2xl">
            Join the Team
         </button>
      </footer>
    </main>
  );
}