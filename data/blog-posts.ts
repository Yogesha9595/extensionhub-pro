import type { BlogPost } from "@/types";
import { defaultAdSensePlacements, defaultOgImage } from "./shared";

export const blogPosts = [
  {
    id: "post-choose-safe-chrome-extensions",
    slug: "choose-safe-chrome-extensions",
    title: "How to Choose Safe Chrome Extensions",
    excerpt: "A practical checklist for reviewing permissions, privacy policies, ratings, and developer trust before installing an extension.",
    description: "Learn how to evaluate Chrome extensions for safety, privacy, and long-term reliability.",
    authorId: "author-maya-chen",
    categoryIds: ["category-privacy", "category-productivity"],
    relatedExtensionIds: ["extension-ublock-origin", "extension-grammarly"],
    relatedCollectionIds: ["collection-writing-productivity"],
    publishedAt: "2026-06-12T09:00:00.000Z",
    readingTimeMinutes: 7,
    heroImage: {
      src: "/blog/choose-safe-chrome-extensions.png",
      alt: "Browser extension permission checklist",
      width: 1280,
      height: 720,
    },
    tags: ["privacy", "security", "chrome extensions", "browser safety"],
    contentFormat: "guide",
    monetization: {
      affiliateEnabled: true,
      sponsorIds: [],
      adsensePlacements: [defaultAdSensePlacements.articleInContent],
    },
    status: "published",
    createdAt: "2026-06-10T09:00:00.000Z",
    updatedAt: "2026-06-20T09:00:00.000Z",
    seo: {
      title: "How to Choose Safe Chrome Extensions",
      description: "Use this practical checklist to evaluate Chrome extension permissions, privacy policies, reviews, and developer trust.",
      canonicalPath: "/blog/choose-safe-chrome-extensions",
      keywords: ["safe Chrome extensions", "extension permissions", "browser extension privacy"],
      openGraph: {
        title: "How to Choose Safe Chrome Extensions",
        description: "A practical safety checklist before installing browser extensions.",
        type: "article",
        url: "https://extensionhub.pro/blog/choose-safe-chrome-extensions",
        image: defaultOgImage,
        siteName: "ExtensionHub Pro",
      },
    },
    schema: {
      type: "BlogPosting",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: "How to Choose Safe Chrome Extensions",
        author: {
          "@type": "Person",
          name: "Maya Chen",
        },
        datePublished: "2026-06-12T09:00:00.000Z",
      },
    },
    internalLinks: [
      {
        label: "Best privacy extensions",
        href: "/categories/privacy",
        relationship: "category",
        priority: 9,
      },
      {
        label: "uBlock Origin review",
        href: "/extensions/ublock-origin",
        relationship: "related",
        priority: 8,
      },
    ],
    ai: {
      contentBrief: "Educational guide about assessing extension safety.",
      targetAudience: ["students", "professionals", "privacy users"],
      searchIntent: "informational",
      entityKeywords: ["extension safety", "Chrome permissions", "privacy policy"],
      generationHints: ["Use a checklist format and avoid alarmist claims."],
      factCheckRequired: true,
      lastHumanReviewedAt: "2026-06-20T09:00:00.000Z",
    },
  },
] satisfies BlogPost[];
