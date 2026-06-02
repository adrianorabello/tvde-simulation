# TVDE Questions Import Report

This report summarizes the process of reading, validating, and converting the TVDE questions spreadsheet data into the React application's JSON structure.

## Import Statistics

| Metric | Count | Details / Notes |
| :--- | :--- | :--- |
| **Total rows read from XLSX** | 296 | All rows containing question data starting from row 2 |
| **Total questions generated** | 296 | Successfully mapped questions to JSON |
| **Number of questions with images** | 296 | All imported questions belong to the `Questions_With_Images` sheet |
| **Number of questions without images** | 0 | No questions in this sheet are without an image |
| **Number of questions with correct answer** | 0 | All answer keys are currently empty in the spreadsheet |
| **Number of questions pending answer key** | 296 | Evaluates as `pending-answer-key` in the React simulator |
| **Skipped rows** | 0 | No rows were skipped during conversion |

---

## Data Inconsistencies Found

During validation, the following questions were identified with structural inconsistencies in their options:

1. **Question 206** (Row 187, ID: `131882`):
   - **Issue:** Has zero answer options (columns `Option A` through `Option D` are empty).
   - **Content:** *"Numa situação de epistaxis (hemorragia pelo nariz), o socorrista deve:"*
   - **Resolution:** Preserved in the JSON output with an empty `options` object `{}`.

2. **Question 216** (Row 197, ID: `131893`):
   - **Issue:** Has only one answer option (`Option A` is defined, others are empty).
   - **Content:** *"Quando ocorre um incêndio num veículo, o motorista deve adoptar certos procedimentos. Das seguintes hipóteses, qual é aquela que não deve ser adoptada:"*
   - **Resolution:** Preserved in the JSON output with options containing only option `"A"`: `{"A": "Ligar os 4 indicadores de mudança de direcção"}`.

---

## Image Mapping Details
All questions on the `Questions_With_Images` sheet were mapped to `imageUrl` values using the standard pattern:
```
/images/question-{questionNumber}.png
```
Example: For Question 21, the mapped image path is `/images/question-21.png`.
