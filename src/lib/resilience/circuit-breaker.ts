export type CircuitState = "closed" | "open" | "half_open";

export class CircuitOpenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CircuitOpenError";
  }
}

export type CircuitBreakerOptions = {
  failureThreshold?: number; // failures in window before opening
  resetTimeoutMs?: number;   // time in open state before half-open
};

export class CircuitBreaker {
  private state: CircuitState = "closed";
  private failures = 0;
  private nextAttempt = 0;

  constructor(
    private readonly name: string,
    private readonly options: CircuitBreakerOptions = {}
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === "open") {
      if (Date.now() > this.nextAttempt) {
        this.state = "half_open";
      } else {
        throw new CircuitOpenError(`Circuit '${this.name}' is open`);
      }
    }

    try {
      const result = await fn();
      if (this.state === "half_open") {
        this.onSuccess();
      }
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }

  private onSuccess() {
    this.state = "closed";
    this.failures = 0;
  }

  private onFailure() {
    const threshold = this.options.failureThreshold ?? 5;
    const timeout = this.options.resetTimeoutMs ?? 30000;

    this.failures++;
    if (this.failures >= threshold) {
      this.state = "open";
      this.nextAttempt = Date.now() + timeout;
      console.error(`[CircuitBreaker] '${this.name}' tripped OPEN`);
    }
  }

  getState(): CircuitState {
    if (this.state === "open" && Date.now() > this.nextAttempt) {
        return "half_open";
    }
    return this.state;
  }
}
