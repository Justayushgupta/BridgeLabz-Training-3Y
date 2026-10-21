/**
 * Q1. Scope Conflict Resolver
 * 
 * Requirements:
 * - Declare a global variable bonus = 5000.
 * - Inside a function calculateSalary(), declare a local variable salary = 40000.
 * - Add the bonus only if a local variable isPermanent (boolean) is true.
 * - Print total salary inside the function.
 * - Demonstrate how changing isPermanent affects the global variable scope.
 */

// 1. Declare global variable for bonus
let bonus = 5000;

// 2. Define calculateSalary() with proper local variable scoping
function calculateSalary(isPermanentEmployee) {
    // Local variable declared inside function scope
    const salary = 40000;
    const isPermanent = isPermanentEmployee !== undefined ? isPermanentEmployee : true;

    // Calculate total salary: add global bonus only if isPermanent is true
    let totalSalary = salary;
    if (isPermanent) {
        totalSalary += bonus;
    }

    // Print total salary inside the function
    console.log(`[Inside calculateSalary] isPermanent: ${isPermanent}`);
    console.log(`- Base Salary (Local) : ₹${salary}`);
    console.log(`- Global Bonus        : ₹${isPermanent ? bonus : 0}`);
    console.log(`- Total Salary        : ₹${totalSalary}\n`);

    return totalSalary;
}

// 3. Demonstrate function execution and variable scoping
console.log("=== Testing Scope Resolution ===");
console.log(`Global bonus before function calls: ₹${bonus}\n`);

console.log("Case 1: Permanent employee (isPermanent = true)");
calculateSalary(true);

console.log("Case 2: Contract/Temporary employee (isPermanent = false)");
calculateSalary(false);

// 4. Demonstrate scope boundaries:
console.log("=== Demonstrating Scope Isolation ===");
console.log(`Global bonus remains intact: ₹${bonus}`);
try {
    // Attempting to access local variable outside function
    console.log(salary);
} catch (error) {
    console.log(`Local variable 'salary' is not accessible in global scope: "${error.message}"`);
}
