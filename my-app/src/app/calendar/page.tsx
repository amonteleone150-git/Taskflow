"use client";

import { CalendarBoard } from "@/components/calendar-board";

export default function CalendarPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-3 py-6 sm:px-4 sm:py-10">
      <div className="w-full max-w-5xl">
        <header className="mb-6 text-center sm:mb-8">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight sm:mb-4 sm:text-3xl">
            Calendario
          </h1>
          <p className="px-2 text-base text-muted sm:text-lg">
            Gestisci i tuoi eventi con viste mensile, settimanale, giornaliera e agenda.
          </p>
        </header>
        <CalendarBoard />
      </div>
    </div>
  );
}