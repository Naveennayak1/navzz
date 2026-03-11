// app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE, PROJECTS } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "/", priority: 1.0, changeFreq: "weekly" as const },
    { path: "/about", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/gallery", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/contact", priority: 0.85, changeFreq: "monthly" as const },
  ];

  const projectPages = PROJECTS.map((p) => ({
    path: `/projects/${p.slug}`,
    priority: 0.8,
    changeFreq: "monthly" as const,
  }));

  return [...staticPages, ...projectPages].map(({ path, priority, changeFreq }) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
  }));
}
