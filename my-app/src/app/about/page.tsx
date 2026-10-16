import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl space-y-8">
        <header className="text-center">
          <h1 className="mb-4 text-3xl font-semibold tracking-tight">Info</h1>
          <p className="text-lg text-muted">
            Taskflow è una piccola applicazione per la gestione delle attività
            quotidiane, costruita per imparare Next.js, React e Tailwind CSS.
          </p>
        </header>

        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-medium">Caratteristiche</h2>
          <ul className="space-y-3 text-muted">
            <li className="flex items-start gap-3">
              <span className="shrink-0 text-accent">✓</span>
              <span>Aggiunta attività con priorità (bassa, media, alta)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 text-accent">✓</span>
              <span>Filtro per stato: tutte, da fare, completate</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 text-accent">✓</span>
              <span>Modifica inline con doppio click</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 text-accent">✓</span>
              <span>Caledario integrato</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 text-accent">✓</span>
              <span>Persistenza nel localStorage del browser</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 text-accent">✓</span>
              <span>Tema chiaro/scuro con preferenza salvata</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 text-accent">✓</span>
              <span>Barra di progresso e statistiche</span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-medium">Tecnologie</h2>
          <ul className="space-y-2 text-muted">
            <li>
              <strong>Next.js 15</strong> — App Router, Server Components
            </li>
            <li>
              <strong>React 19</strong> — Client Components con hook moderni
            </li>
            <li>
              <strong>Tailwind CSS v4</strong> — Styling utility-first
            </li>
            <li>
              <strong>TypeScript</strong> — Tipizzazione statica
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-sm text-center">
          <p className="text-muted">
            Progetto didattico per esplorare le basi dello sviluppo full-stack moderno.
          </p>
          <div className="mt-4">
            <Link
              href="/tasks"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-accent px-5 font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Vai alle attività →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}