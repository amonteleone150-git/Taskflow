type AuthErrorLike = {
  code?: string;
  message?: string;
} | null;

const errorMessages: Record<string, string> = {
  INVALID_EMAIL: "Inserisci un indirizzo email valido.",
  INVALID_EMAIL_OR_PASSWORD: "Email o password non corretti.",
  INVALID_PASSWORD: "Password non valida.",
  PASSWORD_TOO_SHORT: "La password deve contenere almeno 8 caratteri.",
  PASSWORD_TOO_LONG: "La password è troppo lunga.",
  USER_ALREADY_EXISTS: "Esiste già un account con questa email.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "Esiste già un account con questa email.",
};

/**
 * Traduce gli errori restituiti da Better Auth in messaggi italiani.
 * Gli errori sono prodotti e validati lato server dall'endpoint /api/auth.
 */
export function getAuthErrorMessage(error: AuthErrorLike): string {
  if (error?.code && errorMessages[error.code]) {
    return errorMessages[error.code];
  }

  return "Operazione non riuscita. Controlla i dati inseriti e riprova.";
}
