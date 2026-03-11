// app/gallery/page.tsx — SERVER COMPONENT
import type { Metadata } from "next";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE, GALLERY_PHOTOS } from "@/lib/data";
import { GalleryClient } from "@/components/sections/GalleryClient";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: "A glimpse into the life and world of "+SITE.fullName+" — web developer, explorer.",
  path: "/gallery",
  keywords: ["Naveen Kumar photos","web developer lifestyle","Navzz gallery"],
});

export default function GalleryPage() {
  const breadcrumb = breadcrumbSchema([{ name:"Home", url:SITE.url },{ name:"Gallery", url:SITE.url+"/gallery" }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}/>
      <div className="page-wrap">
        <div className="mb-10">
          <div className="sec-label"><div className="sec-ln"/><span className="sec-lt">Gallery</span></div>
          <h1 className="font-black leading-none mb-4" style={{ fontSize:"clamp(40px,7vw,88px)", letterSpacing:"-0.055em", color:"var(--fg)" }}>
            The human behind<br/><span style={{ color:"var(--accent)" }}>the code.</span>
          </h1>
          <p className="text-sm leading-relaxed max-w-md" style={{ color:"var(--muted)" }}>
            Beyond the terminal — places, moments, and the occasional cat.
          </p>
        </div>
        <GalleryClient photos={GALLERY_PHOTOS}/>
        <noscript>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
            {GALLERY_PHOTOS.map(photo => (
              <figure key={photo.id} className="card overflow-hidden">
                <img src={photo.src} alt={photo.alt} className="w-full h-72 object-cover object-top" loading="lazy"/>
                <figcaption className="p-3 font-mono" style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)" }}>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </noscript>
      </div>
    </>
  );
}
