"use client";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  HeartPulse, 
  Users, 
  Ribbon, 
  Compass, 
  Bird, 
  Leaf 
} from "lucide-react";

const clubData = [
  {
    id: "rsp",
    title: "Road Safety Patrol (RSP)",
    motto: "BE ALERT BEFORE IT HURTS",
    desc: "RSP instills road safety discipline and emergency response in students. From rallying awareness to guiding traffic, these cadets are trained in traffic regulations, disaster preparedness, and first-aid. They serve as student leaders during school events and public initiatives.",
    image: "/images/Clubs & Service units/RSP.jpeg",
    icon: <ShieldCheck className="text-blue-500" />,
    color: "bg-blue-50"
  },
  {
    id: "jrc",
    title: "Junior Red Cross (JRC)",
    motto: "I SERVE",
    desc: "JRC promotes health and empathy through first-aid, hospital visits, and orphanage support. Volunteers take part in arts & crafts drives and first-aid training. JRC teaches that every small act of kindness contributes to building a caring world.",
    image: "/images/Clubs & Service units/JRC.JPG",
    icon: <HeartPulse className="text-red-500" />,
    color: "bg-red-50"
  },
  {
    id: "nss",
    title: "National Service Scheme (NSS)",
    motto: "NOT ME BUT YOU",
    desc: "NSS builds leadership and civic responsibility. From cleanliness rallies to team camps, students learn to appreciate diversity, collaborate as a team, and make a lasting impact in their communities as socially responsible changemakers.",
    image: "/images/Clubs & Service units/NSS.jpeg",
    icon: <Users className="text-emerald-500" />,
    color: "bg-emerald-50"
  },
  {
    id: "rrc",
    title: "Red Ribbon Club",
    motto: "AWARENESS IS PROTECTION",
    desc: "The Red Ribbon Club educates youth on HIV/AIDS prevention, healthy habits, and emotional well-being. It organizes campaigns for World Hepatitis Day and Yoga Day, sparking informed discussions for a healthier community.",
    image: "/images/Clubs & Service units/RED RIBBON CLUB.JPG",
    icon: <Ribbon className="text-rose-500" />,
    color: "bg-rose-50"
  },
  {
    id: "scouts",
    title: "Scouts & Guides",
    motto: "BE PREPARED",
    desc: "Scouts & Guides develop character, resilience, and life skills. From weekly drills to state-level camps, students learn teamwork and survival skills. They carry the values of loyalty and honor into every challenge.",
    image: "/images/Clubs & Service units/scouts and guides.JPG",
    icon: <Compass className="text-indigo-500" />,
    color: "bg-indigo-50"
  },
  {
    id: "svpl",
    title: "St. Vincent Peace League (SVPL)",
    motto: "PEACE, CHARITY, HARMONY",
    desc: "SVPL encourages students to serve the poor and marginalized with humility. Through visits to elder care homes and charity distribution, members learn that small acts have deep meaning, standing as a beacon of Vincentian values.",
    image: "/images/Clubs & Service units/SVPL.JPG",
    icon: <Bird className="text-sky-500" />,
    color: "bg-sky-50"
  },
  {
    id: "eco",
    title: "Eco Club",
    motto: "KEEP CLEAN AND KEEP GREEN",
    desc: "The Eco Club leads sustainability drives, sapling plantings, and biodiversity trips. Members take oaths to protect nature and organize educational workshops to foster a generation of environmentally responsible students.",
    image: "/images/Clubs & Service units/ECO CLUB.JPG",
    icon: <Leaf className="text-green-500" />,
    color: "bg-green-50"
  }
];

export default function ClubsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO HEADER */}
      <section className="bg-[#001f3f] py-24 text-center text-white px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-[#ffd700]/20 border border-[#ffd700]/30 text-[#ffd700] text-xs font-black tracking-[0.2em] uppercase mb-4">
            Beyond the Classroom
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
            Clubs & <span className="text-[#ffd700]">Service Units</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Fostering leadership, compassion, and discipline through active student participation.
          </p>
        </motion.div>
      </section>

      {/* 2. ALTERNATING SECTIONS */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        {clubData.map((club, index) => (
          <motion.div 
            key={club.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-20`}
          >
            {/* Image Box */}
            <div className="w-full md:w-1/2 relative group">
              <div className={`absolute -inset-4 ${club.color} rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-500`} />
              <div className="relative h-[300px] md:h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={club.image} 
                  alt={club.title}
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
              </div>
            </div>

            {/* Content Box */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-50 rounded-2xl shadow-sm">
                  {club.icon}
                </div>
                <h2 className="text-3xl font-black text-[#001f3f] tracking-tighter uppercase leading-tight">
                  {club.title}
                </h2>
              </div>
              
              <div className="inline-block px-3 py-1 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded-lg">
                 <p className="text-[#001f3f] font-black text-[10px] uppercase tracking-widest italic">
                   "{club.motto}"
                 </p>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                {club.desc}
              </p>

              <div className="h-1 w-20 bg-gray-100 rounded-full" />
            </div>
          </motion.div>
        ))}
      </section>

      {/* 3. CALL TO ACTION */}
      <section className="bg-gray-50 py-20 text-center border-t border-gray-100">
        <h3 className="text-2xl font-black text-[#001f3f] mb-6 uppercase tracking-tight">Ready to join a unit?</h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Registration for new members opens at the start of every academic term. Contact your class teacher for details.</p>
        <button className="bg-[#001f3f] text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg">
           View Schedule
        </button>
      </section>
    </main>
  );
}