import { TaskBoard } from "@/components/tasks/task-board";
import { requireUser } from "@/lib/session";

export const instant = false;

export const metadata = {
  title: "Attività",
  description: "Gestisci le tue attività personali su Taskflow.",
};

export default async function TasksPage() {
  const user = await requireUser();

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <h1 className="mb-8 text-center font-display text-3xl font-bold tracking-[0.01em] text-foreground">
          Attività
        </h1>
        <TaskBoard userId={user.id} />
      </div>
    </div>
  );
}
