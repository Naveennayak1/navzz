// app/projects/[slug]/page.tsx — SSG
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata, breadcrumbSchema, projectSchema } from "@/lib/seo";
import { SITE, PROJECTS } from "@/lib/data";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find(p => p.slug === slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.description, path: "/projects/"+slug, keywords: p.tags });
}

const CheckIcon = () => (
  <div className="w-4 h-4 rounded flex items-center justify-center mt-0.5 flex-shrink-0"
    style={{ background:"var(--al)", border:"1px solid var(--bst)" }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" width="7" height="7"><polyline points="20 6 9 17 4 12"/></svg>
  </div>
);

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = PROJECTS.find(p => p.slug === slug);
  if (!p) notFound();

  const breadcrumb = breadcrumbSchema([
    { name:"Home", url:SITE.url },
    { name:"Projects", url:SITE.url+"/projects" },
    { name:p.title, url:SITE.url+"/projects/"+slug },
  ]);
  const schema = projectSchema({ title:p.title, description:p.description, url:p.live, github:p.github, tags:p.tags, year:p.year });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>
      <div className="page-wrap" style={{ maxWidth:900 }}>
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 flex-wrap font-mono"
          style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)" }}>
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-[var(--accent)] transition-colors">Projects</Link>
          <span>/</span>
          <span style={{ color:"var(--accent)" }}>{p.title}</span>
        </nav>
        <div className="mb-14">
          <div className="font-mono mb-3" style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)" }}>Project {p.number}</div>
          <h1 className="font-black leading-none mb-4" style={{ fontSize:"clamp(36px,7vw,72px)", letterSpacing:"-0.055em", color:"var(--fg)" }}>{p.title}</h1>
          <p className="text-base leading-relaxed max-w-xl mb-6" style={{ color:"var(--muted)" }}>{p.tagline}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
          <div className="flex gap-4 flex-wrap">
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize:13, padding:"9px 18px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                GitHub
              </a>
            )}
          </div>
        </div>
        <div className="card p-7 md:p-8 mb-5">
          <h2 className="text-lg font-bold mb-4" style={{ color:"var(--fg)" }}>Overview</h2>
          <p className="text-sm leading-relaxed" style={{ color:"var(--muted)" }}>{p.longDescription}</p>
        </div>
        <div className="card p-7 md:p-8 mb-14">
          <h2 className="text-lg font-bold mb-4" style={{ color:"var(--fg)" }}>Key features</h2>
          <ul className="space-y-3">
            {p.highlights.map(h => (
              <li key={h} className="flex items-center gap-3 text-sm" style={{ color:"var(--muted)" }}>
                <CheckIcon/>{h}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link href="/projects" className="btn-outline" style={{ fontSize:13, padding:"9px 18px" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><polyline points="15 18 9 12 15 6"/></svg>
            All projects
          </Link>
          <Link href="/contact" className="btn-primary" style={{ fontSize:13, padding:"9px 18px" }}>Start a project</Link>
        </div>
      </div>
    </>
  );
}
