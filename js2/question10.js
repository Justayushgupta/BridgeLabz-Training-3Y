/**
 * Q10. Departmental Employee Evaluator
 * 
 * Requirements:
 * - Create a nested array for departments:
 *   const departments = [
 *     ["HR", 72],
 *     ["Finance", 88],
 *     ["Tech", 95],
 *     ["Support", 63]
 *   ];
 * - Use loops and conditionals to print:
 *   - "Excellent" if score >= 90
 *   - "Good" if 75-89
 *   - "Average" if 60-74
 *   - "Needs Improvement" otherwise
 * - Use comparison operators and nested if-else conditions.
 */

// 1. Nested array of departments and performance scores
const departments = [
    ["HR", 72],
    ["Finance", 88],
    ["Tech", 95],
    ["Support", 63],
    ["Operations", 54] // Added to demonstrate "Needs Improvement" branch
];

// Helper function using comparison operators and nested if-else
function evaluatePerformance(score) {
    let rating = "";

    // Comparison operators and nested if-else
    if (score >= 90) {
        rating = "Excellent";
    } else {
        // Nested condition 1
        if (score >= 75 && score <= 89) {
            rating = "Good";
        } else {
            // Nested condition 2
            if (score >= 60 && score <= 74) {
                rating = "Average";
            } else {
                // Otherwise (< 60)
                rating = "Needs Improvement";
            }
        }
    }

    return rating;
}

// 2. Iterate using a loop and evaluate each department
const evaluationReport = [];

console.log("=== Department Performance Evaluation Stream ===");
for (let i = 0; i < departments.length; i++) {
    const departmentName = departments[i][0];
    const performanceScore = departments[i][1];

    const rating = evaluatePerformance(performanceScore);

    console.log(`Department: ${departmentName.padEnd(12)} | Score: ${performanceScore} | Rating: "${rating}"`);

    evaluationReport.push({
        Department: departmentName,
        Score: performanceScore,
        Rating: rating
    });
}

// 3. Display complete evaluation table
console.log("\n=== Complete Evaluation Report Table ===");
console.table(evaluationReport);
