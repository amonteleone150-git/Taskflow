import Link from "next/link";

type HeaderNavLinkProps = {
  href: string;
  label: string;
  active: boolean;
};

export function HeaderNavLink({ href, label, active }: HeaderNavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors sm:px-3 ${
        active
          ? "bg-primary-soft text-accent"
          : "text-muted-strong hover:bg-surface-muted hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}
