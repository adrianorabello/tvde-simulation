const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Paths – adjust if needed
const INPUT_XLSX = path.resolve(__dirname, '../tvde_questions_with_images_answer_key.xlsx');
const OUTPUT_JSON = path.resolve(__dirname, '../src/data/answer_key.json');

function main() {
  const workbook = xlsx.readFile(INPUT_XLSX);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' });

  // Expect columns like "Number" and "Correct"
  const numberCol = Object.keys(rows[0]).find(c => /number/i.test(c));
  const answerCol = Object.keys(rows[0]).find(c => /correct/i.test(c) || /answer/i.test(c));

  if (!numberCol || !answerCol) {
    console.error('Could not locate required columns in the Excel file.');
    process.exit(1);
  }

  const mapping = rows.map(r => {
    const num = Number(r[numberCol]);
    const ans = String(r[answerCol]).trim().toUpperCase();
    return { questionNumber: num, correctResponseLetter: ans };
  });

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(mapping, null, 2), 'utf8');
  console.log(`Wrote ${mapping.length} answer entries to ${OUTPUT_JSON}`);
}

if (require.main === module) {
  main();
}
