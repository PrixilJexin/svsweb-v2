"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const schoolFeatures = [
  {
    id: "academic",
    title: "Academic Excellence",
    headline: "Where excellence isn’t just expected — it’s nurtured",
    description: "At St.Vincent's, we foster a culture of curiosity and achievement. With a future-ready curriculum and dedicated faculty, our students consistently exceed academic benchmarks while developing real-world problem-solving skills.",
    image: "/vertical-slide/academic.jpg",
  },
  {
    id: "beyond",
    title: "Beyond the Books",
    headline: "Learning extends far beyond textbooks here.",
    description: "Education here is an experience — not just a syllabus. From arts to innovation labs, students engage in hands-on learning and expressive outlets that fuel creativity and critical thinking beyond the classroom walls.",
    image: "/vertical-slide/beyond.jpg",
  },
  {
    id: "sports",
    title: "Sports & Fitness",
    headline: "Strong minds start with strong bodies.",
    description: "Our school promotes an active lifestyle through structured sports programs, dedicated coaches, and inter-house competitions that build teamwork, discipline, and school spirit. Fitness is part of our foundation.",
    image: "/vertical-slide/sport.jpg",
  },
  {
    id: "parent",
    title: "Parent Partnership",
    headline: "Every child thrives when school and home unite.",
    description: "We work hand-in-hand with parents to support every child’s journey. Through real-time communication, regular feedback, and tech-enabled tools, we ensure parents stay informed, involved, and empowered.",
    image: "/vertical-slide/parent.png",
  },
];

export default function SchoolInfo() {
  const [activeTab, setActiveTab] = useState(0);

  // --- AUTOMATIC CYCLE LOGIC ---
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % schoolFeatures.length);
    }, 3000); // Switches every 3 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <section className="bg-[#fefce8] py-20 px-6 md:px-12 border-b border-gray-200 min-h-[850px] lg:min-h-[700px]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-[#000033] mb-16 text-center uppercase tracking-tighter">
          Welcome To <span className="text-[#1a237e]">St.Vincent&apos;s School</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Vertical Navigation */}
          <div className="lg:col-span-3 flex flex-col border-l-2 border-gray-200">
            {schoolFeatures.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(index)}
                className={`text-left py-6 px-8 text-lg font-bold transition-all relative ${
                  activeTab === index 
                  ? "text-[#1a237e] bg-white/50" 
                  : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {activeTab === index && (
                  <motion.div 
                    layoutId="activeBorder"
                    className="absolute left-[-2px] top-0 bottom-0 w-1 bg-[#1a237e]" 
                  />
                )}
                {feature.title}
              </button>
            ))}
          </div>

          {/* Animated Content Display - Fixed Height Container */}
          <div className="lg:col-span-9 min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
              >
                {/* Image Container with Fixed Aspect Ratio */}
                <div className="rounded-[2rem] overflow-hidden shadow-2xl aspect-video md:aspect-[4/3] border-4 border-white bg-gray-100">
                  <img 
                    src={schoolFeatures[activeTab].image} 
                    alt={schoolFeatures[activeTab].title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text Content */}
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-black text-[#000033] leading-tight uppercase tracking-tight">
                    {schoolFeatures[activeTab].headline}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    {schoolFeatures[activeTab].description}
                  </p>
                  <button className="flex items-center gap-2 px-8 py-4 bg-[#1a237e] text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all group shadow-xl">
                    Learn More <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}