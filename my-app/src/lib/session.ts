import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/**
 * Legge la sessione corrente dal cookie inviato al server.
 * Da usare esclusivamente in Server Components, Server Actions o Route Handler.
 */
export async function getServerSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

/**
 * Restituisce l'utente autenticato oppure reindirizza al login.
 * La verifica avviene sempre lato server, quindi non può essere aggirata
 * manipolando lo stato del client.
 */
export async function requireUser() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return session.user;
}
