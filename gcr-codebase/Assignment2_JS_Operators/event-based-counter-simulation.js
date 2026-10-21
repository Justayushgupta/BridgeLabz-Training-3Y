// Q6. Event-Based Counter Simulation
// Demonstrates function scope, closures, and manual event simulation

// Outer variable — shared across increment/decrement but scoped here
let count = 0;

// increment() – increases count by 1 and logs the updated value
function increment() {
  count++;

  // Nested function to show inner function scope (logs internally)
  function logUpdate() {
    console.log(`[Increment] Count updated to: ${count}`);
  }
  logUpdate();
}

// decrement() – decreases count by 1 (won't go below 0) and logs the value
function decrement() {
  if (count > 0) {
    count--;
  } else {
    console.log("[Decrement] Count is already at 0, cannot go lower.");
    return;
  }

  // Nested function demonstrating scope within decrement
  function logUpdate() {
    console.log(`[Decrement] Count updated to: ${count}`);
  }
  logUpdate();
}

// Simulate button "click" events manually
console.log("=== Event-Based Counter Simulation ===");
increment(); // count = 1
increment(); // count = 2
increment(); // count = 3
decrement(); // count = 2
decrement(); // count = 1
decrement(); // count = 0
decrement(); // already at 0 – boundary check triggered
console.log("Final Count:", count);
