export class BulkheadRejectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BulkheadRejectedError";
  }
}

export class Semaphore {
  private active = 0;
  private readonly queue: Array<{ resolve: () => void; reject: (err: Error) => void; timeoutId: NodeJS.Timeout }> = [];

  constructor(
    private readonly maxConcurrent: number,
    private readonly maxQueued: number = 0,
    private readonly timeoutMs: number = 5000
  ) {
    if (maxConcurrent < 1) throw new Error("Semaphore max must be >= 1");
  }

  async acquire(): Promise<void> {
    if (this.active < this.maxConcurrent) {
      this.active++;
      return;
    }

    if (this.queue.length >= this.maxQueued) {
      throw new BulkheadRejectedError("Bulkhead queue is full");
    }

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        const idx = this.queue.findIndex(q => q.resolve === resolve);
        if (idx !== -1) {
          this.queue.splice(idx, 1);
        }
        reject(new BulkheadRejectedError("Bulkhead acquire timeout"));
      }, this.timeoutMs);

      this.queue.push({ resolve, reject, timeoutId });
    });
  }

  release(): void {
    if (this.queue.length > 0) {
      const next = this.queue.shift()!;
      clearTimeout(next.timeoutId);
      next.resolve();
    } else {
      this.active--;
    }
  }

  get stats() {
    return {
      active: this.active,
      queued: this.queue.length,
      maxConcurrent: this.maxConcurrent,
      maxQueued: this.maxQueued
    };
  }
}

export class Bulkhead {
  private semaphore: Semaphore;

  constructor(
    private readonly name: string,
    maxConcurrent: number,
    maxQueued: number = 0,
    timeoutMs: number = 5000
  ) {
    this.semaphore = new Semaphore(maxConcurrent, maxQueued, timeoutMs);
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    await this.semaphore.acquire();
    try {
      return await fn();
    } finally {
      this.semaphore.release();
    }
  }

  getStats() {
    return { name: this.name, ...this.semaphore.stats };
  }
}
