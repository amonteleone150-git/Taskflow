import { createId as createIdWithPrefix, readStoredArray, writeStoredJson } from "./storage";

export type EventColor =
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "purple"
  | "pink"
  | "orange"
  | "teal";

export const eventColors: Record<EventColor, { bg: string; border: string; text: string }> = {
  blue: { bg: "bg-blue-500", border: "border-blue-500", text: "text-blue-700 dark:text-blue-300" },
  green: { bg: "bg-emerald-500", border: "border-emerald-500", text: "text-emerald-700 dark:text-emerald-300" },
  yellow: { bg: "bg-amber-500", border: "border-amber-500", text: "text-amber-700 dark:text-amber-300" },
  red: { bg: "bg-rose-500", border: "border-rose-500", text: "text-rose-700 dark:text-rose-300" },
  purple: { bg: "bg-violet-500", border: "border-violet-500", text: "text-violet-700 dark:text-violet-300" },
  pink: { bg: "bg-pink-500", border: "border-pink-500", text: "text-pink-700 dark:text-pink-300" },
  orange: { bg: "bg-orange-500", border: "border-orange-500", text: "text-orange-700 dark:text-orange-300" },
  teal: { bg: "bg-teal-500", border: "border-teal-500", text: "text-teal-700 dark:text-teal-300" },
};

export const eventColorOptions: { value: EventColor; label: string; bg: string }[] = [
  { value: "blue", label: "Blu", bg: "bg-blue-500" },
  { value: "green", label: "Verde", bg: "bg-emerald-500" },
  { value: "yellow", label: "Giallo", bg: "bg-amber-500" },
  { value: "red", label: "Rosso", bg: "bg-rose-500" },
  { value: "purple", label: "Viola", bg: "bg-violet-500" },
  { value: "pink", label: "Rosa", bg: "bg-pink-500" },
  { value: "orange", label: "Arancione", bg: "bg-orange-500" },
  { value: "teal", label: "Petrolio", bg: "bg-teal-500" },
];

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

export function loadEvents(): CalendarEvent[] {
  return readStoredArray(CALENDAR_STORAGE_KEY, isCalendarEvent) ?? [];
}

export function saveEvents(events: CalendarEvent[]): void {
  writeStoredJson(CALENDAR_STORAGE_KEY, events);
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