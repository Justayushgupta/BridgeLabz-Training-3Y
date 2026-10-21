/**
 * Q4. Array Performance Analyzer
 * 
 * Requirements:
 * - Create an array of 8 random scores between 30 and 100.
 * - Calculate:
 *   - Highest and lowest score (Math.max(...arr), Math.min(...arr))
 *   - Average score
 *   - Number of students who passed (>= 50)
 * - Use array methods like map(), filter(), and reduce().
 * - Display a full summary in a formatted output.
 */

// 1. Generate an array of 8 random student scores between 30 and 100
// Math.random() * 71 gives 0 to 70.99... + 30 gives 30 to 100 inclusive.
const studentScores = Array.from({ length: 8 }, () => Math.floor(Math.random() * 71) + 30);

console.log("=== Student Scores Array ===");
console.log(`Scores: [${studentScores.join(", ")}]\n`);

// 2. Highest and lowest score using spread operator with Math.max and Math.min
const highestScore = Math.max(...studentScores);
const lowestScore = Math.min(...studentScores);

// 3. Average score using reduce()
const totalScore = studentScores.reduce((accumulator, score) => accumulator + score, 0);
const averageScore = totalScore / studentScores.length;

// 4. Number of students who passed (>= 50) using filter()
const passingScores = studentScores.filter(score => score >= 50);
const passedCount = passingScores.length;
const failedCount = studentScores.length - passedCount;

// 5. Use map() to create detailed report entries with pass/fail status
const performanceReport = studentScores.map((score, index) => {
    return {
        Student: `Student #${index + 1}`,
        Score: score,
        Status: score >= 50 ? "Passed" : "Failed"
    };
});

// 6. Display a full summary in formatted output
console.log("=== Individual Performance Table (via map) ===");
console.table(performanceReport);

console.log("=== Academic Analytics Summary ===");
console.log(`- Total Students Evaluated : ${studentScores.length}`);
console.log(`- Highest Score (Math.max) : ${highestScore}`);
console.log(`- Lowest Score  (Math.min) : ${lowestScore}`);
console.log(`- Average Score (reduce)   : ${averageScore.toFixed(2)}`);
console.log(`- Passed Students (filter) : ${passedCount} (${((passedCount / studentScores.length) * 100).toFixed(1)}%)`);
console.log(`- Failed Students          : ${failedCount}`);
