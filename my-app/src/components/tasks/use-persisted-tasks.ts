"use client";

import { useEffect, useState } from "react";
import { loadTasks, saveTasks, seedTasks, type Task } from "@/lib/tasks";

/** Carica e persiste i task dell'utente corrente nel localStorage. */
export function usePersistedTasks(userId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);

  const loaded = loadedFor === userId;

  // Caricamento iniziale dei soli task dell'utente corrente.
  useEffect(() => {
    setTasks(loadTasks(userId) ?? seedTasks);
    setLoadedFor(userId);
  }, [userId]);

  // Persistenza ad ogni modifica, solo dopo aver caricato i dati dell'utente.
  useEffect(() => {
    if (!loaded) return;
    saveTasks(userId, tasks);
  }, [tasks, userId, loaded]);

  return { loaded, tasks, setTasks };
}
