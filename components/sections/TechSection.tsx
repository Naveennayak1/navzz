"use client";
import { useEffect, useRef } from "react";
import { RevealWrapper } from "@/components/ui/useReveal";
import type { TECH_STACK } from "@/lib/data";

function TechCard({ tech, delay }: { tech: typeof TECH_STACK[0]; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => { if(bar) bar.style.width=tech.level+"%"; }, delay); obs.unobserve(bar); }
    }, { threshold: 0.3 });
    obs.observe(bar);
    return () => obs.disconnect();
  }, [tech.level, delay]);
  return (
    <div className="card px-4 py-4 flex flex-col gap-3">
      <div className="font-bold text-sm" style={{ color:"var(--fg)" }}>{tech.name}</div>
      <div className="font-mono" style={{ fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)" }}>{tech.category}</div>
      <div className="tech-bar mt-auto">
        <div ref={barRef} className="tech-bar-fill" role="progressbar" aria-valuenow={tech.level} aria-valuemin={0} aria-valuemax={100} aria-label={tech.name+" "+tech.level+"%"}/>
      </div>
    </div>
  );
}

export function TechSection({ stack }: { stack: typeof TECH_STACK }) {
  return (
    <section id="tech" className="sec-pad" style={{ background:"var(--bg)" }} aria-labelledby="tech-heading">
      <div className="sec-inner">
        <div className="sec-label"><div className="sec-ln"/><span className="sec-lt">My Toolbox</span></div>
        <RevealWrapper direction="up">
          <h2 id="tech-heading" className="font-black mb-12" style={{ fontSize:"clamp(28px,4.5vw,54px)", letterSpacing:"-0.04em", color:"var(--fg)" }}>
            Technologies I work with
          </h2>
        </RevealWrapper>
        <div className="tech-grid">
          {stack.map((t, i) => <TechCard key={t.name} tech={t} delay={i*50}/>)}
        </div>
      </div>
    </section>
  );
}
