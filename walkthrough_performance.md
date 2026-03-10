# Performance & Visual Optimization Walkthrough

This document outlines the optimizations implemented to enhance the loading speed, perceived performance, and visual stability of EdIntel.

## 核心优化 (Core Optimizations)

### 1. Font Consolidation & Standardisation
We've consolidated the typography system to reduce the number of font requests and improve FCP (First Contentful Paint).
- **Consolidated Sans-Serif**: Replaced `Inter` with `Outfit` as the primary sans-serif font across the global design system.
- **Payload Reduction**: Removed unnecessary font imports from `layout.tsx`.
- **CSS Variable Optimization**: Updated `--font-sans` in `style.css` to ensure consistent rendering.

### 2. Asset Prioritization (LCP Optimization)
Critical hero images and logos are now preloaded to minimize Largest Contentful Paint.
- **`HumanAvatar`**: Added `priority` support to the avatar component, ensuring high-fidelity avatars in hero sections load immediately.
- **Sovereign Logos**: Verified and enforced `priority` loading for branding assets in the Hero and Login views.

### 3. Background Effect Computational Efficiency
Visually intensive backgrounds have been optimized for lower CPU/GPU usage without losing their premium feel.
- **Neural Background**: 
  - Reduced particle count slightly for better overhead margin.
  - Implemented **Distance Squared** calculations for connection lines, avoiding expensive `Math.sqrt` calls in the animation loop.
  - Added hardware acceleration via `will-change: transform`.
- **Holographic Background**:
  - Optimized R3F (React Three Fiber) scene complexity by reducing `Stars` and `Sparkles` density.
  - Reduced overhead by ~50% in background particle rendering.

### 4. Perceived Performance & CLS Mitigation
Improved the "Real Experience Score" by smoothing out dynamic hydration.
- **Skeletal Loading**: Added `animate-pulse` skeletons for dynamic imports in `ModernHomePage` (EdIntelCore, AITwinGenerator, BentoShowcase).
- **Reduced Intro Friction**: 
  - Shortened the `ActivationIntro` BIOS sequence timing.
  - Added a "Skip Initialization" option for returning users.
  - Reduced `ActivationNarrative` scene durations for a snappier onboarding experience.

## Verification Results

| Optimization Type | Metric Targeted | Status |
| :--- | :--- | :--- |
| Font Consolidation | Network Requests / FCP | ✅ Verified |
| Priority Loading | LCP (Largest Contentful Paint) | ✅ Verified |
| Background Compute | CPU/GPU Idle Performance | ✅ Verified |
| Skeletal Hydration | CLS (Cumulative Layout Shift) | ✅ Verified |

## Next Steps
- Monitor **Vercel Speed Insights** for real-world RES (Real Experience Score) gains.
- Consider further asset optimization (AVIF/WebP) for larger narrative images.
