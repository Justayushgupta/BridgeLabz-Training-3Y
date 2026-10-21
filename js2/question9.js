/**
 * Q9. Odd-Even Number Analyzer
 * 
 * Requirements:
 * - Accept numbers 1-30 in an array using a loop.
 * - For each number:
 *   - If divisible by 3 and 5 -> print "FizzBuzz"
 *   - Else if even -> print "Even"
 *   - Else -> print "Odd"
 * - Store results in a new array and display it.
 * - Use %, push(), and conditionals.
 */

// 1. Populate numbers 1 to 30 into an array using a for loop and push()
const numbers = [];
for (let i = 1; i <= 30; i++) {
    numbers.push(i);
}

// 2. Classify each number using modulo operator (%) and conditionals
const classificationResults = [];

console.log("=== Real-Time Number Classification Stream ===");
for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    let classification = "";

    // Check if divisible by both 3 and 5 using %
    if (num % 3 === 0 && num % 5 === 0) {
        classification = "FizzBuzz";
        console.log(`Number ${num} -> FizzBuzz`);
    } 
    // Check if even using % 2
    else if (num % 2 === 0) {
        classification = "Even";
        console.log(`Number ${num} -> Even`);
    } 
    // Otherwise odd
    else {
        classification = "Odd";
        console.log(`Number ${num} -> Odd`);
    }

    // Store results into new array using push()
    classificationResults.push({
        Number: num,
        Classification: classification
    });
}

// 3. Display complete results summary in a formatted console table
console.log("\n=== Complete Classification Summary Table ===");
console.table(classificationResults);

// Summary statistics
const fizzBuzzCount = classificationResults.filter(r => r.Classification === "FizzBuzz").length;
const evenCount = classificationResults.filter(r => r.Classification === "Even").length;
const oddCount = classificationResults.filter(r => r.Classification === "Odd").length;

console.log("\n--- Breakdown Counts ---");
console.log(`FizzBuzz (Divisible by 3 & 5) : ${fizzBuzzCount}`);
console.log(`Even Numbers                  : ${evenCount}`);
console.log(`Odd Numbers                   : ${oddCount}`);
