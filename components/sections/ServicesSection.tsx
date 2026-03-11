// components/sections/ServicesSection.tsx
import { RevealWrapper } from "@/components/ui/useReveal";
import type { SERVICES } from "@/lib/data";

const ICONS: Record<string, React.ReactNode> = {
  monitor: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  zap:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  globe:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85"/></svg>,
};

export function ServicesSection({ services }: { services: typeof SERVICES }) {
  return (
    <section id="services" className="sec-pad" style={{ background:"var(--bg2)" }} aria-labelledby="services-heading">
      <div className="sec-inner">
        <div className="sec-label"><div className="sec-ln"/><span className="sec-lt">Services</span></div>
        <RevealWrapper direction="up">
          <h2 id="services-heading" className="font-black mb-3" style={{ fontSize:"clamp(28px,4.5vw,54px)", letterSpacing:"-0.04em", color:"var(--fg)" }}>
            Services that actually work
          </h2>
          <p className="text-sm leading-relaxed max-w-md mb-12" style={{ color:"var(--muted)" }}>
            Not just pretty. Functional, fast, and built for real users.
          </p>
        </RevealWrapper>
        <div className="services-grid">
          {services.map((srv, i) => (
            <RevealWrapper key={srv.id} direction="scale" delay={(i+1) as 1|2|3|4|5}>
              <article className="card p-7 flex flex-col gap-4 h-full relative overflow-hidden group">
                <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background:"var(--accent)" }} aria-hidden="true"/>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:"var(--al)", border:"1px solid var(--bst)", color:"var(--accent)" }}>
                  {ICONS[srv.icon]}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ letterSpacing:"-0.03em", color:"var(--fg)" }}>{srv.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color:"var(--muted)" }}>{srv.description}</p>
                </div>
                <ul className="mt-auto space-y-1.5">
                  {srv.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs" style={{ color:"var(--muted)" }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background:"var(--accent)" }}/>{f}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
