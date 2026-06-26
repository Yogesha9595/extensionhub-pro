"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { SearchBox } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-provider";

type MobileNavigationLink = {
  label: string;
  href: string;
  description?: string;
};

const links: MobileNavigationLink[] = [
  { label: "Categories", href: "/categories", description: "Browse by workflow" },
  { label: "Extensions", href: "/extensions", description: "Explore the directory" },
  { label: "AI Search", href: "/search", description: "Future discovery surface" },
  { label: "Blog", href: "/blog", description: "Guides and rankings" },
];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);

    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex size-10 items-center justify-center rounded-ds-md border border-border bg-surface text-foreground shadow-ds-xs transition duration-200 ease-[var(--ease-standard)] hover:bg-surface-subtle focus-visible:shadow-ds-focus"
      >
        <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
          {isOpen ? (
            <path
              d="m6 6 12 12M18 6 6 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          ) : (
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          )}
        </svg>
      </button>
      <div
        id={menuId}
        className={cn(
          "absolute inset-x-0 top-full z-40 border-b border-border bg-background/95 px-[var(--space-page-x)] py-4 shadow-ds-lg backdrop-blur-xl transition duration-200 ease-[var(--ease-standard)]",
          isOpen ? "block" : "hidden",
        )}
      >
        <div className="mx-auto max-w-7xl space-y-4">
          <SearchBox placeholder="Search extensions or ask AI" />
          <nav aria-label="Mobile navigation" className="grid gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-ds-md border border-border bg-surface p-3 shadow-ds-xs transition duration-200 ease-[var(--ease-standard)] hover:bg-surface-subtle focus-visible:shadow-ds-focus"
              >
                <span className="block text-sm font-semibold text-foreground">
                  {link.label}
                </span>
                {link.description ? (
                  <span className="mt-1 block text-sm text-muted">
                    {link.description}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-between rounded-ds-md border border-border bg-surface p-3">
            <span className="text-sm font-medium text-muted-strong">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
