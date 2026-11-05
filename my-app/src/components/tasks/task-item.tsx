import {
  CheckIcon,
  TrashIcon,
  PencilIcon,
  CloseIcon,
} from "@/components/ui/icons";
import { IconButton } from "@/components/ui/icon-button";
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
        <IconButton
          onClick={onStartEdit}
          aria-label="Modifica"
          className="p-0"
        >
          <PencilIcon className="text-muted" />
        </IconButton>
        <IconButton
          onClick={onRemove}
          aria-label="Elimina"
          variant="danger"
          className="p-0"
        >
          <TrashIcon className="text-muted" />
        </IconButton>
      </div>
    </li>
  );
}
