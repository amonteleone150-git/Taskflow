import Link from "next/link";

type DashboardCardProps = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: React.ReactNode;
};

export function DashboardCard({
  title,
  description,
  href,
  linkLabel,
  icon,
}: DashboardCardProps) {
  return (
    <article className="group flex flex-col rounded-lg border border-border-subtle bg-surface p-6 shadow-subtle transition-shadow hover:shadow-medium">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft text-accent">
        {icon}
      </div>
      <h2 className="mb-2 font-display text-[22px] font-semibold leading-[1.3] tracking-[0.01em] text-foreground">
        {title}
      </h2>
      <p className="mb-6 flex-1 text-sm leading-[1.6] text-muted">
        {description}
      </p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {linkLabel}
        <span
          aria-hidden
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </article>
  );
}
