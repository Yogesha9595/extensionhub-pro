import type { Collection } from "@/types";
import { defaultAdSensePlacements, defaultOgImage } from "./shared";

export const collections = [
  {
    id: "collection-writing-productivity",
    slug: "writing-productivity",
    title: "Best Writing Productivity Extensions",
    name: "Writing Productivity",
    summary: "A curated set of extensions for drafting, editing, clipping, and organizing written work.",
    description: "Writing-focused browser extensions for students, creators, and professional teams.",
    curatorAuthorId: "author-maya-chen",
    extensionIds: ["extension-grammarly", "extension-notion-web-clipper"],
    categoryIds: ["category-productivity"],
    rankingMethod: "editorial",
    updateFrequency: "monthly",
    status: "published",
    createdAt: "2026-06-04T09:00:00.000Z",
    updatedAt: "2026-06-20T09:00:00.000Z",
    seo: {
      title: "Best Writing Productivity Extensions",
      description: "Compare browser extensions for writing, editing, clipping, and organizing research.",
      canonicalPath: "/collections/writing-productivity",
      keywords: ["writing extensions", "editing extensions", "productivity browser tools"],
      openGraph: {
        title: "Best Writing Productivity Extensions",
        description: "Curated writing tools for faster browser workflows.",
        type: "website",
        url: "https://extensionhub.pro/collections/writing-productivity",
        image: defaultOgImage,
        siteName: "ExtensionHub Pro",
      },
    },
    schema: {
      type: "ItemList",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Best Writing Productivity Extensions",
      },
    },
    internalLinks: [
      {
        label: "Productivity category",
        href: "/categories/productivity",
        relationship: "category",
        priority: 8,
      },
    ],
    ai: {
      contentBrief: "Curated collection page for writing productivity extensions.",
      targetAudience: ["students", "professionals", "writers"],
      searchIntent: "commercial",
      entityKeywords: ["writing productivity", "browser writing tools", "Chrome writing extensions"],
      generationHints: ["Explain ranking method and best-fit user for each extension."],
      factCheckRequired: true,
    },
    adsensePlacements: [defaultAdSensePlacements.listInFeed],
  },
] satisfies Collection[];
