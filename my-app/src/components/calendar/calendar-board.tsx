"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "./fullcalendar.css";
import { CalendarToolbar } from "@/components/calendar/calendar-toolbar";
import { EventModal } from "@/components/calendar/event-modal";
import { useCalendarEvents } from "@/components/calendar/use-calendar-events";
import { useCalendarView } from "@/components/calendar/use-calendar-view";

export function CalendarBoard({ userId }: { userId: string }) {
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
  } = useCalendarEvents(userId);

  const {
    view,
    periodLabel,
    calendarRef,
    handleViewChange,
    handlePrev,
    handleNext,
    handleDatesSet,
  } = useCalendarView();

  function handleDateClick(info: { date: Date; allDay: boolean }) {
    openCreateModal(info.date);
  }

  function handleEventClick(info: {
    event: { id: string; extendedProps: Record<string, unknown> };
  }) {
    const event = events.find((e) => e.id === info.event.id);
    if (event) {
      openEditModal(event);
    }
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
          datesSet={handleDatesSet}
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