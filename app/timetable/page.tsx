"use client";
import { motion } from "framer-motion";
import { Clock, Calendar, Info, ExternalLink, FileSpreadsheet } from "lucide-react";

export default function TimetablePage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* 1. PROFESSIONAL HEADER */}
      <section className="bg-[#001f3f] py-20 text-center text-white px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-[#ffd700]/20 border border-[#ffd700]/30 text-[#ffd700] text-xs font-black tracking-widest uppercase mb-4">
            Academic Schedule
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            Student's <span className="text-[#ffd700]">Time Table</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-medium">
            Daily Class Schedules & Academic Timing Registry
          </p>
        </motion.div>
      </section>

      {/* 2. TIMETABLE VIEWER CONTAINER */}
      <div className="max-w-6xl mx-auto px-6 -mt-10">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* Dashboard Top Bar */}
          <div className="bg-gray-50 px-8 py-5 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-[#001f3f] font-bold">
              <div className="p-2 bg-[#001f3f] rounded-lg">
                <Clock className="text-[#ffd700]" size={20} />
              </div>
              <span className="tracking-tight uppercase text-sm">Live Schedule Feed</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Term 2025-26</span>
              </div>
              <a 
                href="https://docs.google.com/document/d/e/2PACX-1vTaRXThUY76FG_FmMw_xqyIT3ssB3UbzLsJxLHQTIEu9hPqy8IRASVrEkgxPMITpd5Aewh0Yv7AmP3X/pub"
                target="_blank"
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                title="Open in New Tab"
              >
                <ExternalLink size={18} className="text-gray-400" />
              </a>
            </div>
          </div>

          {/* THE IFRAME EMBED */}
          <div className="p-4 md:p-8 bg-white">
            <div className="relative rounded-2xl border-2 border-gray-50 overflow-hidden shadow-inner">
              <iframe 
                src="https://docs.google.com/document/d/e/2PACX-1vTaRXThUY76FG_FmMw_xqyIT3ssB3UbzLsJxLHQTIEu9hPqy8IRASVrEkgxPMITpd5Aewh0Yv7AmP3X/pub?embedded=true"
                className="w-full h-[600px] md:h-[850px] border-none"
                title="Student Timetable"
                loading="lazy"
              />
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                      <Calendar className="text-[#001f3f]" size={24} />
                   </div>
                   <div>
                      <h4 className="text-sm font-black text-[#001f3f] uppercase">Samacheer Kalvi Standards</h4>
                      <p className="text-xs text-gray-500 font-medium">Uniform schedules for all grade levels</p>
                   </div>
                </div>
                <div className="flex justify-end">
                   <a 
                     href="https://docs.google.com/document/d/e/2PACX-1vTaRXThUY76FG_FmMw_xqyIT3ssB3UbzLsJxLHQTIEu9hPqy8IRASVrEkgxPMITpd5Aewh0Yv7AmP3X/pub"
                     target="_blank"
                     className="bg-[#001f3f] text-[#ffd700] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all text-xs uppercase tracking-widest"
                   >
                     <FileSpreadsheet size={16} /> Download PDF
                   </a>
                </div>
             </div>
          </div>
        </div>

        {/* 3. TROUBLESHOOTING NOTICE */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-10 flex flex-col items-center gap-4 text-center"
        >
          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
            <Info size={14} />
            <span>Having trouble viewing the table?</span>
          </div>
          <p className="text-gray-400 text-xs max-w-lg leading-relaxed">
            This schedule is automatically updated by the school administration. 
            If the window above is blank, please clear your browser cache or use the "Download PDF" button to view it directly.
          </p>
          <div className="h-1 w-12 bg-[#ffd700] rounded-full opacity-30" />
        </motion.div>
      </div>
    </main>
  );
}