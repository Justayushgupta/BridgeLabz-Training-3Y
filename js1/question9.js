/**
 * Q9. Random Math Quiz Generator
 * 
 * Requirements:
 * - Use Math.random() to generate two numbers (1-20) and a random operator from ['+', '-', '*', '/'].
 * - Calculate the correct answer using switch statement.
 * - Display question and correct answer in the console.
 * - Ensure division is rounded to two decimals with toFixed(2).
 */

// Function to generate a random math challenge
function generateMathQuiz(customNum1 = null, customNum2 = null, customOp = null) {
    const operators = ['+', '-', '*', '/'];

    // 1. Generate two random numbers between 1 and 20 (or use custom values for testing)
    const num1 = customNum1 !== null ? customNum1 : Math.floor(Math.random() * 20) + 1;
    const num2 = customNum2 !== null ? customNum2 : Math.floor(Math.random() * 20) + 1;

    // Generate random operator from list
    const operator = customOp !== null ? customOp : operators[Math.floor(Math.random() * operators.length)];

    // 2. Calculate the correct answer using a switch statement
    let correctAnswer;
    switch (operator) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
        case '/':
            // Ensure division is rounded to two decimals with toFixed(2)
            correctAnswer = Number((num1 / num2).toFixed(2));
            break;
        default:
            correctAnswer = "Invalid operator";
    }

    // 3. Display question and correct answer in console
    console.log(`Question       : What is ${num1} ${operator} ${num2}?`);
    console.log(`Correct Answer : ${correctAnswer}\n`);

    return { num1, num2, operator, correctAnswer };
}

// Generate a random question
console.log("=== Random Math Challenge ===");
generateMathQuiz();

// Demonstrate each operator branch explicitly
console.log("=== Testing All 4 Operators via Switch Statement ===");
console.log("Addition (+):");
generateMathQuiz(15, 7, '+');

console.log("Subtraction (-):");
generateMathQuiz(18, 9, '-');

console.log("Multiplication (*):");
generateMathQuiz(6, 8, '*');

console.log("Division (/) with toFixed(2) rounding:");
generateMathQuiz(10, 3, '/');
