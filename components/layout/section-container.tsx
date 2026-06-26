import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { PageContainer } from "./page-container";

export type SectionContainerProps = HTMLAttributes<HTMLElement> & {
  containerSize?: "default" | "wide" | "narrow";
  spacing?: "sm" | "md" | "lg";
};

const spacingClasses = {
  sm: "py-10 sm:py-12",
  md: "py-[var(--space-section-y)]",
  lg: "py-16 sm:py-24",
};

export function SectionContainer({
  children,
  className,
  containerSize = "default",
  spacing = "md",
  ...props
}: SectionContainerProps) {
  return (
    <section className={cn(spacingClasses[spacing], className)} {...props}>
      <PageContainer size={containerSize}>{children}</PageContainer>
    </section>
  );
}
