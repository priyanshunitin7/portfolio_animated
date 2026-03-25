"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Magnetic from "./Magnetic";

const navLinks = [
  { name: "Home",       href: "#home",       index: "01" },
  { name: "About",      href: "#about",      index: "02" },
  { name: "Skills",     href: "#skills",     index: "03" },
  { name: "Experience", href: "#experience", index: "04" },
  { name: "Projects",   href: "#projects",   index: "05" },
  { name: "Contact",    href: "#contact",    index: "06" },
];

function useIsMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

export default function Navbar() {
  const isMounted = useIsMounted();
  const [activeSection, setActiveSection] = useState("home");

  const [hoveredLink,  setHoveredLink]  = useState<string | null>(null);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [mousePos,     setMousePos]     = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setActiveSection("home");
  }, []);

  useEffect(() => {
  const sections = navLinks.map((l) =>
    document.getElementById(l.href.substring(1))
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => {
    if (section) observer.observe(section);
  });

  return () => {
    sections.forEach((section) => {
      if (section) observer.unobserve(section);
    });
  };
}, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string
) => {
  e.preventDefault();
  setMobileOpen(false);

  const el = document.getElementById(href.substring(1));
  if (!el) return;

  const NAVBAR_OFFSET = 100; // adjust if needed

  const y =
    el.getBoundingClientRect().top +
    window.pageYOffset -
    NAVBAR_OFFSET;

  window.scrollTo({ top: y, behavior: "smooth" });
};

  const activeIdx = navLinks.findIndex(
    (l) => l.href.substring(1) === activeSection
  );

  if (!isMounted) return null;

  return (
    <>
      {/* ════════════════════════════════════════
          DESKTOP NAV
      ════════════════════════════════════════ */}
      <motion.header
        variants={{ visible: { opacity: 1 } }}
        animate="visible"
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-[100] hidden md:flex justify-center w-full px-6 pointer-events-none"
      >
        <div
          ref={navRef}
          className="pointer-events-auto relative flex items-center gap-1 px-3 py-[10px] overflow-hidden"
          style={{
            borderRadius: 22,
            background: scrolled
              ? "rgba(8, 8, 10, 0.88)"
              : "rgba(8, 8, 10, 0.62)",
            backdropFilter: "blur(40px) saturate(200%) brightness(110%)",
            WebkitBackdropFilter: "blur(40px) saturate(200%) brightness(110%)",
            boxShadow: scrolled
              ? [
                  "0 0 0 1px rgba(255,255,255,0.08)",
                  "0 2px 4px rgba(0,0,0,0.4)",
                  "0 14px 44px rgba(0,0,0,0.58)",
                ].join(",")
              : [
                  "0 0 0 1px rgba(255,255,255,0.055)",
                  "0 4px 24px rgba(0,0,0,0.35)",
                ].join(","),
            transition: "background 0.5s, box-shadow 0.5s",
          }}
        >
          {/* Mouse-tracking radial aura */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 300,
              height: 300,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(120,80,255,0.08) 0%, transparent 72%)",
              left: mousePos.x - 150,
              top: mousePos.y - 150,
              transform: "translateZ(0)",
              transition: "left 0.05s, top 0.05s",
            }}
          />

          {/* Top shimmer edge */}
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 25%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.14) 75%, transparent 100%)",
            }}
          />

          {/* Section progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] pointer-events-none"
            initial={false}
            animate={{ width: `${((activeIdx + 1) / navLinks.length) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background:
                "linear-gradient(90deg, rgba(120,80,255,0.9), rgba(56,189,248,0.9))",
              borderRadius: "0 2px 0 0",
              boxShadow: "0 0 10px rgba(120,80,255,0.5)",
            }}
          />

          {/* Nav Links */}
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            const isHov    = hoveredLink === link.name;

            return (
              <Magnetic key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative flex flex-col items-center justify-center px-5 py-[10px] z-10 select-none focus-visible:outline-none"
                  style={{
                    borderRadius: 13,
                    minWidth: 80,
                    color: isActive
                      ? "#ffffff"
                      : isHov
                      ? "rgba(255,255,255,0.78)"
                      : "rgba(255,255,255,0.38)",
                    transition: "color 0.2s",
                  }}
                >
                  <span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      borderRadius: 13,
                      opacity: isActive || isHov ? 1 : 0,
                      background: isActive
                        ? "linear-gradient(145deg, rgba(120,80,255,0.22), rgba(56,189,248,0.12))"
                        : "rgba(255,255,255,0.055)",
                      boxShadow: isActive
                        ? "inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(120,80,255,0.18)"
                        : "inset 0 1px 0 rgba(255,255,255,0.05)",
                      transition: "opacity 0.18s ease, background 0.18s ease",
                    }}
                  />

                  <span
                    className="relative z-10 font-mono leading-none"
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.14em",
                      color: isActive
                        ? "rgba(120,80,255,0.9)"
                        : isHov
                        ? "rgba(255,255,255,0.28)"
                        : "rgba(255,255,255,0.14)",
                      transition: "color 0.25s",
                      marginBottom: 3,
                    }}
                  >
                    {link.index}
                  </span>

                  <span
                    className="relative z-10 font-semibold leading-none"
                    style={{
                      fontSize: 14,
                      letterSpacing: "0.025em",
                      fontFamily:
                        "'SF Pro Display', 'Helvetica Neue', system-ui, sans-serif",
                    }}
                  >
                    {link.name}
                  </span>

                  <span
                    className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 h-[2px] w-6 pointer-events-none"
                    style={{
                      opacity: isActive ? 1 : isHov ? 0.45 : 0,
                      transform: `translateX(-50%) scaleX(${isActive ? 1 : isHov ? 0.7 : 0})`,
                      background:
                        "linear-gradient(90deg, rgba(120,80,255,0), rgba(120,80,255,1), rgba(56,189,248,1), rgba(56,189,248,0))",
                      boxShadow: "0 0 8px rgba(120,80,255,0.8)",
                      borderRadius: 4,
                      transition: "opacity 0.2s ease, transform 0.2s ease",
                    }}
                  />
                </a>
              </Magnetic>
            );
          })}
        </div>
      </motion.header>

      {/* ════════════════════════════════════════
          MOBILE TOP BAR
          — Full width, no overflow, safe areas
      ════════════════════════════════════════ */}
      <motion.div
        variants={{ visible: { y: 0, opacity: 1 } }}
        animate="visible"
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] flex md:hidden items-center justify-between"
        style={{
          /* Safe area insets for notched phones */
          paddingTop: "max(env(safe-area-inset-top), 12px)",
          paddingBottom: 12,
          paddingLeft: "max(env(safe-area-inset-left), 16px)",
          paddingRight: "max(env(safe-area-inset-right), 16px)",
          background: scrolled
            ? "rgba(8,8,10,0.95)"
            : "rgba(8,8,10,0.75)",
          backdropFilter: "blur(36px) saturate(200%)",
          WebkitBackdropFilter: "blur(36px) saturate(200%)",
          borderBottom: "1px solid rgba(255,255,255,0.055)",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.48)" : "none",
          transition: "background 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Brand mark + active label */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="flex-shrink-0 flex items-center justify-center w-9 h-9 font-bold text-white"
            style={{
              borderRadius: 10,
              background:
                "linear-gradient(135deg, rgba(120,80,255,0.85), rgba(56,189,248,0.85))",
              fontSize: 14,
              boxShadow:
                "0 0 0 1px rgba(120,80,255,0.4), 0 4px 12px rgba(120,80,255,0.25)",
              fontFamily: "'SF Pro Display', system-ui, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            P
          </div>
          <div className="flex flex-col leading-none gap-[3px] min-w-0">
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                fontFamily: "monospace",
              }}
            >
              portfolio
            </span>
            <span
              className="font-semibold capitalize truncate"
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.88)",
                fontFamily: "'SF Pro Display', system-ui, sans-serif",
              }}
            >
              {activeSection}
            </span>
          </div>
        </div>

        {/* Progress indicator — small pill showing scroll progress */}
        <div
          className="flex-1 mx-4 h-[3px] rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          <motion.div
            className="h-full rounded-full"
            initial={false}
            animate={{ width: `${((activeIdx + 1) / navLinks.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background:
                "linear-gradient(90deg, rgba(120,80,255,0.9), rgba(56,189,248,0.9))",
            }}
          />
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex-shrink-0 relative flex items-center justify-center w-11 h-11 focus:outline-none"
          style={{
            borderRadius: 11,
            background: mobileOpen
              ? "rgba(120,80,255,0.18)"
              : "rgba(255,255,255,0.06)",
            border: `1px solid ${
              mobileOpen
                ? "rgba(120,80,255,0.35)"
                : "rgba(255,255,255,0.08)"
            }`,
            transition: "background 0.25s, border-color 0.25s",
          }}
          aria-label="Toggle navigation"
        >
          <span className="flex flex-col gap-[5px] items-center justify-center">
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: 45, y: 7, width: 18 }
                  : { rotate: 0, y: 0, width: 18 }
              }
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block h-[1.5px] rounded-full bg-white/80"
            />
            <motion.span
              animate={
                mobileOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
              className="block h-[1.5px] rounded-full bg-white/50"
              style={{ width: 12 }}
            />
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: -45, y: -7, width: 18 }
                  : { rotate: 0, y: 0, width: 18 }
              }
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block h-[1.5px] rounded-full bg-white/80"
            />
          </span>
        </button>
      </motion.div>

      {/* ════════════════════════════════════════
          MOBILE DROPDOWN PANEL
          — Full screen overlay, easier tap targets
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mob-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[98] md:hidden"
              style={{
                background: "rgba(0,0,0,0.72)",
                backdropFilter: "blur(6px)",
              }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel — anchored under the top bar, full width with safe-area gutters */}
            <motion.nav
              key="mob-panel"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-[99] md:hidden flex flex-col overflow-hidden"
              style={{
                /* Start below the topbar; account for safe-area */
                top: "calc(env(safe-area-inset-top, 0px) + 68px)",
                left: "max(env(safe-area-inset-left, 0px), 12px)",
                right: "max(env(safe-area-inset-right, 0px), 12px)",
                borderRadius: 20,
                background: "rgba(10,10,14,0.97)",
                backdropFilter: "blur(40px) saturate(200%)",
                WebkitBackdropFilter: "blur(40px) saturate(200%)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: [
                  "0 0 0 1px rgba(120,80,255,0.1)",
                  "0 24px 60px rgba(0,0,0,0.72)",
                  "0 8px 20px rgba(0,0,0,0.4)",
                ].join(","),
              }}
            >
              {/* Top chromatic accent line */}
              <div
                className="absolute inset-x-0 top-0 h-[1.5px] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(120,80,255,0.8) 30%, rgba(56,189,248,0.8) 70%, transparent)",
                }}
              />

              {/* Links — 2-column grid on wider phones, 1-col on narrow */}
              <div className="px-3 pt-4 pb-3 grid grid-cols-2 gap-2">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.04,
                        duration: 0.32,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-center gap-3 px-4 py-4 focus-visible:outline-none"
                      style={{
                        borderRadius: 14,
                        background: isActive
                          ? "linear-gradient(135deg, rgba(120,80,255,0.2), rgba(56,189,248,0.1))"
                          : "rgba(255,255,255,0.04)",
                        border: `1px solid ${
                          isActive
                            ? "rgba(120,80,255,0.28)"
                            : "rgba(255,255,255,0.06)"
                        }`,
                        transition: "background 0.2s, border-color 0.2s",
                        /* Large touch target */
                        minHeight: 60,
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {/* Active indicator dot or index */}
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          flexShrink: 0,
                          background: isActive
                            ? "linear-gradient(135deg, rgba(120,80,255,0.35), rgba(56,189,248,0.25))"
                            : "rgba(255,255,255,0.05)",
                          border: `1px solid ${isActive ? "rgba(120,80,255,0.4)" : "rgba(255,255,255,0.06)"}`,
                          fontSize: 10,
                          fontFamily: "monospace",
                          letterSpacing: "0.08em",
                          color: isActive
                            ? "rgba(140,100,255,1)"
                            : "rgba(255,255,255,0.22)",
                          transition: "all 0.2s",
                        }}
                      >
                        {link.index}
                      </span>

                      <span
                        className="font-semibold truncate"
                        style={{
                          fontSize: 15,
                          letterSpacing: "0.01em",
                          color: isActive
                            ? "#fff"
                            : "rgba(255,255,255,0.52)",
                          fontFamily:
                            "'SF Pro Display', system-ui, sans-serif",
                        }}
                      >
                        {link.name}
                      </span>

                      {isActive && (
                        <span
                          className="ml-auto flex-shrink-0 w-[6px] h-[6px] rounded-full"
                          style={{
                            background:
                              "linear-gradient(135deg, #7850ff, #38bdf8)",
                            boxShadow: "0 0 8px rgba(120,80,255,0.9)",
                          }}
                        />
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* Divider */}
              <div
                className="mx-4"
                style={{ height: 1, background: "rgba(255,255,255,0.05)" }}
              />

              {/* CTA button */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.35 }}
                className="px-3 py-3"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleClick(e, "#contact")}
                  className="relative flex items-center justify-center gap-2 w-full overflow-hidden focus-visible:outline-none"
                  style={{
                    borderRadius: 14,
                    height: 52,
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <span
                    className="absolute inset-0"
                    style={{
                      borderRadius: 14,
                      background:
                        "linear-gradient(135deg, rgba(120,80,255,0.88), rgba(56,189,248,0.82))",
                      boxShadow:
                        "0 0 0 1px rgba(120,80,255,0.4), 0 6px 22px rgba(120,80,255,0.32)",
                    }}
                  />
                  <span
                    className="relative z-10 font-bold text-white"
                    style={{
                      fontSize: 15,
                      letterSpacing: "0.04em",
                      fontFamily: "'SF Pro Display', system-ui, sans-serif",
                    }}
                  >
                    Get In Touch ↗
                  </span>
                </a>
              </motion.div>

              {/* Footer meta row */}
              <div
                className="flex items-center justify-between px-6 py-3 border-t"
                style={{ borderColor: "rgba(255,255,255,0.04)" }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.18)",
                  }}
                >
                  {activeIdx + 1} / {navLinks.length}
                </span>
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.18)",
                  }}
                >
                  ● {activeSection}
                </span>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}