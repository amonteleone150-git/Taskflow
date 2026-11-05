"use client";

import { useEffect, useMemo, useState } from "react";
import {
  addEvent,
  deleteEvent,
  loadEvents,
  saveEvents,
  updateEvent,
  type CalendarEvent,
} from "@/lib/calendar";
import { toFullCalendarEvents } from "@/components/calendar/fullcalendar-events";
import {
  createEventForm,
  emptyEventForm,
  eventToFormData,
  toEventPayload,
  validateEventForm,
  type EventFormData,
} from "@/components/calendar/event-form";

/**
 * Gestisce la raccolta eventi (caricamento, persistenza, CRUD) e lo stato
 * del form/modale di modifica. Estratto da calendar-board.tsx.
 */
export function useCalendarEvents(userId: string) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [formData, setFormData] = useState<EventFormData>(emptyEventForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const loaded = loadedFor === userId;

  // Caricamento iniziale dei soli eventi dell'utente corrente.
  useEffect(() => {
    setEvents(loadEvents(userId));
    setLoadedFor(userId);
    setModalOpen(false);
    setEditingEvent(null);
  }, [userId]);

  // Persistenza ad ogni modifica, solo dopo aver caricato i dati dell'utente.
  useEffect(() => {
    if (!loaded) return;
    saveEvents(userId, events);
  }, [events, userId, loaded]);

  // Conversione eventi per FullCalendar.
  const fcEvents = useMemo(() => toFullCalendarEvents(events), [events]);

  function openCreateModal(date?: Date) {
    setEditingEvent(null);
    setFormData(createEventForm(date ?? new Date()));
    setErrors({});
    setModalOpen(true);
  }

  function openEditModal(event: CalendarEvent) {
    setEditingEvent(event);
    setFormData(eventToFormData(event));
    setErrors({});
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingEvent(null);
    setFormData(emptyEventForm);
    setErrors({});
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validateEventForm(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const eventData = toEventPayload(formData);

    if (editingEvent) {
      setEvents((prev) => updateEvent(prev, editingEvent.id, eventData));
    } else {
      setEvents((prev) => addEvent(prev, eventData));
    }

    closeModal();
  }

  function handleDelete() {
    if (!editingEvent) return;
    if (window.confirm("Sei sicuro di voler eliminare questo evento?")) {
      setEvents((prev) => deleteEvent(prev, editingEvent.id));
      closeModal();
    }
  }

  return {
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
  };
}
