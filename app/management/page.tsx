"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users, BookOpen } from "lucide-react";

// Emoji map for subjects
const emojiMap: Record<string, string> = {
  "ENGLISH": "📘", "TAMIL": "📝", "HINDI": "🔤", "MATHS": "➗", "SCIENCE": "🔬",
  "BIOLOGY": "🧬", "PHYSICS": "⚛️", "CHEMISTRY": "🧪", "SOCIAL": "🌍",
  "COMPUTER SCIENCE": "💻", "PE": "🏃‍♂️", "ART": "🎨", "OTHERS": "📚"
};

export default function ManagementPage() {
  const [staffData, setStaffData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://opensheet.elk.sh/1AeI8xr49faAEo1Y3V7fQQSiFGCDLTBPpZcpV96hV1UI/Sheet1")
      .then(res => res.json())
      .then(data => {
        const grouped = data.reduce((acc: any, curr: any) => {
          const sub = curr.subject || "Others";
          if (!acc[sub]) acc[sub] = [];
          acc[sub].push(curr);
          return acc;
        }, {});
        setStaffData(Object.entries(grouped));
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-[#001f3f] py-20 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
          Management <span className="text-[#ffd700]">& Staff</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10">
        {/* 1. LEADERSHIP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <LeaderCard 
            name="Rev.Dr.Estheppan Thomas"
            role="Principal"
            message="Our institution believes in empowering young minds through quality education, innovation, and discipline."
            image="/management/fr.estheppan.png"
          />
          <LeaderCard 
            name="Rev.Fr.Sebastian .CM"
            role="Vice Principal"
            message="We are committed to nurturing an environment of learning, creativity, and inclusivity for every student."
            image="/management/fr.sebastian.png"
          />
        </div>

        {/* 2. STAFF TABLE SECTION */}
        <section>
          <div className="flex items-center gap-3 mb-10 border-b-2 border-[#ffd700] pb-4">
            <Users className="text-[#001f3f]" size={32} />
            <h2 className="text-3xl font-bold text-[#001f3f] uppercase">Academic Faculty</h2>
          </div>

          {loading ? (
            <div className="text-center py-20 italic text-gray-500">Loading staff directory...</div>
          ) : (
            <div className="space-y-12">
              {staffData.map(([subject, teachers]: any) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  key={subject} 
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-[#001f3f] flex items-center gap-2">
                      <span>{emojiMap[subject.toUpperCase()] || "📚"}</span>
                      {subject}
                    </h3>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {teachers.length} Faculty Members
                    </span>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="text-[10px] uppercase tracking-widest text-gray-400 bg-gray-50/50">
                          <th className="px-6 py-3 font-black">Teacher Name</th>
                          <th className="px-6 py-3 font-black">Class Teacher Of</th>
                          <th className="px-6 py-3 font-black">Expertise / Classes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {teachers.map((t: any, i: number) => (
                          <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                            <td className="px-6 py-4 font-bold text-gray-900">{t["teacher name"]?.toUpperCase()}</td>
                            <td className="px-6 py-4 text-gray-600 text-sm">{t["Class Teacher Of"] || "—"}</td>
                            <td className="px-6 py-4 text-gray-500 text-sm">{t["other Classes taught"] || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function LeaderCard({ name, role, message, image }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center group"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#ffd700] rounded-full scale-105 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
        <img src={image} alt={name} className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg" />
      </div>
      <h3 className="text-2xl font-black text-[#001f3f] mb-1">{name}</h3>
      <div className="text-xs font-black uppercase tracking-[0.2em] text-[#ffd700] mb-4">{role}</div>
      <p className="text-gray-500 italic text-sm leading-relaxed max-w-xs">"{message}"</p>
    </motion.div>
  );
}