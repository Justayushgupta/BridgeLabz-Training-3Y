// Q10. Departmental Employee Evaluator
// Demonstrates nested arrays, loops, comparison operators, and nested if-else

// Nested array: each element is [departmentName, performanceScore]
const departments = [
  ["HR",      72],
  ["Finance", 88],
  ["Tech",    95],
  ["Support", 63]
];

console.log("===== Departmental Employee Evaluator =====");
console.log(`${"Department".padEnd(12)} | ${"Score".padEnd(6)} | Rating`);
console.log("-".repeat(40));

// Loop through each department and evaluate performance
for (let i = 0; i < departments.length; i++) {
  const deptName = departments[i][0]; // department name
  const score    = departments[i][1]; // performance score

  let rating;

  // Nested if-else to classify performance
  if (score >= 90) {
    rating = "⭐ Excellent";
  } else if (score >= 75) {
    rating = "👍 Good";
  } else if (score >= 60) {
    rating = "📊 Average";
  } else {
    rating = "⚠️  Needs Improvement";
  }

  console.log(`${deptName.padEnd(12)} | ${String(score).padEnd(6)} | ${rating}`);
}

console.log("===========================================");
