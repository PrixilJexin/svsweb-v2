"use client";
import { motion } from "framer-motion";
import { Scroll, Map, Heart, Anchor, BookOpen } from "lucide-react";

export default function PatronHeritage() {
  return (
    <main className="bg-white text-slate-900 min-h-screen">
      
      {/* 1. HERO HEADER */}
      <section className="bg-[#001f3f] py-24 px-6 text-center text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
            Our Patron & <span className="text-[#ffd700]">Heritage</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-medium max-w-3xl mx-auto italic">
            "The vision of Christ, sent by the Father to evangelize the poor, was central to his life and ministry."
          </p>
        </motion.div>
      </section>

      {/* 2. ST. VINCENT DE PAUL: THE ORIGIN */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#ffd700]/20 rounded-2xl blur-xl group-hover:bg-[#ffd700]/30 transition duration-500" />
            <img 
              src="/images/st-vincent-portrait.jpg" // Placeholder for St. Vincent Portrait
              alt="St. Vincent de Paul"
              className="relative rounded-2xl shadow-2xl border border-slate-200"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#001f3f] flex items-center gap-3">
              <Scroll className="text-[#ffd700]" /> A Glance at Our Founder
            </h2>
            <p className="text-lg leading-relaxed text-slate-700">
              Born in the village of Pouy in 1581, St. Vincent de Paul lived among the poor and experienced their hardships firsthand. Though he became a priest in 1600, his true calling emerged in 1617, when he recognized the urgent need for the evangelization of the poor.
            </p>
            <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-[#001f3f]">
              <p className="italic text-slate-600">
                "He discovered for himself, and showed others, the close link that exists between evangelization and the service of the poor."
              </p>
            </div>
            <p className="text-slate-700">
              This religious development led him to contemplate and serve Christ in the person of the poor, eventually founding the Congregation of the Mission on April 17, 1625.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE CONGREGATION OF THE MISSION (Mission & Global Presence) */}
      <section className="py-20 bg-[#001f3f] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-widest text-[#ffd700]">The Congregation</h2>
            <p className="text-slate-300 mt-4">Founded in Paris (1625) • Approved by Pope Urban VII (1633)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <Heart className="text-[#ffd700] mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3 uppercase">Our Purpose</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                To follow Christ evangelizing the poor. This is achieved through holiness appropriate to our vocation and working with the more abandoned.
              </p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <BookOpen className="text-[#ffd700] mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3 uppercase">Formation</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Since 1628, we have provided for the formation of the clergy and laity, helping them lead a fuller participation in serving the needy.
              </p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <Anchor className="text-[#ffd700] mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3 uppercase">Specialization</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Members are known as Vincentians, Lazarists, or Paules. We specialize in formation, retreat preaching, and youth ministry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE INDIAN MISSION TIMELINE */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-black text-[#001f3f] mb-12 uppercase flex items-center gap-3">
          <Map className="text-[#ffd700]" /> Mission in India
        </h2>
        
        <div className="space-y-12 border-l-2 border-slate-200 pl-8 ml-4">
          <div className="relative">
            <span className="absolute -left-[41px] top-1 w-4 h-4 bg-[#ffd700] rounded-full ring-4 ring-white" />
            <h4 className="font-bold text-xl text-[#001f3f]">1922: Arrival in Orissa</h4>
            <p className="text-slate-600 mt-2">
              Spanish Vincentians came to Orissa, leading to the growth of three dioceses: Cuttack–Bhubaneshwar, Berhampur, and Balasore, embracing over 4 lakh Catholics.
            </p>
          </div>
          
          <div className="relative">
            <span className="absolute -left-[41px] top-1 w-4 h-4 bg-[#ffd700] rounded-full ring-4 ring-white" />
            <h4 className="font-bold text-xl text-[#001f3f]">National Expansion</h4>
            <p className="text-slate-600 mt-2">
              The mission branched out to Andhra Pradesh, Tamil Nadu, Kerala, Karnataka, Maharashtra, West Bengal, Manipur, Rajasthan, and even the Tanzania Mission.
            </p>
          </div>

          <div className="relative">
            <span className="absolute -left-[41px] top-1 w-4 h-4 bg-[#001f3f] rounded-full ring-4 ring-white" />
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h4 className="font-bold text-xl text-[#001f3f]">1997: Southern Indian Province</h4>
              <p className="text-slate-600 mt-2 italic">
                The Indian Province was divided into Northern and Southern Provinces. The Southern Province, headquartered in Mysore, concentrates activities in South India and Tanzania.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SUMMARY CALLOUT */}
      <section className="bg-slate-50 py-16 px-6 text-center border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-[#001f3f] mb-4 uppercase">Continuing the Legacy</h3>
          <p className="text-slate-600 leading-relaxed">
            Today, the Southern Indian Province continues to alleviate sufferings of every sort, faithful to the signs of the times and the urgent calls of the Church through continual renewal.
          </p>
        </div>
      </section>
    </main>
  );
}