export function MarqueeBar({ reverse = false }: { reverse?: boolean }) {
  const items = reverse
    ? ["Problem Solver","Team Lead","Freelancer","Clean Coder","Fast Sites","Real Products","Open to Work"]
    : ["React","Node.js","WordPress","MongoDB","Express.js","PostgreSQL","JavaScript","TypeScript","Full Stack"];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-3" style={{ borderTop:"1px solid var(--brd)", borderBottom:"1px solid var(--brd)", background:"var(--bg2)" }} aria-hidden="true">
      <div className={`marquee-track ${reverse ? "marquee-rev" : "marquee-fwd"}`}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-5"
            style={{ fontFamily:"var(--font-geist-mono,monospace)", fontSize:11, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)" }}>
            <span style={{ width:4, height:4, borderRadius:"50%", background:"var(--accent)", display:"inline-block", flexShrink:0 }}/>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
