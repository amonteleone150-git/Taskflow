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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-3 dark:bg-black/60 sm:p-4">
      <div className="w-full max-w-md max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl border border-border-subtle bg-surface p-4 shadow-large animate-rise sm:max-h-[calc(100dvh-2rem)] sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold tracking-[0.01em] text-foreground">
            {editing ? "Modifica evento" : "Nuovo evento"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Chiudi"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="mb-1.5 block text-sm font-medium text-muted-strong"
            >
              Titolo *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => onFormChange({ ...formData, title: e.target.value })}
              className={fieldClass(Boolean(errors.title))}
              placeholder="Titolo evento"
              aria-invalid={Boolean(errors.title)}
              autoFocus
            />
            {errors.title && (
              <p className="mt-1 text-xs text-error">{errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="start"
                className="mb-1.5 block text-sm font-medium text-muted-strong"
              >
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
                className={fieldClass(Boolean(errors.start))}
                aria-invalid={Boolean(errors.start)}
              />
              {errors.start && (
                <p className="mt-1 text-xs text-error">{errors.start}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="end"
                className="mb-1.5 block text-sm font-medium text-muted-strong"
              >
                Fine{" "}
                <span className="font-normal text-subtle">(opzionale)</span>
              </label>
              <input
                id="end"
                type="datetime-local"
                value={formData.end}
                onChange={(e) => onFormChange({ ...formData, end: e.target.value })}
                className={`${fieldClass(Boolean(errors.end))} disabled:cursor-not-allowed disabled:border-border-subtle disabled:bg-background disabled:text-subtle`}
                aria-invalid={Boolean(errors.end)}
                disabled={formData.allDay}
              />
              {errors.end && (
                <p className="mt-1 text-xs text-error">{errors.end}</p>
              )}
              {!formData.allDay && !formData.end && (
                <p className="mt-1 text-xs text-subtle">
                  Senza fine l&apos;evento dura 1 ora.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={formData.allDay}
                onChange={(e) =>
                  onFormChange({ ...formData, allDay: e.target.checked })
                }
                className="h-4 w-4 rounded-[4px] border-[1.5px] border-input-hover accent-primary"
              />
              <span className="text-sm text-foreground">Tutto il giorno</span>
            </label>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-muted-strong">
              Colore
            </label>
            <div className="flex flex-wrap gap-2">
              {eventColorOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onFormChange({ ...formData, color: opt.value })}
                  className={`relative h-8 w-8 rounded-full transition-transform sm:h-9 sm:w-9 ${opt.bg} ${
                    formData.color === opt.value
                      ? "scale-105 ring-2 ring-primary ring-offset-2 ring-offset-surface"
                      : ""
                  }`}
                  aria-label={opt.label}
                  aria-pressed={formData.color === opt.value}
                >
                  {formData.color === opt.value && (
                    <span className="absolute inset-0 flex items-center justify-center text-white">
                      <CheckIcon />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1.5 block text-sm font-medium text-muted-strong"
            >
              Descrizione
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                onFormChange({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full resize-none rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-subtle hover:border-input-hover focus:border-primary focus:shadow-[0_0_0_1px_var(--primary)]"
              placeholder="Note opzionali..."
            />
          </div>

          <div className="flex flex-col gap-2 border-t border-border-subtle pt-4 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 w-full rounded-lg border border-primary bg-surface px-5 text-sm font-semibold text-accent transition-colors hover:bg-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-[38px] sm:w-auto"
            >
              Annulla
            </button>
            {editing && (
              <button
                type="button"
                onClick={onDelete}
                className="h-11 w-full rounded-lg bg-error-fill px-5 text-sm font-semibold text-white transition-colors hover:bg-error-fill-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error sm:h-[38px] sm:w-auto"
              >
                Elimina
              </button>
            )}
            <button
              type="submit"
              className="h-11 w-full rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-subtle transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-[38px] sm:w-auto"
            >
              {editing ? "Salva" : "Crea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function fieldClass(hasError: boolean) {
  const base =
    "h-[42px] w-full rounded-lg border bg-surface px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-subtle";

  return `${base} ${
    hasError
      ? "border-error focus:border-error focus:shadow-[0_0_0_1px_var(--error)]"
      : "border-border hover:border-input-hover focus:border-primary focus:shadow-[0_0_0_1px_var(--primary)]"
  }`;
}

function CloseIcon() {
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
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      fill="none"
      className="h-3 w-3"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 6.5 5 9l4.5-5.5" />
    </svg>
  );
}
