import Link from "next/link";
import { features } from "@/lib/features";

export function Hero() {
  return (
    <section className="text-center space-y-6">
      <Badge>
        <CheckIcon />
        Taskflow — Organizza la tua giornata
      </Badge>

      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
        Gestisci le attività<br />
        <span className="text-accent">senza complicazioni</span>
      </h1>

      <p className="mx-auto max-w-xl text-lg text-muted leading-relaxed">
        Una app leggera per task con priorità, filtri, tema chiaro/scuro e
        salvataggio automatico. Niente account, niente server — solo il tuo
        browser.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/tasks"
          className={primaryButton("max-w-xs")}
        >
          Inizia ora
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/about"
          className={secondaryButton("max-w-xs")}
        >
          Scopri di più
        </Link>
      </div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
      {children}
    </div>
  );
}

function CheckIcon() {
  return (
    <span className="grid h-5 w-5 place-items-center rounded-lg bg-accent text-accent-foreground text-xs">
      ✓
    </span>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return <span className={className}>→</span>;
}

function primaryButton(extra?: string) {
  return `group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 font-medium text-accent-foreground transition-opacity hover:opacity-90 ${extra ?? ""}`;
}

function secondaryButton(extra?: string) {
  return `inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-muted/50 px-6 font-medium text-muted transition-colors hover:border-muted hover:text-foreground ${extra ?? ""}`;
}