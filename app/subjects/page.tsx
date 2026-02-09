"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Baby, 
  BookOpen, 
  School, 
  Binary, 
  FlaskConical, 
  TrendingUp, 
  Microscope 
} from "lucide-react";

export default function SubjectsOffered() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const academicData = [
    {
      title: "Early Years (LKG & UKG)",
      icon: <Baby size={20} />,
      content: [
        { label: "LKG", desc: "Languages (Tamil/English basics), Numbers 1-20, Colors and Shapes, Basic Rhymes and Stories" },
        { label: "UKG", desc: "Enhanced language skills, Simple arithmetic, Environmental awareness, Social skills" }
      ]
    },
    {
      title: "Primary School (Classes 1 to 5)",
      icon: <BookOpen size={20} />,
      content: [
        { label: "Class 1", desc: "Tamil & English basics, Numbers up to 100, Environmental Science" },
        { label: "Class 2", desc: "Basic Math, Language development, Surroundings awareness" },
        { label: "Class 3", desc: "Grammar intro, Multiplication tables, Plants and Animals" },
        { label: "Class 4", desc: "Fractions, Comprehension, General Science" },
        { label: "Class 5", desc: "Basic Geometry, Measurement, Science experiments" }
      ]
    },
    {
      title: "Middle School (Classes 6 to 8)",
      icon: <School size={20} />,
      content: [
        { label: "Class 6", desc: "Algebra basics, History & Geography, Practical Science" },
        { label: "Class 7", desc: "Arithmetic, Literature, Physics intro, Technology" },
        { label: "Class 8", desc: "Geometry, Environmental Science, Social Science concepts" }
      ]
    },
    {
      title: "High School (Classes 9 & 10)",
      icon: <Binary size={20} />,
      content: [
        { label: "Class 9", desc: "Algebra, Geometry, Physics, Chemistry, Biology basics, Civics & History" },
        { label: "Class 10", desc: "Coordinate Geometry, Reactions, Advanced Biology, Social analysis" }
      ]
    }
  ];

  const streams = [
    {
      name: "Commerce Stream",
      icon: <TrendingUp className="text-emerald-600" />,
      color: "border-emerald-100 bg-emerald-50/50",
      subjects: "Accountancy, Business Studies, Economics, Commerce Principles, English, Tamil/French",
      optional: "Mathematics / Computer Applications",
      careers: "CA, MBA, Banking"
    },
    {
      name: "Computer Science Stream",
      icon: <Binary className="text-blue-600" />,
      color: "border-blue-100 bg-blue-50/50",
      subjects: "Computer Science, Maths, Physics, Chemistry, English, Tamil/French",
      careers: "Engineering, Software, IT"
    },
    {
      name: "Biology Stream",
      icon: <Microscope className="text-rose-600" />,
      color: "border-rose-100 bg-rose-50/50",
      subjects: "Physics, Chemistry, Botany, Zoology, English, Tamil/French",
      optional: "Mathematics",
      careers: "Medicine, Biotech, Research"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <section className="bg-[#001f3f] py-24 text-center text-white px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
            Subjects <span className="text-[#ffd700]">Offered</span>
          </h1>
          <p className="text-slate-300 text-lg font-medium">LKG to 12th Grade • Detailed Samacheer Kalvi Curriculum</p>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-6 -mt-10">
        {/* General Classes Accordion */}
        <div className="space-y-4 mb-16">
          {academicData.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <button 
                onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#001f3f] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-black text-[#001f3f] uppercase tracking-tight">{item.title}</span>
                </div>
                <ChevronDown className={`transition-transform duration-300 ${activeAccordion === idx ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeAccordion === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 border-t border-gray-50 space-y-4">
                      {item.content.map((row, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-start gap-2 py-2">
                          <span className="font-black text-[#001f3f] text-xs uppercase min-w-[100px] mt-1">{row.label}:</span>
                          <span className="text-gray-600 text-sm leading-relaxed">{row.desc}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Higher Secondary Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-black text-[#001f3f] uppercase">Higher Secondary Streams</h2>
            <p className="text-gray-400 font-medium text-sm mt-2">Specialized curriculum for Classes 11 & 12</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {streams.map((stream, i) => (
              <motion.div 
                whileHover={{ y: -8 }}
                key={i} 
                className={`p-8 rounded-3xl border-2 ${stream.color} flex flex-col h-full`}
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  {stream.icon}
                </div>
                <h3 className="font-black text-[#001f3f] text-xl mb-4 leading-tight uppercase tracking-tighter">
                  {stream.name}
                </h3>
                <div className="flex-grow space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">Core Subjects</span>
                    <p className="text-sm text-gray-600 font-medium">{stream.subjects}</p>
                  </div>
                  {stream.optional && (
                    <div>
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">Optional</span>
                      <p className="text-sm text-gray-600 font-medium">{stream.optional}</p>
                    </div>
                  )}
                </div>
                <div className="mt-8 pt-4 border-t border-black/5">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">Pathways</span>
                  <p className="text-xs font-bold text-[#001f3f]">{stream.careers}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}