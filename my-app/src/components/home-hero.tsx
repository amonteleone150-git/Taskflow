import Link from "next/link";

export function Hero() {
  return (
    <section className="space-y-6 text-center">
      <Badge>
        <CheckIcon />
        Taskflow — Organizza la tua giornata
      </Badge>

      <h1 className="font-display text-4xl font-extrabold leading-[1.15] tracking-[0.02em] text-foreground sm:text-[40px]">
        Gestisci le attività
        <br />
        <span className="text-accent">senza complicazioni</span>
      </h1>

      <p className="mx-auto max-w-xl text-lg leading-[1.7] text-muted">
        Una app leggera per task con priorità, filtri, tema chiaro/scuro e
        salvataggio automatico. Niente account, niente server — solo il tuo
        browser.
      </p>

      <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
        <Link href="/tasks" className={primaryButton("max-w-xs")}>
          Inizia ora
          <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link href="/about" className={secondaryButton("max-w-xs")}>
          Scopri di più
        </Link>
      </div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-soft px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
      {children}
    </div>
  );
}

function CheckIcon() {
  return (
    <span className="grid h-4 w-4 place-items-center rounded-[4px] bg-primary text-primary-foreground">
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        fill="none"
        className="h-2.5 w-2.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 6.5 5 9l4.5-5.5" />
      </svg>
    </span>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      className={`h-4 w-4 ${className ?? ""}`}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function primaryButton(extra?: string) {
  return `group inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-subtle transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${extra ?? ""}`;
}

function secondaryButton(extra?: string) {
  return `inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-lg border border-primary bg-surface px-7 text-sm font-semibold text-accent transition-colors hover:bg-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${extra ?? ""}`;
}
