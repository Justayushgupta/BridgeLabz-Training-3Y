// Q4. Array Performance Analyzer
// Demonstrates array methods: map(), filter(), reduce(), Math.max/min with spread

// Generate an array of 8 random integer scores between 30 and 100
const scores = Array.from(
  { length: 8 },
  () => Math.floor(Math.random() * 71) + 30  // 30 to 100
);

// Highest score using spread operator with Math.max
const highest = Math.max(...scores);

// Lowest score using spread operator with Math.min
const lowest = Math.min(...scores);

// Average score – sum all scores with reduce(), then divide by count
const total = scores.reduce((acc, score) => acc + score, 0);
const average = (total / scores.length).toFixed(2);

// Students who passed (score >= 50) using filter()
const passed = scores.filter(score => score >= 50);

// Display a full summary
console.log("===== Array Performance Analyzer =====");
console.log("Scores           :", scores.join(", "));
console.log("Highest Score    :", highest);
console.log("Lowest Score     :", lowest);
console.log("Average Score    :", average);
console.log("Students Passed  :", passed.length, "out of", scores.length);
console.log("Passing Scores   :", passed.join(", "));
console.log("======================================");
