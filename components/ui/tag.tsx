import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type TagTone = "neutral" | "accent" | "premium";

export type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: TagTone;
};

const toneClasses: Record<TagTone, string> = {
  neutral: "bg-surface-subtle text-muted-strong",
  accent: "bg-accent/10 text-accent",
  premium: "bg-premium/10 text-premium",
};

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, tone = "neutral", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-ds-xs px-1.5 py-0.5 text-xs font-medium leading-5",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  ),
);

Tag.displayName = "Tag";
