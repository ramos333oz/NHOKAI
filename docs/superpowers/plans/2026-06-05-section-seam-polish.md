# Section Seam Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the visible section seam and soften the floating tab/frame texture.

**Architecture:** Keep the fix inside `src/App.tsx` because the seam comes from section and frame utility classes there. Replace hard borders with soft rings, strengthen transition gradients, and avoid changing layout or content behavior.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS utility classes.

---

## File Structure

- Modify: `src/App.tsx`
  - Floating header class.
  - Main visual frame class.
  - Team bottom feather layer.
  - Solutions top transition layer.

### Task 1: Polish Section Boundaries

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Verify current hard edges exist**

Run:

```powershell
rg -n "border-b md:border-l md:border-r|border border-neutral-300|h-\\[25vh\\] bg-gradient-to-t from-white|solutions-section" src\App.tsx
```

Expected: Matches show the header border, main frame border, Team bottom gradient, and Solutions section.

- [ ] **Step 2: Replace hard frame/header borders**

Update the header tab and main frame classes so they use transparent rings and softer shadows instead of visible `border-neutral-300` edges.

- [ ] **Step 3: Strengthen Team-to-Solutions blending**

Make the Team bottom feather taller and more opaque near the boundary. Add a top wash inside Solutions that starts white and fades into the section content.

- [ ] **Step 4: Run build**

Run:

```powershell
npm.cmd run build
```

Expected: Build completes successfully.

- [ ] **Step 5: Verify styling markers**

Run:

```powershell
rg -n "ring-1 ring-black/\\[0\\.06\\]|h-\\[34vh\\]|h-\\[30vh\\]" src\App.tsx
```

Expected: Matches show the softened rings and expanded blending layers.
