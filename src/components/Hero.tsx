import { useState, useEffect, useRef } from "react";

const TICKER_ITEMS = [
  "SOFTWARE DEVELOPER", "MCA STUDENT", "FULL STACK", "PYTHON",
  "DJANGO", "REACT", "JAVA", "UI/UX", "THRISSUR, INDIA", "OPEN TO WORK",
];
const tickerLine = [...TICKER_ITEMS, ...TICKER_ITEMS];
const NAV_LINKS = ["About", "Projects", "Skills", "Contact"];

const CODE_LINES = [
  { indent: 0, text: "class Developer:", color: "#a5b4fc" },
  { indent: 1, text: 'name = "Sooryathej K L"', color: "#86efac" },
  { indent: 1, text: 'role = "Software Developer"', color: "#86efac" },
  { indent: 1, text: 'stack = ["Python","Flutter","Node.js"]', color: "#fde68a" },
  { indent: 0, text: "", color: "" },
  { indent: 1, text: "def build(self, idea):", color: "#a5b4fc" },
  { indent: 2, text: "return idea.ship() 🚀", color: "#6ee7b7" },
];

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [typed, setTyped] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Typewriter for code card
  useEffect(() => {
    const total = CODE_LINES.reduce((a, l) => a + l.text.length, 0);
    if (typed >= total) return;
    const t = setTimeout(() => setTyped((p) => p + 1), 38);
    return () => clearTimeout(t);
  }, [typed]);

  // Render code lines with typewriter
  let charsUsed = 0;
  const renderedLines = CODE_LINES.map((line) => {
    const visible = Math.max(0, typed - charsUsed);
    charsUsed += line.text.length;
    return { ...line, visible: line.text.slice(0, visible) };
  });

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-[#0b0c0f]">

      {/* ── Background: dark slate with subtle grid ── */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, #0b0c0f 0%, #0f1117 40%, #0d1020 65%, #0b0c0f 100%)"
      }}>
        {/* Dot grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        {/* Accent color wash — top right */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 55% 45% at 80% 20%, rgba(245,158,11,0.06) 0%, transparent 65%)"
        }} />
        {/* Vignette */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(11,12,15,0.88) 100%)"
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-transparent to-[#0b0c0f]/50" />
      </div>

      {/* ── Cursor glow ── */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{
        background: `radial-gradient(500px circle at ${mouse.x}% ${mouse.y}%, rgba(245,158,11,0.07) 0%, transparent 65%)`,
        transition: "background 0.1s ease-out",
      }} />
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{
        background: `radial-gradient(140px circle at ${mouse.x}% ${mouse.y}%, rgba(245,158,11,0.1) 0%, transparent 100%)`,
        transition: "background 0.06s ease-out",
      }} />

      {/* ── Floating code card (right side on desktop) ── */}
      <div
        className="absolute right-8 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 hidden md:block z-10 fade-up"
        style={{ animationDelay: "0.8s" }}
      >
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            width: "340px",
            background: "rgba(15,17,23,0.85)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(245,158,11,0.04)",
          }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-[10px] tracking-widest text-white/20 uppercase" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
              portfolio.py
            </span>
          </div>

          {/* Code body */}
          <div className="p-5 space-y-1" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12.5px", lineHeight: "1.7" }}>
            {renderedLines.map((line, i) => (
              <div key={i} style={{ paddingLeft: `${line.indent * 16}px` }}>
                {line.visible ? (
                  <span style={{ color: line.color }}>{line.visible}</span>
                ) : (
                  <span>&nbsp;</span>
                )}
                {/* Blinking cursor on last active line */}
                {i === renderedLines.findIndex((l, idx) => {
                  let used = 0;
                  for (let j = 0; j <= idx; j++) used += CODE_LINES[j].text.length;
                  return typed < used;
                }) && (
                    <span className="inline-block w-[2px] h-[14px] bg-[#f59e0b] align-middle ml-[1px] pulse-glow" />
                  )}
              </div>
            ))}
          </div>

          {/* Glow edge */}
          <div className="absolute inset-0 pointer-events-none rounded-xl" style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.03) 0%, transparent 60%)"
          }} />
        </div>

        {/* Floating label below card */}
        <p className="mt-3 text-center text-[9px] tracking-[0.25em] text-white/20 uppercase" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
          currently available
        </p>
      </div>

      {/* ── Nav ── */}
      <nav
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 py-8 fade-up"
        style={{ animationDelay: "0.1s" }}
      >
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.25em" }}
          className="text-[#f0ede8]/40 uppercase">SRJ</span>
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.2em" }}
              className="text-[#f0ede8]/35 uppercase hover:text-[#f59e0b] transition-colors duration-300">
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Center title card ── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 md:items-start md:text-left md:pl-16 lg:pl-24 md:pr-[420px]">

        <div className="fade-up" style={{ animationDelay: "0.25s" }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", letterSpacing: "0.35em" }}
            className="text-[#f59e0b]/75 uppercase">
            Software Developer &amp; MCA Student
          </span>
        </div>

        <h1
          className="fade-up mt-5 uppercase text-[#f0ede8]"
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontWeight: 300,
            fontSize: "clamp(2.2rem,5.5vw,5rem)",
            letterSpacing: "0.22em",
            lineHeight: 1.1,
            animationDelay: "0.45s",
          }}
        >
          Sooryathej <br /> K L
        </h1>

        <div className="fade-up mt-8 mb-8 w-px h-10 bg-[#f59e0b]/25 md:self-start" style={{ animationDelay: "0.65s" }} />

        <p className="fade-up text-[#f0ede8]/40 leading-relaxed max-w-xs"
          style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", letterSpacing: "0.06em", animationDelay: "0.8s" }}>
          Building software that matters.<br />Based in Thrissur, India.
        </p>

        <a
          href="#projects"
          className="fade-up inline-flex items-center gap-3 border border-[#f59e0b]/30 text-[#f59e0b] hover:bg-[#f59e0b] hover:text-[#0b0c0f] transition-all duration-500 px-8 py-3 uppercase"
          style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.25em", animationDelay: "1s", marginTop: "5rem" }}
        >
          View Work
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 fade-up"
        style={{ animationDelay: "1.3s" }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", letterSpacing: "0.3em" }}
          className="text-[#f0ede8]/20 uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#f0ede8]/15 to-transparent" />
      </div>

      {/* ── Ticker ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-white/[0.04] bg-[#0b0c0f]/80 backdrop-blur-sm">
        <div className="flex ticker-track whitespace-nowrap py-3">
          {tickerLine.map((item, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", letterSpacing: "0.3em" }}
                className="text-[#f0ede8]/20 uppercase px-6">{item}</span>
              <span className="text-[#f59e0b]/25 text-[8px]">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
