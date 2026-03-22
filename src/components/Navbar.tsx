"use client";

import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isHidden, setIsHidden] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 150], [1, 0.95]);
  const opacity = useTransform(scrollY, [0, 150], [1, 0.9]);
  const y = useTransform(scrollY, [0, 150], [0, -10]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 250) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      let current = "home";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header 
      style={{ scale, opacity, y }}
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-[100] flex justify-center w-full px-6 pointer-events-none origin-top"
    >
      <div className="pointer-events-auto relative flex items-center gap-1 md:gap-2 p-1.5 md:p-2 bg-black/40 backdrop-blur-3xl rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)] overflow-hidden">
        {/* Premium moving gradient border simulation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] animate-[spin_4s_linear_infinite] opacity-60 pointer-events-none"
             style={{ background: 'conic-gradient(from 90deg at 50% 50%, rgba(0,0,0,0) 50%, rgba(255,255,255,0.6) 100%)' }} />
        <div className="absolute inset-[1px] bg-[#121212]/80 backdrop-blur-3xl rounded-full pointer-events-none" />
        
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.substring(1);
          const isHovered = hoveredLink === link.name;
          
          return (
            <Magnetic key={link.name}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative px-5 py-2 md:px-6 md:py-2.5 text-[13px] md:text-[14px] font-medium transition-all duration-300 rounded-full z-10 ${
                  isActive || isHovered ? "text-white" : "text-zinc-400"
                }`}
              >
                {/* Background Pill for Active or Hover */}
                {(isActive || isHovered) && (
                  <motion.div
                    layoutId="navbar-pill"
                    className={`absolute inset-0 rounded-full ${isActive ? 'bg-white/[0.12] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' : 'bg-white/[0.06]'}`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                <span className="relative z-10 tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{link.name}</span>
              </a>
            </Magnetic>
          );
        })}
      </div>
    </motion.header>
  );
}
