"use client";
import { motion } from "framer-motion";
import { BookOpen, Target, LayoutGrid, Sparkles, Award, Headphones, Download } from "lucide-react";

export default function CurriculumPage() {
  const objectives = [
    "Equitable and standardized education across Tamil Nadu.",
    "Conceptual clarity and advanced analytical skills.",
    "Balanced cognitive, emotional, and physical development.",
    "Environmental awareness and social responsibility.",
    "Multi-language proficiency (Tamil, English, Hindi)."
  ];

  const subjects = [
    { title: "Languages", desc: "Tamil, English, Hindi, and optional classical languages.", icon: <Headphones className="text-blue-500" /> },
    { title: "Mathematics", desc: "From basic arithmetic to advanced problem-solving.", icon: <div className="font-bold text-xl text-blue-500">∑</div> },
    { title: "Science", desc: "Physics, Chemistry, and Biology with practical lab focus.", icon: <Sparkles className="text-blue-500" /> },
    { title: "Social Science", desc: "History, Geography, Civics, and Economics.", icon: <LayoutGrid className="text-blue-500" /> },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* 1. HERO HEADER */}
      <section className="bg-[#001f3f] py-24 text-center text-white px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-[#ffd700]/20 border border-[#ffd700]/30 text-[#ffd700] text-xs font-black tracking-widest uppercase mb-4">
            Academic Excellence
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
            Academic <span className="text-[#ffd700]">Framework</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Following the Samacheer Kalvi uniform education system of Tamil Nadu.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT CONTENT AREA */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 2. OVERVIEW CARD */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
            >
              <h2 className="text-3xl font-black text-[#001f3f] mb-6 flex items-center gap-3">
                <BookOpen className="text-[#ffd700]" /> Samacheer Kalvi
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                <p>
                  At <strong className="text-[#001f3f]">St. Vincent’s School</strong>, we follow the 
                  <span className="text-blue-600 font-bold"> Samacheer Kalvi</span> curriculum – Tamil Nadu’s uniform 
                  education system that blends academic excellence, inclusivity, and holistic learning.
                </p>
                <p>
                  This curriculum integrates the best learning practices from various boards and aims to foster 
                  creativity, curiosity, and critical thinking among students.
                </p>
              </div>
            </motion.section>

            {/* 3. SUBJECT GRID */}
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-[#001f3f] uppercase tracking-tighter">Subject Areas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subjects.map((sub, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 flex gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                      {sub.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#001f3f]">{sub.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{sub.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. HOLISTIC APPROACH */}
            <section className="bg-[#001f3f] p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffd700] opacity-10 rounded-full -mr-16 -mt-16" />
               <h2 className="text-2xl font-black mb-8 uppercase tracking-widest text-[#ffd700]">Holistic Approach</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    "Project-based learning and group activities.",
                    "Digital tools and multimedia interactive education.",
                    "Continuous formative assessment.",
                    "Integration of life skills and value education."
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="h-2 w-2 rounded-full bg-[#ffd700] mt-2 shrink-0" />
                      <p className="text-slate-300 text-sm">{item}</p>
                    </div>
                  ))}
               </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* 5. OBJECTIVES */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-black text-[#001f3f] mb-6 flex items-center gap-2 uppercase tracking-tight">
                <Target className="text-[#ffd700]" /> Objectives
              </h3>
              <ul className="space-y-4">
                {objectives.map((obj, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                    <Award className="text-[#ffd700] shrink-0" size={18} />
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            {/* 6. DOWNLOADS */}
            <div className="bg-[#ffd700] p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-black text-[#001f3f] mb-6 flex items-center gap-2 uppercase tracking-tight">
                <Download /> Documents
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Primary Syllabus", url: "https://tnschools.gov.in/samacheer/primary.pdf" },
                  { label: "Secondary Syllabus", url: "https://tnschools.gov.in/samacheer/secondary.pdf" },
                  { label: "Higher Secondary", url: "https://tnschools.gov.in/samacheer/highersecondary.pdf" },
                ].map((doc, i) => (
                  <a 
                    key={i}
                    href={doc.url}
                    target="_blank"
                    className="flex items-center justify-between p-4 bg-white/40 hover:bg-white rounded-xl transition-all group"
                  >
                    <span className="text-sm font-bold text-[#001f3f]">{doc.label}</span>
                    <Download size={16} className="text-[#001f3f] opacity-50 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}