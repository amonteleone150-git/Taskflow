import type { RefObject } from "react";
import type { Priority } from "@/lib/tasks";

type TaskFormProps = {
  title: string;
  onTitleChange: (value: string) => void;
  priority: Priority;
  onPriorityChange: (value: Priority) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  onSubmit: (event: React.FormEvent) => void;
};

export function TaskForm({
  title,
  onTitleChange,
  priority,
  onPriorityChange,
  inputRef,
  onSubmit,
}: TaskFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-4 shadow-subtle sm:flex-row sm:items-center sm:p-5"
    >
      <label htmlFor="task-title" className="sr-only">
        Titolo attività
      </label>
      <input
        id="task-title"
        ref={inputRef}
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        placeholder="Cosa devi fare?"
        className="h-[42px] flex-1 rounded-lg border border-border bg-surface px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-subtle hover:border-input-hover focus:border-primary focus:shadow-[0_0_0_1px_var(--primary)]"
      />
      <select
        value={priority}
        onChange={(event) => onPriorityChange(event.target.value as Priority)}
        aria-label="Priorità"
        className="h-[42px] rounded-lg border border-border bg-surface px-3 text-sm text-foreground outline-none transition-colors hover:border-input-hover focus:border-primary focus:shadow-[0_0_0_1px_var(--primary)]"
      >
        <option value="low">Bassa</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>
      <button
        type="submit"
        className="h-[42px] rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-subtle transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Aggiungi
      </button>
    </form>
  );
}
