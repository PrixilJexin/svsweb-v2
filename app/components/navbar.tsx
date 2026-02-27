"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lock } from "lucide-react";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      label: "About Us",
      links: [
        { name: "School Overview", href: "/school_overview" },
        { name: "Our Founder", href: "/founder" },
        { name: "Management & Staff", href: "/management" },
        { name: "Scholarships Offered", href: "/scholarships" },
      ],
    },
    {
      label: "Academics",
      links: [
        { name: "Curriculum", href: "/curriculum" },
        { name: "Subjects Offered", href: "/subjects" },
        { name: "Timetable", href: "/timetable" },
      ],
    },
    {
      label: "Events",
      links: [
        { name: "Annual Day", href: "/annual-day" },
        { name: "Culturals", href: "/culturals" },
      ],
    },
    {
      label: "Student Life",
      links: [
        { name: "Sports & Fitness", href: "/sports" },
        { name: "Clubs & Activities", href: "/clubs" },
      ],
    },
    {
      label: "Gallery",
      links: [
        { name: "2024-2025", href: "/gallery/3" },
        { name: "2025-2026", href: "/gallery/4" },
      ],
    },
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className="pointer-events-auto bg-black/60 backdrop-blur-2xl border border-white/10 px-8 py-3.5 rounded-full shadow-[0_8px_40px_0_rgba(0,0,0,0.6)] flex items-center gap-8 transition-all duration-500 hover:bg-black/70"
        style={{ fontFamily: "'Lora', serif" }}
      >
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors whitespace-nowrap">
          St.Vincent's <span className="text-blue-400 font-light">School</span>
        </Link>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 text-[15px] font-semibold text-white/90 hover:text-white py-2 transition-all">
                {item.label}
                <motion.div
                  animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              {/* Invisible bridge to prevent gap-triggered close */}
              <div className="absolute left-0 right-0 h-3 bottom-0 translate-y-full" />

              {/* Dropdown */}
              <AnimatePresence>
                {activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 6, scale: 0.95, filter: "blur(8px)" }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-black/75 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl p-2 overflow-hidden"
                  >
                    {item.links.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="block px-5 py-3 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Admin Button */}
          <Link
            href="/admin"
            prefetch={false}
            className="group relative flex items-center gap-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-600 hover:text-white transition-all active:scale-95 overflow-hidden"
          >
            <Lock className="w-3.5 h-3.5" />
            Admin Login
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          </Link>
        </div>
      </nav>
    </div>
  );
}