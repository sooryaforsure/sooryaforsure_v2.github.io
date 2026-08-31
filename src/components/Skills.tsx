import { useCallback, useEffect, useRef, useState } from "react";

type Skill = { name: string; icon: string; color: string; category: string };

const ALL_SKILLS: Skill[] = [
  { name: "Python",        icon: "python",           color: "#3776AB", category: "Languages & Frameworks" },
  { name: "JavaScript",    icon: "javascript",       color: "#F7DF1E", category: "Languages & Frameworks" },
  { name: "Java",          icon: "openjdk",          color: "#ED8B00", category: "Languages & Frameworks" },
  { name: "C",             icon: "c",                color: "#A8B9CC", category: "Languages & Frameworks" },
  { name: "C++",           icon: "cplusplus",        color: "#00599C", category: "Languages & Frameworks" },
  { name: "PHP",           icon: "php",              color: "#777BB4", category: "Languages & Frameworks" },
  { name: "Dart",          icon: "dart",             color: "#0175C2", category: "Languages & Frameworks" },
  { name: "SQL",           icon: "postgresql",       color: "#4169E1", category: "Languages & Frameworks" },
  { name: "HTML5",         icon: "html5",            color: "#E34F26", category: "Languages & Frameworks" },
  { name: "Flutter",       icon: "flutter",          color: "#02569B", category: "Languages & Frameworks" },
  { name: "Node.js",       icon: "nodedotjs",        color: "#339933", category: "Languages & Frameworks" },
  { name: "Express.js",    icon: "express",          color: "#d4d0cb", category: "Languages & Frameworks" },
  { name: "MySQL",         icon: "mysql",            color: "#4479A1", category: "Databases" },
  { name: "PostgreSQL",    icon: "postgresql",       color: "#4169E1", category: "Databases" },
  { name: "MongoDB",       icon: "mongodb",          color: "#47A248", category: "Databases" },
  { name: "SQLite",        icon: "sqlite",           color: "#44a3cc", category: "Databases" },
  { name: "Firestore",     icon: "firebase",         color: "#FFCA28", category: "Databases" },
  { name: "Supabase",      icon: "supabase",         color: "#3ECF8E", category: "Databases" },
  { name: "Git",           icon: "git",              color: "#F05032", category: "Tools & DevOps" },
  { name: "GitHub",        icon: "github",           color: "#d4d0cb", category: "Tools & DevOps" },
  { name: "Linux",         icon: "linux",            color: "#FCC624", category: "Tools & DevOps" },
  { name: "AWS",           icon: "amazonwebservices",color: "#FF9900", category: "Tools & DevOps" },
  { name: "Cloudflare",    icon: "cloudflare",       color: "#F38020", category: "Platforms & Services" },
  { name: "Postman",       icon: "postman",          color: "#FF6C37", category: "Platforms & Services" },
  { name: "VS Code",       icon: "visualstudiocode", color: "#007ACC", category: "Platforms & Services" },
  { name: "Android Studio",icon: "androidstudio",   color: "#3DDC84", category: "Platforms & Services" },
  { name: "Figma",         icon: "figma",            color: "#F24E1E", category: "Design" },
  { name: "Illustrator",   icon: "adobeillustrator", color: "#FF9A00", category: "Design" },
  { name: "Photoshop",     icon: "adobephotoshop",   color: "#31A8FF", category: "Design" },
  { name: "Canva",         icon: "canva",            color: "#00C4CC", category: "Design" },
];

const CATEGORIES = ["All", ...Array.from(new Set(ALL_SKILLS.map((s) => s.category)))];

const SOFT_SKILLS = [
  "Problem Solving", "Clean Code", "UI/UX Thinking",
  "Team Collaboration", "Fast Learner", "Attention to Detail",
];

