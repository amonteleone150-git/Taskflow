import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Prima barriera: se il cookie di sessione non è presente, evita del tutto
 * il rendering della pagina protetta e restituisce un redirect HTTP.
 *
 * La verifica autorevole resta in `requireUser()` lato server: un cookie
 * contraffatto o scaduto viene comunque rifiutato da Better Auth.
 */
export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/tasks", "/calendar"],
};
