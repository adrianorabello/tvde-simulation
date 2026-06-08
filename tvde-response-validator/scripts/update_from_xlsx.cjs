#!/usr/bin/env node
/**
 * TVDE Answer Key Migration Script
 *
 * Reads the official IMT simulator answer key from
 * `tvde_questions_with_images_answer_key_updated.xlsx`
 * and updates `questions.json` and `answer_key.json` accordingly.
 *
 * Usage:
 *   node scripts/update_from_xlsx.cjs                 # Full update
 *   node scripts/update_from_xlsx.cjs --validate-only # Dry-run validation only
 *
 * Produces a validation report at src/data/validation-report.md
 */

const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const XLSX_PATH = path.resolve(
  __dirname,
  '../../tvde_questions_with_images_answer_key_updated.xlsx',
);
const QUESTIONS_PATH = path.resolve(__dirname, '../src/data/questions.json');
const ANSWER_KEY_PATH = path.resolve(__dirname, '../src/data/answer_key.json');
const REPORT_PATH = path.resolve(
  __dirname,
  '../src/data/validation-report.md',
);

const VALIDATE_ONLY = process.argv.includes('--validate-only');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readXlsx() {
  if (!fs.existsSync(XLSX_PATH)) {
    console.error(`ERROR: XLSX file not found at ${XLSX_PATH}`);
    process.exit(1);
  }
  const workbook = xlsx.readFile(XLSX_PATH);
  const sheetName = workbook.SheetNames[0]; // "Questions_With_Images"
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet, { defval: '' });
}

