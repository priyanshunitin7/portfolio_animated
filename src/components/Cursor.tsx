"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function Cursor() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Core crisp dot
  const springConfig = { damping: 25, stiffness: 300, mass: 0.2 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);
  
  // Trailing blurred aura
  const trailingConfig = { damping: 40, stiffness: 100, mass: 1 };
  const trailingX = useSpring(-100, trailingConfig);
  const trailingY = useSpring(-100, trailingConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8); // Center the 16px dot
      cursorY.set(e.clientY - 8);
      
      trailingX.set(e.clientX - 32); // Center the 64px blurred aura
      trailingY.set(e.clientY - 32);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, trailingX, trailingY]);

  if (!isMounted) return null;

  return (
    <>
      {/* Core crisp dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isHovering ? 0 : 1, // Shrink dot on hover
          opacity: isHovering ? 0 : 1,
        }}
      />
      
      {/* Trailing blurred aura */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full bg-white/60 blur-[4px] pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        style={{ x: trailingX, y: trailingY }}
        animate={{
          scale: isHovering ? 1.5 : 0.5, // Expand aura on hover
          opacity: isHovering ? 1 : 0.3,
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      />
    </>
  );
}
