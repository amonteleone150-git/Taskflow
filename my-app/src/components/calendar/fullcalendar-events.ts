import { eventColors, type CalendarEvent } from "@/lib/calendar";

/** Converte gli eventi salvati nel formato atteso da FullCalendar. */
export function toFullCalendarEvents(events: CalendarEvent[]) {
  return events.map((event) => {
    const colorInfo = eventColors[event.color];
    // Colore applicato da FullCalendar come stile inline: funziona in tutte
    // le viste, compresa l'agenda, dove il colore serve per il pallino.
    const colorVar = `var(--color-${colorInfo.bg.replace("bg-", "")})`;

    return {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
      backgroundColor: colorVar,
      borderColor: colorVar,
      textColor: "#ffffff",
      extendedProps: {
        description: event.description,
        color: event.color,
      },
    };
  });
}