function readQuestions() {
  if (!fs.existsSync(QUESTIONS_PATH)) {
    console.error(`ERROR: questions.json not found at ${QUESTIONS_PATH}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf8'));
}

function sanitize(str) {
  return String(str ?? '')
    .trim()
    .replace(/\u00a0/g, ' '); // replace &nbsp; with regular space
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('');
  console.log('='.repeat(60));
  console.log('  TVDE Answer Key Migration');
  console.log(
    VALIDATE_ONLY ? '  Mode: VALIDATE ONLY (dry run)' : '  Mode: FULL UPDATE',
  );
  console.log('='.repeat(60));
  console.log('');

  // 1. Read sources
  const xlsxRows = readXlsx();
  const questions = readQuestions();

  // Build lookup map: questionNumber -> question object
  const qMap = new Map();
  questions.forEach((q) => qMap.set(q.questionNumber, q));

  // 2. Process XLSX rows
  const report = {
    totalXlsxRows: xlsxRows.length,
    totalQuestionsInDb: questions.length,
    withAnswerInXlsx: 0,
    emptyAnswerInXlsx: 0,
    matched: 0, // already correct
    updated: 0, // answer changed
    notFoundInDb: [],
    conflicts: [],
    updatedDetails: [],
    integrityErrors: [],
    validated: 0,
  };

  for (const row of xlsxRows) {
    const num = Number(row['Question Number']);
    const xlsxLetter = sanitize(row['Correct Response Letter']).toUpperCase();
    const xlsxText = sanitize(row['Correct Response Text']);

    // Track empty answers
    if (!xlsxLetter) {
      report.emptyAnswerInXlsx++;
      continue;
    }

    report.withAnswerInXlsx++;

    // Find question in DB
    const q = qMap.get(num);
    if (!q) {
      report.notFoundInDb.push({ questionNumber: num, xlsxLetter });
      continue;
    }

    // Check if option exists for the letter
    const optionText = q.options[xlsxLetter];
    const derivedText = optionText ? sanitize(optionText) : '';

    // Guard: if the XLSX letter points to a non-existent option, skip this
    // question and leave it as pending (common for True/False questions where
    // the XLSX mistakenly assigns "C").
    const validLetters = Object.keys(q.options);
    if (validLetters.length > 0 && !validLetters.includes(xlsxLetter)) {
      report.skippedInvalidOption = report.skippedInvalidOption || [];
      report.skippedInvalidOption.push({
        questionNumber: num,
        xlsxLetter,
        validOptions: validLetters.join(', '),
        question: q.question.substring(0, 60),
      });
      // Revert to empty/pending
      if (!VALIDATE_ONLY) {
        q.correctResponseLetter = '';
        q.correctResponseText = '';
      }
      continue;
    }

    // Detect conflicts: XLSX text doesn't match the option text for that letter
    if (
      xlsxText &&
      derivedText &&
      xlsxText !== derivedText &&
      // Allow minor whitespace differences
      xlsxText.replace(/\s+/g, ' ') !== derivedText.replace(/\s+/g, ' ')
    ) {
      report.conflicts.push({
        questionNumber: num,
        letter: xlsxLetter,
        xlsxText: xlsxText.substring(0, 80),
        optionText: derivedText.substring(0, 80),
      });
    }

    // Check if already matching
    const currentLetter = q.correctResponseLetter || '';
    if (currentLetter === xlsxLetter) {
      report.matched++;
    } else {
      report.updated++;
      report.updatedDetails.push({
        questionNumber: num,
        oldLetter: currentLetter || '(empty)',
        newLetter: xlsxLetter,
        oldText: sanitize(q.correctResponseText).substring(0, 60),
        newText: (xlsxText || derivedText).substring(0, 60),
      });
    }

    // Apply update (even if matching, to ensure text consistency)
    if (!VALIDATE_ONLY) {
      q.correctResponseLetter = xlsxLetter;
      q.correctResponseText = xlsxText || derivedText || '';
    }
  }

  // 3. Data integrity validation
  console.log('Running data integrity checks...\n');

  const seenNumbers = new Set();
  for (const q of questions) {
    // Duplicate check
    if (seenNumbers.has(q.questionNumber)) {
      report.integrityErrors.push(
        `DUPLICATE: Question ${q.questionNumber} appears more than once`,
      );
    }
    seenNumbers.add(q.questionNumber);

    // Correct answer validity
    if (q.correctResponseLetter && q.correctResponseLetter !== '') {
      const validLetters = Object.keys(q.options);
      if (
        validLetters.length > 0 &&
        !validLetters.includes(q.correctResponseLetter)
      ) {
        report.integrityErrors.push(
          `INVALID_OPTION: Question ${q.questionNumber} has correctResponseLetter="${q.correctResponseLetter}" but options only contain [${validLetters.join(', ')}]`,
        );
      }
    }

    // Count validated questions
    if (q.correctResponseLetter && q.correctResponseLetter !== '') {
      report.validated++;
    }
  }

  // 4. Print summary
  console.log('=== SUMMARY ===');
  console.log(`Total XLSX rows:              ${report.totalXlsxRows}`);
  console.log(`Total questions in DB:        ${report.totalQuestionsInDb}`);
  console.log(`XLSX rows with answer:        ${report.withAnswerInXlsx}`);
  console.log(`XLSX rows without answer:     ${report.emptyAnswerInXlsx}`);
  console.log(`Already matching:             ${report.matched}`);
  console.log(`Updated (changed):            ${report.updated}`);
  console.log(`Not found in DB:              ${report.notFoundInDb.length}`);
  console.log(`Data conflicts:               ${report.conflicts.length}`);
  console.log(`Skipped (invalid option):     ${(report.skippedInvalidOption || []).length}`);
  console.log(`Integrity errors:             ${report.integrityErrors.length}`);
  console.log(`Questions with valid answer:   ${report.validated}`);
  console.log('');

  if ((report.skippedInvalidOption || []).length > 0) {
    console.log('⚠️  SKIPPED (XLSX letter points to non-existent option):');
    report.skippedInvalidOption.forEach((s) => {
      console.log(`   Q${s.questionNumber}: letter "${s.xlsxLetter}" not in [${s.validOptions}] — set to pending`);
    });
    console.log('');
  }

  if (report.integrityErrors.length > 0) {
    console.log('⚠️  INTEGRITY ERRORS:');
    report.integrityErrors.forEach((e) => console.log(`   - ${e}`));
    console.log('');
  }

  if (report.conflicts.length > 0) {
    console.log('⚠️  DATA CONFLICTS (XLSX text ≠ option text for letter):');
    report.conflicts.forEach((c) => {
      console.log(`   Q${c.questionNumber} [${c.letter}]:`);
      console.log(`     XLSX: "${c.xlsxText}"`);
      console.log(`     Option: "${c.optionText}"`);
    });
    console.log('');
  }

  // 5. Write updated files
  if (!VALIDATE_ONLY) {
    // Write questions.json
    fs.writeFileSync(
      QUESTIONS_PATH,
      JSON.stringify(questions, null, 2),
      'utf8',
    );
    console.log(`✅ Updated ${QUESTIONS_PATH}`);

    // Regenerate answer_key.json
    const answerKey = questions.map((q) => ({
      questionNumber: q.questionNumber,
      correctResponseLetter: q.correctResponseLetter || '',
    }));
    fs.writeFileSync(
      ANSWER_KEY_PATH,
      JSON.stringify(answerKey, null, 2),
      'utf8',
    );
    console.log(`✅ Updated ${ANSWER_KEY_PATH}`);
  } else {
    console.log('ℹ️  Validate-only mode: no files were modified.');
  }

  // 6. Generate validation report
  const reportLines = [];
  reportLines.push('# TVDE Answer Key Validation Report');
  reportLines.push('');
  reportLines.push(
    `> Generated at: ${new Date().toISOString()}`,
  );
  reportLines.push(
    `> Source: \`tvde_questions_with_images_answer_key_updated.xlsx\``,
  );
  reportLines.push(
    `> Mode: ${VALIDATE_ONLY ? 'Validate Only (dry run)' : 'Full Update'}`,
  );
  reportLines.push('');
  reportLines.push('## Summary');
  reportLines.push('');
  reportLines.push('| Metric | Count |');
  reportLines.push('|:---|:---|');
  reportLines.push(`| Total questions processed | ${report.totalXlsxRows} |`);
  reportLines.push(
    `| Total questions in database | ${report.totalQuestionsInDb} |`,
  );
  reportLines.push(
    `| Questions with answer in XLSX | ${report.withAnswerInXlsx} |`,
  );
  reportLines.push(
    `| Questions without answer in XLSX | ${report.emptyAnswerInXlsx} |`,
  );
  reportLines.push(`| Already matching (no change) | ${report.matched} |`);
  reportLines.push(`| **Questions updated** | **${report.updated}** |`);
  reportLines.push(
    `| Questions not found in database | ${report.notFoundInDb.length} |`,
  );
  reportLines.push(
    `| Questions with data conflicts | ${report.conflicts.length} |`,
  );
  reportLines.push(`| Skipped (invalid option in XLSX) | ${(report.skippedInvalidOption || []).length} |`);
  reportLines.push(`| Data integrity errors | ${report.integrityErrors.length} |`);
  reportLines.push(
    `| Questions successfully validated | ${report.validated} |`,
  );
  reportLines.push('');

  // Skipped invalid option section
  if ((report.skippedInvalidOption || []).length > 0) {
    reportLines.push('## ⚠️ Skipped — Invalid Option Letter in XLSX');
    reportLines.push('');
    reportLines.push('These questions have a `Correct Response Letter` in the XLSX that does not correspond to any available option. They were set to pending (empty answer).');
    reportLines.push('');
    reportLines.push('| Question # | XLSX Letter | Valid Options | Question Text |');
    reportLines.push('|:---|:---|:---|:---|');
    report.skippedInvalidOption.forEach((s) => {
      reportLines.push(`| ${s.questionNumber} | ${s.xlsxLetter} | ${s.validOptions} | ${s.question} |`);
    });
    reportLines.push('');
  }

  // Integrity errors section
  if (report.integrityErrors.length > 0) {
    reportLines.push('## ⚠️ Integrity Errors');
    reportLines.push('');
    report.integrityErrors.forEach((e) => {
      reportLines.push(`- ${e}`);
    });
    reportLines.push('');
  }

  // Data conflicts section
  if (report.conflicts.length > 0) {
    reportLines.push('## ⚠️ Data Conflicts');
    reportLines.push('');
    reportLines.push(
      'These questions have a mismatch between the XLSX `Correct Response Text` and the actual option text for the given letter:',
    );
    reportLines.push('');
    reportLines.push(
      '| Question # | Letter | XLSX Text | Option Text |',
    );
    reportLines.push('|:---|:---|:---|:---|');
    report.conflicts.forEach((c) => {
      reportLines.push(
        `| ${c.questionNumber} | ${c.letter} | ${c.xlsxText} | ${c.optionText} |`,
      );
    });
    reportLines.push('');
  }

  // Not found section
  if (report.notFoundInDb.length > 0) {
    reportLines.push('## Questions Not Found in Database');
    reportLines.push('');
    report.notFoundInDb.forEach((nf) => {
      reportLines.push(
        `- Question ${nf.questionNumber} (answer: ${nf.xlsxLetter})`,
      );
    });
    reportLines.push('');
  }

  // Detailed changes section
  if (report.updatedDetails.length > 0) {
    reportLines.push('## Detailed Changes');
    reportLines.push('');
    reportLines.push(
      '| Question # | Old Answer | New Answer | Old Text | New Text |',
    );
    reportLines.push('|:---|:---|:---|:---|:---|');
    report.updatedDetails.forEach((d) => {
      reportLines.push(
        `| ${d.questionNumber} | ${d.oldLetter} | ${d.newLetter} | ${d.oldText} | ${d.newText} |`,
      );
    });
    reportLines.push('');
  }

  // Questions still pending
  const pendingQuestions = questions.filter(
    (q) => !q.correctResponseLetter || q.correctResponseLetter === '',
  );
  if (pendingQuestions.length > 0) {
    reportLines.push('## Questions Still Pending Answer Key');
    reportLines.push('');
    reportLines.push(`Total: ${pendingQuestions.length}`);
    reportLines.push('');
    pendingQuestions.forEach((q) => {
      reportLines.push(
        `- Q${q.questionNumber} (ID: ${q.questionId}): ${q.question.substring(0, 60)}...`,
      );
    });
    reportLines.push('');
  }

  const reportContent = reportLines.join('\n');
  fs.writeFileSync(REPORT_PATH, reportContent, 'utf8');
  console.log(`✅ Validation report written to ${REPORT_PATH}`);
  console.log('');

  // Exit with error code if integrity issues found
  if (report.integrityErrors.length > 0) {
    console.log(
      '❌ Migration completed with integrity errors. Please review the report.',
    );
    process.exit(1);
  }

  console.log('✅ Migration completed successfully!');
  console.log('');
}

main();
