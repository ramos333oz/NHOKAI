# Unicart Logo Gradient Layering Design

## Context

The Solutions section has a top white wash that blends the Team-to-Solutions boundary. That wash currently sits above the Solutions content, which fades the UC logo and makes it look washed out.

## Goal

Keep the section transition blended while ensuring the UC logo and Solutions content render clearly.

## Design

Raise the Solutions content above the top wash and soften the wash opacity/height. This preserves the smooth section transition without placing a white gradient over the UC logo.

## Testing

Verify that:

- The app builds successfully.
- The Solutions content wrapper has a higher z-index than the transition wash.
- The UC logo is no longer covered by the wash.
