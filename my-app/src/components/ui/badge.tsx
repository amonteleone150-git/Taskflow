import type { HTMLAttributes } from "react";

export const badge =
  "inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-soft px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent";

export function Badge({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`${badge} ${className}`.trim()} {...{ children }} />
  );
}
