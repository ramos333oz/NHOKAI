# Contact Modal Design

## Context

The desktop and mobile `Let's Connect` buttons currently do not open contact information. The site should keep users in the same page and show a polished contact surface that matches the NHOKAI visual style.

## Goal

When a user clicks `Let's Connect`, open an in-page modal overlay with Omar's contact details:

- Name: Omar
- Phone: `+60135406421`
- Email: `Inquiry@nhokai.com`

## Design

Use a centered modal overlay rather than a new browser tab. The overlay will dim and blur the current page, keeping the user oriented inside the website. The modal will use the NHOKAI logo, rounded borders, white and neutral surfaces, compact dark action buttons, and subtle shadows to match the existing header and page container.

The modal will include:

- A close button in the top-right.
- The NHOKAI logo as a visual header.
- Omar's name and role-style contact label.
- Phone and email rows with clear labels and clickable actions.
- `tel:` and `mailto:` links for quick contact.

The modal will close when the close button is clicked, when the user clicks the dimmed backdrop, or when the user presses `Escape`.

## Testing

Verify that:

- The app builds successfully.
- Desktop `Let's Connect` opens the modal.
- Mobile drawer `Let's Connect` closes the drawer and opens the modal.
- The modal shows Omar, `+60135406421`, and `Inquiry@nhokai.com`.
- The close button, backdrop click, and `Escape` close the modal.
