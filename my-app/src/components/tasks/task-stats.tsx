type TaskStatsProps = {
  remaining: number;
  completed: number;
  progress: number;
};

export function TaskStats({ remaining, completed, progress }: TaskStatsProps) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          {remaining} da fare · {completed} completate
        </span>
        <span>{progress}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-card-muted">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
