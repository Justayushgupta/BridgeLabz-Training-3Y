/**
 * Q6. Event-Based Counter Simulation
 * 
 * Requirements:
 * - Use variables count = 0.
 * - Create two functions: increment() and decrement().
 * - Each function modifies count and logs the current value.
 * - Simulate "click" by calling these functions manually in code.
 * - Use a nested function to show function scope of count updates.
 */

// 1. Initialize count variable
let count = 0;
console.log(`Initial Counter Value: ${count}\n`);

// 2. Increment function with nested function demonstrating function scope
function increment() {
    // Nested helper function that updates and logs count within its parent scope
    function performIncrement() {
        count++; // Modifies count variable
        console.log(`[Event: Increment Button Clicked] -> Current Count: ${count}`);
    }

    performIncrement(); // Execute nested function
}

// 3. Decrement function with nested function demonstrating function scope
function decrement() {
    // Nested helper function that updates and logs count within its parent scope
    function performDecrement() {
        count--; // Modifies count variable
        console.log(`[Event: Decrement Button Clicked] -> Current Count: ${count}`);
    }

    performDecrement(); // Execute nested function
}

// 4. Simulate user "clicks" by calling increment() and decrement() manually
console.log("=== Simulating Click Events ===");
console.log("User clicks '+' 3 times:");
increment();
increment();
increment();

console.log("\nUser clicks '-' 2 times:");
decrement();
decrement();

console.log("\nUser clicks '+' 1 time:");
increment();

console.log(`\nFinal Counter State: ${count}`);
