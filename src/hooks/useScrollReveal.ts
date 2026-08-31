import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.12) {
          el.classList.add("revealed");
        } else if (entry.intersectionRatio < 0.04) {
          el.classList.remove("revealed");
        }
      },
      { threshold: [0, 0.04, 0.12] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
