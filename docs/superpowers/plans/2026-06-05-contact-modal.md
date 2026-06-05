# Contact Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a polished contact modal opened by the `Let's Connect` buttons.

**Architecture:** Keep the feature inside `src/App.tsx`, where the navigation button state already lives. Add one boolean modal state, wire both CTA buttons to open it, and render a fixed overlay modal near the top of the component tree. Use the existing NHOKAI logo asset and lucide icons for contact actions.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, lucide-react.

---

## File Structure

- Modify: `src/App.tsx`
  - Import contact/action icons from `lucide-react`.
  - Add `isContactModalOpen` state.
  - Add an `Escape` key effect.
  - Add a `handleOpenContactModal` helper.
  - Wire desktop and mobile `Let's Connect` buttons.
  - Render the contact modal overlay.

### Task 1: Contact Modal

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Verify modal state does not already exist**

Run:

```powershell
rg -n "isContactModalOpen|handleOpenContactModal|contact-modal" src\App.tsx
```

Expected: No matches.

- [ ] **Step 2: Add modal state and handlers**

Add:

```tsx
const [isContactModalOpen, setIsContactModalOpen] = useState(false);

const handleOpenContactModal = () => {
  setIsMobileMenuOpen(false);
  setIsContactModalOpen(true);
};
```

Add an `Escape` key effect that closes the modal when `isContactModalOpen` is true.

- [ ] **Step 3: Wire both CTA buttons**

Set both `#cta-connect-desktop` and `#cta-connect-mobile` to:

```tsx
onClick={handleOpenContactModal}
```

Expected: Both buttons open the same modal, and the mobile drawer closes first.

- [ ] **Step 4: Render the modal overlay**

Render a fixed overlay when `isContactModalOpen` is true. Include the NHOKAI logo, Omar's name, `+60135406421`, `Inquiry@nhokai.com`, `tel:` and `mailto:` links, a close button, backdrop click close, and `stopPropagation()` on the modal panel.

- [ ] **Step 5: Run build**

Run:

```powershell
npm.cmd run build
```

Expected: Build completes successfully.

- [ ] **Step 6: Verify source markers**

Run:

```powershell
rg -n "Omar|\+60135406421|Inquiry@nhokai.com|contact-modal" src\App.tsx
```

Expected: Matches show the modal content and id.
