"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export function CTA() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <section className="rounded-2xl border border-border-subtle bg-surface p-8 text-center shadow-subtle">
      <h2 className="mb-2 font-display text-2xl font-bold tracking-[0.01em] text-foreground">
        {user ? "Riprendi da dove avevi lasciato" : "Pronto a iniziare?"}
      </h2>
      <p className="mb-6 text-base leading-[1.7] text-muted">
        {user
          ? "Apri la dashboard o torna alle tue attività."
          : "Crea il tuo account e aggiungi la tua prima cosa da fare."}
      </p>
      <Link
        href={user ? "/dashboard" : "/register"}
        className="inline-flex h-[38px] items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-subtle transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {user ? "Vai alla dashboard" : "Crea il tuo account"}
      </Link>
    </section>
  );
}
