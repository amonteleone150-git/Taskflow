"use client";

import { CalendarBoard } from "@/components/calendar-board";

export default function CalendarPage() {
  return (
    <div className="flex flex-1 flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-semibold tracking-tight">Calendario</h1>
          <p className="text-lg text-muted">
            Gestisci i tuoi eventi con viste mensile, settimanale, giornaliera e agenda.
          </p>
        </header>
        <CalendarBoard />
      </div>
    </div>
  );
}