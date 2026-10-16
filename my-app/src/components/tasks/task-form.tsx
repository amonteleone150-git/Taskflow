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
      className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center"
    >
      <input
        ref={inputRef}
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        placeholder="Cosa devi fare?"
        className="h-11 flex-1 rounded-xl border bg-card-muted px-4 outline-none transition-colors focus:border-accent"
      />
      <select
        value={priority}
        onChange={(event) => onPriorityChange(event.target.value as Priority)}
        aria-label="Priorità"
        className="h-11 rounded-xl border bg-card-muted px-3 outline-none transition-colors focus:border-accent"
      >
        <option value="low">Bassa</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>
      <button
        type="submit"
        className="h-11 rounded-xl bg-accent px-5 font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        Aggiungi
      </button>
    </form>
  );
}
