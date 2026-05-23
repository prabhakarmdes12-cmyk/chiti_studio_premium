export interface JournalEntry {
  phase: string;
  entries: { title: string; body: string }[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  subtitle: string;
  role: string;
  year: string;
  summary: string;
  category: string;
  tags: string[];
  techStack: string[];
  keyFeatures: string[];
  images: {
    hero: string;
    cover: string;
    logo?: string;
    diagram?: string;
  };
  testimonial?: { quote: string; author: string; title: string };
  liveUrl?: string;
  metrics: { label: string; value: string }[];
  featured: boolean;
  problem: string;
  systemOverview: { text: string; diagram?: string };
  keyChallenges: string[];
  designDecisions: { title: string; text: string }[];
  interfaceScreens: { file: string; caption: string }[];
  screenIntro: string;
  impact: string[];
  reflection: string;
  journal?: JournalEntry[];
}

const caseStudyOrder = [
  "netq-command",
  "ts-aromatics",
  "house-of-giriraj",
  "batchflow",
  "bighi-brothers",
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "netq-command",
    title: "NetQ Command — Infrastructure Monitoring Product",
    client: "NetQ Command",
    subtitle:
      "Translating technical monitoring into a product that both operators and business clients can understand",
    role: "Product Design, UX Strategy, Interface Direction",
    year: "2026",
    summary:
      "NetQ Command reframed infrastructure monitoring from a purely technical dashboard into a dual-view command system with clearer feedback, business translation, and stronger client-facing storytelling.",
    category: "Product Design",
    tags: ["Product Design", "UX Strategy", "Dashboard", "SaaS"],
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "D3.js",
      "WebSocket",
      "REST API",
      "PostgreSQL",
      "Docker",
    ],
    keyFeatures: [
      "Dual-view architecture — technical operations layer and business impact layer",
      "Smart Translation Engine — maps technical metrics to business outcomes (e.g. 'CPU Load' → 'Experience Risk')",
      "Immediate command feedback with validation and status visibility",
      "Incident simulation with 'Loss Prevented' counter for demos and onboarding",
      "Business-impact framing that translates raw events into customer outcomes",
      "Client Management Dashboard with per-client health scores, revenue tracking, and active risks",
      "ROI Visibility Card showing monthly revenue, active clients, and growth indicators",
      "White-label deployment (NetQ → Partner Command) for MSP resale",
      "Multi-client simulation mode for sales demonstrations",
      "Smart Alerts with business impact context and suggested actions",
    ],
    images: {
      hero: "/case-studies/netq/overview-screen.svg",
      cover: "/case-studies/netq/overview-screen.svg",
      diagram: "/case-studies/netq/system-overview.jpeg",
    },
    liveUrl: undefined,
    metrics: [
      { label: "Interface Views", value: "2" },
      { label: "Persona Types", value: "5" },
      { label: "Design Phase", value: "V3" },
      { label: "Stakeholders", value: "Ops + Business" },
    ],
    featured: true,
    problem:
      "NetQ Command started from a familiar enterprise problem: the system could surface technical data, but it did not help different stakeholders understand what that data meant. Small and mid-sized IT service providers needed two things at the same time: a reliable command environment for operators working with infrastructure data, and a clearer way to explain service value to business clients who do not think in uptime graphs and latency spikes. The gap was not only visual. It was a product-framing problem. Technical metrics were visible, but business value was still invisible.",
    systemOverview: {
      text: "We treated the product as a translation layer, not just a dashboard. The interface had to support raw system operations while also producing a second level of meaning for decision-makers. The resulting structure connects five layers: command and signal intake, validation and classification, execution and remediation, business translation, and reporting and client communication. This let the same underlying system serve both technical work and business storytelling without splitting into unrelated tools.",
      diagram: "/case-studies/netq/system-overview.jpeg",
    },
    keyChallenges: [
      "Preserving technical credibility while simplifying the language for non-technical users",
      "Designing feedback patterns that reduce command anxiety and execution mistakes",
      "Showing business impact without making the product feel like a marketing layer detached from operations",
      "Creating a system that could move between normal monitoring and incident response without losing clarity",
    ],
    designDecisions: [
      {
        title: "Dual-view structure",
        text: "We separated the product into a technical view and a business view. The technical layer stays close to operations, while the business layer reframes the same signals into outcomes such as risk, continuity, and value protected.",
      },
      {
        title: "Smart Translation Engine",
        text: "Instead of showing 'CPU Load: 45%', the business view displays 'Experience Risk: Low — your customer-facing services are running smoothly'. '12 Active Alerts' becomes '3 Business Risks — potential revenue impact if unaddressed: ₹45,000'. This mapping from technical metrics to business outcomes is powered by a configurable translation layer that adapts to each client's industry.",
      },
      {
        title: "Immediate command feedback",
        text: "The interaction model emphasizes validation, status visibility, and structured output. Instead of treating the interface like a passive console, it behaves like a guided command surface with clearer confirmation states.",
      },
      {
        title: "Incident simulation",
        text: "One key concept was a simulation mode that demonstrates how the system reacts under stress. A 'Loss Prevented' counter shows real-time revenue impact during demos, turning an abstract monitoring product into something easier to explain during sales conversations.",
      },
      {
        title: "Client Management & Revenue Visibility",
        text: "We added a dedicated client management dashboard with per-client health scores, monthly revenue tracking, and active risk monitoring. An ROI card prominently displays current revenue, average per-client value, and growth indicators — reinforcing the business value for the service provider themselves.",
      },
      {
        title: "Industry-specific views",
        text: "The product supports five client types — ISP Providers, IT Agencies, SaaS Companies, Hospitals, and Factories — each with specialized terminology and alert thresholds. This lets service providers speak the language of each client's industry without manual configuration.",
      },
    ],
    interfaceScreens: [
      {
        file: "overview-screen.svg",
        caption:
          "Operations dashboard concept — Shows the dual-view architecture where operators see real-time signal intake and validation. Addresses command anxiety by making next action explicit.",
      },
      {
        file: "business-screen.svg",
        caption:
          "Business impact layer concept — Translates technical signals into business outcomes (risk, continuity, value protected). Shows how the same system speaks to non-technical stakeholders.",
      },
      {
        file: "incident-screen.svg",
        caption:
          "Incident simulation concept — Demonstrates system behavior under stress for demos and onboarding. Helps sales teams explain product value without technical jargon.",
      },
    ],
    screenIntro:
      "The screens below show the main interface directions: a dense operations dashboard, a translated business layer, and an incident state used to explain product value during demos.",
    impact: [
      "Reframed the product from a technical utility into a stronger service platform story",
      "Created a clearer relationship between infrastructure health and business impact",
      "Reduced ambiguity in how operators read system state and next actions",
      "Gave the product a more convincing narrative for client demos and white-label deployment",
      "Enabled IT providers to switch from hourly billing to retainer models with visible ROI",
      "Multi-client simulation turned abstract monitoring into a demonstrable sales tool",
    ],
    reflection:
      "This project reinforced that complex products are often communication problems before they are styling problems. The most useful design move was not adding more surface polish. It was structuring the interface so the same system could speak clearly to two very different audiences without becoming fragmented. The translation layer — mapping technical events to business outcomes — proved to be the highest-leverage feature, turning an operational tool into a revenue-generating platform.",
    journal: [
      {
        phase: "Foundation & Design System",
        entries: [
          {
            title: "Design Token Architecture",
            body: "Created comprehensive design token system aligned with Chiti UDS v3.0.0: dark theme colors (Background, Surface1, Surface2), brand tokens (Primary Purple, Secondary Cyan), semantic tokens (Success, Info, Warning, Error), DataViz palette (WCAG AAA, color-blind safe), 8pt grid spacing, typography (Outfit for display, Inter for body, JetBrains Mono for code), motion tokens with duration and easing curves, and elevation tokens (shadow-sm through shadow-2xl)."
          },
          {
            title: "Component Library & Motion System",
            body: "Built a component library with Button (5 variants: cinematic, glass, saas, error, ghost), Card with loading states, Skeleton with reduced motion support, Badge/StatusBadge, and Input/SearchInput. Implemented staggered entrance animations with Framer Motion, haptic feedback using Web Audio API, and full accessibility compliance with focus-visible rings and ARIA labels."
          }
        ]
      },
      {
        phase: "Core Architecture & Views",
        entries: [
          {
            title: "Dual-View Architecture",
            body: "Developed two separate interface modes — a Technical View for operators with real-time signal intake, validation, and execution, and a Business View that translates the same infrastructure data into business outcomes (risk, continuity, value protected). The toggle lets the product serve both audiences without splitting into separate tools."
          }
        ]
      },
      {
        phase: "Revenue & Client Management",
        entries: [
          {
            title: "Client Management Layer",
            body: "Added a Clients page with per-client health scores, active risk counts, monthly revenue tracking, and system counts. Each client card shows status (Healthy/Warning/Critical), industry type, and quick actions for viewing dashboard or running simulations."
          },
          {
            title: "Revenue Visibility & Pricing",
            body: "Built a Revenue Card prominently displayed on the business dashboard showing active clients, average per-client value, monthly revenue, and growth indicators. Added a Pricing & Earnings Calculator in settings with real-time projections: 'With 15 clients at ₹3,000/month → ₹45,000/month, annual: ₹5,40,000'."
          },
          {
            title: "Sales Enablement",
            body: "Transformed the product into a sellable asset for IT service providers. Features include white-label mode (NetQ → Partner Command), multi-client incident simulation with 'Loss Prevented' counter, Smart Alerts with business impact context, and trust signals ('Used by IT providers managing 100+ systems', 'Average downtime reduced by 32%')."
          }
        ]
      }
    ]
  },
  {
    slug: "ts-aromatics",
    title: "TS Aromatics — B2B Essential Oils Platform (Technical Premium)",
    client: "TS Aromatics",
    subtitle:
      "A buyer-facing procurement platform for premium essential oils with a 'Technical Premium' UX — interactive chromatogram, 3D molecular explorer, and deep documentation.",
    role: "Web Development, Product Design, Technical Architecture",
    year: "2026",
    summary:
      "Built a sensorial B2B procurement platform featuring 127 product pages with GC/MS documentation, 3D molecular visualization, and a full educational academy — all within a heat-reactive interface.",
    category: "B2B Platform",
    tags: ["Web Development", "Product Design", "B2B", "E-Commerce", "i18n"],
    techStack: [
      "Next.js 16 (App Router, Turbopack)",
      "TypeScript 5",
      "Tailwind CSS v4",
      "Three.js + React Three Fiber",
      "Framer Motion 12",
      "next-intl (i18n)",
      "Zod v4",
      "Prisma v7",
      "Vercel",
    ],
    keyFeatures: [
      "Interactive Canvas chromatogram with real EMG peak shapes and hover-to-identify tooltips",
      "3D molecular explorer with force-directed graph of 47 molecules and IFRA restriction rings",
      "Global sourcing globe with animated arc dashes from India to 5 international ports",
      "Scroll-driven heat system that drives bubble physics, glow opacity, and turbulence",
      "127 product pages with GC/MS documentation, COA builder, and IFRA compliance overlays",
      "Chemical Signature reverse search — identify oils by their molecular profile",
      "Full English / Hindi i18n with cookie-based detection",
      "B2B enquiry cart context with Zod-validated server actions",
      "Educational academy with 8 technical articles and gamified certification paths",
      "Harvest-to-Bottle interactive timeline showing sourcing transparency",
    ],
    images: {
      hero: "/case-studies/ts-aromatics/hero.png",
      cover: "/case-studies/ts-aromatics/hero.png",
      logo: "https://www.tsaromatics.in/images/logo-dark.svg",
    },
    testimonial: {
      quote:
        "Chiti Technologies understood exactly what we needed — a platform that speaks to procurement professionals in a language they trust. The chromatogram integration alone has changed how our clients evaluate our products.",
      author: "Operations Team",
      title: "TS Aromatics",
    },
    liveUrl: "https://www.tsaromatics.in/en",
    metrics: [
      { label: "Products", value: "127" },
      { label: "GC/MS Analyses", value: "47" },
      { label: "Languages", value: "2" },
      { label: "Molecules", value: "47" },
    ],
    featured: true,
    problem:
      "TS Aromatics needed a procurement platform that could communicate technical legitimacy to serious B2B buyers — manufacturers, wellness founders, and formulators who demand GC/MS documentation, molecular transparency, and ingredient intelligence. The existing site lacked the technical depth to support procurement teams making sourcing decisions. Competitors in the essential oils space either had deep documentation but poor user experience, or beautiful design with no technical substance. The client needed both.",
    systemOverview: {
      text: "We built a platform that combines scientific rigour with premium brand experience. Every element — from the scroll-driven fluid simulation to the interactive chromatogram — serves the dual purpose of engaging visitors while demonstrating technical credibility. The architecture connects product catalogue, GC/MS data visualization, molecular exploration, procurement workflow, and educational content into a single sensorial interface. A heat-reactive design system responds to user attention, making the page feel alive and responsive.",
    },
    keyChallenges: [
      "Overcoming the trust deficit in B2B procurement — buyers need scientific proof before committing to bulk orders",
      "Making complex analytical chemistry (GC/MS data, EMG peak shapes) accessible and engaging for non-scientists",
      "Building a 3D molecular explorer that is scientifically accurate while remaining performant on consumer hardware",
      "Implementing IFRA compliance overlays across 127 products without manual data entry per product",
      "Creating an Academy experience that goes beyond articles into gamified certification and learning paths",
      "Supporting full bilingual (English/Hindi) content without splitting the codebase",
      "Designing a B2B enquiry workflow that balances flexibility with structured data capture",
    ],
    designDecisions: [
      {
        title: "'Technical Premium' UX philosophy",
        text: "The design language rejects the choice between scientific depth and brand experience. Every feature — from the interactive chromatogram to the molecular explorer — is treated as both a usability element and a trust-building asset. The philosophy: when complex information is made visible and interactive, it becomes a competitive advantage rather than a usability obstacle.",
      },
      {
        title: "Heat-reactive ambient interface",
        text: "The scroll-driven heat system controls bubble physics, glow opacity, and turbulence across the page. As the user scrolls, the environment responds — creating a physical, embodied browsing experience that mirrors the natural-origin products being sold.",
      },
      {
        title: "Chromatogram as hero element",
        text: "Instead of hiding technical data in PDFs, we built an interactive Canvas 2D chromatogram with real EMG peak shapes, an animated scan line, and hover-to-identify tooltips. This turns analytical chemistry into a visual selling point.",
      },
      {
        title: "3D molecular storytelling",
        text: "The 3D Molecular Explorer uses Three.js and React Three Fiber to render a force-directed graph of 47 molecules with weighted edges, hover glow effects, and IFRA restriction rings. This helps buyers understand the chemical profile of each oil at a glance.",
      },
      {
        title: "IFRA Compliance Overlays & Chemical Signature Search",
        text: "Each product page includes IFRA compliance data overlaid on the GC/MS chromatogram, showing restriction levels and safe usage limits. The Chemical Signature reverse search lets buyers identify oils by their molecular profile — a feature that turns the product catalogue into a research tool.",
      },
      {
        title: "Global sourcing transparency",
        text: "A 3D globe with animated arc dashes from India to 5 international ports visualizes the supply chain. This builds trust by showing procurement teams exactly where and how products are sourced and shipped.",
      },
      {
        title: "Academy Gamification",
        text: "Beyond static articles, the Academy includes certification paths and gamified learning modules that reward buyers for completing courses on aromatherapy science, IFRA compliance, and quality assessment.",
      },
    ],
    interfaceScreens: [
      {
        file: "/case-studies/ts-aromatics/hero.png",
        caption:
          "Homepage hero — The heat-reactive ambient interface with scroll-driven fluid simulation sets the tone for the technical depth to follow.",
      },
      {
        file: "/case-studies/ts-aromatics/product-catalog.png",
        caption:
           "Product catalog — 127 products with GC/MS data, COA builder, IFRA compliance overlays, and procurement information organized by category.",
      },
      {
        file: "/case-studies/ts-aromatics/academy.png",
        caption:
          "Academy and documentation — Technical education articles alongside procurement-ready documentation for buyers and formulators.",
      },
    ],
    screenIntro:
      "The platform spans product catalog, technical documentation, educational content, and a B2B enquiry workflow — all unified by the ambient, heat-reactive design system.",
    impact: [
      "Created a procurement experience that rivals industry leaders in both technical depth and brand experience",
      "Transformed complex analytical data from a barrier into a competitive advantage",
      "Early engagement metrics show strong time-on-site from procurement professionals",
      "Academy and technical documentation pages drive the highest conversion signals",
      "Client can now onboard new buyers with zero technical handholding",
      "IFRA compliance overlays reduced buyer hesitancy around regulatory questions",
      "Chemical Signature search turned the catalogue into a discovery tool for formulation chemists",
    ],
    reflection:
      "This project proved that B2B platforms do not have to choose between technical depth and beautiful design. The most effective move was treating scientific data as a design material rather than hiding it behind PDF links. When complex information is made visible and interactive, it becomes a trust-building asset rather than a usability obstacle. The 'Technical Premium' approach — where every scientific feature is also a brand experience — redefined how the client thinks about their digital presence.",
    journal: [
      {
        phase: "Concept & Strategy",
        entries: [
          {
            title: "The 'Technical Premium' Approach",
            body: "Identified a gap in the essential oils B2B market: competitors either had deep scientific documentation with poor UX, or beautiful design with no technical substance. Proposed a 'Technical Premium' philosophy where every scientific feature is also a brand experience — turning GC/MS data, molecular structures, and compliance documentation into interactive, trust-building design assets rather than hidden PDFs."
          }
        ]
      },
      {
        phase: "Core Experience Development",
        entries: [
          {
            title: "Interactive Chromatogram Engine",
            body: "Built a Canvas 2D chromatogram renderer that plots real EMG (Exponentially Modified Gaussian) peak shapes from GC/MS data. Features include an animated scan line, hover-to-identify tooltips showing compound names and retention times, and a visual legend mapping peaks to molecules. This single feature turned analytical chemistry from a barrier into a hero element."
          },
          {
            title: "3D Molecular Explorer",
            body: "Developed a force-directed molecular graph using Three.js and React Three Fiber. Renders 47 molecules with weighted edges showing chemical relationships, hover glow effects for compound identification, and IFRA restriction rings that visually indicate regulatory boundaries. Each molecule node opens detailed compound information."
          },
          {
            title: "Global Sourcing Globe",
            body: "Created a 3D globe visualization with animated arc dashes tracing shipping routes from India to 5 international ports (New York, London, Dubai, Singapore, Sydney). Each arc animates on scroll, showing sourcing transparency and supply chain visibility."
          }
        ]
      },
      {
        phase: "Content & Internationalization",
        entries: [
          {
            title: "127 Product Pages & Academy",
            body: "Built and populated 127 product pages with GC/MS documentation, Certificate of Analysis builder, IFRA compliance overlays, and badge rules. Each product can be filtered by category, chemical profile, and compliance status. The Academy section includes 8 technical articles and gamified certification paths covering aromatherapy science and quality assessment."
          },
          {
            title: "Bilingual Architecture",
            body: "Implemented full English/Hindi i18n using next-intl with cookie-based detection and SEO-optimized alternate language URLs. All 127 product pages, academy content, and UI elements are translated without code duplication."
          }
        ]
      }
    ]
  },
  {
    slug: "house-of-giriraj",
    title: "House of Giriraj — Luxury Fine Jewelry",
    client: "Shree Giriraj Gems and Jewels",
    subtitle:
      "A luxury digital flagship for a 30-year-old jewelry atelier transitioning from B2B to D2C — powered by Decap CMS and designed around editorial storytelling.",
    role: "Web Development, CMS Architecture, UX Design",
    year: "2026",
    summary:
      "Designed and built a dark, cinematic luxury jewelry site for a 25-year B2B atelier entering the D2C market. Decap CMS gives the client full autonomy over 7 collections while maintaining a premium editorial feel.",
    category: "Luxury Brand Website",
    tags: ["Web Development", "CMS", "Luxury", "E-Commerce", "Decap CMS", "B2B to D2C"],
    techStack: [
      "Vite + Vanilla HTML/CSS/JS",
      "Decap CMS 3.x",
      "GitHub OAuth",
      "Tailwind CSS",
      "Vercel (hosting)",
      "JSON-LD Structured Data",
      "Automated sitemap generation",
      "Cloudinary",
    ],
    keyFeatures: [
      "Decap CMS with 7 product collections and rich media fields",
      "Multi-page luxury funnel (home, collections, product detail, bespoke, heritage, contact)",
      "Automated product sync from CMS to static site",
      "JSON-LD structured data for all products and organization schema",
      "Automated sitemap generation (34+ URLs)",
      "WhatsApp smart enquiry funnel with lead tracking and instant notifications",
      "Bespoke enquiry form capturing GIA certification details for high-value inquiries",
      "Hero + 3 atelier videos with optimized image fallbacks (AVIF/WebP)",
      "Responsive image pipeline with Cloudinary transformations",
      "First-mover luxury jewelry positioning — India's first digital-first high-end jewelry experience",
    ],
    images: {
      hero: "/case-studies/house-of-giriraj/hero.png",
      cover: "/case-studies/house-of-giriraj/diamond-product.jpg",
      logo: "https://house-of-giriraj.vercel.app/assets/images/global/House_of_Giriraj.svg",
    },
    liveUrl: "https://house-of-giriraj.vercel.app",
    metrics: [
      { label: "Collections", value: "7" },
      { label: "Heritage", value: "30+ years" },
      { label: "CMS-managed Products", value: "30+" },
      { label: "Lighthouse Score", value: "90+" },
    ],
    featured: true,
    problem:
      "Shree Giriraj Gems and Jewels, established in 1995, had operated as a B2B manufacturer for 25 years with no online presence. The decision to enter the D2C market for high-end diamond jewelry (₹5 lakh to ₹1 crore) meant building a brand from scratch — no existing website, no social footprint, no retail customers. The challenge was threefold: create a digital-first luxury brand identity for a company with zero consumer presence, build a website that could handle GIA-certified product listings with the trust signals needed for high-value online purchases, and give the client full autonomy over inventory updates without ongoing developer costs or monthly CMS fees.",
    systemOverview: {
      text: "We designed a dark, cinematic experience that treats each product as a collectable artefact. A Decap CMS with 7 category-specific collections (Chokers, Necklaces, Chandeliers, Bracelets, Bangles, Rings, Studs) lets the client manage products through a branded admin panel. The data flow — CMS edits to Markdown files, then synced to the static site — ensures zero server costs and instant load times. JSON-LD structured data was implemented across all product pages for rich search results, and an automated sitemap pipeline ensures all product pages are indexed. A WhatsApp smart enquiry funnel captures high-value leads with instant notifications to the client's team, bridging the gap between digital discovery and personal consultation.",
      diagram: undefined,
    },
    keyChallenges: [
      "Designing a luxury experience that works on slow network connections (target market includes users with variable connectivity)",
      "Building a CMS that non-technical jewelry staff can use comfortably for daily product updates",
      "Managing high-resolution product images and videos without compromising page performance",
      "Creating a bespoke enquiry flow that captures the detail needed for high-value jewelry inquiries",
      "Implementing SEO for a JavaScript-heavy single-page application without a traditional CMS backend",
    ],
    designDecisions: [
      {
        title: "Cinematic dark mode by default",
        text: "The site uses a dark, dramatic palette that puts the jewelry front and centre. Every product image is treated with grayscale-to-colour hover transitions, creating a reveal effect that mirrors the experience of opening a jewelry box.",
      },
      {
        title: "B2B-to-D2C brand architecture",
        text: "The site had to establish a consumer brand identity from scratch — no existing logo recognition, no retail footprint. Every design decision, from the 'Obsidian Gilt — Slow Luxury' palette to the editorial photography treatment, was chosen to signal quality and exclusivity to first-time online buyers making high-value purchases.",
      },
      {
        title: "Decap CMS for client autonomy",
        text: "We chose Decap CMS because the client needed full control over product updates without monthly CMS fees. Seven collection-specific editors map to the client's existing inventory categories, making the mental model intuitive for their team.",
      },
      {
        title: "WhatsApp smart enquiry funnel",
        text: "High-value jewelry purchases require personal consultation. The bespoke enquiry form feeds directly into a WhatsApp-based lead management system, allowing the client's team to respond personally to each inquiry with certification details, pricing, and scheduling — bridging digital discovery with the traditional atelier experience.",
      },
      {
        title: "Static-first performance",
        text: "By using Vite to compile Markdown content into a static site, we achieved Lighthouse scores above 90 on both desktop and mobile. The site loads instantly even on slower connections — critical for the client's target demographic.",
      },
      {
        title: "Automated SEO infrastructure",
        text: "JSON-LD structured data, automated sitemap generation, and Open Graph tags are all generated from the CMS content. Every time a new product is added or updated, the SEO layer regenerates automatically without developer intervention.",
      },
    ],
    interfaceScreens: [
      {
        file: "/case-studies/house-of-giriraj/hero.png",
        caption:
          "Homepage hero — Dark cinematic introduction with video background and value proposition that positions the brand as a sanctuary for exceptional stones.",
      },
      {
        file: "/case-studies/house-of-giriraj/diamond-product.jpg",
        caption:
          "Product detail — Each product page features high-resolution imagery, GIA certification details, and a bespoke enquiry CTA. The layout treats each piece as a collectable artefact.",
      },
      {
        file: "/case-studies/house-of-giriraj/ekta-bracelet.jpg",
        caption:
          "The Ekta Lineage Bracelet — High jewelry piece featuring a 12ct D-Flawless diamond set in platinum, part of the curated archive collection.",
      },
      {
        file: "/case-studies/house-of-giriraj/maharani-necklace.jpg",
        caption:
          "The Maharani Viraasat Necklace — A masterwork of Burmese rubies and structural platinum, echoing the quiet intensity of royal inheritance.",
      },
      {
        file: "/case-studies/house-of-giriraj/raj-tilak-emerald.jpg",
        caption:
          "The Raj Tilak Emerald Parure — Bespoke Kashmir Blue emerald suite with traditional Mughal-inspired settings and contemporary diamond accents.",
      },
    ],
    screenIntro:
      "The site spans five main sections — home, collections, bespoke, heritage, contact — each designed to reflect the brand's commitment to craftsmanship and legacy.",
    impact: [
      "Launched India's first digital-first luxury jewelry experience from a previously B2B-only manufacturer",
      "Production-grade luxury site that the client manages entirely through their CMS",
      "WhatsApp enquiry funnel enabled high-value lead capture without technical overhead",
      "Lighthouse scores exceed 90 on both desktop and mobile",
      "CMS enables the team to add new collections without developer involvement",
      "Zero ongoing hosting costs (static site on Vercel free tier)",
      "First-mover advantage in Indian online high-end jewelry market with no direct competitors",
    ],
    reflection:
      "This project proved that the hardest part of digital luxury is not the design — it is creating a brand where none existed online. The client's transition from 25 years of B2B manufacturing to a D2C digital presence meant every pixel had to carry the weight of first impressions. The most impactful decision was not a visual flourish but a structural one: giving a non-technical team the autonomy to update their own inventory through a familiar CMS interface, while the WhatsApp funnel ensured that high-value enquiries never felt automated.",
    journal: [
      {
        phase: "Discovery & Strategy",
        entries: [
          {
            title: "B2B-to-D2C Brand Architecture",
            body: "The client had operated exclusively in B2B manufacturing for 25 years with zero online presence. The discovery call revealed a critical challenge: building a consumer brand from scratch, targeting high-end buyers (₹5 lakh to ₹1 crore), with no existing logo recognition, no retail footprint, and no direct online competitors in Indian high-end jewelry — a first-mover opportunity that required getting the brand identity right on the first attempt."
          },
          {
            title: "Competitive Analysis & Positioning",
            body: "Analysis of the Indian online jewelry market showed no direct competitors in the high-end segment (₹5 lakh+). International benchmarks (Tiffany, Cartier) provided UX inspiration but couldn't be copied directly due to different market dynamics. The positioning strategy centered on 'India's first digital luxury jewelry experience' — combining traditional craftsmanship with a modern digital-first approach."
          }
        ]
      },
      {
        phase: "Design System & CMS",
        entries: [
          {
            title: "Obsidian Gilt — Slow Luxury Design Language",
            body: "Developed a dark, cinematic design language called 'Obsidian Gilt' that treats each product as a collectable artefact. The palette uses deep obsidian backgrounds with warm gold accents, grayscale-to-colour hover transitions on product images (mirroring the experience of opening a jewelry box), and editorial typography that prioritizes craftsmanship storytelling over commercial messaging."
          },
          {
            title: "Decap CMS with 7 Collections",
            body: "Architected a Decap CMS with 7 category-specific collections (Chokers, Necklaces, Chandeliers, Bracelets, Bangles, Rings, Studs), each with custom fields for GIA certification data, diamond specifications, and rich media. The CMS-to-Markdown-to-static-site pipeline ensures zero server costs, instant load times, and full client autonomy over product updates."
          }
        ]
      },
      {
        phase: "Conversion & Trust Infrastructure",
        entries: [
          {
            title: "WhatsApp Smart Enquiry Funnel",
            body: "High-value jewelry purchases require personal consultation. Built a bespoke enquiry form that feeds into a WhatsApp-based lead management system with instant notifications, lead tracking, and the ability to respond with certification details and scheduling — bridging the gap between digital discovery and the traditional atelier experience."
          },
          {
            title: "SEO & Structured Data",
            body: "Implemented JSON-LD structured data across all product pages (Product schema, Organization schema, FAQ schema), automated sitemap generation covering 34+ URLs, and Open Graph tags. The SEO layer regenerates automatically whenever CMS content is updated, ensuring new collections are indexed without developer intervention."
          }
        ]
      }
    ]
  },
  {
    slug: "batchflow",
    title: "BatchFlow — Education CRM Platform",
    client: "BatchFlow",
    subtitle:
      "Bringing admissions, batches, fees, attendance, and communication into one readable workflow system for coaching centres.",
    role: "Product Design, UX Architecture, Interface Design",
    year: "2026",
    summary:
      "BatchFlow is a coaching-centre CRM shaped around daily institute operations, reducing scattered tools by organizing student workflows, performance tracking, and communication inside one product system.",
    category: "Product Design",
    tags: ["Product Design", "UX Architecture", "Dashboard", "CRM", "EdTech"],
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "REST API",
      "Figma",
    ],
    keyFeatures: [
      "Daily operations dashboard as the primary working surface",
      "Student lifecycle management from inquiry through alumni tracking",
      "Progressive task grouping — breaking large workflows into operational units",
      "Separate modes for operations (execution speed) and intelligence (analytical interpretation)",
      "Fee setup, collection, and payment history per student",
      "Attendance tracking and test record management",
      "Communication history consolidated per student record",
    ],
    images: {
      hero: "/case-studies/batchflow/today-dashboard.png",
      cover: "/case-studies/batchflow/today-dashboard.png",
      diagram: "/case-studies/batchflow/system-diagram.svg",
    },
    liveUrl: undefined,
    metrics: [
      { label: "Modules", value: "7" },
      { label: "User Roles", value: "3+" },
      { label: "Design Phase", value: "2026" },
      { label: "Focus", value: "Operations" },
    ],
    featured: false,
    problem:
      "Coaching centres often run important operations across disconnected tools: spreadsheets for admissions, separate ledgers for fees, messaging apps for communication, and informal tracking for performance and attendance. That fragmentation creates repeated problems: staff switch context constantly, important details are duplicated or lost, follow-up work depends too much on memory, and leadership lacks a clean operational view of the institute.",
    systemOverview: {
      text: "BatchFlow was designed as a single working environment for day-to-day institute needs. The product is organized around the operational lifecycle of a student rather than around isolated admin features. The system connects inquiry and student intake, batch assignment and scheduling, fee setup and collection, attendance and test records, communication history and follow-up, and dashboard reporting for staff and administrators. That flow keeps the product tied to real institute routines, from first contact through ongoing academic management.",
      diagram: "/case-studies/batchflow/system-diagram.svg",
    },
    keyChallenges: [
      "Designing for multiple operational roles (admin, accounts, faculty) without making the interface feel overloaded",
      "Keeping dense information readable for everyday use by non-technical staff",
      "Supporting both record-keeping and action-taking in the same screens",
      "Creating a structure that can expand from core CRM functions into analytics and communication modules",
    ],
    designDecisions: [
      {
        title: "Dashboard as the daily starting point",
        text: "The home screen is designed as a working summary, not a decorative overview. It surfaces classes, fee actions, alerts, and activity so staff can decide what matters first without digging through menus.",
      },
      {
        title: "Progressive task grouping",
        text: "Instead of forcing every workflow into large forms, the system breaks work into smaller operational units such as student setup, batch assignment, payment handling, and follow-up communication. This reduces context-switching and makes each task feel completable.",
      },
      {
        title: "Separate modes for operations and intelligence",
        text: "Operational screens focus on execution speed — quick lookups, fast data entry, minimal clicks. Performance views shift toward interpretation — trends, comparisons, patterns. This distinction helps the product support both administration and academic decision-making without mixing concerns.",
      },
      {
        title: "Familiar visual language",
        text: "The layout uses clear cards, table structures, and low-friction navigation. The goal was to make the product feel trustworthy for repeated institutional use rather than visually experimental. Staff should feel confident using it from day one.",
      },
    ],
    interfaceScreens: [
      {
        file: "today-dashboard.png",
        caption:
          "Daily operations dashboard — Working summary that surfaces classes, fee actions, and alerts first. Addresses progressive task grouping by showing daily priorities at entry.",
      },
      {
        file: "student-management.png",
        caption:
          "Student registration and fee setup — Progressive form breaking large workflows into smaller operational units. Reduces context-switching for admin staff.",
      },
      {
        file: "performance-intelligence.png",
        caption:
          "Performance intelligence view — Separates operational mode (execution speed) from analytical mode (interpretation). Supports both administration and academic decision-making.",
      },
      {
        file: "communication-hub.png",
        caption:
          "Communication and follow-up flow — Consolidates messaging history with student records. Fixes the follow-up depends on memory problem.",
      },
    ],
    screenIntro:
      "These screens show how the product moves from a daily dashboard into deeper operational flows such as student management, performance analysis, and communication history.",
    impact: [
      "Consolidated scattered institute workflows into one clearer product direction",
      "Improved visibility across student records, payments, attendance, and communication",
      "Created a scalable base for future modules such as advanced reports and parent-facing experiences",
      "Turned day-to-day admin work into a more structured, decision-oriented system",
    ],
    reflection:
      "BatchFlow made it clear that workflow design depends on respecting routine. Staff do not need more features thrown onto a screen. They need a system that matches the order in which work actually happens. The most important design choice was staying close to operational reality and letting structure do most of the heavy lifting.",
  },
  {
    slug: "bighi-brothers",
    title: "Bighi Brothers — Modern Vedic Skincare",
    client: "Bighi Brothers",
    subtitle:
      "Designing a ritual, not a store. D2C experience design for a modern Vedic skincare brand.",
    role: "UX Design, Design Systems, D2C Experience",
    year: "2026",
    summary:
      "Bighi Brothers reframed skincare purchasing from a transactional store experience into a guided daily ritual, combining Vedic philosophy with modern minimalism to create an emotionally resonant D2C brand experience.",
    category: "Brand & UX Design",
    tags: ["Interface Design", "Brand Identity", "Design System", "D2C", "E-Commerce"],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Custom Design System",
      "Shopify API",
    ],
    keyFeatures: [
      "Modern Vedic Minimalism — design system blending ancient philosophy with contemporary UI",
      "The 'No-Line' Rule — boundaries established through tonal shifts, not borders",
      "Sacred Threshold concept — designing a digital sanctuary, not a store",
      "Surface Hierarchy with paper-like layers and organic depth",
      "Three-Step Ritual flow (Rupam → Gunam → Vayastya) reducing decision fatigue",
      "Editorial serif + functional sans-serif typography system",
    ],
    images: {
      hero: "/case-studies/bighi-brothers/design-system-screen.png",
      cover: "/case-studies/bighi-brothers/design-system-screen.png",
      diagram: "/case-studies/bighi-brothers/system-diagram.svg",
    },
    liveUrl: undefined,
    metrics: [
      { label: "Screens", value: "4+" },
      { label: "Design Tokens", value: "40+" },
      { label: "Ritual Steps", value: "3" },
      { label: "Category", value: "D2C" },
    ],
    featured: false,
    problem:
      "Skincare today is functional. But usage is emotional. Most D2C skincare brands default to the same transactional store model: product grids, ingredient lists, and checkout flows. Users want clean skincare but feel overwhelmed by too many choices and generic purchasing experiences. The challenge was not just visual. It was about shifting the entire mental model from buying products to practising self-care.",
    systemOverview: {
      text: "We approached Bighi Brothers as a ritual architect, not a store designer. The experience needed to honour the brand's Vedic heritage while feeling modern and premium. The resulting structure centres on the Three-Step Ritual module: Rupam (Outer) — high-contrast imagery that establishes emotional context; Gunam (Inner) — editorial text that explains product philosophy; Vayastya (Lasting) — minimalist CTA that guides the user toward a decision. This structure transforms product browsing into a guided journey, reducing decision fatigue while increasing conversion intent.",
      diagram: "/case-studies/bighi-brothers/system-diagram.svg",
    },
    keyChallenges: [
      "Creating emotional resonance without sacrificing purchase clarity",
      "Translating ancient Vedic philosophy into modern digital interface language",
      "Building a design system flexible enough for editorial storytelling and product commerce",
      "Balancing atmospheric immersion with functional usability",
    ],
    designDecisions: [
      {
        title: "Modern Vedic Minimalism",
        text: "The design system rejects the rigid boxy constraints of traditional e-commerce. Instead, it embraces intentional asymmetry, atmospheric immersion, and ritualistic interfaces where every scroll and click feels deliberate.",
      },
      {
        title: "The No-Line Rule",
        text: "An explicit instruction: no 1px solid borders. Boundaries are established through colour-blocking and tonal shifts, creating organic depth through layered surfaces rather than hard divisions.",
      },
      {
        title: "The Sacred Threshold",
        text: "The creative north star was designing a digital sanctuary, not a store. The Sacred Threshold concept bridges ancient Vedic wisdom with the clinical precision of modern skincare — every interaction feels like a step into a ritual space.",
      },
      {
        title: "Surface Hierarchy and Nesting",
        text: "The UI treats surfaces like layers of handmade paper. The base canvas sits beneath secondary containers, with floating cards in pure white to create natural soft lift without shadows or hard edges.",
      },
      {
        title: "Typography as Dialogue",
        text: "Editorial serif for emotional weight and heritage headlines, paired with functional sans-serif for product descriptions and UI. The contrast creates a premium, conversational voice that moves between storytelling and commerce naturally.",
      },
    ],
    interfaceScreens: [
      {
        file: "overview-screen.jpg",
        caption:
          "Ritual homepage concept — Shows the No-Line design principle in action with tonal shifts instead of borders. Establishes emotional entry before commerce.",
      },
      {
        file: "persona-screen.png",
        caption:
          "User persona and journey — Research deliverable created to align the team on the mental model shift from buying to practising self-care.",
      },
      {
        file: "design-system-screen.png",
        caption:
          "Design system components — Implements the Surface Hierarchy rules (base canvas, secondary containers, floating cards) with the full token architecture.",
      },
      {
        file: "ritual-flow-screen.png",
        caption:
          "Three-step ritual flow — Shows the Rupam → Gunam → Vayastya structure reducing decision fatigue through guided progression.",
      },
    ],
    screenIntro:
      "The screens below show how the design system translates into a cohesive D2C experience, from the ritual homepage through the user journey and into the three-step ritual flow.",
    impact: [
      "Reframed the brand from product-first to experience-first storytelling",
      "Created a design system flexible enough for editorial content and commerce",
      "Reduced user decision fatigue through guided ritual structure",
      "Established a distinctive brand presence in the crowded D2C skincare space",
    ],
    reflection:
      "The most important realization was that conversion does not require clinical efficiency. Emotional entry, guided ritual, and clear decision-making can coexist in a single experience. Designing The Sacred Threshold reinforced that the best D2C experiences do not feel like stores. They feel like invitations into a practice.",
  },
];

export const orderedCaseStudies = caseStudyOrder
  .map((slug) => caseStudies.find((c) => c.slug === slug))
  .filter(Boolean) as CaseStudy[];

export const featuredCaseStudies = caseStudies.filter((c) => c.featured);

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
