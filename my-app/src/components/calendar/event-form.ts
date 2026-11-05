import {
  toDateTimeInputValue,
  type CalendarEvent,
  type EventColor,
} from "@/lib/calendar";

/** Stato del form di creazione/modifica evento. */
export type EventFormData = {
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  color: EventColor;
  description: string;
};

export const emptyEventForm: EventFormData = {
  title: "",
  start: "",
  end: "",
  allDay: false,
  color: "blue",
  description: "",
};

export function createEventForm(start: Date): EventFormData {
  return {
    ...emptyEventForm,
    start: toDateTimeInputValue(start),
  };
}

export function eventToFormData(event: CalendarEvent): EventFormData {
  return {
    title: event.title,
    start: event.allDay ? event.start : event.start.slice(0, 16),
    end: event.end ? (event.allDay ? event.end : event.end.slice(0, 16)) : "",
    allDay: event.allDay ?? false,
    color: event.color,
    description: event.description ?? "",
  };
}

/**
 * Aggiorna l'inizio e, se necessario, riallinea la fine (+1 ora) invece di
 * bloccare il salvataggio.
 */
export function withUpdatedStart(
  formData: EventFormData,
  start: string,
): EventFormData {
  const next: EventFormData = { ...formData, start };

  if (
    !formData.allDay &&
    formData.end &&
    start &&
    new Date(formData.end) <= new Date(start)
  ) {
    next.end = toDateTimeInputValue(
      new Date(new Date(start).getTime() + 3_600_000),
    );
  }

  return next;
}

export function validateEventForm(data: EventFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.title.trim()) {
    errors.title = "Il titolo è obbligatorio";
  }

  if (!data.start) {
    errors.start = "La data di inizio è obbligatoria";
  }

  // La fine è facoltativa: si controlla solo se è stata compilata.
  if (
    !data.allDay &&
    data.end &&
    data.start &&
    new Date(data.end) <= new Date(data.start)
  ) {
    errors.end = "L'orario di fine deve essere successivo a quello di inizio";
  }

  return errors;
}

export function toEventPayload(
  data: EventFormData,
): Omit<CalendarEvent, "id"> {
  return {
    title: data.title.trim(),
    start: data.start,
    end: data.allDay || !data.end ? undefined : data.end,
    allDay: data.allDay,
    color: data.color,
    description: data.description.trim() || undefined,
  };
}
