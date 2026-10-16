import { priorityLabels, priorityStyles, type Task } from "@/lib/tasks";

type TaskItemProps = {
  task: Task;
  editing: boolean;
  draftTitle: string;
  onDraftTitleChange: (value: string) => void;
  onToggle: () => void;
  onRemove: () => void;
  onStartEdit: () => void;
  onCommitEdit: () => void;
  onCancelEdit: () => void;
};

export function TaskItem({
  task,
  editing,
  draftTitle,
  onDraftTitleChange,
  onToggle,
  onRemove,
  onStartEdit,
  onCommitEdit,
  onCancelEdit,
}: TaskItemProps) {
  return (
    <li className="animate-rise group flex items-center gap-3 rounded-xl border bg-card p-3 shadow-sm transition-colors hover:bg-card-muted">
      <button
        type="button"
        onClick={onToggle}
        aria-label={task.done ? "Segna come da fare" : "Segna come completata"}
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${
          task.done
            ? "border-accent bg-accent text-accent-foreground"
            : "hover:border-accent"
        }`}
      >
        {task.done ? "✓" : ""}
      </button>

      {editing ? (
        <input
          autoFocus
          value={draftTitle}
          onChange={(event) => onDraftTitleChange(event.target.value)}
          onBlur={onCommitEdit}
          onKeyDown={(event) => {
            if (event.key === "Enter") onCommitEdit();
            if (event.key === "Escape") onCancelEdit();
          }}
          className="h-8 flex-1 rounded-lg border bg-card-muted px-2 outline-none focus:border-accent"
        />
      ) : (
        <button
          type="button"
          onDoubleClick={onStartEdit}
          onClick={onToggle}
          className={`flex-1 text-left ${task.done ? "text-muted line-through" : ""}`}
        >
          {task.title}
        </button>
      )}

      <span
        className={`rounded-full px-2 py-0.5 text-xs ${priorityStyles[task.priority]}`}
      >
        {priorityLabels[task.priority]}
      </span>

      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
        <button
          type="button"
          onClick={onStartEdit}
          aria-label="Modifica"
          className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-background hover:text-foreground"
        >
          ✏️
        </button>
        <button
          type="button"
          onClick={onRemove}
          aria-label="Elimina"
          className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-background hover:text-rose-500"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
