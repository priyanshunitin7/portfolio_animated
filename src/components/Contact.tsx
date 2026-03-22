"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Magnetic from "./Magnetic";
import NeuralField from "./NeuralField";

export default function Contact() {
  return (
    <section id="contact" className="relative z-20 bg-[#0a0a0a] pt-32 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden min-h-screen">
      {/* Interactive 3D WebGL Background */}
      <NeuralField />

      <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-orange-600/10 rounded-t-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          
          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-cyan-400"></span>05. Connect
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-8">
              Let's build something <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">exceptional.</span>
            </h2>
            <p className="text-zinc-300 text-lg font-light leading-relaxed max-w-md mb-12">
              Currently actively seeking internship opportunities in software engineering and machine learning. 
              My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-zinc-300">
                <MapPin className="text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" size={20} />
                <span className="font-medium tracking-wide">Haldia, West Bengal, India</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-300">
                <Mail className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" size={20} />
                <a href="mailto:nitinece093@gmail.com" className="font-medium tracking-wide hover:text-blue-300 transition-colors">
                  nitinece093@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Active Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <form 
              action="https://formsubmit.co/nraj67609@gmail.com" 
              method="POST"
              className="space-y-8 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-3xl shadow-2xl relative pointer-events-auto"
            >
              {/* Form border glow on focus simulation */}
              <div className="absolute inset-0 rounded-3xl border border-transparent hover:border-blue-500/30 transition-colors pointer-events-none" />

              {/* FormSubmit Configuration Settings */}
              <input type="hidden" name="_subject" value="New submission from Portfolio Contact Form!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 relative group">
                  <input 
                    type="text" 
                    name="name" 
                    id="name"
                    required
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-transparent focus:outline-none focus:border-cyan-400 transition-colors peer"
                    placeholder="Name"
                  />
                  <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs font-mono tracking-widest text-zinc-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-cyan-400">
                    Name
                  </label>
                </div>
                
                <div className="flex-1 relative group">
                  <input 
                    type="email" 
                    name="email" 
                    id="email"
                    required
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-transparent focus:outline-none focus:border-cyan-400 transition-colors peer"
                    placeholder="Email"
                  />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs font-mono tracking-widest text-zinc-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-cyan-400">
                    Email address
                  </label>
                </div>
              </div>

              <div className="relative group pt-4">
                <textarea 
                  name="message" 
                  id="message"
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-transparent focus:outline-none focus:border-cyan-400 transition-colors peer resize-none"
                  placeholder="Message"
                ></textarea>
                <label htmlFor="message" className="absolute left-0 top-0.5 text-xs font-mono tracking-widest text-zinc-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-cyan-400">
                  Your message
                </label>
              </div>

              <Magnetic>
                <button type="submit" className="relative group overflow-hidden flex items-center justify-center gap-3 w-full px-10 py-5 bg-white/[0.03] backdrop-blur-2xl border border-white/10 text-white font-medium tracking-wide rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_60px_rgba(255,255,255,0.1)] hover:bg-white/10 transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer">
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">Send Message</span>
                  <ArrowUpRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 opacity-70 group-hover:opacity-100" />
                  {/* Light sweep animation wrapper */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-[150%] opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_ease-out_infinite]" />
                </button>
              </Magnetic>
            </form>
          </motion.div>
        </div>

        {/* Global Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="mailto:nitinece093@gmail.com" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
              <ArrowUpRight size={16} /> Contact directly
            </a>
          </div>

          <p className="text-zinc-500 font-mono text-xs tracking-widest">
            © {new Date().getFullYear()} NITIN RAJ.
          </p>
        </div>
      </div>
    </section>
  );
}
