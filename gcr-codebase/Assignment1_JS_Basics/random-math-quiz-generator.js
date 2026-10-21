// Q9. Random Math Quiz Generator
// Generates a random arithmetic question using two numbers (1–20) and a random operator.
// Computes the correct answer using a switch statement.
// Division results are rounded to 2 decimal places using toFixed(2).

// Generate two random numbers between 1 and 20 (inclusive)
const num1 = Math.floor(Math.random() * 20) + 1;
const num2 = Math.floor(Math.random() * 20) + 1;

// Choose a random operator from the list
const operators = ["+", "-", "*", "/"];
const operator = operators[Math.floor(Math.random() * operators.length)];

let correctAnswer;

// Compute the correct answer based on the selected operator
switch (operator) {
  case "+":
    correctAnswer = num1 + num2;
    break;

  case "-":
    correctAnswer = num1 - num2;
    break;

  case "*":
    correctAnswer = num1 * num2;
    break;

  case "/":
    // Round division to 2 decimal places to handle non-integer results
    correctAnswer = parseFloat((num1 / num2).toFixed(2));
    break;

  default:
    // Fallback — should never reach here with the current operators array
    correctAnswer = "Unknown operator";
}

// Display the generated quiz question and its correct answer
console.log("===== Random Math Quiz Generator =====");
console.log(`  Question       : What is ${num1} ${operator} ${num2}?`);
console.log(`  Correct Answer : ${correctAnswer}`);
console.log("=======================================");
