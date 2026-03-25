"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "./TiltCard";

type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  tech: string[];
  features: string[];
  link?: string;
  github?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Customer Churn Prediction System",
    category: "Machine Learning",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"],
    link: "https://customer-churn-prediction-i5tm.vercel.app",
    features: [
      "Built ML models (Logistic Regression, Random Forest)",
      "Achieved 85%+ accuracy using rigorous metrics",
      "Drafted comprehensive evaluation (precision, recall, F1, confusion matrix)",
      "Visualized feature importance architecture"
    ]
  },
  {
    id: 2,
    title: "Contextual Clarity",
    category: "AI Document Understanding",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
    tech: ["React", "Node.js", "Tailwind CSS", "OpenAI API"],
    features: [
      "AI-powered massive document analysis tool",
      "Semantic summarization and granular insight extraction",
      "Deeply integrated with OpenAI LLMs",
      "Responsive UI prioritizing efficient, low-latency API handling"
    ]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="relative z-20 bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24 border-t border-white/5">
      {/* Dynamic ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <p className="text-pink-400 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-pink-400"></span>05. Selected Work
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">Case Studies.</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm text-sm font-light leading-relaxed">
            A selection of highly targeted systems designed to explore the boundaries of machine learning and performant full-stack engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-24">
          {projects.map((project, idx) => {
            const glowColor = idx % 2 === 0 ? "hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] group-hover:text-blue-400" : "hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] group-hover:text-purple-400";
            const tagColor = idx % 2 === 0 ? "text-blue-300 bg-blue-500/10 border-blue-500/20" : "text-purple-300 bg-purple-500/10 border-purple-500/20";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard className="group">
                  <div className={`relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20 bg-white/[0.02] backdrop-blur-3xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] rounded-[2.5rem] p-6 lg:p-10 transition-all duration-700 hover:bg-white/[0.04] overflow-hidden`}>

                    {/* Animated Gradient Background Glow */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-br ${idx % 2 === 0 ? 'from-blue-500/10 to-transparent' : 'from-purple-500/10 to-transparent'} pointer-events-none blur-3xl`} />

                    <div className={`w-full lg:w-3/5 relative overflow-hidden rounded-[2rem] transition-transform duration-700 z-10 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                      <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-black/50 border border-white/5">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-80 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-100 mix-blend-screen"
                        />
                        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.6)] pointer-events-none" />
                      </div>
                    </div>

                    <div className={`w-full lg:w-2/5 flex flex-col justify-center z-10 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                      <p className="text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-sans mb-6 font-medium">
                        {String(idx + 1).padStart(2, '0')} — {project.category}
                      </p>
                      <h3 className="text-4xl md:text-5xl font-semibold text-white mb-8 tracking-tight leading-[1.1]">
                        {project.title}
                      </h3>

                      <ul className="space-y-4 mb-12 text-zinc-400 font-light text-[15px] leading-relaxed">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className={`mr-4 mt-[0.4rem] text-[8px] opacity-60 ${idx % 2 === 0 ? 'text-blue-400' : 'text-purple-400'}`}>◆</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 mb-12">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3.5 py-1.5 bg-white/[0.03] border border-white/10 rounded-full text-[11px] font-medium tracking-wide text-zinc-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        {project.link ? (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="relative overflow-hidden group/btn px-6 py-3 bg-white text-black font-medium text-sm rounded-full transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
                            <span className="relative z-10">View Project</span>
                            <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </a>
                        ) : (
                          <button className="relative overflow-hidden group/btn px-6 py-3 bg-white text-black font-medium text-sm rounded-full transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 opacity-50 cursor-not-allowed">
                            <span className="relative z-10">Private Project</span>
                          </button>
                        )}
                        
                        {project.github ? (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-transparent border border-white/20 text-white hover:bg-white/5 font-medium text-sm rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                            GitHub
                          </a>
                        ) : (
                          <button className="px-6 py-3 bg-transparent border border-white/20 text-white hover:bg-white/5 font-medium text-sm rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2 opacity-50 cursor-not-allowed">
                            GitHub
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
