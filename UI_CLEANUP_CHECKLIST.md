# 🎯 UI/UX Cleanup - Issues to Fix

Based on the screenshots provided, here are the critical issues that need to be addressed:

## 1. **Duplicate Dr. Alvin West Avatars** ❌
**Issue:** Dr. Alvin West appears twice in the avatar selector
**Location:** Dashboard - Avatar Command Bar (line 490-512)
**Fix:** Remove duplicate avatar entries, keep only one instance

## 2. **Non-Functional Links** ❌
**Issue:** "MEDICAL - Consult Specialist" and "LEGAL - Consult Counsel" buttons don't do anything
**Location:** Identity/Profile page
**Fix:** Either make them functional or remove them entirely

## 3. **"LOCAL MODE" Indicator** ❌
**Issue:** Red "LOCAL MODE" badge appears but has no functionality
**Location:** Bottom of screen in avatar interface
**Fix:** Remove this non-functional indicator

## 4. **Redundant Profile Information** ❌
**Issue:** Profile information (education, expertise, publications) appears multiple times
**Location:** Identity page
**Fix:** Consolidate into single, clean profile card

## 5. **Avatar Enhancements Not Working** ❌
**Issue:** Avatars are just static headshots, not the advanced multimodal features we built
**Location:** SovereignDelegate component
**Fix:** The NVIDIA ACE/LiveKit integration needs Google Cloud deployment (not yet deployed)

## 6. **Layout Organization** ❌
**Issue:** Too many elements competing for attention, unclear hierarchy
**Fix:** Simplify dashboard, remove non-essential widgets

---

## Immediate Fixes

### Fix 1: Remove Duplicate Avatars
The DELEGATES array has Dr. Alvin West listed, but he's showing twice. Need to ensure only unique delegates.

### Fix 2: Remove Non-Functional Consultant Links
These medical/legal consultant buttons should be removed until we have actual functionality.

### Fix 3: Clean Up Avatar Interface
Remove "LOCAL MODE" indicator and streamline the avatar selection UI.

### Fix 4: Simplify Dashboard
Remove or consolidate:
- Redundant status indicators
- Non-functional integration points
- Duplicate profile information

---

## Files to Modify

1. `src/app/dashboard/page.tsx` - Remove duplicate avatars, clean up layout
2. `src/app/identity/page.tsx` - Remove non-functional consultant links
3. `src/components/SovereignDelegate.tsx` - Remove LOCAL MODE indicator
4. `src/components/LiveAvatarChat.tsx` - Streamline avatar interface

---

## Note on Avatar Enhancements

The advanced avatar features (NVIDIA ACE 3.0, LiveKit WebRTC, Gemini 3 Pro) are **code-complete** but require:
1. Google Cloud Run deployment (GPU-enabled)
2. LiveKit server configuration
3. Vertex AI API keys

Until these are deployed, avatars will remain as enhanced static images with text-to-speech.

To enable full multimodal features, follow `DEPLOYMENT_ROADMAP.md` Phase 5.
