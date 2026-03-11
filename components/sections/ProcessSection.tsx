import Link from "next/link";
import { RevealWrapper } from "@/components/ui/useReveal";
import type { PROCESS_STEPS } from "@/lib/data";

const STEP_ICONS: Record<string, React.ReactNode> = {
  "message-circle": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  "file-text":      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  "code-2":         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  "send":           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
  "refresh-cw":     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
};

export function ProcessSection({ steps }: { steps: typeof PROCESS_STEPS }) {
  return (
    <section id="process" className="sec-pad" style={{ background:"var(--bg2)" }} aria-labelledby="process-heading">
      <div className="sec-inner">
        <div className="sec-label"><div className="sec-ln"/><span className="sec-lt">Process</span></div>
        <RevealWrapper direction="up">
          <h2 id="process-heading" className="font-black mb-3" style={{ fontSize:"clamp(28px,4.5vw,54px)", letterSpacing:"-0.04em", color:"var(--fg)" }}>
            Simple. Transparent.
          </h2>
          <p className="text-sm leading-relaxed max-w-md mb-14" style={{ color:"var(--muted)" }}>
            From idea to live product — here&apos;s exactly how it works.
          </p>
        </RevealWrapper>
        <div className="process-grid">
          {steps.map((s, i) => (
            <RevealWrapper key={s.step} direction="up" delay={(i+1) as 1|2|3|4|5}>
              <div className="flex flex-col items-center text-center gap-3 group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 group-hover:scale-110"
                  style={{ background:"var(--card)", border:"1.5px solid var(--brd)", color:"var(--accent)" }}>
                  {STEP_ICONS[s.icon]}
                </div>
                <div>
                  <div className="font-mono mb-1" style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)" }}>{s.step}</div>
                  <div className="text-sm font-bold mb-1" style={{ color:"var(--fg)" }}>{s.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color:"var(--muted)" }}>{s.description}</div>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeCTA() {
  return (
    <section className="sec-pad" style={{ background:"var(--bg)" }} aria-label="Call to action">
      <div className="sec-inner">
        <RevealWrapper direction="scale">
          <div className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
            style={{ background:"var(--card)", border:"1px solid var(--brd)" }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background:"radial-gradient(ellipse 60% 50% at 50% 0%,var(--al),transparent 70%)" }} aria-hidden="true"/>
            <div className="relative">
              <p className="font-mono mb-4" style={{ fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--accent)" }}>Available for freelance</p>
              <h2 className="font-black mb-5" style={{ fontSize:"clamp(28px,5vw,64px)", letterSpacing:"-0.05em", color:"var(--fg)" }}>
                Let&apos;s build something.
              </h2>
              <p className="text-sm leading-relaxed max-w-sm mx-auto mb-10" style={{ color:"var(--muted)" }}>
                Website, web app, WordPress — whatever you need built properly. Let&apos;s talk.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link href="/contact" className="btn-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.14 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                  Start a project
                </Link>
                <Link href="/projects" className="btn-outline">View my work</Link>
              </div>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
