"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function Cursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const rafRef = useRef<number | null>(null);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.15 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const trailingConfig = { damping: 45, stiffness: 90, mass: 1.2 };
  const trailingX = useSpring(-100, trailingConfig);
  const trailingY = useSpring(-100, trailingConfig);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);

    const moveCursor = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX - 8);
        cursorY.set(e.clientY - 8);
        trailingX.set(e.clientX - 32);
        trailingY.set(e.clientY - 32);
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea" ||
        target.tagName.toLowerCase() === "select" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(!!interactive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp   = () => setIsClicking(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
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
          scale: isClicking ? 0.6 : isHovering ? 1.5 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ scale: { type: "spring", stiffness: 400, damping: 20 } }}
      />

      {/* Trailing aura — subtle, never expands on hover */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        style={{
          x: trailingX,
          y: trailingY,
          background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.05) 70%)",
          filter: "blur(6px)",
        }}
        animate={{
          scale: isClicking ? 0.7 : 0.5, // fixed size, never grows on hover
          opacity: isHidden ? 0 : 0.25,   // always dim, never blooms
        }}
        transition={{ scale: { type: "spring", stiffness: 250, damping: 22 } }}
      />
    </>
  );
}