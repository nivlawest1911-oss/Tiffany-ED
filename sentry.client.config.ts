import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Placeholder DSN - Standard practice for development
  // Real DSN will be provided via NEXT_PUBLIC_SENTRY_DSN env var
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "https://placeholder-public-dsn@sentry.io/0",

  // Performance Monitoring
  tracesSampleRate: 0.1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry browser profiling integration
  profilesSampleRate: 0.1,
});
