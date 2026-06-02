# Main Script Prompt

I want to configure a project before creating the code.

The project is called `tvde-response-validator`.

It is a React + TypeScript + Vite application for validating TVDE exam responses.

Your role:
Act as a senior frontend engineer and UI/UX designer specialized in React, TypeScript, accessibility, clean interfaces, and educational applications.

Application goal:
Create a clean, simple, modern, and beautiful application where the user can practice TVDE exam questions, select answers, validate responses, and review the final result.

Important:
Do not overengineer the application.
Do not create a backend.
Do not add authentication.
Do not add unnecessary libraries.
The first version must use local JSON data.

The application must use:

- React
- TypeScript
- Vite
- Local JSON data
- LocalStorage
- CSS Modules or plain CSS
- ESLint
- Prettier

The application must have:

- One question per screen
- Question image support
- Multiple-choice answers
- Selected answer state
- Previous and Next navigation
- Finish Test action
- Reset Test action
- LocalStorage persistence
- Final result screen
- Review table

The application must validate answers using this rule:

- Compare the selected option with `correctResponseLetter`.
- If the answer matches, mark as correct.
- If the answer is different, mark as wrong.
- If `correctResponseLetter` is empty, mark as pending answer key.
- If the question was not answered, mark as unanswered.
- Pending answer-key questions must not count as correct or wrong.
- Unanswered questions must not count as correct or wrong.
- Score percentage must be calculated only from correct + wrong questions.

Use this data model:

```json
{
  "questionNumber": 21,
  "questionId": "677",
  "group": "2A Ultrapassagem",
  "question": "Nesta situação posso ultrapassar o automóvel de cor preta?",
  "options": {
    "A": "Posso pela direita porque a via está livre.",
    "B": "Não posso.",
    "C": "Não posso, porque a ultrapassagem faz-se pelo lado esquerdo."
  },
  "correctResponseLetter": "B",
  "correctResponseText": "Não posso.",
  "imageUrl": "/images/question-21.png"
}
```

Expected project structure:

```txt
tvde-response-validator/
├── package.json
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── .gitignore
├── .prettierrc
├── eslint.config.js
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── styles.css
    ├── data/
    │   └── questions.json
    ├── types/
    │   └── quiz.types.ts
    ├── utils/
    │   └── quiz.utils.ts
    └── components/
        ├── Header.tsx
        ├── Layout.tsx
        ├── ProgressBar.tsx
        ├── QuestionCard.tsx
        ├── OptionButton.tsx
        ├── ResultSummary.tsx
        └── ReviewTable.tsx
```

Before writing code, analyze this configuration and confirm:

1. The application architecture.
2. The component responsibilities.
3. The data model.
4. The validation rules.
5. The UI/UX direction.
6. Any potential risks or improvements.

Do not start implementation yet.
First provide a structured implementation plan.
