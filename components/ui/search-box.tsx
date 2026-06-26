import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type SearchBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  wrapperClassName?: string;
};

export const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ className, wrapperClassName, placeholder = "Search", ...props }, ref) => (
    <div className={cn("relative w-full", wrapperClassName)}>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
      <input
        ref={ref}
        type="search"
        placeholder={placeholder}
        className={cn(
          "h-11 w-full rounded-ds-md border bg-surface py-2 pl-10 pr-3 text-sm text-foreground shadow-ds-xs transition duration-200 ease-[var(--ease-standard)] placeholder:text-muted focus:border-ring focus:shadow-ds-focus focus:outline-none disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-muted",
          className,
        )}
        {...props}
      />
    </div>
  ),
);

SearchBox.displayName = "SearchBox";
