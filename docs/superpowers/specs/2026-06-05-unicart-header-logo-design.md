# Unicart Header Logo Design

## Goal

Update the selected Solutions page featured product header so it uses the requested Unicart logo asset and presents the app name and description as a centered brand moment.

## Requirements

- Use `Logo/UC-bg-removed.png` for the Unicart logo instead of the current inline SVG logo.
- Display the product name as `Unicart`.
- Remove the phrase `Mobile-first student marketplace built for verified UiTM campuses.`
- Center the product name and description inside the featured header.
- Place the logo in a polished area that visually relates to the phone emulator below the header.
- Keep the styling consistent with the existing NHOKAI page: soft white surfaces, subtle burgundy accents, restrained shadows, and rounded-but-not-oversized UI.

## Design

The featured header becomes a centered vertical intro. The text block contains the `Unicart` heading, a short burgundy divider, and one concise description focused on trusted campus trading. The logo sits in a white translucent rounded container below the copy, giving it a deliberate brand placement rather than a detached side badge.

## Scope

Only `src/components/SolutionsView.tsx` is changed. Existing app structure, capability cards, and phone emulator behavior remain unchanged.

## Verification

Run the production build and inspect the existing localhost page in the in-app browser to confirm the logo renders, the heading is centered, and the removed phrase no longer appears in the selected section.
