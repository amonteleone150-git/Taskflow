import { createAuthClient } from "better-auth/react";

/**
 * Client Better Auth per i Client Components.
 *
 * Senza `baseURL` usa l'origine corrente della pagina: funziona sia in
 * sviluppo (localhost) sia in produzione e su anteprime, senza dover
 * configurare un URL pubblico aggiuntivo.
 */
export const authClient = createAuthClient();
