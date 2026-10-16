"use client";

import { useEffect, useMemo, useState } from "react";
import {
  addEvent,
  deleteEvent,
  eventColors,
  loadEvents,
  saveEvents,
  updateEvent,
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

const emptyForm: EventFormData = {
  title: "",
  start: "",
  end: "",
  allDay: false,
  color: "blue",
  description: "",
};

/**
 * Gestisce la raccolta eventi (caricamento, persistenza, CRUD) e lo stato
 * del form/modale di modifica. Estratto da calendar-board.tsx.
 */
export function useCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [formData, setFormData] = useState<EventFormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Caricamento iniziale dal localStorage.
  useEffect(() => {
    setEvents(loadEvents());
    setLoaded(true);
  }, []);

  // Persistenza ad ogni modifica.
  useEffect(() => {
    if (!loaded) return;
    saveEvents(events);
  }, [events, loaded]);

  // Conversione eventi per FullCalendar.
  const fcEvents = useMemo(() => {
    return events.map((event) => {
      const colorInfo = eventColors[event.color];
      return {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay,
        backgroundColor: colorInfo.bg.replace("bg-", ""),
        borderColor: colorInfo.border.replace("border-", ""),
        textColor: "#ffffff",
        classNames: [colorInfo.bg, colorInfo.border],
        extendedProps: {
          description: event.description,
          color: event.color,
        },
      };
    });
  }, [events]);

  function validateForm(data: EventFormData): Record<string, string> {
    const newErrors: Record<string, string> = {};
    if (!data.title.trim()) {
      newErrors.title = "Il titolo è obbligatorio";
    }
    if (!data.start) {
      newErrors.start = "La data di inizio è obbligatoria";
    }
    if (!data.allDay && data.end && new Date(data.end) <= new Date(data.start)) {
      newErrors.end = "La data di fine deve essere successiva a quella di inizio";
    }
    return newErrors;
  }

  function openCreateModal(date?: Date) {
    setEditingEvent(null);
    const start = date || new Date();
    const end = new Date(start.getTime() + 3600000); // +1 hour
    setFormData({
      title: "",
      start: start.toISOString().slice(0, 16),
      end: end.toISOString().slice(0, 16),
      allDay: false,
      color: "blue",
      description: "",
    });
    setErrors({});
    setModalOpen(true);
  }

  function openEditModal(event: CalendarEvent) {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      start: event.allDay ? event.start : event.start.slice(0, 16),
      end: event.end ? (event.allDay ? event.end : event.end.slice(0, 16)) : "",
      allDay: event.allDay ?? false,
      color: event.color,
      description: event.description ?? "",
    });
    setErrors({});
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingEvent(null);
    setFormData(emptyForm);
    setErrors({});
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const eventData = {
      title: formData.title.trim(),
      start: formData.start,
      end: formData.allDay || !formData.end ? undefined : formData.end,
      allDay: formData.allDay,
      color: formData.color,
      description: formData.description.trim() || undefined,
    };

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
