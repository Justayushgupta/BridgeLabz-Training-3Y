/**
 * Q7. Smart Guessing Game (Number Range)
 * 
 * Requirements:
 * - Generate a random secret number between 1-50 using Math.floor(Math.random() * 50) + 1.
 * - Let userGuess be a variable with a test value.
 * - Print:
 *   - "Correct guess!" if equal
 *   - "Very close!" if within +- 3 of secret
 *   - "Too high" or "Too low" otherwise
 * - Use nested if conditions and logical operators.
 */

// 1. Generate a random secret number between 1 and 50
const secretNumber = Math.floor(Math.random() * 50) + 1;

// 2. Variable with a test value for user's guess
let userGuess = 25;

// Function using nested if conditions and logical operators to evaluate guess
function checkGuess(guess, secret) {
    console.log(`[Evaluation] Secret Number: ${secret} | User Guess: ${guess}`);

    // Outer condition: check for exact match
    if (guess === secret) {
        console.log("Result: Correct guess!");
    } else {
        // Calculate difference
        const diff = Math.abs(guess - secret);

        // Nested condition 1: check if within +- 3 range
        if (diff <= 3) {
            console.log("Result: Very close!");
        } else {
            // Nested condition 2: check if too high or too low
            if (guess > secret) {
                console.log("Result: Too high");
            } else if (guess < secret) {
                console.log("Result: Too low");
            }
        }
    }
    console.log();
}

console.log("=== Random Secret Number Evaluation ===");
checkGuess(userGuess, secretNumber);

// Demonstration with fixed secret number to verify all branches:
console.log("=== Verifying All Branches with Secret = 30 ===");
const testSecret = 30;

// Test exact match
checkGuess(30, testSecret); // Correct guess!

// Test very close (+2 and -3)
checkGuess(32, testSecret); // Very close!
checkGuess(27, testSecret); // Very close!

// Test too high
checkGuess(45, testSecret); // Too high

// Test too low
checkGuess(10, testSecret); // Too low
