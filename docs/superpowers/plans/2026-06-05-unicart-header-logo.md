# Unicart Header Logo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the selected Solutions page product header with a centered Unicart brand intro using the requested PNG logo.

**Architecture:** Keep the change inside `src/components/SolutionsView.tsx`. Import the PNG asset through Vite, render it through a small `UnicartLogo` component, and update only the featured product header markup.

**Tech Stack:** React 19, TypeScript, Vite asset imports, Tailwind utility classes.

---

### Task 1: Update Header Logo And Copy

**Files:**
- Modify: `src/components/SolutionsView.tsx`

- [ ] **Step 1: Import the requested logo asset**

Add this import below the lucide-react imports:

```tsx
import ucLogo from "../../Logo/UC-bg-removed.png";
```

- [ ] **Step 2: Replace the inline SVG with an image renderer**

Replace the existing logo component with:

```tsx
const UnicartLogo = () => (
  <img
    src={ucLogo}
    alt="Unicart logo"
    className="h-20 w-20 md:h-24 md:w-24 object-contain shrink-0 select-none transition-transform duration-300 group-hover/logo:scale-105"
    draggable={false}
  />
);
```

- [ ] **Step 3: Center the featured product header**

Replace the current `featured-product-header` block with a centered column layout that renders `Unicart`, one concise description, a subtle divider, and the logo container below the copy.

- [ ] **Step 4: Build**

Run: `npm.cmd run build`

Expected: Vite completes successfully and emits `dist`.

- [ ] **Step 5: Browser check**

Open `http://localhost:3000/` in the in-app browser and confirm the selected header displays the PNG logo, centered `Unicart` copy, and no `Mobile-first student marketplace built for verified UiTM campuses.` phrase.
