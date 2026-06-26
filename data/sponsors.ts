import type { Sponsor } from "@/types";
import { defaultOgImage } from "./shared";

export const sponsors = [
  {
    id: "sponsor-example-secure-workflows",
    slug: "secure-workflows",
    title: "Secure Workflows Sponsorship",
    name: "Secure Workflows",
    description: "A privacy-focused sponsor profile for security and productivity placements.",
    companyUrl: "https://extensionhub.pro/sponsors/secure-workflows",
    logo: {
      src: "/sponsors/secure-workflows.png",
      alt: "Secure Workflows logo",
      width: 512,
      height: 512,
    },
    campaign: {
      name: "Privacy Essentials Launch",
      startsAt: "2026-07-01T00:00:00.000Z",
      endsAt: "2026-09-30T23:59:59.000Z",
      placementIds: ["sponsored-category-privacy-top", "sponsored-newsletter-privacy"],
      targetingCategoryIds: ["category-privacy"],
    },
    disclosure: "Sponsored placements are clearly labeled and reviewed separately from editorial rankings.",
    affiliate: {
      enabled: true,
      network: "partnerstack",
      trackingUrl: "https://extensionhub.pro/out/secure-workflows",
      disclosure: "ExtensionHub Pro may earn compensation for qualifying sponsor referrals.",
      commissionModel: "cpa",
      sponsoredRankBoost: false,
    },
    status: "review",
    createdAt: "2026-06-15T09:00:00.000Z",
    updatedAt: "2026-06-20T09:00:00.000Z",
    seo: {
      title: "Secure Workflows Sponsor Profile",
      description: "Sponsor metadata for privacy-focused placements on ExtensionHub Pro.",
      canonicalPath: "/sponsors/secure-workflows",
      keywords: ["sponsored browser extensions", "privacy sponsor", "ExtensionHub Pro sponsor"],
      noIndex: true,
      openGraph: {
        title: "Secure Workflows Sponsor Profile",
        description: "Sponsor metadata for privacy-focused ExtensionHub Pro placements.",
        type: "website",
        url: "https://extensionhub.pro/sponsors/secure-workflows",
        image: defaultOgImage,
        siteName: "ExtensionHub Pro",
      },
    },
    schema: {
      type: "Organization",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Secure Workflows",
        url: "https://extensionhub.pro/sponsors/secure-workflows",
      },
    },
    internalLinks: [
      {
        label: "Privacy extensions",
        href: "/categories/privacy",
        relationship: "sponsor",
        priority: 7,
      },
    ],
    ai: {
      contentBrief: "Sponsor profile metadata for ad and affiliate operations.",
      targetAudience: ["advertisers", "privacy users"],
      searchIntent: "navigational",
      entityKeywords: ["sponsor", "privacy campaign", "sponsored listings"],
      generationHints: ["Never blend sponsor claims into editorial rankings without disclosure."],
      factCheckRequired: true,
    },
  },
] satisfies Sponsor[];
