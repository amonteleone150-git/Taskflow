"use client";

import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid/index.js";
import timeGridPlugin from "@fullcalendar/timegrid/index.js";
import interactionPlugin from "@fullcalendar/interaction/index.js";
import listPlugin from "@fullcalendar/list/index.js";
import "./fullcalendar.css";
import { CalendarToolbar, type CalendarView } from "@/components/calendar/calendar-toolbar";
import { EventModal } from "@/components/calendar/event-modal";
import { useCalendarEvents } from "@/components/calendar/use-calendar-events";

export function CalendarBoard() {
  const {
    loaded,
    events,
    fcEvents,
    modalOpen,
    editingEvent,
    formData,
    setFormData,
    errors,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    handleDelete,
  } = useCalendarEvents();

  const [view, setView] = useState<CalendarView>("dayGridMonth");
  const [periodLabel, setPeriodLabel] = useState("");
  const calendarRef = useRef<FullCalendar>(null);

  function handleDateClick(info: { date: Date; allDay: boolean }) {
    openCreateModal(info.date);
  }

  function handleEventClick(info: { event: { id: string; extendedProps: Record<string, unknown> } }) {
    const event = events.find((e) => e.id === info.event.id);
    if (event) {
      openEditModal(event);
    }
  }

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

  if (!loaded) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Toolbar personalizzata */}
      <CalendarToolbar
        view={view}
        periodLabel={periodLabel}
        onViewChange={handleViewChange}
        onPrev={handlePrev}
        onNext={handleNext}
        onCreate={() => openCreateModal()}
      />

      {/* FullCalendar */}
      <div className="overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-subtle">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin] as any}
          initialView={view}
          events={fcEvents}
          locale="it"
          headerToolbar={false}
          height="auto"
          contentHeight={600}
          aspectRatio={1.8}
          slotMinTime="06:00:00"
          slotMaxTime="22:00:00"
          allDaySlot={true}
          expandRows={true}
          dayMaxEvents={true}
          moreLinkClick="popover"
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDisplay="block"
          defaultTimedEventDuration="01:00"
          datesSet={(info) => {
            setView(info.view.type as CalendarView);
            // Titolo del periodo localizzato (es. "ottobre 2026"), si aggiorna
            // automaticamente al cambio di vista e di mese.
            setPeriodLabel(info.view.title);
          }}
        />
      </div>

      {/* Modal per creare/modificare eventi */}
      {modalOpen && (
        <EventModal
          editing={editingEvent !== null}
          formData={formData}
          onFormChange={setFormData}
          errors={errors}
          onSubmit={handleSubmit}
          onClose={closeModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
