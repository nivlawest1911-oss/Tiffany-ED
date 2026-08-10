// Simple in-memory metrics for demonstration
// In production, wire this to Prometheus, Datadog, etc.

export interface MetricsAdapter {
  incrementCounter(name: string, labels?: Record<string, string>): void;
  setGauge(name: string, value: number, labels?: Record<string, string>): void;
  recordHistogram(name: string, value: number, labels?: Record<string, string>): void;
}

class InMemoryMetrics implements MetricsAdapter {
  private counters = new Map<string, number>();
  private gauges = new Map<string, number>();

  private key(name: string, labels?: Record<string, string>) {
    return labels ? `${name}:${JSON.stringify(labels)}` : name;
  }

  incrementCounter(name: string, labels?: Record<string, string>) {
    const k = this.key(name, labels);
    this.counters.set(k, (this.counters.get(k) || 0) + 1);
    console.log(`[Metrics] Counter ${k} = ${this.counters.get(k)}`);
  }

  setGauge(name: string, value: number, labels?: Record<string, string>) {
    const k = this.key(name, labels);
    this.gauges.set(k, value);
  }

  recordHistogram(name: string, value: number, labels?: Record<string, string>) {
    // Basic stub
    console.log(`[Metrics] Histogram ${this.key(name, labels)} = ${value}`);
  }

  getSnapshot() {
    return {
      counters: Object.fromEntries(this.counters),
      gauges: Object.fromEntries(this.gauges)
    };
  }
}

export const metrics = new InMemoryMetrics();
