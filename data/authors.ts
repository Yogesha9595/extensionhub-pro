import type { Author } from "@/types";
import { defaultOgImage } from "./shared";

export const authors = [
  {
    id: "author-maya-chen",
    slug: "maya-chen",
    title: "Maya Chen",
    name: "Maya Chen",
    role: "Editor, Productivity and Browser Workflows",
    description: "Editor focused on browser productivity, privacy, and extension UX.",
    bio: "Maya reviews browser extensions through the lens of practical workflows, privacy expectations, and long-term reliability.",
    avatar: {
      src: "/authors/maya-chen.png",
      alt: "Portrait of Maya Chen",
      width: 512,
      height: 512,
    },
    expertise: ["productivity", "privacy", "browser workflows", "extension reviews"],
    socialLinks: [
      { label: "Website", url: "https://extensionhub.pro/authors/maya-chen" },
    ],
    status: "published",
    createdAt: "2026-06-01T09:00:00.000Z",
    updatedAt: "2026-06-20T09:00:00.000Z",
    seo: {
      title: "Maya Chen - ExtensionHub Pro Author",
      description: "Read extension reviews and productivity guides by Maya Chen.",
      canonicalPath: "/authors/maya-chen",
      keywords: ["extension reviews", "browser productivity", "Maya Chen"],
      openGraph: {
        title: "Maya Chen - ExtensionHub Pro",
        description: "ExtensionHub Pro editor for browser productivity and privacy.",
        type: "profile",
        url: "https://extensionhub.pro/authors/maya-chen",
        image: defaultOgImage,
        siteName: "ExtensionHub Pro",
      },
    },
    schema: {
      type: "Person",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Maya Chen",
        jobTitle: "Editor",
        url: "https://extensionhub.pro/authors/maya-chen",
      },
    },
    internalLinks: [
      {
        label: "Productivity extensions",
        href: "/categories/productivity",
        relationship: "category",
        priority: 8,
      },
    ],
    ai: {
      contentBrief: "Author profile for an ExtensionHub Pro editor.",
      targetAudience: ["developers", "students", "professionals"],
      searchIntent: "navigational",
      entityKeywords: ["Maya Chen", "extension reviews", "browser productivity"],
      generationHints: ["Keep author bios concise and credibility-focused."],
      factCheckRequired: true,
      lastHumanReviewedAt: "2026-06-20T09:00:00.000Z",
    },
  },
] satisfies Author[];
