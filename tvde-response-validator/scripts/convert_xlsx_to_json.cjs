const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Adjust paths relative to project root
const INPUT_XLSX = path.resolve(__dirname, '../../tvde_questions_with_images_answer_key_updated_v2.xlsx');
const OUTPUT_JSON = path.resolve(__dirname, '../src/data/answer_key.json');

function main() {
  const workbook = xlsx.readFile(INPUT_XLSX);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' });

  const numberCol = Object.keys(rows[0]).find(c => /number/i.test(c) || /question/i.test(c));
  const answerCol = Object.keys(rows[0]).find(c => /answer/i.test(c) || /correct/i.test(c));

  if (!numberCol || !answerCol) {
    console.error('Could not locate required columns in the Excel file.');
    process.exit(1);
  }

  const answerKey = rows.map(row => {
    const qNum = Number(row[numberCol]);
    const ans = String(row[answerCol] ?? '').trim().toUpperCase();
    return { questionNumber: qNum, correctResponseLetter: ans };
  });

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(answerKey, null, 2), 'utf8');
  console.log(`Wrote ${answerKey.length} entries to ${OUTPUT_JSON}`);
}

if (require.main === module) {
  main();
}
