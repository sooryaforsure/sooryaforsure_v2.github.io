import { useEffect, useRef } from "react";
import duckImg from "../assets/projects/duck2.jpg";
import guessmeImg from "../assets/projects/guessme.jpg";
import snakeImg from "../assets/projects/snake.jpg";
import pf1Img from "../assets/projects/pf1.jpg";

const PROJECTS = [
  {
    number: "01",
    title: "Church Management Suite",
    description:
      "A church management platform built as a dual-app system — an admin panel and a member-facing app working in sync, each with its own role-based access layer and multiple login types.",
    stack: ["Flutter", "Dart", "Supabase"],
    link: "https://github.com/sooryaforsure/churchManagement",
    link2: "https://github.com/sooryaforsure/parishioner",
    color: "#1a2a1a",
    accent: "#4ade80",
    media: null as string | null
  },
  {
    number: "02",
    title: "Socratic Duck",
    description:
      "An AI-powered learning assistant that uses the Socratic method to guide students through problems rather than just handing them answers. Think rubber duck debugging, but smarter.",
    stack: ["Node.js", "Express", "Gemini API", "HTML", "CSS"],
    link: "https://github.com/sooryaforsure/socraticDuck",
    link2: null,
    color: "#1a1a2a",
    accent: "#818cf8",
    media: duckImg,
  },
  {
    number: "03",
    title: "Guess Me",
    description:
      "A guessing game with dynamic question generation, live score tracking, and smooth animated transitions built with Flutter.",
    stack: ["Flutter", "Dart", "shared_preferences", "flutter_animate"],
    link: "https://github.com/sooryaforsure/guessMe",
    link2: null,
    color: "#230432",
    accent: "#fb923c",
    media: guessmeImg,
  },
  {
    number: "04",
    title: "Python Snake Game",
    description:
      "A classic Snake game rebuilt from scratch with Python, featuring custom collision logic, progressive difficulty, and persistent high score tracking.",
    stack: ["Python", "Pygame CE"],
    link: "https://github.com/sooryaforsure/python-snake-game",
    link2: null,
    color: "#0f1a0f",
    accent: "#34d399",
    media: snakeImg,
  },
  {
    number: "05",
    title: "Portfolio V1",
    description:
      "My earlier personal portfolio website — the foundation that evolved into this one. Built with vanilla HTML, CSS, and JavaScript.",
    stack: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/sooryaforsure/sooryaforsure.github.io",
    link2: null,
    color: "#1a1218",
    accent: "#f472b6",
    media: pf1Img,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarLeftRef = useRef<HTMLDivElement>(null);
  const progressBarRightRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / sectionHeight));
        const idx = Math.round(p * (PROJECTS.length - 1));

        track.style.transform = `translateX(${-p * (PROJECTS.length - 1) * 100}vw)`;

        if (idx !== activeIndexRef.current) {
          activeIndexRef.current = idx;
          dotsRef.current.forEach((dot, i) => {
            if (!dot) return;
            dot.style.width = i === idx ? "16px" : "4px";
            dot.style.background = i === idx ? "#f59e0b" : "rgba(255,255,255,0.15)";
          });
          if (counterRef.current) counterRef.current.textContent = `${idx + 1} / ${PROJECTS.length}`;
        }

        if (progressBarLeftRef.current) progressBarLeftRef.current.style.width = `${p * 120}px`;
        if (progressBarRightRef.current) progressBarRightRef.current.style.width = `${(1 - p) * 120}px`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
    {/* Section header — outside sticky, same design as About/Skills/Contact */}
    <div className="w-full px-8 md:px-16 lg:px-24 pt-32 pb-10 bg-[#0b0c0f]">
      <div className="max-w-5xl mx-auto flex items-end justify-between pb-6 border-b border-white/[0.05]">
        <div>
          <p
            className="text-[10px] tracking-[0.3em] text-[#f59e0b]/70 uppercase mb-3"
            style={{ fontFamily: "'JetBrains Mono',monospace" }}
          >
            02 / Work
          </p>
          <h2
            className="text-[clamp(2rem,4vw,3rem)] font-[200] tracking-[0.08em] text-[#f0ede8] uppercase"
            style={{ fontFamily: "'Outfit',sans-serif" }}
          >
            Selected Projects
          </h2>
        </div>
        <span
          className="text-[clamp(4rem,10vw,8rem)] font-[100] leading-none text-white/[0.03] select-none"
          style={{ fontFamily: "'Outfit',sans-serif" }}
        >
          02
        </span>
      </div>
    </div>

    <section id="projects" ref={sectionRef} style={{ height: `${PROJECTS.length * 100}vh` }}>
      {/* Sticky viewport */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100vh", background: "#0b0c0f" }}
      >

        {/* Dot navigation */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          {PROJECTS.map((_, i) => (
            <div
              key={i}
              ref={(el) => { dotsRef.current[i] = el; }}
              className="transition-all duration-300"
              style={{
                width: i === 0 ? "16px" : "4px",
                height: "4px",
                borderRadius: "2px",
                background: i === 0 ? "#f59e0b" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        {/* Card track */}
        <div
          ref={trackRef}
          className="flex h-full"
          style={{
            width: `${PROJECTS.length * 100}vw`,
            transform: "translateX(0vw)",
            willChange: "transform",
          }}
        >
          {PROJECTS.map((project) => (
            <div
              key={project.number}
              className="relative flex-shrink-0 flex items-center justify-center px-8 md:px-16 lg:px-24"
              style={{ width: "100vw", height: "100vh" }}
            >
              {/* Card */}
              <div
                className="w-full max-w-5xl rounded-2xl overflow-y-auto overflow-x-hidden grid grid-cols-1 md:grid-cols-2"
                style={{
                  background: project.color,
                  border: `1px solid ${project.accent}18`,
                  boxShadow: `0 0 80px ${project.accent}08, 0 32px 80px rgba(0,0,0,0.5)`,
                  minHeight: "520px",
                  maxHeight: "85vh",
                }}
              >
                {/* Left — project info */}
                <div className="flex flex-col justify-between p-8 md:p-10">
                  <div>
                    <span
                      className="text-[9px] tracking-[0.3em] uppercase"
                      style={{ fontFamily: "'JetBrains Mono',monospace", color: `${project.accent}99` }}
                    >
                      {project.number} / Project
                    </span>
                    <h3
                      className="mt-4 uppercase text-[#f0ede8] leading-tight"
                      style={{
                        fontFamily: "'Outfit',sans-serif",
                        fontWeight: 300,
                        fontSize: "clamp(1.4rem,3vw,2.2rem)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="mt-5 text-[#f0ede8]/50 leading-relaxed"
                      style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem" }}
                    >
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Stack */}
                    <div className="flex flex-wrap gap-2 mt-6 mb-6">
                      {project.stack.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-[9px] tracking-[0.18em] uppercase"
                          style={{
                            fontFamily: "'JetBrains Mono',monospace",
                            color: `${project.accent}cc`,
                            border: `1px solid ${project.accent}30`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.18em] uppercase font-medium transition-all duration-200 hover:opacity-80"
                        style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          color: "#0b0c0f",
                          background: project.accent,
                          borderRadius: "2px",
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                        {project.link2 ? "Admin Repo" : "View on GitHub"}
                      </a>
                      {project.link2 && (
                        <a
                          href={project.link2}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.18em] uppercase transition-all duration-200 hover:opacity-80"
                          style={{
                            fontFamily: "'JetBrains Mono',monospace",
                            color: project.accent,
                            border: `1px solid ${project.accent}50`,
                            borderRadius: "2px",
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                          </svg>
                          Member App
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right — media panel */}
                <div
                  className="relative flex items-center justify-center overflow-hidden"
                  style={{ background: `${project.accent}08`, borderLeft: `1px solid ${project.accent}12` }}
                >
                  {project.media ? (
                    project.media.endsWith(".mp4") || project.media.endsWith(".webm") ? (
                      <video
                        src={project.media}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={project.media}
                        alt={`${project.title} preview`}
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : (
                    /* Placeholder — replace project.media with a URL to show content */
                    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: `${project.accent}15`, border: `1px solid ${project.accent}30` }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={project.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                          <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                      </div>
                      <p
                        className="text-[9px] tracking-[0.25em] uppercase"
                        style={{ fontFamily: "'JetBrains Mono',monospace", color: `${project.accent}50` }}
                      >
                        Preview coming soon
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          <div ref={progressBarLeftRef} className="h-px bg-white/10" style={{ width: "0px", transition: "width 0.1s" }} />
          <span
            ref={counterRef}
            className="text-[9px] tracking-[0.25em] text-white/20 uppercase"
            style={{ fontFamily: "'JetBrains Mono',monospace" }}
          >
            1 / {PROJECTS.length}
          </span>
          <div ref={progressBarRightRef} className="h-px bg-white/10" style={{ width: "120px", transition: "width 0.1s" }} />
        </div>
      </div>
    </section>
    </>
  );
}

