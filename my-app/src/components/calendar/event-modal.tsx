import { eventColorOptions, toDateTimeInputValue } from "@/lib/calendar";
import type { EventFormData } from "@/components/calendar/use-calendar-events";

type EventModalProps = {
  editing: boolean;
  formData: EventFormData;
  onFormChange: (data: EventFormData) => void;
  errors: Record<string, string>;
  onSubmit: (event: React.FormEvent) => void;
  onClose: () => void;
  onDelete: () => void;
};

export function EventModal({
  editing,
  formData,
  onFormChange,
  errors,
  onSubmit,
  onClose,
  onDelete,
}: EventModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
      <div className="w-full max-w-md max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl bg-card p-4 shadow-xl animate-rise sm:max-h-[calc(100dvh-2rem)] sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {editing ? "Modifica evento" : "Nuovo evento"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-card-muted hover:text-foreground"
            aria-label="Chiudi"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Titolo *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => onFormChange({ ...formData, title: e.target.value })}
              className="w-full h-10 rounded-xl border bg-card-muted px-4 outline-none focus:border-accent"
              placeholder="Titolo evento"
              autoFocus
            />
            {errors.title && <p className="mt-1 text-sm text-rose-500">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="start" className="block text-sm font-medium mb-1">
                Inizio *
              </label>
              <input
                id="start"
                type="datetime-local"
                value={formData.start}
                onChange={(e) => {
                  const start = e.target.value;
                  const next: EventFormData = { ...formData, start };
                  // Se la fine non è più successiva al nuovo inizio la
                  // riallineo (+1 ora) invece di bloccare il salvataggio.
                  if (
                    !formData.allDay &&
                    formData.end &&
                    start &&
                    new Date(formData.end) <= new Date(start)
                  ) {
                    next.end = toDateTimeInputValue(
                      new Date(new Date(start).getTime() + 3600000),
                    );
                  }
                  onFormChange(next);
                }}
                className="w-full h-10 rounded-xl border bg-card-muted px-4 outline-none focus:border-accent"
              />
              {errors.start && <p className="mt-1 text-sm text-rose-500">{errors.start}</p>}
            </div>
            <div>
              <label htmlFor="end" className="block text-sm font-medium mb-1">
                Fine <span className="font-normal text-muted">(opzionale)</span>
              </label>
              <input
                id="end"
                type="datetime-local"
                value={formData.end}
                onChange={(e) => onFormChange({ ...formData, end: e.target.value })}
                className="w-full h-10 rounded-xl border bg-card-muted px-4 outline-none focus:border-accent"
                disabled={formData.allDay}
              />
              {errors.end && <p className="mt-1 text-sm text-rose-500">{errors.end}</p>}
              {!formData.allDay && !formData.end && (
                <p className="mt-1 text-xs text-muted">Senza fine l&apos;evento dura 1 ora.</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allDay}
                onChange={(e) => onFormChange({ ...formData, allDay: e.target.checked })}
                className="h-4 w-4 rounded border border-muted text-accent focus:ring-accent"
              />
              <span className="text-sm">Tutto il giorno</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Colore</label>
            <div className="flex flex-wrap gap-2">
              {eventColorOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onFormChange({ ...formData, color: opt.value })}
                  className={`relative h-10 w-10 rounded-full transition-transform ${opt.bg} ${
                    formData.color === opt.value
                      ? "scale-110 ring-2 ring-accent ring-offset-2 ring-offset-card"
                      : ""
                  }`}
                  aria-label={opt.label}
                  aria-pressed={formData.color === opt.value}
                >
                  {formData.color === opt.value && (
                    <span className="absolute inset-0 flex items-center justify-center text-white">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Descrizione
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => onFormChange({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full rounded-xl border bg-card-muted px-4 py-2 outline-none focus:border-accent resize-none"
              placeholder="Note opzionali..."
            />
          </div>

          <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 w-full rounded-xl border border-muted/50 px-5 font-medium text-muted transition-colors hover:border-muted hover:text-foreground sm:h-10 sm:w-auto"
            >
              Annulla
            </button>
            {editing && (
              <button
                type="button"
                onClick={onDelete}
                className="h-11 w-full rounded-xl bg-rose-500/10 px-5 font-medium text-rose-500 transition-colors hover:bg-rose-500/20 sm:h-10 sm:w-auto"
              >
                Elimina
              </button>
            )}
            <button
              type="submit"
              className="h-11 w-full rounded-xl bg-accent px-5 font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:h-10 sm:w-auto"
            >
              {editing ? "Salva" : "Crea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}