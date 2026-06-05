# Mobile Navigation Close Control Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an obvious close button to the opened phone navigation drawer.

**Architecture:** The menu open state already lives in `src/App.tsx` as `isMobileMenuOpen`. Add a mobile-only button inside the existing drawer that calls `setIsMobileMenuOpen(false)` without changing desktop navigation or the existing burger toggle.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS utility classes.

---

## File Structure

- Modify: `src/App.tsx`
  - Add the close button inside `#mobile-navigation-overlay`.
  - Keep the existing `handleLinkClick` behavior unchanged.
- No new runtime files are needed.

### Task 1: Add Mobile Drawer Close Button

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Inspect the current drawer markup**

Run:

```powershell
$lines = Get-Content -Path src\App.tsx; $lines[532..590]
```

Expected: Output shows `#mobile-navigation-overlay`, the mobile nav links, and the mobile CTA.

- [ ] **Step 2: Add the close button above the nav links**

Inside the `div` with `id="mobile-navigation-overlay"`, before the `<nav className="flex flex-col...">`, add:

```tsx
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close mobile menu"
          className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-[#111111] shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-200 hover:bg-white active:scale-95"
        >
          <span aria-hidden="true" className="text-[28px] leading-none">
            &times;
          </span>
        </button>
```

Expected: The drawer now has a visible top-right `X` button that closes it.

- [ ] **Step 3: Run the build**

Run:

```powershell
npm.cmd run build
```

Expected: Build completes successfully.

- [ ] **Step 4: Verify in the in-app browser**

Open `http://localhost:3000/` at a phone-sized viewport, open the burger menu, and confirm:

- The close button is visible near the top-right of the overlay.
- Clicking it slides the drawer closed.
- Clicking `Home`, `Our Team`, or `Solutions` still closes the drawer.
- Desktop navigation is unchanged at wider viewports.
