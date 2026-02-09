"use client";
import { motion } from "framer-motion";
import { GraduationCap, FileText, Info, ExternalLink } from "lucide-react";

export default function ScholarshipsPage() {
  return (
    <main className="min-h-screen bg-white pb-20">
      {/* 1. PROFESSIONAL HEADER */}
      <section className="bg-[#001f3f] py-20 text-center text-white px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            Scholarships <span className="text-[#ffd700]">Offered</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-medium">
            Official Financial Aid and Student Support Portal
          </p>
        </motion.div>
      </section>

      {/* 2. DOCUMENT CONTENT SECTION */}
      <div className="max-w-5xl mx-auto px-6 -mt-10">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* Status Bar */}
          <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#001f3f] font-bold text-sm">
              <Info size={18} className="text-[#ffd700]" />
              <span>Live Document Feed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Updated Daily</span>
            </div>
          </div>

          {/* Detailed Content Header */}
          <div className="p-8 md:p-12 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-[#001f3f] flex items-center gap-3">
                <GraduationCap className="text-[#ffd700]" size={36} /> 
                Scholarship Information
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Stay informed about the latest scholarships available for our students. 
                This section displays the full content of our official scholarship 
                registry to ensure you have access to every detail.
              </p>
            </div>

            {/* THE IFRAME EMBED (Full Info Display) */}
            <div className="relative rounded-2xl border-2 border-gray-50 overflow-hidden bg-gray-50">
              <iframe 
                src="https://docs.google.com/document/d/e/2PACX-1vS7EOr2-zemLvxur2cI_495ZQkseKJWk6rgetyAkIUXvCmAx8Gzb2wL5rkaIMOpBLmU1y9r6mlti15M/pub?embedded=true"
                className="w-full h-[800px] md:h-[1000px] border-none"
                title="Scholarships Document"
                loading="lazy"
              />
              
              {/* Bottom Action Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#001f3f] rounded-xl">
                    <FileText className="text-[#ffd700]" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#001f3f] uppercase tracking-widest">Document Source</p>
                    <p className="text-sm text-gray-500">Official Google Docs Registry</p>
                  </div>
                </div>
                
                <a 
                  href="https://docs.google.com/document/d/e/2PACX-1vS7EOr2-zemLvxur2cI_495ZQkseKJWk6rgetyAkIUXvCmAx8Gzb2wL5rkaIMOpBLmU1y9r6mlti15M/pub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#001f3f] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all active:scale-95 shadow-lg"
                >
                  View Full Document <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. FOOTER NOTICE */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            If the document above does not load correctly, please use the 
            "View Full Document" button to access the information directly.
          </p>
          <div className="h-1 w-20 bg-[#ffd700] mx-auto rounded-full" />
        </div>
      </div>
    </main>
  );
}