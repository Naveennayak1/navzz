// app/projects/page.tsx — SERVER COMPONENT
import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE, PROJECTS } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: "Explore web development projects by "+SITE.fullName+" — full-stack apps, e-commerce, React, Node.js, and WordPress builds.",
  path: "/projects",
  keywords: ["React projects","Node.js portfolio","web development showcase"],
});

export default function ProjectsPage() {
  const breadcrumb = breadcrumbSchema([{ name:"Home", url:SITE.url },{ name:"Projects", url:SITE.url+"/projects" }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}/>
      <div className="page-wrap">
        <div className="mb-14">
          <div className="sec-label"><div className="sec-ln"/><span className="sec-lt">Work</span></div>
          <h1 className="font-black leading-none mb-5" style={{ fontSize:"clamp(40px,7vw,88px)", letterSpacing:"-0.055em", color:"var(--fg)" }}>
            Things I&apos;ve built.
          </h1>
          <p className="text-sm leading-relaxed max-w-lg" style={{ color:"var(--muted)" }}>
            Real code. Real products. Every project ships with clean architecture, thoughtful design, and zero excuses.
          </p>
        </div>

        <div>
          {PROJECTS.map(p => (
            <article key={p.id} className="project-row group">
              <div className="project-row-num font-mono text-xs font-bold" style={{ color:"var(--accent)" }}>{p.number}</div>
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold mb-2 transition-colors duration-200 group-hover:text-[var(--accent)]"
                  style={{ letterSpacing:"-0.04em", color:"var(--fg)" }}>{p.title}</h2>
                <p className="text-sm leading-relaxed mb-3" style={{ color:"var(--muted)" }}>{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
              <div className="project-row-actions flex flex-col gap-3 items-center">
                <Link href={"/projects/"+p.slug} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-label={"View "+p.title} style={{ color:"var(--muted)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </Link>
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={p.title+" GitHub"}
                    className="hover:text-[var(--accent)] transition-colors" style={{ color:"var(--muted)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm mb-6" style={{ color:"var(--muted)" }}>Want to build something together?</p>
          <Link href="/contact" className="btn-primary">Start a project</Link>
        </div>
      </div>
    </>
  );
}
