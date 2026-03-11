"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";
import { NAV_LINKS, SITE } from "@/lib/data";

const LogoMark = () => (
  <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="Navzz — Home">
    <div className="nav-mark" style={{ background: "var(--accent)" }}>
      <svg viewBox="0 0 100 100" fill="none" width="18" height="18">
        <path d="M23 77L23 23L80.5 80.5" stroke="var(--pfg)" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="77" cy="23" r="12" fill="var(--pfg)"/>
      </svg>
    </div>
    <span className="text-lg font-extrabold" style={{ color: "var(--fg)", letterSpacing: "-0.05em" }}>Navzz</span>
  </Link>
);

const THEMES = [
  { t: "mono"   as const, label: "Light",     bg: "conic-gradient(#d0cfc9,#888,#d0cfc9)" },
  { t: "coffee" as const, label: "Coffee",    bg: "linear-gradient(135deg,#5c2d0e,#c6925b)" },
  { t: "blue"   as const, label: "Blue Tech", bg: "linear-gradient(135deg,#0d2b8a,#3b7cf8)" },
];

export function Navbar() {
  const pathname          = usePathname();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [showTip, setShowTip]       = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    try {
      if (!localStorage.getItem("nv_ob")) {
        const t = setTimeout(() => setShowTip(true), 2200);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeTip = () => {
    setShowTip(false);
    try { localStorage.setItem("nv_ob", "1"); } catch {}
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navBg = scrolled
    ? "rgba(var(--bg-raw,242,241,239),0.88)"
    : "transparent";

  return (
    <>
      {/* ─── Main header ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-[300] transition-all duration-300"
        style={{
          background: scrolled ? "var(--bg)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid var(--brd)" : "none",
          opacity: scrolled ? 0.97 : 1,
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between gap-4">

          <LogoMark />

          {/* Center nav — desktop only */}
          <nav aria-label="Main navigation" className="hidden md:flex">
            <div
              className="flex gap-1 px-1.5 py-1 rounded-full"
              style={{ background: "var(--card)", border: "1px solid var(--brd)" }}
            >
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                  style={{
                    background: isActive(link.href) ? "var(--accent)" : "transparent",
                    color: isActive(link.href) ? "var(--pfg)" : "var(--muted)",
                  }}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            {/* Theme switcher */}
            <div
              className="flex gap-1.5 px-2 py-1.5 rounded-full"
              style={{ background: "var(--card)", border: "1px solid var(--bst)" }}
              role="group"
              aria-label="Choose colour theme"
            >
              {THEMES.map(({ t, label, bg }) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  title={label}
                  aria-label={`Switch to ${label} theme`}
                  className="w-5 h-5 rounded-full transition-transform duration-200 hover:scale-110"
                  style={{
                    background: bg,
                    outline: theme === t ? "2px solid var(--fg)" : "2px solid transparent",
                    outlineOffset: "1px",
                  }}
                />
              ))}
            </div>

            <Link href="/contact" className="btn-primary hidden md:inline-flex" style={{ padding: "8px 18px", fontSize: "12px" }}>
              Hire me
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors"
              style={{ color: "var(--fg)", background: "var(--al)" }}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span
                className="block w-5 h-0.5 transition-all duration-300 origin-center"
                style={{ background: "var(--fg)", transform: menuOpen ? "translateY(5px) rotate(45deg)" : "" }}
              />
              <span
                className="block w-5 h-0.5 transition-all duration-300"
                style={{ background: "var(--fg)", opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-0.5 transition-all duration-300 origin-center"
                style={{ background: "var(--fg)", transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "" }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile menu overlay ─── */}
      <div className={`mobile-menu ${menuOpen ? "menu-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="absolute top-4 right-5">
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-full"
            style={{ background: "var(--al)", color: "var(--fg)" }}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {NAV_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-black transition-colors duration-200"
            style={{
              color: isActive(link.href) ? "var(--accent)" : "var(--fg)",
              letterSpacing: "-0.04em",
            }}
          >
            {link.label}
          </Link>
        ))}

        <div className="mt-4 flex flex-col gap-3 items-center">
          <Link href="/contact" className="btn-primary" onClick={() => setMenuOpen(false)}>
            Hire me
          </Link>
          <div
            className="flex gap-2 p-2 rounded-full"
            style={{ background: "var(--bg2)", border: "1px solid var(--brd)" }}
          >
            {THEMES.map(({ t, label, bg }) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                title={label}
                className="w-7 h-7 rounded-full"
                style={{
                  background: bg,
                  outline: theme === t ? "2px solid var(--fg)" : "2px solid transparent",
                  outlineOffset: "1px",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ─── Onboarding tip ─── */}
      {showTip && (
        <div
          className="fixed top-[70px] right-4 z-[400] rounded-2xl p-5 w-56"
          style={{ background: "var(--card)", border: "1.5px solid var(--bst)", boxShadow: "0 20px 60px var(--glow)" }}
          role="dialog"
          aria-label="Theme tip"
        >
          <div
            className="absolute -top-2 right-10 w-3 h-3 rotate-45"
            style={{ background: "var(--card)", borderLeft: "1.5px solid var(--bst)", borderTop: "1.5px solid var(--bst)" }}
          />
          <p className="text-xs font-bold mb-1.5" style={{ color: "var(--fg)" }}>Change the vibe</p>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
            Try 3 premium themes — Light, Coffee, and Blue.
          </p>
          <button
            onClick={closeTip}
            className="w-full py-2 rounded-full text-xs font-bold"
            style={{ background: "var(--accent)", color: "var(--pfg)" }}
          >
            Got it!
          </button>
        </div>
      )}
    </>
  );
}
