"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function Cursor() {
  const [isMounted,  setIsMounted]  = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden,   setIsHidden]   = useState(false);

  const rafRef = useRef<number | null>(null);

  /* ── spring configs ── */
  const fastSpring  = { damping: 30, stiffness: 420, mass: 0.12 };
  const slowSpring  = { damping: 38, stiffness: 180, mass: 0.6  };

  /* main lens position (fast) */
  const x  = useSpring(-100, fastSpring);
  const y  = useSpring(-100, fastSpring);

  /* outer halo position (slightly lazier for depth) */
  const hx = useSpring(-100, slowSpring);
  const hy = useSpring(-100, slowSpring);

  const SIZE       = 25;   // lens diameter
  const HALO_SIZE  = 42;   // outer halo diameter

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);

    const move = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        x.set(e.clientX  - SIZE      / 2);
        y.set(e.clientY  - SIZE      / 2);
        hx.set(e.clientX - HALO_SIZE / 2);
        hy.set(e.clientY - HALO_SIZE / 2);
      });
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hit =
        ["a","button","input","textarea","select"].includes(t.tagName.toLowerCase()) ||
        t.closest("a") || t.closest("button") ||
        t.classList.contains("cursor-pointer") ||
        window.getComputedStyle(t).cursor === "pointer";
      setIsHovering(!!hit);
    };

    const down  = () => setIsClicking(true);
    const up    = () => setIsClicking(false);
    const leave = () => setIsHidden(true);
    const enter = () => setIsHidden(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [x, y, hx, hy]);

  if (!isMounted) return null;

  return (
    <>
      {/*
        ── LAYER 1: Outer halo ──────────────────────────────────────
        Lazy follower. Semi-transparent frosted ring.
        Uses backdrop-filter: invert(0.12) so it tints to the page
        content behind it — visible but never overwhelming.
      */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] hidden md:block"
        style={{
          x: hx,
          y: hy,
          width:  HALO_SIZE,
          height: HALO_SIZE,
          borderRadius: "50%",
          backdropFilter:       "invert(0.08) brightness(1.08)",
          WebkitBackdropFilter: "invert(0.08) brightness(1.08)",
          boxShadow: `
            inset 0 0 0 0.75px rgba(255,255,255,0.12),
            0 0 0 0.5px rgba(0,0,0,0.06)
          `,
          background: "rgba(255,255,255,0.03)",
        }}
        animate={{
          scale:   isClicking ? 0.88 : isHovering ? 1.3 : 1,
          opacity: isHidden   ? 0    : isHovering ? 0.7 : 0.45,
        }}
        transition={{
          scale:   { type: "spring", stiffness: 220, damping: 26 },
          opacity: { duration: 0.22 },
        }}
      />

      {/*
        ── LAYER 2: Core lens ──────────────────────────────────────
        The main cursor. Full invert = true lens effect.
        On hover: scale up + a chromatic split using the
        CSS outline trick (two inset box-shadows offset slightly
        in red & cyan to mimic lens dispersion).
      */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{ x, y }}
        animate={{
          scale:   isClicking ? 0.72 : isHovering ? 1.5 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{
          scale:   { type: "spring", stiffness: 400, damping: 22 },
          opacity: { duration: 0.16 },
        }}
      >
        <div
          style={{
            width:        SIZE,
            height:       SIZE,
            borderRadius: "50%",
            backdropFilter:       "invert(1) brightness(1.08) contrast(1.06)",
            WebkitBackdropFilter: "invert(1) brightness(1.08) contrast(1.06)",
            background: "transparent",
            /* Chromatic aberration on hover via layered inset shadows:
               red channel bleeds top-left, cyan bleeds bottom-right */
            boxShadow: isHovering
              ? `
                inset  1px  1px 0 0.5px rgba(255, 80,  80,  0.55),
                inset -1px -1px 0 0.5px rgba( 80, 220, 255, 0.55),
                inset 0 0 0 0.75px rgba(255,255,255,0.18)
              `
              : `
                inset 0 0 0 0.75px rgba(255,255,255,0.14),
                0 0 0 0.5px rgba(0,0,0,0.05)
              `,
            transition: "box-shadow 0.2s ease",
          }}
        />
      </motion.div>

      {/*
        ── LAYER 3: Click burst ─────────────────────────────────────
        A single sharp ring that expands & fades on mousedown.
        Positioned on the halo centre so it radiates from the right spot.
      */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
          style={{
            x: hx,
            y: hy,
            width:        HALO_SIZE,
            height:       HALO_SIZE,
            borderRadius: "50%",
            border:       "0.75px solid rgba(255,255,255,0.55)",
            background:   "transparent",
            mixBlendMode: "difference",
          }}
          initial={{ scale: 1, opacity: 0.65 }}
          animate={{ scale: 2.4, opacity: 0   }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </>
  );
}