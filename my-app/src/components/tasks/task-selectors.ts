import type { Filter, Task } from "@/lib/tasks";

export function filterTasks(tasks: Task[], filter: Filter): Task[] {
  if (filter === "active") return tasks.filter((task) => !task.done);
  if (filter === "done") return tasks.filter((task) => task.done);
  return tasks;
}

export function getTaskStats(tasks: Task[]) {
  const remaining = tasks.filter((task) => !task.done).length;
  const completed = tasks.length - remaining;
  const progress =
    tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  return { remaining, completed, progress };
}
