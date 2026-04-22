import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Placeholder DSN - Standard practice for development
  dsn: process.env.SENTRY_DSN || "https://placeholder-server-dsn@sentry.io/0",

  // Performance Monitoring
  tracesSampleRate: 0.1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
