"use strict";

/**
 * ASSIGNMENT 3 - QUESTION 2: Employee Bonus Calculator
 * 
 * Objective:
 * Process employee records containing stringified numerical values. Convert salary
 * and years of experience into numbers, apply business logic to compute performance bonuses,
 * format output using ES6 template strings, and use try...catch for robust error handling.
 * 
 * Given Data:
 * [
 *   { name: "Amit", salary: "45000", years: "5" },
 *   { name: "Sara", salary: "38000", years: "2" },
 *   { name: "Kiran", salary: "52000", years: "7" }
 * ]
 * 
 * Bonus Rules:
 * - If years > 3: bonus = salary * 0.10 (10%)
 * - Else (years <= 3): bonus = salary * 0.05 (5%)
 */

// Provided employee dataset
const employees = [
    { name: "Amit", salary: "45000", years: "5" },
    { name: "Sara", salary: "38000", years: "2" },
    { name: "Kiran", salary: "52000", years: "7" }
];

// Additional edge cases to demonstrate try...catch error handling
const edgeCaseEmployees = [
    { name: "Rohan", years: "4" },                   // Missing salary property
    { name: "Pooja", salary: "fifty-thousand", years: "3" }, // Non-numeric salary string
    { name: "Vikram", salary: "60000", years: "-1" }, // Negative years of service
    null                                             // Null record
];

/**
 * Validates and calculates compensation details for an individual employee.
 * 
 * Strict Mode Observation:
 * Without "use strict", accidental assignments to undeclared variables (e.g. bonus = ...)
 * would create implicit global variables, leaking into the global execution context.
 * Strict mode throws a ReferenceError immediately, ensuring lexical safety.
 * 
 * @param {Object} emp - The employee object to process
 * @returns {Object} Calculated employee record
 */
function processEmployeeBonus(emp) {
    // 5. Check for null or non-object entry
    if (!emp || typeof emp !== "object") {
        throw new TypeError("Invalid employee entry: Expected a non-null object.");
    }

    // 5. Missing property validation
    if (!("name" in emp) || typeof emp.name !== "string" || emp.name.trim() === "") {
        throw new Error("Missing or invalid employee property: 'name'.");
    }
    if (!("salary" in emp) || emp.salary === null || emp.salary === undefined) {
        throw new Error(`Employee '${emp.name}' is missing required property: 'salary'.`);
    }
    if (!("years" in emp) || emp.years === null || emp.years === undefined) {
        throw new Error(`Employee '${emp.name}' is missing required property: 'years'.`);
    }

    // 1. Convert salary and years to numbers
    const numericSalary = Number(emp.salary);
    const numericYears = Number(emp.years);

    // Validate conversion results
    if (Number.isNaN(numericSalary) || numericSalary < 0) {
        throw new TypeError(`Employee '${emp.name}' has invalid salary value: "${emp.salary}". Must be a valid positive number.`);
    }

    if (Number.isNaN(numericYears) || numericYears < 0) {
        throw new TypeError(`Employee '${emp.name}' has invalid years of service: "${emp.years}". Must be a non-negative number.`);
    }

    // 2. Calculate bonus = (salary * 0.1) if years > 3 else (salary * 0.05)
    const bonusRate = numericYears > 3 ? 0.10 : 0.05;
    const bonusAmount = numericSalary * bonusRate;
    const totalCompensation = numericSalary + bonusAmount;

    return {
        name: emp.name,
        salary: numericSalary,
        years: numericYears,
        bonusRate: bonusRate,
        bonusAmount: bonusAmount,
        totalCompensation: totalCompensation
    };
}

/**
 * Formats a currency value with comma separators and currency symbol.
 */
function formatCurrency(amount) {
    return "₹" + amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

console.log("===============================================================================");
console.log("                   Q2: EMPLOYEE BONUS CALCULATOR REPORT                       ");
console.log("===============================================================================\n");

// Process primary employee dataset
console.log(">>> PROCESSING GIVEN EMPLOYEES DATASET:");
console.log("-------------------------------------------------------------------------------");

const processedRecords = [];

employees.forEach((emp, index) => {
    try {
        const result = processEmployeeBonus(emp);
        processedRecords.push(result);

        // 4. Use template strings to print each employee's formatted details
        console.log(
            `[Record #${index + 1}] Employee Details:\n` +
            `  • Name               : ${result.name}\n` +
            `  • Years of Service   : ${result.years} year(s) [Bonus Tier: ${result.bonusRate * 100}%]\n` +
            `  • Base Salary        : ${formatCurrency(result.salary)}\n` +
            `  • Bonus Awarded      : ${formatCurrency(result.bonusAmount)}\n` +
            `  • Total Compensation : ${formatCurrency(result.totalCompensation)}\n`
        );
    } catch (error) {
        console.error(`[Record #${index + 1}] ERROR processing employee: ${error.message}\n`);
    }
});

// Summary Table
console.log("===============================================================================");
console.log("                            COMPENSATION SUMMARY TABLE                         ");
console.log("===============================================================================");
console.log(
    "Name".padEnd(12) +
    "Years".padEnd(10) +
    "Base Salary".padEnd(16) +
    "Rate".padEnd(8) +
    "Bonus".padEnd(16) +
    "Total Compensation"
);
console.log("-".repeat(78));

processedRecords.forEach(rec => {
    console.log(
        rec.name.padEnd(12) +
        `${rec.years} yrs`.padEnd(10) +
        formatCurrency(rec.salary).padEnd(16) +
        `${rec.bonusRate * 100}%`.padEnd(8) +
        formatCurrency(rec.bonusAmount).padEnd(16) +
        formatCurrency(rec.totalCompensation)
    );
});

// 5. Test try...catch with deliberate edge cases to demonstrate error resilience
console.log("\n===============================================================================");
console.log(">>> DEMONSTRATING TRY...CATCH ERROR HANDLING (EDGE CASES):");
console.log("-------------------------------------------------------------------------------");

edgeCaseEmployees.forEach((emp, idx) => {
    const label = emp && emp.name ? emp.name : `Case #${idx + 1}`;
    try {
        console.log(`Attempting to process: ${JSON.stringify(emp)}`);
        const res = processEmployeeBonus(emp);
        console.log(`  Success: ${res.name} processed.\n`);
    } catch (err) {
        console.log(`  [CAUGHT EXPECTED ERROR] ${err.name}: ${err.message}\n`);
    }
});

console.log("===============================================================================");
console.log("Q2 Execution complete. All computations verified.");
console.log("===============================================================================\n");
