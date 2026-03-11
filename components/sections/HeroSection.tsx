"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SITE } from "@/lib/data";

const PLANETS = [
  { label:"React",     r:72,  speed:.0085, angle:.3,  size:22, color:"#61dafb", icon:"R" },
  { label:"Node.js",   r:112, speed:.005,  angle:1.8, size:20, color:"#5fa04e", icon:"N" },
  { label:"WordPress", r:152, speed:.0036, angle:3.2, size:19, color:"#21759b", icon:"W" },
  { label:"MongoDB",   r:192, speed:.0028, angle:.9,  size:18, color:"#4db33d", icon:"M" },
  { label:"CSS",       r:228, speed:.002,  angle:4.1, size:17, color:"#264de4", icon:"C" },
  { label:"Git",       r:258, speed:.0016, angle:5.4, size:16, color:"#f05032", icon:"G" },
];
const THEME_C = {
  mono:   { accent:"#0f0f0e",  text:"#0f0f0e",  muted:"rgba(15,15,14,.4)",    orbit:"rgba(15,15,14,.07)" },
  coffee: { accent:"#d4956a",  text:"#fdf0e0",  muted:"rgba(212,149,106,.5)", orbit:"rgba(212,149,106,.1)" },
  blue:   { accent:"#3b7cf8",  text:"#e4eeff",  muted:"rgba(59,124,248,.5)",  orbit:"rgba(59,124,248,.1)" },
} as const;

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const planets   = useRef(PLANETS.map(p => ({ ...p })));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, tick = 0, raf: number;
    let hov: (typeof planets.current)[0] | null = null;

    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const getC = () => {
      const t = (document.documentElement.getAttribute("data-theme") ?? "mono") as keyof typeof THEME_C;
      return THEME_C[t] ?? THEME_C.mono;
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      hov = null;
      planets.current.forEach(p => {
        const px = W/2 + Math.cos(p.angle)*p.r, py = H/2 + Math.sin(p.angle)*p.r;
        if (Math.hypot(mx-px, my-py) < p.size+12) hov = p;
      });
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", () => { hov = null; });

    function draw() {
      ctx.clearRect(0,0,W,H);
      const cx=W/2, cy=H/2, C=getC();
      tick++;

      // Scale orbits to canvas size
      const scale = Math.min(W, H*1.6) / 560;

      planets.current.forEach(p => {
        const r = p.r * scale;
        ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
        ctx.strokeStyle=C.orbit; ctx.lineWidth=1; ctx.setLineDash([3,7]); ctx.stroke(); ctx.restore();
      });

      // Sun
      const pulse = (28+Math.sin(tick*.04)*3.5)*scale;
      ctx.save();
      ctx.beginPath(); ctx.arc(cx,cy,28*scale,0,Math.PI*2);
      ctx.fillStyle=C.accent+"18"; ctx.fill();
      ctx.strokeStyle=C.accent+"44"; ctx.lineWidth=1.5; ctx.setLineDash([]); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx,cy,pulse,0,Math.PI*2);
      ctx.strokeStyle=C.accent+"22"; ctx.lineWidth=1; ctx.setLineDash([2,5]); ctx.stroke();
      ctx.setLineDash([]); ctx.strokeStyle=C.text; ctx.lineWidth=2.2*scale;
      ctx.lineCap="round"; ctx.lineJoin="round"; ctx.globalAlpha=.9;
      const s=10*scale;
      ctx.beginPath();
      ctx.moveTo(cx-s*.5,cy+s*.7); ctx.lineTo(cx-s*.5,cy-s*.7);
      ctx.lineTo(cx+s*.5,cy+s*.7); ctx.lineTo(cx+s*.5,cy-s*.7);
      ctx.stroke();
      for(let i=0;i<6;i++){
        const a=tick*.015+(i/6)*Math.PI*2;
        ctx.save(); ctx.beginPath(); ctx.arc(cx+Math.cos(a)*44*scale, cy+Math.sin(a)*44*scale, 1.5*scale,0,Math.PI*2);
        ctx.fillStyle=C.accent; ctx.globalAlpha=.3*Math.abs(Math.sin(tick*.06+i)); ctx.fill(); ctx.restore();
      }
      ctx.restore();

      planets.current.forEach(p => {
        p.angle += p.speed;
        const r  = p.r*scale;
        const px = cx+Math.cos(p.angle)*r;
        const py = cy+Math.sin(p.angle)*r;
        const isH = hov===p;
        const dr  = p.size*scale*(isH?1.3:1);

        ctx.save(); ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(px,py);
        ctx.strokeStyle=C.orbit; ctx.lineWidth=.7; ctx.setLineDash([]); ctx.stroke(); ctx.restore();

        if(isH){
          ctx.save();
          const g=ctx.createRadialGradient(px,py,0,px,py,dr*2.5);
          g.addColorStop(0,p.color+"30"); g.addColorStop(1,"transparent");
          ctx.beginPath(); ctx.arc(px,py,dr*2.5,0,Math.PI*2); ctx.fillStyle=g; ctx.fill(); ctx.restore();
        }

        ctx.save(); ctx.shadowColor=p.color; ctx.shadowBlur=isH?18:8;
        ctx.beginPath(); ctx.arc(px,py,dr,0,Math.PI*2);
        const pg=ctx.createRadialGradient(px-dr*.3,py-dr*.3,0,px,py,dr);
        pg.addColorStop(0,p.color+(isH?"cc":"99")); pg.addColorStop(1,p.color+(isH?"55":"33"));
        ctx.fillStyle=pg; ctx.fill();
        ctx.strokeStyle=p.color+(isH?"cc":"66"); ctx.lineWidth=1.5; ctx.setLineDash([]); ctx.stroke(); ctx.restore();

        ctx.save(); ctx.globalAlpha=isH?.95:.8;
        ctx.font=`700 ${Math.round(dr*.8)}px system-ui,sans-serif`;
        ctx.fillStyle="#fff"; ctx.textAlign="center"; ctx.textBaseline="middle";
        ctx.fillText(p.icon,px,py); ctx.restore();

        ctx.save(); ctx.globalAlpha=isH?1:.55;
        ctx.font=`${isH?600:500} ${isH?11:10}px system-ui,sans-serif`;
        ctx.fillStyle=isH?C.text:C.muted; ctx.textAlign="center"; ctx.textBaseline="top";
        ctx.fillText(p.label,px,py+dr+5); ctx.restore();
      });

      raf=requestAnimationFrame(draw);
    }
    draw();

    return () => { ro.disconnect(); canvas.removeEventListener("mousemove",onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="hero" className="hero-section" aria-label="Introduction">
      <div className="dot-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true"/>
      <div className="glow-pulse absolute pointer-events-none"
        style={{ width:460,height:460,borderRadius:"50%",background:"radial-gradient(circle,var(--glow) 0%,transparent 70%)",top:"50%",left:"30%",transform:"translate(-50%,-50%)" }}
        aria-hidden="true"/>

      {/* Left */}
      <div className="relative z-10 w-full">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
            style={{ background:"var(--al)", border:"1px solid var(--bst)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" width="13" height="13">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <span className="font-mono text-[10px] md:text-[11px] tracking-widest uppercase" style={{ color:"var(--accent)" }}>
            Web Developer · Open to work
          </span>
        </div>

        <h1 className="font-black leading-none mb-5" style={{ fontSize:"clamp(44px,8vw,108px)", letterSpacing:"-0.055em", lineHeight:".93" }}>
          <span className="block" style={{ color:"var(--fg)" }}>Hey, I&apos;m</span>
          <span className="block" style={{ color:"var(--accent)" }}>{SITE.fullName.split(" ")[0]}</span>
        </h1>

        <p className="leading-relaxed mb-8 max-w-md" style={{ fontSize:"clamp(14px,1.5vw,17px)", color:"var(--muted)" }}>
          I build websites and web apps that actually <em>work</em> — not just look good.
          React, Node.js, WordPress — turning ideas into real products.
        </p>

        <div className="flex gap-3 flex-wrap">
          <Link href="/projects" className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
            </svg>
            See my work
          </Link>
          <Link href="/contact" className="btn-outline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            Let&apos;s talk
          </Link>
        </div>
      </div>

      {/* Right — canvas */}
      <div className="hero-canvas-wrap relative z-10">
        <div className="cat-float absolute top-[8%] left-[6%] opacity-20 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 60 60" fill="none" width="34" height="34">
            <circle cx="30" cy="32" r="18" fill="var(--accent)" opacity=".12" stroke="var(--accent)" strokeWidth="1.5"/>
            <path d="M18 22L15 14L22 20Z" fill="var(--accent)" opacity=".5"/>
            <path d="M42 22L45 14L38 20Z" fill="var(--accent)" opacity=".5"/>
            <circle cx="23" cy="30" r="2.5" fill="var(--accent)" opacity=".7"/>
            <circle cx="37" cy="30" r="2.5" fill="var(--accent)" opacity=".7"/>
            <path d="M26 36Q30 39 34 36" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="cat-float2 absolute bottom-[10%] right-[5%] opacity-15 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 60 60" fill="none" width="26" height="26">
            <circle cx="30" cy="32" r="18" fill="var(--accent)" opacity=".1" stroke="var(--accent)" strokeWidth="1.5"/>
            <path d="M18 22L15 14L22 20Z" fill="var(--accent)" opacity=".4"/>
            <path d="M42 22L45 14L38 20Z" fill="var(--accent)" opacity=".4"/>
            <circle cx="23" cy="30" r="2.5" fill="var(--accent)" opacity=".6"/>
            <circle cx="37" cy="30" r="2.5" fill="var(--accent)" opacity=".6"/>
          </svg>
        </div>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"
          aria-label="Interactive orbit showing tech stack: React, Node.js, WordPress, MongoDB, CSS, Git" role="img"/>
      </div>

      <div className="scroll-hint-fade absolute bottom-6 left-5 md:left-16 flex items-center gap-2.5 font-mono text-[10px] tracking-widest uppercase"
        style={{ color:"var(--muted)" }} aria-hidden="true">
        <div className="line-anim" style={{ width:32, height:1, background:"var(--accent)" }}/>
        Scroll to explore
      </div>
    </section>
  );
}
