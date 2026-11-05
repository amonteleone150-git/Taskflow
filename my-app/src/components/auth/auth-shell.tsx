import Link from "next/link";

type AuthShellProps = {
  overline: string;
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

/**
 * Contenitore comune di /login e /register.
 * Riprende le card del design system: superficie bianca, bordo subtle,
 * ombra subtle, padding 24px e radius 8px.
 */
export function AuthShell({
  overline,
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md">
        <header className="mb-8 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
            {overline}
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold leading-[1.2] tracking-[0.01em] text-foreground">
            {title}
          </h1>
          <p className="mt-4 text-base leading-[1.7] text-muted">
            {description}
          </p>
        </header>

        <div className="rounded-lg border border-border-subtle bg-surface p-6 shadow-subtle">
          {children}
        </div>

        <div className="mt-6 text-center text-sm leading-[1.6] text-muted">
          {footer}
        </div>

        <p className="mt-8 text-center text-xs leading-[1.4] tracking-[0.02em] text-subtle">
          I tuoi dati sono separati da quelli degli altri account.{" "}
          <Link
            href="/about"
            className="font-medium text-accent hover:underline"
          >
            Scopri di più
          </Link>
        </p>
      </div>
    </div>
  );
}
