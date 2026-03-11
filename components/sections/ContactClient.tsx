"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SITE, PROJECT_TYPES, BUDGET_RANGES, TIMELINES, REFERRAL_SOURCES } from "@/lib/data";

type Tab = "quick"|"detailed";
interface QuickForm    { name:string; phone?:string; message:string; }
interface DetailedForm { firstName:string; lastName?:string; email:string; phone?:string; company?:string; projectType:string; budget:string; timeline:string; description:string; referral?:string; }

const FErr = ({ msg }:{ msg?:string }) => msg ? <p className="text-[10px] mt-1.5" style={{ color:"#ef4444" }}>{msg}</p> : null;
const SendIco = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>;

export function ContactClient() {
  const [tab, setTab]       = useState<Tab>("quick");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [msg, setMsg]       = useState("");
  const quick    = useForm<QuickForm>();
  const detailed = useForm<DetailedForm>();

  async function submit(data: QuickForm | DetailedForm, formType: Tab) {
    setStatus("loading");
    try {
      const res  = await fetch("/api/contact",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({...(data as object),formType}) });
      const json = await res.json();
      if (res.ok) { setStatus("success"); setMsg(json.message); quick.reset(); detailed.reset(); }
      else         { setStatus("error");   setMsg(json.error||"Something went wrong."); }
    } catch { setStatus("error"); setMsg("Network error. Please try again."); }
  }

  const L="field-label", I="field-input";
  const selStyle = { WebkitAppearance:"none" as const, appearance:"none" as const };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Left */}
      <div>
        <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color:"var(--muted)" }}>Have a project or idea? I respond fast. No bots, just me.</p>
        <div className="space-y-4 mb-8">
          {[
            { icon:"phone", label:SITE.phoneDisplay, href:`tel:${SITE.phone}` },
            { icon:"mail",  label:SITE.email,        href:`mailto:${SITE.email}` },
            { icon:"github",label:"github.com/naveen",href:SITE.github },
          ].map(item => (
            <div key={item.href} className="flex items-center gap-3">
              <span style={{ color:"var(--accent)", flexShrink:0 }}>
                {item.icon==="phone" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.14 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>}
                {item.icon==="mail"  && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                {item.icon==="github"&& <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>}
              </span>
              <a href={item.href} target={item.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                className="text-sm font-semibold transition-colors hover:text-[var(--accent)]" style={{ color:"var(--fg)" }}>{item.label}</a>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-4 mb-8" style={{ background:"var(--al)", border:"1px solid var(--bst)" }}>
          <p className="font-mono text-[10px] tracking-wider uppercase mb-1.5" style={{ color:"var(--accent)" }}>Available for freelance</p>
          <p className="text-xs leading-relaxed" style={{ color:"var(--muted)" }}>Websites, web apps, WordPress — anything built properly.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <a href={`tel:${SITE.phone}`}    className="btn-primary" style={{ padding:"9px 18px", fontSize:12 }}>Call now</a>
          <a href={`mailto:${SITE.email}`} className="btn-outline" style={{ padding:"9px 18px", fontSize:12 }}>Email me</a>
        </div>
      </div>

      {/* Right */}
      <div className="card p-7 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background:"linear-gradient(90deg,var(--accent),transparent)" }} aria-hidden="true"/>
        {status==="success" && <div className="mb-5 p-4 rounded-xl text-sm flex items-center gap-2.5" style={{ background:"rgba(34,197,94,.1)", border:"1px solid rgba(34,197,94,.3)", color:"#16a34a" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15"><polyline points="20 6 9 17 4 12"/></svg>{msg}</div>}
        {status==="error"   && <div className="mb-5 p-4 rounded-xl text-sm flex items-center gap-2.5" style={{ background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.3)", color:"#dc2626" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{msg}</div>}

        <div className="inline-flex gap-1 p-1 rounded-full mb-5" style={{ background:"var(--bg2)", border:"1px solid var(--brd)" }} role="tablist">
          {(["quick","detailed"] as Tab[]).map(t => (
            <button key={t} role="tab" aria-selected={tab===t} onClick={()=>{ setTab(t); setStatus("idle"); }}
              className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200"
              style={{ background:tab===t?"var(--accent)":"transparent", color:tab===t?"var(--pfg)":"var(--muted)" }}>
              {t==="quick"?"Quick Contact":"Full Brief"}
            </button>
          ))}
        </div>

        {tab==="quick" && (
          <form onSubmit={quick.handleSubmit(d=>submit(d,"quick"))} noValidate>
            <p className="font-bold mb-1" style={{ color:"var(--fg)" }}>Quick Message</p>
            <p className="text-xs mb-5" style={{ color:"var(--muted)" }}>Just the essentials — I&apos;ll follow up.</p>
            <div className="mb-4"><label className={L} htmlFor="q-name">Name *</label>
              <input id="q-name" className={I} placeholder="Your name" {...quick.register("name",{required:"Name is required"})}/>
              <FErr msg={quick.formState.errors.name?.message}/></div>
            <div className="mb-4"><label className={L} htmlFor="q-phone">Phone</label>
              <input id="q-phone" type="tel" className={I} placeholder="+91 74834 62690" {...quick.register("phone")}/></div>
            <div className="mb-5"><label className={L} htmlFor="q-msg">What do you need? *</label>
              <textarea id="q-msg" className={`${I} resize-y`} rows={4} placeholder="Brief description..." {...quick.register("message",{required:"Please describe what you need"})}/>
              <FErr msg={quick.formState.errors.message?.message}/></div>
            <button type="submit" disabled={status==="loading"} className="btn-primary w-full justify-center disabled:opacity-60" style={{ padding:"12px" }}>
              {status==="loading" ? "Sending…" : <><SendIco/> Send message</>}</button>
          </form>
        )}

        {tab==="detailed" && (
          <form onSubmit={detailed.handleSubmit(d=>submit(d,"detailed"))} noValidate>
            <p className="font-bold mb-1" style={{ color:"var(--fg)" }}>Full Project Brief</p>
            <p className="text-xs mb-5" style={{ color:"var(--muted)" }}>Give me the full picture for a proper proposal.</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div><label className={L} htmlFor="d-fn">First Name *</label>
                <input id="d-fn" className={I} placeholder="Naveen" {...detailed.register("firstName",{required:"Required"})}/>
                <FErr msg={detailed.formState.errors.firstName?.message}/></div>
              <div><label className={L} htmlFor="d-ln">Last Name</label>
                <input id="d-ln" className={I} placeholder="Kumar" {...detailed.register("lastName")}/></div>
            </div>
            <div className="mb-4"><label className={L} htmlFor="d-email">Email *</label>
              <input id="d-email" type="email" className={I} placeholder="you@company.com"
                {...detailed.register("email",{required:"Email is required",pattern:{value:/^\S+@\S+\.\S+$/,message:"Enter a valid email"}})}/>
              <FErr msg={detailed.formState.errors.email?.message}/></div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div><label className={L} htmlFor="d-ph">Phone</label><input id="d-ph" type="tel" className={I} placeholder="+91…" {...detailed.register("phone")}/></div>
              <div><label className={L} htmlFor="d-co">Company</label><input id="d-co" className={I} placeholder="Acme Ltd" {...detailed.register("company")}/></div>
            </div>
            <div className="mb-4"><label className={L} htmlFor="d-type">Project Type *</label>
              <select id="d-type" className={I} style={selStyle} {...detailed.register("projectType",{required:"Select a type"})}>
                <option value="">Select type…</option>{PROJECT_TYPES.map(t=><option key={t} value={t}>{t}</option>)}</select>
              <FErr msg={detailed.formState.errors.projectType?.message}/></div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div><label className={L} htmlFor="d-bud">Budget *</label>
                <select id="d-bud" className={I} style={selStyle} {...detailed.register("budget",{required:"Select a budget"})}>
                  <option value="">Select…</option>{BUDGET_RANGES.map(b=><option key={b} value={b}>{b}</option>)}</select>
                <FErr msg={detailed.formState.errors.budget?.message}/></div>
              <div><label className={L} htmlFor="d-time">Timeline *</label>
                <select id="d-time" className={I} style={selStyle} {...detailed.register("timeline",{required:"Select a timeline"})}>
                  <option value="">Select…</option>{TIMELINES.map(t=><option key={t} value={t}>{t}</option>)}</select>
                <FErr msg={detailed.formState.errors.timeline?.message}/></div>
            </div>
            <div className="mb-4"><label className={L} htmlFor="d-desc">Project Description *</label>
              <textarea id="d-desc" className={`${I} resize-y`} rows={4} placeholder="Goals, features, audience…"
                {...detailed.register("description",{required:"Please describe your project"})}/>
              <FErr msg={detailed.formState.errors.description?.message}/></div>
            <div className="mb-5"><label className={L} htmlFor="d-ref">How did you find me?</label>
              <select id="d-ref" className={I} style={selStyle} {...detailed.register("referral")}>
                <option value="">Select…</option>{REFERRAL_SOURCES.map(r=><option key={r} value={r}>{r}</option>)}</select></div>
            <button type="submit" disabled={status==="loading"} className="btn-primary w-full justify-center disabled:opacity-60" style={{ padding:"12px" }}>
              {status==="loading" ? "Submitting…" : <><SendIco/> Submit Brief</>}</button>
          </form>
        )}
      </div>
    </div>
  );
}
