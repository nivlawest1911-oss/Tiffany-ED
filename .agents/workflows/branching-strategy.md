---
description: EdIntel Component Branching Strategy
---

# Optimal Branching Strategy for EdIntel Components

With 191 components in the application, maintaining a clean Git history and organized workflow is critical. We use a **Domain-Driven Branching Strategy** built on top of GitFlow.

## The Core Branches

1. **`main`** — Production. This branch is locked and protected. It automatically triggers Vercel production deployments. Code only enters `main` via merged Pull Requests from `develop`.
2. **`develop`** — Staging / Integration. All feature and component branches merge here first for testing before a release is cut to `main`.

## Component Domain Branches

Instead of creating a new branch for every single component, group component work by **functional domain**.

Active domain branches (created alongside this workflow):

- **`feature/ui-library`** — For shared, reusable visual components (e.g., in `src/components/ui/` like buttons, cards, typography).
- **`feature/dashboard-views`** — For complex dashboard layouts, widgets, and state-heavy authenticated views.
- **`feature/ai-integration`** — For components interfacing with LLMs, HeyGen, or ElevenLabs (e.g., avatars, streaming chat, generating UI).
- **`feature/backend-services`** — For API routes, database operations, and system-level configuration (Stripe, Posthog, etc.).

### When to Create a New Branch

If a new feature is large enough to span multiple domains (e.g., a massive new cognitive module), create a specific feature branch:
`git checkout -b feature/module-name develop`

## Development Workflow

1. **Branch Off:** Always branch off `develop`, not `main`.

    ```bash
    // turbo
    git checkout develop
    git pull origin develop
    git checkout -b feature/your-subsystem
    ```

2. **Commit Often:** Write clear conventional commits (`feat:`, `fix:`, `refactor:`).
3. **Merge to Develop:** Once a component or feature is stable, merge it into `develop`.

    ```bash
    // turbo
    git checkout develop
    git merge feature/your-subsystem --no-ff
    git push origin develop
    ```

4. **Delete Stale Branches:** After merging, delete the feature branch locally and remotely to keep the repo clean.

    ```bash
    // turbo
    git branch -d feature/your-subsystem
    git push origin --delete feature/your-subsystem
    ```

5. **Release:** When `develop` is ready for production, merge `develop` into `main`.
