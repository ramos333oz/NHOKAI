# Section Seam Polish Design

## Context

The transition between the Team and Solutions sections shows a subtle horizontal seam. The floating navigation tab and main page frame also use hard borders that make the surface feel slightly outlined instead of softly blended.

## Goal

Make the page sections blend together cleanly and polish the floating navigation/tab texture.

## Design

Use a targeted visual polish pass:

- Replace the hard main page frame border with a softer transparent ring and shadow.
- Replace the floating header tab's hard borders with a soft ring, blur, and shadow.
- Strengthen the Team section's bottom feather so it fades fully into white.
- Add a soft top wash to the Solutions section so the transition from Team into Solutions feels continuous.

This keeps the existing layout, content, and navigation behavior intact while removing the visible seam.

## Testing

Verify that:

- The app builds successfully.
- Team and Solutions no longer have a sharp visible boundary.
- The floating header/tab still reads as a polished surface without hard border lines.
- Existing navigation, modal, and mobile menu behavior remain unchanged.
