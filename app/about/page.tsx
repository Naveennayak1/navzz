// app/about/page.tsx — SERVER COMPONENT
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata, breadcrumbSchema, personSchema } from "@/lib/seo";
import { SITE, TECH_STACK, STATS, EXPERIENCE } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "Learn about "+SITE.fullName+" — full-stack web developer, team lead, and WordPress expert. "+SITE.tagline,
  path: "/about",
  keywords: ["about Naveen Kumar","web developer background","team lead developer"],
});

const CheckIcon = () => (
  <div className="w-4 h-4 rounded flex items-center justify-center mt-0.5 flex-shrink-0"
    style={{ background:"var(--al)", border:"1px solid var(--bst)" }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" width="7" height="7"><polyline points="20 6 9 17 4 12"/></svg>
  </div>
);

export default function AboutPage() {
  const breadcrumb = breadcrumbSchema([{ name:"Home", url:SITE.url },{ name:"About", url:SITE.url+"/about" }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}/>
      <div className="page-wrap">
        <div className="mb-16 md:mb-20">
          <div className="sec-label"><div className="sec-ln"/><span className="sec-lt">About me</span></div>
          <h1 className="font-black leading-none mb-5" style={{ fontSize:"clamp(40px,7vw,88px)", letterSpacing:"-0.055em", color:"var(--fg)" }}>
            Building useful things<br/><span style={{ color:"var(--accent)" }}>on the web.</span>
          </h1>
          <p className="text-sm leading-relaxed max-w-xl" style={{ color:"var(--muted)" }}>{SITE.description}</p>
        </div>

        <div className="about-grid mb-20 md:mb-24">
          <div className="relative">
            <div className="card overflow-hidden" style={{ aspectRatio:"0.78" }}>
              <Image src="/images/photo2.jpg" alt={SITE.fullName+" — web developer"} fill className="object-cover object-top" sizes="(max-width:900px) 100vw,50vw" priority/>
            </div>
            <div className="absolute -bottom-3 -right-3 rounded-xl px-4 py-3 flex items-center gap-2"
              style={{ background:"var(--card)", border:"1.5px solid var(--bst)", boxShadow:"0 8px 24px var(--glow)" }}>
              <span className="font-mono" style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)" }}>Currently building</span>
            </div>
          </div>
          <div className="space-y-5">
            <h2 className="text-3xl font-extrabold" style={{ letterSpacing:"-0.04em", color:"var(--fg)" }}>My Story</h2>
            <p className="text-sm leading-relaxed" style={{ color:"var(--muted)" }}>
              My journey started with <strong style={{ color:"var(--fg)" }}>WordPress development</strong>, creating websites for businesses and helping them grow their online presence.
            </p>
            <p className="text-sm leading-relaxed" style={{ color:"var(--muted)" }}>
              Today I focus on scalable websites and web applications that are <strong style={{ color:"var(--fg)" }}>clean, efficient, and user-friendly</strong>. I enjoy solving real problems and continuously improving how things are built on the web.
            </p>
            <p className="text-sm leading-relaxed" style={{ color:"var(--muted)" }}>
              As a <strong style={{ color:"var(--fg)" }}>Team Lead</strong>, I&apos;ve trained 10+ developers, managed production deployments, and helped teams deliver without the chaos.
            </p>
            <div className="pt-1">
              <p className="font-mono mb-3" style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)" }}>What I believe</p>
              <ul className="space-y-3">
                {["Clean, maintainable code over clever shortcuts","Simple solutions over unnecessary complexity","Build things that actually help users","Continuous learning — always"].map(pt => (
                  <li key={pt} className="flex items-start gap-3 text-sm" style={{ color:"var(--muted)" }}>
                    <CheckIcon/>{pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="stats-grid mb-20 md:mb-24">
          {STATS.map(s => (
            <div key={s.label} className="card p-7 text-center">
              <div className="font-black leading-none mb-1" style={{ fontSize:"clamp(32px,5vw,50px)", color:"var(--accent)", letterSpacing:"-0.06em" }}>{s.value}{s.suffix}</div>
              <div className="font-mono" style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <div className="sec-label"><div className="sec-ln"/><span className="sec-lt">Experience</span></div>
          {EXPERIENCE.map(exp => (
            <div key={exp.role} className="card p-8 md:p-10">
              <div className="text-xl font-extrabold mb-1" style={{ color:"var(--fg)", letterSpacing:"-0.03em" }}>{exp.role}</div>
              <div className="font-mono mb-6" style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)" }}>{exp.company} · {exp.period}</div>
              <ul className="space-y-3">
                {exp.points.map(pt => (
                  <li key={pt} className="flex items-start gap-3 text-sm" style={{ color:"var(--muted)" }}>
                    <CheckIcon/>{pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <div className="sec-label"><div className="sec-ln"/><span className="sec-lt">Tech I work with</span></div>
          <div className="tech-grid">
            {TECH_STACK.map(t => (
              <div key={t.name} className="card px-4 py-3 flex items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-bold" style={{ color:"var(--fg)" }}>{t.name}</div>
                  <div className="font-mono mt-0.5" style={{ fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)" }}>{t.category}</div>
                </div>
                <div className="font-mono text-xs font-bold" style={{ color:"var(--accent)" }}>{t.level}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Link href="/contact" className="btn-primary">Work with me</Link>
          <Link href="/projects" className="btn-outline">See my work</Link>
        </div>
      </div>
    </>
  );
}
