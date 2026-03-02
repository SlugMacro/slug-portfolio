import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  DEFAULT_OG_IMAGE,
} from "./siteMetadata";

// NOTE: This file is consumed at build time by vite-plugin-react-meta-map.
// It must export `pages` as a named export with the correct interface.

export interface PageMetaData {
  url: string;
  bundleEntryPoint: string;
  title: string;
  description: string;
  ogImage: string;
  ogType: string;
  ogUrl: string;
}

const staticPages: PageMetaData[] = [
  {
    url: "index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: `${SITE_NAME} | Product Designer`,
    description: SITE_DESCRIPTION,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
    ogUrl: SITE_URL,
  },
  {
    url: "about/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: `About | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
    ogUrl: `${SITE_URL}/about`,
  },
  {
    url: "contact/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: `Contact | ${SITE_NAME}`,
    description: "Have a project in mind? Let's create something great together.",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
    ogUrl: `${SITE_URL}/contact`,
  },
];

// Case study pages — one entry per project slug
const caseStudyPages: PageMetaData[] = [
  {
    url: "case-studies/whales-market/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: `Whales Market | ${SITE_NAME}`,
    description:
      "Advanced Trading Platform cho giao dich Pre-Market, tap trung vao nhom pro traders va high-frequency users.",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "article",
    ogUrl: `${SITE_URL}/case-studies/whales-market`,
  },
  {
    url: "case-studies/whales-predict/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: `Whales Predict | ${SITE_NAME}`,
    description:
      "Prediction Market cho trader dat cuoc vao outcome cua token/event.",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "article",
    ogUrl: `${SITE_URL}/case-studies/whales-predict`,
  },
  {
    url: "case-studies/mention-network/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: `Mention Network | ${SITE_NAME}`,
    description:
      "AI Visibility & Generative Engine Optimization (GEO) platform.",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "article",
    ogUrl: `${SITE_URL}/case-studies/mention-network`,
  },
  {
    url: "case-studies/geo-report/index.html",
    bundleEntryPoint: "/src/main.tsx",
    title: `GeoReport | ${SITE_NAME}`,
    description:
      "Cong cu danh gia mot website co AI-friendly hay khong.",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "article",
    ogUrl: `${SITE_URL}/case-studies/geo-report`,
  },
];

export const pages: PageMetaData[] = [...staticPages, ...caseStudyPages];
