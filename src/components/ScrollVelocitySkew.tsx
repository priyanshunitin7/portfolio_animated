"use client";

import { useScroll, useSpring, useTransform, useVelocity, motion } from "framer-motion";

export default function ScrollVelocitySkew({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skew = useTransform(smoothVelocity, [-1000, 1000], [1, -1]);
  
  return (
    <motion.div style={{ skewY: skew, transformOrigin: "center" }} className="w-full relative min-h-screen">
      {children}
    </motion.div>
  );
}
