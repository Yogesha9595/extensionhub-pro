import type { AdSensePlacement, ImageAsset } from "@/types";

export const defaultOgImage = {
  src: "/og/extensionhub-pro.png",
  alt: "ExtensionHub Pro browser extension directory",
  width: 1200,
  height: 630,
} satisfies ImageAsset;

export const defaultAdSensePlacements = {
  directoryAfterHero: {
    id: "ads-directory-after-hero",
    slot: "directory_after_hero",
    format: "banner",
    pagePosition: "after-hero",
    density: "low",
    enabled: true,
  },
  listInFeed: {
    id: "ads-list-in-feed",
    slot: "list_in_feed",
    format: "in-feed",
    pagePosition: "in-list",
    density: "medium",
    enabled: true,
  },
  articleInContent: {
    id: "ads-article-in-content",
    slot: "article_in_content",
    format: "in-article",
    pagePosition: "after-content",
    density: "medium",
    enabled: true,
  },
} satisfies Record<string, AdSensePlacement>;
