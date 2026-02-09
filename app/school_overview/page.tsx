"use client";
import { motion } from "framer-motion";
import { Target, History, Globe, ShieldCheck } from "lucide-react";

export default function SchoolOverview() {
  return (
    <main className="bg-white text-gray-900 min-h-screen font-sans">
      
      {/* 1. HERO TITLE SECTION */}
      <section className="bg-[#001f3f] py-24 px-6 text-center text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
            School <span className="text-[#ffd700]">Overview</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Cultivating intellect, empathy, and excellence since 1990.
          </p>
        </motion.div>
      </section>

      {/* 2. MISSION & VISION SECTION (Grid Layout) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision */}
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -30 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-[#f8f9fa] border border-gray-100 shadow-sm"
          >
            <div className="w-14 h-14 bg-[#001f3f] rounded-2xl flex items-center justify-center mb-6">
              <Globe className="text-[#ffd700]" size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-[#001f3f]">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              St. Vincent’s Matriculation Higher Secondary School envisions empowering individuals to lead purpose-driven lives through holistic education. We aim to provide knowledge and value-based education, nurturing human capabilities while embracing cultural, social, and ethical values in service of others.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 30 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-[#001f3f] text-white shadow-xl"
          >
            <div className="w-14 h-14 bg-[#ffd700] rounded-2xl flex items-center justify-center mb-6">
              <Target className="text-[#001f3f]" size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <ul className="space-y-4">
              {[
                "To empower students with wisdom and self-growth in all spheres of life.",
                "To nurture talents and skills, guiding them towards a bright future.",
                "To instill human values and build a just society with strong minds and hearts."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ShieldCheck className="text-[#ffd700] mt-1 shrink-0" size={20} />
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 3. SCHOOL HISTORY (Timeline Style) */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <History className="text-[#001f3f]" size={40} />
            <h2 className="text-4xl font-black text-[#001f3f] uppercase tracking-tight">Our History</h2>
          </div>
          
          <div className="space-y-12 border-l-4 border-[#ffd700] pl-8 ml-4">
            <div className="relative">
              <span className="absolute -left-[42px] top-0 w-5 h-5 bg-[#001f3f] rounded-full border-4 border-[#ffd700]" />
              <h3 className="text-2xl font-bold text-[#001f3f]">1990: The Foundation</h3>
              <p className="text-gray-600 mt-2 text-lg">
                Founded in 1990, St. Vincent’s in Chennai was established to meet the evolving needs of modern education. Named after St. Vincent de Paul (1581–1660), we draw inspiration from his life of compassion.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-[42px] top-0 w-5 h-5 bg-[#001f3f] rounded-full border-4 border-[#ffd700]" />
              <h3 className="text-2xl font-bold text-[#001f3f]">Evolving Excellence</h3>
              <p className="text-gray-600 mt-2 text-lg">
                From its humble beginnings, SVS has remained committed to cultivating intellect, empathy, and excellence, adapting to the changing educational landscape with resilience and vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE PHILOSOPHY SECTION */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-black mb-16 text-[#001f3f] uppercase tracking-widest">The SVS Philosophy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "What we teach", desc: "We teach not just what to think, but how to think through critical thinking and creativity." },
            { title: "Our Community", desc: "A vibrant learning community where students become socially responsible citizens." },
            { title: "Heartbeat", desc: "“Pray, Learn, Serve” is the heartbeat of our school culture, integrating spiritual and academic excellence." }
          ].map((card, i) => (
            <div key={i} className="p-8 border-2 border-gray-100 rounded-2xl hover:border-[#ffd700] transition-colors duration-300">
              <h4 className="text-xl font-bold mb-4 text-[#001f3f] uppercase tracking-tighter">{card.title}</h4>
              <p className="text-gray-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="bg-[#ffd700] py-16 text-center">
        <h2 className="text-[#001f3f] text-3xl font-black uppercase mb-6">Join Our Community</h2>
        <button className="bg-[#001f3f] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-black transition-all">
          Contact Us
        </button>
      </section>
    </main>
  );
}