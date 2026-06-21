import type { Metric, MetricSource } from "@/content/types";

// Human label for each source. Every metric must declare where it comes from,
// so the provenance is always visible rather than implied.
const SOURCE_LABEL: Record<MetricSource, string> = {
  resume: "Per resume",
  analytics: "Measured",
  published: "Published",
  estimated: "Estimated",
};

export function MetricStat({ metric }: { metric: Metric }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="display text-4xl leading-none text-accent sm:text-5xl">
        {metric.value}
      </span>
      <span className="text-sm text-muted">{metric.label}</span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
        {SOURCE_LABEL[metric.source]}
      </span>
    </div>
  );
}

export function MetricRow({ metrics }: { metrics: Metric[] }) {
  if (metrics.length === 0) return null;
  return (
    <dl className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
      {metrics.map((m, i) => (
        <div key={i}>
          <dt className="sr-only">{m.label}</dt>
          <dd>
            <MetricStat metric={m} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
