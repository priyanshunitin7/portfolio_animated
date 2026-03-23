"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {

 useEffect(() => {
  console.log("Tracking visit..."); // 👈 ADD THIS FOR DEBUG

  fetch("/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "visit" }),
  });
}, []);

  return (
    <main className="relative bg-[#121212] selection:bg-white/20 text-white font-sans">
      <Navbar />
      <div id="home" className="relative w-full">
        <ScrollyCanvas />
        <Overlay />
      </div>
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}