const FLOAT_DURS   = ["3.8s","4.4s","5.1s","4.7s","3.5s","5.6s","4.1s","3.9s","4.9s","5.3s","4.2s","3.7s"];
const FLOAT_DELAYS = ["0s","0.6s","1.2s","0.3s","1.8s","0.9s","2.1s","0.4s","1.5s","0.7s","2.4s","1.1s"];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.intersectionRatio >= 0.06) setVisible(true); },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function LogoCard({ skill, index }: { skill: Skill; index: number }) {
  const [active, setActive] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const touchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleTouchStart() {
    setActive(true);
    if (touchTimer.current) clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => setActive(false), 600);
  }

  useEffect(() => () => { if (touchTimer.current) clearTimeout(touchTimer.current); }, []);

  return (
    <div
      className="pop-in flex flex-col items-center gap-2.5 cursor-default select-none"
      style={{ animationDelay: `${index * 40}ms` }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={handleTouchStart}
    >
      {/* Floating wrapper */}
      <div
        className="skill-card-float"
        style={{
          "--float-dur": FLOAT_DURS[index % FLOAT_DURS.length],
          animationDelay: FLOAT_DELAYS[index % FLOAT_DELAYS.length],
          animationPlayState: active ? "paused" : "running",
          willChange: "transform",
        } as React.CSSProperties}
      >
        {/* Card */}
        <div
          className="relative w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] flex items-center justify-center rounded-2xl overflow-hidden"
          style={{
            border: active ? `1px solid ${skill.color}88` : "1px solid rgba(240,237,232,0.1)",
            background: active
              ? `radial-gradient(circle at 50% 60%, ${skill.color}28 0%, ${skill.color}08 65%, transparent 100%)`
              : "rgba(240,237,232,0.04)",
            boxShadow: active
              ? `0 12px 40px ${skill.color}35, 0 0 0 1px ${skill.color}22, inset 0 1px 0 ${skill.color}20`
              : "none",
            transform: active ? "translateY(-6px) scale(1.1)" : "translateY(0) scale(1)",
            transition: "border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, transform 0.32s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Shimmer on activate */}
          {active && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(105deg, transparent 30%, ${skill.color}30 50%, transparent 70%)`,
                backgroundSize: "200% 100%",
                animation: "shimmer-sweep 0.8s ease forwards",
              }}
            />
          )}

          {/* Top glint */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[1px] rounded-full"
            style={{
              background: `linear-gradient(to right, transparent, ${active ? skill.color : "rgba(240,237,232,0.2)"}, transparent)`,
              opacity: active ? 0.9 : 0.5,
              transition: "opacity 0.3s ease",
            }}
          />

          {!imgErr ? (
            <img
              src={`https://cdn.simpleicons.org/${skill.icon}`}
              alt={skill.name}
              width={30}
              height={30}
              draggable={false}
              style={{
                filter: active
                  ? `brightness(1.3) drop-shadow(0 0 8px ${skill.color})`
                  : "brightness(0.65) saturate(0.4)",
                transition: "filter 0.3s ease",
                position: "relative",
                zIndex: 1,
              }}
              onError={() => setImgErr(true)}
            />
          ) : (
            <span style={{ color: skill.color, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, position: "relative", zIndex: 1 }}>
              {skill.name.slice(0, 3).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Label */}
      <span
        className="text-[9px] tracking-[0.08em] text-center leading-tight w-[68px] sm:w-[76px]"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: active ? skill.color : "rgba(240,237,232,0.35)",
          transition: "color 0.3s ease",
        }}
      >
        {skill.name}
      </span>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState("All");
  const [displayed, setDisplayed] = useState(ALL_SKILLS);
  const [transitioning, setTransitioning] = useState(false);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { ref: headRef, visible: headVisible } = useReveal();
  const { ref: softRef, visible: softVisible } = useReveal();

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const onMouseLeave = useCallback(() => setMouse(null), []);

  function handleFilter(cat: string) {
    if (cat === active) return;
    setTransitioning(true);
    timerRef.current = setTimeout(() => {
      setActive(cat);
      setDisplayed(cat === "All" ? ALL_SKILLS : ALL_SKILLS.filter((s) => s.category === cat));
      setTransitioning(false);
    }, 200);
  }

  return (
    <section
      id="skills"
      className="relative w-full py-32 md:py-44 px-8 md:px-16 lg:px-24 bg-[#080a0d] overflow-hidden"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(240,237,232,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Cursor spotlight — desktop only, scoped inside section */}
      {mouse && (
        <div
          className="pointer-events-none absolute inset-0 z-0 hidden md:block"
          style={{
            background: `radial-gradient(260px circle at ${mouse.x}px ${mouse.y}px, rgba(245,158,11,0.14), transparent 70%)`,
          }}
        />
      )}

      {/* Ambient blobs */}
      <div className="blob pointer-events-none absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)" }} />
      <div className="blob pointer-events-none absolute -bottom-32 right-0 w-[460px] h-[460px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #3178C6, transparent 70%)", animationDelay: "-6s" }} />
      <div className="blob pointer-events-none absolute top-1/2 left-1/3 w-[380px] h-[380px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #47A248, transparent 70%)", animationDelay: "-3s" }} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div
          ref={headRef}
          className="flex items-end justify-between mb-12 pb-6 border-b border-white/[0.05]"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#f59e0b]/70 uppercase mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              03 / Stack
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-[200] tracking-[0.08em] text-[#f0ede8] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}>
              Skills &amp; Tools
            </h2>
          </div>
          <span className="text-[clamp(4rem,10vw,8rem)] font-[100] leading-none text-white/[0.03] select-none"
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            03
          </span>
        </div>

        {/* Filter pills + count on separate row for mobile */}
        <div
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
          }}
        >
          <div className="flex flex-wrap gap-2 mb-3">
            {CATEGORIES.map((cat) => {
              const isActive = cat === active;
              return (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className="relative px-3 py-1.5 sm:px-4 sm:py-2 text-[9px] sm:text-[10px] tracking-[0.15em] uppercase rounded-full border cursor-pointer overflow-hidden transition-all duration-300"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    borderColor: isActive ? "#f59e0b88" : "rgba(240,237,232,0.08)",
                    color: isActive ? "#f59e0b" : "rgba(240,237,232,0.35)",
                    background: isActive ? "rgba(245,158,11,0.1)" : "transparent",
                    boxShadow: isActive ? "0 0 16px rgba(245,158,11,0.2)" : "none",
                  }}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background: "linear-gradient(105deg, transparent 20%, rgba(245,158,11,0.18) 50%, transparent 80%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer-sweep 2.5s ease-in-out infinite",
                      }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
          {/* Count on its own line so it never fights with pills */}
          <p
            className="text-[9px] tracking-[0.2em] text-white/20 mb-8"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {displayed.length} / {ALL_SKILLS.length} technologies
          </p>
        </div>

        {/* Logo grid */}
        <div
          className="min-h-[240px]"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "scale(0.96) translateY(8px)" : "scale(1) translateY(0)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          <div className="flex flex-wrap gap-4 sm:gap-5">
            {displayed.map((skill, i) => (
              <LogoCard key={`${skill.name}-${skill.category}`} skill={skill} index={i} />
            ))}
          </div>
        </div>

        {/* Soft skills */}
        <div
          ref={softRef}
          className="border-t border-white/[0.05] pt-12 mt-20"
          style={{
            opacity: softVisible ? 1 : 0,
            transform: softVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p className="text-[9px] tracking-[0.3em] text-[#f59e0b]/60 uppercase mb-6"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Soft Skills
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {SOFT_SKILLS.map((s, i) => (
              <span
                key={s}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[11px] tracking-[0.08em] border rounded-full cursor-default transition-all duration-300 hover:border-[#f59e0b]/35 hover:text-[#f59e0b]/75 hover:bg-[#f59e0b]/05"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  borderColor: "rgba(240,237,232,0.07)",
                  color: "rgba(240,237,232,0.4)",
                  opacity: softVisible ? 1 : 0,
                  transform: softVisible ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms, border-color 0.3s, color 0.3s, background 0.3s`,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
