"use client";

import React from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import { Code2, Database, LayoutTemplate, Terminal, Figma as FigmaIcon, Cpu, Server, Globe } from "lucide-react";

const Marquee = ({ text, direction = 1, speed = 40 }: { text: string; direction?: number; speed?: number }) => (
  <div className="flex w-full overflow-hidden whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity duration-700 cursor-default">
    <motion.div
      animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ ease: "linear", duration: speed, repeat: Infinity }}
      className="flex min-w-full justify-around gap-16"
    >
      {[...Array(4)].map((_, i) => (
        <React.Fragment key={i}>
          <span className="text-6xl md:text-[8rem] font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.8)] transition-all duration-300 tracking-tighter uppercase whitespace-nowrap">
            {text}
          </span>
          <span className="text-6xl md:text-[8rem] text-blue-500 font-serif italic whitespace-nowrap px-8">
            ✧
          </span>
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

const skillCategories = [
  {
    title: "Core Languages",
    skills: [
      { name: "C++", icon: Terminal },
      { name: "Python", icon: Terminal },
      { name: "JavaScript", icon: Code2 },
      { name: "TypeScript", icon: Code2 },
    ]
  },
  {
    title: "Frontend & Design",
    skills: [
      { name: "React", icon: LayoutTemplate },
      { name: "Next.js", icon: Globe },
      { name: "HTML/CSS", icon: LayoutTemplate },
      { name: "Figma", icon: FigmaIcon },
    ]
  },
  {
    title: "Backend & Systems",
    skills: [
      { name: "Node.js", icon: Server },
      { name: "SQL DBs", icon: Database },
      { name: "Machine Learning", icon: Cpu },
      { name: "System Design", icon: Server },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="relative z-20 bg-[#0a0a0a] py-32 border-t border-white/5 flex flex-col justify-center min-h-[80vh]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full relative z-10 space-y-4 md:space-y-8 origin-center -rotate-2 scale-110">
        <Marquee text="FRONTEND ARCHITECTURE  REACT  NEXT.JS  TAILWIND CSS  WEBGL" direction={1} speed={40} />
        <Marquee text="MACHINE LEARNING  PYTHON  TENSORFLOW  SCIKIT-LEARN  PANDAS" direction={-1} speed={35} />
        <Marquee text="CORE PRINCIPLES  ALGORITHMS  SYSTEM DESIGN  DATA STRUCTURES" direction={1} speed={50} />
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-32 relative z-10 w-full flex justify-between items-end">
        <div className="max-w-md">
           <h3 className="text-2xl font-medium text-white mb-4">The Stack</h3>
           <p className="text-zinc-500 font-light leading-relaxed">
             My toolset is fluid. I prioritize building robust architectural systems that can rapidly integrate new frameworks and machine learning models without friction.
           </p>
        </div>
      </div>
      {/* Structured Visual Grid */}
      <div className="max-w-7xl mx-auto px-6 w-full pt-40 relative z-30 pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          {skillCategories.map((category, catIdx) => (
            <div key={category.title} className="flex flex-col gap-6">
              
              {/* Category Header */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, delay: catIdx * 0.15 }}
                className="flex items-center gap-4 mb-2"
              >
                <div className="w-8 h-[1px] bg-gradient-to-r from-blue-500/50 to-transparent" />
                <h3 className="text-zinc-500 font-mono text-[10px] tracking-[0.2em] uppercase font-semibold">
                  {category.title}
                </h3>
              </motion.div>

              {/* Skill Cards */}
              <div className="flex flex-col gap-4">
                {category.skills.map((skill, idx) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: (catIdx * 0.1) + (idx * 0.1), ease: "easeOut" }}
                      className="will-change-transform"
                    >
                      <TiltCard className="group cursor-crosshair">
                        <div className="relative overflow-hidden flex items-center gap-5 p-4 rounded-[1.2rem] bg-white/[0.04] border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-white/[0.08] hover:border-white/10 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_40px_rgba(59,130,246,0.1)] hover:-translate-y-1">
                          
                          {/* Inner ambient sweep on hover */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

                          <div className="relative z-10 w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/[0.08] group-hover:border-white/20">
                            <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                          </div>
                          
                          <span className="relative z-10 font-medium text-zinc-300 tracking-wide text-[15px] group-hover:text-white transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                            {skill.name}
                          </span>
                        </div>
                      </TiltCard>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
