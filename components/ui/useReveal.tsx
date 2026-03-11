"use client";
import { useEffect, useRef } from "react";

export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in-view"); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export function RevealWrapper({ children, className = "", direction = "up", delay = 0 }:
  { children: React.ReactNode; className?: string; direction?: "up"|"left"|"right"|"scale"; delay?: number }) {
  const ref = useReveal();
  const cls = { up:"reveal-up", left:"reveal-left", right:"reveal-right", scale:"reveal-scale" }[direction];
  const d = delay ? `rv-d${delay}` : "";
  return <div ref={ref} className={`${cls} ${d} ${className}`}>{children}</div>;
}
