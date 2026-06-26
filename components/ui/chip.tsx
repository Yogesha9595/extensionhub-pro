import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
};

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, selected = false, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-pressed={selected}
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-ds-md border px-3 text-sm font-medium transition duration-200 ease-[var(--ease-standard)] focus-visible:shadow-ds-focus disabled:pointer-events-none disabled:opacity-50",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-surface text-muted-strong hover:border-border-strong hover:bg-surface-subtle",
        className,
      )}
      {...props}
    />
  ),
);

Chip.displayName = "Chip";
