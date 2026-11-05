"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/components/auth/auth-errors";
import {
  AuthErrorAlert,
  AuthSubmitButton,
} from "@/components/auth/auth-form-parts";
import { RegisterFields } from "@/components/auth/register-fields";
import { validateRegistration } from "@/components/auth/auth-validation";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const nextErrors = validateRegistration({
      name,
      email,
      password,
      confirmPassword,
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setPending(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        setFormError(getAuthErrorMessage(error));
        return;
      }

      // Navigazione completa per applicare subito il cookie di sessione creato
      // dalla registrazione.
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

      <RegisterFields
        name={name}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        onNameChange={setName}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onConfirmPasswordChange={setConfirmPassword}
        errors={errors}
        disabled={pending}
      />

      <AuthSubmitButton
        pending={pending}
        label="Crea account"
        pendingLabel="Creazione in corso…"
      />
    </form>
  );
}
