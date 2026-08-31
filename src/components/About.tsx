import { useEffect, useRef } from "react";

function useReveal(dir: "left" | "right" | "up" = "up") {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.12) el.classList.add("revealed");
        else if (e.intersectionRatio < 0.04) el.classList.remove("revealed");
      },
      { threshold: [0, 0.04, 0.12] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const FACTS = [
  { label: "Degree", value: "Master of Computer Applications", badge: "Ongoing" },
  { label: "Institute", value: "Government Engineering College Thrissur" },
  { label: "Course Duration", value: "2026 – 2028" },
  { label: "Prior Degree", value: "BSc Computer Science", badge: "Completed" },
  { label: "Prior Institute", value: "St. Thomas (Autonomous) College, Thrissur" },
  { label: "Location", value: "Thrissur, Kerala, India" },
  { label: "Status", value: "Open to Opportunities" },
  { label: "Focus", value: "Full Stack · Python · UI/UX" },
];

export default function About() {
  const leftRef = useReveal("left");
  const rightRef = useReveal("right");

  return (
    <section
      id="about"
      className="relative w-full py-32 md:py-44 px-8 md:px-16 lg:px-24 bg-[#080a0d]"
    >
      {/* Top hairline */}
      <div className="w-full h-[1px] bg-[rgba(240,237,232,0.06)] mb-20" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Left column */}
        <div ref={leftRef} className="reveal-left flex flex-col gap-8">
          {/* Section number */}
          <span
            className="text-[clamp(5rem,14vw,10rem)] font-[100] leading-none text-[rgba(240,237,232,0.04)] select-none -ml-1"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            01
          </span>

          <div className="-mt-8 md:-mt-16">
            <p
              className="text-[10px] tracking-[0.3em] text-[#f59e0b]/70 uppercase mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              About
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3rem)] font-[200] tracking-[0.06em] text-[#f0ede8] leading-tight mb-8 uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              The Person
              <br />
              Behind the Code
            </h2>
            <p
              className="text-[#f0ede8]/50 text-[0.95rem] leading-[1.85] max-w-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              I&apos;m Sooryathej K L — a software developer and MCA student
              with a passion for building clean, purposeful digital experiences.
              I gravitate toward problems where design and engineering intersect,
              crafting software that is as intuitive as it is robust.
            </p>
            <p
              className="text-[#f0ede8]/35 text-[0.9rem] leading-[1.85] max-w-sm mt-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              When I&apos;m not writing code, I&apos;m exploring new frameworks,
              experimenting with UI concepts, or thinking about how technology
              can be made more human.
            </p>
          </div>
        </div>

        {/* Right column — dossier fact rows */}
        <div ref={rightRef} className="reveal-right flex flex-col justify-end pt-0 md:pt-16">
          <div className="border-t border-[rgba(240,237,232,0.06)]">
            {FACTS.map((fact, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-8 py-5 border-b border-[rgba(240,237,232,0.06)] group hover:bg-[rgba(240,237,232,0.02)] transition-colors duration-300 px-1"
              >
                <span
                  className="text-[9px] tracking-[0.28em] text-[#f0ede8]/25 uppercase shrink-0 pt-[2px]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {fact.label}
                </span>
                <span className="flex flex-col items-end gap-1">
                  <span
                    className="text-[0.85rem] text-[#f0ede8]/70 group-hover:text-[#f0ede8]/90 transition-colors duration-300 text-right tracking-[0.03em]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {fact.value}
                  </span>
                  {"badge" in fact && (
                    <span
                      className={`text-[8px] tracking-[0.22em] uppercase px-2 py-0.5 rounded-full border ${fact.badge === "Completed" ? "border-emerald-500/40 text-emerald-400/80 bg-emerald-500/08" : "border-[#f59e0b]/40 text-[#f59e0b]/80 bg-[#f59e0b]/08"}`}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {fact.badge}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Availability indicator */}
          <div className="flex items-center gap-3 mt-8 px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse-glow" />
            <span
              className="text-[9px] tracking-[0.25em] text-[#f59e0b]/60 uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Available for freelance &amp; full-time roles
            </span>
          </div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="w-full h-[1px] bg-[rgba(240,237,232,0.06)] mt-20 max-w-6xl mx-auto" />
    </section>
  );
}
