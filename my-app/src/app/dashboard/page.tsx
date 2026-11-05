import { requireUser } from "@/lib/session";
import { AccountCard } from "@/components/dashboard/account-card";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import {
  CalendarIcon,
  ChecklistIcon,
} from "@/components/dashboard/dashboard-icons";

export const instant = false;

export const metadata = {
  title: "Dashboard",
  description: "Il tuo spazio personale Taskflow.",
};

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-10">
      <div className="w-full max-w-3xl space-y-8">
        <header className="space-y-4 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
            Area personale
          </span>
          <h1 className="font-display text-3xl font-bold leading-[1.2] tracking-[0.01em] text-foreground">
            Ciao, {user.name}
          </h1>
          <p className="mx-auto max-w-xl text-base leading-[1.7] text-muted">
            Da qui puoi gestire le tue attività e organizzare il calendario.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          <DashboardCard
            title="Attività"
            description="Aggiungi cose da fare, assegna una priorità e tieni traccia dei progressi."
            href="/tasks"
            linkLabel="Apri attività"
            icon={<ChecklistIcon />}
          />
          <DashboardCard
            title="Calendario"
            description="Pianifica i tuoi eventi nelle viste mensile, settimanale e agenda."
            href="/calendar"
            linkLabel="Apri calendario"
            icon={<CalendarIcon />}
          />
        </section>

        <AccountCard user={user} />
      </div>
    </div>
  );
}