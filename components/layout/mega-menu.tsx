import Link from "next/link";
import { Badge } from "@/components/ui";

type MegaMenuColumn = {
  title: string;
  items: {
    label: string;
    href: string;
    description: string;
    badge?: string;
  }[];
};

const columns: MegaMenuColumn[] = [
  {
    title: "Browse Categories",
    items: [
      {
        label: "Productivity",
        href: "/categories/productivity",
        description: "Task managers, writing tools, tab organizers, and focus extensions.",
      },
      {
        label: "AI Extensions",
        href: "/categories/ai",
        description: "AI assistants, prompt tools, summarizers, and workflow copilots.",
        badge: "Soon",
      },
      {
        label: "Privacy",
        href: "/categories/privacy",
        description: "Ad blockers, password tools, VPN helpers, and tracker protection.",
      },
    ],
  },
  {
    title: "Discovery",
    items: [
      {
        label: "Top Rated",
        href: "/extensions/top-rated",
        description: "A ranked path for trusted, high-signal browser extensions.",
      },
      {
        label: "New Releases",
        href: "/extensions/new",
        description: "Fresh tools and updates from the extension ecosystem.",
      },
      {
        label: "Compare Tools",
        href: "/compare",
        description: "Future-ready comparison surfaces for extension alternatives.",
        badge: "Planned",
      },
    ],
  },
];

export function MegaMenu() {
  return (
    <div className="group relative hidden lg:block">
      <button
        type="button"
        aria-haspopup="true"
        className="inline-flex h-10 items-center gap-1 rounded-ds-md px-3 text-sm font-medium text-muted-strong transition duration-200 ease-[var(--ease-standard)] hover:bg-surface-subtle hover:text-foreground focus-visible:shadow-ds-focus"
      >
        Categories
        <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
          <path
            d="m6 9 6 6 6-6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-[44rem] -translate-x-1/2 opacity-0 transition duration-200 ease-[var(--ease-standard)] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="rounded-ds-lg border border-border bg-surface-raised p-2 shadow-ds-lg ring-1 ring-foreground/5">
          <div className="grid grid-cols-2 gap-2">
            {columns.map((column) => (
              <div key={column.title} className="p-2">
                <p className="px-3 pb-2 text-xs font-semibold uppercase text-muted">
                  {column.title}
                </p>
                <div className="space-y-1">
                  {column.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-ds-md p-3 transition duration-200 ease-[var(--ease-standard)] hover:bg-surface-subtle focus-visible:shadow-ds-focus"
                    >
                      <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        {item.label}
                        {item.badge ? <Badge tone="premium">{item.badge}</Badge> : null}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-muted">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-ds-md border border-border bg-surface-subtle px-4 py-3">
            <p className="text-sm font-medium text-foreground">AI Search foundation</p>
            <p className="mt-1 text-sm text-muted">
              Navigation is structured for category browsing today and natural-language
              extension discovery later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
