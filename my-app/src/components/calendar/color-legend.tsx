import { eventColorOptions } from "@/lib/calendar";

export function ColorLegend() {
  return (
    <div className="rounded-lg border border-border-subtle bg-surface p-4 shadow-subtle">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">
        Legenda colori
      </h3>
      <div className="flex flex-wrap gap-2">
        {eventColorOptions.map((opt) => (
          <span
            key={opt.value}
            className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium text-white ${opt.bg}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            {opt.label}
          </span>
        ))}
      </div>
    </div>
  );
}
