# Data Model

Use a local JSON file first:

`src/data/questions.json`

Each question must follow this structure:

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

## TypeScript Types

Create the following types:

```ts
export type OptionLetter = "A" | "B" | "C" | "D";

export type Question = {
  questionNumber: number;
  questionId: string;
  group: string;
  question: string;
  options: Partial<Record<OptionLetter, string>>;
  correctResponseLetter: OptionLetter | "";
  correctResponseText: string;
  imageUrl?: string;
};

export type UserAnswers = Record<number, OptionLetter>;

export type ResultStatus =
  | "correct"
  | "wrong"
  | "pending-answer-key"
  | "unanswered";

export type QuizResult = {
  total: number;
  answered: number;
  correct: number;
  wrong: number;
  pending: number;
  unanswered: number;
  percentage: number;
};
```
