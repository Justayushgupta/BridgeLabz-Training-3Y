// Q4. Academic Performance Evaluator
// Evaluates a student's academic performance based on marks in 5 subjects.
// Includes validation: any subject below 35 results in automatic detention.

// Marks for 5 subjects (out of 100)
const marks = [78, 85, 91, 62, 74];
const subjects = ["Mathematics", "Science", "English", "History", "Computer Science"];
const maxMarksPerSubject = 100;

// Calculate total marks obtained and total maximum marks
let totalObtained = 0;
let failedSubject = false; // flag to track if any subject < 35

console.log("===== Academic Performance Evaluator =====");
for (let i = 0; i < marks.length; i++) {
  console.log(`  ${subjects[i].padEnd(20)}: ${marks[i]}`);

  totalObtained += marks[i]; // sum marks using +=

  // Validation: check if any subject is below the passing minimum (35)
  if (marks[i] < 35) {
    failedSubject = true;
  }
}

const totalMaxMarks = marks.length * maxMarksPerSubject;  // 500
const average = totalObtained / marks.length;             // avg per subject
const percentage = (totalObtained / totalMaxMarks) * 100; // overall percentage

console.log("------------------------------------------");
console.log(`  Total Obtained : ${totalObtained} / ${totalMaxMarks}`);
console.log(`  Average Marks  : ${average.toFixed(2)}`);
console.log(`  Percentage     : ${percentage.toFixed(2)}%`);
console.log("------------------------------------------");

// Determine result using logical operators
let result;
if (failedSubject) {
  // Validation rule overrides everything: any subject below 35 = Detained
  result = "Detained (scored below 35 in at least one subject)";
} else if (percentage >= 85) {
  // Distinction: overall percentage >= 85%
  result = "Promoted with Distinction";
} else if (percentage >= 50 && percentage <= 84) {
  // Promoted: percentage between 50% and 84%
  result = "Promoted";
} else {
  // Below 50% overall
  result = "Detained";
}

console.log(`  Result         : ${result}`);
console.log("==========================================");
