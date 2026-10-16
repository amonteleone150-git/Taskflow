"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "taskflow-theme";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    const initial: Theme =
      stored === "dark" || stored === "light"
        ? stored
        : prefersDark
          ? "dark"
          : "light";
    setTheme(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, ready]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Attiva tema chiaro" : "Attiva tema scuro"}
      title={isDark ? "Tema chiaro" : "Tema scuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-card text-base transition-colors hover:bg-card-muted"
    >
      <span aria-hidden>{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}