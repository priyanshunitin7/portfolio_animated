"use client";

import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section id="experience" className="relative z-20 bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <p className="text-blue-400 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-blue-400"></span>03. Journey<span className="w-8 h-px bg-blue-400"></span>
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Trace <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Record.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Experience & Leadership */}
          <div className="space-y-16">
            <div>
              <h3 className="text-xl font-medium text-white mb-8 border-b border-white/5 pb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
                Experience
              </h3>
              
              <div className="relative pl-8 border-l-2 border-transparent space-y-12 before:absolute before:inset-y-0 before:-left-[2px] before:w-[2px] before:bg-gradient-to-b before:from-blue-500 before:via-purple-500 before:to-transparent">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="relative group"
                >
                  <div className="absolute w-4 h-4 bg-[#0a0a0a] border-2 border-blue-400 rounded-full -left-[41px] top-1 transition-transform group-hover:scale-125 group-hover:bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                  <h4 className="text-xl font-semibold text-white group-hover:text-blue-200 transition-colors">Machine Learning Trainee</h4>
                  <p className="text-blue-400 mb-1 font-medium">Euphoria GenX</p>
                  <p className="text-xs text-zinc-500 mb-4 tracking-wider uppercase font-mono">Jan 2026 – Present</p>
                  <ul className="text-zinc-300 space-y-2 list-none text-sm font-light leading-relaxed">
                    <li><span className="text-blue-500 mr-2 font-bold">•</span>Implemented supervised learning models like Linear Regression.</li>
                    <li><span className="text-blue-500 mr-2 font-bold">•</span>Performed rigorous data preprocessing using Pandas & NumPy.</li>
                    <li><span className="text-blue-500 mr-2 font-bold">•</span>Engineered full ML pipelines from preprocessing to evaluation.</li>
                  </ul>
                </motion.div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium text-white mb-8 border-b border-white/5 pb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
                Leadership & Achievements
              </h3>
              
              <div className="grid gap-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-semibold text-white">Content Writer & PR Manager</h4>
                      <p className="text-sm text-purple-400 mt-1">TaruGuardians</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-semibold text-white">Content Writer</h4>
                      <p className="text-sm text-purple-400 mt-1">E-Cell, HIT Haldia</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 rounded-2xl p-6 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] transition-all duration-300 group"
                >
                  <div>
                    <h4 className="text-base font-semibold text-white">National Entrepreneurship Challenge</h4>
                    <p className="text-sm text-zinc-400 mt-2">Placed <span className="text-white font-bold px-2 py-0.5 bg-gradient-to-r from-orange-500 to-purple-500 rounded ml-1 tracking-wide shadow-lg group-hover:scale-105 inline-block transition-transform">AIR 244</span></p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Column: Education */}
          <div>
            <h3 className="text-xl font-medium text-white mb-8 border-b border-white/5 pb-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>
              Education
            </h3>

            <div className="space-y-12 relative border-l-2 border-transparent pl-8 before:absolute before:inset-y-0 before:-left-[2px] before:w-[2px] before:bg-gradient-to-b before:from-orange-500 before:via-pink-500 before:to-transparent">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="relative group cursor-default"
              >
                <div className="absolute w-4 h-4 bg-[#0a0a0a] border-2 border-orange-400 rounded-full -left-[41px] top-1 transition-transform group-hover:scale-125 group-hover:bg-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
                <h4 className="text-xl font-semibold text-white group-hover:text-orange-200 transition-colors">Haldia Institute of Technology</h4>
                <p className="text-orange-400 mb-1 font-medium">B.Tech in Electronics & Communication Eng.</p>
                <p className="text-xs text-zinc-500 mb-3 tracking-wider uppercase font-mono">2023 – Present</p>
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-orange-500/20 to-transparent border border-orange-500/30 rounded-md text-xs text-orange-100 font-bold tracking-wide shadow-inner">
                  CGPA: 8.55
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative group cursor-default"
              >
                <div className="absolute w-4 h-4 bg-[#0a0a0a] border-2 border-pink-400 rounded-full -left-[41px] top-1 transition-transform group-hover:scale-125 group-hover:bg-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
                <h4 className="text-xl font-semibold text-white group-hover:text-pink-200 transition-colors">CM Science College, Darbhanga</h4>
                <p className="text-pink-400 mb-1 font-medium">Intermediate in Science</p>
                <p className="text-xs text-zinc-500 mb-3 tracking-wider uppercase font-mono">2020 – 2022</p>
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-pink-500/20 to-transparent border border-pink-500/30 rounded-md text-xs text-pink-100 font-bold tracking-wide shadow-inner">
                  Score: 86%
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group cursor-default"
              >
                <div className="absolute w-4 h-4 bg-[#0a0a0a] border-2 border-zinc-500 rounded-full -left-[41px] top-1 transition-transform group-hover:scale-125 group-hover:bg-zinc-500 shadow-[0_0_15px_rgba(113,113,122,0.5)]"></div>
                <h4 className="text-xl font-semibold text-white group-hover:text-zinc-200 transition-colors">Rose Public School, Darbhanga</h4>
                <p className="text-zinc-400 mb-1 font-medium">Matriculation</p>
                <p className="text-xs text-zinc-500 mb-3 tracking-wider uppercase font-mono">2019 – 2020</p>
                <div className="inline-block px-3 py-1 bg-white/[0.05] border border-white/10 rounded-md text-xs text-zinc-200 font-bold tracking-wide shadow-inner">
                  Score: 92%
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
