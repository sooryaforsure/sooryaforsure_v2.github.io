import { useEffect, useRef, useState } from "react";

const LINKS = [
  {
    label: "GitHub", handle: "sooryaforsure", href: "https://github.com/sooryaforsure",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn", handle: "sooryathej-k-l", href: "https://linkedin.com/in/sooryathej-k-l",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email", handle: "sooryathej2005@gmail.com", href: "mailto:sooryathej2005@gmail.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
  },
  {
    label: "Instagram", handle: "@soorya.aaahh", href: "https://www.instagram.com/soorya.aaahh?igsi=aXdnczlpcGlnZWx5",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

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

export default function Contact() {
  const headingRef = useReveal("up");
  const linksRef = useReveal("right");
  const formRef = useReveal("left");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "da8cf41d-c38f-47fc-ae52-512b8a0b72ce");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSent(true);
      } else {
        console.error("Error submitting form", data);
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative w-full pt-32 md:pt-44 pb-16 px-8 md:px-16 lg:px-24 bg-[#0b0c0f]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div ref={headingRef} className="reveal-up flex items-end justify-between mb-16 pb-6 border-b border-white/[0.05]">
          <div>
            <p
              className="text-[10px] tracking-[0.3em] text-[#f59e0b]/70 uppercase mb-3"
              style={{ fontFamily: "'JetBrains Mono',monospace" }}
            >
              04 / Contact
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3rem)] font-[200] tracking-[0.08em] text-[#f0ede8] uppercase"
              style={{ fontFamily: "'Outfit',sans-serif" }}
            >
              Get In Touch
            </h2>
          </div>
          <span
            className="text-[clamp(4rem,10vw,8rem)] font-[100] leading-none text-white/[0.03] select-none"
            style={{ fontFamily: "'Outfit',sans-serif" }}
          >
            04
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* Left — message + links */}
          <div ref={linksRef} className="reveal-left flex flex-col gap-10">
            <p
              className="text-[#f0ede8]/45 text-[0.95rem] leading-[1.85] max-w-sm"
              style={{ fontFamily: "'DM Sans',sans-serif" }}
            >
              Open to internships, freelance projects, and full-time opportunities.
              If you have something interesting in mind, I&apos;d love to hear it.
            </p>

            <div className="flex flex-col gap-1 border-t border-white/[0.05] pt-8">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 border-b border-white/[0.05] hover:bg-white/[0.015] transition-colors duration-300 px-1"
                >
                  <span className="flex items-center gap-3 text-[#f0ede8]/30 group-hover:text-[#f59e0b] transition-colors duration-300">
                    {link.icon}
                    <span
                      className="text-[9px] tracking-[0.25em] text-[#f0ede8]/25 group-hover:text-[#f59e0b] uppercase transition-colors duration-300"
                      style={{ fontFamily: "'JetBrains Mono',monospace" }}
                    >
                      {link.label}
                    </span>
                  </span>
                  <span
                    className="text-[0.85rem] text-[#f0ede8]/55 group-hover:text-[#f59e0b] transition-colors duration-300 tracking-[0.03em]"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}
                  >
                    {link.handle}
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — contact form */}
          <div ref={formRef} className="reveal-right">
            {sent ? (
              <div className="flex flex-col items-start justify-center h-full gap-4 py-12">
                <span className="text-[#f59e0b] text-2xl">✓</span>
                <p
                  className="text-[#f0ede8]/60 text-[0.9rem] tracking-[0.06em]"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}
                >
                  Message sent. I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input type="hidden" name="subject" value="New Portfolio Contact Submission" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                {[
                  { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                ].map((field) => (
                  <div key={field.id} className="flex flex-col gap-2">
                    <label
                      htmlFor={field.id}
                      className="text-[9px] tracking-[0.28em] text-[#f0ede8]/30 uppercase"
                      style={{ fontFamily: "'JetBrains Mono',monospace" }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      className="bg-transparent border-b border-white/[0.1] text-[#f0ede8]/70 text-[0.88rem] py-3 outline-none focus:border-[#f59e0b]/50 transition-colors duration-300 placeholder:text-white/20"
                      style={{ fontFamily: "'DM Sans',sans-serif" }}
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-[9px] tracking-[0.28em] text-[#f0ede8]/30 uppercase"
                    style={{ fontFamily: "'JetBrains Mono',monospace" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell me about your project..."
                    required
                    className="bg-transparent border-b border-white/[0.1] text-[#f0ede8]/70 text-[0.88rem] py-3 outline-none resize-none focus:border-[#f59e0b]/50 transition-colors duration-300 placeholder:text-white/20"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="self-start mt-2 inline-flex items-center gap-3 border border-[#f59e0b]/30 text-[#f59e0b] hover:bg-[#f59e0b] hover:text-[#0b0c0f] transition-all duration-500 px-8 py-3 uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.25em" }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>

  );
}
