// Helper condivisi per la persistenza locale e la generazione di id.
// Estratti per evitare duplicazioni tra tasks.ts e calendar.ts.

/**
 * Genera un id univoco, con prefisso di fallback quando `crypto.randomUUID`
 * non è disponibile.
 */
export function createId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Legge una collezione JSON dal localStorage applicando un type guard.
 * Ritorna `null` quando la chiave non esiste o il contenuto non è un array,
 * così il chiamante può distinguere "nessun dato" da "array vuoto".
 */
export function readStoredArray<T>(
  key: string,
  guard: (value: unknown) => value is T,
): T[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed)) {
      return parsed.filter(guard);
    }
  } catch {
    // Dati assenti o corrotti: ignora.
  }
  return null;
}

/** Serializza e salva un valore nel localStorage, ignorando gli errori. */
export function writeStoredJson(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage non disponibile: ignora.
  }
}