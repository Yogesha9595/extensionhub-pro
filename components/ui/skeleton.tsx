import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-ds-md bg-surface-muted motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  ),
);

Skeleton.displayName = "Skeleton";
