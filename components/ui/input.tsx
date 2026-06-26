import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError = false, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      aria-invalid={hasError || undefined}
      className={cn(
        "flex h-10 w-full rounded-ds-md border bg-surface px-3 text-sm text-foreground shadow-ds-xs transition duration-200 ease-[var(--ease-standard)] placeholder:text-muted focus:border-ring focus:shadow-ds-focus focus:outline-none disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-muted",
        hasError && "border-danger focus:border-danger",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
