// Q1: Scope Conflict Resolver
// Demonstrates global vs local variable scope in JavaScript functions.

// Global variable accessible anywhere in the script
let bonus = 5000;

/**
 * calculateSalary - Computes the total salary of an employee.
 * @param {boolean} isPermanent - Whether the employee is a permanent employee.
 *
 * A local `salary` variable is declared inside this function.
 * If `isPermanent` is true, the global `bonus` is added to the salary.
 * This demonstrates that the local variable `salary` does NOT affect the global scope,
 * but the global `bonus` is READ (not modified) from within the function.
 */
function calculateSalary(isPermanent) {
  // Local variable — exists only inside this function
  let salary = 40000;

  console.log("--- calculateSalary called ---");
  console.log(`  isPermanent : ${isPermanent}`);
  console.log(`  Base Salary : ₹${salary}`);
  console.log(`  Global Bonus: ₹${bonus}`);

  if (isPermanent) {
    // Access the global `bonus` and add it to local `salary`
    salary = salary + bonus;
    console.log(`  Bonus Applied! Total Salary: ₹${salary}`);
  } else {
    // No bonus for non-permanent employees
    console.log(`  No bonus for non-permanent employees. Total Salary: ₹${salary}`);
  }

  // The global `bonus` is unchanged — local `salary` only exists here
  console.log(`  Global bonus after function body: ₹${bonus} (unchanged)`);
  console.log("");
}

// Demonstrate how isPermanent affects the output
// Call 1: Permanent employee — bonus is added
calculateSalary(true);

// Call 2: Non-permanent employee — no bonus
calculateSalary(false);

// Call 3: Another permanent employee — same global bonus is reused
calculateSalary(true);

// Confirm the global `bonus` was never modified
console.log(`Final global bonus value: ₹${bonus} (global scope unchanged across all calls)`);
