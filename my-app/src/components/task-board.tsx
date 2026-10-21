"use client";

import { TaskFilters } from "@/components/tasks/task-filters";
import { TaskForm } from "@/components/tasks/task-form";
import { TaskItem } from "@/components/tasks/task-item";
import { TaskStats } from "@/components/tasks/task-stats";
import { useTasks } from "@/components/tasks/use-tasks";

export function TaskBoard() {
  const {
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
  } = useTasks();

  return (
    <div className="flex flex-col gap-6">
      <TaskForm
        title={title}
        onTitleChange={setTitle}
        priority={priority}
        onPriorityChange={setPriority}
        inputRef={inputRef}
        onSubmit={addTask}
      />

      <TaskStats
        remaining={remaining}
        completed={completed}
        progress={progress}
      />

      <TaskFilters
        filter={filter}
        onFilterChange={setFilter}
        completed={completed}
        onClearCompleted={clearCompleted}
      />

      {visible.length > 0 && (
        <ul className="flex flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-subtle">
          {visible.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              editing={editingId === task.id}
              draftTitle={draftTitle}
              onDraftTitleChange={setDraftTitle}
              onToggle={() => toggleTask(task.id)}
              onRemove={() => removeTask(task.id)}
              onStartEdit={() => startEdit(task)}
              onCommitEdit={commitEdit}
              onCancelEdit={() => setEditingId(null)}
            />
          ))}
        </ul>
      )}

      {loaded && visible.length === 0 && (
        <p className="rounded-lg border border-dashed border-border bg-surface py-12 text-center text-sm text-muted">
          Nessuna attività qui. Aggiungine una per iniziare! ✨
        </p>
      )}
    </div>
  );
}