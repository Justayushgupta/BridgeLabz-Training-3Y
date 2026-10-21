// Q7. Smart Guessing Game
// Generates a secret random number (1–50) and evaluates a user's guess
// using nested if conditions and logical operators.

// Generate a random secret number between 1 and 50 (inclusive)
const secretNumber = Math.floor(Math.random() * 50) + 1;

// Simulated user guess — change this value to test different outcomes
const userGuess = 23;

console.log("===== Smart Guessing Game =====");
console.log(`  Secret Number : ${secretNumber}`); // Revealed for testing purposes
console.log(`  Your Guess    : ${userGuess}`);
console.log("-------------------------------");

let result;

if (userGuess === secretNumber) {
  // Exact match
  result = "Correct guess! 🎉";
} else if (userGuess >= secretNumber - 3 && userGuess <= secretNumber + 3) {
  // Within ±3 range of the secret number (logical && combines both bounds)
  result = "Very close! 🔥";
} else if (userGuess > secretNumber) {
  // Guess is above the secret number
  result = "Too high! ⬇️";
} else {
  // Guess is below the secret number
  result = "Too low! ⬆️";
}

console.log(`  Result        : ${result}`);
console.log("===============================");
