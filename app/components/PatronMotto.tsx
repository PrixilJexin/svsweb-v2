"use client";
import { motion } from "framer-motion";
import { BookOpen, Heart, Stars } from "lucide-react";

export default function PatronMotto() {
  const mottoItems = [
    {
      title: "Pray",
      desc: "We begin with gratitude and spiritual strength, grounding every action with purpose and humility.",
      icon: <Stars className="text-yellow-400" />,
      color: "from-blue-900/40"
    },
    {
      title: "Learn",
      desc: "With curiosity and courage, we pursue knowledge to transform lives and shape the future.",
      icon: <BookOpen className="text-blue-400" />,
      color: "from-blue-700/40"
    },
    {
      title: "Serve",
      desc: "We give back with compassion, responsibility, and leadership — making our world better, together.",
      icon: <Heart className="text-red-400" />,
      color: "from-blue-500/40"
    }
  ];

  const stats = [
    { label: "Passing to Universities", val: "100%" },
    { label: "People Working", val: "126" },
    { label: "Students Enrolled", val: "2,480" },
    { label: "Alumni Network", val: "7,856" }
  ];

  return (
    <div className="bg-[#0a0a0a] py-24 space-y-32 px-6">
      
      {/* 1. OUR PATRON SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl"
      >
        <div className="w-full md:w-2/5 aspect-[3/4] rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl relative group">
          <img 
            src="/images/patron.jpeg" // ENSURE IMAGE IS IN public/images/patron.jpeg
            alt="St. Vincent De Paul"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="w-full md:w-3/5 space-y-6">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-black tracking-widest uppercase">
            Our Patron
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            St. Vincent <span className="text-blue-500 italic">De Paul</span>
          </h2>
          <div className="h-1 w-20 bg-yellow-400 rounded-full" />
          
          <ul className="space-y-4 text-gray-300 text-lg font-medium">
            {[
              "Guided by the compassionate spirit of St. Vincent de Paul, our patron.",
              "Inspired by his unwavering dedication to service, education, and empathy.",
              "Committed to embodying humility, kindness, and a pursuit of knowledge.",
              "Focused on nurturing morally grounded, socially responsible individuals.",
              "Aim to empower students intellectually to lead with heart and serve with purpose."
            ].map((text, i) => (
              <li key={i} className="flex gap-4 items-start group">
                <span className="h-6 w-6 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs font-bold shrink-0 mt-1 transition-colors group-hover:bg-yellow-400 group-hover:text-black">
                  {i + 1}
                </span>
                <span className="group-hover:text-white transition-colors">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* 2. OUR MOTTO SECTION */}
      <section className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
            Our <span className="text-yellow-400">Motto</span>
          </h2>
          <p className="text-gray-500 font-bold mt-2 tracking-widest uppercase text-sm">Pray • Learn • Serve</p>
        </div>

        {/* Central Logo Background Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl opacity-10 pointer-events-none blur-sm">
           <img src="/images/logo-motto.jpeg" alt="" className="w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {mottoItems.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -20, scale: 1.02 }}
              className={`p-12 rounded-[3rem] bg-gradient-to-br ${item.color} to-transparent backdrop-blur-xl border border-white/10 hover:border-blue-400/50 transition-all duration-500 shadow-2xl group text-center md:text-left`}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 mx-auto md:mx-0 group-hover:bg-white/20 transition-all group-hover:rotate-12">
                {item.icon}
              </div>
              <h3 className="text-4xl font-black text-white mb-4 tracking-tight">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-lg font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. WHY CHOOSE US / STATS */}
      <section className="max-w-6xl mx-auto pt-20 border-t border-white/10 text-center">
        <h3 className="text-2xl font-bold text-gray-400 mb-12 uppercase tracking-[0.3em]">Why Choose Us?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-2 group cursor-default">
              <div className="text-5xl font-black text-white group-hover:text-yellow-400 transition-colors duration-500">
                {stat.val}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-blue-500 group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}