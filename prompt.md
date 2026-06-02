Read the Excel file `tvde_questions_with_images_answer_key.xlsx` and use it as the source of truth to generate the TVDE questions data for the React application.

Goal:
Convert the XLSX content into a clean JSON file used by the frontend application.

Target output file:
`src/data/questions.json`

Expected JSON model:

```ts
export type OptionLetter = "A" | "B" | "C" | "D";

export type Question = {
  questionNumber: number;
  questionId: string;
  page: number;
  group: string;
  question: string;
  options: Partial<Record<OptionLetter, string>>;
  correctResponseLetter: OptionLetter | "";
  correctResponseText: string;
  imageUrl?: string;
};
```

Instructions:

1. Open and read the XLSX file.
2. Inspect the available columns before transforming the data.
3. Map each row from the spreadsheet to one question object.
4. Preserve the original question number.
5. Preserve the original question ID.
6. Preserve the page number if available.
7. Preserve the group/category.
8. Preserve the full question text.
9. Preserve all available answer options: A, B, C, and D.
10. Preserve the correct response letter.
11. Preserve the correct response text.
12. If the correct response letter is empty, keep it as an empty string.
13. If an option does not exist, do not create an empty option value.
14. If the question has an image reference, map it to `imageUrl`.
15. Use this image path pattern when possible:

```txt
/images/question-{questionNumber}.png
```

Example:

```json
{
  "questionNumber": 21,
  "questionId": "677",
  "page": 5,
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

Data validation rules:

* `questionNumber` must be a number.
* `questionId` must be a string.
* `page` must be a number when available.
* `group` must be a string.
* `question` must be a non-empty string.
* `options` must contain only existing options.
* `correctResponseLetter` must be `"A"`, `"B"`, `"C"`, `"D"`, or `""`.
* `correctResponseText` must match the text of the correct option when available.
* Do not invent missing correct answers.
* Do not invent missing options.
* Do not remove questions unless the row is completely invalid.

After creating `src/data/questions.json`, update the React application to import and use this data.

Also create a short report file:

`src/data/questions-import-report.md`

The report must include:

* Total rows read from XLSX.
* Total questions generated.
* Number of questions with images.
* Number of questions without images.
* Number of questions with correct answer.
* Number of questions pending answer key.
* Any skipped rows and the reason.
* Any data inconsistencies found.

Important:
Do not change the validation logic of the app.
Only replace the example data with the data generated from the XLSX file.
Keep the frontend compatible with the existing `Question` type.
