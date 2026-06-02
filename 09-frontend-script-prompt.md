# Frontend Script Prompt

Now implement the frontend interface for the `tvde-response-validator` React application.

Follow the approved configuration, architecture, data model, validation rules, and UI/UX guidelines.

Goal:
Build a clean, simple, modern, beautiful, and responsive interface for studying TVDE exam questions and validating responses.

Functional requirements:

1. Show the app title: “TVDE Response Validator”.
2. Show a short subtitle: “Practice your TVDE exam questions and validate your answers.”
3. Show current progress:
   - Current question number
   - Total questions
   - Answered questions
   - Progress percentage
4. Display the current question inside a clean card.
5. Display:
   - Question number
   - Group/category
   - Question text
   - Image, if `imageUrl` exists
   - Answer options
6. Allow the user to select only one option per question.
7. The selected option must have a clear visual state.
8. Add navigation buttons:
   - Previous
   - Next
   - Finish Test
   - Reset
9. Disable Previous on the first question.
10. Show Finish Test only on the last question.
11. Save user answers in localStorage.
12. Restore user answers from localStorage when the app reloads.
13. Add a reset confirmation before clearing the test.
14. After finishing, show a result screen.

Result screen must show:

- Total questions
- Answered questions
- Correct answers
- Wrong answers
- Pending answer-key questions
- Unanswered questions
- Score percentage

Also create a review table with:

- Question number
- User selected answer
- Correct answer
- Status

Status labels:

- Correct
- Wrong
- Pending answer key
- Unanswered

Design requirements:

- Clean and professional interface
- Centered content
- Maximum width around 900px
- Soft background color
- White cards
- Rounded borders
- Subtle shadows
- Good spacing
- Clear typography
- Responsive layout for mobile and desktop
- Buttons with hover and disabled states
- Do not make the design too colorful or visually noisy

Accessibility requirements:

- All buttons must be keyboard accessible.
- Do not rely only on color to show status.
- Add clear text labels for status.
- Images must have meaningful alt text.
- Use semantic HTML where possible.

Components to implement:

- Header
- Layout
- ProgressBar
- QuestionCard
- OptionButton
- ResultSummary
- ReviewTable

Use the existing TypeScript types and utility functions.
Keep the code clean, simple, and maintainable.
Avoid unnecessary libraries.
Do not use `any`.
