"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  createId,
  loadTasks,
  saveTasks,
  seedTasks,
  type Filter,
  type Priority,
  type Task,
} from "@/lib/tasks";

/**
 * Gestisce stato, persistenza e operazioni CRUD delle attività.
 * Estratto da task-board.tsx per separare la logica dalla presentazione.
 */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [filter, setFilter] = useState<Filter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Caricamento iniziale dal localStorage.
  useEffect(() => {
    setTasks(loadTasks() ?? seedTasks);
    setLoaded(true);
  }, []);

  // Persistenza ad ogni modifica.
  useEffect(() => {
    if (!loaded) return;
    saveTasks(tasks);
  }, [tasks, loaded]);

  function addTask(event: React.FormEvent) {
    event.preventDefault();
    const value = title.trim();
    if (!value) {
      inputRef.current?.focus();
      return;
    }
    setTasks((prev) => [
      {
        id: createId(),
        title: value,
        done: false,
        priority,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
    setTitle("");
    setPriority("medium");
    inputRef.current?.focus();
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function startEdit(task: Task) {
    setEditingId(task.id);
    setDraftTitle(task.title);
  }

  function commitEdit() {
    if (editingId === null) return;
    const value = draftTitle.trim();
    if (value) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingId ? { ...task, title: value } : task,
        ),
      );
    }
    setEditingId(null);
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((task) => !task.done));
  }

  const visible = useMemo(() => {
    if (filter === "active") return tasks.filter((task) => !task.done);
    if (filter === "done") return tasks.filter((task) => task.done);
    return tasks;
  }, [tasks, filter]);

  const remaining = tasks.filter((task) => !task.done).length;
  const completed = tasks.length - remaining;
  const progress =
    tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  return {
    loaded,
    title,
    setTitle,
    priority,
    setPriority,
    filter,
    setFilter,
    editingId,
    setEditingId,
    draftTitle,
    setDraftTitle,
    inputRef,
    addTask,
    toggleTask,
    removeTask,
    startEdit,
    commitEdit,
    clearCompleted,
    visible,
    remaining,
    completed,
    progress,
  };
}
