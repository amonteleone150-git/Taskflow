import {
  withUpdatedStart,
  type EventFormData,
} from "@/components/calendar/event-form";
import { TextField } from "@/components/ui/text-field";

type EventBasicsFieldsProps = {
  formData: EventFormData;
  onFormChange: (data: EventFormData) => void;
  errors: Record<string, string>;
};

/** Campi principali: titolo, date e opzione "tutto il giorno". */
export function EventBasicsFields({
  formData,
  onFormChange,
  errors,
}: EventBasicsFieldsProps) {
  return (
    <>
      <TextField
        id="title"
        label="Titolo *"
        value={formData.title}
        onChange={(title) => onFormChange({ ...formData, title })}
        placeholder="Titolo evento"
        error={errors.title}
        autoFocus
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextField
          id="start"
          type="datetime-local"
          label="Inizio *"
          value={formData.start}
          onChange={(start) => onFormChange(withUpdatedStart(formData, start))}
          error={errors.start}
        />

        <TextField
          id="end"
          type="datetime-local"
          label="Fine"
          labelSuffix={
            <span className="font-normal text-subtle">(opzionale)</span>
          }
          value={formData.end}
          onChange={(end) => onFormChange({ ...formData, end })}
          error={errors.end}
          helper={
            !formData.allDay && !formData.end
              ? "Senza fine l'evento dura 1 ora."
              : undefined
          }
          disabled={formData.allDay}
        />
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
    </>
  );
}
