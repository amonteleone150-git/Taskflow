"use client";

import { TaskBoard } from "@/components/task-board";

export default function TasksPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <h1 className="mb-8 text-center font-display text-3xl font-bold tracking-[0.01em] text-foreground">
          Attività
        </h1>
        <TaskBoard />
      </div>
    </div>
  );
}