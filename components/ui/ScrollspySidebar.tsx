"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SECTIONS = [
  { id:"hero",       label:"Home"       },
  { id:"services",   label:"Services"   },
  { id:"tech",       label:"Stack"      },
  { id:"experience", label:"Experience" },
  { id:"process",    label:"Process"    },
];

export function ScrollspySidebar() {
  const pathname = usePathname();
  const [active, setActive] = useState("hero");
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const els = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin:"-40% 0px -50% 0px", threshold:0 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [isHome]);

  if (!isHome) return null;

  return (
    <nav aria-label="Section navigation"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3 items-end">
      {SECTIONS.map(s => (
        <button key={s.id}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior:"smooth", block:"start" })}
          className={`spy-item flex items-center gap-2 transition-opacity duration-200 ${active===s.id ? "spy-active opacity-100" : "opacity-35 hover:opacity-70"}`}
          aria-label={"Go to "+s.label}>
          <span className="font-mono transition-all duration-200" style={{ fontSize:10, letterSpacing:"0.1em", color:"var(--fg)", transform:active===s.id?"translateX(0)":"translateX(6px)", opacity:active===s.id?1:0 }}>
            {s.label}
          </span>
          <div className="spy-dot"/>
        </button>
      ))}
    </nav>
  );
}
