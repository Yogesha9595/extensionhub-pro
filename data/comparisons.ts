import type { Comparison } from "@/types";
import { defaultAdSensePlacements, defaultOgImage } from "./shared";

export const comparisons = [
  {
    id: "comparison-grammarly-alternatives",
    slug: "grammarly-alternatives",
    title: "Best Grammarly Alternatives for Chrome",
    description: "Compare Grammarly with alternative writing assistants for browser-based editing and rewrites.",
    primaryExtensionId: "extension-grammarly",
    comparedExtensionIds: ["extension-grammarly"],
    categoryId: "category-productivity",
    criteria: [
      {
        label: "Writing quality",
        description: "How useful the suggestions are for clarity, tone, and correctness.",
        weight: 35,
      },
      {
        label: "Browser coverage",
        description: "How consistently the extension works across common writing surfaces.",
        weight: 25,
      },
      {
        label: "Privacy controls",
        description: "How clearly users can understand and manage data handling.",
        weight: 20,
      },
      {
        label: "Value",
        description: "How well pricing maps to everyday writing needs.",
        weight: 20,
      },
    ],
    entries: [
      {
        extensionId: "extension-grammarly",
        rank: 1,
        bestFor: "General writing assistance across emails, docs, and web forms.",
        score: 89,
        highlights: ["Polished suggestions", "Broad website support", "Strong onboarding"],
        limitations: ["Best features require paid plan", "Requires privacy review for sensitive text"],
      },
    ],
    verdict: "Grammarly remains a strong default for general writing help, especially when users value polish and broad browser support.",
    adsensePlacements: [defaultAdSensePlacements.articleInContent],
    status: "published",
    createdAt: "2026-06-05T09:00:00.000Z",
    updatedAt: "2026-06-20T09:00:00.000Z",
    seo: {
      title: "Best Grammarly Alternatives for Chrome in 2026",
      description: "Compare Grammarly alternatives by writing quality, browser coverage, privacy controls, and value.",
      canonicalPath: "/compare/grammarly-alternatives",
      keywords: ["Grammarly alternatives", "AI writing extension comparison", "Chrome writing tools"],
      openGraph: {
        title: "Best Grammarly Alternatives for Chrome",
        description: "A structured comparison of writing assistant extensions.",
        type: "article",
        url: "https://extensionhub.pro/compare/grammarly-alternatives",
        image: defaultOgImage,
        siteName: "ExtensionHub Pro",
      },
    },
    schema: {
      type: "WebPage",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Best Grammarly Alternatives for Chrome",
      },
    },
    internalLinks: [
      {
        label: "Grammarly review",
        href: "/extensions/grammarly",
        relationship: "comparison",
        priority: 10,
      },
    ],
    ai: {
      contentBrief: "Comparison page for Grammarly and similar writing assistants.",
      targetAudience: ["students", "professionals", "writers"],
      searchIntent: "comparison",
      entityKeywords: ["Grammarly alternatives", "writing assistant comparison", "AI writing tools"],
      generationHints: ["Use transparent criteria and avoid unsupported superiority claims."],
      factCheckRequired: true,
    },
  },
] satisfies Comparison[];
