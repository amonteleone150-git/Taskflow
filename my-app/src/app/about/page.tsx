import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-10">
      <div className="w-full max-w-3xl space-y-8">
        <header className="text-center">
          <h1 className="mb-4 font-display text-3xl font-bold tracking-[0.01em] text-foreground">
            Info
          </h1>
          <p className="text-lg leading-[1.7] text-muted">
            Taskflow è una piccola applicazione per la gestione delle attività
            quotidiane, costruita per imparare Next.js, React e Tailwind CSS.
          </p>
        </header>

        <section className="rounded-lg border border-border-subtle bg-surface p-6 shadow-subtle">
          <h2 className="mb-4 font-display text-[22px] font-semibold tracking-[0.01em] text-foreground">
            Caratteristiche
          </h2>
          <ul className="space-y-3 text-[15px] leading-[1.7] text-muted">
            <FeatureItem>Aggiunta attività con priorità (bassa, media, alta)</FeatureItem>
            <FeatureItem>Filtro per stato: tutte, da fare, completate</FeatureItem>
            <FeatureItem>Modifica inline con doppio click</FeatureItem>
            <FeatureItem>Caledario integrato</FeatureItem>
            <FeatureItem>Persistenza nel localStorage del browser</FeatureItem>
            <FeatureItem>Tema chiaro/scuro con preferenza salvata</FeatureItem>
            <FeatureItem>Barra di progresso e statistiche</FeatureItem>
          </ul>
        </section>

        <section className="rounded-lg border border-border-subtle bg-surface p-6 shadow-subtle">
          <h2 className="mb-4 font-display text-[22px] font-semibold tracking-[0.01em] text-foreground">
            Tecnologie
          </h2>
          <ul className="space-y-2.5 text-[15px] leading-[1.7] text-muted">
            <li>
              <strong className="font-medium text-foreground">Next.js 15</strong>{" "}
              — App Router, Server Components
            </li>
            <li>
              <strong className="font-medium text-foreground">React 19</strong> —
              Client Components con hook moderni
            </li>
            <li>
              <strong className="font-medium text-foreground">Tailwind CSS v4</strong>{" "}
              — Styling utility-first
            </li>
            <li>
              <strong className="font-medium text-foreground">TypeScript</strong> —
              Tipizzazione statica
            </li>
          </ul>
        </section>

        <section className="rounded-lg border border-border-subtle bg-surface p-6 text-center shadow-subtle">
          <p className="text-[15px] leading-[1.7] text-muted">
            Progetto didattico per esplorare le basi dello sviluppo full-stack
            moderno.
          </p>
          <div className="mt-4">
            <Link
              href="/tasks"
              className="inline-flex h-[38px] items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-subtle transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Vai alle attività →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[4px] bg-primary-soft text-accent">
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
      <span>{children}</span>
    </li>
  );
}