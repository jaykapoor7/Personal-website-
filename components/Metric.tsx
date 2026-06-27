import type { Metric } from "@/content/types";

// Note: each metric still carries a `source` in the data (governance), it's
// just not rendered — keeps the numbers clean.
export function MetricStat({ metric }: { metric: Metric }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="display text-4xl leading-none text-accent sm:text-5xl">
        {metric.value}
      </span>
      <span className="text-sm text-muted">{metric.label}</span>
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
