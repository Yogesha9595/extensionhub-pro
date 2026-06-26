import Link from "next/link";
import { Button, SearchBox } from "@/components/ui";
import { MegaMenu } from "./mega-menu";
import { MobileNavigation } from "./mobile-navigation";
import { PageContainer } from "./page-container";
import { ThemeToggle } from "./theme-provider";

const navLinks = [
  { label: "Extensions", href: "/extensions" },
  { label: "AI Search", href: "/search" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <PageContainer>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              href="/"
              aria-label="ExtensionHub Pro home"
              className="flex shrink-0 items-center gap-2 rounded-ds-md focus-visible:shadow-ds-focus"
            >
              <span className="grid size-8 place-items-center rounded-ds-md bg-primary text-sm font-bold text-primary-foreground shadow-ds-xs">
                EH
              </span>
              <span className="hidden text-sm font-semibold text-foreground sm:block">
                ExtensionHub Pro
              </span>
            </Link>
            <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
              <MegaMenu />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex h-10 items-center rounded-ds-md px-3 text-sm font-medium text-muted-strong transition duration-200 ease-[var(--ease-standard)] hover:bg-surface-subtle hover:text-foreground focus-visible:shadow-ds-focus"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="hidden min-w-0 flex-1 justify-center px-2 md:flex">
            <SearchBox
              placeholder="Search extensions or ask AI"
              wrapperClassName="max-w-sm"
              aria-label="Search extensions or ask AI"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <Button className="hidden lg:inline-flex" variant="secondary">
              Submit extension
            </Button>
            <MobileNavigation />
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
