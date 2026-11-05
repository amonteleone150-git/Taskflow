"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

type LogoutButtonProps = {
  variant?: "ghost" | "secondary";
  size?: "sm" | "md";
  className?: string;
  label?: string;
};

export function LogoutButton({
  variant = "ghost",
  size = "sm",
  className = "",
  label = "Esci",
}: LogoutButtonProps) {
  const [pending, setPending] = useState(false);

  const sizeClasses =
    size === "md"
      ? "h-[38px] px-5 text-sm"
      : "h-8 px-2.5 text-sm";

  const baseVariantClasses =
    variant === "secondary"
      ? "border border-border bg-surface text-muted-strong"
      : "text-muted-strong";

  const stateClasses = `${baseVariantClasses} ${
    pending
      ? "cursor-not-allowed opacity-40"
      : "hover:bg-surface-muted hover:text-foreground"
  }`;

  async function handleLogout() {
    setPending(true);

    try {
      await authClient.signOut();
    } finally {
      // Ricarica completa: azzera eventuali stati client e applica subito
      // la rimozione del cookie di sessione.
      window.location.assign("/login");
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${stateClasses} ${sizeClasses} ${className}`}
    >
      {pending ? "Uscita…" : label}
    </button>
  );
}
