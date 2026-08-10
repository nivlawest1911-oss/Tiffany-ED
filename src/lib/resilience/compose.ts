import { Bulkhead } from "./bulkhead";
import { CircuitBreaker } from "./circuit-breaker";

/**
 * Composes resilience middleware in the correct order:
 * Workload Bulkhead -> Tenant Bulkhead -> Circuit Breaker -> Fallback/Action
 */
export async function withResilience<T>(
  action: () => Promise<T>,
  options: {
    workloadBulkhead?: Bulkhead;
    tenantBulkhead?: Bulkhead;
    circuitBreaker?: CircuitBreaker;
  }
): Promise<T> {
  let pipeline = action;

  if (options.circuitBreaker) {
    const next = pipeline;
    pipeline = () => options.circuitBreaker!.execute(next);
  }

  if (options.tenantBulkhead) {
    const next = pipeline;
    pipeline = () => options.tenantBulkhead!.execute(next);
  }

  if (options.workloadBulkhead) {
    const next = pipeline;
    pipeline = () => options.workloadBulkhead!.execute(next);
  }

  return pipeline();
}
