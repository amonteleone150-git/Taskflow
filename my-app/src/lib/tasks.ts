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

/**
 * Chiave localStorage isolata per utente: i dati di un account non sono
 * visibili agli altri account nello stesso browser.
 */
export function getTasksStorageKey(userId: string): string {
  return `${STORAGE_KEY}.${userId}`;
}

export const priorityLabels: Record<Priority, string> = {
  low: "Bassa",
  medium: "Media",
  high: "Alta",
};

export const priorityStyles: Record<Priority, string> = {
  low: "bg-success-soft text-success",
  medium: "bg-warning-soft text-warning",
  high: "bg-error-soft text-error",
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

/** Legge i task dell'utente; ritorna `null` se non esistono dati validi. */
export function loadTasks(userId: string): Task[] | null {
  return readStoredArray(getTasksStorageKey(userId), isTask);
}

/** Persiste i task dell'utente nel localStorage. */
export function saveTasks(userId: string, tasks: Task[]): void {
  writeStoredJson(getTasksStorageKey(userId), tasks);
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