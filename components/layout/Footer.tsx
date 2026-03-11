// components/layout/Footer.tsx
import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--brd)" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="Navzz Home">
          <div className="nav-mark" style={{ background: "var(--accent)", width: 28, height: 28, borderRadius: 7 }}>
            <svg viewBox="0 0 100 100" fill="none" width="13" height="13">
              <path d="M23 77L23 23L80.5 80.5" stroke="var(--pfg)" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="77" cy="23" r="12" fill="var(--pfg)"/>
            </svg>
          </div>
          <span className="font-extrabold text-sm" style={{ color: "var(--fg)", letterSpacing: "-0.04em" }}>Navzz</span>
        </Link>

        <nav aria-label="Footer navigation" className="flex gap-5 flex-wrap justify-center">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href}
              className="font-mono text-[10px] tracking-wider uppercase transition-colors duration-200 hover:opacity-100"
              style={{ color: "var(--muted)" }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center md:items-end gap-1">
          <p className="font-mono text-[10px] tracking-wider" style={{ color: "var(--muted)" }}>© {year} {SITE.fullName}</p>
          <p className="font-mono text-[10px] tracking-wider" style={{ color: "var(--muted)" }}>Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
