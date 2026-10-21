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
    <div className="flex flex-col gap-3 rounded-2xl border bg-card p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4">
      <div className="flex items-baseline gap-2">
        <h2 className="text-lg font-semibold sm:text-xl">Calendario</h2>
        <span className="text-sm font-medium text-muted">{periodLabel}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center rounded-full border bg-card p-1" role="group" aria-label="Navigazione calendario">
          <button
            type="button"
            onClick={onPrev}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground sm:h-auto sm:w-auto sm:px-2.5 sm:py-1"
            aria-label="Periodo precedente"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={onNext}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground sm:h-auto sm:w-auto sm:px-2.5 sm:py-1"
            aria-label="Periodo successivo"
          >
            ›
          </button>
        </div>
        <div className="flex rounded-full border bg-card p-1" role="group" aria-label="Viste calendario">
          {views.map((v) => (
            <button
              key={v.value}
              type="button"
              onClick={() => onViewChange(v.value)}
              aria-pressed={view === v.value}
              className={`rounded-full px-2 py-1 text-xs transition-colors sm:px-3 sm:text-sm ${
                view === v.value
                  ? "bg-accent text-accent-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="h-10 w-full rounded-xl bg-accent px-5 font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:w-auto"
        >
          Nuovo evento
        </button>
      </div>
    </div>
  );
}
