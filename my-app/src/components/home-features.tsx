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
    <article className="group rounded-2xl border bg-card p-6 shadow-sm transition-all hover:border-accent/50 hover:shadow-md">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
        {feature.icon}
      </div>
      <h3 className="mb-2 text-lg font-medium">{feature.title}</h3>
      <p className="text-sm text-muted">{feature.description}</p>
    </article>
  );
}