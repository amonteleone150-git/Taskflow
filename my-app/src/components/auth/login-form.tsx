"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { TextField } from "@/components/ui/text-field";
import { getAuthErrorMessage } from "@/components/auth/auth-errors";
import {
  AuthErrorAlert,
  AuthSubmitButton,
} from "@/components/auth/auth-form-parts";
import { validateLogin } from "@/components/auth/auth-validation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const nextErrors = validateLogin({ email, password });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setPending(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        rememberMe: true,
      });

      if (error) {
        setFormError(getAuthErrorMessage(error));
        return;
      }

      // Navigazione completa: garantisce che il server veda subito il nuovo
      // cookie di sessione e azzera lo stato del form.
      window.location.assign("/dashboard");
    } catch {
      setFormError(
        "Impossibile contattare il server. Controlla la connessione e riprova.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {formError ? <AuthErrorAlert message={formError} /> : null}

      <TextField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        autoComplete="email"
        placeholder="nome@esempio.it"
        error={errors.email}
        required
        disabled={pending}
      />

      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        autoComplete="current-password"
        placeholder="La tua password"
        error={errors.password}
        required
        disabled={pending}
      />

      <AuthSubmitButton
        pending={pending}
        label="Accedi"
        pendingLabel="Accesso in corso…"
      />
    </form>
  );
}
