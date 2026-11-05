import { LogoutButton } from "@/components/auth/logout-button";

type AccountCardProps = {
  user: {
    name: string;
    email: string;
  };
};

export function AccountCard({ user }: AccountCardProps) {
  const initial = user.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <section className="rounded-lg border border-border-subtle bg-surface p-6 shadow-subtle">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-soft font-display text-lg font-bold text-accent">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-semibold tracking-[0.01em] text-foreground">
              {user.name}
            </p>
            <p className="truncate text-sm leading-[1.6] text-muted">
              {user.email}
            </p>
          </div>
        </div>

        <LogoutButton
          variant="secondary"
          size="md"
          label="Esci dall'account"
          className="w-full sm:w-auto"
        />
      </div>

      <p className="mt-6 border-t border-border-subtle pt-4 text-xs leading-[1.5] tracking-[0.01em] text-subtle">
        Le attività e gli eventi sono salvati nel browser di questo dispositivo
        e associati al tuo account. Non sono visibili agli altri utenti che
        accedono da questo browser.
      </p>
    </section>
  );
}
