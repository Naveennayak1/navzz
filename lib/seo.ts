// lib/seo.ts — centralised SEO metadata factory
import type { Metadata } from "next";
import { SITE } from "./data";

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path = "",
  ogImage = "/og/default.png",
  keywords = [],
  noIndex = false,
}: SeoProps = {}): Metadata {
  const pageTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.title}`;
  const pageDescription = description ?? SITE.description;
  const canonicalUrl = `${SITE.url}${path}`;

  const defaultKeywords = [
    "web developer India",
    "freelance web developer",
    "React developer",
    "Node.js developer",
    "WordPress developer",
    "full stack developer",
    "Naveen Kumar",
    "Navzz",
    "Next.js developer",
    "hire web developer",
  ];

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [...defaultKeywords, ...keywords].join(", "),
    authors: [{ name: SITE.fullName, url: SITE.url }],
    creator: SITE.fullName,
    publisher: SITE.fullName,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: canonicalUrl },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url: canonicalUrl,
      siteName: SITE.name,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      site: "@navzz",
      creator: "@navzz",
      images: [ogImage],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/site.webmanifest",
    verification: {
      google: "your-google-site-verification-token", // ← add after domain setup
    },
  };
}

// JSON-LD structured data helpers
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.fullName,
    alternateName: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    jobTitle: SITE.title,
    sameAs: [SITE.github, SITE.linkedin, SITE.twitter],
    knowsAbout: [
      "Web Development",
      "React",
      "Node.js",
      "WordPress",
      "MongoDB",
      "JavaScript",
      "Full-Stack Development",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    author: { "@type": "Person", name: SITE.fullName },
    description: SITE.description,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function projectSchema(project: {
  title: string;
  description: string;
  url: string;
  github: string;
  tags: string[];
  year: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: project.url,
    codeRepository: project.github,
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    keywords: project.tags.join(", "),
    datePublished: project.year.toString(),
    author: { "@type": "Person", name: SITE.fullName },
  };
}
