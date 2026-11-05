import type {
  HTMLAttributes,
} from "react";

export const cardSurface =
  "rounded-lg border border-border-subtle bg-surface shadow-subtle";

/** Superficie base delle card del design system. */
export function Card({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${cardSurface} ${className}`.trim()} {...props} />
  );
}
