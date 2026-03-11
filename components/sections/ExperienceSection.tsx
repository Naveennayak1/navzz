"use client";
import { useEffect, useRef } from "react";
import { RevealWrapper } from "@/components/ui/useReveal";
import type { EXPERIENCE, STATS } from "@/lib/data";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let cur = 0;
      const step = value / 60;
      const t = setInterval(() => {
        cur += step;
        if (cur >= value) { el.textContent = value + suffix; clearInterval(t); }
        else el.textContent = Math.round(cur) + suffix;
      }, 18);
      obs.unobserve(el);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

const CheckIcon = () => (
  <div className="w-4 h-4 rounded flex items-center justify-center mt-0.5 flex-shrink-0"
    style={{ background:"var(--al)", border:"1px solid var(--bst)" }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" width="7" height="7"><polyline points="20 6 9 17 4 12"/></svg>
  </div>
);

export function ExperienceSection({ experience, stats }: { experience: typeof EXPERIENCE; stats: typeof STATS }) {
  return (
    <section id="experience" className="sec-pad" style={{ background:"var(--bg)" }} aria-labelledby="exp-heading">
      <div className="sec-inner">
        <div className="sec-label"><div className="sec-ln"/><span className="sec-lt">Experience</span></div>
        <RevealWrapper direction="up">
          <h2 id="exp-heading" className="font-black mb-12" style={{ fontSize:"clamp(28px,4.5vw,54px)", letterSpacing:"-0.04em", color:"var(--fg)" }}>
            Where I&apos;ve been
          </h2>
        </RevealWrapper>
        <div className="exp-grid">
          <RevealWrapper direction="left">
            <div className="card p-8 md:p-10 relative overflow-hidden h-full">
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background:"linear-gradient(90deg,var(--accent),transparent)" }} aria-hidden="true"/>
              {experience.map(exp => (
                <div key={exp.role}>
                  <h3 className="text-xl font-extrabold mb-1" style={{ letterSpacing:"-0.03em", color:"var(--fg)" }}>{exp.role}</h3>
                  <p className="font-mono mb-6" style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)" }}>{exp.company} · {exp.period}</p>
                  <ul className="space-y-3">
                    {exp.points.map(pt => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm" style={{ color:"var(--muted)" }}>
                        <CheckIcon/>{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </RevealWrapper>
          <RevealWrapper direction="right">
            <div className="stats-grid">
              {stats.map(s => (
                <div key={s.label} className="card p-6">
                  <div className="font-black leading-none mb-1.5" style={{ fontSize:"clamp(32px,4vw,46px)", color:"var(--accent)", letterSpacing:"-0.06em" }}>
                    <CountUp value={s.value} suffix={s.suffix}/>
                  </div>
                  <div className="font-mono" style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
