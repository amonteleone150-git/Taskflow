import type { EventFormData } from "@/components/calendar/event-form";
import { EventColorPicker } from "@/components/calendar/event-color-picker";
import { EventDescriptionField } from "@/components/calendar/event-description-field";
import { EventBasicsFields } from "@/components/calendar/event-form-fields";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";

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
          <IconButton variant="muted" onClick={onClose} aria-label="Chiudi">
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
        </IconButton>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <EventBasicsFields
            formData={formData}
            onFormChange={onFormChange}
            errors={errors}
          />

          <EventColorPicker
            value={formData.color}
            onChange={(color) => onFormChange({ ...formData, color })}
          />

          <EventDescriptionField
            value={formData.description}
            onChange={(description) =>
              onFormChange({ ...formData, description })
            }
          />

          <div className="flex flex-col gap-2 border-t border-border-subtle pt-4 sm:flex-row sm:justify-end sm:gap-3">
            <Button
              type="button"
              variant="secondary"
              size="responsive"
              onClick={onClose}
            >
              Annulla
            </Button>
            {editing && (
              <Button
                type="button"
                variant="danger"
                size="responsive"
                onClick={onDelete}
              >
                Elimina
              </Button>
            )}
            <Button type="submit" size="responsive">
              {editing ? "Salva" : "Crea"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
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
