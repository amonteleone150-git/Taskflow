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
      <div className="flex gap-1 rounded-full border bg-card p-1">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onFilterChange(item.value)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              filter === item.value
                ? "bg-accent text-accent-foreground"
                : "text-muted hover:text-foreground"
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
        className="text-sm text-muted transition-colors hover:text-foreground disabled:opacity-40"
      >
        Elimina completate
      </button>
    </div>
  );
}
