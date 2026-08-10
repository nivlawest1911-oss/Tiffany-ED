export type BackoffOptions = {
  maxAttempts?: number;   // default 4
  baseMs?: number;        // default 400
  capMs?: number;         // default 10_000
  jitter?: "full" | "equal" | "none";
  retryOn?: (error: unknown, attempt: number) => boolean;
};

export async function backoff<T>(
  fn: () => Promise<T>,
  options: BackoffOptions = {}
): Promise<T> {
  const maxAttempts = options.maxAttempts ?? 4;
  const baseMs = options.baseMs ?? 400;
  const capMs = options.capMs ?? 10000;
  const jitter = options.jitter ?? "full";
  
  let attempt = 1;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= maxAttempts || (options.retryOn && !options.retryOn(error, attempt))) {
        throw error;
      }

      let delay = Math.min(capMs, baseMs * Math.pow(2, attempt - 1));
      
      if (jitter === "full") {
        delay = Math.random() * delay;
      } else if (jitter === "equal") {
        delay = (delay / 2) + (Math.random() * (delay / 2));
      }

      await new Promise(resolve => setTimeout(resolve, delay));
      attempt++;
    }
  }
}
