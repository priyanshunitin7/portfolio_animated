"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Playfair_Display } from "next/font/google";

const signatureFont = Playfair_Display({ subsets: ["latin"], style: "italic", weight: "600" });

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1: 0% scroll (Center)
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -40]);

  // Section 2: 30% scroll (Left)
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.15, 0.45], [40, -40]);

  // Section 3: 60% scroll (Center)
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.45, 0.8], [40, -40]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center text-zinc-100">

        {/* Section 1 */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute flex flex-col items-center justify-center text-center px-6"
        >
          <div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full w-full h-full -z-10" />

          <h1 className="flex items-baseline justify-center tracking-tighter leading-none pb-4 relative group cursor-default">
            {/* Clean, Technical First Name */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="font-sans font-extralight tracking-[0.4em] text-white text-5xl md:text-[6rem] mr-4 md:mr-6"
            >
              NITIN
            </motion.span>

            {/* Expressive Cursive Last Name */}
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className={`${signatureFont.className} relative text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-300 to-zinc-600 capitalize p-2 -m-2 text-[4rem] md:text-[7.5rem] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
              style={{ paddingRight: '20px' }}
            >
              Raj
              {/* Light sweep hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_ease-out_forwards] skew-x-12 -translate-x-[150%] mix-blend-overlay" />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-6 text-sm md:text-xl text-zinc-400 font-light tracking-widest uppercase flex items-center justify-center flex-wrap gap-6"
          >
            <span className="hover:text-white transition-colors cursor-default">ML Enthusiast</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
            <span className="hover:text-white transition-colors cursor-default">Full Stack Developer</span>
          </motion.p>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute flex flex-col items-start justify-center text-left w-full max-w-7xl px-8 md:px-24"
        >
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-zinc-600"></span>Focus
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-zinc-100 max-w-4xl leading-[1.1] tracking-tight">
            Engineering <span className="text-white [-webkit-text-stroke:1px_rgba(255,255,255,0.5)] italic font-serif font-light">intelligence</span> <br /> into digital experiences.
          </h2>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute flex flex-col items-end justify-center text-right w-full max-w-7xl px-8 md:px-24"
        >
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-3 justify-end w-full">
            Philosophy<span className="w-8 h-px bg-zinc-600"></span>
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-zinc-100 max-w-5xl leading-[1.1] tracking-tight">
            Bridging precision machine learning with <br /> <span className="text-transparent bg-clip-text bg-gradient-to-l from-zinc-500 to-zinc-100">robust architectures.</span>
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
