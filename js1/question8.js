/**
 * Q8. Employee Salary Projection
 * 
 * Requirements:
 * - Declare current salary and annual increment rate (in %).
 * - Use a for loop to compute salary for each of 5 years.
 * - Print yearly salary in a formatted console table.
 * - Apply rounding and assignment operators.
 */

// 1. Declare base salary and annual increment percentage
let startingSalary = 50000;
const annualIncrementRate = 10; // 10% per year

console.log(`Starting Salary: ₹${startingSalary}`);
console.log(`Annual Increment Rate: ${annualIncrementRate}%\n`);

// Array to hold projection data for console.table
const salaryProjection = [];
let currentSalary = startingSalary;

// 2. Use a for loop to project salary across 5 years
for (let year = 1; year <= 5; year++) {
    // Calculate increment amount for this year
    const increment = currentSalary * (annualIncrementRate / 100);

    // Update salary using arithmetic assignment operator (+=)
    currentSalary += increment;

    // Apply Math.round() for rounding to nearest whole integer
    currentSalary = Math.round(currentSalary);

    // Push yearly record into summary table
    salaryProjection.push({
        "Year": `Year ${year}`,
        "Increment Added": `₹${Math.round(increment)}`,
        "Projected Salary": `₹${currentSalary}`
    });
}

// 3. Print the formatted projection in a console table
console.log("=== 5-Year Employee Salary Projection ===");
console.table(salaryProjection);
