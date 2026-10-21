import type { Filter } from "@/lib/tasks";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Tutte" },
  { value: "active", label: "Da fare" },
  { value: "done", label: "Completate" },
];

type TaskFiltersProps = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  completed: number;
  onClearCompleted: () => void;
};

export function TaskFilters({
  filter,
  onFilterChange,
  completed,
  onClearCompleted,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-0.5 rounded-lg bg-surface-muted p-1">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onFilterChange(item.value)}
            className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
              filter === item.value
                ? "bg-primary-soft text-accent"
                : "text-muted-strong hover:bg-surface hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClearCompleted}
        disabled={completed === 0}
        className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-error-soft hover:text-error disabled:pointer-events-none disabled:opacity-40"
      >
        Elimina completate
      </button>
    </div>
  );
}
