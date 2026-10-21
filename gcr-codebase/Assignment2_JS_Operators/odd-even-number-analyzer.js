// Q9. Odd–Even Number Analyzer (FizzBuzz variant)
// Demonstrates: loops, %, push(), and conditionals

const numbers = [];
const results = [];

// Populate numbers array with values 1 to 30 using a loop
for (let i = 1; i <= 30; i++) {
  numbers.push(i);
}

// Analyze each number and categorize it
numbers.forEach(num => {
  let label;

  if (num % 3 === 0 && num % 5 === 0) {
    // Divisible by both 3 and 5
    label = "FizzBuzz";
  } else if (num % 2 === 0) {
    // Even number (not FizzBuzz)
    label = "Even";
  } else {
    // Odd number
    label = "Odd";
  }

  results.push(`${num}: ${label}`);
});

// Display each result
console.log("===== Odd-Even Number Analyzer (1–30) =====");
results.forEach(result => console.log(result));
console.log("============================================");
