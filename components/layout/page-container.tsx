import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type PageContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "wide" | "narrow";
};

const sizeClasses = {
  default: "max-w-7xl",
  wide: "max-w-[90rem]",
  narrow: "max-w-4xl",
};

export function PageContainer({
  className,
  size = "default",
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--space-page-x)]",
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
