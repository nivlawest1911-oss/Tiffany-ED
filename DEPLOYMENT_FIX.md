# Deployment Fix: CSS Loader URL Error

## Issue

Vercel deployment failed with `Error: Cannot find module './&'`.
This was caused by a URL in `src/lib/images.ts` being used in a context (likely Tailwind arbitrary value or processed CSS) where query parameters containing `&` (e.g., `?q=80&w=2574...`) were misinterpreted by `css-loader` or Webpack as a module request during the build process on Vercel's environment.

## Fix

- Simplified `EDUCATOR_HUB_HERO` and `THE_ROOM_HERO` URLs in `src/lib/images.ts` to remove query parameters.
- Forced cache invalidation in `src/app/globals.css`.
- Triggered deployment with `vercel --prod --force` to skip build cache.

## Verification

- Local build passed.
- Vercel build pending verification.
