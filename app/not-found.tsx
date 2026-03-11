import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="font-mono text-[11px] tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>404</div>
      <h1 className="font-black mb-4"
        style={{ fontSize: "clamp(36px,7vw,84px)", letterSpacing: "-0.055em", color: "var(--fg)" }}>
        Page not found.
      </h1>
      <p className="text-sm mb-10 max-w-sm" style={{ color: "var(--muted)" }}>
        This page doesn&apos;t exist — or was moved. Let&apos;s get you back.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link href="/" className="btn-primary">Go home</Link>
        <Link href="/contact" className="btn-outline">Contact me</Link>
      </div>
    </div>
  );
}
