// app/page.tsx — SERVER COMPONENT
import type { Metadata } from "next";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE, SERVICES, TECH_STACK, STATS, PROCESS_STEPS, EXPERIENCE } from "@/lib/data";
import { HeroSection }       from "@/components/sections/HeroSection";
import { MarqueeBar }         from "@/components/sections/MarqueeBar";
import { ServicesSection }    from "@/components/sections/ServicesSection";
import { TechSection }        from "@/components/sections/TechSection";
import { ExperienceSection }  from "@/components/sections/ExperienceSection";
import { ProcessSection, HomeCTA } from "@/components/sections/ProcessSection";

export const metadata: Metadata = buildMetadata({
  title: "Home",
  description: SITE.fullName+" is a full-stack web developer building React, Node.js and WordPress websites. Available for freelance. "+SITE.phone,
  path: "/",
  keywords: ["hire full stack developer India","React freelancer","WordPress expert"],
});

export default function HomePage() {
  const jsonLd = breadcrumbSchema([{ name:"Home", url:SITE.url }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>
      <HeroSection/>
      <MarqueeBar/>
      <ServicesSection services={SERVICES}/>
      <MarqueeBar reverse/>
      <TechSection stack={TECH_STACK}/>
      <ExperienceSection experience={EXPERIENCE} stats={STATS}/>
      <ProcessSection steps={PROCESS_STEPS}/>
      <HomeCTA/>
    </>
  );
}
