"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
interface Photo { id:string; src:string; alt:string; caption:string; }
export function GalleryClient({ photos }: { photos:Photo[] }) {
  const innerRef   = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const dragging   = useRef(false);
  const startX     = useRef(0);
  const scrollL    = useRef(0);
  const autoPaused = useRef(false);
  const [cursor, setCursor] = useState<"grab"|"grabbing">("grab");

  useEffect(() => {
    const inner = innerRef.current;
    const track = trackRef.current;
    if (!inner || !track) return;
    track.innerHTML += track.innerHTML;

    const onMD = (e:MouseEvent) => { dragging.current=true; startX.current=e.pageX; scrollL.current=inner.scrollLeft; setCursor("grabbing"); };
    const onMU = () => { dragging.current=false; setCursor("grab"); };
    const onMM = (e:MouseEvent) => { if(!dragging.current)return; inner.scrollLeft=scrollL.current-(e.pageX-startX.current)*1.25; };
    const onTS = (e:TouchEvent) => { dragging.current=true; startX.current=e.touches[0].pageX; scrollL.current=inner.scrollLeft; };
    const onTE = () => { dragging.current=false; };
    const onTM = (e:TouchEvent) => { if(!dragging.current)return; inner.scrollLeft=scrollL.current-(e.touches[0].pageX-startX.current); };
    const onW  = (e:WheelEvent) => { e.preventDefault(); inner.scrollLeft+=e.deltaY*1.6; };

    inner.addEventListener("mousedown", onMD);
    document.addEventListener("mouseup", onMU);
    document.addEventListener("mousemove", onMM);
    inner.addEventListener("touchstart", onTS, {passive:true});
    inner.addEventListener("touchend", onTE);
    inner.addEventListener("touchmove", onTM, {passive:true});
    inner.addEventListener("wheel", onW, {passive:false});
    inner.addEventListener("mouseenter", ()=>{ autoPaused.current=true; });
    inner.addEventListener("mouseleave", ()=>{ autoPaused.current=false; });

    let raf:number;
    const auto = () => {
      if (!autoPaused.current && !dragging.current) {
        inner.scrollLeft += 0.6;
        if (inner.scrollLeft >= track.scrollWidth/2) inner.scrollLeft = 0;
      }
      raf = requestAnimationFrame(auto);
    };
    raf = requestAnimationFrame(auto);

    return () => {
      inner.removeEventListener("mousedown",onMD);
      document.removeEventListener("mouseup",onMU);
      document.removeEventListener("mousemove",onMM);
      inner.removeEventListener("touchstart",onTS);
      inner.removeEventListener("touchend",onTE);
      inner.removeEventListener("touchmove",onTM);
      inner.removeEventListener("wheel",onW);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 font-mono text-[10px] tracking-widest uppercase" style={{ color:"var(--muted)" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
          <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3"/>
        </svg>
        Drag or scroll to explore
      </div>
      <div className="gal-inner rounded-2xl" ref={innerRef} role="region" aria-label="Photo gallery" style={{ cursor, userSelect:"none" }}>
        <div ref={trackRef} className="flex gap-4 w-max py-2 px-1">
          {photos.map(photo => (
            <figure key={photo.id} className="relative flex-shrink-0 overflow-hidden rounded-2xl group"
              style={{ width:260, height:360, border:"1px solid var(--brd)", transition:"border-color .3s,transform .3s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--bst)"; e.currentTarget.style.transform="scale(1.025) rotate(-.5deg)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--brd)"; e.currentTarget.style.transform=""; }}>
              <Image src={photo.src} alt={photo.alt} fill className="object-cover object-top pointer-events-none select-none" sizes="260px" draggable={false}/>
              <figcaption className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background:"linear-gradient(to top,rgba(0,0,0,.65) 0%,transparent 50%)" }}>
                <span className="font-mono text-[10px] tracking-widest uppercase text-white">{photo.caption}</span>
              </figcaption>
            </figure>
          ))}
          <div className="flex-shrink-0 rounded-2xl flex flex-col items-start justify-end p-6"
            style={{ width:260, height:360, background:"var(--card)", border:"1px solid var(--brd)" }}>
            <div className="mb-auto opacity-10">
              <svg viewBox="0 0 100 100" fill="none" width="40" height="40">
                <path d="M23 77L23 23L80.5 80.5" stroke="var(--fg)" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="77" cy="23" r="11" fill="var(--fg)"/>
              </svg>
            </div>
            <p className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color:"var(--accent)" }}>The dev</p>
            <p className="text-lg font-extrabold mb-1" style={{ color:"var(--fg)", letterSpacing:"-0.04em" }}>Naveen Kumar</p>
            <p className="text-xs leading-relaxed" style={{ color:"var(--muted)" }}>Team Lead · Web Developer</p>
          </div>
          <div className="flex-shrink-0 rounded-2xl flex flex-col items-center justify-center gap-4 text-center p-8"
            style={{ width:260, height:360, background:"var(--card)", border:"1px solid var(--brd)" }}>
            <svg viewBox="0 0 80 80" fill="none" width="64" height="64">
              <circle cx="40" cy="44" r="26" fill="var(--accent)" opacity=".12" stroke="var(--accent)" strokeWidth="1.5"/>
              <path d="M22 30L18 18L28 26Z" fill="var(--accent)" opacity=".5"/>
              <path d="M58 30L62 18L52 26Z" fill="var(--accent)" opacity=".5"/>
              <circle cx="30" cy="42" r="3.5" fill="var(--accent)" opacity=".7"/>
              <circle cx="50" cy="42" r="3.5" fill="var(--accent)" opacity=".7"/>
              <path d="M34 51Q40 55 46 51" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
            <p className="text-base font-extrabold" style={{ color:"var(--fg)", letterSpacing:"-0.03em" }}>Cat-approved</p>
            <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color:"var(--muted)" }}>code certified</p>
          </div>
        </div>
      </div>
    </div>
  );
}
