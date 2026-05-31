# Team Card Shared Image Design

## Context

The team directory in `src/App.tsx` uses a horizontal accordion of profile cards. Each card currently renders a per-member `imageUrl` as the full-card image, with a dark gradient overlay and profile details layered above it when the card is active.

The requested change is to use the local image `pictures/omarb.png` for every team card. The same image should be visible when a card is collapsed and when a card is expanded.

## Goals

- Use `pictures/omarb.png` as the shared image for every team card.
- Preserve the existing accordion layout, hover/click behavior, transitions, overlays, and profile text.
- Keep the image filling the entire card in both collapsed and expanded states.
- Maintain text readability by keeping the existing dark vignette overlay.

## Non-Goals

- Do not redesign the team card layout.
- Do not create separate per-member portraits.
- Do not add a second image block inside the expanded card.
- Do not change navigation, filtering, or the Solutions view.

## Proposed Approach

Import `pictures/omarb.png` into `src/App.tsx` and render that imported asset as the `src` for the image inside each team card. This keeps Vite's asset handling intact and avoids relying on a fragile relative public path.

Remove the per-member `imageUrl` field from the `TeamMember` interface and team data because it will no longer drive rendering. The behavior should be driven by one shared local image constant so every card is visually consistent.

## User Experience

When the team page is shown:

- Collapsed cards display `omarb.png` as the card image behind the compact icon and vertical label.
- The active card displays `omarb.png` as the expanded card image/background.
- Existing dark overlays, labels, skills, email text, icons, and transitions continue to work as before.

## Testing

- Run the TypeScript/build command to confirm the import and component compile.
- Open `http://localhost:3000/`, switch to the team view, and visually confirm both collapsed and expanded cards show `omarb.png`.
- Check a desktop viewport around 1280px wide and a mobile viewport around 390px wide to confirm the image fills cards without obvious clipping or blank states.

## Open Decisions

No open design decisions remain. The approved implementation is the shared full-card image approach.
