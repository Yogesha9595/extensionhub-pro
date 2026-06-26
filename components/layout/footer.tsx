import Link from "next/link";
import { PageContainer } from "./page-container";

const footerSections = [
  {
    title: "Directory",
    links: [
      { label: "Extensions", href: "/extensions" },
      { label: "Categories", href: "/categories" },
      { label: "AI Search", href: "/search" },
      { label: "Top Rated", href: "/extensions/top-rated" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Submit Extension", href: "/submit" },
      { label: "Sponsored Listings", href: "/sponsors" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Review Policy", href: "/review-policy" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-subtle">
      <PageContainer>
        <div className="grid gap-10 py-12 md:grid-cols-[1.2fr_2fr] lg:py-16">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-ds-md focus-visible:shadow-ds-focus"
            >
              <span className="grid size-8 place-items-center rounded-ds-md bg-primary text-sm font-bold text-primary-foreground">
                EH
              </span>
              <span className="text-sm font-semibold text-foreground">
                ExtensionHub Pro
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              A premium browser extension directory built for discovery,
              comparison, and future AI-assisted search.
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="grid gap-8 sm:grid-cols-3"
          >
            {footerSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-sm font-semibold text-foreground">
                  {section.title}
                </h2>
                <ul className="mt-3 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition duration-200 ease-[var(--ease-standard)] hover:text-foreground focus-visible:shadow-ds-focus"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-border py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} ExtensionHub Pro.</p>
          <p>Built for fast, accessible extension discovery.</p>
        </div>
      </PageContainer>
    </footer>
  );
}
