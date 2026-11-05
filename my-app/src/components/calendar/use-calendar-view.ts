"use client";

import { useRef, useState } from "react";
import type FullCalendar from "@fullcalendar/react";
import type { CalendarView } from "@/components/calendar/calendar-toolbar";

type DatesSetInfo = {
  view: {
    type: string;
    title: string;
  };
};

/** Gestisce vista corrente, titolo del periodo e navigazione di FullCalendar. */
export function useCalendarView() {
  const [view, setView] = useState<CalendarView>("dayGridMonth");
  const [periodLabel, setPeriodLabel] = useState("");
  const calendarRef = useRef<FullCalendar>(null);

  function handleViewChange(newView: CalendarView) {
    setView(newView);
    calendarRef.current?.getApi().changeView(newView);
  }

  function handlePrev() {
    calendarRef.current?.getApi().prev();
  }

  function handleNext() {
    calendarRef.current?.getApi().next();
  }

  function handleDatesSet(info: DatesSetInfo) {
    setView(info.view.type as CalendarView);
    // Titolo del periodo localizzato (es. "ottobre 2026"), si aggiorna
    // automaticamente al cambio di vista e di mese.
    setPeriodLabel(info.view.title);
  }

  return {
    view,
    periodLabel,
    calendarRef,
    handleViewChange,
    handlePrev,
    handleNext,
    handleDatesSet,
  };
}
