/**
 * @deprecated Use `update_from_xlsx.cjs` instead.
 *
 * This file previously contained an AI-inferred answer key for TVDE exam
 * questions. The answer key has been replaced by the official IMT simulator
 * results imported from `tvde_questions_with_images_answer_key_updated_v2.xlsx`.
 *
 * To update answers, run:
 *   node scripts/update_from_xlsx.cjs
 *
 * To validate without modifying files:
 *   node scripts/update_from_xlsx.cjs --validate-only
 */

console.log('');
console.log('⚠️  This script is DEPRECATED.');
console.log('');
console.log('The AI-inferred answer key has been replaced by the official');
console.log('IMT simulator answer key from the updated XLSX spreadsheet.');
console.log('');
console.log('Please use the new migration script instead:');
console.log('  node scripts/update_from_xlsx.cjs');
console.log('');
console.log('Or validate without changes:');
console.log('  node scripts/update_from_xlsx.cjs --validate-only');
console.log('');
process.exit(1);
