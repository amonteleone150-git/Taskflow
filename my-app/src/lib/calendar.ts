import { createId as createIdWithPrefix, readStoredArray, writeStoredJson } from "./storage";
import { eventColors, type EventColor } from "./calendar-colors";

export { eventColors, eventColorOptions } from "./calendar-colors";
export type { EventColor } from "./calendar-colors";

export type CalendarEvent = {
  id: string;
  title: string;
  start: string; // ISO date string
  end?: string; // ISO date string, optional for all-day events
  allDay?: boolean;
  color: EventColor;
  description?: string;
};

export const CALENDAR_STORAGE_KEY = "taskflow.calendar.v1";

/** Chiave localStorage isolata per utente, come per le attività. */
export function getCalendarStorageKey(userId: string): string {
  return `${CALENDAR_STORAGE_KEY}.${userId}`;
}

/**
 * Converte una Date in una stringa per input `datetime-local`
 * ("YYYY-MM-DDTHH:mm") usando l'ora LOCALE.
 * Nota: usare `toISOString()` sposterebbe la data al giorno precedente
 * per i fusi orari positivi (es. Italia).
 */
export function toDateTimeInputValue(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join("-") + `T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function createEventId(): string {
  return createIdWithPrefix("event");
}

export function isCalendarEvent(value: unknown): value is CalendarEvent {
  if (typeof value !== "object" || value === null) return false;
  const event = value as Record<string, unknown>;
  return (
    typeof event.id === "string" &&
    typeof event.title === "string" &&
    typeof event.start === "string" &&
    (event.end === undefined || typeof event.end === "string") &&
    (event.allDay === undefined || typeof event.allDay === "boolean") &&
    typeof event.color === "string" &&
    event.color in eventColors &&
    (event.description === undefined || typeof event.description === "string")
  );
}

export function loadEvents(userId: string): CalendarEvent[] {
  return readStoredArray(getCalendarStorageKey(userId), isCalendarEvent) ?? [];
}

export function saveEvents(userId: string, events: CalendarEvent[]): void {
  writeStoredJson(getCalendarStorageKey(userId), events);
}

export function addEvent(events: CalendarEvent[], event: Omit<CalendarEvent, "id">): CalendarEvent[] {
  const newEvent: CalendarEvent = {
    ...event,
    id: createEventId(),
  };
  return [newEvent, ...events];
}

export function updateEvent(events: CalendarEvent[], id: string, updates: Partial<Omit<CalendarEvent, "id">>): CalendarEvent[] {
  return events.map((event) =>
    event.id === id ? { ...event, ...updates } : event
  );
}

export function deleteEvent(events: CalendarEvent[], id: string): CalendarEvent[] {
  return events.filter((event) => event.id !== id);
}

export function toggleEventCompletion(events: CalendarEvent[], id: string): CalendarEvent[] {
  return events.map((event) =>
    event.id === id ? { ...event, allDay: !event.allDay } : event
  );
}

export const ITALIAN_LOCALE = {
  code: "it",
  week: {
    dow: 1, // Monday is the first day of the week
    doy: 4, // The week that contains Jan 4th is the first week of the year
  },
  buttonText: {
    prev: "Prec",
    next: "Succ",
    prevYear: "Anno prec",
    nextYear: "Anno succ",
    today: "Oggi",
    month: "Mese",
    week: "Settimana",
    day: "Giorno",
    list: "Agenda",
  },
  weekText: "Set",
  allDayText: "Tutto il giorno",
  moreLinkText: "altri",
  noEventsText: "Nessun evento da mostrare",
};