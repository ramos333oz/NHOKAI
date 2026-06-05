# Unicart Logo Gradient Layering Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the section blend while preventing the UC logo from being faded by the Solutions top wash.

**Architecture:** Modify only `src/App.tsx`. Lower/soften the wash intensity and raise the Solutions content wrapper above it.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS utility classes.

---

### Task 1: Fix Solutions Layering

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Verify current layering**

Run:

```powershell
rg -n "h-\[30vh\].*z-20|relative z-10" src\App.tsx
```

Expected: Shows the Solutions top wash at `z-20` and the content wrapper at `z-10`.

- [ ] **Step 2: Patch layering**

Change the wash to a softer `h-[22vh]` layer and change the Solutions content wrapper to `relative z-30`.

- [ ] **Step 3: Verify markers**

Run:

```powershell
rg -n "h-\[22vh\].*z-20|relative z-30" src\App.tsx
```

Expected: Shows the softened wash and raised content wrapper.

- [ ] **Step 4: Build**

Run:

```powershell
npm.cmd run build
```

Expected: Build completes successfully.
