// app/contact/page.tsx — SERVER COMPONENT
import type { Metadata } from "next";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/data";
import { ContactClient } from "@/components/sections/ContactClient";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with "+SITE.fullName+" for web development — websites, React apps, WordPress. Call "+SITE.phoneDisplay+" or send a project brief.",
  path: "/contact",
  keywords: ["hire web developer India","contact Naveen Kumar","web development project","React developer for hire"],
});

const contactSchema = {
  "@context":"https://schema.org","@type":"ContactPage",
  name:"Contact Naveen Kumar",
  description:"Hire "+SITE.fullName+" for web development.",
  url:SITE.url+"/contact",
  mainEntity:{ "@type":"Person", name:SITE.fullName, telephone:SITE.phone, email:SITE.email, url:SITE.url },
};

export default function ContactPage() {
  const breadcrumb = breadcrumbSchema([{ name:"Home", url:SITE.url },{ name:"Contact", url:SITE.url+"/contact" }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}/>
      <div className="page-wrap">
        <div className="mb-12 md:mb-16">
          <div className="sec-label"><div className="sec-ln"/><span className="sec-lt">Contact</span></div>
          <h1 className="font-black leading-none mb-4" style={{ fontSize:"clamp(40px,7vw,88px)", letterSpacing:"-0.055em", color:"var(--fg)" }}>
            Let&apos;s build<br/><span style={{ color:"var(--accent)" }}>something.</span>
          </h1>
          <p className="text-sm leading-relaxed max-w-md" style={{ color:"var(--muted)" }}>
            Have a project, idea, or just want to talk? I respond fast. No bots, just me.
          </p>
        </div>
        <ContactClient/>
      </div>
    </>
  );
}
