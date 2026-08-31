import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="bg-[#0b0c0f] min-h-full">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <footer className="w-full border-t border-white/[0.05] bg-[#080a0d] py-6 px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span
          className="text-[10px] tracking-[0.2em] text-white/20 uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          © {new Date().getFullYear()} Sooryathej K L. All rights reserved.
        </span>
        <span
          className="text-[10px] tracking-[0.15em] text-white/10 uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Designed &amp; Built by Sooryathej
        </span>
      </footer>
    </div>
  );
}
