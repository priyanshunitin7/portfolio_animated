"use client";

import React from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import {
  Code2,
  Database,
  LayoutTemplate,
  Terminal,
  Figma as FigmaIcon,
  Cpu,
  Server,
  Globe,
} from "lucide-react";

/* 🔥 Hybrid Marquee (expressive + controlled) */
const Marquee = ({
  text,
  direction = 1,
  speed = 40,
}: {
  text: string;
  direction?: number;
  speed?: number;
}) => (
  <div className="group relative w-full overflow-hidden opacity-60 hover:opacity-100 transition-all duration-700">
    <motion.div
      animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ ease: "linear", duration: speed, repeat: Infinity }}
      className="flex w-max gap-8 md:gap-16"
    >
      {[...Array(2)].map((_, i) => (
        <React.Fragment key={i}>
          <span className="text-[clamp(2rem,8vw,4rem)] md:text-[7rem] font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] group-hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.9)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 tracking-tight uppercase">
            {text}
          </span>
          <span className="text-[clamp(2rem,8vw,4rem)] md:text-[7rem] text-blue-500 font-serif italic px-4 md:px-8 opacity-70 group-hover:opacity-100 transition">
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
    ],
  },
  {
    title: "Frontend & Design",
    skills: [
      { name: "React", icon: LayoutTemplate },
      { name: "Next.js", icon: Globe },
      { name: "HTML/CSS", icon: LayoutTemplate },
      { name: "Figma", icon: FigmaIcon },
    ],
  },
  {
    title: "Backend & Systems",
    skills: [
      { name: "Node.js", icon: Server },
      { name: "SQL DBs", icon: Database },
      { name: "Machine Learning", icon: Cpu },
      { name: "System Design", icon: Server },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative z-20 bg-[#0a0a0a] py-28 md:py-36 border-t border-white/5 overflow-x-clip">

      {/* 🌫️ Premium ambient background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)]" />

      {/* 🔥 Marquee (top layer) */}
      <div className="relative z-0 space-y-6 md:space-y-10 mb-20 md:mb-32 -rotate-2 scale-[1.05] md:scale-110">
        <Marquee text="FRONTEND  REACT  NEXT.JS  TAILWIND  UI" direction={1} speed={40} />
        <Marquee text="ML  PYTHON  TENSORFLOW  DATA  MODELS" direction={-1} speed={35} />
      </div>

      {/* 🧊 Clean header */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mb-16 md:mb-24 relative z-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight">
          Capabilities
        </h2>
        <p className="text-zinc-500 max-w-xl text-sm md:text-base leading-relaxed">
          A refined stack blending intelligent systems with modern web architecture.
        </p>
      </div>

      {/* ⚡ Skills Grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {skillCategories.map((category, catIdx) => (
            <div key={category.title} className="flex flex-col gap-6">

              {/* Category Label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-px bg-blue-500/50" />
                <span className="text-xs tracking-[0.2em] text-zinc-500 uppercase font-mono">
                  {category.title}
                </span>
              </motion.div>

              {/* Cards */}
              <div className="flex flex-col gap-4">
                {category.skills.map((skill, idx) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                    >
                      <TiltCard>
                        <div className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 hover:shadow-[0_10px_40px_rgba(59,130,246,0.1)] transition-all duration-300">

                          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.05] group-hover:scale-110 transition">
                            <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition" />
                          </div>

                          <span className="text-zinc-300 text-sm md:text-base group-hover:text-white transition">
                            {skill.name}
                          </span>

                        </div>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}