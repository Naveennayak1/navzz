// lib/data.ts  — single source of truth for all portfolio content

export const SITE = {
  name: "Navzz",
  fullName: "Naveen Kumar",
  title: "Full-Stack Web Developer",
  tagline: "I build websites and web applications that actually work.",
  description:
    "Naveen Kumar (Navzz) is a full-stack web developer and team lead specialising in React, Node.js, WordPress and MongoDB. Based in India, available for freelance projects worldwide.",
  url: "https://navzz.dev", // ← change to your real domain
  email: "naveen@navzz.dev",
  phone: "+91 7483462690",
  phoneDisplay: "+91 74834 62690",
  github: "https://github.com/naveen",
  linkedin: "https://linkedin.com/in/naveen",
  twitter: "https://twitter.com/navzz",
  locale: "en_IN",
  themeColor: "#0f0f0e",
  openToWork: true,
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const SERVICES = [
  {
    id: "website",
    icon: "monitor",
    title: "Website Development",
    description:
      "Fast, responsive, modern websites built for businesses and products. Optimised for speed, SEO, and real-world performance.",
    features: ["Mobile-first design", "SEO optimised", "Performance tuned", "CMS ready"],
  },
  {
    id: "webapp",
    icon: "zap",
    title: "Web App Development",
    description:
      "Dynamic full-stack applications using React and Node.js. Scalable, user-friendly, and battle-tested in production.",
    features: ["React / Next.js", "Node.js + Express", "REST / GraphQL APIs", "Auth & payments"],
  },
  {
    id: "wordpress",
    icon: "globe",
    title: "WordPress Development",
    description:
      "Custom WordPress websites, Elementor builds, performance optimisation and solving the ones that mysteriously broke.",
    features: ["Custom themes", "Elementor builds", "Speed optimisation", "Security hardening"],
  },
];

export const TECH_STACK = [
  { name: "JavaScript", category: "Frontend", level: 95 },
  { name: "React", category: "Frontend", level: 92 },
  { name: "Next.js", category: "Frontend", level: 88 },
  { name: "HTML & CSS", category: "Frontend", level: 90 },
  { name: "Node.js", category: "Backend", level: 88 },
  { name: "Express.js", category: "Backend", level: 85 },
  { name: "MongoDB", category: "Database", level: 82 },
  { name: "PostgreSQL", category: "Database", level: 78 },
  { name: "Git & GitHub", category: "Tools", level: 93 },
  { name: "WordPress", category: "CMS", level: 96 },
  { name: "Elementor", category: "CMS", level: 80 },
  { name: "TypeScript", category: "Frontend", level: 75 },
];

export const PROJECTS = [
  {
    id: "shoppyglobe",
    slug: "shoppyglobe",
    number: "01",
    title: "ShoppyGlobe",
    tagline: "Full-stack e-commerce platform",
    description:
      "A complete e-commerce application with product browsing, cart management, user authentication, and a fully functional Node.js + Express backend connected to MongoDB. Built with real-world patterns.",
    longDescription:
      "ShoppyGlobe is a production-grade e-commerce app that demonstrates full-stack skills. The frontend uses React with Context API for state management, while the backend handles authentication via JWT, product CRUD, and order management. MongoDB stores product and order data with proper indexing.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "REST API"],
    status: "completed" as const,
    year: 2024,
    github: "https://github.com/naveen/shoppyglobe",
    live: "#",
    featured: true,
    highlights: [
      "JWT-based authentication",
      "Product search and filtering",
      "Cart with persistent state",
      "Order management system",
      "RESTful API design",
    ],
  },
  {
    id: "online-library",
    slug: "online-library",
    number: "02",
    title: "Online Library System",
    tagline: "React-powered digital library",
    description:
      "A React application to browse books, view details, search the catalogue, and manage a personal reading list. Clean UI, simple state management, real-world React patterns.",
    longDescription:
      "The Online Library System demonstrates React best practices — custom hooks, component composition, and clean state management. Users can browse by genre, search the catalogue, view book details, and maintain a reading list that persists across sessions.",
    tags: ["React", "JavaScript", "CSS Modules", "REST API"],
    status: "completed" as const,
    year: 2024,
    github: "https://github.com/naveen/online-library",
    live: "#",
    featured: true,
    highlights: [
      "Advanced book search",
      "Genre filtering",
      "Personal reading list",
      "Responsive layout",
      "Custom React hooks",
    ],
  },
];

export const STATS = [
  { value: 50, suffix: "+", label: "Sites launched" },
  { value: 10, suffix: "+", label: "Devs trained" },
  { value: 3, suffix: "", label: "Tech stacks" },
  { value: 100, suffix: "%", label: "Commitment" },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    description: "We talk through your goals, requirements, and timeline. No jargon — just honest planning.",
    icon: "message-circle",
  },
  {
    step: "02",
    title: "Planning",
    description: "I break the project into clear milestones and choose the right tech stack for your needs.",
    icon: "file-text",
  },
  {
    step: "03",
    title: "Build",
    description: "Design, develop, and test — your idea becomes a working product with regular check-ins.",
    icon: "code-2",
  },
  {
    step: "04",
    title: "Launch",
    description: "Your site or app goes live with performance checks, SEO, and deployment handled end-to-end.",
    icon: "send",
  },
  {
    step: "05",
    title: "Support",
    description: "Post-launch support, iteration based on feedback, and ongoing improvements as needed.",
    icon: "refresh-cw",
  },
];

export const EXPERIENCE = [
  {
    role: "Team Lead & Web Developer",
    company: "Current Role",
    period: "2022 – Present",
    points: [
      "Built and managed multiple production websites used by real businesses",
      "Trained 10+ developers in WordPress development and best practices",
      "Led end-to-end delivery of web projects across multiple tech stacks",
      "Introduced code review processes and quality standards to the team",
    ],
  },
];

export const PROJECT_TYPES = [
  "Website Development",
  "Web Application",
  "WordPress Development",
  "Landing Page",
  "E-commerce",
  "Bug Fix / Optimisation",
  "Consultation",
  "Other",
];

export const BUDGET_RANGES = [
  "Under ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000 – ₹2,00,000",
  "₹2,00,000 – ₹5,00,000",
  "₹5,00,000+",
  "Let's discuss",
];

export const TIMELINES = [
  "ASAP (within 1 week)",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Flexible",
];

export const REFERRAL_SOURCES = [
  "Google Search",
  "LinkedIn",
  "GitHub",
  "Twitter / X",
  "Word of mouth",
  "Other",
];

export const GALLERY_PHOTOS = [
  {
    id: "photo-1",
    src: "/images/photo1.jpg",
    alt: "Naveen Kumar — hotel corridor",
    caption: "Premium vibes",
  },
  {
    id: "photo-2",
    src: "/images/photo2.jpg",
    alt: "Naveen Kumar — mountain golden hour",
    caption: "Golden hour",
  },
  {
    id: "photo-3",
    src: "/images/photo3.jpg",
    alt: "Naveen Kumar — fountain park",
    caption: "Explorer mode",
  },
];
