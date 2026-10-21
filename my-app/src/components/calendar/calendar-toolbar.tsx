export type CalendarView =
  | "dayGridMonth"
  | "timeGridWeek"
  | "timeGridDay"
  | "listMonth";

const views = [
  { value: "dayGridMonth", label: "Mese" },
  { value: "timeGridWeek", label: "Settimana" },
  { value: "timeGridDay", label: "Giorno" },
  { value: "listMonth", label: "Agenda" },
] as const;

type CalendarToolbarProps = {
  view: CalendarView;
  /** Titolo del periodo corrente (es. "ottobre 2026"), fornito da FullCalendar. */
  periodLabel: string;
  onViewChange: (view: CalendarView) => void;
  onPrev: () => void;
  onNext: () => void;
  onCreate: () => void;
};

export function CalendarToolbar({
  view,
  periodLabel,
  onViewChange,
  onPrev,
  onNext,
  onCreate,
}: CalendarToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-3 shadow-subtle sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4">
      <div className="flex items-baseline gap-2">
        <h2 className="font-display text-lg font-semibold tracking-[0.01em] text-foreground sm:text-[22px]">
          Calendario
        </h2>
        <span className="text-sm font-medium text-muted">{periodLabel}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div
          className="flex items-center rounded-lg border border-border bg-surface p-0.5"
          role="group"
          aria-label="Navigazione calendario"
        >
          <button
            type="button"
            onClick={onPrev}
            className="flex h-8 w-8 items-center justify-center rounded text-muted-strong transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Periodo precedente"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="flex h-8 w-8 items-center justify-center rounded text-muted-strong transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Periodo successivo"
          >
            <ChevronRightIcon />
          </button>
        </div>

        <div
          className="flex rounded-lg bg-surface-muted p-0.5"
          role="group"
          aria-label="Viste calendario"
        >
          {views.map((v) => (
            <button
              key={v.value}
              type="button"
              onClick={() => onViewChange(v.value)}
              aria-pressed={view === v.value}
              className={`rounded px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                view === v.value
                  ? "bg-primary-soft text-accent"
                  : "text-muted-strong hover:bg-surface hover:text-foreground"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onCreate}
          className="h-[38px] w-full rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-subtle transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
        >
          Nuovo evento
        </button>
      </div>
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 3 5 8l5 5" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 3 5 5-5 5" />
    </svg>
  );
}
