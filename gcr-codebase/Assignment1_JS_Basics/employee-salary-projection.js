// Q8. Employee Salary Projection
// Projects an employee's salary over 5 years based on an annual increment rate.
// Uses a for loop, assignment operators, rounding, and console.table().

// Initial salary and annual increment rate
let currentSalary = 50000;      // Starting salary in ₹
const incrementRate = 8;        // Annual increment in percentage (e.g., 8%)

const projectionTable = [];     // Will hold one row per year for console.table()

console.log("===== Employee Salary Projection =====");
console.log(`  Starting Salary  : ₹${currentSalary}`);
console.log(`  Annual Increment : ${incrementRate}%`);
console.log("--------------------------------------");

for (let year = 1; year <= 5; year++) {
  // Calculate increment for this year
  const incrementAmount = (currentSalary * incrementRate) / 100;

  // Apply increment using assignment operator +=
  currentSalary += incrementAmount;

  // Round the salary to avoid floating-point decimals
  currentSalary = Math.round(currentSalary);

  // Push a formatted row into the projection table
  projectionTable.push({
    Year: `Year ${year}`,
    "Increment (₹)": Math.round(incrementAmount),
    "Salary (₹)": currentSalary,
  });
}

// Display all 5 years of projections in one formatted table
console.table(projectionTable);
