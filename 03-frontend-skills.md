# Frontend Skills

Act as a senior frontend engineer and UI/UX designer.

Apply the following skills:

## React Architecture

Use React with TypeScript and functional components.

Create small, reusable, and focused components.

Avoid large components with too much responsibility.

Prefer clear separation between:

- UI components
- Business logic
- Type definitions
- Utility functions
- Static data

## TypeScript Quality

Use strong TypeScript types.

Do not use `any`.

Create explicit types for:

- Question
- Option letter
- User answers
- Result status
- Quiz result

## State Management

Use simple React state.

Use:

- `useState` for current question and selected answers
- `useEffect` for localStorage persistence
- `useMemo` for calculated results when useful

Do not add Redux, Zustand, or other state libraries unless strictly necessary.

## Code Quality

Write readable, clean, and maintainable code.

Use meaningful names.

Avoid duplicated logic.

Keep validation logic outside UI components when possible.

## Accessibility

The interface must be keyboard friendly.

Do not rely only on colors to communicate status.

Use semantic HTML where possible.

Buttons must have clear labels.

Images must have meaningful alt text.
