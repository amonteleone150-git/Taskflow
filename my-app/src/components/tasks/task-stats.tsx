type TaskStatsProps = {
  remaining: number;
  completed: number;
  progress: number;
};

export function TaskStats({ remaining, completed, progress }: TaskStatsProps) {
  return (
    <div className="rounded-lg border border-border-subtle bg-surface px-5 py-4 shadow-subtle">
      <div className="flex items-center justify-between text-sm text-muted">
        <span className="tabular-nums">
          <span className="font-medium text-foreground">{remaining}</span> da
          fare ·{" "}
          <span className="font-medium text-foreground">{completed}</span>{" "}
          completate
        </span>
        <span className="font-medium tabular-nums text-foreground">
          {progress}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-2.5 h-2 overflow-hidden rounded-full bg-surface-muted"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
