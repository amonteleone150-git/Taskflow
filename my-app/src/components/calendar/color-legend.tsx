import { eventColorOptions } from "@/lib/calendar";

export function ColorLegend() {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-medium">Legenda colori</h3>
      <div className="flex flex-wrap gap-3">
        {eventColorOptions.map((opt) => (
          <span
            key={opt.value}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white ${opt.bg}`}
          >
            <span className="w-2 h-2 rounded-full bg-white/80" />
            {opt.label}
          </span>
        ))}
      </div>
    </div>
  );
}