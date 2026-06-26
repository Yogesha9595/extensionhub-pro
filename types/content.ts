export type ContentStatus = "draft" | "review" | "published" | "archived";

export type SchemaType =
  | "Article"
  | "BlogPosting"
  | "BreadcrumbList"
  | "CollectionPage"
  | "ItemList"
  | "Organization"
  | "Person"
  | "Product"
  | "Review"
  | "SoftwareApplication"
  | "WebPage";

export type JsonPrimitive = boolean | null | number | string;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataUrl?: string;
}

export interface OpenGraphFields {
  title: string;
  description: string;
  type: "article" | "profile" | "website";
  url: string;
  image: ImageAsset;
  siteName?: string;
  locale?: string;
}

export interface SeoFields {
  title: string;
  description: string;
  canonicalPath: string;
  keywords: string[];
  noIndex?: boolean;
  openGraph: OpenGraphFields;
}

export interface SchemaOrgFields {
  type: SchemaType;
  jsonLd: Record<string, JsonValue>;
}

export interface InternalLink {
  label: string;
  href: string;
  relationship:
    | "alternative"
    | "category"
    | "comparison"
    | "collection"
    | "guide"
    | "related"
    | "sponsor";
  priority: number;
}

export interface AiContentMetadata {
  contentBrief: string;
  targetAudience: string[];
  searchIntent:
    | "commercial"
    | "comparison"
    | "informational"
    | "navigational"
    | "transactional";
  entityKeywords: string[];
  generationHints: string[];
  factCheckRequired: boolean;
  lastHumanReviewedAt?: string;
}

export interface AdSensePlacement {
  id: string;
  slot: string;
  format: "banner" | "fluid" | "in-article" | "in-feed" | "multiplex";
  pagePosition: "after-content" | "after-hero" | "in-list" | "sidebar" | "sticky-footer";
  density: "low" | "medium" | "high";
  enabled: boolean;
}

export interface AffiliateMetadata {
  enabled: boolean;
  network?: "direct" | "impact" | "partnerstack" | "shareasale" | "other";
  trackingUrl?: string;
  disclosure: string;
  commissionModel?: "cpa" | "cpc" | "cpl" | "revenue-share";
  sponsoredRankBoost?: boolean;
}

export interface BaseContent {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
  seo: SeoFields;
  schema: SchemaOrgFields;
  internalLinks: InternalLink[];
  ai: AiContentMetadata;
}

export interface RatingSummary {
  average: number;
  count: number;
  source: "chrome-web-store" | "editorial" | "user";
}

export interface PricingPlan {
  label: string;
  price: string;
  billingCycle?: "monthly" | "one-time" | "yearly";
}

export interface Extension extends BaseContent {
  name: string;
  shortName: string;
  categoryIds: string[];
  collectionIds: string[];
  developer: string;
  websiteUrl: string;
  chromeWebStoreUrl: string;
  installUrl: string;
  logo: ImageAsset;
  screenshots: ImageAsset[];
  rating: RatingSummary;
  pricing: {
    model: "free" | "freemium" | "paid" | "trial";
    plans: PricingPlan[];
  };
  browsers: ("brave" | "chrome" | "edge" | "firefox" | "opera")[];
  platforms: ("desktop" | "mobile")[];
  permissions: string[];
  features: string[];
  pros: string[];
  cons: string[];
  useCases: string[];
  privacyNotes: string;
  version?: string;
  lastUpdatedAt?: string;
  affiliate: AffiliateMetadata;
  adsensePlacements: AdSensePlacement[];
}

export interface Category extends BaseContent {
  name: string;
  iconName: string;
  parentCategoryId?: string;
  extensionIds: string[];
  featuredExtensionIds: string[];
  audienceSegments: string[];
  editorialSummary: string;
  adsensePlacements: AdSensePlacement[];
}

export interface Collection extends BaseContent {
  name: string;
  summary: string;
  curatorAuthorId: string;
  extensionIds: string[];
  categoryIds: string[];
  rankingMethod: "editorial" | "hybrid" | "popularity" | "rating";
  updateFrequency: "monthly" | "quarterly" | "weekly";
  adsensePlacements: AdSensePlacement[];
}

export interface ComparisonCriterion {
  label: string;
  description: string;
  weight: number;
}

export interface ComparisonEntry {
  extensionId: string;
  rank: number;
  bestFor: string;
  score: number;
  highlights: string[];
  limitations: string[];
}

export interface Comparison extends BaseContent {
  primaryExtensionId: string;
  comparedExtensionIds: string[];
  categoryId: string;
  criteria: ComparisonCriterion[];
  entries: ComparisonEntry[];
  verdict: string;
  adsensePlacements: AdSensePlacement[];
}

export interface BlogPost extends BaseContent {
  excerpt: string;
  authorId: string;
  categoryIds: string[];
  relatedExtensionIds: string[];
  relatedCollectionIds: string[];
  publishedAt: string;
  readingTimeMinutes: number;
  heroImage: ImageAsset;
  tags: string[];
  contentFormat: "guide" | "listicle" | "news" | "review" | "tutorial";
  monetization: {
    affiliateEnabled: boolean;
    sponsorIds: string[];
    adsensePlacements: AdSensePlacement[];
  };
}

export interface Author extends BaseContent {
  name: string;
  role: string;
  bio: string;
  avatar: ImageAsset;
  expertise: string[];
  socialLinks: {
    label: string;
    url: string;
  }[];
}

export interface Sponsor extends BaseContent {
  name: string;
  companyUrl: string;
  logo: ImageAsset;
  campaign: {
    name: string;
    startsAt: string;
    endsAt: string;
    placementIds: string[];
    targetingCategoryIds: string[];
  };
  disclosure: string;
  affiliate: AffiliateMetadata;
}
