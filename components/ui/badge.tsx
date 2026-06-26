import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type BadgeTone =
  | "neutral"
  | "accent"
  | "premium"
  | "success"
  | "warning"
  | "danger";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

const toneClasses: Record<BadgeTone, string> = {
  neutral: "border-border bg-surface-subtle text-muted-strong",
  accent: "border-transparent bg-accent/10 text-accent",
  premium: "border-transparent bg-premium/10 text-premium",
  success: "border-transparent bg-success/10 text-success",
  warning: "border-transparent bg-warning/10 text-warning",
  danger: "border-transparent bg-danger/10 text-danger",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone = "neutral", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-ds-sm border px-2 py-0.5 text-xs font-medium leading-5",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  ),
);

Badge.displayName = "Badge";
