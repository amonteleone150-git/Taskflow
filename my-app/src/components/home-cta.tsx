import Link from "next/link";

export function CTA() {
  return (
    <section className="rounded-2xl border bg-card p-8 text-center">
      <h2 className="mb-2 text-2xl font-semibold">Pronto a iniziare?</h2>
      <p className="mb-6 text-muted">
        Apri la pagina Attività e aggiungi la tua prima cosa da fare.
      </p>
      <Link
        href="/tasks"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        Vai alle attività
      </Link>
    </section>
  );
}