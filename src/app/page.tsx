import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative bg-[#121212] selection:bg-white/20 text-white font-sans">
      <Navbar />
      
      {/* Home Anchor for the Hero Section */}
      <div id="home" className="relative w-full">
        <ScrollyCanvas />
        <Overlay />
      </div>
      
      {/* Post-scroll Content Portions */}
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      
    </main>
  );
}
