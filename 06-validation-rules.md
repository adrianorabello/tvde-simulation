# Validation Rules

The application must validate the selected answer against `correctResponseLetter`.

## Rules

1. If the user did not select an answer:
   - Status: `unanswered`

2. If the question has an empty `correctResponseLetter`:
   - Status: `pending-answer-key`

3. If the selected answer is equal to `correctResponseLetter`:
   - Status: `correct`

4. If the selected answer is different from `correctResponseLetter`:
   - Status: `wrong`

## Score Calculation

Pending answer-key questions must not count as correct or wrong.

Unanswered questions must not count as correct or wrong.

The score percentage must be calculated only using valid answered questions:

```txt
validQuestions = correct + wrong
percentage = correct / validQuestions * 100
```

If `validQuestions` is zero, percentage must be zero.
