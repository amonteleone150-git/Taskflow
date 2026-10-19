"use client";

import { useEffect, useMemo, useState } from "react";
import {
  addEvent,
  deleteEvent,
  eventColors,
  loadEvents,
  saveEvents,
  toDateTimeInputValue,
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
  }, [events]);

  function validateForm(data: EventFormData): Record<string, string> {
    const newErrors: Record<string, string> = {};
    if (!data.title.trim()) {
      newErrors.title = "Il titolo è obbligatorio";
    }
    if (!data.start) {
      newErrors.start = "La data di inizio è obbligatoria";
    }
    // La fine è facoltativa: si controlla solo se è stata compilata.
    if (!data.allDay && data.end && data.start && new Date(data.end) <= new Date(data.start)) {
      newErrors.end = "L'orario di fine deve essere successivo a quello di inizio";
    }
    return newErrors;
  }

  function openCreateModal(date?: Date) {
    setEditingEvent(null);
    const start = date ?? new Date();
    setFormData({
      title: "",
      start: toDateTimeInputValue(start),
      // La fine è facoltativa: parte vuota, la si imposta solo se serve.
      end: "",
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
