import { createId as createIdWithPrefix, readStoredArray, writeStoredJson } from "./storage";

export type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  done: boolean;
  priority: Priority;
  createdAt: number;
};

export type Filter = "all" | "active" | "done";

export const STORAGE_KEY = "taskflow.tasks.v1";

export const priorityLabels: Record<Priority, string> = {
  low: "Bassa",
  medium: "Media",
  high: "Alta",
};

export const priorityStyles: Record<Priority, string> = {
  low: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  high: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export function createId(): string {
  return createIdWithPrefix("task");
}

export function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) return false;
  const task = value as Record<string, unknown>;
  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    typeof task.done === "boolean" &&
    (task.priority === "low" ||
      task.priority === "medium" ||
      task.priority === "high") &&
    typeof task.createdAt === "number"
  );
}

/** Legge i task salvati; ritorna `null` se non esistono dati validi. */
export function loadTasks(): Task[] | null {
  return readStoredArray(STORAGE_KEY, isTask);
}

/** Persiste i task nel localStorage. */
export function saveTasks(tasks: Task[]): void {
  writeStoredJson(STORAGE_KEY, tasks);
}

export const seedTasks: Task[] = [
  {
    id: "seed-1",
    title: "Esplora la pagina Attività",
    done: true,
    priority: "low",
    createdAt: 1,
  },
  {
    id: "seed-2",
    title: "Aggiungi la tua prima attività",
    done: false,
    priority: "high",
    createdAt: 2,
  },
  {
    id: "seed-3",
    title: "Prova il tema chiaro/scuro",
    done: false,
    priority: "medium",
    createdAt: 3,
  },
];
