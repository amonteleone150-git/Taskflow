"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  CheckIcon,
} from "@/components/ui/icons";

export function Hero() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

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
        {user
          ? `Ciao ${user.name}, riprendi da dove avevi lasciato: attività, priorità e calendario in un unico spazio.`
          : "Una app leggera per task con priorità, filtri, tema chiaro/scuro e salvataggio automatico. Crea il tuo account e ritrova il tuo spazio personale."}
      </p>

      <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
        {user ? (
          <>
            <Link href="/dashboard">
              <Button size="lg" className="max-w-xs">
                Vai alla dashboard
                <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="/tasks">
              <Button variant="secondary" size="lg" className="max-w-xs">
                Apri le attività
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/register">
              <Button size="lg" className="max-w-xs">
                Crea un account
                <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg" className="max-w-xs">
                Accedi
              </Button>
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
