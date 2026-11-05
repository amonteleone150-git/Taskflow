import { features } from "@/lib/features";

export function Features() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <FeatureCard key={feature.title} feature={feature} />
      ))}
    </section>
  );
}

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  return (
    <article className="group rounded-lg border border-border-subtle bg-surface p-6 shadow-subtle transition-shadow hover:shadow-medium">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft text-accent">
        {feature.icon}
      </div>
      <h3 className="mb-2 font-display text-base font-semibold tracking-[0.01em] text-foreground">
        {feature.title}
      </h3>
      <p className="text-sm leading-[1.6] text-muted">{feature.description}</p>
    </article>
  );
}