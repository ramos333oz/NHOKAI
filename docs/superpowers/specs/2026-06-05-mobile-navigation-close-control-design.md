# Mobile Navigation Close Control Design

## Context

On phone-sized viewports, the mobile navigation opens as a full-screen drawer from the right. Navigation link clicks close the drawer, but the open drawer does not show a clear close control inside the overlay. This makes it feel stuck if the user opens the menu and wants to dismiss it without choosing a link.

## Goal

Add an obvious close affordance to the opened mobile navigation drawer.

## Design

Add a small circular `X` button inside the mobile drawer at the top-right. The button will:

- Only appear in the mobile drawer.
- Call `setIsMobileMenuOpen(false)` when clicked.
- Use `aria-label="Close mobile menu"` for accessibility.
- Match the existing dark text, pale background, and subtle border style.
- Sit above the navigation links without shifting the desktop header.

The existing burger button can still toggle the menu. Existing nav links will continue to close the menu through `handleLinkClick`.

## Testing

Verify that:

- The app builds successfully.
- On a mobile viewport, opening the menu reveals the close button.
- Pressing the close button hides the drawer.
- Existing nav links still close the drawer.
- Desktop navigation remains unchanged.
