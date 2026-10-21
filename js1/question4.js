/**
 * Q4. Academic Performance Evaluator
 * 
 * Requirements:
 * - Input marks of 5 subjects (use an array).
 * - Calculate average and overall percentage.
 * - Use logical operators to print:
 *   - "Promoted with Distinction" if >= 85%
 *   - "Promoted" if between 50%-84%
 *   - "Detained" if < 50%
 * - Add validation: if any subject < 35 -> automatically "Detained".
 */

// Function to evaluate academic performance of a student
function evaluateStudentPerformance(studentName, marks) {
    console.log(`\nEvaluating student: ${studentName}`);
    console.log(`Subject Marks: [${marks.join(", ")}]`);

    // 1. Validation check: check if any subject is below passing threshold (35)
    let hasFailedSubject = false;
    for (let i = 0; i < marks.length; i++) {
        if (marks[i] < 35) {
            hasFailedSubject = true;
            break;
        }
    }

    // 2. Calculate total, average, and overall percentage (assuming max 100 per subject)
    let totalMarks = 0;
    for (let i = 0; i < marks.length; i++) {
        totalMarks += marks[i];
    }
    const average = totalMarks / marks.length;
    const percentage = (totalMarks / (marks.length * 100)) * 100;

    console.log(`Total Marks : ${totalMarks}/${marks.length * 100}`);
    console.log(`Average     : ${average.toFixed(2)}`);
    console.log(`Percentage  : ${percentage.toFixed(2)}%`);

    // 3. Determine status using logical operators
    let status = "";
    if (hasFailedSubject || percentage < 50) {
        // Automatically Detained if any subject < 35 OR percentage < 50%
        status = "Detained";
    } else if (percentage >= 85) {
        status = "Promoted with Distinction";
    } else if (percentage >= 50 && percentage <= 84.99) {
        status = "Promoted";
    }

    console.log(`Result      : "${status}"`);
    return status;
}

// Default input case
const studentMarks = [88, 92, 79, 95, 86];
evaluateStudentPerformance("Aadi (Default Student)", studentMarks);

// Testing edge cases and validation rules:
console.log("\n=== Testing Different Academic Scenarios ===");
evaluateStudentPerformance("Student A (Regular Promotion)", [65, 70, 58, 62, 75]);
evaluateStudentPerformance("Student B (Detained by low percentage)", [45, 40, 48, 52, 42]);
evaluateStudentPerformance("Student C (High marks but failed 1 subject < 35)", [95, 90, 88, 30, 92]);
