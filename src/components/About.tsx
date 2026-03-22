"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative z-20 bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 overflow-hidden">
      {/* Dynamic ambient background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div>
              <p className="text-purple-400 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-purple-400"></span>01. Background
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                Architecting <br className="hidden lg:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">models & systems.</span>
              </h2>
            </div>
            
            <div className="hidden lg:block space-y-4 mt-24">
              <div className="pt-6 border-t border-white/10 relative">
                <p className="text-zinc-500 text-xs tracking-widest uppercase mb-2">Status</p>
                <div className="flex items-center gap-3">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                  </div>
                  <p className="text-sm text-zinc-100 font-medium">Seeking Internship Opportunities</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & Bento Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-8 space-y-12"
          >
            <div className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light max-w-3xl space-y-6">
              <p>
                I am an <span className="text-white font-medium border-b border-blue-500/50 pb-0.5">Electronics and Communication Engineering</span> student inherently drawn to the intersection of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400 font-semibold">Machine Learning</span> and robust <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">Full-Stack Development</span>.
              </p>
              <p>
                I focus on architecting intelligent applications leveraging Python, React, and Node.js. My experience spans the entire pipeline—from meticulous data preprocessing and model training to building responsive client interfaces and robust API integrations.
              </p>
              <p className="text-zinc-400">
                Currently refining my architectural intuition through extensive study of Algorithms and Data Structures, aiming to build scalable systems that solve complex real-world problems.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
                <p className="text-zinc-500 text-xs tracking-widest uppercase mb-2">Location</p>
                <p className="text-white font-medium">Haldia, WB</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300">
                <p className="text-zinc-500 text-xs tracking-widest uppercase mb-2">Focus</p>
                <p className="text-white font-medium whitespace-nowrap">ML & Algorithms</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-all duration-300 col-span-2 md:col-span-1">
                <p className="text-zinc-500 text-xs tracking-widest uppercase mb-2">Education</p>
                <p className="text-white font-medium">B.Tech ECE</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
