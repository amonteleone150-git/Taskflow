"use client";

import { TaskBoard } from "@/components/task-board";

export default function TasksPage() {
  return (
    <div className="flex flex-1 flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl">
        <h1 className="mb-8 text-3xl font-semibold tracking-tight text-center">
          Attività
        </h1>
        <TaskBoard />
      </div>
    </div>
  );
}