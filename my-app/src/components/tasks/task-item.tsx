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
    <li className="animate-rise group flex min-h-12 items-center gap-3 border-b border-border-subtle px-4 py-3 transition-colors last:border-b-0 hover:bg-surface-muted">
      <button
        type="button"
        onClick={onToggle}
        aria-label={task.done ? "Segna come da fare" : "Segna come completata"}
        aria-pressed={task.done}
        className={`grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border-[1.5px] transition-colors ${
          task.done
            ? "border-primary bg-primary text-primary-foreground"
            : "border-input-hover bg-surface hover:border-primary"
        }`}
      >
        {task.done ? <CheckIcon /> : null}
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
          className="h-9 flex-1 rounded-lg border border-border bg-surface px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:shadow-[0_0_0_1px_var(--primary)]"
        />
      ) : (
        <button
          type="button"
          onDoubleClick={onStartEdit}
          onClick={onToggle}
          className={`flex-1 text-left text-sm leading-[1.6] ${
            task.done ? "text-muted line-through" : "text-foreground"
          }`}
        >
          {task.title}
        </button>
      )}

      <span
        className={`rounded px-2 py-0.5 text-xs font-medium ${priorityStyles[task.priority]}`}
      >
        {priorityLabels[task.priority]}
      </span>

      <div className="flex items-center gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100">
        <button
          type="button"
          onClick={onStartEdit}
          aria-label="Modifica"
          className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <PencilIcon />
        </button>
        <button
          type="button"
          onClick={onRemove}
          aria-label="Elimina"
          className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-error-soft hover:text-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      fill="none"
      className="h-2.5 w-2.5"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 6.5 5 9l4.5-5.5" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className="h-[15px] w-[15px]"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.3 2.2a1.4 1.4 0 0 1 2 2L5.8 11.7 2.5 12.5l.8-3.3 8-7Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className="h-[15px] w-[15px]"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4.5h10M6 4.5V3h4v1.5M4.5 4.5l.6 8.2h5.8l.6-8.2M6.5 7v3.5M9.5 7v3.5" />
    </svg>
  );
}
