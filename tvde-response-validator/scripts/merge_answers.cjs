const fs = require('fs');
const path = require('path');

const QUESTIONS_PATH = path.resolve(__dirname, '../src/data/questions.json');
const ANSWER_KEY_PATH = path.resolve(__dirname, 'answer_key.json');

const questions = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf8'));
const answers = JSON.parse(fs.readFileSync(ANSWER_KEY_PATH, 'utf8'));

const answerMap = new Map();
answers.forEach(a => answerMap.set(a.questionNumber, a.correctResponseLetter));

let updated = 0;
questions.forEach(q => {
  const correct = answerMap.get(q.questionNumber);
  if (correct !== undefined) {
    q.correctResponseLetter = correct;
    updated++;
  }
});

fs.writeFileSync(QUESTIONS_PATH, JSON.stringify(questions, null, 2), 'utf8');
console.log(`Updated ${updated} questions with correct answers.`);
