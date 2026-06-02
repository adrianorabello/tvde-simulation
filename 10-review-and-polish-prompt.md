# Review and Polish Prompt

Review the current React + TypeScript application and improve the code quality and user interface.

Check the following:

## TypeScript

- Remove any usage of `any`.
- Ensure all props have proper types.
- Ensure JSON data is correctly typed.
- Ensure strict TypeScript mode passes.

## React

- Keep components small and reusable.
- Avoid duplicated logic.
- Use `useMemo` only where it makes sense.
- Use `useEffect` correctly for localStorage.
- Avoid unnecessary re-renders.

## UI/UX

- Improve spacing, alignment, typography, and visual hierarchy.
- Make the interface cleaner and more professional.
- Improve mobile responsiveness.
- Make selected answers very clear.
- Make result statuses easy to understand.

## Accessibility

- Ensure buttons are keyboard friendly.
- Ensure color is not the only way to understand status.
- Add useful aria-labels where needed.
- Ensure image alt text is meaningful.

## Validation

- Confirm that pending answer-key questions are not counted as correct or wrong.
- Confirm that unanswered questions are counted separately.
- Confirm that percentage is calculated only using correct + wrong questions.

## Final polish

- Run lint and fix issues.
- Run build and fix errors.
- Keep the final application simple, clean, and beautiful.
